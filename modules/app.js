'use strict';

const chatroom = require('../chatroom.js');
const events = require('./events.js');
const logger = require('./logger.js');
const socketPool = {};
const commands = {};


chatroom.server.on('connection', (socket) => {
  let id = chatroom.uuid();
  socketPool[id] = {
    id:id,
    nickname: `User-${id}`,
    socket: socket,
  };
  socket.on('data', (buffer) => dispatchAction(id, buffer));
});

let dispatchAction = (userId, buffer) => {
  parse(buffer);
};

events.on('accept-entry', dispatchCommand);

let dispatchCommand = ({command,payload,target,message}) => {
  let entry = {command,payload,target,message};
  
  if ( entry && typeof commands[entry.command] === 'function' ) {
    commands[entry.command](entry, userId);
  }
};

commands['@all'] =  (data, userId) => {
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
  }
};

commands['@nick'] =  (data, userId) => {
  socketPool[userId].nickname = data.target;
};


let parse = (buffer) => {
  // console.log('buffer:', buffer);
  events.emit('parse-buffer', buffer);
};



module.exports = {dispatchAction, parse};