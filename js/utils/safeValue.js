(function() {
  'use strict';

  define([], function() {

    return function safeValue(func) {
       return function(url) {
         try {
           return func(url);
         } catch (err) {
           return func(`https://muzietto.github.io/japp-jalp/${url}`);
         }
       }
    }
    
  });
})();
