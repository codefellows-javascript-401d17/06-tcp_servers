#TCP Chat Server Docs

##For this project, we built a TCP chat server that lets users message everyone in the server, lets them directly message a specific user in the server, and lets the user change their nickname to whatever they desire.  

##To get this project running, you need to open your terminal and do an npm install command which will install all the dependencies that this project needs to run.  After doing that, you'll need two terminal windows to start the project.  One window is for running the server, while the other is for using telnet to chat.  On the terminal window reserved for the server simply type "node server.js", and it should display a message saying that the server is up and describing what port it is running on.  On the terminal window reserverd for the telnet side, you need to figure out what your individual IP address is.  This is possible by typing "ifconfig" for linux or "ipconfig" for windows.  The IP address is the four numbers seperated by dots after the "inet addr" tag.  Once you have that sequence of numbers type in "telnet 'your ip address' and the port you are using".  This step will NOT work if you have not previously set up a server in the other terminal window, so make sure to do that first.  

#Commands

##The "@all" command lets you type a message to everyone in the chat server.
##The "@nickname" command lets you change your nickname in the client to whatever nickname you desire.
##The "@dm" command lets you directly message anyone in the chat server by their nickname.
