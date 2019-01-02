'use strict';

const chatroom = require('../chatroom.js');
const events = require('./events.js');
const app = require('./app.js');
const commands = require('./commands.js');

events.on('accept-entry', dispatchCommand);
events.on('parse-buffer', parseBuffer);
events.on('quit', quitServer);
events.on('@dm', dmUser);

/**
 *
 *
 * @param {*} buffer
 * @param {*} userId
 * @param {*} socketPool
 * @param {*} socketArray
 * @returns
 */
function parseBuffer(buffer, userId, socketPool, socketArray) {
  // console.log('Buffer', buffer.toString());
  let text = buffer.toString().trim();
  if ( !text.startsWith('@') ) { return null; }
  let [command,payload] = text.split(/\s+(.*)/);
  let [target,message] = payload.split(/\s+(.*)/);
  events.emit('accept-entry', {command,payload,target,message}, userId, socketPool, socketArray);
}

/**
 *
 *
 * @param {*} entry
 * @param {*} userId
 * @param {*} socketPool
 * @param {*} socketArray
 */
function dispatchCommand(entry, userId, socketPool, socketArray) {
  // console.log('I am in dispatchCommand', entry);
  // console.log('In dispatchCommand', entry.command);
  if ( entry && typeof commands.commands[entry.command] === 'function' ) {
    commands.commands[entry.command](entry, userId, socketPool, socketArray);
  }
}

/**
 *
 *
 * @param {*} data
 * @param {*} userId
 * @param {*} socketPool
 */
function quitServer(data, userId, socketPool) {
  console.log('in quitServer');
  chatroom.server.close('connection', (cb) => {
    cb(console.log('user left'));
  });
}

/**
 *
 *
 * @param {*} data
 * @param {*} userId
 * @param {*} socketPool
 */
function dmUser(data, userId, socketPool) {
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    if ( user.nickname === data.target ) {
      user.socket.write(`    <<<${socketPool[userId].nickname}>>> ${data.message}\n`);
    }
  }
}

module.export = {dispatchCommand, parseBuffer};