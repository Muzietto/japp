(function() {

  define(['promizzes2'], function(promizzes) {
    var promise = promizzes.promise;
    var fulfill = promizzes.fulfill;
    var depend  = promizzes.depend;

    String.prototype.reverse = function(){
      return this.split('').reverse().join('');
    }

    function ajax(url) {
      var data = promise();
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
      return depend(result, ajax);
    }
    
    return {
      ajax: ajax,
      request: request
    };
  });
})();