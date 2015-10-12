$(function(){
  $('#content').hide();
});


$(function(){
  $('#logoutBtn').click(function(){
    logOut(); //function from facebookscript.js
    $('#content').hide();
    $('#splash').show();
  });
});




//DMS Travel id
var pageId = "815157038515764";
var array = [];
var obj = {};


//get and shows description in div description
function showDescription(){
  FB.api(pageId,{fields:'description'},function(response){
    $('#description').append(response.description);
  });
}

function getMainThumb(){
  FB.api(pageId,'GET',{"fields":"albums{id,name,location,cover_photo,likes}"},function(response){
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
        getUrl(albumCoverPhotoId,obj);
      }
    }

  });
} //end of getThumb



//Get URL for main thumbnails and show them in #secondRow
function getUrl(albumCoverPhotoId,obj){
  console.log("get into getURL");

  FB.api(albumCoverPhotoId,'GET',{"fields":"source"},function(response){
    var source = response.source;
    var testname = obj.albumName;
    var likes = obj.likes;
    var id = obj.albumId;
    console.log("id i getURL: " + id);

    var caption = "<figcaption>" + testname + " <br>Likes: " + likes + " </figcaption>";
    var img = "<img class='mainThumb' id='"+id+"'  src='" + source + "'alt='' onclick='getThumbnails("+id+")'></img>"; //remember alt
    //var a = "<a href='" + source + "' data-lightbox=image data-title='"+"'>" + img + "</a>";
    var figur = "<figure class='mainT'>" +img + caption + "</figure>";
    $('#thumbs').append(figur);
  });
}


//Get thumbnails for showing after user clicked main thumbnail on page
function getThumbnails(id){
  $('#thirdRow').html("");
  FB.api('/'+id,'GET',{"fields":"photos{images,name},id"},function(response){
    console.log(response);

      for(var i =0; i < response.photos.data.length; i++)
      {
        if(typeof response.photos.data[i].name === "undefined" )
        {
          capt = "No title";
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
          console.log("largest source: " + largest);

          if(response.photos.data[i].images[j].height === 320)
          {
            var source320 = response.photos.data[i].images[j].source;
            //console.log("SOURCE 320: " + source320);

            var caption = "<figcaption>" + capt + "</figcaption>";
            var img = "<img class='thumbPicture' src='" + source320 + "'alt=></img>"; //remember alt
            var a = "<a href='" + largest + "'data-lightbox=image data-title='"+capt+"'>"+img+"</a>";
            var figure = "<figure>"+ a + caption + "</figure>";
            $('#thirdRow').append(figure);
          }
        }
      }

  });
}
