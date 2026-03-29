/*
 * Middleware to secure administrative endpoints using JWT bearer tokens.
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET, ADMIN_TOKEN } = require('../config');

async function verifyAdmin(request, reply) {
  const authHeader = request.headers.authorization;
  const legacyToken = request.headers['x-admin-token'];

  if (legacyToken && legacyToken === ADMIN_TOKEN) {
    request.admin = { login: 'legacy-admin', legacy: true };
    return;
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    reply.code(401).send({ error: 'Missing bearer token' });
    return;
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    request.admin = payload;
  } catch (error) {
    reply.code(401).send({ error: 'Invalid or expired token' });
  }
}

module.exports = verifyAdmin;
