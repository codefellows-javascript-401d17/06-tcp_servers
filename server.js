'use strict';

const net = require('net');
const EE = require('events');
const colors = require('colors');
const Client = require('./model/client.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();
const ee = new EE();



let userPool = [];

let helpMe = [
  '.......................................................................\n',
  '.   o   \\ o /  _ o        __|    \\ /     |__         o _  \\ o /   o   .\n',
  '.  /|\\    |     /\\   __\\o   \\\o    |    o/     o/__   /\\     |    /|\\  .\n',
  '.  / \\   / \\   | \\  /) |    ( \\  /o\\  / )    |   (\\  / |   / \\   / \\  .\n',
  '.......................................................................\n',
  '. cmd: \'@all <msg>\' to send a message to everyone in chat.            .\n',
  '. cmd: \'@dm <name> <msg>\' to private message another user.            .\n',
  '. cmd: \'@nickname <name>\' to change your name.                        .\n',
  '. cmd: \'@quit\' to exit chat room.                                     .\n',
  '.......................................................................\n'
];

ee.on('@FML', function(client) {
  helpMe.forEach( helpCommand => {
    client.socket.write(helpCommand);
  });
});

ee.on('@nickname', function(client, string){

  if(string !== ''){
    client.nickname = string.split(' ').shift().trim();
    client.socket.write(`Your new nickname is ${client.nickname}.\n`.green);
  }else {
    client.socket.write(`${client.nickname}, you did not enter a new nickname.\n`.red);
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

ee.on('@quit', function(client) {
  let newPool = [];

  userPool.forEach( user => {
    if ( client.id !== user.id) {
      newPool.push(user);
      user.socket.write(`${client.nickname} has left! \n`);
    }
  });
  userPool = newPool;

  client.socket.end();
});

ee.on('default', function(client) {
  client.socket.write('not a command \n');
});

server.on('connection', function(socket) {
  var client = new Client(socket);
  userPool.push(client);

  socket.write('   Welcome to James\' Chat Server!\n'.random);
  socket.write('          ╭━┳━╭━╭━╮╮\n'.white);
  socket.write('          ┃┈┈┈┣▅╋▅┫┃\n'.white);
  socket.write('          ┃┈┃┈╰━╰━━━━━━╮\n'.white);
  socket.write('          ╰┳╯┈┈┈┈┈┈┈┈┈◢▉◣\n'.white);
  socket.write('          ╲┃┈┈┈┈┈┈┈┈┈┈▉▉▉\n'.white);
  socket.write('          ╲┃┈┈┈┈┈┈┈┈┈┈◥▉◤\n'.white);
  socket.write('          ╲┃┈┈┈┈╭━┳━━━━╯\n'.white);
  socket.write('          ╲┣━━━━━━┫\n'.white);
  socket.write('Type @FML for a list of directions\n');

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
