'use strict';

require('colors');
const getString = require('../getString');

const { enemySpawnRegex } = require('../regex');

// eslint-disable-next-line global-require
class EnemySpawn extends require('./BaseEvent') {
  constructor(line, startTime) {
    super({ timestamp: 0, type: 'SPAWN' });

    const matches = line.match(enemySpawnRegex);
    if (matches) {
      this.ts = startTime.getTime() > 0
        ? startTime.getTime() + (parseFloat(matches[1]) * 1000)
        : matches[1];
  
      this.innerEnemy = getString(matches[2]);
    } else {
      this.innerEnemy = '--';
    }
  }
  
  get enemy() {
    return this.innerEnemy;
  }

  toString() {
    return this.useColors
      ? `${super.toString()} - ${this.enemy.red} spawned!`
      : `${super.toString()} - ${this.enemy} spawned!`;
  }
}

module.exports = EnemySpawn;
