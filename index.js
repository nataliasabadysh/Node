const startServer = require('./src/server');

const { port } = require('./config');
startServer(port);

// Второй валреант это

// const config = require('./config');
// startServer(config.port);

