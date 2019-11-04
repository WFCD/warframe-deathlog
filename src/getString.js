'use strict';

const fetch = require('node-fetch');

const getString = async (str) => {
  try {
    const data = await fetch(`https://api.warframestat.us/languages/search/${encodeURIComponent(str)}`);
    const strs = await data.json();
    if (strs.length > 0 && strs.length < 2) {
      return strs[0].value;
    }
  } catch (e) {
    //  yeah, it happens, too bad
  }
  return str;
};

module.exports = getString;
