# Project Name

TODO: This project is a TCP chat server. It allows users to connect to a local server via telnet to communicate with others users. There are several commands that provide different functionality. 

## How to run

1. Clone the project to a directory
2. install npm dependencies using `npm i`
3. Run the server with `node server.js` in your terminal window.
4. In a separate terminal window or tab, run `telnet YOUR_IP 4000`. If you don't know your IP just go to [https://www.whatismyip.com/](https://www.whatismyip.com/)
5. Type your messages from within telnet.

## Usage

This app has the following features from within telnet, they are in the following format:

```bash
@all [message-to-all-users] -- to message everyone
@nickname [a-different-nickname] -- to change your own nickname
@dm [other-nickname] [message] -- to message a user individually

 ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## License

MIT