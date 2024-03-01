(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexrhombusplugin = factory());
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

  var Offset = function Offset(polygon, x, y) {
    var points = polygon.points,
      point;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
      point = points[i];
      point.x += x;
      point.y += y;
    }
    return polygon;
  };

  var Polygon = Phaser.Geom.Polygon;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var Line = Phaser.Geom.Line;
  var Rhombus = /*#__PURE__*/function (_Polygon) {
    _inherits(Rhombus, _Polygon);
    function Rhombus(x, y, width, height) {
      var _this;
      _classCallCheck(this, Rhombus);
      _this = _callSuper(this, Rhombus);
      if (IsPlainObject(x)) {
        var config = x;
        x = GetValue(config, 'x', 0);
        y = GetValue(config, 'y', 0);
        width = GetValue(config, 'width', 0);
        height = GetValue(config, 'height', 0);
      }
      var points = _this.points;
      for (var i = 0; i < 4; i++) {
        points.push({});
      }
      _this.setTo(x, y, width, height);
      return _this;
    }

    // override
    _createClass(Rhombus, [{
      key: "setTo",
      value: function setTo(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        var points = this.points;
        var centerX = this.centerX,
          centerY = this.centerY;
        var helfWidth = width / 2;
        var helfHeight = height / 2;
        // 0
        points[0].x = centerX + helfWidth;
        points[0].y = centerY;
        // 90
        points[1].x = centerX;
        points[1].y = centerY + helfHeight;
        // 180
        points[2].x = centerX - helfWidth;
        points[2].y = centerY;
        // 270
        points[3].x = centerX;
        points[3].y = centerY - helfHeight;
        this.calculateArea();
        return this;
      }
    }, {
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        var offsetX = value - this.x;
        if (offsetX === 0) {
          return;
        }
        Offset(this, offsetX, 0);
        this._x = value;
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        var offsetY = value - this.y;
        if (offsetY === 0) {
          return;
        }
        Offset(this, 0, offsetY);
        this._y = value;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        var offsetX = x - this.x;
        var offsetY = y - this.y;
        if (offsetX === 0 && offsetY === 0) {
          return this;
        }
        Offset(this, offsetX, offsetY);
        this._x = x;
        this._y = y;
        return this;
      }
    }, {
      key: "left",
      get: function get() {
        return this.x;
      },
      set: function set(value) {
        this.x += value - this.left;
      }
    }, {
      key: "right",
      get: function get() {
        return this.x + this.width;
      },
      set: function set(value) {
        this.x += value - this.right;
      }
    }, {
      key: "top",
      get: function get() {
        return this.y;
      },
      set: function set(value) {
        this.y += value - this.top;
      }
    }, {
      key: "bottom",
      get: function get() {
        return this.y + this.height;
      },
      set: function set(value) {
        this.y += value - this.bottom;
      }
    }, {
      key: "centerX",
      get: function get() {
        return this.x + this.width / 2;
      },
      set: function set(value) {
        this.x += value - this.centerX;
      }
    }, {
      key: "centerY",
      get: function get() {
        return this.y + this.height / 2;
      },
      set: function set(value) {
        this.y += value - this.centetY;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this.setTo(this._x, this._y, value, this._height);
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this.setTo(this._x, this._y, this._width, value);
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.setTo(this._x, this._y, width, height);
        return this;
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return this.width <= 0 || this.height <= 0;
      }
    }, {
      key: "getEdge",
      value: function getEdge(idx, line) {
        if (line === undefined) {
          line = new Line();
        }
        var p0 = this.points[idx];
        var p1 = this.points[(idx + 1) % 4];
        line.setTo(p0.x, p0.y, p1.x, p1.y);
        return line;
      }
    }, {
      key: "getLineA",
      value: function getLineA(line) {
        return this.getEdge(0, line);
      }
    }, {
      key: "getLineB",
      value: function getLineB(line) {
        return this.getEdge(1, line);
      }
    }, {
      key: "getLineC",
      value: function getLineC(line) {
        return this.getEdge(2, line);
      }
    }, {
      key: "getLineD",
      value: function getLineD(line) {
        return this.getEdge(3, line);
      }
    }]);
    return Rhombus;
  }(Polygon); // use `rexRhombus` to prevent name conflict
  Phaser.Geom.rexRhombus = Rhombus;

  var RhombusPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(RhombusPlugin, _Phaser$Plugins$BaseP);
    function RhombusPlugin(pluginManager) {
      _classCallCheck(this, RhombusPlugin);
      return _callSuper(this, RhombusPlugin, [pluginManager]);
    }
    _createClass(RhombusPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(x, y, width, height) {
        return new Rhombus(x, y, width, height);
      }
    }]);
    return RhombusPlugin;
  }(Phaser.Plugins.BasePlugin);

  return RhombusPlugin;

}));
