'use strict';

const chatroom = require('../chatroom.js');
const events = require('./events.js');
const app = require('./app.js');

const commands = {};

commands['@all'] = (data, userId, socketPool) => {
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
  }
};
  
commands['@nick'] =  (data, userId, socketPool) => {
  socketPool[userId].nickname = data.target;
};
  
commands['@quit'] = (data, userId, socketPool) => {
  events.emit('quit', data, userId, socketPool);
};
  
commands['@list'] = (data, userId, socketPool) => {
  console.log(chatroom.socketArray);
};

module.exports = {commands};