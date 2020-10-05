const { Transform } = require('stream');
const { cipher } = require('./cipher');

class CaesarTransform extends Transform {
  constructor(shift, action) {
    super();
    this.shift = +shift;
    this.action = action;
  }

  _transform(chunk, encoding, callback) {
    cipher(chunk, this.shift, this.action);
    this.push(chunk);
    callback();
  }
}

module.exports.CaesarTransform = CaesarTransform;
