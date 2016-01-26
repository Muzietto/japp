(function() {
  'use strict';

  define(['promizzes', 'chai'], function(promizzes, chai) {
    var expect  = chai.expect;
    var promise = promizzes.promise;
    var fulfill = promizzes.fulfill;
    var depend  = promizzes.depend;

    describe('a naive, intuitive promises system', function() {
      it('builds a simple chain', function(done) {

        var sidePromise = promise();
        var makeArea = function(sideVal) {
          var result = promise();
          fulfill(result, sideVal * sideVal);
          return result;
        }
        var printStuff = function(stuffVal) {
          var result = promise();
          expect(stuffVal).to.be.equal(25);
          fulfill(result, console.log('promizzes test: ' + stuffVal));
          return result;
        }
        var beDone = function(_) {
          var result = promise();
          fulfill(result, done());
          return result;
        }

        // depend(promise, expression) // famb
        var areaPromise = depend(sidePromise, makeArea);
        var printPromise = depend(areaPromise, printStuff);

        // side
        //  .then(makeArea)
        //  .then(printStuff)
        //  .then(beDone);

        fulfill(sidePromise, 5);
        var donePromise = depend(printPromise, beDone);
      });
    });
  });
})();