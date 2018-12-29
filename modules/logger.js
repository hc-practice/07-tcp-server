'use strict';

const events = require('./events.js');
const app = require('./app.js');

events.on('parse-buffer', parseBuffer);

function parseBuffer(buffer) {
//   console.log('Buffer', buffer.toString());
  let text = buffer.toString().trim();
  if ( !text.startsWith('@') ) { return null; }
  let [command,payload] = text.split(/\s+(.*)/);
  let [target,message] = payload.split(/\s+(.*)/);
  events.emit('accept-entry', {command,payload,target,message});
}

module.export = {parseBuffer};