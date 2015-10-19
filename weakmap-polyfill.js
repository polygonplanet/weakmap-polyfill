/**
 * weakmap-polyfill
 *
 * @description  Minimal implementation for ECMAScript6 WeakMap.
 * @fileoverview ECMAScript6 WeakMap polyfill
 * @version      1.0.1
 * @date         2015-10-19
 * @link         https://github.com/polygonplanet/weakmap-polyfill
 * @copyright    Copyright (c) 2015 polygon planet <polygon.planet.aqua@gmail.com>
 * @license      MIT
 */

(function(root, factory) {
  // Supports AMD, Node.js, CommonJS and browser context.
  if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.WeakMap = factory();
  }

}(this, function() {
  'use strict';

  if (typeof WeakMap !== 'undefined') {
    return WeakMap;
  }

  var defineProperty = Object.defineProperty,
      hasOwnProperty = Object.prototype.hasOwnProperty;

  var WM = function WeakMap() {
    this._id = '_WeakMap' + Math.random();
  };

  WM.prototype = {
    set: function(key, value) {
      if (defineProperty) {
        defineProperty(key, this._id, {
          configurable: true,
          value: value
        });
      } else {
        key[this._id] = value;
      }
      return this;
    },
    get: function(key) {
      return key[this._id];
    },
    has: function(key) {
      return hasOwnProperty.call(key, this._id);
    },
    'delete': function(key) {
      if (!this.has(key)) {
        return false;
      }
      return delete key[this._id];
    }
  };

  return WM;
}));
