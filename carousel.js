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
  $('#gallery').html("<img src=" + photo +">");
}

function searchWord(e, self) {
  e.preventDefault();
  var word = $(self).find('input[name="word"]').val();
  flickr(word);
}

function keyMove(e) {
  if (e.keyCode == 37) {
    position --;
    appendPhoto(photos[position]);
  } else if (e.keyCode == 39) {
    position ++;
    appendPhoto(photos[position]);
  }
}

$(document).on('ready', function(){
  $('form').on('submit', function(e){
    searchWord(e, this);
  });

  $(document).keydown(function(e){
      keyMove(e);
  });
});
