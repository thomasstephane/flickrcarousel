
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
  var photos = [];
  $.each(data.photos.photo, function(index, photo){
    photos.push(photo);
  });
  appendPhoto(photos[0]);
}
function urlPhoto(photo) {
  return "http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
}

function appendPhoto(photo) {
  $('#gallery').html("<img src=" + urlPhoto(photo) +">");
}

function searchWord(e, self) {
  e.preventDefault();
  var word = $(self).find('input[name="word"]').val();
  flickr(word);
}

$(document).on('ready', function(){
  $('form').on('submit', function(e){
    searchWord(e, this);
  });
});
