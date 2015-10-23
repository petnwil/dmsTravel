var controller = {};
var model = {};
var view = {};

$(function(){
  $('#content').hide();
  $('#menu').hide();
  $('#about').hide();
  $('#fourthRow').hide();
  $('#documentation').hide();
});

$(function(){
  $('#loginButton').click(function(){
    model.logIn();
  });
});

$(function(){
  $('#logoutButton').click(function(){
    model.logOut();
  });
});

$(function(){
  $('#docPage').click(function(){
      $('#content').hide();
      $('#about').hide();
      $('#documentation').show();
  });
});

$(function(){
  $('#aboutPage').click(function(){
    $('#content').hide();
    $('#documentation').hide();
    $('#about').show();
  });
});

$(function(){
  $('#contentPage').click(function(){
    $('#about').hide();
    $('#documentation').hide();
    $('#content').show();
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
