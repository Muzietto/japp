(function() {
  
  require.config({
    baseUrl: '',
    paths: {
      'eitherz2': 'js/eitherz/eitherz2',
      'eitherz2b': 'js/eitherz/eitherz2b',
      'eitherz3': 'js/eitherz/eitherz3',
      'test2e': 'js/eitherz/eitherz_test2',
      'test2be': 'js/eitherz/eitherz_test2b',
      'test3e': 'js/eitherz/eitherz_test3',
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
    require(['test3e', 'test2be', 'test2e'], function() {
      var runner = mocha.run();
    });
  })
})();