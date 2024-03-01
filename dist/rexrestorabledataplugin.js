(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexrestorabledataplugin = factory());
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

  var Base = Phaser.Data.DataManager;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var EventEmitterClass = Phaser.Events.EventEmitter;
  var DataManager = /*#__PURE__*/function (_Base) {
    _inherits(DataManager, _Base);
    function DataManager(parent, eventEmitter, config) {
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
      _this._recordEnable = true;
      _this.resetFromJSON(config);
      _this.events.on('changedata', _this.onValueChange, _assertThisInitialized(_this)).on('setdata', function (parent, key, value) {
        this.onValueChange(parent, key, value, null);
      }, _assertThisInitialized(_this)).on('removedata', function (parent, key, value) {
        this.onValueChange(parent, key, null, value);
      }, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(DataManager, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this._version = GetValue(o, 'version', 0);
        this._versionAlias = GetValue(o, 'versionAlias', '');
        this._repository = GetValue(o, 'repository', []);
        this._versionAliases = GetValue(o, 'versionAliases', {});
        var changeList = GetValue(o, 'changeList', {});
        var data = GetValue(o, 'data', undefined);
        if (data) {
          this._recordEnable = false;
          this.set(data);
          this._recordEnable = true;
        } else {
          // Restore from version 0 to current version
          var currentVersion = this._versionAlias !== '' ? this._versionAlias : this._version;
          this._version = 0;
          this.restore(currentVersion);
          // Restore change list
          this._recordEnable = false;
          for (var key in changeList) {
            this.setValue(key, changeList[key][0]);
          }
          this._recordEnable = true;
        }
        this._changeList = changeList;
      }
    }, {
      key: "toJSON",
      value: function toJSON(includeData) {
        if (includeData === undefined) {
          includeData = false;
        }
        var o = {
          version: this._version,
          versionAlias: this._versionAlias,
          changeList: this._changeList,
          repository: this._repository,
          versionAliases: this._versionAliases
        };
        if (includeData) {
          o.data = this.list;
        }
        return o;
      }
    }, {
      key: "version",
      get: function get() {
        return this._version;
      },
      set: function set(value) {
        var alias;
        if (typeof value === 'string') {
          alias = value;
          value = this._versionAliases[value];
        }
        if (typeof value !== 'number') {
          this._versionAlias = '';
          return;
        }
        this._versionAlias = alias ? alias : '';
        if (value === 0) {
          this._recordEnable = false;
          _get(_getPrototypeOf(DataManager.prototype), "reset", this).call(this);
          this._version = 0;
          Clear(this._changeList);
          this._recordEnable = true;
          return;
        }
        value = Math.min(value, this._repository.length);
        var changeList,
          merged = {};
        // Reverse current change
        for (var key in this._changeList) {
          merged[key] = this._changeList[key][1];
          delete this._changeList[key];
        }
        if (this._version === value) ; else if (this._version < value) {
          // Forward
          for (var i = this._version; i < value; i++) {
            changeList = this._repository[i];
            for (var key in changeList) {
              merged[key] = changeList[key][0];
            }
          }
        } else {
          // Backward            
          for (var i = this._version - 1; i >= value; i--) {
            changeList = this._repository[i];
            for (var key in changeList) {
              merged[key] = changeList[key][1];
            }
          }
        }
        this._version = value;
        var value;
        this._recordEnable = false;
        for (var key in merged) {
          value = merged[key];
          if (value === null) {
            this.removeValue(key);
          } else {
            this.setValue(key, value);
          }
        }
        this._recordEnable = true;
      }
    }, {
      key: "versionAlias",
      get: function get() {
        return this._versionAlias;
      }
    }, {
      key: "lastVersion",
      get: function get() {
        return this._repository.length;
      }
    }, {
      key: "versionAliases",
      get: function get() {
        var aliases = [];
        for (var name in this._versionAliases) {
          aliases.push(name);
        }
        return aliases;
      }
    }, {
      key: "commit",
      value: function commit(alias) {
        this._repository.length = this._version;
        for (var name in this._versionAliases) {
          if (this._versionAliases[name] > this._version) {
            delete this._versionAliases[name];
          }
        }
        this._repository.push(this._changeList);
        this._changeList = {};
        this._version++;
        if (typeof alias === 'string') {
          this._versionAlias = alias;
          this._versionAliases[alias] = this._version;
        }
        return this;
      }
    }, {
      key: "restore",
      value: function restore(value, restoreFromVersion0) {
        if (value === undefined) {
          value = this._versionAlias !== '' ? this._versionAlias : this._version;
        }
        if (restoreFromVersion0 === undefined) {
          restoreFromVersion0 = false;
        }
        if (restoreFromVersion0) {
          this.version = 0;
        }
        this.version = value;
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.restore(0);
        this._repository.length = 0;
        Clear(this._versionAliases);
        return this;
      }
    }, {
      key: "onValueChange",
      value: function onValueChange(parent, key, value, previousValue) {
        if (!this._recordEnable) {
          return;
        }
        if (this._changeList.hasOwnProperty(key)) {
          this._changeList[key][0] = value;
        } else {
          this._changeList[key] = [value, previousValue];
          // [newData, previousData]
        }
      }
    }]);
    return DataManager;
  }(Base);

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
      value: function add(parent, eventEmitter, config) {
        return new DataManager(parent, eventEmitter, config);
      }
    }]);
    return DataManagerPlugin;
  }(Phaser.Plugins.BasePlugin);

  return DataManagerPlugin;

}));
