const { nanoid } = require('nanoid');
const notes = require('./notes');

function addNoteHandler(req, h) {
  const { tags, title, body } = req.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNotes = {
    tags, title, body, id, createdAt, updatedAt,
  };
  notes.push(newNotes);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
}
function getAllNotesHandler(req, h) {
  const response = h.response({
    status: 'success',
    message: 'Catatan ditampilkan',
    data: { notes },
  });
  return response;
}
function getNoteByIdHandler(req, h) {
  const { id } = req.params;
  const note = notes.filter((i) => i.id === id)[0];
  if (note !== undefined) {
    const response = h.response({
      status: 'success',
      message: 'Catatan ditampilkan',
      data: { note },
    });
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(404);
  return response;
}

function editNoteByIdHandler(req, h) {
  const { id } = req.params;
  const { tags, title, body } = req.payload;
  const index = notes.findIndex((i) => i.id === id);
  if (index >= 0) {
    notes[index] = {
      ...notes[index],
      tags,
      title,
      body,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diubah',
      body: notes[index],
    });
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal diubah, id tidak ditemukan',
  });
  response.code(500);
  return response;
}
function deleteNoteByIdHandler(req, h) {
  const { id } = req.params;
  const index = notes.findIndex((i) => i.id === id);
  if (index >= 0) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus',
  });
  response.code(500);
  return response;
}

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
