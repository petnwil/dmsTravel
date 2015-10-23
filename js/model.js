//********************** CALL FOR GETTING FACEBOOK SDK *************************
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
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
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
      //document.getElementById('status').innerHTML = 'Please log ' +
        //'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      //document.getElementById('status').innerHTML = 'Please log ' +
        //'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

//***************************   MODAL.JS ***************************************
model.pageId = "815157038515764";
model.obj = {};
//model.callback = view.displayMainThumbs;

//Logout function
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

model.logIn = function(){
  FB.login(function(response){
    console.log("User logged in!");
    statusChangeCallback(response);
  },{scope:'public_profile,email'});
};

//get and shows description in div description
model.getDescription = function(){
  FB.api(model.pageId,{fields:'description'},function(response){
    view.displayDescription(response.description);
  });
};

//Get the thumbnails for the albums
model.getMainThumb = function(){
  FB.api(model.pageId,'GET',{"fields":"albums{id,name,location,cover_photo,likes}"},function(response){
    console.log(response);

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

      //console.log("*********************************");
      console.log(obj.albumLocation + " albumlocation");
      indexAustralia = obj.albumLocation.indexOf("Australia");
      console.log(indexAustralia + " index");
      if( indexAustralia !== -1)
      {
        model.getUrl(albumCoverPhotoId,obj);
      }
    }

  });
}; //end of getThumb

//Get URL for main thumbnails and show them in #secondRow
model.getUrl = function(albumCoverPhotoId,obj){
  console.log("get into getURL");

  FB.api(albumCoverPhotoId,'GET',{"fields":"source"},function(response){

    var source = response.source;
    var albumName = obj.albumName;
    var likes = obj.likes;
    var id = obj.albumId;
    //console.log("id i getURL: " + id);

    /*var caption = "<figcaption>" + albumName + " <br>Likes " + likes + " </figcaption>";
    var img = "<img class='mainThumb' id='"+id+"'  src='" + source + "'alt='' onclick='model.getThumbnails("+id+")'></img>"; //remember alt
    var figur = "<figure class='mainT'>" +img + caption+ "</figure>";
    $('#thumbs').append(figur);*/

    view.displayMainThumbs(albumName,source,id,likes);
  });
};

//Get thumbnails for showing album after user clicked main thumbnail
model.getThumbnails =function(id){
  $('#fourthRow').html("");
  $('#fourthRow').show();
  console.log("INTO GETTHUMBNAILS");
  FB.api('/'+id,'GET',{"fields":"photos{images,name,likes{id}},id"},function(response){
    console.log(response);
      var likes;
      var button = "<button>TESTTEST</button>";

      for(var i =0; i < response.photos.data.length; i++)
      {

        var photoId = response.photos.data[i].id;

        //var likeArray;
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

        //console.log("CAPT I første løkke: " + capt);
        //console.log("IMAGES: " + response.photos.data[i].images[0].source);
        for(var j=0; j < response.photos.data[i].images.length;j++)
        {

          var largest = response.photos.data[i].images[0].source;
          //console.log("largest source: " + largest);

          if(response.photos.data[i].images[j].height === 320)
          {
            var source320 = response.photos.data[i].images[j].source;
            //console.log("SOURCE 320: " + source320);
            view.displayThumbs(source320,largest,capt,photoId,likes);
          }
        }
      }
      //$('#fourthRow').show();
  });
  controller.scroll();
};

//Get Facebook post liked by admin: DMS Travel
model.getComments = function(){
  var adminID = "815157038515764";
  console.log("GET into getComments");
  var likesID = "";

  FB.api(model.pageId,'GET',{"fields":"feed{message,story,likes{id,name}}"},function(response){
    console.log(response);
    for (var i = 0; i < response.feed.data.length; i++) {
      //console.log(response.feed.data[i]);

      if(typeof response.feed.data[i].likes !== "undefined")
      {
        //console.log("inside if, property likes and message exists");
        //console.log("object inside if: " + response.feed.data[i].likes.data);
        for(var j = 0; j < response.feed.data[i].likes.data.length; j++)
        {
          //console.log("LIKES DATA");
          //console.log(response.feed.data[i].likes.data[j]);
          if(response.feed.data[i].likes.data[j].id === adminID)
          {
            var author = response.feed.data[i].likes.data[j].name;
            var message = response.feed.data[i].message;
            //console.log("GETTING ID");
            //console.log("this should be id: " + adminID + " " +response.feed.data[i].likes.data[j].id);

            /*var post = "<div  id='post'> <p id='message'>"+response.feed.data[i].message+"</p>";
            post += "<div id='author'> -" + author+ "</div> </div>";
            $('#posts').append(post);*/

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

//Like a picture when user clicks "like" button under thumbnail
model.likePic =function(photoId){
  console.log(photoId);
  photoId = photoId.toString();
  photoId = photoId+"/likes";
  console.log(photoId);

  FB.api(photoId,'POST',{},function(response){
    console.log(response);
  });
};

//Unlike a picture when user clicks "unlike" button under thumbnail
model.unlikePic = function(photoId){
  photoId = photoId.toString();
  photoId = photoId+"/likes";

  FB.api(photoId,'DELETE',{},function(response){
    console.log(response);
  });
};

/*check if picture is likes
model.checkLike = function(id,button){
  FB.api('/me','GET',{"fields":"id"},function(response){
    if(response.id === id)
    {
      console.log("ID IS THE SAME");
      $('#fourthRow').append("<button>test</button>");
      console.log("AFTER APPEND TO FOURTHROW");
    }
  });
}; */
