const Hapi = require('@hapi/hapi');
const users = require('../../Interfaces/http/api/users');
const config = require('../../Commons/config');
const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorMapper = require('../../Commons/exceptions/DomainErrorMapper');

const createServer = async (container) => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    debug: config.app.debug,
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      const mappedError = DomainErrorMapper.map(response);

      if (mappedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: mappedError.message,
        });
        newResponse.code(mappedError.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'There was an error on our side',
      });

      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });

  return server;
};

module.exports = createServer;
