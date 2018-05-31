const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
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

  // socket.emit emits event to that socket (a single connection)
  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat app!')
  );

  // socket.broadcast.emit emits event to every websocket client except the socket it's called on
  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New user joined')
  );

  // Listen for newMessage event from client
  socket.on('createMessage', (message, callback) => {
    console.log('New message:', message);
    // io.emit emits event to every connection.
    io.emit('newMessage', generateMessage(message.from, message.text));

    callback('This is from the server');
  });

  socket.on('createLocationMessage', coords => {
    io.emit(
      'newLocationMessage',
      generateLocationMessage('Admin', coords.latitude, coords.longitude)
    );
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
