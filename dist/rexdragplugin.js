(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdragplugin = factory());
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

  var IsPointerInHitArea = function IsPointerInHitArea(gameObject, pointer, preTest, postTest) {
    if (pointer) {
      if (preTest && !preTest(gameObject, pointer)) {
        return false;
      }
      if (!HitTest(gameObject, pointer)) {
        return false;
      }
      if (postTest && !postTest(gameObject, pointer)) {
        return false;
      }
      return true;
    } else {
      var inputManager = gameObject.scene.input.manager;
      var pointersTotal = inputManager.pointersTotal;
      var pointers = inputManager.pointers,
        pointer;
      for (var i = 0; i < pointersTotal; i++) {
        pointer = pointers[i];
        if (preTest && !preTest(gameObject, pointer)) {
          continue;
        }
        if (!HitTest(gameObject, pointer)) {
          continue;
        }
        if (postTest && !postTest(gameObject, pointer)) {
          continue;
        }
        return true;
      }
      return false;
    }
  };
  var HitTest = function HitTest(gameObject, pointer) {
    var scene = gameObject.scene;
    var cameras = scene.input.cameras.getCamerasBelowPointer(pointer);
    var inputManager = scene.input.manager;
    var gameObjects = [gameObject];
    for (var i = 0, len = cameras.length; i < len; i++) {
      inputManager.hitTest(pointer, gameObjects, cameras[i], HitTestResult);
      if (HitTestResult.length > 0) {
        HitTestResult.length = 0;
        return true;
      }
    }
    HitTestResult.length = 0;
    return false;
  };
  var HitTestResult = [];

  var RequestDrag = function RequestDrag(gameObject) {
    var inputPlugin = gameObject.scene.input;
    var inputManager = inputPlugin.manager;
    var pointersTotal = inputManager.pointersTotal;
    var pointers = inputManager.pointers,
      pointer;
    for (var i = 0; i < pointersTotal; i++) {
      pointer = pointers[i];
      if (!pointer.primaryDown || inputPlugin.getDragState(pointer) !== 0 || !IsPointerInHitArea(gameObject, pointer)) {
        continue;
      }

      // For 3.18.0
      inputPlugin.setDragState(pointer, 1);
      inputPlugin._drag[pointer.id] = [gameObject];
      if (inputPlugin.dragDistanceThreshold === 0 || inputPlugin.dragTimeThreshold === 0) {
        //  No drag criteria, so snap immediately to mode 3
        inputPlugin.setDragState(pointer, 3);
        inputPlugin.processDragStartList(pointer);
      } else {
        //  Check the distance / time on the next event
        inputPlugin.setDragState(pointer, 2);
      }
      // For 3.18.0

      return true;
    }
    return false;
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var DistanceBetween = Phaser.Math.Distance.Between;
  var RotateAroundDistance = Phaser.Math.RotateAroundDistance;
  var Drag = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Drag, _ComponentBase);
    function Drag(gameObject, config) {
      var _this;
      _classCallCheck(this, Drag);
      _this = _callSuper(this, Drag, [gameObject, {
        eventEmitter: false
      }]);
      // No event emitter
      // this.parent = gameObject;

      _this._enable = undefined;
      gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(Drag, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.setEnable(GetValue(o, "enable", true));
        this.setAxisMode(GetValue(o, "axis", 0));
        this.setAxisRotation(GetValue(o, "rotation", 0));
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          enable: this.enable,
          axis: this.axisMode,
          rotation: this.axisRotation
        };
      }
    }, {
      key: "boot",
      value: function boot() {
        var gameObject = this.parent;
        gameObject.on('dragstart', this.onDragStart, this);
        gameObject.on('drag', this.onDrag, this);
        gameObject.on('dragend', this.onDragEnd, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // GameObject events will be removed when this gameObject destroyed 
        // this.parent.on('dragstart', this.onDragStart, this);
        // this.parent.on('drag', this.onDrag, this);
        // this.parent.on('dragend', this.onDragEnd, this);
        this.pointer = undefined;
        _get(_getPrototypeOf(Drag.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }
        if (!e) {
          this.dragend();
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
      key: "setAxisMode",
      value: function setAxisMode(m) {
        if (typeof m === 'string') {
          m = DIRECTIONNODE[m];
        }
        this.axisMode = m;
        return this;
      }
    }, {
      key: "setAxisRotation",
      value: function setAxisRotation(a) {
        this.axisRotation = a;
        return this;
      }
    }, {
      key: "drag",
      value: function drag() {
        RequestDrag(this.parent);
        return this;
      }
    }, {
      key: "dragend",
      value: function dragend() {
        if (!this.isDragging) {
          return;
        }
        this.scene.input.setDragState(this.pointer, 5);
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart(pointer, dragX, dragY) {
        if (this.isDragging) {
          return;
        }
        this.pointer = pointer;
      }
    }, {
      key: "onDrag",
      value: function onDrag(pointer, dragX, dragY) {
        if (this.pointer !== pointer) {
          return;
        }
        var gameObject = this.parent;
        if (this.axisMode === 0) {
          gameObject.x = dragX;
          gameObject.y = dragY;
        } else if (this.axisRotation === 0) {
          if (this.axisMode === 1) {
            gameObject.x = dragX;
          } else if (this.axisMode === 2) {
            gameObject.y = dragY;
          }
        } else {
          var dist;
          var p1 = {
            x: dragX,
            y: dragY
          };
          dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
          p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, -this.axisRotation, dist);
          if (this.axisMode === 1) {
            p1.y = gameObject.y;
          } else if (this.axisMode === 2) {
            p1.x = gameObject.x;
          }
          dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
          p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, this.axisRotation, dist);
          gameObject.x = p1.x;
          gameObject.y = p1.y;
        }
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd(pointer, dragX, dragY, dropped) {
        if (this.pointer !== pointer) {
          return;
        }
        this.pointer = undefined;
      }
    }, {
      key: "isDragging",
      get: function get() {
        return this.pointer !== undefined;
      }
    }]);
    return Drag;
  }(ComponentBase);
  var DIRECTIONNODE = {
    'both': 0,
    'h&v': 0,
    'x&y': 0,
    'horizontal': 1,
    'h': 1,
    'x': 1,
    'vertical': 2,
    'v': 2,
    'y': 2
  };

  var DragPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(DragPlugin, _Phaser$Plugins$BaseP);
    function DragPlugin(pluginManager) {
      _classCallCheck(this, DragPlugin);
      return _callSuper(this, DragPlugin, [pluginManager]);
    }
    _createClass(DragPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        return new Drag(gameObject, config);
      }
    }]);
    return DragPlugin;
  }(Phaser.Plugins.BasePlugin);

  return DragPlugin;

}));
