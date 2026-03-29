/*
 * Routes for registering and logging in admin users.
 */

const jwt = require('jsonwebtoken');
const { API_KEY, JWT_SECRET, JWT_EXPIRES_IN } = require('../config');
const { createAdmin, verifyAdminCredentials } = require('../services/adminService');

function registerAdminAuthRoutes(fastify) {
  fastify.post('/admin/register', async (request, reply) => {
    const { login, password, apiKey } = request.body || {};

    if (!login || !password || !apiKey) {
      reply.code(400).send({ error: 'Missing login, password or apiKey' });
      return;
    }

    if (apiKey !== API_KEY) {
      reply.code(401).send({ error: 'Invalid API key' });
      return;
    }

    try {
      const admin = await createAdmin(login, password);
      reply.code(201).send({
        message: 'Admin account created',
        admin: { id: admin.id, login: admin.login }
      });
    } catch (err) {
      fastify.log.error(err);
      if (err.message && err.message.includes('UNIQUE constraint failed')) {
        reply.code(409).send({ error: 'Login already exists' });
      } else {
        reply.code(500).send({ error: 'Failed to create admin' });
      }
    }
  });

  fastify.post('/admin/login', async (request, reply) => {
    const { login, password } = request.body || {};

    if (!login || !password) {
      reply.code(400).send({ error: 'Missing login or password' });
      return;
    }

    try {
      const admin = await verifyAdminCredentials(login, password);

      if (!admin) {
        reply.code(401).send({ error: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign(
        { adminId: admin.id, login: admin.login, role: 'admin' },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      reply.send({
        message: 'Login successful',
        token,
        admin: {
          id: admin.id,
          login: admin.login,
          role: 'admin'
        }
      });
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: 'Failed to login' });
    }
  });
}

module.exports = registerAdminAuthRoutes;
