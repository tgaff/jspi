var chai = require('chai');
var assert = require('assert');
chai.should();
var should = require('chai').should();
var expect = chai.expect;


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(5) );
      ([1,2,3].indexOf(0)).should.equal(-1);
      expect([1,2,3].indexOf(123123)).to.equal(-1);
    });
  });
});


var subject = require('../lib/leakyDog.js');

describe('Mammal', function() {
  var someMammal;
  beforeEach(function() {
    someMammal = new subject.Mammal('hairy thing');
  });
  it('speaks', function() {
    expect(someMammal.speak()).to.match(/hairy/);
  });
  it('can move', function() {
    expect(someMammal.move).to.increase(someMammal.location, 'x');
  });

});


describe('Dog', function() {
  var dog;
  beforeEach(function() {
    dog = new subject.Dog();
  });
  it('speaks', function() {
    expect(dog.speak()).to.be.a('string');
  });
  it('says its a dog', function() {
    expect(dog.speak()).to.match(/dog/);
  });
});

describe('Terrier', function() {
  var terrier;
  var anonDog;
  var defaultLocation = {x: 0, y: 0, z: 0}; Object.freeze(defaultLocation);
  beforeEach(function() {
    anonDog = new subject.Dog();
    terrier = new subject.Terrier();
  });
  it('speaks', function() {
    var terrier = new subject.Terrier();
    expect(terrier.speak()).to.be.a('string');
  });
  it('says its a dog', function() {
    expect(terrier.speak()).to.match(/dog/);
  });
  describe('.move', function() {
    it('can move also', function() {
      expect(terrier.location).to.eql(defaultLocation);
      expect(function() { terrier.move(2)} ).to.increase(terrier.location, 'x');
      expect(terrier.location.x).to.equal(2);
    });
    // TESTS WHETHER LOCATION IS LEAKED TO PARENT OBJECTS
    // this fails ----- why?
    xit("doesn't move other animals", function() {
      terrier.move();
      debugger;
      expect(anonDog.location.x).to.equal(0);
    });
    // location is updated apparently stored on Dog?
    // moving terrier moves dog
    // moving dog moves terrier
    // only moving animal only moves animal
    //
    // let's prove that:
    it('has a new location for mammal only; Dogs reuse the same location', function() {
      var d = new subject.Dog();
      var p = new subject.Mammal('possum');
      var t = new subject.Terrier();
      expect(d.location.x).to.equal(t.location.x);
      expect(d.location.x).to.not.equal(p.location.x);
      expect(p.location).to.eql({x:0,y:0,z:0});
      p.move(100)
      expect(p.location.x).to.equal(100);
      expect(p.location.x).to.not.equal(d.location.x);
    });
  });
});
