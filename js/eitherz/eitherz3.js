(function() {
  'use strict';
  
  define([], function() {
    
    return {
      promise: makePromise,
      ajax: ajax_ie
    };
    
    function makePromise() {
      var _state = 'pending';
      var _value = undefined;
      var _dependencies = []; // [{onResolved,onRejected}]

      return {
        then: then,
        resolve: resolve,
        reject: reject
      }

      function resolve(value) {
        if (_state !== 'pending') {
          throw new Error('already resolved/rejected!');
        }
        _value = value;
        var dependencies = _dependencies;
        dependencies.forEach(function(continuation) {
          continuation.onResolved(value);
        });
        _dependencies = [];
        _state = 'resolved';
        return this;
      }

      function reject(error) {
        if (_state !== 'pending') {
          throw new Error('already resolved/rejected!');
        }
        _value = error;
        var dependencies = _dependencies;
        dependencies.forEach(function(continuation) {
          continuation.onRejected(error);
        });
        _dependencies = [];
        _state = 'rejected';
        return this;
      }

      function then(onResolved, onRejected) {
        if (_state === 'resolved') {
          return onResolved(_value);
        }
        if (_state === 'rejected') {
          return onRejected(_value);
        }
        var result = makePromise();
        _dependencies.push({
          onResolved: function (_) {
            onResolved(_value).then(succeed, fail);
          },
          onRejected: function (_) {
            onRejected(_value).then(succeed, fail); 
          }
        });
        return result;

        function succeed(value) {
          result.resolve(value);
          return makePromise();
        }

        function fail(error) {
          result.reject(error);
          return makePromise();
        }
      }
    }

    function ajax_ie(url) { // instance-based version w/h error handling
      var data = makePromise();
      console.log('ajax_ie call to ' + url);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            data.resolve(JSON.parse(xhttp.responseText));
          } else {
            data.reject(xhttp.status + ' - ' + xhttp.statusText);
          }
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
      return data;
    }
  });
})();