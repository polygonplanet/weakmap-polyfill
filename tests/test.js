'use strict';

var WeakMap = require('../weakmap-polyfill');
var assert = require('assert');

describe('WeakMap', function() {
  var wm;
  var obj, obj2, func;

  before(function() {
    obj = { a: 1 };
    obj2 = { b: 1 };
    func = function() {};
  });

  describe('tests', function() {
    it('new', function() {
      wm = new WeakMap();
      assert(typeof wm === 'object');
    });

    it('set', function() {
      wm.set(obj, 1);
      wm.set(obj2, 2);
      wm.set(func, 3);
    });

    it('has', function() {
      assert(wm.has(obj) === true);
      assert(wm.has(obj2) === true);
      assert(wm.has(func) === true);
      assert(wm.has({}) === false);
    });

    it('get', function() {
      assert(wm.get(obj) === 1);
      assert(wm.get(obj2) === 2);
      assert(wm.get(func) === 3);
      assert(wm.get({}) === void 0);
    });

    it('delete', function() {
      wm.delete(obj);
      assert(wm.has(obj) === false);
      wm.delete(obj2);
      assert(wm.has(obj2) === false);
      wm.delete(func);
      assert(wm.has(func) === false);
    });
  });
});
