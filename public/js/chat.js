var count = 1;

$(".leftSide").fadeIn(500);

$(".addChat button").click(function() {
  $(".chatContainer").append('<div class="chatBox col-md-3" style="display: none;"> <div class="conversation"> <ul id="chat_window"></ul> </div> <input id="input" placeholder = "Type your message here!"><button onClick="sendMessage()">Send</button><br> </div>');
  count++;
  $(".chatBox:nth-child(" + count + ")").fadeIn(500);
});
