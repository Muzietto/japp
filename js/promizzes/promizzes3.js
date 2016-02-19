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