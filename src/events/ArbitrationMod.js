'use strict';

require('colors');
const getString = require('../getString');

const { arbiModRegex } = require('../regex');

// eslint-disable-next-line global-require
class ArbitrationMod extends require('./BaseEvent') {
  constructor(line, startTime) {
    super({ timestamp: 0, type: 'ARBI' });

    const matches = line.match(arbiModRegex);
    if (matches) {
      this.ts = startTime.getTime() > 0
        ? startTime.getTime() + (parseFloat(matches[1]) * 1000)
        : matches[1];
  
      this.innerFrame = getString(matches[2]);
      this.innerWeapon = getString(matches[3]);
    } else {
      this.innerFrame = '--';
      this.innerWeapon = '0';
    }
  }
  
  get frame() {
    return this.innerFrame;
  }
  
  get weapon() {
    return this.innerWeapon;
  }

  toString() {
    return this.useColors
      ? `${super.toString()} - ${this.frame.cyan} : ${this.weapon.green} now active!`
      : `${super.toString()} - ${this.frame} w/ ${this.weapon} now active!`;
  }
}

module.exports = ArbitrationMod;
