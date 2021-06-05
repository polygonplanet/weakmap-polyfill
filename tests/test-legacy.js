// Weakmap minimal tests for legacy browsers (e.g. ie8, ie9 etc.) based on test.js
// This test is for use with the following gh-pages (/docs/browser-tests)
// http://polygonplanet.github.io/weakmap-polyfill/browser-tests/legacy.html

(function(self) {
  var Suite = (function() {
    var map;

    return {
      beforeEach: function() {
        map = new WeakMap();
      },
      afterEach: function() {
        map = null;
      },
      tests: {
        'WeakMap': {
          tests: [
            {
              title: 'should be a callable constructor',
              test: function() {
                assert(typeof WeakMap === 'function');
              }
            },
            {
              title: 'should have the length property whose value is 0',
              test: function() {
                assert(WeakMap.length === 0);
              }
            },
            {
              title: 'should have prototype methods',
              test: function() {
                forEach(['delete', 'get', 'has', 'set'], function(method) {
                  assert(typeof map[method] === 'function');
                });
              }
            },
            {
              title: 'should have a unique constructor',
              test: function() {
                assert(WeakMap.prototype !== Object.prototype);
              }
            },
            {
              title: 'should have valid methods',
              test: function() {
                var obj = {};
                assert(map.has(obj) === false);
                assert(map.get(obj) === void 0);
                assert(map['delete'](obj) === false);
                assert(map.set(obj, 1) === map);
                assert(map.has(obj) === true);
                assert(map.get(obj) === 1);
                assert(map['delete'](obj) === true);
                assert(map.has(obj) === false);
                assert(map.get(obj) === void 0);
                assert(map['delete'](obj) === false);
              }
            },
            {
              title: 'should be different for each instance',
              test: function() {
                var map2 = new WeakMap();
                var obj = {};
                assert(map.set(obj, 1) === map);
                assert(map2.set(obj, 2) === map2);
                assert(map.get(obj) === 1);
                assert(map2.get(obj) === 2);
                assert(map['delete'](obj) === true);
                assert(map.has(obj) === false);
                assert(map2.has(obj) === true);
                assert(map2.get(obj) === 2);
                assert(map2['delete'](obj) === true);
                assert(map2.has(obj) === false);
                assert(map2.get(obj) === void 0);
              }
            }
          ]
        },
        '#delete()': {
          tests: [
            {
              title: 'should not have enumerable property',
              test: function() {
                assert(typeof WeakMap.prototype['delete'] === 'function');
              }
            },
            {
              title: 'should have the length property whose value is 1',
              test: function() {
                assert(WeakMap.prototype['delete'].length === 1);
              }
            },
            {
              title: 'should called from a valid instance',
              test: function() {
                assert.throws(function() {
                  WeakMap.prototype['delete'].call({});
                }, TypeError);
              }
            },
            {
              title: 'should return false if the key is not of an object',
              test: function() {
                assert(map['delete']() === false);
                assert(map['delete'](null) === false);
                assert(map['delete'](0) === false);
                assert(map['delete']('') === false);
                assert(map['delete'](true) === false);
              }
            }
          ]
        },
        '#get()': {
          tests: [
            {
              title: 'should not have enumerable property',
              test: function() {
                assert(typeof WeakMap.prototype.get === 'function');
              }
            },
            {
              title: 'should have the length property whose value is 1',
              test: function() {
                assert(WeakMap.prototype.get.length === 1);
              }
            },
            {
              title: 'should called from a valid instance',
              test: function() {
                assert.throws(function() {
                  WeakMap.prototype.get.call({});
                }, TypeError);
              }
            },
            {
              title: 'should return undefined if the key is not of an object',
              test: function() {
                assert(map.get() === void 0);
                assert(map.get(null) === void 0);
                assert(map.get(0) === void 0);
                assert(map.get('') === void 0);
                assert(map.get(true) === void 0);
              }
            }
          ]
        },
        '#has()': {
          tests: [
            {
              title: 'should not have enumerable property',
              test: function() {
                assert(typeof WeakMap.prototype.has === 'function');
              }
            },
            {
              title: 'should have the length property whose value is 1',
              test: function() {
                assert(WeakMap.prototype.has.length === 1);
              }
            },
            {
              title: 'should called from a valid instance',
              test: function() {
                assert.throws(function() {
                  WeakMap.prototype.has.call({});
                }, TypeError);
              }
            },
            {
              title: 'should return false if the key is not of an object',
              test: function() {
                assert(map.has() === false);
                assert(map.has(null) === false);
                assert(map.has(0) === false);
                assert(map.has('') === false);
                assert(map.has(true) === false);
              }
            }
          ]
        },
        '#set()': {
          tests: [
            {
              title: 'should not have enumerable property',
              test: function() {
                assert(typeof WeakMap.prototype.set === 'function');
              }
            },
            {
              title: 'should have the length property whose value is 2',
              test: function() {
                assert(WeakMap.prototype.set.length === 2);
              }
            },
            {
              title: 'should called from a valid instance',
              test: function() {
                assert.throws(function() {
                  WeakMap.prototype.set.call({});
                }, TypeError);
              }
            },
            {
              title: 'should throw TypeError if passed key as primitives',
              test: function() {
                assert.throws(function() { map.set(); }, TypeError);
                assert.throws(function() { map.set(null); }, TypeError);
                assert.throws(function() { map.set(0); }, TypeError);
                assert.throws(function() { map.set(''); }, TypeError);
                assert.throws(function() { map.set(true); }, TypeError);
              }
            },
            {
              title: 'should return own instance',
              test: function() {
                assert(map.set({}) === map);
                assert(map.set(function() {}) === map);
              }
            }
          ]
        }
      }
    };
  })();

  function Test() {
    this.$testReport = document.getElementById('test-report');
    this.$ul = null;
  }

  Test.prototype = {
    clear: function() {
      this.$testReport = this.$ul = null;
    },
    run: function() {
      var self = this;

      forEach(keys(Suite.tests), function(describe) {
        var subSuite = Suite.tests[describe];
        self.describe(describe);

        forEach(subSuite.tests, function(test, i) {
          if (i === 0) {
            Suite.before && Suite.before();
            subSuite.before && subSuite.before();
          }
          Suite.beforeEach && Suite.beforeEach();
          subSuite.beforeEach && subSuite.beforeEach();

          try {
            test.test();
            self.log(test.title, true);
          } catch (e) {
            self.log(test.title, false, e.message || e.description || e);
          }

          subSuite.afterEach && subSuite.afterEach();
          Suite.afterEach && Suite.afterEach();

          if (i === 0) {
            subSuite.after && subSuite.after();
            Suite.after && Suite.after();
          }
        });
      });

      this.clear();
    },
    describe: function(content) {
      if (this.$ul) {
        this.$ul = null;
      }
      var h2 = document.createElement('h2');
      addTextContent(h2, content);
      this.$testReport.appendChild(h2);
      this.$ul = document.createElement('ul');
      this.$testReport.appendChild(this.$ul);
    },
    log: function(title, res, msg) {
      var li = document.createElement('li');

      var resSpan = document.createElement('span');
      resSpan.className = 'test-result ' + (res ? 'test-pass' : 'test-fail');
      addTextContent(resSpan, res ? 'PASS' : 'FAIL');

      var titleSpan = document.createElement('span');
      addTextContent(titleSpan, title);

      var msgDiv = document.createElement('div');
      msgDiv.className = 'test-msg ' + (res ? 'test-msg-pass' : 'test-msg-fail');
      addTextContent(msgDiv, msg || '');

      li.appendChild(resSpan);
      li.appendChild(titleSpan);
      li.appendChild(msgDiv);
      this.$ul.appendChild(li);
    }
  };

  function fail(msg) {
    throw new Error(msg);
  }

  function assert(value) {
    if (!value) {
      fail('AssertionError: ' + value + '== true');
    }
  }

  assert.throws = function(block, expected) {
    var actual;
    try {
      block();
    } catch (e) {
      actual = e;
    }

    if (actual instanceof expected) {
      return true;
    }
    fail('Got unwanted exception: ' + (expected && expected.name || expected));
  };

  function addTextContent(elem, content) {
    var key = elem.innerText === void 0 ? 'textContent' : 'innerText';
    elem[key] = content;
  }

  function forEach(target, callback, context) {
    if (target) {
      var i, len = target.length;
      if (typeof len === 'number') {
        for (i = 0; i < len; i++) {
          if (callback.call(context, target[i], i, target) === false) {
            break;
          }
        }
      } else {
        for (i in target) {
          if (callback.call(context, target[i], i, target) === false) {
            break;
          }
        }
      }
    }
    return target;
  }

  function keys(obj) {
    var keys = [];
    if (obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          keys.push(prop);
        }
      }
    }
    return keys;
  }

  new Test().run();
})(
  typeof self !== 'undefined' ? self :
  typeof window !== 'undefined' ? window :
  typeof global !== 'undefined' ? global : this
);
