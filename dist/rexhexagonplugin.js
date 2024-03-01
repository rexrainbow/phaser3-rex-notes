(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexhexagonplugin = factory());
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

  var SQRT3$1 = Math.sqrt(3);
  var Width = function Width(hexagon) {
    return hexagon.type === 0 ? 2 * hexagon.size : SQRT3$1 * hexagon.size;
  };

  var SQRT3 = Math.sqrt(3);
  var Height = function Height(hexagon) {
    return hexagon.type === 0 ? SQRT3 * hexagon.size : 2 * hexagon.size;
  };

  var InitPoints = function InitPoints(count) {
    var points = [];
    for (var i = 0; i < count; i++) {
      points.push({
        x: 0,
        y: 0
      });
    }
    return points;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  var DEG_TO_RAD = Math.PI / 180;

  /**
   * Convert the given angle from degrees, to the equivalent angle in radians.
   *
   * @function Phaser.Math.DegToRad
   * @since 3.0.0
   *
   * @param {integer} degrees - The angle (in degrees) to convert to radians.
   *
   * @return {number} The given angle converted to radians.
   */
  var DegToRad = function DegToRad(degrees) {
    return degrees * DEG_TO_RAD;
  };

  var SetPoints = function SetPoints(x, y, size, type, points) {
    if (points === undefined) {
      points = InitPoints(6);
    }
    if (size === undefined) ; else if (typeof size === 'number') {
      var angleOffset = type === 0 ? 0 : -30;
      var angleDeg, angleRad;
      for (var i = 0; i < 6; i++) {
        angleDeg = 60 * i + angleOffset;
        angleRad = DegToRad(angleDeg);
        points[i].x = x + size * Math.cos(angleRad);
        points[i].y = y + size * Math.sin(angleRad);
      }
    } else {
      var config = size;
      var w = config.width;
      var h = config.height;
      var halfW = w / 2;
      var quarterW = w / 4;
      var halfH = h / 2;
      var quarterH = h / 4;
      if (type === 0) {
        points[0].x = x + halfW;
        points[0].y = y;
        points[1].x = x + quarterW;
        points[1].y = y + halfH;
        points[2].x = x - quarterW;
        points[2].y = y + halfH;
        points[3].x = x - halfW;
        points[3].y = y;
        points[4].x = x - quarterW;
        points[4].y = y - halfH;
        points[5].x = x + quarterW;
        points[5].y = y - halfH;
      } else {
        points[0].x = x + halfW;
        points[0].y = y - quarterH;
        points[1].x = x + halfW;
        points[1].y = y + quarterH;
        points[2].x = x;
        points[2].y = y + halfH;
        points[3].x = x - halfW;
        points[3].y = y + quarterH;
        points[4].x = x - halfW;
        points[4].y = y - quarterH;
        points[5].x = x;
        points[5].y = y - halfH;
      }
    }
    return points;
  };

  var Polygon = Phaser.Geom.Polygon;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var Line = Phaser.Geom.Line;
  var Hexagon = /*#__PURE__*/function (_Polygon) {
    _inherits(Hexagon, _Polygon);
    function Hexagon(x, y, size, orientationType) {
      var _this;
      _classCallCheck(this, Hexagon);
      _this = _callSuper(this, Hexagon);
      if (IsPlainObject(x)) {
        var config = x;
        x = GetValue(config, 'x', 0);
        y = GetValue(config, 'y', 0);
        size = GetValue(config, 'size', 0);
        orientationType = GetValue(config, 'type', 1);
      }
      var points = _this.points;
      for (var i = 0; i < 6; i++) {
        points.push({});
      }
      _this.setTo(x, y, size, orientationType);
      return _this;
    }

    // override
    _createClass(Hexagon, [{
      key: "setTo",
      value: function setTo(x, y, size, orientationType) {
        if (typeof orientationType === 'string') {
          orientationType = ORIENTATIONTYPE[orientationType];
        }
        this._x = x;
        this._y = y;
        this._size = size;
        this._orientationType = orientationType;
        SetPoints(x, y, size, orientationType, this.points);
        this.calculateArea();
        this.width = Width(this);
        this.height = Height(this);
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
      key: "centerX",
      get: function get() {
        return this.x;
      },
      set: function set(value) {
        this.x = value;
      }
    }, {
      key: "centerY",
      get: function get() {
        return this.y;
      },
      set: function set(value) {
        this.y = value;
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
        return this.x - this.width / 2;
      },
      set: function set(value) {
        this.x += value - this.left;
      }
    }, {
      key: "right",
      get: function get() {
        return this.x + this.width / 2;
      },
      set: function set(value) {
        this.x += value - this.right;
      }
    }, {
      key: "top",
      get: function get() {
        return this.y - this.height / 2;
      },
      set: function set(value) {
        this.y += value - this.top;
      }
    }, {
      key: "bottom",
      get: function get() {
        return this.y + this.height / 2;
      },
      set: function set(value) {
        this.y += value - this.bottom;
      }
    }, {
      key: "size",
      get: function get() {
        return this._size;
      },
      set: function set(value) {
        this.setTo(this._x, this._y, value, this._orientationType);
      }
    }, {
      key: "setSize",
      value: function setSize(value) {
        this.size = value;
        return this;
      }
    }, {
      key: "orientationType",
      get: function get() {
        return this._orientationType;
      },
      set: function set(value) {
        this.setTo(this._x, this._y, this._size, value);
      }
    }, {
      key: "setType",
      value: function setType(orientationType) {
        this.orientationType = orientationType;
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return this.size <= 0;
      }
    }, {
      key: "getEdge",
      value: function getEdge(idx, line) {
        if (line === undefined) {
          line = new Line();
        }
        var p0 = this.points[idx];
        var p1 = this.points[(idx + 1) % 6];
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
    }, {
      key: "getLineE",
      value: function getLineE(line) {
        return this.getEdge(4, line);
      }
    }, {
      key: "getLineF",
      value: function getLineF(line) {
        return this.getEdge(5, line);
      }
    }]);
    return Hexagon;
  }(Polygon);
  var ORIENTATIONTYPE = {
    'flat': 0,
    'y': 0,
    'pointy': 1,
    'x': 1
  };

  // use `rexHexagon` to prevent name conflict
  Phaser.Geom.rexHexagon = Hexagon;

  var HexagonPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(HexagonPlugin, _Phaser$Plugins$BaseP);
    function HexagonPlugin(pluginManager) {
      _classCallCheck(this, HexagonPlugin);
      return _callSuper(this, HexagonPlugin, [pluginManager]);
    }
    _createClass(HexagonPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(x, y, size, type) {
        return new Hexagon(x, y, size, type);
      }
    }]);
    return HexagonPlugin;
  }(Phaser.Plugins.BasePlugin);

  return HexagonPlugin;

}));
