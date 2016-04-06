var data = new Object();
var loadlength = 0;

function createTable(result, type) {
    loadlength = 0;
    $("#search-table").empty();
    switch(type) {
        case "username":
        case "status":
            console.log("result=" , result);
            $("#search-table").append("<thead><tr><th>username</th><th>online</th><th>status</th></tr></thead><tbody>");
            $.each(result.result, function(i, item){
                console.log(item);
                var online = item.online ? "online" : "offline";
                var status = "N/A";
                switch(item.status) {
                    case 0:
                        status = "Ok";
                        break;
                    case 1:
                        status = "Help";
                        break;
                    case 2:
                        status = "Urgent";
                        break;
                    default:
                        break;
                }
                $("#search-table").append("<tr><td>" + item.username +  "</td><td>" + online + "</td><td>"  + status + "</td></tr>");
            });
            $("#search-table").append("</tbody>");
            break;
        case "announcement":
            $("#search-table").append("<thead><tr><th>username</th><th>content</th><th>timestamp</th><th>location</th></tr></thead><tbody>");
            $.each(result.result, function(i, item){
                $("#search-table").append("<tr><td>" + item.username +  "</td><td>" + item.content + "</td><td>"  + item.timestamp + "</td><td>"  + item.location + "</td></tr>");
            });
            $("#search-table").append("</tbody>");
            break;
        case "public chat":
        case "private chat":
            $("#search-table").append("<thead><tr><th>username</th><th>content</th><th>timestamp</th></tr></thead><tbody>");
            $.each(result.result, function(i, item){
                $("#search-table").append("<tr><td>" + item.username +  "</td><td>" + item.content + "</td><td>"  + item.timestamp + "</td></tr>");
            });
            $("#search-table").append("</tbody>");
            break;
        default:
            break;
    }
}

function appendTable(result, type){
    switch(type) {
        case "announcement":
            $.each(result.result, function(i, item){
                $("#search-table").append("<tr><td>" + item.username +  "</td><td>" + item.content + "</td><td>"  + item.timestamp + "</td><td>"  + item.location + "</td></tr>");
            });
            break;
        case "public chat":
        case "private chat":
            $.each(result.result, function(i, item){
                $("#search-table").append("<tr><td>" + item.username +  "</td><td>" + item.content + "</td><td>"  + item.timestamp + "</td></tr>");
            });
            break;
        case "username":
        case "status":
        default:
            break;
    }
}

$("#searchForm").submit(function(){
    var objS = document.getElementById("pid");
    var type = objS.options[objS.selectedIndex].value;
    var criteria = $("#criteria").val();
    data.type = type;
    data.criteria = criteria;
    data.offset = 0;

    console.log(data);
    $.post("/search", data, function(result) {
        console.log("type = ", type);
        createTable(result, type);
    })
    return false;
})

$("#statusForm1").submit(function(){
    data.type = "status";
    data.criteria = 0;
    data.offset = 0;
    console.log(data);
    $.post("/search", data, function(result) {
        createTable(result, data.type);
    })
    return false;
})

$("#statusForm2").submit(function(){
    data.type = "status";
    data.criteria = 1;
    data.offset = 0;
    $.post("/search", data, function(result) {
        createTable(result, data.type);
    })
    return false;
})

$("#statusForm3").submit(function(){
    data.type = "status";
    data.criteria = 2;
    data.offset = 0;
    $.post("/search", data, function(result) {
        createTable(result, data.type);
    })
    return false;
})

$("#loadButton").click(function(){
    loadlength = loadlength + 10;
    data.offset = loadlength;
    $.post("/search", data, function(result) {
        appendTable(result, data.type);
        console.log("result=",result,"length=",loadlength);
    })
    return false;
})