(function() {
  'use strict';
  
  define(['eitherz3', 'chai'], function(eitherz, chai) {
    var expect  = chai.expect;
    var promise = eitherz.promise;
    var ajax = eitherz.ajax;

    describe('instance-based promises with error handling', function() {
      
      it('do ajax straight away', function(done) {
        ajax('http://localhost:8080/json/user.json')
          .then(
            expected({"name":"Marco","age":53,"town":"milano"}),
            notExpected({"name":"Marco","age":53,"town":"milano"})
          )
          .then(executeOk(done), executeKo(done));
      });
      it('do ajax handling errors', function(done) {
        ajax('http://localhost:8080/json/userXXX.json')
          .then(
            expected({"name":"Marco","age":53,"town":"milano"}),
            notExpected({"name":"Marco","age":53,"town":"milano"})
          )
          .then(executeOk(done), executeKo(done));
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
      
      it('work', function() {
        expect(promise).to.not.be.undefined;
      });
    });
  });
})();