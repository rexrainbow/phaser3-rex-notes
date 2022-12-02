(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextriangleplugin = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;
  var WebGLRenderer = function WebGLRenderer(renderer, src, camera, parentMatrix) {
    src.updateData();
    camera.addToRenderList(src);
    var pipeline = renderer.pipelines.set(src.pipeline);
    var result = GetCalcMatrix(src, camera, parentMatrix);
    var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);
    var dx = src._displayOriginX;
    var dy = src._displayOriginY;
    var alpha = camera.alpha * src.alpha;
    renderer.pipelines.preBatch(src);
    var shapes = src.geom;
    for (var i = 0, cnt = shapes.length; i < cnt; i++) {
      shapes[i].webglRender(pipeline, calcMatrix, alpha, dx, dy);
    }
    renderer.pipelines.postBatch(src);
  };

  var SetTransform = Phaser.Renderer.Canvas.SetTransform;
  var CanvasRenderer = function CanvasRenderer(renderer, src, camera, parentMatrix) {
    src.updateData();
    camera.addToRenderList(src);
    var ctx = renderer.currentContext;
    if (SetTransform(renderer, ctx, src, camera, parentMatrix)) {
      var dx = src._displayOriginX;
      var dy = src._displayOriginY;
      var shapes = src.geom;
      for (var i = 0, cnt = shapes.length; i < cnt; i++) {
        shapes[i].canvasRender(ctx, dx, dy);
      }

      //  Restore the context saved in SetTransform
      ctx.restore();
    }
  };

  var Render = {
    renderWebGL: WebGLRenderer,
    renderCanvas: CanvasRenderer
  };

  var Clear = function Clear(obj) {
    if (_typeof(obj) !== 'object' || obj === null) {
      return obj;
    }
    if (Array.isArray(obj)) {
      obj.length = 0;
    } else {
      for (var key in obj) {
        delete obj[key];
      }
    }
    return obj;
  };

  var Shape = Phaser.GameObjects.Shape;
  var RemoveItem = Phaser.Utils.Array.Remove;
  var BaseShapes = /*#__PURE__*/function (_Shape) {
    _inherits(BaseShapes, _Shape);
    var _super = _createSuper(BaseShapes);
    function BaseShapes(scene, x, y, width, height) {
      var _this;
      _classCallCheck(this, BaseShapes);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (width === undefined) {
        width = 2;
      }
      if (height === undefined) {
        height = width;
      }
      _this = _super.call(this, scene, 'rexShapes', []);
      _this._width = -1;
      _this._height = -1;
      _this.dirty = true;
      _this.isSizeChanged = true;
      _this.shapes = {};
      _this.setPosition(x, y);
      _this.setSize(width, height);
      _this.updateDisplayOrigin();
      return _this;
    }
    _createClass(BaseShapes, [{
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this.setSize(value, this._height);
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this.setSize(this._width, value);
      }
    }, {
      key: "setDirty",
      value: function setDirty(value) {
        if (value === undefined) {
          value = true;
        }
        this.dirty = value;
        return this;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.isSizeChanged = this.isSizeChanged || this._width !== width || this._height !== height;
        this.dirty = this.dirty || this.isSizeChanged;
        this._width = width;
        this._height = height;
        this.updateDisplayOrigin();
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
    }, {
      key: "fillColor",
      get: function get() {
        return this._fillColor;
      },
      set: function set(value) {
        this.setFillStyle(value, this._fillAlpha);
      }
    }, {
      key: "fillAlpha",
      get: function get() {
        return this._fillAlpha;
      },
      set: function set(value) {
        this.setFillStyle(this._fillColor, value);
      }
    }, {
      key: "setFillStyle",
      value: function setFillStyle(color, alpha) {
        if (alpha === undefined) {
          alpha = 1;
        }
        this.dirty = this.dirty || this.fillColor !== color || this.fillAlpha !== alpha;
        this._fillColor = color;
        this._fillAlpha = alpha;
        return this;
      }
    }, {
      key: "lineWidth",
      get: function get() {
        return this._lineWidth;
      },
      set: function set(value) {
        this.setStrokeStyle(value, this._strokeColor, this._strokeAlpha);
      }
    }, {
      key: "strokeColor",
      get: function get() {
        return this._strokeColor;
      },
      set: function set(value) {
        this.setStrokeStyle(this._lineWidth, value, this._strokeAlpha);
      }
    }, {
      key: "strokeAlpha",
      get: function get() {
        return this._strokeAlpha;
      },
      set: function set(value) {
        this.setStrokeStyle(this._lineWidth, this._strokeColor, value);
      }
    }, {
      key: "setStrokeStyle",
      value: function setStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
          alpha = 1;
        }
        this.dirty = this.dirty || this.lineWidth !== lineWidth || this.strokeColor !== color || this.strokeAlpha !== alpha;
        this._lineWidth = lineWidth;
        this._strokeColor = color;
        this._strokeAlpha = alpha;
        return this;
      }
    }, {
      key: "updateShapes",
      value: function updateShapes() {}
    }, {
      key: "updateData",
      value: function updateData() {
        if (!this.dirty) {
          return this;
        }
        this.updateShapes();
        var shapes = this.geom;
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
          var shape = shapes[i];
          if (shape.dirty) {
            shape.updateData();
          }
        }
        this.isSizeChanged = false;
        this.dirty = false;
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.geom.length = 0;
        Clear(this.shapes);
        return this;
      }
    }, {
      key: "getShape",
      value: function getShape(name) {
        return this.shapes[name];
      }
    }, {
      key: "getShapes",
      value: function getShapes() {
        return this.geom;
      }
    }, {
      key: "addShape",
      value: function addShape(shape) {
        this.geom.push(shape);
        var name = shape.name;
        if (name) {
          this.shapes[name] = shape;
        }
        this.dirty = true;
        return this;
      }
    }, {
      key: "deleteShape",
      value: function deleteShape(name) {
        var shape = this.getShape(name);
        if (shape) {
          delete this.shapes[name];
          RemoveItem(this.geom, shape);
        }
        return this;
      }
    }]);
    return BaseShapes;
  }(Shape);
  Object.assign(BaseShapes.prototype, Render);

  var FillStyle = function FillStyle(color, alpha) {
    if (color == null) {
      this.isFilled = false;
    } else {
      if (alpha === undefined) {
        alpha = 1;
      }
      this.isFilled = true;
      this.fillColor = color;
      this.fillAlpha = alpha;
    }
    return this;
  };
  var LineStyle = function LineStyle(lineWidth, color, alpha) {
    if (lineWidth == null || color == null) {
      this.isStroked = false;
    } else {
      if (alpha === undefined) {
        alpha = 1;
      }
      this.isStroked = true;
      this.lineWidth = lineWidth;
      this.strokeColor = color;
      this.strokeAlpha = alpha;
    }
    return this;
  };
  var StyleMethods = {
    fillStyle: FillStyle,
    lineStyle: LineStyle
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  //  Source object
  //  The key as a string, or an array of keys, i.e. 'banner', or 'banner.hideBanner'
  //  The default value to use if the key doesn't exist

  /**
   * Retrieves a value from an object.
   *
   * @function Phaser.Utils.Objects.GetValue
   * @since 3.0.0
   *
   * @param {object} source - The object to retrieve the value from.
   * @param {string} key - The name of the property to retrieve from the object. If a property is nested, the names of its preceding properties should be separated by a dot (`.`) - `banner.hideBanner` would return the value of the `hideBanner` property from the object stored in the `banner` property of the `source` object.
   * @param {*} defaultValue - The value to return if the `key` isn't found in the `source` object.
   *
   * @return {*} The value of the requested key.
   */
  var GetValue$1 = function GetValue(source, key, defaultValue) {
    if (!source || typeof source === 'number') {
      return defaultValue;
    } else if (source.hasOwnProperty(key)) {
      return source[key];
    } else if (key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var parent = source;
      var value = defaultValue;

      //  Use for loop here so we can break early
      for (var i = 0; i < keys.length; i++) {
        if (parent.hasOwnProperty(keys[i])) {
          //  Yes it has a key property, let's carry on down
          value = parent[keys[i]];
          parent = parent[keys[i]];
        } else {
          //  Can't go any further, so reset to default
          value = defaultValue;
          break;
        }
      }
      return value;
    } else {
      return defaultValue;
    }
  };

  var DataMethods = {
    enableData: function enableData() {
      if (this.data === undefined) {
        this.data = {};
      }
      return this;
    },
    setData: function setData(key, value) {
      this.enableData();
      if (arguments.length === 1) {
        var data = key;
        for (key in data) {
          this.data[key] = data[key];
        }
      } else {
        this.data[key] = value;
      }
      return this;
    },
    getData: function getData(key, defaultValue) {
      this.enableData();
      return key === undefined ? this.data : GetValue$1(this.data, key, defaultValue);
    },
    incData: function incData(key, inc, defaultValue) {
      if (defaultValue === undefined) {
        defaultValue = 0;
      }
      this.enableData();
      this.setData(key, this.getData(key, defaultValue) + inc);
      return this;
    },
    mulData: function mulData(key, mul, defaultValue) {
      if (defaultValue === undefined) {
        defaultValue = 0;
      }
      this.enableData();
      this.setData(key, this.getData(key, defaultValue) * mul);
      return this;
    },
    clearData: function clearData() {
      if (this.data) {
        Clear(this.data);
      }
      return this;
    }
  };

  var BaseGeom = /*#__PURE__*/function () {
    function BaseGeom() {
      _classCallCheck(this, BaseGeom);
      this.name = undefined;
      this.dirty = true;
      this.data = undefined;
      this.isFilled = false;
      this.fillColor = undefined;
      this.fillAlpha = 1;
      this.isStroked = false;
      this.lineWidth = 1;
      this.strokeColor = undefined;
      this.strokeAlpha = 1;
    }
    _createClass(BaseGeom, [{
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.fillStyle().lineStyle();
        return this;
      }
    }, {
      key: "webglRender",
      value: function webglRender(pipeline, calcMatrix, alpha, dx, dy) {}
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {}
    }, {
      key: "updateData",
      value: function updateData() {
        this.dirty = false;
      }
    }]);
    return BaseGeom;
  }();
  Object.assign(BaseGeom.prototype, StyleMethods, DataMethods);

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

  var Earcut = Phaser.Geom.Polygon.Earcut;
  var PathBase = /*#__PURE__*/function (_BaseGeom) {
    _inherits(PathBase, _BaseGeom);
    var _super = _createSuper(PathBase);
    function PathBase() {
      var _this;
      _classCallCheck(this, PathBase);
      _this = _super.call(this);
      _this.pathData = [];
      _this.pathIndexes = [];
      _this.closePath = false;
      return _this;
    }
    _createClass(PathBase, [{
      key: "updateData",
      value: function updateData() {
        this.pathIndexes = Earcut(this.pathData);
        _get(_getPrototypeOf(PathBase.prototype), "updateData", this).call(this);
        return this;
      }
    }, {
      key: "webglRender",
      value: function webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
          FillPathWebGL(pipeline, calcMatrix, this, alpha, dx, dy);
        }
        if (this.isStroked) {
          StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
      }
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {
        var path = this.pathData;
        var pathLength = path.length - 1;
        var px1 = path[0] - dx;
        var py1 = path[1] - dy;
        ctx.beginPath();
        ctx.moveTo(px1, py1);
        if (!this.closePath) {
          pathLength -= 2;
        }
        for (var i = 2; i < pathLength; i += 2) {
          var px2 = path[i] - dx;
          var py2 = path[i + 1] - dy;
          ctx.lineTo(px2, py2);
        }
        if (this.closePath) {
          ctx.closePath();
        }
        if (this.isFilled) {
          FillStyleCanvas(ctx, this);
          ctx.fill();
        }
        if (this.isStroked) {
          LineStyleCanvas(ctx, this);
          ctx.stroke();
        }
      }
    }]);
    return PathBase;
  }(BaseGeom);

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

  var DegToRad$3 = Phaser.Math.DegToRad;
  var ArcTo = function ArcTo(centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && endAngle > startAngle) {
      endAngle -= 360;
    } else if (!antiClockWise && endAngle < startAngle) {
      endAngle += 360;
    }
    var deltaAngle = endAngle - startAngle;
    var step = DegToRad$3(deltaAngle) / iteration;
    startAngle = DegToRad$3(startAngle);
    for (var i = 0; i <= iteration; i++) {
      var angle = startAngle + step * i;
      var x = centerX + radiusX * Math.cos(angle);
      var y = centerY + radiusY * Math.sin(angle);
      LineTo(x, y, pathData);
    }
    return pathData;
  };

  Phaser.Math.DegToRad;

  var StartAt = function StartAt(x, y, pathData) {
    pathData.length = 0;
    if (x != null) {
      pathData.push(x, y);
    }
    return pathData;
  };

  //import QuadraticBezierInterpolation from '../../utils/math/interpolation/QuadraticBezierInterpolation.js';

  var QuadraticBezierInterpolation = Phaser.Math.Interpolation.QuadraticBezier;
  var QuadraticBezierTo = function QuadraticBezierTo(cx, cy, x, y, iterations, pathData) {
    var pathDataCnt = pathData.length;
    var p0x = pathData[pathDataCnt - 2];
    var p0y = pathData[pathDataCnt - 1];
    for (var i = 1, last = iterations - 1; i <= last; i++) {
      var t = i / last;
      pathData.push(QuadraticBezierInterpolation(t, p0x, cx, x), QuadraticBezierInterpolation(t, p0y, cy, y));
    }
    return pathData;
  };

  var DuplicateLast = function DuplicateLast(pathData) {
    var len = pathData.length;
    if (len < 2) {
      return pathData;
    }
    var lastX = pathData[len - 2];
    var lastY = pathData[len - 1];
    pathData.push(lastX);
    pathData.push(lastY);
    return pathData;
  };

  var AddPathMethods = {
    clear: function clear() {
      this.start();
      return this;
    },
    start: function start() {
      this.startAt();
      return this;
    },
    startAt: function startAt(x, y) {
      this.restorePathData();
      this.accumulationLengths = undefined;
      StartAt(x, y, this.pathData);
      this.firstPointX = x;
      this.firstPointY = y;
      this.lastPointX = x;
      this.lastPointY = y;
      return this;
    },
    lineTo: function lineTo(x, y, relative) {
      if (relative === undefined) {
        relative = false;
      }
      if (relative) {
        x += this.lastPointX;
        y += this.lastPointY;
      }
      LineTo(x, y, this.pathData);
      this.lastPointX = x;
      this.lastPointY = y;
      return this;
    },
    verticalLineTo: function verticalLineTo(x, relative) {
      this.lineTo(x, this.lastPointY, relative);
      return this;
    },
    horizontalLineTo: function horizontalLineTo(y, relative) {
      this.lineTo(this.lastPointX, y, relative);
      return this;
    },
    ellipticalArc: function ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
      if (anticlockwise === undefined) {
        anticlockwise = false;
      }
      ArcTo(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise, this.iterations, this.pathData);
      this.lastPointX = this.pathData[this.pathData.length - 2];
      this.lastPointY = this.pathData[this.pathData.length - 1];
      return this;
    },
    arc: function arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
      this.ellipticalArc(centerX, centerY, radius, radius, startAngle, endAngle, anticlockwise);
      return this;
    },
    quadraticBezierTo: function quadraticBezierTo(cx, cy, x, y) {
      QuadraticBezierTo(cx, cy, x, y, this.iterations, this.pathData);
      this.lastPointX = x;
      this.lastPointY = y;
      this.lastCX = cx;
      this.lastCY = cy;
      return this;
    },
    smoothQuadraticBezierTo: function smoothQuadraticBezierTo(x, y) {
      var cx = this.lastPointX * 2 - this.lastCX;
      var cy = this.lastPointY * 2 - this.lastCY;
      this.quadraticBezierTo(cx, cy, x, y);
      return this;
    },
    cubicBezierCurveTo: function cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y) {
      QuadraticBezierTo(cx0, cy0, cx1, cy1, x, y, this.iterations, this.pathData);
      this.lastPointX = x;
      this.lastPointY = y;
      this.lastCX = cx1;
      this.lastCY = cy1;
      return this;
    },
    smoothCubicBezierCurveTo: function smoothCubicBezierCurveTo(cx1, cy1, x, y) {
      var cx0 = this.lastPointX * 2 - this.lastCX;
      var cy0 = this.lastPointY * 2 - this.lastCY;
      this.cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y);
      return this;
    },
    close: function close() {
      this.closePath = true;
      return this;
    },
    end: function end() {
      DuplicateLast(this.pathData);
      return this;
    }
  };

  //import PointRotateAround from '../../utils/math/RotateAround.js';

  var PointRotateAround$1 = Phaser.Math.RotateAround;
  var RotateAround = function RotateAround(centerX, centerY, angle, pathData) {
    var point = {
      x: 0,
      y: 0
    };
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
      point.x = pathData[i];
      point.y = pathData[i + 1];
      PointRotateAround$1(point, centerX, centerY, angle);
      pathData[i] = point.x;
      pathData[i + 1] = point.y;
    }
    return pathData;
  };

  var Scale = function Scale(centerX, centerY, scaleX, scaleY, pathData) {
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
      var x = pathData[i] - centerX;
      var y = pathData[i + 1] - centerY;
      x *= scaleX;
      y *= scaleY;
      pathData[i] = x + centerX;
      pathData[i + 1] = y + centerY;
    }
    return pathData;
  };

  var Offset = function Offset(x, y, pathData) {
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
      pathData[i] += x;
      pathData[i + 1] += y;
    }
    return pathData;
  };

  var DegToRad$2 = Phaser.Math.DegToRad;
  var PointRotateAround = Phaser.Math.RotateAround;
  var TransformPointsMethods = {
    rotateAround: function rotateAround(centerX, centerY, angle) {
      if (this.pathData.length === 0) {
        return this;
      }
      angle = DegToRad$2(angle);
      RotateAround(centerX, centerY, angle, this.pathData);
      var pathDataCnt = this.pathData.length;
      this.lastPointX = this.pathData[pathDataCnt - 2];
      this.lastPointY = this.pathData[pathDataCnt - 1];
      if (this.lastCX !== undefined) {
        var point = {
          x: this.lastCX,
          y: this.lastCY
        };
        PointRotateAround(point, centerX, centerY, angle);
        this.lastCX = point.x;
        this.lastCY = point.y;
      }
      return this;
    },
    scale: function scale(centerX, centerY, scaleX, scaleY) {
      if (this.pathData.length === 0) {
        return this;
      }
      Scale(centerX, centerY, scaleX, scaleY, this.pathData);
      this.lastPointX = this.pathData[pathDataCnt - 2];
      this.lastPointY = this.pathData[pathDataCnt - 1];
      if (this.lastCX !== undefined) {
        var x = this.lastCX - centerX;
        var y = this.lastCY - centerY;
        x *= scaleX;
        y *= scaleY;
        this.lastCX = x + centerX;
        this.lastCY = y + centerY;
      }
      return this;
    },
    offset: function offset(x, y) {
      Offset(x, y, this.pathData);
      return this;
    }
  };

  var Copy = function Copy(dest, src, startIdx, endIdx) {
    if (startIdx === undefined) {
      startIdx = 0;
    }
    if (endIdx === undefined) {
      endIdx = src.length;
    }
    dest.length = endIdx - startIdx;
    for (var i = 0, len = dest.length; i < len; i++) {
      dest[i] = src[i + startIdx];
    }
    return dest;
  };

  var SavePathDataMethods = {
    savePathData: function savePathData() {
      if (this.pathDataSaved) {
        return this;
      }
      this.pathDataSave = _toConsumableArray(this.pathData);
      this.pathData.length = 0;
      this.pathDataSaved = true;
      return this;
    },
    restorePathData: function restorePathData() {
      if (!this.pathDataSaved) {
        return this;
      }
      Copy(this.pathData, this.pathDataSave);
      this.pathDataSave = undefined;
      this.pathDataSaved = false;
      return this;
    }
  };

  var DistanceBetween = Phaser.Math.Distance.Between;
  var Wrap$1 = Phaser.Math.Wrap;
  var Linear$1 = Phaser.Math.Linear;
  var AppendFromPathSegment = function AppendFromPathSegment(srcPathData, accumulationLengths, startT, endT, destPathData) {
    if (endT === undefined) {
      endT = startT;
      startT = 0;
    }
    startT = WrapT(startT);
    endT = WrapT(endT);
    if (startT === endT) {
      return;
    }
    var totalPathLength = accumulationLengths[accumulationLengths.length - 1];
    var startL = totalPathLength * startT;
    var endL = totalPathLength * endT;
    if (startT < endT) {
      AddPathSegment(srcPathData, accumulationLengths, startL, endL, destPathData);
    } else {
      AddPathSegment(srcPathData, accumulationLengths, startL, totalPathLength, destPathData);
      AddPathSegment(srcPathData, accumulationLengths, 0, endL, destPathData);
    }
    DuplicateLast(destPathData);
  };
  var AddPathSegment = function AddPathSegment(srcPathData, accumulationLengths, startL, endL, destPathData) {
    var skipState = startL > 0;
    for (var i = 0, cnt = accumulationLengths.length; i < cnt; i++) {
      var pIdx = i * 2;
      var d = accumulationLengths[i];
      if (skipState) {
        if (d < startL) {
          continue;
        } else if (d == startL) {
          skipState = false;
        } else {
          // d > startL
          var deltaD = d - accumulationLengths[i - 1];
          var t = 1 - (d - startL) / deltaD;
          destPathData.push(GetInterpolation(srcPathData, pIdx - 2, pIdx, t));
          destPathData.push(GetInterpolation(srcPathData, pIdx - 1, pIdx + 1, t));
          skipState = false;
        }
      }
      if (d <= endL) {
        destPathData.push(srcPathData[pIdx]);
        destPathData.push(srcPathData[pIdx + 1]);
        if (d === endL) {
          break;
        }
      } else {
        // d > endL
        var deltaD = d - accumulationLengths[i - 1];
        var t = 1 - (d - endL) / deltaD;
        destPathData.push(GetInterpolation(srcPathData, pIdx - 2, pIdx, t));
        destPathData.push(GetInterpolation(srcPathData, pIdx - 1, pIdx + 1, t));
        break;
      }
    }
  };
  var GetInterpolation = function GetInterpolation(pathData, i0, i1, t) {
    var p0 = pathData[i0],
      p1 = pathData[i1];
    return Linear$1(p0, p1, t);
  };
  var WrapT = function WrapT(t) {
    if (t === 0) {
      return 0;
    } else if (t % 1 === 0) {
      return 1;
    }
    return Wrap$1(t, 0, 1);
  };
  var PathSegmentMethods = {
    updateAccumulationLengths: function updateAccumulationLengths() {
      if (this.accumulationLengths == null) {
        this.accumulationLengths = [];
      } else if (this.accumulationLengths.length === this.pathData.length / 2) {
        return this;
      }
      var accumulationLengths = this.accumulationLengths;
      var pathData = this.pathData;
      var prevX, prevY, x, y;
      var d,
        accumulationLength = 0;
      for (var i = 0, cnt = pathData.length; i < cnt; i += 2) {
        x = pathData[i];
        y = pathData[i + 1];
        d = prevX === undefined ? 0 : DistanceBetween(prevX, prevY, x, y);
        accumulationLength += d;
        accumulationLengths.push(accumulationLength);
        prevX = x;
        prevY = y;
      }
      this.totalPathLength = accumulationLength;
      return this;
    },
    setDisplayPathSegment: function setDisplayPathSegment(startT, endT) {
      if (!this.pathDataSaved) {
        this.updateAccumulationLengths();
        this.savePathData();
      }
      this.pathData.length = 0;
      AppendFromPathSegment(this.pathDataSave, this.accumulationLengths, startT, endT, this.pathData);
      return this;
    },
    appendFromPathSegment: function appendFromPathSegment(src, startT, endT) {
      if (startT === undefined) {
        var _this$pathData;
        (_this$pathData = this.pathData).push.apply(_this$pathData, _toConsumableArray(src.pathData));
      } else {
        src.updateAccumulationLengths();
        AppendFromPathSegment(src.pathData, src.accumulationLengths, startT, endT, this.pathData);
      }
      this.firstPointX = this.pathData[0];
      this.firstPointY = this.pathData[1];
      this.lastPointX = this.pathData[this.pathData.length - 2];
      this.lastPointY = this.pathData[this.pathData.length - 1];
      return this;
    }
  };

  var GraphicsMethods = {
    draw: function draw(graphics, isFill, isStroke) {
      var points = this.toPoints();
      if (isFill) {
        graphics.fillPoints(points, this.closePath, this.closePath);
      }
      if (isStroke) {
        graphics.strokePoints(points, this.closePath, this.closePath);
      }
      return this;
    }
  };

  var ToPoints = function ToPoints(pathData, points) {
    if (points === undefined) {
      points = [];
    }
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
      points.push({
        x: pathData[i],
        y: pathData[i + 1]
      });
    }
    return points;
  };

  //import Polygon from '../../utils/geom/polygon/Polygon.js';

  var Polygon = Phaser.Geom.Polygon;
  var ToPolygon = function ToPolygon(pathData, polygon) {
    if (polygon === undefined) {
      polygon = new Polygon();
    }
    polygon.setTo(pathData);
    return polygon;
  };

  var PathDataBuilder = /*#__PURE__*/function () {
    function PathDataBuilder(pathData) {
      _classCallCheck(this, PathDataBuilder);
      if (pathData === undefined) {
        pathData = [];
      }
      this.pathData = pathData;
      this.closePath = false;
      this.setIterations(32);
      this.firstPointX = undefined;
      this.firstPointY = undefined;
      this.lastPointX = undefined;
      this.lastPointY = undefined;
      this.accumulationLengths = undefined;
    }
    _createClass(PathDataBuilder, [{
      key: "setIterations",
      value: function setIterations(iterations) {
        this.iterations = iterations;
        return this;
      }
    }, {
      key: "toPoints",
      value: function toPoints() {
        return ToPoints(this.pathData);
      }
    }, {
      key: "toPolygon",
      value: function toPolygon(polygon) {
        return ToPolygon(this.pathData, polygon);
      }
    }]);
    return PathDataBuilder;
  }();
  Object.assign(PathDataBuilder.prototype, AddPathMethods, TransformPointsMethods, SavePathDataMethods, PathSegmentMethods, GraphicsMethods);

  var Lines = /*#__PURE__*/function (_PathBase) {
    _inherits(Lines, _PathBase);
    var _super = _createSuper(Lines);
    function Lines() {
      var _this;
      _classCallCheck(this, Lines);
      _this = _super.call(this);
      _this.builder = new PathDataBuilder(_this.pathData);
      return _this;
    }
    _createClass(Lines, [{
      key: "iterations",
      get: function get() {
        return this.builder.iterations;
      },
      set: function set(value) {
        this.dirty = this.dirty || this.builder.iterations !== value;
        this.builder.setIterations(value);
      }
    }, {
      key: "setIterations",
      value: function setIterations(iterations) {
        this.iterations = iterations;
        return this;
      }
    }, {
      key: "lastPointX",
      get: function get() {
        return this.builder.lastPointX;
      }
    }, {
      key: "lastPointY",
      get: function get() {
        return this.builder.lastPointY;
      }
    }, {
      key: "start",
      value: function start() {
        this.builder.start();
        this.dirty = true;
        return this;
      }
    }, {
      key: "startAt",
      value: function startAt(x, y) {
        this.builder.startAt(x, y);
        this.dirty = true;
        return this;
      }
    }, {
      key: "lineTo",
      value: function lineTo(x, y, relative) {
        this.builder.lineTo(x, y, relative);
        this.dirty = true;
        return this;
      }
    }, {
      key: "verticalLineTo",
      value: function verticalLineTo(x, relative) {
        this.builder.verticalLineTo(x, relative);
        this.dirty = true;
        return this;
      }
    }, {
      key: "horizontalLineTo",
      value: function horizontalLineTo(y, relative) {
        this.builder.horizontalLineTo(y, relative);
        this.dirty = true;
        return this;
      }
    }, {
      key: "ellipticalArc",
      value: function ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
        this.builder.ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise);
        this.dirty = true;
        return this;
      }
    }, {
      key: "arc",
      value: function arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
        this.builder.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);
        this.dirty = true;
        return this;
      }
    }, {
      key: "quadraticBezierTo",
      value: function quadraticBezierTo(cx, cy, x, y) {
        this.builder.quadraticBezierTo(cx, cy, x, y);
        this.dirty = true;
        return this;
      }
    }, {
      key: "smoothQuadraticBezierTo",
      value: function smoothQuadraticBezierTo(x, y) {
        this.builder.smoothQuadraticBezierTo(x, y);
        this.dirty = true;
        return this;
      }
    }, {
      key: "cubicBezierCurveTo",
      value: function cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y) {
        this.builder.cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y);
        this.dirty = true;
        return this;
      }
    }, {
      key: "smoothCubicBezierCurveTo",
      value: function smoothCubicBezierCurveTo(cx1, cy1, x, y) {
        this.builder.smoothCubicBezierCurveTo(cx1, cy1, x, y);
        this.dirty = true;
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        this.builder.close();
        this.closePath = this.builder.closePath;
        this.dirty = true;
        return this;
      }
    }, {
      key: "end",
      value: function end() {
        this.builder.end();
        this.dirty = true;
        return this;
      }
    }, {
      key: "rotateAround",
      value: function rotateAround(centerX, centerY, angle) {
        this.builder.rotateAround(centerX, centerY, angle);
        this.dirty = true;
        return this;
      }
    }, {
      key: "scale",
      value: function scale(centerX, centerY, scaleX, scaleY) {
        this.builder.scale(centerX, centerY, scaleX, scaleY);
        this.dirty = true;
        return this;
      }
    }, {
      key: "offset",
      value: function offset(x, y) {
        this.builder.offset(x, y);
        this.dirty = true;
        return this;
      }
    }, {
      key: "toPolygon",
      value: function toPolygon(polygon) {
        return this.builder.toPolygon(polygon);
      }
    }, {
      key: "appendPathFrom",
      value: function appendPathFrom(src, startT, endT) {
        this.builder.appendFromPathSegment(src.builder, startT, endT);
        return this;
      }
    }, {
      key: "copyPathFrom",
      value: function copyPathFrom(src, startT, endT) {
        this.builder.clear().appendFromPathSegment(src.builder, startT, endT);
        return this;
      }
    }, {
      key: "setDisplayPathSegment",
      value: function setDisplayPathSegment(startT, endT) {
        this.builder.setDisplayPathSegment(startT, endT);
        return this;
      }
    }]);
    return Lines;
  }(PathBase);

  Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

  Phaser.Utils.Objects.GetValue;

  Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

  var DegToRad$1 = Phaser.Math.DegToRad;
  var Rad120 = DegToRad$1(120);
  var Wrap = Phaser.Math.Wrap;
  var Linear = Phaser.Math.Linear;
  var ShapesUpdateMethods = {
    buildShapes: function buildShapes() {
      this.addShape(new Lines().setName('triangle'));
    },
    updateShapes: function updateShapes() {
      var right = this.width,
        left = 0,
        bottom = this.height,
        top = 0;
      var centerX = right / 2,
        centerY = bottom / 2;
      var triangle = this.getShape('triangle').fillStyle(this.fillColor, this.fillAlpha).lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha);
      if (this.shapeMode === 0) {
        var padding = this.padding;
        right -= padding.right;
        left += padding.left;
        bottom -= padding.bottom;
        top += padding.top;
        var pointsMapping = {
          0: {
            // right
            a: {
              x: left,
              y: top
            },
            b: {
              x: left,
              y: bottom
            },
            c: {
              x: right,
              y: centerY
            }
          },
          1: {
            // down
            a: {
              x: right,
              y: top
            },
            b: {
              x: left,
              y: top
            },
            c: {
              x: centerX,
              y: bottom
            }
          },
          2: {
            // left
            a: {
              x: right,
              y: bottom
            },
            b: {
              x: right,
              y: top
            },
            c: {
              x: left,
              y: centerY
            }
          },
          3: {
            // up
            a: {
              x: left,
              y: bottom
            },
            b: {
              x: right,
              y: bottom
            },
            c: {
              x: centerX,
              y: top
            }
          }
        };
        var wrapDirection = Wrap(this.verticeAngle / 90, 0, 4);
        var indexT0 = Math.floor(wrapDirection),
          indexT1 = (indexT0 + 1) % 4,
          t = wrapDirection - indexT0;
        var pointsT0 = pointsMapping[indexT0],
          pointsT1 = pointsMapping[indexT1];
        var pointAx = Linear(pointsT0.a.x, pointsT1.a.x, t);
        var pointAy = Linear(pointsT0.a.y, pointsT1.a.y, t);
        var pointBx = Linear(pointsT0.b.x, pointsT1.b.x, t);
        var pointBy = Linear(pointsT0.b.y, pointsT1.b.y, t);
        var pointCx = Linear(pointsT0.c.x, pointsT1.c.x, t);
        var pointCy = Linear(pointsT0.c.y, pointsT1.c.y, t);
        triangle.startAt(pointAx, pointAy).lineTo(pointBx, pointBy).lineTo(pointCx, pointCy).close();
      } else {
        var radius = Math.min(centerX, centerY) * this.radius,
          verticeRotation = this.verticeRotation;
        triangle.startAt(centerX + radius * Math.cos(verticeRotation), centerY + radius * Math.sin(verticeRotation)).lineTo(centerX + radius * Math.cos(verticeRotation + Rad120), centerY + radius * Math.sin(verticeRotation + Rad120)).lineTo(centerX + radius * Math.cos(verticeRotation - Rad120), centerY + radius * Math.sin(verticeRotation - Rad120)).close();
      }
    }
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var DegToRad = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
  var Triangle = /*#__PURE__*/function (_BaseShapes) {
    _inherits(Triangle, _BaseShapes);
    var _super = _createSuper(Triangle);
    function Triangle(scene, x, y, width, height, fillColor, fillAlpha) {
      var _this;
      _classCallCheck(this, Triangle);
      var strokeColor, strokeAlpha, strokeWidth, direction, padding, radius;
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
        direction = config.direction;
        padding = config.padding;
        radius = config.radius;
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
      if (direction === undefined) {
        direction = 0;
      }
      if (padding === undefined) {
        padding = 0;
      }
      if (radius === undefined) {
        radius = undefined;
      }
      _this = _super.call(this, scene, x, y, width, height);
      _this.type = 'rexTriangle';
      _this.setFillStyle(fillColor, fillAlpha);
      if (strokeColor !== undefined && strokeWidth === undefined) {
        strokeWidth = 2;
      }
      _this.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);
      _this.setDirection(direction);
      _this.setPadding(padding);
      _this.setRadius(radius);
      _this.buildShapes();
      return _this;
    }
    _createClass(Triangle, [{
      key: "verticeRotation",
      get: function get() {
        return this._verticeRotation;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._verticeRotation != value;
        this._verticeRotation = value;
      }
    }, {
      key: "setVerticeRotation",
      value: function setVerticeRotation(rotation) {
        this.verticeRotation = rotation;
        return this;
      }
    }, {
      key: "verticeAngle",
      get: function get() {
        return RadToDeg(this.verticeRotation);
      },
      set: function set(value) {
        this.verticeRotation = DegToRad(value);
      }
    }, {
      key: "setVerticeAngle",
      value: function setVerticeAngle(angle) {
        this.verticeAngle = angle;
        return this;
      }
    }, {
      key: "direction",
      get: function get() {
        return this._direction;
      },
      set: function set(value) {
        if (typeof value === 'string') {
          value = DirectionNameMap[value];
        }
        value = value % 4;
        this._direction = value;
        this.verticeAngle = value * 90;
      }
    }, {
      key: "setDirection",
      value: function setDirection(direction) {
        this.direction = direction;
        return this;
      }
    }, {
      key: "setPadding",
      value: function setPadding(left, top, right, bottom) {
        if (_typeof(left) === 'object') {
          var config = left;

          //  If they specify x and/or y this applies to all
          var x = GetValue(config, 'x', null);
          if (x !== null) {
            left = x;
            right = x;
          } else {
            left = GetValue(config, 'left', 0);
            right = GetValue(config, 'right', left);
          }
          var y = GetValue(config, 'y', null);
          if (y !== null) {
            top = y;
            bottom = y;
          } else {
            top = GetValue(config, 'top', 0);
            bottom = GetValue(config, 'bottom', top);
          }
        } else {
          if (left === undefined) {
            left = 0;
          }
          if (top === undefined) {
            top = left;
          }
          if (right === undefined) {
            right = left;
          }
          if (bottom === undefined) {
            bottom = top;
          }
        }
        if (this.padding === undefined) {
          this.padding = {};
        }
        this.dirty = this.dirty || this.padding.left != left || this.padding.top != top || this.padding.right != right || this.padding.bottom != bottom;
        this.padding.left = left;
        this.padding.top = top;
        this.padding.right = right;
        this.padding.bottom = bottom;

        // Switch to fit mode
        this.setRadius();
        return this;
      }
    }, {
      key: "radius",
      get: function get() {
        return this._radius;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._radius != value;
        this._radius = value;
      }
    }, {
      key: "setRadius",
      value: function setRadius(radius) {
        this.radius = radius;

        // 0: fit mode
        // 1: circle mode
        this.shapeMode = radius == null ? 0 : 1;
        return this;
      }
    }]);
    return Triangle;
  }(BaseShapes);
  var DirectionNameMap = {
    right: 0,
    down: 1,
    left: 2,
    up: 3
  };
  Object.assign(Triangle.prototype, ShapesUpdateMethods);

  function Factory (x, y, width, height, fillColor, fillAlpha) {
    var gameObject = new Triangle(this.scene, x, y, width, height, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var BuildGameObject = Phaser.GameObjects.BuildGameObject;
  function Creator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }
    if (addToScene !== undefined) {
      config.add = addToScene;
    }
    var gameObject = new Triangle(this.scene, config);
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

  var TrianglePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(TrianglePlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(TrianglePlugin);
    function TrianglePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, TrianglePlugin);
      _this = _super.call(this, pluginManager);

      //  Register our new Game Object type
      pluginManager.registerGameObject('rexTriangle', Factory, Creator);
      return _this;
    }
    _createClass(TrianglePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return TrianglePlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.GameObjects.Triangle', Triangle);

  return TrianglePlugin;

}));
