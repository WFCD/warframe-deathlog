'use strict';

const data = require('warframe-worldstate-data');

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function splitResourceName(str) {
  return str.split(/([A-Z]?[^A-Z]*)/g).filter((item) => item).join(' ');
}

function languageString(key) {
  const lowerKey = String(key).toLowerCase();
  if (lowerKey in data.languages) {
    return data.languages[lowerKey].value;
  } if (key) {
    return toTitleCase(splitResourceName(String(key).split('/').slice(-1)[0]));
  }
  return key;
}

const getString = (str) => languageString(str);

module.exports = getString;
