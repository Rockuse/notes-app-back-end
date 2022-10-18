const { nanoid } = require("nanoid")
const notes = require('./notes')
function addNoteHandler(req, h) {
    const { tags, title, body } = req.payload
    const id = nanoid(16)
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNotes = { tags, title, body, id, createdAt, updatedAt }
    notes.push(newNotes)
    const isSuccess = notes.filter((note) => { note.id === id }).length > 0
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            },
        });
        response.code(201);
        return response
    }
    const response = h.response({
        status: 'error',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response
}

module.exports = { addNoteHandler }