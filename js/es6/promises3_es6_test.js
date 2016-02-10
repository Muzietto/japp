(function() {
  'use strict';

  define(['promises3_es6', 'chai', 'utils'], function(promises3_es6, chai, utils) {
    var expect  = chai.expect;
    var promise = promises3_es6.promise;
    var ajax = utils.ajax_i;

    describe('a promises system based on instance methods', function() {

      it('does ajax straight away', function(done) {
        ajax('http://localhost:8080/json/user.json')
          .then(expected({"name":"Marco","age":53,"town":"milano"}))
          .then(execute(done));
      });

      it('does chained ajax', function(done) {
        ajax('http://localhost:8080/json/user.json')
          .then(expected({"name":"Marco","age":53,"town":"milano"}))
          .then(function(data) {
            return ajax('http://localhost:8080/json/' + data.town + '.json');
          })
          .then(expected({"name":"Milano","population":1500000}))
          .then(execute(done));
      });

      function expected(expected) {
        return function(actual) {
          expect(actual).to.be.eql(expected);
          console.log('promises3_es6 test: ' + ((typeof actual === 'string') ? actual : JSON.stringify(actual)));
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
          return promise().resolve(sideVal * sideVal);
        }
        var printStuff = function(stuffVal) {
          expect(stuffVal).to.be.equal(25);
          return promise().resolve(console.log('promises3_es6 test: ' + stuffVal));
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