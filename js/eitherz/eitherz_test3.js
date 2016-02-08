(function() {
  'use strict';
  
  define(['eitherz3', 'chai'], function(eitherz, chai) {
    var expect  = chai.expect;
    var promise = eitherz.makePromise;
    
    describe('instance-based promises with error handling', function() {
      it('works', function() {
        expect(promise).to.not.be.undefined;
      });
    });
  });
})();