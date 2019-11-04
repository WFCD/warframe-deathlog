'use strict';

require('colors');
const makeTs = require('../makeTs');

class Event {
  constructor({ timestamp = 0, type = 'None' }) {
    this.ts = timestamp;
    this.innerType = type;

    this.useColors = process.env.DEATHLOG_USE_COLORS === '1' || true;
  }

  get type() {
    return this.innerType;
  }

  get timestamp() {
    return this.ts;
  }

  toString() {
    return this.useColors
      ? `${`[${makeTs(this.timestamp)}]`.grey} ${`[${this.type.toUpperCase()}]`.grey}`
      : `[${makeTs(this.timestamp)}] [${this.type.toUpperCase()}]`;
  }
}

module.exports = Event;
