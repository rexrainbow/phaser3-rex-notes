(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdragrotateplugin = factory());
}(this, (function () { 'use strict';

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

  var GetValue = Phaser.Utils.Objects.GetValue;
  var DistanceBetween = Phaser.Math.Distance.Between;
  var GetAngle = Phaser.Math.Angle.Between;
  var WrapAngle = Phaser.Math.Angle.Wrap;
  var RadToDeg = Phaser.Math.RadToDeg;

  var DragRotate = /*#__PURE__*/function () {
    function DragRotate(scene, config) {
      _classCallCheck(this, DragRotate);

      this.scene = scene; // Event emitter

      this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));
      this._enable = undefined;
      this._deltaRotation = undefined;
      this.resetFromJSON(config);
      this.boot();
    }

    _createClass(DragRotate, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.setEnable(GetValue(o, "enable", true));
        this.setOrigin(o);
        this.setRadius(GetValue(o, 'maxRadius', 100), GetValue(o, 'minRadius', 0));
        this.state = TOUCH0;
      }
    }, {
      key: "boot",
      value: function boot() {
        this.scene.input.on('pointerdown', this.onPointerDown, this);
        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.events.once('shutdown', this.destroy, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown() {
        if (!this.scene) {
          return;
        }

        this.destroyEventEmitter();
        this.scene.input.off('pointerdown', this.onPointerDown, this);
        this.scene.input.off('pointerup', this.onPointerUp, this);
        this.scene.input.off('pointermove', this.onPointerMove, this);
        this.scene.events.off('shutdown', this.destroy, this);
        this.scene = undefined;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
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
        if (y === undefined) {
          var point = x;
          x = GetValue(point, 'x', 0);
          y = GetValue(point, 'y', 0);
        }

        this.x = x;
        this.y = y;
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
      key: "contains",
      value: function contains(x, y) {
        var r = DistanceBetween(this.x, this.y, x, y);
        return r >= this.minRadius && r <= this.maxRadius;
      }
    }, {
      key: "onPointerDown",
      value: function onPointerDown(pointer) {
        if (!this.enable || this.pointer) {
          return;
        }

        if (!this.contains(pointer.worldX, pointer.worldY)) {
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
          case TOUCH0:
            if (this.contains(pointer.worldX, pointer.worldY)) {
              this.onDragStart(pointer);
            }

            break;

          case TOUCH1:
            if (this.contains(pointer.worldX, pointer.worldY)) {
              this.onDrag();
            } else {
              this.onDragEnd();
            }

            break;
        }
      }
    }, {
      key: "dragCancel",
      value: function dragCancel() {
        if (this.state === TOUCH1) {
          this.onDragEnd();
        }

        this.pointer = undefined;
        this.state = TOUCH0;
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart(pointer) {
        this.pointer = pointer;
        this.state = TOUCH1;
        this._deltaRotation = undefined;
        this.emit('dragstart', this);
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.pointer = undefined;
        this.state = TOUCH0;
        this._deltaRotation = undefined;
        this.emit('dragend', this);
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        this._deltaRotation = undefined;
        this.emit('drag', this);
      }
    }, {
      key: "deltaRotation",
      get: function get() {
        if (this.state === TOUCH0) {
          return 0;
        }

        if (this._deltaRotation === undefined) {
          var p0 = this.pointer.prevPosition,
              p1 = this.pointer.position;
          var a0 = GetAngle(this.x, this.y, p0.x, p0.y),
              a1 = GetAngle(this.x, this.y, p1.x, p1.y);
          this._deltaRotation = WrapAngle(a1 - a0);
        }

        return this._deltaRotation;
      }
    }, {
      key: "deltaAngle",
      get: function get() {
        if (this.state === TOUCH0) {
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
  }();

  Object.assign(DragRotate.prototype, EventEmitterMethods);
  var TOUCH0 = 0;
  var TOUCH1 = 1;

  var DragRotatePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(DragRotatePlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(DragRotatePlugin);

    function DragRotatePlugin(pluginManager) {
      _classCallCheck(this, DragRotatePlugin);

      return _super.call(this, pluginManager);
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

})));
