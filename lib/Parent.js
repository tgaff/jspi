









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
  this.unSharedObj = {x: 'shared' };
 // this.unSharedObj = new Object;
 // this.unSharedObj.x = 'unshared';

  this.getPrivate = function(argname) {
    return (eval(argname));
  };
};

// mostly for saving memory
TopParent.prototype.proto_x = 1;
TopParent.prototype.proto_y = { a: 1, b: 2 };
TopParent.prototype.shared_function = function(arg1) {
  // this is created only once for all 'instances'

  this.proto_x = arg1 + 2;
  return this.proto_x;
};




















var SubParent = function(arg1) {}
SubParent.prototype = TopParent();







module.exports = {
  TopParent: TopParent,
  SubParent: SubParent

}
