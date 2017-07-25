'use strict';
const uuidv4 = require('uuid/v4');

const Client = module.exports = function(socket){ //eslint ignore
  this.socket = socket;
  this.nickname = `user_${Math.round(Math.random() * 1000000)}`;
  this.id = uuidv4;
};
