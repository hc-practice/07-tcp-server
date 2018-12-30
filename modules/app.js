'use strict';

const chatroom = require('../chatroom.js');
const events = require('./events.js');
const logger = require('./logger.js');

const socketPool = {};

events.on('emitting-socket', dispatchAction);

function dispatchAction(buffer, userId, socketPool) {
  // console.log(socketPool);
  parse(buffer, userId, socketPool);
}

let parse = (buffer, userId, socketPool) => {
  // console.log('buffer:', buffer);
  events.emit('parse-buffer', buffer, userId, socketPool);
};


module.exports = {dispatchAction, parse};