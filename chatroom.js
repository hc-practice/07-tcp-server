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

server.on('connection', (socket) => {
  let id = uuid();
  socketPool[id] = {
    id:id,
    nickname: `User-${id}`,
    socket: socket,
  };
  socket.on('data', (buffer) => dispatchAction(id, buffer));
});

// let parse = (buffer) => {
//   let text = buffer.toString().trim();
//   if ( !text.startsWith('@') ) { return null; }
//   let [command,payload] = text.split(/\s+(.*)/);
//   let [target,message] = payload.split(/\s+(.*)/);
//   return {command,payload,target,message};
// };

events.on('accept-buffer', acceptBuffer);

let entry;

function acceptBuffer ({command,payload,target,message}){
  entry = {command,payload,target,message};
  return entry;
}

let dispatchAction = (userId, buffer) => {
  app.parse(buffer);
  console.log('entry', entry);
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

server.listen(port, () => {
  console.log(`Chat Server up on ${port}`);
});
