'use strict';

const chatroom = require('../chatroom.js');
const events = require('./events.js');
const app = require('./app.js');

events.on('accept-entry', dispatchCommand);
events.on('parse-buffer', parseBuffer);

function parseBuffer(buffer) {
//   console.log('Buffer', buffer.toString());
  let text = buffer.toString().trim();
  if ( !text.startsWith('@') ) { return null; }
  let [command,payload] = text.split(/\s+(.*)/);
  let [target,message] = payload.split(/\s+(.*)/);
  events.emit('accept-entry', {command,payload,target,message});
}

function dispatchCommand({command,payload,target,message}) {
  let entry = {command,payload,target,message};
  console.log('I am in dispatchCommand', entry);
  
  if ( entry && typeof chatroom.commands[entry.command] === 'function' ) {
    chatroom.commands[entry.command](entry, userId);
  }
}

module.export = {dispatchCommand, parseBuffer};