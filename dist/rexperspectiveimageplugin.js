(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexperspectiveimageplugin = factory());
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

  function _defineProperty(obj, key, value) {
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
      throw new Error('failed to set property');
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

  var Mesh = Phaser.GameObjects.Mesh;
  var IsPlainObject$6 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$d = Phaser.Utils.Objects.GetValue;
  var GenerateGridVerts = Phaser.Geom.Mesh.GenerateGridVerts;
  var RadToDeg$4 = Phaser.Math.RadToDeg;
  var DegToRad$5 = Phaser.Math.DegToRad;
  var FOV = 45;
  var PanZ = 1 + 1 / Math.sin(DegToRad$5(FOV));

  var Image = /*#__PURE__*/function (_Mesh) {
    _inherits(Image, _Mesh);

    var _super = _createSuper(Image);

    function Image(scene, x, y, key, frame, config) {
      var _this;

      _classCallCheck(this, Image);

      if (IsPlainObject$6(x)) {
        config = x;
        x = GetValue$d(config, 'x', 0);
        y = GetValue$d(config, 'y', 0);
        key = GetValue$d(config, 'key', null);
        frame = GetValue$d(config, 'frame', null);
      }

      _this = _super.call(this, scene, x, y, key, frame);
      _this.type = 'rexPerspectiveImage';

      _this.setSizeToFrame();

      _this.resetPerspective();

      _this.panZ(PanZ);

      _this.hideCCW = GetValue$d(config, 'hideCCW', true);
      var gridWidth = GetValue$d(config, 'gridWidth', 32);
      var gridHeight = GetValue$d(config, 'gridHeight', gridWidth);

      _this.resetVerts(gridWidth, gridHeight);

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
      value: function resetVerts(gridWidth, gridHeight) {
        if (gridWidth !== undefined) {
          this.gridWidth = gridWidth;
        }

        if (gridHeight !== undefined) {
          this.gridHeight = gridHeight;
        } // Clear faces and vertices


        this.clear();
        this.dirtyCache[9] = -1;

        if (this.width === 0 || this.height === 0) {
          return this;
        } // Generate faces and vertices


        var frameWidth = this.frame.cutWidth,
            frameHeight = this.frame.cutHeight;
        GenerateGridVerts({
          mesh: this,
          texture: this.texture.key,
          frame: this.frame.name,
          width: frameWidth / this.height,
          height: frameHeight / this.height,
          widthSegments: Math.ceil(frameWidth / this.gridWidth),
          heightSegments: Math.ceil(frameHeight / this.gridHeight),
          flipY: this.frame.source.isRenderTexture
        });
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
        this.rotationX = DegToRad$5(value);
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
        this.rotationY = DegToRad$5(value);
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
        this.rotationZ = DegToRad$5(value);
      }
    }, {
      key: "transformVerts",
      value: function transformVerts(x, y, z, rotateX, rotateY, rotateZ) {
        TransformVerts(this, x, y, z, rotateX, rotateY, rotateZ);
        return this;
      }
    }, {
      key: "forceUpdate",
      value: function forceUpdate() {
        this.dirtyCache[10] = 1;
        return this;
      }
    }, {
      key: "tint",
      get: function get() {
        if (this.vertices.length === 0) {
          return 0xffffff;
        } else {
          return this.vertices[0].color;
        }
      },
      set: function set(value) {
        var vertices = this.vertices;

        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
          vertices[i].color = value;
        }
      }
    }, {
      key: "setTint",
      value: function setTint(color) {
        this.tint = color;
        return this;
      }
    }]);

    return Image;
  }(Mesh);

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

  var RT = Phaser.GameObjects.RenderTexture;
  var IsPlainObject$5 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$c = Phaser.Utils.Objects.GetValue;

  var RenderTexture = /*#__PURE__*/function (_Image) {
    _inherits(RenderTexture, _Image);

    var _super = _createSuper(RenderTexture);

    function RenderTexture(scene, x, y, width, height, config) {
      var _this;

      _classCallCheck(this, RenderTexture);

      if (IsPlainObject$5(x)) {
        config = x;
        x = GetValue$c(config, 'x', 0);
        y = GetValue$c(config, 'y', 0);
        width = GetValue$c(config, 'width', 32);
        height = GetValue$c(config, 'height', 32);
      } // render-texture -> perspective-image


      var rt = new RT(scene, x, y, width, height).setOrigin(0.5);
      _this = _super.call(this, scene, x, y, rt.texture.key, null, config);
      _this.type = 'rexPerspectiveRenderTexture';
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

  function PerspectiveRenderTextureFactory (x, y, width, height, config) {
    var gameObject = new RenderTexture(this.scene, x, y, width, height, config);
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
    var gameObject = new RenderTexture(this.scene, x, y, width, height, config);
    BuildGameObject$4(this.scene, gameObject, config);
    return gameObject;
  }

  var AnimationState = Phaser.Animations.AnimationState;
  var IsPlainObject$4 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$b = Phaser.Utils.Objects.GetValue;

  var Sprite = /*#__PURE__*/function (_PerspectiveImage) {
    _inherits(Sprite, _PerspectiveImage);

    var _super = _createSuper(Sprite);

    function Sprite(scene, x, y, key, frame, config) {
      var _this;

      _classCallCheck(this, Sprite);

      if (IsPlainObject$4(x)) {
        config = x;
        x = GetValue$b(config, 'x', 0);
        y = GetValue$b(config, 'y', 0);
        key = GetValue$b(config, 'key', null);
        frame = GetValue$b(config, 'frame', null);
      }

      _this = _super.call(this, scene, x, y, key, frame, config);
      _this.type = 'rexPerspectiveSprite';
      _this.anims = new AnimationState(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Sprite, [{
      key: "destroy",
      value: function destroy(fromScene) {
        this.anims.destroy();
        this.anims = undefined;

        _get(_getPrototypeOf(Sprite.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "preUpdate",
      value: function preUpdate(time, delta) {
        var prevFrame = this.anims.currentFrame;
        this.anims.update(time, delta);

        if (this.anims.currentFrame !== prevFrame) {
          this.syncSize();
        }

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

  var Zone = Phaser.GameObjects.Zone;
  var AddItem = Phaser.Utils.Array.Add;
  var RemoveItem = Phaser.Utils.Array.Remove;

  var Base = /*#__PURE__*/function (_Zone) {
    _inherits(Base, _Zone);

    var _super = _createSuper(Base);

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

      _this = _super.call(this, scene, x, y, width, height);
      _this.children = [];
      return _this;
    }

    _createClass(Base, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        if (fromScene) {
          // Stop scene
          var child;

          for (var i = this.children.length - 1; i >= 0; i--) {
            child = this.children[i];

            if (!child.parentContainer && // Not in container
            !child.displayList // Not in scene, neither in layer
            ) {
              // Destroy child which is not in scene, container, or layer manually
              child.destroy(fromScene);
            }
          }
        } // Destroy/remove children


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
        AddItem(this.children, gameObjects, 0, // Callback of item added
        function (gameObject) {
          gameObject.once('destroy', parent.onChildDestroy, parent);
        }, this);
        return this;
      }
    }, {
      key: "remove",
      value: function remove(gameObjects, destroyChild) {
        var parent = this;
        RemoveItem(this.children, gameObjects, // Callback of item removed
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

  var GetParent = function GetParent(gameObject) {
    var parent;

    if (gameObject.hasOwnProperty('rexContainer')) {
      parent = gameObject.rexContainer.parent;
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

  var DegToRad$4 = Phaser.Math.DegToRad;
  var RadToDeg$3 = Phaser.Math.RadToDeg;

  var GetLocalState = function GetLocalState(gameObject) {
    if (!gameObject.hasOwnProperty('rexContainer')) {
      var rexContainer = {
        parent: null,
        self: null,
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 0,
        scaleY: 0,
        alpha: 0,
        visible: true,
        active: true
      };
      Object.defineProperty(rexContainer, 'angle', {
        get: function get() {
          return RadToDeg$3(this.rotation);
        },
        set: function set(value) {
          this.rotation = DegToRad$4(value);
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
    getParent: function getParent(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }

      return GetParent(gameObject);
    },
    getTopmostParent: function getTopmostParent(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }

      return GetTopmostParent(gameObject);
    }
  };

  var BaseAdd = Base.prototype.add;

  var Add = function Add(gameObject) {
    this.setParent(gameObject);
    this.resetChildState(gameObject) // Reset local state of child
    .updateChildVisible(gameObject) // Apply parent's visible to child
    .updateChildActive(gameObject) // Apply parent's active to child
    .updateChildScrollFactor(gameObject) // Apply parent's scroll factor to child
    .updateChildMask(gameObject); // Apply parent's mask to child

    BaseAdd.call(this, gameObject);
    return this;
  };

  var AddLocal = function AddLocal(gameObject) {
    this.setParent(gameObject); // Set local state from child directly

    var state = GetLocalState(gameObject); // Position

    state.x = gameObject.x;
    state.y = gameObject.y;
    state.rotation = gameObject.rotation;
    state.scaleX = gameObject.scaleX;
    state.scaleY = gameObject.scaleY; // Alpha

    state.alpha = gameObject.alpha; // Visible

    state.visible = gameObject.visible; // Active

    state.active = gameObject.active;
    this.updateChildPosition(gameObject).updateChildAlpha(gameObject).updateChildVisible(gameObject) // Apply parent's visible to child
    .updateChildActive(gameObject) // Apply parent's active to child
    .updateChildScrollFactor(gameObject) // Apply parent's scroll factor to child
    .updateChildMask(gameObject); // Apply parent's mask to child

    BaseAdd.call(this, gameObject);
    return this;
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
    pin: function pin(gameObject) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject);
      } else {
        Add.call(this, gameObject);
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
    remove: function remove(gameObject, destroyChild) {
      if (GetParent(gameObject) !== this) {
        return this;
      }

      this.setParent(gameObject, null);
      BaseRemove.call(this, gameObject, destroyChild);
      return this;
    },
    clear: function clear(destroyChild) {
      for (var i = 0, cnt = this.children.length; i < cnt; i++) {
        this.setParent(this.children[i], null);
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
      point.y -= this.y; // Rotate

      RotateAround$1(point, 0, 0, -this.rotation); // Scale

      point.x /= this.scaleX;
      point.y /= this.scaleY;
      return point;
    },
    localToWorld: function localToWorld(point) {
      // Scale
      point.x *= this.scaleX;
      point.y *= this.scaleY; // Rotate

      RotateAround$1(point, 0, 0, this.rotation); // Transform

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
      child.x = state.x;
      child.y = state.y;
      parent.localToWorld(child);
      child.scaleX = state.scaleX * parent.scaleX;
      child.scaleY = state.scaleY * parent.scaleY;
      child.rotation = state.rotation + parent.rotation;

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

  var Rotation = {
    updateChildRotation: function updateChildRotation(child) {
      var localState = GetLocalState(child);
      var parent = localState.parent;
      child.rotation = parent.rotation + localState.rotation;
      return this;
    },
    syncRotation: function syncRotation() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildRotation, this);
      }

      return this;
    },
    resetChildRotationState: function resetChildRotationState(child) {
      var localState = GetLocalState(child);
      var parent = localState.parent;
      localState.rotation = child.rotation - parent.rotation;
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
      var localState = GetLocalState(child);
      localState.rotation = rotation;
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
      var localState = GetLocalState(child);
      var parent = localState.parent;
      child.scaleX = parent.scaleX * localState.scaleX;
      child.scaleY = parent.scaleY * localState.scaleY;
      return this;
    },
    syncScale: function syncScale() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildScale, this);
      }

      return this;
    },
    resetChildScaleState: function resetChildScaleState(child) {
      var localState = GetLocalState(child);
      var parent = localState.parent;
      localState.scaleX = GetScale(child.scaleX, parent.scaleX);
      localState.scaleY = GetScale(child.scaleY, parent.scaleY);
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

      var localState = GetLocalState(child);
      localState.scaleX = scaleX;
      localState.scaleY = scaleY;
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
      child.visible = parent.visible && localState.visible && maskVisible;
      return this;
    },
    syncVisible: function syncVisible() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildVisible, this);
      }

      return this;
    },
    resetChildVisibleState: function resetChildVisibleState(child) {
      var localState = GetLocalState(child); // Delete maskVisible property

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
      var localState = GetLocalState(child);
      var parent = localState.parent;
      child.alpha = parent.alpha * localState.alpha;
      return this;
    },
    syncAlpha: function syncAlpha() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildAlpha, this);
      }

      return this;
    },
    resetChildAlphaState: function resetChildAlphaState(child) {
      var localState = GetLocalState(child);
      var parent = localState.parent;
      localState.alpha = GetScale(child.alpha, parent.alpha);
      return this;
    },
    setChildAlpha: function setChildAlpha(child, alpha) {
      child.alpha = alpha;
      this.resetChildAlphaState(child);
      return this;
    },
    setChildLocalAlpha: function setChildLocalAlpha(child, alpha) {
      var localState = GetLocalState(child);
      localState.alpha = alpha;
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
      var localState = GetLocalState(child);
      var parent = localState.parent;
      child.setScrollFactor(parent.scrollFactorX, parent.scrollFactorY);
      return this;
    },
    syncScrollFactor: function syncScrollFactor() {
      if (this.syncChildrenEnable) {
        this.children.forEach(this.updateChildScrollFactor, this);
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

      if (destroyMask && this.mask) {
        this.mask.destroy();
      }

      this.mask = null;
      return this;
    }
  };

  var SortGameObjectsByDepth = function SortGameObjectsByDepth(gameObjects, descending) {
    if (gameObjects.length === 0) {
      return gameObjects;
    }

    if (descending === undefined) {
      descending = false;
    }

    var scene = gameObjects[0].scene;
    var displayList = scene.sys.displayList;
    displayList.depthSort();

    if (descending) {
      gameObjects.sort(function (childA, childB) {
        return displayList.getIndex(childB) - displayList.getIndex(childA);
      });
    } else {
      gameObjects.sort(function (childA, childB) {
        return displayList.getIndex(childA) - displayList.getIndex(childB);
      });
    }

    return gameObjects;
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
    moveDepthBelow: function moveDepthBelow(gameObject) {
      var displayList = gameObject.scene.children;
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children);

      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];

        if (displayList.exists(child)) {
          displayList.moveBelow(gameObject, child);
          break;
        }
      }

      return this;
    },
    moveDepthAbove: function moveDepthAbove(gameObject) {
      var displayList = gameObject.scene.children;
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
        } // Copy children

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
        } // Don't add invisible child


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

  var IsArray = function IsArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var Tween = {
    tweenChild: function tweenChild(tweenConfig) {
      var targets = tweenConfig.targets;

      if (!IsArray(targets)) {
        targets = [targets];
      }

      var scene,
          localTargets = [];
      var child;

      for (var i = 0, cnt = targets.length; i < cnt; i++) {
        child = targets[i];

        if (!child.hasOwnProperty('rexContainer')) {
          continue;
        }

        scene = child.scene;
        localTargets.push(child.rexContainer);
      }

      if (!scene) {
        return;
      }

      tweenConfig.targets = localTargets;
      var tween = scene.tweens.add(tweenConfig);

      var tweenUpdateListener = function tweenUpdateListener(tween, key, target) {
        if (!target.parent) {
          // target object was removed, so remove this tween too to avoid crashing
          scene.tweens.remove(tween);
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
        }
      };

      tween.on('update', tweenUpdateListener);
      return tween;
    },
    tween: function tween(tweenConfig) {
      var scene = this.scene;

      if (!tweenConfig.targets) {
        tweenConfig.targets = this;
      }

      return scene.tweens.add(tweenConfig);
    }
  };

  var AddToLayer = function AddToLayer(layer) {
    var gameObjects = this.getAllChildren([this]);
    SortGameObjectsByDepth(gameObjects);
    layer.add(gameObjects);
    return this;
  };

  var AddToContainer = {
    addToLayer: AddToLayer,
    addToContainer: AddToLayer
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
    changeOrigin: ChangeOrigin
  };
  Object.assign(methods, Parent, AddChild, RemoveChild, ChildState, Transform, Position, Rotation, Scale, Visible, Alpha, Active, ScrollFactor, Mask, Depth, Children, Tween, AddToContainer);

  var ContainerLite = /*#__PURE__*/function (_Base) {
    _inherits(ContainerLite, _Base);

    var _super = _createSuper(ContainerLite);

    function ContainerLite(scene, x, y, width, height, children) {
      var _this;

      _classCallCheck(this, ContainerLite);

      _this = _super.call(this, scene, x, y, width, height);
      _this.type = 'rexContainerLite';
      _this.isRexContainerLite = true;
      _this.syncChildrenEnable = true;
      _this._active = true;
      _this._mask = null;
      _this._scrollFactorX = 1;
      _this._scrollFactorY = 1;

      if (children) {
        _this.add(children);
      }

      return _this;
    }

    _createClass(ContainerLite, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        this.syncChildrenEnable = false; // Don't sync properties changing anymore

        _get(_getPrototypeOf(ContainerLite.prototype), "destroy", this).call(this, fromScene);
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
      } // Override

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
      } // Override

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
      } // Override

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
      } // Override

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
      } // Override

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
      } // Override

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
      } // Override

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
      } // Override

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
      } // Compatiable with container plugin

    }, {
      key: "list",
      get: function get() {
        return this.children;
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

    var _super = _createSuper(FaceContainer);

    function FaceContainer(scene, x, y, width, height, faces) {
      var _this;

      _classCallCheck(this, FaceContainer);

      _this = _super.call(this, scene, x, y, width, height);
      _this.faces = faces; // Face Dictionary, or array

      ForEachFace(faces, function (face) {
        face.setPosition(x, y);
        this.add(face);
      }, _assertThisInitialized(_this), true);
      return _this;
    } // Override


    _createClass(FaceContainer, [{
      key: "rotationX",
      get: function get() {
        return 0;
      } // Override
      ,
      set: function set(value) {// rad
      }
    }, {
      key: "angleX",
      get: function get() {
        return RadToDeg$2(this.rotationX);
      },
      set: function set(value) {
        this.rotationX = DegToRad$3(value);
      } // Override

    }, {
      key: "rotationY",
      get: function get() {
        return 0;
      } // Override
      ,
      set: function set(value) {// rad
      }
    }, {
      key: "angleY",
      get: function get() {
        return RadToDeg$2(this.rotationY);
      },
      set: function set(value) {
        this.rotationY = DegToRad$3(value);
      } // Override

    }, {
      key: "rotationZ",
      get: function get() {
        return 0;
      } // Override
      ,
      set: function set(value) {// rad
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
    rendertexture: RenderTexture
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
    }
  };

  var GetValue$a = Phaser.Utils.Objects.GetValue;

  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);

      this.parent = parent; // gameObject or scene

      this.scene = GetSceneObject(parent);
      this.isShutdown = false; // Event emitter, default is private event emitter

      this.setEventEmitter(GetValue$a(config, 'eventEmitter', true)); // Register callback of parent destroy event, also see `shutdown` method

      if (this.parent && this.parent === this.scene) {
        // parent is a scene
        this.scene.events.once('shutdown', this.onSceneDestroy, this);
      } else if (this.parent && this.parent.once) {
        // bob object does not have event emitter
        this.parent.once('destroy', this.onParentDestroy, this);
      }
    }

    _createClass(ComponentBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        } // parent might not be shutdown yet


        if (this.parent && this.parent === this.scene) {
          // parent is a scene
          this.scene.events.off('shutdown', this.onSceneDestroy, this);
        } else if (this.parent && this.parent.once) {
          // bob object does not have event emitter
          this.parent.off('destroy', this.onParentDestroy, this);
        }

        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        this.isShutdown = true;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onSceneDestroy",
      value: function onSceneDestroy() {
        this.destroy(true);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }]);

    return ComponentBase;
  }();
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  var GetValue$9 = Phaser.Utils.Objects.GetValue;

  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);

    var _super = _createSuper(TickTask);

    function TickTask(parent, config) {
      var _this;

      _classCallCheck(this, TickTask);

      _this = _super.call(this, parent, config);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;

      _this.setTickingMode(GetValue$9(config, 'tickingMode', 1)); // boot() later


      return _this;
    } // override


    _createClass(TickTask, [{
      key: "boot",
      value: function boot() {
        if (this.tickingMode === 2 && !this.tickingState) {
          this.startTicking();
        }
      } // override

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
      } // override

    }, {
      key: "startTicking",
      value: function startTicking() {
        this.tickingState = true;
      } // override

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

  var SceneUpdateTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(SceneUpdateTickTask, _TickTask);

    var _super = _createSuper(SceneUpdateTickTask);

    function SceneUpdateTickTask() {
      _classCallCheck(this, SceneUpdateTickTask);

      return _super.apply(this, arguments);
    }

    _createClass(SceneUpdateTickTask, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "startTicking", this).call(this);

        this.scene.events.on('update', this.update, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "stopTicking", this).call(this);

        if (this.scene) {
          // Scene might be destoryed
          this.scene.events.off('update', this.update, this);
        }
      } // update(time, delta) {
      //     
      // }

    }]);

    return SceneUpdateTickTask;
  }(TickTask);

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;

  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);

      this.resetFromJSON(config);
    }

    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$8(o, 'state', IDLE);
        this.timeScale = GetValue$8(o, 'timeScale', 1);
        this.delay = GetValue$8(o, 'delay', 0);
        this.repeat = GetValue$8(o, 'repeat', 0);
        this.repeatCounter = GetValue$8(o, 'repeatCounter', 0);
        this.duration = GetValue$8(o, 'duration', 0);
        this.nowTime = GetValue$8(o, 'nowTime', 0);
        this.justRestart = GetValue$8(o, 'justRestart', false);
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
        this.state = this.nowTime >= 0 ? COUNTDOWN : DELAY;
        this.justRestart = false;

        if (this.nowTime >= this.duration) {
          if (this.repeat === -1 || this.repeatCounter < this.repeat) {
            this.repeatCounter++;
            this.justRestart = true;
            this.nowTime -= this.duration;
          } else {
            this.nowTime = this.duration;
            this.state = DONE;
          }
        }
      }
    }, {
      key: "t",
      get: function get() {
        var t;

        switch (this.state) {
          case IDLE:
          case DELAY:
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
  var DONE = -1;

  var TimerTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(TimerTickTask, _TickTask);

    var _super = _createSuper(TimerTickTask);

    function TimerTickTask(parent, config) {
      var _this;

      _classCallCheck(this, TimerTickTask);

      _this = _super.call(this, parent, config);
      _this.timer = new Timer(); // boot() later 

      return _this;
    } // override


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

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

  var EaseValueTaskBase = /*#__PURE__*/function (_TickTask) {
    _inherits(EaseValueTaskBase, _TickTask);

    var _super = _createSuper(EaseValueTaskBase);

    function EaseValueTaskBase() {
      _classCallCheck(this, EaseValueTaskBase);

      return _super.apply(this, arguments);
    }

    _createClass(EaseValueTaskBase, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue$7(o, 'timer'));
        this.setEnable(GetValue$7(o, 'enable', true));
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        this.setEase(GetValue$7(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$7(o, 'repeat', 0));
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
      key: "setDelay",
      value: function setDelay(time) {
        this.delay = time;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(time) {
        this.duration = time;
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
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        return this;
      } // Override

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
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || !this.enable) {
          return this;
        }

        var gameObject = this.parent;

        if (!gameObject.active) {
          return this;
        }

        var timer = this.timer;
        timer.update(time, delta); // isDelay, isCountDown, isDone

        if (!timer.isDelay) {
          this.updateGameObject(gameObject, timer);
        }

        this.emit('update', gameObject, this);

        if (timer.isDone) {
          this.complete();
        }

        return this;
      } // Override

    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {}
    }]);

    return EaseValueTaskBase;
  }(TimerTickTask);

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var Linear$2 = Phaser.Math.Linear;

  var Flip = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Flip, _EaseValueTaskBase);

    var _super = _createSuper(Flip);

    function Flip(gameObject, config) {
      var _this;

      _classCallCheck(this, Flip);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(Flip, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Flip.prototype), "resetFromJSON", this).call(this, o);

        this.setEase(GetValue$6(o, 'ease', 'Cubic'));
        this.setFrontToBackDirection(GetValue$6(o, 'frontToBack', 0));
        this.setBackToFrontDirection(GetValue$6(o, 'backToFront', 1));
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
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }

        this.timer.setDelay(this.delay).setDuration(this.duration);
        var gameObject = this.parent;

        if (gameObject.face === 0) {
          // isFrontToBack
          this.startAngle = 0;
          this.endAngle = this.endAngleFB;
        } else {
          this.startAngle = this.endAngleBF;
          this.endAngle = 0;
        }

        _get(_getPrototypeOf(Flip.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "flip",
      value: function flip(duration) {
        if (this.isRunning) {
          return this;
        }

        if (duration !== undefined) {
          this.setDuration(duration);
        }

        this.start(); // Set face index

        var faceIndex = this.parent.currentFaceIndex;
        this.parent.currentFaceIndex = faceIndex === 0 ? 1 : 0;
        return this;
      }
    }, {
      key: "flipRight",
      value: function flipRight(duration) {
        if (this.parent.currentFaceIndex === 0) {
          // Front to back
          this.setFrontToBackDirection(0);
        } else {
          // Back to front
          this.setBackToFrontDirection(0);
        }

        this.flip(duration);
        return this;
      }
    }, {
      key: "flipLeft",
      value: function flipLeft(duration) {
        if (this.parent.currentFaceIndex === 0) {
          // Front to back
          this.setFrontToBackDirection(1);
        } else {
          // Back to front
          this.setBackToFrontDirection(1);
        }

        this.flip(duration);
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
  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var FaceNames = ['back', 'front'];

  var Card = /*#__PURE__*/function (_FaceContainer) {
    _inherits(Card, _FaceContainer);

    var _super = _createSuper(Card);

    function Card(scene, x, y, config) {
      var _this;

      _classCallCheck(this, Card);

      if (IsPlainObject$2(x)) {
        config = x;
        x = GetValue$5(config, 'x', 0);
        y = GetValue$5(config, 'y', 0);
      }

      var faces = CreateFaces(scene, config, FaceNames);
      var backFace = faces.back;
      var frontFace = faces.front;
      var width = GetValue$5(config, 'width');
      var height = GetValue$5(config, 'height');

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

      _this = _super.call(this, scene, x, y, width, height, faces);
      _this.type = 'rexPerspectiveCard';
      _this.frontFaceRotationX = undefined;
      _this.frontFaceRotationY = undefined;
      _this.frontFaceRotationZ = undefined;
      ForEachFace(faces, function (face, name) {
        this["".concat(name, "Face")] = face;
      }, _assertThisInitialized(_this));
      var flipConfig = GetValue$5(config, 'flip', undefined);

      if (flipConfig !== false) {
        _this.flip = new Flip(_assertThisInitialized(_this), flipConfig);
      }

      _this.setOrientation(GetValue$5(config, 'orientation', 0));

      LayoutFaces$1(_assertThisInitialized(_this), faces);

      _this.setFace(GetValue$5(config, 'face', 0));

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

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var RadToDeg$1 = Phaser.Math.RadToDeg;
  var DegToRad$1 = Phaser.Math.DegToRad;
  var WrapDegrees$1 = Phaser.Math.Angle.WrapDegrees;
  var ShortestBetween = Phaser.Math.Angle.ShortestBetween;
  var Wrap$2 = Phaser.Math.Wrap;
  var Linear$1 = Phaser.Math.Linear;

  var Roll$1 = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Roll, _EaseValueTaskBase);

    var _super = _createSuper(Roll);

    function Roll(gameObject, config) {
      var _this;

      _classCallCheck(this, Roll);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(Roll, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Roll.prototype), "resetFromJSON", this).call(this, o);

        this.setEase(GetValue$4(o, 'ease', 'Cubic'));
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
  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var DegToRad = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
  var WrapDegrees = Phaser.Math.Angle.WrapDegrees;
  var Linear = Phaser.Math.Linear;
  var Wrap$1 = Phaser.Math.Wrap;

  var Carousel = /*#__PURE__*/function (_FaceContainer) {
    _inherits(Carousel, _FaceContainer);

    var _super = _createSuper(Carousel);

    function Carousel(scene, x, y, config) {
      var _this;

      _classCallCheck(this, Carousel);

      if (IsPlainObject$1(x)) {
        config = x;
        x = GetValue$3(config, 'x', 0);
        y = GetValue$3(config, 'y', 0);
      }

      var faceConfig = GetValue$3(config, 'faces', undefined);

      if (!faceConfig) {
        faceConfig = [];
      }

      var faces = CreateFaces(scene, faceConfig);
      var firstFace = GetFirstFace(faces);
      var width = GetValue$3(config, 'width');
      var height = GetValue$3(config, 'height');

      if (width === undefined) {
        width = firstFace ? firstFace.width : 0;
      }

      if (height === undefined) {
        height = firstFace ? firstFace.height : 0;
      }

      _this = _super.call(this, scene, x, y, width, height, faces);
      _this.type = 'rexPerspectiveCarousel';
      _this.face0RotationY = undefined;
      var faceCount = faces.length; // Face angle

      _this.faceAngle = faceCount > 0 ? DegToRad(360 / faces.length) : 0; // Face width, face radius

      var faceWidth = GetValue$3(config, 'faceWidth', undefined);

      if (faceWidth === undefined) {
        var faceSpace = GetValue$3(config, 'faceSpace', 0);
        faceWidth = firstFace ? firstFace.width + faceSpace : 0;
      }

      _this.faceWidth = faceWidth;

      if (faceCount > 2) {
        _this.faceRadius = faceWidth / 2 / Math.tan(_this.faceAngle / 2);
      } else {
        _this.faceRadius = faceWidth / 2;
      }

      LayoutFaces(_assertThisInitialized(_this), faces);
      var rollConfig = GetValue$3(config, 'roll', undefined);

      if (rollConfig !== false) {
        var RollClass = GetValue$3(config, 'rollClass', Roll$1);
        _this.roll = new RollClass(_assertThisInitialized(_this), rollConfig);
      } // Left-To-Right, or Right-To-Left


      _this.rtl = GetValue$3(config, 'rtl', false); // z-index

      _this.zStart = GetValue$3(config, 'z', 1);
      _this.zEnd = GetValue$3(config, 'zEnd', _this.zStart - 1);

      _this.setFace(GetValue$3(config, 'face', 0));

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
          face.rotationY = rotationY; // Set depth

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

    var _super = _createSuper(Roll);

    function Roll() {
      _classCallCheck(this, Roll);

      return _super.apply(this, arguments);
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
      var frame = scene.textures.getFrame(textureKey.key, textureKey.frame);
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
  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var Wrap = Phaser.Math.Wrap;

  var ImageCarousel = /*#__PURE__*/function (_Carousel) {
    _inherits(ImageCarousel, _Carousel);

    var _super = _createSuper(ImageCarousel);

    function ImageCarousel(scene, x, y, config) {
      var _this;

      _classCallCheck(this, ImageCarousel);

      if (IsPlainObject(x)) {
        config = x;
        x = GetValue$2(config, 'x', 0);
        y = GetValue$2(config, 'y', 0);
      }

      if (config === undefined) {
        config = {};
      }

      var faceWidth, faceHeight;
      var images = GetValue$2(config, 'images');
      var faceSize = GetFaceSize(scene, images);

      if (faceSize) {
        faceWidth = faceSize.width;
        faceHeight = faceSize.height;
      } else {
        faceWidth = GetValue$2(config, 'width');
        faceHeight = GetValue$2(config, 'height');
      } // Create 4 render-texture faces


      var faceCount = GetValue$2(config, 'faceCount', 4);
      var face,
          faces = [];

      for (var i = 0; i < faceCount; i++) {
        face = new RenderTexture(scene, 0, 0, faceWidth, faceHeight, config);
        scene.add.existing(face);
        faces.push(face);
      }

      config.faces = faces;
      config.rollClass = Roll;
      _this = _super.call(this, scene, x, y, config);
      _this.type = 'rexPerspectiveImageCarousel';
      _this.images = images;
      _this.indexOffsetMap = GetIndexOffsetMap(faceCount);
      _this.repeat = GetValue$2(config, 'repeat', true);

      _this.setImageIndex(GetValue$2(config, 'index', 0)).updateTexture();

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

  var Rectangle = Phaser.Geom.Rectangle;
  var Union = Phaser.Geom.Rectangle.Union;

  var GetBoundsOfGameObjects = function GetBoundsOfGameObjects(gameObjects, out) {
    if (out === undefined) {
      out = new Rectangle();
    } else if (out === true) {
      if (globBounds === undefined) {
        globBounds = new Rectangle();
      }

      out = globBounds;
    }

    var gameObject;
    var firstClone = true;

    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      gameObject = gameObjects[i];

      if (!gameObject.getBounds) {
        continue;
      }

      GOBounds = gameObject.getBounds(GOBounds);

      if (firstClone) {
        out.setTo(GOBounds.x, GOBounds.y, GOBounds.width, GOBounds.height);
        firstClone = false;
      } else {
        Union(GOBounds, out, out);
      }
    }

    return out;
  };

  var GOBounds, globBounds;

  var Clear = function Clear(obj) {
    if (Array.isArray(obj)) {
      obj.length = 0;
    } else {
      for (var key in obj) {
        delete obj[key];
      }
    }
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

  var GetValue$1 = Phaser.Utils.Objects.GetValue;

  var Snapshot = function Snapshot(config) {
    var gameObjects = config.gameObjects;
    var renderTexture = config.renderTexture;

    if (gameObjects.length === 0) {
      if (renderTexture) {
        renderTexture.setSize(1, 1).clear();
      }

      return renderTexture;
    }

    var x = GetValue$1(config, 'x', undefined);
    var y = GetValue$1(config, 'y', undefined);
    var width = GetValue$1(config, 'width', undefined);
    var height = GetValue$1(config, 'height', undefined);
    var originX = GetValue$1(config, 'originX', 0);
    var originY = GetValue$1(config, 'originY', 0);
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
    } // Configurate render texture


    if (!renderTexture) {
      var scene = gameObjects[0].scene;
      renderTexture = scene.add.renderTexture(x, y, width, height);
    } else {
      renderTexture.setPosition(x, y);

      if (renderTexture.width !== width || renderTexture.height !== height) {
        renderTexture.setSize(width, height);
      }
    }

    renderTexture.setOrigin(originX, originY);
    renderTexture.camera.setScroll(scrollX, scrollY); // Draw gameObjects

    gameObjects = SortGameObjectsByDepth(Clone(gameObjects));
    renderTexture.draw(gameObjects);
    return renderTexture;
  };

  var ContainerAdd = ContainerLite.prototype.add;
  var GetValue = Phaser.Utils.Objects.GetValue;

  var ContainerPerspective = /*#__PURE__*/function (_RenderTexture) {
    _inherits(ContainerPerspective, _RenderTexture);

    var _super = _createSuper(ContainerPerspective);

    function ContainerPerspective(parentContainer, config) {
      var _this;

      _classCallCheck(this, ContainerPerspective);

      var scene = parentContainer.scene;
      _this = _super.call(this, scene, parentContainer.x, parentContainer.y, 1, 1, config);
      scene.add.existing(_assertThisInitialized(_this));

      _this.setVisible(false);

      ContainerAdd.call(parentContainer, _assertThisInitialized(_this));
      _this.visibleSibling = [];
      _this.perspectiveState = false;
      _this.useParentBounds = GetValue(config, 'useParentBounds', false);

      _this.boot();

      return _this;
    }

    _createClass(ContainerPerspective, [{
      key: "boot",
      value: function boot() {
        this.rexContainer.parent.once('destroy', this.onParentDestroy, this);
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        if (!this.scene) {
          return;
        }

        this.exit();
        this.rexContainer.parent.off('destroy', this.onParentDestroy, this);

        _get(_getPrototypeOf(ContainerPerspective.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }, {
      key: "enter",
      value: function enter() {
        this.exit();
        var parentContainer = this.rexContainer.parent; // Get and paste all visible children, which dose not include this render texture

        Snapshot({
          gameObjects: parentContainer.getAllVisibleChildren(),
          renderTexture: this.rt,
          x: this.x,
          y: this.y,
          width: this.useParentBounds ? parentContainer.displayWidth : undefined,
          height: this.useParentBounds ? parentContainer.displayHeighth : undefined,
          originX: this.useParentBounds ? parentContainer.originX : undefined,
          originY: this.useParentBounds ? parentContainer.originY : undefined
        });
        this.syncSize(); // Set this renderTexture to be visible

        parentContainer.setChildVisible(this, true); // Set visible sibling to be invisible

        parentContainer.children.forEach(function (child) {
          if (child !== this) {
            parentContainer.setChildVisible(child, false);
            this.visibleSibling.push(child);
          }
        }, this);
        this.perspectiveState = true;
        return this;
      }
    }, {
      key: "exit",
      value: function exit() {
        var parentContainer = this.rexContainer.parent; // Set all visible children to be visible back

        this.visibleSibling.forEach(function (child) {
          parentContainer.setChildVisible(child, true);
        }, this);
        this.visibleSibling.length = 0; // Set this renderTexture to be invisible        

        parentContainer.setChildVisible(this, false);
        this.perspectiveState = false;
        return this;
      }
    }]);

    return ContainerPerspective;
  }(RenderTexture);

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

  var PerspectiveImagePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(PerspectiveImagePlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(PerspectiveImagePlugin);

    function PerspectiveImagePlugin(pluginManager) {
      var _this;

      _classCallCheck(this, PerspectiveImagePlugin);

      _this = _super.call(this, pluginManager); //  Register our new Game Object type

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
  SetValue(window, 'RexPlugins.GameObjects.PerspectiveRenderTexture', RenderTexture);
  SetValue(window, 'RexPlugins.GameObjects.PerspectiveSprite', Sprite);
  SetValue(window, 'RexPlugins.GameObjects.PerspectiveCard', Card);
  SetValue(window, 'RexPlugins.GameObjects.PerspectiveCarousel', Carousel);
  SetValue(window, 'RexPlugins.GameObjects.PerspectiveImageCarousel', ImageCarousel);
  SetValue(window, 'RexPlugins.GameObjects.ContainerPerspective', ContainerPerspective);

  return PerspectiveImagePlugin;

})));
