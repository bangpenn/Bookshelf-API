const Hapi = require('@hapi/hapi');
const bookRoutes = require('./routes/bookRoutes');

const startServer = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(bookRoutes);

  await server.start();
  console.log(`The server is running at ${server.info.uri}`);
};

startServer();
