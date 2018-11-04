'use strict';

const { playerNameRegex, startTimeRegex } = require('./regex');

const calcWithOffset = d => new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000);

const makeStart = (lines) => {
  let playerName = '';
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
      [,, playerName] = pnRes;
      pnSet = true;
    }
    if (!stSet && stRes && stRes.length) {
      [,, startTime] = stRes;
      stSet = true;
    }
  });
  if (!startTime) startTime = 0;
  else startTime = calcWithOffset(new Date(startTime));

  playerName.trim();

  return { playerName, startTime };
};

module.exports = makeStart;
