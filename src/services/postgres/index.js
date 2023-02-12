const AuthService = require('./AuthService');
const NotesService = require('./NoteService');
const UserService = require('./UserService');
const CollaborationService = require('./CollaborationService');
const Exports = require('../rabbitmq/ProducesServices');

module.exports = [NotesService, UserService, AuthService, CollaborationService, Exports];
