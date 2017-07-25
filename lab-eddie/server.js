'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
const PORT = process.env.PORT||5000;
const server = net.createServer();
const ee = new EE();

let pool = [];

ee.on('@all', function(client, string) {
  pool.forEach(c => c.socket.write(`${client.nickname}: ${string}`));
});

ee.on('default', function(client) {
  client.socket.write('not a command \n');
});

ee.on('@nickname', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  client.nickname = nickname;
  client.socket.write(`User name changed to : ${nickname}\n`);
});

ee.on('@dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach( c => {
    if(c.nickname === nickname || c.id === nickname) c.socket.write(`${client.nickname}: ${message}\n`);
  });
});

server.on('connection', (socket) => {
  var client = new Client(socket);
  pool.push(client);

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();
    console.log(`${client.nickname} sent :`, command);
    if(command.startsWith('@')) {
      ee.emit(command, client, data.toString().split(' ').splice(1).join(' '));
      return;
    }

    ee.emit('default', client, data.toString());
  });
});

server.listen(PORT, function() {
  console.log('Server is active on port: ', PORT);
});
