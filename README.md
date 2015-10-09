weakmap-polyfill
================

[![Build Status](https://travis-ci.org/polygonplanet/weakmap-polyfill.svg?branch=master)](https://travis-ci.org/polygonplanet/weakmap-polyfill)


Minimal implementation for ECMAScript6 WeakMap.

## Installation

### In Browser:

```html
<script src="weakmap-polyfill.js"></script>
```

or

```html
<script src="weakmap-polyfill.min.js"></script>
```

**WeakMap** will defined in the global scope if native WeakMap is not supported.


### In Node.js:

```bash
npm install weakmap-polyfill
```

```javascript
var WeakMap = require('weakmap-polyfill'); // Return WeakMap shim or native WeakMap.
```

### bower:

```bash
bower install weakmap-polyfill
```

## License

MIT


