'use strict';

require('colors');

const { playerNameRegex, startTimeRegex } = require('../regex');

const calcWithOffset = d => new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000);

const makeStart = (lines) => {
  let player = '';
  let pnSet = false;
  let startTime = '';
  let stSet = false;
  lines.forEach((line) => {
    if (pnSet && stSet) {
      return;
    }
    const pnRes = line.match(playerNameRegex);
    const stRes = line.match(startTimeRegex);
    if (!pnSet && pnRes && pnRes.length) {
      [,, player] = pnRes;
      pnSet = true;
    }
    if (!stSet && stRes && stRes.length) {
      [,, startTime] = stRes;
      stSet = true;
    }
  });
  if (!startTime) startTime = 0;
  else startTime = calcWithOffset(new Date(startTime));

  player.trim();

  return { player, startTime };
};

// eslint-disable-next-line global-require
class StartEvent extends require('./BaseEvent') {
  constructor(lines) {
    super({ timestamp: 0, type: 'Start' });

    const { player, startTime } = makeStart(lines);
    this.innerPlayer = player;
    this.ts = startTime;
  }

  get player() {
    return this.innerPlayer;
  }

  toString() {
    return this.useColors
      ? `${super.toString()} - ${this.player.yellow}`
      : `${super.toString()} - ${this.player}`;
  }
}

module.exports = StartEvent;
