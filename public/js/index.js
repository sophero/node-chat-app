// Set socket.io variable. io() available from library at /socket.io/socket.io.js
var socket = io();

// Connection event handler. Using anonymous functions instead of ES6 arrow functions since this code will run in the browser.
socket.on('connect', function() {
  console.log('Connected to server');
});

// Listen for disconnect event
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

// Listen for custom newMessage event
socket.on('newMessage', function(message) {
  console.log('New message received:', message);
});
