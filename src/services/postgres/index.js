const AuthService = require('./AuthService');
const NotesService = require('./NoteService');
const UserService = require('./UserService');
const CollaborationService = require('./CollaborationService');
const Exports = require('../rabbitmq/ProducesServices');
const Uploads = require('../storage/StorageService');

module.exports = [NotesService, UserService, AuthService, CollaborationService, Exports, Uploads];
