/**
 * Created by danyang on 3/2/16.
 */
$(document).ready(function(){
  var socket = io();
  var from = $("#hidden_from_name").text();
  var to = $("#hidden_target_name").text();
  var fromId = $("#fromId").text();
  var toId = $("#toId").text();//read from cookie and save in from
  var unreadlist;
      var totalunread = 0;

      //send message when a user come in.
  function addtalks(data){
    var $img = $("<a class='avatar'>").append($("<img src='/images/plumber.jpg'/>"));
    var $_time = $("<span class='date'>").text(data['time']);
    var $time = $("<div class='metadata'>").append($_time);
    var $user = $("<a class='author'>").text(data['from']);
    var $chat = $("<div class='text'>").text(data['msg']);
    var $content = $("<div class='content'>").append($user, $time, $chat);
    var $newevent = $("<div class='comment'>").append($img, $content);
    $('#chats').append($newevent);
  }

  $.getJSON("/api/privatetalks", {
    fromId: fromId,
    toId: toId,
  }, function (msg) {
    for (var i = 0; i < msg.length; i++) {
      var from_username = from;
      if (msg[i].from_user != fromId){
            from_username = to;
      }
      var $img = $("<a class='avatar'>").append($("<img src='/images/plumber.jpg'/>"));
      var $_time = $("<span class='date'>").text(msg[i].timestamp);
          var $time = $("<div class='metadata'>").append($_time);
      var $user = $("<a class='author'>").text(from_username);
      var $chat = $("<div class='text'>").text(msg[i].content);
      var $content = $("<div class='content'>").append($user, $time, $chat);
      var $newevent = $("<div class='comment'>").append($img, $content);
      $('#chats').append($newevent);
    }
  });

  socket.emit('online', {user: from});

  socket.on('online',function(data){
    $("#chats").append('<div><div class="ui left pointing green basic label">' + data.user + ' has come in!</div></div>');
  })

  socket.on('say',function(data){
    if (data.to == from && data.from == to) {
      addtalks(data);
    }
    else{
      unreadlist[data.from]++;
      totalunread++;
      $("#note").text(totalunread);
    }
  });

  socket.on('userlist',function(userlist){
    unreadlist = userlist;
  });

  var noti = document.getElementById('noti_Container');
  noti.style.cursor = 'pointer';
  noti.onclick = function() {
    socket.emit("unreadlist", {unreadlist:unreadlist, from:from});
    window.location = "/main";
  };

  $("#logout").on("click",  function(){
    socket.emit("logout", {user: from});
    window.location = "/";
  });

  socket.on('offline', function (data) {
    //display system's information
    var sys = '<div style="color:#f00">system: ' + 'user ' + data.user + ' left the chatroom！</div>';
    $("#chats").append("<div><div class='ui left pointing green basic label'>" + sys + "</div></div>");
      })

  $("#newPost1").submit(function(e) {
    //get sending message
    var $msg = $("#inputContent").val();
    if ($msg == "") return false;

    //get information into your own browser
    var $img = $("<a class='avatar'>").append($("<img src='/images/plumber.jpg'/>"));
    var datetime = moment().format('MMMM Do YYYY, h:mm:ss a');
    var $_time = $("<span class='date'>").text(datetime);
    var $time = $("<div class='metadata'>").append($_time);
    var $user = $("<a class='author'>").text(from);
        var $chat = $("<div class='text'>").text($msg);
        var $content = $("<div class='content'>").append($user, $time, $chat);
        var $newevent = $("<div class='comment'>").append($img, $content);
        $('#chats').append($newevent);

        console.log(to);
        //sending message
        socket.emit('say', {from: from, to: to, fromId: fromId, toId: toId, msg: $msg, time:datetime});
        //clear input information
        $("#inputContent").val("").focus();

        return false;
    });
});
