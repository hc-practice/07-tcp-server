'use strict';

const socketPool = require('../lib/socket-pool');
const events = require('../lib/events');

let sendMessage = (data, userId) => {
  for(let connection in socketPool) {
    let user = socketPool[connection];
    user.socket && user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
  }
};

let systemMessage = (message) => {
  for(let connection in socketPool) {
    let user = socketPool[connection];
    user.socket && user.socket.write(`<system>: ${message}\n`);
  }
};

events.on('@all', sendMessage);
events.on('@system', systemMessage);