(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexgashaponplugin = factory());
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

  var IsEmpty = function IsEmpty(source) {
    for (var k in source) {
      return false;
    }
    return true;
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var Gashapon = /*#__PURE__*/function () {
    function Gashapon(config) {
      _classCallCheck(this, Gashapon);
      this.resetFromJSON(config);
    }
    _createClass(Gashapon, [{
      key: "destroy",
      value: function destroy() {
        this.items = undefined;
        this.remainder = undefined;
        this._list = undefined;
      }
    }, {
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        if (this.items == undefined) {
          this.items = {};
        }
        if (this.remainder == undefined) {
          this.remainder = {};
        }
        if (this._list == undefined) {
          this._list = [];
        }
        this.setMode(GetValue(o, 'mode', 0));
        this.setReload(GetValue(o, 'reload', true));
        this.setRND(GetValue(o, 'rnd', undefined));

        // data

        this.items = Clone(GetValue(o, 'items', {}), this.items);
        this._list.length = 0;

        // result
        this.result = GetValue(o, 'result', null);

        // flags
        this._restartFlag = true; // force restart to rebuild this._list

        // initialize
        if (this._restartFlag) {
          this.startGen();
        }
        var remainder = GetValue(o, 'remainder', undefined);
        if (remainder) {
          this.remainder = Clone(remainder, this.remainder);
        }
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          // configuration
          mode: this.mode,
          reload: this.reload,
          rnd: this.rnd,
          // data
          items: Clone(this.items),
          remainder: Clone(this.remainder),
          // result
          result: this.result,
          // flags
          restart: true // force restart to rebuild this._list
        };
      }
    }, {
      key: "startGen",
      value: function startGen() {
        var name;
        // clear remainder items
        for (name in this.remainder) {
          if (!this.items.hasOwnProperty(name)) {
            delete this.remainder[name];
          }
        }
        // init remainder items
        for (name in this.items) {
          var count = this.items[name];
          if (count > 0) {
            this.remainder[name] = count;
          }
        }
        if (this.mode === 1) {
          // random mode
          this.resetItemList(this.remainder);
        }
        this._restartFlag = false;
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE[m];
        }
        this._restartFlag = this.mode !== m;
        this.mode = m;
        return this;
      }
    }, {
      key: "setReload",
      value: function setReload(isReload) {
        this.reload = !!isReload;
        return this;
      }
    }, {
      key: "setRND",
      value: function setRND(rnd) {
        this.rnd = rnd;
        return this;
      }
    }, {
      key: "setItem",
      value: function setItem(name, count) {
        this._restartFlag = this.items[name] !== count;
        this.items[name] = count;
        return this;
      }
    }, {
      key: "removeItem",
      value: function removeItem(name) {
        if (this.items.hasOwnProperty(name)) {
          delete this.items[name];
          this._restartFlag = true;
        }
        return this;
      }
    }, {
      key: "removeAllItems",
      value: function removeAllItems() {
        for (var name in this.items) {
          delete this.items[name];
        }
        this._restartFlag = true;
        return this;
      }
    }, {
      key: "getItems",
      value: function getItems() {
        return Clone(this.items);
      }
    }, {
      key: "getRemain",
      value: function getRemain() {
        return Clone(this.remainder);
      }
    }, {
      key: "getItemCount",
      value: function getItemCount(name) {
        return this.items[name] || 0;
      }
    }, {
      key: "getRemainCount",
      value: function getRemainCount(name) {
        return this.remainder[name] || 0;
      }
    }, {
      key: "forEachItem",
      value: function forEachItem(callback, scope) {
        var args = [null, undefined];
        for (var i = 2, len = arguments.length; i < len; i++) {
          args.push(arguments[i]);
        }
        for (var name in this.items) {
          args[0] = name;
          args[1] = this.items[name];
          if (scope) {
            callback.apply(scope, args);
          } else {
            callback(args);
          }
        }
        return this;
      }
    }, {
      key: "forEachRemain",
      value: function forEachRemain(callback, scope) {
        var args = [null, undefined];
        for (var i = 1; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        for (var name in this.remainder) {
          args[1] = name;
          args[2] = this.remainder[name];
          if (scope) {
            callback.apply(scope, args);
          } else {
            callback(args);
          }
        }
        return this;
      }
    }, {
      key: "addItem",
      value: function addItem(name, count) {
        if (!this.items.hasOwnProperty(name)) {
          this.items[name] = 0;
        }
        this.items[name] += count;
        if (this._restartFlag) return;
        if (this.mode === 0) {
          // shuffle mode
          this.addRemainItem(name, count);
        } else {
          // random mode
          this.resetItemList(this.remainder);
        }
        return this;
      }
    }, {
      key: "putItemBack",
      value: function putItemBack(name, count) {
        if (this.mode === 1)
          // random mode
          return;
        if (!this.items.hasOwnProperty(name)) {
          return;
        }
        if (this.mode === 2 && this.restartGenFlg) {
          return;
        }

        // generator had started  
        if (!this.remainder.hasOwnProperty(name)) {
          this.remainder[name] = 0;
        }
        this.addShadowPattern(name, count, this.items[name]);
        return this;
      }
    }, {
      key: "next",
      value: function next(name) {
        var result = null;
        if (this._restartFlag) {
          this.startGen();
        }
        if (name == null) {
          if (this.mode === 0) {
            // shuffle mode
            this.resetItemList(this.remainder);
            result = this.getRndItem(this._list);
            this.addRemainItem(result, -1);
          } else {
            // random mode
            result = this.getRndItem(this._list);
          }
        } else {
          // force pick
          if (!this.remainder.hasOwnProperty(name)) {
            result = null; // can not pick that result
          } else {
            if (this.mode === 0) {
              this.addRemainItem(name, -1);
            }
            result = name;
          }
        }
        this.result = result;
        return result;
      }

      /** @private */
    }, {
      key: "resetItemList",
      value: function resetItemList(items) {
        // clear list
        this._list.length = 0;
        var name,
          count,
          totalCount = 0;
        // get total count
        for (name in items) {
          count = items[name];
          if (count > 0) totalCount += count;
        }
        // set percentage
        for (name in items) {
          count = items[name];
          if (count > 0) {
            this._list.push([name, count / totalCount]);
          }
        }
        return this;
      }

      /** @private */
    }, {
      key: "addRemainItem",
      value: function addRemainItem(name, inc, maxCount) {
        if (name == null || inc === 0) {
          return this;
        }
        if (!this.remainder.hasOwnProperty(name)) {
          this.remainder[name] = 0;
        }
        this.remainder[name] += inc;
        if (maxCount != null && this.remainder[name] > maxCount) {
          this.remainder[name] = maxCount;
        }
        if (this.remainder[name] <= 0) {
          delete this.remainder[name];
        }
        if (this.mode === 0 && this.reload && IsEmpty(this.remainder)) {
          this._restartFlag = true;
        }
        return this;
      }

      /** @private */
    }, {
      key: "getRndItem",
      value: function getRndItem(list) {
        var value = this.rnd ? this.rnd.frac() : Math.random();
        var result = null,
          i,
          cnt = list.length,
          item;
        for (i = 0; i < cnt; i++) {
          item = list[i];
          value -= item[1];
          if (value < 0) {
            result = item[0];
            break;
          }
        }
        return result;
      }
    }]);
    return Gashapon;
  }();
  var MODE = {
    shuffle: 0,
    random: 1
  };

  var GashaponPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(GashaponPlugin, _Phaser$Plugins$BaseP);
    function GashaponPlugin(pluginManager) {
      _classCallCheck(this, GashaponPlugin);
      return _callSuper(this, GashaponPlugin, [pluginManager]);
    }
    _createClass(GashaponPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(config) {
        return new Gashapon(config);
      }
    }]);
    return GashaponPlugin;
  }(Phaser.Plugins.BasePlugin);

  return GashaponPlugin;

}));
