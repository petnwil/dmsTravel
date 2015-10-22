var controller = {};
var model = {};
var view = {};

$(function(){
  $('#content').hide();
  $('#fourthRow').hide();
});

$(function(){
  $('#loginButton').click(function(){
    model.logIn();
  });
});

$(function(){
  $('#logoutButton').click(function(){
    model.logOut(); //function from facebookscript.js

  });
});


//Scroll down to last row when user clicks one of the main thumbnails
controller.scroll = function(){
  console.log("SCROLL CALLED");
  $('html,body').animate({
    scrollTop: $("#fourthRow").offset().top
  },2000);
};


/*controller.displayCallback = function(albumName,source,id,likes){
  console.log("DISPLAYCALLBACK IS CALLED");
  view.displayMainThumbs(albumName,source,id,likes);
};*/
