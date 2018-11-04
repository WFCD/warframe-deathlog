'use strict';

require('dotenv').config();

const Parser = require('./src/Parser');

let parser = new Parser();

if (process.argv.includes('--webhook') || process.argv.includes('-w')) {
  // eslint-disable-next-line global-require
  const WebhookNotifier = require('./src/WebhookNotifier');
  const notifier = new WebhookNotifier();
  parser = new Parser(notifier.out);
  notifier.out('/ / / TRANSMISSION INCOMING / / /');
  parser.start(false);
} else {
  parser.start();
}
