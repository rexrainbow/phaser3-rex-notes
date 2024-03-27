(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextagplayerplugin = factory());
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
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
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

  var DataMethods$1 = {
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
  Object.assign(BobBase.prototype, PropertyMethods$1, CallMethods$1, DataMethods$1);

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

  var EventEmitter$2 = Phaser.Events.EventEmitter;
  var MonitorViewport = function MonitorViewport(viewport) {
    if (viewport.events) {
      return viewport;
    }
    var events = new EventEmitter$2();
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

  var RemoveItem$2 = Phaser.Utils.Array.Remove;
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
        RemoveItem$2(this.removedGOs, gameObject);
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

  var DataMethods = {
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
  var RotateAround = Phaser.Math.RotateAround;
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
      RotateAround(output, gameObject.x, gameObject.y, gameObject.rotation);
    }
    if (includeParent && gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      parentMatrix.transformPoint(output.x, output.y, output);
    }
    return output;
  };

  var GetValue$k = Phaser.Utils.Objects.GetValue;
  var DrawBounds = function DrawBounds(gameObjects, graphics, config) {
    var strokeColor, lineWidth, fillColor, fillAlpha, padding;
    if (typeof config === 'number') {
      strokeColor = config;
    } else {
      strokeColor = GetValue$k(config, 'color');
      lineWidth = GetValue$k(config, 'lineWidth');
      fillColor = GetValue$k(config, 'fillColor');
      fillAlpha = GetValue$k(config, 'fillAlpha', 1);
      padding = GetValue$k(config, 'padding', 0);
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

  var Methods$5 = {
    drawGameObjectsBounds: DrawGameObjectsBounds
  };
  Object.assign(Methods$5, GetMethods, AddMethods, RemoveMethods, PropertyMethods, CallMethods, DataMethods, FadeMethods);

  var CameraClass = Phaser.Cameras.Scene2D.BaseCamera;
  var IsCameraObject = function IsCameraObject(object) {
    return object instanceof CameraClass;
  };

  var Rectangle = Phaser.Geom.Rectangle;
  var GetViewport = function GetViewport(scene, camera, out) {
    if (!IsCameraObject(camera)) {
      out = camera;
      camera = undefined;
    }
    if (out === undefined) {
      out = new Rectangle();
    } else if (out === true) {
      out = globRect;
    }
    if (camera) {
      return scene.scale.getViewPort(camera, out);
    } else {
      return scene.scale.getViewPort(out);
    }
  };
  var globRect = new Rectangle();

  var GetValue$j = Phaser.Utils.Objects.GetValue;
  var GOManager = /*#__PURE__*/function () {
    function GOManager(scene, config) {
      _classCallCheck(this, GOManager);
      this.scene = scene;
      this.BobClass = GetValue$j(config, 'BobClass', BobBase);
      this.setCreateGameObjectCallback(GetValue$j(config, 'createGameObject'), GetValue$j(config, 'createGameObjectScope'));
      this.setEventEmitter(GetValue$j(config, 'eventEmitter', undefined));
      this.setGameObjectDepth(GetValue$j(config, 'depth', undefined));
      var fadeConfig = GetValue$j(config, 'fade', 500);
      if (typeof fadeConfig === 'number') {
        this.setGOFadeMode();
        this.setGOFadeTime(fadeConfig);
      } else {
        this.setGOFadeMode(GetValue$j(fadeConfig, 'mode'));
        this.setGOFadeTime(GetValue$j(fadeConfig, 'time', 500));
      }
      var viewportCoordinateConfig = GetValue$j(config, 'viewportCoordinate', false);
      if (viewportCoordinateConfig !== false) {
        this.setViewportCoordinateEnable(GetValue$j(config, 'enable', true));
        this.setViewport(GetValue$j(viewportCoordinateConfig, 'viewport'));
      } else {
        this.setViewportCoordinateEnable(false);
      }
      var effectPropertiesConfig = GetValue$j(config, 'effectProperties', false);
      this.setEffectPropertiesConfig(effectPropertiesConfig);
      this.setSymbols(GetValue$j(config, 'symbols'));
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
  Object.assign(GOManager.prototype, EventEmitterMethods$1, Methods$5);

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

  var GetValue$i = Phaser.Utils.Objects.GetValue;
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
      var rootLayer = GetValue$i(config, 'rootLayer');
      _this.setRootLayer(rootLayer);
      var initLayers = GetValue$i(config, 'layers');
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

  var GetValue$h = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$h(config, 'eventEmitter', true));

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

  var GetValue$g = Phaser.Utils.Objects.GetValue;
  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);
    function TickTask(parent, config) {
      var _this;
      _classCallCheck(this, TickTask);
      _this = _callSuper(this, TickTask, [parent, config]);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;
      _this.setTickingMode(GetValue$g(config, 'tickingMode', 1));
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

  var GetValue$f = Phaser.Utils.Objects.GetValue;
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
      _this.tickEventName = GetValue$f(config, 'tickEventName', defaultEventName);
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

  var GetValue$e = Phaser.Utils.Objects.GetValue;
  var Clamp$1 = Phaser.Math.Clamp;
  var Timer$1 = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);
      this.resetFromJSON(config);
    }
    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$e(o, 'state', IDLE);
        this.timeScale = GetValue$e(o, 'timeScale', 1);
        this.delay = GetValue$e(o, 'delay', 0);
        this.repeat = GetValue$e(o, 'repeat', 0);
        this.repeatCounter = GetValue$e(o, 'repeatCounter', 0);
        this.repeatDelay = GetValue$e(o, 'repeatDelay', 0);
        this.duration = GetValue$e(o, 'duration', 0);
        this.nowTime = GetValue$e(o, 'nowTime', 0);
        this.justRestart = GetValue$e(o, 'justRestart', false);
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

  var GetValue$d = Phaser.Utils.Objects.GetValue;
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
        this.timer.resetFromJSON(GetValue$d(o, 'timer'));
        this.setEnable(GetValue$d(o, 'enable', true));
        this.setTarget(GetValue$d(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue$1(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$1(o, 'duration', 1000));
        this.setEase(GetValue$d(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$d(o, 'repeat', 0));
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

  var GetValue$c = Phaser.Utils.Objects.GetValue;
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
        this.setMode(GetValue$c(o, 'mode', 0));
        this.setEnable(GetValue$c(o, 'enable', true));
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

  var GetValue$b = Phaser.Utils.Objects.GetValue;
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
        loop: GetValue$b(config, 'loop', this.backgroundMusicLoop),
        mute: GetValue$b(config, 'mute', this.backgroundMusicMute),
        volume: GetValue$b(config, 'volume', this.backgroundMusicVolume),
        detune: GetValue$b(config, 'detune', 0),
        rate: GetValue$b(config, 'rate', 1)
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

  var GetValue$a = Phaser.Utils.Objects.GetValue;
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
        loop: GetValue$a(config, 'loop', this.backgroundMusicLoop),
        mute: GetValue$a(config, 'mute', this.backgroundMusic2Mute),
        volume: GetValue$a(config, 'volume', this.backgroundMusic2Volume),
        detune: GetValue$a(config, 'detune', 0),
        rate: GetValue$a(config, 'rate', 1)
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

  var RemoveItem$1 = Phaser.Utils.Array.Remove;
  var GetValue$9 = Phaser.Utils.Objects.GetValue;
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
        mute: GetValue$9(config, 'mute', this.soundEffectsMute),
        volume: GetValue$9(config, 'volume', this.soundEffectsVolume),
        detune: GetValue$9(config, 'detune', 0),
        rate: GetValue$9(config, 'rate', 1)
      });
      this.soundEffects.push(music);
      music.once('complete', function () {
        music.destroy();

        // SoundManager has been destroyed
        if (!this.sound) {
          return;
        }
        RemoveItem$1(this.soundEffects, music);
      }, this).once('destroy', function () {
        // SoundManager has been destroyed
        if (!this.sound) {
          return;
        }
        RemoveItem$1(this.soundEffects, music);
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

  var RemoveItem = Phaser.Utils.Array.Remove;
  var GetValue$8 = Phaser.Utils.Objects.GetValue;
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
        mute: GetValue$8(config, 'mute', this.soundEffects2Mute),
        volume: GetValue$8(config, 'volume', this.soundEffects2Volume),
        detune: GetValue$8(config, 'detune', 0),
        rate: GetValue$8(config, 'rate', 1)
      });
      this.soundEffects2.push(music);
      music.once('complete', function () {
        music.destroy();

        // SoundManager has been destroyed
        if (!this.sound) {
          return;
        }
        RemoveItem(this.soundEffects2, music);
      }, this).once('destroy', function () {
        // SoundManager has been destroyed
        if (!this.sound) {
          return;
        }
        RemoveItem(this.soundEffects2, music);
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

  var Methods$4 = {
    hasAudio: HasaAudio
  };
  Object.assign(Methods$4, BackgroundMusicMethods, BackgroundMusic2Methods, SoundEffectsMethods, SoundEffects2Methods);

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var SoundManager = /*#__PURE__*/function () {
    function SoundManager(game, config) {
      _classCallCheck(this, SoundManager);
      this.sound = GetSoundManager(game);

      // Background music will be (fade out)destroyed when play next one.
      this.backgroundMusic = undefined;
      this._backgroundMusicVolume = GetValue$7(config, 'bgm.volume', 1);
      this._backgroundMusicMute = GetValue$7(config, 'bgm.mute', false);
      this.setBackgroundMusicLoop(GetValue$7(config, 'bgm.loop', true));
      this.setBackgroundMusicFadeTime(GetValue$7(config, 'bgm.fade', 500));
      this.backgroundMusic2 = undefined;
      this._backgroundMusic2Volume = GetValue$7(config, 'bgm2.volume', 1);
      this._backgroundMusic2Mute = GetValue$7(config, 'bgm2.mute', false);
      this.setBackgroundMusic2Loop(GetValue$7(config, 'bgm2.loop', true));
      this.setBackgroundMusic2FadeTime(GetValue$7(config, 'bgm2.fade', 500));

      // Sound effect will be destroyed when completed
      this.soundEffects = [];
      this._soundEffectsVolume = GetValue$7(config, 'soundEffect.volume', 1);
      this.soundEffects2 = [];
      this._soundEffects2Volume = GetValue$7(config, 'soundEffect2.volume', 1);
      var initialBackgroundMusic = GetValue$7(config, 'bgm.initial', undefined);
      if (initialBackgroundMusic) {
        this.setCurrentBackgroundMusic(initialBackgroundMusic);
      }
      var initialBackgroundMusic2 = GetValue$7(config, 'bgm2.initial', undefined);
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
  Object.assign(SoundManager.prototype, Methods$4);

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
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
        this.isRunning = GetValue$6(o, 'isRunning', false);
        this.timeScale = GetValue$6(o, 'timeScale', 1);
        this.now = GetValue$6(o, 'now', 0);
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

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var TimerPool = new TimerPool$1();
  var Timeline = /*#__PURE__*/function (_Clock) {
    _inherits(Timeline, _Clock);
    function Timeline(parent, config) {
      var _this;
      _classCallCheck(this, Timeline);
      _this = _callSuper(this, Timeline, [parent, config]);
      _this.addedTimers = [];
      _this.timers = [];
      _this.timerPool = GetValue$5(config, 'pool', TimerPool);
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
  var GetValue$4 = function GetValue(source, key, defaultValue) {
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
      _this.waitCompleteEventName = GetValue$4(config, 'completeEventName', _this.waitCompleteEventName);
      _this.setClickTarget(GetValue$4(config, 'clickTarget', _this.scene));
      _this.setCameraTarget(GetValue$4(config, 'camera', _this.scene.cameras.main));
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
  var Methods$3 = {
    waitAny: WaitAny$1
  };
  Object.assign(WaitEventManager.prototype, WaitTimeMethods, WaitInputMethods, WaitGameObjectMethods, WaitCameraMethods, WaitMusicMethods, Methods$3);

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var InitManagers = function InitManagers(scene, config) {
    this.clickTarget = undefined;
    this.cameraTarget = undefined;
    this.managersScene = scene;
    this.gameObjectManagers = {};
    var layerNames = GetValue$3(config, 'layers', false);
    if (layerNames !== false) {
      var layerManager = new LayerManager(scene, {
        layers: layerNames,
        rootLayer: GetValue$3(config, 'rootLayer', undefined),
        depth: GetValue$3(config, 'layerDepth', undefined)
      });
      this.gameObjectManagers.layer = layerManager;
      this.layerManager = layerManager;
    }
    var soundManagerConfig = GetValue$3(config, 'sounds');
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

  var EventEmitter$1 = /*#__PURE__*/function (_EE) {
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
        EventEmitterClass = EventEmitter$1;
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
      this.setEventEmitter(GetValue$4(config, 'eventEmitter', undefined));

      // Value convert
      this.setValueConverter(GetValue$4(config, 'valueConvert', true));
      // Loop
      this.setLoopEnable(GetValue$4(config, 'loop', false));

      // Brackets and generate regex
      this.setMultipleLinesTagEnable(GetValue$4(config, 'multipleLinesTag', false));
      var delimiters = GetValue$4(config, 'delimiters', '<>');
      this.setDelimiters(delimiters[0], delimiters[1]);

      // Translate tagName callback
      this.setTranslateTagNameCallback(GetValue$4(config, 'translateTagNameCallback'));
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
      _this.setTagExpression(GetValue$4(config, 'regex.tag', undefined));
      _this.setValueExpression(GetValue$4(config, 'regex.value', undefined));
      // Brackets and generate regex
      var delimiters = GetValue$4(config, 'delimiters', '<>');
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

  var OnParseWaitTag = function OnParseWaitTag(tagPlayer, parser, config) {
    var tagWait = 'wait';
    var tagClick = 'click';
    parser.on("+".concat(tagWait), function (name) {
      tagPlayer.wait(name);
      parser.skipEvent();
    }).on("-".concat(tagWait), function () {
      parser.skipEvent();
    }).on("+".concat(tagClick), function () {
      // Equal to [wait=click]
      tagPlayer.wait('click');
      parser.skipEvent();
    }).on("-".concat(tagClick), function () {
      // Equal to [/wait]
      parser.skipEvent();
    });
  };

  var OnParsePlaySoundEffectTag = function OnParsePlaySoundEffectTag(tagPlayer, parser, config) {
    var tagName = 'se';
    parser.on("+".concat(tagName), function (name, fadeInTime) {
      if (this.skipSoundEffect) {
        return;
      }
      tagPlayer.soundManager.playSoundEffect(name); // this: tagPlayer
      if (fadeInTime) {
        tagPlayer.soundManager.fadeInSoundEffect(fadeInTime);
      }
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se2';
    parser.on("+".concat(tagName), function (name, fadeInTime) {
      if (this.skipSoundEffect) {
        return;
      }
      tagPlayer.soundManager.playSoundEffect2(name); // this: tagPlayer
      if (fadeInTime) {
        tagPlayer.soundManager.fadeInSoundEffect2(fadeInTime);
      }
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseFadeInSoundEffectTag = function OnParseFadeInSoundEffectTag(tagPlayer, parser, config) {
    var tagName = 'se.fadein';
    parser.on("+".concat(tagName), function (time) {
      tagPlayer.soundManager.fadeInSoundEffect(time);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se2.fadein';
    parser.on("+".concat(tagName), function (time) {
      tagPlayer.soundManager.fadeInSoundEffect2(time);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseFadeOutSoundEffectTag = function OnParseFadeOutSoundEffectTag(tagPlayer, parser, config) {
    var tagName = 'se.fadeout';
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      tagPlayer.soundManager.fadeOutSoundEffect(time, isStopped);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se2.fadeout';
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      tagPlayer.soundManager.fadeOutSoundEffect2(time, isStopped);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseSetSoundEffectVolumeTag = function OnParseSetSoundEffectVolumeTag(tagPlayer, parser, config) {
    var tagName = 'se.volume';
    parser.on("+".concat(tagName), function (volume) {
      tagPlayer.soundManager.setSoundEffectVolume(volume, true);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se2.volume';
    parser.on("+".concat(tagName), function (volume) {
      tagPlayer.soundManager.setSoundEffectVolume2(volume, true);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseSetSoundEffectMuteTag = function OnParseSetSoundEffectMuteTag(tagPlayer, parser, config) {
    var tagName = 'se.mute';
    parser.on("+".concat(tagName), function () {
      tagPlayer.soundManager.setSoundEffectMute(true);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se2.mute';
    parser.on("+".concat(tagName), function () {
      tagPlayer.soundManager.setSoundEffect2Mute(true);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se.unmute';
    parser.on("+".concat(tagName), function () {
      tagPlayer.soundManager.setSoundEffectMute(false);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'se2.unmute';
    parser.on("+".concat(tagName), function () {
      tagPlayer.soundManager.setSoundEffect2Mute(false);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParsePlayBackgroundMusicTag = function OnParsePlayBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = 'bgm';
    parser.on("+".concat(tagName), function (name, fadeInTime) {
      tagPlayer.soundManager.playBackgroundMusic(name);
      if (fadeInTime) {
        tagPlayer.soundManager.fadeInBackgroundMusic(fadeInTime);
      }
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      tagPlayer.soundManager.stopBackgroundMusic();
      parser.skipEvent();
    });
    var tagName = 'bgm2';
    parser.on("+".concat(tagName), function (name, fadeInTime) {
      tagPlayer.soundManager.playBackgroundMusic2(name);
      if (fadeInTime) {
        tagPlayer.soundManager.fadeInBackgroundMusic2(fadeInTime);
      }
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      tagPlayer.soundManager.stopBackgroundMusic2();
      parser.skipEvent();
    });
  };

  var OnParseFadeInBackgroundMusicTag = function OnParseFadeInBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = 'bgm.fadein';
    parser.on("+".concat(tagName), function (time) {
      tagPlayer.soundManager.fadeInBackgroundMusic(time);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm2.fadein';
    parser.on("+".concat(tagName), function (time) {
      tagPlayer.soundManager.fadeInBackgroundMusic2(time);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseFadeOutBackgroundMusicTag = function OnParseFadeOutBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = 'bgm.fadeout';
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      tagPlayer.soundManager.fadeOutBackgroundMusic(time, isStopped);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm2.fadeout';
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      tagPlayer.soundManager.fadeOutBackgroundMusic2(time, isStopped);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseCrossFadeBackgroundMusicTag = function OnParseCrossFadeBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = 'bgm.cross';
    parser.on("+".concat(tagName), function (name, fadeTime) {
      tagPlayer.soundManager.crossFadeBackgroundMusic(name, fadeTime);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm2.cross';
    parser.on("+".concat(tagName), function (name, fadeTime) {
      tagPlayer.soundManager.crossFadeBackgroundMusic2(name, fadeTime);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParsePauseBackgroundMusicTag = function OnParsePauseBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = 'bgm.pause';
    parser.on("+".concat(tagName), function () {
      tagPlayer.soundManager.pauseBackgroundMusic();
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      tagPlayer.soundManager.resumeBackgroundMusic();
      parser.skipEvent();
    });
    var tagName = 'bgm2.pause';
    parser.on("+".concat(tagName), function () {
      tagPlayer.soundManager.pauseBackgroundMusic2();
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      tagPlayer.soundManager.resumeBackgroundMusic2();
      parser.skipEvent();
    });
  };

  var OnParseSetBackgroundMusicVolumeTag = function OnParseSetBackgroundMusicVolumeTag(tagPlayer, parser, config) {
    var tagName = 'bgm.volume';
    parser.on("+".concat(tagName), function (volume) {
      tagPlayer.soundManager.setBackgroundMusicVolume(volume);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm2.volume';
    parser.on("+".concat(tagName), function (volume) {
      tagPlayer.soundManager.setBackgroundMusicVolume2(volume);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseSetBackgroundMusicMuteTag = function OnParseSetBackgroundMusicMuteTag(tagPlayer, parser, config) {
    var tagName = 'bgm.mute';
    parser.on("+".concat(tagName), function () {
      tagPlayer.soundManager.setBackgroundMusicMute(true);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm2.mute';
    parser.on("+".concat(tagName), function () {
      tagPlayer.soundManager.setBackgroundMusic2Mute(true);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm.unmute';
    parser.on("+".concat(tagName), function () {
      tagPlayer.soundManager.setBackgroundMusicMute(false);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
    var tagName = 'bgm2.unmute';
    parser.on("+".concat(tagName), function () {
      tagPlayer.soundManager.setBackgroundMusic2Mute(false);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseFadeInCameraTag = function OnParseFadeInCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.fadein';
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      tagPlayer.cameraTarget.fadeIn(duration, red, green, blue);
      parser.skipEvent();
    });
  };

  var OnParseFadeOutCameraTag = function OnParseFadeOutCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.fadeout';
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      tagPlayer.cameraTarget.fadeOut(duration, red, green, blue);
      parser.skipEvent();
    });
  };

  var OnParseShakeCameraTag = function OnParseShakeCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.shake';
    parser.on("+".concat(tagName), function (duration, intensity) {
      tagPlayer.cameraTarget.shake(duration, intensity);
      parser.skipEvent();
    });
  };

  var OnParseFlashCameraTag = function OnParseFlashCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.flash';
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      tagPlayer.cameraTarget.flash(duration, red, green, blue);
      parser.skipEvent();
    });
  };

  var OnParseZoomCameraTag = function OnParseZoomCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.zoom';
    parser.on("+".concat(tagName), function (value) {
      tagPlayer.cameraTarget.setZoom(value);
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (value, duration, ease) {
      tagPlayer.cameraTarget.zoomTo(value, duration, ease);
      parser.skipEvent();
    });
  };

  var DegToRad = Phaser.Math.DegToRad;
  var OnParseRotateCameraTag = function OnParseRotateCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.rotate';
    parser.on("+".concat(tagName), function (value) {
      tagPlayer.cameraTarget.setRotation(DegToRad(value));
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (value, duration, ease) {
      value = DegToRad(value);
      tagPlayer.cameraTarget.rotateTo(DegToRad(value), false, duration, ease);
      parser.skipEvent();
    });
  };

  var OnParseScrollCameraTag = function OnParseScrollCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.scroll';
    parser.on("+".concat(tagName), function (x, y) {
      tagPlayer.cameraTarget.setScroll(x, y);
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (x, y, duration, ease) {
      // this: tagPlayer
      var camera = tagPlayer.cameraTarget;
      var xSave = camera.scrollX;
      var ySave = camera.scrollY;
      camera.setScroll(x, y);
      x += camera.centerX;
      y += camera.centerY;
      camera.setScroll(xSave, ySave);

      // x,y in pan() is the centerX, centerY
      camera.pan(x, y, duration, ease);
      parser.skipEvent();
    });
  };

  var OnParseContent = function OnParseContent(tagPlayer, parser, config) {
    parser.on('content', function (content) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }
      if (content === '\n') {
        return;
      }
      content = content.replaceAll('\\n', '\n');
      var callback = tagPlayer.contentCallback;
      if (callback) {
        var scope = tagPlayer.contentCallbackScope;
        if (scope) {
          callback.call(scope, content);
        } else {
          callback(content);
        }
        parser.skipEvent();
      }
      tagPlayer.emit("+".concat(parser.lastTagStart, "#content"), content);

      // Route 'content' event to tagPlayer
      tagPlayer.emit('content', content);
    });
  };

  var OnParseCustomTag = function OnParseCustomTag(tagPlayer, parser, config) {
    parser.on('+', function (tagName) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      tagPlayer.emit.apply(tagPlayer, ["+".concat(tagName), parser].concat(params));
    }).on('-', function (tagName) {
      if (parser.skipEventFlag) {
        return;
      }
      tagPlayer.emit("-".concat(tagName), parser);
    });
  };

  var ParseCallbacks$3 = [OnParseWaitTag, OnParsePlaySoundEffectTag, OnParseFadeInSoundEffectTag, OnParseFadeOutSoundEffectTag, OnParseSetSoundEffectVolumeTag, OnParseSetSoundEffectMuteTag, OnParsePlayBackgroundMusicTag, OnParseFadeInBackgroundMusicTag, OnParseFadeOutBackgroundMusicTag, OnParseCrossFadeBackgroundMusicTag, OnParsePauseBackgroundMusicTag, OnParseSetBackgroundMusicVolumeTag, OnParseSetBackgroundMusicMuteTag, OnParseFadeInCameraTag, OnParseFadeOutCameraTag, OnParseShakeCameraTag, OnParseFlashCameraTag, OnParseZoomCameraTag, OnParseRotateCameraTag, OnParseScrollCameraTag, OnParseContent, OnParseCustomTag];
  var AddParseCallbacks = function AddParseCallbacks(tagPlayer, parser, config) {
    for (var i = 0, cnt = ParseCallbacks$3.length; i < cnt; i++) {
      ParseCallbacks$3[i](tagPlayer, parser, config);
    }
    parser.on('start', function () {
      tagPlayer.emit('start', parser);
    }).on('complete', function () {
      tagPlayer.emit('complete', parser);
    });
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
    return lines.join('');
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var Parser = /*#__PURE__*/function (_BracketParser) {
    _inherits(Parser, _BracketParser);
    function Parser(tagPlayer, config) {
      var _this;
      _classCallCheck(this, Parser);
      if (config === undefined) {
        config = {};
      }
      if (!config.hasOwnProperty('delimiters')) {
        config.delimiters = '[]';
      }
      _this = _callSuper(this, Parser, [config]);
      AddParseCallbacks(tagPlayer, _assertThisInitialized(_this), config);
      _this.setCommentLineStartSymbol(GetValue$2(config, 'comment', '//'));
      return _this;
    }
    _createClass(Parser, [{
      key: "setCommentLineStartSymbol",
      value: function setCommentLineStartSymbol(symbol) {
        this.commentLineStart = symbol;
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

  var Methods$2 = {};
  Object.assign(Methods$2, AnimationMethods);

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
  Object.assign(SpriteManager.prototype, Methods$2);

  var IsPlayAnimationTag = function IsPlayAnimationTag(tags, goType) {
    // goType.name.play
    return tags.length === 3 && tags[0] === goType && tags[2] === 'play';
  };
  var IsStopAnimationTag = function IsStopAnimationTag(tags, goType) {
    // goType.name.stop
    return tags.length === 3 && tags[0] === goType && tags[2] === 'stop';
  };
  var OnParsePlayAnimationTag = function OnParsePlayAnimationTag(tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
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
      var keys = Array.prototype.slice.call(arguments, 1);
      var firstKey = keys.shift();
      gameObjectManager.playAnimation(name, firstKey);
      if (keys.length > 0) {
        gameObjectManager.chainAnimation(name, keys);
      }
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
      gameObjectManager.stopAnimation(name);
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
      gameObjectManager.stopAnimation(name);
      parser.skipEvent();
    });
  };

  var IsPauseAnimationTag = function IsPauseAnimationTag(tags, goType) {
    // goType.name.pause 
    return tags.length === 3 && tags[0] === goType && tags[2] === 'pause';
  };
  var OnParsePauseAnimationTag = function OnParsePauseAnimationTag(tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
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
      gameObjectManager.pauseAnimation(name);
      parser.skipEvent();
    });
  };

  var IsChainAnimationTag = function IsChainAnimationTag(tags, goType) {
    // goType.name.chain 
    return tags.length === 3 && tags[0] === goType && tags[2] === 'chain';
  };
  var OnParseChainAnimationTag = function OnParseChainAnimationTag(tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
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
      gameObjectManager.chainAnimation(name, keys);
      parser.skipEvent();
    });
  };

  var ParseCallbacks$2 = [OnParsePlayAnimationTag, OnParsePauseAnimationTag, OnParseChainAnimationTag];
  var AddSpriteManager = function AddSpriteManager(config) {
    if (config === undefined) {
      config = {};
    }
    config.name = 'sprite';
    config.parseCallbacks = ParseCallbacks$2;
    this.addGameObjectManager(config, SpriteManager);
  };

  var TextClass = Phaser.GameObjects.Text;
  var IsTextGameObject = function IsTextGameObject(gameObject) {
    return gameObject instanceof TextClass;
  };

  var BitmapTextClass = Phaser.GameObjects.BitmapText;
  var IsBitmapTextGameObject = function IsBitmapTextGameObject(gameObject) {
    return gameObject instanceof BitmapTextClass;
  };

  var TextType = 0;
  var TagTextType = 1;
  var BitmapTextType = 2;
  var GetTextObjectType = function GetTextObjectType(textObject) {
    var textObjectType;
    if (IsBitmapTextGameObject(textObject)) {
      textObjectType = BitmapTextType;
    } else if (IsTextGameObject(textObject)) {
      textObjectType = TextType;
    } else {
      textObjectType = TagTextType;
    }
    return textObjectType;
  };

  var GetWrapText = function GetWrapText(textObject, text) {
    var textObjectType = GetTextObjectType(textObject);
    switch (textObjectType) {
      case TextType:
        textObject.style.syncFont(textObject.canvas, textObject.context);
        text = textObject.runWordWrap(text);
        break;
      case TagTextType:
        text = textObject.getText(text, undefined, undefined, true);
        break;
      case BitmapTextType:
        text = textObject.setText(text).getTextBounds().wrappedText;
        break;
    }
    return text;
  };

  var SetNoWrapText = function SetNoWrapText(textObject, text) {
    var textObjectType = GetTextObjectType(textObject);
    switch (textObjectType) {
      case TextType:
        // Store wrap properties
        var style = textObject.style;
        var wordWrapWidth = style.wordWrapWidth;
        var wordWrapCallback = style.wordWrapCallback;
        // Disable wrap
        style.wordWrapWidth = 0;
        style.wordWrapCallback = undefined;
        // Set text
        textObject.setText(text);
        // Restore wrap
        style.wordWrapWidth = wordWrapWidth;
        style.wordWrapCallback = wordWrapCallback;
        break;
      case TagTextType:
        // Store wrap properties
        var style = textObject.style;
        var wrapMode = style.wrapMode;
        // Disable wrap
        style.wrapMode = 0;
        // Set text
        textObject.setText(text);
        // Restore wrap
        style.wrapMode = wrapMode;
        break;
      case BitmapTextType:
        // Store wrap properties
        var maxWidth = textObject._maxWidth;
        // Disable wrap
        textObject._maxWidth = 0;
        // Set text
        textObject.setText(text);
        // Restore wrap
        textObject._maxWidth = maxWidth;
        break;
    }
  };

  var GetFastValue = Phaser.Utils.Objects.GetFastValue;
  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var TextTyping = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TextTyping, _ComponentBase);
    function TextTyping(gameObject, config) {
      var _this;
      _classCallCheck(this, TextTyping);
      _this = _callSuper(this, TextTyping, [gameObject, config]);
      // this.parent = gameObject;

      _this.timer = null;
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(TextTyping, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setTextWrapEnable(GetValue$1(o, 'wrap', false));
        this.setTypeMode(GetValue$1(o, 'typeMode', 0));
        this.setTypingSpeed(GetValue$1(o, 'speed', 333));
        this.setTextCallback = GetFastValue(o, 'setTextCallback', null);
        this.setTextCallbackScope = GetFastValue(o, 'setTextCallbackScope', null);
        this.setTypingContent(GetFastValue(o, 'text', ''));
        this.typingIdx = GetFastValue(o, 'typingIdx', 0);
        this.insertIdx = null;
        this.insertChar = null;
        var elapsed = GetFastValue(o, 'elapsed', null);
        if (elapsed !== null) {
          this.start(undefined, undefined, this.typingIdx, elapsed);
        }
        return this;
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.freeTimer();
        _get(_getPrototypeOf(TextTyping.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setTypeMode",
      value: function setTypeMode(m) {
        if (typeof m === 'string') {
          m = TYPEMODE[m];
        }
        this.typeMode = m;
        return this;
      }
    }, {
      key: "setTypeSpeed",
      value: function setTypeSpeed(speed) {
        this.speed = speed;
        return this;
      }
    }, {
      key: "setTypingSpeed",
      value: function setTypingSpeed(speed) {
        this.speed = speed;
        return this;
      }
    }, {
      key: "setTextWrapEnable",
      value: function setTextWrapEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.textWrapEnable = enable;
        return this;
      }
    }, {
      key: "text",
      get: function get() {
        return this._text;
      },
      set: function set(value) {
        var text = TransferText(value);
        if (this.textWrapEnable) {
          text = GetWrapText(this.parent, text);
        }
        this._text = text;
      }
    }, {
      key: "isTyping",
      get: function get() {
        return this.getTimer() !== null;
      }
    }, {
      key: "isLastChar",
      get: function get() {
        return this.typingIdx === this.textLen;
      }
    }, {
      key: "start",
      value: function start(text, speed, startIdx, timerStartAt) {
        if (text !== undefined) {
          this.setTypingContent(text);
        }
        if (speed !== undefined) {
          this.speed = speed;
        }
        if (startIdx === undefined) {
          startIdx = 0;
        }
        this.typingIdx = startIdx + 1;
        if (this.speed === 0) {
          this.stop(true);
        } else {
          this.setText('');
          this.startTimer(timerStartAt);
        }
        return this;
      }
    }, {
      key: "appendText",
      value: function appendText(text) {
        var newText = this.text.concat(TransferText(text));
        if (this.isTyping) {
          this.setTypingContent(newText);
        } else {
          this.start(newText, undefined, this.textLen);
        }
        return this;
      }
    }, {
      key: "stop",
      value: function stop(showAllText) {
        var timer = this.getTimer();
        if (timer) {
          this.freeTimer();
        }
        if (showAllText) {
          // Fire 'type' event for remainder characters until lastChar
          while (!this.isLastChar) {
            this.getTypingString(this.text, this.typingIdx, this.textLen, this.typeMode);
            this.emit('typechar', this.insertChar);
            this.typingIdx++;
          }
          // Display all characters on text game object
          this.setText(this.text);
          this.emit('type');
          this.emit('complete', this, this.parent);
        }
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        var timer = this.getTimer();
        if (timer) {
          timer.paused = true;
        }
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        var timer = this.getTimer();
        if (timer) {
          timer.paused = false;
        }
        return this;
      }
    }, {
      key: "setTypingContent",
      value: function setTypingContent(text) {
        this.text = text;
        this.textLen = this.getTextLength(this.text);
        return this;
      }
    }, {
      key: "onTyping",
      value: function onTyping() {
        var newText = this.getTypingString(this.text, this.typingIdx, this.textLen, this.typeMode);
        this.setText(newText);
        this.emit('typechar', this.insertChar);
        this.emit('type');
        if (this.isLastChar) {
          this.freeTimer();
          this.emit('complete', this, this.parent);
        } else {
          this.timer.delay = this.speed; // delay of next typing            
          this.typingIdx++;
        }
      }
    }, {
      key: "getTypingString",
      value: function getTypingString(text, typeIdx, textLen, typeMode) {
        var result;
        if (typeMode === 0) {
          //left-to-right
          var startIdx = 0;
          var endIdx = typeIdx;
          this.insertIdx = endIdx;
          result = this.getSubString(text, startIdx, endIdx);
        } else if (typeMode === 1) {
          //right-to-left
          var endIdx = textLen;
          var startIdx = endIdx - typeIdx;
          this.insertIdx = 0;
          result = this.getSubString(text, startIdx, endIdx);
        } else if (typeMode === 2) {
          //middle-to-sides
          var midIdx = textLen / 2;
          var startIdx = Math.floor(midIdx - typeIdx / 2);
          var endIdx = startIdx + typeIdx;
          this.insertIdx = typeIdx % 2 ? typeIdx : 0;
          result = this.getSubString(text, startIdx, endIdx);
        } else if (typeMode === 3) {
          //sides-to-middle
          var lowerLen = Math.floor(typeIdx / 2);
          var lowerResult;
          if (lowerLen > 0) {
            var endIdx = textLen;
            var startIdx = endIdx - lowerLen;
            lowerResult = this.getSubString(text, startIdx, endIdx);
          } else {
            lowerResult = "";
          }
          var upperLen = typeIdx - lowerLen;
          var upperResult;
          if (upperLen > 0) {
            var startIdx = 0;
            var endIdx = startIdx + upperLen;
            this.insertIdx = endIdx;
            upperResult = this.getSubString(text, startIdx, endIdx);
          } else {
            upperResult = "";
            this.insertIdx = 0;
          }
          result = upperResult + lowerResult;
        }
        this.insertChar = result.charAt(this.insertIdx - 1);
        return result;
      }
    }, {
      key: "startTimer",
      value: function startTimer(timerStartAt) {
        if (this.timer) {
          this.freeTimer();
        }
        var startAt;
        if (timerStartAt === undefined) {
          startAt = 0;
        } else {
          this.speed;
          startAt = timerStartAt;
        }
        this.timer = this.scene.time.addEvent({
          delay: 0.0001,
          startAt: startAt,
          loop: true,
          callback: this.onTyping,
          callbackScope: this
        });
        // Note: Throw error message if delay is 0 with repeat/loop

        return this;
      }
    }, {
      key: "getTimer",
      value: function getTimer() {
        return this.timer;
      }
    }, {
      key: "freeTimer",
      value: function freeTimer() {
        if (this.timer) {
          this.timer.remove();
          this.timer = null;
        }
        return this;
      }
    }, {
      key: "setText",
      value: function setText(text) {
        if (this.setTextCallback) {
          if (this.setTextCallbackScope) {
            text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIdx);
          } else {
            text = this.setTextCallback(text, this.isLastChar, this.insertIdx);
          }
        }
        if (this.textWrapEnable) {
          SetNoWrapText(this.parent, text);
        } else {
          this.parent.setText(text);
        }
      }
    }, {
      key: "getTextLength",
      value: function getTextLength(text) {
        var gameObject = this.parent;
        var len;
        if (gameObject.getPlainText) {
          len = gameObject.getPlainText(text).length;
        } else {
          len = text.length;
        }
        return len;
      }
    }, {
      key: "getSubString",
      value: function getSubString(text, startIdx, endIdx) {
        var gameObject = this.parent;
        var result;
        if (gameObject.getSubString) {
          result = gameObject.getSubString(text, startIdx, endIdx);
        } else {
          result = text.slice(startIdx, endIdx);
        }
        return result;
      }
    }]);
    return TextTyping;
  }(ComponentBase);
  var TransferText = function TransferText(text) {
    if (Array.isArray(text)) {
      text = text.join('\n');
    } else if (typeof text === 'number') {
      text = text.toString();
    }
    return text;
  };
  var TYPEMODE = {
    'left-to-right': 0,
    'right-to-left': 1,
    'middle-to-sides': 2,
    'sides-to-middle': 3
  };

  var IsTyping = false;
  var TextBob = /*#__PURE__*/function (_BobBase) {
    _inherits(TextBob, _BobBase);
    function TextBob() {
      _classCallCheck(this, TextBob);
      return _callSuper(this, TextBob, arguments);
    }
    _createClass(TextBob, [{
      key: "setGO",
      value: function setGO(gameObject, name) {
        _get(_getPrototypeOf(TextBob.prototype), "setGO", this).call(this, gameObject, name);
        gameObject.setData('typing', !IsTyping);
        return this;
      }
    }, {
      key: "clearText",
      value: function clearText() {
        this.gameObject.setText('');
        return this;
      }
    }, {
      key: "appendText",
      value: function appendText(text) {
        this.gameObject.setText(this.gameObject.text + text);
        return this;
      }
    }, {
      key: "setTypingSpeed",
      value: function setTypingSpeed(speed) {
        var gameObject = this.gameObject;
        if (!gameObject.typing) {
          gameObject.typing = new TextTyping(gameObject);
        }
        gameObject.typing.setTypingSpeed(speed);
        return this;
      }
    }, {
      key: "clearTyping",
      value: function clearTyping() {
        var gameObject = this.gameObject;
        if (!gameObject.typing) {
          gameObject.typing = new TextTyping(gameObject);
        } else {
          gameObject.typing.start('');
        }
        return this;
      }
    }, {
      key: "typing",
      value: function typing(text, speed) {
        var gameObject = this.gameObject;
        if (!gameObject.typing) {
          gameObject.typing = new TextTyping(gameObject);
        }
        if (speed !== undefined) {
          gameObject.typing.setTypingSpeed(speed);
        }
        gameObject.setData('typing', IsTyping);
        gameObject.typing.once('complete', function () {
          gameObject.setData('typing', !IsTyping);
        }).appendText(text);
        return this;
      }
    }]);
    return TextBob;
  }(BobBase);

  var SetTextMethods = {
    clearText: function clearText(name) {
      if (!this.has(name)) {
        return this;
      }
      this.get(name).clearText();
      return this;
    },
    appendText: function appendText(name, text) {
      if (!this.has(name)) {
        return this;
      }
      this.get(name).appendText(text);
      return this;
    },
    clearTyping: function clearTyping(name) {
      if (!this.has(name)) {
        return this;
      }
      this.get(name).clearTyping();
      return this;
    },
    typing: function typing(name, text) {
      if (!this.has(name)) {
        return this;
      }
      this.get(name).typing(text);
      return this;
    },
    appendTyping: function appendTyping(name, text) {
      if (!this.has(name)) {
        return this;
      }
      this.get(name).appendTyping(text);
      return this;
    },
    setTypingSpeed: function setTypingSpeed(name, speed) {
      if (!this.has(name)) {
        return this;
      }
      this.get(name).setTypingSpeed(speed);
      return this;
    }
  };

  var Methods$1 = {};
  Object.assign(Methods$1, SetTextMethods);

  var TextManager = /*#__PURE__*/function (_GOManager) {
    _inherits(TextManager, _GOManager);
    function TextManager(scene, config) {
      _classCallCheck(this, TextManager);
      if (config === undefined) {
        config = {};
      }
      config.BobClass = TextBob;
      return _callSuper(this, TextManager, [scene, config]);
    }
    _createClass(TextManager, [{
      key: "setCreateGameObjectCallback",
      value: function setCreateGameObjectCallback(callback, scope) {
        if (!callback || callback === 'text') {
          callback = CreateTextObject;
        }
        _get(_getPrototypeOf(TextManager.prototype), "setCreateGameObjectCallback", this).call(this, callback, scope);
        return this;
      }
    }]);
    return TextManager;
  }(GOManager);
  var CreateTextObject = function CreateTextObject(scene) {
    return scene.add.text(0, 0, '');
  };
  Object.assign(TextManager.prototype, Methods$1);

  var OnParseSetTextTag = function OnParseSetTextTag(tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);

    // [goType.name.text] -> event : 'goType.text'    
    tagPlayer.on("".concat(goType, ".text"), function (name) {
      // Clear text
      gameObjectManager.clearText(name);
      // Append text
      tagPlayer.setContentCallback(function (content) {
        gameObjectManager.appendText(name, content);
      });
    });
  };

  var OnParseTypingTextTag = function OnParseTypingTextTag(tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);

    // [goType.name.typing] -> event : 'goType.typing'    
    tagPlayer.on("".concat(goType, ".typing"), function (name, speed) {
      // Clear text
      gameObjectManager.clearTyping(name);
      // Append text
      tagPlayer.setContentCallback(function (content) {
        if (speed !== undefined) {
          gameObjectManager.setTypingSpeed(name, speed);
        }
        gameObjectManager.typing(name, content);
      });
    });
  };

  var ParseCallbacks$1 = [OnParseSetTextTag, OnParseTypingTextTag];
  var AddTextManager = function AddTextManager(config) {
    if (config === undefined) {
      config = {};
    }
    config.name = 'text';
    config.parseCallbacks = ParseCallbacks$1;
    this.addGameObjectManager(config, TextManager);
  };

  var IsAddGameObjectTag = function IsAddGameObjectTag(tags, goType) {
    // goType.name
    return tags.length === 2 && tags[0] === goType;
  };
  var OnParseAddGameObjectTag = function OnParseAddGameObjectTag(tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
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
      gameObjectManager.add.apply(gameObjectManager, [name].concat(args));
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
      gameObjectManager.remove(name);
      parser.skipEvent();
    });
  };

  var OnParseRemoveAllGameObjectsTag = function OnParseRemoveAllGameObjectsTag(tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
    parser.on('-', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      // [/goType]
      if (tag === goType) ; else {
        return;
      }
      gameObjectManager.removeAll();
      parser.skipEvent();
    });
  };

  var IsPropTag = function IsPropTag(tags, goType) {
    // goType.name.prop
    return tags.length === 3 && tags[0] === goType;
  };
  var OnParseCallGameObjectMethodTag = function OnParseCallGameObjectMethodTag(tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
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
      var eventName = "".concat(goType, ".").concat(prop);
      for (var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        parameters[_key - 1] = arguments[_key];
      }
      tagPlayer.emit.apply(tagPlayer, [eventName, name].concat(parameters));
      if (tagPlayer.listenerCount(eventName) > 0) {
        parser.skipEvent();
        return;
      }
      if (gameObjectManager.hasMethod(name, prop)) {
        // Is method
        gameObjectManager.call.apply(gameObjectManager, [name, prop].concat(parameters));
      } else {
        // Is property
        gameObjectManager.setProperty(name, prop, parameters[0]);
      }
      parser.skipEvent();
    });
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
  var OnParseEaseGameObjectPropertyTag = function OnParseEaseGameObjectPropertyTag(tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
    parser.on("+", function (tag, value, duration, ease, repeat) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      // [goType.name.prop.to=value,duration]
      // [goType.name.prop.to=value,duration,ease,repeat]
      // [goType.name.prop.to=value,duration,repeat]
      var tags = tag.split('.');
      var name, property, currentValue, easeMode;
      if (IsEasePropertyTag(tags, goType)) {
        name = tags[1];
        property = tags[2];
        currentValue = gameObjectManager.getProperty(name, property);
        // Only can tween number property
        if (typeof currentValue !== 'number') {
          return;
        }
        easeMode = tags[3];
      } else {
        return;
      }
      if (typeof ease === 'number') {
        repeat = ease;
        ease = undefined;
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
      parser.skipEvent();
    });
  };

  var ParseCallbacks = [OnParseAddGameObjectTag, OnParseRemoveAllGameObjectsTag, OnParseCallGameObjectMethodTag, OnParseEaseGameObjectPropertyTag];
  var AddGameObjectManager = GameObjectManagerMethods$1.addGameObjectManager;
  var GameObjectManagerMethods = {
    addGameObjectManager: function addGameObjectManager(config, GameObjectManagerClass) {
      if (config === undefined) {
        config = {};
      }
      var name = config.name;
      if (!name) {
        console.warn("[TagPlayer] Parameter 'name' is required in addGameObjectManager(config) method");
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
    this.clickTarget = target;
    if (!target) {
      this.clickEE = null;
    } else if (IsSceneObject(target)) {
      this.clickEE = target.input;
    } else {
      // Assume that target is a gameObject
      this.clickEE = target.setInteractive();
    }
    return this;
  };

  var SetCameraTarget = function SetCameraTarget(camera) {
    this.waitEventManager.setCameraTarget(camera);
    return this;
  };

  var SetSkipSoundEffect = function SetSkipSoundEffect(value) {
    if (value === undefined) {
      value = true;
    }
    this.skipSoundEffect = value;
    if (value) {
      var soundManager = this._soundManager;
      if (soundManager) {
        soundManager.fadeOutAllSoundEffects(100, true);
      }
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

  var PlayMethods = {
    play: function play(content) {
      this.parser.start(content);
      return this;
    },
    playPromise: function playPromise(content) {
      var promise = WaitComplete(this);
      this.play(content);
      return promise;
    }
  };

  var PauseMethods = {
    pause: function pause() {
      this.parser.pause();
      return this;
    },
    pauseUntilEvent: function pauseUntilEvent(eventEmitter, eventName) {
      this.parser.pauseUntilEvent(eventEmitter, eventName);
      return this;
    }
  };

  var ResumeMethods = {
    resume: function resume() {
      this.parser.next();
      return this;
    }
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

  var IsWaitGameObject = function IsWaitGameObject(tagPlayer, name) {
    var names = name.split('.');
    return tagPlayer.gameObjectManagers.hasOwnProperty(names[0]);
  };
  var WaitGameObject = function WaitGameObject(tagPlayer, tag, callback, scope) {
    var waitEventManager = tagPlayer.waitEventManager;
    var tags = tag.split('.');
    var goType = tags[0];
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
    var waitEventName = "wait.".concat(goType);
    switch (tags.length) {
      case 1:
        // 'goType' : wait all sprites has beeen destroyed
        waitEventManager.waitGameObjectManagerEmpty(goType);
        tagPlayer.emit(waitEventName);
        return;
      case 2:
        // 'goType.name' : wait goType.name has been destroyed
        var name = tags[1];
        waitEventManager.waitGameObjectDestroy(goType, name);
        tagPlayer.emit(waitEventName, name);
        return;
      case 3:
        // 'goType.name.prop' : wait ease goType.name.prop has been completed
        var name = tags[1],
          prop = tags[2];
        var value = gameObjectManager.getProperty(name, prop);
        // Can start tween task for a number property
        if (typeof value === 'number') {
          waitEventManager.waitGameObjectTweenComplete(goType, name, prop);
          tagPlayer.emit(waitEventName, name, prop);
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
          tagPlayer.emit(waitEventName, name, dataKey);
          return;
        } else {
          waitEventManager.waitTime(0);
          return;
        }
    }
  };

  var KeyCodes = Phaser.Input.Keyboard.KeyCodes;
  var WaitAny = function WaitAny(tagPlayer, names, callback, scope) {
    var waitEventManager = tagPlayer.waitEventManager;
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
        var waitCompleteTriggerCallback = tagPlayer.waitEventManager.getWaitCompleteTriggerCallback();
        tagPlayer.emit('wait', waitCompleteTriggerCallback);
      } else if (typeof name === 'number' || !isNaN(name)) {
        // A number, or a number string
        var time = parseFloat(name);
        waitEventManager.waitTime(time);
        tagPlayer.emit('wait.time', time);
      } else if (name === 'click') {
        // 'click'
        waitEventManager.waitClick();
        tagPlayer.emit('wait.click');
      } else if (name === 'se') {
        waitEventManager.waitSoundEffectComplete();
        var music = tagPlayer.soundManager.getLastSoundEffect();
        tagPlayer.emit('wait.music', music);
      } else if (name === 'se2') {
        waitEventManager.waitSoundEffect2Complete();
        var music = tagPlayer.soundManager.getLastSoundEffect2();
        tagPlayer.emit('wait.music', music);
      } else if (name === 'bgm') {
        waitEventManager.waitBackgroundMusicComplete();
        var music = tagPlayer.soundManager.getBackgroundMusic();
        tagPlayer.emit('wait.music', music);
      } else if (name === 'bgm2') {
        waitEventManager.waitBackgroundMusic2Complete();
        var music = tagPlayer.soundManager.getBackgroundMusic2();
        tagPlayer.emit('wait.music', music);
      } else if (KeyCodes.hasOwnProperty(name.toUpperCase())) {
        waitEventManager.waitKeyDown(name);
        tagPlayer.emit('wait.keydown', name);
      } else if (IsWaitCameraEffect(name)) {
        waitEventManager.waitCameraEffectComplete(name);
        tagPlayer.emit('wait.camera', name);
      } else if (IsWaitGameObject(tagPlayer, name)) {
        WaitGameObject(tagPlayer, name);
      } else {
        var waitCompleteTriggerCallback = tagPlayer.waitEventManager.getWaitCompleteTriggerCallback();
        tagPlayer.emit("wait.".concat(name), waitCompleteTriggerCallback);
      }
    }
  };

  var Wait = function Wait(name) {
    // Already in typingPaused state, or ignore any wait
    if (this.ignoreWait) {
      return this;
    }
    this.pause();
    WaitAny(this, name, this.resume, this);
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

  var TextMethods = {
    getTextGameObject: function getTextGameObject(name) {
      return this.getGameObject('text', name);
    },
    addTextGameObject: function addTextGameObject(name, gameObject) {
      this.addGameObject('text', name, gameObject);
      return this;
    }
  };

  var ContentMethods = {
    setContentCallback: function setContentCallback(callback, scope) {
      this.contentCallback = callback;
      this.contentCallbackScope = scope;
      return this;
    }
  };

  var DataManager = Phaser.Data.DataManager;
  var DataManagerMethods = {
    // this.data
    destroyDataManager: function destroyDataManager() {
      if (this.data) {
        this.data.destroy();
        this.data = undefined;
      }
    },
    setDataEnabled: function setDataEnabled() {
      if (!this.data) {
        this.data = new DataManager(this);
      }
      return this;
    },
    setData: function setData(key, value) {
      if (!this.data) {
        this.data = new DataManager(this);
      }
      this.data.set(key, value);
      return this;
    },
    incData: function incData(key, value) {
      if (!this.data) {
        this.data = new DataManager(this);
      }
      this.data.inc(key, value);
      return this;
    },
    toggleData: function toggleData(key) {
      if (!this.data) {
        this.data = new DataManager(this);
      }
      this.data.toggle(key);
      return this;
    },
    getData: function getData(key) {
      if (!this.data) {
        this.data = new DataManager(this);
      }
      return this.data.get(key);
    }
  };

  var Methods = {
    setClickTarget: SetClickTarget,
    setCameraTarget: SetCameraTarget,
    setSkipSoundEffect: SetSkipSoundEffect,
    wait: Wait
  };
  Object.assign(Methods, PlayMethods, PauseMethods, ResumeMethods, GameObjectManagerMethods, SpriteMethods, TextMethods, ContentMethods, DataManagerMethods);

  var EventEmitter = Phaser.Events.EventEmitter;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var TagPlayer = /*#__PURE__*/function (_Extend) {
    _inherits(TagPlayer, _Extend);
    function TagPlayer(scene, config) {
      var _this;
      _classCallCheck(this, TagPlayer);
      if (config === undefined) {
        config = {};
      }
      _this = _callSuper(this, TagPlayer);
      _this.scene = scene;
      _this.initManagers(scene, config);
      _this.parser = new Parser(_assertThisInitialized(_this), GetValue(config, 'parser', undefined));
      var spriteManagerConfig = GetValue(config, 'sprites');
      if (spriteManagerConfig !== false && spriteManagerConfig !== null) {
        AddSpriteManager.call(_assertThisInitialized(_this), spriteManagerConfig);
      }
      var textManagerConfig = GetValue(config, 'texts');
      if (textManagerConfig !== false && textManagerConfig !== null) {
        AddTextManager.call(_assertThisInitialized(_this), textManagerConfig);
      }
      return _this;
    }
    _createClass(TagPlayer, [{
      key: "isPlaying",
      get: function get() {
        return this.parser.isRunning;
      }
    }, {
      key: "spriteManager",
      get: function get() {
        return this.getGameObjectManager('sprite');
      }
    }, {
      key: "textManager",
      get: function get() {
        return this.getGameObjectManager('text');
      }
    }, {
      key: "gameObjectManagerNames",
      get: function get() {
        var names = [];
        for (var name in this.gameObjectManagers) {
          names.push(name);
        }
        return names;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }
        _get(_getPrototypeOf(TagPlayer.prototype), "destroy", this).call(this);
        this.destroyManagers(fromScene);
        this.scene = undefined;
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
    return TagPlayer;
  }(Extend(EventEmitter));
  Object.assign(TagPlayer.prototype, Methods);

  var TagPlayerPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(TagPlayerPlugin, _Phaser$Plugins$BaseP);
    function TagPlayerPlugin(pluginManager) {
      _classCallCheck(this, TagPlayerPlugin);
      return _callSuper(this, TagPlayerPlugin, [pluginManager]);
    }
    _createClass(TagPlayerPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(scene, config) {
        return new TagPlayer(scene, config);
      }
    }]);
    return TagPlayerPlugin;
  }(Phaser.Plugins.BasePlugin);

  return TagPlayerPlugin;

}));
