'use strict';

// First Party Modules
const net = require('net');

// Third Party Modules
const uuid = require('uuid/v4');

const port = process.env.PORT || 3001;
const server = net.createServer();
const socketPool = {};
const commands = {};

const logger = require('./modules/logger.js');
const app = require('./modules/app.js');
const events = require('./modules/events.js');

let socketArray = [];

server.on('connection', (socket) => {
  let id = uuid();
  socketPool[id] = {
    id:id,
    nickname: `User-${id}`,
    socket: socket,
  };
  socketArray.push(socketPool[id].id);
  // console.log(socketArray);
  socket.on('data', (buffer) => events.emit('emitting-socket', buffer, id, socketPool));
  // console.log(socketPool[id].id);
});

events.on('quit', quitServer);

function quitServer(data, userId, socketPool) {
  console.log('in quitServer');
  server.close('connection', (cb) => {
    cb(console.log('user left'));
  });
}

server.listen(port, () => {
  console.log(`Chat Server up on ${port}`);
});

module.exports = {server, socketArray};