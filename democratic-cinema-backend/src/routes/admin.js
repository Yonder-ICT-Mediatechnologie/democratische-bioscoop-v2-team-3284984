/*
 * Defines administrative API endpoints. These routes allow
 * privileged clients to create, update and delete films. The
 * verifyAdmin pre-handler ensures only authorised requests can
 * access them.
 */

const {
  postFilmData,
  deleteFilm,
  getFilmDetails
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

  // Update an existing film via delete + recreate
  fastify.put('/films/:id', { preHandler: verifyAdmin }, async (request, reply) => {
    const { id } = request.params;
    const data = request.body;

    if (typeof data !== 'object' || data === null) {
      reply.code(400).send({ error: 'Invalid film data' });
      return;
    }

    try {
      const detailsResponse = await getFilmDetails(id);
      const oldFilm = Array.isArray(detailsResponse) ? detailsResponse[0] : detailsResponse;

      if (!oldFilm) {
        reply.code(404).send({ error: 'Film not found' });
        return;
      }

      const recreatedPayload = {
        title: data.title ?? oldFilm.title ?? '',
        description: data.description ?? oldFilm.description ?? '',
        category: data.category ?? oldFilm.category ?? '',
        url_trailer: data.url_trailer ?? oldFilm.url_trailer ?? '',
        url_image: data.url_image ?? oldFilm.url_image ?? '',
        votes: oldFilm.votes ?? 0,
        timestamp: oldFilm.timestamp ?? Date.now(),
        date: oldFilm.date ?? Date.now()
      };

      // safer order: create first, then delete old one
      const createdFilm = await postFilmData(recreatedPayload);
      await deleteFilm(id);

      reply.send({
        message: 'Film updated successfully',
        oldId: id,
        film: createdFilm
      });
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