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
        state: 'pending',
        value: undefined,
        dependencies: [] // [{onResolved,onFailed}]
      };
    }

    // depend(promise, expression) -> promise
    // defines a dependency between the expression 
    // and the value of the promise. 
    // It returns a new promise for the result 
    // of the expression, so new expressions 
    // can depend on that value.

    // (promise a, fapb) -> promise b
    function depend(promise, fapb) { // fapb :: a -> promise b
      // promise is most certainly unresolved, but let's guard...
      if (promise.resolved) {
        return fapb(promise.value);
      }
      var result = makePromise();
      promise.dependencies.push(function (_) {
        depend(fapb(promise.value), function (value) {
          fulfill(result, value);
          return makePromise(); // forget me not, you idiot...
        });
      });
      return result;
    }

    // resolve(promise, value) -> ()
    // puts a value in the promise, allowing the
    // expressions that depend on the value 
    // to be computed.
    function resolve(promise, value) {
      if (promise.status !== 'pending') {
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