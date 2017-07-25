'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
const PORT = process.env.PORT || 4000;
const server = net.createServer();
const ee = new EE();

var pool = [];

server.listen(PORT, function () {
  console.log('server up on: ', PORT);
});
