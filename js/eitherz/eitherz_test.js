(function() {
  'use strict';

  define(['eitherz', 'chai'], function(promizzes, chai) {
    var expect  = chai.expect;
    var promise = promizzes.promise;
    var resolve = promizzes.resolve;
    var reject = promizzes.reject;
    var depend  = promizzes.depend;

    describe('a promises system with error handling and all methods static', function() {

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
          resolve(result, console.log('promizzes2 test: ' + stuffVal) /* returns undefined */);
          return result;
        }

        // depend(promise, fapb_ok, fabp_ko) // fapb :: a -> promise b
        var areaPromise = depend(sidePromise, makeArea, failure);
        var printPromise = depend(areaPromise, printStuff, failure);

        resolve(sidePromise, 5);
        var donePromise = depend(printPromise, executeOk(done), executeKo(done));
      });

      it('makes a good division', function(done) {
        var divisorPromise = promise();        
        var division = depend(divisorPromise, divisionOf(24), failure);
        var validation = depend(division, expected(12), failure);
        resolve(divisorPromise, 2);
        var donePromise = depend(validation, executeOk(done), executeKo(done));
      });

      it('fails on an impossible division', function(done) {
        var divisorPromise = promise();        
        var division = depend(divisorPromise, divisionOf(24), failure);
        var validation = depend(division, expected(''), failure);
        resolve(divisorPromise, 0);
        var useless = depend(validation, executeOk(done), executeKo(done));
      });

      function divisionOf(dividend) {
        return function (divisor) {
          var result = promise();
          if (divisor !== 0) {
            resolve(result, dividend/divisor);
          } else {
            reject(result, new Error('impossible division'));
          }
          return result;
        }
      }

      function expected(expected) {
        return function(actual) {
          expect(actual).to.be.eql(expected);
          var result = promise();
          resolve(result, actual);
          return result;
        }
      }

      function executeOk(callback) {
        return function(value) {
          console.log('test complete with result ' + value);
          var result = promise();
          resolve(result, callback());
          return result;
        }
      }

      function executeKo(callback) {
        return function(value) {
          console.log('test failed with result ' + value);
          var result = promise();
          resolve(result, callback());
          return result;
        }
      }
      
      function failure(error) {
        console.log('test failed with error ' + error);
        var result = promise();
        reject(result, error);
        return result;
      }
    });
  });
})();