
## Requirements
#### Configuration  
<!-- list of files, configurations, tools, etc that are required -->
Your lab directory must include  
* ~~`.gitignore`~~
* ~~`.eslint`~~
* ~~`package.json`~~
* `README.md`

#### Feature Tasks  
* ~~~create a TCP Server using the NodeJS native `net` module~~~
* ~~~create a `Client` Constructor~~~
* ~~when sockets connect to the server, a new `Client` instance should be made~~
* ~~all clients should have a unique `id` property - this should come from the use of `uuid`~~
* when sockets are connected with the client pool they should be given event listeners for `data`, `error`, and `close` events
 * when a socket emits the `close` event, the socket should be removed from the client pool
 * when a socket emits the `error` event, the error should be logged on the server
 * when a socket emits the `data` event, the data should be logged on the server and the commands below should be implemented

## Custom commands
* `@all` should trigger a broadcast event
* `@nickname` should allow a user change their nickname
* `@dm` should allow a user to send a message directly to another user by nick name or by their guest id _(unique client id)_
* when a user sends a message, their nickname should be printed
  * **i.e.** `cfcrew: sup hackerz`

####  Documentation  
* write a paragraph about your project
* write documentation on how to get the project running
* write documentation on how to connect to the server
