(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexuniqueitemlistplugin = factory());
})(this, (function () { 'use strict';

  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : String(i);
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * This is a slightly modified version of jQuery.isPlainObject.
   * A plain object is an object whose internal class property is [object Object].
   *
   * @function Phaser.Utils.Objects.IsPlainObject
   * @since 3.0.0
   *
   * @param {object} obj - The object to inspect.
   *
   * @return {boolean} `true` if the object is plain, otherwise `false`.
   */
  var IsPlainObject = function IsPlainObject(obj) {
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if (_typeof(obj) !== 'object' || obj.nodeType || obj === obj.window) {
      return false;
    }

    // Support: Firefox <20
    // The try/catch suppresses exceptions thrown when attempting to access
    // the "constructor" property of certain host objects, ie. |window.location|
    // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
    try {
      if (obj.constructor && !{}.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
      }
    } catch (e) {
      return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  //  Source object
  //  The key as a string, or an array of keys, i.e. 'banner', or 'banner.hideBanner'
  //  The default value to use if the key doesn't exist

  /**
   * Retrieves a value from an object.
   *
   * @function Phaser.Utils.Objects.GetValue
   * @since 3.0.0
   *
   * @param {object} source - The object to retrieve the value from.
   * @param {string} key - The name of the property to retrieve from the object. If a property is nested, the names of its preceding properties should be separated by a dot (`.`) - `banner.hideBanner` would return the value of the `hideBanner` property from the object stored in the `banner` property of the `source` object.
   * @param {*} defaultValue - The value to return if the `key` isn't found in the `source` object.
   *
   * @return {*} The value of the requested key.
   */
  var GetValue = function GetValue(source, key, defaultValue) {
    if (!source || typeof source === 'number') {
      return defaultValue;
    } else if (source.hasOwnProperty(key)) {
      return source[key];
    } else if (key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var parent = source;
      var value = defaultValue;

      //  Use for loop here so we can break early
      for (var i = 0; i < keys.length; i++) {
        if (parent.hasOwnProperty(keys[i])) {
          //  Yes it has a key property, let's carry on down
          value = parent[keys[i]];
          parent = parent[keys[i]];
        } else {
          //  Can't go any further, so reset to default
          value = defaultValue;
          break;
        }
      }
      return value;
    } else {
      return defaultValue;
    }
  };

  var IsArray = function IsArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var DestroyCallbackMethods = {
    setAutoCleanupEnable: function setAutoCleanupEnable(enabled) {
      if (enabled === undefined) {
        enabled = true;
      }
      this.autoCleanupEnable = enabled;
      return this;
    },
    addDestroyCallback: function addDestroyCallback(gameObject) {
      if (!gameObject || !this.autoCleanupEnable) {
        return this;
      }
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          this.addDestroyCallback(gameObjects[i]);
        }
        return this;
      }
      if (gameObject.on) {
        gameObject.once('destroy', this.onChildDestroy, this);
      }
      return this;
    },
    removeDestroyCallback: function removeDestroyCallback(gameObject) {
      if (!gameObject || !this.autoCleanupEnable) {
        return this;
      }
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          this.removeDestroyCallback(gameObjects[i]);
        }
        return this;
      }
      if (gameObject.off) {
        gameObject.off('destroy', this.onChildDestroy, this);
      }
      return this;
    }
  };

  var ContainMethods = {
    contains: function contains(item) {
      return this.items.indexOf(item) !== -1;
    },
    any: function any(listB) {
      var items = this.isList(listB) ? listB.items : listB;
      for (var i = 0, cnt = items; i < cnt; i++) {
        if (this.contains(items[i])) {
          return true;
        }
      }
      return false;
    },
    all: function all(listB) {
      var items = this.isList(listB) ? listB.items : listB;
      for (var i = 0, cnt = items; i < cnt; i++) {
        if (!this.contains(items[i])) {
          return false;
        }
      }
      return true;
    }
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Removes a single item from an array and returns it without creating gc, like the native splice does.
   * Based on code by Mike Reinstein.
   *
   * @function Phaser.Utils.Array.SpliceOne
   * @since 3.0.0
   *
   * @param {array} array - The array to splice from.
   * @param {integer} index - The index of the item which should be spliced.
   *
   * @return {*} The item which was spliced (removed).
   */
  var SpliceOne = function SpliceOne(array, index) {
    if (index >= array.length) {
      return;
    }
    var len = array.length - 1;
    var item = array[index];
    for (var i = index; i < len; i++) {
      array[i] = array[i + 1];
    }
    array.length = len;
    return item;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Compute a random integer between the `min` and `max` values, inclusive.
   *
   * @function Phaser.Math.Between
   * @since 3.0.0
   *
   * @param {integer} min - The minimum value.
   * @param {integer} max - The maximum value.
   *
   * @return {integer} The random integer.
   */
  var Between = function Between(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Shuffles the contents of the given array using the Fisher-Yates implementation.
   *
   * The original array is modified directly and returned.
   *
   * @function Phaser.Utils.Array.Shuffle
   * @since 3.0.0
   *
   * @param {array} array - The array to shuffle. This array is modified in place.
   *
   * @return {array} The shuffled array.
   */
  var Shuffle = function Shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  var Clear = function Clear(obj) {
    if (_typeof(obj) !== 'object' || obj === null) {
      return obj;
    }
    if (Array.isArray(obj)) {
      obj.length = 0;
    } else {
      for (var key in obj) {
        delete obj[key];
      }
    }
    return obj;
  };

  /**
   * Shallow Object Clone. Will not out nested objects.
   * @param {object} obj JSON object
   * @param {object} ret JSON object to return, set null to return a new object
   * @returns {object} this object
   */
  var Clone = function Clone(obj, out) {
    var objIsArray = Array.isArray(obj);
    if (out === undefined) {
      out = objIsArray ? [] : {};
    } else {
      Clear(out);
    }
    if (objIsArray) {
      out.length = obj.length;
      for (var i = 0, cnt = obj.length; i < cnt; i++) {
        out[i] = obj[i];
      }
    } else {
      for (var key in obj) {
        out[key] = obj[key];
      }
    }
    return out;
  };

  var ArrayMethods = {
    isEmpty: function isEmpty() {
      return this.items.length === 0;
    },
    get: function get(index) {
      return this.items[index];
    },
    getFirst: function getFirst() {
      return this.items[0];
    },
    getLast: function getLast() {
      return this.items[this.items.length - 1];
    },
    getRandom: function getRandom() {
      var index = Between(0, this.items.length - 1);
      return this.items[index];
    },
    add: function add(item, index, moveToNewPosition) {
      var currentIndex = this.items.indexOf(item);
      if (currentIndex !== -1) {
        if (moveToNewPosition && index !== currentIndex) {
          this.remove(undefined, currentIndex);
          this.add(item, index);
        }
        return this;
      }
      if (index === undefined || index >= this.items.length) {
        this.items.push(item);
      } else {
        this.items.splice(index, 0, item);
      }
      this.addDestroyCallback(item);
      return this;
    },
    addFirst: function addFirst(item, moveToNewPosition) {
      this.add(item, 0, moveToNewPosition);
      return this;
    },
    addLast: function addLast(item, moveToNewPosition) {
      this.add(item, undefined, moveToNewPosition);
      return this;
    },
    addMultiple: function addMultiple(items, index, moveToNewPosition) {
      if (index === undefined) {
        for (var i = 0, cnt = items.length; i < cnt; i++) {
          this.add(items[i]);
        }
      } else {
        for (var i = 0, cnt = items.length; i < cnt; i++) {
          if (this.contains(items[i])) {
            continue;
          }
          this.add(items[i], index, moveToNewPosition);
          index++;
        }
      }
      return this;
    },
    remove: function remove(item, index) {
      if (item) {
        index = this.items.indexOf(item);
        if (index === -1) {
          return this;
        }
      } else {
        item = this.items[index];
        if (!item) {
          return this;
        }
      }
      if (index === this.items.length - 1) {
        this.items.length -= 1;
      } else {
        SpliceOne(this.items, index);
      }
      this.removeDestroyCallback(item);
      return this;
    },
    onChildDestroy: function onChildDestroy(child, fromScene) {
      this.remove(child);
    },
    removeFirst: function removeFirst() {
      this.remove(undefined, 0);
      return this;
    },
    removeLast: function removeLast() {
      this.remove(undefined, this.item.length - 1);
      return this;
    },
    removeMultiple: function removeMultiple(items) {
      for (var i = items.length; i > 0; i--) {
        this.remove(items[i - 1]);
      }
      return this;
    },
    clear: function clear(destroyItems) {
      var items;
      if (destroyItems) {
        items = this.cloneItems();
      }
      this.removeDestroyCallback(this.items);
      this.items.length = 0;
      if (destroyItems) {
        for (var i = items.length; i > 0; i--) {
          items[i].destroy();
        }
      }
      return this;
    },
    clone: function clone(out) {
      if (out === this) {
        return this;
      } else if (out === undefined) {
        out = this.newList();
      }
      out.clear();
      Clone(this.items, out.items);
      out.addDestroyCallback(out.items);
      return out;
    },
    pop: function pop(index) {
      if (index === undefined) {
        index = 0;
      }
      var item = this.items[index];
      this.remove(undefined, index);
      return item;
    },
    popFirst: function popFirst() {
      return this.pop(0);
    },
    popLast: function popLast() {
      return this.pop(this.items.length - 1);
    },
    popRandom: function popRandom() {
      var index = Between(0, this.items.length - 1);
      return this.pop(index);
    },
    slice: function slice(start, end, out) {
      var result = this.items.slice(start, end + 1);
      if (out === undefined) {
        out = this.newList();
      }
      out.clear();
      Clone(result, out.items);
      out.addDestroyCallback(out.items);
      return out;
    },
    reverse: function reverse() {
      this.items.reverse();
      return this;
    },
    sort: function sort(callback) {
      this.items.sort(callback);
      return this;
    },
    shuffle: function shuffle() {
      Shuffle(this.items);
      return this;
    }
  };

  var SetMethods = {
    union: function union(listB, out) {
      if (this === listB) {
        if (this !== out) {
          out = this.clone(out);
        }
      } else if (this === out) {
        this.addMultiple(listB.items);
      } else if (listB === out) {
        listB.addMultiple(this.items);
      } else {
        if (this.items.length >= listB.items.length) {
          out = this.clone(out);
          out.addMultiple(listB.items);
        } else {
          out = listB.clone(out);
          out.addMultiple(this.items);
        }
      }
      return out;
    },
    intersect: function intersect(listB, out) {
      if (this === listB) {
        if (this !== out) {
          out = this.clone(out);
        }
      } else if (this === out) {
        var itemsA = Clone(this.items);
        this.clear();
        var item;
        for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
          item = itemsA[i];
          if (listB.contains(item)) {
            this.add(item);
          }
        }
      } else if (listB === out) {
        var itemsB = Clone(listB.items);
        listB.clear();
        var item;
        for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
          item = itemsB[i];
          if (this.contains(item)) {
            listB.add(item);
          }
        }
      } else {
        out = this.newList();
        if (this.items.length >= listB.items.length) {
          var itemsB = listB.items,
            item;
          for (var i = 0, cnt = itemsB.length; i < cnt; i++) {
            item = itemsB[i];
            if (this.contains(item)) {
              out.add(item);
            }
          }
        } else {
          var itemsA = this.items,
            item;
          for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
            item = itemsA[i];
            if (listB.contains(item)) {
              out.add(item);
            }
          }
        }
      }
      return out;
    },
    difference: function difference(listB, out) {
      if (this === listB) {
        if (this === out) {
          this.clear();
        } else {
          out = this.newList();
        }
      } else if (this === out) {
        var itemsA = Clone(this.items);
        this.clear();
        var item;
        for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
          item = itemsA[i];
          if (!listB.contains(item)) {
            this.add(item);
          }
        }
      } else if (listB === out) {
        var itemsB = Clone(listB.items);
        listB.clear();
        var item;
        for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
          item = itemsB[i];
          if (!this.contains(item)) {
            listB.add(item);
          }
        }
      } else {
        out = this.newList();
        if (this.items.length >= listB.items.length) {
          var itemsB = listB.items,
            item;
          for (var i = 0, cnt = itemsB.length; i < cnt; i++) {
            item = itemsB[i];
            if (!this.contains(item)) {
              out.add(item);
            }
          }
        } else {
          var itemsA = this.items,
            item;
          for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
            item = itemsA[i];
            if (!listB.contains(item)) {
              out.add(item);
            }
          }
        }
      }
      return out;
    }
  };

  var Copy = function Copy(dest, src, startIdx, endIdx) {
    if (startIdx === undefined) {
      startIdx = 0;
    }
    if (endIdx === undefined) {
      endIdx = src.length;
    }
    dest.length = endIdx - startIdx;
    for (var i = 0, len = dest.length; i < len; i++) {
      dest[i] = src[i + startIdx];
    }
    return dest;
  };

  var UniqueItemList = /*#__PURE__*/function () {
    function UniqueItemList(items, config) {
      _classCallCheck(this, UniqueItemList);
      if (IsPlainObject(items)) {
        config = items;
        items = GetValue(config, 'items', undefined);
      }
      this.items = [];
      this.setAutoCleanupEnable(GetValue(config, 'autoCleanup', true));
      if (items) {
        this.addMultiple(items);
      }
    }
    _createClass(UniqueItemList, [{
      key: "destroy",
      value: function destroy(destroyItems) {
        this.clear(destroyItems);
        this.items = undefined;
      }
    }, {
      key: "getItems",
      value: function getItems() {
        return this.items;
      }
    }, {
      key: "cloneItems",
      value: function cloneItems(out) {
        return Clone(this.items, out);
      }
    }, {
      key: "isList",
      value: function isList(item) {
        return item instanceof UniqueItemList;
      }
    }, {
      key: "newList",
      value: function newList(items) {
        var config = {
          autoCleanup: this.autoCleanupEnable
        };
        return new UniqueItemList(items, config);
      }
    }, {
      key: "length",
      get: function get() {
        return this.items.length;
      }
    }, {
      key: "call",
      value: function call(callback, scope) {
        if (this.items.length === 0) {
          return this;
        }
        if (typeof callback === 'string') {
          var fnName = callback;
          Copy(ARGS, arguments, 1);
          var item;
          for (var i = 0, cnt = this.items.length; i < cnt; i++) {
            item = this.items[i];
            item[fnName].apply(item, ARGS);
          }
          ARGS.length = 0;
        } else {
          for (var i = 0, cnt = this.items.length; i < cnt; i++) {
            if (scope) {
              callback.call(scope, this.items[i], i);
            } else {
              callback(this.items[i], i);
            }
          }
        }
        return this;
      }
    }]);
    return UniqueItemList;
  }();
  var ARGS = []; // reuse this array

  Object.assign(UniqueItemList.prototype, DestroyCallbackMethods, ContainMethods, ArrayMethods, SetMethods);

  var UniqueItemListPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(UniqueItemListPlugin, _Phaser$Plugins$BaseP);
    function UniqueItemListPlugin(pluginManager) {
      _classCallCheck(this, UniqueItemListPlugin);
      return _callSuper(this, UniqueItemListPlugin, [pluginManager]);
    }
    _createClass(UniqueItemListPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(config) {
        return new UniqueItemList(config);
      }
    }]);
    return UniqueItemListPlugin;
  }(Phaser.Plugins.BasePlugin);

  return UniqueItemListPlugin;

}));
