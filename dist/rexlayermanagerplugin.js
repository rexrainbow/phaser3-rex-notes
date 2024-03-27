(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlayermanagerplugin = factory());
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

  var EventEmitter = Phaser.Events.EventEmitter;
  var MonitorViewport = function MonitorViewport(viewport) {
    if (viewport.events) {
      return viewport;
    }
    var events = new EventEmitter();
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

  var RemoveItem = Phaser.Utils.Array.Remove;
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
        RemoveItem(this.removedGOs, gameObject);
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

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var DrawBounds = function DrawBounds(gameObjects, graphics, config) {
    var strokeColor, lineWidth, fillColor, fillAlpha, padding;
    if (typeof config === 'number') {
      strokeColor = config;
    } else {
      strokeColor = GetValue$2(config, 'color');
      lineWidth = GetValue$2(config, 'lineWidth');
      fillColor = GetValue$2(config, 'fillColor');
      fillAlpha = GetValue$2(config, 'fillAlpha', 1);
      padding = GetValue$2(config, 'padding', 0);
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

  var Methods = {
    drawGameObjectsBounds: DrawGameObjectsBounds
  };
  Object.assign(Methods, GetMethods, AddMethods, RemoveMethods, PropertyMethods, CallMethods, DataMethods, FadeMethods);

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

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var GOManager = /*#__PURE__*/function () {
    function GOManager(scene, config) {
      _classCallCheck(this, GOManager);
      this.scene = scene;
      this.BobClass = GetValue$1(config, 'BobClass', BobBase);
      this.setCreateGameObjectCallback(GetValue$1(config, 'createGameObject'), GetValue$1(config, 'createGameObjectScope'));
      this.setEventEmitter(GetValue$1(config, 'eventEmitter', undefined));
      this.setGameObjectDepth(GetValue$1(config, 'depth', undefined));
      var fadeConfig = GetValue$1(config, 'fade', 500);
      if (typeof fadeConfig === 'number') {
        this.setGOFadeMode();
        this.setGOFadeTime(fadeConfig);
      } else {
        this.setGOFadeMode(GetValue$1(fadeConfig, 'mode'));
        this.setGOFadeTime(GetValue$1(fadeConfig, 'time', 500));
      }
      var viewportCoordinateConfig = GetValue$1(config, 'viewportCoordinate', false);
      if (viewportCoordinateConfig !== false) {
        this.setViewportCoordinateEnable(GetValue$1(config, 'enable', true));
        this.setViewport(GetValue$1(viewportCoordinateConfig, 'viewport'));
      } else {
        this.setViewportCoordinateEnable(false);
      }
      var effectPropertiesConfig = GetValue$1(config, 'effectProperties', false);
      this.setEffectPropertiesConfig(effectPropertiesConfig);
      this.setSymbols(GetValue$1(config, 'symbols'));
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
  Object.assign(GOManager.prototype, EventEmitterMethods, Methods);

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

  var GetValue = Phaser.Utils.Objects.GetValue;
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
      var rootLayer = GetValue(config, 'rootLayer');
      _this.setRootLayer(rootLayer);
      var initLayers = GetValue(config, 'layers');
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

  var LayerManagerPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(LayerManagerPlugin, _Phaser$Plugins$BaseP);
    function LayerManagerPlugin(pluginManager) {
      _classCallCheck(this, LayerManagerPlugin);
      return _callSuper(this, LayerManagerPlugin, [pluginManager]);
    }
    _createClass(LayerManagerPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(scene, config) {
        return new LayerManager(scene, config);
      }
    }]);
    return LayerManagerPlugin;
  }(Phaser.Plugins.BasePlugin);

  return LayerManagerPlugin;

}));
