'use strict';

const chatroom = require('../chatroom.js');
const events = require('./events.js');
const app = require('./app.js');

const commands = {};

/**
 *
 *
 * @param {*} data
 * @param {*} userId
 * @param {*} socketPool
 */
commands['@all'] = (data, userId, socketPool) => {
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
  }
};
  
/**
 *
 *
 * @param {*} data
 * @param {*} userId
 * @param {*} socketPool
 */
commands['@nick'] =  (data, userId, socketPool) => {
  socketPool[userId].nickname = data.target;
};
  
/**
 *
 *
 * @param {*} data
 * @param {*} userId
 * @param {*} socketPool
 */
commands['@quit'] = (data, userId, socketPool) => {
  events.emit('quit', data, userId, socketPool);
};
  
/**
 *
 *
 * @param {*} data
 * @param {*} userId
 * @param {*} socketPool
 * @param {*} socketArray
 */
commands['@list'] = (data, userId, socketPool, socketArray) => {
  let userList = socketArray;
  console.log(userList);
};

/**
 *
 *
 * @param {*} data
 * @param {*} userId
 * @param {*} socketPool
 * @param {*} socketArray
 */
commands['@dm'] = (data, userId, socketPool, socketArray) => {
  events.emit('dm', data, userId, socketPool, socketArray);
};

module.exports = {commands};