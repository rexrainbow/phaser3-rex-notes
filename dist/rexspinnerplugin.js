(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexspinnerplugin = factory());
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

  var ObjectFactory = /*#__PURE__*/function () {
    function ObjectFactory(scene) {
      _classCallCheck(this, ObjectFactory);
      this.scene = scene;
      this.displayList = scene.sys.displayList;
      this.updateList = scene.sys.updateList;
      scene.events.once('destroy', this.destroy, this);
    }
    _createClass(ObjectFactory, [{
      key: "destroy",
      value: function destroy() {
        this.scene = null;
        this.displayList = null;
        this.updateList = null;
      }
    }], [{
      key: "register",
      value: function register(type, callback) {
        ObjectFactory.prototype[type] = callback;
      }
    }]);
    return ObjectFactory;
  }();

  var GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;
  var WebGLRenderer = function WebGLRenderer(renderer, src, camera, parentMatrix) {
    src.updateData();
    camera.addToRenderList(src);
    var pipeline = renderer.pipelines.set(src.pipeline);
    var result = GetCalcMatrix(src, camera, parentMatrix);
    var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);
    var dx = src._displayOriginX;
    var dy = src._displayOriginY;
    var alpha = camera.alpha * src.alpha;
    renderer.pipelines.preBatch(src);
    var shapes = src.geom,
      shape;
    for (var i = 0, cnt = shapes.length; i < cnt; i++) {
      shape = shapes[i];
      if (shape.visible) {
        shape.webglRender(pipeline, calcMatrix, alpha, dx, dy);
      }
    }
    renderer.pipelines.postBatch(src);
  };

  var SetTransform = Phaser.Renderer.Canvas.SetTransform;
  var CanvasRenderer = function CanvasRenderer(renderer, src, camera, parentMatrix) {
    src.updateData();
    camera.addToRenderList(src);
    var ctx = renderer.currentContext;
    if (SetTransform(renderer, ctx, src, camera, parentMatrix)) {
      var dx = src._displayOriginX;
      var dy = src._displayOriginY;
      var shapes = src.geom,
        shape;
      for (var i = 0, cnt = shapes.length; i < cnt; i++) {
        shape = shapes[i];
        if (shape.visible) {
          shape.canvasRender(ctx, dx, dy);
        }
      }

      //  Restore the context saved in SetTransform
      ctx.restore();
    }
  };

  var Render = {
    renderWebGL: WebGLRenderer,
    renderCanvas: CanvasRenderer
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

  var Shape = Phaser.GameObjects.Shape;
  var RemoveItem = Phaser.Utils.Array.Remove;
  var BaseShapes = /*#__PURE__*/function (_Shape) {
    _inherits(BaseShapes, _Shape);
    function BaseShapes(scene, x, y, width, height) {
      var _this;
      _classCallCheck(this, BaseShapes);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (width === undefined) {
        width = 2;
      }
      if (height === undefined) {
        height = width;
      }
      _this = _callSuper(this, BaseShapes, [scene, 'rexShapes', []]);
      _this._width = -1;
      _this._height = -1;
      _this.dirty = true;
      _this.isSizeChanged = true;
      _this.shapes = {};
      _this.setPosition(x, y);
      _this.setSize(width, height);
      _this.updateDisplayOrigin();
      return _this;
    }
    _createClass(BaseShapes, [{
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
      key: "setDirty",
      value: function setDirty(value) {
        if (value === undefined) {
          value = true;
        }
        this.dirty = value;
        return this;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.isSizeChanged = this.isSizeChanged || this._width !== width || this._height !== height;
        this.dirty = this.dirty || this.isSizeChanged;
        this._width = width;
        this._height = height;
        this.updateDisplayOrigin();
        var input = this.input;
        if (input && !input.customHitArea) {
          input.hitArea.width = width;
          input.hitArea.height = height;
        }
        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        this.setSize(width, height);
        return this;
      }
    }, {
      key: "fillColor",
      get: function get() {
        return this._fillColor;
      },
      set: function set(value) {
        this.setFillStyle(value, this._fillAlpha);
      }
    }, {
      key: "fillAlpha",
      get: function get() {
        return this._fillAlpha;
      },
      set: function set(value) {
        this.setFillStyle(this._fillColor, value);
      }
    }, {
      key: "setFillStyle",
      value: function setFillStyle(color, alpha) {
        if (alpha === undefined) {
          alpha = 1;
        }
        this.dirty = this.dirty || this.fillColor !== color || this.fillAlpha !== alpha;
        this._fillColor = color;
        this._fillAlpha = alpha;
        return this;
      }
    }, {
      key: "lineWidth",
      get: function get() {
        return this._lineWidth;
      },
      set: function set(value) {
        this.setStrokeStyle(value, this._strokeColor, this._strokeAlpha);
      }
    }, {
      key: "strokeColor",
      get: function get() {
        return this._strokeColor;
      },
      set: function set(value) {
        this.setStrokeStyle(this._lineWidth, value, this._strokeAlpha);
      }
    }, {
      key: "strokeAlpha",
      get: function get() {
        return this._strokeAlpha;
      },
      set: function set(value) {
        this.setStrokeStyle(this._lineWidth, this._strokeColor, value);
      }
    }, {
      key: "setStrokeStyle",
      value: function setStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
          alpha = 1;
        }
        this.dirty = this.dirty || this.lineWidth !== lineWidth || this.strokeColor !== color || this.strokeAlpha !== alpha;
        this._lineWidth = lineWidth;
        this._strokeColor = color;
        this._strokeAlpha = alpha;
        return this;
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {}
    }, {
      key: "updateData",
      value: function updateData() {
        if (!this.dirty) {
          return this;
        }
        this.updateShapes();
        var shapes = this.geom;
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
          var shape = shapes[i];
          if (shape.dirty) {
            shape.updateData();
          }
        }
        this.isSizeChanged = false;
        this.dirty = false;
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.geom.length = 0;
        Clear(this.shapes);
        return this;
      }
    }, {
      key: "getShape",
      value: function getShape(name) {
        return this.shapes[name];
      }
    }, {
      key: "getShapes",
      value: function getShapes() {
        return this.geom;
      }
    }, {
      key: "addShape",
      value: function addShape(shape) {
        this.geom.push(shape);
        var name = shape.name;
        if (name) {
          this.shapes[name] = shape;
        }
        this.dirty = true;
        return this;
      }
    }, {
      key: "deleteShape",
      value: function deleteShape(name) {
        var shape = this.getShape(name);
        if (shape) {
          delete this.shapes[name];
          RemoveItem(this.geom, shape);
        }
        return this;
      }
    }]);
    return BaseShapes;
  }(Shape);
  Object.assign(BaseShapes.prototype, Render);

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

  var GetValue$a = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$a(config, 'eventEmitter', true));

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

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);
    function TickTask(parent, config) {
      var _this;
      _classCallCheck(this, TickTask);
      _this = _callSuper(this, TickTask, [parent, config]);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;
      _this.setTickingMode(GetValue$9(config, 'tickingMode', 1));
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

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
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
      _this.tickEventName = GetValue$8(config, 'tickEventName', defaultEventName);
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

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;
  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);
      this.resetFromJSON(config);
    }
    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$7(o, 'state', IDLE);
        this.timeScale = GetValue$7(o, 'timeScale', 1);
        this.delay = GetValue$7(o, 'delay', 0);
        this.repeat = GetValue$7(o, 'repeat', 0);
        this.repeatCounter = GetValue$7(o, 'repeatCounter', 0);
        this.repeatDelay = GetValue$7(o, 'repeatDelay', 0);
        this.duration = GetValue$7(o, 'duration', 0);
        this.nowTime = GetValue$7(o, 'nowTime', 0);
        this.justRestart = GetValue$7(o, 'justRestart', false);
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
        return Clamp(t, 0, 1);
      },
      set: function set(value) {
        value = Clamp(value, -1, 1);
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
      _this.timer = new Timer();
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

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
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
        this.timer.resetFromJSON(GetValue$6(o, 'timer'));
        this.setEnable(GetValue$6(o, 'enable', true));
        this.setTarget(GetValue$6(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        this.setEase(GetValue$6(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$6(o, 'repeat', 0));
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

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var Linear$b = Phaser.Math.Linear;
  var EaseValueTask = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(EaseValueTask, _EaseValueTaskBase);
    function EaseValueTask(gameObject, config) {
      var _this;
      _classCallCheck(this, EaseValueTask);
      _this = _callSuper(this, EaseValueTask, [gameObject, config]);
      // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON();
      _this.boot();
      return _this;
    }
    _createClass(EaseValueTask, [{
      key: "start",
      value: function start(config) {
        if (this.timer.isRunning) {
          return this;
        }
        var target = this.target;
        this.propertyKey = GetValue$5(config, 'key', 'value');
        var currentValue = target[this.propertyKey];
        this.fromValue = GetValue$5(config, 'from', currentValue);
        this.toValue = GetValue$5(config, 'to', currentValue);
        this.setEase(GetValue$5(config, 'ease', this.ease));
        this.setDuration(GetValue$5(config, 'duration', this.duration));
        this.setRepeat(GetValue$5(config, 'repeat', 0));
        this.setDelay(GetValue$5(config, 'delay', 0));
        this.setRepeatDelay(GetValue$5(config, 'repeatDelay', 0));
        this.timer.setDuration(this.duration).setRepeat(this.repeat).setDelay(this.delay).setRepeatDelay(this.repeatDelay);
        target[this.propertyKey] = this.fromValue;
        _get(_getPrototypeOf(EaseValueTask.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(target, timer) {
        var t = timer.t;
        t = this.easeFn(t);
        target[this.propertyKey] = Linear$b(this.fromValue, this.toValue, t);
      }
    }]);
    return EaseValueTask;
  }(EaseValueTaskBase);

  var Start = function Start(duration) {
    if (!this.easeValueTask) {
      this.easeValueTask = new EaseValueTask(this, {
        eventEmitter: null
      });
    }
    if (duration !== undefined) {
      this.duration = duration;
      this.easeValueTask.stop(); // Will restart with new duration
    }

    // Won't restart if easeValueTask is running
    if (this.easeValueTask.isRunning) {
      return this;
    }

    // Start easeValueTask
    this.easeValueTask.restart({
      key: 'value',
      from: 0,
      to: 1,
      duration: this.duration,
      ease: this.ease,
      repeat: -1,
      // -1: infinity

      delay: this.delay,
      repeatDelay: this.repeatDelay
    });
    this.setDirty();
    return this;
  };
  var Stop = function Stop() {
    if (!this.easeValueTask) {
      return this;
    }
    this.easeValueTask.stop();
    this.setDirty();
    return this;
  };
  var Pause = function Pause() {
    if (!this.easeValueTask) {
      return this;
    }
    this.easeValueTask.pause();
    this.setDirty();
    return this;
  };
  var Resume = function Resume() {
    if (!this.easeValueTask) {
      return this;
    }
    this.easeValueTask.pause();
    this.setDirty();
    return this;
  };
  var EaseValueMethods = {
    start: Start,
    stop: Stop,
    pause: Pause,
    resume: Resume
  };

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var Base = /*#__PURE__*/function (_BaseShapes) {
    _inherits(Base, _BaseShapes);
    function Base(scene, config) {
      var _this;
      _classCallCheck(this, Base);
      var x = GetValue$4(config, 'x', 0);
      var y = GetValue$4(config, 'y', 0);
      var width = GetValue$4(config, 'width', 64);
      var height = GetValue$4(config, 'height', 64);
      _this = _callSuper(this, Base, [scene, x, y, width, height]);
      _this.setDuration(GetValue$4(config, 'duration', 1000));
      _this.setEase(GetValue$4(config, 'ease', 'Linear'));
      _this.setDelay(GetValue$4(config, 'delay', 0));
      _this.setRepeatDelay(GetValue$4(config, 'repeatDelay', 0));
      var color = GetValue$4(config, 'color', 0xffffff);
      var start = GetValue$4(config, 'start', true);
      _this.buildShapes(config);
      _this.setColor(color);
      _this.setValue(0);
      if (start) {
        _this.start();
      }
      return _this;
    }
    _createClass(Base, [{
      key: "buildShapes",
      value: function buildShapes() {}
    }, {
      key: "centerX",
      get: function get() {
        return this.width / 2;
      }
    }, {
      key: "centerY",
      get: function get() {
        return this.height / 2;
      }
    }, {
      key: "radius",
      get: function get() {
        return Math.min(this.centerX, this.centerY);
      }
    }, {
      key: "color",
      get: function get() {
        return this._color;
      },
      set: function set(value) {
        this.isColorChanged = this.isColorChanged || this._color !== value;
        this.dirty = this.dirty || this.isColorChanged;
        this._color = value;
        this.setShapesColor(value);
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        this.color = color;
        return this;
      }
    }, {
      key: "setShapesColor",
      value: function setShapesColor(color) {}
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        value = Phaser.Math.Clamp(value, 0, 1);
        this.dirty = this.dirty || this._value != value;
        this._value = value;
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration) {
        this.duration = duration;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(delay) {
        this.delay = delay;
        return this;
      }
    }, {
      key: "setRepeatDelay",
      value: function setRepeatDelay(repeatDelay) {
        this.repeatDelay = repeatDelay;
        return this;
      }
    }, {
      key: "setEase",
      value: function setEase(ease) {
        this.ease = ease;
        return this;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this.tweenTask ? this.tweenTask.isRunning : false;
      }
    }]);
    return Base;
  }(BaseShapes);
  Object.assign(Base.prototype, EaseValueMethods);

  var FillStyle = function FillStyle(color, alpha) {
    if (color == null) {
      this.isFilled = false;
    } else {
      if (alpha === undefined) {
        alpha = 1;
      }
      this.isFilled = true;
      this.fillColor = color;
      this.fillAlpha = alpha;
    }
    return this;
  };
  var LineStyle = function LineStyle(lineWidth, color, alpha) {
    if (lineWidth == null || color == null) {
      this.isStroked = false;
    } else {
      if (alpha === undefined) {
        alpha = 1;
      }
      this.isStroked = true;
      this.lineWidth = lineWidth;
      this.strokeColor = color;
      this.strokeAlpha = alpha;
    }
    return this;
  };
  var StyleMethods = {
    fillStyle: FillStyle,
    lineStyle: LineStyle
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
  var GetValue$3 = function GetValue(source, key, defaultValue) {
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
      return key === undefined ? this.data : GetValue$3(this.data, key, defaultValue);
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

  var BaseGeom = /*#__PURE__*/function () {
    function BaseGeom() {
      _classCallCheck(this, BaseGeom);
      this.name = undefined;
      this.dirty = true;
      this.visible = true;
      this.data = undefined;
      this.isFilled = false;
      this.fillColor = undefined;
      this.fillAlpha = 1;
      this.isStroked = false;
      this.lineWidth = 1;
      this.strokeColor = undefined;
      this.strokeAlpha = 1;
    }
    _createClass(BaseGeom, [{
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
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
      key: "reset",
      value: function reset() {
        this.setVisible().fillStyle().lineStyle();
        return this;
      }
    }, {
      key: "webglRender",
      value: function webglRender(pipeline, calcMatrix, alpha, dx, dy) {}
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {}
    }, {
      key: "updateData",
      value: function updateData() {
        this.dirty = false;
      }
    }]);
    return BaseGeom;
  }();
  Object.assign(BaseGeom.prototype, StyleMethods, DataMethods);

  /*
  src: {
      fillColor, 
      fillAlpha, 
      pathData, 
      pathIndexes  // Earcut(pathData)
  }
  */

  var Utils$1 = Phaser.Renderer.WebGL.Utils;
  var FillPathWebGL = function FillPathWebGL(pipeline, calcMatrix, src, alpha, dx, dy) {
    var fillTintColor = Utils$1.getTintAppendFloatAlpha(src.fillColor, src.fillAlpha * alpha);
    var path = src.pathData;
    var pathIndexes = src.pathIndexes;
    for (var i = 0; i < pathIndexes.length; i += 3) {
      var p0 = pathIndexes[i] * 2;
      var p1 = pathIndexes[i + 1] * 2;
      var p2 = pathIndexes[i + 2] * 2;
      var x0 = path[p0 + 0] - dx;
      var y0 = path[p0 + 1] - dy;
      var x1 = path[p1 + 0] - dx;
      var y1 = path[p1 + 1] - dy;
      var x2 = path[p2 + 0] - dx;
      var y2 = path[p2 + 1] - dy;
      var tx0 = calcMatrix.getX(x0, y0);
      var ty0 = calcMatrix.getY(x0, y0);
      var tx1 = calcMatrix.getX(x1, y1);
      var ty1 = calcMatrix.getY(x1, y1);
      var tx2 = calcMatrix.getX(x2, y2);
      var ty2 = calcMatrix.getY(x2, y2);
      pipeline.batchTri(src, tx0, ty0, tx1, ty1, tx2, ty2, 0, 0, 1, 1, fillTintColor, fillTintColor, fillTintColor, 2);
    }
  };

  /*
  src: {
      strokeColor,
      strokeAlpha,
      pathData,
      lineWidth,
      closePath
  }
  */
  var Utils = Phaser.Renderer.WebGL.Utils;
  var StrokePathWebGL = function StrokePathWebGL(pipeline, src, alpha, dx, dy) {
    var strokeTint = pipeline.strokeTint;
    var strokeTintColor = Utils.getTintAppendFloatAlpha(src.strokeColor, src.strokeAlpha * alpha);
    strokeTint.TL = strokeTintColor;
    strokeTint.TR = strokeTintColor;
    strokeTint.BL = strokeTintColor;
    strokeTint.BR = strokeTintColor;
    var path = src.pathData;
    var pathLength = path.length - 1;
    var lineWidth = src.lineWidth;
    var halfLineWidth = lineWidth / 2;
    var px1 = path[0] - dx;
    var py1 = path[1] - dy;
    if (!src.closePath) {
      pathLength -= 2;
    }
    for (var i = 2; i < pathLength; i += 2) {
      var px2 = path[i] - dx;
      var py2 = path[i + 1] - dy;
      pipeline.batchLine(px1, py1, px2, py2, halfLineWidth, halfLineWidth, lineWidth, i - 2, src.closePath ? i === pathLength - 1 : false);
      px1 = px2;
      py1 = py2;
    }
  };

  var FillStyleCanvas = function FillStyleCanvas(ctx, src, altColor, altAlpha) {
    var fillColor = altColor ? altColor : src.fillColor;
    var fillAlpha = altAlpha ? altAlpha : src.fillAlpha;
    var red = (fillColor & 0xFF0000) >>> 16;
    var green = (fillColor & 0xFF00) >>> 8;
    var blue = fillColor & 0xFF;
    ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + fillAlpha + ')';
  };

  var LineStyleCanvas = function LineStyleCanvas(ctx, src, altColor, altAlpha) {
    var strokeColor = altColor ? altColor : src.strokeColor;
    var strokeAlpha = altAlpha ? altAlpha : src.strokeAlpha;
    var red = (strokeColor & 0xFF0000) >>> 16;
    var green = (strokeColor & 0xFF00) >>> 8;
    var blue = strokeColor & 0xFF;
    ctx.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + strokeAlpha + ')';
    ctx.lineWidth = src.lineWidth;
  };

  var Earcut = Phaser.Geom.Polygon.Earcut;
  var PathBase = /*#__PURE__*/function (_BaseGeom) {
    _inherits(PathBase, _BaseGeom);
    function PathBase() {
      var _this;
      _classCallCheck(this, PathBase);
      _this = _callSuper(this, PathBase);
      _this.pathData = [];
      _this.pathIndexes = [];
      _this.closePath = false;
      return _this;
    }
    _createClass(PathBase, [{
      key: "updateData",
      value: function updateData() {
        this.pathIndexes = Earcut(this.pathData);
        _get(_getPrototypeOf(PathBase.prototype), "updateData", this).call(this);
        return this;
      }
    }, {
      key: "webglRender",
      value: function webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
          FillPathWebGL(pipeline, calcMatrix, this, alpha, dx, dy);
        }
        if (this.isStroked) {
          StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
      }
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {
        var path = this.pathData;
        var pathLength = path.length - 1;
        var px1 = path[0] - dx;
        var py1 = path[1] - dy;
        ctx.beginPath();
        ctx.moveTo(px1, py1);
        if (!this.closePath) {
          pathLength -= 2;
        }
        for (var i = 2; i < pathLength; i += 2) {
          var px2 = path[i] - dx;
          var py2 = path[i + 1] - dy;
          ctx.lineTo(px2, py2);
        }
        if (this.closePath) {
          ctx.closePath();
        }
        if (this.isFilled) {
          FillStyleCanvas(ctx, this);
          ctx.fill();
        }
        if (this.isStroked) {
          LineStyleCanvas(ctx, this);
          ctx.stroke();
        }
      }
    }]);
    return PathBase;
  }(BaseGeom);

  var LineTo = function LineTo(x, y, pathData) {
    var cnt = pathData.length;
    if (cnt >= 2) {
      var lastX = pathData[cnt - 2];
      var lastY = pathData[cnt - 1];
      if (x === lastX && y === lastY) {
        return pathData;
      }
    }
    pathData.push(x, y);
    return pathData;
  };

  var DegToRad$3 = Phaser.Math.DegToRad;
  var ArcTo = function ArcTo(centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && endAngle > startAngle) {
      endAngle -= 360;
    } else if (!antiClockWise && endAngle < startAngle) {
      endAngle += 360;
    }
    var deltaAngle = endAngle - startAngle;
    var step = DegToRad$3(deltaAngle) / iteration;
    startAngle = DegToRad$3(startAngle);
    for (var i = 0; i <= iteration; i++) {
      var angle = startAngle + step * i;
      var x = centerX + radiusX * Math.cos(angle);
      var y = centerY + radiusY * Math.sin(angle);
      LineTo(x, y, pathData);
    }
    return pathData;
  };

  var DegToRad$2 = Phaser.Math.DegToRad;
  var Arc = /*#__PURE__*/function (_PathBase) {
    _inherits(Arc, _PathBase);
    function Arc(x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise, pie) {
      var _this;
      _classCallCheck(this, Arc);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (radiusX === undefined) {
        radiusX = 0;
      }
      if (radiusY === undefined) {
        radiusY = 0;
      }
      if (startAngle === undefined) {
        startAngle = 0;
      }
      if (endAngle === undefined) {
        endAngle = 360;
      }
      if (anticlockwise === undefined) {
        anticlockwise = false;
      }
      if (pie === undefined) {
        pie = false;
      }
      _this = _callSuper(this, Arc);
      _this.setCenterPosition(x, y);
      _this.setRadius(radiusX, radiusY);
      _this.setAngle(startAngle, endAngle, anticlockwise);
      _this.setPie(pie);
      _this.setIterations(32);
      return _this;
    }
    _createClass(Arc, [{
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x !== value;
        this._x = value;
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y !== value;
        this._y = value;
      }
    }, {
      key: "setCenterPosition",
      value: function setCenterPosition(x, y) {
        if (y === undefined) {
          y = x;
        }
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "radiusX",
      get: function get() {
        return this._radiusX;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._radiusX !== value;
        this._radiusX = value;
      }
    }, {
      key: "radiusY",
      get: function get() {
        return this._radiusY;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._radiusY !== value;
        this._radiusY = value;
      }
    }, {
      key: "setRadius",
      value: function setRadius(radiusX, radiusY) {
        if (radiusY === undefined) {
          radiusY = radiusX;
        }
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        return this;
      }
    }, {
      key: "startAngle",
      get: function get() {
        return this._startAngle;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._startAngle !== value;
        this._startAngle = value;
      }
    }, {
      key: "endAngle",
      get: function get() {
        return this._endAngle;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._endAngle !== value;
        this._endAngle = value;
      }
    }, {
      key: "anticlockwise",
      get: function get() {
        return this._anticlockwise;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._anticlockwise !== value;
        this._anticlockwise = value;
      }
    }, {
      key: "setAngle",
      value: function setAngle(startAngle, endAngle, anticlockwise) {
        // startAngle, endAngle in degrees
        if (anticlockwise === undefined) {
          anticlockwise = false;
        }
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
        return this;
      }
    }, {
      key: "pie",
      get: function get() {
        return this._pie;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._pie !== value;
        this._pie = value;
      }
    }, {
      key: "setPie",
      value: function setPie(pie) {
        if (pie === undefined) {
          pie = true;
        }
        this.pie = pie;
        return this;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._iterations !== value;
        this._iterations = value;
      }
    }, {
      key: "setIterations",
      value: function setIterations(iterations) {
        this.iterations = iterations;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        this.pathData.length = 0;
        if (this.pie) {
          this.pathData.push(this.x, this.y);
        }
        ArcTo(this.x, this.y, this.radiusX, this.radiusY, this.startAngle, this.endAngle, this.anticlockwise, this.iterations, this.pathData);
        if (this.pie) {
          this.pathData.push(this.x, this.y);
        }
        // Close
        this.pathData.push(this.pathData[0], this.pathData[1]);
        _get(_getPrototypeOf(Arc.prototype), "updateData", this).call(this);
        return this;
      }
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {
        ctx.beginPath();
        var x = this.x - dx,
          y = this.y - dy,
          startAngle = DegToRad$2(this.startAngle),
          endAngle = DegToRad$2(this.endAngle);
        if (this.pie) {
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(startAngle) * this.radiusX, y + Math.sin(startAngle) * this.radiusY);
        }
        ctx.ellipse(x, y, this.radiusX, this.radiusY, 0, startAngle, endAngle, this.anticlockwise);
        if (this.pie) {
          ctx.lineTo(x, y);
        }
        if (this.isFilled) {
          FillStyleCanvas(ctx, this);
          ctx.fill();
        }
        if (this.isStroked) {
          LineStyleCanvas(ctx, this);
          ctx.stroke();
        }
      }
    }]);
    return Arc;
  }(PathBase);

  var Circle = /*#__PURE__*/function (_Arc) {
    _inherits(Circle, _Arc);
    function Circle(x, y, radius) {
      _classCallCheck(this, Circle);
      return _callSuper(this, Circle, [x, y, radius, radius, 0, 360]);
    }
    return _createClass(Circle);
  }(Arc);

  var Curve = /*#__PURE__*/function (_PathBase) {
    _inherits(Curve, _PathBase);
    function Curve(curve) {
      var _this;
      _classCallCheck(this, Curve);
      _this = _callSuper(this, Curve);
      _this.setCurve(curve);
      _this.setIterations(32);
      return _this;
    }
    _createClass(Curve, [{
      key: "curve",
      get: function get() {
        return this._curve;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._curve !== value;
        this._curve = value;
      }
    }, {
      key: "setCurve",
      value: function setCurve(curve) {
        this.curve = curve;
        return this;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._iterations !== value;
        this._iterations = value;
      }
    }, {
      key: "setIterations",
      value: function setIterations(iterations) {
        this.iterations = iterations;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        this.pathData.length = 0;
        var points = this.curve.getPoints(this.iterations);
        for (var i = 0, cnt = points.length; i < cnt; i++) {
          this.pathData.push(points[i].x, points[i].y);
        }
        this.pathData.push(points[0].x, points[0].y);
        _get(_getPrototypeOf(Curve.prototype), "updateData", this).call(this);
        return this;
      }
    }]);
    return Curve;
  }(PathBase);

  var Ellipse = /*#__PURE__*/function (_Arc) {
    _inherits(Ellipse, _Arc);
    function Ellipse(x, y, radiusX, radiusY) {
      _classCallCheck(this, Ellipse);
      return _callSuper(this, Ellipse, [x, y, radiusX, radiusY, 0, 360]);
    }
    return _createClass(Ellipse);
  }(Arc);

  var Line = /*#__PURE__*/function (_PathBase) {
    _inherits(Line, _PathBase);
    function Line(x0, y0, x1, y1) {
      var _this;
      _classCallCheck(this, Line);
      if (x0 === undefined) {
        x0 = 0;
      }
      if (y0 === undefined) {
        y0 = 0;
      }
      if (x1 === undefined) {
        x1 = 0;
      }
      if (y1 === undefined) {
        y1 = 0;
      }
      _this = _callSuper(this, Line);
      _this.setP0(x0, y0);
      _this.setP1(x1, y1);
      return _this;
    }
    _createClass(Line, [{
      key: "x0",
      get: function get() {
        return this._x0;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x0 !== value;
        this._x0 = value;
      }
    }, {
      key: "y0",
      get: function get() {
        return this._y0;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y0 !== value;
        this._y0 = value;
      }
    }, {
      key: "setP0",
      value: function setP0(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
      }
    }, {
      key: "x1",
      get: function get() {
        return this._x1;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x1 !== value;
        this._x1 = value;
      }
    }, {
      key: "y1",
      get: function get() {
        return this._y1;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y1 !== value;
        this._y1 = value;
      }
    }, {
      key: "setP1",
      value: function setP1(x, y) {
        this.x1 = x;
        this.y1 = y;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        this.pathData.length = 0;
        this.pathData.push(this.x0, this.y0);
        this.pathData.push(this.x1, this.y1);
        this.pathData.push(this.x0, this.y0);
        _get(_getPrototypeOf(Line.prototype), "updateData", this).call(this);
        return this;
      }
    }]);
    return Line;
  }(PathBase);

  var StartAt = function StartAt(x, y, pathData) {
    pathData.length = 0;
    if (x != null) {
      pathData.push(x, y);
    }
    return pathData;
  };

  //import QuadraticBezierInterpolation from '../../utils/math/interpolation/QuadraticBezierInterpolation.js';

  var QuadraticBezierInterpolation = Phaser.Math.Interpolation.QuadraticBezier;
  var QuadraticBezierTo = function QuadraticBezierTo(cx, cy, x, y, iterations, pathData) {
    var pathDataCnt = pathData.length;
    var p0x = pathData[pathDataCnt - 2];
    var p0y = pathData[pathDataCnt - 1];
    for (var i = 1, last = iterations - 1; i <= last; i++) {
      var t = i / last;
      pathData.push(QuadraticBezierInterpolation(t, p0x, cx, x), QuadraticBezierInterpolation(t, p0y, cy, y));
    }
    return pathData;
  };

  // import CubicBezierInterpolation from '../../utils/math/interpolation/CubicBezierInterpolation.js';

  var CubicBezierInterpolation = Phaser.Math.Interpolation.CubicBezier;
  var CubicBezierCurveTo = function CubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y, iterations, pathData) {
    var pathDataCnt = pathData.length;
    var p0x = pathData[pathDataCnt - 2];
    var p0y = pathData[pathDataCnt - 1];
    for (var i = 1, last = iterations - 1; i <= last; i++) {
      var t = i / last;
      pathData.push(CubicBezierInterpolation(t, p0x, cx0, cx1, x), CubicBezierInterpolation(t, p0y, cy0, cy1, y));
    }
    return pathData;
  };

  var DuplicateLast = function DuplicateLast(pathData) {
    var len = pathData.length;
    if (len < 2) {
      return pathData;
    }
    var lastX = pathData[len - 2];
    var lastY = pathData[len - 1];
    pathData.push(lastX);
    pathData.push(lastY);
    return pathData;
  };

  var AddPathMethods = {
    clear: function clear() {
      this.start();
      return this;
    },
    start: function start() {
      this.startAt();
      return this;
    },
    startAt: function startAt(x, y) {
      this.restorePathData();
      this.accumulationLengths = undefined;
      StartAt(x, y, this.pathData);
      this.firstPointX = x;
      this.firstPointY = y;
      this.lastPointX = x;
      this.lastPointY = y;
      return this;
    },
    lineTo: function lineTo(x, y, relative) {
      if (relative === undefined) {
        relative = false;
      }
      if (relative) {
        x += this.lastPointX;
        y += this.lastPointY;
      }
      LineTo(x, y, this.pathData);
      this.lastPointX = x;
      this.lastPointY = y;
      return this;
    },
    verticalLineTo: function verticalLineTo(x, relative) {
      this.lineTo(x, this.lastPointY, relative);
      return this;
    },
    horizontalLineTo: function horizontalLineTo(y, relative) {
      this.lineTo(this.lastPointX, y, relative);
      return this;
    },
    ellipticalArc: function ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
      if (anticlockwise === undefined) {
        anticlockwise = false;
      }
      ArcTo(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise, this.iterations, this.pathData);
      this.lastPointX = this.pathData[this.pathData.length - 2];
      this.lastPointY = this.pathData[this.pathData.length - 1];
      return this;
    },
    arc: function arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
      this.ellipticalArc(centerX, centerY, radius, radius, startAngle, endAngle, anticlockwise);
      return this;
    },
    quadraticBezierTo: function quadraticBezierTo(cx, cy, x, y) {
      QuadraticBezierTo(cx, cy, x, y, this.iterations, this.pathData);
      this.lastPointX = x;
      this.lastPointY = y;
      this.lastCX = cx;
      this.lastCY = cy;
      return this;
    },
    smoothQuadraticBezierTo: function smoothQuadraticBezierTo(x, y) {
      var cx = this.lastPointX * 2 - this.lastCX;
      var cy = this.lastPointY * 2 - this.lastCY;
      this.quadraticBezierTo(cx, cy, x, y);
      return this;
    },
    cubicBezierCurveTo: function cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y) {
      CubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y, this.iterations, this.pathData);
      this.lastPointX = x;
      this.lastPointY = y;
      this.lastCX = cx1;
      this.lastCY = cy1;
      return this;
    },
    smoothCubicBezierCurveTo: function smoothCubicBezierCurveTo(cx1, cy1, x, y) {
      var cx0 = this.lastPointX * 2 - this.lastCX;
      var cy0 = this.lastPointY * 2 - this.lastCY;
      this.cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y);
      return this;
    },
    close: function close() {
      // Line to first point        
      var startX = this.pathData[0],
        startY = this.pathData[1];
      if (startX !== this.lastPointX || startY !== this.lastPointY) {
        this.lineTo(startX, startY);
      }
      this.closePath = true;
      return this;
    },
    end: function end() {
      DuplicateLast(this.pathData);
      return this;
    }
  };

  //import PointRotateAround from '../../utils/math/RotateAround.js';

  var PointRotateAround$1 = Phaser.Math.RotateAround;
  var RotateAround = function RotateAround(centerX, centerY, angle, pathData) {
    var point = {
      x: 0,
      y: 0
    };
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
      point.x = pathData[i];
      point.y = pathData[i + 1];
      PointRotateAround$1(point, centerX, centerY, angle);
      pathData[i] = point.x;
      pathData[i + 1] = point.y;
    }
    return pathData;
  };

  var Scale = function Scale(centerX, centerY, scaleX, scaleY, pathData) {
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
      var x = pathData[i] - centerX;
      var y = pathData[i + 1] - centerY;
      x *= scaleX;
      y *= scaleY;
      pathData[i] = x + centerX;
      pathData[i + 1] = y + centerY;
    }
    return pathData;
  };

  var Offset = function Offset(x, y, pathData) {
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
      pathData[i] += x;
      pathData[i + 1] += y;
    }
    return pathData;
  };

  var DegToRad$1 = Phaser.Math.DegToRad;
  var PointRotateAround = Phaser.Math.RotateAround;
  var TransformPointsMethods = {
    rotateAround: function rotateAround(centerX, centerY, angle) {
      if (this.pathData.length === 0) {
        return this;
      }
      angle = DegToRad$1(angle);
      RotateAround(centerX, centerY, angle, this.pathData);
      var pathDataCnt = this.pathData.length;
      this.lastPointX = this.pathData[pathDataCnt - 2];
      this.lastPointY = this.pathData[pathDataCnt - 1];
      if (this.lastCX !== undefined) {
        var point = {
          x: this.lastCX,
          y: this.lastCY
        };
        PointRotateAround(point, centerX, centerY, angle);
        this.lastCX = point.x;
        this.lastCY = point.y;
      }
      return this;
    },
    scale: function scale(centerX, centerY, scaleX, scaleY) {
      if (this.pathData.length === 0) {
        return this;
      }
      Scale(centerX, centerY, scaleX, scaleY, this.pathData);
      this.lastPointX = this.pathData[pathDataCnt - 2];
      this.lastPointY = this.pathData[pathDataCnt - 1];
      if (this.lastCX !== undefined) {
        var x = this.lastCX - centerX;
        var y = this.lastCY - centerY;
        x *= scaleX;
        y *= scaleY;
        this.lastCX = x + centerX;
        this.lastCY = y + centerY;
      }
      return this;
    },
    offset: function offset(x, y) {
      Offset(x, y, this.pathData);
      return this;
    }
  };

  var Copy = function Copy(dest, src, startIdx, endIdx) {
    if (startIdx === undefined) {
      startIdx = 0;
    }
    if (endIdx === undefined) {
      endIdx = src.length;
    }
    dest.length = endIdx - startIdx;
    for (var i = 0, len = dest.length; i < len; i++) {
      dest[i] = src[i + startIdx];
    }
    return dest;
  };

  var SavePathDataMethods = {
    savePathData: function savePathData() {
      if (this.pathDataSaved) {
        return this;
      }
      this.pathDataSave = _toConsumableArray(this.pathData);
      this.pathData.length = 0;
      this.pathDataSaved = true;
      return this;
    },
    restorePathData: function restorePathData() {
      if (!this.pathDataSaved) {
        return this;
      }
      Copy(this.pathData, this.pathDataSave);
      this.pathDataSave = undefined;
      this.pathDataSaved = false;
      return this;
    }
  };

  var DistanceBetween = Phaser.Math.Distance.Between;
  var Wrap = Phaser.Math.Wrap;
  var Linear$a = Phaser.Math.Linear;
  var AppendFromPathSegment = function AppendFromPathSegment(srcPathData, accumulationLengths, startT, endT, destPathData) {
    if (endT === undefined) {
      endT = startT;
      startT = 0;
    }
    startT = WrapT(startT);
    endT = WrapT(endT);
    if (startT === endT) {
      return;
    }
    var totalPathLength = accumulationLengths[accumulationLengths.length - 1];
    var startL = totalPathLength * startT;
    var endL = totalPathLength * endT;
    if (startT < endT) {
      AddPathSegment(srcPathData, accumulationLengths, startL, endL, destPathData);
    } else {
      AddPathSegment(srcPathData, accumulationLengths, startL, totalPathLength, destPathData);
      AddPathSegment(srcPathData, accumulationLengths, 0, endL, destPathData);
    }
    DuplicateLast(destPathData);
  };
  var AddPathSegment = function AddPathSegment(srcPathData, accumulationLengths, startL, endL, destPathData) {
    var skipState = startL > 0;
    for (var i = 0, cnt = accumulationLengths.length; i < cnt; i++) {
      var pIdx = i * 2;
      var d = accumulationLengths[i];
      if (skipState) {
        if (d < startL) {
          continue;
        } else if (d == startL) {
          skipState = false;
        } else {
          // d > startL
          var deltaD = d - accumulationLengths[i - 1];
          var t = 1 - (d - startL) / deltaD;
          destPathData.push(GetInterpolation(srcPathData, pIdx - 2, pIdx, t));
          destPathData.push(GetInterpolation(srcPathData, pIdx - 1, pIdx + 1, t));
          skipState = false;
        }
      }
      if (d <= endL) {
        destPathData.push(srcPathData[pIdx]);
        destPathData.push(srcPathData[pIdx + 1]);
        if (d === endL) {
          break;
        }
      } else {
        // d > endL
        var deltaD = d - accumulationLengths[i - 1];
        var t = 1 - (d - endL) / deltaD;
        destPathData.push(GetInterpolation(srcPathData, pIdx - 2, pIdx, t));
        destPathData.push(GetInterpolation(srcPathData, pIdx - 1, pIdx + 1, t));
        break;
      }
    }
  };
  var GetInterpolation = function GetInterpolation(pathData, i0, i1, t) {
    var p0 = pathData[i0],
      p1 = pathData[i1];
    return Linear$a(p0, p1, t);
  };
  var WrapT = function WrapT(t) {
    if (t === 0) {
      return 0;
    } else if (t % 1 === 0) {
      return 1;
    }
    return Wrap(t, 0, 1);
  };
  var PathSegmentMethods = {
    updateAccumulationLengths: function updateAccumulationLengths() {
      if (this.accumulationLengths == null) {
        this.accumulationLengths = [];
      } else if (this.accumulationLengths.length === this.pathData.length / 2) {
        return this;
      }
      var accumulationLengths = this.accumulationLengths;
      var pathData = this.pathData;
      var prevX, prevY, x, y;
      var d,
        accumulationLength = 0;
      for (var i = 0, cnt = pathData.length; i < cnt; i += 2) {
        x = pathData[i];
        y = pathData[i + 1];
        d = prevX === undefined ? 0 : DistanceBetween(prevX, prevY, x, y);
        accumulationLength += d;
        accumulationLengths.push(accumulationLength);
        prevX = x;
        prevY = y;
      }
      this.totalPathLength = accumulationLength;
      return this;
    },
    setDisplayPathSegment: function setDisplayPathSegment(startT, endT) {
      if (!this.pathDataSaved) {
        this.updateAccumulationLengths();
        this.savePathData();
      }
      this.pathData.length = 0;
      AppendFromPathSegment(this.pathDataSave, this.accumulationLengths, startT, endT, this.pathData);
      return this;
    },
    appendFromPathSegment: function appendFromPathSegment(src, startT, endT) {
      if (startT === undefined) {
        var _this$pathData;
        (_this$pathData = this.pathData).push.apply(_this$pathData, _toConsumableArray(src.pathData));
      } else {
        src.updateAccumulationLengths();
        AppendFromPathSegment(src.pathData, src.accumulationLengths, startT, endT, this.pathData);
      }
      this.firstPointX = this.pathData[0];
      this.firstPointY = this.pathData[1];
      this.lastPointX = this.pathData[this.pathData.length - 2];
      this.lastPointY = this.pathData[this.pathData.length - 1];
      return this;
    }
  };

  var GraphicsMethods = {
    draw: function draw(graphics, isFill, isStroke) {
      var points = this.toPoints();
      if (isFill) {
        graphics.fillPoints(points, this.closePath, this.closePath);
      }
      if (isStroke) {
        graphics.strokePoints(points, this.closePath, this.closePath);
      }
      return this;
    }
  };

  var ToPoints = function ToPoints(pathData, points) {
    if (points === undefined) {
      points = [];
    }
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
      points.push({
        x: pathData[i],
        y: pathData[i + 1]
      });
    }
    return points;
  };

  //import Polygon from '../../utils/geom/polygon/Polygon.js';

  var Polygon = Phaser.Geom.Polygon;
  var ToPolygon = function ToPolygon(pathData, polygon) {
    if (polygon === undefined) {
      polygon = new Polygon();
    }
    polygon.setTo(pathData);
    return polygon;
  };

  var PathDataBuilder = /*#__PURE__*/function () {
    function PathDataBuilder(pathData) {
      _classCallCheck(this, PathDataBuilder);
      if (pathData === undefined) {
        pathData = [];
      }
      this.pathData = pathData;
      this.closePath = false;
      this.setIterations(32);
      this.firstPointX = undefined;
      this.firstPointY = undefined;
      this.lastPointX = undefined;
      this.lastPointY = undefined;
      this.accumulationLengths = undefined;
    }
    _createClass(PathDataBuilder, [{
      key: "setIterations",
      value: function setIterations(iterations) {
        this.iterations = iterations;
        return this;
      }
    }, {
      key: "toPoints",
      value: function toPoints() {
        return ToPoints(this.pathData);
      }
    }, {
      key: "toPolygon",
      value: function toPolygon(polygon) {
        return ToPolygon(this.pathData, polygon);
      }
    }]);
    return PathDataBuilder;
  }();
  Object.assign(PathDataBuilder.prototype, AddPathMethods, TransformPointsMethods, SavePathDataMethods, PathSegmentMethods, GraphicsMethods);

  var Lines = /*#__PURE__*/function (_PathBase) {
    _inherits(Lines, _PathBase);
    function Lines() {
      var _this;
      _classCallCheck(this, Lines);
      _this = _callSuper(this, Lines);
      _this.builder = new PathDataBuilder(_this.pathData);
      return _this;
    }
    _createClass(Lines, [{
      key: "iterations",
      get: function get() {
        return this.builder.iterations;
      },
      set: function set(value) {
        this.dirty = this.dirty || this.builder.iterations !== value;
        this.builder.setIterations(value);
      }
    }, {
      key: "setIterations",
      value: function setIterations(iterations) {
        this.iterations = iterations;
        return this;
      }
    }, {
      key: "lastPointX",
      get: function get() {
        return this.builder.lastPointX;
      }
    }, {
      key: "lastPointY",
      get: function get() {
        return this.builder.lastPointY;
      }
    }, {
      key: "start",
      value: function start() {
        this.builder.start();
        this.dirty = true;
        return this;
      }
    }, {
      key: "startAt",
      value: function startAt(x, y) {
        this.builder.startAt(x, y);
        this.dirty = true;
        return this;
      }
    }, {
      key: "lineTo",
      value: function lineTo(x, y, relative) {
        this.builder.lineTo(x, y, relative);
        this.dirty = true;
        return this;
      }
    }, {
      key: "verticalLineTo",
      value: function verticalLineTo(x, relative) {
        this.builder.verticalLineTo(x, relative);
        this.dirty = true;
        return this;
      }
    }, {
      key: "horizontalLineTo",
      value: function horizontalLineTo(y, relative) {
        this.builder.horizontalLineTo(y, relative);
        this.dirty = true;
        return this;
      }
    }, {
      key: "ellipticalArc",
      value: function ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
        this.builder.ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise);
        this.dirty = true;
        return this;
      }
    }, {
      key: "arc",
      value: function arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
        this.builder.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        this.dirty = true;
        return this;
      }
    }, {
      key: "quadraticBezierTo",
      value: function quadraticBezierTo(cx, cy, x, y) {
        this.builder.quadraticBezierTo(cx, cy, x, y);
        this.dirty = true;
        return this;
      }
    }, {
      key: "smoothQuadraticBezierTo",
      value: function smoothQuadraticBezierTo(x, y) {
        this.builder.smoothQuadraticBezierTo(x, y);
        this.dirty = true;
        return this;
      }
    }, {
      key: "cubicBezierCurveTo",
      value: function cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y) {
        this.builder.cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y);
        this.dirty = true;
        return this;
      }
    }, {
      key: "smoothCubicBezierCurveTo",
      value: function smoothCubicBezierCurveTo(cx1, cy1, x, y) {
        this.builder.smoothCubicBezierCurveTo(cx1, cy1, x, y);
        this.dirty = true;
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        this.builder.close();
        this.closePath = this.builder.closePath;
        this.dirty = true;
        return this;
      }
    }, {
      key: "end",
      value: function end() {
        this.builder.end();
        this.dirty = true;
        return this;
      }
    }, {
      key: "rotateAround",
      value: function rotateAround(centerX, centerY, angle) {
        this.builder.rotateAround(centerX, centerY, angle);
        this.dirty = true;
        return this;
      }
    }, {
      key: "scale",
      value: function scale(centerX, centerY, scaleX, scaleY) {
        this.builder.scale(centerX, centerY, scaleX, scaleY);
        this.dirty = true;
        return this;
      }
    }, {
      key: "offset",
      value: function offset(x, y) {
        this.builder.offset(x, y);
        this.dirty = true;
        return this;
      }
    }, {
      key: "toPolygon",
      value: function toPolygon(polygon) {
        return this.builder.toPolygon(polygon);
      }
    }, {
      key: "appendPathFrom",
      value: function appendPathFrom(src, startT, endT) {
        this.builder.appendFromPathSegment(src.builder, startT, endT);
        return this;
      }
    }, {
      key: "copyPathFrom",
      value: function copyPathFrom(src, startT, endT) {
        this.builder.clear().appendFromPathSegment(src.builder, startT, endT);
        return this;
      }
    }, {
      key: "setDisplayPathSegment",
      value: function setDisplayPathSegment(startT, endT) {
        this.builder.setDisplayPathSegment(startT, endT);
        return this;
      }
    }]);
    return Lines;
  }(PathBase);

  var GetTint$1 = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;
  var Rectangle = /*#__PURE__*/function (_BaseGeom) {
    _inherits(Rectangle, _BaseGeom);
    function Rectangle(x, y, width, height) {
      var _this;
      _classCallCheck(this, Rectangle);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (width === undefined) {
        width = 0;
      }
      if (height === undefined) {
        height = width;
      }
      _this = _callSuper(this, Rectangle);
      _this.pathData = [];
      _this.closePath = true;
      _this.setTopLeftPosition(x, y);
      _this.setSize(width, height);
      return _this;
    }
    _createClass(Rectangle, [{
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x !== value;
        this._x = value;
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y !== value;
        this._y = value;
      }
    }, {
      key: "setTopLeftPosition",
      value: function setTopLeftPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._width !== value;
        this._width = value;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._height !== value;
        this._height = value;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "centerX",
      get: function get() {
        return this.x + this.width / 2;
      },
      set: function set(value) {
        this.x = value - this.width / 2;
      }
    }, {
      key: "centerY",
      get: function get() {
        return this.y + this.height / 2;
      },
      set: function set(value) {
        this.y = value - this.height / 2;
      }
    }, {
      key: "setCenterPosition",
      value: function setCenterPosition(x, y) {
        this.centerX = x;
        this.centerY = y;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        this.pathData.length = 0;
        var x0 = this.x,
          x1 = x0 + this.width,
          y0 = this.y,
          y1 = y0 + this.height;
        this.pathData.push(x0, y0);
        this.pathData.push(x1, y0);
        this.pathData.push(x1, y1);
        this.pathData.push(x0, y1);
        this.pathData.push(x0, y0);
        _get(_getPrototypeOf(Rectangle.prototype), "updateData", this).call(this);
        return this;
      }
    }, {
      key: "webglRender",
      value: function webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
          var fillTint = pipeline.fillTint;
          var fillTintColor = GetTint$1(this.fillColor, this.fillAlpha * alpha);
          fillTint.TL = fillTintColor;
          fillTint.TR = fillTintColor;
          fillTint.BL = fillTintColor;
          fillTint.BR = fillTintColor;
          pipeline.batchFillRect(-dx + this.x, -dy + this.y, this.width, this.height);
        }
        if (this.isStroked) {
          StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
      }
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {
        if (this.isFilled) {
          FillStyleCanvas(ctx, this);
          ctx.fillRect(-dx, -dy, this.width, this.height);
        }
        if (this.isStroked) {
          LineStyleCanvas(ctx, this);
          ctx.beginPath();
          ctx.rect(-dx, -dy, this.width, this.height);
          ctx.stroke();
        }
      }
    }]);
    return Rectangle;
  }(BaseGeom);

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var RoundRectangle = /*#__PURE__*/function (_PathBase) {
    _inherits(RoundRectangle, _PathBase);
    function RoundRectangle(x, y, width, height, radius, iterations) {
      var _this;
      _classCallCheck(this, RoundRectangle);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (width === undefined) {
        width = 0;
      }
      if (height === undefined) {
        height = width;
      }
      if (radius === undefined) {
        radius = 0;
      }
      if (iterations === undefined) {
        iterations = 6;
      }
      _this = _callSuper(this, RoundRectangle);
      _this.setTopLeftPosition(x, y);
      _this.setSize(width, height);
      _this.setRadius(radius);
      _this.setIterations(iterations);
      _this.closePath = true;
      return _this;
    }
    _createClass(RoundRectangle, [{
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x !== value;
        this._x = value;
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y !== value;
        this._y = value;
      }
    }, {
      key: "setTopLeftPosition",
      value: function setTopLeftPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._width !== value;
        this._width = value;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._height !== value;
        this._height = value;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "centerX",
      get: function get() {
        return this.x + this.width / 2;
      },
      set: function set(value) {
        this.x = value - this.width / 2;
      }
    }, {
      key: "centerY",
      get: function get() {
        return this.y + this.height / 2;
      },
      set: function set(value) {
        this.y = value - this.height / 2;
      }
    }, {
      key: "setCenterPosition",
      value: function setCenterPosition(x, y) {
        this.centerX = x;
        this.centerY = y;
        return this;
      }
    }, {
      key: "radiusTL",
      get: function get() {
        return this._radiusTL;
      },
      set: function set(value) {
        var isConvex = value > 0;
        this.dirty = this.dirty || this._radiusTL !== value || this._convexTL !== isConvex;
        this._convexTL = isConvex;
        this._radiusTL = Math.abs(value);
      }
    }, {
      key: "radiusTR",
      get: function get() {
        return this._radiusTR;
      },
      set: function set(value) {
        var isConvex = value > 0;
        this.dirty = this.dirty || this._radiusTR !== value || this._convexTR !== isConvex;
        this._convexTR = isConvex;
        this._radiusTR = Math.abs(value);
      }
    }, {
      key: "radiusBL",
      get: function get() {
        return this._radiusBL;
      },
      set: function set(value) {
        var isConvex = value > 0;
        this.dirty = this.dirty || this._radiusBL !== value || this._convexBL !== isConvex;
        this._convexBL = isConvex;
        this._radiusBL = Math.abs(value);
      }
    }, {
      key: "radiusBR",
      get: function get() {
        return this._radiusBR;
      },
      set: function set(value) {
        var isConvex = value > 0;
        this.dirty = this.dirty || this._radiusBR !== value || this._convexBR !== isConvex;
        this._convexBR = isConvex;
        this._radiusBR = Math.abs(value);
      }
    }, {
      key: "radius",
      get: function get() {
        return Math.max(this.radiusTL, this.radiusTR, this.radiusBL, this.radiusBR);
      },
      set: function set(value) {
        if (typeof value === 'number') {
          this.radiusTL = value;
          this.radiusTR = value;
          this.radiusBL = value;
          this.radiusBR = value;
        } else {
          this.radiusTL = GetValue$2(value, 'tl', 0);
          this.radiusTR = GetValue$2(value, 'tr', 0);
          this.radiusBL = GetValue$2(value, 'bl', 0);
          this.radiusBR = GetValue$2(value, 'br', 0);
        }
      }
    }, {
      key: "setRadius",
      value: function setRadius(radius) {
        if (radius === undefined) {
          radius = 0;
        }
        this.radius = radius;
        return this;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._iterations !== value;
        this._iterations = value;
      }
    }, {
      key: "setIterations",
      value: function setIterations(iterations) {
        this.iterations = iterations;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        var pathData = this.pathData;
        pathData.length = 0;
        var width = this.width,
          height = this.height,
          radius,
          iterations = this.iterations + 1;

        // top-left
        radius = this.radiusTL;
        if (radius > 0) {
          if (this._convexTL) {
            var centerX = radius;
            var centerY = radius;
            ArcTo(centerX, centerY, radius, radius, 180, 270, false, iterations, pathData);
          } else {
            var centerX = 0;
            var centerY = 0;
            ArcTo(centerX, centerY, radius, radius, 90, 0, true, iterations, pathData);
          }
        } else {
          LineTo(0, 0, pathData);
        }

        // top-right
        radius = this.radiusTR;
        if (radius > 0) {
          if (this._convexTR) {
            var centerX = width - radius;
            var centerY = radius;
            ArcTo(centerX, centerY, radius, radius, 270, 360, false, iterations, pathData);
          } else {
            var centerX = width;
            var centerY = 0;
            ArcTo(centerX, centerY, radius, radius, 180, 90, true, iterations, pathData);
          }
        } else {
          LineTo(width, 0, pathData);
        }

        // bottom-right
        radius = this.radiusBR;
        if (radius > 0) {
          if (this._convexBR) {
            var centerX = width - radius;
            var centerY = height - radius;
            ArcTo(centerX, centerY, radius, radius, 0, 90, false, iterations, pathData);
          } else {
            var centerX = width;
            var centerY = height;
            ArcTo(centerX, centerY, radius, radius, 270, 180, true, iterations, pathData);
          }
        } else {
          LineTo(width, height, pathData);
        }

        // bottom-left
        radius = this.radiusBL;
        if (radius > 0) {
          if (this._convexBL) {
            var centerX = radius;
            var centerY = height - radius;
            ArcTo(centerX, centerY, radius, radius, 90, 180, false, iterations, pathData);
          } else {
            var centerX = 0;
            var centerY = height;
            ArcTo(centerX, centerY, radius, radius, 360, 270, true, iterations, pathData);
          }
        } else {
          LineTo(0, height, pathData);
        }
        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        Offset(this.x, this.y, pathData);
        _get(_getPrototypeOf(RoundRectangle.prototype), "updateData", this).call(this);
        return this;
      }
    }]);
    return RoundRectangle;
  }(PathBase);

  var GetTint = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;
  var Triangle = /*#__PURE__*/function (_BaseGeom) {
    _inherits(Triangle, _BaseGeom);
    function Triangle(x0, y0, x1, y1, x2, y2) {
      var _this;
      _classCallCheck(this, Triangle);
      if (x0 === undefined) {
        x0 = 0;
      }
      if (y0 === undefined) {
        y0 = 0;
      }
      if (x1 === undefined) {
        x1 = 0;
      }
      if (y1 === undefined) {
        y1 = 0;
      }
      if (x2 === undefined) {
        x2 = 0;
      }
      if (y2 === undefined) {
        y2 = 0;
      }
      _this = _callSuper(this, Triangle);
      _this.pathData = [];
      _this.closePath = true;
      _this.setP0(x0, y0);
      _this.setP1(x1, y1);
      _this.setP2(x2, y2);
      return _this;
    }
    _createClass(Triangle, [{
      key: "x0",
      get: function get() {
        return this._x0;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x0 !== value;
        this._x0 = value;
      }
    }, {
      key: "y0",
      get: function get() {
        return this._y0;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y0 !== value;
        this._y0 = value;
      }
    }, {
      key: "setP0",
      value: function setP0(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
      }
    }, {
      key: "x1",
      get: function get() {
        return this._x1;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x1 !== value;
        this._x1 = value;
      }
    }, {
      key: "y1",
      get: function get() {
        return this._y1;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y1 !== value;
        this._y1 = value;
      }
    }, {
      key: "setP1",
      value: function setP1(x, y) {
        this.x1 = x;
        this.y1 = y;
        return this;
      }
    }, {
      key: "x2",
      get: function get() {
        return this._x2;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x2 !== value;
        this._x2 = value;
      }
    }, {
      key: "y2",
      get: function get() {
        return this._y2;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y2 !== value;
        this._y2 = value;
      }
    }, {
      key: "setP2",
      value: function setP2(x, y) {
        this.dirty = this.dirty || this.x2 !== x || this.y2 !== y;
        this.x2 = x;
        this.y2 = y;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        this.pathData.length = 0;
        this.pathData.push(this.x0, this.y0);
        this.pathData.push(this.x1, this.y1);
        this.pathData.push(this.x2, this.y2);
        this.pathData.push(this.x0, this.y0);
        _get(_getPrototypeOf(Triangle.prototype), "updateData", this).call(this);
        return this;
      }
    }, {
      key: "webglRender",
      value: function webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
          var fillTintColor = GetTint(this.fillColor, this.fillAlpha * alpha);
          var x0 = this.x0 - dx;
          var y0 = this.y0 - dy;
          var x1 = this.x1 - dx;
          var y1 = this.y1 - dy;
          var x2 = this.x2 - dx;
          var y2 = this.y2 - dy;
          var tx0 = calcMatrix.getX(x0, y0);
          var ty0 = calcMatrix.getY(x0, y0);
          var tx1 = calcMatrix.getX(x1, y1);
          var ty1 = calcMatrix.getY(x1, y1);
          var tx2 = calcMatrix.getX(x2, y2);
          var ty2 = calcMatrix.getY(x2, y2);
          pipeline.batchTri(tx0, ty0, tx1, ty1, tx2, ty2, fillTintColor, fillTintColor, fillTintColor);
        }
        if (this.isStroked) {
          StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
      }
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {
        var x1 = this.x1 - dx;
        var y1 = this.y1 - dy;
        var x2 = this.x2 - dx;
        var y2 = this.y2 - dy;
        var x3 = this.x3 - dx;
        var y3 = this.y3 - dy;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        if (this.isFilled) {
          FillStyleCanvas(ctx, this);
          ctx.fill();
        }
        if (this.isStroked) {
          LineStyleCanvas(ctx, this);
          ctx.stroke();
        }
      }
    }]);
    return Triangle;
  }(BaseGeom);

  var Linear$9 = Phaser.Math.Linear;
  var Audio = /*#__PURE__*/function (_Base) {
    _inherits(Audio, _Base);
    function Audio(scene, config) {
      var _this;
      _classCallCheck(this, Audio);
      _this = _callSuper(this, Audio, [scene, config]);
      _this.type = 'rexSpinnerAudio';
      return _this;
    }
    _createClass(Audio, [{
      key: "buildShapes",
      value: function buildShapes() {
        for (var i = 0; i < 4; i++) {
          this.addShape(new Line());
        }
        this.prevValue = undefined;
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var leftBound = centerX - radius;
        var bottomBound = centerY + radius;
        var maxLineHeight = radius * 2;
        var shapes = this.getShapes(),
          cnt = shapes.length;
        var cellWidth = radius * 2 / cnt;
        var lineWidth = cellWidth * 0.7;

        // Reset range of value
        if (this.prevValue === undefined || this.prevValue > this.value) {
          for (var i = 0; i < cnt; i++) {
            var line = shapes[i];
            var from = this.prevValue === undefined ? Math.random() : line.getData('to');
            line.setData('from', from).setData('to', Math.random());
          }
        }
        this.prevValue = this.value;
        for (var i = 0; i < cnt; i++) {
          var line = shapes[i];
          var from = line.getData('from'),
            to = line.getData('to'),
            current = Linear$9(from, to, this.value);
          var lineHeight = current * maxLineHeight;
          var x = leftBound + cellWidth * (i + 0.5);
          line.lineStyle(lineWidth, this.color, 1).setP0(x, bottomBound).setP1(x, bottomBound - lineHeight);
        }
      }
    }]);
    return Audio;
  }(Base);

  var IsInValidKey = function IsInValidKey(keys) {
    return keys == null || keys === '' || keys.length === 0;
  };
  var GetEntry = function GetEntry(target, keys, defaultEntry) {
    var entry = target;
    if (IsInValidKey(keys)) ; else {
      if (typeof keys === 'string') {
        keys = keys.split('.');
      }
      var key;
      for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];
        if (entry[key] == null || _typeof(entry[key]) !== 'object') {
          var newEntry;
          if (i === cnt - 1) {
            if (defaultEntry === undefined) {
              newEntry = {};
            } else {
              newEntry = defaultEntry;
            }
          } else {
            newEntry = {};
          }
          entry[key] = newEntry;
        }
        entry = entry[key];
      }
    }
    return entry;
  };
  var SetValue = function SetValue(target, keys, value, delimiter) {
    if (delimiter === undefined) {
      delimiter = '.';
    }

    // no object
    if (_typeof(target) !== 'object') {
      return;
    }

    // invalid key
    else if (IsInValidKey(keys)) {
      // don't erase target
      if (value == null) {
        return;
      }
      // set target to another object
      else if (_typeof(value) === 'object') {
        target = value;
      }
    } else {
      if (typeof keys === 'string') {
        keys = keys.split(delimiter);
      }
      var lastKey = keys.pop();
      var entry = GetEntry(target, keys);
      entry[lastKey] = value;
    }
    return target;
  };

  ObjectFactory.register('audio', function (config) {
    var gameObject = new Audio(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Audio', Audio);

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

  var Linear$8 = Phaser.Math.Linear;
  var Ball = /*#__PURE__*/function (_Base) {
    _inherits(Ball, _Base);
    function Ball(scene, config) {
      var _this;
      _classCallCheck(this, Ball);
      _this = _callSuper(this, Ball, [scene, config]);
      _this.type = 'rexSpinnerBall';
      return _this;
    }
    _createClass(Ball, [{
      key: "buildShapes",
      value: function buildShapes() {
        for (var i = 0; i < 3; i++) {
          this.addShape(new Circle());
        }
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var ballRadius = radius * 0.1;
        var lineWidth = Math.ceil(ballRadius * 0.25);
        var t = 1 - Yoyo(this.value);
        var trackRadius = Linear$8(0.3, 0.9, t) * radius;
        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
          var ball = shapes[i];
          var t = (this.value + i / cnt) % 1;
          var angle = Math.PI * 2 * t;
          ball.lineStyle(lineWidth, this.color).setRadius(ballRadius).setCenterPosition(centerX + Math.cos(angle) * trackRadius, centerY + Math.sin(angle) * trackRadius);
        }
      }
    }]);
    return Ball;
  }(Base);

  ObjectFactory.register('ball', function (config) {
    var gameObject = new Ball(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Ball', Ball);

  var Linear$7 = Phaser.Math.Linear;
  var ExpoIn$3 = Phaser.Math.Easing.Expo.In;
  var Bars = /*#__PURE__*/function (_Base) {
    _inherits(Bars, _Base);
    function Bars(scene, config) {
      var _this;
      _classCallCheck(this, Bars);
      _this = _callSuper(this, Bars, [scene, config]);
      _this.type = 'rexSpinnerBars';
      return _this;
    }
    _createClass(Bars, [{
      key: "buildShapes",
      value: function buildShapes() {
        var cnt = 5;
        for (var i = 0; i < cnt; i++) {
          var line = new Line();
          this.addShape(line);
          var offset = Yoyo(i / (cnt - 1)) / 2;
          line.setData('offset', offset);
        }
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var leftBound = centerX - radius;
        var maxLineHeight = radius * 2;
        var shapes = this.getShapes(),
          cnt = shapes.length;
        var cellWidth = radius * 2 / cnt;
        var lineWidth = cellWidth * 0.7;
        for (var i = 0; i < cnt; i++) {
          var line = shapes[i];
          var t = (this.value + line.getData('offset')) % 1;
          t = ExpoIn$3(Yoyo(t));
          var lineHeight = Linear$7(0.4, 1, t) * maxLineHeight;
          var x = leftBound + cellWidth * (i + 0.5);
          line.lineStyle(lineWidth, this.color, 1).setP0(x, centerY - lineHeight / 2).setP1(x, centerY + lineHeight / 2);
        }
      }
    }]);
    return Bars;
  }(Base);

  ObjectFactory.register('bars', function (config) {
    var gameObject = new Bars(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Bars', Bars);

  var Box = /*#__PURE__*/function (_Base) {
    _inherits(Box, _Base);
    function Box(scene, config) {
      var _this;
      _classCallCheck(this, Box);
      _this = _callSuper(this, Box, [scene, config]);
      _this.type = 'rexSpinnerCube';
      return _this;
    }
    _createClass(Box, [{
      key: "buildShapes",
      value: function buildShapes() {
        this.addShape(new Lines().setName('border'));
        this.addShape(new Lines().setName('fill'));
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var halfWidth = radius * 0.7;
        var left = centerX - halfWidth,
          top = centerY - halfWidth,
          width = halfWidth * 2;
        this.getShape('border').lineStyle(2, this.color, 1).startAt(left, top).lineTo(width, 0, true).lineTo(0, width, true).lineTo(-width, 0, true).lineTo(0, -width, true).close();
        if (this.value < 0.5) {
          var t = (0.5 - this.value) * 2;
          var height = width * t;
          this.getShape('fill').fillStyle(this.color, 1).startAt(left, top).lineTo(width, 0, true).lineTo(0, height, true).lineTo(-width, 0, true).lineTo(0, -height, true).close();
        } else {
          // Rotate
          var t = (this.value - 0.5) * 2;
          var angle = 180 * t;
          this.getShape('border').rotateAround(centerX, centerY, angle);
          this.getShape('fill').fillStyle().lineStyle();
        }
      }
    }]);
    return Box;
  }(Base);

  ObjectFactory.register('box', function (config) {
    var gameObject = new Box(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Box', Box);

  var RadToDeg = Phaser.Math.RadToDeg;
  var WrapDegrees = Phaser.Math.Angle.WrapDegrees;
  var WrapRad = Phaser.Math.Angle.Wrap;
  var ShortestBetween = Phaser.Math.Angle.ShortestBetween;
  var DegToRad = Phaser.Math.DegToRad;
  var Rad270 = Phaser.Math.DegToRad(270);
  var Clock = /*#__PURE__*/function (_Base) {
    _inherits(Clock, _Base);
    function Clock(scene, config) {
      var _this;
      _classCallCheck(this, Clock);
      _this = _callSuper(this, Clock, [scene, config]);
      _this.type = 'rexSpinnerClock';
      _this.minuteHandAngle = 0;
      _this.hourHandAngle = 0;
      return _this;
    }
    _createClass(Clock, [{
      key: "buildShapes",
      value: function buildShapes() {
        this.addShape(new Circle().setName('border'));
        this.addShape(new Line().setName('minuteHand'));
        this.addShape(new Line().setName('hourHand'));
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var lineWidth = Math.ceil(radius / 25);
        var borderRadius = radius - lineWidth / 2;
        var minuteHandLength = radius * 0.8;
        var hourHandLength = radius * 0.5;
        var prevMinuteHandAngle = this.minuteHandAngle;
        this.minuteHandAngle = Math.PI * 2 * this.value;
        var angle0 = WrapDegrees(RadToDeg(prevMinuteHandAngle));
        var angle1 = WrapDegrees(RadToDeg(this.minuteHandAngle));
        var deltaAngle = ShortestBetween(angle0, angle1);
        this.hourHandAngle = WrapRad(this.hourHandAngle + DegToRad(deltaAngle) / 12);
        this.getShape('border').lineStyle(lineWidth, this.color).setRadius(borderRadius).setCenterPosition(centerX, centerY);
        var angle = this.minuteHandAngle + Rad270;
        this.getShape('minuteHand').lineStyle(lineWidth, this.color).setP0(centerX, centerY).setP1(centerX + Math.cos(angle) * minuteHandLength, centerY + Math.sin(angle) * minuteHandLength);
        var angle = this.hourHandAngle + Rad270;
        this.getShape('hourHand').lineStyle(lineWidth, this.color).setP0(centerX, centerY).setP1(centerX + Math.cos(angle) * hourHandLength, centerY + Math.sin(angle) * hourHandLength);
      }
    }]);
    return Clock;
  }(Base);

  ObjectFactory.register('clock', function (config) {
    var gameObject = new Clock(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Clock', Clock);

  var Linear$6 = Phaser.Math.Linear;
  var ExpoIn$2 = Phaser.Math.Easing.Expo.In;
  var RowNum$1 = 2;
  var ColNum$1 = 2;
  var Cube = /*#__PURE__*/function (_Base) {
    _inherits(Cube, _Base);
    function Cube(scene, config) {
      var _this;
      _classCallCheck(this, Cube);
      _this = _callSuper(this, Cube, [scene, config]);
      _this.type = 'rexSpinnerCube';
      return _this;
    }
    _createClass(Cube, [{
      key: "buildShapes",
      value: function buildShapes() {
        var cnt = RowNum$1 * ColNum$1;
        for (var i = 0; i < cnt; i++) {
          var line = new Line();
          this.addShape(line);
        }
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var leftBound = centerX - radius;
        var topBound = centerY - radius;
        var cellWidth = radius * 2 / ColNum$1;
        var cellHeight = radius * 2 / RowNum$1;
        var shapes = this.getShapes(),
          cnt = shapes.length;
        for (var i = 0; i < cnt; i++) {
          var colIdx = i % ColNum$1;
          var rowIdx = Math.floor(i / RowNum$1);
          var x = leftBound + cellWidth * (colIdx + 0.5);
          var y = topBound + cellHeight * (rowIdx + 0.5);
          var line = shapes[i];
          var t = (this.value + (cnt - i) * 0.1) % 1;
          t = ExpoIn$2(Yoyo(t));
          var lineAlpha = (cnt - i) / cnt;
          var lineHeight = Linear$6(0.7, 1, t) * cellHeight;
          var lineWidth = Linear$6(0.7, 1, t) * cellWidth;
          line.lineStyle(lineWidth, this.color, lineAlpha).setP0(x - lineHeight / 2, y).setP1(x + lineHeight / 2, y);
        }
      }
    }]);
    return Cube;
  }(Base);

  ObjectFactory.register('cube', function (config) {
    var gameObject = new Cube(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Cube', Cube);

  var ShapeClasses = {
    arc: Arc,
    circle: Circle,
    curve: Curve,
    ellipse: Ellipse,
    line: Line,
    lines: Lines,
    rectangle: Rectangle,
    roundRectangle: RoundRectangle,
    triangle: Triangle
  };
  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var ClearAll = function ClearAll() {
    var shapes = this.getShapes();
    for (var i = 0, cnt = shapes.length; i < cnt; i++) {
      shapes[i].lineStyle().fillStyle();
    }
  };
  var ShapesUpdateMethods = {
    createShape: function createShape(shapeType, name) {
      var ShapeClass = ShapeClasses[shapeType];
      var shape = new ShapeClass();
      if (name) {
        shape.setName(name);
      }
      return shape;
    },
    buildShapes: function buildShapes(config) {
      var createCallback = GetValue$1(config, 'create', undefined);
      if (IsPlainObject(createCallback)) {
        var shapes = createCallback;
        for (var shapeType in shapes) {
          var name = shapes[shapeType];
          switch (_typeof(name)) {
            case 'number':
              for (var i = 0; i < name; i++) {
                this.addShape(this.createShape(shapeType));
              }
              break;
            case 'string':
              this.addShape(this.createShape(shapeType, name));
              break;
            default:
              //Array
              var names = name;
              for (var i = 0, cnt = names.length; i < cnt; i++) {
                this.addShape(this.createShape(shapeType, names[i]));
              }
              break;
          }
        }
      } else if (Array.isArray(createCallback)) {
        var shapes = createCallback;
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
          var shape = shapes[i];
          this.addShape(this.createShape(shape.type, shape.name));
        }
      } else if (typeof createCallback === 'function') {
        createCallback.call(this);
      }
      this.setUpdateShapesCallback(GetValue$1(config, 'update'));
    },
    setUpdateShapesCallback: function setUpdateShapesCallback(callback) {
      if (callback === undefined) {
        callback = ClearAll;
      }
      this.dirty = this.dirty || this.updateCallback !== callback;
      this.updateCallback = callback;
      return this;
    },
    updateShapes: function updateShapes() {
      this.updateCallback.call(this);
    }
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var Custom = /*#__PURE__*/function (_Base) {
    _inherits(Custom, _Base);
    function Custom(scene, config) {
      var _this;
      _classCallCheck(this, Custom);
      _this = _callSuper(this, Custom, [scene, config]);
      _this.type = GetValue(config, 'type', 'rexSpinnerCustom');
      return _this;
    }
    return _createClass(Custom);
  }(Base);
  Object.assign(Custom.prototype, ShapesUpdateMethods);

  ObjectFactory.register('custom', function (config) {
    var gameObject = new Custom(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Custom', Custom);

  var Linear$5 = Phaser.Math.Linear;
  var Dots = /*#__PURE__*/function (_Base) {
    _inherits(Dots, _Base);
    function Dots(scene, config) {
      var _this;
      _classCallCheck(this, Dots);
      _this = _callSuper(this, Dots, [scene, config]);
      _this.type = 'rexSpinnerDots';
      return _this;
    }
    _createClass(Dots, [{
      key: "buildShapes",
      value: function buildShapes() {
        var cnt = 3;
        for (var i = 0; i < cnt; i++) {
          var dot = new Circle();
          this.addShape(dot);
          var offset = Yoyo(i / (cnt - 1)) / 2;
          dot.setData('offset', offset);
        }
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var leftBound = centerX - radius;
        var shapes = this.getShapes(),
          cnt = shapes.length;
        var cellWidth = radius * 2 / cnt;
        var maxDotRadius = cellWidth / 2;
        for (var i = 0; i < cnt; i++) {
          var dot = shapes[i];
          var t = (this.value + dot.getData('offset')) % 1;
          t = Yoyo(t);
          var dotAlpha = Linear$5(0.25, 1, t);
          var dotRadius = Linear$5(0.5, 1, t) * maxDotRadius;
          dot.fillStyle(this.color, dotAlpha).setRadius(dotRadius).setCenterPosition(leftBound + cellWidth * (i + 0.5), centerY);
        }
      }
    }]);
    return Dots;
  }(Base);

  ObjectFactory.register('dots', function (config) {
    var gameObject = new Dots(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Dots', Dots);

  var Linear$4 = Phaser.Math.Linear;
  var ExpoIn$1 = Phaser.Math.Easing.Expo.In;
  var Facebook = /*#__PURE__*/function (_Base) {
    _inherits(Facebook, _Base);
    function Facebook(scene, config) {
      var _this;
      _classCallCheck(this, Facebook);
      _this = _callSuper(this, Facebook, [scene, config]);
      _this.type = 'rexSpinnerFacebook';
      return _this;
    }
    _createClass(Facebook, [{
      key: "buildShapes",
      value: function buildShapes() {
        for (var i = 0; i < 3; i++) {
          var shape = new Line();
          this.addShape(shape);
        }
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var leftBound = centerX - radius;
        var shapes = this.getShapes(),
          cnt = shapes.length;
        var cellWidth = radius * 2 / cnt;
        var cellHeight = radius * 2;
        for (var i = 0; i < cnt; i++) {
          var line = shapes[i];
          var t = (this.value + (cnt - i) * 0.1) % 1;
          t = ExpoIn$1(Yoyo(t));
          var lineAlpha = (i + 1) / cnt;
          var lineHeight = Linear$4(0.7, 1, t) * cellHeight;
          var lineWidth = Linear$4(0.7, 1, t) * cellWidth;
          var x = leftBound + cellWidth * (i + 0.5);
          line.lineStyle(lineWidth, this.color, lineAlpha).setP0(x, centerY - lineHeight / 2).setP1(x, centerY + lineHeight / 2);
        }
      }
    }]);
    return Facebook;
  }(Base);

  ObjectFactory.register('facebook', function (config) {
    var gameObject = new Facebook(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Facebook', Facebook);

  var Linear$3 = Phaser.Math.Linear;
  var RowNum = 3;
  var ColNum = 3;
  var Grid = /*#__PURE__*/function (_Base) {
    _inherits(Grid, _Base);
    function Grid(scene, config) {
      var _this;
      _classCallCheck(this, Grid);
      _this = _callSuper(this, Grid, [scene, config]);
      _this.type = 'rexSpinnerGrid';
      return _this;
    }
    _createClass(Grid, [{
      key: "buildShapes",
      value: function buildShapes() {
        var cnt = RowNum * ColNum;
        for (var i = 0; i < cnt; i++) {
          var dot = new Circle();
          this.addShape(dot);
          dot.setData('offset', Math.random());
        }
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var isSizeChanged = this.isSizeChanged;
        var leftBound = centerX - radius;
        var topBound = centerY - radius;
        var cellWidth = radius * 2 / ColNum;
        var cellHeight = radius * 2 / RowNum;
        var maxDotRadius = Math.min(cellWidth, cellHeight) / 2 * 0.8;
        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
          var colIdx = i % ColNum;
          var rowIdx = Math.floor(i / RowNum);
          var x = leftBound + cellWidth * (colIdx + 0.5);
          var y = topBound + cellHeight * (rowIdx + 0.5);
          var dot = shapes[i];
          var t = (this.value + dot.getData('offset')) % 1;
          t = Yoyo(t);
          dot.fillStyle(this.color, Linear$3(0.25, 1, t));
          if (isSizeChanged) {
            dot.setRadius(maxDotRadius).setCenterPosition(x, y);
          }
        }
      }
    }]);
    return Grid;
  }(Base);

  ObjectFactory.register('grid', function (config) {
    var gameObject = new Grid(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Grid', Grid);

  var Linear$2 = Phaser.Math.Linear;
  var Los = /*#__PURE__*/function (_Base) {
    _inherits(Los, _Base);
    function Los(scene, config) {
      var _this;
      _classCallCheck(this, Los);
      _this = _callSuper(this, Los, [scene, config]);
      _this.type = 'rexSpinnerLos';
      return _this;
    }
    _createClass(Los, [{
      key: "buildShapes",
      value: function buildShapes() {
        for (var i = 0; i < 12; i++) {
          this.addShape(new Line());
        }
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var isSizeChanged = this.isSizeChanged;
        var radius = this.radius;
        var startRadius = radius / 2;
        var lineWidth = Math.ceil(radius / 20);
        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
          var line = shapes[i];
          var t = i / cnt;
          var angle = Math.PI * 2 * t;
          var alpha = Linear$2(0.25, 1, (1 - this.value + t) % 1);
          line.lineStyle(lineWidth, this.color, alpha);
          if (isSizeChanged) {
            line.setP0(centerX + Math.cos(angle) * startRadius, centerY + Math.sin(angle) * startRadius).setP1(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
          }
        }
      }
    }]);
    return Los;
  }(Base);

  ObjectFactory.register('los', function (config) {
    var gameObject = new Los(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Los', Los);

  var Orbit = /*#__PURE__*/function (_Base) {
    _inherits(Orbit, _Base);
    function Orbit(scene, config) {
      var _this;
      _classCallCheck(this, Orbit);
      _this = _callSuper(this, Orbit, [scene, config]);
      _this.type = 'rexSpinnerOrbit';
      return _this;
    }
    _createClass(Orbit, [{
      key: "buildShapes",
      value: function buildShapes() {
        this.addShape(new Circle().setName('track'));
        this.addShape(new Circle().setName('thumb'));
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var trackRadius = radius * 0.9;
        var trackThickness = Math.ceil(trackRadius / 25);
        var thumbRadius = radius * 0.1;
        var thumbAngle = Math.PI * 2 * this.value;
        this.getShape('track').lineStyle(trackThickness, this.color, 0.7).setRadius(trackRadius).setCenterPosition(centerX, centerY);
        this.getShape('thumb').fillStyle(this.color).setRadius(thumbRadius).setCenterPosition(centerX + Math.cos(thumbAngle) * trackRadius, centerY + Math.sin(thumbAngle) * trackRadius);
      }
    }]);
    return Orbit;
  }(Base);

  ObjectFactory.register('orbit', function (config) {
    var gameObject = new Orbit(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Orbit', Orbit);

  var Oval = /*#__PURE__*/function (_Base) {
    _inherits(Oval, _Base);
    function Oval(scene, config) {
      var _this;
      _classCallCheck(this, Oval);
      _this = _callSuper(this, Oval, [scene, config]);
      _this.type = 'rexSpinnerOval';
      return _this;
    }
    _createClass(Oval, [{
      key: "buildShapes",
      value: function buildShapes() {
        this.addShape(new Circle().setName('track'));
        this.addShape(new Arc().setName('arc'));
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var lineWidth = Math.ceil(radius / 25);
        var maxRadius = radius - lineWidth / 2;
        this.getShape('track').lineStyle(lineWidth, this.color, 0.5).setRadius(maxRadius).setCenterPosition(centerX, centerY);
        var startAngle = this.value * 360;
        var endAngle = startAngle + 60;
        this.getShape('arc').lineStyle(lineWidth, this.color, 1).setRadius(maxRadius).setCenterPosition(centerX, centerY).setAngle(startAngle, endAngle);
      }
    }]);
    return Oval;
  }(Base);

  ObjectFactory.register('oval', function (config) {
    var gameObject = new Oval(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Oval', Oval);

  var Linear$1 = Phaser.Math.Linear;
  var Pie = /*#__PURE__*/function (_Base) {
    _inherits(Pie, _Base);
    function Pie(scene, config) {
      var _this;
      _classCallCheck(this, Pie);
      _this = _callSuper(this, Pie, [scene, config]);
      _this.type = 'rexSpinnerPie';
      return _this;
    }
    _createClass(Pie, [{
      key: "buildShapes",
      value: function buildShapes() {
        for (var i = 0; i < 4; i++) {
          var pie = new Arc().setPie();
          this.addShape(pie);
          pie.setData('speed', Linear$1(180, 360, Math.random()));
        }
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var deltaValue;
        if (this.prevValue !== undefined) {
          deltaValue = this.value - this.prevValue;
          if (this.prevValue > this.value) {
            deltaValue += 1;
          }
        }
        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
          var pie = shapes[i];
          var pieAlpha = (i + 1) / cnt;
          if (this.prevValue === undefined) {
            var startAngle = i / cnt * 360;
            var endAngle = startAngle + 90;
            pie.fillStyle(this.color, pieAlpha).setRadius(radius).setCenterPosition(centerX, centerY).setAngle(startAngle, endAngle).setData('angle', startAngle);
          } else {
            var startAngle = pie.getData('angle') + pie.getData('speed') * deltaValue;
            startAngle = startAngle % 360;
            var endAngle = startAngle + 90;
            pie.fillStyle(this.color, pieAlpha).setRadius(radius).setCenterPosition(centerX, centerY).setAngle(startAngle, endAngle).setData('angle', startAngle);
          }
        }
        this.prevValue = this.value;
      }
    }]);
    return Pie;
  }(Base);

  ObjectFactory.register('pie', function (config) {
    var gameObject = new Pie(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Pie', Pie);

  var Puff = /*#__PURE__*/function (_Base) {
    _inherits(Puff, _Base);
    function Puff(scene, config) {
      var _this;
      _classCallCheck(this, Puff);
      _this = _callSuper(this, Puff, [scene, config]);
      _this.type = 'rexSpinnerPuff';
      return _this;
    }
    _createClass(Puff, [{
      key: "buildShapes",
      value: function buildShapes() {
        this.addShape(new Circle());
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var puffRadius = radius * this.value;
        var lineWidth = Math.ceil(radius / 25);
        var alpha = Yoyo(this.value);
        this.getShapes()[0].lineStyle(lineWidth, this.color, alpha).setRadius(puffRadius).setCenterPosition(centerX, centerY);
      }
    }]);
    return Puff;
  }(Base);

  ObjectFactory.register('puff', function (config) {
    var gameObject = new Puff(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Puff', Puff);

  var Linear = Phaser.Math.Linear;
  var ExpoIn = Phaser.Math.Easing.Expo.In;
  var Radio = /*#__PURE__*/function (_Base) {
    _inherits(Radio, _Base);
    function Radio(scene, config) {
      var _this;
      _classCallCheck(this, Radio);
      _this = _callSuper(this, Radio, [scene, config]);
      _this.type = 'rexSpinnerRadio';
      return _this;
    }
    _createClass(Radio, [{
      key: "buildShapes",
      value: function buildShapes() {
        this.addShape(new Circle().setName('center'));
        this.addShape(new Lines().setName('arc0'));
        this.addShape(new Lines().setName('arc1'));
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var isSizeChanged = this.isSizeChanged;
        var centerRadius = radius * 2 / 6;
        var x = centerX - radius + centerRadius;
        var y = centerY + radius - centerRadius;
        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
          var shape = shapes[i];
          var t = (this.value + (cnt - i) * 0.1) % 1;
          t = ExpoIn(Yoyo(t));
          switch (shape.name) {
            case 'center':
              shape.fillStyle(this.color, Linear(0.25, 1, t));
              if (isSizeChanged) {
                shape.setRadius(centerRadius).setCenterPosition(x, y);
              }
              break;
            case 'arc0':
              shape.fillStyle(this.color, Linear(0.25, 1, t));
              if (isSizeChanged) {
                var radius0 = centerRadius * 2,
                  radius1 = centerRadius * 3;
                shape.startAt(x, y - radius0).lineTo(x, y - radius1).setIterations(8).arc(x, y, radius1, 270, 360).lineTo(x + radius0, y).setIterations(6).arc(x, y, radius0, 360, 270, true).close();
              }
              break;
            case 'arc1':
              shape.fillStyle(this.color, Linear(0.25, 1, t));
              if (isSizeChanged) {
                var radius0 = centerRadius * 4,
                  radius1 = centerRadius * 5;
                shape.startAt(x, y - radius0).lineTo(x, y - radius1).setIterations(8).arc(x, y, radius1, 270, 360).lineTo(x + radius0, y).setIterations(6).arc(x, y, radius0, 360, 270, true).close();
              }
              break;
          }
        }
      }
    }]);
    return Radio;
  }(Base);

  ObjectFactory.register('radio', function (config) {
    var gameObject = new Radio(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Radio', Radio);

  var Rings = /*#__PURE__*/function (_Base) {
    _inherits(Rings, _Base);
    function Rings(scene, config) {
      var _this;
      _classCallCheck(this, Rings);
      _this = _callSuper(this, Rings, [scene, config]);
      _this.type = 'rexSpinnerRings';
      return _this;
    }
    _createClass(Rings, [{
      key: "buildShapes",
      value: function buildShapes() {
        for (var i = 0; i < 2; i++) {
          this.addShape(new Circle());
        }
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var lineWidth = Math.ceil(radius / 25);
        var maxRingRadius = radius - lineWidth;
        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
          var ring = shapes[i];
          var t = (this.value + i / cnt) % 1;
          var alpha = Yoyo(t);
          ring.lineStyle(lineWidth, this.color, alpha).setRadius(t * maxRingRadius).setCenterPosition(centerX, centerY);
        }
      }
    }]);
    return Rings;
  }(Base);

  ObjectFactory.register('rings', function (config) {
    var gameObject = new Rings(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Rings', Rings);

  var Spinner = /*#__PURE__*/function (_Base) {
    _inherits(Spinner, _Base);
    function Spinner(scene, config) {
      var _this;
      _classCallCheck(this, Spinner);
      _this = _callSuper(this, Spinner, [scene, config]);
      _this.type = 'rexSpinnerSpinner';
      return _this;
    }
    _createClass(Spinner, [{
      key: "buildShapes",
      value: function buildShapes() {
        this.addShape(new Arc().setName('arc'));
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var lineWidth = Math.ceil(radius / 10);
        var maxRadius = radius - lineWidth;
        var endAngle = this.value * 720;
        var arcAngle = Yoyo(this.value) * 180;
        var startAngle = endAngle - arcAngle;
        this.getShape('arc').lineStyle(lineWidth, this.color, 1).setRadius(maxRadius).setCenterPosition(centerX, centerY).setAngle(startAngle + 315, endAngle + 315);
      }
    }]);
    return Spinner;
  }(Base);

  ObjectFactory.register('spinner', function (config) {
    var gameObject = new Spinner(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  });
  SetValue(window, 'RexPlugins.Spinner.Spinner', Spinner);

  var SpinnerPlugin = /*#__PURE__*/function (_Phaser$Plugins$Scene) {
    _inherits(SpinnerPlugin, _Phaser$Plugins$Scene);
    function SpinnerPlugin(scene, pluginManager) {
      var _this;
      _classCallCheck(this, SpinnerPlugin);
      _this = _callSuper(this, SpinnerPlugin, [scene, pluginManager]);
      _this.add = new ObjectFactory(scene);
      return _this;
    }
    _createClass(SpinnerPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.scene.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return SpinnerPlugin;
  }(Phaser.Plugins.ScenePlugin);

  return SpinnerPlugin;

}));
