'use strict';

const chatroom = require('../chatroom.js');
const events = require('./events.js');
const app = require('./app.js');
const commands = require('./commands.js');

events.on('accept-entry', dispatchCommand);
events.on('parse-buffer', parseBuffer);

function parseBuffer(buffer, userId, socketPool, socketArray) {
  // console.log('Buffer', buffer.toString());
  let text = buffer.toString().trim();
  if ( !text.startsWith('@') ) { return null; }
  let [command,payload] = text.split(/\s+(.*)/);
  let [target,message] = payload.split(/\s+(.*)/);
  events.emit('accept-entry', {command,payload,target,message}, userId, socketPool, socketArray);
}

function dispatchCommand(entry, userId, socketPool, socketArray) {
  // console.log('I am in dispatchCommand', entry);
  // console.log('In dispatchCommand', entry.command);
  if ( entry && typeof commands.commands[entry.command] === 'function' ) {
    commands.commands[entry.command](entry, userId, socketPool, socketArray);
  }
}

module.export = {dispatchCommand, parseBuffer};