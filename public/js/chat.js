var count = document.getElementById('chatId').innerText;

console.log("intial count is: " + count);

var socket = io();

$(".leftSide").fadeIn(500);

var category = document.getElementById('subject').innerText;
console.log(category);
console.log(count);

$(".addChat button").click(function() {
  var chatName = document.getElementById('chatName');
  var chatNameValue = chatName.value;

  var chatId = 'id=chat-' + count;
  var window_id = "id='" + category + "-chat_window-" + count + "'";
  var input_id = "id='input-" + count + "'";

  console.log("Count is at: " + count);
  console.log("Catagory is: " + category);

  var str = '<div class="chatBox col-md-3"' + chatId + ' style=""> <div class="conversation"> <h2>' + chatName.value + '</h2> <ul ' + window_id + '"></ul> </div> <input ' + input_id + ' placeholder = "Type your message here!"><button onClick="sendMessage(' + count + ')">Send</button><br> </div>';

  var chatInfo ={
    chatId : chatId,
    category : category,
    html : str,
    chatName : chatNameValue
  };

  socket.emit('chat_created', chatInfo);

  $(".chatBox:nth-child(" + count + ")").fadeIn(500);

  //////////From Here//////////////

  $.ajax({
  contentType : "application/json",
    dataType: "json",
    data: JSON.stringify(chatInfo),
    type: 'POST',
    url:"./addChat",
  });
  ////////////To Here/////////////
  //Should go into the socket.on{'chat_created'} function

  $(".chatContainer").append(str);
  socket.emit('chat_created');
  //$(".chatBox:nth-child(" + count + ")").fadeIn(500);

});

function sendMessage(chat_id) {
  var to_send = format($('#input-' + chat_id).val(), "chat_window-" + chat_id, getUserName());
  console.log(to_send.m);
  socket.emit('chat_message', to_send);
  $('#input').val('');
};

socket.on('chat_message', function(msg) {
  if(msg.category===category) {
    $("#" + msg.room).append($('<li>').text(msg.m));
  }
});

socket.on('increment_count', function() {
  count++;
  console.log("\nincremented count to: " + count + "\n")
})

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
  $('#chat_window').append($('<li>').text('-- ' + msg + 'connected --'));
});

socket.on('user_disconnected', function(uname) {
  $('#chat_window').append($('<li>').text('-- ' + msg + 'has left --'));
})

//TODO: add functionality
function getUserName() {
  return "username"
};
