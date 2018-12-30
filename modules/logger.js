'use strict';

const chatroom = require('../chatroom.js');
const events = require('./events.js');
const app = require('./app.js');

const commands = {};

events.on('accept-entry', dispatchCommand);
events.on('parse-buffer', parseBuffer);


function parseBuffer(buffer, userId, socketPool) {
  console.log('Buffer', buffer.toString());
  let text = buffer.toString().trim();
  if ( !text.startsWith('@') ) { return null; }
  let [command,payload] = text.split(/\s+(.*)/);
  let [target,message] = payload.split(/\s+(.*)/);
  events.emit('accept-entry', {command,payload,target,message}, userId, socketPool);
}

function dispatchCommand(entry, userId, socketPool) {
  // console.log('I am in dispatchCommand', entry);
  console.log('In dispatchCommand', entry.command);
  if ( entry && typeof commands[entry.command] === 'function' ) {
    commands[entry.command](entry, userId, socketPool);
  }
}

commands['@all'] = (data, userId, socketPool) => {
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
  }
};

commands['@nick'] =  (data, userId, socketPool) => {
  socketPool[userId].nickname = data.target;
};

module.export = {dispatchCommand, parseBuffer};