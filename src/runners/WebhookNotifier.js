'use strict';

const fetch = require('node-fetch');

const chunkify = require('./chunkify');

const webhook = {
  token: process.env.WEBHOOK_TOKEN,
  id: process.env.WEBHOOK_ID,
};

const notified = [];

const splitAndWrap = string => string
  .split('\n')
  .filter(str => str)
  .map(str => `\`\`\`${str}\`\`\``)
  .join('\n');

class WebhookNotifier {
  // eslint-disable-next-line class-methods-use-this
  async out(str, critical) {
    const url = `https://discordapp.com/api/webhooks/${webhook.id}/${webhook.token}`;
    try {
      const strings = chunkify({ string: str, breakChar: '\n' });
      for (const string of strings) {
        notified.push(string);
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ content: splitAndWrap(critical ? `ERROR: ${string}` : string) }),
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  async log(event) {
    await this.out(event.toString());
  }
  
  async error(error) {
    this.out(error.message, true);
  }
}

module.exports = WebhookNotifier;
