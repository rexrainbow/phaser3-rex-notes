(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdragspeedplugin = factory());
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

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
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
    }
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;

  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);

      this.parent = parent; // gameObject or scene

      this.scene = GetSceneObject(parent);
      this.isShutdown = false; // Event emitter, default is private event emitter

      this.setEventEmitter(GetValue$1(config, 'eventEmitter', true)); // Register callback of parent destroy event, also see `shutdown` method

      if (this.parent && this.parent === this.scene) {
        // parent is a scene
        this.scene.events.once('shutdown', this.onSceneDestroy, this);
      } else if (this.parent && this.parent.once) {
        // bob object does not have event emitter
        this.parent.once('destroy', this.onParentDestroy, this);
      }
    }

    _createClass(ComponentBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        } // parent might not be shutdown yet


        if (this.parent && this.parent === this.scene) {
          // parent is a scene
          this.scene.events.off('shutdown', this.onSceneDestroy, this);
        } else if (this.parent && this.parent.once) {
          // bob object does not have event emitter
          this.parent.off('destroy', this.onParentDestroy, this);
        }

        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        this.isShutdown = true;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onSceneDestroy",
      value: function onSceneDestroy() {
        this.destroy(true);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }]);

    return ComponentBase;
  }();
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  var GetValue = Phaser.Utils.Objects.GetValue;
  var DistanceBetween = Phaser.Math.Distance.Between;

  var DragSpeed = /*#__PURE__*/function (_ComponentBase) {
    _inherits(DragSpeed, _ComponentBase);

    var _super = _createSuper(DragSpeed);

    function DragSpeed(gameObject, config) {
      var _this;

      _classCallCheck(this, DragSpeed);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      _this._enable = undefined;
      gameObject.setInteractive(GetValue(config, "inputConfig", undefined));

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(DragSpeed, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.isInTouched = false;
        this.holdStartTime = undefined;
        this.x = undefined;
        this.y = undefined;
        this.preX = undefined;
        this.preY = undefined;
        this.localX = undefined;
        this.localY = undefined;
        this.justMoved = false;
        this.setEnable(GetValue(o, 'enable', true));
        this.holdThreshold = GetValue(o, 'holdThreshold', 50); // ms

        this.pointerOutReleaseEnable = GetValue(o, 'pointerOutRelease', true);
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        // Drag start only when pointer down
        this.parent.on('pointerdown', this.onPointIn, this); // this.parent.on('pointerover', this.onPointIn, this);

        this.parent.on('pointerup', this.onPointOut, this);

        if (this.pointerOutReleaseEnable) {
          this.parent.on('pointerout', this.onPointOut, this);
        }

        this.parent.on('pointermove', this.onPointerMove, this);
        this.scene.events.on('preupdate', this.preupdate, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        } // GameObject events will be removed when this gameObject destroyed 
        // this.parent.off('pointerdown', this.onPointIn, this);
        // this.parent.off('pointerup', this.onPointOut, this);
        // this.parent.off('pointerout', this.onPointOut, this);
        // this.parent.off('pointermove', this.onPointerMove, this);


        this.scene.events.off('preupdate', this.preupdate, this);
        this.pointer = undefined;

        _get(_getPrototypeOf(DragSpeed.prototype), "shutdown", this).call(this, fromScene);
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
          this.isInTouched = false;
          this.pointer = undefined;
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
      key: "setPointerOutReleaseEnable",
      value: function setPointerOutReleaseEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.pointerOutReleaseEnable = enable;
        return this;
      }
    }, {
      key: "isDown",
      get: function get() {
        return this.pointer && this.pointer.isDown;
      }
    }, {
      key: "isUp",
      get: function get() {
        return !this.isDown;
      }
    }, {
      key: "dx",
      get: function get() {
        return this.x - this.preX;
      }
    }, {
      key: "dy",
      get: function get() {
        return this.y - this.preY;
      }
    }, {
      key: "dt",
      get: function get() {
        var game = this.scene.sys.game;
        var delta = game.loop.delta;
        return delta;
      }
    }, {
      key: "speed",
      get: function get() {
        if (this.x === this.preX && this.y === this.preY) {
          return 0;
        }

        var d = DistanceBetween(this.preX, this.preY, this.x, this.y);
        var speed = d / (this.dt * 0.001);
        return speed;
      }
    }, {
      key: "speedX",
      get: function get() {
        return this.dx / (this.dt * 0.001);
      }
    }, {
      key: "speedY",
      get: function get() {
        return this.dy / (this.dt * 0.001);
      } // internal

    }, {
      key: "onPointIn",
      value: function onPointIn(pointer, localX, localY) {
        if (!this.enable || !pointer.isDown || this.pointer !== undefined) {
          return;
        }

        this.pointer = pointer;
        this.localX = localX;
        this.localY = localY;
      }
    }, {
      key: "onPointOut",
      value: function onPointOut(pointer) {
        if (!this.enable || this.pointer !== pointer) {
          return;
        }

        this.pointer = undefined;
      }
    }, {
      key: "onPointerMove",
      value: function onPointerMove(pointer, localX, localY) {
        if (!this.enable || !pointer.isDown || this.pointer !== pointer) {
          return;
        }

        this.localX = localX;
        this.localY = localY;
      }
    }, {
      key: "preupdate",
      value: function preupdate(time, delta) {
        if (!this.enable) {
          return;
        }

        var pointer = this.pointer;
        this.justMoved = false;

        if (pointer && !this.isInTouched) {
          // Touch start
          this.x = pointer.x;
          this.y = pointer.y;
          this.preX = pointer.x;
          this.preY = pointer.y;
          this.isInTouched = true;
          this.holdStartTime = undefined;
          this.emit('touchstart', pointer, this.localX, this.localY);
        } else if (pointer && this.isInTouched) {
          // In touch
          if (this.x === pointer.x && this.y === pointer.y) {
            // Hold
            if (this.holdStartTime === undefined) {
              this.holdStartTime = time;
            } else if (time - this.holdStartTime > this.holdThreshold) {
              this.preX = this.x;
              this.preY = this.y;
            }
          } else {
            // Move
            this.preX = this.x;
            this.preY = this.y;
            this.x = pointer.x;
            this.y = pointer.y;
            this.holdStartTime = undefined;
            this.justMoved = true;
            this.emit('touchmove', pointer, this.localX, this.localY);
          }
        } else if (!pointer && this.isInTouched) {
          // Touch end
          this.isInTouched = false;
          this.holdStartTime = undefined;
          this.emit('touchend', pointer);
        }
      }
    }]);

    return DragSpeed;
  }(ComponentBase);

  var DragSpeedPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(DragSpeedPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(DragSpeedPlugin);

    function DragSpeedPlugin(pluginManager) {
      _classCallCheck(this, DragSpeedPlugin);

      return _super.call(this, pluginManager);
    }

    _createClass(DragSpeedPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        return new DragSpeed(gameObject, config);
      }
    }]);

    return DragSpeedPlugin;
  }(Phaser.Plugins.BasePlugin);

  return DragSpeedPlugin;

})));
