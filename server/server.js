const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 4000;
var app = express(); // Set express() variable
var server = http.createServer(app); // http.createServer(app) is the built-in function invoked when express().listen() is called. Here we're doing it ourselves so that we can call socketIO on the created server.
var io = socketIO(server); // Create websocket server
var users = new Users();

// Set websocket connection event handler
io.on('connection', socket => {

  // Print message when websocket connection established
  console.log('New user connected');

  
  // Listen for join event from client
  socket.on('join', (params, callback) => {
    // Validate params
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    
    users.removeUser(socket.id)
    var user = users.addUser(socket.id, params.name, params.room);
    if (!user) return callback('Sorry, display name already taken! Please try again.');
    
    socket.join(params.room); 
    // Built-in socket.io methods for rooms: socket.join(rm), socket.leave(rm)
    // Room-specific versions of socket.io methods:
    // io.emit -> io.to('The Office Fans').emit // to all sockets in the specified room
    // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
    // socket.emit -> already user/socket-specific so targeting by room redundant
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!')); // socket.emit emits event to that socket (a single client connection)
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`)); // socket.broadcast.emit emits event to every websocket client except the socket it's called on. Here we've specified the room too.

    callback();
  });

  // Listen for createMessage event from client
  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); // io.emit emits event to every connection (socket).
    }
    callback(); // Invoke callback function - clears message input
  });

  socket.on('createLocationMessage', coords => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        'newLocationMessage',
        generateLocationMessage(user.name, coords.latitude, coords.longitude)
      );
    }
  });

  // Websocket disconnection event
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    } 
  });
});

// Use specified path
app.use(express.static(publicPath));

// Create http server
server.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});
