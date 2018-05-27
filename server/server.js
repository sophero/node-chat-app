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

// Print message when new websocket connected
io.on('connection', socket => {
  console.log('New user connected');

  // Print message when a client disconnects
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
