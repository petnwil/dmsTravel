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



//DMS Travel id
var pageId = "815157038515764";

var picArray =[];



function getAlbumInfo(){
  FB.api(pageId,'GET',{"fields":"albums{name,location,cover_photo,likes}"},
function(response){
console.log(response.albums.data);
  for(var i=0; i < response.albums.data.length; i++)
  {
    obj = {id:"",name:"",location:"",likes:"", url:""};

    obj.id = response.albums.data[i].id;
    console.log(obj.id);
    obj.name = response.albums.data[i].name;
    console.log(obj.name);
    obj.location = response.albums.data[i].location;
    console.log(obj.location);
    if(typeof response.albums.data[i].likes === "undefined")
    {
      obj.likes = 0;
    }
    else{
      obj.likes = response.albums.data[i].likes.data.length;
    }

    getCoverPhotoSource(response.albums.data[i].cover_photo.id,obj);
    picArray.push(obj);
  }

  console.log(picArray);
  console.log(picArray[0].id + " id i array0");
  console.log(picArray[0].name + " name i array0");
  console.log(picArray[0].location + " lcation i array0");
  //console.log(picArray[0].url + " id i array0");
  if(picArray[0].url !== undefined)
  {
    console.log("url exists");
    console.log(picArray[0].url);
  }
  else {
    console.log("no url");
  }
  console.log(picArray[1].id + " id i array0");
  console.log(picArray[1].name + " name i array0");

  });
}


//Function to get URL to cover_photo
function getCoverPhotoSource(id,obj){
  FB.api('/'+id,'GET',{"fields":"source"}, function(response){
    return response.source;
  });
}
