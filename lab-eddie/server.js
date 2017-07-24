'use strict';

const net = require('net');
const prompt = require('prompt');
const EE = require('events');
const Client = require('./model/client.js');
const PORT = process.env.PORT||5000;
const server = net.createServer();
const ee = new EE();
