(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexspiralcurveplugin = factory());
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

  var Base = Phaser.Curves.Curve;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var DegToRad = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
  var Vector2 = Phaser.Math.Vector2;
  var GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;
  var Linear = Phaser.Math.Linear;
  var SpiralCurve = /*#__PURE__*/function (_Base) {
    _inherits(SpiralCurve, _Base);
    function SpiralCurve(x, y, startRadius, endRadius, startAngle, endAngle, rotation) {
      var _this;
      _classCallCheck(this, SpiralCurve);
      var startX, endX, easeX;
      var startY, endY, easeY;
      var startXRadius, endXRadius, easeXRadius;
      var startYRadius, endYRadius, easeYRadius;
      var easeAngle;
      if (_typeof(x) === 'object') {
        var config = x;
        if (config.hasOwnProperty('x')) {
          startX = config.x;
          endX = startX;
        } else {
          startX = GetValue(config, 'startX', 0);
          endX = GetValue(config, 'endX', startX);
        }
        easeX = GetValue(config, 'easeX', 'Linear');
        if (config.hasOwnProperty('y')) {
          startY = config.y;
          endY = startY;
        } else {
          startY = GetValue(config, 'startY', 0);
          endY = GetValue(config, 'endY', startY);
        }
        easeY = GetValue(config, 'easeY', 'Linear');
        if (config.hasOwnProperty('startRadius')) {
          startXRadius = config.startRadius;
          startYRadius = startXRadius;
          endXRadius = GetValue(config, 'endRadius', startXRadius);
          endYRadius = endXRadius;
        } else {
          if (config.hasOwnProperty('xRadius')) {
            startXRadius = config.xRadius;
            endXRadius = startXRadius;
          } else {
            startXRadius = GetValue(config, 'startXRadius', 0);
            endXRadius = GetValue(config, 'endXRadius', startXRadius);
          }
          if (config.hasOwnProperty('yRadius')) {
            startYRadius = config.yRadius;
            endYRadius = startYRadius;
          } else {
            startYRadius = GetValue(config, 'startYRadius', startXRadius);
            endYRadius = GetValue(config, 'endYRadius', endXRadius);
          }
        }
        easeXRadius = GetValue(config, 'easeXRadius', 'Linear');
        easeYRadius = GetValue(config, 'easeXRadius', easeXRadius);
        startAngle = GetValue(config, 'startAngle', 0);
        endAngle = GetValue(config, 'endAngle', 360);
        easeAngle = GetValue(config, 'easeAngle', 'Linear');
        rotation = GetValue(config, 'rotation', 0);
      } else {
        if (x === undefined) {
          x = 0;
        }
        if (y === undefined) {
          y = 0;
        }
        if (startRadius === undefined) {
          startRadius = 0;
        }
        if (endRadius === undefined) {
          endRadius = 0;
        }
        if (startAngle === undefined) {
          startAngle = 0;
        }
        if (endAngle === undefined) {
          endAngle = 360;
        }
        if (rotation === undefined) {
          rotation = 0;
        }
        startX = x;
        endX = x;
        easeX = 'Linear';
        startY = y;
        endY = y;
        easeY = 'Linear';
        startXRadius = startRadius;
        endXRadius = endRadius;
        easeXRadius = 'Linear';
        startYRadius = startRadius;
        endYRadius = endRadius;
        easeYRadius = 'Linear';
        easeAngle = 'Linear';
      }
      _this = _callSuper(this, SpiralCurve, ['SpiralCurve']);
      _this.p0 = new Vector2(startX, startY);
      _this.p1 = new Vector2(endX, endY);
      _this._easeX = easeX;
      _this._easeXFunction = GetEaseFunction(easeX);
      _this._easeY = easeY;
      _this._easeYFunction = GetEaseFunction(easeY);
      _this._startXRadius = startXRadius;
      _this._endXRadius = endXRadius;
      _this._easeXRadius = easeXRadius;
      _this._easeXRadiusFunction = GetEaseFunction(easeXRadius);
      _this._startYRadius = startYRadius;
      _this._endYRadius = endYRadius;
      _this._easeYRadius = easeYRadius;
      _this._easeYRadiusFunction = GetEaseFunction(easeYRadius);
      _this._startAngle = DegToRad(startAngle);
      _this._endAngle = DegToRad(endAngle);
      _this._easeAngle = easeAngle;
      _this._easeAngleFunction = GetEaseFunction(easeAngle);
      _this._rotation = DegToRad(rotation);
      return _this;
    }
    _createClass(SpiralCurve, [{
      key: "getResolution",
      value: function getResolution(divisions) {
        return divisions * 2;
      }
    }, {
      key: "getStartPoint",
      value: function getStartPoint(out) {
        return this.getPoint(0, out);
      }
    }, {
      key: "getPoint",
      value: function getPoint(t, out) {
        if (out === undefined) {
          out = new Vector2();
        }
        var ox = Linear(this.p0.x, this.p1.x, this._easeXFunction(t));
        var oy = Linear(this.p0.y, this.p1.y, this._easeYFunction(t));
        var angle = Linear(this._startAngle, this._endAngle, this._easeAngleFunction(t));
        var xRadius = Linear(this._startXRadius, this._endXRadius, this._easeXRadiusFunction(t));
        var yRadius = Linear(this._startYRadius, this._endYRadius, this._easeYRadiusFunction(t));
        var x = ox + xRadius * Math.cos(angle);
        var y = oy + yRadius * Math.sin(angle);
        if (this._rotation !== 0) {
          var cos = Math.cos(this._rotation);
          var sin = Math.sin(this._rotation);
          var tx = x - ox;
          var ty = y - oy;

          // Rotate the point about the center of the ellipse.
          x = tx * cos - ty * sin + ox;
          y = tx * sin + ty * cos + oy;
        }
        return out.set(x, y);
      }
    }, {
      key: "x",
      get: function get() {
        return this.p0.x;
      },
      set: function set(value) {
        var dx = value - this.p0.x;
        this.p0.x += dx;
        this.p1.x += dx;
      }
    }, {
      key: "y",
      get: function get() {
        return this.p0.y;
      },
      set: function set(value) {
        var dy = value - this.p0.y;
        this.p0.y += dy;
        this.p1.y += dy;
      }
    }, {
      key: "setStartX",
      value: function setStartX(value) {
        this.startX = value;
        return this;
      }
    }, {
      key: "startX",
      get: function get() {
        return this.p0.x;
      },
      set: function set(value) {
        this.p0.x = value;
      }
    }, {
      key: "setEndX",
      value: function setEndX(value) {
        this.endX = value;
        return this;
      }
    }, {
      key: "endX",
      get: function get() {
        return this.p1.x;
      },
      set: function set(value) {
        this.p1.x = value;
      }
    }, {
      key: "setEaseX",
      value: function setEaseX(value) {
        this.easeX = value;
        return this;
      }
    }, {
      key: "easeX",
      get: function get() {
        return this._easeX;
      },
      set: function set(value) {
        this._easeX = value;
        this._easeXFunction = GetEaseFunction(value);
      }
    }, {
      key: "setStartY",
      value: function setStartY(value) {
        this.startY = value;
        return this;
      }
    }, {
      key: "startY",
      get: function get() {
        return this.p0.y;
      },
      set: function set(value) {
        this.p0.y = value;
      }
    }, {
      key: "setEndY",
      value: function setEndY(value) {
        this.endY = value;
        return this;
      }
    }, {
      key: "endY",
      get: function get() {
        return this.p1.y;
      },
      set: function set(value) {
        this.p1.y = value;
      }
    }, {
      key: "setEaseY",
      value: function setEaseY(value) {
        this.easeY = value;
        return this;
      }
    }, {
      key: "easeY",
      get: function get() {
        return this._easeY;
      },
      set: function set(value) {
        this._easeY = value;
        this._easeYFunction = GetEaseFunction(value);
      }
    }, {
      key: "setXRadius",
      value: function setXRadius(value) {
        this.xRadius = value;
        return this;
      }
    }, {
      key: "xRadius",
      get: function get() {
        return Math.max(this._startXRadius, this._endXRadius);
      },
      set: function set(value) {
        this._startXRadius = value;
        this._endXRadius = value;
      }
    }, {
      key: "setStartXRadius",
      value: function setStartXRadius(value) {
        this.startXRadius = value;
        return this;
      }
    }, {
      key: "startXRadius",
      get: function get() {
        return this._startXRadius;
      },
      set: function set(value) {
        this._startXRadius = value;
      }
    }, {
      key: "setEndXRadius",
      value: function setEndXRadius(value) {
        this.endXRadius = value;
        return this;
      }
    }, {
      key: "endXRadius",
      get: function get() {
        return this._endXRadius;
      },
      set: function set(value) {
        this._endXRadius = value;
      }
    }, {
      key: "setEaseXRadius",
      value: function setEaseXRadius(value) {
        this.easeXRadius = value;
        return this;
      }
    }, {
      key: "easeXRadius",
      get: function get() {
        return this._easeXRadius;
      },
      set: function set(value) {
        this._easeXRadius = value;
        this._easeXRadiusFunction = GetEaseFunction(value);
      }
    }, {
      key: "setYRadius",
      value: function setYRadius(value) {
        this.startYRadius = value;
        this.endYRadius = value;
        return this;
      }
    }, {
      key: "yRadius",
      get: function get() {
        return Math.max(this._startYRadius, this._endYRadius);
      },
      set: function set(value) {
        this._startYRadius = value;
        this._endYRadius = value;
      }
    }, {
      key: "setStartYRadius",
      value: function setStartYRadius(value) {
        this.startYRadius = value;
        return this;
      }
    }, {
      key: "startYRadius",
      get: function get() {
        return this._startYRadius;
      },
      set: function set(value) {
        this._startYRadius = value;
      }
    }, {
      key: "setEndYRadius",
      value: function setEndYRadius(value) {
        this.endYRadius = value;
        return this;
      }
    }, {
      key: "endYRadius",
      get: function get() {
        return this._endYRadius;
      },
      set: function set(value) {
        this._endYRadius = value;
      }
    }, {
      key: "setEaseYRadius",
      value: function setEaseYRadius(value) {
        this.easeYRadius = value;
        return this;
      }
    }, {
      key: "easeYRadius",
      get: function get() {
        return this._easeYRadius;
      },
      set: function set(value) {
        this._easeYRadius = value;
        this._easeYRadiusFunction = GetEaseFunction(value);
      }
    }, {
      key: "setWidth",
      value: function setWidth(value) {
        var ratio = this.xRadius / value;
        this._startXRadius *= ratio;
        this._endXRadius *= ratio;
        return this;
      }
    }, {
      key: "setHeight",
      value: function setHeight(value) {
        var ratio = this.yRadius / value;
        this._startYRadius *= ratio;
        this._endYRadius *= ratio;
        return this;
      }
    }, {
      key: "setStartAngle",
      value: function setStartAngle(value) {
        this.startAngle = value;
        return this;
      }
    }, {
      key: "startAngle",
      get: function get() {
        return RadToDeg(this._startAngle);
      },
      set: function set(value) {
        this._startAngle = DegToRad(value);
      }
    }, {
      key: "setEndAngle",
      value: function setEndAngle(value) {
        this.endAngle = value;
        return this;
      }
    }, {
      key: "endAngle",
      get: function get() {
        return RadToDeg(this._endAngle);
      },
      set: function set(value) {
        this._endAngle = DegToRad(value);
      }
    }, {
      key: "setEaseAngle",
      value: function setEaseAngle(value) {
        this.easeAngle = value;
        return this;
      }
    }, {
      key: "easeAngle",
      get: function get() {
        return this._easeAngle;
      },
      set: function set(value) {
        this._easeAngle = value;
        this._easeAngleFunction = GetEaseFunction(value);
      }
    }, {
      key: "setRotation",
      value: function setRotation(value) {
        this.rotation = value;
        return this;
      }
    }, {
      key: "angle",
      get: function get() {
        return RadToDeg(this._rotation);
      },
      set: function set(value) {
        this._rotation = DegToRad(value);
      }
    }, {
      key: "rotation",
      get: function get() {
        return this._rotation;
      },
      set: function set(value) {
        this._rotation = value;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          type: this.type,
          startX: this.p0.x,
          startY: this.p0.y,
          endX: this.p1.x,
          endY: this.p1.y,
          startXRadius: this._startXRadius,
          endXRadius: this._endXRadius,
          easeXRadius: this._easeXRadius,
          startYRadius: this._startYRadius,
          endYRadius: this._endYRadius,
          easeYRadius: this._easeYRadius,
          startAngle: RadToDeg(this._startAngle),
          endAngle: RadToDeg(this._endAngle),
          easeAngle: this._easeAngle,
          rotation: RadToDeg(this._rotation)
        };
      }
    }], [{
      key: "fromJSON",
      value: function fromJSON(data) {
        return new SpiralCurve(data);
      }
    }]);
    return SpiralCurve;
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

  var SpiralCurvePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(SpiralCurvePlugin, _Phaser$Plugins$BaseP);
    function SpiralCurvePlugin(pluginManager) {
      _classCallCheck(this, SpiralCurvePlugin);
      return _callSuper(this, SpiralCurvePlugin, [pluginManager]);
    }
    _createClass(SpiralCurvePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(x, y, startRadius, endRadius, startAngle, endAngle, rotation) {
        return new SpiralCurve(x, y, startRadius, endRadius, startAngle, endAngle, rotation);
      }
    }]);
    return SpiralCurvePlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.Curve.SpiralCurve', SpiralCurve);

  return SpiralCurvePlugin;

}));
