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
    }]);
    return QuadGeom;
  }();

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
        var width = geom.width,
          height = geom.height;
        var tlx = 0 + geom.tlx;
        var tly = 0 + geom.tly;
        var trx = width + geom.trx;
        var try_ = 0 + geom["try"];
        var brx = width + geom.brx;
        var bry = height + geom.bry;
        var blx = 0 + geom.blx;
        var bly = height + geom.bly;
        LineTo(tlx, tly, pathData);
        LineTo(trx, try_, pathData);
        LineTo(brx, bry, pathData);
        LineTo(blx, bly, pathData);
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
      key: "setTLPosition",
      value: function setTLPosition(x, y) {
        this.geom.setTLPosition(x, y);
        return this;
      }
    }, {
      key: "setTRPosition",
      value: function setTRPosition(x, y) {
        this.geom.setTRPosition(x, y);
        return this;
      }
    }, {
      key: "setBLPosition",
      value: function setBLPosition(x, y) {
        this.geom.setBLPosition(x, y);
        return this;
      }
    }, {
      key: "setBRPosition",
      value: function setBRPosition(x, y) {
        this.geom.setBRPosition(x, y);
        return this;
      }
    }, {
      key: "resetCornerPosition",
      value: function resetCornerPosition() {
        this.geom.resetCornerPosition();
        return this;
      }
    }]);
    return Quad;
  }(PolygnBase);

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
