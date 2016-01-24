(function() {
  'use strict';

  define(['promizzes3', 'chai'], function(promizzes, chai) {
    var expect  = chai.expect;
    var promise = promizzes.promise;

    describe('a promises system based on instance methods', function() {
      it('builds a simple chain', function(done) {

        var sidePromise = promise();
        var makeArea = function(sideVal) {
          return promise().resolve(sideVal * sideVal);
        }
        var printStuff = function(stuffVal) {
          expect(stuffVal).to.be.equal(25);
          return promise().resolve(console.log('promizzes3 test: ' + stuffVal));
        }
        var beDone = function(_) {
          return promise().resolve(done());
        }

        var printPromise = sidePromise
          .then(makeArea)
          .then(printStuff);

        sidePromise.resolve(5);
        printPromise.then(beDone);
      });
    });
  });
})();