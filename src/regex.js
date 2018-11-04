'use strict';

const deathRegex = /^([0-9.]+) Game \[Info\]: ([^\r\n]+?) was killed by ([^\r\n]+?) damage ?([^\r\n]*)/i;
const playerNameRegex = /^([0-9.]+) Sys \[Info\]: Logged in ([^ ]+)/i;
// eslint-disable-next-line no-useless-escape
const startTimeRegex = /^([0-9.]+) Sys \[Diag\]: Current time: [^\[]+\[UTC: ([^\]]+)/i;
const sourceRegex = /from a ([\w ]*) using a ([\w]*)/i;

module.exports = {
  deathRegex,
  playerNameRegex,
  startTimeRegex,
  sourceRegex,
};
