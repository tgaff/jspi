// New theory.  Things on prototype are for inheriting to sub-things
//
// Things not on prototype (e.g. in the constructor) are only for
// use by the child.
//
// Other things attached are ??


// Reptile constructor
var Reptile = function(type) {
  this.type = type;
  this.skinType = 'really scaly';
}

// Abilities we want Reptile and its progeny to have go in the prototype
Reptile.prototype.roar = function() { return 'Raaaaaaarrghhhhh!' };
Reptile.prototype.speak = function() {
  return("Brehhhh I'm a " + this.type + "type of critter");
};

// this will work, but we can't
//   new Dinosaur
//  since Dinosaur isn't a function.
var Dinosaur = new Reptile(Dinosaur);



/************************
 *   PART 2
 *
 *   Demonstrating 1 levels of inheritance
 *
 * *********************/





var Reptile2 = function(type) {
  // Reptile2 constructor
  this.type = type;
  this.skinType = 'really scaly';
  this.canSwim = false;
  this.location = {x:0, y:0, z:0};
};

// Abilities we want Reptile and its progeny to have go in the prototype
Reptile2.prototype.roar = function() { return 'Raaaaaaarrghhhhh!' };
Reptile2.prototype.speak = function() {
  return("Brehhhh I'm a " + this.type + " type of critter");
};


var AncientFish = function(type) {
  this.canSwim = true;
  //parent constructor isn't called.  we must do this here too.
  this.type = type;
}
// and I inherit from reptiles2
AncientFish.prototype = new Reptile2;
AncientFish.prototype.swim = function(x,y,z) {
  if (typeof x === undefined) { x = 1; }
  if (typeof y === undefined) { y = 2; }
  if (typeof z === undefined) { z = 0; }
  this.location.x = this.location.x + x;
  this.location.y = this.location.y + y;
  this.location.z = this.location.z + z;
  return('swam');
}



















































/*****************************************************
 *     Part 3
 *
 *     moving variables out of the constructor
 *
 * **************************************************/

var ModernFish = function(type) {
  this.type = type;
  hasJaws = true;
}
ModernFish.prototype = new AncientFish;
var TetraPod = function(type) {
  this.type = type;
  this.hasJaws = true;
  this.hasFeet = true;
  this.skinType = 'slimy';
};
TetraPod.prototype = new AncientFish;
TetraPod.prototype.crawl = function(x,y) {
  this.swim(x,y,0);
  return('step step');
}































module.exports = {
  Dinosaur: Dinosaur,
  Reptile: Reptile,
  Reptile2: Reptile2,
  AncientFish: AncientFish,
  ModernFish: ModernFish,
  TetraPod: TetraPod
};
