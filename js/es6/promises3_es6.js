(function(){
  'use strict';

  define([], function() { return { promise: makePromise }});

  function makePromise() {
    var _resolved = false;
    var _value = undefined;
    var _dependencies = []; // [a -> promise b]

    return {
      resolve: value => {
        if (_resolved) {
          throw new Error('already resolved!');
        }
        var dependencies = _dependencies;
        _value = value;
        dependencies.forEach(function(cont) {
          cont(value);
        });
        _dependencies = [];
        _resolved = true;
        return this;
      },
      then: fapb => { // depends(this, fapb)
        if (_resolved) {
          return fapb(_value);
        }
        var result = makePromise();
        _dependencies.push(function(_) {
          fapb(_value).then(function(value) {
            result.resolve(value);
            return makePromise() // forget me not, you idiot...
          });
        });
        return result;
      }
    };
  }  
})();