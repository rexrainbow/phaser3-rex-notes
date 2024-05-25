(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexquadshapeplugin = factory());
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

  /*
  src: {
      fillColor, 
      fillAlpha, 
      pathData, 
      pathIndexes  // Earcut(pathData)
  }
  */

  var Utils$1 = Phaser.Renderer.WebGL.Utils;
  var FillPathWebGL = function FillPathWebGL(pipeline, calcMatrix, src, alpha, dx, dy) {
    var fillTintColor = Utils$1.getTintAppendFloatAlpha(src.fillColor, src.fillAlpha * alpha);
    var path = src.pathData;
    var pathIndexes = src.pathIndexes;
    for (var i = 0; i < pathIndexes.length; i += 3) {
      var p0 = pathIndexes[i] * 2;
      var p1 = pathIndexes[i + 1] * 2;
      var p2 = pathIndexes[i + 2] * 2;
      var x0 = path[p0 + 0] - dx;
      var y0 = path[p0 + 1] - dy;
      var x1 = path[p1 + 0] - dx;
      var y1 = path[p1 + 1] - dy;
      var x2 = path[p2 + 0] - dx;
      var y2 = path[p2 + 1] - dy;
      var tx0 = calcMatrix.getX(x0, y0);
      var ty0 = calcMatrix.getY(x0, y0);
      var tx1 = calcMatrix.getX(x1, y1);
      var ty1 = calcMatrix.getY(x1, y1);
      var tx2 = calcMatrix.getX(x2, y2);
      var ty2 = calcMatrix.getY(x2, y2);
      pipeline.batchTri(src, tx0, ty0, tx1, ty1, tx2, ty2, 0, 0, 1, 1, fillTintColor, fillTintColor, fillTintColor, 2);
    }
  };

  /*
  src: {
      strokeColor,
      strokeAlpha,
      pathData,
      lineWidth,
      closePath
  }
  */
  var Utils = Phaser.Renderer.WebGL.Utils;
  var StrokePathWebGL = function StrokePathWebGL(pipeline, src, alpha, dx, dy) {
    var strokeTint = pipeline.strokeTint;
    var strokeTintColor = Utils.getTintAppendFloatAlpha(src.strokeColor, src.strokeAlpha * alpha);
    strokeTint.TL = strokeTintColor;
    strokeTint.TR = strokeTintColor;
    strokeTint.BL = strokeTintColor;
    strokeTint.BR = strokeTintColor;
    var path = src.pathData;
    var pathLength = path.length - 1;
    var lineWidth = src.lineWidth;
    var halfLineWidth = lineWidth / 2;
    var px1 = path[0] - dx;
    var py1 = path[1] - dy;
    if (!src.closePath) {
      pathLength -= 2;
    }
    for (var i = 2; i < pathLength; i += 2) {
      var px2 = path[i] - dx;
      var py2 = path[i + 1] - dy;
      pipeline.batchLine(px1, py1, px2, py2, halfLineWidth, halfLineWidth, lineWidth, i - 2, src.closePath ? i === pathLength - 1 : false);
      px1 = px2;
      py1 = py2;
    }
  };

  var GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;
  var PolygonWebGLRenderer = function PolygonWebGLRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateData();
      src.dirty = false;
    }
    camera.addToRenderList(src);
    var pipeline = renderer.pipelines.set(src.pipeline);
    var result = GetCalcMatrix(src, camera, parentMatrix);
    var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);
    var dx = src._displayOriginX;
    var dy = src._displayOriginY;
    var alpha = camera.alpha * src.alpha;
    renderer.pipelines.preBatch(src);
    if (src.isFilled) {
      FillPathWebGL(pipeline, calcMatrix, src, alpha, dx, dy);
    }
    if (src.isStroked) {
      StrokePathWebGL(pipeline, src, alpha, dx, dy);
    }
    renderer.pipelines.postBatch(src);
  };

  var FillStyleCanvas = function FillStyleCanvas(ctx, src, altColor, altAlpha) {
    var fillColor = altColor ? altColor : src.fillColor;
    var fillAlpha = altAlpha ? altAlpha : src.fillAlpha;
    var red = (fillColor & 0xFF0000) >>> 16;
    var green = (fillColor & 0xFF00) >>> 8;
    var blue = fillColor & 0xFF;
    ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + fillAlpha + ')';
  };

  var LineStyleCanvas = function LineStyleCanvas(ctx, src, altColor, altAlpha) {
    var strokeColor = altColor ? altColor : src.strokeColor;
    var strokeAlpha = altAlpha ? altAlpha : src.strokeAlpha;
    var red = (strokeColor & 0xFF0000) >>> 16;
    var green = (strokeColor & 0xFF00) >>> 8;
    var blue = strokeColor & 0xFF;
    ctx.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + strokeAlpha + ')';
    ctx.lineWidth = src.lineWidth;
  };

  var SetTransform = Phaser.Renderer.Canvas.SetTransform;
  var PolygonCanvasRenderer = function PolygonCanvasRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateData();
      src.dirty = false;
    }
    camera.addToRenderList(src);
    var ctx = renderer.currentContext;
    if (SetTransform(renderer, ctx, src, camera, parentMatrix)) {
      var dx = src._displayOriginX;
      var dy = src._displayOriginY;
      var path = src.pathData;
      var pathLength = path.length - 1;
      var px1 = path[0] - dx;
      var py1 = path[1] - dy;
      ctx.beginPath();
      ctx.moveTo(px1, py1);
      if (!src.closePath) {
        pathLength -= 2;
      }
      for (var i = 2; i < pathLength; i += 2) {
        var px2 = path[i] - dx;
        var py2 = path[i + 1] - dy;
        ctx.lineTo(px2, py2);
      }
      ctx.closePath();
      if (src.isFilled) {
        FillStyleCanvas(ctx, src);
        ctx.fill();
      }
      if (src.isStroked) {
        LineStyleCanvas(ctx, src);
        ctx.stroke();
      }

      //  Restore the context saved in SetTransform
      ctx.restore();
    }
  };

  var Render = {
    renderWebGL: PolygonWebGLRenderer,
    renderCanvas: PolygonCanvasRenderer
  };

  var Shape = Phaser.GameObjects.Shape;
  var PolygnBase = /*#__PURE__*/function (_Shape) {
    _inherits(PolygnBase, _Shape);
    function PolygnBase() {
      _classCallCheck(this, PolygnBase);
      return _callSuper(this, PolygnBase, arguments);
    }
    _createClass(PolygnBase, [{
      key: "fillColor",
      get: function get() {
        return this._fillColor;
      },
      set: function set(value) {
        this._fillColor = value;
        this.isFilled = value != null && this._fillAlpha > 0;
      }
    }, {
      key: "fillAlpha",
      get: function get() {
        return this._fillAlpha;
      },
      set: function set(value) {
        this._fillAlpha = value;
        this.isFilled = value > 0 && this._fillColor != null;
      }

      // Fully override setFillStyle method
    }, {
      key: "setFillStyle",
      value: function setFillStyle(color, alpha) {
        if (alpha === undefined) {
          alpha = 1;
        }
        this.fillColor = color;
        this.fillAlpha = alpha;
        return this;
      }
    }, {
      key: "strokeColor",
      get: function get() {
        return this._strokeColor;
      },
      set: function set(value) {
        this._strokeColor = value;
        this.isStroked = value != null && this._strokeAlpha > 0 && this._lineWidth > 0;
      }
    }, {
      key: "strokeAlpha",
      get: function get() {
        return this._strokeAlpha;
      },
      set: function set(value) {
        this._strokeAlpha = value;
        this.isStroked = value > 0 && this._strokeColor != null && this._lineWidth > 0;
      }
    }, {
      key: "lineWidth",
      get: function get() {
        return this._lineWidth;
      },
      set: function set(value) {
        this._lineWidth = value;
        this.isStroked = value > 0 && this._strokeColor != null;
      }

      // Fully override setStrokeStyle method
    }, {
      key: "setStrokeStyle",
      value: function setStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
          alpha = 1;
        }
        this.lineWidth = lineWidth;
        this.strokeColor = color;
        this.strokeAlpha = alpha;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this.geom.width;
      },
      set: function set(value) {
        this.resize(value, this.height);
      }
    }, {
      key: "height",
      get: function get() {
        return this.geom.height;
      },
      set: function set(value) {
        this.resize(this.width, value);
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        var input = this.input;
        if (input && !input.customHitArea) {
          input.hitArea.width = width;
          input.hitArea.height = height;
        }
        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        this.setSize(width, height);
        return this;
      }
    }]);
    return PolygnBase;
  }(Shape);
  Object.assign(PolygnBase.prototype, Render);

  var HasProperty = function HasProperty(obj, prop) {
    if (!obj) {
      return false;
    }
    if (obj.hasOwnProperty(prop)) {
      return true;
    }
    while (obj) {
      if (Object.getOwnPropertyDescriptor(obj, prop)) {
        return true;
      }
      obj = obj.__proto__;
    }
    return false;
  };

  var InjectPointAccessProperties = function InjectPointAccessProperties(gameObject, key, point) {
    if (!key || HasProperty(gameObject, "".concat(key, "X"))) {
      return;
    }
    Object.defineProperty(gameObject, "".concat(key, "X"), {
      get: function get() {
        return point.x;
      },
      set: function set(value) {
        point.x = value;
        gameObject.dirty = true;
      }
    });
    Object.defineProperty(gameObject, "".concat(key, "Y"), {
      get: function get() {
        return point.y;
      },
      set: function set(value) {
        point.y = value;
        gameObject.dirty = true;
      }
    });
    Object.defineProperty(gameObject, "".concat(key, "T"), {
      get: function get() {
        return point.t;
      },
      set: function set(value) {
        point.t = value;
        gameObject.dirty = true;
      }
    });
  };
  var PointMethods = {
    setTLPosition: function setTLPosition(x, y) {
      this.geom.setTLPosition(x, y);
      this.dirty = true;
      return this;
    },
    setTRPosition: function setTRPosition(x, y) {
      this.geom.setTRPosition(x, y);
      this.dirty = true;
      return this;
    },
    setBLPosition: function setBLPosition(x, y) {
      this.geom.setBLPosition(x, y);
      this.dirty = true;
      return this;
    },
    setBRPosition: function setBRPosition(x, y) {
      this.geom.setBRPosition(x, y);
      this.dirty = true;
      return this;
    },
    resetCornerPosition: function resetCornerPosition() {
      this.geom.resetCornerPosition();
      this.dirty = true;
      return this;
    },
    insertTopSidePoint: function insertTopSidePoint(t, x, y, key) {
      var points = this.geom.topSidePoints;
      if (Array.isArray(t)) {
        var points = t,
          point;
        for (var i = 0, cnt = points.length; i < cnt; i++) {
          point = points[i];
          this.geom.insertTopSidePoint(point.t, point.x, point.y);
          InjectPointAccessProperties(this, point.key, points[points.length - 1]);
        }
      } else {
        this.geom.insertTopSidePoint(t, x, y);
        InjectPointAccessProperties(this, key, points[points.length - 1]);
      }
      this.dirty = true;
      return this;
    },
    insertRightSidePoint: function insertRightSidePoint(t, x, y, key) {
      var points = this.geom.rightSidePoints;
      if (Array.isArray(t)) {
        var points = t,
          point;
        for (var i = 0, cnt = points.length; i < cnt; i++) {
          point = points[i];
          this.geom.insertRightSidePoint(point.t, point.x, point.y);
          InjectPointAccessProperties(this, point.key, points[points.length - 1]);
        }
      } else {
        this.geom.insertRightSidePoint(t, x, y);
        InjectPointAccessProperties(this, key, points[points.length - 1]);
      }
      this.dirty = true;
      return this;
    },
    insertBottomSidePoint: function insertBottomSidePoint(t, x, y, key) {
      var points = this.geom.bottomSidePoints;
      if (Array.isArray(t)) {
        var points = t,
          point;
        for (var i = 0, cnt = points.length; i < cnt; i++) {
          point = points[i];
          this.geom.insertBottomSidePoint(point.t, point.x, point.y);
          InjectPointAccessProperties(this, point.key, points[points.length - 1]);
        }
      } else {
        this.geom.insertBottomSidePoint(t, x, y);
        InjectPointAccessProperties(this, key, points[points.length - 1]);
      }
      this.dirty = true;
      return this;
    },
    insertLeftSidePoint: function insertLeftSidePoint(t, x, y, key) {
      var points = this.geom.leftSidePoints;
      if (Array.isArray(t)) {
        var points = t,
          point;
        for (var i = 0, cnt = points.length; i < cnt; i++) {
          point = points[i];
          this.geom.insertLeftSidePoint(point.t, point.x, point.y);
          InjectPointAccessProperties(this, point.key, points[points.length - 1]);
        }
      } else {
        this.geom.insertLeftSidePoint(t, x, y);
        InjectPointAccessProperties(this, key, points[points.length - 1]);
      }
      this.dirty = true;
      return this;
    },
    clearTopSidePoints: function clearTopSidePoints() {
      this.geom.clearTopSidePoints();
      this.dirty = true;
      return this;
    },
    clearRightSidePoints: function clearRightSidePoints() {
      this.geom.clearRightSidePoints();
      this.dirty = true;
      return this;
    },
    clearBottomSidePoints: function clearBottomSidePoints() {
      this.geom.clearBottomSidePoints();
      this.dirty = true;
      return this;
    },
    clearLeftSidePoints: function clearLeftSidePoints() {
      this.geom.clearLeftSidePoints();
      this.dirty = true;
      return this;
    },
    clearAllSidesPoints: function clearAllSidesPoints() {
      this.geom.clearAllSidesPoints();
      this.dirty = true;
      return this;
    }
  };

  var QuadGeom = /*#__PURE__*/function () {
    function QuadGeom(x, y, width, height) {
      _classCallCheck(this, QuadGeom);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = x;
      }
      if (width === undefined) {
        width = 0;
      }
      if (height === undefined) {
        height = 0;
      }
      this.setTo(x, y, width, height);
      this.tlx = 0;
      this.tly = 0;
      this.trx = 0;
      this["try"] = 0;
      this.blx = 0;
      this.bly = 0;
      this.brx = 0;
      this.bry = 0;
      this.topSidePoints = [];
      this.rightSidePoints = [];
      this.bottomSidePoints = [];
      this.leftSidePoints = [];
    }
    _createClass(QuadGeom, [{
      key: "setTo",
      value: function setTo(x, y, width, height) {
        this.setPosition(x, y);
        this.setSize(width, height);
        return this;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "setTLPosition",
      value: function setTLPosition(x, y) {
        this.tlx = x;
        this.tly = y;
        return this;
      }
    }, {
      key: "setTRPosition",
      value: function setTRPosition(x, y) {
        this.trx = x;
        this["try"] = y;
        return this;
      }
    }, {
      key: "setBLPosition",
      value: function setBLPosition(x, y) {
        this.blx = x;
        this.bly = y;
        return this;
      }
    }, {
      key: "setBRPosition",
      value: function setBRPosition(x, y) {
        this.brx = x;
        this.bry = y;
        return this;
      }
    }, {
      key: "resetCornerPosition",
      value: function resetCornerPosition() {
        this.setTLPosition(0, 0).setTRPosition(0, 0).setBLPosition(0, 0).setBRPosition(0, 0);
        return this;
      }
    }, {
      key: "insertTopSidePoint",
      value: function insertTopSidePoint(t, x, y) {
        AddPoint(this.topSidePoints, t, x, y);
        return this;
      }
    }, {
      key: "insertRightSidePoint",
      value: function insertRightSidePoint(t, x, y) {
        AddPoint(this.rightSidePoints, t, x, y);
        return this;
      }
    }, {
      key: "insertBottomSidePoint",
      value: function insertBottomSidePoint(t, x, y) {
        AddPoint(this.bottomSidePoints, t, x, y);
        return this;
      }
    }, {
      key: "insertLeftSidePoint",
      value: function insertLeftSidePoint(t, x, y) {
        AddPoint(this.leftSidePoints, t, x, y);
        return this;
      }
    }, {
      key: "clearTopSidePoints",
      value: function clearTopSidePoints() {
        this.topSidePoints.length = 0;
        return this;
      }
    }, {
      key: "clearRightSidePoints",
      value: function clearRightSidePoints() {
        this.rightSidePoints.length = 0;
        return this;
      }
    }, {
      key: "clearBottomSidePoints",
      value: function clearBottomSidePoints() {
        this.bottomSidePoints.length = 0;
        return this;
      }
    }, {
      key: "clearLeftSidePoints",
      value: function clearLeftSidePoints() {
        this.leftSidePoints.length = 0;
        return this;
      }
    }, {
      key: "clearAllSidesPoints",
      value: function clearAllSidesPoints() {
        this.clearTopSidePoints().clearRightSidePoints().clearBottomSidePoints().clearLeftSidePoints();
        return this;
      }
    }]);
    return QuadGeom;
  }();
  var AddPoint = function AddPoint(points, t, x, y) {
    if (typeof t !== 'number') {
      var config = t;
      t = config.t;
      x = config.x;
      y = config.y;
    }
    points.push({
      t: t,
      x: x,
      y: y
    });
  };

  var LineTo = function LineTo(x, y, pathData) {
    var cnt = pathData.length;
    if (cnt >= 2) {
      var lastX = pathData[cnt - 2];
      var lastY = pathData[cnt - 1];
      if (x === lastX && y === lastY) {
        return pathData;
      }
    }
    pathData.push(x, y);
    return pathData;
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var Linear = Phaser.Math.Linear;
  var Earcut = Phaser.Geom.Polygon.Earcut;
  var Quad = /*#__PURE__*/function (_PolygnBase) {
    _inherits(Quad, _PolygnBase);
    function Quad(scene, x, y, width, height, fillColor, fillAlpha) {
      var _this;
      _classCallCheck(this, Quad);
      var strokeColor, strokeAlpha, strokeWidth;
      if (IsPlainObject(x)) {
        var config = x;
        x = config.x;
        y = config.y;
        width = config.width;
        height = config.height;
        fillColor = config.color;
        fillAlpha = config.alpha;
        strokeColor = config.strokeColor;
        strokeAlpha = config.strokeAlpha;
        strokeWidth = config.strokeWidth;
      }
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (width === undefined) {
        width = 1;
      }
      if (height === undefined) {
        height = width;
      }
      var geom = new QuadGeom(); // Configurate it later
      _this = _callSuper(this, Quad, [scene, 'rexQuadShape', geom]);
      geom.setTo(0, 0, width, height);
      _this.setPosition(x, y);
      _this.setFillStyle(fillColor, fillAlpha);
      if (strokeColor !== undefined && strokeWidth === undefined) {
        strokeWidth = 2;
      }
      _this.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);
      _this.setTLPosition(GetValue(config, 'tlx', 0), GetValue(config, 'tly', 0)).setTRPosition(GetValue(config, 'trx', 0), GetValue(config, 'try', 0)).setBLPosition(GetValue(config, 'blx', 0), GetValue(config, 'bly', 0)).setBRPosition(GetValue(config, 'brx', 0), GetValue(config, 'bry', 0));
      var leftSidePoints = GetValue(config, 'leftSidePoints');
      if (leftSidePoints) {
        _this.insertLeftSidePoint(leftSidePoints);
      }
      var topSidePoints = GetValue(config, 'topSidePoints');
      if (topSidePoints) {
        _this.insertTopSidePoint(topSidePoints);
      }
      var rightSidePoints = GetValue(config, 'rightSidePoints');
      if (rightSidePoints) {
        _this.insertRightSidePoint(rightSidePoints);
      }
      var bottomSidePoints = GetValue(config, 'bottomSidePoints');
      if (bottomSidePoints) {
        _this.insertBottomSidePoint(bottomSidePoints);
      }
      _this.updateDisplayOrigin();
      _this.dirty = true;
      return _this;
    }
    _createClass(Quad, [{
      key: "updateData",
      value: function updateData() {
        var geom = this.geom;
        var pathData = this.pathData;
        pathData.length = 0;
        var width = geom.width;
        var height = geom.height;
        var tlx = 0 + geom.tlx;
        var tly = 0 + geom.tly;
        var trx = width + geom.trx;
        var try_ = 0 + geom["try"];
        var brx = width + geom.brx;
        var bry = height + geom.bry;
        var blx = 0 + geom.blx;
        var bly = height + geom.bly;
        var topSidePoints = geom.topSidePoints;
        var rightSidePoints = geom.rightSidePoints;
        var bottomSidePoints = geom.bottomSidePoints;
        var leftSidePoints = geom.leftSidePoints;

        // Top side
        LineTo(tlx, tly, pathData);
        SortPoints(topSidePoints);
        for (var i = 0, cnt = topSidePoints.length; i < cnt; i++) {
          var point = topSidePoints[i];
          var px = Linear(tlx, trx, point.t) + point.x;
          var py = Linear(tly, try_, point.t) + point.y;
          LineTo(px, py, pathData);
        }

        // Right side
        LineTo(trx, try_, pathData);
        SortPoints(rightSidePoints);
        for (var i = 0, cnt = rightSidePoints.length; i < cnt; i++) {
          var point = rightSidePoints[i];
          var px = Linear(trx, brx, point.t) + point.x;
          var py = Linear(try_, bry, point.t) + point.y;
          LineTo(px, py, pathData);
        }

        // Bottom side
        LineTo(brx, bry, pathData);
        SortPoints(bottomSidePoints);
        for (var i = bottomSidePoints.length - 1; i >= 0; i--) {
          var point = bottomSidePoints[i];
          var px = Linear(blx, brx, point.t) + point.x;
          var py = Linear(bly, bry, point.t) + point.y;
          LineTo(px, py, pathData);
        }

        // Left side
        LineTo(blx, bly, pathData);
        SortPoints(leftSidePoints);
        for (var i = leftSidePoints.length - 1; i >= 0; i--) {
          var point = leftSidePoints[i];
          var px = Linear(tlx, blx, point.t) + point.x;
          var py = Linear(tly, bly, point.t) + point.y;
          LineTo(px, py, pathData);
        }
        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        this.pathIndexes = Earcut(pathData);
        return this;
      }
    }, {
      key: "tlx",
      get: function get() {
        return this.geom.tlx;
      },
      set: function set(value) {
        this.geom.tlx = value;
        this.dirty = true;
      }
    }, {
      key: "tly",
      get: function get() {
        return this.geom.tly;
      },
      set: function set(value) {
        this.geom.tly = value;
        this.dirty = true;
      }
    }, {
      key: "trx",
      get: function get() {
        return this.geom.trx;
      },
      set: function set(value) {
        this.geom.trx = value;
        this.dirty = true;
      }
    }, {
      key: "try",
      get: function get() {
        return this.geom["try"];
      },
      set: function set(value) {
        this.geom["try"] = value;
        this.dirty = true;
      }
    }, {
      key: "blx",
      get: function get() {
        return this.geom.blx;
      },
      set: function set(value) {
        this.geom.blx = value;
        this.dirty = true;
      }
    }, {
      key: "bly",
      get: function get() {
        return this.geom.bly;
      },
      set: function set(value) {
        this.geom.bly = value;
        this.dirty = true;
      }
    }, {
      key: "brx",
      get: function get() {
        return this.geom.brx;
      },
      set: function set(value) {
        this.geom.brx = value;
        this.dirty = true;
      }
    }, {
      key: "bry",
      get: function get() {
        return this.geom.bry;
      },
      set: function set(value) {
        this.geom.bry = value;
        this.dirty = true;
      }
    }, {
      key: "leftSidePoints",
      get: function get() {
        return this.geom.leftSidePoints;
      }
    }, {
      key: "topSidePoints",
      get: function get() {
        return this.geom.topSidePoints;
      }
    }, {
      key: "bottomSidePoints",
      get: function get() {
        return this.geom.bottomSidePoints;
      }
    }, {
      key: "rightSidePoints",
      get: function get() {
        return this.geom.rightSidePoints;
      }
    }]);
    return Quad;
  }(PolygnBase);
  var SortPoints = function SortPoints(points) {
    if (points.length <= 1) {
      return;
    }
    points.sort(function (pointA, pointB) {
      return pointA.t - pointB.t;
    });
  };
  Object.assign(Quad.prototype, PointMethods);

  function Factory (x, y, width, height, fillColor, fillAlpha) {
    var gameObject = new Quad(this.scene, x, y, width, height, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var BuildGameObject = Phaser.GameObjects.BuildGameObject;
  function Creator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }
    if (addToScene !== undefined) {
      config.add = addToScene;
    }
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', width);
    var fillColor = GetAdvancedValue(config, 'fillColor', undefined);
    var fillAlpha = GetAdvancedValue(config, 'fillAlpha', undefined);
    var gameObject = new Quad(this.scene, 0, 0, width, height, fillColor, fillAlpha);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
  }

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

  var QuadPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(QuadPlugin, _Phaser$Plugins$BaseP);
    function QuadPlugin(pluginManager) {
      var _this;
      _classCallCheck(this, QuadPlugin);
      _this = _callSuper(this, QuadPlugin, [pluginManager]);

      //  Register our new Game Object type
      pluginManager.registerGameObject('rexQuadShape', Factory, Creator);
      return _this;
    }
    _createClass(QuadPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return QuadPlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.GameObjects.QuadShape', Quad);

  return QuadPlugin;

}));
