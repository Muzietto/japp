(function() {
  'use strict';
  
  define(['promizzes', 'chai'], function(promizzes, chai) {
    var expect = chai.expect;

    describe('these beautiful tests', function() {
      it('can tell what is reversed', function() {
        expect(promizzes.pippo.reverse()).to.be.equal('oppip agnirts');
      });
    });
  });
  
})();