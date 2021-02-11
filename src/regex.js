'use strict';

module.exports = {
  deathRegex: /^([0-9.]+) Game \[Info\]: ([^\r\n]+?) was killed by ([^\r\n]+?) damage ?(?:from (.*) using a (.*))?/i,
  playerNameRegex: /^([0-9.]+) Sys \[Info\]: Logged in ([^ ]+)/i,
  startTimeRegex: /^([0-9.]+) Sys \[Diag\]: Current time: [^\[]+\[UTC: ([^\]]+)/i,
  sourceRegex: /from a (.*) using a (.*)/i,
  eomRegex: /^([0-9.]+).*Mission Complete Bonus: ([\d]+)/,
  closedRegex: /^([0-9.]+).*Main Shutdown Complete\.$/,
  sentRes: /^([0-9.]+).*Setting Sentinel state for (\w*) from \d to SS_ALIVE/,
  sentDie: /^([0-9.]+).*Setting Sentinel state for (\w*) from \d to SS_DEAD_SPACE/,
  ammoRegex: /^([0-9.]+).*Sys \[Info\]: \/Lotus\/Weapons\/CrewShip\/((?:(?:Missiles|Laser)\/)?\w*) : (\d+)/,
  arbiModRegex: /^([0-9.]+).*Script \[Info\]: Background.lua: EliteAlert: generated boosts for (?:[^\r\n]+?): suitType=([^\r\n]+?) wepType=([^\r\n]+)/,
  arbiLocationRegex: /^([0-9.]+).*Script \[Info\]: Background.lua: EliteAlertMision at (.*)/,
  enemySpawnRegex: /^([0-9.]+).*AI \[Info\]: OnAgentCreated ([^\r\n ]+)/,
};
