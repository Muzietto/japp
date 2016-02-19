(function() {

  define(['promizzes2', 'promizzes3', 'eitherz3'], function(promizzes, promizzes_i, eitherz_i) {
    var promise = promizzes.promise;
    var fulfill = promizzes.fulfill;
    var depend  = promizzes.depend;
    var promise_i = promizzes_i.promise;
    var promise_ie = eitherz_i.promise;

    String.prototype.reverse = function(){
      return this.split('').reverse().join('');
    }


    // There is NO WAY to create a promise that resolves first to the URL that ajax must call
    // and after that returns the server data...
    
    return {
      ajax: ajax,
      ajax_i: ajax_i,
      ajax_ie: ajax_ie
    };
  });
})();