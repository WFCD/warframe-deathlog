'use strict';

require('colors');

const { arbiLocationRegex } = require('../regex');

// eslint-disable-next-line global-require
class ArbitrationMod extends require('./BaseEvent') {
  constructor(line, startTime) {
    super({ timestamp: 0, type: 'ARBI' });

    const matches = line.match(arbiLocationRegex);
    if (matches) {
      this.ts = startTime.getTime() > 0
        ? startTime.getTime() + (parseFloat(matches[1]) * 1000)
        : matches[1];
  
      this.innerLocation = matches[2];
    } else {
      this.innerLocation = '--';
    }
  }
  
  get location() {
    return this.innerLocation;
  }

  toString() {
    return this.useColors
      ? `${super.toString()} - appeared at ${this.location.cyan}`
      : `${super.toString()} - appeared at ${this.location}`;
  }
}

module.exports = ArbitrationMod;
