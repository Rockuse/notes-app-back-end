const { nanoid } = require('nanoid');
const notes = require('./notes');

function addNoteHandler(req, h) {
  const { tags, title, body } = req.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNotes = {
    id, tags, title, body, createdAt, updatedAt,
  };
  notes.push(newNotes);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      error: false,
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
    error: true,
    status: 'error',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
}
function getAllNotesHandler() {
  return {
    status: 'success',
    data: {
      notes,
    },
  };
}
function getNoteByIdHandler(req, h) {
  const { id } = req.params;
  const note = notes.filter((item) => item.id === id)[0];
  if (note !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        note,
      },
    });
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
}

async function editNoteByIdHandler(req, h) {
  const { id } = req.params;
  const { tags, title } = req.payload;
  const updatedAt = new Date().toISOString();
  const index = await notes.findIndex((note) => note.id === id);
  //   console.log(notes[index],index);
  if (index !== -1) {
    notes[index].title = title;
    notes[index].tags = tags;
    notes[index].updatedAt = updatedAt;
    // notes[index] = {
    //   ...notes[index],
    //   title,
    //   tags,
    //   body,
    //   updatedAt,
    // };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
      body: { note: notes[index] },

    });

    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    statusCode: 404,
  });
  return response;
}
function deleteNoteByIdHandler(req, h) {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus,id tidak ditemukan',
  });
  response.code(404);
  return response;
}

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
