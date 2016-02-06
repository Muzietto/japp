(function() {
  'use strict';

  define([], function() {
    return {
      promise: makePromise,
      resolve: resolve,
      reject: reject,
      depend: depend
    };

    function makePromise() {
      return {
        state: 'pending',
        value: undefined, // value || error
        dependencies: [] // [{onResolved,onRejected}]
      };
    }

    // depend(promise, expression) -> promise
    // defines a dependency between the expression 
    // and the value of the promise. 
    // It returns a new promise for the result 
    // of the expression, so new expressions 
    // can depend on that value.

    // (promise a, fapb) -> promise b
    function depend(promise, fapbs) { // fapbs :: (a -> promise b, a -> error)
      if (typeof fapbs === 'function') {
        fapbs = {
          onResolved: fapbs,
          onRejected: onRejectedFapb
        };
      }
      // promise is most certainly unresolved, but let's guard...
      if (promise.state === 'resolved') {
        return fapbs.onResolved(promise.value);
      }
      if (promise.state === 'rejected') {
        return fapbs.onRejected(promise.value);
      }
      var result = makePromise();
      promise.dependencies.push({
        onResolved: function (_) {
          depend(fapbs.onResolved(promise.value), function (value) {
            resolve(result, value);
            return makePromise(); // forget me not, you idiot...
          });
        },
        onRejected: onRejectedFapb(result)
      });
      return result;
    }

    function onRejectedFapb(promise) {
      return function(_) {
        depend(fapbs.onRejected(promise.value), function (value) {
          reject(result, value);
          return makePromise(); // forget me not, you idiot...
        });
      }
    }

    // resolve(promise, value) -> ()
    // puts a value in the promise, allowing the
    // expressions that depend on the value 
    // to be computed.
    function resolve(promise, value) {
      if (promise.state !== 'pending') {
        throw new Error('already resolved!');
      }
      promise.value = value;
      var dependencies = promise.dependencies;
      dependencies.forEach(function(continuation) {
        continuation.onResolved(value);
      });
      promise.dependencies = [];
      promise.state = 'resolved';
    }

    // reject(promise, error) -> ()
    function reject(promise, error) {
      promise.value = error;
      var dependencies = promise.dependencies;
      dependencies.forEach(function(continuation) {
        continuation.onRejected(value);
      });
      promise.dependencies = [];
      promise.state = 'rejected';
    }
  });
})();