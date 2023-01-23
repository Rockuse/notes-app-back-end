const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema } = require('./schema');

module.exports = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
