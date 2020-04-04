(function() {

  require.config({
    baseUrl: '',
    paths: {
      'lenses': 'js/lenses/lenses',
      'tests': 'js/lenses/lenses_test',
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
    require(['tests'], function() {
      var runner = mocha.run();
    });
  })
})();
