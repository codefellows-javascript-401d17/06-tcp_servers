'use strict';

const uuidv4 = require('uuid/v4');
const os = require('os');

module.exports = Client;

function Client(socket) {
  this.id = uuidv4();
  this.name = `user-${Math.random()}`;
  this.socket = socket;
}

Client.prototype.switchColor = function(color) {
  this.socket.write(`\u001B[${color}m`);
};

Client.prototype.write = function(message, color) {
  this.switchColor(color);
  this.socket.write(message);
  this.socket.write(os.EOL);
  this.switchColor('39');
};

Client.prototype.writeCat = function(color) {
  this.write('  ^~^  ,', color);
  this.write(' (\'Y\') )', color);
  this.write(' /   \\/', color);
  this.write('(\\|||/)', color);
};