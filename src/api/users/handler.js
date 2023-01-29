const autoBind = require('auto-bind');
const ClientError = require('../../exceptions/ClientError');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postUser(request, h) {
    this._validator.validateUserPayload(request.payload);
    const { username, password, fullname } = request.payload;
    const id = await this._service.addUser({ username, password, fullname });
    const res = h.response({
      status: 'success',
      data: { userId: id },
      message: 'User berhasil ditambahkan',
    });
    res.code(201);
    return res;
  }

  async getUserById(request, h) {
    const { id } = request.params;
    const user = await this._service.getUserById(id);
    const res = h.response({
      status: 'success',
      data: { user },

    });
    return res;
  }

  async getUsersByUsernameHandler(request, h) {
    try {
      const { username = '' } = request.query;
      const users = await this._service.getUsersByUsername(username);
      return {
        status: 'success',
        data: {
          users,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }
}

module.exports = UsersHandler;
