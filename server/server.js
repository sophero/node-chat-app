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

  // Listen for newMessage event from client
  socket.on('createMessage', message => {
    console.log('New message:', message);
    // socket.emit emits event to a single connection, whereas io.emit emits event to every connection.
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: Date()
    });
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
