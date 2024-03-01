(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexpathfollowerplugin = factory());
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

  var GetValue = Phaser.Utils.Objects.GetValue;
  var Vector2 = Phaser.Math.Vector2;
  var DegToRad = Phaser.Math.DegToRad;
  var AngleBetween = Phaser.Math.Angle.Between;
  var Linear = Phaser.Math.Linear;
  var PathFollower = /*#__PURE__*/function (_ComponentBase) {
    _inherits(PathFollower, _ComponentBase);
    function PathFollower(gameObject, config) {
      var _this;
      _classCallCheck(this, PathFollower);
      _this = _callSuper(this, PathFollower, [gameObject, {
        eventEmitter: false
      }]);
      // No event emitter
      // this.parent = gameObject;

      _this._t = 0;
      _this.pathVector = new Vector2();
      _this.spacePoints = undefined;
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(PathFollower, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setPath(GetValue(o, 'path', undefined));
        var rotateToPath = GetValue(o, 'rotateToPath', false);
        var rotationOffset = GetValue(o, 'rotationOffset', undefined);
        if (rotationOffset === undefined) {
          rotationOffset = DegToRad(GetValue(o, 'angleOffset', 0));
        }
        this.setRotateToPath(rotateToPath, rotationOffset);
        var spacedPoints = GetValue(o, 'spacedPoints', false);
        if (spacedPoints) {
          this.setSpacedPointsMode(GetValue(spacedPoints, 'divisions', undefined), GetValue(spacedPoints, 'stepRate', 10));
        } else {
          this.setSpacedPointsMode(false);
        }
        var t = GetValue(o, 't', undefined);
        if (t !== undefined) {
          this.setT(t);
        }
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          path: this.path,
          t: this.t,
          rotateToPath: this.rotateToPath,
          rotationOffset: this.rotationOffset
        };
      }
    }, {
      key: "setPath",
      value: function setPath(path) {
        this.path = path;
        return this;
      }
    }, {
      key: "setT",
      value: function setT(t) {
        this.t = t;
        return this;
      }
    }, {
      key: "t",
      get: function get() {
        return this._t;
      },
      set: function set(value) {
        this._t = value;
        this.update();
      }
    }, {
      key: "setRotateToPath",
      value: function setRotateToPath(rotateToPath, rotationOffset) {
        this.rotateToPath = rotateToPath;
        this.rotationOffset = rotationOffset;
        return this;
      }
    }, {
      key: "setSpacedPointsMode",
      value: function setSpacedPointsMode(divisions, stepRate) {
        if (!divisions && !stepRate) {
          this.spacePoints = undefined;
        } else {
          this.spacePoints = this.path.getSpacedPoints(divisions, stepRate, this.spacePoints);
          // Add point at t=1
          this.spacePoints.push(this.path.getPoint(1));
        }
        return this;
      }
    }, {
      key: "getPoint",
      value: function getPoint(t) {
        if (this.spacePoints === undefined) {
          return this.path.getPoint(this.t, this.pathVector);
        } else {
          var start = (this.spacePoints.length - 1) * t;
          var index = Math.floor(start);
          var p0 = this.spacePoints[index],
            p1 = this.spacePoints[index + 1];
          if (!p1) {
            this.pathVector.x = p0.x;
            this.pathVector.y = p0.y;
          } else {
            var remainderT = start - index;
            this.pathVector.x = Linear(p0.x, p1.x, remainderT);
            this.pathVector.y = Linear(p0.y, p1.y, remainderT);
          }
          return this.pathVector;
        }
      }
    }, {
      key: "update",
      value: function update() {
        if (this.path === undefined) {
          return;
        }
        var gameObject = this.parent;
        var curX = gameObject.x,
          curY = gameObject.y;
        this.pathVector = this.getPoint(this._t);
        var newX = this.pathVector.x,
          newY = this.pathVector.y;
        if (curX === newX && curY === newY) {
          return;
        }
        gameObject.setPosition(newX, newY);
        if (this.rotateToPath) {
          gameObject.rotation = AngleBetween(curX, curY, newX, newY) + this.rotationOffset;
        }
      }
    }]);
    return PathFollower;
  }(ComponentBase);

  var PathFollowerPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(PathFollowerPlugin, _Phaser$Plugins$BaseP);
    function PathFollowerPlugin(pluginManager) {
      _classCallCheck(this, PathFollowerPlugin);
      return _callSuper(this, PathFollowerPlugin, [pluginManager]);
    }
    _createClass(PathFollowerPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        return new PathFollower(gameObject, config);
      }
    }]);
    return PathFollowerPlugin;
  }(Phaser.Plugins.BasePlugin);

  return PathFollowerPlugin;

}));
