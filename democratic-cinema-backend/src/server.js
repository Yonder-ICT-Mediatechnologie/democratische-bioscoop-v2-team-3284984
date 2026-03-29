/*
 * Entry point for the modularised Fastify server.  This file
 * initialises the framework, registers plugins and routes and
 * starts listening for incoming connections.  Keeping this file
 * slim makes it easy to see how the application is wired together.
 */

const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// Import route registration functions
const registerPublicRoutes = require('./routes/public');
const registerAdminRoutes = require('./routes/admin');
const registerAdminAuthRoutes = require('./routes/adminAuth');

/**
 * Build and configure the Fastify server.  Registers CORS and
 * attaches all route definitions.  Returns a promise that
 * resolves when the server is ready.
 */
async function buildServer() {
  // Enable CORS to allow cross‑origin requests.  Adjust the
  // configuration as needed (origins, methods, headers etc.).
  await fastify.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-admin-token']
  });

  // Attach public and admin routes.  The order does not matter
  // because Fastify matches routes by path and method.
  registerPublicRoutes(fastify);
  registerAdminRoutes(fastify);
  // Attach admin authentication routes (registration and login)
  registerAdminAuthRoutes(fastify);
}

// Initialise the server and begin listening for requests.  The
// default port is 3000 but can be overridden by the PORT
// environment variable.  Fastify logs the address once
// successfully listening.
buildServer()
  .then(() => {
    const port = process.env.PORT || 3000;
    fastify.listen({ port, host: '0.0.0.0' }, (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      fastify.log.info(`Server listening at ${address}`);
    });
  })
  .catch(err => {
    fastify.log.error(err);
    process.exit(1);
  });