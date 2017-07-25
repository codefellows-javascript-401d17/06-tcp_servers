James' Chat Server
======

This project creates a simple TCP chat room using Node leveraging the 'net' module. Any number of users can connect to the chat room and communicate with one another. The Node 'net' module allows a developer to create any kind of TCP server and, in this case, handle simple user input and output based on the data received. This program first creates a Client through a Client Constructor and uses NPM uuid to generate unique universal ids for each client. The simplest method to connect to the chat server is telnet, built into most operating systems in some form. Although, many other similar TCP clients exist. The server can respond to the following user "@" commands by parsing the text at the beginning of a line of text sent by a user.

```.......................................................................
.   o   \ o /  _ o        __|    \ /     |__         o _  \ o /   o   .
.  /|\    |     /\   __\o   \o    |    o/     o/__   /\     |    /|\  .
.  / \   / \   | \  /) |    ( \  /o\  / )    |   (\  / |   / \   / \  .
.......................................................................
. cmd: '@FML' to view help instructions.                              .
. cmd: '@all <msg>' to send a message to everyone in chat.            .
. cmd: '@dm <name> <msg>' to private message another user.            .
. cmd: '@nickname <name>' to change your name.                        .
. cmd: '@quit' to exit chat room.                                     .
.......................................................................```

The following are basic instructions:
Start the server:
Requirements: Node is installed and navigated to the working directory of the chat room application.
Instructions:
Run ```npm I``: to get all dependencies.
```'npm run start'```: to start the server.
Connect to the server:
Requirements: A client, such as telnet, is installed and the IP or hostname of the server is known.
Instructions: ex ```'telnet 127.0.0.1 3000'```
