var count = 1;

$(".leftSide").fadeIn(500);

$(".addChat button").click(function() {
  $(".chatContainer").append('<div class="chatBox col-md-3" style="display: none;"> <div class="conversation"> boop </div> <input id="input" placeholder = "Type your message here!"><button>Send</button><br> </div>');
  count++;
  $(".chatBox:nth-child(" + count + ")").fadeIn(500);
});
