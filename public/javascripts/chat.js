$(document).ready(function() {
  $(window).keydown(function (e) {
    if (e.keyCode == 116) {
      if (!confirm("Are you sure to refresh？Data will be cleared")) {
        e.preventDefault();
      }
    }
    else if (e.keyCode == 13){
      $("#say").click();
    }
  });

  var socket = io.connect();
  var from = $.cookie('user');//read from cookie and save in from
  var to = 'all';// define default "to" is all
  //send message when a user come in.

  socket.emit('online', {user: from});
  socket.on('online', function (data) {
    $.getJSON("/api/talk", {
      fromuser: data.user,
      touser: 'all'
    }, function (msg) {
      console.log(msg);
      for (var i = 0; i < msg.length; i ++) {
          // chatroom, username, to user, time, content
          $("#contents").append('<div>' + msg[i].fromuser + '(' + msg[i].time + ')to ' + msg[i].touser + '：<br/>' + msg[i].text + '</div><br />');
      }
    });
      if (data.user != from) {
        var sys = '<div style="color:#f00">system(' + data.time + '):' + 'user' + data.user + ' has come in！</div>';
      } else {
        var sys = '<div style="color:#f00">system(' + data.time+ '):Welcome！</div>';
      }
      $("#contents").append(sys + "<br/>");
      //refresh user lists
      flushUsers(data.users);
      //display the receiver who you are talking to 
      showSayTo();
    });

    socket.on('say', function (data) {
      //to all
      if (data.to == 'all') {
        $("#contents").append('<div>' + data.from + '(' + data.time + ')to all：<br/>' + data.msg + '</div><br />');
      }
      //to a specific user
      if (data.to == from) {
        $("#contents").append('<div style="color:#00f" >' + data.from + '(' +data.time+ ')to you：<br/>' + data.msg + '</div><br />');
      }
    });

    socket.on('offline', function (data) {
      //display system's information
      var sys = '<div style="color:#f00">system(' + data.time+ '):' + 'user ' + data.user + ' has gone！</div>';
      $("#contents").append(sys + "<br/>");
      //refresh user list
      flushUsers(data.users);
      //someone disconnect when you are talking to him
      if (data.user == to) {
        to = "all";
      }
      //display the 
      showSayTo();
    });

    //server closes
    socket.on('disconnect', function() {
      var sys = '<div style="color:#f00">system:sever cannot be connected！</div>';
      $("#contents").append(sys + "<br/>");
      $("#list").empty();
    });

    //reconnect
    socket.on('reconnect', function() {
      var sys = '<div style="color:#f00">system:open the server again！</div>';
      $("#contents").append(sys + "<br/>");
      socket.emit('online', {user: from});
    });

    //get time
    function now() {
      var date = new Date();
      var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
      return time;
    }

    //refresh user's list
    function flushUsers(users) {
      //clear previous user list 
      $("#list").empty().append('<li title="click users" alt="all" class="saying to " onselectstart="return false">all</li>');
      //traverse and create user lists
      for (var i in users) {
        $("#list").append('<li alt="' + users[i] + '" title="click users" onselectstart="return false">' + users[i] + '</li>');
      }
      //chat to someone when click
      $("#list > li").click(function() {
        //click the user himself is not permitted
        if ($(this).attr('alt') != from) {
          //set up the click user as the talking 
          to = $(this).attr('alt');
          //clear previous information
          $("#list > li").removeClass('sayingto');
          jQuery('#contents').html('');
          //The user click to add the selected effect
          $(this).addClass('sayingto');
          $.getJSON("/api/talk", {
            fromuser: from,
            touser: to
          }, function (msg) {
            console.log(msg);
            for (var i = 0; i < msg.length; i ++) {
                // chatroom, username, to user, time, content
                $("#contents").append('<div>' + msg[i].fromuser + '(' + msg[i].time + ')to ' + msg[i].touser + '：<br/>' + msg[i].text + '</div><br />');
            }
          });
          //refresh whom you are talking to
          showSayTo();
        }
      });
    }

    //display taling user
    function showSayTo() {
      $("#from").html(from);
      $("#to").html(to == "all" ? "all" : to);
    }

    //logout

    $('#logout').click(function(){
      $.ajax({
        url:'http://localhost:3000/logout'
      });
      window.location.href = "http://localhost:3000/signin";
    })
    //trigger send button
    $("#say").click(function() {
      //get sending message
      var $msg = $("#input_content").html();
      if ($msg == "") return;
      //get information into your own browser
      if (to == "all") {
        $("#contents").append('<div>(' + now() + ')from you to all：<br/>' + $msg + '</div><br />');
      } else {
        $("#contents").append('<div style="color:#00f" >you(' + now()+ ') ' + to + '：<br/>' + $msg + '</div><br />');
      }
      //sending message
      socket.emit('say', {from: from, to: to, msg: $msg});
      //clear input information
      $("#input_content").html("").focus();
    });
  });
