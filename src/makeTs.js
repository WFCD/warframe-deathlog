'use strict';

const makeTs = (d) => {
  const t = new Date(d);
  const hours = String(t.getHours()).padStart(2, '0');
  const min = String(t.getMinutes()).padStart(2, '0');
  const sec = String(t.getSeconds()).padStart(2, '0');
  const ts = `${hours}:${min}:${sec}`;
  return ts;
};

module.exports = makeTs;
