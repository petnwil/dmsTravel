//********************** CALL FOR FACEBOOK SDK *************************
//fFacebook SDK - include it on every page I want to use it
   window.fbAsyncInit = function() {
     FB.init({
       appId      : '771155319662299',
       xfbml      : true,
       version    : 'v2.5'
     });
   };

   (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    /*The response object is returned with a status field that lets the
     app know the current login status of the person.
     Full docs on the response object can be found in the documentation */
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      $('#splash').hide();
      $('#content').show();
      $('#menu').show();
      model.getDescription();
      model.getMainThumb();
      model.getComments();

    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
    } else {
      /*The person is not logged into Facebook, so we're not sure if
      they are logged into this app or not.*/
    }
  }

// Function from Facebook
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }



//***************************   MODEL.JS ***************************************
model.pageId = "815157038515764";


/*Function for login in. Calls FB.login function which calls the statusChangeCallback
function. */
model.logIn = function(){
  FB.login(function(response){
    console.log("User logged in!");
    statusChangeCallback(response);
  },{scope:'public_profile,email,publish_actions'});
};


/*Function for login out. Calls FB.logout function and blank all divs where content
have been added. Finally hide divs and show the splashscreen. */
model.logOut = function(){
   FB.logout(function(response) {
      $('#description').html("");
      $('#thumbs').html("");
      $('#postTitle').html("");
      $('#posts').html("");
      $('#fourthRow').html("");
      $('#content').hide();
      $('#documentation').hide();
      $('#about').hide();
      $('#menu').hide();
      $('#splash').show();
      console.log("User is now logged out");
  });
};


/*Function for getting the pages description. Calls displayDescription and sends
description as parameter. */
model.getDescription = function(){
  FB.api(model.pageId,{fields:'description'},function(response){
    view.displayDescription(response.description);
  });
};


/* Function for getting data for each album. Saves data as variables pushes this
to an object. The function check for the location of the album, if the location is
Australia its call for getUrl and send the object and the albums id
as parameters. */
model.getMainThumb = function(){
  FB.api(model.pageId,'GET',{"fields":"albums{id,name,location,cover_photo,likes.limit(150)}"},function(response){
    //console.log(response);

    var albumId ="";
    var albumName ="";
    var albumLocation ="";
    var albumCoverPhotoId ="";
    var albumCoverPhotoName ="";
    var albumLikes =0;
    var coverPhotoSource = "";

    for(var i = 0; i < response.albums.data.length;i++)
    {
      id = response.albums.data[i].id;
      albumName = response.albums.data[i].name;
      albumCoverPhotoId = response.albums.data[i].cover_photo.id;

      if(typeof response.albums.data[i].location === "undefined")
      {
        albumLocation = "Location unknown";
      }
      else{
        albumLocation = response.albums.data[i].location;
      }


      if(typeof response.albums.data[i].likes === "undefined")
      {
        albumLikes = 0;
      }
      else{
        albumLikes = response.albums.data[i].likes.data.length;
      }

      obj = {albumId:id, albumName:albumName, albumLocation:albumLocation, albumCoverPhotoId:albumCoverPhotoId, albumCoverPhotoName:albumCoverPhotoName,likes:albumLikes};

      indexAustralia = obj.albumLocation.indexOf("Australia");
      console.log(indexAustralia + " index");
      if( indexAustralia !== -1)
      {
        model.getUrl(albumCoverPhotoId,obj);
      }
    }

  });
}; //end of getThumb


/* Function for getting the source for the cover photo. Save source, name, likes
and id in variables and passes this to displayMainThumbs. */
model.getUrl = function(albumCoverPhotoId,obj){
  FB.api(albumCoverPhotoId,'GET',{"fields":"source"},function(response){

    var source = response.source;
    var albumName = obj.albumName;
    var likes = obj.likes;
    var id = obj.albumId;

    view.displayMainThumbs(albumName,source,id,likes);
  });
};


/* Function which get thumbnails for pictures in a album. Saves photos id, number
of likes, title and source of picture. Passes these variables to checkLike. */
model.getThumbnails =function(id){
  $('#fourthRow').html("");
  //$('#fourthRow').show();
  console.log("INTO GETTHUMBNAILS");
  FB.api('/'+id,'GET',{"fields":"photos{images,name,likes.limit(150){id}},id"},function(response){
    console.log(response);
      var likes;
      var albumId = id;

      for(var i =0; i < response.photos.data.length; i++)
      {

        var photoId = response.photos.data[i].id;

        if(typeof response.photos.data[i].likes === "undefined")
        {
          likes = 0;
        }
        else
        {
          likes = response.photos.data[i].likes.data.length;
        }


        if(typeof response.photos.data[i].name === "undefined" )
        {
          capt = "noTitle";
        }
        else
        {
          capt = response.photos.data[i].name;
        }

        for(var j=0; j < response.photos.data[i].images.length;j++)
        {

          var largest = response.photos.data[i].images[0].source;

          if(response.photos.data[i].images[j].height === 320)
          {
            var source320 = response.photos.data[i].images[j].source;
            model.checkLike(photoId,source320,largest,capt,likes,albumId);
          }
        }//end of for
      }
  });
  $('#fourthRow').show();
  controller.scroll();
};


/* Function which gets post from the Facebook feed which is liked by admin. */
model.getComments = function(){
  var adminID = "815157038515764";
  var likesID = "";

  FB.api(model.pageId,'GET',{"fields":"feed{message,from,name,story,likes{id,name}}"},function(response){

    for (var i = 0; i < response.feed.data.length; i++)
    {
      if(typeof response.feed.data[i].likes !== "undefined")
      {
        for(var j = 0; j < response.feed.data[i].likes.data.length; j++)
        {
          if(response.feed.data[i].likes.data[j].id === adminID)
          {
            var author = response.feed.data[i].from.name;
            var message = response.feed.data[i].message;

            view.displayPost(message,author);
          }
        }
      }
      else
      {
        likesID = "x";
      }
    }
  });
}; //end of getComments


/* Function for like a picture. */
model.likePic =function(photoId,albumId){
  photoId = photoId.toString();
  photoId = photoId+"/likes";

  FB.api(photoId,'POST',{},function(response){
    model.getThumbnails(albumId);
  });
};


/* Function for unlike a picture. */
model.unlikePic = function(photoId,albumId){
  photoId = photoId.toString();
  photoId = photoId+"/likes";

  FB.api(photoId,'DELETE',{},function(response){
      model.getThumbnails(albumId);
  });
};


/* Function for checking if a picture is liked. Function reveices 5 variables.
This function get the id of the user currently logged in and then checks this id
against the id´s in the likes. Sends received parameters and a boolean variable
to displayThumbs. */
model.checkLike = function(photoId,source,largest,caption,likes,albumId){
  FB.api('/me','GET',{"fields":"id"},function(response){
    myId = response.id;

    FB.api('/'+photoId,'GET',{"fields":"likes{id}"},function(response){
      var bool = false;

      if(likes === 0)
      {
        bool = false;
      }
      else
      {
        for(var i = 0; i < response.likes.data.length; i++)
        {
          if(myId === response.likes.data[i].id)
          {
            bool = true;
          }
        }
      }
      view.displayThumbs(source,largest,caption,photoId,likes,bool,albumId);
    });
  });
};
