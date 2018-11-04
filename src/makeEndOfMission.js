'use strict';

const makeTs = require('./makeTs');

const eomRegex = /^([0-9.]+).*Mission Complete Bonus: ([\d]+)/;

const makeEndOfMisionLine = (line, { colors, useColors, startTime }) => {
  if (!eomRegex.test(line)) return '';
  const matches = line.match(eomRegex)[0];
  const timestamp = startTime.getTime() > 0
    ? startTime.getTime() + (parseFloat(matches[0]) * 1000)
    : matches[0];
  const ts = makeTs(timestamp);

  const tag = '[ EOM ]';
  const credits = matches[1];
  if (useColors) {
    return `${colors.grey(`[${ts}]`)} ${colors.grey(tag)} Reward: ${colors.green(credits)} credits`;
  }
  return `[${ts}] ${tag} Reward: ${credits} credits`;
};

module.exports = makeEndOfMisionLine;
