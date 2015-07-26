var chai = require('chai');
var assert = require('assert');
chai.should();
var should = require('chai').should();
var expect = chai.expect;


var subject = require('../lib/Parent.js');


/************************************************
 *
 * Part 4
 *
 * *******************************************/

describe('TopParent obj', function() {
  var child1, child2, lizard;
  beforeEach(function() {
    child1 = new subject.TopParent(1);
    child2 = new subject.TopParent(2);
  });
  it('has an objWithoutThisOrVar that we cant touch', function() {
    expect(child1.objWithoutThisOrVar).to.be.undefined;
    expect(child1.getPrivate('objWithoutThisOrVar').x).to.equal('objWithoutThisOrVar');
  });
  it('has a private objWithoutThis (that we cant touch)', function() {
    expect(child1.objWithoutThis).to.be.undefined;
    expect(child1.getPrivate('objWithoutThis').x).to.equal('objWithoutThis');
  });

  it('constructor objects are NOT shared', function() {
    child1.unSharedObj.x = 'asfd';
    expect(child2.unSharedObj.x).to.equal('unshared');
    expect(child1.unSharedObj.x).to.equal('asfd');
  });
  describe('getPrivate has a closure', function() {
    it('that includes the otherwise inaccessible\
       objWithoutThis from the constructor', function() {
      child1.getPrivate('objWithoutThis').x.should.equal('objWithoutThis');
    });
    it('the closure is unique for each child', function() {
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

  it('plain vars on the prototype APPEAR to be not shared', function() {
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
     when you alter them on the prototype', function() {
    child1.__proto__.proto_x = 43;
    child2.proto_x.should.equal(43);
  });
});






describe('SubParent', function() {
  beforeEach(function() {
    tp1 = new subject.TopParent('tp1');
    tp2 = new subject.TopParent('tp2');
    sp1 = new subject.SubParent('sp1');
    sp2 = new subject.SubParent('sp2');
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
      // redemonstrate subparent's issue
      //the subparent DOES have the issue
      sp1.unSharedObj.x = 'foo';
      sp1.unSharedObj.x.should.equal('foo');
      sp2.unSharedObj.x = 'i was set by sp2';
      sp1.unSharedObj.x.should.equal('i was set by sp2');
      spv2a.unSharedObj.x.should.equal('unshared');
      spv2b.unSharedObj.x = 'i was set by spv2b';
      spv2a.unSharedObj.x.should.equal('unshared');

    });
  });


});
