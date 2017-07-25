# TCP Server - Lab 06

## Description:
This app hosts conversations between all users connected through the same server. Users get a randomly generated username upon launch.
* The user can change their nickname with by typing `@nickname` followed by the name they wish to change to.
* To message every user in the chat the user types `@all` followed by their message.
* To direct message another member in the chat type `@dm` followed by the username and then the message.
When the user exits the chat server they are then removed from the chat pool. Follow the instructions below to connect.

## Connect to Server and Launch:
The app is run from the console with telnet. It looks like `telnet [enter host IP address] 3000` If launched successfully you should get a message `server listening on: 3000`.  
