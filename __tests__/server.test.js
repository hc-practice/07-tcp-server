'use strict';

const chatroom = require('../chatroom.js');
const events = require('../modules/events.js');
const logger = require('../modules/logger.js');
const commands = require('../modules/commands.js');
const app = require('../modules/app.js');


describe('parse function', () => {
  it('takes in socketPool', () => {
    let spy = jest.spyOn(chatroom.socketPool);
    expect(spy).toHaveBeenCalled();
  });
});

describe('dispatchAction function', () => {
  it('takes in socketPool', () => {
    let spy = jest.spyOn(chatroom.socketPool);
    expect(spy).toHaveBeenCalled();
  });
});

describe('parseBuffer function', () => {
  it('takes in socketPool', () => {
    let spy = jest.spyOn(chatroom.socketPool);
    expect(spy).toHaveBeenCalled();
  });
});

describe('dispatchCommand function', () => {
  it('takes in socketPool', () => {
    let spy = jest.spyOn(chatroom.socketPool);
    expect(spy).toHaveBeenCalled();
  });
});

describe('@dm action', () => {

  it('sends nothing if the target user is not valide', () => {
    let commandObject = {
      command:'@dm',
      target:'nobody',
      message:'Hello',
    };
    logger.dm(commandObject, 1);
    expect(chatroom.socketPool.write).not.toHaveBeenCalled();
  });

  it('sends a message to a valid user', () => {
    let commandObject = {
      command:'@dm',
      target:'two',
      message:'Hello',
    };
    logger.dm(commandObject, 1);
    expect(chatroom.socketPool.write).toHaveBeenCalled();
  });

});

