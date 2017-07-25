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

server.on('connection', function (socket) {
  var client = new Client(socket);
  pool.push(client);


  socket.on('data', function (data) {
    const command = data.toString().split(' ').shift().trim();
    if (command.startsWith('@')) {

      ee.emit(command, client, data.toString().split(' ').splice(1).join(' '));
      return;
    }
  })

});

server.listen(PORT, function () {
  console.log('server up on: ', PORT);
});
