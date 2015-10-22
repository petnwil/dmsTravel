//Check id for person logged in and check if this person have liked a photo
/*function checkLike(likeArray,button,photoId){
  console.log(button);
  //console.log("INTO CHECKLIKE");
  FB.api('/me','GET',{"fields":"id"},function(response){
    var myId = response.id;
    console.log("MYID " + myId);

    for(var i = 0; i < likeArray.length; i++)
    {

      console.log("LIKEARRAY id inside for loop: " + likeArray[i].id);
      if(myId === likeArray[i].id)
      {
        console.log("ID INSIDE LIKEARRAY: " +likeArray[i].id);
        console.log("ID IS THE SAME");
        var like = "Like";
        button = "<button class='likeButton' id='"+photoId+"' onclick='likePic("+photoId+")'>"+like+"</button>";
      }
      else{
        var unlike ="Unlike";
        button = "<button class='button' id='"+photoId+"' onclick='unlikePic("+photoId+")'>"+unlike+"</button>";
      }
    }
  });
  return button;
}// end of checkLike */
