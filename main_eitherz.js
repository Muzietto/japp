(function() {
  
  require.config({
    baseUrl: '',
    paths: {
      'promizzes2': 'js/promizzes/promizzes2', // needed by utils
      'promizzes3': 'js/promizzes/promizzes3', // needed by utils
      'eitherz2b': 'js/eitherz/eitherz2b',
      'test2b': 'js/eitherz/eitherz_test2b',
      'eitherz3': 'js/eitherz/eitherz3',
      'test3': 'js/eitherz/eitherz_test3',
      'mocha': 'mocha/mocha',
      'chai': 'mocha/chai'
    },
    shim: {
      mocha: {
        init: function() {
          this.mocha.setup('bdd');
          return this.mocha;
        }
      }
    }
  });
  define(['mocha'], function(mocha) {
    require(['test3', 'test2b'], function() {
      var runner = mocha.run();
    });
  })
  
})();