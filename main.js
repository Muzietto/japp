(function() {
  
  require.config({
    baseUrl: '',
    paths: {
      'promizzes': 'js/promizzes',
      'tests': 'js/promizzes_test',
      'mocha': 'mocha/mocha',
      'chai': 'mocha/chai',
      'utils': 'mocha/utils'
    },
    shim: {
      promizzes: {
        deps: ['utils']
      },
      mocha: {
        init: function() {
          this.mocha.setup('bdd');
          return this.mocha;
        }
      }
    }
  });
  define(['mocha'], function(mocha) {
    require(['tests'], function() {
      var runner = mocha.run();
    });
  })
  
})();