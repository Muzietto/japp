(function() {
  'use strict';
  
  define(['promizzes', 'chai'], function(promizzes, chai) {
    var expect = chai.expect;

    describe('a promises system', function() {
      it('builds a simple chain', function(done) {
        
        var side = promise();
        var makeArea = function(sideVal) {
          var result = promise();
          fulfill(result, sideVal^2);
          return result;
        }
        var printStuff = function(stuffVal) {
          var result = promise();
          fulfill(result, console.log.bind(stuffVal));
          return result;
        }
        var beDone = function(_) {
          var result = promise();
          fulfill(result, done());
          return result;
        }
        
        depend(makeArea, side);
        depend(printStuff, makeArea);
        depend(beDone, printStuff);
        
        fulfill(side, 5);
      });
    });
  });
  
})();