(function() {
  
  require.config({
    baseUrl: '',
    paths: {
      'eitherz': 'js/eitherz/eitherz',
      'test': 'js/eitherz/eitherz_test',
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
    require(['test'], function() {
      var runner = mocha.run();
    });
  })
  
})();