









/************************************************
 *
 * Part 4
 *
 * *******************************************/

var TopParent = function(arg1) {
  //private
  objWithoutThisOrVar = { x: 'objWithoutThisOrVar' };
  var objWithoutThis = { x: 'objWithoutThis' }
  //public
  this.unSharedObj = {x: 'unshared' };
 // this.unSharedObj = new Object;
 // this.unSharedObj.x = 'unshared';

  this.getPrivate = function(argname) {
    return (eval(argname));
  };
};

// mostly for saving memory
TopParent.prototype.proto_x = 1;
TopParent.prototype.proto_y = { a: 1, b: 2 };
TopParent.prototype.sharedFunction = function(arg1) {
  // this is created only once for all 'instances'
  // FYI this creates a NEW proto_x overriding the one on __proto__
  this.proto_x = arg1 + 2;
  return this.proto_x;
};
















































var SubParent = function(arg1) {
  this.instanceVar = 'SubParent: ' + arg1;
  this.instanceMethod = function(text) {
    instanceVar= text;

  };

}
SubParent.prototype = new TopParent();

















var SubParentV2 = function(arg1) {
  // first call parental constructors
  TopParent.apply(this, arguments);
  //TopParent.call(this, arguments); // very similar but the type of arguments allowed is different

  this.instanceVar = 'SubparentV2: ' + arg1;
  this.instanceMethod = function(text) {
    instanceVar = text;
  };
}
SubParentV2.prototype = Object.create(TopParent.prototype);
SubParentV2.prototype.constructor = TopParent;











module.exports = {
  TopParent: TopParent,
  SubParent: SubParent,
  SubParentV2: SubParentV2
}
