const ClientError = require('./ClientError');

class AuthError extends ClientError {
  constructor(message) {
    super(`${message} AuthenticationError`, 401);
    this.name = 'AuthenticationError';
  }
}
module.exports = AuthError;
