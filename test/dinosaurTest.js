var chai = require('chai');
var assert = require('assert');
chai.should();
var should = require('chai').should();
var expect = chai.expect;


var subject = require('../lib/dinosaur.js');

describe('Dino', function() {
  it('is extinct; cannot beget new objects', function() {
    //dino = new subject.Dinosaur('stegosaurus');
    // this fails because Dinosaur isn't a function
    // verify:
    expect(function() { new subject.Dinosaur('stego') }).to.throw();
    //dinosaurs are extinct....
  });
});








describe('a reptile 2', function() {

  it('speaks', function() {
    var someReptile = new subject.Reptile2('scaly thing');
    someReptile.speak().should.match(/Brehh/);
    someReptile.speak().should.match(/scaly thing/);
  });

});


describe('ancient fish', function() {
  // we must set any function parameters in each child object
  // that means parent constructors aren't called.
  it('speaks', function() {
    var jawless = new subject.AncientFish('lamprey');
    jawless.speak().should.match(/Brehh/);
    jawless.speak().should.match(/lamprey/);
  });
  it('swims but reptiles dont', function() {
    var jawless = new subject.AncientFish('lamprey');
    var reptile = new subject.Reptile2('scales');
    expect(jawless.canSwim).to.be.true;
    expect(reptile.canSwim).to.be.false;
  });
  describe('PROBLEMS: ', function() {
    var oneFish, twoFish, lizard;
    beforeEach(function() {
      oneFish = new subject.AncientFish('one');
      twoFish = new subject.AncientFish('two');

      lizard = new subject.Reptile2('lizard');
    })
    it('when it swims, apparently the whole world swims', function() {
     expect(oneFish.type).to.equal('one');
      expect(twoFish.type).to.equal('two');

      oneFish.swim(100,1,1);
      twoFish.swim(0, 5, 5);
      //expect(oneFish.location).to.eql( {x:100,y:1,z:1} );
      //expect(twoFish.location).to.eql( {x:0, y:5, z:5} );
      // the above FAILS - everything is sharing the same location
      var swimsWithAll = new subject.AncientFish('I swim for everyone');
      expect(swimsWithAll.location).to.eql( {x:100, y:6, z:6} );
      // expect(lizard.location).to.eql( { x:100, y: 6, z: 6} );
      // NO the above failed also... so Fish are sharing location but
      // Reptiles aren't shared with them.
      // Why?
      //
      // They have the same __proto__
      expect(oneFish.constructor).to.eql(twoFish.constructor);
      expect(oneFish.__proto__).to.eql(twoFish.__proto__);
      expect(oneFish.__proto__ === twoFish.__proto__).to.be.true;
      // reptile does not
      expect(oneFish.__proto__ === lizard.__proto__).to.be.false;
      //  In the next experiment lets see what happens if we move location
      //  to not be in the constructor.
    });

    describe("strangely says its constructor is Reptile2's constructor", function() {
      it('is demonstrably so', function() {
       expect(oneFish.constructor === lizard.constructor);
      });
      //why?
      it("because it doesn't have its own; its inherited", function() {
        expect(oneFish.hasOwnProperty('constructor')).to.be.false;
        expect(subject.AncientFish.hasOwnProperty('constructor')).to.be.false;
      });
      it("also fish (subclass) have no constructors of their own", function() {
        expect(lizard.hasOwnProperty('constructor')).to.be.false;
        expect(twoFish.hasOwnProperty('constructor')).to.be.false;

        expect(lizard.__proto__.hasOwnProperty('constructor')).to.be.true;
        expect(twoFish.__proto__.hasOwnProperty('constructor')).to.be.false;
      });
      xit('why does twoFish.__proto__ not have its own constructor', function() {
      });
    });
  });

});










// inCOMPLETe



describe('modern fish', function() {
  // we must set any function parameters in each child object
  // that means parent constructors aren't called.
  it('speaks', function() {
    var jawless = new subject.AncientFish('lamprey');
    jawless.speak().should.match(/Brehh/);
    jawless.speak().should.match(/lamprey/);
  });
  it('swims but reptiles dont', function() {
    var jawless = new subject.AncientFish('lamprey');
    var reptile = new subject.Reptile2('scales');
    expect(jawless.canSwim).to.be.true;
    expect(reptile.canSwim).to.be.false;
  });
});



















// what we learned:
describe('anything set in the constructor', function() {
  var oneFish, twoFish, aReptile;
  beforeEach(function() {
    oneFish = new subject.AncientFish('one');
    twoFish = new subject.AncientFish('two');

    aReptile = new subject.Reptile2('lizard');
    anotherReptile = new subject.Reptile2('scales');
  });
  it('is shared between spawn if its an object', function() {
     debugger;

  });
});





