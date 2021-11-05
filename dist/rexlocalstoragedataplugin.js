(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlocalstoragedataplugin = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
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

  var GetStoreKey = function GetStoreKey(key, prefix) {
    if (prefix && prefix !== '') {
      return "".concat(prefix, ".").concat(key);
    } else {
      return key;
    }
  };

  var GetDataKey = function GetDataKey(key, prefix) {
    if (prefix && prefix !== '') {
      return key.substring(prefix.length + 1);
    } else {
      return key;
    }
  };

  var SetItem = function SetItem(dataKey, prefix, value) {
    // Ref : https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#basic_concepts
    // **The keys and the values are always strings**
    value = JSON.stringify([value]);
    localStorage.setItem(GetStoreKey(dataKey, prefix), value);
  };

  var GetItem = function GetItem(dataKey, prefix) {
    var value = localStorage.getItem(GetStoreKey(dataKey, prefix));

    if (value == null) {
      return undefined;
    } else {
      value = JSON.parse(value)[0];
      return value;
    }
  };

  var RemoveItem = function RemoveItem(dataKey, prefix) {
    localStorage.removeItem(GetStoreKey(dataKey, prefix));
    return this;
  };

  var StorageMethods = {
    getStoreKey: function getStoreKey(dataKey) {
      return GetStoreKey(dataKey, this.name);
    },
    getDataKey: function getDataKey(storeKey) {
      return GetDataKey(storeKey, this.name);
    },
    setItem: function setItem(dataKey, value) {
      SetItem(dataKey, this.name, value);
      return this;
    },
    getItem: function getItem(dataKey) {
      return GetItem(dataKey, this.name);
    },
    removeItem: function removeItem(dataKey) {
      RemoveItem(dataKey, this.name);
      return this;
    }
  };

  var LoadDataKeys = function LoadDataKeys() {
    this.dataKeys.clear();
    var keys = this.getItem('__keys__');

    if (keys) {
      for (var i = 0, cnt = keys.length; i < cnt; i++) {
        this.dataKeys.set(keys[i]);
      }
    }

    return this;
  };

  var Load = function Load(defaultData, reset) {
    LoadDataKeys.call(this);
    this.defaultData = defaultData;
    this._syncEnable = false;
    this.reset();
    this._syncEnable = true;

    if (defaultData) {
      // Load data according to defaultData
      var value, prevValue;

      for (var dataKey in defaultData) {
        prevValue = reset ? undefined : this.getItem(dataKey);
        value = prevValue === undefined ? defaultData[dataKey] : prevValue;
        this.set(dataKey, value);
      }

      this.dataKeys.each(function (dataKey, index) {
        if (!(dataKey in defaultData)) {
          this.removeItem(dataKey);
          this.dataKeys["delete"](dataKey);
        }
      }, this);
      this.setItem('__keys__', this.dataKeys.entries);
    } else {
      // Load data from localstorage according to dataKeys
      this._syncEnable = false;
      this.dataKeys.iterate(function (dataKey, index) {
        this.set(dataKey, this.getItem(dataKey));
      }, this);
      this._syncEnable = true;
    }

    return this;
  };

  var GetDefaultValue = function GetDefaultValue(key) {
    return this.defaultData ? this.defaultData[key] : undefined;
  };

  var AddCallbacks = function AddCallbacks(dataManager) {
    dataManager.events // Change value
    .on('changedata', function (parent, key, value, previousValue) {
      if (!this._syncEnable) {
        return;
      }

      if (_typeof(value) !== 'object' && value === previousValue) {
        return;
      }

      this.setItem(key, value);
    }, dataManager) // Add key
    .on('setdata', function (parent, key, value) {
      if (!this._syncEnable) {
        return;
      }

      this.setItem(key, value);
      this.dataKeys.set(key);
    }, dataManager) // Remove key
    .on('removedata', function (parent, key, value) {
      if (!this._syncEnable) {
        return;
      }

      this.removeItem(key);
      this.dataKeys["delete"](key);
      this.setItem('__keys__', this.dataKeys.entries);
    }, dataManager);
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var SetStruct = Phaser.Structs.Set;
  var methods = {
    load: Load,
    getDefaultValue: GetDefaultValue
  };

  var Extend = function Extend(dataManager, config) {
    if (dataManager.hasOwnProperty('_syncEnable')) {
      // Already extended
      return dataManager;
    }

    dataManager._syncEnable = true;
    dataManager.dataKeys = new SetStruct();
    dataManager.defaultData = undefined;
    Object.assign(dataManager, StorageMethods, methods);
    AddCallbacks(dataManager);
    dataManager.name = GetValue(config, 'name', '');
    var load = GetValue(config, 'load', true);

    if (load) {
      var defaultData = GetValue(config, 'default', undefined);
      var resetFlag = GetValue(config, 'reset', false);
      dataManager.load(defaultData, resetFlag);
    }

    return dataManager;
  };

  var Base = Phaser.Data.DataManager;
  var EventEmitterKlass = Phaser.Events.EventEmitter;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

  var DataManager = /*#__PURE__*/function (_Base) {
    _inherits(DataManager, _Base);

    var _super = _createSuper(DataManager);

    function DataManager(parent, eventEmitter, config) {
      var _this;

      _classCallCheck(this, DataManager);

      if (IsPlainObject(parent)) {
        config = parent;
        parent = undefined;
        eventEmitter = undefined;
      } else if (IsPlainObject(eventEmitter)) {
        config = eventEmitter;
        eventEmitter = undefined;
      }

      var useDefaultEventEmitter = eventEmitter === undefined;

      if (useDefaultEventEmitter) {
        eventEmitter = new EventEmitterKlass();
      }

      if (parent === undefined) {
        parent = eventEmitter;
      }

      _this = _super.call(this, parent, eventEmitter);

      if (useDefaultEventEmitter) {
        var parentEventEmitter = parent.events ? parent.events : parent;

        if (parentEventEmitter) {
          parentEventEmitter.once('destroy', _this.destroy, _assertThisInitialized(_this));
        }
      }

      Extend(_assertThisInitialized(_this), config);
      return _this;
    }

    return DataManager;
  }(Base);

  var DataManagerPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(DataManagerPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(DataManagerPlugin);

    function DataManagerPlugin(pluginManager) {
      _classCallCheck(this, DataManagerPlugin);

      return _super.call(this, pluginManager);
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
    }, {
      key: "extend",
      value: function extend(dataManager, config) {
        return Extend(dataManager, config);
      }
    }, {
      key: "setItem",
      value: function setItem(dataKey, name, value) {
        SetItem(dataKey, name, value);
        return this;
      }
    }, {
      key: "getItem",
      value: function getItem(dataKey, name) {
        return GetItem(dataKey, name);
      }
    }, {
      key: "removeItem",
      value: function removeItem(dataKey, name) {
        RemoveItem(dataKey, name);
        return this;
      }
    }]);

    return DataManagerPlugin;
  }(Phaser.Plugins.BasePlugin);

  return DataManagerPlugin;

})));
