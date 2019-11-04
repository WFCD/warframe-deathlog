'use strict';

const deathRegex = /^([0-9.]+) Game \[Info\]: ([^\r\n]+?) was killed by ([^\r\n]+?) damage ?(?:from (.*) using a (.*))?/i;
const playerNameRegex = /^([0-9.]+) Sys \[Info\]: Logged in ([^ ]+)/i;
// eslint-disable-next-line no-useless-escape
const startTimeRegex = /^([0-9.]+) Sys \[Diag\]: Current time: [^\[]+\[UTC: ([^\]]+)/i;
const sourceRegex = /from a (.*) using a (.*)/i;
const eomRegex = /^([0-9.]+).*Mission Complete Bonus: ([\d]+)/;
const closedRegex = /^([0-9.]+).*Main Shutdown Complete\.$/;
const sentRes = /^([0-9.]+).*Setting Sentinel state for (\w*) from \d to SS_ALIVE/;
const sentDie = /^([0-9.]+).*Setting Sentinel state for (\w*) from \d to SS_DEAD_SPACE/;

// Setting Sentinel state for Xaelroa from 0 to SS_DEAD_SPACE, 2759

module.exports = {
  deathRegex,
  playerNameRegex,
  startTimeRegex,
  sourceRegex,
  eomRegex,
  closedRegex,
  sentRes,
  sentDie,
};
