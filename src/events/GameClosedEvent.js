'use strict';

require('colors');

const { closedRegex } = require('../regex');

// eslint-disable-next-line global-require
class GameClosedEvent extends require('./BaseEvent') {
  constructor(line, startTime) {
    super({ timestamp: 0, type: 'CLOSE' });
    const matches = line.match(closedRegex);
    const timestamp = startTime.getTime() > 0
      ? startTime.getTime() + (parseFloat(matches[0]) * 1000)
      : matches[0];

    this.ts = timestamp;
  }

  toString() {
    return `${super.toString()} - Game Closed`;
  }
}

module.exports = GameClosedEvent;
