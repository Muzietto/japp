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

    // There is NO WAY to create a promise that resolves first to the URL that ajax must call
    // and after that returns the server data...

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
    
    return {
      ajax: ajax,
      ajax_i: ajax_i
    };
  });
})();