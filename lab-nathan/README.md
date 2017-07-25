# Nathan's TCP Chat Server

This TCP chat server is built on Node.js. It uses the TCP protocol to manage connections and communicate with other computers. It also uses ANSI escape sequences to provide context-dependent text coloring.

## Installation

### Server
1. Install node module dependencies by running `npm i` in the command line.
2. Run node server.js

### Client
1. Run `telnet <server ip> <server port>` in the command line.

## Commands
* `@all <message>`: Message everyone in chat.
* `@cat`: Displays a cat.
* `@name [<name>]`: Gets or sets name.
* `@poke <user>`: Pokes a user.
* `@say <user> <message>`: Message a user.
* `@users`: List users in chat.