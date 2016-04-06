var socket = io();

socket.on('sendChat', function(msg){
    var $img = $("<a class='avatar'>").append($("<img src='/images/plumber.jpg'/>"));
    var $_time = $("<span class='date'>").text(msg['time']);
    var $time = $("<div class='metadata'>").append($_time);
    var $user = $("<a class='author'>").text(msg['user']);
    var $chat = $("<div class='text'>").text(msg['content']);
    var $content = $("<div class='content'>").append($user, $time, $chat);
    var $newevent = $("<div class='comment'>").append($img, $content, $chat);
    $('#chats').append($newevent);
});