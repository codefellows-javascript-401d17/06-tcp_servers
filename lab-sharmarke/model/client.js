'use strict';

const uuidv4 = require('uuid/v4');
const Client = module.exports = function(socket) {
  this.socket = socket;
  this.nickname = `guest_${Math.floor((Math.random() * 100) + 1)}`;
  this.id = uuidv4();
};
