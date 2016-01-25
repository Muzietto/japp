(function() {

  define(['promizzes2', 'promizzes3'], function(promizzes, promizzes_i) {
    var promise = promizzes.promise;
    var fulfill = promizzes.fulfill;
    var depend  = promizzes.depend;
    var promise_i = promizzes_i.promise;

    String.prototype.reverse = function(){
      return this.split('').reverse().join('');
    }

    function ajax(url) {
      var data = promise();
      console.log('ajax call to ' + url);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          fulfill(data, JSON.parse(xhttp.responseText));
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
      return data;
    }
    
    function request() {
      var result = promise();
      depend(result, function(url) {
        var result2 = promise();
        return depend(result2, ajax(url));
      });
      return result;
    }

    function ajax_i(url) { // instance-based version
      var data = promise_i();
      console.log('ajax_i call to ' + url);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          data.resolve(JSON.parse(xhttp.responseText));
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
      return data;
    }
    
    function request_i() { // instance-based version
      return promise_i().then(ajax_i);
    }
    
    return {
      ajax: ajax,
      request: request,
      ajax_i: ajax_i,
      request_i: request_i
    };
  });
})();