'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
const PORT = process.env.PORT || 3000
const server = net.createServer();
const ee = new EE();
const clientPool = [];

ee.on('@close', function(client, string) {
  console.log('ee close');
  ee.emit('end');
  // return server.on(close);
});

ee.on('@dm', function(client,string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  clientPool.forEach((c) => {
    if(c.nickname === nickname) {
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });
});

ee.on('@all', function(client, string) {
  clientPool.forEach((c) => {
    c.socket.write(`${client.nickname}: ${string}`);
  });
});


ee.on('default', function(client, string) {
  client.socket.write('that command does not exist\n');
});

server.on('error', function(error) {
  throw error;
});

server.on('end', function(client, string) {
  console.log('inside');
  console.log(`${client.nickname}: left the chat`);
  clientPool.forEach((c, index) => {
    if(c.nickname === nickname) {
      clientPool.splice(index, 1);
    }
  });
  // return;
});

server.on('connection', function(socket) {
  var client = new Client(socket);
  clientPool.push(client);

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if(command.startsWith('@')) {
      ee.emit(command, client, data.toString().split(' ').splice(1).join(' '));
      return;
    }

    ee.emit('default', client, data.toString());
  });
});

server.listen(PORT, function() {
  console.log('server is on:', PORT);
});
