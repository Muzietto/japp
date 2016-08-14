(function(){
  'use strict';

  define([], function() {

    return {
      promise: makePromise,
      ajax: ajax_i
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

    function ajax_i(url) { // instance-based version
      var data = makePromise();
      console.log('ajax_i call to ' + url);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          data.resolve(JSON.parse(xhttp.responseText));
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
      return data;
    }
  });
})();