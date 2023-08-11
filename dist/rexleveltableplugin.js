(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexleveltableplugin = factory());
})(this, (function () { 'use strict';

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
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
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
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var EventEmitterMethods = {
    setEventEmitter: function setEventEmitter(eventEmitter, EventEmitterClass) {
      if (EventEmitterClass === undefined) {
        EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
      }

      this._privateEE = eventEmitter === true || eventEmitter === undefined;
      this._eventEmitter = this._privateEE ? new EventEmitterClass() : eventEmitter;
      return this;
    },
    destroyEventEmitter: function destroyEventEmitter() {
      if (this._eventEmitter && this._privateEE) {
        this._eventEmitter.shutdown();
      }
      return this;
    },
    getEventEmitter: function getEventEmitter() {
      return this._eventEmitter;
    },
    on: function on() {
      if (this._eventEmitter) {
        this._eventEmitter.on.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    once: function once() {
      if (this._eventEmitter) {
        this._eventEmitter.once.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    off: function off() {
      if (this._eventEmitter) {
        this._eventEmitter.off.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    emit: function emit(event) {
      if (this._eventEmitter && event) {
        this._eventEmitter.emit.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    addListener: function addListener() {
      if (this._eventEmitter) {
        this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    removeListener: function removeListener() {
      if (this._eventEmitter) {
        this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    removeAllListeners: function removeAllListeners() {
      if (this._eventEmitter) {
        this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    listenerCount: function listenerCount() {
      if (this._eventEmitter) {
        return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
      }
      return 0;
    },
    listeners: function listeners() {
      if (this._eventEmitter) {
        return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
      }
      return [];
    },
    eventNames: function eventNames() {
      if (this._eventEmitter) {
        return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
      }
      return [];
    }
  };

  var IsFunction = function IsFunction(obj) {
    return obj && typeof obj === 'function';
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var LevelTable = /*#__PURE__*/function () {
    function LevelTable(config) {
      _classCallCheck(this, LevelTable);
      // Event emitter
      var eventEmitter = GetValue(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      this.setTable(GetValue(config, 'table'));
      this.setExp(GetValue(config, 'exp', 0));
      this.requiredExp = this.getRequiredExpToNextLevel(this.level, this.exp);
    }
    _createClass(LevelTable, [{
      key: "setTable",
      value: function setTable(table) {
        this.levelTable = table;
        this.isLevelMapFunction = IsFunction(table);
        return this;
      }
    }, {
      key: "setExp",
      value: function setExp(exp) {
        this.exp = exp;
        this.level = this.getLevel(exp);
        return this;
      }
    }, {
      key: "getExp",
      value: function getExp(level) {
        if (level === undefined) {
          return this.exp;
        }
        return this.isLevelMapFunction ? this.levelTable(level) : this.levelTable[level];
      }
    }, {
      key: "getLevel",
      value: function getLevel(exp, level) {
        if (exp === undefined) {
          return this.level;
        }
        if (level === undefined) {
          level = 0;
        }
        while (1) {
          var nextLevelExp = this.getExp(level + 1);
          if (nextLevelExp >= exp) {
            break;
          }
          level++;
        }
        return level;
      }
    }, {
      key: "getRequiredExpToNextLevel",
      value: function getRequiredExpToNextLevel(level, exp) {
        return this.getExp(level + 1) - exp;
      }
    }, {
      key: "checkLevel",
      value: function checkLevel(level, exp) {
        return exp >= this.getExp(level) && exp < this.getExp(level + 1);
      }
    }, {
      key: "gainExp",
      value: function gainExp(incExp) {
        if (incExp === 0) {
          return this;
        }
        var prevExp = this.exp;
        var prevLevel = this.level;
        var exp = prevExp + incExp;
        var level = this.getLevel(exp, prevLevel);

        // Emit levelup event
        var fromExp = prevExp;
        while (1) {
          var levelExp0 = this.getExp(prevLevel);
          var levelExp1 = this.getExp(prevLevel + 1);
          var toExp = Math.min(levelExp1, exp);
          this.emit('levelup', prevLevel, fromExp, toExp, levelExp0, levelExp1);
          prevLevel++;
          if (toExp === exp) {
            break;
          }
          fromExp = levelExp1;
        }
        this.exp = exp;
        this.level = level;
        this.requiredExp = this.getRequiredExpToNextLevel(exp, level);
        return this;
      }
    }]);
    return LevelTable;
  }();
  Object.assign(LevelTable.prototype, EventEmitterMethods);

  var LevelTablePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(LevelTablePlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(LevelTablePlugin);
    function LevelTablePlugin(pluginManager) {
      _classCallCheck(this, LevelTablePlugin);
      return _super.call(this, pluginManager);
    }
    _createClass(LevelTablePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(config) {
        return new LevelTable(config);
      }
    }]);
    return LevelTablePlugin;
  }(Phaser.Plugins.BasePlugin);

  return LevelTablePlugin;

}));
