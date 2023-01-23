const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const AuthError = require('../../exceptions/AuthError');
const InvariantError = require('../../exceptions/InvariantError');

class AuthService {
  constructor() {
    this._pool = new Pool();
  }

  async addRefreshToken(token) {
    const query = {
      text: 'insert into authentications values($1)',
      values: [token],
    };
    await this._pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'select * from authentications where token=$1',
      values: [token],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Refresh token tidak valid');
    }
    // return result.rows[0].token;
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'delete from authentications where token=$1',
      values: [token],
    };
    await this._pool.query(query);
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new AuthError('Kredensial yang Anda berikan salah');
    }
    const { id, password: hashedPassword } = result.rows[0];
    const match = bcrypt.compare(password, hashedPassword);
    if (!match) {
      throw new AuthError('Kredensial yang Anda berikan salah');
    }
    return id;
  }
}

module.exports = AuthService;