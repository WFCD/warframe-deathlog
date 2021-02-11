'use strict';

const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');
const EventEmitter = require('events');
const Start = require('./events/StartEvent');
const Death = require('./events/DeathEvent');
const EOM = require('./events/EndOfMissionEvent');
const GameClosed = require('./events/GameClosedEvent');
const Revived = require('./events/RevivedEvent');
const SentDead = require('./events/SentDeadEvent');
const AmmoEvent = require('./events/AmmoEvent');
const ArbitrationMod = require('./events/ArbitrationMod');
const ArbitrationSpawn = require('./events/ArbitrationSpawn');
const EnemySpawn = require('./events/EnemySpawn');

const {
  deathRegex, eomRegex, closedRegex, sentRes, sentDie, ammoRegex, arbiModRegex, arbiLocationRegex, enemySpawnRegex,
} = require('./regex');

const defaultLogPath = `${process.env.localappdata}\\Warframe\\EE.log`;
const runlines = [];

class DeathLogParser extends EventEmitter {
  // eslint-disable-next-line no-console
  constructor(logPath = defaultLogPath) {
    super();
    this.path = path.resolve(logPath);
  }

  // eslint-disable-next-line class-methods-use-this
  async update() {
    let file;
    try {
      file = await fs.readFileSync(defaultLogPath, 'utf8');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`${colors.red('[ERROR]')} Unable to read file: \n ${e}`);
    }

    if (!file) return;

    const lines = file.split('\r\n');
    let output = [];

    const sline = new Start(lines);

    if (!runlines.includes(sline.toString()) && sline.player.length) {
      runlines.push(sline.toString());
      output.push(sline);
    }
    
    const events = [];
    for (const line of lines) {
      let event;
      if (deathRegex.test(line)) {
        event = Death;
      } else if (eomRegex.test(line)) {
        event = EOM;
      } else if (closedRegex.test(line)) {
        event = GameClosed;
      } else if (sentRes.test(line)) {
        event = Revived;
      } else if (sentDie.test(line)) {
        event = SentDead;
      } else if (ammoRegex.test(line)) {
        event = AmmoEvent;
      } else if (arbiModRegex.test(line)) {
        event = ArbitrationMod;
      } else if (arbiLocationRegex.test(line)) {
        event = ArbitrationSpawn;
      } else if (enemySpawnRegex.test(line)) {
        event = EnemySpawn;
      }
      
      if (event) {
        event = new event(line, sline.timestamp);
        if (event.resolve) {
          await event.resolve();
        }
        events.push(event);
      }
    }
    events.filter(line => line && !output.includes(line.toString()))
      .forEach((line) => {
        if (!runlines.includes(line.toString())) {
          output.push(line);
          runlines.push(line.toString());
        }
      });

    output = [...new Set(output)];
    runlines.push(...output.map(o => o.toString()));
    try {
      for (const e of output ) {
        if (this.newE) {
          await this.newE(e);
        }
      }
    } catch (e) {
      this.emit('eelog:error', e);
    }
  }

  async newE(event) {
    // console.log(event.toString());
    this.emit('eelog:update', event);
  }

  start() {
    fs.watchFile(this.path, { persistent: true, interval: 1000 }, this.update.bind(this));
    this.update();
  }
}

module.exports = DeathLogParser;
