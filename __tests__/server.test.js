'use strict';

const chatroom = require('../chatroom.js');
const events = require('../modules/events.js');
const logger = require('../modules/logger.js');
const commands = require('../modules/commands.js');
const app = require('../modules/app.js');

// describe('dispatchAction function', () => {
//   it('test if dispatchAction is called', () => {
//     let action = app.dispatchAction();
//     expect(action).toHaveBeenCalled();
//   });
// });

describe('parse function', () => {
  it('takes in socketPool', () => {
    let spy = jest.spyOn(chatroom.socketPool);
    expect(spy).toHaveBeenCalled();
  });
});

