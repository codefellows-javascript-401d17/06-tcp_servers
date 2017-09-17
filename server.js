'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();
const ee = new EE();

const pool = [];
ee.on('@dm', function(client,string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').splice().join(' ').trim();

  pool.forEach( c=> {
    if (c.nickname === nickname){
      c.socket.write(`${client.nickname}: ${message}`);
    }
  })
})

ee.on('@all',function (client, string) {
  pool.forEach( c => {
    c.socket.write(`${client.nickname}: ${string}`);
  });
});

ee.on('@nickname', function(client, nameForClient){
  client.nickname = nameForClient[0];
});

ee.on('default', function(client, string){
  client.socket.write('try a command\n');
});
server.on ('connection', function(socket){
  var client = new Client(socket);
  pool.push(client);

  socket.on('data', function(data){
    const command = data.toString().split(' ').shift().trim();
    if(command.startsWith('@')){
      ee.emit(command, client, data.toString().split(' ').splice(1).join(' '));
    };

    ee.emit('default', client, data.toString());

  });
    socket.on('close', function(){
      pool.forEach((user,index) => {
      if(user.nickname === client.nickname){
        console.log(user.nickname, ' disconnected');
        pool.splice(index, 1);
      };
    });
  });
  socket.on('error', function(err){
    console.log(new Error('someone goofed', socket.nickname))
  });
});


server.listen(PORT, function(){
  console.log('server is online.....\nPORT', PORT);
});