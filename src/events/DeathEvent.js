'use strict';

require('colors');
const getString = require('../getString');

const { deathRegex } = require('../regex');

const UKS = 'unknown source';

// eslint-disable-next-line global-require
class DeathEvent extends require('./BaseEvent') {
  constructor(line, startTime) {
    super({ timestamp: 0, type: 'Death' });
    const matches = line.match(deathRegex);
    const timestamp = startTime.getTime() > 0
      ? startTime.getTime() + (parseFloat(matches[1]) * 1000)
      : matches[1];

    this.ts = timestamp;
    [,, this.victim, this.damage] = matches;
    this.damage = this.damage.split(' / ');

    this.health = 'unknown';
    if (this.damage.length > 1) {
      const [health, damage] = this.damage;
      this.health = health;
      this.damage = damage;
    }
    this.source = matches[4] ? matches[4] : UKS;
    this.weapon = getString(this.source === UKS ? '' : matches[5]);
    this.damage = this.damage instanceof Array ? this.damage[0] : this.damage;
  }

  toString() {
    let victim;
    let damage;
    let health;
    let source;
    let weapon;

    if (this.useColors) {
      victim = this.victim.yellow;
      damage = this.damage.red;
      source = this.source.blue;
      weapon = this.weapon ? this.weapon.magenta : '';
      health = this.health.green;
    } else {
      victim = this.victim;
      damage = this.damage;
      source = this.source;
      weapon = this.weapon;
      health = this.health;
    }

    const sa = this.source === UKS ? 'an ' : '';
    const wpStr = this.source === UKS ? '' : ` using a ${weapon}`;

    return `${super.toString()} - ${victim} took ${damage} damage at ${health} heath from ${sa}${source}${wpStr}`;
  }
}

module.exports = DeathEvent;
