(function(){
  'use strict';

  define([], function() {

  const Lens = getter => setter => ({
    get: getter,
    set: setter,
  });

  return Lens;
  });
})();
