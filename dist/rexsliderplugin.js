(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexsliderplugin = factory());
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

  var SceneClass = Phaser.Scene;
  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
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

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$1(config, 'eventEmitter', true));

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
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  var Linear$1 = Phaser.Math.Linear;
  var Percent$1 = Phaser.Math.Percent;
  var ProgressValueMethods = {
    setValue: function setValue(value, min, max) {
      if (value === undefined || value === null) {
        return this;
      }
      if (min !== undefined) {
        value = Percent$1(value, min, max);
      }
      this.value = value;
      return this;
    },
    addValue: function addValue(inc, min, max) {
      if (min !== undefined) {
        inc = Percent$1(inc, min, max);
      }
      this.value += inc;
      return this;
    },
    getValue: function getValue(min, max) {
      var value = this.value;
      if (min !== undefined) {
        value = Linear$1(min, max, value);
      }
      return value;
    }
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var BetweenPoints = Phaser.Math.Angle.BetweenPoints;
  var DistanceBetween = Phaser.Math.Distance.Between;
  var RotateAroundDistance = Phaser.Math.RotateAroundDistance;
  var Clamp = Phaser.Math.Clamp;
  var Linear = Phaser.Math.Linear;
  var Percent = Phaser.Math.Percent;
  var Slider = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Slider, _ComponentBase);
    function Slider(gameObject, config) {
      var _this;
      _classCallCheck(this, Slider);
      _this = _callSuper(this, Slider, [gameObject, config]);
      // this.parent = gameObject;

      _this._enable = undefined;
      _this._value = undefined;
      _this.endPoints = [{
        x: 0,
        y: 0
      }, {
        x: 0,
        y: 0
      }];
      var callback = GetValue(config, 'valuechangeCallback', null);
      if (callback !== null) {
        var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
        _this.on('valuechange', callback, scope);
      }
      _this.parent.setInteractive(GetValue(config, "inputConfig", undefined));
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(Slider, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setValue(GetValue(o, "value", 0));
        var endPoints = GetValue(o, "endPoints", undefined);
        if (endPoints !== undefined) {
          this.setEndPoints(endPoints);
        }
        this.setEnable(GetValue(o, "enable", true));
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          value: this.value,
          endPoints: this.endPoints,
          enable: this.enable
        };
      }
    }, {
      key: "boot",
      value: function boot() {
        this.parent.on('drag', this.onDragging, this);
      }

      // shutdown(fromScene) {
      //     // Already shutdown
      //     if (this.isShutdown) {
      //         return;
      //     }
      //     // GameObject events will be removed when this gameObject destroyed 
      //     // this.parent.off('drag', this.onDragging, this);
      //     super.shutdown(fromScene);
      // }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }
        this._enable = e;
        this.scene.input.setDraggable(this.parent, e);
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "setEndPoints",
      value: function setEndPoints(p0x, p0y, p1x, p1y) {
        var points = this.endPoints;
        if (typeof p0x === 'number') {
          points[0].x = p0x;
          points[0].y = p0y;
          points[1].x = p1x;
          points[1].y = p1y;
        } else if (Array.isArray(p0x)) {
          // single array with 2 points
          points[0] = p0x[0];
          points[1] = p0x[1];
        } else {
          points[0] = p0x;
          points[1] = p0y;
        }
        this.axisRotation = BetweenPoints(points[0], points[1]);
        this.updatePos();
        return this;
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        value = Clamp(value, 0, 1);
        if (value === this._value) {
          return;
        }
        var oldValue = this._value;
        this._value = value;
        this.updatePos(this._value);
        this.emit('valuechange', this._value, oldValue);
      }
    }, {
      key: "isDragging",
      get: function get() {
        return this.parent.input.dragState > 0;
      }
    }, {
      key: "onDragging",
      value: function onDragging(pointer, dragX, dragY) {
        var endPoints = this.endPoints;
        var newValue;
        if (endPoints[0].y === endPoints[1].y) {
          var min = Math.min(endPoints[0].x, endPoints[1].x);
          var max = Math.max(endPoints[0].x, endPoints[1].x);
          newValue = Percent(dragX, min, max);
        } else if (endPoints[0].x === endPoints[1].x) {
          var min = Math.min(endPoints[0].y, endPoints[1].y);
          var max = Math.max(endPoints[0].y, endPoints[1].y);
          newValue = Percent(dragY, min, max);
        } else {
          var gameObject = this.parent;
          var dist;
          var p1 = {
            x: dragX,
            y: dragY
          };
          dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
          p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, -this.axisRotation, dist);
          p1.y = gameObject.y;
          dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
          p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, this.axisRotation, dist);
          var min = Math.min(endPoints[0].x, endPoints[1].x);
          var max = Math.max(endPoints[0].x, endPoints[1].x);
          newValue = Percent(p1.x, min, max);
        }
        this.value = newValue;
      }
    }, {
      key: "updatePos",
      value: function updatePos() {
        var gameObject = this.parent;
        var points = this.endPoints;
        gameObject.x = Linear(points[0].x, points[1].x, this._value);
        gameObject.y = Linear(points[0].y, points[1].y, this._value);
        return this;
      }
    }]);
    return Slider;
  }(ComponentBase);
  Object.assign(Slider.prototype, ProgressValueMethods);

  var SliderPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(SliderPlugin, _Phaser$Plugins$BaseP);
    function SliderPlugin(pluginManager) {
      _classCallCheck(this, SliderPlugin);
      return _callSuper(this, SliderPlugin, [pluginManager]);
    }
    _createClass(SliderPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        return new Slider(gameObject, config);
      }
    }]);
    return SliderPlugin;
  }(Phaser.Plugins.BasePlugin);

  return SliderPlugin;

}));
