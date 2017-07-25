'use strict';

const net = require('net');
const EventEmitter = require('events');

const Client = require('./model/client.js');

const PORT = process.env.PORT || 3000;
const server = net.createServer();
const eventEmitter = new EventEmitter();

const colors = {
  black: '30',
  red: '31',
  green: '32',
  yellow: '33',
  blue: '34',
  magenta: '35',
  cyan: '36',
  white: '37',
  default: '39'
};

const bright = '1;';

const defaultColor = colors.default;
const welcomeColor = bright + colors.cyan;
const systemColor = colors.yellow;
const errorColor = colors.red;
const helpColor = colors.default;
const chatColor = bright + colors.green;

let clientPool = [];

const commands = [
  ['@all', 'Message everyone in chat. Usage: "@all <message>"'],
  ['@cat', 'Displays a cat.'], 
  ['@name', 'Gets or sets name. Usage "@name [<name>]"'],
  ['@poke', 'Pokes a user. Usage "@poke <user>"'],
  ['@say', 'Message a user. Usage: "@say <user> <message>"'],
  ['@users', 'List users in chat. Usage: "@users"']
];

eventEmitter.on('@all', function(client, commandValue) {
  writeToAll(`${client.name} (to all): ${commandValue}`, chatColor);
});

eventEmitter.on('@cat', function(client) {
  client.writeCat(colors.magenta);
});

eventEmitter.on('@help', function(client) {
  client.write('Commands:', helpColor);
  commands.forEach(command =>  client.write(command.join(': '), helpColor));
});

eventEmitter.on('@name', function(client, commandValue) {
  if (!commandValue) {
    client.write(client.name, systemColor);
    return;
  }

  if (clientPool.some(c => c.name === commandValue)) {
    client.write('Name already taken.', errorColor);
    return;
  }

  client.name = commandValue;
  client.write(`Changed name to ${client.name}.`, systemColor);
});

eventEmitter.on('@poke', function(client, commandValue) {
  if (!commandValue) {
    client.write('A poke command must be formatted: @poke <name>', errorColor);
    return;
  }

  let targetClient = clientPool.find(c => c.name === commandValue);

  if (!targetClient) {
    client.write('The user', commandValue, 'could not be found.', errorColor);
    return;
  }

  client.write(`You poked ${targetClient.name}.`, colors.magenta);
  targetClient.write(`${client.name} poked you.`, colors.magenta);
});

eventEmitter.on('@say', function(client, commandValue) {
  let messageParts = commandValue.split(' ');
    
  if (messageParts.length < 2) {
    client.write('A message command must be formatted: @say <name> <message>', errorColor);
    return;
  }

  let name = messageParts.shift();
  let message = messageParts.join(' ');

  let targetClient = clientPool.find(c => c.name === name);

  if (!targetClient) {
    client.write('The user', name, 'could not be found.', errorColor);
    return;
  }

  client.write(`${client.name} (to ${targetClient.name}): ${message}`, chatColor);
  targetClient.write(`${client.name} (to you): ${message}`, chatColor);
});

eventEmitter.on('@users', function(client) {
  clientPool.forEach(c => client.write(c.name, defaultColor));
});

server.on('connection', function(socket) {
  let client = new Client(socket);
  clientPool.push(client);

  client.write('Welcome to Nathan\'s Chat Server!', welcomeColor);
  client.write('Type \'@help\' for a list of available commands.', helpColor);

  writeToAll(`${client.name} connected.`, systemColor);

  socket.on('data', function(data) {
    let message = data.toString('utf8').trim();
    let messageParts = message.split(' ');

    console.log(message);
    
    if (!message.startsWith('@')) {
      client.write(`${message} is not a valid command. Type '@help' for a list of available commands.`, errorColor);
      return;
    }

    let command = messageParts.shift().trim();
    let commandValue;
    
    if (messageParts.length > 0) {
      commandValue = messageParts.join(' ').trim();
    }

    eventEmitter.emit(command, client, commandValue);
  });

  socket.on('close', function(hadError) {
    if (hadError) {
      writeToAll(`${client.name} disconnected due to a transmission error.`, errorColor);
    } else {
      writeToAll(`${client.name} disconnected.`, errorColor);
    }

    clientPool = clientPool.filter(c => c.id !== client.id);
  });

  socket.on('error', function(error) {
    console.error(error);
  });
});

function writeToAll(message, color) {
  clientPool.forEach(c => c.write(message, color));
}

server.listen(PORT, function() {
  console.log(`Listening on port ${PORT}.`);
});


