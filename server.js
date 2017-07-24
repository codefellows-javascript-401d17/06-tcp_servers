'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();
const ee = new EE();

const pool = [];

ee.on('@dm', (client, string) => {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').splice(1).trim();

  pool.forEach((client) => {
    if(client.nickname === nickname)
      client.socket.write(`${client.nickname}: ${message}`);
  });
});

ee.on('@all', (client, string) => {
  pool.forEach((c) => {
    c.socket.write(`${client.nickname}: ${message}`);
  });
});

ee.on('default', (client, string) => {
  client.socket.write('not a command \n');
});

server.on('connection', (socket) => {
  var client = new Client(socket);
  pool.push(Client);

  socket.on('data', (socket) => {
    const command = data.toString().split(' ').shift().trim();

    if(command.startsWith('@')) {
      ee.emit(command, client, data.toString().split(' ').splice(1).join(' '));
      return;
    }

    
    ee.emit('default', client, data.toString());
  });
});

server.listen(PORT, function() {
  console.log('server on PORT:', PORT);
});