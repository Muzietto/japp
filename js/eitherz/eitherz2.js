(function() {
  'use strict';

  define([], function() {

    var makePromise = () => {
      return {
        state: 'pending',
        value: null,
        deps: [] // {onOk: faeb, onKo: faeb} 
      };
    };

    var resolve = (either, value) => {
      if (either.state !== 'pending') throw new Error('cannot resolve unpending eithers');
      either.value = value;
      either.deps.forEach(item => item.onOk(value));
      either.state = 'resolved';
    };

    var reject = (either, cause) => {
      if (either.state !== 'pending') throw new Error('cannot reject unpending eithers');
      either.value = cause;
      either.deps.forEach(item => item.onKo(cause));
      either.state = 'rejected';
    };

    var depend = (currentEither, onResolved, onRejected) => {
      if (currentEither.state === 'resolved') return onResolved(currentEither.value);
      if (currentEither.state === 'rejected') return onRejected(currentEither.value);
      var resultEither = makePromise();
      currentEither.deps.push({
        onOk: currentValue => {
          var nextEither = onResolved(currentValue);
          if (nextEither.state === 'resolved') {
            resolve(resultEither, nextEither.value);
          } else if (nextEither.state === 'rejected') {
            reject(resultEither, nextEither.value);
          } else {
            nextEither.deps.push({
              onOk: nextValue => {
                resolve(resultEither, nextValue);
                return makePromise();
              },
              onKo: nextValue => {
                reject(resultEither, nextValue);
                return makePromise();                
              }
            });
          }
          return nextEither;
        },
        onKo: currentValue => {
          var nextEither = onRejected(currentValue);
          if (nextEither.state !== 'pending') {
            reject(resultEither, currentValue);
          } else {
            var processFailure = nextValue => {
              reject(resultEither, nextValue);
              return makePromise();
            };
            nextEither.deps.push({
              onOk: processFailure,
              onKo: processFailure
            });
          }
          return nextEither;
        },
      });
      return resultEither;
    };

    var depend2 = (currentEither, onResolved, onRejected) => {
      if (currentEither.state === 'resolved') return onResolved(currentEither.value);
      if (currentEither.state === 'rejected') return onRejected(currentEither.value);
      var resultEither = makePromise();
      currentEither.deps.push({
        onOk: currentValue => {
          return depend2(onResolved(currentValue), 
                 nextValue => {
                   resolve(resultEither, nextValue);
                   return makePromise();
                 },
                 nextError => {
                   reject(resultEither, nextError);
                   return makePromise();                   
                 });
        },
        onKo: currentError => {
          var processFailure = nextError => {
              reject(resultEither, nextError);
              return makePromise();
          };
          return depend2(onRejected(currentError), processFailure, processFailure);
        },
      });
      return resultEither;
    };

    return {
      promise: makePromise,
      resolve: resolve,
      reject: reject,
      depend: depend2
    };
  });
})();