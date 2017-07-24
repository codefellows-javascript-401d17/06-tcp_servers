'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();
const ee = new EE();
const pool = [];

ee.on('@dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach( c => {
    if (c.nickname === nickname) {
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });
});

ee.on('@all', function(client, string) {
  pool.forEach( c => {
    c.socket.write(`${client.nickname}: ${string}`);
  });
});

ee.on('@nickname', function(client, string) {
  client.nickname = string.trim();
});

server.on('connection', function(socket) {
  var client = new Client(socket);
  pool.push(client);

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if (command.startsWith('@')) {
      ee.emit(command, client, data.toString().split(' ').splice(1).join(' '));
      return;
    }

    ee.emit('default', client, data.toString());
  });

  socket.on('close', function(had_error) {
    if (had_error) {
      console.log('closed connection due to error');
      let clientIndex = pool.findIndex(function(c) {
        return (c.id === client.id);
      });

      pool.splice(clientIndex, 1);

    }
  });

  socket.on('error', function(err, data) {
    if (err) {
      console.error('There was an error', err);
      return;
    }
    console.log(data);
  });
});
server.listen(PORT, function() {
  console.log('server up:', PORT);
});
