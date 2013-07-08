function Carousel(container){
  this.container = container;
  this.photos = [];
  this.position = 0;
  this.word;
}


Carousel.prototype.processPhotos = function(data){
  var self = this;
  self.position = 0;
  self.photos = [];
  $.each(data.photos.photo, function(index, photo){
    self.photos.push(urlPhoto(photo));
  });
  self.appendPhoto(self.photos[self.position]);
};

Carousel.prototype.flickr = function(word) {
  var self = this;
  self.word = word;
 $.getJSON('http://api.flickr.com/services/rest/?jsoncallback=?', {
  method: 'flickr.photos.search',
  api_key: 'b87176d912b9ca01fbabb271de79e769',
  text: word,
  content_type: 1, //return photo only
  format: 'json'
  }).success(function(data) {
    self.processPhotos(data);
  }).fail(function(error){
    console.log("Warning" + error);
  });
};

Carousel.prototype.appendPhoto = function(photo) {
  var self = this;
  $(self.container).find(".photo").html("<img src=" + photo +">");
  self.counter();
  self.disable();
  self.preload();
};

Carousel.prototype.preload = function() {
  var self = this;
  var div = $(self.container).find('.preload');
  div.html("");
  for (i = 1; i < 10; i++) {
    div.append("<img src=" + self.photos[nTimes(nextPosition, [self.photos, self.position], i)[1]] +">");
    div.append("<img src=" + self.photos[nTimes(pastPosition, [self.photos, self.position], i)[1]] +">");
  }
};

Carousel.prototype.searchWord = function(e, own) {
  var self = this;
  e.preventDefault();
  var word = $(own).find('input[name="word"]').val();
  self.flickr(word);
};

Carousel.prototype.moveBack = function() {
  var self = this;
  self.position = pastPosition([self.photos, self.position])[1];
  self.appendPhoto(self.photos[self.position]);
};

Carousel.prototype.moveForward = function() {
  var self = this;
  self.position = nextPosition([self.photos, self.position])[1];
  self.appendPhoto(self.photos[self.position]);
};

Carousel.prototype.keyMove = function(e) {
  var self = this;
    self.disable();
  if (e.keyCode == 37) {
    self.moveBack();
  } else if (e.keyCode == 39) {
    self.moveForward();
  }
};

Carousel.prototype.listeners = function(e) {
  var self = this;
  $(self.container).keyup(function(e){
    self.keyMove(e);
  });

  $(self.container).on('submit', 'form', function(e){
    self.searchWord(e, this);
  });

  $(self.container).on("click", 'button', function(e){
    e.preventDefault();
    if ($(this).attr("name") === "left") {
      self.moveBack();
    } else if ($(this).attr("name") === "right") {
      self.moveForward();
    }
  });
};

Carousel.prototype.counter = function() {
  $(this.container).find('span').text("Image " + (this.position + 1) + " of " + this.photos.length);
};

Carousel.prototype.disable = function() {
  var self = this;
  var word = $(this.container).find("input[name=word]").val();
  var input = $(this.container).find("input[type=submit]");
  if (word === self.word) {
    input.attr("disabled", "disabled");
    input.attr("style", "color: gray;");
  } else {
    input.removeAttr("disabled");
    input.attr("style");
  }
};

function pastPosition(args) {
  var photos = args[0];
  var current = args[1];
  if (current === 0) {
    return [photos,(photos.length - 1)];
  } else {
    return [photos,(current - 1)];
  }
};

function nextPosition(args) {
  var photos = args[0];
  var current = args[1];
  if (current === (photos.length - 1)) {
    return [photos,0];
  } else {
    return [photos,(current + 1)];
  }
};

function nTimes(fn, element, n, i) {
  i = i || 0;
  i ++;
  if (i === n) {
    return fn(element);
  } else {
    return fn(nTimes(fn, element, n, i));
  }
}

function urlPhoto(photo) {
  return "http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
}


$(document).on('ready', function(){
  var carouselFirst = new Carousel("#carousel-1");
  var carouselSecond = new Carousel("#carousel-2");

  $(carouselFirst.container).on('click', function(e) {
    carouselFirst.listeners(e);
  });

  $(carouselSecond.container).on('click', function(e) {
    carouselSecond.listeners(e);
  });
});

