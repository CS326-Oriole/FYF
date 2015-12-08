var count = 1;

var socket = io();

$(".leftSide").fadeIn(500);

$(".addChat button").click(function() {
  $(".chatContainer").append('<div class="chatBox col-md-3" style="display: none;"> <div class="conversation"> <ul id="chat_window"></ul> </div> <input id="input" placeholder = "Type your message here!"><button onClick="sendMessage()">Send</button><br> </div>');
  count++;
  $(".chatBox:nth-child(" + count + ")").fadeIn(500);
});

var socket = io();

//whenever sendMessage is called, send the value of the element called 'input' to chat_message
function sendMessage() {
  socket.emit('chat_message', getUserName() + ": " + $('#input').val());
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

/*
 * To differ the chats by rooms when they're all in the same window like this, do the following:
 * Each time you join a room, call the socket.join function on that room name
 * Then, instead of just sending the message, send the message and the name of the room the message came from
 * then append the message to the given room, instead of any room (requires the chat windows to be named properly)
*/
