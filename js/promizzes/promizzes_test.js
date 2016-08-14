(function() {
  'use strict';

  define(['promizzes', 'chai'], function(P, chai) {
    var expect  = chai.expect;

    describe('a naive, intuitive promises system (promizzes.js)', function() {
      it('builds a simple chain', function(done) {

        var sidePromise = P.promise();
        var makeArea = function(sideVal) {
          var result = P.promise();
          setTimeout(function() { P.fulfill(result, sideVal * sideVal); }, 400);
          return result;
        }
        var printStuff = function(stuffVal) {
          var result = P.promise();
          expect(stuffVal).to.be.equal(25);
          setTimeout(function() { 
            console.log('promizzes test: ' + stuffVal);
            P.fulfill(result, 'whatever'); }, 500);
          return result;
        }
        var beDone = function(_) {
          var result = P.promise();
          P.fulfill(result, done());
          return result;
        }

        // depend(promise, expression) // famb
        var areaPromise = P.depend(sidePromise, makeArea);
        var printPromise = P.depend(areaPromise, printStuff);

        P.depend(printPromise, beDone);
        P.fulfill(sidePromise, 5);
      });
    });
  });
})();