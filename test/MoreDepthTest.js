var chai = require('chai');
var assert = require('assert');
chai.should();
var should = require('chai').should();
var expect = chai.expect;


var subject = require('../lib/MoreDepth.js');


/************************************************
 *
 * Part 5 - inherit deeper
 *
 * *******************************************/

describe('Vehicle', function() {
  var v1, v2
  beforeEach(function() {
    v1 = new subject.Vehicle('vehicle1');
    v2 = new subject.Vehicle('vehicle2');
  });
  it('has a private primitive variable', function() {
    expect(v1.privateP).to.be.undefined;
    expect(v2
    expect(child1.getPrivate('objWithoutThisOrVar').x).to.equal('objWithoutThisOrVar');
  });
  it('has a p:qrivate objWithoutThis (that we cant touch)', function() {
    expect(child1.objWithoutThis).to.be.undefined;
    expect(child1.getPrivate('objWithoutThis').x).to.equal('objWithoutThis');
  });

  it('constructor objects are NOT shared', function() {
    child1.unSharedObj.x = 'asfd';
    expect(child2.unSharedObj.x).to.equal('unshared');
    expect(child1.unSharedObj.x).to.equal('asfd');
  });
  describe('getPrivate has a closure', function() {
    //technically we already showed this
    it('that includes the otherwise inaccessible\
       objWithoutThis from the constructor', function() {
      child1.getPrivate('objWithoutThis').x.should.equal('objWithoutThis');
    });
    it('and is unique for each child', function() {
      child1.getPrivate('arg1').should.equal(1);
      child2.getPrivate('arg1').should.equal(2);
    });
  });





  // singleton!
  it('objects on the prototype are shared', function() {
    child1.proto_y.a = 439;
    expect(child2.proto_y.a).to.equal(439);
  });
  it('functions on the prototype are shared', function() {
    expect(child1.sharedFunction).to.eql(child2.sharedFunction);
    // but not in the constructor
    expect(child1.getPrivate).to.not.eql(child2.getPrivate);
  });

  it('plain vars on the prototype _APPEAR_ to be not shared', function() {
    child1.proto_x = 439;
    expect(child2.proto_x).to.equal(1);
    expect(child1.proto_x).to.equal(439);
  });
  it('plain vars on the prototype are shared but if you try to alter them\
     with "this" a new var is created on the object itself that supersedes\
     the __proto__ variant (how scary)', function() {
    child1.proto_x = 439;
    expect(child1.proto_x).to.equal(439);
    expect(child2.proto_x).to.equal(1);
    expect(child1.__proto__.proto_x).to.equal(1);
    expect(child2.hasOwnProperty('proto_x')).to.be.false;
    expect(child1.hasOwnProperty('proto_x')).to.be.true;
  });
  it('plain vars on the prototype can be altered and are still shared \
     when you alter them on the prototype (note depends on engine)',
     function() {
    child1.__proto__.proto_x = 43;
    child2.proto_x.should.equal(43);
  });
});






describe('SubParent', function() {
  beforeEach(function() {
    sp2 = new subject.SubParent('sp2');
    sp1 = new subject.SubParent('sp1');
    tp2 = new subject.TopParent('tp2');
    tp1 = new subject.TopParent('tp1');
  });
  describe('defined on the sub-class', function() {
    it('has the instanceVar', function() {
      expect(sp1.instanceVar).to.equal('SubParent: sp1');
    });
    it('instanceVar is unique per instance', function() {
      expect(sp1.instanceVar).to.equal('SubParent: sp1');
      expect(sp2.instanceVar).to.equal('SubParent: sp2');
    });
    it('instanceVar did not sneak up to the parent objects children', function() {
      expect(tp1.instanceVar).to.be.undefined;
    });
  });
});
describe('inheritance from TopParent', function() {
  it('can access the same private Variables (from constructor)', function() {
    tp1.getPrivate('objWithoutThis').x.should.equal('objWithoutThis');
    sp1.getPrivate('objWithoutThis').x.should.equal('objWithoutThis');
    sp2.getPrivate('objWithoutThis').x.should.equal('objWithoutThis');
  });
  it('can use the prototype method', function() {
    tp1.sharedFunction(3);
    sp1.sharedFunction(10);
    sp2.sharedFunction(100);

    // NOTE the validations here are a little dumb due to the weird
    // overriding of __proto__.proto_x in TopParent
    expect(sp1.proto_x).to.equal(12);
    expect(sp2.proto_x).to.equal(102);

    expect(tp1.proto_x).to.equal(5);
  });
// HERES THE BIG ONE:
  it("because the prototype of all subclasses is the same\
    instance of TopParent, they share all objects created by\
    TopParent constructor", function() {
    // first show that top parent doesnt have this sharing issue
    tp1.unSharedObj.x.should.equal('unshared');
    tp2.unSharedObj.x = 'asdf';
    tp1.unSharedObj.x.should.equal('unshared');

    //the subparent DOES have the issue
    sp1.unSharedObj.x.should.equal('unshared');
    sp2.unSharedObj.x = 'i was set by sp2';

    sp1.unSharedObj.x.should.equal('i was set by sp2');
  });



// Lets see how we can use Object.create to resolve this
//
// err first lets see if that's even true
//
// Previously we had
//   SubParent.prototype = new TopParent();
// now we use:
//   SubparentV2.prototype = Object.create(TopParent.prototype);
  describe('using Object.create with SubParentV2', function() {
    beforeEach(function() {

      spv2a = new subject.SubParentV2('thomas');
      spv2b = new subject.SubParentV2();
    });
    it("true inheritance", function() {
      // re-demonstrate subparent's issue
      //the subparent DOES have the issue
      sp1.unSharedObj.x = 'foo';
      sp1.unSharedObj.x.should.equal('foo');
      sp2.unSharedObj.x = 'i was set by sp2';
      sp1.unSharedObj.x.should.equal('i was set by sp2');
      spv2a.unSharedObj.x.should.equal('unshared');
      spv2b.unSharedObj.x = 'i was set by spv2b';
      spv2a.unSharedObj.x.should.equal('unshared');
    });
    // ABOVE shows that we cleared up the big problem.
    // Let's make sure the rest is still sane though:
    it('can access the same private Variables (from constructor)', function() {
      tp1.getPrivate('objWithoutThis').x.should.equal('objWithoutThis');
      spv2a.getPrivate('objWithoutThis').x.should.equal('objWithoutThis');
      spv2b.getPrivate('objWithoutThis').x.should.equal('objWithoutThis');
    });
    it('can use the prototype method', function() {
      tp1.sharedFunction(3);
      spv2a.sharedFunction(10);
      spv2b.sharedFunction(100);

      // NOTE the validations here are a little dumb due to the weird
      // overriding of __proto__.proto_x in TopParent
      expect(spv2a.proto_x).to.equal(12);
      expect(spv2b.proto_x).to.equal(102);

      expect(tp1.proto_x).to.equal(5);
    });


  }); // END using Object.create with SubParentV2
});
