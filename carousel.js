
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
  $('#gallery').append("<img src=" + urlPhoto(photo) +">");
}

$(document).on('ready', function(){
  flickr("flower");
});
