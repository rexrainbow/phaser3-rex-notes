(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlineplugin = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var MakeChildImageGameObject = function MakeChildImageGameObject(parent, key, className) {
    if (className === undefined) {
      className = 'image';
    }

    if (!parent[key]) {
      parent[key] = parent.scene.make[className]({
        add: false,
        origin: {
          x: 0,
          y: 0
        }
      });
      parent.once('destroy', function () {
        if (parent[key]) {
          parent[key].destroy();
          parent[key] = undefined;
        }
      });
    }

    return parent[key];
  };

  var DistanceBetween = Phaser.Math.Distance.Between;
  var AngleBetween = Phaser.Math.Angle.Between;

  var UpdateTexture = function UpdateTexture() {
    if (!this.redraw) {
      return this;
    }

    this.redraw = false;
    this.clear();
    var lineStartFrame = this.lineStartFrame;
    var lineEndFrame = this.lineEndFrame;
    var lineBodyFrame = this.lineBodyFrame;
    var lineStartOffset = 0;
    var width = DistanceBetween(this.x0, this.y0, this.x1, this.y1),
        height = 0,
        rotation = AngleBetween(this.x0, this.y0, this.x1, this.y1);

    if (lineStartFrame) {
      lineStartOffset = this.lineStartOrigin * lineStartFrame.cutWidth;
      width += lineStartOffset;
      height = lineStartFrame.cutHeight;
    }

    if (lineEndFrame) {
      width += (1 - this.lineEndOrigin) * lineEndFrame.cutWidth;
      height = Math.max(height, lineEndFrame.cutHeight);
    }

    if (lineBodyFrame) {
      var lineBodyHeight = this.lineBodyWidth !== undefined ? this.lineBodyWidth : lineBodyFrame.cutHeight;
      height = Math.max(height, lineBodyHeight);
    }

    width = Math.floor(width);
    height = Math.floor(height); // no line

    if (width <= 0 || height <= 0) {
      this.setPosition(this.x0, this.y0).setSize(1, 1).setRotation(rotation);
      return this;
    }

    this.setPosition(this.x0, this.y0).setSize(width, height).setRotation(rotation).setOrigin(0, 0); // Set origin to (0,0) before pasting textures

    var offsetX, offsetY;
    var remainderWidth = this.width; // Draw line start

    if (lineStartFrame) {
      offsetX = 0;
      offsetY = (this.height - lineStartFrame.cutHeight) / 2;
      this.drawFrame(this.lineStartTexture, this.lineStartFrameName, offsetX, offsetY);
      remainderWidth -= lineStartFrame.cutWidth;
    } // Draw line end


    if (lineEndFrame) {
      offsetX = this.width - lineEndFrame.cutWidth;
      offsetY = (this.height - lineEndFrame.cutHeight) / 2;
      this.drawFrame(this.lineEndTexture, this.lineEndFrameName, offsetX, offsetY);
      remainderWidth -= lineEndFrame.cutWidth;
    } // Draw line body


    if (lineBodyFrame && remainderWidth > 0 && lineBodyHeight > 0) {
      var lineBody;

      if (this.lineBodyExtendMode === 0) {
        lineBody = MakeChildImageGameObject(this, '_image', 'image');
        lineBody.setTexture(this.lineBodyTexture, this.lineBodyFrameName).setDisplaySize(remainderWidth, lineBodyHeight);
      } else {
        lineBody = MakeChildImageGameObject(this, '_tileSprite', 'tileSprite');
        lineBody.setTexture(this.lineBodyTexture, this.lineBodyFrameName).setSize(remainderWidth, lineBodyHeight);
      }

      offsetX = lineStartFrame ? lineStartFrame.cutWidth : 0;
      offsetY = (this.height - lineBody.displayHeight) / 2;
      this.draw(lineBody, offsetX, offsetY);
    }

    var originX = 1 - (width - lineStartOffset) / width;
    this.setOrigin(originX, 0.5);
  };

  var RenderTexture = Phaser.GameObjects.RenderTexture;
  var GetValue = Phaser.Utils.Objects.GetValue;

  var Line = /*#__PURE__*/function (_RenderTexture) {
    _inherits(Line, _RenderTexture);

    var _super = _createSuper(Line);

    function Line(scene, config) {
      var _this;

      _classCallCheck(this, Line);

      _this = _super.call(this, scene);
      _this.redraw = false;
      _this._tileSprite = undefined; // Reserved for drawing image

      _this._image = undefined; // Reserved for drawing image

      var lineStart = GetValue(config, 'start', undefined);

      if (typeof lineStart === 'string') {
        _this.setLineStartPosition(0, 0);

        _this.setLineStartTexture(lineStart, undefined);

        _this.setLineStartOrigin(undefined);
      } else {
        _this.setLineStartPosition(GetValue(lineStart, 'x', 0), GetValue(lineStart, 'y', 0));

        _this.setLineStartTexture(GetValue(lineStart, 'key', undefined), GetValue(lineStart, 'frame', undefined));

        _this.setLineStartOrigin(GetValue(lineStart, 'origin', undefined));
      }

      var lineEnd = GetValue(config, 'end', undefined);

      if (typeof lineEnd === 'string') {
        _this.setLineEndPosition(0, 0);

        _this.setLineEndTexture(lineEnd, undefined);

        _this.setLineEndOrigin(undefined);
      } else {
        _this.setLineEndPosition(GetValue(lineEnd, 'x', 0), GetValue(lineEnd, 'y', 0));

        _this.setLineEndTexture(GetValue(lineEnd, 'key', undefined), GetValue(lineEnd, 'frame', undefined));

        _this.setLineEndOrigin(GetValue(lineEnd, 'origin', undefined));
      }

      var lineBody = GetValue(config, 'body', undefined);

      if (typeof lineBody === 'string') {
        _this.setLineBodyTexture(lineBody, undefined);

        _this.setLineBodyExtendMode(0);

        _this.setLineBodyWidth(undefined);
      } else {
        _this.setLineBodyTexture(GetValue(lineBody, 'key', undefined), GetValue(lineBody, 'frame', undefined));

        _this.setLineBodyExtendMode(GetValue(lineBody, 'extendMode', 1));

        _this.setLineBodyWidth(GetValue(lineBody, 'width', undefined));
      }

      return _this;
    }

    _createClass(Line, [{
      key: "x0",
      get: function get() {
        return this._x0;
      },
      set: function set(value) {
        this.redraw |= this._x0 !== value;
        this._x0 = value;
      }
    }, {
      key: "y0",
      get: function get() {
        return this._y0;
      },
      set: function set(value) {
        this.redraw |= this._y0 !== value;
        this._y0 = value;
      }
    }, {
      key: "x1",
      get: function get() {
        return this._x1;
      },
      set: function set(value) {
        this.redraw |= this._x1 !== value;
        this._x1 = value;
      }
    }, {
      key: "y1",
      get: function get() {
        return this._y1;
      },
      set: function set(value) {
        this.redraw |= this._y1 !== value;
        this._y1 = value;
      }
    }, {
      key: "setLineStartPosition",
      value: function setLineStartPosition(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
      }
    }, {
      key: "setLineEndPosition",
      value: function setLineEndPosition(x, y) {
        this.x1 = x;
        this.y1 = y;
        return this;
      }
    }, {
      key: "setLineStartTexture",
      value: function setLineStartTexture(key, frame) {
        this.lineStartTexture = key;
        this.lineStartFrameName = frame;
        this.redraw = true;
        return this;
      }
    }, {
      key: "setLineStartOrigin",
      value: function setLineStartOrigin(origin) {
        if (origin === undefined) {
          origin = 0;
        }

        this.lineStartOrigin = origin;
        this.redraw = true;
        return this;
      }
    }, {
      key: "lineStartFrame",
      get: function get() {
        return this.scene.textures.getFrame(this.lineStartTexture, this.lineStartFrameName);
      }
    }, {
      key: "setLineEndTexture",
      value: function setLineEndTexture(key, frame) {
        this.lineEndTexture = key;
        this.lineEndFrameName = frame;
        this.redraw = true;
        return this;
      }
    }, {
      key: "setLineEndOrigin",
      value: function setLineEndOrigin(origin) {
        if (origin === undefined) {
          origin = 1;
        }

        this.lineEndOrigin = origin;
        this.redraw = true;
        return this;
      }
    }, {
      key: "lineEndFrame",
      get: function get() {
        return this.scene.textures.getFrame(this.lineEndTexture, this.lineEndFrameName);
      }
    }, {
      key: "setLineBodyTexture",
      value: function setLineBodyTexture(key, frame) {
        this.lineBodyTexture = key;
        this.lineBodyFrameName = frame;
        this.redraw = true;
        return this;
      }
    }, {
      key: "setLineBodyWidth",
      value: function setLineBodyWidth(width) {
        this.lineBodyWidth = width;
        this.redraw = true;
        return this;
      }
    }, {
      key: "setLineBodyExtendMode",
      value: function setLineBodyExtendMode(mode) {
        if (typeof mode === 'string') {
          mode = EXTENDMODE[mode];
        }

        this.lineBodyExtendMode = mode;
        return this;
      }
    }, {
      key: "lineBodyFrame",
      get: function get() {
        return this.scene.textures.getFrame(this.lineBodyTexture, this.lineBodyFrameName);
      }
    }, {
      key: "renderWebGL",
      value: function renderWebGL(renderer, src, camera, parentMatrix) {
        this.updateTexture();

        _get(_getPrototypeOf(Line.prototype), "renderWebGL", this).call(this, renderer, src, camera, parentMatrix);
      }
    }, {
      key: "renderCanvas",
      value: function renderCanvas(renderer, src, camera, parentMatrix) {
        this.updateTexture();

        _get(_getPrototypeOf(Line.prototype), "renderCanvas", this).call(this, renderer, src, camera, parentMatrix);
      }
    }]);

    return Line;
  }(RenderTexture);

  var EXTENDMODE = {
    scale: 0,
    repeat: 1
  };
  var methods = {
    updateTexture: UpdateTexture
  };
  Object.assign(Line.prototype, methods);

  function Factory (config) {
    var gameObject = new Line(this.scene, config);
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

    var gameObject = new Line(this.scene, config);
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

  var SetValue = function SetValue(target, keys, value) {
    // no object
    if (_typeof(target) !== 'object') {
      return;
    } // invalid key
    else if (IsInValidKey(keys)) {
      // don't erase target
      if (value == null) {
        return;
      } // set target to another object
      else if (_typeof(value) === 'object') {
        target = value;
      }
    } else {
      if (typeof keys === 'string') {
        keys = keys.split('.');
      }

      var lastKey = keys.pop();
      var entry = GetEntry(target, keys);
      entry[lastKey] = value;
    }

    return target;
  };

  var LinePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(LinePlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(LinePlugin);

    function LinePlugin(pluginManager) {
      var _this;

      _classCallCheck(this, LinePlugin);

      _this = _super.call(this, pluginManager); //  Register our new Game Object type

      pluginManager.registerGameObject('rexLine', Factory, Creator);
      return _this;
    }

    _createClass(LinePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);

    return LinePlugin;
  }(Phaser.Plugins.BasePlugin);

  SetValue(window, 'RexPlugins.GameObjects.Line', Line);

  return LinePlugin;

})));
