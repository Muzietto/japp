(function() {
  'use strict';

  define([], function() {
    return {
      promise: makePromise,
      fulfill: fulfill,
      depend: depend
    };

    function makePromise() {
      return {
        resolved: false,
        value: undefined,
        dependencies: []
      };
    }

    // depend(promise, expression) -> promise
    // FULL ROBOTLOLITA VERSION
    // http://robotlolita.me/2015/11/15/how-do-promises-work.html#a-minimal-promise-implementation
    // defines a dependency between the expression 
    // and the value of the promise. 
    // It returns a new promise for the result 
    // of the expression, so new expressions 
    // can depend on that value.

    // (promise a, fapb) -> promise b
    function depend(promise, fapb) { // fapb :: a -> promise b
      var result = makePromise();
      // next guard is different from mine...
      if (promise.resolved) {
        depend(fapb(promise.value), function (value) {
          fulfill(result, value);
          return makePromise();
        });
        return result;
      }
      promise.dependencies.push(function (_) {
        depend(fapb(promise.value), function (value) {
          fulfill(result, value);
          return makePromise();
        });
      });
      return result;
    }

    // fulfill(promise, value) -> ()
    // puts a value in the promise, allowing the
    // expressions that depend on the value 
    // to be computed.
    function fulfill(promise, value) {
      if (promise.resolved) {
        throw new Error('already resolved!');
      }
      // TODO - try-catch all this and handle errors
      promise.value = value;
      var dependencies = promise.dependencies;
      dependencies.forEach(function(continuation) {
        continuation(value);
      });
      promise.dependencies = [];
      promise.resolved = true;
    }
  });
})();