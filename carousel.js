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
  position = 0;
  photos = [];
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

function preload() {
  $('#preload').html("");
  for (i = 1; i < 7; i++) {
    $('#preload').append("<img src=" + photos[nTimes(nextPosition, position, i)] +">");
    $('#preload').append("<img src=" + photos[nTimes(pastPosition, position, i)] +">");
  }
}

function nTimes(fn, element, n, i) {
  i = i || 0;
  i ++;
  if (i === n) {
    return fn(element);
  } else {
    return fn(nTimes(fn, element, n, i));
  }
}

function pastPosition(current){
  if (current === 0) {
    return (photos.length - 1);
  } else {
    return (current - 1);
  }
}

function nextPosition(current) {
  if (current === (photos.length - 1)) {
    return 0;
  } else {
    return (current + 1);
  }
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
  position = pastPosition(position);
  appendPhoto(photos[position]);
}

function moveForward() {
  position = nextPosition(position);
  appendPhoto(photos[position]);
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
