(function() {
  
  require.config({
    baseUrl: '',
    paths: {
      'promizzes': 'js/promizzes',
      'promizzes2': 'js/promizzes2',
      'test': 'js/promizzes_test',
      'test2': 'js/promizzes_test2',
      'mocha': 'mocha/mocha',
      'chai': 'mocha/chai',
      'utils': 'mocha/utils'
    },
    shim: {
      promizzes: { deps: ['utils'] },
      promizzes2: { deps: ['utils'] },
      mocha: {
        init: function() {
          this.mocha.setup('bdd');
          return this.mocha;
        }
      }
    }
  });
  define(['mocha'], function(mocha) {
    require(['test', 'test2'], function() {
      var runner = mocha.run();
    });
  })
  
})();