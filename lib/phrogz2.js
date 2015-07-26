Function.prototype.inheritsFrom = function( parentClassOrObject ){
	if ( parentClassOrObject.constructor == Function )
	{
		//Normal Inheritance
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	}
	else
	{
		//Pure Virtual Inheritance
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	}
	return this;
}
//
//
LivingThing = {
	beBorn : function(){
		this.alive = true;
	}
}
//
//
function Mammal(name){
	this.name=name;
	this.offspring=[];
}
Mammal.inheritsFrom( LivingThing );
Mammal.prototype.haveABaby=function(){
	this.parent.beBorn.call(this);
	var newBaby = new this.constructor( "Baby " + this.name );
	this.offspring.push(newBaby);
	return newBaby;
}
//
//
function Cat( name ){
	this.name=name;
}
Cat.inheritsFrom( Mammal );
Cat.prototype.haveABaby=function(){
	var theKitten = this.parent.haveABaby.call(this);
	console.log("mew!");
	return theKitten;
}
Cat.prototype.toString=function(){
	return '[Cat "'+this.name+'"]';
}
//
//
var felix = new Cat( "Felix" );
var kitten = felix.haveABaby( ); // mew!
console.log( kitten );                 // [Cat "Baby Felix"]

var mrTiggles = new Cat( 'Mr. Tiggles' );
var tigglesKitten = mrTiggles.haveABaby();
console.log(mrTiggles.offspring);
