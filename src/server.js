require('dotenv').config();
const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
const api = require('./api');
const ClientError = require('./exceptions/ClientError');
const Services = require('./services/postgres');
const validator = require('./validator');

async function init() {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  const arr = [];
  for (let i = 0; i < api.length; i += 1) {
    const element = {
      plugin: api[i],
      options: {
        service: new Services[i](),
        validator: validator[i],
      },
    };
    arr.push(element);
  }
  await server.register(arr);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;
    if (response instanceof Error) {
      // penanganan client error secara internal.
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue;
      }
      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }
    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });
  await server.start();
  console.log('server start');
}

init();
