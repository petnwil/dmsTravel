$(function(){
  $('#content').hide();
});

$(function(){
  $('#testbtn').click(function(){
    //$('#splash').hide();
    //$('#content').show();
    });
});


$(function(){
  $('#logoutBtn').click(function(){
    logOut(); //function from facebookscript.js
    $('#content').hide();
    $('#splash').show();
  });
});
