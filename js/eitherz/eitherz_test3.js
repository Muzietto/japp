(function() {
  'use strict';

  define(['eitherz3', 'chai'], function(eitherz, chai) {
    var expect  = chai.expect;
    var promise = eitherz.promise;
    var ajax = eitherz.ajax;

    describe('instance-based eithers with error handling (eitherz3.js)', function() {
      
      it('do ajax straight away', function(done) {
        ajax('https://muzietto.github.io/japp/json/user.json')
          .then(
            expected({"name":"Marco","age":53,"town":"milano"}),
            notExpected({"name":"Marco","age":53,"town":"milano"})
          )
          .then(executeOk(done), executeKo(done));
      });
      it('do ajax handling errors', function(done) {
        ajax('https://muzietto.github.io/japp/json/userXXX.json')
          .then(
            expected({"name":"Marco","age":53,"town":"milano"}),
            notExpected({"name":"Marco","age":53,"town":"milano"})
          )
          .then(executeOk(done), executeKo(done));
      });

      it('build a simple chain', function(done) {

        var sidePromise = promise();
        var makeArea = function(sideVal) {
          var next = promise();
          setTimeout(() => next.resolve(sideVal * sideVal), 800);
          return next;
        }
        var printStuff = function(stuffVal) {
          expect(stuffVal).to.be.equal(25);
          var next = promise();
          setTimeout(() => next.resolve(console.log('promizzes3 test: ' + stuffVal)), 500);
          return next;
        }
        var beDone = function(_) {
          var next = promise();
          setTimeout(() => next.resolve(done()), 200);
          return next;
        }

        var printPromise = sidePromise
          .then(makeArea)
          .then(printStuff);
        printPromise.then(beDone);

        sidePromise.resolve(5);
      });

      function expected(expected) {
        return function(actual) {
          expect(actual).to.be.eql(expected);
          console.log('eitherz3 test: ' + ((typeof actual === 'string') ? actual : JSON.stringify(actual)));
          return promise().resolve(actual);
        };
      }

      function notExpected(expected) {
        return function(actual) {
          expect(actual).not.to.be.eql(expected);
          console.log('eitherz3 test: ' + ((typeof actual === 'string') ? actual : JSON.stringify(actual)));
          return promise().reject(actual);
        };
      }

      function executeOk(cb) {
        return function executor(_) {
          console.log('test completed - promise resolved');
          return promise().resolve(cb());
        };
      }

      function executeKo(cb) {
        return function executor(_) {
          console.log('test completed - promise rejected');
          return promise().reject(cb());
        };
      }
    });
  });
})();
