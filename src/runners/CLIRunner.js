'use strict';

require('colors');

class CLIRunner {
  // eslint-disable-next-line no-console
  constructor(stream) {
    process.env.DEATHLOG_USE_COLORS = '1';
    this.stream = stream || console;
  }

  log(event) {
    this.out(event.toString());
  }

  out(str) {
    this.stream.log(str.grey);
  }
}

module.exports = CLIRunner;
