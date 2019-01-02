'use strict';

const chatroom = require('../chatroom.js');
const events = require('./events.js');
const logger = require('./logger.js');

const socketPool = {};

events.on('emitting-socket', dispatchAction);

/**
 *
 *
 * @param {*} buffer
 * @param {*} userId
 * @param {*} socketPool
 * @param {*} socketArray
 */
function dispatchAction(buffer, userId, socketPool, socketArray) {
  // console.log(socketPool);
  parse(buffer, userId, socketPool, socketArray);
}

/**
 *
 *
 * @param {*} buffer
 * @param {*} userId
 * @param {*} socketPool
 * @param {*} socketArray
 */
let parse = (buffer, userId, socketPool, socketArray) => {
  // console.log('buffer:', buffer);
  events.emit('parse-buffer', buffer, userId, socketPool, socketArray);
};


module.exports = {dispatchAction, parse};