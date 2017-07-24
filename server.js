'use strict';

const net = require('net');
const EE = require('events');
const Client = require(`${__dirname}/model/client.js`);
const PORT = process.env.PORT || 8000;
const server = net.createServer();
const ee = new EE();

const pool = [];

ee.on('default', function(client) {
  client.socket.write('not a command \n');
});

ee.on('@all', function(client, string) {
  pool.forEach( c => {
    c.socket.write(`${client.nickname}: ${string}`);
  });
});

server.on('connection', function(socket) {
  let client = new Client(socket);
  pool.push(client);

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if (command.startsWith('@')) {
      ee.emit(command, client, data.toString().split(' ').splice(1).join(' '));
      return;
    }

    ee.emit('default', client, data.toString());
  });
});


server.listen(PORT, function() {
  console.log('Server Starting On:', PORT);
});