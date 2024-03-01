(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexawaytimeplugin = factory());
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
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }

  var GetValue = Phaser.Utils.Objects.GetValue;
  var AwayTime = /*#__PURE__*/function () {
    function AwayTime(config) {
      _classCallCheck(this, AwayTime);
      this.state = IDLE;
      this.setKey(GetValue(config, 'key', 'away'));
      this.setPeriod(GetValue(config, 'period', 1000));
    }
    _createClass(AwayTime, [{
      key: "destroy",
      value: function destroy() {
        this.stop();
      }
    }, {
      key: "awayTime",
      get: function get() {
        var prevTime = localStorage.getItem(this.key);
        this.start();
        if (prevTime == null) {
          return 0;
        }
        prevTime = parseInt(prevTime);
        var curTime = this.curTime;
        if (prevTime < 0 || prevTime > curTime) {
          return 0;
        }
        // console.log(new Date(prevTime).toLocaleString());
        // console.log(new Date(curTime).toLocaleString());        
        return curTime - prevTime;
      }
    }, {
      key: "curTime",
      get: function get() {
        return new Date().getTime();
      }
    }, {
      key: "start",
      value: function start() {
        this.stop();
        this.updateTime();
        this.timer = setInterval(this.updateTime.bind(this), this.period);
        this.state = UPDATING;
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.state === IDLE) {
          return this;
        }
        clearTimeout(this.timer);
        this.timer = undefined;
        this.state = IDLE;
        return this;
      }
    }, {
      key: "updateTime",
      value: function updateTime() {
        localStorage.setItem(this.key, this.curTime);
        return this;
      }
    }, {
      key: "setKey",
      value: function setKey(key) {
        this.key = key;
        return this;
      }
    }, {
      key: "setPeriod",
      value: function setPeriod(time) {
        this.period = time;
        return this;
      }
    }]);
    return AwayTime;
  }();
  var IDLE = 0;
  var UPDATING = 1;

  var AwayTimePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(AwayTimePlugin, _Phaser$Plugins$BaseP);
    function AwayTimePlugin(pluginManager) {
      _classCallCheck(this, AwayTimePlugin);
      return _callSuper(this, AwayTimePlugin, [pluginManager]);
    }
    _createClass(AwayTimePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this._defaultAwayTimer) {
          this._defaultAwayTimer.destroy();
        }
        _get(_getPrototypeOf(AwayTimePlugin.prototype), "destroy", this).call(this);
      }
    }, {
      key: "add",
      value: function add(config) {
        return new AwayTime(config);
      }
    }, {
      key: "defaultAwayTimer",
      get: function get() {
        if (!this._defaultAwayTimer) {
          this._defaultAwayTimer = this.add();
        }
        return this._defaultAwayTimer;
      }
    }, {
      key: "awayTime",
      get: function get() {
        return this.defaultAwayTimer.awayTime;
      }
    }, {
      key: "setKey",
      value: function setKey(key) {
        this.defaultAwayTimer.setKey(key);
        return this;
      }
    }, {
      key: "setPeriod",
      value: function setPeriod(time) {
        this.defaultAwayTimer.setPeriod(time);
        return this;
      }
    }]);
    return AwayTimePlugin;
  }(Phaser.Plugins.BasePlugin);

  return AwayTimePlugin;

}));
