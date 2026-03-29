/*
 * Configuration values for the server.
 */

const REMOTE_SERVER = 'https://project-bioscoop-restservice.azurewebsites.net';
const API_KEY = 'vJFbfeP_cpMYsH9l5BVHY23Ss';
const ADMIN_TOKEN = 'change_this_token_for_real_use';
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_jwt_secret_for_real_use';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

module.exports = {
  REMOTE_SERVER,
  API_KEY,
  ADMIN_TOKEN,
  JWT_SECRET,
  JWT_EXPIRES_IN
};
