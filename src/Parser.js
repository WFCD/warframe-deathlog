'use strict';

const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');

const makeDeathLine = require('./deathLine');
const makeStart = require('./makeStart');
const makeTs = require('./makeTs');
const makeEndOfMission = require('./makeEndOfMission');

const defaultLogPath = `${process.env.localappdata}\\Warframe\\EE.log`;
const runlines = [];
let useColors = true;

// eslint-disable-next-line no-console
let out = console.log;

class DeathLogParser {
  // eslint-disable-next-line no-console
  constructor(writeFunction = console.log, logPath = defaultLogPath) {
    out = writeFunction;
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

    const { playerName, startTime } = makeStart(lines);

    let sline = '';
    if (useColors) {
      sline = `${colors.grey(`[${makeTs(startTime)}]`)} ${colors.grey('[START]')} - ${colors.yellow(playerName)}`;
    } else {
      sline = `[${makeTs(startTime)}] [START] - ${playerName}`;
    }
    if (!runlines.includes(sline) && playerName.length) {
      output.push(sline);
      runlines.push(sline);
    }

    output.push(...(lines
      .map((line) => {
        const deathline = makeDeathLine(line, { startTime, colors, useColors });
        const eom = makeEndOfMission(line, { startTime, colors, useColors });
        if (deathline) {
          return deathline;
        }
        if (eom) {
          return eom;
        }
        return '';
      })
      .map(line => line.trim())
      .filter(line => line && line.length && !runlines.includes(line))));
    output = [...new Set(output)];
    runlines.push(...output);
    const toOut = output.join('\n');
    if (toOut.length) {
      out(toOut);
    }
  }

  start(supportsColors = true) {
    fs.watchFile(this.path, { persistent: true, interval: 1000 }, this.update);
    useColors = supportsColors;

    this.update();
  }
}

module.exports = DeathLogParser;
