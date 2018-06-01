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
  var formattedTime = moment(message.createdAt).format('h:mma');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

// Listen for new location message from server
socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mma');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
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
