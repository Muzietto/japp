# japp-jalp

![playground](https://cloud.githubusercontent.com/assets/2652413/12503252/005c7be8-c0d3-11e5-9621-5e98cd08478d.jpg)

Just Another Promises Playground. Just Another Lenses Playground.

Here are [the lenses' tests](https://muzietto.github.io/japp-jalp/Lenses_Mocha.html):
- lense.js: following along the lines of https://artyom.me/lens-over-tea-1

Here are [the promises' tests](https://muzietto.github.io/japp-jalp/Promizzes_Mocha.html):
- promizzes.js: first naive attempt; promise contains logic to handle value and dependencies
- promizzes2.js: all logic is outside promises and is handled by static methods `depend` & `fulfill`
- promizzes2b.js: identical to [what Robotlolita did]( http://robotlolita.me/2015/11/15/how-do-promises-work.html#a-minimal-promise-implementation)
- promizzes3.js: the real thing of mine - promises with `then` (aka `bind`) as instance method

Here are [the Either monad tests](https://muzietto.github.io/japp-jalp/Eitherz_Mocha.html):
- eitherz2.js: all logic is outside promises and is handled by static methods `depend`, `resolve` & `reject`
- eitherz2b.js: all logic is outside promises and is handled by static methods `depend`, `resolve` & `reject`, heavily inspired to [what Robotlolita did]( http://robotlolita.me/2015/11/15/how-do-promises-work.html#handling-errors-with-promises)
- eitherz3.js: the real thing of mine - promises with `then` (aka `bind`) as instance method and error handling
