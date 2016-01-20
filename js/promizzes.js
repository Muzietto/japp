(function() {
  'use strict';
  
  define([], function() {
    
    // promise() -> promise
    // constructs a representation of a value.
    // The value must be provided at later point in time.
    function makePromise() {
      var _resolved = false;
      var _value = undefined;
      
      return {
        value: value
        // put stuff here
      };
      
      function value(val) {
        if (!_resolved) {
          _value = val;
          _resolved = true;
          return;
        }
        throw new Error('already resolved');
      }
    }

    // fulfill(promise, value) -> ()
    // puts a value in the promise, allowing the
    // expressions that depend on the value 
    // to be computed
    function fulfill(promise, value) {
      promise.value(value);
    }

    // depend(expression, promise) -> promise
    // defines a dependency between the expression 
    // and the value of the promise. 
    // It returns a new promise for the result 
    // of the expression, so new expressions 
    // can depend on that value.
    function depend(expression, promise) {
      
    }
    
    return {
      promise: makePromise,
      fulfill: fulfill,
      depend: depend
    };
  });
  
})();