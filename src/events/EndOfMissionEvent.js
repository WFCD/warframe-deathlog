'use strict';

require('colors');

const { eomRegex } = require('../regex');

// eslint-disable-next-line global-require
class EndOfMissionEvent extends require('./BaseEvent') {
  constructor(line, startTime) {
    super({ timestamp: 0, type: ' EOM ' });
    const matches = line.match(eomRegex);
    const timestamp = startTime.getTime() > 0
      ? startTime.getTime() + (parseFloat(matches[0]) * 1000)
      : matches[0];

    [, this.credits] = matches;
    this.credits = String(Number.parseFloat(this.credits).toFixed(0));
    this.ts = timestamp;
  }

  toString() {
    const credits = this.useColors ? this.credits.green : this.credits;
    return `${super.toString()} - Reward: ${credits}cr`;
  }
}

module.exports = EndOfMissionEvent;
