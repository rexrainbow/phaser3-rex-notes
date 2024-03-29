(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexninepatch2plugin = factory());
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
    var bobs = src.getRenderList();
    if (bobs.length === 0) {
      return;
    }
    camera.addToRenderList(src);
    var pipeline = renderer.pipelines.set(src.pipeline);
    var texture = src.frame.glTexture;
    var textureUnit = pipeline.setGameObject(src);
    var roundPixels = camera.roundPixels;
    var result = GetCalcMatrix(src, camera, parentMatrix);
    var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);
    var dx = src._displayOriginX;
    var dy = src._displayOriginY;
    var alpha = camera.alpha * src.alpha;
    renderer.pipelines.preBatch(src);
    for (var i = 0, cnt = bobs.length; i < cnt; i++) {
      bobs[i].webglRender(pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels);
    }
    renderer.pipelines.postBatch(src);
  };

  var SetTransform = Phaser.Renderer.Canvas.SetTransform;
  var CanvasRenderer = function CanvasRenderer(renderer, src, camera, parentMatrix) {
    var ctx = renderer.currentContext;
    var bobs = src.getRenderList();
    if (bobs.length === 0 || !SetTransform(renderer, ctx, src, camera, parentMatrix)) {
      return;
    }
    camera.addToRenderList(src);
    var roundPixels = camera.roundPixels;
    var dx = -src._displayOriginX,
      dy = -src._displayOriginY;
    ctx.translate(dx, dy);
    for (var i = 0, cnt = bobs.length; i < cnt; i++) {
      bobs[i].canvasRender(ctx, dx, dy, roundPixels);
    }

    //  Restore the context saved in SetTransform
    ctx.restore();
  };

  var Render = {
    renderWebGL: WebGLRenderer,
    renderCanvas: CanvasRenderer
  };

  var SetTexture = function SetTexture(key, frame) {
    this.texture = this.scene.sys.textures.get(key);
    this.frame = this.texture.get(frame);
    return this;
  };

  var Resize = function Resize(width, height) {
    if (this.width === width && this.height === height) {
      return this;
    }
    this.width = width;
    this.height = height;
    this.updateDisplayOrigin();
    var input = this.input;
    if (input && !input.customHitArea) {
      input.hitArea.width = width;
      input.hitArea.height = height;
    }
    return this;
  };

  var AddChild = function AddChild(bob) {
    this.lastAppendedChildren.length = 0;
    if (Array.isArray(bob)) {
      var _this$lastAppendedChi;
      this.children.add(bob);
      (_this$lastAppendedChi = this.lastAppendedChildren).push.apply(_this$lastAppendedChi, _toConsumableArray(bob));
    } else {
      this.children.add(bob);
      this.lastAppendedChildren.push(bob);
    }
    return this;
  };

  var RemoveItem = Phaser.Utils.Array.Remove;
  var RemoveChild = function RemoveChild(bob) {
    if (this.poolManager) {
      // Free this bob (bob.onFree())
      this.poolManager.free(bob);
    }

    // Remove this bob from blitter
    RemoveItem(this.children.list, bob);
    this.lastAppendedChildren.length = 0;
    this.dirty = true;
    return this;
  };

  var RemoveChildren = function RemoveChildren() {
    if (this.poolManager) {
      // Free all bobs (bob.onFree())
      this.poolManager.freeMultiple(this.children.list);
    }

    // Remove all bobs from blitter
    this.children.list.length = 0;
    this.lastAppendedChildren.length = 0;
    this.dirty = true;
    return this;
  };

  var GetLastAppendedChildren = function GetLastAppendedChildren() {
    return this.lastAppendedChildren;
  };

  var GetChildren = function GetChildren() {
    return this.children.list;
  };

  var TintMethods = {
    setTint: function setTint(tint) {
      // 0: Solid tint + texture alpha
      this.tint = tint;
      this.tintFill = false;
      return this;
    },
    setTintFill: function setTintFill(tint) {
      // 1: Solid tint, no texture
      this.tint = tint;
      this.tintFill = true;
      return this;
    },
    clearTint: function clearTint() {
      this.setTint(0xffffff);
      return this;
    }
  };

  var methods$1 = {
    setTexture: SetTexture,
    resize: Resize,
    setSize: Resize,
    addChild: AddChild,
    removeChild: RemoveChild,
    removeChildren: RemoveChildren,
    clear: RemoveChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
    getChildren: GetChildren
  };
  Object.assign(methods$1, TintMethods);

  var Stack = /*#__PURE__*/function () {
    function Stack() {
      _classCallCheck(this, Stack);
      this.items = [];
    }
    _createClass(Stack, [{
      key: "destroy",
      value: function destroy() {
        this.clear();
        this.items = undefined;
      }
    }, {
      key: "pop",
      value: function pop() {
        return this.items.length > 0 ? this.items.pop() : null;
      }
    }, {
      key: "push",
      value: function push(l) {
        this.items.push(l);
        return this;
      }
    }, {
      key: "pushMultiple",
      value: function pushMultiple(arr) {
        this.items.push.apply(this.items, arr);
        arr.length = 0;
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.items.length = 0;
        return this;
      }
    }]);
    return Stack;
  }();

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var Pools = {};
  var PoolManager = /*#__PURE__*/function () {
    function PoolManager(config) {
      _classCallCheck(this, PoolManager);
      this.pools = GetValue$5(config, 'pools', Pools);
    }
    _createClass(PoolManager, [{
      key: "destroy",
      value: function destroy() {
        this.pools = undefined;
      }
    }, {
      key: "free",
      value: function free(bob) {
        if (!this.pools) {
          return this;
        }
        var bobType = bob.type;
        if (!this.pools.hasOwnProperty(bobType)) {
          this.pools[bobType] = new Stack();
        }
        this.pools[bobType].push(bob);
        bob.onFree();
        return this;
      }
    }, {
      key: "freeMultiple",
      value: function freeMultiple(bobs) {
        if (!this.pools) {
          return this;
        }
        for (var i = 0, cnt = bobs.length; i < cnt; i++) {
          this.free(bobs[i]);
        }
        return this;
      }
    }, {
      key: "allocate",
      value: function allocate(bobType) {
        if (!this.pools || !this.pools.hasOwnProperty(bobType)) {
          return null;
        }
        return this.pools[bobType].pop();
      }
    }]);
    return PoolManager;
  }();

  var MinVersion = 60;
  var IsChecked = false;
  var CheckP3Version = function CheckP3Version(minVersion) {
    if (IsChecked) {
      return;
    }
    if (minVersion === undefined) {
      minVersion = MinVersion;
    }
    var currentVersion = parseInt(Phaser.VERSION.match(/\.(\d+)\./)[1]);
    if (currentVersion < minVersion) {
      console.error("Minimum supported version : 3.".concat(minVersion));
    }
    IsChecked = true;
  };

  CheckP3Version();
  var GameObject = Phaser.GameObjects.GameObject;
  var IsPlainObject$4 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var List = Phaser.Structs.List;
  var StableSort = Phaser.Utils.Array.StableSort;
  var Blitter = /*#__PURE__*/function (_GameObject) {
    _inherits(Blitter, _GameObject);
    function Blitter(scene, x, y, texture, frame, config) {
      var _this;
      _classCallCheck(this, Blitter);
      if (IsPlainObject$4(x)) {
        config = x;
        x = GetValue$4(config, 'x', 0);
        y = GetValue$4(config, 'y', 0);
        texture = GetValue$4(config, 'texture');
        frame = GetValue$4(config, 'frame');
      }
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      _this = _callSuper(this, Blitter, [scene, 'rexBlitter']);
      _this.children = new List();
      _this.renderList = [];
      _this.displayListDirty = false;
      _this.lastAppendedChildren = [];
      var reuseBob = GetValue$4(config, 'reuseBob', true);
      _this.poolManager = reuseBob ? new PoolManager(config) : undefined;
      _this.setTexture(texture, frame);
      _this.setPosition(x, y);
      _this.setOrigin(0, 0);
      _this.clearTint();
      _this.initPipeline();
      _this.initPostPipeline();
      return _this;
    }
    _createClass(Blitter, [{
      key: "preDestroy",
      value: function preDestroy() {
        this.removeChildren();
        this.children.destroy();
        this.renderList.length = 0;
        if (this.poolManager) {
          this.poolManager.destroy();
        }
      }
    }, {
      key: "getRenderList",
      value: function getRenderList() {
        if (this.displayListDirty) {
          this.renderList.length = 0;
          var needDepthSort = false;
          var children = this.children.list;
          for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (ChildCanRender(child)) {
              this.renderList.push(child);
              if (!needDepthSort) {
                needDepthSort = child.depth !== 0;
              }
            }
          }
          if (needDepthSort) {
            StableSort(this.renderList, SortByDepth);
          }
          this.displayListDirty = false;
        }
        return this.renderList;
      }
    }]);
    return Blitter;
  }(GameObject);
  var ChildCanRender = function ChildCanRender(child) {
    return child.active && child.visible && child.alpha > 0;
  };
  var SortByDepth = function SortByDepth(childA, childB) {
    return childA._depth - childB._depth;
  };
  var Components = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Blitter, [Components.Alpha, Components.BlendMode, Components.ComputedSize, Components.Depth, Components.GetBounds, Components.Mask, Components.Origin, Components.Pipeline, Components.PostPipeline, Components.ScrollFactor, Components.Transform, Components.Visible, Render, methods$1]);

  var SetGetFrameNameCallback = function SetGetFrameNameCallback(callback) {
    if (callback === undefined) {
      callback = DefaultGetFrameNameCallback;
    }
    this.getFrameNameCallback = callback;
    return this;
  };
  var DefaultGetFrameNameCallback = function DefaultGetFrameNameCallback(colIndex, rowIndex, baseFrameName) {
    if (baseFrameName === '__BASE') {
      return "".concat(colIndex, ",").concat(rowIndex);
    } else {
      return "".concat(baseFrameName, ":").concat(colIndex, ",").concat(rowIndex);
    }
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * This is a slightly modified version of jQuery.isPlainObject.
   * A plain object is an object whose internal class property is [object Object].
   *
   * @function Phaser.Utils.Objects.IsPlainObject
   * @since 3.0.0
   *
   * @param {object} obj - The object to inspect.
   *
   * @return {boolean} `true` if the object is plain, otherwise `false`.
   */
  var IsPlainObject$3 = function IsPlainObject(obj) {
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if (_typeof(obj) !== 'object' || obj.nodeType || obj === obj.window) {
      return false;
    }

    // Support: Firefox <20
    // The try/catch suppresses exceptions thrown when attempting to access
    // the "constructor" property of certain host objects, ie. |window.location|
    // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
    try {
      if (obj.constructor && !{}.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
      }
    } catch (e) {
      return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
  };

  var DeepClone = function DeepClone(inObject) {
    var outObject;
    var value;
    var key;
    if (inObject == null || _typeof(inObject) !== 'object') {
      //  inObject is not an object
      return inObject;
    }

    //  Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
    if (IsPlainObject$3(inObject)) {
      for (key in inObject) {
        value = inObject[key];

        //  Recursively (deep) copy for nested objects, including arrays
        outObject[key] = DeepClone(value);
      }
    } else {
      outObject = inObject;
    }
    return outObject;
  };

  var SetBaseTexture = function SetBaseTexture(key, baseFrameName, columns, rows) {
    if (Array.isArray(baseFrameName)) {
      rows = columns;
      columns = baseFrameName;
      baseFrameName = undefined;
    }
    if (baseFrameName == null) {
      baseFrameName = '__BASE';
    }
    if (typeof columns === 'number' && arguments.length >= 6) {
      columns = [arguments[2], undefined, arguments[3]];
      rows = [arguments[4], undefined, arguments[5]];
    } else if (columns === undefined && rows === undefined && this.columns.data !== undefined && this.rows.data !== undefined) {
      columns = this.columns.data;
      rows = this.rows.data;
    } else {
      columns = DeepClone(columns);
      rows = DeepClone(rows);
    }
    this.textureKey = key;
    this.baseFrameName = baseFrameName;
    this.columns.data = columns;
    this.columns.count = columns ? columns.length : 0;
    this.columns.stretch = 0;
    this.columns.minWidth = 0;
    this.columns.scale = 1;
    this.rows.data = rows;
    this.rows.count = rows ? rows.length : 0;
    this.rows.stretch = 0;
    this.rows.minHeight = 0;
    this.rows.scale = 1;
    var texture = this.scene.sys.textures.get(key);
    if (!texture) {
      this.clear();
      return this;
    }
    if (!columns || !rows) {
      this.clear();
      return this;
    }

    // Get remainder width/height for unknown width/height
    var baseFrame = texture.get(baseFrameName);
    var remainderTextureWidth = baseFrame.width;
    var unknownColumnWidthCount = 0;
    for (var i = 0, cnt = columns.length; i < cnt; i++) {
      if (columns[i] === undefined) {
        unknownColumnWidthCount++;
      } else if (typeof columns[i] === 'number') {
        remainderTextureWidth -= columns[i];
      } else {
        remainderTextureWidth -= columns[i].width;
      }
    }
    var unknownColumnWidth = unknownColumnWidthCount > 0 ? remainderTextureWidth / unknownColumnWidthCount : 0;
    var remainderTextureHeight = baseFrame.height;
    var unknownRowHeightCount = 0;
    for (var i = 0, cnt = rows.length; i < cnt; i++) {
      if (rows[i] === undefined) {
        unknownRowHeightCount++;
      } else if (typeof rows[i] === 'number') {
        remainderTextureHeight -= rows[i];
      } else {
        remainderTextureHeight -= rows[i].width;
      }
    }
    var unknownRowHeight = unknownRowHeightCount ? remainderTextureHeight / unknownRowHeightCount : 0;
    var row, col, rowHeight, colWidth, frameName;
    var offsetX = 0,
      offsetY = 0;
    for (var j = 0, jcnt = rows.length; j < jcnt; j++) {
      // Unknown height
      if (rows[j] === undefined) {
        rows[j] = unknownRowHeight;
      }
      if (typeof rows[j] === 'number') {
        rows[j] = {
          height: rows[j],
          stretch: j % 2
        };
      }
      row = rows[j];
      rowHeight = row.height;
      this.rows.stretch += row.stretch | 0;
      this.rows.minHeight += row.stretch > 0 ? 0 : rowHeight;
      offsetX = 0;
      for (var i = 0, icnt = columns.length; i < icnt; i++) {
        // Unknown width
        if (columns[i] === undefined) {
          columns[i] = unknownColumnWidth;
        }
        if (typeof columns[i] === 'number') {
          columns[i] = {
            width: columns[i],
            stretch: i % 2
          };
        }
        col = columns[i];
        colWidth = col.width;
        if (j === 0) {
          this.columns.stretch += col.stretch | 0;
          this.columns.minWidth += col.stretch > 0 ? 0 : colWidth;
        }
        if (colWidth >= 1 && rowHeight >= 1) {
          frameName = this.getFrameNameCallback(i, j, baseFrameName);
          var frameNameType = _typeof(frameName);
          if (frameNameType === 'string' || frameNameType === 'number') {
            texture.add(frameName, 0, offsetX + baseFrame.cutX, offsetY + baseFrame.cutY, colWidth, rowHeight);
            // Do nothing if frameName is existed
          }
        }
        offsetX += colWidth;
      }
      offsetY += rowHeight;
    }
    this.updateTexture();
    return this;
  };

  var UpdateTexture = function UpdateTexture() {
    this.clear();
    if (this.textureKey === undefined) {
      return this;
    }
    var texture = this.scene.sys.textures.get(this.textureKey);
    if (!texture) {
      return this;
    }
    var minWidth = this.columns.minWidth * this.maxFixedPartScaleX; // Fixed-part width
    var minHeight = this.rows.minHeight * this.maxFixedPartScaleY; // Fixed-part height
    var stretchWidth = this.width - minWidth;
    var stretchHeight = this.height - minHeight;
    var fixedPartScaleX = stretchWidth >= 0 ? this.maxFixedPartScaleX : this.width / minWidth;
    var fixedPartScaleY = stretchHeight >= 0 ? this.maxFixedPartScaleY : this.height / minHeight;
    if (this.preserveRatio) {
      var minScale = Math.min(fixedPartScaleX, fixedPartScaleY);
      if (fixedPartScaleX > minScale) {
        var compensationWidth = (fixedPartScaleX - minScale) * minWidth;
        if (stretchWidth >= 0) {
          stretchWidth += compensationWidth;
        } else {
          stretchWidth = compensationWidth;
        }
        fixedPartScaleX = minScale;
      }
      if (fixedPartScaleY > minScale) {
        var compensationHeight = (fixedPartScaleY - minScale) * minHeight;
        if (stretchHeight >= 0) {
          stretchHeight += compensationHeight;
        } else {
          stretchHeight = compensationHeight;
        }
        fixedPartScaleY = minScale;
      }
    }
    this.columns.scale = fixedPartScaleX;
    this.rows.scale = fixedPartScaleY;
    var proportionWidth;
    if (stretchWidth > 0) {
      proportionWidth = this.columns.stretch > 0 ? stretchWidth / this.columns.stretch : 0;
    } else {
      proportionWidth = 0;
    }
    var proportionHeight;
    if (stretchHeight > 0) {
      proportionHeight = this.rows.stretch > 0 ? stretchHeight / this.rows.stretch : 0;
    } else {
      proportionHeight = 0;
    }
    var frameName, col, row, colWidth, rowHeight;
    var offsetX = 0,
      offsetY = 0;
    var imageType;
    this._beginDraw();
    for (var j = 0, jcnt = this.rows.count; j < jcnt; j++) {
      row = this.rows.data[j];
      rowHeight = row.stretch === 0 ? row.height * fixedPartScaleY : proportionHeight * row.stretch;
      offsetX = 0;
      for (var i = 0, icnt = this.columns.count; i < icnt; i++) {
        col = this.columns.data[i];
        colWidth = col.stretch === 0 ? col.width * fixedPartScaleX : proportionWidth * col.stretch;
        frameName = this.getFrameNameCallback(i, j, this.baseFrameName);
        if (texture.has(frameName) && colWidth > 0 && rowHeight > 0) {
          if (row.stretch === 0 && col.stretch === 0) {
            // Fixed parts
            imageType = 0; // Draw image
          } else {
            // Stretchable parts
            if (this.getStretchMode(i, j) === 0) {
              // Scaled image
              imageType = 0; // Draw scaled image
            } else {
              // Repeat tile-sprite
              imageType = 1; // Draw tile-sprite
            }
          }
          if (imageType === 0) {
            this._drawImage(this.textureKey, frameName, offsetX, offsetY, colWidth, rowHeight);
          } else {
            this._drawTileSprite(this.textureKey, frameName, offsetX, offsetY, colWidth, rowHeight);
          }
        }
        offsetX += colWidth;
      }
      offsetY += rowHeight;
    }
    this._endDraw();
  };

  var IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var SetStretchMode = function SetStretchMode(mode) {
    if (IsPlainObject$2(mode)) {
      this.stretchMode.edge = parseMode(GetValue$3(mode, 'edge', 0));
      this.stretchMode.internal = parseMode(GetValue$3(mode, 'internal', 0));
    } else {
      mode = parseMode(mode);
      this.stretchMode.edge = mode;
      this.stretchMode.internal = mode;
    }
    return this;
  };
  var parseMode = function parseMode(mode) {
    if (typeof mode === 'string') {
      mode = EXTENDMODE[mode];
    }
    return mode;
  };
  var EXTENDMODE = {
    scale: 0,
    repeat: 1
  };

  var IsEdge = function IsEdge(colIndex, rowIndex) {
    return colIndex === 0 || colIndex === this.columns.count - 1 || rowIndex === 0 || rowIndex === this.rows.count - 1;
  };

  var GetStretchMode = function GetStretchMode(colIndex, rowIndex) {
    return IsEdge.call(this, colIndex, rowIndex) ? this.stretchMode.edge : this.stretchMode.internal;
  };

  var SetPreserveRatio = function SetPreserveRatio(enable) {
    if (enable == undefined) {
      enable = true;
    }
    this.preserveRatio = enable;
    return this;
  };

  var SetMaxFixedPartScale = function SetMaxFixedPartScale(scaleX, scaleY) {
    if (scaleY === undefined) {
      scaleY = scaleX;
    }
    this.maxFixedPartScaleX = scaleX;
    this.maxFixedPartScaleY = scaleY;
    return this;
  };

  var NOOP = function NOOP() {
    //  NOOP
  };

  var Methods$1 = {
    _beginDraw: NOOP,
    _drawImage: NOOP,
    _drawTileSprite: NOOP,
    _endDraw: NOOP,
    setGetFrameNameCallback: SetGetFrameNameCallback,
    setBaseTexture: SetBaseTexture,
    updateTexture: UpdateTexture,
    setStretchMode: SetStretchMode,
    getStretchMode: GetStretchMode,
    setPreserveRatio: SetPreserveRatio,
    setMaxFixedPartScale: SetMaxFixedPartScale
  };

  var IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var NinePatchBase = function NinePatchBase(GOClass, type) {
    var NinePatch = /*#__PURE__*/function (_GOClass) {
      _inherits(NinePatch, _GOClass);
      function NinePatch(scene, x, y, width, height, key, baseFrame, columns, rows, config) {
        var _this;
        _classCallCheck(this, NinePatch);
        if (IsPlainObject$1(x)) {
          config = x;
          x = GetValue$2(config, 'x', 0);
          y = GetValue$2(config, 'y', 0);
          width = GetValue$2(config, 'width', 1);
          height = GetValue$2(config, 'height', 1);
          key = GetValue$2(config, 'key', undefined);
          baseFrame = GetValue$2(config, 'baseFrame', undefined);
          columns = GetValue$2(config, 'columns', undefined);
          rows = GetValue$2(config, 'rows', undefined);
        } else if (IsPlainObject$1(width)) {
          config = width;
          width = GetValue$2(config, 'width', 1);
          height = GetValue$2(config, 'height', 1);
          key = GetValue$2(config, 'key', undefined);
          baseFrame = GetValue$2(config, 'baseFrame', undefined);
          columns = GetValue$2(config, 'columns', undefined);
          rows = GetValue$2(config, 'rows', undefined);
        } else if (IsPlainObject$1(key)) {
          config = key;
          key = GetValue$2(config, 'key', undefined);
          baseFrame = GetValue$2(config, 'baseFrame', undefined);
          columns = GetValue$2(config, 'columns', undefined);
          rows = GetValue$2(config, 'rows', undefined);
        } else if (IsPlainObject$1(baseFrame)) {
          config = baseFrame;
          baseFrame = GetValue$2(config, 'baseFrame', undefined);
          columns = GetValue$2(config, 'columns', undefined);
          rows = GetValue$2(config, 'rows', undefined);
        } else if (Array.isArray(baseFrame)) {
          config = rows;
          rows = columns;
          columns = baseFrame;
          baseFrame = GetValue$2(config, 'baseFrame', undefined);
        } else if (IsPlainObject$1(columns)) {
          config = columns;
          columns = GetValue$2(config, 'columns', undefined);
          rows = GetValue$2(config, 'rows', undefined);
        }
        if (baseFrame === undefined) {
          baseFrame = GetValue$2(config, 'frame', undefined);
        }
        if (columns === undefined) {
          var leftWidth = GetValue$2(config, 'leftWidth', undefined);
          var rightWidth = GetValue$2(config, 'rightWidth', undefined);
          if (leftWidth !== undefined && rightWidth !== undefined) {
            columns = [leftWidth, undefined, rightWidth];
          }
        }
        if (rows === undefined) {
          var topHeight = GetValue$2(config, 'topHeight', undefined);
          var bottomHeight = GetValue$2(config, 'bottomHeight', undefined);
          if (topHeight !== undefined && bottomHeight !== undefined) {
            rows = [topHeight, undefined, bottomHeight];
          }
        }
        _this = _callSuper(this, NinePatch, [scene]);
        _this.type = type;
        _this.setPosition(x, y).setSize(width, height).setOrigin(0.5, 0.5);
        _this.columns = {};
        _this.rows = {};
        _this.stretchMode = {};
        _this._tileSprite = undefined; // Reserved for drawing image
        _this._image = undefined; // Reserved for drawing image

        _this.setGetFrameNameCallback(GetValue$2(config, 'getFrameNameCallback', undefined));
        _this.setStretchMode(GetValue$2(config, 'stretchMode', 0));
        _this.setPreserveRatio(GetValue$2(config, 'preserveRatio', true));
        var maxFixedPartScale = GetValue$2(config, 'maxFixedPartScale', 1);
        var maxFixedPartScaleX = GetValue$2(config, 'maxFixedPartScaleX', maxFixedPartScale);
        var maxFixedPartScaleY = GetValue$2(config, 'maxFixedPartScaleY', undefined);
        _this.setMaxFixedPartScale(maxFixedPartScaleX, maxFixedPartScaleY);
        _this.setBaseTexture(key, baseFrame, columns, rows);
        return _this;
      }
      _createClass(NinePatch, [{
        key: "minWidth",
        get: function get() {
          return this.columns.minWidth;
        }
      }, {
        key: "minHeight",
        get: function get() {
          return this.rows.minHeight;
        }
      }, {
        key: "fixedPartScaleX",
        get: function get() {
          return this.columns.scale;
        }
      }, {
        key: "fixedPartScaleY",
        get: function get() {
          return this.rows.scale;
        }
      }, {
        key: "resize",
        value: function resize(width, height) {
          if (this.width === width && this.height === height) {
            return this;
          }
          if (_get(_getPrototypeOf(NinePatch.prototype), "resize", this)) {
            _get(_getPrototypeOf(NinePatch.prototype), "resize", this).call(this, width, height);
          } else {
            // Use setSize method for alternative 
            _get(_getPrototypeOf(NinePatch.prototype), "setSize", this).call(this, width, height);
          }
          this.updateTexture();
          return this;
        }
      }, {
        key: "leftWidth",
        get: function get() {
          return this.columns.data[0];
        }
      }, {
        key: "rightWidth",
        get: function get() {
          return this.columns.data[this.columns.count - 1];
        }
      }, {
        key: "topHeight",
        get: function get() {
          return this.rows.data[0];
        }
      }, {
        key: "bottomHeight",
        get: function get() {
          return this.rows.data[this.rows.count - 1];
        }
      }]);
      return NinePatch;
    }(GOClass);
    Object.assign(NinePatch.prototype, Methods$1);
    return NinePatch;
  };

  var ImageTypeName = 'image';

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

  var Base = /*#__PURE__*/function () {
    function Base(parent, type) {
      _classCallCheck(this, Base);
      this.type = type;
      this.data = undefined;
      this.setParent(parent).reset().setActive();
    }
    _createClass(Base, [{
      key: "destroy",
      value: function destroy() {
        if (this.parent) {
          this.parent.removeChild(this);
          // Remove this bob from blitter, and free it (bob.onFree())
          // Will set this.parent to undefined
        }
      }
    }, {
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent;
        return this;
      }

      // get scene() {
      //     if (this.parent) {
      //         return this.parent.scene;
      //     } else {
      //         return null;
      //     }
      // }
    }, {
      key: "setDisplayListDirty",
      value: function setDisplayListDirty(displayListDirty) {
        if (displayListDirty && this.parent) {
          this.parent.displayListDirty = true;
        }
        return this;
      }
    }, {
      key: "active",
      get: function get() {
        return this._active;
      },
      set: function set(value) {
        this.setDisplayListDirty(this._active != value);
        this._active = value;
      }
    }, {
      key: "setActive",
      value: function setActive(active) {
        if (active === undefined) {
          active = true;
        }
        this.active = active;
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        return this;
      }

      // Override
    }, {
      key: "reset",
      value: function reset() {
        this.clearData();
      }

      // Override
    }, {
      key: "onFree",
      value: function onFree() {
        this.reset().setActive(false).setParent();
      }
    }]);
    return Base;
  }();
  Object.assign(Base.prototype, DataMethods);

  var DegToRad = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var RenderBase = /*#__PURE__*/function (_Base) {
    _inherits(RenderBase, _Base);
    function RenderBase() {
      _classCallCheck(this, RenderBase);
      return _callSuper(this, RenderBase, arguments);
    }
    _createClass(RenderBase, [{
      key: "visible",
      get: function get() {
        return this._visible;
      },
      set: function set(value) {
        this.setDisplayListDirty(this._visible != value);
        this._visible = value;
      }
    }, {
      key: "setVisible",
      value: function setVisible(visible) {
        if (visible === undefined) {
          visible = true;
        }
        this.visible = visible;
        return this;
      }
    }, {
      key: "alpha",
      get: function get() {
        return this._alpha;
      },
      set: function set(value) {
        this.setDisplayListDirty(!!this._alpha !== !!value);
        this._alpha = value;
      }
    }, {
      key: "setAlpha",
      value: function setAlpha(alpha) {
        this.alpha = alpha;
        return this;
      }
    }, {
      key: "setX",
      value: function setX(x) {
        this.x = x;
        return this;
      }
    }, {
      key: "setY",
      value: function setY(y) {
        this.y = y;
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
      key: "setRotation",
      value: function setRotation(rotation) {
        this.rotation = rotation;
        return this;
      }
    }, {
      key: "angle",
      get: function get() {
        return RadToDeg(this.rotation);
      },
      set: function set(value) {
        this.rotation = DegToRad(value);
      }
    }, {
      key: "setAngle",
      value: function setAngle(angle) {
        this.angle = angle;
        return this;
      }
    }, {
      key: "setScaleX",
      value: function setScaleX(scaleX) {
        this.scaleX = scaleX;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this._width = value;
      }
    }, {
      key: "setWidth",
      value: function setWidth(width, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }
        this.width = width;
        if (keepAspectRatio) {
          this.scaleY = this.scaleX;
        }
        return this;
      }
    }, {
      key: "setScaleY",
      value: function setScaleY(scaleY) {
        this.scaleY = scaleY;
        return this;
      }
    }, {
      key: "setScale",
      value: function setScale(scaleX, scaleY) {
        if (scaleY === undefined) {
          scaleY = scaleX;
        }
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this._height = value;
      }
    }, {
      key: "setHeight",
      value: function setHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }
        this.height = height;
        if (keepAspectRatio) {
          this.scaleX = this.scaleY;
        }
        return this;
      }
    }, {
      key: "displayWidth",
      get: function get() {
        return this._width * this.scaleX;
      },
      set: function set(value) {
        this.scaleX = value / this._width;
      }
    }, {
      key: "setDisplayWidth",
      value: function setDisplayWidth(width, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }
        this.displayWidth = width;
        if (keepAspectRatio) {
          this.scaleY = this.scaleX;
        }
        return this;
      }
    }, {
      key: "displayHeight",
      get: function get() {
        return this._height * this.scaleY;
      },
      set: function set(value) {
        this.scaleY = value / this._height;
      }
    }, {
      key: "setDisplayHeight",
      value: function setDisplayHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
          keepAspectRatio = false;
        }
        this.displayHeight = height;
        if (keepAspectRatio) {
          this.scaleX = this.scaleY;
        }
        return this;
      }
    }, {
      key: "setOriginX",
      value: function setOriginX(originX) {
        this.originX = originX;
        this._displayOriginX = this.width * originX;
        return this;
      }
    }, {
      key: "setOriginY",
      value: function setOriginY(originY) {
        this.originY = originY;
        this._displayOriginY = this.height * originY;
        return this;
      }
    }, {
      key: "setOrigin",
      value: function setOrigin(originX, originY) {
        if (originY === undefined) {
          originY = originX;
        }
        this.setOriginX(originX).setOriginY(originY);
        return this;
      }
    }, {
      key: "depth",
      get: function get() {
        return this._depth;
      },
      set: function set(value) {
        this.setDisplayListDirty(this._depth != value);
        this._depth = value;
      }
    }, {
      key: "setDepth",
      value: function setDepth(depth) {
        if (depth === undefined) {
          depth = 0;
        }
        this.depth = depth;
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        if (!o) {
          return this;
        }
        if (o.hasOwnProperty('x')) {
          this.setX(o.x);
        }
        if (o.hasOwnProperty('y')) {
          this.setY(o.y);
        }
        if (o.hasOwnProperty('rotation')) {
          this.setRotation(o.rotation);
        } else if (o.hasOwnProperty('angle')) {
          this.setAngle(o.angle);
        }
        if (o.hasOwnProperty('alpha')) {
          this.setAlpha(o.alpha);
        }

        // ScaleX, ScaleY
        var width = GetValue(o, 'width', undefined);
        var height = GetValue(o, 'height', undefined);
        var scale = GetValue(o, 'scale', undefined);
        var scaleX = GetValue(o, 'scaleX', scale);
        var scaleY = GetValue(o, 'scaleY', scale);
        if (width !== undefined) {
          if (height === undefined && scaleY === undefined) {
            this.setWidth(width, true);
          } else {
            this.setWidth(width);
          }
        } else if (scaleX !== undefined) {
          this.setScaleX(scaleX);
        } else if (o.hasOwnProperty('displayWidth')) {
          this.setDisplayWidth(o.displayWidth);
        }
        if (height !== undefined) {
          if (width === undefined && scaleX === undefined) {
            this.setHeight(height, true);
          } else {
            this.setHeight(height);
          }
        } else if (scaleY !== undefined) {
          this.setScaleY(scaleY);
        } else if (o.hasOwnProperty('displayHeight')) {
          this.setDisplayHeight(o.displayHeight);
        }
        var origin = GetValue(o, 'origin', undefined);
        if (origin !== undefined) {
          this.setOrigin(origin);
        } else {
          if (o.hasOwnProperty('originX')) {
            this.setOriginX(o.originX);
          }
          if (o.hasOwnProperty('originY')) {
            this.setOriginY(o.originY);
          }
        }
        if (o.hasOwnProperty('depth')) {
          this.setDepth(o.depth);
        }
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        _get(_getPrototypeOf(RenderBase.prototype), "reset", this).call(this);
        this.setVisible().setAlpha(1).setPosition(0, 0).setRotation(0).setScale(1, 1).setOrigin(0).setDepth(0);
        return this;
      }

      // Override
    }, {
      key: "webglRender",
      value: function webglRender(pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels) {}
      // Override
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy, roundPixels) {}
    }]);
    return RenderBase;
  }(Base);

  var TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
  var GetTint = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;
  var FrameMatrix = new TransformMatrix();
  var WebglRender = function WebglRender(pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels) {
    var width = this._width,
      height = this._height;
    var displayOriginX = width * this.originX,
      displayOriginY = height * this.originY;
    var x = this.x - dx,
      y = this.y - dy;
    var flipX = 1;
    var flipY = 1;
    if (this.flipX) {
      x += width - displayOriginX * 2;
      flipX = -1;
    }
    if (this.flipY) {
      y += height - displayOriginY * 2;
      flipY = -1;
    }
    FrameMatrix.applyITRS(x, y, this.rotation, this.scaleX * flipX, this.scaleY * flipY);
    calcMatrix.multiply(FrameMatrix, FrameMatrix);
    var tx = -displayOriginX;
    var ty = -displayOriginY;
    var tw = tx + width;
    var th = ty + height;
    var quad = FrameMatrix.setQuad(tx, ty, tw, th, roundPixels);
    var u0 = this.frame.u0;
    var v0 = this.frame.v0;
    var u1 = this.frame.u1;
    var v1 = this.frame.v1;
    var tint = GetTint(this.tint, this.alpha * alpha);
    pipeline.batchQuad(this.parent, quad[0], quad[1], quad[2], quad[3], quad[4], quad[5], quad[6], quad[7], u0, v0, u1, v1, tint, tint, tint, tint, this.tintFill, texture, textureUnit);
  };

  var CanvasRender = function CanvasRender(ctx, dx, dy, roundPixels) {
    ctx.save();
    var width = this._width,
      height = this._height;
    var displayOriginX = width * this.originX,
      displayOriginY = height * this.originY;
    var x = this.x - displayOriginX,
      y = this.y - displayOriginY;
    var flipX = 1;
    var flipY = 1;
    if (this.flipX) {
      x += width;
      flipX = -1;
    }
    if (this.flipY) {
      y += height;
      flipY = -1;
    }
    if (roundPixels) {
      x = Math.round(x);
      y = Math.round(y);
    }
    ctx.translate(x, y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scaleX * flipX, this.scaleY * flipY);
    var frame = this.frame;
    ctx.drawImage(frame.source.image, frame.cutX, frame.cutY, width, height, 0, 0, width, height);
    ctx.restore();
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var ImageData = /*#__PURE__*/function (_RenderBase) {
    _inherits(ImageData, _RenderBase);
    function ImageData(parent, frame) {
      var _this;
      _classCallCheck(this, ImageData);
      _this = _callSuper(this, ImageData, [parent, ImageTypeName]);
      _this.setFrame(frame);
      return _this;
    }
    _createClass(ImageData, [{
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {}
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {}
    }, {
      key: "setFrame",
      value: function setFrame(frame) {
        if (arguments.length > 0 && !IsPlainObject(frame)) {
          frame = this.parent.texture.get(frame);
        }
        this.frame = frame;
        this._width = frame ? frame.width : 0;
        this._height = frame ? frame.height : 0;
        return this;
      }
    }, {
      key: "setFlipX",
      value: function setFlipX(flipX) {
        if (flipX === undefined) {
          flipX = true;
        }
        this.flipX = flipX;
        return this;
      }
    }, {
      key: "setFlipY",
      value: function setFlipY(flipY) {
        if (flipY === undefined) {
          flipY = true;
        }
        this.flipY = flipY;
        return this;
      }
    }, {
      key: "resetFlip",
      value: function resetFlip() {
        this.flipX = false;
        this.flipY = false;
        return this;
      }
    }, {
      key: "tint",
      get: function get() {
        if (this._tint === undefined) {
          return this.parent.tint;
        } else {
          return this._tint;
        }
      },
      set: function set(value) {
        this._tint = value;
      }
    }, {
      key: "setTint",
      value: function setTint(value) {
        this.tint = value;
        this.tintFill = false;
        return this;
      }
    }, {
      key: "setTintFill",
      value: function setTintFill(value) {
        this.tint = value;
        this.tintFill = true;
        return this;
      }
    }, {
      key: "clearTint",
      value: function clearTint() {
        this.setTint(0xffffff);
        return this;
      }
    }, {
      key: "resetTint",
      value: function resetTint() {
        this.tint = undefined;
        this.tintFill = undefined;
        return this;
      }
    }, {
      key: "tintFill",
      get: function get() {
        if (this._tintFill === undefined) {
          return this.parent.tintFill;
        } else {
          return this._tintFill;
        }
      },
      set: function set(value) {
        this._tintFill = value;
      }
    }, {
      key: "reset",
      value: function reset() {
        _get(_getPrototypeOf(ImageData.prototype), "reset", this).call(this);
        this.resetFlip().resetTint().setFrame();
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        if (!o) {
          return this;
        }

        // Size of Image is equal to frame size,
        // Move width, height properties to displayWidth,displayHeight
        if (o.hasOwnProperty('width')) {
          o.displayWidth = o.width;
          delete o.width;
        }
        if (o.hasOwnProperty('height')) {
          o.displayHeight = o.height;
          delete o.height;
        }
        if (o.hasOwnProperty('frame')) {
          this.setFrame(o.frame);
        }
        _get(_getPrototypeOf(ImageData.prototype), "modifyPorperties", this).call(this, o);
        if (o.hasOwnProperty('flipX')) {
          this.setFlipX(o.flipX);
        }
        if (o.hasOwnProperty('flipY')) {
          this.setFlipY(o.flipY);
        }
        if (o.hasOwnProperty('tint')) {
          this.setTint(o.tint);
        }
        if (o.hasOwnProperty('tintFill')) {
          this.setTintFill(o.tintFill);
        }
        return this;
      }
    }]);
    return ImageData;
  }(RenderBase);
  var methods = {
    webglRender: WebglRender,
    canvasRender: CanvasRender
  };
  Object.assign(ImageData.prototype, methods);

  var AddImage = function AddImage(blitter, config) {
    if (typeof config === 'string') {
      config = {
        frame: config
      };
    }
    var bob = blitter.poolManager ? blitter.poolManager.allocate(ImageTypeName) : null;
    if (bob === null) {
      bob = new ImageData(blitter);
    } else {
      bob.setParent(blitter).setActive();
    }
    bob.modifyPorperties(config);
    blitter.addChild(bob);
    return bob;
  };

  var DrawImage = function DrawImage(key, frame, x, y, width, height) {
    AddImage(this, {
      frame: frame,
      x: x,
      y: y,
      width: width,
      height: height
    });
  };

  var DrawTileSprite = function DrawTileSprite(key, frame, x, y, width, height) {
    var frameObj = this.texture.get(frame);
    var frameWidth = frameObj.width,
      frameHeight = frameObj.height;
    var colCount = Math.floor(width / frameWidth),
      rowCount = Math.floor(height / frameHeight);
    // Align images at center
    x += (width - colCount * frameWidth) / 2;
    y += (height - rowCount * frameHeight) / 2;
    for (var colIndex = 0; colIndex < colCount; colIndex++) {
      for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        AddImage(this, {
          frame: frame,
          x: x + colIndex * frameWidth,
          y: y + rowIndex * frameHeight
        });
      }
    }
  };

  var Methods = {
    _drawImage: DrawImage,
    _drawTileSprite: DrawTileSprite
  };

  var NinePatch = /*#__PURE__*/function (_NinePatchBase) {
    _inherits(NinePatch, _NinePatchBase);
    function NinePatch() {
      _classCallCheck(this, NinePatch);
      return _callSuper(this, NinePatch, arguments);
    }
    _createClass(NinePatch, [{
      key: "setBaseTexture",
      value: function setBaseTexture(key, baseFrameName, columns, rows) {
        this.setTexture(key, baseFrameName);
        _get(_getPrototypeOf(NinePatch.prototype), "setBaseTexture", this).call(this, key, baseFrameName, columns, rows);
        return this;
      }
    }]);
    return NinePatch;
  }(NinePatchBase(Blitter, 'rexNinePatch2'));
  Object.assign(NinePatch.prototype, Methods);

  function Factory (x, y, width, height, key, baseFrame, columns, rows, config) {
    var gameObject = new NinePatch(this.scene, x, y, width, height, key, baseFrame, columns, rows, config);
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
    var gameObject = new NinePatch(this.scene, config);
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

  var NinePatchPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(NinePatchPlugin, _Phaser$Plugins$BaseP);
    function NinePatchPlugin(pluginManager) {
      var _this;
      _classCallCheck(this, NinePatchPlugin);
      _this = _callSuper(this, NinePatchPlugin, [pluginManager]);

      //  Register our new Game Object type
      pluginManager.registerGameObject('rexNinePatch2', Factory, Creator);
      return _this;
    }
    _createClass(NinePatchPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return NinePatchPlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.GameObjects.NinePatch2', NinePatch);

  return NinePatchPlugin;

}));
