(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexviewportcoordinateplugin = factory());
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

  var ViewportCoordinatePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(ViewportCoordinatePlugin, _Phaser$Plugins$BaseP);
    function ViewportCoordinatePlugin(pluginManager) {
      _classCallCheck(this, ViewportCoordinatePlugin);
      return _callSuper(this, ViewportCoordinatePlugin, [pluginManager]);
    }
    _createClass(ViewportCoordinatePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject, viewport, vpx, vpy, transformCallback) {
        return AddViewportCoordinateProperties(gameObject, viewport, vpx, vpy, transformCallback);
      }
    }, {
      key: "vpxyToxy",
      value: function vpxyToxy(vpx, vpy, viewport, out) {
        return VPXYToXY(vpx, vpy, viewport, out);
      }
    }]);
    return ViewportCoordinatePlugin;
  }(Phaser.Plugins.BasePlugin);

  return ViewportCoordinatePlugin;

}));
