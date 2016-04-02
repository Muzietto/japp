(function() {
  'use strict';

  define([], function() {
    return {
      promise: makePromise,
      fulfill: fulfill,
      depend: depend,
      ajax: ajax
    };

    function makePromise() {
      return {
        resolved: false,
        value: undefined,
        dependencies: []
      };
    }

    // depend(promise, expression) -> promise
    // defines a dependency between the expression 
    // and the value of the promise. 
    // It returns a new promise for the result 
    // of the expression, so new expressions 
    // can depend on that value.

    // (promise a, fapb) -> promise b
    function dependXXX(promise, fapb) { // fapb :: a -> promise b
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
    
    function depend(promise, fapb) {
      if (promise.resolved) {
        return fapb(promise.value);
      }
      var result = makePromise();
      result.dependencies.push(function(resValue) {
        
      });
      return result;
    }

/*    
    var sidePromise = promise();
    var makeArea = function(sideVal) {
      var result = promise();
      fulfill(result, sideVal * sideVal);
      return result;
    }
    var areaPromise = depend(sidePromise, makeArea);
*/    

    // fulfill(promise, value) -> ()
    // puts a value in the promise, allowing the
    // expressions that depend on the value 
    // to be computed.
    function fulfill(promise, value) {
      if (promise.resolved) {
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

    function ajax(url) {
      var data = makePromise();
      console.log('ajax call to ' + url);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          fulfill(data, JSON.parse(xhttp.responseText));
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
      return data;
    }
  });
})();