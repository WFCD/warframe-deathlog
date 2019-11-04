'use strict';

require('dotenv').config();
require('colors');

const Parser = require('./src/Parser');

const parser = new Parser();
let notifier;

if (process.argv.includes('--webhook') || process.argv.includes('-w')) {
  // eslint-disable-next-line global-require
  const WebhookNotifier = require('./src/runners/WebhookNotifier');
  notifier = new WebhookNotifier();
} else {
  // eslint-disable-next-line global-require
  const CLINotifier = require('./src/runners/CLIRunner');
  notifier = new CLINotifier();
}

parser.on('eelog:update', notifier.log.bind(notifier));
notifier.out('/ / / TRANSMISSION INCOMING / / /');
parser.start();


module.exports = Parser;
