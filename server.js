'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
const PORT = process.env.PORT || 4000;
const server = net.createServer();
const ee = new EE();

var pool = [];

ee.on('@all', function (client, string) {
  pool.forEach(function (single_client) {
    single_client.socket.write(`${single_client.nickname}: ${string}`);
  })
})

ee.on('default', function (client, string) {
  client.socket.write('not a command \n');
})

ee.on('@dm', function (client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).trim();
  pool.forEach(function (client) {
    if (client.nickname === nickname) {
      client.socket.write(`${client.nickname} : ${message}`);
    }
  })
})

ee.on('@nickname', function (client, string) {
  client.nickname = string.trim();
});

server.on('connection', function (socket) {
  var client = new Client(socket);
  pool.push(client);

  socket.on('close', function () {
    pool = pool.filter(function (currentSocket) {
      return (!currentSocket.socket.destroyed);
    });
    console.log(pool);
  })

  socket.on('data', function (data) {
    const command = data.toString().split(' ').shift().trim();
    if (command.startsWith('@')) {

      ee.emit(command, client, data.toString().split(' ').splice(1).join(' '));
      return;
    }
    ee.emit('default', client, data.toString());
  })

});

server.listen(PORT, function () {
  console.log('server up on: ', PORT);
});
