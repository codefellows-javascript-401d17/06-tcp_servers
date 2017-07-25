'use strict';

// to run the project type node index.js while in the 06-top_servers directory
// connect to the server by entering "telnet {your ip adress} {port the server is hosted on}"

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');

const PORT = process.env.PORT || 3000;
const server = net.createServer();
const ee = new EE();

let pool = [];

server.listen(PORT, () => {
  console.log('server hosted on port:', PORT);
});

ee.on('/help', (client) => {
  client.socket.write('commands:\n/all text\n/nickname text\n/dm target text\n');
});

ee.on('/all', (client, string) => {
  pool.forEach((recClient) => {
    recClient.socket.write(`${client.nickname}: ${string}`);
  });
});

ee.on('/nickname', (client, string) => {
  client.nickname = string;
  client.socket.write(`your nickname is now ${string}`);
});

ee.on('/dm', (client, string) => {
  if(pool.string) string.socket.write(`${client.nickname}: ${string}`);
});

server.on('connection', socket => {
  let client = new Client(socket);
  client.socket.write('type /help for commands.\n');
  pool.push(client);
  socket.on('error', error => {
    console.log(error.toString().split(' ').shift().trim());
  });
  socket.on('close', close => {
    console.log(close);
    let newArr = [];
    pool.map((ele) => {
      if(ele.id !== client.id) newArr.push(ele);
    });
    pool = newArr;
  });
  socket.on('data', data => {
    const command = data.toString().split(' ').shift().trim();
    console.log(client.nickname, command);
    if(command.startsWith('/')){
      ee.emit(command, client, data.toString().split(' ').splice(1).join(' '));
      return;
    }
  });
});
