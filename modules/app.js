'use strict';

const chatroom = require('../chatroom.js');
const events = require('./events.js');
const logger = require('./logger.js');


let dispatchAction = (userId, buffer) => {
  parse(buffer);
};

let parse = (buffer) => {
  // console.log('buffer:', buffer);
  events.emit('parse-buffer', buffer);
};



module.exports = {dispatchAction, parse};