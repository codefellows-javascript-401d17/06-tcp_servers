'use strict';

const net = require('net');
const EE = require('events');
const ee = new EE();
const Client = require('./model/client.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();

const pool = [];

ee.on('@dm', function(client, string){
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').splice(1).join(' ').trim();

  pool.forEach(c => {
    if (c.nickname === nickname){
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });
});

ee.on('@all', function(client, string){
  pool.forEach( c => {
    c.socket.write(`${client.nickname}: ${string}`);
  });
});

ee.on('default', function(client, string){
  client.socket.write(`${string} is not a command \n`);
});

ee.on('@nickname', function(client, string){
  client.nickname = string.split(' ').shift().trim();
});

server.on('connection', function(socket){
  var client = new Client(socket);
  pool.push(client);

  socket.on('data', function(data){
    const command = data.toString().split(' ').shift().trim();

    if(command.startsWith('@')){
      ee.emit(command, client, data.toString().split(' ').splice(1).join(' '));
      return;
    }
  });

  socket.on('close', function(client){
    pool.forEach( (c, i) => {
      if(c.nickname === client.nickname){
        pool.splice(i);
      }
    });
  });

  socket.on('error', function(client, err){
    client.socket.write(err);
  });
});

server.listen(PORT, function(){
  console.log('server serving on ', PORT);
});
