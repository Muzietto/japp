(function() {
  'use strict';
  
  define([], function() {
    
    // promise() -> promise
    // constructs a representation of a value.
    // The value must be provided at later point in time.
    function makePromise() {
      var _value = undefined;
      var _resolved = false;
      var _continuations = [];
      
      return {
        value: value,
        whenResolved: whenResolved
      };
      
      function value(val) {
        if (typeof val === 'undefined') {
          return _value;
        }
        if (!_resolved) {
          _value = val;
          _resolved = true;
          _continuations.forEach(function(cont) {
            cont(val);
          });
          _continuations = [];
          return;
        }
        throw new Error('already resolved');
      }

      function whenResolved(cont) {
        _continuations.push(cont);
      }
    }

    // fulfill(promise, value) -> ()
    // puts a value in the promise, allowing the
    // expressions that depend on the value 
    // to be computed.
    function fulfill(promise, value) {
      promise.value(value);
    }

    // depend(promise, expression) -> promise
    // defines a dependency between the expression 
    // and the value of the promise. 
    // It returns a new promise for the result 
    // of the expression, so new expressions 
    // can depend on that value.
    function depend(promise, expression) {
      if (typeof promise.value() !== 'undefined') { // promise is already resolved
        return expression(promise.value());
      }
      var resultPromise = makePromise();
      promise.whenResolved(function(resolvedValue) {
        // optional flatten -> UGLY!!!!!
        resolvedValue = (resolvedValue.value) ? resolvedValue.value() : resolvedValue;
        fulfill(resultPromise, expression(resolvedValue));
      });
      return resultPromise;
    }

    return {
      promise: makePromise,
      fulfill: fulfill,
      depend: depend
    };
  });
  
})();