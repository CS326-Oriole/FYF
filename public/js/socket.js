var socket = io();

function sendMessage() {
  console.log("\nmessage found!\n")
  socket.emit('chat_message', $('#input').val());
  $('#input').val('');
  return false;
};

socket.on('chat_message', function(msg){
  $('#chat_window').append($('<li>').text(msg));
});
