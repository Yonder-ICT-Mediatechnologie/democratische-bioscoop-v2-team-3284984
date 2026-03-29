/*
 * Defines administrative API endpoints.  These routes allow
 * privileged clients to create, update and delete films.  The
 * verifyAdmin pre-handler ensures only authorised requests can
 * access them.
 */

const {
  postFilmData,
  deleteFilm
} = require('../services/filmService');
const verifyAdmin = require('../middleware/verifyAdmin');

/**
 * Register admin routes on the provided Fastify instance.
 *
 * @param {import('fastify').FastifyInstance} fastify
 */
function registerAdminRoutes(fastify) {
  // Create a new film
  fastify.post('/films', { preHandler: verifyAdmin }, async (request, reply) => {
    const data = request.body;
    if (typeof data !== 'object' || data === null) {
      reply.code(400).send({ error: 'Invalid film data' });
      return;
    }
    try {
      const result = await postFilmData(data);
      reply.code(201).send(result);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: err.message });
    }
  });

  // Update an existing film
  fastify.put('/films/:id', { preHandler: verifyAdmin }, async (request, reply) => {
    const { id } = request.params;
    const data = request.body;
    if (typeof data !== 'object' || data === null) {
      reply.code(400).send({ error: 'Invalid film data' });
      return;
    }
    // Merge the id into the payload for the remote service.  Depending on
    // the remote API an id property (id or idFilm) may be required to
    // trigger an update.
    const payload = { idFilm: id, ...data };
    try {
      const result = await postFilmData(payload);
      reply.send(result);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: err.message });
    }
  });

  // Delete a film by id
  fastify.delete('/films/:id', { preHandler: verifyAdmin }, async (request, reply) => {
    const { id } = request.params;
    try {
      const result = await deleteFilm(id);
      reply.send(result);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: err.message });
    }
  });
}

module.exports = registerAdminRoutes;