(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexbuffdataplugin = factory());
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

  var Buff = /*#__PURE__*/function () {
    function Buff() {
      _classCallCheck(this, Buff);
      this.buffs = {};
    }
    _createClass(Buff, [{
      key: "setEnable",
      value: function setEnable(key, enable) {
        if (enable === undefined) {
          enable = true;
        }
        if (!this.buffs.hasOwnProperty(key)) {
          this.buffs[key] = {
            enable: true,
            value: 0,
            type: ADD
          };
        }
        this.buffs[key].enable = enable;
        return this;
      }
    }, {
      key: "set",
      value: function set(key, value) {
        this.setEnable(key);
        var valueType = _typeof(value);
        if (valueType === 'number') {
          valueType = ADD;
        } else if (valueType === 'string') {
          if (value.indexOf('%') !== -1) {
            valueType = ADD_BASE_PERCENT;
            value = parseFloat(value) / 100;
          } else {
            valueType = ADD;
            value = parseFloat(value);
          }
        }
        var buff = this.buffs[key];
        buff.value = value;
        buff.type = valueType;
        return this;
      }
    }, {
      key: "remove",
      value: function remove(key) {
        if (this.buffs.hasOwnProperty(key)) {
          delete this.buffs[key];
        }
        return this;
      }
    }, {
      key: "buff",
      value: function buff(baseValue) {
        var result = baseValue;
        var buffs = this.buffs,
          value,
          valueType;
        for (var key in buffs) {
          value = buffs[key];
          if (!value.enable) {
            continue;
          }
          valueType = value.type;
          value = value.value;
          switch (valueType) {
            case ADD:
              result += value;
              break;
            case ADD_BASE_PERCENT:
              result += baseValue * value;
              break;
          }
        }
        return result;
      }
    }]);
    return Buff;
  }();
  var ADD = 0;
  var ADD_BASE_PERCENT = 1;

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var MinMaxBounds = /*#__PURE__*/function () {
    function MinMaxBounds(min, max) {
      _classCallCheck(this, MinMaxBounds);
      if (IsPlainObject(min)) {
        var config = min;
        min = GetValue(config, 'min', undefined);
        max = GetValue(config, 'max', undefined);
      }
      this.setMin(min);
      this.setMax(max);
    }
    _createClass(MinMaxBounds, [{
      key: "setMin",
      value: function setMin(value) {
        this.min = value;
        return this;
      }
    }, {
      key: "setMax",
      value: function setMax(value) {
        this.max = value;
        return this;
      }
    }, {
      key: "clamp",
      value: function clamp(value) {
        if (this.min !== undefined && value < this.min) {
          value = this.min;
        } else if (this.max !== undefined && value > this.max) {
          value = this.max;
        }
        return value;
      }
    }]);
    return MinMaxBounds;
  }();

  var methods = {
    setBaseValue: function setBaseValue(key, value) {
      this.baseValues[key] = value;
      this.set(key, this.getBuffResult(key));
      return this;
    },
    removeBaseValue: function removeBaseValue(key) {
      if (this.baseValues.hasOwnProperty(key)) {
        delete this.baseValues[key];
        this.remove(key);
      }
      return this;
    },
    setBuff: function setBuff(key, buffKey, value) {
      if (!this.buffs.hasOwnProperty(key)) {
        this.buffs[key] = new Buff();
      }
      this.buffs[key].set(buffKey, value);
      this.set(key, this.getBuffResult(key));
      return this;
    },
    enableBuff: function enableBuff(key, buffKey, enable) {
      if (!this.buffs.hasOwnProperty(key)) {
        this.buffs[key] = new Buff();
      }
      this.buffs[key].setEnable(buffKey, enable);
      this.set(key, this.getBuffResult(key));
      return this;
    },
    removeBuff: function removeBuff(key, buffKey) {
      if (this.buffs.hasOwnProperty(key)) {
        if (buffKey === undefined) {
          delete this.buffs[key];
        } else {
          this.buffs[key].remove(buffKey);
        }
      }
      this.set(key, this.getBuffResult(key));
      return this;
    },
    setMin: function setMin(key, min) {
      if (!this.bounds.hasOwnProperty(key)) {
        this.bounds[key] = new MinMaxBounds();
      }
      this.bounds[key].setMin(min);
      this.set(key, this.getBuffResult(key));
      return this;
    },
    setMax: function setMax(key, max) {
      if (!this.bounds.hasOwnProperty(key)) {
        this.bounds[key] = new MinMaxBounds();
      }
      this.bounds[key].setMax(max);
      this.set(key, this.getBuffResult(key));
      return this;
    },
    setBounds: function setBounds(key, min, max) {
      if (!this.bounds.hasOwnProperty(key)) {
        this.bounds[key] = new MinMaxBounds();
      }
      this.bounds[key].setMin(min).setMax(max);
      this.set(key, this.getBuffResult(key));
      return this;
    },
    getBuffResult: function getBuffResult(key) {
      return this.clamp(key, this.buff(key));
    },
    buff: function buff(key, baseValue) {
      if (baseValue === undefined) {
        baseValue = this.getBaseValue(key);
      }
      if (!this.buffs.hasOwnProperty(key)) {
        return baseValue;
      }
      return this.buffs[key].buff(baseValue);
    },
    clamp: function clamp(key, value) {
      if (value === undefined) {
        value = this.list[key];
      }
      if (!this.bounds.hasOwnProperty(key)) {
        return value;
      }
      return this.bounds[key].clamp(value);
    },
    getBaseValue: function getBaseValue(key) {
      if (!this.baseValues.hasOwnProperty(key)) {
        this.baseValues[key] = 0;
      }
      return this.baseValues[key];
    },
    getBuffs: function getBuffs(key, buffKey) {
      var buffs = this.buffs[key];
      if (buffKey === undefined) {
        return buffs;
      }
      if (buffs && buffs.hasOwnProperty(buffKey)) {
        return buffs[buffKey];
      }
      return undefined;
    },
    getBuffValue: function getBuffValue(key, buffKey) {
      return this.getBuffs(key, buffKey).value;
    },
    getBounds: function getBounds(key) {
      if (!this.bounds.hasOwnProperty(key)) {
        this.bounds[key] = new MinMaxBounds();
      }
      return this.bounds[key];
    },
    getMinBound: function getMinBound(key) {
      return this.getBounds(key).min;
    },
    getMaxBound: function getMaxBound(key) {
      return this.getBounds(key).max;
    }
  };

  var Extend = function Extend(dataManager) {
    if (dataManager.buffs === undefined) {
      dataManager.baseValues = {};
      dataManager.buffs = {};
      dataManager.bounds = {};
    }
    if (dataManager.addBuff === undefined) {
      Object.assign(dataManager, methods);
    }
    return dataManager;
  };

  var Base = Phaser.Data.DataManager;
  var EventEmitterClass = Phaser.Events.EventEmitter;
  var DataManager = /*#__PURE__*/function (_Base) {
    _inherits(DataManager, _Base);
    function DataManager(parent, eventEmitter) {
      var _this;
      _classCallCheck(this, DataManager);
      var useDefaultEventEmitter = eventEmitter === undefined;
      if (useDefaultEventEmitter) {
        eventEmitter = new EventEmitterClass();
      }
      _this = _callSuper(this, DataManager, [parent, eventEmitter]);
      if (useDefaultEventEmitter) {
        var parentEventEmitter = parent.events ? parent.events : parent;
        if (parentEventEmitter) {
          parentEventEmitter.once('destroy', _this.destroy, _assertThisInitialized(_this));
        }
      }
      Extend(_assertThisInitialized(_this));
      return _this;
    }
    return _createClass(DataManager);
  }(Base);
  Object.assign(DataManager.prototype, methods);

  var DataManagerPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(DataManagerPlugin, _Phaser$Plugins$BaseP);
    function DataManagerPlugin(pluginManager) {
      _classCallCheck(this, DataManagerPlugin);
      return _callSuper(this, DataManagerPlugin, [pluginManager]);
    }
    _createClass(DataManagerPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(parent, eventEmitter) {
        return new DataManager(parent, eventEmitter);
      }
    }, {
      key: "extend",
      value: function extend(dataManager) {
        return Extend(dataManager);
      }
    }]);
    return DataManagerPlugin;
  }(Phaser.Plugins.BasePlugin);

  return DataManagerPlugin;

}));
