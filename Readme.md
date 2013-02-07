stack-formatted
===============

Beautifully formatted stack traces.

Install:

```bash
npm install stack-formatted
```

Usage:

```javascript
require('stack-formatted');

console.log(new Error().stackFormatted);
// All error objects contain the stackFormatted property.
```

We use [stack-json] to produce the nicely formatted output. You can also use [trace] to get long stack trace in asynchronous code (mainly for debugging):

```javascript
require('stack-formatted');
require('trace'); // load it after this module

setTimeout(function() {
  try {
    explode;
  } catch (error) {
    console.log(error.stackFormatted);
  }
}, 100);
```


[stack-json]: https://github.com/walling/stack-json
[trace]: https://github.com/AndreasMadsen/trace
