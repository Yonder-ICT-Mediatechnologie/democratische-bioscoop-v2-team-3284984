/*
 * Defines public API endpoints that do not require authentication.
 * These routes expose operations for listing films, retrieving
 * details and voting for favourites.  Business logic and remote
 * calls are delegated to the service layer.
 */

const {
  getFilms,
  getFilmDetails,
  voteUp
} = require('../services/filmService');

/**
 * Register public routes on the provided Fastify instance.
 *
 * @param {import('fastify').FastifyInstance} fastify
 */
function registerPublicRoutes(fastify) {
  // List all films
  fastify.get('/films', async (_request, reply) => {
    try {
      const films = await getFilms();
      reply.send(films);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: err.message });
    }
  });

  // Get details for a specific film
  fastify.get('/films/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const details = await getFilmDetails(id);
      reply.send(details);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: err.message });
    }
  });

  // Vote for a film
  fastify.put('/films/:id/vote', async (request, reply) => {
    const { id } = request.params;
    try {
      const result = await voteUp(id);
      reply.send(result);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: err.message });
    }
  });
}

module.exports = registerPublicRoutes;