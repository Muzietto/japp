(function() {
  
  require.config({
    baseUrl: '',
    paths: {
      'eitherz2b': 'js/eitherz/eitherz2b',
      'test2b': 'js/eitherz/eitherz_test2b',
      'mocha': 'mocha/mocha',
      'chai': 'mocha/chai',
      'utils': 'mocha/utils'
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
    require(['test2b'], function() {
      var runner = mocha.run();
    });
  })
  
})();