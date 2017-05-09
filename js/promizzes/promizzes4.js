
(function(){
  'use strict';

  define([], function() {

    return {
      promise: makePromise,
    };

    function makePromise() {
      var _resolved = false;
      var _value = undefined;
      var _dependencies = []; // [a -> promise b]

      return {
        resolve: function(value) {
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
        then: function(fapb) { // depends(this, fapb)
          if (_resolved) {
            return fapb(_value);
          }
          var result = makePromise();
          _dependencies.push(function(promiseValue) {
            var nextPromise = fapb(promiseValue);
            return nextPromise.then(function(nextValue) {
              result.resolve(nextValue);
              return makePromise();
            });
          });
          return result;
        },
        resolved: function() { return _resolved; },
        value: function() { if (_resolved) { return _value; } else { throw new Error('unresolved promise'); } }
      };
    }
  });
})();
