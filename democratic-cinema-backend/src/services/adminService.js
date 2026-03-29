/*
 * Service functions for creating and authenticating admin accounts.
 */

const db = require('../database');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

function createAdmin(login, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      db.run(
        'INSERT INTO admins (login, password) VALUES (?, ?)',
        [login, passwordHash],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, login });
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

function findAdminByLogin(login) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM admins WHERE login = ?',
      [login],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null);
        }
      }
    );
  });
}

async function verifyAdminCredentials(login, password) {
  const admin = await findAdminByLogin(login);
  if (!admin) {
    return null;
  }

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) {
    return null;
  }

  return admin;
}

module.exports = {
  createAdmin,
  findAdminByLogin,
  verifyAdminCredentials
};
