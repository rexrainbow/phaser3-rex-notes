(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdragrotateplugin = factory());
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

  var GameObjectClass = Phaser.GameObjects.GameObject;
  var IsGameObject = function IsGameObject(object) {
    return object instanceof GameObjectClass;
  };

  var GetPointerWorldXY = function GetPointerWorldXY(pointer, mainCamera, out) {
    var camera = pointer.camera;
    if (!camera) {
      return null;
    }
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globalOut;
    }
    if (camera === mainCamera) {
      out.x = pointer.worldX;
      out.y = pointer.worldY;
    } else {
      camera.getWorldPoint(pointer.x, pointer.y, out);
    }
    return out;
  };
  var globalOut = {};

  var GetValue = Phaser.Utils.Objects.GetValue;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var DistanceBetween = Phaser.Math.Distance.Between;
  var GetAngle = Phaser.Math.Angle.Between;
  var WrapAngle = Phaser.Math.Angle.Wrap;
  var RadToDeg = Phaser.Math.RadToDeg;
  var STATE_TOUCH0 = 0;
  var STATE_TOUCH1 = 1;
  var DragRotate = /*#__PURE__*/function (_ComponentBase) {
    _inherits(DragRotate, _ComponentBase);
    function DragRotate(scene, config) {
      var _this;
      _classCallCheck(this, DragRotate);
      _this = _callSuper(this, DragRotate, [scene]);
      // No event emitter
      // this.scene = scene

      _this.mainCamera = _this.scene.sys.cameras.main;
      _this._enable = undefined;
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(DragRotate, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.originGameObject = undefined;
        this.setEnable(GetValue(o, "enable", true));
        var originConfig = GetValue(o, 'origin', o);
        this.setOrigin(originConfig);
        this.setRadius(GetValue(o, 'maxRadius'), GetValue(o, 'minRadius', 0));
        this.state = STATE_TOUCH0;
      }
    }, {
      key: "boot",
      value: function boot() {
        this.scene.input.on('pointerdown', this.onPointerDown, this);
        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.scene.input.off('pointerdown', this.onPointerDown, this);
        this.scene.input.off('pointerup', this.onPointerUp, this);
        this.scene.input.off('pointermove', this.onPointerMove, this);
        this.mainCamera = undefined;
        this.pointer = undefined;
        this.originGameObject = undefined;
        _get(_getPrototypeOf(DragRotate.prototype), "shutdown", this).call(this, fromScene);
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
          this.dragCancel();
        }
        this._enable = e;
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
      key: "setOrigin",
      value: function setOrigin(x, y) {
        if (x === undefined) {
          this.x = undefined; // World position
          this.y = undefined; // World position
          this.originGameObject = undefined;
        } else if (IsGameObject(x)) {
          this.x = undefined;
          this.y = undefined;
          this.originGameObject = x;
        } else if (IsPlainObject(x)) {
          this.x = GetValue(x, 'x', 0); // World position
          this.y = GetValue(x, 'y', 0); // World position
          this.originGameObject = undefined;
        } else {
          this.x = x; // World position
          this.y = y; // World position
          this.originGameObject = undefined;
        }
        return this;
      }
    }, {
      key: "setRadius",
      value: function setRadius(maxRadius, minRadius) {
        if (minRadius === undefined) {
          minRadius = 0;
        }
        this.maxRadius = maxRadius;
        this.minRadius = minRadius;
        return this;
      }
    }, {
      key: "getOriginX",
      value: function getOriginX(camera) {
        // OriginX in world position
        if (!this.originGameObject) {
          return this.x;
        }
        var gameObject = this.originGameObject;
        var x = gameObject.x;
        if (gameObject.scrollFactorX === 0) {
          x += camera.scrollX;
        }
        return x;
      }
    }, {
      key: "getOriginY",
      value: function getOriginY(camera) {
        // OriginY in world position
        if (!this.originGameObject) {
          return this.y;
        }
        var gameObject = this.originGameObject;
        var y = gameObject.y;
        if (gameObject.scrollFactorY === 0) {
          if (camera === undefined) {
            camera = this.pointer.camera;
          }
          y += camera.scrollY;
        }
        return y;
      }
    }, {
      key: "containsPointer",
      value: function containsPointer(pointer) {
        if (this.minRadius === 0 && this.maxRadius === undefined) {
          return true;
        }
        var originX = this.getOriginX(pointer.camera);
        var originY = this.getOriginY(pointer.camera);
        var worldXY = GetPointerWorldXY(pointer, this.mainCamera, true);
        if (!worldXY) {
          return false;
        }
        var r = DistanceBetween(originX, originY, worldXY.x, worldXY.y);
        return r >= this.minRadius && (this.maxRadius === undefined || r <= this.maxRadius);
      }
    }, {
      key: "onPointerDown",
      value: function onPointerDown(pointer) {
        if (!this.enable || this.pointer) {
          return;
        }
        if (!this.containsPointer(pointer)) {
          return;
        }
        this.onDragStart(pointer);
      }
    }, {
      key: "onPointerUp",
      value: function onPointerUp(pointer) {
        if (!this.enable || this.pointer !== pointer) {
          return;
        }
        this.onDragEnd();
      }
    }, {
      key: "onPointerMove",
      value: function onPointerMove(pointer) {
        if (!this.enable || !pointer.isDown) {
          return;
        }
        switch (this.state) {
          case STATE_TOUCH0:
            if (this.containsPointer(pointer)) {
              this.onDragStart(pointer);
            }
            break;
          case STATE_TOUCH1:
            if (this.containsPointer(pointer)) {
              this.onDrag(pointer);
            } else {
              this.onDragEnd(pointer);
            }
            break;
        }
      }
    }, {
      key: "dragCancel",
      value: function dragCancel() {
        if (this.state === STATE_TOUCH1) {
          this.onDragEnd();
        }
        this.pointer = undefined;
        this.state = STATE_TOUCH0;
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart(pointer) {
        this.pointer = pointer;
        var worldXY = GetPointerWorldXY(pointer, this.mainCamera, true);
        if (!worldXY) {
          return;
        }
        this.prevPointerX = worldXY.x;
        this.prevPointerY = worldXY.y;
        this.state = STATE_TOUCH1;
        this.emit('dragstart', this);
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.pointer = undefined;
        this.prevPointerX = undefined;
        this.prevPointerY = undefined;
        this.state = STATE_TOUCH0;
        this._deltaRotation = undefined;
        this.emit('dragend', this);
      }
    }, {
      key: "onDrag",
      value: function onDrag(pointer) {
        var x = this.getOriginX(pointer.camera),
          y = this.getOriginY(pointer.camera);
        var worldXY = GetPointerWorldXY(pointer, this.mainCamera, true);
        if (!worldXY) {
          return;
        }
        var curPointerX = worldXY.x;
        var curPointerY = worldXY.y;
        var a0 = GetAngle(x, y, this.prevPointerX, this.prevPointerY),
          a1 = GetAngle(x, y, curPointerX, curPointerY);
        this.deltaRotation = WrapAngle(a1 - a0);
        this.prevPointerX = curPointerX;
        this.prevPointerY = curPointerY;
        this.emit('drag', this);
      }
    }, {
      key: "deltaAngle",
      get: function get() {
        if (this.state === STATE_TOUCH0) {
          return 0;
        }
        return RadToDeg(this.deltaRotation);
      }
    }, {
      key: "cw",
      get: function get() {
        return this.deltaRotation >= 0;
      }
    }, {
      key: "ccw",
      get: function get() {
        return !this.cw;
      }
    }]);
    return DragRotate;
  }(ComponentBase);

  var DragRotatePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(DragRotatePlugin, _Phaser$Plugins$BaseP);
    function DragRotatePlugin(pluginManager) {
      _classCallCheck(this, DragRotatePlugin);
      return _callSuper(this, DragRotatePlugin, [pluginManager]);
    }
    _createClass(DragRotatePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(scene, config) {
        return new DragRotate(scene, config);
      }
    }]);
    return DragRotatePlugin;
  }(Phaser.Plugins.BasePlugin);

  return DragRotatePlugin;

}));
