'use strict';

const net = require('net');
const EE = require('events');
const colors = require('colors');
const Client = require('./model/client.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();
const ee = new EE();



const userPool = [];

ee.on('@nickname', function(client, string){

  if(string !== ''){
    client.nickname = string.split(' ').shift().trim();
    client.socket.write(`Your new nickname is ${client.nickname}.\n`);
  }else {
    client.socket.write(`${client.nickname}, you did not enter a nickname.\n`.red);
  }
});

ee.on('@dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  userPool.forEach( c => {
    if (c.nickname === nickname) {
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });
});

ee.on('@all', function(client, string) {
  userPool.forEach( c => {
    c.socket.write(`${client.nickname}: ${string}`);
  });
});

ee.on('default', function(client, string) {
  client.socket.write('not a command \n');
});





server.on('connection', function(socket) {
  var client = new Client(socket);
  userPool.push(client);

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
  console.log('server up:', PORT);
});
