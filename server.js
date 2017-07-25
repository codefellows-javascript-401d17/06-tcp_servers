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
  '.......................................................................\n'.white,
  '.   o   \\ o /  _ o        __|    \\ /     |__         o _  \\ o /   o   .\n'.white,
  '.  /|\\    |     /\\   __\\o   \\\o    |    o/     o/__   /\\     |    /|\\  .\n'.white,
  '.  / \\   / \\   | \\  /) |    ( \\  /o\\  / )    |   (\\  / |   / \\   / \\  .\n'.white,
  '.......................................................................\n'.white,
  '. cmd: \'@all <msg>\' to send a message to everyone in chat.            .\n'.white,
  '. cmd: \'@dm <name> <msg>\' to private message another user.            .\n'.white,
  '. cmd: \'@nickname <name>\' to change your name.                        .\n'.white,
  '. cmd: \'@quit\' to exit chat room.                                     .\n'.white,
  '.......................................................................\n'.white
];

ee.on('@FML', function(err, client) {
  if(err) console.log(err);
  helpMe.forEach( helpCommand => {
    client.socket.write(helpCommand);
  });
});

ee.on('@nickname', function(err, client, string){
  if(err) console.log(err);
  let nickname = string.split(' ').slice(0).join(' ').trim();
  console.log(nickname);
  userPool.forEach(c =>{
    if(c.nickname === nickname){
      client.socket.write(`${nickname} has already been chosen!\n`);
    }else if (c.nickname !== nickname) {
      if(string !== ''){
        client.nickname = string.split(' ').shift().trim();
        client.socket.write(`Your new nickname is ${client.nickname}.\n`.green);
        console.log(userPool);
      }else {
        client.socket.write(`${client.nickname}, you did not enter a new nickname.\n`.red);
      }
    }else{
      client.socket.write(`${client.nickname}, you did not enter a new nickname.\n`.red);
    }
  });
});

ee.on('@dm', function(err, client, string) {
  if(err) console.log(err);
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  userPool.forEach( c => {
    if (c.nickname === nickname) {
      c.socket.write(`${client.nickname}: ${message}`);
    }else{
      c.socket.write('There is no user by that nickname.\n');
    }
  });
});

ee.on('@all', function(err, client, string) {
  if(err) console.log(err);
  userPool.forEach( c => {
    if (userPool.length === 1 ) {
      c.socket.write(`${client.nickname}, you're talking to yourself!\n`);
      c.socket.write(`${client.nickname}: ${string}\n`);
    }else {
      c.socket.write(`${client.nickname}: ${string}\n`);
    }
  });
});

ee.on('@quit', function(err, client) {
  if(err) console.log(err);
  let newPool = [];

  userPool.forEach( user => {
    if ( client.id !== user.id) {
      newPool.push(user);
      client.socket.write(`${client.nickname} has left! \n`);
    }
  });
  userPool = newPool;
  console.log(userPool);
  client.socket.end();
});

ee.on('default', function(client) {
  client.socket.write('not a command \n');
});

server.on('connection', function(err, socket) {
  if(err) console.log(err);
  var client = new Client(socket);
  userPool.push(client);
  console.log(userPool);

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

  socket.on('data', function(err, data) {
    if(err) console.log(err);
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
