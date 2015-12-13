var count = document.getElementById('chatId').innerText;
var chat_1 = document.getElementById('chat_1');
var chat_2 = document.getElementById('chat_2');
var chat_3 = document.getElementById('chat_3');
console.log("intial count is: " + count);

var socket = io();
$(document ).ready(function(){
  if(chat_1 != null)
  $(".chatContainer").append(chat_1.innerText);
if(chat_2 != null)
  $(".chatContainer").append(chat_2.innerText);
if(chat_3 != null)
  $(".chatContainer").append(chat_3.innerText);
});
$(".leftSide").fadeIn(500);

var category = document.getElementById('subject').innerText.trim();
console.log(category);
console.log(count);

$(".addChat button").click(function() {
  var chatName = document.getElementById('chatName');
  var chatNameValue = chatName.value;

  if (!chatNameValue) {
    alert("Chat name does not exist.");
    return;
  }

  var chatId = 'id=chat-' + count;
  var window_id = "id='" + category + "-chat_window-" + count + "'";
  var input_id = "id='input-" + count + "'";

  console.log("Count is at: " + count);
  console.log("Catagory is: " + category);

  var str = '<div class="col-md-3 chatBox"' + chatId + ' style=""> '
            + ' <h2 class="chatTitle"> ' + chatName.value + '</h2> '
            + ' <div class="conversation"> '
              + '   <ul class="convoList" ' + window_id + '"></ul> </div> '
            + ' <div class="sendInput"> '
            + ' <input ' + input_id + ' placeholder = "Type your message here!"> '
            + ' <button class="sendButton" onClick="sendMessage('+ count + ')">Send</button><br> </input> </div>';

  var chatInfo ={
    chatId : chatId,
    category : category,
    html : str,
    chatName : chatNameValue
  };

  //$(".chatBox:nth-child(" + count + ")").fadeIn(500);


  $.ajax({
  contentType : "application/json",
    dataType: "json",
    data: JSON.stringify(chatInfo),
    type: 'POST',
    url:"./addChat",
  });

  socket.emit('chat_created', {str: str, category: category});
  //$(".chatBox:nth-child(" + count + ")").fadeIn(500);

});

function sendMessage(chat_id) {
  var to_send = format($('#input-' + chat_id).val(), category + "-chat_window-" + chat_id, getUserName());
  console.log(to_send.m);
  socket.emit('chat_message', to_send);
  $('#input-' + chat_id).val('');
};

socket.on('chat_message', function(msg) {
  if(msg.category===category) {
    $("#" + msg.room).append($('<li>').text(msg.m));
  }
});

socket.on('create_chatbox', function(box_info) {
  count++;
  console.log("\nincremented count to: " + count + "\n");
  if(box_info.category===category) {
    $(".chatContainer").append(box_info.str);
  }
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
