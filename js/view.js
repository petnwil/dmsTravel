/* Function for displaying despription. Appends the description to the
description div */
view.displayDescription = function(description){
  $('#description').append(description);
};


/* Function which creates the html for album thumbnails. Adds the getThumbnails-
function to each main thumbnail. Finally appends the thumbnails to the
thumbs div. */
view.displayMainThumbs = function(albumName,source,id,likes){

  if(likes > 1)
  {
    personsLiked = " persons like this album";
  }
  else
  {
    personsLiked = " person like this album";
  }

  var personLikes = "<p id='persLikeMain'>" +likes + personsLiked+ "</p>";
  var caption = "<figcaption>" + albumName + "</figcaption>";
  var img = "<img class='mainThumb' id='"+id+"'  src='" + source + "'alt='' onclick='model.getThumbnails("+id+")'></img>"; //remember alt
  var figur = "<figure class='mainT'>" +img + caption + personLikes + "</figure>";
  $('#thumbs').append(figur);
};


/* Function for displaying post from the FB feed. Appends the post and
author to the posts div. */
view.displayPost = function(message,author){
  var post = "<div  id='post'> <p id='message'>"+message+"</p>";
  post += "<div id='author'> -" + author+ "</div> </div>";
  $('#posts').append(post);
};


/* Function which creates thumbnails for photos in a album. Add correct button,
count of likes, title to the picture and lightbox. Appends the thumbnails to the
fourthRow div. */
view.displayThumbs = function(source,largest,caption,photoId,likes,bool,albumId){
  var img = "<img class='thumbPicture' src='" + source + "'alt=></img>";
  var a = "<a href='" + largest + "'data-lightbox=image data-title='"+caption+"'>"+img+"</a>";
  var title = "<figcaption>" + caption + "</figcaption>";
  var button;

  if(bool)
  {
    button = "<button class='unlikeButton' id='"+photoId+"' onclick='model.unlikePic("+photoId+","+albumId +")'>Unlike</button>";
    //$('.' + img).css("border","#4c66a4 solid 2px");
  }
  else
  {
    button = "<button class='likeButton' id='"+photoId+"' onclick='model.likePic("+photoId+","+albumId+")'>Like</button>";
  }

  var pers ="";

  if(likes > 1)
  {
    pers = " persons likes this photo";
  }
  else {
    pers = " person like this photo";
  }

  var personLikes = "<p id='persLike'>" + likes + pers+ "</p>";
  var figure = "<figure>"+ a + title + personLikes + button + "</figure>";

  $('#fourthRow').append(figure);
};
