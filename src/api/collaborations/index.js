const CollaborationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, { service, notesService, validator }) => {
    const collaborationsHandler = new CollaborationsHandler(
      service,
      notesService,
      validator,
    );
    server.route(routes(collaborationsHandler));
  },
};
