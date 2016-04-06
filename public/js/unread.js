$(document).ready(function() {
    var socket = io();
    var from = $("#hidden_from_name").text();
    var to = $("#hidden_target_name").text();//read from cookie and save in from
    var unreadlist;

    socket.emit("getunreadlist", from);

    socket.on("unreadlist", function(data){
        $("#users div div a").each(function(user){
            var username = $(this).text();
            if (data[username] && data[username] != 0){
                $(this).text(username + " + " + data[username]);
            }
        });
    });
});