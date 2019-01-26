'use strict';

module.exports = (buffer) => {
  if( !Buffer.isBuffer(buffer) ) { return null; }
  let text = buffer.toString().trim();
  if( !text.startsWith('@') ) { return null; }
  let [command, payload] = text.split(/\s+(.*)/);
  let [target, message] = payload ? payload.split(/\s+(.*)/) : [null, null];
  return {command, payload, target, message};
};