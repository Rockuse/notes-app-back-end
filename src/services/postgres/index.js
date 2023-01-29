const AuthService = require('./AuthService');
const NotesService = require('./NoteService');
const UserService = require('./UserService');
const CollaborationService = require('./CollaborationService');

module.exports = [NotesService, UserService, AuthService, CollaborationService];
