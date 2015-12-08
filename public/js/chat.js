var count = 1;

$(".leftSide").fadeIn(500);

$(".addChat button").click(function() {
  $(".chatContainer").append('<div class="chatBox col-md-3" style="display: none;"> <div class="conversation"> <ul id="chat_window"></ul> </div> <input id="input" placeholder = "Type your message here!"><button onClick="sendMessage()">Send</button><br> </div>');
  count++;
  $(".chatBox:nth-child(" + count + ")").fadeIn(500);
});

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
  return "username"
};

//TODO: send messages from certain chat to certain chat only (use socket's rooms),
//      add username/time to message
//      uname connected/uname disconnected messages
