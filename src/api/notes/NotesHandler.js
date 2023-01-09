class NotesHandler {
  constructor(service) {
    this._service = service;
  }

  postNoteHandler(req, h) {
    try {
      const { title = 'untitled', body, tags } = req.payload;
      const noteId = this._service.addNote({ title, body, tags });
      const res = h.response({
        status: 'success',
        message: 'Catatan berhasil disimpan',
        data: {
          noteId,
        },
      });
      res.code(201);
      return res;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  getNoteHandler() {
    try {
      const notes = this._service.getNote();
      return {
        status: 'success',
        data: {
          notes,
        },
      };
    }
    } catch (error) {
      return false;
    }
  }

  getNoteByIdHandler() {
  }

  putNoteByIdHandler() {
  }

  deleteNoteByIdHandler() {

  }
}

module.exports = NotesHandler;
