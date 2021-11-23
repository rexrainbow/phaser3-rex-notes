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

  var RotateAround = Phaser.Math.RotateAround;

  var LocalXYToWorldXY = function LocalXYToWorldXY(gameObject, localX, localY) {
    var ox = gameObject.width / 2;
    var oy = gameObject.height / 2;
    out.x = localX - ox;
    out.y = localY - oy;
    RotateAround(out, ox, oy, gameObject.rotation);
    out.x *= gameObject.scaleX;
    out.y *= gameObject.scaleY;
    out.x += gameObject.x;
    out.y += gameObject.y;
    return out;
  };

  var WorldXYToLocalXY = function WorldXYToLocalXY(gameObject, worldX, worldY) {
    var ox = gameObject.width / 2;
    var oy = gameObject.height / 2;
    out.x = worldX - gameObject.x;
    out.y = worldY - gameObject.y;
    out.x /= gameObject.scaleX;
    out.y /= gameObject.scaleY;
    RotateAround(out, ox, oy, -gameObject.rotation);
    out.x += ox;
    out.y += oy;
    return out;
  };

  var out = {
    x: 0,
    y: 0
  };

  var ControlPoint = /*#__PURE__*/function () {
    function ControlPoint(parent, vertexData) {
      _classCallCheck(this, ControlPoint);

      this.parent = parent;
      this.vertexData = vertexData;
      this._localX = undefined;
      this._localY = undefined;
      parent.on('destroy', this.destroy, this);
    }

    _createClass(ControlPoint, [{
      key: "destroy",
      value: function destroy() {
        this.parent = undefined;
        this.vertexData = undefined;
      }
    }, {
      key: "updateVertexPosition",
      value: function updateVertexPosition(x, y) {
        var gameObject = this.parent;
        var srcHeight = gameObject.height;
        var vHalfWidth = gameObject.frame.cutWidth / srcHeight / 2;
        var vHalfHeight = gameObject.frame.cutHeight / srcHeight / 2;
        var vx = x / srcHeight - vHalfWidth;
        var vy = y / srcHeight - vHalfHeight;
        var vertex = this.vertexData;
        vertex.x = vx;
        vertex.y = -vy;
        gameObject.forceUpdate();
        return this;
      }
    }, {
      key: "localX",
      get: function get() {
        return this._localX;
      },
      set: function set(x) {
        this.setLocalXY(x, this._localY);
      }
    }, {
      key: "localY",
      get: function get() {
        return this._localY;
      },
      set: function set(y) {
        this.setLocalXY(this._localX, y);
      }
    }, {
      key: "setLocalXY",
      value: function setLocalXY(x, y, ignoreUpdateVertex) {
        if (this._localX === x && this._localY === y) {
          return this;
        }

        this._localX = x;
        this._localY = y;

        if (!ignoreUpdateVertex) {
          this.updateVertexPosition(x, y);
        }

        return this;
      }
    }, {
      key: "setWorldXY",
      value: function setWorldXY(x, y) {
        if (this._worldX === x && this._worldY === y) {
          return this;
        }

        var localXY = WorldXYToLocalXY(this.parent, x, y);
        this.setLocalXY(localXY.x, localXY.y);
        return this;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        this.setWorldXY(x, y);
        return this;
      }
    }, {
      key: "getWorldXY",
      value: function getWorldXY() {
        return LocalXYToWorldXY(this.parent, this._localX, this._localY);
      }
    }, {
      key: "x",
      get: function get() {
        var worldXY = LocalXYToWorldXY(this.parent, this._localX, this._localY);
        return worldXY.x;
      },
      set: function set(x) {
        this.setWorldXY(x, this.y);
      }
    }, {
      key: "y",
      get: function get() {
        var worldXY = LocalXYToWorldXY(this.parent, this._localX, this._localY);
        return worldXY.y;
      },
      set: function set(y) {
        this.setWorldXY(this.x, y);
      }
    }]);

    return ControlPoint;
  }();

  var Vertex = Phaser.Geom.Mesh.Vertex;
  var Face = Phaser.Geom.Mesh.Face;

  var InitFaces = function InitFaces(quad) {
    /*
    vertices: 
        0 : top-left
        1 : top-right
        2 : bottom-left
        3 : bottom-right
    */
    quad.controlPoints = [];
    var vertices = quad.vertices;
    var faces = quad.faces;
    var controlPoints = quad.controlPoints;

    for (var i = 0; i < 4; i++) {
      var vertex = new Vertex();
      vertices.push(vertex);
      controlPoints.push(new ControlPoint(quad, vertex));
    }

    for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
      var vert1 = vertices[indices[i + 0]];
      var vert2 = vertices[indices[i + 1]];
      var vert3 = vertices[indices[i + 2]];
      faces.push(new Face(vert1, vert2, vert3));
    }

    quad.topLeft = controlPoints[0];
    quad.topRight = controlPoints[1];
    quad.bottomLeft = controlPoints[2];
    quad.bottomRight = controlPoints[3];
  };

  var indices = [0, 2, 1, 2, 3, 1];

  var Mesh = Phaser.GameObjects.Mesh;
  var IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var DegToRad = Phaser.Math.DegToRad;
  var FOV = 45;
  var PanZ = 1 + 1 / Math.sin(DegToRad(FOV));

  var Image = /*#__PURE__*/function (_Mesh) {
    _inherits(Image, _Mesh);

    var _super = _createSuper(Image);

    function Image(scene, x, y, key, frame, config) {
      var _this;

      _classCallCheck(this, Image);

      if (IsPlainObject$1(x)) {
        config = x;
        x = GetValue$1(config, 'x', 0);
        y = GetValue$1(config, 'y', 0);
        key = GetValue$1(config, 'key', null);
        frame = GetValue$1(config, 'frame', null);
      }

      _this = _super.call(this, scene, x, y, key, frame);
      _this.type = 'rexQuadImage';
      InitFaces(_assertThisInitialized(_this));

      _this.setSizeToFrame();

      _this.resetPerspective();

      _this.panZ(PanZ);

      _this.hideCCW = GetValue$1(config, 'hideCCW', true);

      _this.resetVerts();

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
        // Clear faces and vertices        
        this.dirtyCache[9] = -1;
        var top = 0,
            bottom = this.height,
            left = 0,
            right = this.width;
        var vertices = [[left, top], // top-left
        [right, top], // top-right
        [left, bottom], // bottom-left
        [right, bottom] // bottom-right
        ]; // Calculate vertex data

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
        var frameV = frameV1 - frameV0; // Update vertex

        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
          var p = vertices[i];
          var px = p[0];
          var py = p[1];
          var x = px / srcHeight - vHalfWidth;
          var y = py / srcHeight - vHalfHeight;
          var u = frameU0 + frameU * (px / srcWidth);
          var v = frameV0 + frameV * (py / srcHeight);
          this.vertices[i].set(x, -y, 0).setUVs(u, v);
        }

        this.reesetControlPoints();
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
      key: "reesetControlPoints",
      value: function reesetControlPoints() {
        var top = 0,
            bottom = this.height,
            left = 0,
            right = this.width;
        this.topLeft.setLocalXY(left, top, true);
        this.topRight.setLocalXY(right, top, true);
        this.bottomLeft.setLocalXY(left, bottom, true);
        this.bottomRight.setLocalXY(right, bottom, true);
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

  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
  var BuildGameObject$1 = Phaser.GameObjects.BuildGameObject;
  function QuadImageCreator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }

    if (addToScene !== undefined) {
      config.add = addToScene;
    }

    var key = GetAdvancedValue$1(config, 'key', null);
    var frame = GetAdvancedValue$1(config, 'frame', null);
    var gameObject = new Image(this.scene, 0, 0, key, frame, config);
    BuildGameObject$1(this.scene, gameObject, config);
    return gameObject;
  }

  var RT = Phaser.GameObjects.RenderTexture;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;

  var RenderTexture = /*#__PURE__*/function (_Image) {
    _inherits(RenderTexture, _Image);

    var _super = _createSuper(RenderTexture);

    function RenderTexture(scene, x, y, width, height, config) {
      var _this;

      _classCallCheck(this, RenderTexture);

      if (IsPlainObject(x)) {
        config = x;
        x = GetValue(config, 'x', 0);
        y = GetValue(config, 'y', 0);
        width = GetValue(config, 'width', 32);
        height = GetValue(config, 'height', 32);
      } // render-texture -> quad-image


      var rt = new RT(scene, x, y, width, height).setOrigin(0.5);
      _this = _super.call(this, scene, x, y, rt.texture.key, null, config);
      _this.type = 'rexQuadRenderTexture';
      _this.rt = rt;
      return _this;
    }

    _createClass(RenderTexture, [{
      key: "destroy",
      value: function destroy(fromScene) {
        _get(_getPrototypeOf(RenderTexture.prototype), "destroy", this).call(this, fromScene);

        this.rt.destroy();
        this.rt = null;
      }
    }]);

    return RenderTexture;
  }(Image);

  function QuadRenderTextureFactory (x, y, width, height, config) {
    var gameObject = new RenderTexture(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var BuildGameObject = Phaser.GameObjects.BuildGameObject;
  function QuadRenderTextureCreator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }

    if (addToScene !== undefined) {
      config.add = addToScene;
    }

    var x = GetAdvancedValue(config, 'x', 0);
    var y = GetAdvancedValue(config, 'y', 0);
    var width = GetAdvancedValue(config, 'width', 32);
    var height = GetAdvancedValue(config, 'height', 32);
    var gameObject = new RenderTexture(this.scene, x, y, width, height, config);
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
      pluginManager.registerGameObject('rexQuadRenderTexture', QuadRenderTextureFactory, QuadRenderTextureCreator);
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
  SetValue(window, 'RexPlugins.GameObjects.QuadRenderTexture', RenderTexture);

  return QuadImagePlugin;

})));
