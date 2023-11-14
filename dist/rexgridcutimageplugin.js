(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexgridcutimageplugin = factory());
})(this, (function () { 'use strict';

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
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var GetFrameNameCallback = function GetFrameNameCallback(baseFrameName, delimiter) {
    if (_typeof(baseFrameName) === 'object') {
      baseFrameName = baseFrameName.name;
    }
    if (delimiter === undefined) {
      delimiter = ',';
    }
    var callback;
    if (baseFrameName === '__BASE') {
      callback = function callback(colIndex, rowIndex) {
        return "".concat(colIndex).concat(delimiter).concat(rowIndex);
      };
    } else {
      callback = function callback(colIndex, rowIndex) {
        return "".concat(baseFrameName, "_").concat(colIndex).concat(delimiter).concat(rowIndex);
      };
    }
    return callback;
  };

  var GenerateFrames = function GenerateFrames(scene, key, frame, columns, rows, getFrameNameCallback) {
    if (frame == null) {
      frame = '__BASE';
    }
    if (!getFrameNameCallback) {
      getFrameNameCallback = GetFrameNameCallback(frame, getFrameNameCallback);
    }
    var texture = scene.sys.textures.get(key);
    var baseFrame = _typeof(frame) === 'object' ? frame : texture.get(frame);
    var baseWidth = baseFrame.width,
      baseHeight = baseFrame.height;
    var cellX, cellY, cellName;
    var cellWidth = baseWidth / columns,
      cellHeight = baseHeight / rows;
    var frameCutX = baseFrame.cutX,
      frameCutY = baseFrame.cutY;
    var offsetX = 0,
      offsetY = 0;
    for (var y = 0; y < rows; y++) {
      offsetX = 0;
      for (var x = 0; x < columns; x++) {
        cellName = getFrameNameCallback(x, y);
        cellX = offsetX + frameCutX;
        cellY = offsetY + frameCutY;
        texture.add(cellName, 0, cellX, cellY, cellWidth, cellHeight);
        offsetX += cellWidth;
      }
      offsetY += cellHeight;
    }
    return {
      getFrameNameCallback: getFrameNameCallback,
      cellWidth: cellWidth,
      cellHeight: cellHeight,
      columns: columns,
      rows: rows
    };
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var DefaultImageClass = Phaser.GameObjects.Image;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var RotateAround = Phaser.Math.RotateAround;
  var GridCutImage = function GridCutImage(gameObject, columns, rows, config) {
    if (IsPlainObject(columns)) {
      config = columns;
      columns = GetValue(config, 'columns', 1);
      rows = GetValue(config, 'rows', 1);
    }
    var createImageCallback = GetValue(config, 'createImageCallback');
    if (!createImageCallback) {
      var ImageClass = GetValue(config, 'ImageClass', DefaultImageClass);
      createImageCallback = function createImageCallback(scene, key, frame) {
        return new ImageClass(scene, 0, 0, key, frame);
      };
    }
    var originX = GetValue(config, 'originX', 0.5);
    var originY = GetValue(config, 'originY', 0.5);
    var addToScene = GetValue(config, 'add', true);
    var align = GetValue(config, 'align', addToScene);
    var imageObjectPool = GetValue(config, 'objectPool', undefined);
    var scene = gameObject.scene;
    var texture = gameObject.texture;
    var frame = gameObject.frame;
    var result = GenerateFrames(scene, texture, frame, columns, rows);
    var getFrameNameCallback = result.getFrameNameCallback;
    var scaleX = gameObject.scaleX,
      scaleY = gameObject.scaleY;
    var rotation = gameObject.rotation;
    var topLeft = gameObject.getTopLeft(),
      startX = topLeft.x,
      startY = topLeft.y;
    var cellGameObjects = [];
    var scaleCellWidth = result.cellWidth * scaleX,
      scaleCellHeight = result.cellHeight * scaleY;
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < columns; x++) {
        var cellGameObject;
        var frameName = getFrameNameCallback(x, y);
        if (imageObjectPool && imageObjectPool.length > 0) {
          cellGameObject = imageObjectPool.pop().setTexture(texture, frameName);
        } else {
          cellGameObject = createImageCallback(scene, texture, frameName);
        }
        if (addToScene) {
          scene.add.existing(cellGameObject);
        }
        if (align) {
          var cellTLX = startX + scaleCellWidth * x;
          var cellTLY = startY + scaleCellHeight * y;
          var cellX = cellTLX + originX * scaleCellWidth;
          var cellY = cellTLY + originY * scaleCellHeight;
          cellGameObject.setOrigin(originX, originY).setPosition(cellX, cellY).setScale(scaleX, scaleY).setRotation(rotation);
          RotateAround(cellGameObject, startX, startY, rotation);
        }
        cellGameObjects.push(cellGameObject);
      }
    }
    return cellGameObjects;
  };

  var GridCutImagePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(GridCutImagePlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(GridCutImagePlugin);
    function GridCutImagePlugin(pluginManager) {
      _classCallCheck(this, GridCutImagePlugin);
      return _super.call(this, pluginManager);
    }
    _createClass(GridCutImagePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "gridCut",
      value: function gridCut(gameObject, columns, rows, config) {
        return GridCutImage(gameObject, columns, rows, config);
      }
    }]);
    return GridCutImagePlugin;
  }(Phaser.Plugins.BasePlugin);

  return GridCutImagePlugin;

}));
