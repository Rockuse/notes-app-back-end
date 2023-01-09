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
    const note = this._notes.filter((n) => n.id === id);
    return note;
  }

  editNoteById(id) {
    const index = this._notes.findIndex((n) => n.id = id);
    this._notes[index]
  }

  deleteNoteById(id) {

  }
}

module.exports = NotesService;
