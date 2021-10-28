(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexgridcutimageplugin = factory());
}(this, (function () { 'use strict';

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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
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

  var GetFrameNameCallback = function GetFrameNameCallback(baseFrameName, delimiter) {
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

  var IsFunction = function IsFunction(obj) {
    return obj && typeof obj === 'function';
  };

  var GridCut = function GridCut(scene, key, frame, columns, rows, getFrameNameCallback) {
    if (frame == null) {
      frame = '__BASE';
    }

    if (!IsFunction(getFrameNameCallback)) {
      getFrameNameCallback = GetFrameNameCallback(frame, getFrameNameCallback);
    }

    var texture = scene.textures.get(key);
    var baseFrame = texture.frames[frame];
    var cellWidth = baseFrame.width / columns,
        cellHeight = baseFrame.height / rows;
    var offsetX = 0,
        offsetY = 0;
    var frameName;

    for (var y = 0; y < rows; y++) {
      offsetX = 0;

      for (var x = 0; x < columns; x++) {
        frameName = getFrameNameCallback(x, y);
        texture.add(frameName, 0, offsetX + baseFrame.cutX, offsetY + baseFrame.cutY, cellWidth, cellHeight);
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

    var ImageClass = GetValue(config, 'ImageClass', DefaultImageClass);
    var originX = GetValue(config, 'originX', 0.5);
    var originY = GetValue(config, 'originY', 0.5);
    var addToScene = GetValue(config, 'add', true);
    var align = GetValue(config, 'align', addToScene);
    var imageObjectPool = GetValue(config, 'objectPool', undefined);
    var scene = gameObject.scene;
    var key = gameObject.texture.key;
    var frame = gameObject.frame.name;
    var result = GridCut(scene, key, frame, columns, rows);
    var getFrameNameCallback = result.getFrameNameCallback;
    var scaleX = gameObject.scaleX,
        scaleY = gameObject.scaleY;
    var rotation = gameObject.rotation;
    var topLeft = gameObject.getTopLeft(),
        startX = topLeft.x,
        startY = topLeft.y;
    var cellGameObjects = [];
    var cellWidth = result.cellWidth * scaleX,
        cellHeight = result.cellHeight * scaleY;

    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < columns; x++) {
        var cellGameObject;
        var frameName = getFrameNameCallback(x, y);

        if (imageObjectPool && imageObjectPool.length > 0) {
          cellGameObject = imageObjectPool.pop().setTexture(key, frameName);
        } else {
          cellGameObject = new ImageClass(scene, 0, 0, key, frameName);
        }

        if (addToScene) {
          scene.add.existing(cellGameObject);
        }

        var cellTLX = startX + cellWidth * x;
        var cellTLY = startY + cellHeight * y;
        var cellX = cellTLX + originX * cellWidth;
        var cellY = cellTLY + originY * cellHeight;

        if (align) {
          cellGameObject.setOrigin(originX, originY).setPosition(cellX, cellY).setScale(scaleX, scaleY).setRotation(rotation);
          RotateAround(cellGameObject, startX, startY, rotation);
        }

        cellGameObjects.push(cellGameObject);
      }
    }

    return cellGameObjects;
  };

  var RandomPlacePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(RandomPlacePlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(RandomPlacePlugin);

    function RandomPlacePlugin(pluginManager) {
      _classCallCheck(this, RandomPlacePlugin);

      return _super.call(this, pluginManager);
    }

    _createClass(RandomPlacePlugin, [{
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

    return RandomPlacePlugin;
  }(Phaser.Plugins.BasePlugin);

  return RandomPlacePlugin;

})));
