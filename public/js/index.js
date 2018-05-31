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

// Listen for new location message from server
socket.on('newLocationMessage', function(message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

// Emit message to server on message form submit
jQuery('#message-form').on('submit', function(event) {
  event.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: messageTextbox.val()
    },
    function() {
      messageTextbox.val('');
    }
  );
});

// Send location message to server on button click
var locationButton = jQuery('#send-location');
console.log(locationButton);
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr('disabled').text('Send Location');
      console.log(position);
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch location.');
    }
  );
});
