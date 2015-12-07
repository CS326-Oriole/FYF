var socket = io();

//whenever sendMessage is called, send the value of the element called 'input' to chat_message
function sendMessage() {
  socket.emit('chat_message', $('#input').val());
  $('#input').val('');
  return false;
};

//whenever a chat_message is recieved, append it to the element called 'chat_window'
socket.on('chat_message', function(msg) {
  $('#chat_window').append($('<li>').text(msg));
});

//////////////////////////////////////////////////
//Skeleton/unfinished functions below
//////////////////////////////////////////////////

socket.on('user_connected', function(uname) {
  $('user_list').append($('<li>').text(uname));
  $('#chat_window').append($('<li>').text('-- ' + msg + 'connected --'));
});

socket.on('user_disconnected', function(uname) {
  //TODO: remove from user list
  $('#chat_window').append($('<li>').text('-- ' + msg + 'has left --'));
})

//TODO: add functionality
function getUserName() {
  return $('#something').val();
};

//TODO: send messages from certain chat to certain chat only (use socket's rooms),
//      add username/time to message
//      uname connected/uname disconnected messages
