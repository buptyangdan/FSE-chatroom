$('#newPost').submit(function(){
    console.log('one message send to public');
    socket.emit('sendChat', 
        {
            'content': $('#inputContent').val(), 
            'user': $('#usernow').text(), 
            'time': moment().format('MMMM Do YYYY, h:mm:ss a')
        });
    return true
});