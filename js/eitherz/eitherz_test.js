(function() {
  'use strict';

  define(['eitherz', 'chai'], function(promizzes, chai) {
    var expect  = chai.expect;
    var promise = promizzes.promise;
    var resolve = promizzes.resolve;
    var reject = promizzes.reject;
    var depend  = promizzes.depend;

    describe('a promises system with error handling and all methods static', function() {

      it('makes a good division', function(done) {
        var divisorPromise = promise();        
        var division = depend(divisorPromise, divisionOf24);
        var validation = depend(division, expected(12));
        resolve(divisorPromise, 2);
        var useless = depend(validation, execute(done));
      });

      xit('fails on an impossible division', function(done) {
        var divisorPromise = promise();        
        var division = depend(divisorPromise, divisionOf24);
        //var validation = depend(division, 12); // HOW DOES THIS ONE BECOME?
        resolve(divisorPromise, expected(0));
        var useless = depend(validation, execute(done));
      });

      function divisionOf24(divisor) {
        var result = promise();
        try {
        resolve(result, 24/divisor);
        } catch (exc) {
          reject(result, exc.message);
        }
        return result;
      }

      function expected(expected) {
        return function(actual) {
          expect(actual).to.be.eql(expected);
          var result = promise();
          resolve(result, actual);
          return result;
        }
      }

      function execute(callback) {
        return function(_) {
          console.log('test complete with result XXX');
          var result = promise();
          resolve(result, cb());
          return result;
        }
      }

      it('builds a simple chain', function(done) {

        var sidePromise = promise();
        var makeArea = function(sideVal) {
          var result = promise();
          resolve(result, sideVal * sideVal);
          return result;
        }
        var printStuff = function(stuffVal) {
          var result = promise();
          expect(stuffVal).to.be.equal(25);
          resolve(result, console.log('promizzes2 test: ' + stuffVal));
          return result;
        }
        var beDone = function(_) {
          var result = promise();
          resolve(result, done());
          return result;
        }

        // depend(promise, fapb_ok, fabp_ko) // fapb :: a -> promise b
        var areaPromise = depend(sidePromise, makeArea);
        var printPromise = depend(areaPromise, printStuff);

        resolve(sidePromise, 5);
        var donePromise = depend(printPromise, beDone);
      });
    });
  });
})();