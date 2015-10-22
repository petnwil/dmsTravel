view.displayDescription = function(description)
{
  $('#description').append(description);
};

//Cant get it to show main thumbnails. Think I need callback!
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



view.displayPost = function(message,author){
  var post = "<div  id='post'> <p id='message'>"+message+"</p>";
  post += "<div id='author'> -" + author+ "</div> </div>";
  $('#posts').append(post);
};


view.displayThumbs = function(source,largest,caption,photoId,likes){
  //console.log("VIEW.DISPLAYTHUMB IS CALLED");
  var img = "<img class='thumbPicture' src='" + source + "'alt=></img>"; //remember alt
  var a = "<a href='" + largest + "'data-lightbox=image data-title='"+caption+"'>"+img+"</a>";
  var title = "<figcaption>" + caption + "</figcaption>";
  var like = "Like";
  var likeButton = "<button class='likeButton' id='"+photoId+"' onclick='model.likePic("+photoId+")'>"+like+"</button>";
  var unlike = "Unlike";
  var unlikeButton = "<button class='unlikeButton' id='"+photoId+"' onclick='model.unlikePic("+photoId+")'>"+unlike+"</button>";

  var pers ="";
  if(likes > 1)
  {
    pers = " persons likes this photo";
  }
  else {
    pers = " person like this photo";
  }

  var personLikes = "<p id='persLike'>" +likes + pers+ "</p>";
  var figure = "<figure>"+ a + title + personLikes + likeButton + unlikeButton + "</figure>";
  $('#fourthRow').append(figure);
};
