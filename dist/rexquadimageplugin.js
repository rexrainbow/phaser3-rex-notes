(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexquadimageplugin = factory());
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

  var Vertex$1 = /*#__PURE__*/function () {
    function Vertex(parent, vertexDataIndex, x, y) {
      _classCallCheck(this, Vertex);

      this.parent = parent;
      this.vertexDataIndex = vertexDataIndex;
      this._x = x;
      this._y = y;
    }

    _createClass(Vertex, [{
      key: "vertexData",
      get: function get() {
        return this.parent.vertices[this.vertexDataIndex];
      }
    }, {
      key: "localX",
      get: function get() {
        return this._x;
      },
      set: function set(x) {
        if (this._x !== x) {
          this._x = x;
          var gameObject = this.parent;
          var srcHeight = gameObject.height;
          var vHalfWidth = gameObject.frame.cutWidth / srcHeight / 2;
          var vx = x / srcHeight - vHalfWidth;
          this.vertexData.x = vx;
          this.parent.forceUpdate();
        }
      }
    }, {
      key: "localY",
      get: function get() {
        return this._y;
      },
      set: function set(y) {
        if (this._y !== y) {
          this._y = y;
          var gameObject = this.parent;
          var srcHeight = gameObject.height;
          var vHalfHeight = gameObject.frame.cutHeight / srcHeight / 2;
          var vy = y / srcHeight - vHalfHeight;
          var flipY = gameObject.frame.source.isRenderTexture;
          this.vertexData.y = flipY ? vy : -vy;
          this.parent.forceUpdate();
        }
      }
    }, {
      key: "x",
      get: function get() {
        var gameObject = this.parent;
        return (this.localX - gameObject.width / 2) * gameObject.scaleX + gameObject.x;
      },
      set: function set(x) {
        var gameObject = this.parent;
        this.localX = (x - gameObject.x) / gameObject.scaleX + gameObject.width / 2;
      }
    }, {
      key: "y",
      get: function get() {
        var gameObject = this.parent;
        return (this.localY - gameObject.height / 2) * gameObject.scaleY + gameObject.y;
      },
      set: function set(y) {
        var gameObject = this.parent;
        this.localY = (y - gameObject.y) / gameObject.scaleY + gameObject.height / 2;
      }
    }]);

    return Vertex;
  }();

  var Mesh = Phaser.GameObjects.Mesh;
  var Vertex = Phaser.Geom.Mesh.Vertex;
  var Face = Phaser.Geom.Mesh.Face;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var DegToRad = Phaser.Math.DegToRad;
  var FOV = 45;
  var PanZ = 1 + 1 / Math.sin(DegToRad(FOV));

  var Image = /*#__PURE__*/function (_Mesh) {
    _inherits(Image, _Mesh);

    var _super = _createSuper(Image);

    function Image(scene, x, y, key, frame, config) {
      var _this;

      _classCallCheck(this, Image);

      if (IsPlainObject(x)) {
        config = x;
        x = GetValue(config, 'x', 0);
        y = GetValue(config, 'y', 0);
        key = GetValue(config, 'key', null);
        frame = GetValue(config, 'frame', null);
      }

      _this = _super.call(this, scene, x, y, key, frame);
      _this.type = 'rexQuadImage';

      _this.setSizeToFrame();

      _this.resetPerspective();

      _this.panZ(PanZ);

      _this.hideCCW = GetValue(config, 'hideCCW', true);

      _this.resetVerts();

      var left = 0,
          right = _this.width,
          top = 0,
          bottom = _this.height;
      _this.topLeft = new Vertex$1(_assertThisInitialized(_this), 0, left, top);
      _this.topRight = new Vertex$1(_assertThisInitialized(_this), 1, right, top);
      _this.bottomLeft = new Vertex$1(_assertThisInitialized(_this), 2, left, bottom);
      _this.bottomRight = new Vertex$1(_assertThisInitialized(_this), 3, right, bottom);
      return _this;
    }

    _createClass(Image, [{
      key: "resetPerspective",
      value: function resetPerspective() {
        this.setPerspective(this.width, this.height, FOV);
        return this;
      }
    }, {
      key: "resetVerts",
      value: function resetVerts() {
        var _this$vertices, _this$faces;

        // Clear faces and vertices
        this.clear();
        this.dirtyCache[9] = -1;
        var top = 0,
            bottom = this.height,
            left = 0,
            right = this.width;
        var vertices = [[left, top], // top-left
        [right, top], // top-right
        [left, bottom], // bottom-left
        [right, bottom] // bottom-right
        ];
        var indices = [0, 2, 1, 2, 3, 1]; // Calculate vertex data

        var srcWidth = this.width;
        var srcHeight = this.height;
        var vHalfWidth = this.frame.cutWidth / srcHeight / 2;
        var vHalfHeight = this.frame.cutHeight / srcHeight / 2;
        var flipY = this.frame.source.isRenderTexture;
        var frameU0 = this.frame.u0;
        var frameU1 = this.frame.u1;
        var frameV0 = !flipY ? this.frame.v0 : this.frame.v1;
        var frameV1 = !flipY ? this.frame.v1 : this.frame.v0;
        var frameU = frameU1 - frameU0;
        var frameV = frameV1 - frameV0; // Build vertex

        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
          var p = vertices[i];
          var px = p[0];
          var py = p[1];
          var x = px / srcHeight - vHalfWidth;
          var y = py / srcHeight - vHalfHeight;
          var u = frameU0 + frameU * (px / srcWidth);
          var v = frameV0 + frameV * (py / srcHeight);
          vertices[i] = new Vertex(x, -y, 0, u, v);
        } // Build face


        var faces = [];

        for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
          var vert1 = vertices[indices[i + 0]];
          var vert2 = vertices[indices[i + 1]];
          var vert3 = vertices[indices[i + 2]];
          var face = new Face(vert1, vert2, vert3);
          faces.push(face);
        }

        (_this$vertices = this.vertices).push.apply(_this$vertices, vertices);

        (_this$faces = this.faces).push.apply(_this$faces, faces);

        return this;
      }
    }, {
      key: "syncSize",
      value: function syncSize() {
        this.setSizeToFrame(); // Reset size

        this.resetPerspective(); // Reset perspective

        this.resetVerts(); // Reset verts

        return this;
      }
    }, {
      key: "forceUpdate",
      value: function forceUpdate() {
        this.dirtyCache[10] = 1;
        return this;
      }
    }]);

    return Image;
  }(Mesh);

  function QuadImageFactory (x, y, texture, frame, config) {
    var gameObject = new Image(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var BuildGameObject = Phaser.GameObjects.BuildGameObject;
  function QuadImageCreator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }

    if (addToScene !== undefined) {
      config.add = addToScene;
    }

    var key = GetAdvancedValue(config, 'key', null);
    var frame = GetAdvancedValue(config, 'frame', null);
    var gameObject = new Image(this.scene, 0, 0, key, frame, config);
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

  var QuadImagePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(QuadImagePlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(QuadImagePlugin);

    function QuadImagePlugin(pluginManager) {
      var _this;

      _classCallCheck(this, QuadImagePlugin);

      _this = _super.call(this, pluginManager); //  Register our new Game Object type

      pluginManager.registerGameObject('rexQuadImage', QuadImageFactory, QuadImageCreator);
      return _this;
    }

    _createClass(QuadImagePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);

    return QuadImagePlugin;
  }(Phaser.Plugins.BasePlugin);

  SetValue(window, 'RexPlugins.GameObjects.QuadImage', Image);

  return QuadImagePlugin;

})));
