'use strict';

const events = require('./events.js');
const logger = require('./logger.js');

let parse = (buffer) => {
  // console.log('buffer:', buffer);
  events.emit('parse-buffer', buffer);
};



module.exports = {parse};