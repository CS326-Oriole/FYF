var count = document.getElementById('chatId').innerText;

var socket = io();

$(".leftSide").fadeIn(500);

var category = document.getElementById('subject').innerText;
console.log(category);

//TODO: there needs to be a socket.join("room_name") here, based off of the room name entered
//      also, the name of the chat window needs to be set properly, and the call to sendMessage() needs to be sendMessage(room_name)
$(".addChat button").click(function() {
  var chatName = document.getElementById('chatName');
  var chatNameValue = chatName.value;

  var chatId = 'id=chat-' + count;
  var window_id = "id='" + category + "-chat_window-" + count + "'";
  var input_id = "id='input-" + count + "'";

  var url = document.location.href;
  var getQuery = url.split('?')[1];
  var category = getQuery.split('=')[1];
  var str = '<div class="chatBox col-md-3"' + chatId + ' style="display: none;"> <div class="conversation"> <h2>' + chatName.value + '</h2> <ul ' + window_id + '"></ul> </div> <input ' + input_id + ' placeholder = "Type your message here!"><button onClick="sendMessage(' + count + ')">Send</button><br> </div>';

 var chatInfo ={
    chatId : chatId,
    category : category,
    html : str,
    chatName : chatNameValue
 };
 $.ajax({
  contentType : "application/json",
  dataType: "json",
  data: JSON.stringify(chatInfo),
  type: 'POST',
  url:"./addChat",

});
  $(".chatContainer").append(str);
  count++;
  $(".chatBox:nth-child(" + count + ")").fadeIn(500);

});

//whenever sendMessage is called, send the value of the element called 'input' to chat_message
//TODO: "chat_window" should be the name of the chat window - maybe pass this to sendMessage from the button click?
function sendMessage(chat_id) {
  var to_send = format($('#input-' + chat_id).val(), "chat_window-" + chat_id, getUserName());
  console.log(to_send.m);
  socket.emit('chat_message', to_send);
  $('#input').val('');
};

//whenever a chat_message is recieved, append it to the element called 'chat_window'
socket.on('chat_message', function(msg) {
  if(msg.category===category) {
    $("#" + msg.room).append($('<li>').text(msg.m));
  }
});

function format(message, rm, username) {
  return {
    m: message,
    room: rm,
    uname: username,
    category: category
  }
}

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
