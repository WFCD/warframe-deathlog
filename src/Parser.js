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

const {
  deathRegex, eomRegex, closedRegex, sentRes, sentDie,
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

    if (!runlines.includes(sline) && sline.player.length) {
      runlines.push(sline);
      output.push(sline);
    }

    lines.map((line) => {
      if (deathRegex.test(line)) {
        return new Death(line, sline.timestamp);
      }
      if (eomRegex.test(line)) {
        return new EOM(line, sline.timestamp);
      }
      if (closedRegex.test(line)) {
        return new GameClosed(line, sline.timestamp);
      }
      if (sentRes.test(line)) {
        return new Revived(line, sline.timestamp);
      }
      if (sentDie.test(line)) {
        return new SentDead(line, sline.timestamp);
      }
      return undefined;
    })
      .filter(line => line && !output.includes(line))
      .forEach((line) => {
        if (!runlines.includes(line)) {
          output.push(line);
          runlines.push(line);
        }
      });

    output = [...new Set(output)];
    runlines.push(...output);
    try {
      output.forEach(async (event) => {
        if (this.newE) {
          await this.newE(event);
        }
      });
    } catch (e) {
      // don't really care about errors here
    }
  }

  async newE(event) {
    // console.log(event.toString());
    this.emit('eelog:update', event);
  }

  start() {
    fs.watchFile(this.path, { persistent: true, interval: 1000 }, this.update);
    this.update();
  }
}

module.exports = DeathLogParser;
