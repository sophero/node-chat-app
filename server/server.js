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

  // socket.emit emits event to that socket (a single connection), whereas io.emit emits event to every connection.
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app!',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  // Listen for newMessage event from client
  socket.on('createMessage', message => {
    console.log('New message:', message);

    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: Date()
    // });

    // socket.broadcast.emit emits event to every websocket client except the socket it's called on
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
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
