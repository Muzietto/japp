(function() {
  
  require.config({
    baseUrl: '',
    paths: {
      'promises3_es6': 'js/es6/promises3_es6',
      'test': 'js/es6/promises3_es6_test',
      'mocha': 'mocha/mocha',
      'chai': 'mocha/chai',
      'utils': 'mocha/utils',
      'promizzes3': 'js/promizzes/promizzes3',
      'eitherz3': 'js/eitherz/eitherz3',
      'promizzes2': 'js/promizzes/promizzes2'
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