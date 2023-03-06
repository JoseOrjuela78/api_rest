require('dotenv').config();
const Server = require('./api/common/server');
const server = new Server();

server.listen();