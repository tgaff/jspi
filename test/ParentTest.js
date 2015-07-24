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
    expect(child2.unSharedObj.x).to.equal('shared');
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
    expect(child1.shared_function).to.eql(child2.shared_function);
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










