'use strict';

const fetch = require('node-fetch');

const chunkify = require('./chunkify');

const webhook = {
  token: process.env.WEBHOOK_TOKEN,
  id: process.env.WEBHOOK_ID,
};

const splitAndWrap = string => string
  .split('\n')
  .filter(str => str)
  .map(str => `\`\`\`${str}\`\`\``)
  .join('\n');

class WebhookNotifier {
  constructor() {
    this.notified = [];
  }

  // eslint-disable-next-line class-methods-use-this
  async out(str) {
    const url = `https://discordapp.com/api/webhooks/${webhook.id}/${webhook.token}`;
    try {
      const strings = chunkify({ string: str, breakChar: '\n' });
      for (const string of strings) {
        this.notified.push(string);
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ content: splitAndWrap(string) }),
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}

module.exports = WebhookNotifier;
