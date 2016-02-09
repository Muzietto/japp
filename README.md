# japp

![playground](https://cloud.githubusercontent.com/assets/2652413/12503252/005c7be8-c0d3-11e5-9621-5e98cd08478d.jpg)

Just Another Promises Playground.

Install an [http server](https://www.npmjs.com/package/http-server) and surf to `Promizzes_Mocha.html`
- promizzes.js: first naive attempt; promise contains logic to handle value and dependencies
- promizzes2.js: all logic is outside promises and is handled by static methods `depend` & `fulfill`
- promizzes2b.js: identical to [what Robotlolita did]( http://robotlolita.me/2015/11/15/how-do-promises-work.html#a-minimal-promise-implementation)
- promizzes3.js: promises with `then` (aka `bind`) as instance method


Surf then to `Eitherz_Mocha.html`
- eitherz2b.js: all logic is outside promises and is handled by static methods `depend`, `resolve` & `reject`, heavily inspired to [what Robotlolita did]( http://robotlolita.me/2015/11/15/how-do-promises-work.html#handling-errors-with-promises)
- eitherz3.js: promises with `then` (aka `bind`) as instance method and error handling
