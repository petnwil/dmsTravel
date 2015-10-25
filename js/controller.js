var controller = {};
var model = {};
var view = {};

/* Hide all content except splashscreen on start. */
$(function(){
  $('#content').hide();
  $('#menu').hide();
  $('#about').hide();
  $('#fourthRow').hide();
  $('#documentation').hide();
});


/* Call for logiIn when login button pressed. */
$(function(){
  $('#loginButton').click(function(){
    model.logIn();
  });
});


/*Call for logOut when logout button pressed. */
$(function(){
  $('#logoutButton').click(function(){
    model.logOut();
  });
});


/* Hide and show correct screen when documentation is pressed in menu. */
$(function(){
  $('#docPage').click(function(){
      $('#content').hide();
      $('#about').hide();
      $('#documentation').show();
  });
});


/* Hide and show correct screen when about is pressed in menu. */
$(function(){
  $('#aboutPage').click(function(){
    $('#content').hide();
    $('#documentation').hide();
    $('#about').show();
  });
});


/* Hide and show correct screen when home is pressen in menu. */
$(function(){
  $('#contentPage').click(function(){
    $('#about').hide();
    $('#documentation').hide();
    $('#content').show();
  });
});


/* Function which scroll page down to thumbnails of photos when user click main
thumbnail. */
controller.scroll = function(){
  console.log("SCROLL CALLED");
  $('html,body').animate({
    scrollTop: $("#fourthRow").offset().top
  },2000);
};
