# Warframe Deathlog Parser

[![Supported by Warframe Community Developers](https://warframestat.us/wfcd.png)](https://github.com/WFCD "Supported by Warframe Community Developers")

Inspired by and designed after Semlar's [Death Log Parser](https://semlar.com/deathlog)

By running `npm start`, you will start getting entries as changes appear in your EE.log, the Evolution Engine's log.

This is not in violation of any usage rules so far as I am aware, and if any member of Digital Extremes asks me to remove this repo, I will do so.

### Current options include:
- `cli`
- `webhook` : Discord webhook

Depending on your preference, use `npm run start:choice` where `choice` is one of the above in code blocks.

### Current events
- Start
- Death
- Successful mission end (with credits, not entirely accurate)

### Configuration

```env
WEBHOOK_TOKEN=Discord webhook token
WEBHOOK_ID=Discord webhook id
```
