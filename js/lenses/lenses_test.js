(function() {
  'use strict';

  define(['lenses', 'chai'], function(Lens, chai) {
    var expect  = chai.expect;

    describe('a naive lens', function() {

      const ix = n => Lens
        (arra => arra.slice()[n])
        (value => arra => arra
          .reduce((acc, curr, index) => (index === n)
            ? acc.concat([value])
            : acc.concat([curr]), []));

      it('gets the nth element in an array', function() {
        expect(ix(2).get(['a','b','c','d'])).to.be.eql('c');
      });

      it('sets the nth element in an array to a new value', function() {
        expect(ix(2).set('new')(['a','b','c','d'])).to.be.eql(['a','b','new','d']);
      });
    });
  });
})();
