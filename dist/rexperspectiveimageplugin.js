(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexperspectiveimageplugin = factory());
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
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
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
  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);
        var desc;
        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
          if (!desc.writable) {
            return false;
          }
          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }
        return true;
      };
    }
    return set(target, property, value, receiver);
  }
  function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
      throw new TypeError('failed to set property');
    }
    return value;
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

  var Mesh = Phaser.GameObjects.Mesh;
  var MeshBase = /*#__PURE__*/function (_Mesh) {
    _inherits(MeshBase, _Mesh);
    function MeshBase() {
      _classCallCheck(this, MeshBase);
      return _callSuper(this, MeshBase, arguments);
    }
    _createClass(MeshBase, [{
      key: "tint",
      get: function get() {
        if (this.vertices.length === 0) {
          return 0xffffff;
        } else {
          return this.vertices[0].color;
        }
      }
    }, {
      key: "forceUpdate",
      value: function forceUpdate() {
        this.dirtyCache[10] = 1;
        return this;
      }
    }]);
    return MeshBase;
  }(Mesh);

  var Vector3 = Phaser.Math.Vector3;
  var Matrix4 = Phaser.Math.Matrix4;
  var tempPosition = new Vector3();
  var tempRotation = new Vector3();
  var tempMatrix = new Matrix4();
  var TransformVerts = function TransformVerts(mesh, x, y, z, rotateX, rotateY, rotateZ) {
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = 0;
    }
    if (z === undefined) {
      z = 0;
    }
    if (rotateX === undefined) {
      rotateX = 0;
    }
    if (rotateY === undefined) {
      rotateY = 0;
    }
    if (rotateZ === undefined) {
      rotateZ = 0;
    }
    tempPosition.set(x, y, z);
    tempRotation.set(rotateX, rotateY, rotateZ);
    tempMatrix.fromRotationXYTranslation(tempRotation, tempPosition, true);
    for (var i = 0, cnt = mesh.vertices.length; i < cnt; i++) {
      mesh.vertices[i].transformMat4(tempMatrix);
    }
  };

  var IsPlainObject$6 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$h = Phaser.Utils.Objects.GetValue;
  var GenerateGridVerts = Phaser.Geom.Mesh.GenerateGridVerts;
  var RadToDeg$4 = Phaser.Math.RadToDeg;
  var DegToRad$6 = Phaser.Math.DegToRad;
  var FOV = 45;
  var PanZ = 1 + 1 / Math.sin(DegToRad$6(FOV));
  var Image = /*#__PURE__*/function (_MeshBase) {
    _inherits(Image, _MeshBase);
    function Image(scene, x, y, key, frame, config) {
      var _this;
      _classCallCheck(this, Image);
      if (IsPlainObject$6(x)) {
        config = x;
        x = GetValue$h(config, 'x', 0);
        y = GetValue$h(config, 'y', 0);
        key = GetValue$h(config, 'key', null);
        frame = GetValue$h(config, 'frame', null);
      }
      _this = _callSuper(this, Image, [scene, x, y, key, frame]);
      _this.type = 'rexPerspectiveImage';
      _this.setSizeToFrame();
      _this.resetPerspective();
      _this.panZ(PanZ);
      _this.hideCCW = GetValue$h(config, 'hideCCW', true);
      var gridWidth = GetValue$h(config, 'gridWidth', 0);
      var gridHeight = GetValue$h(config, 'gridHeight', gridWidth);
      _this.resetVerts(gridWidth, gridHeight);
      _this.prevFrame = _this.frame;
      return _this;
    }
    _createClass(Image, [{
      key: "preUpdate",
      value: function preUpdate(time, delta) {
        // Reset size and vertex if frame is changed
        if (this.prevFrame !== this.frame) {
          this.prevFrame = this.frame;
          this.syncSize();
        }
        _get(_getPrototypeOf(Image.prototype), "preUpdate", this).call(this, time, delta);
      }
    }, {
      key: "originX",
      get: function get() {
        return 0.5;
      }
    }, {
      key: "originY",
      get: function get() {
        return 0.5;
      }
    }, {
      key: "resetPerspective",
      value: function resetPerspective() {
        this.setPerspective(this.width, this.height, FOV);
        return this;
      }
    }, {
      key: "resetVerts",
      value: function resetVerts(gridWidth, gridHeight) {
        if (gridWidth !== undefined) {
          this.gridWidth = gridWidth;
        }
        if (gridHeight !== undefined) {
          this.gridHeight = gridHeight;
        }

        // Clear faces and vertices
        this.clear();
        this.dirtyCache[9] = -1;
        if (this.width === 0 || this.height === 0) {
          return this;
        }

        // Generate faces and vertices
        var frameWidth = this.frame.cutWidth,
          frameHeight = this.frame.cutHeight;
        var gridWidth, gridHeight;
        if (this.gridWidth === 0) {
          gridWidth = Math.max(frameWidth / 8, 32);
        } else {
          gridHeight = this.gridWidth;
        }
        if (this.gridHeight === 0) {
          gridHeight = Math.max(frameHeight / 8, 32);
        } else {
          gridHeight = this.gridHeight;
        }
        GenerateGridVerts({
          mesh: this,
          width: frameWidth / this.height,
          height: frameHeight / this.height,
          widthSegments: Math.ceil(frameWidth / gridWidth),
          heightSegments: Math.ceil(frameHeight / gridHeight)
        });

        // Recover vertices transform
        var transformInfo = this.transformInfo;
        if (transformInfo) {
          this.transformVerts(transformInfo.x, transformInfo.y, transformInfo.z, transformInfo.rotateX, transformInfo.rotateY, transformInfo.rotateZ);
        }
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
      key: "rotationX",
      get: function get() {
        return this.modelRotation.x;
      },
      set: function set(value) {
        this.modelRotation.x = value;
      }
    }, {
      key: "angleX",
      get: function get() {
        return RadToDeg$4(this.rotationX);
      },
      set: function set(value) {
        this.rotationX = DegToRad$6(value);
      }
    }, {
      key: "rotationY",
      get: function get() {
        return this.modelRotation.y;
      },
      set: function set(value) {
        this.modelRotation.y = value;
      }
    }, {
      key: "angleY",
      get: function get() {
        return RadToDeg$4(this.rotationY);
      },
      set: function set(value) {
        this.rotationY = DegToRad$6(value);
      }
    }, {
      key: "rotationZ",
      get: function get() {
        return this.modelRotation.z;
      },
      set: function set(value) {
        this.modelRotation.z = value;
      }
    }, {
      key: "angleZ",
      get: function get() {
        return RadToDeg$4(this.rotationZ);
      },
      set: function set(value) {
        this.rotationZ = DegToRad$6(value);
      }
    }, {
      key: "transformVerts",
      value: function transformVerts(x, y, z, rotateX, rotateY, rotateZ) {
        if (x === undefined) {
          x = 0;
        }
        if (y === undefined) {
          y = 0;
        }
        if (z === undefined) {
          z = 0;
        }
        if (rotateX === undefined) {
          rotateX = 0;
        }
        if (rotateY === undefined) {
          rotateY = 0;
        }
        if (rotateZ === undefined) {
          rotateZ = 0;
        }
        if (!this.transformInfo) {
          this.transformInfo = {};
        }
        this.transformInfo.x = x;
        this.transformInfo.y = y;
        this.transformInfo.rotateX = rotateX;
        this.transformInfo.rotateY = rotateY;
        this.transformInfo.rotateZ = rotateZ;
        TransformVerts(this, x, y, z, rotateX, rotateY, rotateZ);
        return this;
      }
    }]);
    return Image;
  }(MeshBase);

  function PerspectiveImageFactory (x, y, texture, frame, config) {
    var gameObject = new Image(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var GetAdvancedValue$3 = Phaser.Utils.Objects.GetAdvancedValue;
  var BuildGameObject$5 = Phaser.GameObjects.BuildGameObject;
  function PerspectiveImageCreator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }
    if (addToScene !== undefined) {
      config.add = addToScene;
    }
    var key = GetAdvancedValue$3(config, 'key', null);
    var frame = GetAdvancedValue$3(config, 'frame', null);
    var gameObject = new Image(this.scene, 0, 0, key, frame, config);
    BuildGameObject$5(this.scene, gameObject, config);
    return gameObject;
  }

  var DynamicTexture = Phaser.Textures.DynamicTexture;
  var CreateDynamicTexture = function CreateDynamicTexture(scene, width, height) {
    if (width === undefined) {
      width = 2;
    }
    if (height === undefined) {
      height = 2;
    }
    var dt = new DynamicTexture(scene.sys.textures, null, width, height);
    return dt;
  };

  var GetDisplayWidth = function GetDisplayWidth(gameObject) {
    if (gameObject.displayWidth !== undefined) {
      return gameObject.displayWidth;
    } else {
      return gameObject.width;
    }
  };
  var GetDisplayHeight = function GetDisplayHeight(gameObject) {
    if (gameObject.displayHeight !== undefined) {
      return gameObject.displayHeight;
    } else {
      return gameObject.height;
    }
  };

  var Rectangle$1 = Phaser.Geom.Rectangle;
  var Vector2 = Phaser.Math.Vector2;
  var RotateAround$2 = Phaser.Math.RotateAround;
  var GetBounds = function GetBounds(gameObject, output) {
    if (output === undefined) {
      output = new Rectangle$1();
    } else if (output === true) {
      if (GlobRect$1 === undefined) {
        GlobRect$1 = new Rectangle$1();
      }
      output = GlobRect$1;
    }
    if (gameObject.getBounds) {
      return gameObject.getBounds(output);
    }

    //  We can use the output object to temporarily store the x/y coords in:

    var TLx, TLy, TRx, TRy, BLx, BLy, BRx, BRy;

    // Instead of doing a check if parent container is
    // defined per corner we only do it once.
    if (gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      GetTopLeft(gameObject, output);
      parentMatrix.transformPoint(output.x, output.y, output);
      TLx = output.x;
      TLy = output.y;
      GetTopRight(gameObject, output);
      parentMatrix.transformPoint(output.x, output.y, output);
      TRx = output.x;
      TRy = output.y;
      GetBottomLeft(gameObject, output);
      parentMatrix.transformPoint(output.x, output.y, output);
      BLx = output.x;
      BLy = output.y;
      GetBottomRight(gameObject, output);
      parentMatrix.transformPoint(output.x, output.y, output);
      BRx = output.x;
      BRy = output.y;
    } else {
      GetTopLeft(gameObject, output);
      TLx = output.x;
      TLy = output.y;
      GetTopRight(gameObject, output);
      TRx = output.x;
      TRy = output.y;
      GetBottomLeft(gameObject, output);
      BLx = output.x;
      BLy = output.y;
      GetBottomRight(gameObject, output);
      BRx = output.x;
      BRy = output.y;
    }
    output.x = Math.min(TLx, TRx, BLx, BRx);
    output.y = Math.min(TLy, TRy, BLy, BRy);
    output.width = Math.max(TLx, TRx, BLx, BRx) - output.x;
    output.height = Math.max(TLy, TRy, BLy, BRy) - output.y;
    return output;
  };
  var GlobRect$1 = undefined;
  var GetTopLeft = function GetTopLeft(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getTopLeft) {
      return gameObject.getTopLeft(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX;
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY;
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GetTopRight = function GetTopRight(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getTopRight) {
      return gameObject.getTopRight(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX + GetDisplayWidth(gameObject);
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY;
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GetBottomLeft = function GetBottomLeft(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getBottomLeft) {
      return gameObject.getBottomLeft(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX;
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY + GetDisplayHeight(gameObject);
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GetBottomRight = function GetBottomRight(gameObject, output, includeParent) {
    if (output === undefined) {
      output = new Vector2();
    } else if (output === true) {
      if (GlobVector === undefined) {
        GlobVector = new Vector2();
      }
      output = GlobVector;
    }
    if (gameObject.getBottomRight) {
      return gameObject.getBottomRight(output);
    }
    output.x = gameObject.x - GetDisplayWidth(gameObject) * gameObject.originX + GetDisplayWidth(gameObject);
    output.y = gameObject.y - GetDisplayHeight(gameObject) * gameObject.originY + GetDisplayHeight(gameObject);
    return PrepareBoundsOutput(gameObject, output, includeParent);
  };
  var GlobVector = undefined;
  var PrepareBoundsOutput = function PrepareBoundsOutput(gameObject, output, includeParent) {
    if (includeParent === undefined) {
      includeParent = false;
    }
    if (gameObject.rotation !== 0) {
      RotateAround$2(output, gameObject.x, gameObject.y, gameObject.rotation);
    }
    if (includeParent && gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      parentMatrix.transformPoint(output.x, output.y, output);
    }
    return output;
  };

  var Rectangle = Phaser.Geom.Rectangle;
  var Union = Phaser.Geom.Rectangle.Union;
  var GetBoundsOfGameObjects = function GetBoundsOfGameObjects(gameObjects, out) {
    if (out === undefined) {
      out = new Rectangle();
    } else if (out === true) {
      if (GlobRect === undefined) {
        GlobRect = new Rectangle();
      }
      out = GlobRect;
    }
    out.setTo(0, 0, 0, 0);
    var gameObject;
    var firstClone = true;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      gameObject = gameObjects[i];
      if (!gameObject.getBounds) {
        continue;
      }
      var boundsRect = GetBounds(gameObject, true);
      if (firstClone) {
        out.setTo(boundsRect.x, boundsRect.y, boundsRect.width, boundsRect.height);
        firstClone = false;
      } else {
        Union(boundsRect, out, out);
      }
    }
    return out;
  };
  var GlobRect;

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

  /**
   * Shallow Object Clone. Will not out nested objects.
   * @param {object} obj JSON object
   * @param {object} ret JSON object to return, set null to return a new object
   * @returns {object} this object
   */
  var Clone = function Clone(obj, out) {
    var objIsArray = Array.isArray(obj);
    if (out === undefined) {
      out = objIsArray ? [] : {};
    } else {
      Clear(out);
    }
    if (objIsArray) {
      out.length = obj.length;
      for (var i = 0, cnt = obj.length; i < cnt; i++) {
        out[i] = obj[i];
      }
    } else {
      for (var key in obj) {
        out[key] = obj[key];
      }
    }
    return out;
  };

  var SortGameObjectsByDepth = function SortGameObjectsByDepth(gameObjects, descending) {
    if (gameObjects.length <= 1) {
      return gameObjects;
    }
    if (descending === undefined) {
      descending = false;
    }
    var itemList;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var gameObject = gameObjects[i];
      if (gameObject.displayList) {
        // Inside a scene or a layer
        itemList = gameObject.displayList; // displayList
      } else if (gameObject.parentContainer) {
        // Inside a container
        itemList = gameObject.parentContainer.list; // array
      }
      if (itemList) {
        break;
      }
    }
    if (!itemList) {
      itemList = gameObject.scene.sys.displayList; // displayList
      // ??
    }
    if (itemList.depthSort) {
      // Is a displayList object
      itemList.depthSort();
      itemList = itemList.list;
      // itemList is an array now
    }

    // itemList is an array
    if (descending) {
      gameObjects.sort(function (childA, childB) {
        return itemList.indexOf(childB) - itemList.indexOf(childA);
      });
    } else {
      gameObjects.sort(function (childA, childB) {
        return itemList.indexOf(childA) - itemList.indexOf(childB);
      });
    }
    return gameObjects;
  };

  var GameObjectClass = Phaser.GameObjects.GameObject;
  var IsGameObject = function IsGameObject(object) {
    return object instanceof GameObjectClass;
  };

  var GetValue$g = Phaser.Utils.Objects.GetValue;
  var Snapshot = function Snapshot(config) {
    if (!config) {
      return;
    }
    var gameObjects = config.gameObjects;
    var renderTexture = config.renderTexture; // renderTexture, or dynamicTexture
    var saveTexture = config.saveTexture;
    var x = GetValue$g(config, 'x', undefined);
    var y = GetValue$g(config, 'y', undefined);
    var width = GetValue$g(config, 'width', undefined);
    var height = GetValue$g(config, 'height', undefined);
    var originX = GetValue$g(config, 'originX', 0);
    var originY = GetValue$g(config, 'originY', 0);
    var padding = GetValue$g(config, 'padding', 0);
    var scrollX, scrollY;
    if (width === undefined || height === undefined || x === undefined || y === undefined) {
      // Union bounds of gameObjects
      var bounds = GetBoundsOfGameObjects(gameObjects, true);
      var isCenterOrigin = x !== undefined && y !== undefined;
      if (isCenterOrigin) {
        width = Math.max(x - bounds.left, bounds.right - x) * 2;
        height = Math.max(y - bounds.top, bounds.bottom - y) * 2;
        originX = 0.5;
        originY = 0.5;
      } else {
        x = bounds.x;
        y = bounds.y;
        width = bounds.width;
        height = bounds.height;
        originX = 0;
        originY = 0;
      }
      scrollX = bounds.x;
      scrollY = bounds.y;
    } else {
      scrollX = x + (0 - originX) * width;
      scrollY = y + (0 - originY) * height;
    }
    scrollX -= padding;
    scrollY -= padding;
    width += padding * 2;
    height += padding * 2;
    var scene = gameObjects[0].scene;
    var textureManager = scene.sys.textures;

    // Snapshot on dynamicTexture directly
    if (saveTexture && !renderTexture) {
      renderTexture = textureManager.addDynamicTexture(saveTexture, width, height);
    }

    // Return a renderTexture
    if (!renderTexture) {
      renderTexture = scene.add.renderTexture(0, 0, width, height);
    }
    if (renderTexture.setPosition) {
      renderTexture.setPosition(x, y);
    }
    if (renderTexture.width !== width || renderTexture.height !== height) {
      renderTexture.setSize(width, height);
    }
    if (renderTexture.setOrigin) {
      renderTexture.setOrigin(originX, originY);
    }
    renderTexture.camera.setScroll(scrollX, scrollY);

    // Draw gameObjects
    gameObjects = SortGameObjectsByDepth(Clone(gameObjects));
    renderTexture.draw(gameObjects);

    // Save render result to texture
    if (saveTexture) {
      if (IsGameObject(renderTexture)) {
        renderTexture.saveTexture(saveTexture);
      } else if (renderTexture.key !== saveTexture) {
        textureManager.renameTexture(renderTexture.key, key);
      }
    }
    return renderTexture;
  };

  var IsPlainObject$5 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$f = Phaser.Utils.Objects.GetValue;
  var RenderTexture$1 = /*#__PURE__*/function (_Image) {
    _inherits(RenderTexture, _Image);
    function RenderTexture(scene, x, y, width, height, config) {
      var _this;
      _classCallCheck(this, RenderTexture);
      if (IsPlainObject$5(x)) {
        config = x;
        x = GetValue$f(config, 'x', 0);
        y = GetValue$f(config, 'y', 0);
        width = GetValue$f(config, 'width', 32);
        height = GetValue$f(config, 'height', 32);
      }

      // dynamic-texture -> quad-image
      var texture = CreateDynamicTexture(scene, width, height);
      _this = _callSuper(this, RenderTexture, [scene, x, y, texture, null, config]);
      _this.type = 'rexPerspectiveRenderTexture';
      _this.rt = _this.texture;
      return _this;
    }
    _createClass(RenderTexture, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
          return;
        }
        _get(_getPrototypeOf(RenderTexture.prototype), "destroy", this).call(this, fromScene);
        this.rt.destroy();
        this.rt = null;
      }
    }, {
      key: "snapshot",
      value: function snapshot(gameObjects, config) {
        if (config === undefined) {
          config = {};
        }
        config.gameObjects = gameObjects;
        config.renderTexture = this.rt;
        Snapshot(config);
        if (this.width !== this.frame.realWidth || this.height !== this.frame.realHeight) {
          this.syncSize();
        }
        return this;
      }
    }]);
    return RenderTexture;
  }(Image);

  function PerspectiveRenderTextureFactory (x, y, width, height, config) {
    var gameObject = new RenderTexture$1(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var GetAdvancedValue$2 = Phaser.Utils.Objects.GetAdvancedValue;
  var BuildGameObject$4 = Phaser.GameObjects.BuildGameObject;
  function PerspectiveRenderTextureCreator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }
    if (addToScene !== undefined) {
      config.add = addToScene;
    }
    var x = GetAdvancedValue$2(config, 'x', 0);
    var y = GetAdvancedValue$2(config, 'y', 0);
    var width = GetAdvancedValue$2(config, 'width', 32);
    var height = GetAdvancedValue$2(config, 'height', 32);
    var gameObject = new RenderTexture$1(this.scene, x, y, width, height, config);
    BuildGameObject$4(this.scene, gameObject, config);
    return gameObject;
  }

  var AnimationState = Phaser.Animations.AnimationState;
  var IsPlainObject$4 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$e = Phaser.Utils.Objects.GetValue;
  var Sprite = /*#__PURE__*/function (_PerspectiveImage) {
    _inherits(Sprite, _PerspectiveImage);
    function Sprite(scene, x, y, key, frame, config) {
      var _this;
      _classCallCheck(this, Sprite);
      if (IsPlainObject$4(x)) {
        config = x;
        x = GetValue$e(config, 'x', 0);
        y = GetValue$e(config, 'y', 0);
        key = GetValue$e(config, 'key', null);
        frame = GetValue$e(config, 'frame', null);
      }
      _this = _callSuper(this, Sprite, [scene, x, y, key, frame, config]);
      _this.type = 'rexPerspectiveSprite';
      _this.anims = new AnimationState(_assertThisInitialized(_this));
      return _this;
    }
    _createClass(Sprite, [{
      key: "preDestroy",
      value: function preDestroy() {
        _get(_getPrototypeOf(Sprite.prototype), "preDestroy", this).call(this);
        this.anims.destroy();
        this.anims = undefined;
      }
    }, {
      key: "preUpdate",
      value: function preUpdate(time, delta) {
        this.anims.update(time, delta);
        _get(_getPrototypeOf(Sprite.prototype), "preUpdate", this).call(this, time, delta);
      }
    }, {
      key: "play",
      value: function play(key, ignoreIfPlaying, startFrame) {
        return this.anims.play(key, ignoreIfPlaying, startFrame);
      }
    }, {
      key: "playReverse",
      value: function playReverse(key, ignoreIfPlaying) {
        return this.anims.playReverse(key, ignoreIfPlaying);
      }
    }, {
      key: "playAfterDelay",
      value: function playAfterDelay(key, delay) {
        return this.anims.playAfterDelay(key, delay);
      }
    }, {
      key: "playAfterRepeat",
      value: function playAfterRepeat(key, repeatCount) {
        return this.anims.playAfterRepeat(key, repeatCount);
      }
    }, {
      key: "chain",
      value: function chain(key) {
        return this.anims.chain(key);
      }
    }, {
      key: "stop",
      value: function stop() {
        return this.anims.stop();
      }
    }, {
      key: "stopAfterDelay",
      value: function stopAfterDelay(delay) {
        return this.anims.stopAfterDelay(delay);
      }
    }, {
      key: "stopAfterRepeat",
      value: function stopAfterRepeat(repeatCount) {
        return this.anims.stopAfterRepeat(repeatCount);
      }
    }, {
      key: "stopOnFrame",
      value: function stopOnFrame(frame) {
        return this.anims.stopOnFrame(frame);
      }
    }]);
    return Sprite;
  }(Image);

  function PerspectiveSpriteFactory (x, y, texture, frame, config) {
    var gameObject = new Sprite(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
  var BuildGameObject$3 = Phaser.GameObjects.BuildGameObject;
  function PerspectiveSpriteCreator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }
    if (addToScene !== undefined) {
      config.add = addToScene;
    }
    var key = GetAdvancedValue$1(config, 'key', null);
    var frame = GetAdvancedValue$1(config, 'frame', null);
    var gameObject = new Sprite(this.scene, 0, 0, key, frame, config);
    BuildGameObject$3(this.scene, gameObject, config);
    return gameObject;
  }

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
  var Zone = Phaser.GameObjects.Zone;
  var AddItem = Phaser.Utils.Array.Add;
  var RemoveItem = Phaser.Utils.Array.Remove;
  var Base = /*#__PURE__*/function (_Zone) {
    _inherits(Base, _Zone);
    function Base(scene, x, y, width, height) {
      var _this;
      _classCallCheck(this, Base);
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
        height = 1;
      }
      _this = _callSuper(this, Base, [scene, x, y, width, height]);
      _this.children = [];
      return _this;
    }
    _createClass(Base, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
          return;
        }
        if (fromScene) {
          // Stop scene
          var child;
          for (var i = this.children.length - 1; i >= 0; i--) {
            child = this.children[i];
            if (!child.parentContainer &&
            // Not in container
            !child.displayList // Not in scene, neither in layer
            ) {
              // Destroy child which is not in scene, container, or layer manually
              child.destroy(fromScene);
            }
          }
        }

        // Destroy/remove children
        this.clear(!fromScene);
        _get(_getPrototypeOf(Base.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "contains",
      value: function contains(gameObject) {
        return this.children.indexOf(gameObject) !== -1;
      }
    }, {
      key: "add",
      value: function add(gameObjects) {
        var parent = this;
        AddItem(this.children, gameObjects, 0,
        // Callback of item added
        function (gameObject) {
          gameObject.once('destroy', parent.onChildDestroy, parent);
        }, this);
        return this;
      }
    }, {
      key: "remove",
      value: function remove(gameObjects, destroyChild) {
        var parent = this;
        RemoveItem(this.children, gameObjects,
        // Callback of item removed
        function (gameObject) {
          gameObject.off('destroy', parent.onChildDestroy, parent);
          if (destroyChild) {
            gameObject.destroy();
          }
        });
        return this;
      }
    }, {
      key: "onChildDestroy",
      value: function onChildDestroy(child, fromScene) {
        // Only remove reference
        this.remove(child, false);
      }
    }, {
      key: "clear",
      value: function clear(destroyChild) {
        var parent = this;
        var gameObject;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
          gameObject = this.children[i];
          gameObject.off('destroy', parent.onChildDestroy, parent);
          if (destroyChild) {
            gameObject.destroy();
          }
        }
        this.children.length = 0;
        return this;
      }
    }]);
    return Base;
  }(Zone);
  var Components = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Base, [Components.Alpha, Components.Flip]);

  var GetParent = function GetParent(gameObject, name) {
    var parent;
    if (name === undefined) {
      if (gameObject.hasOwnProperty('rexContainer')) {
        parent = gameObject.rexContainer.parent;
      }
    } else {
      parent = GetParent(gameObject);
      while (parent) {
        if (parent.name === name) {
          break;
        }
        parent = GetParent(parent);
      }
    }
    return parent;
  };
  var GetTopmostParent = function GetTopmostParent(gameObject) {
    var parent = GetParent(gameObject);
    while (parent) {
      gameObject = parent;
      parent = GetParent(parent);
    }
    return gameObject;
  };

  var DegToRad$5 = Phaser.Math.DegToRad;
  var RadToDeg$3 = Phaser.Math.RadToDeg;
  var GetLocalState = function GetLocalState(gameObject) {
    if (!gameObject.hasOwnProperty('rexContainer')) {
      var rexContainer = {
        parent: null,
        self: null,
        layer: null,
        x: 0,
        y: 0,
        syncPosition: true,
        rotation: 0,
        syncRotation: true,
        scaleX: 0,
        scaleY: 0,
        syncScale: true,
        alpha: 0,
        syncAlpha: true,
        syncScrollFactor: true,
        syncCameraFilter: true,
        syncDisplayList: true,
        visible: true,
        active: true
      };
      Object.defineProperty(rexContainer, 'angle', {
        get: function get() {
          return RadToDeg$3(this.rotation);
        },
        set: function set(value) {
          this.rotation = DegToRad$5(value);
        }
      });
      Object.defineProperty(rexContainer, 'displayWidth', {
        get: function get() {
          return gameObject.width * this.scaleX;
        },
        set: function set(width) {
          this.scaleX = width / gameObject.width;
        }
      });
      Object.defineProperty(rexContainer, 'displayHeight', {
        get: function get() {
          return gameObject.height * this.scaleY;
        },
        set: function set(height) {
          this.scaleY = height / gameObject.height;
        }
      });
      gameObject.rexContainer = rexContainer;
    }
    return gameObject.rexContainer;
  };

  var Parent = {
    setParent: function setParent(gameObject, parent) {
      if (parent === undefined) {
        parent = this;
      }
      var localState = GetLocalState(gameObject);
      if (parent) {
        // Add to parent
        localState.parent = parent;
        localState.self = gameObject;
      } else {
        // Remove from parent
        localState.parent = null;
        localState.self = null;
      }
      return this;
    },
    getParent: function getParent(gameObject, name) {
      if (typeof gameObject === 'string') {
        name = gameObject;
        gameObject = undefined;
      }
      if (gameObject === undefined) {
        gameObject = this;
      }
      return GetParent(gameObject, name);
    },
    getTopmostParent: function getTopmostParent(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }
      return GetTopmostParent(gameObject);
    }
  };

  var GetValue$d = Phaser.Utils.Objects.GetValue;
  var BaseAdd = Base.prototype.add;
  var Add = function Add(gameObject, config) {
    this.setParent(gameObject);
    var state = GetLocalState(gameObject);
    SetupSyncFlags(state, config);
    this.resetChildState(gameObject) // Reset local state of child
    .updateChildVisible(gameObject) // Apply parent's visible to child
    .updateChildActive(gameObject) // Apply parent's active to child
    .updateChildScrollFactor(gameObject) // Apply parent's scroll factor to child
    .updateChildMask(gameObject) // Apply parent's mask to child
    .updateCameraFilter(gameObject); // Apply parent's cameraFilter to child

    BaseAdd.call(this, gameObject);
    SyncDisplayList.call(this, gameObject, state);
    return this;
  };
  var AddLocal = function AddLocal(gameObject, config) {
    this.setParent(gameObject);

    // Set local state from child directly
    var state = GetLocalState(gameObject);
    SetupSyncFlags(state, config);
    // Position
    state.x = gameObject.x;
    state.y = gameObject.y;
    state.rotation = gameObject.rotation;
    state.scaleX = gameObject.scaleX;
    state.scaleY = gameObject.scaleY;
    // Alpha
    state.alpha = gameObject.alpha;
    // Visible
    state.visible = gameObject.visible;
    // Active
    state.active = gameObject.active;
    this.updateChildPosition(gameObject).updateChildAlpha(gameObject).updateChildVisible(gameObject) // Apply parent's visible to child
    .updateChildActive(gameObject) // Apply parent's active to child
    .updateChildScrollFactor(gameObject) // Apply parent's scroll factor to child
    .updateChildMask(gameObject); // Apply parent's mask to child

    BaseAdd.call(this, gameObject);
    SyncDisplayList.call(this, gameObject, state);
    return this;
  };
  var SetupSyncFlags = function SetupSyncFlags(state, config) {
    if (config === undefined) {
      config = true;
    }
    if (typeof config === 'boolean') {
      state.syncPosition = config;
      state.syncRotation = config;
      state.syncScale = config;
      state.syncAlpha = config;
      state.syncScrollFactor = config;
      state.syncCameraFilter = config;
      state.syncDisplayList = config;
    } else {
      state.syncPosition = GetValue$d(config, 'syncPosition', true);
      state.syncRotation = GetValue$d(config, 'syncRotation', true);
      state.syncScale = GetValue$d(config, 'syncScale', true);
      state.syncAlpha = GetValue$d(config, 'syncAlpha', true);
      state.syncScrollFactor = GetValue$d(config, 'syncScrollFactor', true);
      state.syncCameraFilter = GetValue$d(config, 'syncCameraFilter', true);
      state.syncDisplayList = GetValue$d(config, 'syncDisplayList', true);
    }
  };
  var SyncDisplayList = function SyncDisplayList(gameObject, state) {
    this.addToParentContainer(gameObject); // Sync parent's container to child

    if (state.syncDisplayList) {
      this.addToPatentLayer(gameObject); // Sync parent's layer to child
    }
    this.addToRenderLayer(gameObject); // Sync parent's render-layer
  };
  var AddChild = {
    // Can override this method
    add: function add(gameObject) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject);
      } else {
        Add.call(this, gameObject);
      }
      return this;
    },
    // Don't override this method
    pin: function pin(gameObject, config) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject, config);
      } else {
        Add.call(this, gameObject, config);
      }
      return this;
    },
    addMultiple: function addMultiple(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Add.call(this, gameObjects[i]);
      }
      return this;
    },
    addLocal: function addLocal(gameObject) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject);
      } else {
        AddLocal.call(this, gameObject);
      }
      return this;
    },
    // Don't override this method
    pinLocal: function pinLocal(gameObject, config) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject, config);
      } else {
        AddLocal.call(this, gameObject, config);
      }
      return this;
    },
    addLocalMultiple: function addLocalMultiple(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        AddLocal.call(this, gameObjects[i]);
      }
      return this;
    }
  };

  var BaseRemove = Base.prototype.remove;
  var BaseClear = Base.prototype.clear;
  var RemoveChild = {
    // Can override this method
    remove: function remove(gameObject, destroyChild) {
      if (GetParent(gameObject) !== this) {
        return this;
      }
      this.setParent(gameObject, null);
      if (!destroyChild) {
        this.removeFromRenderLayer(gameObject);
      }
      BaseRemove.call(this, gameObject, destroyChild);
      return this;
    },
    // Don't override this method
    unpin: function unpin(gameObject, destroyChild) {
      if (GetParent(gameObject) !== this) {
        return this;
      }
      this.setParent(gameObject, null);
      if (!destroyChild) {
        this.removeFromRenderLayer(gameObject);
      }
      BaseRemove.call(this, gameObject, destroyChild);
      return this;
    },
    clear: function clear(destroyChild) {
      var children = this.children;
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        this.setParent(child, null);
        if (!destroyChild) {
          this.removeFromRenderLayer(child);
        }
      }
      BaseClear.call(this, destroyChild);
      return this;
    }
  };

  var ChildState = {
    getLocalState: function getLocalState(gameObject) {
      return GetLocalState(gameObject);
    },
    resetChildState: function resetChildState(gameObject) {
      this.resetChildPositionState(gameObject).resetChildVisibleState(gameObject).resetChildAlphaState(gameObject).resetChildActiveState(gameObject);
      return this;
    },
    resetChildrenState: function resetChildrenState(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        this.resetChildState(gameObjects[i]);
      }
      return this;
    },
    syncProperties: function syncProperties() {
      this.syncPosition().syncVisible().syncAlpha().syncActive().syncScrollFactor().syncMask();
      return this;
    }
  };

  var RotateAround$1 = Phaser.Math.RotateAround;
  var Transform = {
    worldToLocal: function worldToLocal(point) {
      // Transform
      point.x -= this.x;
      point.y -= this.y;
      // Rotate
      RotateAround$1(point, 0, 0, -this.rotation);
      // Scale
      point.x /= this.scaleX;
      point.y /= this.scaleY;
      return point;
    },
    localToWorld: function localToWorld(point) {
      // Scale
      point.x *= this.scaleX;
      point.y *= this.scaleY;
      // Rotate
      RotateAround$1(point, 0, 0, this.rotation);
      // Transform
      point.x += this.x;
      point.y += this.y;
      return point;
    }
  };

  var GetScale = function GetScale(a, b) {
    if (a === b) {
      return 1;
    } else {
      return a / b;
    }
  };

  var Position = {
    updateChildPosition: function updateChildPosition(child) {
      if (child.isRexContainerLite) {
        child.syncChildrenEnable = false;
      }
      var state = GetLocalState(child);
      var parent = state.parent;
      if (state.syncPosition) {
        child.x = state.x;
        child.y = state.y;
        parent.localToWorld(child);
      }
      if (state.syncRotation) {
        child.rotation = state.rotation + parent.rotation;
      }
      if (state.syncScale) {
        child.scaleX = state.scaleX * parent.scaleX;
        child.scaleY = state.scaleY * parent.scaleY;
      }
      if (child.isRexContainerLite) {
        child.syncChildrenEnable = true;
        child.syncPosition();
      }
      return this;
    },
    syncPosition: function syncPosition() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildPosition, this);
      }
      return this;
    },
    resetChildPositionState: function resetChildPositionState(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      state.x = child.x;
      state.y = child.y;
      parent.worldToLocal(state);
      state.scaleX = GetScale(child.scaleX, parent.scaleX);
      state.scaleY = GetScale(child.scaleY, parent.scaleY);
      state.rotation = child.rotation - parent.rotation;
      return this;
    },
    setChildPosition: function setChildPosition(child, x, y) {
      child.x = x;
      child.y = y;
      this.resetChildPositionState(child);
      return this;
    },
    setChildLocalPosition: function setChildLocalPosition(child, x, y) {
      var state = GetLocalState(child);
      state.x = x;
      state.y = y;
      this.updateChildPosition(child);
      return this;
    },
    resetLocalPositionState: function resetLocalPositionState() {
      var parent = GetLocalState(this).parent;
      if (parent) {
        parent.resetChildPositionState(this);
      }
      return this;
    }
  };

  var DegToRad$4 = Phaser.Math.DegToRad;
  var Rotation = {
    updateChildRotation: function updateChildRotation(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      if (state.syncRotation) {
        child.rotation = parent.rotation + state.rotation;
      }
      return this;
    },
    syncRotation: function syncRotation() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildRotation, this);
      }
      return this;
    },
    resetChildRotationState: function resetChildRotationState(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      state.rotation = child.rotation - parent.rotation;
      return this;
    },
    setChildRotation: function setChildRotation(child, rotation) {
      child.rotation = rotation;
      this.resetChildRotationState(child);
      return this;
    },
    setChildAngle: function setChildAngle(child, angle) {
      child.angle = angle;
      this.resetChildRotationState(child);
      return this;
    },
    setChildLocalRotation: function setChildLocalRotation(child, rotation) {
      var state = GetLocalState(child);
      state.rotation = rotation;
      this.updateChildRotation(child);
      return this;
    },
    setChildLocalAngle: function setChildLocalAngle(child, angle) {
      var state = GetLocalState(child);
      state.rotation = DegToRad$4(angle);
      this.updateChildRotation(child);
      return this;
    },
    resetLocalRotationState: function resetLocalRotationState() {
      var parent = GetLocalState(this).parent;
      if (parent) {
        parent.resetChildRotationState(this);
      }
      return this;
    }
  };

  var Scale = {
    updateChildScale: function updateChildScale(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      if (state.syncScale) {
        child.scaleX = parent.scaleX * state.scaleX;
        child.scaleY = parent.scaleY * state.scaleY;
      }
      return this;
    },
    syncScale: function syncScale() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildScale, this);
      }
      return this;
    },
    resetChildScaleState: function resetChildScaleState(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      state.scaleX = GetScale(child.scaleX, parent.scaleX);
      state.scaleY = GetScale(child.scaleY, parent.scaleY);
      return this;
    },
    setChildScale: function setChildScale(child, scaleX, scaleY) {
      if (scaleY === undefined) {
        scaleY = scaleX;
      }
      child.scaleX = scaleX;
      child.scaleY = scaleY;
      this.resetChildScaleState(child);
      return this;
    },
    setChildLocalScale: function setChildLocalScale(child, scaleX, scaleY) {
      if (scaleY === undefined) {
        scaleY = scaleX;
      }
      var state = GetLocalState(child);
      state.scaleX = scaleX;
      state.scaleY = scaleY;
      this.updateChildScale(child);
      return this;
    },
    setChildDisplaySize: function setChildDisplaySize(child, width, height) {
      child.setDisplaySize(width, height);
      this.resetChildScaleState(child);
      return this;
    },
    resetLocalScaleState: function resetLocalScaleState() {
      var parent = GetLocalState(this).parent;
      if (parent) {
        parent.resetChildScaleState(this);
      }
      return this;
    }
  };

  /*

  Visible in localState:

    - visible: original visible of child
    - maskVisible: invisible by parent mask, see MaskChildren.js
        - undefined (not in masking) : Equal to mask visible
        - true (mask visible) : Inside, or across parent's visible area
        - false (maske invisible) : Out of parent's visible area

  Visible result of child = (parent visible) && (child visible) && (mask visible)
  */

  var Visible = {
    updateChildVisible: function updateChildVisible(child) {
      var localState = GetLocalState(child);
      var parent = localState.parent;
      var maskVisible = localState.hasOwnProperty('maskVisible') ? localState.maskVisible : true;
      var parentVisible = parent ? parent.visible : true;
      child.visible = parentVisible && localState.visible && maskVisible;
      return this;
    },
    syncVisible: function syncVisible() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildVisible, this);
      }
      return this;
    },
    resetChildVisibleState: function resetChildVisibleState(child) {
      var localState = GetLocalState(child);
      // Delete maskVisible property
      if (localState.hasOwnProperty('maskVisible')) {
        delete localState.maskVisible;
      }
      localState.visible = child.visible;
      return this;
    },
    setChildVisible: function setChildVisible(child, visible) {
      // Visible of child will be affect by parent's visible, and mask visible
      this.setChildLocalVisible(child, visible);
      return this;
    },
    // Internal method
    setChildLocalVisible: function setChildLocalVisible(child, visible) {
      if (visible === undefined) {
        visible = true;
      }
      var localState = GetLocalState(child);
      localState.visible = visible;
      this.updateChildVisible(child);
      return this;
    },
    // Internal method
    setChildMaskVisible: function setChildMaskVisible(child, visible) {
      if (visible === undefined) {
        visible = true;
      }
      var localState = GetLocalState(child);
      localState.maskVisible = visible;
      this.updateChildVisible(child);
      return this;
    },
    resetLocalVisibleState: function resetLocalVisibleState() {
      var parent = GetLocalState(this).parent;
      if (parent) {
        parent.resetChildVisibleState(this);
      }
      return this;
    }
  };

  var Alpha = {
    updateChildAlpha: function updateChildAlpha(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      if (state.syncAlpha) {
        child.alpha = parent.alpha * state.alpha;
      }
      return this;
    },
    syncAlpha: function syncAlpha() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildAlpha, this);
      }
      return this;
    },
    resetChildAlphaState: function resetChildAlphaState(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      state.alpha = GetScale(child.alpha, parent.alpha);
      return this;
    },
    setChildAlpha: function setChildAlpha(child, alpha) {
      child.alpha = alpha;
      this.resetChildAlphaState(child);
      return this;
    },
    setChildLocalAlpha: function setChildLocalAlpha(child, alpha) {
      var state = GetLocalState(child);
      state.alpha = alpha;
      this.updateChildAlpha(child);
      return this;
    },
    resetLocalAlphaState: function resetLocalAlphaState() {
      var parent = GetLocalState(this).parent;
      if (parent) {
        parent.resetChildAlphaState(this);
      }
      return this;
    }
  };

  var Active = {
    updateChildActive: function updateChildActive(child) {
      var localState = GetLocalState(child);
      var parent = localState.parent;
      child.active = parent.active && localState.active;
      return this;
    },
    syncActive: function syncActive() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildActive, this);
      }
      return this;
    },
    resetChildActiveState: function resetChildActiveState(child) {
      var localState = GetLocalState(child);
      localState.active = child.active;
      return this;
    },
    setChildActive: function setChildActive(child, active) {
      child.active = active;
      this.resetChildActiveState(child);
      return this;
    },
    setChildLocalActive: function setChildLocalActive(child, active) {
      if (active === undefined) {
        active = true;
      }
      var localState = GetLocalState(child);
      localState.active = active;
      this.updateChildActive(child);
      return this;
    },
    resetLocalActiveState: function resetLocalActiveState() {
      var parent = GetLocalState(this).parent;
      if (parent) {
        parent.resetChildActiveState(this);
      }
      return this;
    }
  };

  var ScrollFactor = {
    updateChildScrollFactor: function updateChildScrollFactor(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      if (state.syncScrollFactor) {
        child.scrollFactorX = parent.scrollFactorX;
        child.scrollFactorY = parent.scrollFactorY;
      }
      return this;
    },
    syncScrollFactor: function syncScrollFactor() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildScrollFactor, this);
      }
      return this;
    }
  };

  var CameraFilter = {
    updateCameraFilter: function updateCameraFilter(child) {
      var state = GetLocalState(child);
      var parent = state.parent;
      if (state.syncCameraFilter) {
        child.cameraFilter = parent.cameraFilter;
      }
      return this;
    },
    syncCameraFilter: function syncCameraFilter() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateCameraFilter, this);
      }
      return this;
    }
  };

  var Mask = {
    updateChildMask: function updateChildMask(child) {
      // Don't propagate null mask to clear children's mask
      if (this.mask == null) {
        return this;
      }
      var maskGameObject = this.mask.hasOwnProperty('geometryMask') ? this.mask.geometryMask : this.mask.bitmapMask;
      if (maskGameObject !== child) {
        child.mask = this.mask;
      }
      return this;
    },
    syncMask: function syncMask() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildMask, this);
      }
      return this;
    },
    setMask: function setMask(mask) {
      this.mask = mask;
      return this;
    },
    clearMask: function clearMask(destroyMask) {
      if (destroyMask === undefined) {
        destroyMask = false;
      }
      var self = this;

      // Clear current mask
      this._mask = null;
      this.setChildMaskVisible(this);
      // Also set maskVisible to `true`

      this.children.forEach(function (child) {
        // Clear child's mask
        if (child.clearMask) {
          child.clearMask(false);
        }
        if (!child.hasOwnProperty('isRexContainerLite')) {
          self.setChildMaskVisible(child);
          // Set child's maskVisible to `true`
        }
      });
      if (destroyMask && this.mask) {
        this.mask.destroy();
      }
      return this;
    }
  };

  var FilterDisplayGameObjects = function FilterDisplayGameObjects(gameObjects) {
    return gameObjects.filter(function (gameObject) {
      if (gameObject.displayList) {
        // Inside a scene or a layer
        return true;
      } else if (gameObject.parentContainer) {
        // Inside a container
        return true;
      }
    });
  };

  var Depth = {
    setDepth: function setDepth(value, containerOnly) {
      this.depth = value;
      if (!containerOnly && this.children) {
        var children = this.getAllChildren();
        for (var i = 0, cnt = children.length; i < cnt; i++) {
          children[i].depth = value;
        }
      }
      return this;
    },
    swapDepth: function swapDepth(containerB) {
      var depthA = this.depth;
      var depthB = containerB.depth;
      this.setDepth(depthB);
      containerB.setDepth(depthA);
      return this;
    },
    incDepth: function incDepth(inc) {
      this.depth += inc;
      if (this.children) {
        var children = this.getAllChildren();
        for (var i = 0, cnt = children.length; i < cnt; i++) {
          children[i].depth += inc;
        }
      }
      return this;
    },
    bringToTop: function bringToTop() {
      var displayList = this.displayList;
      if (!displayList) {
        return this;
      }
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children, false);
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (displayList.exists(child)) {
          displayList.bringToTop(child);
        }
      }
      return this;
    },
    bringMeToTop: function bringMeToTop() {
      return this.bringToTop();
    },
    sendToBack: function sendToBack() {
      var displayList = this.displayList;
      if (!displayList) {
        return this;
      }
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children, true);
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (displayList.exists(child)) {
          displayList.sendToBack(child);
        }
      }
      return this;
    },
    sendMeToBack: function sendMeToBack() {
      return this.sendToBack();
    },
    moveDepthBelow: function moveDepthBelow(gameObject) {
      var displayList = this.displayList;
      if (!displayList) {
        return this;
      }
      if (gameObject.displayList !== displayList) {
        // Do nothing if not at the same display list
        return this;
      }
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children, false);
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (displayList.exists(child)) {
          displayList.moveBelow(gameObject, child);
          break;
        }
      }
      return this;
    },
    moveMyDepthBelow: function moveMyDepthBelow(gameObject) {
      return this.moveDepthBelow(gameObject);
    },
    moveDepthAbove: function moveDepthAbove(gameObject) {
      var displayList = this.displayList;
      if (!displayList) {
        return this;
      }
      if (gameObject.displayList !== displayList) {
        // Do nothing if not at the same display list
        return this;
      }
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children, true);
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (displayList.exists(child)) {
          displayList.moveAbove(gameObject, child);
          break;
        }
      }
      return this;
    },
    moveMyDepthAbove: function moveMyDepthAbove(gameObject) {
      return this.moveDepthAbove(gameObject);
    },
    bringChildToTop: function bringChildToTop(child) {
      var gameObjects;
      if (child.isRexContainerLite) {
        gameObjects = child.getAllChildren([child]);
        gameObjects = FilterDisplayGameObjects(gameObjects);
        gameObjects = SortGameObjectsByDepth(gameObjects, false);
      } else {
        gameObjects = [child];
      }
      var children = this.getAllChildren([this]);
      children = FilterDisplayGameObjects(children);
      children = SortGameObjectsByDepth(children, false);
      var topChild = children[children.length - 1];
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        var gameObject = gameObjects[i];
        if (topChild === gameObject || topChild.displayList !== gameObject.displayList) {
          continue;
        }
        topChild.displayList.moveAbove(gameObject, topChild);
        topChild = gameObject;
      }
      return this;
    },
    sendChildToBack: function sendChildToBack(child) {
      var gameObjects;
      if (child.isRexContainerLite) {
        gameObjects = child.getAllChildren([child]);
        gameObjects = FilterDisplayGameObjects(gameObjects);
        gameObjects = SortGameObjectsByDepth(gameObjects, false);
      } else {
        gameObjects = [child];
      }
      var children = this.getAllChildren([this]);
      children = FilterDisplayGameObjects(children);
      children = SortGameObjectsByDepth(children, false);
      var bottomChild = children[0];
      for (var i = gameObjects.length - 1; i >= 0; i--) {
        var gameObject = gameObjects[i];
        if (bottomChild === gameObject || bottomChild.displayList !== gameObject.displayList) {
          continue;
        }
        bottomChild.displayList.moveBelow(gameObject, bottomChild);
        bottomChild = gameObject;
      }
      return this;
    }
  };

  var DepthFirstSearch = function DepthFirstSearch(root, callback) {
    var skip = callback(root);
    if (!skip && root.isRexContainerLite) {
      var children = root.children;
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        DepthFirstSearch(children[i], callback);
      }
    }
  };
  var BreadthFirstSearch = function BreadthFirstSearch(root, callback) {
    var queue = [root];
    while (queue.length > 0) {
      var current = queue.shift();
      var skip = callback(current);
      if (!skip && current.isRexContainerLite) {
        queue.push.apply(queue, _toConsumableArray(current.children));
      }
    }
  };

  var ArrayUtils = Phaser.Utils.Array;
  var Children = {
    getChildren: function getChildren(out) {
      if (!out) {
        out = this.children; // Return internal children array
      } else {
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
          out.push(this.children[i]);
        }
        // Copy children
      }
      return out;
    },
    getAllChildren: function getAllChildren(out) {
      if (out === undefined) {
        out = [];
      }
      var root = this;
      BreadthFirstSearch(root, function (child) {
        // Don't add root
        if (child === root) {
          return;
        }
        out.push(child);
      });
      return out;
    },
    getAllVisibleChildren: function getAllVisibleChildren(out) {
      if (out === undefined) {
        out = [];
      }
      var root = this;
      BreadthFirstSearch(root, function (child) {
        // Don't add root
        if (child === root) {
          return;
        }
        // Don't add invisible child
        if (!child.visible) {
          return true;
        }
        out.push(child);
      });
      return out;
    },
    bfs: function bfs(callback, root) {
      if (root === undefined) {
        root = this;
      }
      BreadthFirstSearch(root, callback);
      return this;
    },
    dfs: function dfs(callback, root) {
      if (root === undefined) {
        root = this;
      }
      DepthFirstSearch(root, callback);
      return this;
    },
    contains: function contains(gameObject) {
      // Override Base.contains method
      var parent = GetParent(gameObject);
      if (!parent) {
        return false;
      } else if (parent === this) {
        return true;
      } else {
        return this.contains(parent);
      }
    },
    getByName: function getByName(name, recursive) {
      if (!recursive) {
        return ArrayUtils.GetFirst(this.children, 'name', name); // object, or null if not found
      } else {
        // recursive
        // Breadth-first search
        var queue = [this];
        var parent, child;
        while (queue.length) {
          parent = queue.shift();
          for (var i = 0, cnt = parent.children.length; i < cnt; i++) {
            child = parent.children[i];
            if (child.name === name) {
              return child;
            } else if (child.isRexContainerLite) {
              queue.push(child);
            }
          }
        }
        return null;
      }
    },
    getRandom: function getRandom(startIndex, length) {
      return ArrayUtils.GetRandom(this.children, startIndex, length);
    },
    getFirst: function getFirst(property, value, startIndex, endIndex) {
      return ArrayUtils.GetFirstElement(this.children, property, value, startIndex, endIndex);
    },
    getAll: function getAll(property, value, startIndex, endIndex) {
      return ArrayUtils.GetAll(this.children, property, value, startIndex, endIndex);
    },
    count: function count(property, value, startIndex, endIndex) {
      return ArrayUtils.CountAllMatching(this.children, property, value, startIndex, endIndex);
    },
    swap: function swap(child1, child2) {
      ArrayUtils.Swap(this.children, child1, child2);
      return this;
    },
    setAll: function setAll(property, value, startIndex, endIndex) {
      ArrayUtils.SetAll(this.children, property, value, startIndex, endIndex);
      return this;
    }
  };

  var GetLocalStates = function GetLocalStates(gameObjects) {
    var localStates = [];
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var gameObject = gameObjects[i];
      if (!gameObject.hasOwnProperty('rexContainer')) {
        continue;
      }
      localStates.push(gameObject.rexContainer);
    }
    return localStates;
  };
  var GetScene = function GetScene(gameObjects) {
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var scene = gameObjects[i].scene;
      if (scene) {
        return scene;
      }
    }
    return null;
  };
  var UpdateChild = function UpdateChild(tween, key, target) {
    if (!target.parent) {
      // target object was removed, so remove this tween too
      tween.remove();
      return;
    }
    var parent = target.parent;
    var child = target.self;
    switch (key) {
      case 'x':
      case 'y':
        parent.updateChildPosition(child);
        break;
      case 'angle':
      case 'rotation':
        parent.updateChildRotation(child);
        break;
      case 'scaleX':
      case 'scaleY':
      case 'displayWidth':
      case 'displayHeight':
        parent.updateChildScale(child);
        break;
      case 'alpha':
        parent.updateChildAlpha(child);
        break;
      default:
        parent.updateChildPosition(child);
        parent.updateChildRotation(child);
        parent.updateChildScale(child);
        parent.updateChildAlpha(child);
        break;
    }
  };
  var Tween = {
    tweenChild: function tweenChild(tweenConfig) {
      var targets = tweenConfig.targets;
      if (!Array.isArray(targets)) {
        targets = [targets];
      }
      var scene = this.scene || GetScene(targets);
      if (!scene) {
        return;
      }

      // Map child game objects to local states
      tweenConfig.targets = GetLocalStates(targets);
      var tween = scene.tweens.add(tweenConfig);

      // Update child game object in 'update' event
      tween.on('update', UpdateChild);
      return tween;
    },
    tweenSelf: function tweenSelf(tweenConfig) {
      tweenConfig.targets = [this];
      return this.tweenChild(tweenConfig);
    },
    createTweenChildConfig: function createTweenChildConfig(tweenConfig) {
      var targets = tweenConfig.targets;
      if (targets) {
        if (!Array.isArray(targets)) {
          targets = [targets];
        }
        // Map child game objects to local states
        tweenConfig.targets = GetLocalStates(targets);
      }
      var onUpdate = tweenConfig.onUpdate;
      tweenConfig.onUpdate = function (tween, target) {
        if (onUpdate) {
          onUpdate(tween, target);
        }
        UpdateChild(tween, undefined, target);
      };
      return tweenConfig;
    },
    tween: function tween(tweenConfig) {
      var scene = this.scene;
      if (!tweenConfig.targets) {
        tweenConfig.targets = this;
      }
      return scene.tweens.add(tweenConfig);
    }
  };

  var ContainerClass = Phaser.GameObjects.Container;
  var IsContainerGameObject = function IsContainerGameObject(gameObject) {
    return gameObject instanceof ContainerClass;
  };

  var LayerClass = Phaser.GameObjects.Layer;
  var IsLayerGameObject = function IsLayerGameObject(gameObject) {
    return gameObject instanceof LayerClass;
  };

  var GetValidChildren = function GetValidChildren(parent) {
    var children = parent.getAllChildren([parent]);
    children = children.filter(function (gameObject) {
      return !!gameObject.displayList ||
      // At scene's displayList or at a layer
      !!gameObject.parentContainer; // At a container
    });
    return children;
  };
  var AddToContainer = function AddToContainer(p3Container) {
    var gameObjects = GetValidChildren(this);
    // This containerLite parent should be considered.
    if (gameObjects.indexOf(this) === -1) {
      gameObjects.push(this);
    }
    SortGameObjectsByDepth(gameObjects);
    p3Container.add(gameObjects);
  };
  var RemoveFromContainer = function RemoveFromContainer(p3Container, descending, addToScene) {
    if (!this.scene) {
      // Destroyed
      return;
    }
    var gameObjects = GetValidChildren(this);
    SortGameObjectsByDepth(gameObjects, descending);
    p3Container.remove(gameObjects);
    if (addToScene) {
      gameObjects.forEach(function (gameObject) {
        gameObject.addToDisplayList();
      });
    }
  };
  var P3Container = {
    addToContainer: function addToContainer(p3Container) {
      if (!IsContainerGameObject(p3Container)) {
        return this;
      }
      this._setParentContainerFlag = true;
      AddToContainer.call(this, p3Container);
      this._setParentContainerFlag = false;
      return this;
    },
    addToLayer: function addToLayer(layer) {
      if (!IsLayerGameObject(layer)) {
        return this;
      }
      AddToContainer.call(this, layer);
      return this;
    },
    removeFromContainer: function removeFromContainer() {
      if (!this.parentContainer) {
        return this;
      }
      this._setParentContainerFlag = true;
      RemoveFromContainer.call(this, this.parentContainer, true, false);
      this._setParentContainerFlag = false;
      return this;
    },
    removeFromLayer: function removeFromLayer(addToScene) {
      if (addToScene === undefined) {
        addToScene = true;
      }
      if (!IsLayerGameObject(this.displayList)) {
        return this;
      }
      RemoveFromContainer.call(this, this.displayList, false, addToScene);
      return this;
    },
    getParentContainer: function getParentContainer() {
      if (this.parentContainer) {
        return this.parentContainer;
      }

      // One of parent container has a layer
      var parent = this.getParent();
      while (parent) {
        var p3Container = parent.parentContainer;
        if (p3Container) {
          return p3Container;
        }
        parent = parent.getParent();
      }
      return null;
    },
    addToParentContainer: function addToParentContainer(gameObject) {
      // Do nothing if gameObject is not in any displayList
      if (!gameObject.displayList) {
        return this;
      }
      var p3Container = this.getParentContainer();
      if (!p3Container) {
        return this;
      }
      if (gameObject.isRexContainerLite) {
        // Add containerLite and its children
        gameObject.addToContainer(p3Container);
      } else {
        // Add gameObject directly
        p3Container.add(gameObject);
      }
      return this;
    },
    addToPatentLayer: function addToPatentLayer(gameObject) {
      // Do nothing if gameObject is not in any displayList
      if (!gameObject.displayList) {
        return this;
      }

      // At the same display list
      var parentLayer = this.displayList;
      if (parentLayer === gameObject.displayList) {
        return this;
      }
      if (IsLayerGameObject(parentLayer)) {
        if (gameObject.isRexContainerLite) {
          // Add containerLite and its children
          gameObject.addToLayer(parentLayer);
        } else {
          // Add gameObject directly
          parentLayer.add(gameObject);
        }
      }
      return this;
    }
  };

  var RenderLayer = {
    hasLayer: function hasLayer() {
      return !!this.privateRenderLayer;
    },
    enableLayer: function enableLayer() {
      if (this.hasLayer()) {
        return this;
      }
      var layer = this.scene.add.layer();
      // layer.name = (this.name) ? `${this.name}.privateLayer` : 'privateLayer';

      this.moveDepthBelow(layer);
      this.addToLayer(layer);
      this.privateRenderLayer = layer;
      return this;
    },
    getLayer: function getLayer() {
      if (!this.hasLayer()) {
        this.enableLayer();
      }
      return this.privateRenderLayer;
    },
    getRenderLayer: function getRenderLayer() {
      // This containerLite has a layer
      if (this.hasLayer()) {
        return this.privateRenderLayer;
      }

      // One of parent container has a layer
      var parent = this.getParent();
      while (parent) {
        var layer = parent.privateRenderLayer;
        if (layer) {
          return layer;
        }
        parent = parent.getParent();
      }
      return null;
    },
    // Internal method for adding child
    addToRenderLayer: function addToRenderLayer(gameObject) {
      // Don't add to layer if gameObject is not in any displayList
      if (!gameObject.displayList) {
        return this;
      }

      // Move gameObject from scene to layer
      var layer = this.getRenderLayer();
      if (!layer) {
        return this;
      }
      if (layer === gameObject.displayList) {
        return this;
      }
      if (gameObject.isRexContainerLite) {
        // Add containerLite and its children
        gameObject.addToLayer(layer);
      } else {
        // Add gameObject directly
        layer.add(gameObject);
      }
      var state = GetLocalState(gameObject);
      state.layer = layer;
      return this;
    },
    // Internal method for removing child
    removeFromRenderLayer: function removeFromRenderLayer(gameObject) {
      // Move gameObject from layer to scene
      var state = GetLocalState(gameObject);
      var layer = state.layer;
      if (!layer) {
        return this;
      }
      if (gameObject.isRexContainerLite) {
        // Remove containerLite and its children
        gameObject.removeFromLayer(true);
      } else {
        // Remove gameObject directly
        layer.remove(gameObject);
      }
      state.layer = null;
      return this;
    }
  };

  var RenderTexture = {
    snapshot: function snapshot(config) {
      // Save scale
      var scaleXSave = this.scaleX;
      var scaleYSave = this.scaleY;
      var scale1 = scaleXSave === 1 && scaleYSave === 1;
      if (!scale1) {
        this.setScale(1);
      }

      // Snapshot with scale = 1
      if (config === undefined) {
        config = {};
      }
      config.gameObjects = this.getAllVisibleChildren();
      config.x = this.x;
      config.y = this.y;
      config.originX = this.originX;
      config.originY = this.originY;
      var rt = Snapshot(config);
      var isValidRT = !!rt.scene;

      // Restore scale
      if (!scale1) {
        this.setScale(scaleXSave, scaleYSave);
        if (isValidRT) {
          rt.setScale(scaleXSave, scaleYSave);
        }
      }
      return isValidRT ? rt : this;
    }
  };

  var GetValue$c = Phaser.Utils.Objects.GetValue;
  var DrawBounds$1 = function DrawBounds(gameObjects, graphics, config) {
    var strokeColor, lineWidth, fillColor, fillAlpha, padding;
    if (typeof config === 'number') {
      strokeColor = config;
    } else {
      strokeColor = GetValue$c(config, 'color');
      lineWidth = GetValue$c(config, 'lineWidth');
      fillColor = GetValue$c(config, 'fillColor');
      fillAlpha = GetValue$c(config, 'fillAlpha', 1);
      padding = GetValue$c(config, 'padding', 0);
    }
    if (Array.isArray(gameObjects)) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Draw(gameObjects[i], graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding);
      }
    } else {
      Draw(gameObjects, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding);
    }
  };
  var Draw = function Draw(gameObject, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding) {
    var canDrawBound = gameObject.getBounds || gameObject.width !== undefined && gameObject.height !== undefined;
    if (!canDrawBound) {
      return;
    }
    if (strokeColor === undefined) {
      strokeColor = 0xffffff;
    }
    if (lineWidth === undefined) {
      lineWidth = 1;
    }
    if (fillColor === undefined) {
      fillColor = null;
    }
    if (fillAlpha === undefined) {
      fillAlpha = 1;
    }
    if (padding === undefined) {
      padding = 0;
    }
    var p0 = GetTopLeft(gameObject, Points[0]);
    p0.x -= padding;
    p0.y -= padding;
    var p1 = GetTopRight(gameObject, Points[1]);
    p1.x += padding;
    p1.y -= padding;
    var p2 = GetBottomRight(gameObject, Points[2]);
    p2.x += padding;
    p2.y += padding;
    var p3 = GetBottomLeft(gameObject, Points[3]);
    p3.x -= padding;
    p3.y += padding;
    if (fillColor !== null) {
      graphics.fillStyle(fillColor, fillAlpha).fillPoints(Points, true, true);
    }
    if (strokeColor !== null) {
      graphics.lineStyle(lineWidth, strokeColor).strokePoints(Points, true, true);
    }
  };
  var Points = [{
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 0
  }, {
    x: 0,
    y: 0
  }];

  var GetValue$b = Phaser.Utils.Objects.GetValue;
  var DrawBounds = function DrawBounds(graphics, config) {
    var drawContainer = GetValue$b(config, 'drawContainer', true);
    var gameObjects = GetValue$b(config, 'children');
    if (gameObjects === undefined) {
      gameObjects = this.getAllVisibleChildren([this]);
    }
    if (!drawContainer) {
      gameObjects = gameObjects.filter(function (gameObject) {
        return !gameObject.isRexContainerLite;
      });
    }
    DrawBounds$1(gameObjects, graphics, config);
    return this;
  };

  var RotateAround = Phaser.Math.RotateAround;
  var ChangeOrigin$1 = function ChangeOrigin(gameObject, originX, originY) {
    if (originY === undefined) {
      originY = originX;
    }
    var deltaXY = {
      x: (originX - gameObject.originX) * gameObject.displayWidth,
      y: (originY - gameObject.originY) * gameObject.displayHeight
    };
    RotateAround(deltaXY, 0, 0, gameObject.rotation);
    gameObject.originX = originX;
    gameObject.originY = originY;
    gameObject.x = gameObject.x + deltaXY.x;
    gameObject.y = gameObject.y + deltaXY.y;
    return gameObject;
  };

  var ChangeOrigin = function ChangeOrigin(originX, originY) {
    this.syncChildrenEnable = false;
    ChangeOrigin$1(this, originX, originY);
    this.syncChildrenEnable = true;
    var children = this.getAllChildren();
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      this.resetChildPositionState(children[i]);
    }
    return this;
  };

  var methods = {
    changeOrigin: ChangeOrigin,
    drawBounds: DrawBounds
  };
  Object.assign(methods, Parent, AddChild, RemoveChild, ChildState, Transform, Position, Rotation, Scale, Visible, Alpha, Active, ScrollFactor, CameraFilter, Mask, Depth, Children, Tween, P3Container, RenderLayer, RenderTexture);

  var ContainerLite = /*#__PURE__*/function (_Base) {
    _inherits(ContainerLite, _Base);
    function ContainerLite(scene, x, y, width, height, children) {
      var _this;
      _classCallCheck(this, ContainerLite);
      if (Array.isArray(width)) {
        children = width;
        width = undefined;
        height = undefined;
      }
      _this = _callSuper(this, ContainerLite, [scene, x, y, width, height]);
      _this.type = 'rexContainerLite';
      _this.isRexContainerLite = true;
      _this.syncChildrenEnable = true;
      _this._active = true;
      _this._mask = null;
      _this._scrollFactorX = 1;
      _this._scrollFactorY = 1;
      _this._cameraFilter = 0;
      _this.privateRenderLayer = undefined;
      if (children) {
        _this.add(children);
      }
      return _this;
    }
    _createClass(ContainerLite, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
          return;
        }
        this.syncChildrenEnable = false; // Don't sync properties changing anymore
        _get(_getPrototypeOf(ContainerLite.prototype), "destroy", this).call(this, fromScene);
        if (this.privateRenderLayer) {
          this.privateRenderLayer.list.length = 0; // Remove all children without trigger callback
          this.privateRenderLayer.destroy();
        }
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        this.setSize(width, height);
        return this;
      }
    }, {
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        if (this._x === value) {
          return;
        }
        this._x = value;
        this.syncPosition();
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        if (this._y === value) {
          return;
        }
        this._y = value;
        this.syncPosition();
      }

      // Override
    }, {
      key: "rotation",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "rotation", this);
      },
      set: function set(value) {
        if (this.rotation === value) {
          return;
        }
        _set(_getPrototypeOf(ContainerLite.prototype), "rotation", value, this, true);
        this.syncPosition();
      }

      // Override
    }, {
      key: "scaleX",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "scaleX", this);
      },
      set: function set(value) {
        if (this.scaleX === value) {
          return;
        }
        _set(_getPrototypeOf(ContainerLite.prototype), "scaleX", value, this, true);
        this.syncPosition();
      }

      // Override
    }, {
      key: "scaleY",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "scaleY", this);
      },
      set: function set(value) {
        if (this.scaleY === value) {
          return;
        }
        _set(_getPrototypeOf(ContainerLite.prototype), "scaleY", value, this, true);
        this.syncPosition();
      }

      // Override
    }, {
      key: "scale",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "scale", this);
      },
      set: function set(value) {
        if (this.scale === value) {
          return;
        }
        _set(_getPrototypeOf(ContainerLite.prototype), "scale", value, this, true);
        this.syncPosition();
      }

      // Override
    }, {
      key: "visible",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "visible", this);
      },
      set: function set(value) {
        if (_get(_getPrototypeOf(ContainerLite.prototype), "visible", this) === value) {
          return;
        }
        _set(_getPrototypeOf(ContainerLite.prototype), "visible", value, this, true);
        this.syncVisible();
      }

      // Override
    }, {
      key: "alpha",
      get: function get() {
        return _get(_getPrototypeOf(ContainerLite.prototype), "alpha", this);
      },
      set: function set(value) {
        if (_get(_getPrototypeOf(ContainerLite.prototype), "alpha", this) === value) {
          return;
        }
        _set(_getPrototypeOf(ContainerLite.prototype), "alpha", value, this, true);
        this.syncAlpha();
      }

      // Override
    }, {
      key: "active",
      get: function get() {
        return this._active;
      },
      set: function set(value) {
        if (this._active === value) {
          return;
        }
        this._active = value;
        this.syncActive();
      }

      // Override
    }, {
      key: "mask",
      get: function get() {
        return this._mask;
      },
      set: function set(mask) {
        if (this._mask === mask) {
          return;
        }
        this._mask = mask;
        this.syncMask();
      }

      // Override
    }, {
      key: "scrollFactorX",
      get: function get() {
        return this._scrollFactorX;
      },
      set: function set(value) {
        if (this._scrollFactorX === value) {
          return;
        }
        this._scrollFactorX = value;
        this.syncScrollFactor();
      }
    }, {
      key: "scrollFactorY",
      get: function get() {
        return this._scrollFactorY;
      },
      set: function set(value) {
        if (this._scrollFactorY === value) {
          return;
        }
        this._scrollFactorY = value;
        this.syncScrollFactor();
      }
    }, {
      key: "cameraFilter",
      get: function get() {
        return this._cameraFilter;
      },
      set: function set(value) {
        if (this._cameraFilter === value) {
          return;
        }
        this._cameraFilter = value;
        this.syncCameraFilter();
      }

      // Compatiable with container plugin
    }, {
      key: "list",
      get: function get() {
        return this.children;
      }
    }, {
      key: "parentContainer",
      get:
      // For p3-container
      function get() {
        return this._parentContainer;
      },
      set: function set(value) {
        // Initialize
        if (!this._parentContainer && !value) {
          this._parentContainer = value;
          return;
        }

        // Set this._parentContainer only,
        // if under AddToContainer, or RemoveFromContainer methods
        if (this.setParentContainerFlag) {
          this._parentContainer = value;
          return;
        }
        // else if (!this.setParentContainerFlag)

        // Add itself and all children to container,
        // Or remove itseld and all children from container
        if (this._parentContainer && !value) {
          // Remove from container
          this.removeFromContainer();
          this._parentContainer = value;
        } else if (value) {
          // Add to container
          this._parentContainer = value;
          this.addToContainer(value);
        } else {
          this._parentContainer = value;
        }
      }
    }, {
      key: "setParentContainerFlag",
      get: function get() {
        if (this._setParentContainerFlag) {
          return true;
        }
        var parent = GetParent(this);
        return parent ? parent.setParentContainerFlag : false;
      }
    }], [{
      key: "GetParent",
      value: function GetParent$1(child) {
        return GetParent(child);
      }
    }]);
    return ContainerLite;
  }(Base);
  Object.assign(ContainerLite.prototype, methods);

  var ForEachFace = function ForEachFace(faces, callback, scope, ignoreInvalid) {
    if (Array.isArray(faces)) {
      var isBreak = false;
      for (var i = 0, cnt = faces.length; i < cnt; i++) {
        var face = faces[i];
        if (ignoreInvalid && !face) {
          continue;
        }
        if (scope) {
          isBreak = callback.call(scope, face, i, faces);
        } else {
          isBreak = callback(face, i, faces);
        }
        if (isBreak) {
          return;
        }
      }
    } else {
      var isBreak = false;
      for (var name in faces) {
        var face = faces[name];
        if (ignoreInvalid && !face) {
          continue;
        }
        if (scope) {
          isBreak = callback.call(scope, face, name, faces);
        } else {
          isBreak = callback(face, name, faces);
        }
        if (isBreak) {
          return;
        }
      }
    }
  };

  var RadToDeg$2 = Phaser.Math.RadToDeg;
  var DegToRad$3 = Phaser.Math.DegToRad;
  var FaceContainer = /*#__PURE__*/function (_Container) {
    _inherits(FaceContainer, _Container);
    function FaceContainer(scene, x, y, width, height, faces) {
      var _this;
      _classCallCheck(this, FaceContainer);
      _this = _callSuper(this, FaceContainer, [scene, x, y, width, height]);
      _this.faces = faces; // Face Dictionary, or array

      ForEachFace(faces, function (face) {
        face.setPosition(x, y);
        this.add(face);
      }, _assertThisInitialized(_this), true);
      return _this;
    }

    // Override
    _createClass(FaceContainer, [{
      key: "rotationX",
      get: function get() {
        return 0;
      }

      // Override
      ,
      set: function set(value) {
        // rad
      }
    }, {
      key: "angleX",
      get: function get() {
        return RadToDeg$2(this.rotationX);
      },
      set: function set(value) {
        this.rotationX = DegToRad$3(value);
      }
    }, {
      key: "rotateX",
      get: function get() {
        return RadToDeg$2(this.rotationX);
      },
      set: function set(value) {
        this.rotationX = DegToRad$3(value);
      }

      // Override
    }, {
      key: "rotationY",
      get: function get() {
        return 0;
      }

      // Override
      ,
      set: function set(value) {
        // rad
      }
    }, {
      key: "angleY",
      get: function get() {
        return RadToDeg$2(this.rotationY);
      },
      set: function set(value) {
        this.rotationY = DegToRad$3(value);
      }
    }, {
      key: "rotateY",
      get: function get() {
        return RadToDeg$2(this.rotationY);
      },
      set: function set(value) {
        this.rotationY = DegToRad$3(value);
      }

      // Override
    }, {
      key: "rotationZ",
      get: function get() {
        return 0;
      }

      // Override
      ,
      set: function set(value) {
        // rad
      }
    }, {
      key: "angleZ",
      get: function get() {
        return RadToDeg$2(this.rotationZ);
      },
      set: function set(value) {
        this.rotationZ = DegToRad$3(value);
      }
    }, {
      key: "rotateZ",
      get: function get() {
        return RadToDeg$2(this.rotationZ);
      },
      set: function set(value) {
        this.rotationZ = DegToRad$3(value);
      }
    }, {
      key: "setDebug",
      value: function setDebug(graphic, callback) {
        ForEachFace(this.faces, function (face) {
          face.setDebug(graphic, callback);
        }, null, true);
        return this;
      }
    }, {
      key: "panX",
      value: function panX(v) {
        ForEachFace(this.faces, function (face) {
          face.panX(v);
        }, null, true);
        return this;
      }
    }, {
      key: "panY",
      value: function panY(v) {
        ForEachFace(this.faces, function (face) {
          face.panY(v);
        }, null, true);
        return this;
      }
    }, {
      key: "panZ",
      value: function panZ(v) {
        ForEachFace(this.faces, function (face) {
          face.panZ(v);
        }, null, true);
        return this;
      }
    }, {
      key: "transformVerts",
      value: function transformVerts(x, y, z, rotateX, rotateY, rotateZ) {
        ForEachFace(this.faces, function (face) {
          face.transformVerts(x, y, z, rotateX, rotateY, rotateZ);
        }, null, true);
        return this;
      }
    }, {
      key: "forEachFace",
      value: function forEachFace(callback, scope, ignoreInvalid) {
        ForEachFace(this.faces, callback, scope, ignoreInvalid);
        return this;
      }
    }]);
    return FaceContainer;
  }(ContainerLite);

  var IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;
  var DefaultImageConfig = {
    key: '__WHITE'
  };
  var ClassMap = {
    image: Image,
    rendertexture: RenderTexture$1
  };
  var CreatePerspectiveObject = function CreatePerspectiveObject(scene, config) {
    if (config === undefined) {
      config = DefaultImageConfig;
    }
    var perspectiveObject;
    if (IsPlainObject$3(config)) {
      if (!config.hasOwnProperty('type')) {
        if (config.hasOwnProperty('key')) {
          config.type = 'image';
        } else if (config.hasOwnProperty('width')) {
          config.type = 'rendertexture';
        }
      }
      perspectiveObject = new ClassMap[config.type](scene, config);
      scene.add.existing(perspectiveObject);
    } else {
      perspectiveObject = config;
    }
    return perspectiveObject;
  };

  var CreateFaces = function CreateFaces(scene, config, faceNames) {
    var faces;
    if (faceNames === undefined) {
      // Return an array of faces
      faces = [];
      var face, faceConfig;
      for (var i = 0, cnt = config.length; i < cnt; i++) {
        faceConfig = config[i];
        if (faceConfig) {
          face = CreatePerspectiveObject(scene, faceConfig);
        } else {
          face = null;
        }
        faces.push(face);
      }
    } else {
      // Return a face map
      faces = {};
      var face, name;
      for (var i = 0, cnt = faceNames.length; i < cnt; i++) {
        name = faceNames[i];
        if (config.hasOwnProperty(name)) {
          face = CreatePerspectiveObject(scene, config[name]);
        } else {
          face = null;
        }
        faces[name] = face;
      }
    }
    return faces;
  };

  var DegToRad$2 = Phaser.Math.DegToRad;
  var RAD180 = DegToRad$2(180);
  var LayoutFaces$1 = function LayoutFaces(parent, faces) {
    var backFace = faces.back;
    if (backFace) {
      if (parent.orientation === 0) {
        // Flip around Y
        backFace.transformVerts(0, 0, 0, 0, RAD180, 0);
      } else {
        // Flip around X
        backFace.transformVerts(0, 0, 0, RAD180, 0, 0);
      }
    }
  };

  var EventEmitterMethods = {
    setEventEmitter: function setEventEmitter(eventEmitter, EventEmitterClass) {
      if (EventEmitterClass === undefined) {
        EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
      }
      this._privateEE = eventEmitter === true || eventEmitter === undefined;
      this._eventEmitter = this._privateEE ? new EventEmitterClass() : eventEmitter;
      return this;
    },
    destroyEventEmitter: function destroyEventEmitter() {
      if (this._eventEmitter && this._privateEE) {
        this._eventEmitter.shutdown();
      }
      return this;
    },
    getEventEmitter: function getEventEmitter() {
      return this._eventEmitter;
    },
    on: function on() {
      if (this._eventEmitter) {
        this._eventEmitter.on.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    once: function once() {
      if (this._eventEmitter) {
        this._eventEmitter.once.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    off: function off() {
      if (this._eventEmitter) {
        this._eventEmitter.off.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    emit: function emit(event) {
      if (this._eventEmitter && event) {
        this._eventEmitter.emit.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    addListener: function addListener() {
      if (this._eventEmitter) {
        this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    removeListener: function removeListener() {
      if (this._eventEmitter) {
        this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    removeAllListeners: function removeAllListeners() {
      if (this._eventEmitter) {
        this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
      }
      return this;
    },
    listenerCount: function listenerCount() {
      if (this._eventEmitter) {
        return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
      }
      return 0;
    },
    listeners: function listeners() {
      if (this._eventEmitter) {
        return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
      }
      return [];
    },
    eventNames: function eventNames() {
      if (this._eventEmitter) {
        return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
      }
      return [];
    }
  };

  var SceneClass = Phaser.Scene;
  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
  };

  var GetSceneObject = function GetSceneObject(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsSceneObject(object)) {
      // object = scene
      return object;
    } else if (object.scene && IsSceneObject(object.scene)) {
      // object = game object
      return object.scene;
    } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) {
      // parent = bob object
      return object.parent.scene;
    } else {
      return null;
    }
  };

  var GameClass = Phaser.Game;
  var IsGame = function IsGame(object) {
    return object instanceof GameClass;
  };

  var GetGame = function GetGame(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsGame(object)) {
      return object;
    } else if (IsGame(object.game)) {
      return object.game;
    } else if (IsSceneObject(object)) {
      // object = scene object
      return object.sys.game;
    } else if (IsSceneObject(object.scene)) {
      // object = game object
      return object.scene.sys.game;
    }
  };

  var GetValue$a = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$a(config, 'eventEmitter', true));

      // Register callback of parent destroy event, also see `shutdown` method
      if (this.parent) {
        if (this.parent === this.scene) {
          // parent is a scene
          this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);
        } else if (this.parent === this.game) {
          // parent is game
          this.game.events.once('shutdown', this.onEnvDestroy, this);
        } else if (this.parent.once) {
          // parent is game object or something else
          this.parent.once('destroy', this.onParentDestroy, this);
        }

        // bob object does not have event emitter
      }
    }
    _createClass(ComponentBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // parent might not be shutdown yet
        if (this.parent) {
          if (this.parent === this.scene) {
            // parent is a scene
            this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);
          } else if (this.parent === this.game) {
            // parent is game
            this.game.events.off('shutdown', this.onEnvDestroy, this);
          } else if (this.parent.once) {
            // parent is game object or something else
            this.parent.off('destroy', this.onParentDestroy, this);
          }

          // bob object does not have event emitter
        }
        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        this.game = undefined;
        this.isShutdown = true;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onEnvDestroy",
      value: function onEnvDestroy() {
        this.destroy(true);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }, {
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent; // gameObject, scene, or game

        this.scene = GetSceneObject(parent);
        this.game = GetGame(parent);
        return this;
      }
    }]);
    return ComponentBase;
  }();
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);
    function TickTask(parent, config) {
      var _this;
      _classCallCheck(this, TickTask);
      _this = _callSuper(this, TickTask, [parent, config]);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;
      _this.setTickingMode(GetValue$9(config, 'tickingMode', 1));
      // boot() later
      return _this;
    }

    // override
    _createClass(TickTask, [{
      key: "boot",
      value: function boot() {
        if (this.tickingMode === 2 && !this.tickingState) {
          this.startTicking();
        }
      }

      // override
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.stop();
        if (this.tickingState) {
          this.stopTicking();
        }
        _get(_getPrototypeOf(TickTask.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setTickingMode",
      value: function setTickingMode(mode) {
        if (typeof mode === 'string') {
          mode = TICKINGMODE[mode];
        }
        this.tickingMode = mode;
      }

      // override
    }, {
      key: "startTicking",
      value: function startTicking() {
        this.tickingState = true;
      }

      // override
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        this.tickingState = false;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this._isRunning;
      },
      set: function set(value) {
        if (this._isRunning === value) {
          return;
        }
        this._isRunning = value;
        if (this.tickingMode === 1 && value != this.tickingState) {
          if (value) {
            this.startTicking();
          } else {
            this.stopTicking();
          }
        }
      }
    }, {
      key: "start",
      value: function start() {
        this.isPaused = false;
        this.isRunning = true;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        // Only can ba paused in running state
        if (this.isRunning) {
          this.isPaused = true;
          this.isRunning = false;
        }
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        // Only can ba resumed in paused state (paused from running state)
        if (this.isPaused) {
          this.isRunning = true;
        }
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.isPaused = false;
        this.isRunning = false;
        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.isPaused = false;
        this.isRunning = false;
        this.emit('complete', this.parent, this);
      }
    }]);
    return TickTask;
  }(ComponentBase);
  var TICKINGMODE = {
    'no': 0,
    'lazy': 1,
    'always': 2
  };

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var SceneUpdateTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(SceneUpdateTickTask, _TickTask);
    function SceneUpdateTickTask(parent, config) {
      var _this;
      _classCallCheck(this, SceneUpdateTickTask);
      _this = _callSuper(this, SceneUpdateTickTask, [parent, config]);

      // scene update : update, preupdate, postupdate, prerender, render
      // game update : step, poststep, 

      // If this.scene is not available, use game's 'step' event
      var defaultEventName = _this.scene ? 'update' : 'step';
      _this.tickEventName = GetValue$8(config, 'tickEventName', defaultEventName);
      _this.isSceneTicker = !IsGameUpdateEvent(_this.tickEventName);
      return _this;
    }
    _createClass(SceneUpdateTickTask, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "startTicking", this).call(this);
        if (this.isSceneTicker) {
          this.scene.sys.events.on(this.tickEventName, this.update, this);
        } else {
          this.game.events.on(this.tickEventName, this.update, this);
        }
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "stopTicking", this).call(this);
        if (this.isSceneTicker && this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off(this.tickEventName, this.update, this);
        } else if (this.game) {
          this.game.events.off(this.tickEventName, this.update, this);
        }
      }

      // update(time, delta) {
      //     
      // }
    }]);
    return SceneUpdateTickTask;
  }(TickTask);
  var IsGameUpdateEvent = function IsGameUpdateEvent(eventName) {
    return eventName === 'step' || eventName === 'poststep';
  };

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;
  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);
      this.resetFromJSON(config);
    }
    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$7(o, 'state', IDLE);
        this.timeScale = GetValue$7(o, 'timeScale', 1);
        this.delay = GetValue$7(o, 'delay', 0);
        this.repeat = GetValue$7(o, 'repeat', 0);
        this.repeatCounter = GetValue$7(o, 'repeatCounter', 0);
        this.repeatDelay = GetValue$7(o, 'repeatDelay', 0);
        this.duration = GetValue$7(o, 'duration', 0);
        this.nowTime = GetValue$7(o, 'nowTime', 0);
        this.justRestart = GetValue$7(o, 'justRestart', false);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          state: this.state,
          timeScale: this.timeScale,
          delay: this.delay,
          repeat: this.repeat,
          repeatCounter: this.repeatCounter,
          repeatDelay: this.repeatDelay,
          duration: this.duration,
          nowTime: this.nowTime,
          justRestart: this.justRestart
        };
      }
    }, {
      key: "destroy",
      value: function destroy() {}
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(delay) {
        if (delay === undefined) {
          delay = 0;
        }
        this.delay = delay;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration) {
        this.duration = duration;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        return this;
      }
    }, {
      key: "setRepeatInfinity",
      value: function setRepeatInfinity() {
        this.repeat = -1;
        return this;
      }
    }, {
      key: "setRepeatDelay",
      value: function setRepeatDelay(repeatDelay) {
        this.repeatDelay = repeatDelay;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        this.nowTime = this.delay > 0 ? -this.delay : 0;
        this.state = this.nowTime >= 0 ? COUNTDOWN : DELAY;
        this.repeatCounter = 0;
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.state = IDLE;
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (this.state === IDLE || this.state === DONE || delta === 0 || this.timeScale === 0) {
          return;
        }
        this.nowTime += delta * this.timeScale;
        this.justRestart = false;
        if (this.nowTime >= this.duration) {
          if (this.repeat === -1 || this.repeatCounter < this.repeat) {
            this.repeatCounter++;
            this.justRestart = true;
            this.nowTime -= this.duration;
            if (this.repeatDelay > 0) {
              this.nowTime -= this.repeatDelay;
              this.state = REPEATDELAY;
            }
          } else {
            this.nowTime = this.duration;
            this.state = DONE;
          }
        } else if (this.nowTime >= 0) {
          this.state = COUNTDOWN;
        }
      }
    }, {
      key: "t",
      get: function get() {
        var t;
        switch (this.state) {
          case IDLE:
          case DELAY:
          case REPEATDELAY:
            t = 0;
            break;
          case COUNTDOWN:
            t = this.nowTime / this.duration;
            break;
          case DONE:
            t = 1;
            break;
        }
        return Clamp(t, 0, 1);
      },
      set: function set(value) {
        value = Clamp(value, -1, 1);
        if (value < 0) {
          this.state = DELAY;
          this.nowTime = -this.delay * value;
        } else {
          this.state = COUNTDOWN;
          this.nowTime = this.duration * value;
          if (value === 1 && this.repeat !== 0) {
            this.repeatCounter++;
          }
        }
      }
    }, {
      key: "setT",
      value: function setT(t) {
        this.t = t;
        return this;
      }
    }, {
      key: "isIdle",
      get: function get() {
        return this.state === IDLE;
      }
    }, {
      key: "isDelay",
      get: function get() {
        return this.state === DELAY;
      }
    }, {
      key: "isCountDown",
      get: function get() {
        return this.state === COUNTDOWN;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this.state === DELAY || this.state === COUNTDOWN;
      }
    }, {
      key: "isDone",
      get: function get() {
        return this.state === DONE;
      }
    }, {
      key: "isOddIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 1;
      }
    }, {
      key: "isEvenIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 0;
      }
    }]);
    return Timer;
  }();
  var IDLE = 0;
  var DELAY = 1;
  var COUNTDOWN = 2;
  var REPEATDELAY = 3;
  var DONE = -1;

  var TimerTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(TimerTickTask, _TickTask);
    function TimerTickTask(parent, config) {
      var _this;
      _classCallCheck(this, TimerTickTask);
      _this = _callSuper(this, TimerTickTask, [parent, config]);
      _this.timer = new Timer();
      // boot() later 
      return _this;
    }

    // override
    _createClass(TimerTickTask, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        _get(_getPrototypeOf(TimerTickTask.prototype), "shutdown", this).call(this, fromScene);
        this.timer.destroy();
        this.timer = undefined;
      }
    }, {
      key: "start",
      value: function start() {
        this.timer.start();
        _get(_getPrototypeOf(TimerTickTask.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.timer.stop();
        _get(_getPrototypeOf(TimerTickTask.prototype), "stop", this).call(this);
        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.timer.stop();
        _get(_getPrototypeOf(TimerTickTask.prototype), "complete", this).call(this);
        return this;
      }
    }]);
    return TimerTickTask;
  }(SceneUpdateTickTask);

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;
  var EaseValueTaskBase = /*#__PURE__*/function (_TimerTask) {
    _inherits(EaseValueTaskBase, _TimerTask);
    function EaseValueTaskBase() {
      _classCallCheck(this, EaseValueTaskBase);
      return _callSuper(this, EaseValueTaskBase, arguments);
    }
    _createClass(EaseValueTaskBase, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue$6(o, 'timer'));
        this.setEnable(GetValue$6(o, 'enable', true));
        this.setTarget(GetValue$6(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        this.setEase(GetValue$6(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$6(o, 'repeat', 0));
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e == undefined) {
          e = true;
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "setTarget",
      value: function setTarget(target) {
        if (target === undefined) {
          target = this.parent;
        }
        this.target = target;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(time) {
        this.delay = time;
        // Assign `this.timer.setRepeat(repeat)` manually
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(time) {
        this.duration = time;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        // Assign `this.timer.setRepeat(repeat)` manually
        return this;
      }
    }, {
      key: "setRepeatDelay",
      value: function setRepeatDelay(repeatDelay) {
        this.repeatDelay = repeatDelay;
        // Assign `this.timer.setRepeatDelay(repeatDelay)` manually
        return this;
      }
    }, {
      key: "setEase",
      value: function setEase(ease) {
        if (ease === undefined) {
          ease = 'Linear';
        }
        this.ease = ease;
        this.easeFn = GetEaseFunction(ease);
        return this;
      }

      // Override
    }, {
      key: "start",
      value: function start() {
        // Ignore start if timer is running, i.e. in DELAY, o RUN state
        if (this.timer.isRunning) {
          return this;
        }
        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "restart",
      value: function restart() {
        this.timer.stop();
        this.start.apply(this, arguments);
        return this;
      }
    }, {
      key: "stop",
      value: function stop(toEnd) {
        if (toEnd === undefined) {
          toEnd = false;
        }
        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "stop", this).call(this);
        if (toEnd) {
          this.timer.setT(1);
          this.updateGameObject(this.target, this.timer);
          this.complete();
        }
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || !this.enable || !this.parent.active) {
          return this;
        }
        var target = this.target,
          timer = this.timer;
        timer.update(time, delta);

        // isDelay, isCountDown, isDone
        if (!timer.isDelay) {
          this.updateGameObject(target, timer);
        }
        this.emit('update', target, this);
        if (timer.isDone) {
          this.complete();
        }
        return this;
      }

      // Override
    }, {
      key: "updateGameObject",
      value: function updateGameObject(target, timer) {}
    }]);
    return EaseValueTaskBase;
  }(TimerTickTask);

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var Linear$2 = Phaser.Math.Linear;
  var Flip = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Flip, _EaseValueTaskBase);
    function Flip(gameObject, config) {
      var _this;
      _classCallCheck(this, Flip);
      _this = _callSuper(this, Flip, [gameObject, config]);
      // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(Flip, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Flip.prototype), "resetFromJSON", this).call(this, o);
        this.setEase(GetValue$5(o, 'ease', 'Cubic'));
        this.setFrontToBackDirection(GetValue$5(o, 'frontToBack', 0));
        this.setBackToFrontDirection(GetValue$5(o, 'backToFront', 1));
        return this;
      }
    }, {
      key: "setFrontToBackDirection",
      value: function setFrontToBackDirection(direction) {
        if (typeof direction === 'string') {
          direction = DIRMODE[direction];
        }
        this.endAngleFB = direction === 0 ? 180 : -180;
        return this;
      }
    }, {
      key: "setBackToFrontDirection",
      value: function setBackToFrontDirection(direction) {
        if (typeof direction === 'string') {
          direction = DIRMODE[direction];
        }
        this.endAngleBF = direction === 0 ? -180 : 180;
        return this;
      }
    }, {
      key: "start",
      value: function start(duration, repeat) {
        if (this.timer.isRunning) {
          return this;
        }
        this.timer.setDelay(this.delay).setDuration(duration);
        var loop = repeat + 1;
        var gameObject = this.parent;
        if (gameObject.face === 0) {
          // isFrontToBack
          this.startAngle = 0;
          this.endAngle = this.endAngleFB * loop;
        } else {
          this.startAngle = this.endAngleBF;
          this.endAngle = this.startAngle - this.endAngleBF * loop;
        }
        _get(_getPrototypeOf(Flip.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "flip",
      value: function flip(duration, repeat) {
        if (this.isRunning) {
          return this;
        }
        if (duration === undefined) {
          duration = this.duration;
        }
        if (repeat === undefined) {
          repeat = 0;
        }
        this.start(duration, repeat);
        this.emit('start', this.parent, this);

        // Set face index
        this.parent.currentFaceIndex = (this.parent.currentFaceIndex + repeat + 1) % 2;
        return this;
      }
    }, {
      key: "flipRight",
      value: function flipRight(duration, repeat) {
        if (this.parent.currentFaceIndex === 0) {
          // Front to back
          this.setFrontToBackDirection(0);
        } else {
          // Back to front
          this.setBackToFrontDirection(0);
        }
        this.flip(duration, repeat);
        return this;
      }
    }, {
      key: "flipLeft",
      value: function flipLeft(duration, repeat) {
        if (this.parent.currentFaceIndex === 0) {
          // Front to back
          this.setFrontToBackDirection(1);
        } else {
          // Back to front
          this.setBackToFrontDirection(1);
        }
        this.flip(duration, repeat);
        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {
        var t = this.easeFn(timer.t);
        var value = Linear$2(this.startAngle, this.endAngle, t);
        if (gameObject.orientation === 0) {
          gameObject.angleY = value;
        } else {
          gameObject.angleX = value;
        }
      }
    }]);
    return Flip;
  }(EaseValueTaskBase);
  var DIRMODE = {
    'right': 0,
    'left-to-right': 0,
    'left': 1,
    'right-to-left': 1
  };

  var IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var FaceNames = ['back', 'front'];
  var Card = /*#__PURE__*/function (_FaceContainer) {
    _inherits(Card, _FaceContainer);
    function Card(scene, x, y, config) {
      var _this;
      _classCallCheck(this, Card);
      if (IsPlainObject$2(x)) {
        config = x;
        x = GetValue$4(config, 'x', 0);
        y = GetValue$4(config, 'y', 0);
      }
      var faces = CreateFaces(scene, config, FaceNames);
      var backFace = faces.back;
      var frontFace = faces.front;
      var width = GetValue$4(config, 'width');
      var height = GetValue$4(config, 'height');
      if (width === undefined || height === undefined) {
        if (width === undefined) {
          var frontFaceWidth = frontFace ? frontFace.width : 0;
          var backFaceWidth = backFace ? backFace.width : 0;
          width = Math.max(frontFaceWidth, backFaceWidth);
        }
        if (height === undefined) {
          var frontFaceHeight = frontFace ? frontFace.height : 0;
          var backFaceHeight = backFace ? backFace.height : 0;
          height = Math.max(frontFaceHeight, backFaceHeight);
        }
      }
      _this = _callSuper(this, Card, [scene, x, y, width, height, faces]);
      _this.type = 'rexPerspectiveCard';
      _this.frontFaceRotationX = 0;
      _this.frontFaceRotationY = 0;
      _this.frontFaceRotationZ = 0;
      ForEachFace(faces, function (face, name) {
        this["".concat(name, "Face")] = face;
      }, _assertThisInitialized(_this));
      var flipConfig = GetValue$4(config, 'flip', undefined);
      if (flipConfig !== false) {
        _this.flip = new Flip(_assertThisInitialized(_this), flipConfig);
      }
      _this.setOrientation(GetValue$4(config, 'orientation', 0));
      LayoutFaces$1(_assertThisInitialized(_this), faces);
      _this.setFace(GetValue$4(config, 'face', 0));
      return _this;
    }
    _createClass(Card, [{
      key: "rotationX",
      get: function get() {
        return this.frontFaceRotationX;
      },
      set: function set(value) {
        if (this.frontFaceRotationX === value) {
          return;
        }
        this.frontFaceRotationX = value;
        ForEachFace(this.faces, function (face) {
          face.rotationX = value;
        }, null, true);
      }
    }, {
      key: "rotationY",
      get: function get() {
        return this.frontFaceRotationY;
      },
      set: function set(value) {
        if (this.frontFaceRotationY === value) {
          return;
        }
        this.frontFaceRotationY = value;
        ForEachFace(this.faces, function (face) {
          face.rotationY = value;
        }, null, true);
      }
    }, {
      key: "rotationZ",
      get: function get() {
        return this.frontFaceRotationZ;
      },
      set: function set(value) {
        if (this.frontFaceRotationZ === value) {
          return;
        }
        this.frontFaceRotationZ = value;
        ForEachFace(this.faces, function (face) {
          face.rotationZ = value;
        }, null, true);
      }
    }, {
      key: "setOrientation",
      value: function setOrientation(orientation) {
        if (typeof orientation === 'string') {
          orientation = ORIENTATIONMODE[orientation];
        }
        this.orientation = orientation;
        return this;
      }
    }, {
      key: "face",
      get: function get() {
        return this.currentFaceIndex;
      },
      set: function set(index) {
        if (typeof index === 'string') {
          index = FACEMODE[index];
        }
        this.currentFaceIndex = index;
        var isBackFace = index === 1;
        var angle = isBackFace ? 180 : 0;
        if (this.orientation === 0) {
          // Flip around Y
          this.angleY = angle;
        } else {
          // Flip around X
          this.angleX = angle;
        }
      }
    }, {
      key: "setFace",
      value: function setFace(face) {
        this.face = face;
        return this;
      }
    }, {
      key: "toggleFace",
      value: function toggleFace() {
        var newFace = this.face === 0 ? 1 : 0;
        this.setFace(newFace);
        return this;
      }
    }]);
    return Card;
  }(FaceContainer);
  var ORIENTATIONMODE = {
    x: 0,
    horizontal: 0,
    h: 0,
    y: 1,
    vertical: 1,
    v: 1
  };
  var FACEMODE = {
    front: 0,
    back: 1
  };

  function PerspectiveCardFactory (x, y, config) {
    var gameObject = new Card(this.scene, x, y, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var BuildGameObject$2 = Phaser.GameObjects.BuildGameObject;
  function PerspectiveCardCreator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }
    if (addToScene !== undefined) {
      config.add = addToScene;
    }
    var gameObject = new Card(this.scene, 0, 0, config);
    BuildGameObject$2(this.scene, gameObject, config);
    return gameObject;
  }

  var FaceNameToIndex = function FaceNameToIndex(faces, name) {
    for (var i = 0, cnt = faces.length; i < cnt; i++) {
      if (face && face.name === name) {
        return i;
      }
    }
    return -1;
  };

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var RadToDeg$1 = Phaser.Math.RadToDeg;
  var DegToRad$1 = Phaser.Math.DegToRad;
  var WrapDegrees$1 = Phaser.Math.Angle.WrapDegrees;
  var ShortestBetween = Phaser.Math.Angle.ShortestBetween;
  var Wrap$2 = Phaser.Math.Wrap;
  var Linear$1 = Phaser.Math.Linear;
  var Roll$1 = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Roll, _EaseValueTaskBase);
    function Roll(gameObject, config) {
      var _this;
      _classCallCheck(this, Roll);
      _this = _callSuper(this, Roll, [gameObject, config]);
      // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(Roll, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Roll.prototype), "resetFromJSON", this).call(this, o);
        this.setEase(GetValue$3(o, 'ease', 'Cubic'));
        return this;
      }
    }, {
      key: "start",
      value: function start(deltaRotation) {
        if (this.timer.isRunning) {
          return this;
        }
        this.timer.setDelay(this.delay).setDuration(this.duration);
        var gameObject = this.parent;
        this.startRotationY = gameObject.rotationY;
        this.endRotationY = this.startRotationY + deltaRotation;
        _get(_getPrototypeOf(Roll.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "to",
      value: function to(index, duration) {
        if (this.isRunning) {
          return this;
        }
        var carousel = this.parent;
        if (typeof index === 'string') {
          index = FaceNameToIndex(carousel.faces, index);
          if (index === -1) {
            index = 0;
          }
        }
        index = Wrap$2(index, 0, carousel.faces.length);
        if (duration !== undefined) {
          this.setDuration(duration);
        }
        var start = WrapDegrees$1(RadToDeg$1(carousel.rotationY));
        var end = WrapDegrees$1(RadToDeg$1((carousel.rtl ? 1 : -1) * carousel.faceAngle * index));
        var delta = ShortestBetween(start, end); // Degrees
        this.start(DegToRad$1(delta));
        carousel.currentFaceIndex = index;
        return this;
      }
    }, {
      key: "toNext",
      value: function toNext(duration) {
        var index = this.parent.currentFaceIndex + 1;
        this.to(index, duration);
        return this;
      }
    }, {
      key: "toPrevious",
      value: function toPrevious(duration) {
        var index = this.parent.currentFaceIndex - 1;
        this.to(index, duration);
        return this;
      }
    }, {
      key: "toRight",
      value: function toRight(duration) {
        if (!this.parent.rtl) {
          this.toNext(duration);
        } else {
          this.toPrevious(duration);
        }
        return this;
      }
    }, {
      key: "toLeft",
      value: function toLeft(duration) {
        if (!this.parent.rtl) {
          this.toPrevious(duration);
        } else {
          this.toNext(duration);
        }
        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {
        var t = this.easeFn(timer.t);
        gameObject.rotationY = Linear$1(this.startRotationY, this.endRotationY, t);
      }
    }]);
    return Roll;
  }(EaseValueTaskBase);

  var GetFirstFace = function GetFirstFace(faces) {
    var face;
    for (var i = 0, cnt = faces.length; i < cnt; i++) {
      face = faces[i];
      if (face) {
        break;
      }
    }
    return face;
  };

  var LayoutFaces = function LayoutFaces(parent, faces) {
    if (parent.faceWidth === 0) {
      return;
    }
    var radius = parent.faceRadius;
    ForEachFace(faces, function (face) {
      var transferZ = radius / face.height;
      face.transformVerts(0, 0, transferZ).panZ(transferZ);
    }, null, true);
  };

  var IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var DegToRad = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
  var WrapDegrees = Phaser.Math.Angle.WrapDegrees;
  var Linear = Phaser.Math.Linear;
  var Wrap$1 = Phaser.Math.Wrap;
  var Carousel = /*#__PURE__*/function (_FaceContainer) {
    _inherits(Carousel, _FaceContainer);
    function Carousel(scene, x, y, config) {
      var _this;
      _classCallCheck(this, Carousel);
      if (IsPlainObject$1(x)) {
        config = x;
        x = GetValue$2(config, 'x', 0);
        y = GetValue$2(config, 'y', 0);
      }
      var faceConfig = GetValue$2(config, 'faces', undefined);
      if (!faceConfig) {
        faceConfig = [];
      }
      var faces = CreateFaces(scene, faceConfig);
      var firstFace = GetFirstFace(faces);
      var width = GetValue$2(config, 'width');
      var height = GetValue$2(config, 'height');
      if (width === undefined) {
        width = firstFace ? firstFace.width : 0;
      }
      if (height === undefined) {
        height = firstFace ? firstFace.height : 0;
      }
      _this = _callSuper(this, Carousel, [scene, x, y, width, height, faces]);
      _this.type = 'rexPerspectiveCarousel';
      _this.face0RotationY = undefined;
      var faceCount = faces.length;
      // Face angle
      _this.faceAngle = faceCount > 0 ? DegToRad(360 / faces.length) : 0;

      // Face width, face radius
      var faceWidth = GetValue$2(config, 'faceWidth', undefined);
      if (faceWidth === undefined) {
        var faceSpace = GetValue$2(config, 'faceSpace', 0);
        faceWidth = firstFace ? firstFace.width + faceSpace : 0;
      }
      _this.faceWidth = faceWidth;
      if (faceCount > 2) {
        _this.faceRadius = faceWidth / 2 / Math.tan(_this.faceAngle / 2);
      } else {
        _this.faceRadius = faceWidth / 2;
      }
      LayoutFaces(_assertThisInitialized(_this), faces);
      var rollConfig = GetValue$2(config, 'roll', undefined);
      if (rollConfig !== false) {
        var RollClass = GetValue$2(config, 'rollClass', Roll$1);
        _this.roll = new RollClass(_assertThisInitialized(_this), rollConfig);
      }

      // Left-To-Right, or Right-To-Left
      _this.rtl = GetValue$2(config, 'rtl', false);

      // z-index
      _this.zStart = GetValue$2(config, 'z', 1);
      _this.zEnd = GetValue$2(config, 'zEnd', _this.zStart - 1);
      _this.setFace(GetValue$2(config, 'face', 0));
      return _this;
    }
    _createClass(Carousel, [{
      key: "rotationY",
      get: function get() {
        return this.face0RotationY;
      },
      set: function set(value) {
        if (this.face0RotationY === value) {
          return;
        }
        this.face0RotationY = value;
        var deltaAngle = this.faceAngle;
        var zStart = this.zStart;
        var zEnd = this.zEnd;
        var sign = this.rtl ? -1 : 1;
        ForEachFace(this.faces, function (face, i) {
          // Set rotationY
          var rotationY = value + sign * deltaAngle * i;
          face.rotationY = rotationY;

          // Set depth
          var angle = Math.abs(WrapDegrees(RadToDeg(rotationY))); // 0~180
          var z = Linear(zStart, zEnd, angle / 180);
          face.setDepth(z);
        }, null, true);
      }
    }, {
      key: "face",
      get: function get() {
        return this.currentFaceIndex;
      },
      set: function set(index) {
        if (typeof index === 'string') {
          index = FaceNameToIndex(this.faces, index);
          if (index === -1) {
            index = 0;
          }
        }
        index = Wrap$1(index, 0, this.faces.length);
        this.currentFaceIndex = index;
        this.rotationY = (this.rtl ? 1 : -1) * this.faceAngle * index;
      }
    }, {
      key: "setFace",
      value: function setFace(index) {
        this.face = index;
        return this;
      }
    }]);
    return Carousel;
  }(FaceContainer);

  function PerspectiveCarouselFactory (x, y, config) {
    var gameObject = new Carousel(this.scene, x, y, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var BuildGameObject$1 = Phaser.GameObjects.BuildGameObject;
  function PerspectiveCarouselCreator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }
    if (addToScene !== undefined) {
      config.add = addToScene;
    }
    var gameObject = new Carousel(this.scene, 0, 0, config);
    BuildGameObject$1(this.scene, gameObject, config);
    return gameObject;
  }

  var Roll = /*#__PURE__*/function (_Base) {
    _inherits(Roll, _Base);
    function Roll() {
      _classCallCheck(this, Roll);
      return _callSuper(this, Roll, arguments);
    }
    _createClass(Roll, [{
      key: "toNext",
      value: function toNext(duration) {
        var gameObject = this.parent;
        if (!gameObject.repeat && gameObject.isLastImage) {
          return this;
        }
        if (this.isRunning) {
          return this;
        }
        gameObject.setImageIndex(gameObject.currentImageIndex + 1);
        _get(_getPrototypeOf(Roll.prototype), "toNext", this).call(this, duration).once('complete', gameObject.updateTexture, gameObject);
        return this;
      }
    }, {
      key: "toPrevious",
      value: function toPrevious(duration) {
        var gameObject = this.parent;
        if (!gameObject.repeat && gameObject.isFirstImage) {
          return this;
        }
        if (this.isRunning) {
          return this;
        }
        gameObject.setImageIndex(gameObject.currentImageIndex - 1);
        _get(_getPrototypeOf(Roll.prototype), "toPrevious", this).call(this, duration).once('complete', gameObject.updateTexture, gameObject);
        return this;
      }
    }]);
    return Roll;
  }(Roll$1);

  var GetFaceSize = function GetFaceSize(scene, images) {
    if (!images) {
      return null;
    }
    if (Array.isArray(images)) {
      var textureKey = images[0];
      var frame = scene.sys.textures.getFrame(textureKey.key, textureKey.frame);
      result.width = frame.cutWidth;
      result.height = frame.cutHeight;
    } else {
      result.width = images.width;
      result.height = images.height;
    }
    return result;
  };
  var result = {};

  var GetIndexOffsetMap = function GetIndexOffsetMap(faceCount) {
    var indexOffsetMap = [0];
    for (var i = 1, cnt = Math.floor((faceCount - 1) / 2); i <= cnt; i++) {
      indexOffsetMap.push(i);
      indexOffsetMap.push(-i);
    }
    return indexOffsetMap;
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var Wrap = Phaser.Math.Wrap;
  var ImageCarousel = /*#__PURE__*/function (_Carousel) {
    _inherits(ImageCarousel, _Carousel);
    function ImageCarousel(scene, x, y, config) {
      var _this;
      _classCallCheck(this, ImageCarousel);
      if (IsPlainObject(x)) {
        config = x;
        x = GetValue$1(config, 'x', 0);
        y = GetValue$1(config, 'y', 0);
      }
      if (config === undefined) {
        config = {};
      }
      var faceWidth, faceHeight;
      var images = GetValue$1(config, 'images');
      var faceSize = GetFaceSize(scene, images);
      if (faceSize) {
        faceWidth = faceSize.width;
        faceHeight = faceSize.height;
      } else {
        faceWidth = GetValue$1(config, 'width');
        faceHeight = GetValue$1(config, 'height');
      }

      // Create 4 render-texture faces
      var faceCount = GetValue$1(config, 'faceCount', 4);
      var face,
        faces = [];
      for (var i = 0; i < faceCount; i++) {
        face = new RenderTexture$1(scene, 0, 0, faceWidth, faceHeight, config);
        scene.add.existing(face);
        faces.push(face);
      }
      config.faces = faces;
      config.rollClass = Roll;
      _this = _callSuper(this, ImageCarousel, [scene, x, y, config]);
      _this.type = 'rexPerspectiveImageCarousel';
      _this.images = images;
      _this.indexOffsetMap = GetIndexOffsetMap(faceCount);
      _this.repeat = GetValue$1(config, 'repeat', true);
      _this.setImageIndex(GetValue$1(config, 'index', 0)).updateTexture();
      return _this;
    }
    _createClass(ImageCarousel, [{
      key: "setImageIndex",
      value: function setImageIndex(index) {
        this.currentImageIndex = Wrap(index, 0, this.images.length);
        return this;
      }
    }, {
      key: "isFirstImage",
      get: function get() {
        return this.images.length === 0 || this.currentImageIndex === 0;
      }
    }, {
      key: "isLastImage",
      get: function get() {
        return this.images.length === 0 || this.currentImageIndex === this.images.length - 1;
      }
    }, {
      key: "updateTexture",
      value: function updateTexture() {
        var totalKeys = this.images.length;
        var totalFaces = this.faces.length;
        this.indexOffsetMap.forEach(function (indexOffset) {
          var textureIndex = Wrap(this.currentImageIndex + indexOffset, 0, totalKeys);
          var faceIndex = Wrap(this.currentFaceIndex + indexOffset, 0, totalFaces);
          var textureKey = this.images[textureIndex];
          this.faces[faceIndex].rt.drawFrame(textureKey.key, textureKey.frame);
        }, this);
        return this;
      }
    }]);
    return ImageCarousel;
  }(Carousel);

  function PerspectiveImageCarouselFactory (x, y, config) {
    var gameObject = new ImageCarousel(this.scene, x, y, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var BuildGameObject = Phaser.GameObjects.BuildGameObject;
  function PerspectiveImageCarouselCreator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }
    if (addToScene !== undefined) {
      config.add = addToScene;
    }
    var gameObject = new ImageCarousel(this.scene, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
  }

  var GetValue = Phaser.Utils.Objects.GetValue;
  var Init = function Init(parentContainer, rtOwner, config) {
    rtOwner.visibleSibling = [];
    rtOwner.isRunning = false;
    rtOwner.useParentBounds = GetValue(config, 'useParentBounds', false);
    rtOwner.setPosition(parentContainer.x, parentContainer.y).setVisible(false);
    parentContainer.pin(rtOwner);
  };

  var Exit = function Exit(parentContainer, rtOwner) {
    if (!parentContainer) {
      return false;
    }
    var visibleSibling = rtOwner.visibleSibling;
    // Set all visible children back
    for (var i = 0, cnt = visibleSibling.length; i < cnt; i++) {
      parentContainer.setChildVisible(visibleSibling[i], true);
    }
    visibleSibling.length = 0;

    // Set rtOwner to be invisible
    parentContainer.setChildVisible(rtOwner, false);
    rtOwner.isRunning = false;
    return true;
  };

  var Enter = function Enter(parentContainer, rtOwner) {
    if (!parentContainer) {
      return false;
    }
    Exit(parentContainer, rtOwner);

    // Get and paste all visible children, which dose not include this render texture
    var useParentBounds = rtOwner.useParentBounds;
    Snapshot({
      gameObjects: parentContainer.getAllVisibleChildren(),
      renderTexture: rtOwner.rt,
      x: rtOwner.x,
      y: rtOwner.y,
      width: useParentBounds ? parentContainer.displayWidth : undefined,
      height: useParentBounds ? parentContainer.displayHeighth : undefined,
      originX: useParentBounds ? parentContainer.originX : undefined,
      originY: useParentBounds ? parentContainer.originY : undefined
    });

    // Set rtOwner to be visible
    parentContainer.setChildVisible(rtOwner, true);

    // Set visible sibling to be invisible
    var visibleSibling = rtOwner.visibleSibling;
    var children = parentContainer.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (child.visible && child !== rtOwner) {
        parentContainer.setChildVisible(child, false);
        visibleSibling.push(child);
      }
    }
    rtOwner.isRunning = true;
    return true;
  };

  var MeshRenderTextureBase = function MeshRenderTextureBase(RenderTextureOwnerClass) {
    return /*#__PURE__*/function (_RenderTextureOwnerCl) {
      _inherits(Base, _RenderTextureOwnerCl);
      function Base(parentContainer, config) {
        var _this;
        _classCallCheck(this, Base);
        var scene = parentContainer.scene;
        _this = _callSuper(this, Base, [scene, 0, 0, 1, 1, config]);
        scene.add.existing(_assertThisInitialized(_this));
        Init(parentContainer, _assertThisInitialized(_this), config);
        return _this;
      }
      _createClass(Base, [{
        key: "destroy",
        value: function destroy(fromScene) {
          if (!this.scene || this.ignoreDestroy) {
            return;
          }
          this.exit();
          _get(_getPrototypeOf(Base.prototype), "destroy", this).call(this, fromScene);
        }
      }, {
        key: "enter",
        value: function enter() {
          var result = Enter(this.rexContainer.parent, this);
          if (result) {
            this.syncSize();
          }
          return this;
        }
      }, {
        key: "exit",
        value: function exit() {
          Exit(this.rexContainer.parent, this);
          return this;
        }
      }]);
      return Base;
    }(RenderTextureOwnerClass);
  };

  var ContainerPerspective = /*#__PURE__*/function (_MeshRenderTextureBas) {
    _inherits(ContainerPerspective, _MeshRenderTextureBas);
    function ContainerPerspective() {
      _classCallCheck(this, ContainerPerspective);
      return _callSuper(this, ContainerPerspective, arguments);
    }
    _createClass(ContainerPerspective, [{
      key: "perspectiveState",
      get: function get() {
        return this.isRunning;
      }
    }]);
    return ContainerPerspective;
  }(MeshRenderTextureBase(RenderTexture$1));

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

  var PerspectiveImagePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(PerspectiveImagePlugin, _Phaser$Plugins$BaseP);
    function PerspectiveImagePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, PerspectiveImagePlugin);
      _this = _callSuper(this, PerspectiveImagePlugin, [pluginManager]);

      //  Register our new Game Object type
      pluginManager.registerGameObject('rexPerspectiveImage', PerspectiveImageFactory, PerspectiveImageCreator);
      pluginManager.registerGameObject('rexPerspectiveRenderTexture', PerspectiveRenderTextureFactory, PerspectiveRenderTextureCreator);
      pluginManager.registerGameObject('rexPerspectiveSprite', PerspectiveSpriteFactory, PerspectiveSpriteCreator);
      pluginManager.registerGameObject('rexPerspectiveCard', PerspectiveCardFactory, PerspectiveCardCreator);
      pluginManager.registerGameObject('rexPerspectiveCarousel', PerspectiveCarouselFactory, PerspectiveCarouselCreator);
      pluginManager.registerGameObject('rexPerspectiveImageCarousel', PerspectiveImageCarouselFactory, PerspectiveImageCarouselCreator);
      return _this;
    }
    _createClass(PerspectiveImagePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "addContainerPerspective",
      value: function addContainerPerspective(parentContainer, config) {
        return new ContainerPerspective(parentContainer, config);
      }
    }]);
    return PerspectiveImagePlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.GameObjects.PerspectiveImage', Image);
  SetValue(window, 'RexPlugins.GameObjects.PerspectiveRenderTexture', RenderTexture$1);
  SetValue(window, 'RexPlugins.GameObjects.PerspectiveSprite', Sprite);
  SetValue(window, 'RexPlugins.GameObjects.PerspectiveCard', Card);
  SetValue(window, 'RexPlugins.GameObjects.PerspectiveCarousel', Carousel);
  SetValue(window, 'RexPlugins.GameObjects.PerspectiveImageCarousel', ImageCarousel);
  SetValue(window, 'RexPlugins.GameObjects.ContainerPerspective', ContainerPerspective);

  return PerspectiveImagePlugin;

}));
