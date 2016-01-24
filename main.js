(function() {
  
  require.config({
    baseUrl: '',
    paths: {
      'promizzes': 'js/promizzes',
      'promizzes2': 'js/promizzes2',
      'promizzes3': 'js/promizzes3',
      'test': 'js/promizzes_test',
      'test2': 'js/promizzes_test2',
      'test3': 'js/promizzes_test3',
      'mocha': 'mocha/mocha',
      'chai': 'mocha/chai',
      'utils': 'mocha/utils'
    },
    shim: {
      promizzes: { deps: ['utils'] },
      promizzes2: { deps: ['utils'] },
      promizzes3: { deps: ['utils'] },
      mocha: {
        init: function() {
          this.mocha.setup('bdd');
          return this.mocha;
        }
      }
    }
  });
  define(['mocha'], function(mocha) {
    require(['test', 'test2', 'test3'], function() {
      var runner = mocha.run();
    });
  })
  
})();