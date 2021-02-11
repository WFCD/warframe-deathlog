'use strict';

require('colors');

const { ammoRegex } = require('../regex');

// eslint-disable-next-line global-require
class RJAmmoEvent extends require('./BaseEvent') {
  constructor(line, startTime) {
    super({ timestamp: 0, type: 'RJAmmo' });

    const matches = line.match(ammoRegex);
    if (matches) {
      this.ts = startTime.getTime() > 0
        ? startTime.getTime() + (parseFloat(matches[1]) * 1000)
        : matches[1];
  
      this.innerAmmoType = matches[2];
      this.innerAmmoCnt = matches[3];
    } else {
      this.innerAmmoType = '--';
      this.innerAmmoCnt = '0';
    }
  }
  
  get ammoType() {
    return this.innerAmmoType;
  }
  
  get ammoCnt() {
    return this.innerAmmoCnt;
  }

  toString() {
    return this.useColors
      ? `${super.toString()} - ${this.ammoType.yellow} : ${this.ammoCnt.white} available`
      : `${super.toString()} - ${this.ammoType} : ${this.ammoCnt} available`;
  }
}

module.exports = RJAmmoEvent;
