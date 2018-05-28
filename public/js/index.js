var socket = io();

// Connection event handler
socket.on('connect', function() {
  console.log('Connected to server');

  // Send new message to server
  socket.emit('createMessage', {
    from: 'hey@you.com',
    text: "What's happening!"
  });
});

// Listen for disconnect event
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

// Listen for custom newMessage event
socket.on('newMessage', function(message) {
  console.log('New message received:', message);
});
