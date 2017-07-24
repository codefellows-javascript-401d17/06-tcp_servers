'use strict';

const uuidv4 = require('uuid/v4');

const Clinet = module.exports = function(socket){
  this.socket = socket;
  this.nickname = `user_${Math.floor(Math.random() * 1000)}`;
};
