(function() {
  'use strict';

  define(['promizzes3', 'chai'], function(promizzes, chai) {
    var expect  = chai.expect;
    var promise = promizzes.promise;
    var ajax = promizzes.ajax;

    describe('a promises system based on instance methods (promizzes3)', function() {

      it('does ajax straight away', function(done) {
        ajax('https://muzietto.github.io/japp-jalp/json/user.json')
          .then(expected({"name":"Marco","age":53,"town":"milano"}))
          .then(execute(done));
      });

      it('does chained ajax', function(done) {
        ajax('https://muzietto.github.io/japp-jalp/json/user.json')
          .then(expected({"name":"Marco","age":53,"town":"milano"}))
          .then(function(data) {
            return ajax('https://muzietto.github.io/japp-jalp/json/' + data.town + '.json');
          })
          .then(expected({"name":"Milano","population":1500000}))
          .then(execute(done));
      });

      function expected(expected) {
        return function(actual) {
          expect(actual).to.be.eql(expected);
          console.log('promizzes3 test: ' + ((typeof actual === 'string') ? actual : JSON.stringify(actual)));
          return promise().resolve(actual);
        };
      }
      
      function execute(cb) {
        return function executor(_) {
          return promise().resolve(cb());
        };
      }

      it('builds a simple chain', function(done) {

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
    });
  });
})();
