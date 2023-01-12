const { nanoid } = require('nanoid');
// const notes = require('./notes');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNotes = {
      id, tags, title, body, createdAt, updatedAt,
    };
    this._notes.push(newNotes);
    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;
    if (!isSuccess) {
      throw new Error('Catatan gagal ditambahkan');
    }
    return id;
  }

  getNote() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((n) => n.id === id)[0];
    return note;
  }

  editNoteById(id, { title, body, tags }) {
    const index = this._notes.findIndex((n) => n.id === id);
    if (index === -1) {
      throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
    }
    const updatedAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      body,
      tags,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
