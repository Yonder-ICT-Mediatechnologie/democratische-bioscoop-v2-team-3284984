/*
 * Service layer responsible for communicating with the upstream
 * movie API.  Each function encapsulates a single remote request
 * and handles common behaviours such as constructing URLs,
 * serialising payloads and error handling.
 */

const { REMOTE_SERVER, API_KEY } = require('../config');

// Determine the appropriate fetch implementation.  Node 18+ ships
// with a global fetch API.  If it's unavailable (e.g. older Node
// versions) fall back to the undici polyfill.  This lazy import
// avoids pulling undici unless required.
let fetchFn;
if (typeof fetch === 'function') {
  fetchFn = fetch;
} else {
  fetchFn = (...args) => import('undici').then(m => m.fetch(...args));
}

/**
 * Retrieve all films from the remote service.
 *
 * @returns {Promise<any>} The list of films as a JSON object.
 */
async function getFilms() {
  const response = await fetchFn(`${REMOTE_SERVER}/list/${API_KEY}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch film list: ${response.status}`);
  }
  return response.json();
}

/**
 * Retrieve details about a specific film.
 *
 * @param {string} idFilm Identifier of the film to fetch
 * @returns {Promise<any>} The film details as a JSON object
 */
async function getFilmDetails(idFilm) {
  const url = `${REMOTE_SERVER}/details/${encodeURIComponent(idFilm)}/${API_KEY}`;
  const response = await fetchFn(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch film details for ${idFilm}: ${response.status}`);
  }
  return response.json();
}

/**
 * Create or update a film via the remote service.  The upstream API
 * uses the same endpoint for both operations; if an `id` or
 * `idFilm` field is present the service may interpret the request
 * as an update.
 *
 * @param {object} data Film data to send to the remote API
 * @returns {Promise<any>} The created or updated film representation
 */
async function postFilmData(data = {}) {
  // Clone the payload to avoid side effects and attach the API key
  const payload = { ...data, apikey: API_KEY };
  const response = await fetchFn(`${REMOTE_SERVER}/add/${API_KEY}`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Failed to add/update film: ${response.status}`);
  }
  return response.json();
}

/**
 * Submit an up‑vote for a given film.
 *
 * @param {string} idFilm Identifier of the film to vote for
 * @returns {Promise<any>} The remote service response as JSON
 */
async function voteUp(idFilm) {
  const response = await fetchFn(`${REMOTE_SERVER}/voteup/${encodeURIComponent(idFilm)}/${API_KEY}`, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  if (!response.ok) {
    throw new Error(`Failed to vote for film ${idFilm}: ${response.status}`);
  }
  return response.json();
}

/**
 * Delete a film from the remote service.
 *
 * @param {string} idFilm Identifier of the film to delete
 * @returns {Promise<any>} The remote service response as JSON
 */
async function deleteFilm(idFilm) {
  const response = await fetchFn(`${REMOTE_SERVER}/delete/${encodeURIComponent(idFilm)}/${API_KEY}`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  if (!response.ok) {
    throw new Error(`Failed to delete film ${idFilm}: ${response.status}`);
  }
  return response.json();
}

module.exports = {
  getFilms,
  getFilmDetails,
  postFilmData,
  voteUp,
  deleteFilm
};