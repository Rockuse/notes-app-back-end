class NotesHandler {
  constructor(service) {
    this._service = service;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNoteHandler = this.getNoteHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
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
        status: 'success',
        data: {
          notes,
        },
      };
    } catch (error) {
      return false;
    }
  }

  getNoteByIdHandler(request) {
    try {
      const { id } = request.params;
      const notes = this._service.getNoteById(id);
      return {
        status: 'success',
        data: {
          notes,
        },
      };
    } catch (error) {
      return false;
    }
  }

  putNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.editNoteById(id, request.payload);
      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message
      });
      response.code(404);
      return response
    }
  }

  deleteNoteByIdHandler(request,h) {
    try {
      const { id } = request.params;
      this._service.deleteNoteById(id);
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = NotesHandler;
