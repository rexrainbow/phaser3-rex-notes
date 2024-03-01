(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexloopinticksplugin = factory());
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

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$2(config, 'eventEmitter', true));

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

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);
    function TickTask(parent, config) {
      var _this;
      _classCallCheck(this, TickTask);
      _this = _callSuper(this, TickTask, [parent, config]);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;
      _this.setTickingMode(GetValue$1(config, 'tickingMode', 1));
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

  var LoopIndex = /*#__PURE__*/function () {
    function LoopIndex(key, start, end, step, items) {
      _classCallCheck(this, LoopIndex);
      this.key = key;
      this.start = start;
      this.end = end;
      this.step = step;
      this.items = items;
      this._current = start;
    }
    _createClass(LoopIndex, [{
      key: "reset",
      value: function reset() {
        this._current = this.start;
      }
    }, {
      key: "isEnd",
      get: function get() {
        return this.step >= 0 ? this._current >= this.end : this._current <= this.end;
      }
    }, {
      key: "length",
      get: function get() {
        if (this.step >= 0 && this.start > this.end || this.step < 0 && this.start < this.end) {
          return 0;
        }
        return Math.floor(this.end - this.start) + 1;
      }
    }, {
      key: "next",
      value: function next() {
        if (this.isEnd) {
          this._current = this.start;
        } else {
          this._current += this.step;
        }
        return this;
      }
    }, {
      key: "current",
      get: function get() {
        return !this.items ? this._current : this.items[this._current];
      }
    }]);
    return LoopIndex;
  }();

  var LoopIndexGenerator = /*#__PURE__*/function () {
    function LoopIndexGenerator() {
      _classCallCheck(this, LoopIndexGenerator);
      this.indexes = [];
      this.length = 0;
      this.reset();
    }
    _createClass(LoopIndexGenerator, [{
      key: "reset",
      value: function reset() {
        for (var i = 0, cnt = this.indexes.length; i < cnt; i++) {
          this.indexes[i].reset();
        }
        this.firstPass = true;
        this.currentCount = 0;
        return this;
      }
    }, {
      key: "addNumberLoop",
      value: function addNumberLoop(key, start, end, step) {
        if (step === undefined) {
          step = end >= start ? 1 : -1;
        }
        this.indexes.push(new LoopIndex(key, start, end, step));
        this.length = this._getLength();
        return this;
      }
    }, {
      key: "addItemsLoop",
      value: function addItemsLoop(key, items, reverse) {
        if (reverse === undefined) {
          reverse = false;
        }
        var lastIndex = items.length - 1;
        var start = reverse ? lastIndex : 0;
        var end = reverse ? 0 : lastIndex;
        var step = reverse ? -1 : 1;
        this.indexes.push(new LoopIndex(key, start, end, step, items));
        this.length = this._getLength();
        return this;
      }
    }, {
      key: "addLoop",
      value: function addLoop(config) {
        this.indexes.push(new LoopIndex(config.key, config.start, config.end, config.step, config.items));
        this.length = this._getLength();
        return this;
      }
    }, {
      key: "removeLoops",
      value: function removeLoops() {
        this.indexes.length = 0;
        this.length = 0;
        return this;
      }
    }, {
      key: "_getLength",
      value: function _getLength() {
        var total = undefined;
        for (var i = 0, cnt = this.indexes.length; i < cnt; i++) {
          if (total === undefined) {
            total = this.indexes[i].length;
          } else {
            total *= this.indexes[i].length;
          }
        }
        return total === undefined ? 0 : total;
      }
    }, {
      key: "progress",
      get: function get() {
        return this.currentCount / this.length;
      }
    }, {
      key: "isEnd",
      get: function get() {
        for (var i = this.indexes.length - 1; i >= 0; i--) {
          if (!this.indexes[i].isEnd) {
            return false;
          }
        }
        return true;
      }
    }, {
      key: "next",
      value: function next() {
        var loopIndex, goNext;
        for (var i = this.indexes.length - 1; i >= 0; i--) {
          loopIndex = this.indexes[i];
          goNext = loopIndex.isEnd;
          loopIndex.next();
          if (!goNext) {
            break;
          }
        }
        return this;
      }
    }, {
      key: "getCurrent",
      value: function getCurrent(out) {
        if (out === undefined) {
          out = {};
        }
        var loopIndex;
        for (var i = this.indexes.length - 1; i >= 0; i--) {
          loopIndex = this.indexes[i];
          out[loopIndex.key] = loopIndex.current;
        }
        return out;
      }
    }, {
      key: "getNext",
      value: function getNext(out) {
        if (!this.firstPass) {
          this.next();
        } else {
          this.firstPass = false;
        }
        this.getCurrent(out);
        this.currentCount++;
        return out;
      }
    }]);
    return LoopIndexGenerator;
  }();

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

  var GetValue = Phaser.Utils.Objects.GetValue;
  var LoopInTicks = /*#__PURE__*/function (_TickTask) {
    _inherits(LoopInTicks, _TickTask);
    function LoopInTicks(scene, config) {
      var _this;
      _classCallCheck(this, LoopInTicks);
      _this = _callSuper(this, LoopInTicks, [scene, config]);
      _this.deltaPeriod = 1000 / scene.game.loop.targetFps;
      _this.deltaPercentage = 1;
      _this.loopIndexGenerator = new LoopIndexGenerator();
      _this.currentIndexes = {};
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(LoopInTicks, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setCallback(GetValue(o, 'callback', this.callback), GetValue(o, 'scope', this.scope));
        this.setDeltaPercentage(GetValue(o, 'deltaPercentage', this.deltaPercentage));
        this.loopIndexGenerator.reset();
        Clear(this.currentIndexes);
        return this;
      }
    }, {
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(LoopInTicks.prototype), "startTicking", this).call(this);
        this.scene.sys.events.on('preupdate', this.preupdate, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(LoopInTicks.prototype), "stopTicking", this).call(this);
        if (this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off('preupdate', this.preupdate, this);
        }
      }
    }, {
      key: "setCallback",
      value: function setCallback(callback, scope) {
        this.callback = callback;
        this.scope = scope;
        return this;
      }
    }, {
      key: "setDeltaPercentage",
      value: function setDeltaPercentage(percentage) {
        this.deltaPercentage = percentage;
        return this;
      }
    }, {
      key: "addNumberLoop",
      value: function addNumberLoop(key, start, end, step) {
        this.loopIndexGenerator.addNumberLoop(key, start, end, step);
        return this;
      }
    }, {
      key: "addItemsLoop",
      value: function addItemsLoop(key, items, reverse) {
        this.loopIndexGenerator.addItemsLoop(key, items, reverse);
        return this;
      }
    }, {
      key: "addLoop",
      value: function addLoop(config) {
        this.loopIndexGenerator.addLoop(config);
        return this;
      }
    }, {
      key: "curTime",
      get: function get() {
        return new Date().getTime();
      }
    }, {
      key: "progress",
      get: function get() {
        return this.loopIndexGenerator.progress;
      }
    }, {
      key: "preupdate",
      value: function preupdate(time, delta) {
        if (!this.isRunning || !this.callback) {
          return;
        }
        var startTime = this.curTime;
        var totalTime = this.deltaPeriod * this.deltaPercentage;
        var isTimeOut;
        this.emit('tickstart', this);
        do {
          if (this.loopIndexGenerator.isEnd) {
            this.complete();
            return;
          }
          this.currentIndexes = this.loopIndexGenerator.getNext(this.currentIndexes);
          if (this.scope) {
            this.callback.call(this.scope, this.currentIndexes, this);
          } else {
            this.callback(this.currentIndexes, this);
          }
          isTimeOut = this.curTime - startTime >= totalTime;
        } while (!isTimeOut);
        this.emit('tickend', this);
        return;
      }
    }]);
    return LoopInTicks;
  }(TickTask);

  var LoopInTicksPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(LoopInTicksPlugin, _Phaser$Plugins$BaseP);
    function LoopInTicksPlugin(pluginManager) {
      _classCallCheck(this, LoopInTicksPlugin);
      return _callSuper(this, LoopInTicksPlugin, [pluginManager]);
    }
    _createClass(LoopInTicksPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(scene, config) {
        return new LoopInTicks(scene, config);
      }
    }]);
    return LoopInTicksPlugin;
  }(Phaser.Plugins.BasePlugin);

  return LoopInTicksPlugin;

}));
