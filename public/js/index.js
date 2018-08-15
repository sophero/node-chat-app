// how do I connect to the server? do I need to invoke socket.io or can I just run an xhr request to localhost? that should work.
jQuery( document ).ready(function() {
  
  var roomSelect = jQuery('#room-select');
  roomSelect.on('change', () => {
    console.log('working');
    console.log(roomSelect.val());
    
    updateRoomInput(roomSelect.val());
  });

  populateRoomSelect();
  
  function populateRoomSelect() {
    jQuery.ajax({
      url: '/api/rooms',
      method: 'GET',
      success: (res) => {
        res.forEach(room => {
          roomSelect.append(jQuery('<option></option>').text(room));
        });
      }
    });
  }
  
  function updateRoomInput(selectedRoom) {
    jQuery("#input-room-name").val(selectedRoom);
  }
  
});