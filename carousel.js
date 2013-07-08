var photos = [];
var position = 0;

function flickr(word) {
 $.getJSON('http://api.flickr.com/services/rest/?jsoncallback=?', {
  method: 'flickr.photos.search',
  api_key: 'b87176d912b9ca01fbabb271de79e769',
  text: word,
  content_type: 1, //return photo only
  format: 'json'
  }).success(function(data) {
    processPhotos(data);
  }).fail(function(error){
    console.log("Warning" + error);
  });
}

function processPhotos(data){
  $.each(data.photos.photo, function(index, photo){
    photos.push(urlPhoto(photo));
  });
  appendPhoto(photos[position]);
}
function urlPhoto(photo) {
  return "http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
}

function appendPhoto(photo) {
  $('#photo').html("<img src=" + photo +">");
  preload();
}

function searchWord(e, self) {
  e.preventDefault();
  var word = $(self).find('input[name="word"]').val();
  flickr(word);
}

function keyMove(e) {
  if (e.keyCode == 37) {
    moveBack();
  } else if (e.keyCode == 39) {
    moveForward();
  }
}

function moveBack() {
  position --;
  appendPhoto(photos[position]);
}

function moveForward() {
  position ++;
  appendPhoto(photos[position]);
}

function preload() {
  $('#preload').html("");
  for (i = position; i < position + 5; i++) {
    $('#preload').append("<img src=" + photos[i] +">");
  }
}

$(document).on('ready', function(){
  $('form').on('submit', function(e){
    searchWord(e, this);
  });

  $(document).keydown(function(e){
      keyMove(e);
  });

  $('button').on("click", function(e){
    e.preventDefault();
    if ($(this).attr("name") === "left") {
      moveBack();
    } else if ($(this).attr("name") === "right") {
      moveForward();
    }
  });
});
