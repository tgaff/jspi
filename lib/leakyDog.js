//
//

function Mammal(species) {
  var that = this;
  this.location = {x: 0, y: 0, z: 0};
  //BAD:
  this.species = species;
  this.speak = function() {
    return ("breeeehhhh (I'm a '" + this.species + "'.");
  };
  this.move = function(hor, ver) {
    x = hor ? hor : 1;
    y = ver ? ver : 0;
    that.location.x = that.location.x + x;
    that.location.y = that.location.y + y;
    return ('step step step');
  };
}

Dog.prototype = new Mammal();

function Dog() {
  this.species = 'dog';
}

Terrier.prototype = new Dog();
function Terrier() {
  this.breed = 'terrier';
};
























module.exports = {
  Mammal: Mammal,
  Dog: Dog,
  Terrier: Terrier
};
