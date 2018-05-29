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

// Listen for new message and render to page
socket.on('newMessage', function(message) {
  console.log('New message received:', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// Emit message to server on message form submit
jQuery('#message-form').on('submit', function(event) {
  event.preventDefault();
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: jQuery('[name=message]').val()
    },
    function() {}
  );
});
