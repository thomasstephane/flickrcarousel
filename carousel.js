
function flickr(word) {
     $.getJSON('http://api.flickr.com/services/rest/?jsoncallback=?', {
      method: 'flickr.photos.search',
      api_key: 'b87176d912b9ca01fbabb271de79e769',
      text: word,
      content_type: 1, //return photo only
      format: 'json'
    }).success(function(data) {
      var photo = data.photos.photo[0];
      var url = "http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
      $('#gallery').append("<img src=" + url +">")
    });
}

$(document).on('ready', function(){
  flickr("flower");
});
