'use strict';

const { deathRegex, sourceRegex } = require('./regex');
const makeTs = require('./makeTs');

const deathLineProcess = (line, { startTime, colors, useColors }) => {
  if (!deathRegex.test(line)) return '';

  const matches = line.match(deathRegex);
  const timestamp = startTime.getTime() > 0
    ? startTime.getTime() + (parseFloat(matches[1]) * 1000)
    : matches[1];
  const ts = makeTs(timestamp);
  const victim = matches[2];
  let damage = matches[3].split(' / ');
  let health = 'unknown';
  if (damage.length > 1) {
    [health, damage] = damage;
  }
  const source = matches[4] ? matches[4] : 'from a unknown source';
  const ms = source.match(sourceRegex);
  const [, enemy, weapon] = ms && ms.length ? ms : ['', 'unknown source'];

  damage = damage instanceof Array ? damage[0] : damage;
  if (useColors) {
    return `${colors.grey(`[${ts}]`)} ${colors.grey('[DEATH]')} - ${colors.yellow(victim)} took ${colors.red(damage)} damage at ${colors.green(health)} heath from a${enemy === 'unknown source' ? 'n' : ''} ${colors.blue(enemy)}${enemy === 'unknown source' ? '' : ` using a ${colors.magenta(weapon)}`}`;
  }
  return `[${ts}] [DEATH] - ${victim} took ${damage} damage at ${health} heath from a${enemy === 'unknown source' ? 'n' : ''} ${enemy}${enemy === 'unknown source' ? '' : ` using a ${weapon}`}`;
};

module.exports = deathLineProcess;
