'use strict';

const chatroom = require('../chatroom.js');
const events = require('./events.js');
const logger = require('./logger.js');

const socketPool = {};

events.on('emitting-socket', dispatchAction);

function dispatchAction(buffer, userId, socketPool, socketArray) {
  // console.log(socketPool);
  parse(buffer, userId, socketPool, socketArray);
}

let parse = (buffer, userId, socketPool, socketArray) => {
  // console.log('buffer:', buffer);
  events.emit('parse-buffer', buffer, userId, socketPool, socketArray);
};


module.exports = {dispatchAction, parse};