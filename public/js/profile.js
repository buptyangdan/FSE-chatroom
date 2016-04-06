$(document).ready(function(){
  var from = $("#hidden_from_name").text();
  var to = $("#hidden_target_name").text();
  var fromId = $("#fromId").text();
  var toId = $("#toId").text();//read from cookie and save in from

  $("#submit").click(function(e){
    $.post("/profile/" + toId, {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      address: $("#address").val(),
      occupation: $("#occupation").val(),
      skills: $("#skills").val(),
      status: $('#status option:selected').val()
    }).done(function(){
      $("form").submit(function(){});
    });
  });

  $('.image-popup-no-margins').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });  
});
