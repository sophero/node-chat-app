const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

// Set express() variable
var app = express();

// http.createServer(app) is the built-in function invoked when express().listen() is called
var server = http.createServer(app);

// Create websocket server
var io = socketIO(server);

// Set websocket connection event handler
io.on('connection', socket => {
  // Print message when websocket connection established
  console.log('New user connected');

  // Send custom 'newEmail' event to client
  socket.emit('newEmail', {
    from: 'hey@you.com',
    text: 'Just established a connection!',
    createdAt: Date()
  });

  // Send newMessage event to client
  socket.emit('newMessage', {
    from: 'sophia',
    text: 'Eureka!',
    createdAt: Date()
  });

  // Listen for newMessage event from client
  socket.on('createMessage', message => {
    message.createdAt = Date();
    console.log('New message:', message);
  });

  // Websocket disconnection event
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// Use specified path
app.use(express.static(publicPath));

// Create http server
server.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});
