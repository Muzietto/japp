(function() {
  'use strict';
  
  define([], function() {
    
    // promise() -> promise
    // constructs a representation of a value.
    // The value must be provided at later point in time.


    // fulfill(promise, value) -> ()
    // puts a value in the promise, allowing the
    // expressions that depend on the value 
    // to be computed


    // depend(promise, expression) -> promise
    // defines a dependency between the expression 
    // and the value of the promise. 
    // It returns a new promise for the result 
    // of the expression, so new expressions 
    // can depend on that value.
    
    
    return {
      pippo: 'stringa pippo'
    };
  });
  
})();