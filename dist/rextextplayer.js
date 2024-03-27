(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextextplayer = factory());
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
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
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
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
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
  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);
        var desc;
        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
          if (!desc.writable) {
            return false;
          }
          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }
        return true;
      };
    }
    return set(target, property, value, receiver);
  }
  function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
      throw new TypeError('failed to set property');
    }
    return value;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var EventEmitterMethods$1 = {
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

  var PropertyMethods$1 = {
    hasProperty: function hasProperty(property) {
      var gameObject = this.gameObject;
      if (gameObject.hasOwnProperty(property)) {
        return true;
      } else {
        var value = gameObject[property];
        return value !== undefined;
      }
    },
    getProperty: function getProperty(property) {
      return this.gameObject[property];
    },
    setProperty: function setProperty(property, value) {
      this.gameObject[property] = value;
      return this;
    },
    easeProperty: function easeProperty(property, value, duration, ease, repeat, isYoyo, _onComplete, target) {
      if (target === undefined) {
        target = this.gameObject;
      }
      var tweenTasks = this.tweens;
      var tweenTask = tweenTasks[property];
      if (tweenTask) {
        tweenTask.remove();
      }
      var config = {
        targets: target,
        duration: duration,
        ease: ease,
        repeat: repeat,
        yoyo: isYoyo,
        onComplete: function onComplete() {
          tweenTasks[property].remove();
          tweenTasks[property] = null;
          if (_onComplete) {
            _onComplete(target, property);
          }
        },
        onCompleteScope: this
      };
      config[property] = value;
      tweenTask = this.scene.tweens.add(config);
      tweenTask.timeScale = this.timeScale;
      tweenTasks[property] = tweenTask;
      return this;
    },
    getTweenTask: function getTweenTask(property) {
      return this.tweens[property];
    },
    freeTweens: function freeTweens() {
      var tweenTasks = this.tweens,
        tweenTask;
      for (var propName in tweenTasks) {
        tweenTask = tweenTasks[propName];
        if (tweenTask) {
          tweenTask.remove();
        }
        tweenTasks[propName] = null;
      }
      return this;
    }
  };

  var CallMethods$1 = {
    hasMethod: function hasMethod(methodName) {
      return typeof this.gameObject[methodName] === 'function';
    },
    call: function call(methodName) {
      if (!this.hasMethod(methodName)) {
        console.warn("[GameObjectManager] Game object '".concat(this.name, "' does not have method '").concat(methodName, "'"));
        return this;
      }
      var gameObject = this.gameObject;
      for (var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        parameters[_key - 1] = arguments[_key];
      }
      gameObject[methodName].apply(gameObject, parameters);
      return this;
    }
  };

  var DataMethods$2 = {
    hasData: function hasData(dataKey) {
      var gameObject = this.gameObject;
      return gameObject.data ? gameObject.data.has(dataKey) : false;
    },
    getData: function getData(dataKey) {
      return this.gameObject.getData(dataKey);
    },
    setData: function setData(dataKey, value) {
      this.gameObject.setData(dataKey, value);
      return this;
    }
  };

  var BobBase = /*#__PURE__*/function () {
    function BobBase(GOManager, gameObject, name) {
      _classCallCheck(this, BobBase);
      this.GOManager = GOManager;
      this.tweens = {};
      this.effects = {};
      this.setGO(gameObject, name);
    }
    _createClass(BobBase, [{
      key: "scene",
      get: function get() {
        return this.GOManager.scene;
      }
    }, {
      key: "timeScale",
      get: function get() {
        return this.GOManager.timeScale;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.freeGO();
        this.GOManager = undefined;
      }
    }, {
      key: "freeGO",
      value: function freeGO() {
        this.freeTweens();
        this.gameObject.destroy();
        this.gameObject = undefined;
        return this;
      }
    }, {
      key: "setGO",
      value: function setGO(gameObject, name) {
        gameObject.setName(name);
        this.gameObject = gameObject;
        this.name = name;
        this.freeTweens();
        return this;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        var tweenTasks = this.tweens;
        for (var key in tweenTasks) {
          var tweenTask = tweenTasks[key];
          if (tweenTask) {
            tweenTask.timeScale = timeScale;
          }
        }
        return this;
      }
    }]);
    return BobBase;
  }();
  Object.assign(BobBase.prototype, PropertyMethods$1, CallMethods$1, DataMethods$2);

  var IsEmpty = function IsEmpty(source) {
    for (var k in source) {
      return false;
    }
    return true;
  };

  var GetMethods = {
    has: function has(name) {
      return this.bobs.hasOwnProperty(name);
    },
    exists: function exists(name) {
      return this.bobs.hasOwnProperty(name);
    },
    get: function get(name) {
      return this.bobs[name];
    },
    getGO: function getGO(name) {
      var bob = this.get(name);
      return bob ? bob.gameObject : null;
    },
    forEachGO: function forEachGO(callback, scope) {
      for (var name in this.bobs) {
        var gameObject = this.bobs[name].gameObject;
        var stopLoop;
        if (scope) {
          stopLoop = callback.call(scope, gameObject, name, this);
        } else {
          stopLoop = callback(gameObject, name, this);
        }
        if (stopLoop) {
          break;
        }
      }
      return this;
    },
    getAllGO: function getAllGO(out) {
      if (out === undefined) {
        out = [];
      }
      for (var name in this.bobs) {
        var gameObject = this.bobs[name].gameObject;
        out.push(gameObject);
      }
      return out;
    }
  };

  var GetR = function GetR(colorInt) {
    return colorInt >> 16 & 0xff;
  };
  var GetG = function GetG(colorInt) {
    return colorInt >> 8 & 0xff;
  };
  var GetB = function GetB(colorInt) {
    return colorInt & 0xff;
  };

  var MaskR = ~(0xff << 16) & 0xffffff;
  var MaskG = ~(0xff << 8) & 0xffffff;
  var MaskB = ~0xff & 0xffffff;
  var SetR = function SetR(colorInt, r) {
    return (r & 0xff) << 16 | colorInt & MaskR;
  };
  var SetG = function SetG(colorInt, g) {
    return (g & 0xff) << 8 | colorInt & MaskG;
  };
  var SetB = function SetB(colorInt, b) {
    return b & 0xff | colorInt & MaskB;
  };
  var SetRGB = function SetRGB(colorInt, r, g, b) {
    return (r & 0xff) << 16 | (g & 0xff) << 8 | b & 0xff;
  };

  var AddTintRGBProperties = function AddTintRGBProperties(gameObject, tintRGB) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('tintR')) {
      return gameObject;
    }
    if (tintRGB === undefined) {
      tintRGB = 0xffffff;
    }
    var tintR = GetR(tintRGB);
    var tintG = GetG(tintRGB);
    var tintB = GetB(tintRGB);

    // Override tint property
    Object.defineProperty(gameObject, 'tint', {
      get: function get() {
        return tintRGB;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xffffff;
        if (gameObject.setTint) {
          gameObject.setTint(value);
        }
        if (tintRGB !== value) {
          tintRGB = value;
          tintR = GetR(tintRGB);
          tintG = GetG(tintRGB);
          tintB = GetB(tintRGB);
          // gameObject.emit('_tintchange', value, tintR, tintG, tintB);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintR', {
      get: function get() {
        return tintR;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;
        if (tintR !== value) {
          tintR = value;
          gameObject.tint = SetR(tintRGB, value);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintG', {
      get: function get() {
        return tintG;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;
        if (tintG !== value) {
          tintG = value;
          gameObject.tint = SetG(tintRGB, value);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintB', {
      get: function get() {
        return tintB;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;
        if (tintB !== value) {
          tintB = value;
          gameObject.tint = SetB(tintRGB, value);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintGray', {
      get: function get() {
        return Math.floor((tintR + tintG + tintB) / 3);
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;
        if (tintR !== value || tintG !== value || tintB !== value) {
          tintR = value;
          tintG = value;
          tintB = value;
          gameObject.tint = SetRGB(tintRGB, value, value, value);
        }
      }
    });
    gameObject.tint = tintRGB;
    return gameObject;
  };

  var EventEmitter$1 = Phaser.Events.EventEmitter;
  var MonitorViewport = function MonitorViewport(viewport) {
    if (viewport.events) {
      return viewport;
    }
    var events = new EventEmitter$1();
    var x = viewport.x;
    Object.defineProperty(viewport, 'x', {
      get: function get() {
        return x;
      },
      set: function set(value) {
        if (x !== value) {
          x = value;
          events.emit('update', viewport);
        }
      }
    });
    var y = viewport.y;
    Object.defineProperty(viewport, 'y', {
      get: function get() {
        return y;
      },
      set: function set(value) {
        if (y !== value) {
          y = value;
          events.emit('update', viewport);
        }
      }
    });
    var width = viewport.width;
    Object.defineProperty(viewport, 'width', {
      get: function get() {
        return width;
      },
      set: function set(value) {
        if (width !== value) {
          width = value;
          events.emit('update', viewport);
        }
      }
    });
    var height = viewport.height;
    Object.defineProperty(viewport, 'height', {
      get: function get() {
        return height;
      },
      set: function set(value) {
        if (height !== value) {
          height = value;
          events.emit('update', viewport);
        }
      }
    });
    viewport.events = events;
    return viewport;
  };

  var VPXYToXY = function VPXYToXY(vpx, vpy, vpxOffset, vpyOffset, viewport, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = GlobXY;
    }
    if (typeof vpxOffset !== 'number') {
      vpxOffset = 0;
      vpyOffset = 0;
    }
    out.x = viewport.x + viewport.width * vpx + vpxOffset;
    out.y = viewport.y + viewport.height * vpy + vpyOffset;
    return out;
  };
  var GlobXY = {};

  var AddViewportCoordinateProperties = function AddViewportCoordinateProperties(gameObject, viewport, vpx, vpy, vpxOffset, vpyOffset, transformCallback) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('vp')) {
      return gameObject;
    }
    if (typeof vpx === 'function') {
      transformCallback = vpx;
      vpx = undefined;
    }
    if (typeof vpxOffset === 'function') {
      transformCallback = vpxOffset;
      vpxOffset = undefined;
    }
    if (vpx === undefined) {
      vpx = 0.5;
    }
    if (vpy === undefined) {
      vpy = 0.5;
    }
    if (vpxOffset === undefined) {
      vpxOffset = 0;
    }
    if (vpyOffset === undefined) {
      vpyOffset = 0;
    }
    if (transformCallback === undefined) {
      transformCallback = VPXYToXY;
    }
    MonitorViewport(viewport);
    var events = viewport.events;
    gameObject.vp = viewport;

    // Set position of game object when view-port changed.
    var Transform = function Transform() {
      transformCallback(vpx, vpy, vpxOffset, vpyOffset, viewport, gameObject);
    };
    events.on('update', Transform);
    gameObject.once('destroy', function () {
      events.off('update', Transform);
      gameObject.vp = undefined;
    });
    Object.defineProperty(gameObject, 'vpx', {
      get: function get() {
        return vpx;
      },
      set: function set(value) {
        if (vpx !== value) {
          vpx = value;
          Transform();
        }
      }
    });
    Object.defineProperty(gameObject, 'vpy', {
      get: function get() {
        return vpy;
      },
      set: function set(value) {
        if (vpy !== value) {
          vpy = value;
          Transform();
        }
      }
    });
    Object.defineProperty(gameObject, 'vpxOffset', {
      get: function get() {
        return vpxOffset;
      },
      set: function set(value) {
        if (vpxOffset !== value) {
          vpxOffset = value;
          Transform();
        }
      }
    });
    Object.defineProperty(gameObject, 'vpyOffset', {
      get: function get() {
        return vpyOffset;
      },
      set: function set(value) {
        if (vpyOffset !== value) {
          vpyOffset = value;
          Transform();
        }
      }
    });
    Transform();
  };

  var HasProperty = function HasProperty(obj, prop) {
    if (!obj) {
      return false;
    }
    if (obj.hasOwnProperty(prop)) {
      return true;
    }
    while (obj) {
      if (Object.getOwnPropertyDescriptor(obj, prop)) {
        return true;
      }
      obj = obj.__proto__;
    }
    return false;
  };

  var GetFXFactory = function GetFXFactory(gameObject) {
    if (gameObject.preFX) {
      return gameObject.preFX;
    }
    if (gameObject.postFX) {
      return gameObject.postFX;
    }
    return null;
  };

  var AddClearEffectCallback = function AddClearEffectCallback(gameObject, effectSwitchName) {
    if (!gameObject._effectSwitchNames) {
      gameObject._effectSwitchNames = [];
      gameObject.clearAllEffects = function () {
        var effectSwitchNames = gameObject._effectSwitchNames;
        for (var i = 0, cnt = effectSwitchNames.length; i < cnt; i++) {
          gameObject[effectSwitchNames[i]] = null;
        }
        return gameObject;
      };
      gameObject.on('destroy', gameObject.clearAllEffects, gameObject);
    }
    gameObject._effectSwitchNames.push(effectSwitchName);
  };

  var AddBarrelProperties = function AddBarrelProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'barrel')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var barrel;
    Object.defineProperty(gameObject, 'barrel', {
      get: function get() {
        return barrel;
      },
      set: function set(value) {
        if (barrel === value) {
          return;
        }
        barrel = value;
        if (barrel === null || barrel === false) {
          if (gameObject._barrelEffect) {
            fxFactory.remove(gameObject._barrelEffect);
            gameObject._barrelEffect = undefined;
          }
        } else {
          if (!gameObject._barrelEffect) {
            gameObject._barrelEffect = fxFactory.addBarrel();
          }
          gameObject._barrelEffect.amount = barrel;
        }
      }
    });
    gameObject.barrel = null;
    AddClearEffectCallback(gameObject, 'barrel');
    return gameObject;
  };

  var AddColorMatrixEffectPropertiesBase = function AddColorMatrixEffectPropertiesBase(gameObject, effectName, inputMode) {
    // Don't attach properties again
    if (HasProperty(gameObject, effectName)) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var EffectInstancePropertyName = "_".concat(effectName, "Effect");
    var currentValue;
    Object.defineProperty(gameObject, effectName, {
      get: function get() {
        return currentValue;
      },
      set: function set(value) {
        if (currentValue === value) {
          return;
        }
        currentValue = value;
        if (currentValue === null || currentValue === false) {
          if (gameObject[EffectInstancePropertyName]) {
            fxFactory.remove(gameObject[EffectInstancePropertyName]);
            gameObject[EffectInstancePropertyName] = undefined;
          }
        } else {
          if (!gameObject[EffectInstancePropertyName]) {
            gameObject[EffectInstancePropertyName] = fxFactory.addColorMatrix();
          }
          var effectInstance = gameObject[EffectInstancePropertyName];
          effectInstance[effectName](inputMode === 1 ? value : undefined);
        }
      }
    });
    gameObject[effectName] = null;
    AddClearEffectCallback(gameObject, effectName);
    return gameObject;
  };

  var AddBlackWhiteProperties = function AddBlackWhiteProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'blackWhite');
    return gameObject;
  };

  var AddBloomProperties = function AddBloomProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'bloomColor')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var bloomColor,
      bloomOffsetX = 1,
      bloomOffsetY = 1,
      bloomBlurStrength = 1,
      bloomStrength = 1,
      bloomSteps = 4;
    Object.defineProperty(gameObject, 'bloomColor', {
      get: function get() {
        return bloomColor;
      },
      set: function set(value) {
        if (bloomColor === value) {
          return;
        }
        bloomColor = value;
        if (bloomColor === null || bloomColor === false) {
          if (gameObject._bloom) {
            fxFactory.remove(gameObject._bloom);
            gameObject._bloom = undefined;
            fxFactory.setPadding(0);
          }
        } else {
          if (!gameObject._bloom) {
            gameObject._bloom = fxFactory.addBloom(bloomColor, bloomOffsetX, bloomOffsetY, bloomBlurStrength, bloomStrength, bloomSteps);
            fxFactory.setPadding(Math.max(bloomOffsetX, bloomOffsetY) + 1);
          }
          gameObject._bloom.color = bloomColor;
        }
      }
    });
    Object.defineProperty(gameObject, 'bloomOffsetX', {
      get: function get() {
        return bloomOffsetX;
      },
      set: function set(value) {
        if (bloomOffsetX === value) {
          return;
        }
        bloomOffsetX = value;
        if (gameObject._bloom) {
          var offset = Math.max(bloomOffsetX, bloomOffsetY);
          fxFactory.setPadding(offset + 1);
          gameObject._bloom.offsetX = bloomOffsetX;
        }
      }
    });
    Object.defineProperty(gameObject, 'bloomOffsetY', {
      get: function get() {
        return bloomOffsetY;
      },
      set: function set(value) {
        if (bloomOffsetY === value) {
          return;
        }
        bloomOffsetY = value;
        if (gameObject._bloom) {
          var offset = Math.max(bloomOffsetX, bloomOffsetY);
          fxFactory.setPadding(offset + 1);
          gameObject._bloom.offsetY = bloomOffsetY;
        }
      }
    });
    Object.defineProperty(gameObject, 'bloomBlurStrength', {
      get: function get() {
        return bloomBlurStrength;
      },
      set: function set(value) {
        if (bloomBlurStrength === value) {
          return;
        }
        bloomBlurStrength = value;
        if (gameObject._bloom) {
          gameObject._bloom.blurStrength = bloomBlurStrength;
        }
      }
    });
    Object.defineProperty(gameObject, 'bloomStrength', {
      get: function get() {
        return bloomStrength;
      },
      set: function set(value) {
        if (bloomStrength === value) {
          return;
        }
        bloomStrength = value;
        if (gameObject._bloom) {
          gameObject._bloom.strength = bloomStrength;
        }
      }
    });
    Object.defineProperty(gameObject, 'bloomSteps', {
      get: function get() {
        return bloomSteps;
      },
      set: function set(value) {
        if (bloomSteps === value) {
          return;
        }
        bloomSteps = value;
        if (gameObject._bloom) {
          gameObject._bloom.steps = bloomSteps;
        }
      }
    });
    gameObject.bloomColor = null;
    AddClearEffectCallback(gameObject, 'bloomColor');
    return gameObject;
  };

  var AddBlurProperties = function AddBlurProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'blurColor')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var blurColor,
      blurQuality = 0,
      blurX = 1,
      blurY = 1,
      blurStrength = 1,
      blurSteps = 4;
    Object.defineProperty(gameObject, 'blurColor', {
      get: function get() {
        return blurColor;
      },
      set: function set(value) {
        if (blurColor === value) {
          return;
        }
        blurColor = value;
        if (blurColor === null || blurColor === false) {
          if (gameObject._blur) {
            fxFactory.remove(gameObject._blur);
            gameObject._blur = undefined;
            fxFactory.setPadding(0);
          }
        } else {
          if (!gameObject._blur) {
            gameObject._blur = fxFactory.addBlur(blurQuality, blurX, blurY, blurStrength, blurColor, blurSteps);
            fxFactory.setPadding(Math.max(blurX, blurY) + 1);
          }
          gameObject._blur.color = blurColor;
        }
      }
    });
    Object.defineProperty(gameObject, 'blurQuality', {
      get: function get() {
        return blurQuality;
      },
      set: function set(value) {
        if (blurQuality === value) {
          return;
        }
        blurQuality = value;
        if (gameObject._blur) {
          gameObject._blur.quality = blurQuality;
        }
      }
    });
    Object.defineProperty(gameObject, 'blurX', {
      get: function get() {
        return blurX;
      },
      set: function set(value) {
        if (blurX === value) {
          return;
        }
        blurX = value;
        if (gameObject._blur) {
          var offset = Math.max(blurX, blurY);
          fxFactory.setPadding(offset + 1);
          gameObject._blur.x = blurX;
        }
      }
    });
    Object.defineProperty(gameObject, 'blurY', {
      get: function get() {
        return blurY;
      },
      set: function set(value) {
        if (blurY === value) {
          return;
        }
        blurY = value;
        if (gameObject._blur) {
          var offset = Math.max(blurX, blurY);
          fxFactory.setPadding(offset + 1);
          gameObject._blur.y = blurY;
        }
      }
    });
    Object.defineProperty(gameObject, 'blurStrength', {
      get: function get() {
        return blurStrength;
      },
      set: function set(value) {
        if (blurStrength === value) {
          return;
        }
        blurStrength = value;
        if (gameObject._blur) {
          gameObject._blur.strength = blurStrength;
        }
      }
    });
    Object.defineProperty(gameObject, 'blurSteps', {
      get: function get() {
        return blurSteps;
      },
      set: function set(value) {
        if (blurSteps === value) {
          return;
        }
        blurSteps = value;
        if (gameObject._blur) {
          gameObject._blur.steps = blurSteps;
        }
      }
    });
    gameObject.blurColor = null;
    AddClearEffectCallback(gameObject, 'blurColor');
    return gameObject;
  };

  var AddBokehProperties = function AddBokehProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'bokehRadius')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var bokehRadius,
      bokehAmount = 1,
      bokehContrast = 0.2;
    Object.defineProperty(gameObject, 'bokehRadius', {
      get: function get() {
        return bokehRadius;
      },
      set: function set(value) {
        if (bokehRadius === value) {
          return;
        }
        bokehRadius = value;
        if (bokehRadius === null || bokehRadius === false) {
          if (gameObject._bokeh) {
            fxFactory.remove(gameObject._bokeh);
            gameObject._bokeh = undefined;
          }
        } else {
          if (!gameObject._bokeh) {
            gameObject._bokeh = fxFactory.addBokeh(bokehRadius, bokehAmount, bokehContrast);
          }
          gameObject._bokeh.radius = bokehRadius;
        }
      }
    });
    Object.defineProperty(gameObject, 'bokehAmount', {
      get: function get() {
        return bokehAmount;
      },
      set: function set(value) {
        if (bokehAmount === value) {
          return;
        }
        bokehAmount = value;
        if (gameObject._bokeh) {
          gameObject._bokeh.amount = bokehAmount;
        }
      }
    });
    Object.defineProperty(gameObject, 'bokehContrast', {
      get: function get() {
        return bokehContrast;
      },
      set: function set(value) {
        if (bokehContrast === value) {
          return;
        }
        bokehContrast = value;
        if (gameObject._bokeh) {
          gameObject._bokeh.contrast = bokehContrast;
        }
      }
    });
    gameObject.bokehRadius = null;
    AddClearEffectCallback(gameObject, 'bokehRadius');
    return gameObject;
  };

  var AddBrightnessProperties = function AddBrightnessProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'brightness', 1);
    return gameObject;
  };

  var AddBrownProperties = function AddBrownProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'brown');
    return gameObject;
  };

  var AddCircleProperties = function AddCircleProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'circleColor')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var circleColor,
      circleThickness = 8,
      circleBackgroundColor = 0x000000,
      circleBackgroundAlpha = 0.4,
      circleScale = 1,
      circleFeather = 0.005;
    Object.defineProperty(gameObject, 'circleColor', {
      get: function get() {
        return circleColor;
      },
      set: function set(value) {
        if (circleColor === value) {
          return;
        }
        circleColor = value;
        if (circleColor === null || circleColor === false) {
          if (gameObject._circle) {
            fxFactory.remove(gameObject._circle);
            gameObject._circle = undefined;
          }
        } else {
          if (!gameObject._circle) {
            gameObject._circle = fxFactory.addCircle(circleThickness, circleColor, circleBackgroundColor, circleScale, circleFeather);
            gameObject.circleBackgroundAlpha = circleBackgroundAlpha;
          }
          gameObject._circle.color = circleColor;
        }
      }
    });
    Object.defineProperty(gameObject, 'circleThickness', {
      get: function get() {
        return circleThickness;
      },
      set: function set(value) {
        if (circleThickness === value) {
          return;
        }
        circleThickness = value;
        if (gameObject._circle) {
          gameObject._circle.thickness = circleThickness;
        }
      }
    });
    Object.defineProperty(gameObject, 'circleBackgroundColor', {
      get: function get() {
        return circleBackgroundColor;
      },
      set: function set(value) {
        if (circleBackgroundColor === value) {
          return;
        }
        circleBackgroundColor = value;
        if (gameObject._circle) {
          gameObject._circle.backgroundColor = circleBackgroundColor;
        }
      }
    });
    Object.defineProperty(gameObject, 'circleBackgroundAlpha', {
      get: function get() {
        return circleBackgroundAlpha;
      },
      set: function set(value) {
        if (circleBackgroundAlpha === value) {
          return;
        }
        circleBackgroundAlpha = value;
        if (gameObject._circle) {
          gameObject._circle.glcolor2[3] = circleBackgroundAlpha;
        }
      }
    });
    Object.defineProperty(gameObject, 'circleScale', {
      get: function get() {
        return circleScale;
      },
      set: function set(value) {
        if (circleScale === value) {
          return;
        }
        circleScale = value;
        if (gameObject._circle) {
          gameObject._circle.scale = circleScale;
        }
      }
    });
    Object.defineProperty(gameObject, 'circleFeather', {
      get: function get() {
        return circleFeather;
      },
      set: function set(value) {
        if (circleFeather === value) {
          return;
        }
        circleFeather = value;
        if (gameObject._circle) {
          gameObject._circle.feather = circleFeather;
        }
      }
    });
    gameObject.circleColor = null;
    AddClearEffectCallback(gameObject, 'circleColor');
    return gameObject;
  };

  var AddContrastProperties = function AddContrastProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'contrast', 1);
    return gameObject;
  };

  var AddDesaturateProperties = function AddDesaturateProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'desaturate', 1);
    return gameObject;
  };

  var AddDesaturateLuminanceProperties = function AddDesaturateLuminanceProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'desaturateLuminance');
    return gameObject;
  };

  var AddDisplacementProperties = function AddDisplacementProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'displacementKey')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var displacementKey,
      displacementX = 0.005,
      displacementY = 0.005;
    Object.defineProperty(gameObject, 'displacementKey', {
      get: function get() {
        return displacementKey;
      },
      set: function set(value) {
        if (displacementKey === value) {
          return;
        }
        displacementKey = value;
        if (displacementKey === null || displacementKey === false) {
          if (gameObject._displacement) {
            fxFactory.remove(gameObject._displacement);
            gameObject._displacement = undefined;
          }
        } else {
          if (!gameObject._displacement) {
            gameObject._displacement = fxFactory.addDisplacement(displacementKey, displacementX, displacementY);
          }
          gameObject._displacement.setTexture(displacementKey);
        }
      }
    });
    Object.defineProperty(gameObject, 'displacementX', {
      get: function get() {
        return displacementX;
      },
      set: function set(value) {
        if (displacementX === value) {
          return;
        }
        displacementX = value;
        if (gameObject._displacement) {
          gameObject._displacement.x = displacementX;
        }
      }
    });
    Object.defineProperty(gameObject, 'displacementY', {
      get: function get() {
        return displacementY;
      },
      set: function set(value) {
        if (displacementY === value) {
          return;
        }
        displacementY = value;
        if (gameObject._displacement) {
          gameObject._displacement.y = displacementY;
        }
      }
    });
    gameObject.displacementKey = null;
    AddClearEffectCallback(gameObject, 'displacementKey');
    return gameObject;
  };

  var AddGlowProperties = function AddGlowProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'glowColor')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var glowColor,
      glowOuterStrength = 4,
      glowInnerStrength = 0;
    Object.defineProperty(gameObject, 'glowColor', {
      get: function get() {
        return glowColor;
      },
      set: function set(value) {
        if (glowColor === value) {
          return;
        }
        glowColor = value;
        if (glowColor === null || glowColor === false) {
          if (gameObject._glow) {
            fxFactory.remove(gameObject._glow);
            gameObject._glow = undefined;
            fxFactory.setPadding(0);
          }
        } else {
          if (!gameObject._glow) {
            gameObject._glow = fxFactory.addGlow(glowColor, glowOuterStrength, glowInnerStrength);
            fxFactory.setPadding(glowOuterStrength + 1);
          }
          gameObject._glow.color = glowColor;
        }
      }
    });
    Object.defineProperty(gameObject, 'glowOuterStrength', {
      get: function get() {
        return glowOuterStrength;
      },
      set: function set(value) {
        if (glowOuterStrength === value) {
          return;
        }
        glowOuterStrength = value;
        if (gameObject._glow) {
          fxFactory.setPadding(glowOuterStrength + 1);
          gameObject._glow.outerStrength = glowOuterStrength;
        }
      }
    });
    Object.defineProperty(gameObject, 'glowInnerStrength', {
      get: function get() {
        return glowInnerStrength;
      },
      set: function set(value) {
        if (glowInnerStrength === value) {
          return;
        }
        glowInnerStrength = value;
        if (gameObject._glow) {
          gameObject._glow.innerStrength = glowInnerStrength;
        }
      }
    });
    gameObject.glowColor = null;
    AddClearEffectCallback(gameObject, 'glowColor');
    return gameObject;
  };

  var AddGradientProperties = function AddGradientProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'gradientColor')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var gradientColor1,
      gradientColor2,
      gradientAlpha = 0.5,
      gradientFromX = 0,
      gradientFromY = 0,
      gradientToX = 0,
      gradientToY = 1,
      gradientSize = 0;
    Object.defineProperty(gameObject, 'gradientColor', {
      get: function get() {
        return [gradientColor1, gradientColor2];
      },
      set: function set(value) {
        var color1, color2;
        if (value === null || value === false) {
          color1 = null;
          color2 = null;
        } else {
          color1 = value[0];
          color2 = value[1];
        }
        if (gradientColor1 === color1 && gradientColor2 === color2) {
          return;
        }
        gradientColor1 = color1;
        gradientColor2 = color2;
        if (gradientColor1 === null || gradientColor1 === false) {
          if (gameObject._gradient) {
            fxFactory.remove(gameObject._gradient);
            gameObject._gradient = undefined;
          }
        } else {
          if (!gameObject._gradient) {
            gameObject._gradient = fxFactory.addGradient(gradientColor1, gradientColor2, gradientAlpha, gradientFromX, gradientFromY, gradientToX, gradientToY, gradientSize);
          }
          gameObject._gradient.color1 = gradientColor1;
          gameObject._gradient.color2 = gradientColor2;
        }
      }
    });
    Object.defineProperty(gameObject, 'gradientColor1', {
      get: function get() {
        return gradientColor1;
      },
      set: function set(value) {
        if (value === null || value === false) {
          gameObject.gradientColor = value;
          return;
        }
        if (gradientColor1 === value) {
          return;
        }
        gradientColor1 = value;
        if (gameObject._gradient) {
          gameObject._gradient.color1 = gradientColor1;
        }
      }
    });
    Object.defineProperty(gameObject, 'gradientColor2', {
      get: function get() {
        return gradientColor2;
      },
      set: function set(value) {
        if (value === null || value === false) {
          gameObject.gradientColor = value;
          return;
        }
        if (gradientColor2 === value) {
          return;
        }
        gradientColor2 = value;
        if (gameObject._gradient) {
          gameObject._gradient.color2 = gradientColor2;
        }
      }
    });
    Object.defineProperty(gameObject, 'gradientAlpha', {
      get: function get() {
        return gradientAlpha;
      },
      set: function set(value) {
        if (gradientAlpha === value) {
          return;
        }
        gradientAlpha = value;
        if (gameObject._gradient) {
          gameObject._gradient.alpha = gradientAlpha;
        }
      }
    });
    Object.defineProperty(gameObject, 'gradientFromX', {
      get: function get() {
        return gradientFromX;
      },
      set: function set(value) {
        if (gradientFromX === value) {
          return;
        }
        gradientFromX = value;
        if (gameObject._gradient) {
          gameObject._gradient.fromX = gradientFromX;
        }
      }
    });
    Object.defineProperty(gameObject, 'gradientFromY', {
      get: function get() {
        return gradientFromY;
      },
      set: function set(value) {
        if (gradientFromY === value) {
          return;
        }
        gradientFromY = value;
        if (gameObject._gradient) {
          gameObject._gradient.fromY = gradientFromY;
        }
      }
    });
    Object.defineProperty(gameObject, 'gradientToX', {
      get: function get() {
        return gradientToX;
      },
      set: function set(value) {
        if (gradientToX === value) {
          return;
        }
        gradientToX = value;
        if (gameObject._gradient) {
          gameObject._gradient.toX = gradientToX;
        }
      }
    });
    Object.defineProperty(gameObject, 'gradientToY', {
      get: function get() {
        return gradientToY;
      },
      set: function set(value) {
        if (gradientToY === value) {
          return;
        }
        gradientToY = value;
        if (gameObject._gradient) {
          gameObject._gradient.toY = gradientToY;
        }
      }
    });
    Object.defineProperty(gameObject, 'gradientSize', {
      get: function get() {
        return gradientSize;
      },
      set: function set(value) {
        if (gradientSize === value) {
          return;
        }
        gradientSize = value;
        if (gameObject._gradient) {
          gameObject._gradient.size = gradientSize;
        }
      }
    });
    gameObject.gradientColor = null;
    AddClearEffectCallback(gameObject, 'gradientColor');
    return gameObject;
  };

  var AddGrayscaleProperties = function AddGrayscaleProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'grayscale', 1);
    return gameObject;
  };

  var AddHueProperties = function AddHueProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'hue', 1);
    return gameObject;
  };

  var AddKodachromeProperties = function AddKodachromeProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'kodachrome');
    return gameObject;
  };

  var AddLSDProperties = function AddLSDProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'lsd');
    return gameObject;
  };

  var AddNegativeProperties = function AddNegativeProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'negative');
    return gameObject;
  };

  var AddPixelateProperties = function AddPixelateProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'pixelate')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var pixelate;
    Object.defineProperty(gameObject, 'pixelate', {
      get: function get() {
        return pixelate;
      },
      set: function set(value) {
        if (pixelate === value) {
          return;
        }
        pixelate = value;
        if (pixelate === null || pixelate === false) {
          if (gameObject._pixelateEffect) {
            fxFactory.remove(gameObject._pixelateEffect);
            gameObject._pixelateEffect = undefined;
          }
        } else {
          if (!gameObject._pixelateEffect) {
            gameObject._pixelateEffect = fxFactory.addPixelate();
          }
          gameObject._pixelateEffect.amount = pixelate;
        }
      }
    });
    gameObject.pixelate = null;
    AddClearEffectCallback(gameObject, 'pixelate');
    return gameObject;
  };

  var AddPolaroidProperties = function AddPolaroidProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'polaroid');
    return gameObject;
  };

  var AddRevealProperties = function AddRevealProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'revealLeft')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var revealLeft,
      revealRight,
      revealUp,
      revealDown,
      revealWidth = 0.1;
    var ClearRevealFlags = function ClearRevealFlags() {
      revealLeft = null;
      revealRight = null;
      revealUp = null;
      revealDown = null;
    };
    var RemoveEffect = function RemoveEffect(gameObject) {
      if (gameObject._revealEffect) {
        fxFactory.remove(gameObject._revealEffect);
        gameObject._revealEffect = undefined;
      }
    };
    Object.defineProperty(gameObject, 'revealLeft', {
      get: function get() {
        return revealLeft;
      },
      set: function set(value) {
        if (revealLeft === value) {
          return;
        }
        ClearRevealFlags();
        revealLeft = value;
        if (revealLeft === null || revealLeft === false) {
          RemoveEffect(gameObject);
        } else {
          if (!gameObject._revealEffect) {
            gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
          }
          gameObject._revealEffect.direction = 1;
          gameObject._revealEffect.axis = 0;
          gameObject._revealEffect.progress = revealLeft;
        }
      }
    });
    Object.defineProperty(gameObject, 'revealRight', {
      get: function get() {
        return revealRight;
      },
      set: function set(value) {
        if (revealRight === value) {
          return;
        }
        ClearRevealFlags();
        revealRight = value;
        if (revealRight === null || revealRight === false) {
          RemoveEffect(gameObject);
        } else {
          if (!gameObject._revealEffect) {
            gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
          }
          gameObject._revealEffect.direction = 0;
          gameObject._revealEffect.axis = 0;
          gameObject._revealEffect.progress = revealRight;
        }
      }
    });
    Object.defineProperty(gameObject, 'revealUp', {
      get: function get() {
        return revealUp;
      },
      set: function set(value) {
        if (revealUp === value) {
          return;
        }
        ClearRevealFlags();
        revealUp = value;
        if (revealUp === null || revealUp === false) {
          RemoveEffect(gameObject);
        } else {
          if (!gameObject._revealEffect) {
            gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
          }
          gameObject._revealEffect.direction = 1;
          gameObject._revealEffect.axis = 1;
          gameObject._revealEffect.progress = revealUp;
        }
      }
    });
    Object.defineProperty(gameObject, 'revealDown', {
      get: function get() {
        return revealDown;
      },
      set: function set(value) {
        if (revealDown === value) {
          return;
        }
        ClearRevealFlags();
        revealDown = value;
        if (revealDown === null || revealDown === false) {
          RemoveEffect(gameObject);
        } else {
          if (!gameObject._revealEffect) {
            gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
          }
          gameObject._revealEffect.direction = 0;
          gameObject._revealEffect.axis = 1;
          gameObject._revealEffect.progress = revealDown;
        }
      }
    });
    Object.defineProperty(gameObject, 'revealWidth', {
      get: function get() {
        return revealWidth;
      },
      set: function set(value) {
        if (revealWidth === value) {
          return;
        }
        revealWidth = value;
        if (gameObject._revealEffect) {
          gameObject._revealEffect.wipeWidth = revealWidth;
        }
      }
    });
    gameObject.revealLeft = null;
    AddClearEffectCallback(gameObject, 'revealLeft');
    AddClearEffectCallback(gameObject, 'revealRight');
    AddClearEffectCallback(gameObject, 'revealUp');
    AddClearEffectCallback(gameObject, 'revealDown');
    return gameObject;
  };

  var AddSaturateProperties = function AddSaturateProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'saturate', 1);
    return gameObject;
  };

  var AddSepiaProperties = function AddSepiaProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'sepia');
    return gameObject;
  };

  var AddShadowProperties = function AddShadowProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'shadowColor')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var shadowColor,
      shadowX = 0,
      shadowY = 0,
      shadowDecay = 0.1,
      shadowPower = 1,
      shadowSamples = 6,
      shadowIntensity = 1;
    Object.defineProperty(gameObject, 'shadowColor', {
      get: function get() {
        return shadowColor;
      },
      set: function set(value) {
        if (shadowColor === value) {
          return;
        }
        shadowColor = value;
        if (shadowColor === null || shadowColor === false) {
          if (gameObject._shadow) {
            fxFactory.remove(gameObject._shadow);
            gameObject._shadow = undefined;
          }
        } else {
          if (!gameObject._shadow) {
            gameObject._shadow = fxFactory.addShadow(shadowX, shadowY, shadowDecay, shadowPower, shadowColor, shadowSamples, shadowIntensity);
          }
          gameObject._shadow.color = shadowColor;
        }
      }
    });
    Object.defineProperty(gameObject, 'shadowX', {
      get: function get() {
        return shadowX;
      },
      set: function set(value) {
        if (shadowX === value) {
          return;
        }
        shadowX = value;
        if (gameObject._shadow) {
          gameObject._shadow.x = shadowX;
        }
      }
    });
    Object.defineProperty(gameObject, 'shadowY', {
      get: function get() {
        return shadowY;
      },
      set: function set(value) {
        if (shadowY === value) {
          return;
        }
        shadowY = value;
        if (gameObject._shadow) {
          gameObject._shadow.y = shadowY;
        }
      }
    });
    Object.defineProperty(gameObject, 'decay', {
      get: function get() {
        return shadowDecay;
      },
      set: function set(value) {
        if (shadowDecay === value) {
          return;
        }
        shadowDecay = value;
        if (gameObject._shadow) {
          gameObject._shadow.decay = shadowDecay;
        }
      }
    });
    Object.defineProperty(gameObject, 'shadowPower', {
      get: function get() {
        return shadowPower;
      },
      set: function set(value) {
        if (shadowPower === value) {
          return;
        }
        shadowPower = value;
        if (gameObject._shadow) {
          gameObject._shadow.power = shadowPower;
        }
      }
    });
    Object.defineProperty(gameObject, 'shadowSamples', {
      get: function get() {
        return shadowSamples;
      },
      set: function set(value) {
        if (shadowSamples === value) {
          return;
        }
        shadowSamples = value;
        if (gameObject._shadow) {
          gameObject._shadow.samples = shadowSamples;
        }
      }
    });
    Object.defineProperty(gameObject, 'shadowIntensity', {
      get: function get() {
        return shadowIntensity;
      },
      set: function set(value) {
        if (shadowIntensity === value) {
          return;
        }
        shadowIntensity = value;
        if (gameObject._shadow) {
          gameObject._shadow.intensity = shadowIntensity;
        }
      }
    });
    gameObject.shadowColor = null;
    AddClearEffectCallback(gameObject, 'shadowColor');
    return gameObject;
  };

  var AddShiftToBGRProperties = function AddShiftToBGRProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'shiftToBGR');
    return gameObject;
  };

  var AddShineProperties = function AddShineProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'shineSpeed')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var shineSpeed,
      shineLineWidth = 0.5,
      shineGradient = 3;
    Object.defineProperty(gameObject, 'shineSpeed', {
      get: function get() {
        return shineSpeed;
      },
      set: function set(value) {
        if (shineSpeed === value) {
          return;
        }
        shineSpeed = value;
        if (shineSpeed === null || shineSpeed === false) {
          if (gameObject._shine) {
            fxFactory.remove(gameObject._shine);
            gameObject._shine = undefined;
          }
        } else {
          if (!gameObject._shine) {
            gameObject._shine = fxFactory.addShine(shineSpeed, shineLineWidth, shineGradient);
          }
          gameObject._shine.speed = shineSpeed;
        }
      }
    });
    Object.defineProperty(gameObject, 'shineLineWidth', {
      get: function get() {
        return shineLineWidth;
      },
      set: function set(value) {
        if (shineLineWidth === value) {
          return;
        }
        shineLineWidth = value;
        if (gameObject._shine) {
          gameObject._shine.lineWidth = shineLineWidth;
        }
      }
    });
    Object.defineProperty(gameObject, 'shineGradient', {
      get: function get() {
        return shineGradient;
      },
      set: function set(value) {
        if (shineGradient === value) {
          return;
        }
        shineGradient = value;
        if (gameObject._shine) {
          gameObject._shine.gradient = shineGradient;
        }
      }
    });
    gameObject.shineSpeed = null;
    AddClearEffectCallback(gameObject, 'shineSpeed');
    return gameObject;
  };

  var AddTechnicolorProperties = function AddTechnicolorProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'technicolor');
    return gameObject;
  };

  var AddTiltShiftProperties = function AddTiltShiftProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'tiltShiftRadius')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var tiltShiftRadius,
      tiltShiftAmount = 1,
      tiltShiftContrast = 0.2,
      tiltShiftBlurX = 1,
      tiltShiftBlurY = 1,
      tiltShiftStrength = 1;
    Object.defineProperty(gameObject, 'tiltShiftRadius', {
      get: function get() {
        return tiltShiftRadius;
      },
      set: function set(value) {
        if (tiltShiftRadius === value) {
          return;
        }
        tiltShiftRadius = value;
        if (tiltShiftRadius === null || tiltShiftRadius === false) {
          if (gameObject._tiltShift) {
            fxFactory.remove(gameObject._tiltShift);
            gameObject._tiltShift = undefined;
          }
        } else {
          if (!gameObject._tiltShift) {
            gameObject._tiltShift = fxFactory.addTiltShift(tiltShiftRadius, tiltShiftAmount, tiltShiftContrast, tiltShiftBlurX, tiltShiftBlurY, tiltShiftStrength);
          }
          gameObject._tiltShift.radius = tiltShiftRadius;
        }
      }
    });
    Object.defineProperty(gameObject, 'tiltShiftAmount', {
      get: function get() {
        return tiltShiftAmount;
      },
      set: function set(value) {
        if (tiltShiftAmount === value) {
          return;
        }
        tiltShiftAmount = value;
        if (gameObject._tiltShift) {
          gameObject._tiltShift.amount = tiltShiftAmount;
        }
      }
    });
    Object.defineProperty(gameObject, 'tiltShiftContrast', {
      get: function get() {
        return tiltShiftContrast;
      },
      set: function set(value) {
        if (tiltShiftContrast === value) {
          return;
        }
        tiltShiftContrast = value;
        if (gameObject._tiltShift) {
          gameObject._tiltShift.contrast = tiltShiftContrast;
        }
      }
    });
    Object.defineProperty(gameObject, 'tiltShiftBlurX', {
      get: function get() {
        return tiltShiftBlurX;
      },
      set: function set(value) {
        if (tiltShiftBlurX === value) {
          return;
        }
        tiltShiftBlurX = value;
        if (gameObject._tiltShift) {
          gameObject._tiltShift.blurX = tiltShiftBlurX;
        }
      }
    });
    Object.defineProperty(gameObject, 'tiltShiftBlurY', {
      get: function get() {
        return tiltShiftBlurY;
      },
      set: function set(value) {
        if (tiltShiftBlurY === value) {
          return;
        }
        tiltShiftBlurY = value;
        if (gameObject._tiltShift) {
          gameObject._tiltShift.blurY = tiltShiftBlurY;
        }
      }
    });
    Object.defineProperty(gameObject, 'tiltShiftStrength', {
      get: function get() {
        return tiltShiftStrength;
      },
      set: function set(value) {
        if (tiltShiftStrength === value) {
          return;
        }
        tiltShiftStrength = value;
        if (gameObject._tiltShift) {
          gameObject._tiltShift.strength = tiltShiftStrength;
        }
      }
    });
    gameObject.tiltShiftRadius = null;
    AddClearEffectCallback(gameObject, 'tiltShiftRadius');
    return gameObject;
  };

  var AddVignetteProperties = function AddVignetteProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'vignetteColor')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var vignetteRadius,
      vignetteX = 0.5,
      vignetteY = 0.5,
      vignetteStrength = 0.5;
    Object.defineProperty(gameObject, 'vignetteRadius', {
      get: function get() {
        return vignetteRadius;
      },
      set: function set(value) {
        if (vignetteRadius === value) {
          return;
        }
        vignetteRadius = value;
        if (vignetteRadius === null || vignetteRadius === false) {
          if (gameObject._vignette) {
            fxFactory.remove(gameObject._vignette);
            gameObject._vignette = undefined;
          }
        } else {
          if (!gameObject._vignette) {
            gameObject._vignette = fxFactory.addVignette(vignetteX, vignetteY, vignetteRadius, vignetteStrength);
          }
          gameObject._vignette.radius = vignetteRadius;
        }
      }
    });
    Object.defineProperty(gameObject, 'vignetteX', {
      get: function get() {
        return vignetteX;
      },
      set: function set(value) {
        if (vignetteX === value) {
          return;
        }
        vignetteX = value;
        if (gameObject._vignette) {
          gameObject._vignette.x = vignetteX;
        }
      }
    });
    Object.defineProperty(gameObject, 'vignetteY', {
      get: function get() {
        return vignetteY;
      },
      set: function set(value) {
        if (vignetteY === value) {
          return;
        }
        vignetteY = value;
        if (gameObject._vignette) {
          gameObject._vignette.y = vignetteY;
        }
      }
    });
    Object.defineProperty(gameObject, 'vignetteStrength', {
      get: function get() {
        return vignetteStrength;
      },
      set: function set(value) {
        if (vignetteStrength === value) {
          return;
        }
        vignetteStrength = value;
        if (gameObject._vignette) {
          gameObject._vignette.strength = vignetteStrength;
        }
      }
    });
    gameObject.vignetteRadius = null;
    AddClearEffectCallback(gameObject, 'vignetteRadius');
    return gameObject;
  };

  var AddVintagePinholeProperties = function AddVintagePinholeProperties(gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'vintagePinhole');
    return gameObject;
  };

  var AddWipeProperties = function AddWipeProperties(gameObject) {
    // Don't attach properties again
    if (HasProperty(gameObject, 'wipeLeft')) {
      return gameObject;
    }
    var fxFactory = GetFXFactory(gameObject);
    if (!fxFactory) {
      return gameObject;
    }
    var wipeLeft,
      wipeRight,
      wipeUp,
      wipeDown,
      wipeWidth = 0.1;
    var ClearWipeFlags = function ClearWipeFlags() {
      wipeLeft = null;
      wipeRight = null;
      wipeUp = null;
      wipeDown = null;
    };
    var RemoveEffect = function RemoveEffect(gameObject) {
      if (gameObject._wipeEffect) {
        fxFactory.remove(gameObject._wipeEffect);
        gameObject._wipeEffect = undefined;
      }
    };
    Object.defineProperty(gameObject, 'wipeLeft', {
      get: function get() {
        return wipeLeft;
      },
      set: function set(value) {
        if (wipeLeft === value) {
          return;
        }
        ClearWipeFlags();
        wipeLeft = value;
        if (wipeLeft === null || wipeLeft === false) {
          RemoveEffect(gameObject);
        } else {
          if (!gameObject._wipeEffect) {
            gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
          }
          gameObject._wipeEffect.direction = 1;
          gameObject._wipeEffect.axis = 0;
          gameObject._wipeEffect.progress = wipeLeft;
        }
      }
    });
    Object.defineProperty(gameObject, 'wipeRight', {
      get: function get() {
        return wipeRight;
      },
      set: function set(value) {
        if (wipeRight === value) {
          return;
        }
        ClearWipeFlags();
        wipeRight = value;
        if (wipeRight === null || wipeRight === false) {
          RemoveEffect(gameObject);
        } else {
          if (!gameObject._wipeEffect) {
            gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
          }
          gameObject._wipeEffect.direction = 0;
          gameObject._wipeEffect.axis = 0;
          gameObject._wipeEffect.progress = wipeRight;
        }
      }
    });
    Object.defineProperty(gameObject, 'wipeUp', {
      get: function get() {
        return wipeUp;
      },
      set: function set(value) {
        if (wipeUp === value) {
          return;
        }
        ClearWipeFlags();
        wipeUp = value;
        if (wipeUp === null || wipeUp === false) {
          RemoveEffect(gameObject);
        } else {
          if (!gameObject._wipeEffect) {
            gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
          }
          gameObject._wipeEffect.direction = 1;
          gameObject._wipeEffect.axis = 1;
          gameObject._wipeEffect.progress = wipeUp;
        }
      }
    });
    Object.defineProperty(gameObject, 'wipeDown', {
      get: function get() {
        return wipeDown;
      },
      set: function set(value) {
        if (wipeDown === value) {
          return;
        }
        ClearWipeFlags();
        wipeDown = value;
        if (wipeDown === null || wipeDown === false) {
          RemoveEffect(gameObject);
        } else {
          if (!gameObject._wipeEffect) {
            gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
          }
          gameObject._wipeEffect.direction = 0;
          gameObject._wipeEffect.axis = 1;
          gameObject._wipeEffect.progress = wipeDown;
        }
      }
    });
    Object.defineProperty(gameObject, 'wipeWidth', {
      get: function get() {
        return wipeWidth;
      },
      set: function set(value) {
        if (wipeWidth === value) {
          return;
        }
        wipeWidth = value;
        if (gameObject._wipeEffect) {
          gameObject._wipeEffect.wipeWidth = wipeWidth;
        }
      }
    });
    gameObject.wipeLeft = null;
    AddClearEffectCallback(gameObject, 'wipeLeft');
    AddClearEffectCallback(gameObject, 'wipeRight');
    AddClearEffectCallback(gameObject, 'wipeUp');
    AddClearEffectCallback(gameObject, 'wipeDown');
    return gameObject;
  };

  var EffectMap = {
    barrel: AddBarrelProperties,
    blackWhite: AddBlackWhiteProperties,
    bloom: AddBloomProperties,
    blur: AddBlurProperties,
    bokeh: AddBokehProperties,
    brightness: AddBrightnessProperties,
    brown: AddBrownProperties,
    circle: AddCircleProperties,
    contrast: AddContrastProperties,
    desaturate: AddDesaturateProperties,
    desaturateLuminance: AddDesaturateLuminanceProperties,
    displacement: AddDisplacementProperties,
    glow: AddGlowProperties,
    gradient: AddGradientProperties,
    grayscale: AddGrayscaleProperties,
    hue: AddHueProperties,
    kodachrome: AddKodachromeProperties,
    lsd: AddLSDProperties,
    negative: AddNegativeProperties,
    pixelate: AddPixelateProperties,
    polaroid: AddPolaroidProperties,
    reveal: AddRevealProperties,
    saturate: AddSaturateProperties,
    sepia: AddSepiaProperties,
    shadow: AddShadowProperties,
    shiftToBGR: AddShiftToBGRProperties,
    shine: AddShineProperties,
    technicolor: AddTechnicolorProperties,
    tiltShift: AddTiltShiftProperties,
    vignette: AddVignetteProperties,
    vintagePinhole: AddVintagePinholeProperties,
    wipe: AddWipeProperties
  };

  var AddEffectProperties = function AddEffectProperties(gameObject, config) {
    if (config === undefined) {
      config = true;
    } else if (typeof config === 'string') {
      config = {
        config: true
      };
    } else if (Array.isArray(config)) {
      var nameList = config;
      var config = {};
      for (var i = 0, cnt = nameList.length; i < cnt; i++) {
        config[nameList[i]] = true;
      }
    }
    if (config === true) {
      // Enable all effect properties
      for (var name in EffectMap) {
        EffectMap[name](gameObject);
      }
    } else {
      for (var name in config) {
        if (config[name] && EffectMap[name]) {
          EffectMap[name](gameObject);
        }
      }
    }
    return gameObject;
  };

  var RemoveItem$4 = Phaser.Utils.Array.Remove;
  var AddMethods = {
    addGO: function addGO(name, gameObject) {
      this.remove(name, true);
      if (this.useTintFadeEffect(gameObject)) {
        AddTintRGBProperties(gameObject);
      }
      if (this.viewportCoordinateEnable) {
        AddViewportCoordinateProperties(gameObject, this.viewport);
      }
      if (this.effectPropertiesConfig) {
        AddEffectProperties(gameObject, this.effectPropertiesConfig);
      }
      gameObject.once('destroy', function () {
        RemoveItem$4(this.removedGOs, gameObject);
        if (this.isEmpty) {
          this.emit('empty');
        }
      }, this);
      var bob = new this.BobClass(this, gameObject, name);
      this.bobs[name] = bob;
      return this;
    },
    add: function add(name) {
      var callback = this.createGameObjectCallback;
      var scope = this.createGameObjectScope;
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var gameObject = callback.call.apply(callback, [scope, this.scene].concat(args));
      this.addGO(name, gameObject);
      if (this.gameObjectDepth != null) {
        // Not undefined, null
        gameObject.setDepth(this.gameObjectDepth);
      }
      var bob = this.get(name);
      this.fadeBob(bob, 0, 1);
      return this;
    }
  };

  var RemoveMethods = {
    remove: function remove(name, ignoreFade) {
      if (!this.has(name)) {
        return this;
      }
      var bob = this.get(name);
      delete this.bobs[name];
      this.removedGOs.push(bob.gameObject);
      if (!ignoreFade) {
        this.fadeBob(bob,
        // bob
        undefined,
        // fromValue
        0,
        // toValue
        function () {
          // onComplete
          bob.destroy();
        });
      } else {
        bob.destroy();
      }
      return this;
    },
    removeAll: function removeAll() {
      var bobs = this.bobs;
      for (var name in bobs) {
        this.remove(name);
      }
      return this;
    },
    clear: function clear(destroyChild) {
      if (destroyChild === undefined) {
        destroyChild = true;
      }
      var bobs = this.bobs;
      for (var name in bobs) {
        if (destroyChild) {
          bobs[name].destroy();
        }
        delete bobs[name];
      }
      this.removedGOs.length = 0;
      return this;
    }
  };

  var PropertyMethods = {
    hasProperty: function hasProperty(name, property) {
      if (!this.has(name)) {
        return false;
      }
      return this.get(name).hasProperty(property);
    },
    getProperty: function getProperty(name, property) {
      if (!this.has(name)) {
        return undefined;
      }
      return this.get(name).getProperty(property);
    },
    isNumberProperty: function isNumberProperty(name, property) {
      var value = this.getProperty(name, property);
      return typeof value === 'number';
    },
    setProperty: function setProperty(name, property, value) {
      if (!this.has(name)) {
        return this;
      }
      if (this.symbols && typeof value === 'string' && this.isNumberProperty(name, property)) {
        if (value in this.symbols) {
          value = this.symbols[value];
        } else {
          console.warn("Can't find symbol ".concat(value));
        }
      }
      this.get(name).setProperty(property, value);
      return this;
    },
    easeProperty: function easeProperty(name, property, value, duration, ease, repeat, isYoyo, onComplete) {
      if (!this.has(name)) {
        return this;
      }
      if (duration === undefined) {
        duration = 1000;
      }
      if (ease === undefined) {
        ease = 'Linear';
      }
      if (repeat === undefined) {
        repeat = 0;
      }
      if (isYoyo === undefined) {
        isYoyo = false;
      }
      if (this.symbols && typeof value === 'string' && this.isNumberProperty(name, property)) {
        if (value in this.symbols) {
          value = this.symbols[value];
        } else {
          console.warn("Can't find symbol ".concat(value));
        }
      }
      this.get(name).easeProperty(property, value, duration, ease, repeat, isYoyo, onComplete);
      return this;
    },
    hasTweenTask: function hasTweenTask(name, property) {
      if (!this.has(name)) {
        return false;
      }
      var tweenTasks = this.get(name).tweens;
      return tweenTasks.hasOwnProperty(property);
    },
    getTweenTask: function getTweenTask(name, property) {
      if (!this.has(name)) {
        return null;
      }
      var tweenTasks = this.get(name).tweens;
      var tweenTask = tweenTasks[property];
      return tweenTask ? tweenTask : null;
    }
  };

  var CallMethods = {
    hasMethod: function hasMethod(name, methodName) {
      if (!this.has(name)) {
        return false;
      }
      return this.get(name).hasMethod(methodName);
    },
    call: function call(name, methodName) {
      var _this$get;
      if (!this.has(name)) {
        return this;
      }
      for (var _len = arguments.length, parameters = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        parameters[_key - 2] = arguments[_key];
      }
      (_this$get = this.get(name)).call.apply(_this$get, [methodName].concat(parameters));
      return this;
    }
  };

  var DataMethods$1 = {
    hasData: function hasData(name, dataKey) {
      if (!this.has(name)) {
        return false;
      }
      return this.get(name).hasData(dataKey);
    },
    getData: function getData(name, dataKey) {
      if (!this.has(name)) {
        return undefined;
      }
      return this.get(name).getData(dataKey);
    },
    setData: function setData(name, dataKey, value) {
      if (!this.has(name)) {
        return this;
      }
      this.get(name).setData(dataKey, value);
      return this;
    }
  };

  var FadeTint = 0;
  var FadeAlpha = 1;
  var FadeRevealUp = 2;
  var FadeRevealDown = 3;
  var FadeRevealLeft = 4;
  var FadeRevealRight = 5;
  var FadeMode = {
    tint: FadeTint,
    alpha: FadeAlpha,
    revealUp: FadeRevealUp,
    revealDown: FadeRevealDown,
    revealLeft: FadeRevealLeft,
    revealRight: FadeRevealRight
  };
  var FadeMethods = {
    setGOFadeMode: function setGOFadeMode(fadeMode) {
      if (typeof fadeMode === 'string') {
        fadeMode = FadeMode[fadeMode];
      }
      this.fadeMode = fadeMode;
      return this;
    },
    setGOFadeTime: function setGOFadeTime(time) {
      this.fadeTime = time;
      return this;
    },
    useTintFadeEffect: function useTintFadeEffect(gameObject) {
      return (this.fadeMode === undefined || this.fadeMode === FadeTint) && this.fadeTime > 0 && gameObject.setTint !== undefined;
    },
    useAlphaFadeEffect: function useAlphaFadeEffect(gameObject) {
      return (this.fadeMode === undefined || this.fadeMode === FadeAlpha) && this.fadeTime > 0 && gameObject.setAlpha !== undefined;
    },
    useRevealEffect: function useRevealEffect(gameObject) {
      return this.fadeMode >= FadeRevealUp && this.fadeMode <= FadeRevealRight && this.fadeTime > 0 && (gameObject.preFX || gameObject.postFX);
    },
    fadeBob: function fadeBob(bob, fromValue, toValue, onComplete) {
      var gameObject = bob.gameObject;
      if (this.useTintFadeEffect(gameObject)) {
        if (fromValue !== undefined) {
          bob.setProperty('tintGray', 255 * fromValue);
        }
        bob.easeProperty('tintGray',
        // property
        Math.floor(255 * toValue),
        // to value
        this.fadeTime,
        // duration
        'Linear',
        // ease
        0,
        // repeat
        false,
        // yoyo
        onComplete // onComplete
        );
      } else if (this.useAlphaFadeEffect(gameObject)) {
        if (fromValue !== undefined) {
          bob.setProperty('alpha', fromValue);
        }
        bob.easeProperty('alpha',
        // property
        toValue,
        // to value
        this.fadeTime,
        // duration
        'Linear',
        // ease
        0,
        // repeat
        false,
        // yoyo
        onComplete // onComplete
        );
      } else if (this.useRevealEffect(gameObject)) {
        AddEffectProperties(gameObject, 'reveal');
        var propertyName;
        switch (this.fadeMode) {
          case FadeRevealUp:
            propertyName = 'revealUp';
            break;
          case FadeRevealDown:
            propertyName = 'revealDown';
            break;
          case FadeRevealLeft:
            propertyName = 'revealLeft';
            break;
          case FadeRevealRight:
            propertyName = 'revealRight';
            break;
        }
        if (fromValue === undefined) {
          fromValue = 0;
        }
        gameObject[propertyName] = fromValue;
        bob.easeProperty(propertyName,
        // property
        toValue,
        // to value
        this.fadeTime,
        // duration
        'Linear',
        // ease
        0,
        // repeat
        false,
        // yoyo
        onComplete // onComplete
        );
        bob.getTweenTask(propertyName).once('complete', function () {
          gameObject[propertyName] = null;
        });
      } else {
        if (onComplete) {
          onComplete(gameObject);
        }
      }
      return this;
    }
  };

  var GetDisplayWidth = function GetDisplayWidth(gameObject) {
    if (gameObject.displayWidth !== undefined) {
      return gameObject.displayWidth;
    } else {
      return gameObject.width;
    }
  };
  var GetDisplayHeight = function GetDisplayHeight(gameObject) {
    if (gameObject.displayHeight !== undefined) {
      return gameObject.displayHeight;
    } else {
      return gameObject.height;
    }
  };

  Phaser.Geom.Rectangle;
  var Vector2 = Phaser.Math.Vector2;
  var RotateAround$2 = Phaser.Math.RotateAround;
  var GetTopLeft = function GetTopLeft(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getTopLeft) {
      return gameObject.getTopLeft(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX;
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY;
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GetTopRight = function GetTopRight(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getTopRight) {
      return gameObject.getTopRight(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX + GetDisplayWidth(gameObject);
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY;
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GetBottomLeft = function GetBottomLeft(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getBottomLeft) {
      return gameObject.getBottomLeft(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX;
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY + GetDisplayHeight(gameObject);
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GetBottomRight = function GetBottomRight(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getBottomRight) {
      return gameObject.getBottomRight(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX + GetDisplayWidth(gameObject);
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY + GetDisplayHeight(gameObject);
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GlobVector = undefined;
  var PrepareBoundsOutput = function PrepareBoundsOutput(gameObject, output, includeParent) {
    if (includeParent === undefined) {
      includeParent = false;
    }
    if (gameObject.rotation !== 0) {
      RotateAround$2(output, gameObject.x, gameObject.y, gameObject.rotation);
    }
    if (includeParent && gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      parentMatrix.transformPoint(output.x, output.y, output);
    }
    return output;
  };

  var GetValue$v = Phaser.Utils.Objects.GetValue;
  var DrawBounds = function DrawBounds(gameObjects, graphics, config) {
    var strokeColor, lineWidth, fillColor, fillAlpha, padding;
    if (typeof config === 'number') {
      strokeColor = config;
    } else {
      strokeColor = GetValue$v(config, 'color');
      lineWidth = GetValue$v(config, 'lineWidth');
      fillColor = GetValue$v(config, 'fillColor');
      fillAlpha = GetValue$v(config, 'fillAlpha', 1);
      padding = GetValue$v(config, 'padding', 0);
    }
    if (Array.isArray(gameObjects)) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Draw(gameObjects[i], graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding);
      }
    } else {
      Draw(gameObjects, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding);
    }
  };
  var Draw = function Draw(gameObject, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding) {
    var canDrawBound = gameObject.getBounds || gameObject.width !== undefined && gameObject.height !== undefined;
    if (!canDrawBound) {
      return;
    }
    if (strokeColor === undefined) {
      strokeColor = 0xffffff;
    }
    if (lineWidth === undefined) {
      lineWidth = 1;
    }
    if (fillColor === undefined) {
      fillColor = null;
    }
    if (fillAlpha === undefined) {
      fillAlpha = 1;
    }
    if (padding === undefined) {
      padding = 0;
    }
    var p0 = GetTopLeft(gameObject, Points[0]);
    p0.x -= padding;
    p0.y -= padding;
    var p1 = GetTopRight(gameObject, Points[1]);
    p1.x += padding;
    p1.y -= padding;
    var p2 = GetBottomRight(gameObject, Points[2]);
    p2.x += padding;
    p2.y += padding;
    var p3 = GetBottomLeft(gameObject, Points[3]);
    p3.x -= padding;
    p3.y += padding;
    if (fillColor !== null) {
      graphics.fillStyle(fillColor, fillAlpha).fillPoints(Points, true, true);
    }
    if (strokeColor !== null) {
      graphics.lineStyle(lineWidth, strokeColor).strokePoints(Points, true, true);
    }
  };
  var Points = [{
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 0
  }];

  var DrawGameObjectsBounds = function DrawGameObjectsBounds(graphics, config) {
    this.forEachGO(function (gameObject) {
      if (gameObject.drawBounds) {
        gameObject.drawBounds(graphics, config);
      } else {
        DrawBounds(gameObject, graphics, config);
      }
    });
    return this;
  };

  var Methods$7 = {
    drawGameObjectsBounds: DrawGameObjectsBounds
  };
  Object.assign(Methods$7, GetMethods, AddMethods, RemoveMethods, PropertyMethods, CallMethods, DataMethods$1, FadeMethods);

  var CameraClass = Phaser.Cameras.Scene2D.BaseCamera;
  var IsCameraObject = function IsCameraObject(object) {
    return object instanceof CameraClass;
  };

  var Rectangle$1 = Phaser.Geom.Rectangle;
  var GetViewport = function GetViewport(scene, camera, out) {
    if (!IsCameraObject(camera)) {
      out = camera;
      camera = undefined;
    }
    if (out === undefined) {
      out = new Rectangle$1();
    } else if (out === true) {
      out = globRect;
    }
    if (camera) {
      return scene.scale.getViewPort(camera, out);
    } else {
      return scene.scale.getViewPort(out);
    }
  };
  var globRect = new Rectangle$1();

  var GetValue$u = Phaser.Utils.Objects.GetValue;
  var GOManager = /*#__PURE__*/function () {
    function GOManager(scene, config) {
      _classCallCheck(this, GOManager);
      this.scene = scene;
      this.BobClass = GetValue$u(config, 'BobClass', BobBase);
      this.setCreateGameObjectCallback(GetValue$u(config, 'createGameObject'), GetValue$u(config, 'createGameObjectScope'));
      this.setEventEmitter(GetValue$u(config, 'eventEmitter', undefined));
      this.setGameObjectDepth(GetValue$u(config, 'depth', undefined));
      var fadeConfig = GetValue$u(config, 'fade', 500);
      if (typeof fadeConfig === 'number') {
        this.setGOFadeMode();
        this.setGOFadeTime(fadeConfig);
      } else {
        this.setGOFadeMode(GetValue$u(fadeConfig, 'mode'));
        this.setGOFadeTime(GetValue$u(fadeConfig, 'time', 500));
      }
      var viewportCoordinateConfig = GetValue$u(config, 'viewportCoordinate', false);
      if (viewportCoordinateConfig !== false) {
        this.setViewportCoordinateEnable(GetValue$u(config, 'enable', true));
        this.setViewport(GetValue$u(viewportCoordinateConfig, 'viewport'));
      } else {
        this.setViewportCoordinateEnable(false);
      }
      var effectPropertiesConfig = GetValue$u(config, 'effectProperties', false);
      this.setEffectPropertiesConfig(effectPropertiesConfig);
      this.setSymbols(GetValue$u(config, 'symbols'));
      this.bobs = {};
      this.removedGOs = [];
      this._timeScale = 1;
    }
    _createClass(GOManager, [{
      key: "destroy",
      value: function destroy(fromScene) {
        this.clear(!fromScene);
        this.createGameObjectCallback = undefined;
        this.viewport = undefined;
        this.scene = undefined;
      }
    }, {
      key: "timeScale",
      get: function get() {
        return this._timeScale;
      },
      set: function set(timeScale) {
        if (this._timeScale === timeScale) {
          return;
        }
        this._timeScale = timeScale;
        var bobs = this.bobs;
        for (var name in bobs) {
          bobs[name].setTimeScale(timeScale);
        }
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "setCreateGameObjectCallback",
      value: function setCreateGameObjectCallback(callback, scope) {
        this.createGameObjectCallback = callback;
        this.createGameObjectScope = scope;
        return this;
      }
    }, {
      key: "setGameObjectDepth",
      value: function setGameObjectDepth(depth) {
        this.gameObjectDepth = depth;
        return this;
      }
    }, {
      key: "setViewportCoordinateEnable",
      value: function setViewportCoordinateEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.viewportCoordinateEnable = enable;
        return this;
      }
    }, {
      key: "setEffectPropertiesConfig",
      value: function setEffectPropertiesConfig(config) {
        if (config === undefined) {
          config = true;
        }
        this.effectPropertiesConfig = config;
        return this;
      }
    }, {
      key: "setViewport",
      value: function setViewport(viewport) {
        if (viewport === undefined) {
          viewport = GetViewport(this.scene, this.scene.cameras.main);
        }
        this.viewport = viewport;
        return this;
      }
    }, {
      key: "setSymbols",
      value: function setSymbols(symbols) {
        this.symbols = symbols;
        return this;
      }
    }, {
      key: "isEmpty",
      get: function get() {
        return IsEmpty(this.bobs) && this.removedGOs.length === 0;
      }
    }]);
    return GOManager;
  }();
  Object.assign(GOManager.prototype, EventEmitterMethods$1, Methods$7);

  var SortGameObjectsByDepth = function SortGameObjectsByDepth(gameObjects, descending) {
    if (gameObjects.length <= 1) {
      return gameObjects;
    }
    if (descending === undefined) {
      descending = false;
    }
    var itemList;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var gameObject = gameObjects[i];
      if (gameObject.displayList) {
        // Inside a scene or a layer
        itemList = gameObject.displayList; // displayList
      } else if (gameObject.parentContainer) {
        // Inside a container
        itemList = gameObject.parentContainer.list; // array
      }
      if (itemList) {
        break;
      }
    }
    if (!itemList) {
      itemList = gameObject.scene.sys.displayList; // displayList
      // ??
    }
    if (itemList.depthSort) {
      // Is a displayList object
      itemList.depthSort();
      itemList = itemList.list;
      // itemList is an array now
    }

    // itemList is an array
    if (descending) {
      gameObjects.sort(function (childA, childB) {
        return itemList.indexOf(childB) - itemList.indexOf(childA);
      });
    } else {
      gameObjects.sort(function (childA, childB) {
        return itemList.indexOf(childA) - itemList.indexOf(childB);
      });
    }
    return gameObjects;
  };

  var GetValue$t = Phaser.Utils.Objects.GetValue;
  var LayerManager = /*#__PURE__*/function (_GOManager) {
    _inherits(LayerManager, _GOManager);
    function LayerManager(scene, config) {
      var _this;
      _classCallCheck(this, LayerManager);
      if (config === undefined) {
        config = {};
      } else if (Array.isArray(config)) {
        config = {
          layers: config
        };
      }
      if (!config.hasOwnProperty('fade')) {
        config.fade = 0;
      }
      config.viewportCoordinate = false;
      _this = _callSuper(this, LayerManager, [scene, config]);
      var rootLayer = GetValue$t(config, 'rootLayer');
      _this.setRootLayer(rootLayer);
      var initLayers = GetValue$t(config, 'layers');
      if (initLayers) {
        for (var i = 0, cnt = initLayers.length; i < cnt; i++) {
          _this.add(initLayers[i]);
        }
      }
      return _this;
    }
    _createClass(LayerManager, [{
      key: "setCreateGameObjectCallback",
      value: function setCreateGameObjectCallback(callback, scope) {
        if (!callback) {
          callback = CreateLayer;
        }
        _get(_getPrototypeOf(LayerManager.prototype), "setCreateGameObjectCallback", this).call(this, callback, scope);
        return this;
      }
    }, {
      key: "setRootLayer",
      value: function setRootLayer(rootLayer) {
        if (rootLayer === this.rootLayer) {
          return this;
        }
        var currentLayers = this.getAllGO();
        if (rootLayer) {
          rootLayer.add(currentLayers);
        } else {
          this.scene.displayList.add(currentLayers);
        }
        this.rootLayer = rootLayer;
        return this;
      }

      // Override
    }, {
      key: "addGO",
      value: function addGO(name, gameObject) {
        _get(_getPrototypeOf(LayerManager.prototype), "addGO", this).call(this, name, gameObject);
        gameObject.name = name;
        if (this.rootLayer) {
          this.rootLayer.add(gameObject);
        }
        return this;
      }

      // New methods
    }, {
      key: "getLayer",
      value: function getLayer(name) {
        return this.getGO(name);
      }
    }, {
      key: "getLayers",
      value: function getLayers(out) {
        if (out === undefined) {
          out = [];
        }
        this.forEachGO(function (gameObject) {
          out.push(gameObject);
        });
        SortGameObjectsByDepth(out, false);
        return out;
      }
    }, {
      key: "addToLayer",
      value: function addToLayer(name, gameObject) {
        var layer = this.getGO(name);
        if (!layer) {
          console.warn("[LayerManager] Can't get layer \"".concat(name, "\""));
          return;
        }
        if (gameObject.isRexContainerLite) {
          gameObject.addToLayer(layer);
        } else {
          layer.add(gameObject);
        }
        return this;
      }
    }, {
      key: "removeFromLayer",
      value: function removeFromLayer(name, gameObject, addToScene) {
        var layer = this.getGO(name);
        if (!layer) {
          console.warn("[LayerManager] Can't get layer \"".concat(name, "\""));
          return;
        }
        if (addToScene === undefined) {
          addToScene = true;
        }
        if (gameObject.isRexContainerLite) {
          gameObject.removeFromLayer(layer, addToScene);
        } else {
          layer.remove(gameObject);
          if (addToScene) {
            gameObject.addToDisplayList();
          }
        }
        return this;
      }
    }, {
      key: "clearLayer",
      value: function clearLayer(name, destroyChildren) {
        if (destroyChildren === undefined) {
          destroyChildren = true;
        }
        var layer = this.getGO(name);
        if (!layer) {
          console.warn("Can't get layer \"".concat(name, "\""));
          return;
        }
        if (destroyChildren) {
          var children = layer.getAll();
          for (var i = 0, cnt = children.length; i < cnt; i++) {
            children.destroy();
          }
        } else {
          layer.removeAll();
        }
        return this;
      }
    }]);
    return LayerManager;
  }(GOManager);
  var CreateLayer = function CreateLayer(scene, depth) {
    var layer = scene.add.layer();
    if (depth !== undefined) {
      layer.setDepth(depth);
    }
    return layer;
  };

  var SceneClass = Phaser.Scene;
  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
  };

  var GetSoundManager = function GetSoundManager(game) {
    if (IsSceneObject(game)) {
      return game.sys.sound;
    }
    return game.sound;
  };

  var HasaAudio = function HasaAudio(key) {
    return this.sound.game.cache.audio.has(key);
  };

  var GetSceneObject = function GetSceneObject(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsSceneObject(object)) {
      // object = scene
      return object;
    } else if (object.scene && IsSceneObject(object.scene)) {
      // object = game object
      return object.scene;
    } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) {
      // parent = bob object
      return object.parent.scene;
    } else {
      return null;
    }
  };

  var GameClass = Phaser.Game;
  var IsGame = function IsGame(object) {
    return object instanceof GameClass;
  };

  var GetGame = function GetGame(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsGame(object)) {
      return object;
    } else if (IsGame(object.game)) {
      return object.game;
    } else if (IsSceneObject(object)) {
      // object = scene object
      return object.sys.game;
    } else if (IsSceneObject(object.scene)) {
      // object = game object
      return object.scene.sys.game;
    }
  };

  var GetValue$s = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$s(config, 'eventEmitter', true));

      // Register callback of parent destroy event, also see `shutdown` method
      if (this.parent) {
        if (this.parent === this.scene) {
          // parent is a scene
          this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);
        } else if (this.parent === this.game) {
          // parent is game
          this.game.events.once('shutdown', this.onEnvDestroy, this);
        } else if (this.parent.once) {
          // parent is game object or something else
          this.parent.once('destroy', this.onParentDestroy, this);
        }

        // bob object does not have event emitter
      }
    }
    _createClass(ComponentBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // parent might not be shutdown yet
        if (this.parent) {
          if (this.parent === this.scene) {
            // parent is a scene
            this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);
          } else if (this.parent === this.game) {
            // parent is game
            this.game.events.off('shutdown', this.onEnvDestroy, this);
          } else if (this.parent.once) {
            // parent is game object or something else
            this.parent.off('destroy', this.onParentDestroy, this);
          }

          // bob object does not have event emitter
        }
        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        this.game = undefined;
        this.isShutdown = true;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onEnvDestroy",
      value: function onEnvDestroy() {
        this.destroy(true);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }, {
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent; // gameObject, scene, or game

        this.scene = GetSceneObject(parent);
        this.game = GetGame(parent);
        return this;
      }
    }]);
    return ComponentBase;
  }();
  Object.assign(ComponentBase.prototype, EventEmitterMethods$1);

  var GetValue$r = Phaser.Utils.Objects.GetValue;
  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);
    function TickTask(parent, config) {
      var _this;
      _classCallCheck(this, TickTask);
      _this = _callSuper(this, TickTask, [parent, config]);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;
      _this.setTickingMode(GetValue$r(config, 'tickingMode', 1));
      // boot() later
      return _this;
    }

    // override
    _createClass(TickTask, [{
      key: "boot",
      value: function boot() {
        if (this.tickingMode === 2 && !this.tickingState) {
          this.startTicking();
        }
      }

      // override
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.stop();
        if (this.tickingState) {
          this.stopTicking();
        }
        _get(_getPrototypeOf(TickTask.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setTickingMode",
      value: function setTickingMode(mode) {
        if (typeof mode === 'string') {
          mode = TICKINGMODE[mode];
        }
        this.tickingMode = mode;
      }

      // override
    }, {
      key: "startTicking",
      value: function startTicking() {
        this.tickingState = true;
      }

      // override
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        this.tickingState = false;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this._isRunning;
      },
      set: function set(value) {
        if (this._isRunning === value) {
          return;
        }
        this._isRunning = value;
        if (this.tickingMode === 1 && value != this.tickingState) {
          if (value) {
            this.startTicking();
          } else {
            this.stopTicking();
          }
        }
      }
    }, {
      key: "start",
      value: function start() {
        this.isPaused = false;
        this.isRunning = true;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        // Only can ba paused in running state
        if (this.isRunning) {
          this.isPaused = true;
          this.isRunning = false;
        }
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        // Only can ba resumed in paused state (paused from running state)
        if (this.isPaused) {
          this.isRunning = true;
        }
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.isPaused = false;
        this.isRunning = false;
        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.isPaused = false;
        this.isRunning = false;
        this.emit('complete', this.parent, this);
      }
    }]);
    return TickTask;
  }(ComponentBase);
  var TICKINGMODE = {
    'no': 0,
    'lazy': 1,
    'always': 2
  };

  var GetValue$q = Phaser.Utils.Objects.GetValue;
  var SceneUpdateTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(SceneUpdateTickTask, _TickTask);
    function SceneUpdateTickTask(parent, config) {
      var _this;
      _classCallCheck(this, SceneUpdateTickTask);
      _this = _callSuper(this, SceneUpdateTickTask, [parent, config]);

      // scene update : update, preupdate, postupdate, prerender, render
      // game update : step, poststep, 

      // If this.scene is not available, use game's 'step' event
      var defaultEventName = _this.scene ? 'update' : 'step';
      _this.tickEventName = GetValue$q(config, 'tickEventName', defaultEventName);
      _this.isSceneTicker = !IsGameUpdateEvent(_this.tickEventName);
      return _this;
    }
    _createClass(SceneUpdateTickTask, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "startTicking", this).call(this);
        if (this.isSceneTicker) {
          this.scene.sys.events.on(this.tickEventName, this.update, this);
        } else {
          this.game.events.on(this.tickEventName, this.update, this);
        }
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "stopTicking", this).call(this);
        if (this.isSceneTicker && this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off(this.tickEventName, this.update, this);
        } else if (this.game) {
          this.game.events.off(this.tickEventName, this.update, this);
        }
      }

      // update(time, delta) {
      //     
      // }
    }]);
    return SceneUpdateTickTask;
  }(TickTask);
  var IsGameUpdateEvent = function IsGameUpdateEvent(eventName) {
    return eventName === 'step' || eventName === 'poststep';
  };

  var GetValue$p = Phaser.Utils.Objects.GetValue;
  var Clamp$1 = Phaser.Math.Clamp;
  var Timer$1 = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);
      this.resetFromJSON(config);
    }
    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$p(o, 'state', IDLE);
        this.timeScale = GetValue$p(o, 'timeScale', 1);
        this.delay = GetValue$p(o, 'delay', 0);
        this.repeat = GetValue$p(o, 'repeat', 0);
        this.repeatCounter = GetValue$p(o, 'repeatCounter', 0);
        this.repeatDelay = GetValue$p(o, 'repeatDelay', 0);
        this.duration = GetValue$p(o, 'duration', 0);
        this.nowTime = GetValue$p(o, 'nowTime', 0);
        this.justRestart = GetValue$p(o, 'justRestart', false);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          state: this.state,
          timeScale: this.timeScale,
          delay: this.delay,
          repeat: this.repeat,
          repeatCounter: this.repeatCounter,
          repeatDelay: this.repeatDelay,
          duration: this.duration,
          nowTime: this.nowTime,
          justRestart: this.justRestart
        };
      }
    }, {
      key: "destroy",
      value: function destroy() {}
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(delay) {
        if (delay === undefined) {
          delay = 0;
        }
        this.delay = delay;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration) {
        this.duration = duration;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        return this;
      }
    }, {
      key: "setRepeatInfinity",
      value: function setRepeatInfinity() {
        this.repeat = -1;
        return this;
      }
    }, {
      key: "setRepeatDelay",
      value: function setRepeatDelay(repeatDelay) {
        this.repeatDelay = repeatDelay;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        this.nowTime = this.delay > 0 ? -this.delay : 0;
        this.state = this.nowTime >= 0 ? COUNTDOWN : DELAY;
        this.repeatCounter = 0;
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.state = IDLE;
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (this.state === IDLE || this.state === DONE || delta === 0 || this.timeScale === 0) {
          return;
        }
        this.nowTime += delta * this.timeScale;
        this.justRestart = false;
        if (this.nowTime >= this.duration) {
          if (this.repeat === -1 || this.repeatCounter < this.repeat) {
            this.repeatCounter++;
            this.justRestart = true;
            this.nowTime -= this.duration;
            if (this.repeatDelay > 0) {
              this.nowTime -= this.repeatDelay;
              this.state = REPEATDELAY;
            }
          } else {
            this.nowTime = this.duration;
            this.state = DONE;
          }
        } else if (this.nowTime >= 0) {
          this.state = COUNTDOWN;
        }
      }
    }, {
      key: "t",
      get: function get() {
        var t;
        switch (this.state) {
          case IDLE:
          case DELAY:
          case REPEATDELAY:
            t = 0;
            break;
          case COUNTDOWN:
            t = this.nowTime / this.duration;
            break;
          case DONE:
            t = 1;
            break;
        }
        return Clamp$1(t, 0, 1);
      },
      set: function set(value) {
        value = Clamp$1(value, -1, 1);
        if (value < 0) {
          this.state = DELAY;
          this.nowTime = -this.delay * value;
        } else {
          this.state = COUNTDOWN;
          this.nowTime = this.duration * value;
          if (value === 1 && this.repeat !== 0) {
            this.repeatCounter++;
          }
        }
      }
    }, {
      key: "setT",
      value: function setT(t) {
        this.t = t;
        return this;
      }
    }, {
      key: "isIdle",
      get: function get() {
        return this.state === IDLE;
      }
    }, {
      key: "isDelay",
      get: function get() {
        return this.state === DELAY;
      }
    }, {
      key: "isCountDown",
      get: function get() {
        return this.state === COUNTDOWN;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this.state === DELAY || this.state === COUNTDOWN;
      }
    }, {
      key: "isDone",
      get: function get() {
        return this.state === DONE;
      }
    }, {
      key: "isOddIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 1;
      }
    }, {
      key: "isEvenIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 0;
      }
    }]);
    return Timer;
  }();
  var IDLE = 0;
  var DELAY = 1;
  var COUNTDOWN = 2;
  var REPEATDELAY = 3;
  var DONE = -1;

  var TimerTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(TimerTickTask, _TickTask);
    function TimerTickTask(parent, config) {
      var _this;
      _classCallCheck(this, TimerTickTask);
      _this = _callSuper(this, TimerTickTask, [parent, config]);
      _this.timer = new Timer$1();
      // boot() later 
      return _this;
    }

    // override
    _createClass(TimerTickTask, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        _get(_getPrototypeOf(TimerTickTask.prototype), "shutdown", this).call(this, fromScene);
        this.timer.destroy();
        this.timer = undefined;
      }
    }, {
      key: "start",
      value: function start() {
        this.timer.start();
        _get(_getPrototypeOf(TimerTickTask.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.timer.stop();
        _get(_getPrototypeOf(TimerTickTask.prototype), "stop", this).call(this);
        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.timer.stop();
        _get(_getPrototypeOf(TimerTickTask.prototype), "complete", this).call(this);
        return this;
      }
    }]);
    return TimerTickTask;
  }(SceneUpdateTickTask);

  var GetValue$o = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
  var GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;
  var EaseValueTaskBase = /*#__PURE__*/function (_TimerTask) {
    _inherits(EaseValueTaskBase, _TimerTask);
    function EaseValueTaskBase() {
      _classCallCheck(this, EaseValueTaskBase);
      return _callSuper(this, EaseValueTaskBase, arguments);
    }
    _createClass(EaseValueTaskBase, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue$o(o, 'timer'));
        this.setEnable(GetValue$o(o, 'enable', true));
        this.setTarget(GetValue$o(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue$1(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$1(o, 'duration', 1000));
        this.setEase(GetValue$o(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$o(o, 'repeat', 0));
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e == undefined) {
          e = true;
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "setTarget",
      value: function setTarget(target) {
        if (target === undefined) {
          target = this.parent;
        }
        this.target = target;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(time) {
        this.delay = time;
        // Assign `this.timer.setRepeat(repeat)` manually
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(time) {
        this.duration = time;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        // Assign `this.timer.setRepeat(repeat)` manually
        return this;
      }
    }, {
      key: "setRepeatDelay",
      value: function setRepeatDelay(repeatDelay) {
        this.repeatDelay = repeatDelay;
        // Assign `this.timer.setRepeatDelay(repeatDelay)` manually
        return this;
      }
    }, {
      key: "setEase",
      value: function setEase(ease) {
        if (ease === undefined) {
          ease = 'Linear';
        }
        this.ease = ease;
        this.easeFn = GetEaseFunction(ease);
        return this;
      }

      // Override
    }, {
      key: "start",
      value: function start() {
        // Ignore start if timer is running, i.e. in DELAY, o RUN state
        if (this.timer.isRunning) {
          return this;
        }
        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "restart",
      value: function restart() {
        this.timer.stop();
        this.start.apply(this, arguments);
        return this;
      }
    }, {
      key: "stop",
      value: function stop(toEnd) {
        if (toEnd === undefined) {
          toEnd = false;
        }
        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "stop", this).call(this);
        if (toEnd) {
          this.timer.setT(1);
          this.updateGameObject(this.target, this.timer);
          this.complete();
        }
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || !this.enable || !this.parent.active) {
          return this;
        }
        var target = this.target,
          timer = this.timer;
        timer.update(time, delta);

        // isDelay, isCountDown, isDone
        if (!timer.isDelay) {
          this.updateGameObject(target, timer);
        }
        this.emit('update', target, this);
        if (timer.isDone) {
          this.complete();
        }
        return this;
      }

      // Override
    }, {
      key: "updateGameObject",
      value: function updateGameObject(target, timer) {}
    }]);
    return EaseValueTaskBase;
  }(TimerTickTask);

  var SoundObjectClass = Phaser.Sound.BaseSound;
  var IsSoundObject = function IsSoundObject(object) {
    return object instanceof SoundObjectClass;
  };

  var GetValue$n = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear = Phaser.Math.Linear;
  var Fade = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Fade, _EaseValueTaskBase);
    function Fade(scene, sound, config) {
      var _this;
      _classCallCheck(this, Fade);
      if (IsSoundObject(scene)) {
        config = sound;
        sound = scene;
        scene = undefined;
      }
      sound.active = true;
      sound.scene = scene;
      sound.game = sound.manager.game;
      _this = _callSuper(this, Fade, [sound, config]);
      // this.parent = parent
      // this.timer

      _this.volume = {};
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(Fade, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Fade.prototype), "resetFromJSON", this).call(this, o);
        this.setMode(GetValue$n(o, 'mode', 0));
        this.setEnable(GetValue$n(o, 'enable', true));
        this.setVolumeRange(GetAdvancedValue(o, 'volume.start', this.parent.volume), GetAdvancedValue(o, 'volume.end', 0));
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE[m];
        }
        this.mode = m;
        return this;
      }
    }, {
      key: "setVolumeRange",
      value: function setVolumeRange(start, end) {
        this.volume.start = start;
        this.volume.end = end;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }
        this.parent.setVolume(this.volume.start);
        this.timer.setDelay(this.delay).setDuration(this.duration);
        _get(_getPrototypeOf(Fade.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(parent, timer) {
        parent.volume = Linear(this.volume.start, this.volume.end, timer.t);
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(Fade.prototype), "complete", this).call(this);
        switch (this.mode) {
          case 1:
            this.parent.stop();
            break;
          case 2:
            this.parent.stop();
            this.parent.destroy();
            break;
        }
        return this;
      }
    }]);
    return Fade;
  }(EaseValueTaskBase);
  var MODE = {
    stop: 1,
    destroy: 2
  };

  var FadeIn = function FadeIn(scene, sound, duration, endVolume, startVolume) {
    if (IsSoundObject(scene)) {
      startVolume = endVolume;
      endVolume = duration;
      duration = sound;
      sound = scene;
      scene = undefined;
    }
    if (endVolume === undefined) {
      endVolume = 1;
    }
    if (startVolume === undefined) {
      startVolume = 0;
    }
    var config = {
      mode: 0,
      volume: {
        start: startVolume,
        end: endVolume
      },
      duration: duration
    };

    // create sound instance by key
    if (typeof sound === 'string') {
      sound = scene.sys.sound.add(sound);
    }
    var fade;
    if (sound.hasOwnProperty('_fade')) {
      fade = sound._fade;
      fade.stop().resetFromJSON(config);
    } else {
      fade = new Fade(scene, sound, config);
      sound._fade = fade;
    }
    fade.start();
    if (!sound.isPlaying) {
      sound.setVolume(startVolume).play();
    }
    return sound;
  };

  var FadeOut = function FadeOut(scene, sound, duration, destroy) {
    if (IsSoundObject(scene)) {
      destroy = duration;
      duration = sound;
      sound = scene;
      scene = undefined;
    }
    if (destroy === undefined) {
      destroy = true;
    }
    var config = {
      mode: destroy ? 2 : 1,
      // 1: stop, 2: destroy
      volume: {
        start: sound.volume,
        end: 0
      },
      duration: duration
    };
    var fade;
    if (sound.hasOwnProperty('_fade')) {
      fade = sound._fade;
      fade.stop().resetFromJSON(config);
    } else {
      fade = new Fade(scene, sound, config);
      sound._fade = fade;
    }
    fade.start();
    if (!sound.isPlaying) {
      sound.play();
    }
    return sound;
  };

  var GetValue$m = Phaser.Utils.Objects.GetValue;
  var BackgroundMusicMethods = {
    setBackgroundMusicLoop: function setBackgroundMusicLoop(value) {
      if (value === undefined) {
        value = true;
      }
      this.backgroundMusicLoop = value;
      return this;
    },
    setBackgroundMusicFadeTime: function setBackgroundMusicFadeTime(time) {
      this.backgroundMusicFadeTime = time;
      return this;
    },
    getBackgroundMusic: function getBackgroundMusic() {
      return this.backgroundMusic;
    },
    // Internal method
    setCurrentBackgroundMusic: function setCurrentBackgroundMusic(music) {
      this.backgroundMusic = music;
      if (music) {
        music.once('complete', function () {
          if (this.backgroundMusic === music) {
            this.backgroundMusic.destroy();
            this.backgroundMusic = undefined;
          }
        }, this).once('destroy', function () {
          if (this.backgroundMusic === music) {
            this.backgroundMusic = undefined;
          }
        }, this);
        if (!music.isPlaying) {
          music.play();
        }
      }
      return this;
    },
    playBackgroundMusic: function playBackgroundMusic(key, config) {
      if (!this.hasAudio(key)) {
        console.error("[Sound manager] Audio key'".concat(key, "' is not existed"));
        return this;
      }

      // Don't re-play the same background music
      if (this.backgroundMusic && this.backgroundMusic.key === key) {
        return this;
      }
      this.stopBackgroundMusic(); // Stop previous background music

      var music = this.sound.add(key, {
        loop: GetValue$m(config, 'loop', this.backgroundMusicLoop),
        mute: GetValue$m(config, 'mute', this.backgroundMusicMute),
        volume: GetValue$m(config, 'volume', this.backgroundMusicVolume),
        detune: GetValue$m(config, 'detune', 0),
        rate: GetValue$m(config, 'rate', 1)
      });
      this.setCurrentBackgroundMusic(music);

      // Fade volume
      if (this.backgroundMusicFadeTime > 0) {
        this.fadeInBackgroundMusic(this.backgroundMusicFadeTime);
      }
      return this;
    },
    pauseBackgroundMusic: function pauseBackgroundMusic() {
      if (this.backgroundMusic) {
        this.backgroundMusic.pause();
      }
      return this;
    },
    resumeBackgroundMusic: function resumeBackgroundMusic() {
      if (this.backgroundMusic) {
        this.backgroundMusic.resume();
      }
      return this;
    },
    stopBackgroundMusic: function stopBackgroundMusic() {
      if (this.backgroundMusic) {
        if (this.backgroundMusicFadeTime > 0) {
          this.fadeOutBackgroundMusic(this.backgroundMusicFadeTime, true);
        } else {
          this.backgroundMusic.stop();
          this.backgroundMusic.destroy();
          this.backgroundMusic = undefined;
        }
      }
      return this;
    },
    fadeInBackgroundMusic: function fadeInBackgroundMusic(time) {
      if (this.backgroundMusic) {
        FadeIn(this.backgroundMusic, time, this.backgroundMusicVolume, 0);
      }
      return this;
    },
    fadeOutBackgroundMusic: function fadeOutBackgroundMusic(time, isStopped) {
      if (this.backgroundMusic) {
        FadeOut(this.backgroundMusic, time, isStopped);
      }
      return this;
    },
    crossFadeBackgroundMusic: function crossFadeBackgroundMusic(key, time) {
      if (!this.hasAudio(key)) {
        console.error("[Sound manager] Audio key'".concat(key, "' is not existed"));
        return this;
      }
      var backgroundMusicFadeTimeSave = this.backgroundMusicFadeTime;
      this.backgroundMusicFadeTime = 0;
      this.fadeOutBackgroundMusic(time, true).playBackgroundMusic(key).fadeInBackgroundMusic(time);
      this.backgroundMusicFadeTime = backgroundMusicFadeTimeSave;
      return this;
    },
    setBackgroundMusicMute: function setBackgroundMusicMute(mute) {
      if (mute === undefined) {
        mute = true;
      }
      this.backgroundMusicMute = mute;
      return this;
    },
    setBackgroundMusicVolume: function setBackgroundMusicVolume(volume) {
      this.backgroundMusicVolume = volume;
      return this;
    },
    setBackgroundMusicRate: function setBackgroundMusicRate(rate) {
      if (this.backgroundMusic) {
        this.backgroundMusic.setRate(rate);
      }
      return this;
    },
    setBackgroundMusicDetune: function setBackgroundMusicDetune(detune) {
      if (this.backgroundMusic) {
        this.backgroundMusic.setDetune(detune);
      }
      return this;
    }
  };

  var GetValue$l = Phaser.Utils.Objects.GetValue;
  var BackgroundMusic2Methods = {
    setBackgroundMusic2Loop: function setBackgroundMusic2Loop(value) {
      if (value === undefined) {
        value = true;
      }
      this.backgroundMusic2Loop = value;
      return this;
    },
    setBackgroundMusic2FadeTime: function setBackgroundMusic2FadeTime(time) {
      this.backgroundMusic2FadeTime = time;
      return this;
    },
    getBackgroundMusic2: function getBackgroundMusic2() {
      return this.backgroundMusic2;
    },
    // Internal method
    setCurrentBackgroundMusic2: function setCurrentBackgroundMusic2(music) {
      this.backgroundMusic2 = music;
      if (music) {
        music.once('complete', function () {
          if (this.backgroundMusic2 === music) {
            this.backgroundMusic2.destroy();
            this.backgroundMusic2 = undefined;
          }
        }, this).once('destroy', function () {
          if (this.backgroundMusic2 === music) {
            this.backgroundMusic2 = undefined;
          }
        }, this);
        if (!music.isPlaying) {
          music.play();
        }
      }
      return this;
    },
    playBackgroundMusic2: function playBackgroundMusic2(key, config) {
      if (!this.hasAudio(key)) {
        console.error("[Sound manager] Audio key'".concat(key, "' is not existed"));
        return this;
      }

      // Don't re-play the same background music
      if (this.backgroundMusic2 && this.backgroundMusic2.key === key) {
        return this;
      }
      this.stopBackgroundMusic2(); // Stop previous background music

      var music = this.sound.add(key, {
        loop: GetValue$l(config, 'loop', this.backgroundMusicLoop),
        mute: GetValue$l(config, 'mute', this.backgroundMusic2Mute),
        volume: GetValue$l(config, 'volume', this.backgroundMusic2Volume),
        detune: GetValue$l(config, 'detune', 0),
        rate: GetValue$l(config, 'rate', 1)
      });
      this.setCurrentBackgroundMusic2(music);

      // Fade volume
      if (this.backgroundMusic2FadeTime > 0) {
        this.fadeInBackgroundMusic2(this.backgroundMusic2FadeTime);
      }
      return this;
    },
    pauseBackgroundMusic2: function pauseBackgroundMusic2() {
      if (this.backgroundMusic2) {
        this.backgroundMusic2.pause();
      }
      return this;
    },
    resumeBackgroundMusic2: function resumeBackgroundMusic2() {
      if (this.backgroundMusic2) {
        this.backgroundMusic2.resume();
      }
      return this;
    },
    stopBackgroundMusic2: function stopBackgroundMusic2() {
      if (this.backgroundMusic2) {
        if (this.backgroundMusic2FadeTime > 0) {
          this.fadeOutBackgroundMusic2(this.backgroundMusic2FadeTime, true);
        } else {
          this.backgroundMusic2.stop();
          this.backgroundMusic2.destroy();
          this.backgroundMusic2 = undefined;
        }
      }
      return this;
    },
    fadeInBackgroundMusic2: function fadeInBackgroundMusic2(time) {
      if (this.backgroundMusic2) {
        FadeIn(this.backgroundMusic2, time, this.backgroundMusic2Volume, 0);
      }
      return this;
    },
    fadeOutBackgroundMusic2: function fadeOutBackgroundMusic2(time, isStopped) {
      if (this.backgroundMusic2) {
        FadeOut(this.backgroundMusic2, time, isStopped);
      }
      return this;
    },
    crossFadeBackgroundMusic2: function crossFadeBackgroundMusic2(key, time) {
      if (!this.hasAudio(key)) {
        console.error("[Sound manager] Audio key'".concat(key, "' is not existed"));
        return this;
      }
      var backgroundMusic2FadeTimeSave = this.backgroundMusic2FadeTime;
      this.backgroundMusic2FadeTime = 0;
      this.fadeOutBackgroundMusic2(time, true).playBackgroundMusic2(key).fadeInBackgroundMusic2(time);
      this.backgroundMusic2FadeTime = backgroundMusic2FadeTimeSave;
      return this;
    },
    setBackgroundMusic2Mute: function setBackgroundMusic2Mute(mute) {
      if (mute === undefined) {
        mute = true;
      }
      this.backgroundMusic2Mute = mute;
      return this;
    },
    setBackgroundMusic2Volume: function setBackgroundMusic2Volume(volume) {
      this.backgroundMusic2Volume = volume;
      return this;
    },
    setBackgroundMusic2Rate: function setBackgroundMusic2Rate(rate) {
      if (this.backgroundMusic2) {
        this.backgroundMusic2.setRate(rate);
      }
      return this;
    },
    setBackgroundMusic2Detune: function setBackgroundMusic2Detune(detune) {
      if (this.backgroundMusic2) {
        this.backgroundMusic2.setDetune(detune);
      }
      return this;
    }
  };

  var RemoveItem$3 = Phaser.Utils.Array.Remove;
  var GetValue$k = Phaser.Utils.Objects.GetValue;
  var SoundEffectsMethods = {
    getSoundEffects: function getSoundEffects() {
      return this.soundEffects;
    },
    getLastSoundEffect: function getLastSoundEffect() {
      return this.soundEffects[this.soundEffects.length - 1];
    },
    playSoundEffect: function playSoundEffect(key, config) {
      if (!this.hasAudio(key)) {
        console.error("[Sound manager] Audio key'".concat(key, "' is not existed"));
        return this;
      }
      var music = this.sound.add(key, {
        mute: GetValue$k(config, 'mute', this.soundEffectsMute),
        volume: GetValue$k(config, 'volume', this.soundEffectsVolume),
        detune: GetValue$k(config, 'detune', 0),
        rate: GetValue$k(config, 'rate', 1)
      });
      this.soundEffects.push(music);
      music.once('complete', function () {
        music.destroy();

        // SoundManager has been destroyed
        if (!this.sound) {
          return;
        }
        RemoveItem$3(this.soundEffects, music);
      }, this).once('destroy', function () {
        // SoundManager has been destroyed
        if (!this.sound) {
          return;
        }
        RemoveItem$3(this.soundEffects, music);
      }, this).play();
      return this;
    },
    stopAllSoundEffects: function stopAllSoundEffects() {
      for (var i = this.soundEffects.length - 1; i >= 0; i--) {
        var soundEffect = this.soundEffects[i];
        soundEffect.stop();
        soundEffect.destroy();
      }
      return this;
    },
    fadeInSoundEffect: function fadeInSoundEffect(time) {
      var soundEffect = this.getLastSoundEffect();
      if (soundEffect) {
        FadeIn(soundEffect, time, this.soundEffectsVolume, 0);
      }
      return this;
    },
    fadeOutSoundEffect: function fadeOutSoundEffect(time, isStopped) {
      var soundEffect = this.getLastSoundEffect();
      if (soundEffect) {
        FadeOut(soundEffect, time, isStopped);
      }
      return this;
    },
    fadeOutAllSoundEffects: function fadeOutAllSoundEffects(time, isStopped) {
      for (var i = this.soundEffects.length - 1; i >= 0; i--) {
        FadeOut(this.soundEffects[i], time, isStopped);
      }
      return this;
    },
    setSoundEffectMute: function setSoundEffectMute(mute, lastSoundEffect) {
      if (mute === undefined) {
        mute = true;
      }
      if (lastSoundEffect === undefined) {
        lastSoundEffect = false;
      }
      if (lastSoundEffect) {
        // Set volume of last sound effect
        var soundEffect = this.getLastSoundEffect();
        if (soundEffect) {
          soundEffect.setMute(mute);
        }
      } else {
        // Set volume of all sound effects
        this.soundEffectsMute = mute;
      }
      return this;
    },
    setSoundEffectVolume: function setSoundEffectVolume(volume, lastSoundEffect) {
      if (lastSoundEffect === undefined) {
        lastSoundEffect = false;
      }
      if (lastSoundEffect) {
        // Set volume of last sound effect
        var soundEffect = this.getLastSoundEffect();
        if (soundEffect) {
          soundEffect.setVolume(volume);
        }
      } else {
        // Set volume of all sound effects
        this.soundEffectsVolume = volume;
      }
      return this;
    },
    setSoundEffectDetune: function setSoundEffectDetune(detune, lastSoundEffect) {
      if (lastSoundEffect === undefined) {
        lastSoundEffect = false;
      }
      var soundEffects;
      if (lastSoundEffect) {
        soundEffects = [this.getLastSoundEffect()];
      } else {
        soundEffects = this.soundEffects;
      }
      for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
        soundEffects[i].setDetune(detune);
      }
      return this;
    },
    setSoundEffectRate: function setSoundEffectRate(rate, lastSoundEffect) {
      if (lastSoundEffect === undefined) {
        lastSoundEffect = false;
      }
      var soundEffects;
      if (lastSoundEffect) {
        soundEffects = [this.getLastSoundEffect()];
      } else {
        soundEffects = this.soundEffects;
      }
      for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
        soundEffects[i].setRate(rate);
      }
      return this;
    }
  };

  var RemoveItem$2 = Phaser.Utils.Array.Remove;
  var GetValue$j = Phaser.Utils.Objects.GetValue;
  var SoundEffects2Methods = {
    getSoundEffects2: function getSoundEffects2() {
      return this.soundEffects2;
    },
    getLastSoundEffect2: function getLastSoundEffect2() {
      return this.soundEffects2[this.soundEffects2.length - 1];
    },
    playSoundEffect2: function playSoundEffect2(key, config) {
      if (!this.hasAudio(key)) {
        console.error("[Sound manager] Audio key'".concat(key, "' is not existed"));
        return this;
      }
      var music = this.sound.add(key, {
        mute: GetValue$j(config, 'mute', this.soundEffects2Mute),
        volume: GetValue$j(config, 'volume', this.soundEffects2Volume),
        detune: GetValue$j(config, 'detune', 0),
        rate: GetValue$j(config, 'rate', 1)
      });
      this.soundEffects2.push(music);
      music.once('complete', function () {
        music.destroy();

        // SoundManager has been destroyed
        if (!this.sound) {
          return;
        }
        RemoveItem$2(this.soundEffects2, music);
      }, this).once('destroy', function () {
        // SoundManager has been destroyed
        if (!this.sound) {
          return;
        }
        RemoveItem$2(this.soundEffects2, music);
      }, this).play();
      return this;
    },
    stopAllSoundEffects2: function stopAllSoundEffects2() {
      for (var i = this.soundEffects.length - 1; i >= 0; i--) {
        var soundEffect = this.soundEffects[i];
        soundEffect.stop();
        soundEffect.destroy();
      }
      return this;
    },
    fadeInSoundEffect2: function fadeInSoundEffect2(time) {
      var soundEffect = this.getLastSoundEffect2();
      if (soundEffect) {
        FadeIn(soundEffect, time, this.soundEffects2Volume, 0);
      }
      return this;
    },
    fadeOutSoundEffect2: function fadeOutSoundEffect2(time, isStopped) {
      var soundEffect = this.getLastSoundEffect2();
      if (soundEffect) {
        FadeOut(soundEffect, time, isStopped);
      }
      return this;
    },
    fadeOutAllSoundEffects2: function fadeOutAllSoundEffects2(time, isStopped) {
      for (var i = this.soundEffects2.length - 1; i >= 0; i--) {
        FadeOut(this.soundEffects2[i], time, isStopped);
      }
      return this;
    },
    setSoundEffect2Mute: function setSoundEffect2Mute(mute, lastSoundEffect) {
      if (mute === undefined) {
        mute = true;
      }
      if (lastSoundEffect === undefined) {
        lastSoundEffect = false;
      }
      if (lastSoundEffect) {
        // Set volume of last sound effect
        var soundEffect = this.getLastSoundEffect2();
        if (soundEffect) {
          soundEffect.setMute(mute);
        }
      } else {
        // Set volume of all sound effects
        this.soundEffects2Mute = mute;
      }
      return this;
    },
    setSoundEffect2Volume: function setSoundEffect2Volume(volume, lastSoundEffect) {
      if (lastSoundEffect === undefined) {
        lastSoundEffect = false;
      }
      if (lastSoundEffect) {
        // Set volume of last sound effect
        var soundEffect = this.getLastSoundEffect2();
        if (soundEffect) {
          soundEffect.setVolume(volume);
        }
      } else {
        // Set volume of all sound effects
        this.soundEffects2Volume = volume;
      }
      return this;
    },
    setSoundEffect2Detune: function setSoundEffect2Detune(detune, lastSoundEffect) {
      if (lastSoundEffect === undefined) {
        lastSoundEffect = false;
      }
      var soundEffects;
      if (lastSoundEffect) {
        soundEffects = [this.getLastSoundEffect2()];
      } else {
        soundEffects = this.soundEffects2;
      }
      for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
        soundEffects[i].setDetune(detune);
      }
      return this;
    },
    setSoundEffect2Rate: function setSoundEffect2Rate(rate, lastSoundEffect) {
      if (lastSoundEffect === undefined) {
        lastSoundEffect = false;
      }
      var soundEffects;
      if (lastSoundEffect) {
        soundEffects = [this.getLastSoundEffect2()];
      } else {
        soundEffects = this.soundEffects2;
      }
      for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
        soundEffects[i].setRate(rate);
      }
      return this;
    }
  };

  var Methods$6 = {
    hasAudio: HasaAudio
  };
  Object.assign(Methods$6, BackgroundMusicMethods, BackgroundMusic2Methods, SoundEffectsMethods, SoundEffects2Methods);

  var GetValue$i = Phaser.Utils.Objects.GetValue;
  var SoundManager = /*#__PURE__*/function () {
    function SoundManager(game, config) {
      _classCallCheck(this, SoundManager);
      this.sound = GetSoundManager(game);

      // Background music will be (fade out)destroyed when play next one.
      this.backgroundMusic = undefined;
      this._backgroundMusicVolume = GetValue$i(config, 'bgm.volume', 1);
      this._backgroundMusicMute = GetValue$i(config, 'bgm.mute', false);
      this.setBackgroundMusicLoop(GetValue$i(config, 'bgm.loop', true));
      this.setBackgroundMusicFadeTime(GetValue$i(config, 'bgm.fade', 500));
      this.backgroundMusic2 = undefined;
      this._backgroundMusic2Volume = GetValue$i(config, 'bgm2.volume', 1);
      this._backgroundMusic2Mute = GetValue$i(config, 'bgm2.mute', false);
      this.setBackgroundMusic2Loop(GetValue$i(config, 'bgm2.loop', true));
      this.setBackgroundMusic2FadeTime(GetValue$i(config, 'bgm2.fade', 500));

      // Sound effect will be destroyed when completed
      this.soundEffects = [];
      this._soundEffectsVolume = GetValue$i(config, 'soundEffect.volume', 1);
      this.soundEffects2 = [];
      this._soundEffects2Volume = GetValue$i(config, 'soundEffect2.volume', 1);
      var initialBackgroundMusic = GetValue$i(config, 'bgm.initial', undefined);
      if (initialBackgroundMusic) {
        this.setCurrentBackgroundMusic(initialBackgroundMusic);
      }
      var initialBackgroundMusic2 = GetValue$i(config, 'bgm2.initial', undefined);
      if (initialBackgroundMusic2) {
        this.setCurrentBackgroundMusic2(initialBackgroundMusic2);
      }
    }
    _createClass(SoundManager, [{
      key: "destroy",
      value: function destroy() {
        if (this.backgroundMusic) {
          this.backgroundMusic.destroy();
        }
        this.backgroundMusic = undefined;
        if (this.backgroundMusic2) {
          this.backgroundMusic2.destroy();
        }
        this.backgroundMusic2 = undefined;
        if (this.soundEffects.length) {
          for (var i = this.soundEffects.length - 1; i >= 0; i--) {
            this.soundEffects[i].destroy();
          }
        }
        this.soundEffects.length = 0;
        if (this.soundEffects2.length) {
          for (var i = this.soundEffects2.length - 1; i >= 0; i--) {
            this.soundEffects2[i].destroy();
          }
        }
        this.soundEffects2.length = 0;
        this.sound = undefined;
        return this;
      }

      // backgroundMusic
      // mute
    }, {
      key: "backgroundMusicMute",
      get: function get() {
        return this._backgroundMusicMute;
      },
      set: function set(value) {
        this._backgroundMusicMute = value;
        if (this.backgroundMusic) {
          this.backgroundMusic.setMute(mute);
        }
      }

      // volume
    }, {
      key: "backgroundMusicVolume",
      get: function get() {
        return this._backgroundMusicVolume;
      },
      set: function set(value) {
        this._backgroundMusicVolume = value;
        if (this.backgroundMusic) {
          this.backgroundMusic.setVolume(value);
        }
      }

      // backgroundMusic2
      // mute
    }, {
      key: "backgroundMusic2Mute",
      get: function get() {
        return this._backgroundMusic2Mute;
      },
      set: function set(value) {
        this._backgroundMusic2Mute = value;
        if (this.backgroundMusic2) {
          this.backgroundMusic2.setMute(mute);
        }
      }

      // volume
    }, {
      key: "backgroundMusic2Volume",
      get: function get() {
        return this._backgroundMusic2Volume;
      },
      set: function set(value) {
        this._backgroundMusic2Volume = value;
        if (this.backgroundMusic2) {
          this.backgroundMusic2.setVolume(value);
        }
      }

      // soundEffects
      // mute
    }, {
      key: "soundEffectsMute",
      get: function get() {
        return this._soundEffectsMute;
      },
      set: function set(value) {
        this._soundEffectsMute = value;
        var soundEffects = this.soundEffects;
        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
          soundEffects[i].setMute(value);
        }
      }

      // volume
    }, {
      key: "soundEffectsVolume",
      get: function get() {
        return this._soundEffectsVolume;
      },
      set: function set(value) {
        this._soundEffectsVolume = value;
        var soundEffects = this.soundEffects;
        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
          soundEffects[i].setVolume(value);
        }
      }

      // soundEffects2
      // mute
    }, {
      key: "soundEffects2Mute",
      get: function get() {
        return this._soundEffects2Mute;
      },
      set: function set(value) {
        this._soundEffects2Mute = value;
        var soundEffects = this.soundEffects;
        for (var i = 0, cnt = soundEffects2.length; i < cnt; i++) {
          soundEffects[i].setMute(value);
        }
      }

      // volume
    }, {
      key: "soundEffects2Volume",
      get: function get() {
        return this._soundEffects2Volume;
      },
      set: function set(value) {
        this._soundEffects2Volume = value;
        var soundEffects = this.soundEffects2;
        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
          soundEffects[i].setVolume(value);
        }
      }
    }]);
    return SoundManager;
  }();
  Object.assign(SoundManager.prototype, Methods$6);

  var GetValue$h = Phaser.Utils.Objects.GetValue;
  var BaseClock = /*#__PURE__*/function (_TickTask) {
    _inherits(BaseClock, _TickTask);
    function BaseClock(parent, config) {
      var _this;
      _classCallCheck(this, BaseClock);
      _this = _callSuper(this, BaseClock, [parent, config]);
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(BaseClock, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.isRunning = GetValue$h(o, 'isRunning', false);
        this.timeScale = GetValue$h(o, 'timeScale', 1);
        this.now = GetValue$h(o, 'now', 0);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          isRunning: this.isRunning,
          timeScale: this.timeScale,
          now: this.now,
          tickingMode: this.tickingMode
        };
      }

      // Override
      // startTicking() { }

      // Override
      // stopTicking() {}
    }, {
      key: "start",
      value: function start(startAt) {
        if (startAt === undefined) {
          startAt = 0;
        }
        this.delta = 0;
        this.now = startAt;
        _get(_getPrototypeOf(BaseClock.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "seek",
      value: function seek(time) {
        this.now = time;
        return this;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(value) {
        this.timeScale = value;
        return this;
      }
    }, {
      key: "tick",
      value: function tick(delta) {
        delta *= this.timeScale;
        this.now += delta;
        this.delta = delta;
        this.emit('update', this.now, this.delta);
        return this;
      }
    }]);
    return BaseClock;
  }(TickTask);

  var Clock = /*#__PURE__*/function (_BaseClock) {
    _inherits(Clock, _BaseClock);
    function Clock() {
      _classCallCheck(this, Clock);
      return _callSuper(this, Clock, arguments);
    }
    _createClass(Clock, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(Clock.prototype), "startTicking", this).call(this);
        this.scene.sys.events.on('update', this.update, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(Clock.prototype), "stopTicking", this).call(this);
        if (this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off('update', this.update, this);
        }
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || this.timeScale === 0) {
          return this;
        }
        this.tick(delta);
        return this;
      }
    }]);
    return Clock;
  }(BaseClock);

  var Yoyo = function Yoyo(t, threshold) {
    if (threshold === undefined) {
      threshold = 0.5;
    }
    if (t <= threshold) {
      t = t / threshold;
    } else {
      t = 1 - (t - threshold) / (1 - threshold);
    }
    return t;
  };

  var Clamp = Phaser.Math.Clamp;
  var Timer = /*#__PURE__*/function () {
    function Timer(timeline, config) {
      _classCallCheck(this, Timer);
      this.setTimeline(timeline).reset(config);
    }
    _createClass(Timer, [{
      key: "setTimeline",
      value: function setTimeline(timeline) {
        this.timeline = timeline;
        return this;
      }
    }, {
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
      }
    }, {
      key: "setCallbacks",
      value: function setCallbacks(target, onStart, onProgress, onComplete) {
        this.target = target;
        this.onStart = onStart;
        this.onProgress = onProgress;
        this.onComplete = onComplete;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration, yoyo) {
        if (yoyo === undefined) {
          yoyo = false;
        }
        this.duration = duration;
        this.remainder = duration;
        this.t = 0;
        this.yoyo = yoyo;
        return this;
      }
    }, {
      key: "setPaused",
      value: function setPaused(state) {
        this.isPaused = state;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        this.isPaused = true;
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        this.isPaused = false;
        return this;
      }
    }, {
      key: "setRemoved",
      value: function setRemoved(state) {
        this.removed = state;
        return this;
      }
    }, {
      key: "remove",
      value: function remove() {
        this.removed = true;
        return this;
      }
    }, {
      key: "seek",
      value: function seek(t) {
        this.remainder = this.duration * (1 - t);
        return this;
      }
    }, {
      key: "reset",
      value: function reset(o) {
        this.setName(o.name).setDuration(o.duration, o.yoyo).setCallbacks(o.target, o.onStart, o.onProgress, o.onComplete).setPaused(false).setRemoved(false);
        return this;
      }
    }, {
      key: "onFree",
      value: function onFree() {
        this.setTimeline().setCallbacks();
      }
    }, {
      key: "getProgress",
      value: function getProgress() {
        var value = 1 - this.remainder / this.duration;
        value = Clamp(value, 0, 1);
        if (this.yoyo) {
          value = Yoyo(value);
        }
        return value;
      }
    }, {
      key: "setProgress",
      value: function setProgress(value) {
        value = Clamp(value, 0, 1);
        this.remainder = this.duration * (1 - value);
      }
    }, {
      key: "runCallback",
      value: function runCallback(callback) {
        if (!callback) {
          return;
        }
        callback(this.target, this.t, this);
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (this.removed) {
          return true;
        } else if (this.isPaused) {
          return false;
        }
        this.remainder -= delta;
        this.t = this.getProgress();
        this.runCallback(this.onProgress);
        var isCompleted = this.remainder <= 0;
        if (isCompleted) {
          this.runCallback(this.onComplete);
        }
        return isCompleted;
      }
    }]);
    return Timer;
  }();

  var Stack = /*#__PURE__*/function () {
    function Stack() {
      _classCallCheck(this, Stack);
      this.items = [];
    }
    _createClass(Stack, [{
      key: "destroy",
      value: function destroy() {
        this.clear();
        this.items = undefined;
      }
    }, {
      key: "pop",
      value: function pop() {
        return this.items.length > 0 ? this.items.pop() : null;
      }
    }, {
      key: "push",
      value: function push(l) {
        this.items.push(l);
        return this;
      }
    }, {
      key: "pushMultiple",
      value: function pushMultiple(arr) {
        this.items.push.apply(this.items, arr);
        arr.length = 0;
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.items.length = 0;
        return this;
      }
    }]);
    return Stack;
  }();

  var TimerPool$1 = /*#__PURE__*/function (_Pool) {
    _inherits(TimerPool, _Pool);
    function TimerPool() {
      _classCallCheck(this, TimerPool);
      return _callSuper(this, TimerPool, arguments);
    }
    _createClass(TimerPool, [{
      key: "allocate",
      value: function allocate() {
        return this.pop();
      }
    }, {
      key: "free",
      value: function free(timer) {
        timer.onFree();
        this.push(timer);
      }
    }, {
      key: "freeMultiple",
      value: function freeMultiple(arr) {
        for (var i = 0, cnt = arr.length; i < cnt; i++) {
          this.free(arr[i]);
        }
        return this;
      }
    }]);
    return TimerPool;
  }(Stack);

  var GetValue$g = Phaser.Utils.Objects.GetValue;
  var TimerPool = new TimerPool$1();
  var Timeline = /*#__PURE__*/function (_Clock) {
    _inherits(Timeline, _Clock);
    function Timeline(parent, config) {
      var _this;
      _classCallCheck(this, Timeline);
      _this = _callSuper(this, Timeline, [parent, config]);
      _this.addedTimers = [];
      _this.timers = [];
      _this.timerPool = GetValue$g(config, 'pool', TimerPool);
      return _this;
    }
    _createClass(Timeline, [{
      key: "shutdown",
      value: function shutdown() {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.timerPool.freeMultiple(this.addedTimers).freeMultiple(this.timers);
        this.timerPool = undefined;
        this.addedTimers = undefined;
        this.timers = undefined;
        _get(_getPrototypeOf(Timeline.prototype), "shutdown", this).call(this);
      }
    }, {
      key: "addTimer",
      value: function addTimer(config) {
        var timer = this.timerPool.allocate();
        if (!timer) {
          timer = new Timer(this, config);
        } else {
          timer.setTimeline(this).reset(config);
        }
        this.addedTimers.push(timer);
        timer.runCallback(timer.onStart);
        if (!this.isRunning) {
          this.start();
        }
        return timer;
      }
    }, {
      key: "delayCall",
      value: function delayCall(delay, callback, args, scope) {
        var timer = this.addTimer({
          duration: delay,
          onComplete: function onComplete(target, t, timer) {
            if (args === undefined) {
              args = [];
            }
            args.push(timer);
            callback.apply(scope, args);
          }
        });
        return timer;
      }
    }, {
      key: "delayEvent",
      value: function delayEvent(delay, eventName) {
        this.removeDelayEvent(eventName);
        // Clear existed event

        var timer = this.delayCall(delay, function () {
          this.removeDelayEvent(eventName); // Clear this timer
          this.emit(eventName);
        }, [], this);
        this.once("_remove.".concat(eventName), function () {
          timer.remove();
          timer = undefined;
        });
        return this;
      }
    }, {
      key: "removeDelayEvent",
      value: function removeDelayEvent(eventName) {
        this.emit("_remove.".concat(eventName));
        return this;
      }
    }, {
      key: "getTimers",
      value: function getTimers(name) {
        var timers = [];
        var timerQueues = [this.addedTimers, this.timers];
        for (var ti = 0, tcnt = timerQueues.length; ti < tcnt; ti++) {
          var timerQueue = timerQueues[ti];
          for (var i = 0, cnt = timerQueue.length; i < cnt; i++) {
            var timer = timerQueue[i];
            if (timer.name === name) {
              timers.push(timer);
            }
          }
        }
        return timers;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        var _this$timers;
        _get(_getPrototypeOf(Timeline.prototype), "update", this).call(this, time, delta);
        if (!this.isRunning) {
          return;
        }
        (_this$timers = this.timers).push.apply(_this$timers, _toConsumableArray(this.addedTimers));
        this.addedTimers.length = 0;
        var pendingTimers = [];
        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
          var timer = this.timers[i];
          var isStopped = timer.update(this.now, this.delta);
          if (isStopped) {
            this.timerPool.free(timer); // Free timer
          } else {
            pendingTimers.push(timer); // Add to timer queue
          }
        }
        this.timers = pendingTimers;
        if (this.timers.length === 0 && this.addedTimers.length === 0) {
          this.complete(); // Emit 'complete' event
        }
      }
    }]);
    return Timeline;
  }(Clock);

  var WaitCompleteEvent = '_wait.complete';
  var RemoveWaitEvents = '_remove.wait';

  var PreUpdateDelayCall = function PreUpdateDelayCall(gameObject, delay, callback, scope, args) {
    // Invoke callback under scene's 'preupdate' event
    var scene = GetSceneObject(gameObject);
    var timer = scene.time.delayedCall(delay, function () {
      scene.sys.events.once('preupdate', function () {
        callback.call(scope, args);
      });
    });
    return timer;
  };

  var WaitEvent$1 = /*#__PURE__*/function () {
    function WaitEvent(parent) {
      _classCallCheck(this, WaitEvent);
      if (!parent) {
        this.setEventEmitter(true);
        parent = this;
      }
      this.parent = parent;
      this.waitId = 0;

      // Override it
      this.waitCompleteEventName = WaitCompleteEvent;
      this.removeWaitEventsEventName = RemoveWaitEvents;
    }
    _createClass(WaitEvent, [{
      key: "destroy",
      value: function destroy() {
        this.removeWaitEvents();
        this.clearWaitCompleteCallbacks();
        this.parent = null;
      }
    }, {
      key: "waitEvent",
      value: function waitEvent(eventEmitter, eventName, completeNextTick) {
        var callback = this.getWaitCompleteTriggerCallback(completeNextTick);
        eventEmitter.once(eventName, callback, this);
        this.parent.once(this.removeWaitEventsEventName, function () {
          eventEmitter.off(eventName, callback, this);
        });
        return this.parent;
      }
    }, {
      key: "getWaitCompleteTriggerCallback",
      value: function getWaitCompleteTriggerCallback(completeNextTick) {
        if (completeNextTick === undefined) {
          completeNextTick = true;
        }
        var waitId = this.waitId;
        var self = this;
        var completeCallback = function completeCallback() {
          if (waitId < self.waitId) {
            return;
          }
          self.waitId++;
          self.removeWaitEvents();
          self.parent.emit(self.waitCompleteEventName);
        };
        if (completeNextTick) {
          var completeCallbackNextTick = function completeCallbackNextTick() {
            PreUpdateDelayCall(self.parent, 0, completeCallback);
          };
          return completeCallbackNextTick;
        } else {
          return completeCallback;
        }
      }
    }, {
      key: "removeWaitEvents",
      value: function removeWaitEvents() {
        this.parent.emit(this.removeWaitEventsEventName);
        return this;
      }
    }, {
      key: "addWaitCompleteCallback",
      value: function addWaitCompleteCallback(callback, scope) {
        this.parent.on(this.waitCompleteEventName, callback, scope);
        return this;
      }
    }, {
      key: "clearWaitCompleteCallbacks",
      value: function clearWaitCompleteCallbacks() {
        this.parent.off(this.waitCompleteEventName);
        return this;
      }
    }]);
    return WaitEvent;
  }();
  Object.assign(WaitEvent$1.prototype, EventEmitterMethods$1);

  var WaitTimeMethods = {
    waitTime: function waitTime(duration) {
      var timeline = this.parent.timeline;
      timeline.delayEvent(duration, 'delay');

      // Clear delay event on timeline manually
      this.parent.once(this.removeWaitEventsEventName, function () {
        timeline.removeDelayEvent('delay');
      });
      return this.waitEvent(timeline, 'delay');
    }
  };

  var Split = function Split(s, delimiter) {
    var regexString = "(?<!\\\\)\\".concat(delimiter);
    var escapeString = "\\".concat(delimiter);
    return s.split(new RegExp(regexString, 'g')).map(function (s) {
      return s.replace(escapeString, delimiter);
    });
  };

  var WaitInputMethods = {
    setClickTarget: function setClickTarget(target) {
      this.clickTarget = target;
      if (!target) {
        this.clickEE = null;
      } else if (IsSceneObject(target)) {
        this.clickEE = target.input;
      } else {
        // Assume that target is a gameObject
        this.clickEE = target.setInteractive();
      }
    },
    waitClick: function waitClick() {
      if (!this.clickEE) {
        return this.waitTime(0);
      }
      return this.waitEvent(this.clickEE, 'pointerdown');
    },
    waitKeyDown: function waitKeyDown(key) {
      var eventEmitter = this.scene.input.keyboard;
      if (typeof key === 'string') {
        if (key.indexOf('|') === -1) {
          return this.waitEvent(eventEmitter, "keydown-".concat(key.toUpperCase()));
        } else {
          var keys = Split(key, '|');
          for (var i = 0, cnt = keys.length; i < cnt; i++) {
            this.waitEvent(eventEmitter, "keydown-".concat(key.toUpperCase()));
          }
          return this.parent;
        }
      } else {
        return this.waitEvent(eventEmitter, 'keydown');
      }
    }
  };

  var WaitGameObjectMethods = {
    waitGameObjectTweenComplete: function waitGameObjectTweenComplete(goType, name, property) {
      var tweenTask = this.parent.getGameObjectTweenTask(goType, name, property);
      if (tweenTask) {
        return this.waitEvent(tweenTask, 'complete');
      }
      return this.waitTime(0);
    },
    waitGameObjectDataFlag: function waitGameObjectDataFlag(goType, name, dataKey, trueFlag) {
      var gameObject = this.parent.getGameObject(goType, name);
      if (!gameObject) {
        return this.waitTime(0);
      }
      if (gameObject.getData(dataKey) === trueFlag) {
        return this.waitTime(0);
      }
      var eventName = "changedata-".concat(dataKey);
      var callback = function callback(gameObject, value, previousValue) {
        value = !!value;
        if (value === trueFlag) {
          gameObject.emit('_dataFlagMatch');
        }
      };
      gameObject.on(eventName, callback);
      // Clear changedata event on gameobject manually
      this.parent.once(this.removeWaitEventsEventName, function () {
        gameObject.off(eventName, callback);
      });
      return this.waitEvent(gameObject, '_dataFlagMatch');
    },
    waitGameObjectDestroy: function waitGameObjectDestroy(goType, name) {
      var gameObject = this.parent.getGameObject(goType, name);
      if (!gameObject) {
        return this.waitTime(0);
      }
      return this.waitEvent(gameObject, 'destroy');
    },
    waitGameObjectManagerEmpty: function waitGameObjectManagerEmpty(goType) {
      if (goType) {
        var gameObjectManager = this.parent.getGameObjectManager(goType);
        if (!gameObjectManager) {
          return this.waitTime(0);
        }
        return this.waitEvent(gameObjectManager, 'empty');
      } else {
        var gameObjectManagers = this.parent.gameObjectManagers;
        var hasAnyWaitEvent = false;
        for (var name in gameObjectManagers) {
          hasAnyWaitEvent = true;
          this.waitEvent(gameObjectManagers[name], 'empty');
        }
        if (!hasAnyWaitEvent) {
          return this.waitTime(0);
        }
        return this.parent;
      }
    }
  };

  var WaitCameraMethods = {
    setCameraTarget: function setCameraTarget(camera) {
      this.cameraTarget = camera;
      return this;
    },
    waitCameraEffectComplete: function waitCameraEffectComplete(effectName) {
      var camera = this.cameraTarget;
      if (!camera) {
        return this.waitTime(0);
      }
      var effect, completeEventName;
      switch (effectName) {
        case 'camera.fadein':
          effect = camera.fadeEffect;
          completeEventName = 'camerafadeincomplete';
          break;
        case 'camera.fadeout':
          effect = camera.fadeEffect;
          completeEventName = 'camerafadeoutcomplete';
          break;
        case 'camera.flash':
          effect = camera.flashEffect;
          completeEventName = 'cameraflashcomplete';
          break;
        case 'camera.shake':
          effect = camera.shakeEffect;
          completeEventName = 'camerashakecomplete';
          break;
        case 'camera.zoom':
          effect = camera.zoomEffect;
          completeEventName = 'camerazoomcomplete';
          break;
        case 'camera.rotate':
          effect = camera.rotateToEffect;
          completeEventName = 'camerarotatecomplete';
          break;
        case 'camera.scroll':
          effect = camera.panEffect;
          completeEventName = 'camerapancomplete';
          break;
      }
      if (!effect.isRunning) {
        return this.waitTime(0);
      }
      return this.waitEvent(camera, completeEventName);
    }
  };

  var WaitMusicMethods = {
    waitSoundEffectComplete: function waitSoundEffectComplete() {
      if (!this.parent.soundManager) {
        return this.waitTime(0);
      }
      var music = this.parent.soundManager.getLastSoundEffect();
      if (!music) {
        return this.waitTime(0);
      }
      return this.waitEvent(music, 'complete');
    },
    waitSoundEffect2Complete: function waitSoundEffect2Complete() {
      if (!this.parent.soundManager) {
        return this.waitTime(0);
      }
      var music = this.parent.soundManager.getLastSoundEffect2();
      if (!music) {
        return this.waitTime(0);
      }
      return this.waitEvent(music, 'complete');
    },
    waitBackgroundMusicComplete: function waitBackgroundMusicComplete() {
      if (!this.parent.soundManager) {
        return this.waitTime(0);
      }
      var music = this.parent.soundManager.getBackgroundMusic();
      if (!music) {
        return this.waitTime(0);
      }
      return this.waitEvent(music, 'complete');
    },
    waitBackgroundMusic2Complete: function waitBackgroundMusic2Complete() {
      if (!this.parent.soundManager) {
        return this.waitTime(0);
      }
      var music = this.parent.soundManager.getBackgroundMusic2();
      if (!music) {
        return this.waitTime(0);
      }
      return this.waitEvent(music, 'complete');
    }
  };

  var WaitAny$1 = function WaitAny(config) {
    if (!config) {
      return this.waitTime(0);
    }
    var hasAnyWaitEvent = false;
    for (var name in config) {
      switch (name) {
        case 'time':
          hasAnyWaitEvent = true;
          this.waitTime(config.time);
          break;
        case 'click':
          hasAnyWaitEvent = true;
          this.waitClick(config.key);
          break;
        case 'key':
          hasAnyWaitEvent = true;
          this.waitKeyDown(config.key);
          break;
        case 'bgm':
          hasAnyWaitEvent = true;
          this.waitBackgroundMusicComplete();
          break;
        case 'bgm2':
          hasAnyWaitEvent = true;
          this.waitBackgroundMusic2Complete();
          break;
        case 'se':
          hasAnyWaitEvent = true;
          this.waitSoundEffectComplete();
          break;
        case 'se2':
          hasAnyWaitEvent = true;
          this.waitSoundEffect2Complete();
          break;
        case 'camera':
          hasAnyWaitEvent = true;
          this.waitCameraEffectComplete("camera.".concat(config.camera.toLowerCase()));
          break;
        default:
          var names = name.split('.');
          if (names.length === 2) {
            // GONAME.destroy, GONAME.PROPNAME, GONAME.DATAKEY, GONAME.EVTNAME

            var gameObjectName = names[0];
            var propName = names[1];
            var gameObjectManager = this.parent.getGameObjectManager(undefined, gameObjectName);
            if (!gameObjectManager) {
              continue;
            }

            // GONAME.destroy
            if (propName === 'destroy') {
              return this.waitGameObjectDestroy(undefined, gameObjectName);
            }

            // GONAME.PROPNAME (tween.complete)
            var value = gameObjectManager.getProperty(gameObjectName, propName);
            if (typeof value === 'number') {
              hasAnyWaitEvent = true;
              this.waitGameObjectTweenComplete(undefined, gameObjectName, propName);
              continue;
            }

            // GONAME.DATAKEY (boolean)
            var dataKey = propName;
            var matchFalseFlag = dataKey.startsWith('!');
            if (matchFalseFlag) {
              dataKey = dataKey.substring(1);
            }
            if (gameObjectManager.hasData(gameObjectName, propName)) {
              hasAnyWaitEvent = true;
              this.waitGameObjectDataFlag(undefined, gameObjectName, dataKey, !matchFalseFlag);
              continue;
            }

            // GONAME.EVTNAME
            this.waitEvent(gameObject, propName);
            continue;
          } else if (names.length === 1) ;
          break;
      }
    }
    if (!hasAnyWaitEvent) {
      this.waitTime(0);
    }
    return this.parent;
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
  var GetValue$f = function GetValue(source, key, defaultValue) {
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

  var WaitEventManager = /*#__PURE__*/function (_WaitEvent) {
    _inherits(WaitEventManager, _WaitEvent);
    function WaitEventManager(parent, config) {
      var _this;
      _classCallCheck(this, WaitEventManager);
      _this = _callSuper(this, WaitEventManager, [parent]);
      _this.waitCompleteEventName = GetValue$f(config, 'completeEventName', _this.waitCompleteEventName);
      _this.setClickTarget(GetValue$f(config, 'clickTarget', _this.scene));
      _this.setCameraTarget(GetValue$f(config, 'camera', _this.scene.cameras.main));
      return _this;
    }
    _createClass(WaitEventManager, [{
      key: "clickTarget",
      get: function get() {
        return this.parent.clickTarget;
      },
      set: function set(value) {
        this.parent.clickTarget = value;
      }
    }, {
      key: "cameraTarget",
      get: function get() {
        return this.parent.cameraTarget;
      },
      set: function set(value) {
        this.parent.cameraTarget = value;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.setClickTarget();
        this.setCameraTarget();
        _get(_getPrototypeOf(WaitEventManager.prototype), "destroy", this).call(this);
      }
    }, {
      key: "scene",
      get: function get() {
        return this.parent.managersScene;
      }
    }]);
    return WaitEventManager;
  }(WaitEvent$1);
  var Methods$5 = {
    waitAny: WaitAny$1
  };
  Object.assign(WaitEventManager.prototype, WaitTimeMethods, WaitInputMethods, WaitGameObjectMethods, WaitCameraMethods, WaitMusicMethods, Methods$5);

  var GetValue$e = Phaser.Utils.Objects.GetValue;
  var InitManagers = function InitManagers(scene, config) {
    this.clickTarget = undefined;
    this.cameraTarget = undefined;
    this.managersScene = scene;
    this.gameObjectManagers = {};
    var layerNames = GetValue$e(config, 'layers', false);
    if (layerNames !== false) {
      var layerManager = new LayerManager(scene, {
        layers: layerNames,
        rootLayer: GetValue$e(config, 'rootLayer', undefined),
        depth: GetValue$e(config, 'layerDepth', undefined)
      });
      this.gameObjectManagers.layer = layerManager;
      this.layerManager = layerManager;
    }
    var soundManagerConfig = GetValue$e(config, 'sounds');
    if (soundManagerConfig !== false) {
      this.soundManager = new SoundManager(scene, soundManagerConfig);
    }
    this.timeline = new Timeline(this);
    this.waitEventManager = new WaitEventManager(this, config);
    return this;
  };

  var SetTimeScale = function SetTimeScale(value) {
    this.timeline.timeScale = value;
    for (var name in this.gameObjectManagers) {
      this.gameObjectManagers[name].setTimeScale(value);
    }
    return this;
  };

  var GetTimeScale = function GetTimeScale() {
    return this.timeline.timeScale;
  };

  var DestroyManagers = function DestroyManagers(fromScene) {
    this.waitEventManager.destroy();
    this.waitEventManager = undefined;

    // Destroy layerManager at last
    delete this.gameObjectManagers.layer;
    for (var name in this.gameObjectManagers) {
      this.gameObjectManagers[name].destroy(fromScene);
      delete this.gameObjectManagers[name];
    }
    if (this.layerManager) {
      this.layerManager.destroy(fromScene);
      this.layerManager = undefined;
    }
    if (this.soundManager) {
      this.soundManager.destroy();
      this.soundManager = undefined;
    }
    if (this.timeline) {
      this.timeline.destroy();
      this.timeline = undefined;
    }
    this.clickTarget = undefined;
    this.cameraTarget = undefined;
    this.managersScene = undefined;
  };

  var GameObjectManagerMethods$1 = {
    addGameObjectManager: function addGameObjectManager(config, GameObjectManagerClass) {
      if (config === undefined) {
        config = {};
      }
      if (GameObjectManagerClass === undefined) {
        GameObjectManagerClass = GOManager;
      }
      if (!config.createGameObjectScope) {
        config.createGameObjectScope = this;
      }
      var gameobjectManager = new GameObjectManagerClass(this.managersScene, config);
      this.gameObjectManagers[config.name] = gameobjectManager;
      return this;
    },
    getGameObjectManager: function getGameObjectManager(managerName, gameObjectName) {
      if (managerName) {
        var manager = this.gameObjectManagers[managerName];
        return manager;
      } else {
        for (var managerName in this.gameObjectManagers) {
          var manager = this.gameObjectManagers[managerName];
          if (manager.has(gameObjectName)) {
            return manager;
          }
        }
      }
    },
    getGameObjectManagerNames: function getGameObjectManagerNames() {
      var names = [];
      for (var name in this.gameObjectManagers) {
        names.push(name);
      }
      return names;
    },
    getGameObjectManagerName: function getGameObjectManagerName(gameObjectName) {
      for (var managerName in this.gameObjectManagers) {
        if (this.gameObjectManagers[managerName].has(gameObjectName)) {
          return managerName;
        }
      }
    },
    hasGameObjectMananger: function hasGameObjectMananger(managerName) {
      return managerName in this.gameObjectManagers;
    }
  };

  var GameObjectMethods = {
    createGameObject: function createGameObject(goType, name) {
      var _this$getGameObjectMa;
      for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        params[_key - 2] = arguments[_key];
      }
      (_this$getGameObjectMa = this.getGameObjectManager(goType, name)).add.apply(_this$getGameObjectMa, [name].concat(params));
      return this;
    },
    destroyGameObject: function destroyGameObject(goType, name) {
      var gameObjectManager = this.getGameObjectManager(goType, name);
      if (name === undefined) {
        gameObjectManager.removeAll();
      } else {
        gameObjectManager.remove(name);
      }
      return this;
    },
    hasGameObject: function hasGameObject(goType, name) {
      return !!this.getGameObjectManager(goType, name);
    },
    callGameObjectMethod: function callGameObjectMethod(goType, name, methodName) {
      var _this$getGameObjectMa2;
      for (var _len2 = arguments.length, params = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        params[_key2 - 3] = arguments[_key2];
      }
      (_this$getGameObjectMa2 = this.getGameObjectManager(goType, name)).call.apply(_this$getGameObjectMa2, [name, methodName].concat(params));
      return this;
    },
    setGameObjectProperty: function setGameObjectProperty(goType, name, prop, value) {
      this.getGameObjectManager(goType, name).setProperty(name, prop, value);
      return this;
    },
    easeGameObjectProperty: function easeGameObjectProperty(goType, name, prop, value, duration, ease, repeat, isYoyo) {
      this.getGameObjectManager(goType, name).easeProperty(name, prop, value, duration, ease, repeat, isYoyo);
      return this;
    },
    getGameObjectTweenTask: function getGameObjectTweenTask(goType, name, property) {
      return this.getGameObjectManager(goType, name).getTweenTask(name, property);
    },
    getGameObject: function getGameObject(goType, name, out) {
      var gameobjectManager = this.getGameObjectManager(goType, name);
      if (typeof name === 'string') {
        return gameobjectManager.getGO(name);
      } else {
        var names = name;
        if (names === undefined) {
          names = gameobjectManager.bobs;
        }
        if (out === undefined) {
          out = {};
        }
        for (name in names) {
          out[name] = gameobjectManager.getGO(name);
        }
        return out;
      }
    },
    addGameObject: function addGameObject(goType, name, gameObject) {
      var gameobjectManager = this.getGameObjectManager(goType, name);
      if (typeof name === 'string') {
        gameobjectManager.addGO(name, gameObject);
      } else {
        var names = name;
        for (name in names) {
          gameobjectManager.addGO(name, names[name]);
        }
      }
      return this;
    },
    drawGameObjectsBounds: function drawGameObjectsBounds(goTypes, graphics, config) {
      if (goTypes instanceof Phaser.GameObjects.Graphics) {
        config = graphics;
        graphics = goTypes;
        goTypes = undefined;
      }
      if (goTypes === undefined) {
        goTypes = this.getGameObjectManagerNames();
      }
      if (!Array.isArray(goTypes)) {
        goTypes = [goTypes];
      }
      for (var i = 0, cnt = goTypes.length; i < cnt; i++) {
        this.getGameObjectManager(goTypes[i]).drawGameObjectsBounds(graphics, config);
      }
      return this;
    }
  };

  var Extend = function Extend(BaseClass) {
    var Managers = /*#__PURE__*/function (_BaseClass) {
      _inherits(Managers, _BaseClass);
      function Managers() {
        _classCallCheck(this, Managers);
        return _callSuper(this, Managers, arguments);
      }
      return _createClass(Managers);
    }(BaseClass);
    var Methods = {
      initManagers: InitManagers,
      setTimeScale: SetTimeScale,
      getTimeScale: GetTimeScale,
      destroyManagers: DestroyManagers
    };
    Object.assign(Managers.prototype, Methods, GameObjectManagerMethods$1, GameObjectMethods);
    return Managers;
  };

  // copy from Phaser.GameObjects.Text

  var Utils = Phaser.Renderer.WebGL.Utils;
  var WebGLRenderer = function WebGLRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateTexture();
      src.dirty = false;
    }
    if (src.width === 0 || src.height === 0) {
      return;
    }
    camera.addToRenderList(src);
    var frame = src.frame;
    var width = frame.width;
    var height = frame.height;
    var getTint = Utils.getTintAppendFloatAlpha;
    var pipeline = renderer.pipelines.set(src.pipeline, src);
    var textureUnit = pipeline.setTexture2D(frame.glTexture, src);
    renderer.pipelines.preBatch(src);
    pipeline.batchTexture(src, frame.glTexture, width, height, src.x, src.y, width / src.resolution, height / src.resolution, src.scaleX, src.scaleY, src.rotation, src.flipX, src.flipY, src.scrollFactorX, src.scrollFactorY, src.displayOriginX, src.displayOriginY, 0, 0, width, height, getTint(src.tintTopLeft, camera.alpha * src._alphaTL), getTint(src.tintTopRight, camera.alpha * src._alphaTR), getTint(src.tintBottomLeft, camera.alpha * src._alphaBL), getTint(src.tintBottomRight, camera.alpha * src._alphaBR), src.tintFill, 0, 0, camera, parentMatrix, false, textureUnit);
    renderer.pipelines.postBatch(src);
  };

  // copy from Phaser.GameObjects.Text

  var CanvasRenderer = function CanvasRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateTexture();
      src.dirty = false;
    }
    if (src.width === 0 || src.height === 0) {
      return;
    }
    camera.addToRenderList(src);
    renderer.batchSprite(src, src.frame, camera, parentMatrix);
  };

  var Render = {
    renderWebGL: WebGLRenderer,
    renderCanvas: CanvasRenderer
  };

  var Color = Phaser.Display.Color;
  var CanvasMethods = {
    clear: function clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.dirty = true;
      return this;
    },
    fill: function fill(color) {
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.dirty = true;
      return this;
    },
    drawFrame: function drawFrame(key, frame, dx, dy, dWidth, dHeight, sxOffset, syOffset, sWidth, sHeight) {
      var textureFrame = this.scene.sys.textures.getFrame(key, frame);
      if (!textureFrame) {
        return this;
      }
      var frameWidth = textureFrame.cutWidth,
        frameHeight = textureFrame.cutHeight;
      if (dx === undefined) {
        dx = 0;
      }
      if (dy === undefined) {
        dy = 0;
      }
      if (dWidth === undefined) {
        dWidth = frameWidth;
      }
      if (dHeight === undefined) {
        dHeight = frameHeight;
      }
      if (sxOffset === undefined) {
        sxOffset = 0;
      }
      if (syOffset === undefined) {
        syOffset = 0;
      }
      if (sWidth === undefined) {
        sWidth = frameWidth;
      }
      if (sHeight === undefined) {
        sHeight = frameHeight;
      }
      var sx = textureFrame.cutX + sxOffset;
      var sy = textureFrame.cutY + syOffset;
      this.context.drawImage(textureFrame.source.image,
      // image
      sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      this.dirty = true;
      return this;
    },
    getDataURL: function getDataURL(type, encoderOptions) {
      return this.canvas.toDataURL(type, encoderOptions);
    },
    getPixel: function getPixel(x, y, out) {
      if (out === undefined) {
        out = new Color();
      }
      var rgb = this.context.getImageData(x, y, 1, 1);
      out.setTo(rgb.data[0], rgb.data[1], rgb.data[2], rgb.data[3]);
      return out;
    },
    setPixel: function setPixel(x, y, r, g, b, a) {
      if (typeof r !== 'number') {
        var color = r;
        r = color.red;
        g = color.green;
        b = color.blue;
        a = color.alpha;
      }
      if (a === undefined) {
        a = r !== 0 || g !== 0 || b !== 0 ? 255 : 0;
      }
      var imgData = this.context.createImageData(1, 1);
      imgData.data[0] = r;
      imgData.data[1] = g;
      imgData.data[2] = b;
      imgData.data[3] = a;
      this.context.putImageData(imgData, x, y);
      this.dirty = true;
      return this;
    }
  };

  var CopyCanvasToTexture = function CopyCanvasToTexture(scene, srcCanvas, key, x, y, width, height) {
    var textures = scene.sys.textures;
    var renderer = scene.renderer;
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = 0;
    }
    if (width === undefined) {
      width = srcCanvas.width;
    }
    if (height === undefined) {
      height = srcCanvas.height;
    }
    var texture;
    if (textures.exists(key)) {
      texture = textures.get(key);
    } else {
      texture = textures.createCanvas(key, width, height);
    }
    var destCanvas = texture.getSourceImage();
    if (destCanvas.width !== width) {
      destCanvas.width = width;
    }
    if (destCanvas.height !== height) {
      destCanvas.height = height;
    }
    var destCtx = destCanvas.getContext('2d', {
      willReadFrequently: true
    });
    destCtx.clearRect(0, 0, width, height);
    destCtx.drawImage(srcCanvas, x, y, width, height);
    if (renderer.gl && texture) {
      renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
    }
  };

  var TextureMethods = {
    updateTexture: function updateTexture(callback, scope) {
      if (callback) {
        if (scope) {
          callback.call(scope, this.canvas, this.context);
        } else {
          callback(this.canvas, this.context);
        }
      }
      if (this.canvas.width !== this.frame.width || this.canvas.height !== this.frame.height) {
        this.frame.setSize(this.canvas.width, this.canvas.height);
      }
      if (this.renderer && this.renderer.gl) {
        this.frame.source.glTexture = this.renderer.canvasToTexture(this.canvas, this.frame.source.glTexture, true);
        if (typeof WEBGL_DEBUG === "undefined" ? "undefined" : _typeof(WEBGL_DEBUG)) {
          this.frame.glTexture.spectorMetadata = {
            textureKey: 'Canvas Game Object'
          };
        }
      }
      this.dirty = false;
      var input = this.input;
      if (input && !input.customHitArea) {
        input.hitArea.width = this.width;
        input.hitArea.height = this.height;
      }
      return this;
    },
    generateTexture: function generateTexture(key, x, y, width, height) {
      var srcCanvas = this.canvas;
      if (width === undefined) {
        width = srcCanvas.width;
      } else {
        width *= this.resolution;
      }
      if (height === undefined) {
        height = srcCanvas.height;
      } else {
        height *= this.resolution;
      }
      CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);
      return this;
    },
    loadTexture: function loadTexture(key, frame) {
      var textureFrame = this.scene.sys.textures.getFrame(key, frame);
      if (!textureFrame) {
        return this;
      }
      if (this.width !== textureFrame.cutWidth || this.height !== textureFrame.cutHeight) {
        this.setSize(textureFrame.cutWidth, textureFrame.cutHeight);
      } else {
        this.clear();
      }
      this.drawFrame(key, frame);
      this.dirty = true;
      return this;
    }
  };

  var MinVersion = 60;
  var IsChecked = false;
  var CheckP3Version = function CheckP3Version(minVersion) {
    if (IsChecked) {
      return;
    }
    if (minVersion === undefined) {
      minVersion = MinVersion;
    }
    var currentVersion = parseInt(Phaser.VERSION.match(/\.(\d+)\./)[1]);
    if (currentVersion < minVersion) {
      console.error("Minimum supported version : 3.".concat(minVersion));
    }
    IsChecked = true;
  };

  CheckP3Version();
  var CanvasPool$1 = Phaser.Display.Canvas.CanvasPool;
  var GameObject$1 = Phaser.GameObjects.GameObject;
  var UUID = Phaser.Utils.String.UUID;
  var Canvas = /*#__PURE__*/function (_GameObject) {
    _inherits(Canvas, _GameObject);
    function Canvas(scene, x, y, width, height) {
      var _this;
      _classCallCheck(this, Canvas);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (width === undefined) {
        width = 1;
      }
      if (height === undefined) {
        height = 1;
      }
      _this = _callSuper(this, Canvas, [scene, 'rexCanvas']);
      _this.renderer = scene.sys.game.renderer;
      _this.resolution = 1;
      _this._width = width;
      _this._height = height;
      width = Math.max(Math.ceil(width * _this.resolution), 1);
      height = Math.max(Math.ceil(height * _this.resolution), 1);
      _this.canvas = CanvasPool$1.create(_assertThisInitialized(_this), width, height);
      _this.context = _this.canvas.getContext('2d', {
        willReadFrequently: true
      });
      _this.dirty = false;
      _this.setPosition(x, y);
      _this.setOrigin(0.5, 0.5);
      _this.initPipeline();
      _this.initPostPipeline(true);
      _this._crop = _this.resetCropObject();

      //  Create a Texture for this Text object
      _this._textureKey = UUID();
      _this.texture = scene.sys.textures.addCanvas(_this._textureKey, _this.canvas);

      //  Get the frame
      _this.frame = _this.texture.get();

      //  Set the resolution
      _this.frame.source.resolution = _this.resolution;
      if (_this.renderer && _this.renderer.gl) {
        //  Clear the default 1x1 glTexture, as we override it later
        _this.renderer.deleteTexture(_this.frame.source.glTexture);
        _this.frame.source.glTexture = null;
      }
      _this.dirty = true;
      return _this;
    }
    _createClass(Canvas, [{
      key: "preDestroy",
      value: function preDestroy() {
        CanvasPool$1.remove(this.canvas);
        this.canvas = null;
        this.context = null;
        var texture = this.texture;
        if (texture) {
          texture.destroy();
        }
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this.setSize(value, this._height);
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this.setSize(this._width, value);
      }
    }, {
      key: "setCanvasSize",
      value: function setCanvasSize(width, height) {
        if (this._width === width && this._height === height) {
          return this;
        }
        this._width = width;
        this._height = height;
        this.updateDisplayOrigin();
        width = Math.max(Math.ceil(width * this.resolution), 1);
        height = Math.max(Math.ceil(height * this.resolution), 1);
        this.canvas.width = width;
        this.canvas.height = height;
        this.frame.setSize(width, height);
        this.dirty = true;
        return this;
      }

      // setSize might be override
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.setCanvasSize(width, height);
        return this;
      }
    }, {
      key: "displayWidth",
      get: function get() {
        return this.scaleX * this._width;
      },
      set: function set(value) {
        this.scaleX = value / this._width;
      }
    }, {
      key: "displayHeight",
      get: function get() {
        return this.scaleY * this._height;
      },
      set: function set(value) {
        this.scaleY = value / this._height;
      }
    }, {
      key: "setDisplaySize",
      value: function setDisplaySize(width, height) {
        this.displayWidth = width;
        this.displayHeight = height;
        return this;
      }
    }, {
      key: "getCanvas",
      value: function getCanvas(readOnly) {
        if (!readOnly) {
          this.dirty = true;
        }
        return this.canvas;
      }
    }, {
      key: "getContext",
      value: function getContext(readOnly) {
        if (!readOnly) {
          this.dirty = true;
        }
        return this.context;
      }
    }, {
      key: "needRedraw",
      value: function needRedraw() {
        this.dirty = true;
        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        this.setSize(width, height);
        return this;
      }
    }]);
    return Canvas;
  }(GameObject$1);
  var Components = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Canvas, [Components.Alpha, Components.BlendMode, Components.Crop, Components.Depth, Components.Flip, Components.GetBounds, Components.Mask, Components.Origin, Components.Pipeline, Components.PostPipeline, Components.ScrollFactor, Components.Tint, Components.Transform, Components.Visible, Render, CanvasMethods, TextureMethods]);

  var GetValue$d = Phaser.Utils.Objects.GetValue;
  var GetPadding$1 = function GetPadding(padding, key) {
    if (key === undefined) {
      return padding;
    }
    return padding[key];
  };
  var SetPadding$1 = function SetPadding(padding, key, value) {
    if (padding === undefined) {
      padding = {};
    }
    if (key === undefined) {
      key = 0;
    }
    var keyType = _typeof(key);
    if (keyType === 'string') {
      padding[key] = value;
    } else if (keyType === 'number') {
      padding.left = key;
      padding.right = key;
      padding.top = key;
      padding.bottom = key;
    } else {
      padding.left = GetValue$d(key, 'left', 0);
      padding.right = GetValue$d(key, 'right', 0);
      padding.top = GetValue$d(key, 'top', 0);
      padding.bottom = GetValue$d(key, 'bottom', 0);
    }
    return padding;
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

  var DataMethods = {
    enableData: function enableData() {
      if (this.data === undefined) {
        this.data = {};
      }
      return this;
    },
    setData: function setData(key, value) {
      this.enableData();
      if (arguments.length === 1) {
        var data = key;
        for (key in data) {
          this.data[key] = data[key];
        }
      } else {
        this.data[key] = value;
      }
      return this;
    },
    getData: function getData(key, defaultValue) {
      this.enableData();
      return key === undefined ? this.data : GetValue$f(this.data, key, defaultValue);
    },
    incData: function incData(key, inc, defaultValue) {
      if (defaultValue === undefined) {
        defaultValue = 0;
      }
      this.enableData();
      this.setData(key, this.getData(key, defaultValue) + inc);
      return this;
    },
    mulData: function mulData(key, mul, defaultValue) {
      if (defaultValue === undefined) {
        defaultValue = 0;
      }
      this.enableData();
      this.setData(key, this.getData(key, defaultValue) * mul);
      return this;
    },
    clearData: function clearData() {
      if (this.data) {
        Clear(this.data);
      }
      return this;
    }
  };

  var Base = /*#__PURE__*/function () {
    function Base(parent, type) {
      _classCallCheck(this, Base);
      this.setParent(parent);
      this.type = type;
      this.renderable = false;
      this.reset().setActive();
    }
    _createClass(Base, [{
      key: "destroy",
      value: function destroy() {
        this.parent.removeChild(this);
      }
    }, {
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent;
        return this;
      }
    }, {
      key: "scene",
      get: function get() {
        return this.parent.scene;
      }
    }, {
      key: "canvas",
      get: function get() {
        return this.parent ? this.parent.canvas : null;
      }
    }, {
      key: "context",
      get: function get() {
        return this.parent ? this.parent.context : null;
      }
    }, {
      key: "setDirty",
      value: function setDirty(dirty) {
        if (dirty && this.parent) {
          this.parent.dirty = true;
        }
        return this;
      }
    }, {
      key: "active",
      get: function get() {
        return this._active;
      },
      set: function set(value) {
        this.setDirty(this._active != value);
        this._active = value;
      }
    }, {
      key: "setActive",
      value: function setActive(active) {
        if (active === undefined) {
          active = true;
        }
        this.active = active;
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        return this;
      }

      // Override
    }, {
      key: "onFree",
      value: function onFree() {
        this.reset().setParent();
      }

      // Override
    }, {
      key: "reset",
      value: function reset() {
        return this;
      }

      // Override
    }, {
      key: "render",
      value: function render() {}

      // Override
    }, {
      key: "contains",
      value: function contains(x, y) {
        return false;
      }
    }]);
    return Base;
  }();
  Object.assign(Base.prototype, DataMethods);

  var RenderMethods = {
    // Override
    renderContent: function renderContent() {},
    // Override
    render: function render() {
      if (!this.willRender) {
        return this;
      }
      var context = this.context;
      context.save();
      context.globalAlpha = this.alpha;
      if (this.toLocalPosition) {
        var x = this.drawX,
          y = this.drawY;
        if (this.autoRound) {
          x = Math.round(x);
          y = Math.round(y);
        }
        context.translate(x, y);
        context.scale(this.scaleX, this.scaleY);
        context.rotate(this.rotation);
      }
      if (this.drawBelowCallback) {
        this.drawBelowCallback(this);
      }
      this.renderContent();
      if (this.drawAboveCallback) {
        this.drawAboveCallback(this);
      }
      context.restore();
      return this;
    }
  };

  var RotateAround$1 = Phaser.Math.RotateAround;
  var CanvasPositionToBobPosition = function CanvasPositionToBobPosition(canvasX, canvasY, bob, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      if (globPoint$1 === undefined) {
        globPoint$1 = {};
      }
      out = globPoint$1;
    }
    out.x = (canvasX - bob.drawX) / bob.scaleX;
    out.y = (canvasY - bob.drawY) / bob.scaleY;
    if (bob.rotation !== 0) {
      RotateAround$1(out, 0, 0, -bob.rotation);
    }
    return out;
  };
  var globPoint$1;

  var Rectangle = Phaser.Geom.Rectangle;
  var Contains = function Contains(canvasX, canvasY) {
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    var bobPosition = CanvasPositionToBobPosition(canvasX, canvasY, this, true);
    return GetBobBounds(this).contains(bobPosition.x, bobPosition.y);
  };
  var GetBobBounds = function GetBobBounds(bob) {
    if (bobBounds === undefined) {
      bobBounds = new Rectangle();
    }
    var x = bob.drawTLX,
      y = bob.drawTLY;
    bobBounds.setTo(x, y, bob.drawTRX - x, bob.drawBLY - y);
    return bobBounds;
  };
  var bobBounds;

  var RotateAround = Phaser.Math.RotateAround;
  var BobPositionToCanvasPosition = function BobPositionToCanvasPosition(bob, bobX, bobY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      if (globPoint === undefined) {
        globPoint = {};
      }
      out = globPoint;
    }
    out.x = bobX;
    out.y = bobY;
    if (bob.rotation !== 0) {
      RotateAround(out, 0, 0, bob.rotation);
    }
    out.x = out.x * bob.scaleX + bob.drawX;
    out.y = out.y * bob.scaleY + bob.drawY;
    return out;
  };
  var globPoint;

  var TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
  var GameObjectLocalXYToWorldXY = function GameObjectLocalXYToWorldXY(gameObject, localX, localY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globOut;
    }
    var px = localX - gameObject.width * gameObject.originX;
    var py = localY - gameObject.height * gameObject.originY;
    if (tempMatrix === undefined) {
      tempMatrix = new TransformMatrix();
      parentMatrix = new TransformMatrix();
    }
    if (gameObject.parentContainer) {
      gameObject.getWorldTransformMatrix(tempMatrix, parentMatrix);
    } else {
      tempMatrix.applyITRS(gameObject.x, gameObject.y, gameObject.rotation, gameObject.scaleX, gameObject.scaleY);
    }
    tempMatrix.transformPoint(px, py, out);
    return out;
  };
  var tempMatrix, parentMatrix;
  var globOut = {};

  var BobPositionToWorldPosition = function BobPositionToWorldPosition(dynamicText, bob, bobX, bobY, out) {
    var localXY = BobPositionToCanvasPosition(bob, bobX, bobY, true);
    var worldXY = GameObjectLocalXYToWorldXY(dynamicText, localXY.x, localXY.y, out);
    return worldXY;
  };

  var GetBobWorldPosition = function GetBobWorldPosition(dynamicText, bob, offsetX, offsetY, out) {
    if (typeof offsetX !== 'number') {
      out = offsetX;
      offsetX = 0;
      offsetY = 0;
    }
    var bobX = bob.drawCenterX + offsetX;
    var bobY = bob.drawCenterY + offsetY;
    return BobPositionToWorldPosition(dynamicText, bob, bobX, bobY, out);
  };

  var GetWorldPosition = function GetWorldPosition(offsetX, offsetY, out) {
    return GetBobWorldPosition(this.parent, this, offsetX, offsetY, out);
  };

  var Methods$4 = {
    contains: Contains,
    getWorldPosition: GetWorldPosition
  };
  Object.assign(Methods$4, RenderMethods);

  var DegToRad$2 = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
  var GetValue$c = Phaser.Utils.Objects.GetValue;
  var RenderBase = /*#__PURE__*/function (_Base) {
    _inherits(RenderBase, _Base);
    function RenderBase(parent, type) {
      var _this;
      _classCallCheck(this, RenderBase);
      _this = _callSuper(this, RenderBase, [parent, type]);
      _this.renderable = true;
      _this.scrollFactorX = 1;
      _this.scrollFactorY = 1;
      _this.toLocalPosition = true;
      _this.originX = 0;
      _this.offsetX = 0; // Override
      _this.offsetY = 0; // Override
      return _this;
    }
    _createClass(RenderBase, [{
      key: "visible",
      get: function get() {
        return this._visible;
      },
      set: function set(value) {
        this.setDirty(this._visible != value);
        this._visible = value;
      }
    }, {
      key: "setVisible",
      value: function setVisible(visible) {
        if (visible === undefined) {
          visible = true;
        }
        this.visible = visible;
        return this;
      }
    }, {
      key: "alpha",
      get: function get() {
        return this._alpha;
      },
      set: function set(value) {
        this.setDirty(this._alpha != value);
        this._alpha = value;
      }
    }, {
      key: "setAlpha",
      value: function setAlpha(alpha) {
        this.alpha = alpha;
        return this;
      }
    }, {
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        this.setDirty(this._x != value);
        this._x = value;
      }
    }, {
      key: "setX",
      value: function setX(x) {
        this.x = x;
        return this;
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        this.setDirty(this._y != value);
        this._y = value;
      }
    }, {
      key: "setY",
      value: function setY(y) {
        this.y = y;
        return this;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "setInitialPosition",
      value: function setInitialPosition(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
      }
    }, {
      key: "setScrollFactorX",
      value: function setScrollFactorX(x) {
        this.scrollFactorX = x;
        return this;
      }
    }, {
      key: "setScrollFactorY",
      value: function setScrollFactorY(y) {
        this.scrollFactorY = y;
        return this;
      }
    }, {
      key: "setScrollFactor",
      value: function setScrollFactor(x, y) {
        if (y === undefined) {
          y = x;
        }
        this.scrollFactorX = x;
        this.scrollFactorY = y;
        return this;
      }
    }, {
      key: "rotation",
      get: function get() {
        return this._rotation;
      },
      set: function set(value) {
        this.setDirty(this._rotation != value);
        this._rotation = value;
      }
    }, {
      key: "setRotation",
      value: function setRotation(rotation) {
        this.rotation = rotation;
        return this;
      }
    }, {
      key: "angle",
      get: function get() {
        return RadToDeg(this._rotation);
      },
      set: function set(value) {
        this.rotation = DegToRad$2(value);
      }
    }, {
      key: "setAngle",
      value: function setAngle(angle) {
        this.angle = angle;
        return this;
      }
    }, {
      key: "scaleX",
      get: function get() {
        return this._scaleX;
      },
      set: function set(value) {
        this.setDirty(this._scaleX !== value);
        this._scaleX = value;
      }
    }, {
      key: "setScaleX",
      value: function setScaleX(scaleX) {
        this.scaleX = scaleX;
        return this;
      }

      // Override
    }, {
      key: "width",
      get: function get() {
        return 0;
      }

      // Override
      ,
      set: function set(value) {}
    }, {
      key: "setWidth",
      value: function setWidth(width, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }
        this.width = width;
        if (keepAspectRatio) {
          this.scaleY = this.scaleX;
        }
        return this;
      }
    }, {
      key: "leftSpace",
      get: function get() {
        return this._leftSpace;
      },
      set: function set(value) {
        this.setDirty(this._leftSpace !== value);
        this._leftSpace = value;
      }
    }, {
      key: "setLeftSpace",
      value: function setLeftSpace(value) {
        this.leftSpace = value;
        return this;
      }
    }, {
      key: "rightSpace",
      get: function get() {
        return this._rightSpace;
      },
      set: function set(value) {
        this.setDirty(this._rightSpace !== value);
        this._rightSpace = value;
      }
    }, {
      key: "setRightSpace",
      value: function setRightSpace(value) {
        this.rightSpace = value;
        return this;
      }
    }, {
      key: "outerWidth",
      get: function get() {
        return this.width + this.leftSpace + this.rightSpace;
      }
    }, {
      key: "scaleY",
      get: function get() {
        return this._scaleY;
      },
      set: function set(value) {
        this.setDirty(this._scaleY !== value);
        this._scaleY = value;
      }
    }, {
      key: "setScaleY",
      value: function setScaleY(scaleY) {
        this.scaleY = scaleY;
        return this;
      }

      // Override
    }, {
      key: "height",
      get: function get() {
        return 0;
      }

      // Override
      ,
      set: function set(value) {}
    }, {
      key: "setHeight",
      value: function setHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }
        this.height = height;
        if (keepAspectRatio) {
          this.scaleX = this.scaleY;
        }
        return this;
      }
    }, {
      key: "setScale",
      value: function setScale(scaleX, scaleY) {
        if (scaleY === undefined) {
          scaleY = scaleX;
        }
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
      }
    }, {
      key: "setOrigin",
      value: function setOrigin(x) {
        this.originX = x;
        return this;
      }
    }, {
      key: "setAlign",
      value: function setAlign(align) {
        this.align = align;
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        if (!o) {
          return this;
        }
        if (o.hasOwnProperty('x')) {
          this.setX(o.x);
        }
        if (o.hasOwnProperty('y')) {
          this.setY(o.y);
        }
        if (o.hasOwnProperty('rotation')) {
          this.setRotation(o.rotation);
        } else if (o.hasOwnProperty('angle')) {
          this.setAngle(o.angle);
        }
        if (o.hasOwnProperty('alpha')) {
          this.setAlpha(o.alpha);
        }

        // ScaleX, ScaleY
        var width = GetValue$c(o, 'width', undefined);
        var height = GetValue$c(o, 'height', undefined);
        var scaleX = GetValue$c(o, 'scaleX', undefined);
        var scaleY = GetValue$c(o, 'scaleY', undefined);
        if (width !== undefined) {
          if (height === undefined && scaleY === undefined) {
            this.setWidth(width, true);
          } else {
            this.setWidth(width);
          }
        } else if (scaleX !== undefined) {
          this.setScaleX(scaleX);
        }
        if (height !== undefined) {
          if (width === undefined && scaleX === undefined) {
            this.setHeight(height, true);
          } else {
            this.setHeight(height);
          }
        } else if (scaleY !== undefined) {
          this.setScaleY(scaleY);
        }
        if (o.hasOwnProperty('leftSpace')) {
          this.setLeftSpace(o.leftSpace);
        }
        if (o.hasOwnProperty('rightSpace')) {
          this.setRightSpace(o.rightSpace);
        }
        if (o.hasOwnProperty('align')) {
          this.setAlign(o.align);
        }
        return this;
      }
    }, {
      key: "setDrawBelowCallback",
      value: function setDrawBelowCallback(callback) {
        this.drawBelowCallback = callback;
        return this;
      }
    }, {
      key: "setDrawAboveCallback",
      value: function setDrawAboveCallback(callback) {
        this.drawAboveCallback = callback;
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.setVisible().setAlpha(1).setPosition(0, 0).setRotation(0).setScale(1, 1).setLeftSpace(0).setRightSpace(0).setOrigin(0).setAlign().setDrawBelowCallback().setDrawAboveCallback();
        return this;
      }

      // Override
    }, {
      key: "willRender",
      get: function get() {
        return this.visible && this.alpha > 0;
      }
    }, {
      key: "drawX",
      get: function get() {
        var x = this.x + this.leftSpace + this.offsetX - this.originX * this.width;
        return this.parent._textOX * this.scrollFactorX + x;
      }
    }, {
      key: "drawY",
      get: function get() {
        var y = this.y + this.offsetY;
        return this.parent._textOY * this.scrollFactorY + y;
      }

      // Override
    }, {
      key: "drawTLX",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawTLY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBLX",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBLY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawTRX",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawTRY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBRX",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBRY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawCenterX",
      get: function get() {
        return (this.drawTRX + this.drawTLX) / 2;
      }
    }, {
      key: "drawCenterY",
      get: function get() {
        return (this.drawBLY + this.drawTLY) / 2;
      }
    }]);
    return RenderBase;
  }(Base);
  Object.assign(RenderBase.prototype, Methods$4);

  var Pad = Phaser.Utils.String.Pad;
  var GetStyle = function GetStyle(style, canvas, context) {
    if (style == null) {
      return style;
    }
    switch (_typeof(style)) {
      case 'string':
        return style;
      case 'number':
        return "#".concat(Pad(Math.floor(style).toString(16), 6, '0', 1));
      case 'function':
        return style(canvas, context);
      case 'object':
        if (style.hasOwnProperty('r')) {
          if (style.hasOwnProperty('a')) {
            // rgba
            return "rgba(".concat(style.r, ",").concat(style.g, ",").concat(style.b, ",").concat(style.a, ")");
          } else {
            // rgb
            return "rgb(".concat(style.r, ",").concat(style.g, ",").concat(style.b, ")");
          }
        } else if (style.hasOwnProperty('h')) {
          if (style.hasOwnProperty('a')) {
            // hsla
            return "hsla(".concat(style.h, ",").concat(style.s, ",").concat(style.l, ",").concat(style.a, ")");
          } else {
            // hsl
            return "hsl(".concat(style.h, ",").concat(style.s, ",").concat(style.l, ")");
          }
        } else {
          return style; // Not a valid input
        }
      default:
        return style;
    }
  };

  var GetProperty = function GetProperty(name, config, defaultConfig) {
    if (config.hasOwnProperty(name)) {
      return config[name];
    } else {
      return defaultConfig[name];
    }
  };

  var GetValue$b = Phaser.Utils.Objects.GetValue;
  var RoundRectangle = /*#__PURE__*/function () {
    function RoundRectangle(x, y, width, height, radiusConfig) {
      _classCallCheck(this, RoundRectangle);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = x;
      }
      if (width === undefined) {
        width = 0;
      }
      if (height === undefined) {
        height = 0;
      }
      if (radiusConfig === undefined) {
        radiusConfig = 0;
      }
      this.cornerRadius = {};
      this._width = 0;
      this._height = 0;
      this.setTo(x, y, width, height, radiusConfig);
    }
    _createClass(RoundRectangle, [{
      key: "setTo",
      value: function setTo(x, y, width, height, radiusConfig) {
        this.setPosition(x, y);
        this.setRadius(radiusConfig);
        this.setSize(width, height);
        return this;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "setRadius",
      value: function setRadius(value) {
        if (value === undefined) {
          value = 0;
        }
        this.radius = value;
        return this;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "minWidth",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
      }
    }, {
      key: "minHeight",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        if (value == null) {
          value = 0;
        }
        this._width = Math.max(value, this.minWidth);
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        if (value == null) {
          value = 0;
        }
        this._height = Math.max(value, this.minHeight);
      }
    }, {
      key: "radius",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.x, radius.tl.y, radius.tr.x, radius.tr.y, radius.bl.x, radius.bl.y, radius.br.x, radius.br.y);
      },
      set: function set(value) {
        var defaultRadiusX, defaultRadiusY;
        if (typeof value === 'number') {
          defaultRadiusX = value;
          defaultRadiusY = value;
        } else {
          defaultRadiusX = GetValue$b(value, 'x', 0);
          defaultRadiusY = GetValue$b(value, 'y', 0);
        }
        var radius = this.cornerRadius;
        radius.tl = GetRadius(GetValue$b(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
        radius.tr = GetRadius(GetValue$b(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
        radius.bl = GetRadius(GetValue$b(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
        radius.br = GetRadius(GetValue$b(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
      }
    }, {
      key: "radiusTL",
      get: function get() {
        var radius = this.cornerRadius.tl;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.tl, value);
      }
    }, {
      key: "radiusTR",
      get: function get() {
        var radius = this.cornerRadius.tr;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.tr, value);
      }
    }, {
      key: "radiusBL",
      get: function get() {
        var radius = this.cornerRadius.bl;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.bl, value);
      }
    }, {
      key: "radiusBR",
      get: function get() {
        var radius = this.cornerRadius.br;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.br, value);
      }
    }]);
    return RoundRectangle;
  }();
  var GetRadius = function GetRadius(radius, defaultRadiusX, defaultRadiusY) {
    if (radius === undefined) {
      radius = {
        x: defaultRadiusX,
        y: defaultRadiusY
      };
    } else if (typeof radius === 'number') {
      radius = {
        x: radius,
        y: radius
      };
    }
    SetConvex(radius);
    return radius;
  };
  var SetRadius = function SetRadius(radius, value) {
    if (typeof value === 'number') {
      radius.x = value;
      radius.y = value;
    } else {
      radius.x = GetValue$b(value, 'x', 0);
      radius.y = GetValue$b(value, 'y', 0);
    }
    SetConvex(radius);
  };
  var SetConvex = function SetConvex(radius) {
    radius.convex = radius.x >= 0 || radius.y >= 0;
    radius.x = Math.abs(radius.x);
    radius.y = Math.abs(radius.y);
  };

  var DegToRad$1 = Phaser.Math.DegToRad;
  var AddRoundRectanglePath = function AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration) {
    var geom = new RoundRectangle(x, y, width, height, radiusConfig),
      minWidth = geom.minWidth,
      minHeight = geom.minHeight,
      scaleRX = width >= minWidth ? 1 : width / minWidth,
      scaleRY = height >= minHeight ? 1 : height / minHeight;
    var cornerRadius = geom.cornerRadius;
    var radius, radiusX, radiusY, centerX, centerY;
    var startX, startY;
    context.save();
    context.beginPath();
    context.translate(x, y);

    // Top-left
    radius = cornerRadius.tl;
    if (IsArcCorner(radius)) {
      radiusX = radius.x * scaleRX;
      radiusY = radius.y * scaleRY;
      if (IsConvexArc(radius)) {
        centerX = radiusX;
        centerY = radiusY;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 270, false, iteration);
      } else {
        centerX = 0;
        centerY = 0;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 0, true, iteration);
      }
      startX = 0;
      startY = radiusY;
    } else {
      context.lineTo(0, 0);
      startX = 0;
      startY = 0;
    }

    // Top-right
    radius = cornerRadius.tr;
    if (IsArcCorner(radius)) {
      radiusX = radius.x * scaleRX;
      radiusY = radius.y * scaleRY;
      if (IsConvexArc(radius)) {
        centerX = width - radiusX;
        centerY = radiusY;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 360, false, iteration);
      } else {
        centerX = width;
        centerY = 0;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 90, true, iteration);
      }
    } else {
      context.lineTo(width, 0);
    }

    // Bottom-right
    radius = cornerRadius.br;
    if (IsArcCorner(radius)) {
      radiusX = radius.x * scaleRX;
      radiusY = radius.y * scaleRY;
      if (IsConvexArc(radius)) {
        centerX = width - radiusX;
        centerY = height - radiusY;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 0, 90, false, iteration);
      } else {
        centerX = width;
        centerY = height;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 180, true, iteration);
      }
    } else {
      context.lineTo(width, height);
    }

    // Bottom-left
    radius = cornerRadius.bl;
    if (IsArcCorner(radius)) {
      radiusX = radius.x * scaleRX;
      radiusY = radius.y * scaleRY;
      if (IsConvexArc(radius)) {
        centerX = radiusX;
        centerY = height - radiusY;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 180, false, iteration);
      } else {
        centerX = 0;
        centerY = height;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 360, 270, true, iteration);
      }
    } else {
      context.lineTo(0, height);
    }
    context.lineTo(startX, startY);
    context.closePath();
    context.restore();
  };
  var IsConvexArc = function IsConvexArc(radius) {
    return !radius.hasOwnProperty('convex') ||
    // radius does not have convex property
    radius.convex;
  };
  var IsArcCorner = function IsArcCorner(radius) {
    return radius.x > 0 && radius.y > 0;
  };
  var ArcTo = function ArcTo(context, centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && endAngle > startAngle) {
      endAngle -= 360;
    } else if (!antiClockWise && endAngle < startAngle) {
      endAngle += 360;
    }
    startAngle = DegToRad$1(startAngle);
    endAngle = DegToRad$1(endAngle);
    if (iteration == null) {
      // undefined, or null
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle, antiClockWise);
    } else {
      iteration += 1;
      var x, y, angle;
      var step = (endAngle - startAngle) / iteration;
      for (var i = 0; i <= iteration; i++) {
        angle = startAngle + step * i;
        x = centerX + radiusX * Math.cos(angle);
        y = centerY + radiusY * Math.sin(angle);
        context.lineTo(x, y);
      }
    }
  };

  var DrawRoundRectangle = function DrawRoundRectangle(canvas, context, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient, iteration) {
    AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration);
    if (fillStyle != null) {
      if (fillColor2 != null) {
        var grd;
        if (isHorizontalGradient) {
          grd = context.createLinearGradient(0, 0, width, 0);
        } else {
          grd = context.createLinearGradient(0, 0, 0, height);
        }
        grd.addColorStop(0, fillStyle);
        grd.addColorStop(1, fillColor2);
        fillStyle = grd;
      }
      context.fillStyle = fillStyle;
      context.fill();
    }
    if (strokeStyle != null && lineWidth > 0) {
      context.strokeStyle = strokeStyle;
      context.lineWidth = lineWidth;
      context.stroke();
    }
  };

  var DrawRoundRectangleBackground = function DrawRoundRectangleBackground(canvasObject, color, strokeColor, strokeLineWidth, radius, color2, isHorizontalGradient, iteration) {
    if (color == null && strokeColor == null) {
      return;
    }
    var width = canvasObject.canvas.width,
      height = canvasObject.canvas.height;
    if (strokeColor == null) {
      strokeLineWidth = 0;
    }
    var x = strokeLineWidth / 2;
    width = Math.max(1, width - strokeLineWidth); // Min width is 1
    height = Math.max(1, height - strokeLineWidth); // Min height is 1
    DrawRoundRectangle(canvasObject.canvas, canvasObject.context, x, x, width, height, radius, color, strokeColor, strokeLineWidth, color2, isHorizontalGradient, iteration);
  };

  var GetValue$a = Phaser.Utils.Objects.GetValue;
  var Background = /*#__PURE__*/function (_RenderBase) {
    _inherits(Background, _RenderBase);
    function Background(parent, config) {
      var _this;
      _classCallCheck(this, Background);
      _this = _callSuper(this, Background, [parent, 'background']);
      _this.setScrollFactor(0);
      _this.setColor(GetValue$a(config, 'color', null), GetValue$a(config, 'color2', null), GetValue$a(config, 'horizontalGradient', true));
      _this.setStroke(GetValue$a(config, 'stroke', null), GetValue$a(config, 'strokeThickness', 2));
      _this.setCornerRadius(GetValue$a(config, 'cornerRadius', 0), GetValue$a(config, 'cornerIteration', null));
      return _this;
    }
    _createClass(Background, [{
      key: "color",
      get: function get() {
        return this._color;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color != value);
        this._color = value;
      }
    }, {
      key: "color2",
      get: function get() {
        return this._color2;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color2 != value);
        this._color2 = value;
      }
    }, {
      key: "horizontalGradient",
      get: function get() {
        return this._horizontalGradient;
      },
      set: function set(value) {
        this.setDirty(this._horizontalGradient != value);
        this._horizontalGradient = value;
      }
    }, {
      key: "setColor",
      value: function setColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
          isHorizontalGradient = true;
        }
        this.color = color;
        this.color2 = color2;
        this.horizontalGradient = isHorizontalGradient;
        return this;
      }
    }, {
      key: "stroke",
      get: function get() {
        return this._stroke;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._stroke != value);
        this._stroke = value;
      }
    }, {
      key: "strokeThickness",
      get: function get() {
        return this._strokeThickness;
      },
      set: function set(value) {
        this.setDirty(this._strokeThickness != value);
        this._strokeThickness = value;
      }
    }, {
      key: "setStroke",
      value: function setStroke(color, lineWidth) {
        if (color != null) {
          if (lineWidth === undefined) {
            lineWidth = 2;
          }
        }
        this.stroke = color;
        this.strokeThickness = lineWidth;
        return this;
      }
    }, {
      key: "cornerRadius",
      get: function get() {
        return this._cornerRadius;
      },
      set: function set(value) {
        this.setDirty(this._cornerRadius != value);
        this._cornerRadius = value;
      }
    }, {
      key: "cornerIteration",
      get: function get() {
        return this._cornerIteration;
      },
      set: function set(value) {
        this.setDirty(this._cornerIteration != value);
        this._cornerIteration = value;
      }
    }, {
      key: "modifyStyle",
      value: function modifyStyle(o) {
        if (o.hasOwnProperty('color')) {
          this.setColor(o.color, GetProperty('color2', o, this), GetProperty('horizontalGradient', o, this));
        }
        if (o.hasOwnProperty('stroke')) {
          this.setStroke(o.stroke, GetProperty('strokeThickness', o, this));
        }
        if (o.hasOwnProperty('cornerRadius')) {
          this.setCornerRadius(o.cornerRadius, GetProperty('cornerIteration', o, this));
        }
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        _get(_getPrototypeOf(Background.prototype), "modifyPorperties", this).call(this, o);
        this.modifyStyle(o);
        return this;
      }
    }, {
      key: "setCornerRadius",
      value: function setCornerRadius(radius, iteration) {
        this.cornerRadius = radius;
        this.cornerIteration = iteration;
        return this;
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        DrawRoundRectangleBackground(this.parent, this.color, this.stroke, this.strokeThickness, this.cornerRadius, this.color2, this.horizontalGradient, this.cornerIteration);
      }
    }]);
    return Background;
  }(RenderBase);

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var InnerBounds = /*#__PURE__*/function (_RenderBase) {
    _inherits(InnerBounds, _RenderBase);
    function InnerBounds(parent, config) {
      var _this;
      _classCallCheck(this, InnerBounds);
      _this = _callSuper(this, InnerBounds, [parent, 'innerbounds']);
      _this.setScrollFactor(0);
      _this.setColor(GetValue$9(config, 'color', null), GetValue$9(config, 'color2', null), GetValue$9(config, 'horizontalGradient', true));
      _this.setStroke(GetValue$9(config, 'stroke', null), GetValue$9(config, 'strokeThickness', 2));
      return _this;
    }
    _createClass(InnerBounds, [{
      key: "color",
      get: function get() {
        return this._color;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color != value);
        this._color = value;
      }
    }, {
      key: "color2",
      get: function get() {
        return this._color2;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color2 != value);
        this._color2 = value;
      }
    }, {
      key: "horizontalGradient",
      get: function get() {
        return this._horizontalGradient;
      },
      set: function set(value) {
        this.setDirty(this._horizontalGradient != value);
        this._horizontalGradient = value;
      }
    }, {
      key: "setColor",
      value: function setColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
          isHorizontalGradient = true;
        }
        this.color = color;
        this.color2 = color2;
        this.horizontalGradient = isHorizontalGradient;
        return this;
      }
    }, {
      key: "stroke",
      get: function get() {
        return this._stroke;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._stroke != value);
        this._stroke = value;
      }
    }, {
      key: "strokeThickness",
      get: function get() {
        return this._strokeThickness;
      },
      set: function set(value) {
        this.setDirty(this._strokeThickness != value);
        this._strokeThickness = value;
      }
    }, {
      key: "setStroke",
      value: function setStroke(color, lineWidth) {
        if (color != null) {
          if (lineWidth === undefined) {
            lineWidth = 2;
          }
        }
        this.stroke = color;
        this.strokeThickness = lineWidth;
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        _get(_getPrototypeOf(InnerBounds.prototype), "modifyPorperties", this).call(this, o);
        if (o.hasOwnProperty('color')) {
          this.setColor(o.color, GetValue$9(o, 'color2', null), GetValue$9(o, 'horizontalGradient', true));
        }
        if (o.hasOwnProperty('stroke')) {
          this.setStroke(o.stroke, GetValue$9(o, 'strokeThickness', 2));
        }
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        var padding = this.parent.padding;
        var x = padding.left,
          y = padding.top,
          width = this.parent.width - padding.left - padding.right,
          height = this.parent.height - padding.top - padding.bottom;
        var context = this.context;
        if (this.color != null) {
          var fillStyle;
          if (this.color2 != null) {
            var grd;
            if (this.horizontalGradient) {
              grd = context.createLinearGradient(0, 0, width, 0);
            } else {
              grd = context.createLinearGradient(0, 0, 0, height);
            }
            grd.addColorStop(0, this.color);
            grd.addColorStop(1, this.color2);
            fillStyle = grd;
          } else {
            fillStyle = this.color;
          }
          context.fillStyle = fillStyle;
          context.fillRect(x, y, width, height);
        }
        if (this.stroke != null && this.strokeThickness > 0) {
          context.strokeStyle = this.stroke;
          context.lineWidth = this.strokeThickness;
          context.strokeRect(x, y, width, height);
        }
      }
    }]);
    return InnerBounds;
  }(RenderBase);

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var TextStyle = /*#__PURE__*/function () {
    function TextStyle(parent, config) {
      _classCallCheck(this, TextStyle);
      this.parent = parent;
      this.set(config);
    }
    _createClass(TextStyle, [{
      key: "toJSON",
      value: function toJSON() {
        return {
          bold: this.bold,
          italic: this.italic,
          fontSize: this.fontSize,
          fontFamily: this.fontFamily,
          color: this.color,
          stroke: this.stroke,
          strokeThickness: this.strokeThickness,
          shaodwColor: this.shadowColor,
          shadowBlur: this.shadowBlur,
          shadowOffsetX: this.shadowOffsetX,
          shadowOffsetY: this.shadowOffsetY,
          offsetX: this.offsetX,
          offsetY: this.offsetY,
          leftSpace: this.leftSpace,
          rightSpace: this.rightSpace,
          backgroundHeight: this.backgroundHeight,
          backgroundBottomY: this.backgroundBottomY,
          align: this.align
        };
      }
    }, {
      key: "set",
      value: function set(o) {
        this.setBold(GetValue$8(o, 'bold', false));
        this.setItalic(GetValue$8(o, 'italic', false));
        this.setFontSize(GetValue$8(o, 'fontSize', '16px'));
        this.setFontFamily(GetValue$8(o, 'fontFamily', 'Courier'));
        this.setColor(GetValue$8(o, 'color', '#fff'));
        this.setStrokeStyle(GetValue$8(o, 'stroke', null), GetValue$8(o, 'strokeThickness', 0));
        this.setShadow(GetValue$8(o, 'shadowColor', null), GetValue$8(o, 'shadowOffsetX', 0), GetValue$8(o, 'shadowOffsetY', 0), GetValue$8(o, 'shadowBlur', 0));
        this.setOffset(GetValue$8(o, 'offsetX', 0), GetValue$8(o, 'offsetY', 0));
        this.setSpace(GetValue$8(o, 'leftSpace', 0), GetValue$8(o, 'rightSpace', 0));
        this.setAlign(GetValue$8(o, 'align', undefined));
        this.setBackgroundColor(GetValue$8(o, 'backgroundColor', null));
        this.setBackgroundHeight(GetValue$8(o, 'backgroundHeight', undefined));
        this.setBackgroundBottomY(GetValue$8(o, 'backgroundBottomY', undefined));
        return this;
      }
    }, {
      key: "modify",
      value: function modify(o) {
        if (o.hasOwnProperty('bold')) {
          this.setBold(o.bold);
        }
        if (o.hasOwnProperty('italic')) {
          this.setItalic(o.italic);
        }
        if (o.hasOwnProperty('fontSize')) {
          this.setFontSize(o.fontSize);
        }
        if (o.hasOwnProperty('fontFamily')) {
          this.setFontFamily(o.fontFamily);
        }
        if (o.hasOwnProperty('color')) {
          this.setColor(o.color);
        }
        if (o.hasOwnProperty('stroke') || o.hasOwnProperty('strokeThickness')) {
          this.setStrokeStyle(GetProperty('stroke', o, this), GetProperty('strokeThickness', o, this));
        }
        if (o.hasOwnProperty('shadowColor')) {
          this.setShadowColor(o.shadowColor);
        }
        if (o.hasOwnProperty('shadowOffsetX') || o.hasOwnProperty('shadowOffsetY')) {
          this.setShadowOffset(GetProperty('shadowOffsetX', o, this), GetProperty('shadowOffsetY', o, this));
        }
        if (o.hasOwnProperty('shadowBlur')) {
          this.setShadowBlur(o.shaodwBlur);
        }
        if (o.hasOwnProperty('offsetX')) {
          this.setOffsetX(o.offsetX);
        }
        if (o.hasOwnProperty('offsetY')) {
          this.setOffsetY(o.offsetY);
        }
        if (o.hasOwnProperty('leftSpace')) {
          this.setLeftSpace(o.leftSpace);
        }
        if (o.hasOwnProperty('rightSpace')) {
          this.setRightSpace(o.rightSpace);
        }
        if (o.hasOwnProperty('align')) {
          this.setAlign(o.align);
        }
        if (o.hasOwnProperty('backgroundColor')) {
          this.setBackgroundColor(o.backgroundColor);
        }
        if (o.hasOwnProperty('backgroundHeight')) {
          this.setBackgroundHeight(o.backgroundHeight);
        }
        if (o.hasOwnProperty('backgroundBottomY')) {
          this.setBackgroundBottomY(o.backgroundBottomY);
        }
        return this;
      }
    }, {
      key: "setUpdateTextFlag",
      value: function setUpdateTextFlag() {
        if (this.parent) {
          this.parent.updateTextFlag = true;
        }
        return this;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new TextStyle(null, this.toJSON());
      }
    }, {
      key: "copyFrom",
      value: function copyFrom(sourceTextStyle) {
        this.set(sourceTextStyle.toJSON());
        return this;
      }
    }, {
      key: "copyTo",
      value: function copyTo(targetTextStyle) {
        targetTextStyle.set(this.toJSON());
        return this;
      }
    }, {
      key: "setBold",
      value: function setBold(value) {
        if (value === undefined) {
          value = true;
        }
        this.bold = value;
        this.setUpdateTextFlag();
        return this;
      }
    }, {
      key: "setItalic",
      value: function setItalic(value) {
        if (value === undefined) {
          value = true;
        }
        this.italic = value;
        this.setUpdateTextFlag();
        return this;
      }
    }, {
      key: "fontStyle",
      get: function get() {
        if (this.bold && this.italic) {
          return 'bold italic';
        } else if (this.bold) {
          return 'bold';
        } else if (this.italic) {
          return 'italic';
        } else {
          return '';
        }
      }
    }, {
      key: "setFontSize",
      value: function setFontSize(fontSize) {
        if (typeof fontSize === 'number') {
          fontSize = "".concat(fontSize, "px");
        }
        this.fontSize = fontSize;
        this.setUpdateTextFlag();
        return this;
      }
    }, {
      key: "setFontFamily",
      value: function setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        this.setUpdateTextFlag();
        return this;
      }
    }, {
      key: "font",
      get: function get() {
        return "".concat(this.fontStyle, " ").concat(this.fontSize, " ").concat(this.fontFamily);
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        this.color = GetStyle(color);
        return this;
      }
    }, {
      key: "hasFill",
      get: function get() {
        return this.color != null;
      }
    }, {
      key: "setStrokeStyle",
      value: function setStrokeStyle(stroke, strokeThickness) {
        this.stroke = GetStyle(stroke);
        if (strokeThickness !== undefined) {
          this.strokeThickness = strokeThickness;
        }
        return this;
      }
    }, {
      key: "setStrokeThickness",
      value: function setStrokeThickness(strokeThickness) {
        this.strokeThickness = strokeThickness;
        return this;
      }
    }, {
      key: "hasStroke",
      get: function get() {
        return this.stroke != null && this.strokeThickness > 0;
      }
    }, {
      key: "setShadowColor",
      value: function setShadowColor(color) {
        this.shadowColor = GetStyle(color);
        return this;
      }
    }, {
      key: "setShadowOffset",
      value: function setShadowOffset(offsetX, offsetY) {
        if (offsetX === undefined) {
          offsetX = 0;
        }
        if (offsetY === undefined) {
          offsetY = 0;
        }
        this.shadowOffsetX = offsetX;
        this.shadowOffsetY = offsetY;
        return this;
      }
    }, {
      key: "setShadowBlur",
      value: function setShadowBlur(blur) {
        if (blur === undefined) {
          blur = 0;
        }
        this.shaodwBlur = blur;
        return this;
      }
    }, {
      key: "setShadow",
      value: function setShadow(color, offsetX, offsetY, blur) {
        this.setShadowColor(color).setShadowOffset(offsetX, offsetY).setShadowBlur(blur);
        return this;
      }
    }, {
      key: "setBackgroundColor",
      value: function setBackgroundColor(color) {
        this.backgroundColor = GetStyle(color);
        return this;
      }
    }, {
      key: "hasBackgroundColor",
      get: function get() {
        return this.backgroundColor != null;
      }
    }, {
      key: "setBackgroundHeight",
      value: function setBackgroundHeight(height) {
        this.backgroundHeight = height;
        return this;
      }
    }, {
      key: "setBackgroundBottomY",
      value: function setBackgroundBottomY(y) {
        this.backgroundBottomY = y;
        return this;
      }
    }, {
      key: "setOffsetX",
      value: function setOffsetX(offsetX) {
        if (offsetX === undefined) {
          offsetX = 0;
        }
        this.offsetX = offsetX;
        return this;
      }
    }, {
      key: "setOffsetY",
      value: function setOffsetY(offsetY) {
        if (offsetY === undefined) {
          offsetY = 0;
        }
        this.offsetY = offsetY;
        return this;
      }
    }, {
      key: "setOffset",
      value: function setOffset(offsetX, offsetY) {
        this.setOffsetX(offsetX).setOffsetY(offsetY);
        return this;
      }
    }, {
      key: "setLeftSpace",
      value: function setLeftSpace(space) {
        if (space === undefined) {
          space = 0;
        }
        this.leftSpace = space;
        return this;
      }
    }, {
      key: "setRightSpace",
      value: function setRightSpace(space) {
        if (space === undefined) {
          space = 0;
        }
        this.rightSpace = space;
        return this;
      }
    }, {
      key: "setSpace",
      value: function setSpace(leftSpace, rightSpace) {
        this.setLeftSpace(leftSpace).setRightSpace(rightSpace);
        return this;
      }
    }, {
      key: "setAlign",
      value: function setAlign(align) {
        this.align = align;
        return this;
      }
    }, {
      key: "syncFont",
      value: function syncFont(context) {
        context.font = this.font;
        return this;
      }
    }, {
      key: "syncStyle",
      value: function syncStyle(context) {
        context.textBaseline = 'alphabetic';
        var hasFill = this.hasFill;
        var hasStroke = this.hasStroke;
        context.fillStyle = hasFill ? this.color : '#000';
        context.strokeStyle = hasStroke ? this.stroke : '#000';
        context.lineWidth = hasStroke ? this.strokeThickness : 0;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        return this;
      }
    }, {
      key: "syncShadow",
      value: function syncShadow(context) {
        if (context.shadowColor != null) {
          context.shadowColor = this.shadowColor;
          context.shadowOffsetX = this.shadowOffsetX;
          context.shadowOffsetY = this.shadowOffsetY;
          context.shadowBlur = this.shadowBlur;
        } else {
          context.shadowColor = 0;
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.shadowBlur = 0;
        }
      }
    }, {
      key: "getTextMetrics",
      value: function getTextMetrics(context, text) {
        this.syncFont(context).syncStyle(context);
        return context.measureText(text);
      }
    }]);
    return TextStyle;
  }();

  var SetFixedSize = function SetFixedSize(width, height) {
    if (width === undefined) {
      width = 0;
    }
    if (height === undefined) {
      height = 0;
    }
    if (this.fixedWidth === width && this.fixedHeight === height) {
      return this;
    }
    this.fixedWidth = width;
    this.fixedHeight = height;
    this.dirty = true; // -> this.updateTexture();

    this.setCanvasSize(width > 0 ? width : this.width, height > 0 ? height : this.height);
    return this;
  };

  var SetPadding = function SetPadding(key, value) {
    var padding = this.padding;
    var paddingLeft = padding.left,
      paddingRight = padding.right,
      paddingTop = padding.top,
      paddingBottom = padding.bottom;
    SetPadding$1(padding, key, value);
    this.dirty = this.dirty || paddingLeft != padding.left || paddingRight != padding.right || paddingTop != padding.top || paddingBottom != padding.bottom;
    return this;
  };

  var GetPadding = function GetPadding(key) {
    return GetPadding$1(this.padding, key);
  };

  var ModifyTextStyle = function ModifyTextStyle(style) {
    this.textStyle.modify(style);
    return this;
  };

  var ModifyDefaultTextStyle = function ModifyDefaultTextStyle(style) {
    this.defaultTextStyle.modify(style);
    return this;
  };

  var ResetTextStyle = function ResetTextStyle() {
    this.textStyle.copyFrom(this.defaultTextStyle);
    return this;
  };

  var SetTestString = function SetTestString(testString) {
    this.testString = testString;
    return this;
  };

  var RemoveItem$1 = Phaser.Utils.Array.Remove;
  var RemoveChild = function RemoveChild(child) {
    this.poolManager.free(child);
    RemoveItem$1(this.children, child);
    this.lastAppendedChildren.length = 0;
    this.lastOverChild = null;
    this.dirty = true;
    return this;
  };

  var RemoveChildren = function RemoveChildren() {
    this.poolManager.freeMultiple(this.children);
    this.children.length = 0;
    this.lastAppendedChildren.length = 0;
    this.lastOverChild = null;
    this.dirty = true;
    return this;
  };

  var RemoveItem = Phaser.Utils.Array.Remove;
  var PopChild = function PopChild(child) {
    RemoveItem(this.children, child);
    this.lastAppendedChildren.length = 0;
    this.lastOverChild = null;
    this.dirty = true;
    return this;
  };

  var ClearContent = function ClearContent() {
    this.setText();
    return this;
  };

  // const RemoveItem = Phaser.Utils.Array.Remove;

  var AddChild = function AddChild(child, index) {
    var areChildren = Array.isArray(child);

    // Remove existed child(s)
    // RemoveItem(this.children, child);

    if (index === undefined || index === this.children.length) {
      if (areChildren) {
        var _this$children;
        (_this$children = this.children).push.apply(_this$children, _toConsumableArray(child));
      } else {
        this.children.push(child);
      }
    } else {
      if (areChildren) {
        var _this$children2;
        (_this$children2 = this.children).splice.apply(_this$children2, [index, 0].concat(_toConsumableArray(child)));
      } else {
        this.children.splice(index, 0, child);
      }
    }
    this.lastAppendedChildren.length = 0;
    if (areChildren) {
      var _this$lastAppendedChi;
      (_this$lastAppendedChi = this.lastAppendedChildren).push.apply(_this$lastAppendedChi, _toConsumableArray(child));
    } else {
      this.lastAppendedChildren.push(child);
    }
    return this;
  };

  var CharTypeName = 'text';
  var ImageTypeName = 'image';
  var DrawerTypeName = 'drawer';
  var SpaceTypeName = 'space';
  var CmdTypeName = 'command';
  var IsNewLineChar = function IsNewLineChar(bob) {
    return bob.type === CharTypeName && bob.text === '\n';
  };
  var IsPageBreakChar = function IsPageBreakChar(bob) {
    return bob.type === CharTypeName && bob.text === '\f';
  };
  var IsSpaceChar = function IsSpaceChar(bob) {
    return bob.type === CharTypeName && bob.text === ' ';
  };
  var IsChar = function IsChar(bob) {
    return bob.type === CharTypeName;
  };
  var IsCommand = function IsCommand(bob) {
    return bob.type === CmdTypeName;
  };

  var CharData = /*#__PURE__*/function (_RenderBase) {
    _inherits(CharData, _RenderBase);
    function CharData(parent, text, style) {
      var _this;
      _classCallCheck(this, CharData);
      _this = _callSuper(this, CharData, [parent, CharTypeName]);
      _this.updateTextFlag = false;
      _this.style = new TextStyle(_assertThisInitialized(_this), style);
      _this.setText(text);
      return _this;
    }
    _createClass(CharData, [{
      key: "autoRound",
      get: function get() {
        return this.parent.autoRound;
      }
    }, {
      key: "offsetX",
      get: function get() {
        return this.style.offsetX;
      },
      set: function set(value) {
        if (this.style) {
          this.style.offsetX = value;
        }
      }
    }, {
      key: "offsetY",
      get: function get() {
        return this.style.offsetY;
      },
      set: function set(value) {
        if (this.style) {
          this.style.offsetY = value;
        }
      }
    }, {
      key: "leftSpace",
      get: function get() {
        return this.style.leftSpace * this.scaleX;
      },
      set: function set(value) {
        if (this.style) {
          this.style.leftSpace = value;
        }
        _set(_getPrototypeOf(CharData.prototype), "leftSpace", value, this, true);
      }
    }, {
      key: "rightSpace",
      get: function get() {
        return this.style.rightSpace * this.scaleX;
      },
      set: function set(value) {
        if (this.style) {
          this.style.rightSpace = value;
        }
        _set(_getPrototypeOf(CharData.prototype), "rightSpace", value, this, true);
      }
    }, {
      key: "align",
      get: function get() {
        return this.style.align;
      },
      set: function set(value) {
        if (this.style) {
          this.style.align = value;
        }
      }
    }, {
      key: "modifyStyle",
      value: function modifyStyle(style) {
        this.setDirty(true);
        this.style.modify(style);
        if (this.updateTextFlag) {
          this.updateTextSize();
        }
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        if (!o) {
          return this;
        }
        this.modifyStyle(o);
        _get(_getPrototypeOf(CharData.prototype), "modifyPorperties", this).call(this, o);
        return this;
      }
    }, {
      key: "setText",
      value: function setText(text) {
        this.setDirty(this.text != text);
        this.text = text;
        this.updateTextSize();
        return this;
      }
    }, {
      key: "updateTextSize",
      value: function updateTextSize() {
        var text = this.text;
        // Is new-line, page-break, or empty character
        if (text === '\n' || text === '\f' || text === '') {
          this.clearTextSize();
        } else {
          var metrics = this.style.getTextMetrics(this.context, this.text);
          this.textWidth = metrics.width;
          var ascent, descent;
          if ('actualBoundingBoxAscent' in metrics) {
            ascent = metrics.actualBoundingBoxAscent;
            descent = metrics.actualBoundingBoxDescent;
          } else {
            ascent = 0;
            descent = 0;
          }
          this.textHeight = ascent + descent;
          this.ascent = ascent;
          this.descent = descent;
        }
        this.updateTextFlag = false;
        return this;
      }
    }, {
      key: "clearTextSize",
      value: function clearTextSize() {
        this.textWidth = 0;
        this.textHeight = 0;
        this.ascent = 0;
        this.descent = 0;
        return this;
      }
    }, {
      key: "copyTextSize",
      value: function copyTextSize(child) {
        this.textWidth = child.textWidth;
        this.textHeight = child.textHeight;
        this.ascent = child.ascent;
        this.descent = child.descent;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this.textWidth * this.scaleX;
      },
      set: function set(value) {
        if (this.textWidth > 0) {
          this.scaleX = value / this.textWidth;
        } else {
          this.scaleX = 1;
        }
      }
    }, {
      key: "height",
      get: function get() {
        return this.textHeight * this.scaleY;
      },
      set: function set(value) {
        if (this.textHeight > 0) {
          this.scaleY = value / this.textHeight;
        } else {
          this.scaleY = 1;
        }
      }
    }, {
      key: "willRender",
      get: function get() {
        if (this.textWidth === 0) {
          return false;
        }
        return _get(_getPrototypeOf(CharData.prototype), "willRender", this);
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        var context = this.context;
        var textStyle = this.style;
        if (textStyle.hasBackgroundColor) {
          context.fillStyle = textStyle.backgroundColor;
          var x = this.drawTLX;
          var width = this.drawTRX - x;
          var bottomY = textStyle.backgroundBottomY;
          if (bottomY == null) {
            bottomY = this.drawBLY;
          }
          var height = textStyle.backgroundHeight;
          if (height == null) {
            height = bottomY - this.drawTLY;
          }
          var y = bottomY - height;
          context.fillRect(x, y, width, height);
        }
        var hasFill = textStyle.hasFill,
          hasStroke = textStyle.hasStroke;
        if (!hasFill && !hasStroke) {
          return;
        }
        textStyle.syncFont(context).syncStyle(context);
        // textBaseline = 'alphabetic'

        if (hasStroke) {
          textStyle.syncShadow(context);
          context.strokeText(this.text, 0, 0);
        }
        if (hasFill) {
          textStyle.syncShadow(context);
          context.fillText(this.text, 0, 0);
        }
      }
    }, {
      key: "drawTLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawTLY",
      get: function get() {
        return -this.ascent;
      }
    }, {
      key: "drawBLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawBLY",
      get: function get() {
        return this.descent;
      }
    }, {
      key: "drawTRX",
      get: function get() {
        return this.textWidth + this.rightSpace;
      }
    }, {
      key: "drawTRY",
      get: function get() {
        return -this.ascent;
      }
    }, {
      key: "drawBRX",
      get: function get() {
        return this.textWidth + this.rightSpace;
      }
    }, {
      key: "drawBRY",
      get: function get() {
        return this.descent;
      }
    }]);
    return CharData;
  }(RenderBase);

  var CreateCharChild = function CreateCharChild(text, style) {
    if (style) {
      this.textStyle.modify(style);
    }
    var child = this.poolManager.allocate(CharTypeName);
    if (child === null) {
      child = new CharData(this,
      // parent
      text,
      // text
      this.textStyle) // style
      ;
    } else {
      child.setParent(this).setActive().modifyStyle(this.textStyle).setText(text);
    }
    return child;
  };

  var CreateCharChildren = function CreateCharChildren(text, style) {
    if (style) {
      this.textStyle.modify(style);
    }
    var children = [];
    for (var i = 0, cnt = text.length; i < cnt; i++) {
      var _char = text.charAt(i);
      var child = this.poolManager.allocate(CharTypeName);
      if (child === null) {
        child = new CharData(this,
        // parent
        _char,
        // text
        this.textStyle) // style
        ;
      } else {
        child.setParent(this).setActive().modifyStyle(this.textStyle).setText(_char);
      }
      // child.modifyPorperties(properties);  // Warning: Will modify text-style twice

      children.push(child);
    }
    return children;
  };

  var AppendText = function AppendText(text, style) {
    var children = this.createCharChildren(text, style);
    this.addChild(children);
    return this;
  };

  var SetText = function SetText(text, style) {
    if (text === undefined) {
      text = '';
    }
    this.removeChildren();
    AppendText.call(this, text, style); // this.appendText might be override

    this.dirty = true;
    return this;
  };

  var InsertText = function InsertText(index, text, style) {
    var children = this.createCharChildren(text, style);
    index = this.getCharChildIndex(index, true);
    this.addChild(children, index);
    return this;
  };

  var RemoveText = function RemoveText(index, length) {
    if (length === undefined) {
      length = 1;
    }
    for (var i = 0; i < length; i++) {
      var childIndex = this.getCharChildIndex(index, true);
      if (childIndex === undefined) {
        break;
      }
      this.removeChild(this.children[childIndex]);
    }
    return this;
  };

  var GetText = function GetText(activeOnly) {
    var text = '';
    this.forEachCharChild(function (child) {
      text += child.text;
    }, undefined, activeOnly);
    return text;
  };

  var CanvasPool = Phaser.Display.Canvas.CanvasPool;
  var DrawFrameToCanvas = function DrawFrameToCanvas(frame, canvas, x, y, width, height, color, autoRound) {
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = 0;
    }
    if (width === undefined) {
      width = frame.cutWidth;
    }
    if (height === undefined) {
      height = frame.cutHeight;
    }
    if (autoRound === undefined) {
      autoRound = false;
    }
    if (autoRound) {
      x = Math.round(x);
      y = Math.round(y);
    }
    var context = canvas.getContext('2d', {
      willReadFrequently: true
    });
    if (color) {
      // Draw image at tempCanvas

      // Get tempCanvas
      var tempCanvas = CanvasPool.create(null, width, height, Phaser.CANVAS, true);
      var tempContext = tempCanvas.getContext('2d', {
        willReadFrequently: true
      });
      tempContext.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight, 0, 0, width, height);

      // Tint-fill
      tempContext.globalCompositeOperation = 'source-in';
      tempContext.fillStyle = color;
      tempContext.fillRect(0, 0, width, height);

      // Draw tempCanvas at context
      context.drawImage(tempCanvas, 0, 0, width, height, x, y, width, height);

      // Release tempCanvas
      CanvasPool.remove(tempCanvas);
    } else {
      context.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight, x, y, width, height);
    }
  };

  Phaser.Display.Canvas.CanvasPool;
  var ImageData = /*#__PURE__*/function (_RenderBase) {
    _inherits(ImageData, _RenderBase);
    function ImageData(parent, key, frame) {
      var _this;
      _classCallCheck(this, ImageData);
      _this = _callSuper(this, ImageData, [parent, ImageTypeName]);
      _this.setTexture(key, frame);
      _this.color = undefined;
      return _this;
    }
    _createClass(ImageData, [{
      key: "frameWidth",
      get: function get() {
        return this.frameObj ? this.frameObj.cutWidth : 0;
      }
    }, {
      key: "frameHeight",
      get: function get() {
        return this.frameObj ? this.frameObj.cutHeight : 0;
      }
    }, {
      key: "offsetY",
      get: function get() {
        return -this.height;
      },
      set: function set(value) {}
    }, {
      key: "key",
      get: function get() {
        return this._key;
      },
      set: function set(value) {
        this.setDirty(this._key != value);
        this._key = value;
      }
    }, {
      key: "frame",
      get: function get() {
        return this._frame;
      },
      set: function set(value) {
        this.setDirty(this._frame != value);
        this._frame = value;
      }
    }, {
      key: "setTexture",
      value: function setTexture(key, frame) {
        this.key = key;
        this.frame = frame;
        this.frameObj = this.scene.sys.textures.getFrame(key, frame);
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this.frameWidth * this.scaleX;
      },
      set: function set(value) {
        this.setDirty(this.width !== value);
        this.scaleX = value / this.frameWidth;
      }
    }, {
      key: "height",
      get: function get() {
        return this.frameHeight * this.scaleY;
      },
      set: function set(value) {
        this.setDirty(this.height !== value);
        this.scaleY = value / this.frameHeight;
      }
    }, {
      key: "setHeight",
      value: function setHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }
        this.height = height;
        if (keepAspectRatio) {
          this.scaleX = this.scaleY;
        }
        return this;
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        this.color = color;
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        if (o.hasOwnProperty('color')) {
          this.setColor(o.color);
        }
        _get(_getPrototypeOf(ImageData.prototype), "modifyPorperties", this).call(this, o);
        return this;
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        DrawFrameToCanvas(this.frameObj, this.canvas, 0, 0, this.frameWidth, this.frameHeight, this.color, false);
      }
    }, {
      key: "drawTLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawTLY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawBLY",
      get: function get() {
        return this.frameHeight;
      }
    }, {
      key: "drawTRX",
      get: function get() {
        return this.frameWidth + this.rightSpace;
      }
    }, {
      key: "drawTRY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBRX",
      get: function get() {
        return this.frameWidth + this.rightSpace;
      }
    }, {
      key: "drawBRY",
      get: function get() {
        return this.frameHeight;
      }
    }]);
    return ImageData;
  }(RenderBase);

  var CreateImageChild = function CreateImageChild(key, frame, properties) {
    var child = this.poolManager.allocate(ImageTypeName);
    if (child === null) {
      child = new ImageData(this,
      // parent
      key, frame);
    } else {
      child.setParent(this).setActive().setTexture(key, frame);
    }
    child.modifyPorperties(properties);
    return child;
  };

  var AppendImage = function AppendImage(key, frame, properties) {
    var child = this.createImageChild(key, frame, properties);
    this.addChild(child);
    return this;
  };

  var Drawer = /*#__PURE__*/function (_RenderBase) {
    _inherits(Drawer, _RenderBase);
    function Drawer(parent, renderCallback, width, height) {
      var _this;
      _classCallCheck(this, Drawer);
      _this = _callSuper(this, Drawer, [parent, DrawerTypeName]);
      _this.setRenderCallback(renderCallback);
      _this.setDrawerSize(width, height);
      return _this;
    }
    _createClass(Drawer, [{
      key: "setRenderCallback",
      value: function setRenderCallback(callback) {
        if (callback) {
          this.renderContent = callback.bind(this);
        } else {
          delete this.renderContent;
        }
        return this;
      }
    }, {
      key: "setDrawerSize",
      value: function setDrawerSize(width, height) {
        // Whole canvas
        if (width === true) {
          this.toLocalPosition = false;
          width = undefined;
          height = undefined;
        } else {
          this.toLocalPosition = true;
        }
        if (width === undefined) {
          width = 0;
        }
        if (height === undefined) {
          height = width;
        }
        this.drawerWidth = width;
        this.drawerHeight = height;
        return this;
      }
    }, {
      key: "onFree",
      value: function onFree() {
        _get(_getPrototypeOf(Drawer.prototype), "onFree", this).call(this);
        this.setRenderCallback();
      }
    }, {
      key: "width",
      get: function get() {
        return this.drawerWidth * this.scaleX;
      },
      set: function set(value) {
        this.setDirty(this.width !== value);
        this.scaleX = this.drawerWidth > 0 ? value / this.drawerWidth : 1;
      }
    }, {
      key: "height",
      get: function get() {
        return this.drawerHeight * this.scaleY;
      },
      set: function set(value) {
        this.setDirty(this.height !== value);
        this.scaleY = this.drawerHeight > 0 ? value / this.drawerHeight : 1;
      }
    }, {
      key: "offsetY",
      get: function get() {
        return -this.height;
      },
      set: function set(value) {}
    }, {
      key: "drawTLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawTLY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawBLY",
      get: function get() {
        return this.drawerHeight;
      }
    }, {
      key: "drawTRX",
      get: function get() {
        return this.drawerWidth + this.rightSpace;
      }
    }, {
      key: "drawTRY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBRX",
      get: function get() {
        return this.drawerWidth + this.rightSpace;
      }
    }, {
      key: "drawBRY",
      get: function get() {
        return this.drawerHeight;
      }
    }]);
    return Drawer;
  }(RenderBase);

  var CreateDrawerChild = function CreateDrawerChild(renderCallback, width, height) {
    var child = this.poolManager.allocate(DrawerTypeName);
    if (child === null) {
      child = new Drawer(this,
      // parent
      renderCallback, width, height);
    } else {
      child.setParent(this).setActive().setRenderCallback(renderCallback).setDrawerSize(width, height);
    }
    return child;
  };

  var AppendDrawer = function AppendDrawer(renderCallback, width, height) {
    var child = this.createDrawerChild(renderCallback, width, height);
    this.addChild(child);
    return this;
  };

  var Space = /*#__PURE__*/function (_RenderBase) {
    _inherits(Space, _RenderBase);
    function Space(parent, width) {
      var _this;
      _classCallCheck(this, Space);
      _this = _callSuper(this, Space, [parent, SpaceTypeName]);
      _this.setSpaceWidth(width);
      return _this;
    }
    _createClass(Space, [{
      key: "width",
      get: function get() {
        return this.spaceWidth * this.scaleX;
      },
      set: function set(value) {
        if (this.spaceWidth > 0) {
          this.scaleX = value / this.spaceWidth;
        } else {
          this.scaleX = 1;
        }
      }
    }, {
      key: "setSpaceWidth",
      value: function setSpaceWidth(width) {
        this.spaceWidth = width;
        return this;
      }
    }]);
    return Space;
  }(RenderBase);

  var CreateSpaceChild = function CreateSpaceChild(width) {
    var child = this.poolManager.allocate(SpaceTypeName);
    if (child === null) {
      child = new Space(this,
      // parent
      width);
    } else {
      child.setParent(this).setActive().setSpaceWidth(width);
    }
    return child;
  };

  var AppendSpace = function AppendSpace(width) {
    var child = this.createSpaceChild(width);
    this.addChild(child);
    return this;
  };

  var Command = /*#__PURE__*/function (_Base) {
    _inherits(Command, _Base);
    function Command(parent, name, callback, param, scope) {
      var _this;
      _classCallCheck(this, Command);
      _this = _callSuper(this, Command, [parent, CmdTypeName]);
      _this.setName(name).setParameter(param).setCallback(callback, scope);
      return _this;
    }
    _createClass(Command, [{
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
      }
    }, {
      key: "setParameter",
      value: function setParameter(param) {
        this.param = param;
        return this;
      }
    }, {
      key: "setCallback",
      value: function setCallback(callback, scope) {
        this.callback = callback;
        this.scope = scope;
        return this;
      }
    }, {
      key: "exec",
      value: function exec() {
        var result;
        if (this.scope) {
          result = this.callback.call(this.scope, this.param, this.name);
        } else {
          result = this.callback(this.param, this.name);
        }
        return result;
      }
    }, {
      key: "onFree",
      value: function onFree() {
        _get(_getPrototypeOf(Command.prototype), "onFree", this).call(this);
        this.setName().setCallback().setParameter();
      }
    }]);
    return Command;
  }(Base);

  var CreateCommandChild = function CreateCommandChild(name, callback, param, scope) {
    var child = this.poolManager.allocate(CmdTypeName);
    if (child === null) {
      child = new Command(this,
      // parent
      name, callback, param, scope);
    } else {
      child.setParent(this).setActive().setName(name).setCallback(callback, scope).setParameter(param);
    }
    return child;
  };

  var AppendCommand$3 = function AppendCommand(name, callback, param, scope) {
    var child = this.createCommandChild(name, callback, param, scope);
    this.addChild(child);
    return this;
  };

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
  var IsPlainObject$3 = function IsPlainObject(obj) {
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

  var DeepClone = function DeepClone(inObject) {
    var outObject;
    var value;
    var key;
    if (inObject == null || _typeof(inObject) !== 'object') {
      //  inObject is not an object
      return inObject;
    }

    //  Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
    if (IsPlainObject$3(inObject)) {
      for (key in inObject) {
        value = inObject[key];

        //  Recursively (deep) copy for nested objects, including arrays
        outObject[key] = DeepClone(value);
      }
    } else {
      outObject = inObject;
    }
    return outObject;
  };

  var SetWrapConfig = function SetWrapConfig(config) {
    if (config === undefined) {
      config = {};
    } else if (_typeof(config) === 'object') {
      config = DeepClone(config);
    }
    this.wrapConfig = config;
    return this;
  };

  var CreateWrapResultData = function CreateWrapResultData(config) {
    var data = {
      callback: undefined,
      start: 0,
      // Next start index
      isLastPage: false,
      // Is last page
      maxLines: undefined,
      padding: undefined,
      letterSpacing: undefined,
      hAlign: undefined,
      vAlign: undefined,
      children: [],
      // Wrap result
      lines: [],
      // Wrap result in lines

      // WordWrap
      maxLineWidth: 0,
      linesHeight: 0,
      lineHeight: undefined,
      // VerticalWrap
      maxLineHeight: 0,
      linesWidth: 0,
      lineWidth: undefined
    };
    return Object.assign(data, config);
  };

  var GetWord = function GetWord(children, startIndex, charMode, result) {
    if (result === undefined) {
      result = {
        word: [],
        width: 0
      };
    }
    result.word.length = 0;
    var endIndex = children.length;
    var currentIndex = startIndex;
    var word = result.word,
      wordWidth = 0;
    while (currentIndex < endIndex) {
      var child = children[currentIndex];
      // Can't render (command child), put into output directly
      if (!child.renderable) {
        word.push(child);
        currentIndex++;
        continue;
      }
      var text = child.type === CharTypeName ? child.text : null;
      if (text !== null && text !== ' ' && text !== '\n' && text !== '\f') {
        word.push(child);
        wordWidth += child.outerWidth;
        currentIndex++;
        // Continue
      } else {
        // Get image child, a space, a new-line, or page-break
        if (currentIndex === startIndex) {
          // Single child
          word.push(child);
          wordWidth += child.outerWidth;
        }
        break;
      }
      if (charMode) {
        // Word only contains 1 character
        break;
      }
    }
    result.width = wordWidth;
    return result;
  };

  var GetChildrenAlign = function GetChildrenAlign(children) {
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (child.align !== undefined) {
        return child.align;
      }
    }
    return undefined;
  };

  var OffsetChildren = function OffsetChildren(children, offsetX, offsetY) {
    if (offsetX === 0 && offsetY === 0) {
      return;
    }
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (!child.renderable) {
        continue;
      }
      child.x += offsetX;
      child.y += offsetY;
    }
  };

  var AlignLines$1 = function AlignLines(result, width, height) {
    var hAlign = result.hAlign,
      vAlign = result.vAlign;
    var offsetX, offsetY;
    var linesHeight = result.linesHeight;
    switch (vAlign) {
      case 1: // center
      case 'center':
        offsetY = (height - linesHeight) / 2;
        break;
      case 2: // bottom
      case 'bottom':
        offsetY = height - linesHeight;
        break;
      default:
        offsetY = 0;
        break;
    }
    var lines = result.lines;
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
      var line = lines[li];
      var lineWidth = line.width,
        children = line.children;
      var lineHAlign = GetChildrenAlign(children);
      if (lineHAlign === undefined) {
        lineHAlign = hAlign;
      }
      switch (lineHAlign) {
        case 1: // center
        case 'center':
          offsetX = (width - lineWidth) / 2;
          break;
        case 2: // right
        case 'right':
          offsetX = width - lineWidth;
          break;
        default:
          offsetX = 0;
          break;
      }
      OffsetChildren(children, offsetX, offsetY);
    }
  };

  var GetDefaultTextHeight = function GetDefaultTextHeight() {
    var metrics = this.defaultTextStyle.getTextMetrics(this.context, this.testString);
    var ascent, descent;
    if ('actualBoundingBoxAscent' in metrics) {
      ascent = metrics.actualBoundingBoxAscent;
      descent = metrics.actualBoundingBoxDescent;
    } else {
      ascent = 0;
      descent = 0;
    }
    Result.ascent = ascent;
    Result.descent = descent;
    Result.height = ascent + descent;
    return Result;
  };
  var Result = {};

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var RunWordWrap$1 = function RunWordWrap(config) {
    // Parse parameters
    var startIndex = GetValue$7(config, 'start', 0);
    SetPadding$1(this.wrapPadding, GetValue$7(config, 'padding', 0));
    var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
    var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;

    // Get lineHeight, maxLines
    var lineHeight = GetValue$7(config, 'lineHeight');
    var ascent = GetValue$7(config, 'ascent', lineHeight);
    var maxLines;
    if (lineHeight === undefined) {
      // Calculate lineHeight
      var useDefaultTextHeight = GetValue$7(config, 'useDefaultTextHeight', false);
      maxLines = GetValue$7(config, 'maxLines', 0);
      if (this.fixedHeight > 0 && !useDefaultTextHeight) {
        var innerHeight = this.fixedHeight - paddingVertical;
        if (maxLines > 0) {
          // Calculate lineHeight via maxLines, in fixedHeight mode
          lineHeight = innerHeight / maxLines;
        } else {
          var textHeightResult = GetDefaultTextHeight.call(this);
          lineHeight = textHeightResult.height;
          ascent = textHeightResult.ascent;
          // Calculate maxLines via (ascent, lineHeight), in fixedHeight mode
          maxLines = Math.floor((innerHeight - ascent) / lineHeight);
        }
      } else {
        var textHeightResult = GetDefaultTextHeight.call(this);
        lineHeight = textHeightResult.height;
        ascent = textHeightResult.ascent;
      }
    } else {
      // Calculate maxLines
      if (this.fixedHeight > 0) {
        // Calculate maxLines via lineHeight, in fixedHeight mode
        maxLines = GetValue$7(config, 'maxLines');
        if (maxLines === undefined) {
          var innerHeight = this.fixedHeight - paddingVertical;
          maxLines = Math.floor(innerHeight / lineHeight);
        }
      } else {
        maxLines = GetValue$7(config, 'maxLines', 0); // Default is show all lines
      }
    }

    // If ascent is undefined, assign to lineHeight
    if (ascent === undefined) {
      ascent = lineHeight;
    }
    var showAllLines = maxLines === 0;

    // Get wrapWidth
    var wrapWidth = GetValue$7(config, 'wrapWidth', undefined);
    if (wrapWidth === undefined) {
      if (this.fixedWidth > 0) {
        wrapWidth = this.fixedWidth - paddingHorizontal;
      } else {
        wrapWidth = Infinity; // No word-wrap
      }
    }
    var letterSpacing = GetValue$7(config, 'letterSpacing', 0);
    var hAlign = GetValue$7(config, 'hAlign', 0);
    var vAlign = GetValue$7(config, 'vAlign', 0);
    var charWrap = GetValue$7(config, 'charWrap', false);
    var result = CreateWrapResultData({
      // Override properties
      callback: 'runWordWrap',
      start: startIndex,
      // Next start index
      padding: this.wrapPadding,
      letterSpacing: letterSpacing,
      maxLines: maxLines,
      hAlign: hAlign,
      vAlign: vAlign,
      // Specific properties
      ascent: ascent,
      lineHeight: lineHeight,
      wrapWidth: wrapWidth,
      charWrap: charWrap
    });

    // Set all children to inactive
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      children[i].setActive(false);
    }

    // Layout children
    wrapWidth += letterSpacing;
    var startX = this.padding.left + this.wrapPadding.left,
      startY = this.padding.top + this.wrapPadding.top + ascent,
      // Start(baseline) from ascent, not 0
      x = startX,
      y = startY;
    var remainderWidth = wrapWidth,
      childIndex = startIndex,
      lastChildIndex = children.length;
    var resultChildren = result.children;
    var resultLines = result.lines,
      lastLine = [],
      lastLineWidth = 0,
      maxLineWidth = 0;
    var wordResult;
    var isPageBreakChar = false;
    while (childIndex < lastChildIndex) {
      wordResult = GetWord(children, childIndex, charWrap, wordResult);
      var word = wordResult.word;
      var charCnt = word.length;
      var wordWidth = wordResult.width + charCnt * letterSpacing;
      childIndex += charCnt;
      // Next line
      var isNewLineChar = IsNewLineChar(word[0]);
      isPageBreakChar = IsPageBreakChar(word[0]);
      var isControlChar = isNewLineChar || isPageBreakChar;
      if (remainderWidth < wordWidth || isControlChar) {
        // Add to result
        if (isControlChar) {
          var _char = word[0];
          _char.setActive().setPosition(x, y);
          resultChildren.push(_char);
          lastLine.push(_char);
        }

        // Move cursor
        x = startX;
        y += lineHeight;
        remainderWidth = wrapWidth;
        resultLines.push({
          children: lastLine,
          width: lastLineWidth
        });
        maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
        lastLineWidth = 0;
        lastLine = [];
        var isPageEnd = isPageBreakChar || !showAllLines && resultLines.length === maxLines; // Exceed maxLines
        if (isPageEnd) {
          break;
        } else if (isControlChar) {
          // Already add to result
          continue;
        }
      }
      remainderWidth -= wordWidth;
      lastLineWidth += wordWidth;
      for (var i = 0, cnt = word.length; i < cnt; i++) {
        var child = word[i];
        child.setActive();
        resultChildren.push(child);
        lastLine.push(child);
        if (child.renderable) {
          child.setPosition(x, y);
          x += child.outerWidth + letterSpacing;
        }
      }
    }
    if (lastLine.length > 0) {
      resultLines.push({
        children: lastLine,
        width: lastLineWidth
      });
      maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
    }
    result.start += resultChildren.length;
    result.isLastPage = !isPageBreakChar && result.start === lastChildIndex;
    result.maxLineWidth = maxLineWidth;
    result.linesHeight = resultLines.length * lineHeight;

    // Calculate size of game object
    var width = this.fixedWidth > 0 ? this.fixedWidth : result.maxLineWidth + paddingHorizontal;
    var height = this.fixedHeight > 0 ? this.fixedHeight : result.linesHeight + paddingVertical;

    // Size might be changed after wrapping
    var innerWidth = width - paddingHorizontal;
    var innerHeight = height - paddingVertical;
    AlignLines$1(result, innerWidth, innerHeight);

    // Resize
    this.setCanvasSize(width, height);

    // Set initial position
    for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
      var child = resultChildren[i];
      if (!child.renderable) {
        continue;
      }
      child.x0 = child.x;
      child.y0 = child.y;
    }
    return result;
  };

  var Merge$1 = Phaser.Utils.Objects.Merge;
  var RunWordWrap = function RunWordWrap(config) {
    if (config === undefined) {
      config = {};
    }
    return RunWordWrap$1.call(this, Merge$1(config, this.wrapConfig));
  };

  var AlignLines = function AlignLines(result, width, height) {
    var hAlign = result.hAlign,
      vAlign = result.vAlign;
    var offsetX, offsetY;
    var rtl = result.rtl;
    var lines = result.lines,
      lineWidth = result.lineWidth,
      linesWidth = result.linesWidth;
    switch (hAlign) {
      case 1: // center
      case 'center':
        offsetX = (width - linesWidth) / 2;
        break;
      case 2: // right
      case 'right':
        offsetX = width - linesWidth;
        break;
      default:
        // left
        offsetX = 0;
        break;
    }
    if (rtl) {
      offsetX += lineWidth;
    }
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
      var line = lines[rtl ? lcnt - li - 1 : li];
      var children = line.children;
      var lineHeight = line.height;
      var lineVAlign = GetChildrenAlign(children);
      if (lineVAlign === undefined) {
        lineVAlign = vAlign;
      }
      switch (lineVAlign) {
        case 1: // center
        case 'center':
          offsetY = (height - lineHeight) / 2;
          break;
        case 2: // bottom
        case 'bottom':
          offsetY = height - lineHeight;
          break;
        default:
          // top
          offsetY = 0;
          break;
      }
      OffsetChildren(children, offsetX, offsetY);
      offsetX += lineWidth;
    }
  };

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var RunVerticalWrap$1 = function RunVerticalWrap(config) {
    // Parse parameters
    var startIndex = GetValue$6(config, 'start', 0);
    SetPadding$1(this.wrapPadding, GetValue$6(config, 'padding', 0));
    var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
    var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;
    var lineWidth = GetValue$6(config, 'lineWidth', undefined);
    var maxLines;
    if (lineWidth === undefined) {
      // Calculate lineWidth via maxLines, in fixedWidth mode
      maxLines = GetValue$6(config, 'maxLines', 0);
      if (this.fixedWidth > 0) {
        var innerWidth = this.fixedWidth - paddingHorizontal;
        lineWidth = innerWidth / maxLines;
      } else {
        lineWidth = 0;
      }
    } else {
      if (this.fixedWidth > 0) {
        // Calculate maxLines via lineWidth, in fixedWidth mode
        maxLines = GetValue$6(config, 'maxLines', undefined);
        if (maxLines === undefined) {
          var innerWidth = this.fixedWidth - paddingHorizontal;
          maxLines = Math.floor(innerWidth / lineWidth) + 1;
        }
      } else {
        maxLines = GetValue$6(config, 'maxLines', 0); // Default is show all lines
      }
    }
    var showAllLines = maxLines === 0;

    // Get fixedCharacterHeight
    var fixedCharacterHeight = GetValue$6(config, 'fixedCharacterHeight', undefined);
    if (fixedCharacterHeight === undefined) {
      var charPerLine = GetValue$6(config, 'charPerLine', undefined);
      if (charPerLine !== undefined) {
        var innerHeight = this.fixedHeight - paddingVertical;
        fixedCharacterHeight = Math.floor(innerHeight / charPerLine);
      }
    }

    // Get wrapHeight
    var wrapHeight = GetValue$6(config, 'wrapHeight', undefined);
    if (wrapHeight === undefined) {
      if (this.fixedHeight > 0) {
        wrapHeight = this.fixedHeight - paddingVertical;
      } else {
        wrapHeight = Infinity; // No word-wrap
      }
    }
    var letterSpacing = GetValue$6(config, 'letterSpacing', 0);
    var rtl = GetValue$6(config, 'rtl', true);
    var hAlign = GetValue$6(config, 'hAlign', rtl ? 2 : 0);
    var vAlign = GetValue$6(config, 'vAlign', 0);
    var result = CreateWrapResultData({
      // Override properties
      callback: 'runVerticalWrap',
      start: startIndex,
      // Next start index
      padding: this.wrapPadding,
      letterSpacing: letterSpacing,
      maxLines: maxLines,
      hAlign: hAlign,
      vAlign: vAlign,
      // Specific properties
      lineWidth: lineWidth,
      fixedCharacterHeight: fixedCharacterHeight,
      wrapHeight: wrapHeight,
      rtl: rtl
    });

    // Set all children to active
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      children[i].setActive(false);
    }

    // Layout children
    wrapHeight += letterSpacing;
    var startX = this.padding.left + this.wrapPadding.left,
      // Reset x of each character in AlignLines method
      startY = this.padding.top + this.wrapPadding.top,
      x = startX,
      y = startY;
    var remainderHeight = wrapHeight,
      childIndex = startIndex,
      lastChildIndex = children.length;
    var resultChildren = result.children;
    var resultLines = result.lines,
      lastLine = [],
      lastLineHeight = 0,
      maxLineHeight = 0;
    while (childIndex < lastChildIndex) {
      // Append non-typeable child directly
      var child = children[childIndex];
      childIndex++;
      if (!child.renderable) {
        child.setActive();
        resultChildren.push(child);
        lastLine.push(child);
        continue;
      }
      var childHeight = (fixedCharacterHeight !== undefined ? fixedCharacterHeight : child.height) + letterSpacing;
      // Next line
      var isNewLineChar = IsNewLineChar(child);
      var isPageBreakChar = IsPageBreakChar(child);
      var isControlChar = isNewLineChar || isPageBreakChar;
      if (remainderHeight < childHeight || isControlChar) {
        // Add to result
        if (isNewLineChar) {
          child.setActive().setPosition(x, y).setOrigin(0.5);
          resultChildren.push(child);
          lastLine.push(child);
        }

        // Move cursor
        x = startX;
        y = startY;
        remainderHeight = wrapHeight;
        resultLines.push({
          children: lastLine,
          height: lastLineHeight
        });
        maxLineHeight = Math.max(maxLineHeight, lastLineHeight);
        lastLineHeight = 0;
        lastLine = [];
        var isPageEnd = isPageBreakChar || !showAllLines && resultLines.length === maxLines; // Exceed maxLines
        if (isPageEnd) {
          break;
        } else if (isControlChar) {
          // Already add to result                
          continue;
        }
      }
      remainderHeight -= childHeight;
      lastLineHeight += childHeight;
      child.setActive().setPosition(x, y).setOrigin(0.5);
      resultChildren.push(child);
      lastLine.push(child);
      y += childHeight;
    }
    if (lastLine.length > 0) {
      resultLines.push({
        children: lastLine,
        height: lastLineHeight
      });
      maxLineHeight = Math.max(maxLineHeight, lastLineHeight);
    }
    result.start += resultChildren.length;
    result.isLastPage = result.start === lastChildIndex;
    result.maxLineHeight = maxLineHeight;
    result.linesWidth = resultLines.length * lineWidth;

    // Calculate size of game object
    var width = this.fixedWidth > 0 ? this.fixedWidth : result.linesWidth + paddingHorizontal;
    var height = this.fixedHeight > 0 ? this.fixedHeight : result.maxLineHeight + paddingVertical;

    // Size might be changed after wrapping
    var innerWidth = width - paddingHorizontal;
    var innerHeight = height - paddingVertical;
    AlignLines(result, innerWidth, innerHeight);

    // Resize
    this.setCanvasSize(width, height);

    // Set initial position
    for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
      var child = resultChildren[i];
      if (!child.renderable) {
        continue;
      }
      child.x0 = child.x;
      child.y0 = child.y;
    }
    return result;
  };

  var Merge = Phaser.Utils.Objects.Merge;
  var RunVerticalWrap = function RunVerticalWrap(config) {
    if (config === undefined) {
      config = {};
    }
    return RunVerticalWrap$1.call(this, Merge(config, this.wrapConfig));
  };

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var RunWrap = function RunWrap(config) {
    var wrapCallback = GetValue$5(this.wrapConfig, 'callback');
    if (!wrapCallback) {
      wrapCallback = GetValue$5(config, 'callback', this.runWordWrap);
    }
    if (typeof wrapCallback === 'string') {
      wrapCallback = this[wrapCallback];
    }
    return wrapCallback.call(this, config);
  };

  var SetAlignMethods = {
    setVAlign: function setVAlign(align) {
      this.wrapConfig.vAlign = align;
      return this;
    },
    setHAlign: function setHAlign(align) {
      this.wrapConfig.hAlign = align;
      return this;
    }
  };

  var SetTextOXYMethods = {
    setTextOX: function setTextOX(ox) {
      if (ox === this._textOX) {
        return this;
      }
      this._textOX = ox;
      return this;
    },
    setTextOY: function setTextOY(oy) {
      if (oy === this._textOY) {
        return this;
      }
      this._textOY = oy;
      return this;
    },
    setTextOXY: function setTextOXY(ox, oy) {
      if (ox === this._textOX && oy === this._textOY) {
        return;
      }
      this._textOX = ox;
      this._textOY = oy;
      return this;
    },
    addTextOX: function addTextOX(incX) {
      this.setTextOX(this._textOX + incX);
      return this;
    },
    addTextOY: function addTextOY(incY) {
      this.setTextOY(this._textOY + incY);
      return this;
    },
    addTextOXY: function addTextOXY(incX, incY) {
      this.setTextOXY(this._textOX + incX, this._textOY + incY);
      return this;
    }
  };

  var RenderContent = function RenderContent() {
    this.clear();
    this.setCanvasSize(this.width, this.height);
    if (this.background.active) {
      this.background.render();
    }
    var child;
    for (var i = 0, cnt = this.children.length; i < cnt; i++) {
      child = this.children[i];
      if (child.active) {
        child.render();
      }
    }
    if (this.innerBounds.active) {
      this.innerBounds.render();
    }
  };

  var ForEachChild = function ForEachChild(callback, scope, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    var childIndex = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      var isBreak;
      if (scope) {
        isBreak = callback.call(this, child, childIndex, children);
      } else {
        isBreak = callback(child, childIndex, children);
      }
      childIndex++;
      if (isBreak) {
        break;
      }
    }
    return this;
  };

  var ForEachRenderableChild = function ForEachRenderableChild(callback, scope, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    var childIndex = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (child.renderable && !child.removed) {
        var isBreak;
        if (scope) {
          isBreak = callback.call(this, child, childIndex, children);
        } else {
          isBreak = callback(child, childIndex, children);
        }
        childIndex++;
        if (isBreak) {
          break;
        }
      }
    }
    return this;
  };

  var ForEachCharChild = function ForEachCharChild(callback, scope, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    var charIndex = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (IsChar(child) && !child.removed) {
        var isBreak;
        if (scope) {
          isBreak = callback.call(this, child, charIndex, children);
        } else {
          isBreak = callback(child, charIndex, children);
        }
        charIndex++;
        if (isBreak) {
          break;
        }
      }
    }
    return this;
  };

  var GetChildren = function GetChildren() {
    return this.children;
  };

  var GetAll = Phaser.Utils.Array.GetAll;
  var GetActiveChildren = function GetActiveChildren() {
    return GetAll(this.children, 'active', true);
  };

  var GetCharChildren = function GetCharChildren(activeOnly, out) {
    if (out === undefined) {
      out = [];
    }
    this.forEachCharChild(function (child) {
      out.push(child);
    }, undefined, activeOnly);
    return out;
  };

  var GetLastAppendedChildren = function GetLastAppendedChildren() {
    return this.lastAppendedChildren;
  };

  var GetBobCenterPosition = function GetBobCenterPosition(bob, offsetX, offsetY, out) {
    if (typeof offsetX !== 'number') {
      out = offsetX;
      offsetX = 0;
      offsetY = 0;
    }
    var bobX = bob.drawCenterX + offsetX;
    var bobY = bob.drawCenterY + offsetY;
    return BobPositionToCanvasPosition(bob, bobX, bobY, out);
  };

  var GetDistance = Phaser.Math.Distance.BetweenPointsSquared;
  var GetNearestChild = function GetNearestChild(canvasX, canvasY) {
    var pointA = {
      x: canvasX,
      y: canvasY
    };
    var minDistance = Infinity;
    var nearestChild = null;
    this.forEachRenderableChild(function (child) {
      var distance = GetDistance(pointA, GetBobCenterPosition(child, true));
      if (minDistance > distance) {
        minDistance = distance;
        nearestChild = child;
      }
    });
    return nearestChild;
  };

  var GetCharWorldPosition = function GetCharWorldPosition(child, offsetX, offsetY, out) {
    if (typeof child === 'number') {
      child = this.getCharChild(child, true);
    }
    return GetBobWorldPosition(this, child, offsetX, offsetY, out);
  };

  var SetToMinSize = function SetToMinSize() {
    var children = this.children;
    var maxX = 0,
      maxY = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (!child.renderable || !child.active || !child.visible) {
        continue;
      }
      var x0 = child.x0 !== undefined ? child.x0 : child.x;
      var y0 = child.y0 !== undefined ? child.y0 : child.y;
      maxX = Math.max(maxX, x0);
      maxY = Math.max(maxY, y0);
    }
    var width = maxX + this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;
    var height = maxY + this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;

    // Ignore fixedWidth, and fixedHeight
    if (this.width !== width || this.height !== height) {
      this.dirty = true;
      this.setCanvasSize(width, height);
    }
    return this;
  };

  var GetCharChildIndex = function GetCharChildIndex(charIndex, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (IsChar(child) && !child.removed) {
        if (charIndex === 0) {
          return i;
        } else {
          charIndex--;
        }
      }
    }
    return undefined;
  };

  var GetCharChild = function GetCharChild(charIndex, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (IsChar(child) && !child.removed) {
        if (charIndex === 0) {
          return child;
        } else {
          charIndex--;
        }
      }
    }
    return undefined;
  };

  var GetCharIndex = function GetCharIndex(childIndex, activeOnly) {
    if (typeof childIndex !== 'number') {
      childIndex = this.children.indexOf(childIndex);
      if (childIndex < 0) {
        return null;
      }
    }
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    if (childIndex >= children.length) {
      childIndex = children.length;
    }
    var charIndex = 0;
    for (var i = 0; i < childIndex; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (IsChar(child) && !child.removed) {
        charIndex++;
      }
    }
    return charIndex;
  };

  var SetChildrenInteractiveEnable = function SetChildrenInteractiveEnable(enable) {
    if (enable === undefined) {
      enable = true;
    }
    if (this.childrenInteractiveEnable !== enable) {
      this.lastOverChild = null;
    }
    this.childrenInteractiveEnable = enable;
    return this;
  };

  var GetFirstChildContains = function GetFirstChildContains(children, x, y) {
    var children = children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (!child.active || !child.renderable) {
        continue;
      }
      if (child.contains(x, y)) {
        return child;
      }
    }
    return null;
  };

  var SetChildrenInteractive = function SetChildrenInteractive() {
    this.on('pointerdown', OnPointerDown, this).on('pointerdown', OnPointerUp, this).on('pointermove', OnPointOverOut, this).on('pointerover', OnPointOverOut, this).on('pointerout', function (pointer, event) {
      OnPointOverOut.call(this, pointer, null, null, event);
    }, this);
    return this;
  };
  var OnPointerDown = function OnPointerDown(pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
      return;
    }
    var child = GetFirstChildContains(this.children, localX, localY);
    if (!child) {
      return;
    }
    this.emit('child.pointerdown', child, pointer, localX, localY, event);
  };
  var OnPointerUp = function OnPointerUp(pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
      return;
    }
    var child = GetFirstChildContains(this.children, localX, localY);
    if (!child) {
      return;
    }
    this.emit('child.pointerup', child, pointer, localX, localY, event);
  };
  var OnPointOverOut = function OnPointOverOut(pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
      return;
    }
    if (localX === null) {
      // Case of pointerout
      if (this.lastOverChild !== null) {
        this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
        this.lastOverChild = null;
      }
      return;
    }
    var child = GetFirstChildContains(this.children, localX, localY);
    if (child === this.lastOverChild) {
      return;
    }
    if (this.lastOverChild !== null) {
      this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
    }
    if (child !== null) {
      this.emit('child.pointerover', child, pointer, localX, localY, event);
    }
    this.lastOverChild = child;
  };

  var GameObject = Phaser.GameObjects.GameObject;
  var SetInteractive = function SetInteractive(hitArea, hitAreaCallback, dropZone) {
    var isInteractived = !!this.input;
    GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);
    if (!isInteractived) {
      SetChildrenInteractive.call(this);
    }
    return this;
  };

  var BringToTop = Phaser.Utils.Array.BringToTop;
  var SendToBack = Phaser.Utils.Array.SendToBack;
  var MoveUp = Phaser.Utils.Array.MoveUp;
  var MoveDown = Phaser.Utils.Array.MoveDown;
  var MoveAbove = Phaser.Utils.Array.MoveAbove;
  var MoveBelow = Phaser.Utils.Array.MoveBelow;
  var MoveChildMethods = {
    moveChildToFist: function moveChildToFist(child) {
      SendToBack(this.children, child);
      return this;
    },
    moveChildToLast: function moveChildToLast(child) {
      BringToTop(this.children, child);
      return this;
    },
    movechildUp: function movechildUp(child) {
      MoveUp(this.children, child);
      return this;
    },
    movechildDown: function movechildDown(child) {
      MoveDown(this.children, child);
      return this;
    },
    movechildAbove: function movechildAbove(child, baseChild) {
      MoveAbove(this.children, child, baseChild);
      return this;
    },
    movechildBelow: function movechildBelow(child, baseChild) {
      MoveBelow(this.children, child, baseChild);
      return this;
    }
  };

  var BackgroundMethods = {
    setBackgroundColor: function setBackgroundColor(color, color2, isHorizontalGradient) {
      this.background.setColor(color, color2, isHorizontalGradient);
      return this;
    },
    setBackgroundStroke: function setBackgroundStroke(color, lineWidth) {
      this.background.setStroke(color, lineWidth);
      return this;
    },
    setBackgroundCornerRadius: function setBackgroundCornerRadius(radius, iteration) {
      this.background.setCornerRadius(radius, iteration);
      return this;
    }
  };

  var InnerBoundsMethods = {
    setInnerBoundsColor: function setInnerBoundsColor(color, color2, isHorizontalGradient) {
      this.innerBounds.setColor(color, color2, isHorizontalGradient);
      return this;
    },
    setInnerBoundsStroke: function setInnerBoundsStroke(color, lineWidth) {
      this.innerBounds.setStroke(color, lineWidth);
      return this;
    }
  };

  var Methods$3 = {
    setFixedSize: SetFixedSize,
    setPadding: SetPadding,
    getPadding: GetPadding,
    modifyTextStyle: ModifyTextStyle,
    modifyDefaultTextStyle: ModifyDefaultTextStyle,
    resetTextStyle: ResetTextStyle,
    setTestString: SetTestString,
    removeChild: RemoveChild,
    removeChildren: RemoveChildren,
    popChild: PopChild,
    clearContent: ClearContent,
    addChild: AddChild,
    createCharChild: CreateCharChild,
    createCharChildren: CreateCharChildren,
    setText: SetText,
    appendText: AppendText,
    insertText: InsertText,
    removeText: RemoveText,
    getText: GetText,
    createImageChild: CreateImageChild,
    appendImage: AppendImage,
    createDrawerChild: CreateDrawerChild,
    appendDrawer: AppendDrawer,
    createSpaceChild: CreateSpaceChild,
    appendSpace: AppendSpace,
    createCommandChild: CreateCommandChild,
    appendCommand: AppendCommand$3,
    setWrapConfig: SetWrapConfig,
    runWordWrap: RunWordWrap,
    runVerticalWrap: RunVerticalWrap,
    runWrap: RunWrap,
    renderContent: RenderContent,
    forEachChild: ForEachChild,
    forEachRenderableChild: ForEachRenderableChild,
    forEachCharChild: ForEachCharChild,
    getChildren: GetChildren,
    getActiveChildren: GetActiveChildren,
    getCharChildren: GetCharChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
    getNearestChild: GetNearestChild,
    getCharWorldPosition: GetCharWorldPosition,
    setToMinSize: SetToMinSize,
    getCharChildIndex: GetCharChildIndex,
    getCharChild: GetCharChild,
    getCharIndex: GetCharIndex,
    setChildrenInteractiveEnable: SetChildrenInteractiveEnable,
    setInteractive: SetInteractive
  };
  Object.assign(Methods$3, MoveChildMethods, BackgroundMethods, InnerBoundsMethods, SetAlignMethods, SetTextOXYMethods);

  var GetFastValue = Phaser.Utils.Objects.GetFastValue;
  var Pools = {};
  var PoolManager = /*#__PURE__*/function () {
    function PoolManager(config) {
      _classCallCheck(this, PoolManager);
      this.pools = GetFastValue(config, 'pools', Pools);
    }
    _createClass(PoolManager, [{
      key: "free",
      value: function free(bob) {
        if (!this.pools) {
          return this;
        }
        var bobType = bob.type;
        if (!this.pools.hasOwnProperty(bobType)) {
          this.pools[bobType] = new Stack();
        }
        this.pools[bobType].push(bob);
        bob.onFree();
        return this;
      }
    }, {
      key: "freeMultiple",
      value: function freeMultiple(arr) {
        if (!this.pools) {
          return this;
        }
        for (var i = 0, cnt = arr.length; i < cnt; i++) {
          this.free(arr[i]);
        }
        return this;
      }
    }, {
      key: "allocate",
      value: function allocate(bobType) {
        if (!this.pools || !this.pools.hasOwnProperty(bobType)) {
          return null;
        }
        return this.pools[bobType].pop();
      }
    }]);
    return PoolManager;
  }();

  var IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var DynamicText = /*#__PURE__*/function (_Canvas) {
    _inherits(DynamicText, _Canvas);
    function DynamicText(scene, x, y, fixedWidth, fixedHeight, config) {
      var _this;
      _classCallCheck(this, DynamicText);
      if (IsPlainObject$2(x)) {
        config = x;
        x = GetValue$4(config, 'x', 0);
        y = GetValue$4(config, 'y', 0);
        fixedWidth = GetValue$4(config, 'width', 0);
        fixedHeight = GetValue$4(config, 'height', 0);
      } else if (IsPlainObject$2(fixedWidth)) {
        config = fixedWidth;
        fixedWidth = GetValue$4(config, 'width', 0);
        fixedHeight = GetValue$4(config, 'height', 0);
      }
      var width = fixedWidth === 0 ? 1 : fixedWidth;
      var height = fixedHeight === 0 ? 1 : fixedHeight;
      _this = _callSuper(this, DynamicText, [scene, x, y, width, height]);
      _this.type = 'rexDynamicText';
      _this.autoRound = true;
      _this.padding = SetPadding$1();
      _this.wrapPadding = SetPadding$1();
      var textStyleConfig = GetValue$4(config, 'style', undefined);
      _this.defaultTextStyle = new TextStyle(null, textStyleConfig);
      _this.textStyle = _this.defaultTextStyle.clone();
      _this.setTestString(GetValue$4(config, 'testString', '|MÉqgy'));
      _this._textOX = 0;
      _this._textOY = 0;
      _this.background = new Background(_assertThisInitialized(_this), GetValue$4(config, 'background', undefined));
      _this.innerBounds = new InnerBounds(_assertThisInitialized(_this), GetValue$4(config, 'innerBounds', undefined));
      _this.children = [];
      _this.lastAppendedChildren = [];
      _this.lastOverChild = null;
      _this.poolManager = new PoolManager(config);
      _this.setFixedSize(fixedWidth, fixedHeight);
      _this.setPadding(GetValue$4(config, 'padding', 0));
      _this.setWrapConfig(GetValue$4(config, 'wrap', undefined));
      _this.setChildrenInteractiveEnable(GetValue$4(config, 'childrenInteractive', false));
      var text = GetValue$4(config, 'text', undefined);
      if (text) {
        _this.setText(text);
      }
      return _this;
    }
    _createClass(DynamicText, [{
      key: "updateTexture",
      value: function updateTexture() {
        this.renderContent();
        _get(_getPrototypeOf(DynamicText.prototype), "updateTexture", this).call(this);
        return this;
      }
    }, {
      key: "text",
      get: function get() {
        return this.getText(true);
      },
      set: function set(value) {
        this.setText(value);
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.setFixedSize(width, height);
        return this;
      }
    }, {
      key: "textOX",
      get: function get() {
        return this._textOX;
      },
      set: function set(value) {
        this.setTextOX(value);
      }
    }, {
      key: "textOY",
      get: function get() {
        return this._textOY;
      },
      set: function set(value) {
        this.setTextOY(value);
      }
    }]);
    return DynamicText;
  }(Canvas);
  Object.assign(DynamicText.prototype, Methods$3);

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var eventemitter3 = {exports: {}};

  (function (module) {

  	var has = Object.prototype.hasOwnProperty
  	  , prefix = '~';

  	/**
  	 * Constructor to create a storage for our `EE` objects.
  	 * An `Events` instance is a plain object whose properties are event names.
  	 *
  	 * @constructor
  	 * @private
  	 */
  	function Events() {}

  	//
  	// We try to not inherit from `Object.prototype`. In some engines creating an
  	// instance in this way is faster than calling `Object.create(null)` directly.
  	// If `Object.create(null)` is not supported we prefix the event names with a
  	// character to make sure that the built-in object properties are not
  	// overridden or used as an attack vector.
  	//
  	if (Object.create) {
  	  Events.prototype = Object.create(null);

  	  //
  	  // This hack is needed because the `__proto__` property is still inherited in
  	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  	  //
  	  if (!new Events().__proto__) prefix = false;
  	}

  	/**
  	 * Representation of a single event listener.
  	 *
  	 * @param {Function} fn The listener function.
  	 * @param {*} context The context to invoke the listener with.
  	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
  	 * @constructor
  	 * @private
  	 */
  	function EE(fn, context, once) {
  	  this.fn = fn;
  	  this.context = context;
  	  this.once = once || false;
  	}

  	/**
  	 * Add a listener for a given event.
  	 *
  	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn The listener function.
  	 * @param {*} context The context to invoke the listener with.
  	 * @param {Boolean} once Specify if the listener is a one-time listener.
  	 * @returns {EventEmitter}
  	 * @private
  	 */
  	function addListener(emitter, event, fn, context, once) {
  	  if (typeof fn !== 'function') {
  	    throw new TypeError('The listener must be a function');
  	  }

  	  var listener = new EE(fn, context || emitter, once)
  	    , evt = prefix ? prefix + event : event;

  	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  	  else emitter._events[evt] = [emitter._events[evt], listener];

  	  return emitter;
  	}

  	/**
  	 * Clear event by name.
  	 *
  	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
  	 * @param {(String|Symbol)} evt The Event name.
  	 * @private
  	 */
  	function clearEvent(emitter, evt) {
  	  if (--emitter._eventsCount === 0) emitter._events = new Events();
  	  else delete emitter._events[evt];
  	}

  	/**
  	 * Minimal `EventEmitter` interface that is molded against the Node.js
  	 * `EventEmitter` interface.
  	 *
  	 * @constructor
  	 * @public
  	 */
  	function EventEmitter() {
  	  this._events = new Events();
  	  this._eventsCount = 0;
  	}

  	/**
  	 * Return an array listing the events for which the emitter has registered
  	 * listeners.
  	 *
  	 * @returns {Array}
  	 * @public
  	 */
  	EventEmitter.prototype.eventNames = function eventNames() {
  	  var names = []
  	    , events
  	    , name;

  	  if (this._eventsCount === 0) return names;

  	  for (name in (events = this._events)) {
  	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  	  }

  	  if (Object.getOwnPropertySymbols) {
  	    return names.concat(Object.getOwnPropertySymbols(events));
  	  }

  	  return names;
  	};

  	/**
  	 * Return the listeners registered for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @returns {Array} The registered listeners.
  	 * @public
  	 */
  	EventEmitter.prototype.listeners = function listeners(event) {
  	  var evt = prefix ? prefix + event : event
  	    , handlers = this._events[evt];

  	  if (!handlers) return [];
  	  if (handlers.fn) return [handlers.fn];

  	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
  	    ee[i] = handlers[i].fn;
  	  }

  	  return ee;
  	};

  	/**
  	 * Return the number of listeners listening to a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @returns {Number} The number of listeners.
  	 * @public
  	 */
  	EventEmitter.prototype.listenerCount = function listenerCount(event) {
  	  var evt = prefix ? prefix + event : event
  	    , listeners = this._events[evt];

  	  if (!listeners) return 0;
  	  if (listeners.fn) return 1;
  	  return listeners.length;
  	};

  	/**
  	 * Calls each of the listeners registered for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @returns {Boolean} `true` if the event had listeners, else `false`.
  	 * @public
  	 */
  	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  	  var evt = prefix ? prefix + event : event;

  	  if (!this._events[evt]) return false;

  	  var listeners = this._events[evt]
  	    , len = arguments.length
  	    , args
  	    , i;

  	  if (listeners.fn) {
  	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

  	    switch (len) {
  	      case 1: return listeners.fn.call(listeners.context), true;
  	      case 2: return listeners.fn.call(listeners.context, a1), true;
  	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
  	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
  	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
  	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
  	    }

  	    for (i = 1, args = new Array(len -1); i < len; i++) {
  	      args[i - 1] = arguments[i];
  	    }

  	    listeners.fn.apply(listeners.context, args);
  	  } else {
  	    var length = listeners.length
  	      , j;

  	    for (i = 0; i < length; i++) {
  	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

  	      switch (len) {
  	        case 1: listeners[i].fn.call(listeners[i].context); break;
  	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
  	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
  	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
  	        default:
  	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
  	            args[j - 1] = arguments[j];
  	          }

  	          listeners[i].fn.apply(listeners[i].context, args);
  	      }
  	    }
  	  }

  	  return true;
  	};

  	/**
  	 * Add a listener for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn The listener function.
  	 * @param {*} [context=this] The context to invoke the listener with.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.on = function on(event, fn, context) {
  	  return addListener(this, event, fn, context, false);
  	};

  	/**
  	 * Add a one-time listener for a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn The listener function.
  	 * @param {*} [context=this] The context to invoke the listener with.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.once = function once(event, fn, context) {
  	  return addListener(this, event, fn, context, true);
  	};

  	/**
  	 * Remove the listeners of a given event.
  	 *
  	 * @param {(String|Symbol)} event The event name.
  	 * @param {Function} fn Only remove the listeners that match this function.
  	 * @param {*} context Only remove the listeners that have this context.
  	 * @param {Boolean} once Only remove one-time listeners.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  	  var evt = prefix ? prefix + event : event;

  	  if (!this._events[evt]) return this;
  	  if (!fn) {
  	    clearEvent(this, evt);
  	    return this;
  	  }

  	  var listeners = this._events[evt];

  	  if (listeners.fn) {
  	    if (
  	      listeners.fn === fn &&
  	      (!once || listeners.once) &&
  	      (!context || listeners.context === context)
  	    ) {
  	      clearEvent(this, evt);
  	    }
  	  } else {
  	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
  	      if (
  	        listeners[i].fn !== fn ||
  	        (once && !listeners[i].once) ||
  	        (context && listeners[i].context !== context)
  	      ) {
  	        events.push(listeners[i]);
  	      }
  	    }

  	    //
  	    // Reset the array, or remove it completely if we have no more listeners.
  	    //
  	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
  	    else clearEvent(this, evt);
  	  }

  	  return this;
  	};

  	/**
  	 * Remove all listeners, or those of the specified event.
  	 *
  	 * @param {(String|Symbol)} [event] The event name.
  	 * @returns {EventEmitter} `this`.
  	 * @public
  	 */
  	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  	  var evt;

  	  if (event) {
  	    evt = prefix ? prefix + event : event;
  	    if (this._events[evt]) clearEvent(this, evt);
  	  } else {
  	    this._events = new Events();
  	    this._eventsCount = 0;
  	  }

  	  return this;
  	};

  	//
  	// Alias methods names because people roll like that.
  	//
  	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  	//
  	// Expose the prefix.
  	//
  	EventEmitter.prefixed = prefix;

  	//
  	// Allow `EventEmitter` to be imported as module namespace.
  	//
  	EventEmitter.EventEmitter = EventEmitter;

  	//
  	// Expose the module.
  	//
  	{
  	  module.exports = EventEmitter;
  	} 
  } (eventemitter3));

  var eventemitter3Exports = eventemitter3.exports;
  var EE = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

  var EventEmitter = /*#__PURE__*/function (_EE) {
    _inherits(EventEmitter, _EE);
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);
      return _callSuper(this, EventEmitter, arguments);
    }
    _createClass(EventEmitter, [{
      key: "shutdown",
      value: function shutdown() {
        this.removeAllListeners();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.removeAllListeners();
      }
    }]);
    return EventEmitter;
  }(EE);

  var EventEmitterMethods = {
    setEventEmitter: function setEventEmitter(eventEmitter, EventEmitterClass) {
      if (EventEmitterClass === undefined) {
        EventEmitterClass = EventEmitter;
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

  var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
  var HEX = /^0x[0-9A-F]+$/i;
  var TypeConvert = function TypeConvert(s) {
    if (typeof s !== 'string') {
      return s;
    }
    if (s === '') {
      s = null;
    } else if (FLOAT.test(s)) {
      s = parseFloat(s);
    } else if (HEX.test(s)) {
      s = parseInt(s, 16);
    } else {
      switch (s) {
        case 'false':
          s = false;
          break;
        case 'true':
          s = true;
          break;
        case 'null':
          s = null;
          break;
        case 'undefined':
          s = undefined;
          break;
      }
    }
    return s;
  };

  // https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js

  var EscapeRegex = function EscapeRegex(s) {
    return s.replace(re0, '\\$&').replace(re1, '\\x2d');
  };
  var re0 = /[|\\{}()[\]^$+*?.]/g;
  var re1 = /-/g;

  var BracketParser$1 = /*#__PURE__*/function () {
    function BracketParser(config) {
      _classCallCheck(this, BracketParser);
      // Event emitter
      this.setEventEmitter(GetValue$f(config, 'eventEmitter', undefined));

      // Value convert
      this.setValueConverter(GetValue$f(config, 'valueConvert', true));
      // Loop
      this.setLoopEnable(GetValue$f(config, 'loop', false));

      // Brackets and generate regex
      this.setMultipleLinesTagEnable(GetValue$f(config, 'multipleLinesTag', false));
      var delimiters = GetValue$f(config, 'delimiters', '<>');
      this.setDelimiters(delimiters[0], delimiters[1]);

      // Translate tagName callback
      this.setTranslateTagNameCallback(GetValue$f(config, 'translateTagNameCallback'));
      this.isRunning = false;
      this.isPaused = false;
      this.skipEventFlag = false;
      this.justCompleted = false;
      this.lastTagStart = null;
      this.lastTagEnd = null;
      this.lastContent = null;
    }
    _createClass(BracketParser, [{
      key: "shutdown",
      value: function shutdown() {
        this.destroyEventEmitter();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "setMultipleLinesTagEnable",
      value: function setMultipleLinesTagEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.multipleLinesTagEnable = enable;
        return this;
      }

      // Override
    }, {
      key: "setDelimiters",
      value: function setDelimiters(delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
          delimiterRight = delimiterLeft[1];
          delimiterLeft = delimiterLeft[0];
        }
        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;
        delimiterLeft = EscapeRegex(this.delimiterLeft);
        delimiterRight = EscapeRegex(this.delimiterRight);
        var flag = this.multipleLinesTagEnable ? 'gs' : 'gi';
        this.reSplit = RegExp("".concat(delimiterLeft, "(.+?)").concat(delimiterRight), flag);
        return this;
      }
    }, {
      key: "setTranslateTagNameCallback",
      value: function setTranslateTagNameCallback(callback) {
        this.translateTagNameCallback = callback;
        return this;
      }
    }, {
      key: "setValueConverter",
      value: function setValueConverter(converter) {
        if (converter === true) {
          converter = TypeConvert;
        } else if (!converter) {
          converter = BypassValueConverter;
        }
        this.valueConverter = converter;
        return this;
      }
    }, {
      key: "setLoopEnable",
      value: function setLoopEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.loopEnable = enable;
        return this;
      }
    }, {
      key: "setSource",
      value: function setSource(source) {
        this.source = source;
        return this;
      }
    }, {
      key: "resetIndex",
      value: function resetIndex(index) {
        if (index === undefined) {
          index = 0;
        }
        this.progressIndex = index;
        this.reSplit.lastIndex = index;
        this.lastTagStart = null;
        this.lastTagEnd = null;
        this.lastContent = null;
        this.justCompleted = false;
        this.isRunning = false;
        return this;
      }
    }, {
      key: "start",
      value: function start(source) {
        this.setSource(source).restart();
        return this;
      }
    }, {
      key: "restart",
      value: function restart() {
        this.resetIndex().next();
      }
    }, {
      key: "next",
      value: function next() {
        if (this.isPaused) {
          this.onResume();
        }

        // Don't re-enter this method
        if (this.isRunning) {
          return this;
        }
        this.isRunning = true;
        if (this.justCompleted) {
          this.isRunning = false;
          return this;
        }
        if (this.reSplit.lastIndex === 0) {
          this.onStart();
        }
        var text = this.source,
          lastIndex = text.length;
        this.reSplit.lastIndex = this.progressIndex;
        while (true) {
          var regexResult = this.reSplit.exec(text);
          // No tag found, complete
          if (!regexResult) {
            if (this.progressIndex < lastIndex) {
              this.onContent(text.substring(this.progressIndex, lastIndex));
              // Might pause here
              if (this.isPaused) {
                this.progressIndex = lastIndex;
                break;
              }
            }
            this.onComplete();
            this.isRunning = false;
            return;
          }
          var matchEnd = this.reSplit.lastIndex;
          var matchStart = matchEnd - regexResult[0].length;

          // Process content between previous tag and current tag            
          if (this.progressIndex < matchStart) {
            this.onContent(text.substring(this.progressIndex, matchStart));
            // Might pause here
            if (this.isPaused) {
              this.progressIndex = matchStart;
              break;
            }
          }

          // Process current tag
          this.lastTagSource = regexResult[0];
          this.onTag(regexResult[1]);
          this.lastTagSource = undefined;
          this.progressIndex = matchEnd;
          // Might pause here
          if (this.isPaused) {
            break;
          }
        }
        this.isRunning = false;
        return this;
      }
    }, {
      key: "skipEvent",
      value: function skipEvent() {
        this.skipEventFlag = true;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        if (!this.isPaused) {
          this.onPause();
        }
        return this;
      }
    }, {
      key: "pauseUntilEvent",
      value: function pauseUntilEvent(eventEmitter, eventName) {
        if (this.isPaused) {
          return this;
        }
        this.pause();
        eventEmitter.once(eventName, function () {
          this.next();
        }, this);
        return this;
      }
    }, {
      key: "onContent",
      value: function onContent(content) {
        this.skipEventFlag = false;
        this.emit('content', content);
        this.lastContent = content;
      }

      // Override
    }, {
      key: "onTag",
      value: function onTag(tagContent) {}
    }, {
      key: "onStart",
      value: function onStart() {
        this.isRunning = true;
        this.emit('start', this);
      }
    }, {
      key: "onComplete",
      value: function onComplete() {
        this.isRunning = false;
        this.justCompleted = true;
        this.emit('complete', this);
        if (this.loopEnable) {
          this.resetIndex();
        }
      }
    }, {
      key: "onPause",
      value: function onPause() {
        this.isPaused = true;
        this.emit('pause', this);
      }
    }, {
      key: "onResume",
      value: function onResume() {
        this.isPaused = false;
        this.emit('resume', this);
      }
    }]);
    return BracketParser;
  }();
  var BypassValueConverter = function BypassValueConverter(s) {
    return s;
  };
  Object.assign(BracketParser$1.prototype, EventEmitterMethods);

  var StringToValues = function StringToValues(text, valueConverter, delimiter) {
    if (text == null) {
      return [];
    }
    if (valueConverter === undefined) {
      valueConverter = TypeConvert;
    }
    if (delimiter === undefined) {
      delimiter = ',';
    }
    var values = text.split(delimiter);
    for (var i = 0, cnt = values.length; i < cnt; i++) {
      values[i] = valueConverter(values[i]);
    }
    return values;
  };

  var BracketParser = /*#__PURE__*/function (_BracketParserBase) {
    _inherits(BracketParser, _BracketParserBase);
    function BracketParser(config) {
      var _this;
      _classCallCheck(this, BracketParser);
      if (config === undefined) {
        config = {};
      }
      if (!config.hasOwnProperty('multipleLinesTag')) {
        config.multipleLinesTag = false;
      }
      _this = _callSuper(this, BracketParser, [config]);

      // Parameters for regex
      _this.setTagExpression(GetValue$f(config, 'regex.tag', undefined));
      _this.setValueExpression(GetValue$f(config, 'regex.value', undefined));
      // Brackets and generate regex
      var delimiters = GetValue$f(config, 'delimiters', '<>');
      _this.setDelimiters(delimiters[0], delimiters[1]);
      return _this;
    }
    _createClass(BracketParser, [{
      key: "setTagExpression",
      value: function setTagExpression(express) {
        if (!express) {
          express = DefaultTokenExpression;
        }
        this.tagExpression = express;
        return this;
      }
    }, {
      key: "setValueExpression",
      value: function setValueExpression(express) {
        if (!express) {
          express = DefaultTokenExpression;
        }
        this.valueExpression = express;
        return this;
      }
    }, {
      key: "setDelimiters",
      value: function setDelimiters(delimiterLeft, delimiterRight) {
        _get(_getPrototypeOf(BracketParser.prototype), "setDelimiters", this).call(this, delimiterLeft, delimiterRight);
        var tag = "(".concat(this.tagExpression, ")(=(").concat(this.valueExpression, "))?");
        this.reTag = RegExp(tag, 'i');
        if (this.tagExpression !== DefaultTokenExpression || this.valueExpression !== DefaultTokenExpression) {
          var startTagExpression = "".concat(this.tagExpression, "(=").concat(this.valueExpression, ")?");
          var endTagExpression = "/".concat(this.tagExpression);
          delimiterLeft = EscapeRegex(this.delimiterLeft);
          delimiterRight = EscapeRegex(this.delimiterRight);
          var flag = this.multipleLinesTagEnable ? 'gs' : 'gi';
          this.reSplit = RegExp("".concat(delimiterLeft, "((").concat(startTagExpression, ")|(").concat(endTagExpression, "))").concat(delimiterRight), flag);
        }
        return this;
      }
    }, {
      key: "onTag",
      value: function onTag(tagContent) {
        var regexResult = tagContent.match(this.reTag);
        var tagName = regexResult[1];
        var isEndTag = tagName.charAt(0) === '/';
        if (isEndTag) {
          tagName = tagName.substring(1, tagName.length);
        }
        if (this.translateTagNameCallback) {
          tagName = this.translateTagNameCallback(tagName);
        }
        this.skipEventFlag = false;
        if (!isEndTag) {
          var values = StringToValues(regexResult[3], this.valueConverter);
          this.emit.apply(this, ["+".concat(tagName)].concat(_toConsumableArray(values)));
          if (!this.skipEventFlag) {
            this.emit.apply(this, ['+', tagName].concat(_toConsumableArray(values)));
          }
          this.lastTagStart = tagName;
        } else {
          this.emit("-".concat(tagName));
          if (!this.skipEventFlag) {
            this.emit('-', tagName);
          }
          this.lastTagEnd = tagName;
        }
      }
    }]);
    return BracketParser;
  }(BracketParser$1);
  var DefaultTokenExpression = "[^=]+";

  var OnParseColorTag = function OnParseColorTag(textPlayer, parser, config) {
    var tagName = 'color';
    var defaultColor;
    parser.on('start', function () {
      defaultColor = textPlayer.textStyle.color;
    }).on("+".concat(tagName), function (color) {
      textPlayer.textStyle.setColor(color);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setColor(defaultColor);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setColor(defaultColor);
    });
  };

  var OnParseStrokeColorTag = function OnParseStrokeColorTag(textPlayer, parser, config) {
    var tagName = 'stroke';
    var defaultStroke;
    parser.on('start', function () {
      defaultStroke = textPlayer.textStyle.stroke;
      textPlayer.textStyle.setStrokeStyle(null);
    }).on("+".concat(tagName), function (color) {
      if (color === undefined) {
        color = defaultStroke;
      }
      textPlayer.textStyle.setStrokeStyle(color);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setStrokeStyle(null);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setStrokeStyle(defaultStroke);
    });
  };

  var OnParseBoldTag = function OnParseBoldTag(textPlayer, parser, config) {
    var tagName = 'b';
    parser.on('start', function () {
      textPlayer.textStyle.setBold(false);
    }).on("+".concat(tagName), function () {
      textPlayer.textStyle.setBold(true);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setBold(false);
      parser.skipEvent();
    });
  };

  var OnParseItalicTag = function OnParseItalicTag(textPlayer, parser, config) {
    var tagName = 'i';
    parser.on('start', function () {
      textPlayer.textStyle.setItalic(false);
    }).on("+".concat(tagName), function () {
      textPlayer.textStyle.setItalic(true);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setItalic(false);
      parser.skipEvent();
    });
  };

  var OnParseFontSizeTag = function OnParseFontSizeTag(textPlayer, parser, config) {
    var tagName = 'size';
    var defaultFontSize;
    parser.on('start', function () {
      defaultFontSize = textPlayer.textStyle.fontSize;
    }).on("+".concat(tagName), function (fontSize) {
      textPlayer.textStyle.setFontSize(fontSize);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setFontSize(defaultFontSize);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setFontSize(defaultFontSize);
    });
  };

  var OnParseOffsetYTag = function OnParseOffsetYTag(textPlayer, parser, config) {
    var tagName = 'y';
    var defaultOffsetY;
    parser.on('start', function () {
      defaultOffsetY = textPlayer.textStyle.offsetY;
      textPlayer.textStyle.setOffsetY(0);
    }).on("+".concat(tagName), function (y) {
      if (y === undefined) {
        y = defaultOffsetY;
      }
      textPlayer.textStyle.setOffsetY(y);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setOffsetY(0);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setOffsetY(0);
    });
  };

  var OnParseOffsetXTag = function OnParseOffsetXTag(textPlayer, parser, config) {
    var tagName = 'x';
    var defaultOffsetX;
    parser.on('start', function () {
      defaultOffsetX = textPlayer.textStyle.offsetY;
      textPlayer.textStyle.setOffsetX(0);
    }).on("+".concat(tagName), function (y) {
      if (y === undefined) {
        y = defaultOffsetX;
      }
      textPlayer.textStyle.setOffsetX(y);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setOffsetX(0);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setOffsetX(0);
    });
  };

  var OnParseLeftSpaceTag = function OnParseLeftSpaceTag(textPlayer, parser, config) {
    var tagName = 'left';
    var defaultLeftSpace;
    parser.on('start', function () {
      defaultLeftSpace = textPlayer.textStyle.leftSpace;
      textPlayer.textStyle.setLeftSpace(0);
    }).on("+".concat(tagName), function (space) {
      if (space === undefined) {
        space = defaultLeftSpace;
      }
      textPlayer.textStyle.setLeftSpace(space);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setLeftSpace(0);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setLeftSpace(0);
    });
  };

  var OnParseRightSpaceTag = function OnParseRightSpaceTag(textPlayer, parser, config) {
    var tagName = 'right';
    var defaultRightSpace;
    parser.on('start', function () {
      defaultRightSpace = textPlayer.textStyle.rightSpace;
      textPlayer.textStyle.setRightSpace(0);
    }).on("+".concat(tagName), function (space) {
      if (space === undefined) {
        space = defaultRightSpace;
      }
      textPlayer.textStyle.setRightSpace(space);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setRightSpace(0);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setRightSpace(0);
    });
  };

  var OnParseShadowColorTag = function OnParseShadowColorTag(textPlayer, parser, config) {
    var tagName = 'shadow';
    var defaultShadowColor;
    parser.on('start', function () {
      defaultShadowColor = textPlayer.textStyle.shadowColor;
      textPlayer.textStyle.setShadowColor(null);
    }).on("+".concat(tagName), function (color) {
      if (color === undefined) {
        color = defaultShadowColor;
      }
      textPlayer.textStyle.setShadowColor(color);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setShadowColor(null);
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setShadowColor(defaultShadowColor);
    });
  };

  var OnParseAlignTag = function OnParseAlignTag(textPlayer, parser, config) {
    var tagName = 'align';
    parser.on("+".concat(tagName), function (align) {
      textPlayer.textStyle.setAlign(align);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      textPlayer.textStyle.setAlign();
      parser.skipEvent();
    }).on('complete', function () {
      textPlayer.textStyle.setAlign();
    });
  };

  var OnParseImageTag$1 = function OnParseImageTag(textPlayer, parser, config) {
    var tagName = 'img';
    parser.on("+".concat(tagName), function (name) {
      var imgData = textPlayer.imageManager.get(name);
      AppendImage.call(textPlayer, imgData.key, imgData.frame, {
        width: imgData.width,
        hieght: imgData.height,
        leftSpace: imgData.left,
        rightSpace: imgData.right,
        color: imgData.tintFill ? textPlayer.textStyle.color : undefined
      });
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseImageTag = function OnParseImageTag(textPlayer, parser, config) {
    var tagName = 'space';
    parser.on("+".concat(tagName), function (width) {
      AppendSpace.call(textPlayer, width);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseTypingSpeedTag = function OnParseTypingSpeedTag(textPlayer, parser, config) {
    var tagName = 'speed';
    parser.on("+".concat(tagName), function (speed) {
      AppendCommand$2(textPlayer, speed);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      AppendCommand$2(textPlayer, undefined);
      parser.skipEvent();
    });
  };
  var SetTypingSpeed = function SetTypingSpeed(speed) {
    this.typeWriter.setTypingSpeed(speed); // this: textPlayer
  };
  var AppendCommand$2 = function AppendCommand(textPlayer, speed) {
    AppendCommand$3.call(textPlayer, 'speed',
    // name
    SetTypingSpeed,
    // callback
    speed,
    // params
    textPlayer // scope
    );
  };

  var OnParsePlaySoundEffectTag = function OnParsePlaySoundEffectTag(textPlayer, parser, config) {
    var tagName = 'se';
    parser.on("+".concat(tagName), function (name, fadeInTime) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      PlaySoundEffect,
      // callback
      [name, fadeInTime],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se2';
    parser.on("+".concat(tagName), function (name, fadeInTime) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      PlaySoundEffect2,
      // callback
      [name, fadeInTime],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };
  var PlaySoundEffect = function PlaySoundEffect(params) {
    if (this.skipSoundEffect) {
      return;
    }
    var name = params[0];
    var fadeInTime = params[1];
    this.soundManager.playSoundEffect(name); // this: textPlayer
    if (fadeInTime) {
      this.soundManager.fadeInSoundEffect(fadeInTime);
    }
  };
  var PlaySoundEffect2 = function PlaySoundEffect2(params) {
    if (this.skipSoundEffect) {
      return;
    }
    var name = params[0];
    var fadeInTime = params[1];
    this.soundManager.playSoundEffect2(name); // this: textPlayer
    if (fadeInTime) {
      this.soundManager.fadeInSoundEffect2(fadeInTime);
    }
  };

  var OnParseFadeInSoundEffectTag = function OnParseFadeInSoundEffectTag(textPlayer, parser, config) {
    var tagName = 'se.fadein';
    parser.on("+".concat(tagName), function (time) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      FadeInSoundEffect,
      // callback
      time,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se2.fadein';
    parser.on("+".concat(tagName), function (time) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      FadeInSoundEffect2,
      // callback
      time,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };
  var FadeInSoundEffect = function FadeInSoundEffect(time) {
    // this: textPlayer
    this.soundManager.fadeInSoundEffect(time);
  };
  var FadeInSoundEffect2 = function FadeInSoundEffect2(time) {
    // this: textPlayer
    this.soundManager.fadeInSoundEffect2(time);
  };

  var OnParseFadeOutSoundEffectTag = function OnParseFadeOutSoundEffectTag(textPlayer, parser, config) {
    var tagName = 'se.fadeout';
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      AppendCommand$3.call(textPlayer, tagName,
      // name
      FadeOutSoundEffect,
      // callback
      [time, isStopped],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se2.fadeout';
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      AppendCommand$3.call(textPlayer, tagName,
      // name
      FadeOutSoundEffect2,
      // callback
      [time, isStopped],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };
  var FadeOutSoundEffect = function FadeOutSoundEffect(params) {
    var _this$soundManager;
    // this: textPlayer
    (_this$soundManager = this.soundManager).fadeOutSoundEffect.apply(_this$soundManager, _toConsumableArray(params));
  };
  var FadeOutSoundEffect2 = function FadeOutSoundEffect2(params) {
    var _this$soundManager2;
    // this: textPlayer
    (_this$soundManager2 = this.soundManager).fadeOutSoundEffect2.apply(_this$soundManager2, _toConsumableArray(params));
  };

  var OnParseSetSoundEffectVolumeTag = function OnParseSetSoundEffectVolumeTag(textPlayer, parser, config) {
    var tagName = 'se.volume';
    parser.on("+".concat(tagName), function (volume) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      SetSoundEffectVolume,
      // callback
      volume,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se2.volume';
    parser.on("+".concat(tagName), function (volume) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      SetSoundEffectVolume2,
      // callback
      volume,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };
  var SetSoundEffectVolume = function SetSoundEffectVolume(volume) {
    // this: textPlayer
    this.soundManager.setSoundEffectVolume(volume, true);
  };
  var SetSoundEffectVolume2 = function SetSoundEffectVolume2(volume) {
    // this: textPlayer
    this.soundManager.setSoundEffectVolume2(volume, true);
  };

  var OnParseSetSoundEffectMuteTag = function OnParseSetSoundEffectMuteTag(textPlayer, parser, config) {
    var tagName = 'se.mute';
    parser.on("+".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      SetSoundEffectMute,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se2.mute';
    parser.on("+".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      SetSoundEffect2Mute,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se.unmute';
    parser.on("+".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      SetSoundEffectUnMute,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se2.unmute';
    parser.on("+".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      SetSoundEffect2UnMute,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };
  var SetSoundEffectMute = function SetSoundEffectMute() {
    // this: textPlayer
    this.soundManager.setSoundEffectMute(true);
  };
  var SetSoundEffect2Mute = function SetSoundEffect2Mute() {
    // this: textPlayer
    this.soundManager.setSoundEffect2Mute(true);
  };
  var SetSoundEffectUnMute = function SetSoundEffectUnMute() {
    // this: textPlayer
    this.soundManager.setSoundEffectMute(false);
  };
  var SetSoundEffect2UnMute = function SetSoundEffect2UnMute() {
    // this: textPlayer
    this.soundManager.setSoundEffect2Mute(false);
  };

  var OnParsePlayBackgroundMusicTag = function OnParsePlayBackgroundMusicTag(textPlayer, parser, config) {
    var tagName = 'bgm';
    parser.on("+".concat(tagName), function (name, fadeInTime) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      PlayBackgroundMusic,
      // callback
      [name, fadeInTime],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, 'bgm.stop',
      // name
      StopBackgroundMusic,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
    var tagName = 'bgm2';
    parser.on("+".concat(tagName), function (name, fadeInTime) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      PlayBackgroundMusic2,
      // callback
      [name, fadeInTime],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, 'bgm2.stop',
      // name
      StopBackgroundMusic2,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var PlayBackgroundMusic = function PlayBackgroundMusic(params) {
    var name = params[0];
    var fadeInTime = params[1];

    // this: textPlayer
    this.soundManager.playBackgroundMusic(name);
    if (fadeInTime) {
      this.soundManager.fadeInBackgroundMusic(fadeInTime);
    }
  };
  var StopBackgroundMusic = function StopBackgroundMusic() {
    // this: textPlayer
    this.soundManager.stopBackgroundMusic();
  };
  var PlayBackgroundMusic2 = function PlayBackgroundMusic2(params) {
    var name = params[0];
    var fadeInTime = params[1];

    // this: textPlayer
    this.soundManager.playBackgroundMusic2(name);
    if (fadeInTime) {
      this.soundManager.fadeInBackgroundMusic2(fadeInTime);
    }
  };
  var StopBackgroundMusic2 = function StopBackgroundMusic2() {
    // this: textPlayer
    this.soundManager.stopBackgroundMusic2();
  };

  var OnParseFadeInBackgroundMusicTag = function OnParseFadeInBackgroundMusicTag(textPlayer, parser, config) {
    var tagName = 'bgm.fadein';
    parser.on("+".concat(tagName), function (time) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      FadeInBackgroundMusic,
      // callback
      time,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm2.fadein';
    parser.on("+".concat(tagName), function (time) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      FadeInBackgroundMusic2,
      // callback
      time,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };
  var FadeInBackgroundMusic = function FadeInBackgroundMusic(time) {
    // this: textPlayer
    this.soundManager.fadeInBackgroundMusic(time);
  };
  var FadeInBackgroundMusic2 = function FadeInBackgroundMusic2(time) {
    // this: textPlayer
    this.soundManager.fadeInBackgroundMusic2(time);
  };

  var OnParseFadeOutBackgroundMusicTag = function OnParseFadeOutBackgroundMusicTag(textPlayer, parser, config) {
    var tagName = 'bgm.fadeout';
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      AppendCommand$3.call(textPlayer, tagName,
      // name
      FadeOutBackgroundMusic,
      // callback
      [time, isStopped],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm2.fadeout';
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      AppendCommand$3.call(textPlayer, tagName,
      // name
      FadeOutBackgroundMusic2,
      // callback
      [time, isStopped],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };
  var FadeOutBackgroundMusic = function FadeOutBackgroundMusic(params) {
    var _this$soundManager;
    // this: textPlayer
    (_this$soundManager = this.soundManager).fadeOutBackgroundMusic.apply(_this$soundManager, _toConsumableArray(params));
  };
  var FadeOutBackgroundMusic2 = function FadeOutBackgroundMusic2(params) {
    var _this$soundManager2;
    // this: textPlayer
    (_this$soundManager2 = this.soundManager).fadeOutBackgroundMusic2.apply(_this$soundManager2, _toConsumableArray(params));
  };

  var OnParseCrossFadeBackgroundMusicTag = function OnParseCrossFadeBackgroundMusicTag(textPlayer, parser, config) {
    var tagName = 'bgm.cross';
    parser.on("+".concat(tagName), function (name, fadeTime) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      CrossFadeBackgroundMusic,
      // callback
      [name, fadeTime],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm2.cross';
    parser.on("+".concat(tagName), function (name, fadeTime) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      CrossFadeBackgroundMusic2,
      // callback
      [name, fadeTime],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };
  var CrossFadeBackgroundMusic = function CrossFadeBackgroundMusic(params) {
    var _this$soundManager;
    // this: textPlayer
    (_this$soundManager = this.soundManager).crossFadeBackgroundMusic.apply(_this$soundManager, _toConsumableArray(params));
  };
  var CrossFadeBackgroundMusic2 = function CrossFadeBackgroundMusic2(params) {
    var _this$soundManager2;
    // this: textPlayer
    (_this$soundManager2 = this.soundManager).crossFadeBackgroundMusic2.apply(_this$soundManager2, _toConsumableArray(params));
  };

  var OnParsePauseBackgroundMusicTag = function OnParsePauseBackgroundMusicTag(textPlayer, parser, config) {
    var tagName = 'bgm.pause';
    parser.on("+".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      PauseBackgroundMusic,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, 'bgm.resume',
      // name
      ResumeBackgroundMusic,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
    var tagName = 'bgm2.pause';
    parser.on("+".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      PauseBackgroundMusic2,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, 'bgm2.resume',
      // name
      ResumeBackgroundMusic2,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var PauseBackgroundMusic = function PauseBackgroundMusic() {
    // this: textPlayer
    this.soundManager.pauseBackgroundMusic();
  };
  var ResumeBackgroundMusic = function ResumeBackgroundMusic() {
    // this: textPlayer
    this.soundManager.resumeBackgroundMusic();
  };
  var PauseBackgroundMusic2 = function PauseBackgroundMusic2() {
    // this: textPlayer
    this.soundManager.pauseBackgroundMusic2();
  };
  var ResumeBackgroundMusic2 = function ResumeBackgroundMusic2() {
    // this: textPlayer
    this.soundManager.resumeBackgroundMusic2();
  };

  var OnParseSetBackgroundMusicVolumeTag = function OnParseSetBackgroundMusicVolumeTag(textPlayer, parser, config) {
    var tagName = 'bgm.volume';
    parser.on("+".concat(tagName), function (volume) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      SetBackgroundMusicVolume,
      // callback
      volume,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm2.volume';
    parser.on("+".concat(tagName), function (volume) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      SetBackgroundMusicVolume2,
      // callback
      volume,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };
  var SetBackgroundMusicVolume = function SetBackgroundMusicVolume(volume) {
    // this: textPlayer
    this.soundManager.setBackgroundMusicVolume(volume);
  };
  var SetBackgroundMusicVolume2 = function SetBackgroundMusicVolume2(volume) {
    // this: textPlayer
    this.soundManager.setBackgroundMusicVolume2(volume);
  };

  var OnParseSetBackgroundMusicMuteTag = function OnParseSetBackgroundMusicMuteTag(textPlayer, parser, config) {
    var tagName = 'bgm.mute';
    parser.on("+".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      SetBackgroundMusicMute,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm2.mute';
    parser.on("+".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      SetBackgroundMusic2Mute,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm.unmute';
    parser.on("+".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      SetBackgroundMusicUnMute,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm2.unmute';
    parser.on("+".concat(tagName), function () {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      SetBackgroundMusic2UnMute,
      // callback
      undefined,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };
  var SetBackgroundMusicMute = function SetBackgroundMusicMute() {
    // this: textPlayer
    this.soundManager.setBackgroundMusicMute(true);
  };
  var SetBackgroundMusic2Mute = function SetBackgroundMusic2Mute() {
    // this: textPlayer
    this.soundManager.setBackgroundMusic2Mute(true);
  };
  var SetBackgroundMusicUnMute = function SetBackgroundMusicUnMute() {
    // this: textPlayer
    this.soundManager.setBackgroundMusicMute(false);
  };
  var SetBackgroundMusic2UnMute = function SetBackgroundMusic2UnMute() {
    // this: textPlayer
    this.soundManager.setBackgroundMusic2Mute(false);
  };

  var OnParseFadeInCameraTag = function OnParseFadeInCameraTag(textPlayer, parser, config) {
    var tagName = 'camera.fadein';
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      PlayFadeInEffect,
      // callback
      [duration, red, green, blue],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var PlayFadeInEffect = function PlayFadeInEffect(params) {
    var _this$cameraTarget;
    // this: textPlayer
    (_this$cameraTarget = this.cameraTarget).fadeIn.apply(_this$cameraTarget, _toConsumableArray(params));
  };

  var OnParseFadeOutCameraTag = function OnParseFadeOutCameraTag(textPlayer, parser, config) {
    var tagName = 'camera.fadeout';
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      PlayFadeOutEffect,
      // callback
      [duration, red, green, blue],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var PlayFadeOutEffect = function PlayFadeOutEffect(params) {
    var _this$cameraTarget;
    // this: textPlayer
    (_this$cameraTarget = this.cameraTarget).fadeOut.apply(_this$cameraTarget, _toConsumableArray(params));
  };

  var OnParseShakeCameraTag = function OnParseShakeCameraTag(textPlayer, parser, config) {
    var tagName = 'camera.shake';
    parser.on("+".concat(tagName), function (duration, intensity) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      PlayShakeEffect,
      // callback
      [duration, intensity],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var PlayShakeEffect = function PlayShakeEffect(params) {
    var _this$cameraTarget;
    // this: textPlayer
    (_this$cameraTarget = this.cameraTarget).shake.apply(_this$cameraTarget, _toConsumableArray(params));
  };

  var OnParseFlashCameraTag = function OnParseFlashCameraTag(textPlayer, parser, config) {
    var tagName = 'camera.flash';
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      PlayFlashEffect,
      // callback
      [duration, red, green, blue],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var PlayFlashEffect = function PlayFlashEffect(params) {
    var _this$cameraTarget;
    // this: textPlayer
    (_this$cameraTarget = this.cameraTarget).flash.apply(_this$cameraTarget, _toConsumableArray(params));
  };

  var OnParseZoomCameraTag = function OnParseZoomCameraTag(textPlayer, parser, config) {
    var tagName = 'camera.zoom';
    parser.on("+".concat(tagName), function (value) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      Zoom,
      // callback
      value,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (value, duration, ease) {
      AppendCommand$3.call(textPlayer, 'camera.zoom.to',
      // name
      ZoomTo,
      // callback
      [value, duration, ease],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var Zoom = function Zoom(value) {
    // this: textPlayer
    this.cameraTarget.setZoom(value);
  };
  var ZoomTo = function ZoomTo(params) {
    var _this$cameraTarget;
    // this: textPlayer
    (_this$cameraTarget = this.cameraTarget).zoomTo.apply(_this$cameraTarget, _toConsumableArray(params));
  };

  var DegToRad = Phaser.Math.DegToRad;
  var OnParseRotateCameraTag = function OnParseRotateCameraTag(textPlayer, parser, config) {
    var tagName = 'camera.rotate';
    parser.on("+".concat(tagName), function (value) {
      value = DegToRad(value);
      AppendCommand$3.call(textPlayer, tagName,
      // name
      Rotate,
      // callback
      value,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (value, duration, ease) {
      value = DegToRad(value);
      AppendCommand$3.call(textPlayer, 'camera.rotate.to',
      // name
      RotateTo,
      // callback
      [value, duration, ease],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var Rotate = function Rotate(value) {
    // this: textPlayer
    this.cameraTarget.setRotation(value);
  };
  var RotateTo = function RotateTo(params) {
    var value = params[0];
    var duration = params[1];
    var ease = params[2];

    // this: textPlayer
    this.cameraTarget.rotateTo(value, false, duration, ease);
  };

  var OnParseScrollCameraTag = function OnParseScrollCameraTag(textPlayer, parser, config) {
    var tagName = 'camera.scroll';
    parser.on("+".concat(tagName), function (x, y) {
      AppendCommand$3.call(textPlayer, tagName,
      // name
      Scroll,
      // callback
      [x, y],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (x, y, duration, ease) {
      AppendCommand$3.call(textPlayer, 'camera.scroll.to',
      // name
      ScrollTo,
      // callback
      [x, y, duration, ease],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var Scroll = function Scroll(params) {
    var _this$cameraTarget;
    // this: textPlayer
    (_this$cameraTarget = this.cameraTarget).setScroll.apply(_this$cameraTarget, _toConsumableArray(params));
  };
  var ScrollTo = function ScrollTo(params) {
    var x = params[0];
    var y = params[1];
    var duration = params[2];
    var ease = params[3];

    // this: textPlayer
    var camera = this.cameraTarget;
    var xSave = camera.scrollX;
    var ySave = camera.scrollY;
    camera.setScroll(x, y);
    x += camera.centerX;
    y += camera.centerY;
    camera.setScroll(xSave, ySave);

    // x,y in pan() is the centerX, centerY
    camera.pan(x, y, duration, ease);
  };

  var OnParseWaitTag = function OnParseWaitTag(textPlayer, parser, config) {
    var tagWait = 'wait';
    var tagClick = 'click';
    parser.on("+".concat(tagWait), function (name) {
      AppendCommand$1(textPlayer, name);
      parser.skipEvent();
    }).on("-".concat(tagWait), function () {
      parser.skipEvent();
    }).on("+".concat(tagClick), function () {
      // Equal to [wait=click]
      AppendCommand$1(textPlayer, 'click');
      parser.skipEvent();
    }).on("-".concat(tagClick), function () {
      // Equal to [/wait]
      parser.skipEvent();
    });
  };
  var Wait$2 = function Wait(name) {
    this.typeWriter.wait(name); // this: textPlayer
  };
  var AppendCommand$1 = function AppendCommand(textPlayer, name) {
    AppendCommand$3.call(textPlayer, 'wait',
    // name
    Wait$2,
    // callback
    name,
    // params
    textPlayer // scope
    );
  };

  var OnParseNewLineTag = function OnParseNewLineTag(textPlayer, parser, config) {
    var tagName = 'r';
    parser.on("+".concat(tagName), function () {
      AppendText.call(textPlayer, '\n');
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParsePageBreakTag = function OnParsePageBreakTag(textPlayer, parser, config) {
    var tagNames = ['pagebreak', 'pb'];
    for (var i = 0, cnt = tagNames.length; i < cnt; i++) {
      var tagName = tagNames[i];
      parser.on("+".concat(tagName), function () {
        AppendText.call(textPlayer, '\f');
        parser.skipEvent();
      }).on("-".concat(tagName), function () {
        parser.skipEvent();
      });
    }
  };

  var OnParseContentOff = function OnParseContentOff(textPlayer, parser, config) {
    var tagName = 'content.off';
    parser.on("+".concat(tagName), function () {
      parser.setContentOutputEnable(false);
      parser.skipEvent();
    });
  };

  var OnParseContentOn = function OnParseContentOn(textPlayer, parser, config) {
    var tagName = 'content.on';
    parser.on("+".concat(tagName), function () {
      parser.setContentOutputEnable();
      parser.skipEvent();
    });
  };

  var OnParseContent = function OnParseContent(textPlayer, parser, config) {
    parser.on('content', function (content) {
      if (parser.contentOutputEnable) {
        AppendText.call(textPlayer, content);
      } else {
        var startTag = "+".concat(parser.lastTagStart);
        textPlayer.emit("parser.".concat(startTag, "#content"), parser, content);
      }
    });
  };

  var OnParseCustomTag = function OnParseCustomTag(textPlayer, parser, config) {
    parser.on('start', function () {
      textPlayer.emit('parser.start', parser);
    }).on('+', function (tagName) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }
      var startTag = "+".concat(tagName);
      for (var _len = arguments.length, value = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        value[_key - 1] = arguments[_key];
      }
      var param = value;
      textPlayer.emit.apply(textPlayer, ["parser.".concat(startTag), parser].concat(value, [param]));
      AppendCommand(textPlayer, startTag, param);
    }).on('-', function (tagName) {
      if (parser.skipEventFlag) {
        return;
      }
      var endTag = "-".concat(tagName);
      var param = [];
      textPlayer.emit("parser.".concat(endTag), parser, param);
      AppendCommand(textPlayer, endTag, param);
    }).on('complete', function () {
      textPlayer.emit('parser.complete', parser);
    });
  };
  var FireEvent = function FireEvent(param, tagName) {
    var eventName = "tag.".concat(tagName);
    // this: textPlayer
    if (param == null) {
      this.emit(eventName);
    } else {
      this.emit.apply(this, [eventName].concat(_toConsumableArray(param)));
    }
  };
  var AppendCommand = function AppendCommand(textPlayer, name, param) {
    AppendCommand$3.call(textPlayer, name,
    // name
    FireEvent,
    // callback
    param,
    // params
    textPlayer // scope
    );
  };

  var ParseCallbacks$2 = [OnParseColorTag, OnParseStrokeColorTag, OnParseBoldTag, OnParseItalicTag, OnParseFontSizeTag, OnParseShadowColorTag, OnParseAlignTag, OnParseOffsetYTag, OnParseOffsetXTag, OnParseLeftSpaceTag, OnParseRightSpaceTag, OnParseImageTag$1, OnParseImageTag, OnParseTypingSpeedTag, OnParsePlaySoundEffectTag, OnParseFadeInSoundEffectTag, OnParseFadeOutSoundEffectTag, OnParseSetSoundEffectVolumeTag, OnParseSetSoundEffectMuteTag, OnParsePlayBackgroundMusicTag, OnParseFadeInBackgroundMusicTag, OnParseFadeOutBackgroundMusicTag, OnParseCrossFadeBackgroundMusicTag, OnParsePauseBackgroundMusicTag, OnParseSetBackgroundMusicVolumeTag, OnParseSetBackgroundMusicMuteTag, OnParseFadeInCameraTag, OnParseFadeOutCameraTag, OnParseShakeCameraTag, OnParseFlashCameraTag, OnParseZoomCameraTag, OnParseRotateCameraTag, OnParseScrollCameraTag, OnParseWaitTag, OnParseNewLineTag, OnParsePageBreakTag, OnParseContentOff, OnParseContentOn, OnParseContent, OnParseCustomTag];
  var AddParseCallbacks = function AddParseCallbacks(textPlayer, parser, config) {
    for (var i = 0, cnt = ParseCallbacks$2.length; i < cnt; i++) {
      ParseCallbacks$2[i](textPlayer, parser, config);
    }
  };

  /*
  Skip line
  - An empty line, only has space
  - A comment line, start with commentLineStart ('//')
  */

  var PreProcess = function PreProcess(parser, source) {
    var comentLineStart = parser.commentLineStart;
    var lines = source.split('\n');
    for (var i = 0, cnt = lines.length; i < cnt; i++) {
      var line = lines[i];
      if (line === '') ; else if (line.trim().length === 0) {
        // An empty line, only has space
        lines[i] = '';
      } else if (comentLineStart && line.startsWith(comentLineStart)) {
        // A comment line, start with commentLineStart ('//')
        lines[i] = '';
      }
    }
    // Use [r] to put \n
    return lines.join('');
  };

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var Parser = /*#__PURE__*/function (_BracketParser) {
    _inherits(Parser, _BracketParser);
    function Parser(textPlayer, config) {
      var _this;
      _classCallCheck(this, Parser);
      if (config === undefined) {
        config = {};
      }
      if (!config.hasOwnProperty('delimiters')) {
        config.delimiters = '[]';
      }
      _this = _callSuper(this, Parser, [config]);
      AddParseCallbacks(textPlayer, _assertThisInitialized(_this), config);
      _this.setCommentLineStartSymbol(GetValue$3(config, 'comment', '//'));
      _this.setContentOutputEnable();
      return _this;
    }
    _createClass(Parser, [{
      key: "setCommentLineStartSymbol",
      value: function setCommentLineStartSymbol(symbol) {
        this.commentLineStart = symbol;
        return this;
      }
    }, {
      key: "setContentOutputEnable",
      value: function setContentOutputEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.contentOutputEnable = enable;
        return this;
      }
    }, {
      key: "start",
      value: function start(source) {
        _get(_getPrototypeOf(Parser.prototype), "start", this).call(this, PreProcess(this, source));
        return this;
      }
    }]);
    return Parser;
  }(BracketParser);

  var TypingSpeedMethods$1 = {
    setDefaultTypingSpeed: function setDefaultTypingSpeed(speed) {
      this.defaultSpeed = speed;
      return this;
    },
    setTypingSpeed: function setTypingSpeed(speed) {
      if (speed === undefined) {
        speed = this.defaultSpeed;
      }
      this.speed = speed;
      return this;
    }
  };

  // Internal events

  var PageFadeOutCompleteEvent = 'page.fadeout';
  var StopPlayEvent = '_remove.play';
  var ClearEvents$1 = [PageFadeOutCompleteEvent, StopPlayEvent];

  var FadeOutPage = function FadeOutPage() {
    if (!this.fadeOutPageCallback || !this.children) {
      this.emit(PageFadeOutCompleteEvent);
      return this;
    }
    var renderableChildren = this.children.filter(function (child) {
      return child.renderable;
    });
    var waitObject = this.fadeOutPageCallback(renderableChildren, this.fadeOutPageDuration);
    if (!waitObject) {
      this.emit(PageFadeOutCompleteEvent);
    } else if (waitObject.once) {
      waitObject.once('complete', function () {
        this.emit(PageFadeOutCompleteEvent);
      }, this);
    } else if (waitObject.then) {
      var self = this;
      waitObject.then(function () {
        self.emit(PageFadeOutCompleteEvent);
      });
    } else {
      this.emit(PageFadeOutCompleteEvent);
    }
    return this;
  };

  var WaitEvent = function WaitEvent(eventEmitter, eventName) {
    return new Promise(function (resolve, reject) {
      eventEmitter.once(eventName, function () {
        resolve();
      });
    });
  };
  var WaitComplete = function WaitComplete(eventEmitter) {
    return WaitEvent(eventEmitter, 'complete');
  };

  var Start = function Start(children) {
    this.children = children;
    this.index = 0;
    this.isPageTyping = true;
    if (this.onTypeStart) {
      this.onTypeStart(children);
    }
    this.typing();
    return WaitComplete(this); // Promise
  };

  var TypingDelayTimerType = 'delay';
  var TypingAnimationTimerType = 'anim';

  var Typing = function Typing(offsetTime) {
    if (offsetTime === undefined) {
      offsetTime = 0;
    }
    var delay = 0;
    this.inTypingProcessLoop = true;
    while (this.inTypingProcessLoop) {
      var child = this.getNextChild();
      if (!child) {
        if (this.timeline.isRunning) {
          // Wait until last animationConfig is end
          this.timeline.once('complete', function () {
            this.isPageTyping = false;
            this.emit('complete');
          }, this);
        } else {
          this.isPageTyping = false;
          this.emit('complete');
        }
        break; // Leave this typing loop
      }
      if (child.renderable) {
        // Typing this char
        var animationConfig = this.animationConfig;
        if (animationConfig.duration > 0) {
          var animationTimer = this.timeline.addTimer({
            name: TypingAnimationTimerType,
            target: child,
            duration: animationConfig.duration,
            yoyo: animationConfig.yoyo,
            onStart: animationConfig.onStart,
            onProgress: animationConfig.onProgress,
            onComplete: animationConfig.onComplete
          });
          if (this.skipTypingAnimation) {
            animationTimer.seek(1);
          }
        } else {
          // No animationConfig, only invoke onStart callback
          if (animationConfig.onStart) {
            animationConfig.onStart(child, 0);
          }
        }

        // Set to min size
        if (this.minSizeEnable) {
          this.textPlayer.setToMinSize();
        }
        this.textPlayer.emit('typing', child);
        var nextChild = this.nextChild;
        if (nextChild) {
          if (this.skipSpaceEnable && IsSpaceChar(nextChild)) ; else {
            delay += this.speed + offsetTime;
            offsetTime = 0;
            if (delay > 0) {
              // Process next character later
              this.typingTimer = this.timeline.addTimer({
                name: TypingDelayTimerType,
                target: this,
                duration: delay,
                onComplete: function onComplete(target, t, timer) {
                  target.typingTimer = undefined;
                  Typing.call(target, timer.remainder);
                }
              });
              break; // Leave this typing loop     
            }
          }
        }
        // Process next child
      } else if (IsCommand(child)) {
        child.exec();
        // Process next child
      }
    }

    // Set to min size
    if (this.minSizeEnable) {
      this.textPlayer.setToMinSize();
    }
    this.inTypingProcessLoop = false;
  };

  var Pause = function Pause() {
    // Pause typing timer and animation progresses
    this.timeline.pause();
    return this;
  };

  var Resume = function Resume() {
    // Resume typing timer and animation progresses
    this.timeline.resume();
    return this;
  };

  var PauseTyping = function PauseTyping() {
    // Already in typingPaused state
    if (this.isTypingPaused) {
      return this;
    }
    if (this.typingTimer) {
      // Pause when typing timer is counting
      this.typingTimer.pause();
      this.isTypingPaused = true;
    } else if (this.inTypingProcessLoop) {
      // Pause in loop of typing(), by tag
      this.inTypingProcessLoop = false;
      this.isTypingPaused = true;
    }
    return this;
  };

  var ResumeTyping = function ResumeTyping(offsetTime) {
    // Already not in typingPaused state
    if (!this.isTypingPaused) {
      return this;
    }
    if (offsetTime === undefined) {
      offsetTime = 0;
    }
    if (this.typingTimer) {
      // Pause when typing timer is paused
      this.isTypingPaused = false;
      this.typingTimer.resume();
      this.typingTimer.remainder += offsetTime;
    } else if (this.isTypingPaused) {
      // Resume paused by tag
      this.isTypingPaused = false;
      this.typing(offsetTime);
    }
    return this;
  };

  var IsWaitCameraEffect = function IsWaitCameraEffect(name) {
    switch (name) {
      case 'camera.fadein':
      case 'camera.fadeout':
      case 'camera.flash':
      case 'camera.shake':
      case 'camera.zoom':
      case 'camera.rotate':
      case 'camera.scroll':
        return true;
      default:
        return false;
    }
  };

  var IsWaitGameObject = function IsWaitGameObject(textPlayer, name) {
    var names = name.split('.');
    return textPlayer.gameObjectManagers.hasOwnProperty(names[0]);
  };
  var WaitGameObject = function WaitGameObject(textPlayer, tag, callback, scope) {
    var waitEventManager = textPlayer.waitEventManager;
    var tags = tag.split('.');
    var goType = tags[0];
    var gameObjectManager = textPlayer.getGameObjectManager(goType);
    var waitEventName = "wait.".concat(goType);
    switch (tags.length) {
      case 1:
        // 'goType' : wait all sprites has beeen destroyed
        waitEventManager.waitGameObjectManagerEmpty(goType);
        textPlayer.emit(waitEventName);
        return;
      case 2:
        // 'goType.name' : wait goType.name has been destroyed
        var name = tags[1];
        waitEventManager.waitGameObjectDestroy(goType, name);
        textPlayer.emit(waitEventName, name);
        return;
      case 3:
        // 'goType.name.prop' : wait ease goType.name.prop has been completed
        var name = tags[1],
          prop = tags[2];
        var value = gameObjectManager.getProperty(name, prop);
        // Can start tween task for a number property
        if (typeof value === 'number') {
          waitEventManager.waitGameObjectTweenComplete(goType, name, prop);
          textPlayer.emit(waitEventName, name, prop);
          return;
        }
        var dataKey = prop;
        var matchFalseFlag = dataKey.startsWith('!');
        if (matchFalseFlag) {
          dataKey = dataKey.substring(1);
        }
        // Wait until flag is true/false
        if (gameObjectManager.hasData(name, dataKey)) {
          waitEventManager.waitGameObjectDataFlag(goType, name, dataKey, !matchFalseFlag);
          textPlayer.emit(waitEventName, name, dataKey);
          return;
        } else {
          waitEventManager.waitTime(0);
          return;
        }
    }
  };

  var KeyCodes = Phaser.Input.Keyboard.KeyCodes;
  var WaitAny = function WaitAny(textPlayer, names, callback, scope) {
    var waitEventManager = textPlayer.waitEventManager;
    waitEventManager.clearWaitCompleteCallbacks().addWaitCompleteCallback(callback, scope);
    if (typeof names === 'string' && names.length > 1 && names.indexOf('|') !== -1) {
      names = names.split('|');
    } else {
      names = [names];
    }
    for (var i = 0, cnt = names.length; i < cnt; i++) {
      var name = names[i];
      if (name == null || name === 'wait') {
        // Wait event
        var waitCompleteTriggerCallback = textPlayer.waitEventManager.getWaitCompleteTriggerCallback();
        textPlayer.emit('wait', waitCompleteTriggerCallback);
      } else if (typeof name === 'number' || !isNaN(name)) {
        // A number, or a number string
        var time = parseFloat(name);
        waitEventManager.waitTime(time);
        textPlayer.emit('wait.time', time);
      } else if (name === 'click') {
        // 'click'
        waitEventManager.waitClick();
        textPlayer.emit('wait.click');
      } else if (name === 'se') {
        waitEventManager.waitSoundEffectComplete();
        var music = textPlayer.soundManager.getLastSoundEffect();
        textPlayer.emit('wait.music', music);
      } else if (name === 'se2') {
        waitEventManager.waitSoundEffect2Complete();
        var music = textPlayer.soundManager.getLastSoundEffect2();
        textPlayer.emit('wait.music', music);
      } else if (name === 'bgm') {
        waitEventManager.waitBackgroundMusicComplete();
        var music = textPlayer.soundManager.getBackgroundMusic();
        textPlayer.emit('wait.music', music);
      } else if (name === 'bgm2') {
        waitEventManager.waitBackgroundMusic2Complete();
        var music = textPlayer.soundManager.getBackgroundMusic2();
        textPlayer.emit('wait.music', music);
      } else if (KeyCodes.hasOwnProperty(name.toUpperCase())) {
        waitEventManager.waitKeyDown(name);
        textPlayer.emit('wait.keydown', name);
      } else if (IsWaitCameraEffect(name)) {
        waitEventManager.waitCameraEffectComplete(name);
        textPlayer.emit('wait.camera', name);
      } else if (IsWaitGameObject(textPlayer, name)) {
        WaitGameObject(textPlayer, name);
      } else {
        var waitCompleteTriggerCallback = textPlayer.waitEventManager.getWaitCompleteTriggerCallback();
        textPlayer.emit("wait.".concat(name), waitCompleteTriggerCallback);
      }
    }
  };

  var Wait$1 = function Wait(name) {
    // Already in typingPaused state, or ignore any wait
    if (this.ignoreWait) {
      return this;
    }
    this.pauseTyping();
    WaitAny(this.textPlayer, name, this.resumeTyping, this);
    return this;
  };

  var SetIgnoreWait$1 = function SetIgnoreWait(value) {
    if (value === undefined) {
      value = true;
    }
    this.ignoreWait = value;
    return this;
  };

  var SetSkipSpaceEnable = function SetSkipSpaceEnable(enable) {
    if (enable === undefined) {
      enable = true;
    }
    this.skipSpaceEnable = enable;
    return this;
  };

  var SetSkipTypingAnimation = function SetSkipTypingAnimation(value) {
    if (value === undefined) {
      value = true;
    }
    this.skipTypingAnimation = value;
    if (value) {
      // Skip current playing typing-animation
      var timers = this.timeline.getTimers(TypingAnimationTimerType);
      for (var i = 0, cnt = timers.length; i < cnt; i++) {
        timers[i].seek(1);
      }
    }
    return this;
  };

  var SetSkipSoundEffect = function SetSkipSoundEffect(value) {
    if (value === undefined) {
      value = true;
    }
    this.skipSoundEffect = value;
    if (value) {
      var soundManager = this.textPlayer._soundManager;
      if (soundManager) {
        soundManager.fadeOutAllSoundEffects(100, true);
      }
    }
    return this;
  };

  var SkipCurrentTypingDelay = function SkipCurrentTypingDelay() {
    if (this.typingTimer) {
      this.typingTimer.seek(1);
    }
    return this;
  };

  var Methods$2 = {
    fadeOutPage: FadeOutPage,
    start: Start,
    typing: Typing,
    pause: Pause,
    resume: Resume,
    pauseTyping: PauseTyping,
    resumeTyping: ResumeTyping,
    wait: Wait$1,
    setIgnoreWait: SetIgnoreWait$1,
    setSkipSpaceEnable: SetSkipSpaceEnable,
    setSkipTypingAnimation: SetSkipTypingAnimation,
    setSkipSoundEffect: SetSkipSoundEffect,
    skipCurrentTypingDelay: SkipCurrentTypingDelay
  };
  Object.assign(Methods$2, TypingSpeedMethods$1);

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var TypeWriter = /*#__PURE__*/function () {
    function TypeWriter(textPlayer, config) {
      _classCallCheck(this, TypeWriter);
      this.setEventEmitter();
      this.textPlayer = textPlayer;
      this.isPageTyping = false;
      this.typingTimer = undefined; // Typing delay
      this.pauseTypingTimer = undefined; // Wait time
      this.inTypingProcessLoop = false; // Used in this.typing()
      this.isTypingPaused = false; // Used in this.wait(), this.pauseTyping(), this.resumeTyping()
      this.setIgnoreWait(false);
      this.setSkipTypingAnimation(false);
      this.setTypingStartCallback(GetValue$2(config, 'onTypingStart', SetChildrenInvisible));
      this.setDefaultTypingSpeed(GetValue$2(config, 'speed', 250));
      this.setTypingSpeed();
      this.setSkipSpaceEnable(GetValue$2(config, 'skipSpace', false));
      this.setAnimationConfig(GetValue$2(config, 'animation', undefined));
      this.setMinSizeEnable(GetValue$2(config, 'minSizeEnable', false));
      this.setFadeOutPageCallback(GetValue$2(config, 'fadeOutPage'));
    }
    _createClass(TypeWriter, [{
      key: "destroy",
      value: function destroy() {
        this.destroyEventEmitter();
        this.textPlayer = undefined;
        this.typingTimer = undefined;
        this.pauseTypingTimer = undefined;
        this.onTypeStart = undefined;
        this.animationConfig = undefined;
      }
    }, {
      key: "timeline",
      get: function get() {
        return this.textPlayer.timeline;
      }
    }, {
      key: "setTypingStartCallback",
      value: function setTypingStartCallback(callback) {
        this.onTypeStart = callback;
        return this;
      }
    }, {
      key: "setAnimationConfig",
      value: function setAnimationConfig(config) {
        if (!config) {
          config = {};
        }
        if (!config.hasOwnProperty('duration')) {
          config.duration = 0;
        }
        if (!config.hasOwnProperty('onStart')) {
          // Apply default onStart callback
          config.onStart = SetChildVisible;
        }
        this.animationConfig = config;
        return this;
      }
    }, {
      key: "setFadeOutPageCallback",
      value: function setFadeOutPageCallback(callback) {
        this.fadeOutPageCallback = callback;
        return this;
      }
    }, {
      key: "setMinSizeEnable",
      value: function setMinSizeEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.minSizeEnable = enable;
        return this;
      }
    }, {
      key: "getNextChild",
      value: function getNextChild() {
        var child = this.nextChild;
        this.index = Math.min(this.index + 1, this.children.length); // Point to next child
        this._nextChild = undefined;
        return child;
      }
    }, {
      key: "nextChild",
      get: function get() {
        if (!this._nextChild) {
          this._nextChild = this.children[this.index];
        }
        return this._nextChild;
      }
    }]);
    return TypeWriter;
  }();
  var SetChildVisible = function SetChildVisible(child) {
    if (child.setVisible) {
      child.setVisible();
    }
  };
  var SetChildrenInvisible = function SetChildrenInvisible(children) {
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (child.setVisible) {
        child.setVisible(false);
      }
    }
  };
  Object.assign(TypeWriter.prototype, EventEmitterMethods$1, Methods$2);

  var IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var AddImage$1 = function AddImage(key, config) {
    if (IsPlainObject$1(key)) {
      config = key;
      key = config.key;
    } else if (config === undefined) {
      config = {
        key: key
      };
    }
    if (!config.hasOwnProperty('key')) {
      config.key = key;
    }
    var textureKey = config.key,
      frameKey = config.frame;
    var width = config.width,
      height = config.height;
    if (width === undefined || height === undefined) {
      var frame = this.textureManager.getFrame(textureKey, frameKey);
      var frameWidth = frame ? frame.cutWidth : 0;
      var frameHeight = frame ? frame.cutHeight : 0;
      if (width === undefined && height === undefined) {
        width = frameWidth;
        height = frameHeight;
      } else if (width === undefined) {
        width = frameWidth * (height / frameHeight);
      } else if (height === undefined) {
        height = frameHeight * (width / frameWidth);
      }
    }
    this.images[key] = {
      key: textureKey,
      frame: frameKey,
      width: width,
      height: height,
      y: GetValue$1(config, 'y', 0),
      left: GetValue$1(config, 'left', 0),
      right: GetValue$1(config, 'right', 0),
      originX: GetValue$1(config, 'originX', 0),
      originY: GetValue$1(config, 'originY', 0),
      tintFill: GetValue$1(config, 'tintFill', false)
    };
  };

  var DrawImage = function DrawImage(key, context, x, y, color, autoRound) {
    var imgData = this.get(key);
    var frame = this.textureManager.getFrame(imgData.key, imgData.frame);
    var width = imgData.width,
      height = imgData.height;
    x += imgData.left - imgData.originX * width;
    y += imgData.y - imgData.originY * height;
    if (!imgData.tintFill) {
      color = undefined;
    }
    DrawFrameToCanvas(frame, context.canvas, x, y, width, height, color, autoRound);
  };

  var ImageManager = /*#__PURE__*/function () {
    function ImageManager(scene) {
      _classCallCheck(this, ImageManager);
      this.textureManager = scene.sys.textures;
      this.images = {};
    }
    _createClass(ImageManager, [{
      key: "destroy",
      value: function destroy() {
        this.textureManager = undefined;
        this.images = undefined;
      }
    }, {
      key: "add",
      value: function add(key, config) {
        if (typeof key === 'string') {
          AddImage$1.call(this, key, config);
        } else if (Array.isArray(key)) {
          var data = key;
          for (var i = 0, cnt = data.length; i < cnt; i++) {
            AddImage$1.call(this, data[i]);
          }
        } else {
          var data = key;
          for (var key in data) {
            AddImage$1.call(this, key, data[key]);
          }
        }
        return this;
      }
    }, {
      key: "has",
      value: function has(key) {
        return this.images.hasOwnProperty(key);
      }
    }, {
      key: "remove",
      value: function remove(key) {
        if (this.has(key)) {
          delete this.images[key];
        }
        return this;
      }
    }, {
      key: "get",
      value: function get(key) {
        if (!this.has(key)) {
          if (this.textureManager.exists(key)) {
            this.add(key);
          }
        }
        return this.images[key];
      }
    }, {
      key: "getOuterWidth",
      value: function getOuterWidth(key) {
        var data = this.get(key);
        return data ? data.width + data.left + data.right : 0;
      }
    }, {
      key: "getFrame",
      value: function getFrame(key) {
        var data = this.get(key);
        return data ? this.textureManager.getFrame(data.key, data.frame) : undefined;
      }
    }, {
      key: "hasTexture",
      value: function hasTexture(key) {
        return !!this.getFrame(key);
      }
    }]);
    return ImageManager;
  }();
  var methods = {
    draw: DrawImage
  };
  Object.assign(ImageManager.prototype, methods);

  var SpriteBob = /*#__PURE__*/function (_BobBase) {
    _inherits(SpriteBob, _BobBase);
    function SpriteBob() {
      _classCallCheck(this, SpriteBob);
      return _callSuper(this, SpriteBob, arguments);
    }
    _createClass(SpriteBob, [{
      key: "playAnimation",
      value: function playAnimation(key) {
        this.gameObject.anims.timeScale = this.timeScale;
        this.gameObject.play(key);
        return this;
      }
    }, {
      key: "stopAnimation",
      value: function stopAnimation() {
        this.gameObject.stop();
        return this;
      }
    }, {
      key: "chainAnimation",
      value: function chainAnimation(keys) {
        this.gameObject.chain(keys);
        return this;
      }
    }, {
      key: "pauseAnimation",
      value: function pauseAnimation() {
        this.gameObject.anims.pause();
        return this;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        _get(_getPrototypeOf(SpriteBob.prototype), "setTimeScale", this).call(this, timeScale);
        if (this.gameObject.anims) {
          this.gameObject.anims.timeScale = timeScale;
        }
        return this;
      }
    }]);
    return SpriteBob;
  }(BobBase);

  var AnimationMethods = {
    playAnimation: function playAnimation(name, key) {
      if (!this.has(name)) {
        this.add(name);
      }
      this.get(name).playAnimation(key);
      return this;
    },
    stopAnimation: function stopAnimation(name) {
      if (!this.has(name)) {
        return this;
      }
      this.get(name).stopAnimation();
      return this;
    },
    chainAnimation: function chainAnimation(name, keys) {
      if (!this.has(name)) {
        return this;
      }
      this.get(name).chainAnimation(keys);
      return this;
    },
    pauseAnimation: function pauseAnimation(name) {
      if (!this.has(name)) {
        return this;
      }
      this.get(name).pauseAnimation();
      return this;
    }
  };

  var Methods$1 = {};
  Object.assign(Methods$1, AnimationMethods);

  var SpriteManager = /*#__PURE__*/function (_GOManager) {
    _inherits(SpriteManager, _GOManager);
    function SpriteManager(scene, config) {
      _classCallCheck(this, SpriteManager);
      if (config === undefined) {
        config = {};
      }
      config.BobClass = SpriteBob;
      return _callSuper(this, SpriteManager, [scene, config]);
    }
    _createClass(SpriteManager, [{
      key: "setCreateGameObjectCallback",
      value: function setCreateGameObjectCallback(callback, scope) {
        if (!callback || callback === 'sprite') {
          callback = CreateSprite;
        } else if (callback === 'image') {
          callback = CreateImage;
        }
        _get(_getPrototypeOf(SpriteManager.prototype), "setCreateGameObjectCallback", this).call(this, callback, scope);
        return this;
      }
    }]);
    return SpriteManager;
  }(GOManager);
  var CreateSprite = function CreateSprite(scene, textureKey, frameName) {
    if (typeof frameName !== 'string' && typeof frameName !== 'number') {
      frameName = undefined;
    }
    return scene.add.sprite(0, 0, textureKey, frameName);
  };
  var CreateImage = function CreateImage(scene, textureKey, frameName) {
    if (typeof frameName !== 'string' && typeof frameName !== 'number') {
      frameName = undefined;
    }
    return scene.add.image(0, 0, textureKey, frameName);
  };
  Object.assign(SpriteManager.prototype, Methods$1);

  var IsPlayAnimationTag = function IsPlayAnimationTag(tags, goType) {
    // goType.name.play
    return tags.length === 3 && tags[0] === goType && tags[2] === 'play';
  };
  var IsStopAnimationTag = function IsStopAnimationTag(tags, goType) {
    // goType.name.stop
    return tags.length === 3 && tags[0] === goType && tags[2] === 'stop';
  };
  var OnParsePlayAnimationTag = function OnParsePlayAnimationTag(textPlayer, parser, config) {
    var goType = config.name;
    parser.on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      // [goType.name.play=key], or [goType.name.play=key0,key1,...]
      var tags = tag.split('.');
      var name;
      if (IsPlayAnimationTag(tags, goType)) {
        name = tags[1];
      } else {
        return;
      }
      for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        keys[_key - 1] = arguments[_key];
      }
      AppendCommand$3.call(textPlayer, "".concat(goType, ".play"),
      // name
      PlayAnimation,
      // callback
      [goType, name, keys],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      // [goType.name.stop]
      var tags = tag.split('.');
      var name;
      if (IsStopAnimationTag(tags, goType)) {
        name = tags[1];
      } else {
        return;
      }
      AppendCommand$3.call(textPlayer, "".concat(goType, ".stop"),
      // name
      StopAnimation,
      // callback
      [goType, name],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on('-', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      // [/goType.name.play]
      var tags = tag.split('.');
      var name;
      if (IsPlayAnimationTag(tags, goType)) {
        name = tags[1];
      } else {
        return;
      }
      AppendCommand$3.call(textPlayer, "".concat(goType, ".stop"),
      // name
      StopAnimation,
      // callback
      [goType, name],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var PlayAnimation = function PlayAnimation(params) {
    var goType, name, keys;
    var _params = _slicedToArray(params, 3);
    goType = _params[0];
    name = _params[1];
    keys = _params[2];
    var key = keys.shift();

    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.playAnimation(name, key);
    if (keys.length > 0) {
      gameObjectManager.chainAnimation(name, keys);
    }
  };
  var StopAnimation = function StopAnimation(params) {
    var goType, args;
    // this: textPlayer
    var _params2 = _toArray(params);
    goType = _params2[0];
    args = _params2.slice(1);
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.stopAnimation.apply(gameObjectManager, _toConsumableArray(args));
  };

  var IsPauseAnimationTag = function IsPauseAnimationTag(tags, goType) {
    // goType.name.pause 
    return tags.length === 3 && tags[0] === goType && tags[2] === 'pause';
  };
  var OnParsePauseAnimationTag = function OnParsePauseAnimationTag(textPlayer, parser, config) {
    var goType = config.name;
    parser.on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      // [goType.name.pause=key]
      var tags = tag.split('.');
      var name;
      if (IsPauseAnimationTag(tags, goType)) {
        name = tags[1];
      } else {
        return;
      }
      AppendCommand$3.call(textPlayer, "".concat(goType, ".pause"),
      // name
      PauseAnimation,
      // callback
      [goType, name],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var PauseAnimation = function PauseAnimation(params) {
    var goType, args;
    // this: textPlayer
    var _params = _toArray(params);
    goType = _params[0];
    args = _params.slice(1);
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.pauseAnimation.apply(gameObjectManager, _toConsumableArray(args));
  };

  var IsChainAnimationTag = function IsChainAnimationTag(tags, goType) {
    // goType.name.chain 
    return tags.length === 3 && tags[0] === goType && tags[2] === 'chain';
  };
  var OnParseChainAnimationTag = function OnParseChainAnimationTag(textPlayer, parser, config) {
    var goType = config.name;
    parser.on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      // [goType.name.chain=key]
      var tags = tag.split('.');
      var name;
      if (IsChainAnimationTag(tags, goType)) {
        name = tags[1];
      } else {
        return;
      }
      var keys = Array.prototype.slice.call(arguments, 1);
      AppendCommand$3.call(textPlayer, "".concat(goType, ".chain"),
      // name
      ChainAnimation,
      // callback
      [goType, name, keys],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var ChainAnimation = function ChainAnimation(params) {
    var goType, args;
    // this: textPlayer
    var _params = _toArray(params);
    goType = _params[0];
    args = _params.slice(1);
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.chainAnimation.apply(gameObjectManager, _toConsumableArray(args));
  };

  var ParseCallbacks$1 = [OnParsePlayAnimationTag, OnParsePauseAnimationTag, OnParseChainAnimationTag];
  var AddSpriteManager = function AddSpriteManager(config) {
    if (config === undefined) {
      config = {};
    }
    config.name = 'sprite';
    config.parseCallbacks = ParseCallbacks$1;
    this.addGameObjectManager(config, SpriteManager);
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

  var IsAddGameObjectTag = function IsAddGameObjectTag(tags, goType) {
    // goType.name
    return tags.length === 2 && tags[0] === goType;
  };
  var OnParseAddGameObjectTag = function OnParseAddGameObjectTag(textPlayer, parser, config) {
    var goType = config.name;
    parser.on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      // [goType.name=key,frame], or [goType.name]
      var tags = tag.split('.');
      var name;
      if (IsAddGameObjectTag(tags, goType)) {
        name = tags[1];
      } else {
        return;
      }
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      AppendCommand$3.call(textPlayer, "".concat(goType, ".add"),
      // name
      AddGameObject, // callback
      [goType, name].concat(args),
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    }).on('-', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      // [/goType.name]
      var tags = tag.split('.');
      var name;
      if (IsAddGameObjectTag(tags, goType)) {
        name = tags[1];
      } else {
        return;
      }
      AppendCommand$3.call(textPlayer, "".concat(goType, ".remove"),
      // name
      RemoveGameObject,
      // callback
      [goType, name],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var AddGameObject = function AddGameObject(params) {
    var goType, args;
    // this: textPlayer
    var _params = _toArray(params);
    goType = _params[0];
    args = _params.slice(1);
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.add.apply(gameObjectManager, _toConsumableArray(args));
  };
  var RemoveGameObject = function RemoveGameObject(params) {
    var goType, args;
    // this: textPlayer
    var _params2 = _toArray(params);
    goType = _params2[0];
    args = _params2.slice(1);
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.remove.apply(gameObjectManager, _toConsumableArray(args));
  };

  var OnParseRemoveAllGameObjectsTag = function OnParseRemoveAllGameObjectsTag(textPlayer, parser, config) {
    var goType = config.name;
    parser.on('-', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      // [/goType]
      if (tag === goType) ; else {
        return;
      }
      AppendCommand$3.call(textPlayer, "".concat(goType, ".removeall"),
      // name
      RemoveAllSprites,
      // callback
      goType,
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var RemoveAllSprites = function RemoveAllSprites(goType) {
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.removeAll();
  };

  var IsPropTag = function IsPropTag(tags, goType) {
    // goType.name.prop
    return tags.length === 3 && tags[0] === goType;
  };
  var OnParseCallGameObjectMethodTag = function OnParseCallGameObjectMethodTag(textPlayer, parser, config) {
    var goType = config.name;
    parser.on("+", function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      // [goType.name.methodName=value0,value1,value2...]
      // [goType.name.prop=value]
      var tags = tag.split('.');
      var name, prop;
      if (IsPropTag(tags, goType)) {
        name = tags[1];
        prop = tags[2];
      } else {
        return;
      }
      for (var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        parameters[_key - 1] = arguments[_key];
      }
      AppendCommand$3.call(textPlayer, "".concat(goType, ".call"),
      // name
      CallMethod, // callback
      [goType, name, prop].concat(parameters),
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var CallMethod = function CallMethod(params) {
    var goType, name, prop, args;
    // this: textPlayer
    var _params = _toArray(params);
    goType = _params[0];
    name = _params[1];
    prop = _params[2];
    args = _params.slice(3);
    var eventName = "".concat(goType, ".").concat(prop);
    this.emit.apply(this, [eventName, name].concat(_toConsumableArray(args)));
    if (this.listenerCount(eventName) > 0) {
      return;
    }
    var gameObjectManager = this.getGameObjectManager(goType);
    if (gameObjectManager.hasMethod(name, prop)) {
      // Is method
      gameObjectManager.call.apply(gameObjectManager, [name, prop].concat(_toConsumableArray(args)));
    } else {
      // Is property
      gameObjectManager.setProperty(name, prop, args[0]);
    }
  };

  var EaseMode = {
    to: true,
    yoyo: true,
    from: true,
    toLeft: true,
    toRight: true,
    toUp: true,
    toDown: true,
    yoyoLeft: true,
    yoyoRight: true,
    yoyoUp: true,
    yoyoDown: true,
    fromLeft: true,
    fromRight: true,
    fromUp: true,
    fromDown: true
  };
  var IsEasePropertyTag = function IsEasePropertyTag(tags, goType) {
    // goType.name.prop.to
    return tags.length === 4 && tags[0] === goType && EaseMode[tags[3]];
  };
  var OnParseEaseGameObjectPropertyTag = function OnParseEaseGameObjectPropertyTag(textPlayer, parser, config) {
    var goType = config.name;
    textPlayer.getGameObjectManager(goType);
    parser.on("+", function (tag, value, duration, ease, repeat) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      // [goType.name.prop.to=value,duration]
      // [goType.name.prop.to=value,duration,ease,repeat]
      // [goType.name.prop.to=value,duration,repeat]
      var tags = tag.split('.');
      var name, property, easeMode;
      if (IsEasePropertyTag(tags, goType)) {
        name = tags[1];
        property = tags[2];
        easeMode = tags[3];
      } else {
        return;
      }
      if (typeof ease === 'number') {
        repeat = ease;
        ease = undefined;
      }
      AppendCommand$3.call(textPlayer, "".concat(goType, ".ease"),
      // name
      EaseProperty,
      // callback
      [goType, name, property, value, duration, ease, repeat, easeMode],
      // params
      textPlayer // scope
      );
      parser.skipEvent();
    });
  };
  var EaseProperty = function EaseProperty(params) {
    var goType, name, property, value, duration, ease, repeat, easeMode;
    // this: textPlayer
    var _params = _slicedToArray(params, 8);
    goType = _params[0];
    name = _params[1];
    property = _params[2];
    value = _params[3];
    duration = _params[4];
    ease = _params[5];
    repeat = _params[6];
    easeMode = _params[7];
    var gameObjectManager = this.getGameObjectManager(goType);
    var currentValue = gameObjectManager.getProperty(name, property);
    // Only can tween number property
    if (typeof currentValue !== 'number') {
      return;
    }
    if (easeMode.endsWith('Left') || easeMode.endsWith('Up')) {
      if (easeMode.startsWith('to') || easeMode.startsWith('yoyo')) {
        value = currentValue - value;
      } else if (easeMode.startsWith('from')) {
        gameObjectManager.setProperty(name, property, currentValue - value);
        value = currentValue;
      }
    } else if (easeMode.endsWith('Right') || easeMode.endsWith('Down')) {
      if (easeMode.startsWith('to') || easeMode.startsWith('yoyo')) {
        value = currentValue + value;
      } else if (easeMode.startsWith('from')) {
        gameObjectManager.setProperty(name, property, currentValue + value);
        value = currentValue;
      }
    } else if (easeMode === 'from') {
      gameObjectManager.setProperty(name, property, value);
      value = currentValue;
    }
    var isYoyo = easeMode.startsWith('yoyo');
    gameObjectManager.easeProperty(name, property, value, duration, ease, repeat, isYoyo);
  };

  var ParseCallbacks = [OnParseAddGameObjectTag, OnParseRemoveAllGameObjectsTag, OnParseCallGameObjectMethodTag, OnParseEaseGameObjectPropertyTag];
  var AddGameObjectManager = GameObjectManagerMethods$1.addGameObjectManager;
  var GameObjectManagerMethods = {
    addGameObjectManager: function addGameObjectManager(config, GameObjectManagerClass) {
      config = config ? Clone(config) : {};
      var name = config.name;
      if (!name) {
        console.warn("[TextPlayer] Parameter 'name' is required in addGameObjectManager(config) method");
      }
      var defaultLayer = config.defaultLayer;
      var createGameObject = config.createGameObject;
      var layerManager = this.layerManager;
      config.createGameObject = function (scene) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        var gameObject = createGameObject.call.apply(createGameObject, [this, scene].concat(args));
        // this: config.createGameObjectScope

        if (defaultLayer && layerManager) {
          layerManager.addToLayer(defaultLayer, gameObject);
        }
        return gameObject;
      };
      AddGameObjectManager.call(this, config, GameObjectManagerClass);

      // Register parse callbacks
      var customParseCallbacks = config.parseCallbacks;
      if (!customParseCallbacks) {
        customParseCallbacks = ParseCallbacks;
      } else {
        customParseCallbacks = [].concat(_toConsumableArray(customParseCallbacks), ParseCallbacks);
      }
      for (var i = 0, cnt = customParseCallbacks.length; i < cnt; i++) {
        customParseCallbacks[i](this, this.parser, config);
      }
      return this;
    }
  };

  var SetClickTarget = function SetClickTarget(target) {
    this.waitEventManager.setClickTarget(target);
    return this;
  };

  var SetCameraTarget = function SetCameraTarget(camera) {
    this.waitEventManager.setCameraTarget(camera);
    return this;
  };

  var SetNextPageInput = function SetNextPageInput(input) {
    var textPlayer = this;
    if (!input) {
      this.nextPageInput = null;
    } else if (typeof input === 'function') {
      this.nextPageInput = function (callback, scope) {
        var waitEventManager = textPlayer.waitEventManager;
        waitEventManager.clearWaitCompleteCallbacks().addWaitCompleteCallback(callback, scope);
        var waitCompleteTriggerCallback = waitEventManager.getWaitCompleteTriggerCallback();
        input.call(textPlayer, waitCompleteTriggerCallback);
      };
    } else {
      this.nextPageInput = function (callback, scope) {
        WaitAny(textPlayer, input, callback, scope);
      };
    }
  };

  var AddImage = function AddImage(key, config) {
    this.imageManager.add(key, config);
    return this;
  };

  var PlayMethods = {
    play: function play(content) {
      if (this.isPlaying) {
        return this;
      }
      this.removeChildren();
      this.parser.start(content); // Parse bbcode-content

      this.isPlaying = true;
      this.once('complete', function () {
        this.isPlaying = false;
      }, this);
      this.lastWrapResult = undefined;
      this.typingNextPage();
      return this;
    },
    playPromise: function playPromise(content) {
      var promise = WaitComplete(this);
      this.play(content);
      return promise;
    }
  };

  var TypingNextPage = function TypingNextPage() {
    if (!this.isPlaying || this.isPageTyping) {
      return this;
    }
    this.typeWriter.once(PageFadeOutCompleteEvent, _TypingNextPage, this).fadeOutPage();
    return this;
  };
  var _TypingNextPage = function _TypingNextPage() {
    var result = this.runWrap(this.lastWrapResult);
    this.lastWrapResult = result;
    this.emit('page.start');
    var OnTypingPageComplete = function OnTypingPageComplete() {
      this.emit(StopPlayEvent); // Clear registed StopPlayEvent
      if (result.isLastPage) {
        this.emit('complete');
      } else {
        this.emit('page.complete');
        if (this.ignoreNextPageInput) {
          TypingNextPage.call(this);
        } else if (this.nextPageInput) {
          this.nextPageInput(TypingNextPage, this);
        } else ;
      }
    };

    // Remove event when typing pages has been canceled
    this.once(StopPlayEvent, function () {
      this.typeWriter.off('complete', OnTypingPageComplete, this);
    }, this);
    this.typeWriter.once('complete', OnTypingPageComplete, this).start(result.children);
  };

  var PauseMethods = {
    pause: function pause() {
      // Pause typing, typing timer and animation progresses
      this.timeline.pause();
      return this;
    },
    pauseTyping: function pauseTyping() {
      // Pause typing
      this.typeWriter.pauseTyping();
      return this;
    }
  };

  var ResumeMethods = {
    resume: function resume() {
      // Resume typing timer, animation progresses and typing
      this.timeline.resume();
      return this;
    },
    resumeTyping: function resumeTyping(offsetTime) {
      // Resume typing
      this.typeWriter.resumeTyping(offsetTime);
      return this;
    }
  };

  var Wait = function Wait(name) {
    this.typeWriter.wait(name);
    return this;
  };

  var TypingSpeedMethods = {
    setDefaultTypingSpeed: function setDefaultTypingSpeed(speed) {
      this.defaultTypingSpeed = speed;
      return this;
    },
    setTypingSpeed: function setTypingSpeed(speed) {
      this.typingSpeed = speed;
      return this;
    }
  };

  var SetIgnoreWait = function SetIgnoreWait(value) {
    this.typeWriter.setIgnoreWait(value);
    return this;
  };

  var SetIgnoreNextPageInput = function SetIgnoreNextPageInput(enable) {
    if (enable === undefined) {
      enable = true;
    }
    this.ignoreNextPageInput = enable;
    return this;
  };

  var ShowPage = function ShowPage() {
    // Only can work after playing, and before processing last child
    if (!this.isPlaying || !this.isPageTyping) {
      return this;
    }

    // Save parameters
    var typingSpeedSave = this.typeWriter.speed;
    var ignoreWaitSave = this.typeWriter.ignoreWait;
    var skipTypingAnimationSave = this.typeWriter.skipTypingAnimation;
    var skipSoundEffectSave = this.typeWriter.skipSoundEffect;
    this.typeWriter.once('complete', function () {
      // Recover parameters
      this.typeWriter.setTypingSpeed(typingSpeedSave).setIgnoreWait(ignoreWaitSave).setSkipTypingAnimation(skipTypingAnimationSave).setSkipSoundEffect(skipSoundEffectSave);
    }, this).setTypingSpeed(0).skipCurrentTypingDelay().setIgnoreWait(true).setSkipTypingAnimation(true).setSkipSoundEffect(true);
    return this;
  };

  var SpriteMethods = {
    getSprite: function getSprite(name) {
      return this.getGameObject('sprite', name);
    },
    addSprite: function addSprite(name, gameObject) {
      this.addGameObject('sprite', name, gameObject);
      return this;
    }
  };

  var ContentMethods = {
    setContentOutputEnable: function setContentOutputEnable(enable) {
      this.parser.setContentOutputEnable(enable);
      return this;
    },
    setContentCallback: function setContentCallback(callback, scope) {
      this.contentCallback = callback;
      this.contentCallbackScope = scope;
      return this;
    }
  };

  var Methods = {
    setClickTarget: SetClickTarget,
    setCameraTarget: SetCameraTarget,
    setNextPageInput: SetNextPageInput,
    addImage: AddImage,
    typingNextPage: TypingNextPage,
    wait: Wait,
    setIgnoreWait: SetIgnoreWait,
    setIgnoreNextPageInput: SetIgnoreNextPageInput,
    showPage: ShowPage
  };
  Object.assign(Methods, GameObjectManagerMethods, PlayMethods, PauseMethods, ResumeMethods, TypingSpeedMethods, SpriteMethods, ContentMethods);

  var ClearEvents = function ClearEvents(textPlayer) {
    for (var i = 0, cnt = ClearEvents$1.length; i < cnt; i++) {
      textPlayer.emit(ClearEvents$1[i]);
    }
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var TextPlayer = /*#__PURE__*/function (_Extend) {
    _inherits(TextPlayer, _Extend);
    function TextPlayer(scene, x, y, fixedWidth, fixedHeight, config) {
      var _this;
      _classCallCheck(this, TextPlayer);
      if (IsPlainObject(x)) {
        config = x;
      } else if (IsPlainObject(fixedWidth)) {
        config = fixedWidth;
      }
      if (config === undefined) {
        config = {};
      }

      // Don't set text in DynamicText's constructor
      var content = config.text;
      delete config.text;
      _this = _callSuper(this, TextPlayer, [scene, x, y, fixedWidth, fixedHeight, config]);
      _this.type = 'rexTextPlayer';
      _this.initManagers(scene, config);
      _this.parser = new Parser(_assertThisInitialized(_this), GetValue(config, 'parser', undefined));
      _this.typeWriter = new TypeWriter(_assertThisInitialized(_this), GetValue(config, 'typing', undefined));
      _this._imageManager = undefined;
      var imageData = GetValue(config, 'images', undefined);
      if (imageData) {
        _this.addImage(imageData);
      }
      var spriteManagerConfig = GetValue(config, 'sprites');
      if (spriteManagerConfig !== false && spriteManagerConfig !== null) {
        AddSpriteManager.call(_assertThisInitialized(_this), spriteManagerConfig);
      }
      _this.setIgnoreNextPageInput(GetValue(config, 'ignoreNextPageInput', false));
      _this.setNextPageInput(GetValue(config, 'nextPageInput', null));
      _this.isPlaying = false;
      if (content) {
        _this.play(content);
      }
      return _this;
    }
    _createClass(TextPlayer, [{
      key: "imageManager",
      get: function get() {
        if (this._imageManager === undefined) {
          this._imageManager = new ImageManager(this.scene);
        }
        return this._imageManager;
      }
    }, {
      key: "spriteManager",
      get: function get() {
        return this.getGameObjectManager('sprite');
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
          return;
        }
        ClearEvents(this);
        this.parser.destroy();
        this.parser = undefined;
        this.typeWriter.destroy(fromScene);
        this.typeWriter = undefined;
        if (this._imageManager) {
          this._imageManager.destroy(fromScene);
        }
        this._imageManager = undefined;
        this.destroyManagers(fromScene);
        _get(_getPrototypeOf(TextPlayer.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "isPageTyping",
      get: function get() {
        return this.typeWriter.isPageTyping;
      }
    }, {
      key: "defaultTypingSpeed",
      get: function get() {
        return this.typeWriter.defaultTypingSpeed;
      },
      set: function set(speed) {
        this.typeWriter.setDefaultTypingSpeed(speed);
      }
    }, {
      key: "typingSpeed",
      get: function get() {
        return this.typeWriter.speed;
      },
      set: function set(speed) {
        this.typeWriter.setTypingSpeed(speed);
      }
    }, {
      key: "timeScale",
      get: function get() {
        return this.getTimeScale();
      },
      set: function set(value) {
        this.setTimeScale(value);
      }
    }]);
    return TextPlayer;
  }(Extend(DynamicText));
  Object.assign(TextPlayer.prototype, Methods);

  return TextPlayer;

}));
