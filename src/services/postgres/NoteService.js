const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBToModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyNoteOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Resource yang Anda minta tidak ditemukan');
    }

    const note = result.rows[0];

    if (note.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async addNote({
    title, body, tags, owner,
  }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, body, tags, createdAt, updatedAt, owner],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getNotes() {
    const result = await this._pool.query('select * from notes');
    return result.rows.map(mapDBToModel);
  }

  async getNoteById(id) {
    const query = {
      text: 'SELECT * from notes WHERE ID=$1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }
    return result.rows.map(mapDBToModel)[0];
  }

  async editNoteById(id, { title, body, tags }) {
    try {
      const updatedAt = new Date().toISOString();
      const query = {
        text: 'UPDATE notes set title=$2,body=$3,tags=$4,updated_at=$5 where id=$1 RETURNING id',
        values: [id, title, body, tags, updatedAt],
      };
      const result = await this._pool.query(query);
      if (!result.rows.length) {
        throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
      }
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }

  async deleteNoteById(id) {
    try {
      const query = {
        text: 'DELETE FROM notes where id=$1 RETURNING id',
        values: [id],
      };
      const result = await this._pool.query(query);
      if (!result.rows.length) {
        throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
      }
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }
}

module.exports = NotesService;
