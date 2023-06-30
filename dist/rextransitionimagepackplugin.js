(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextransitionimagepackplugin = factory());
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

  var Zone = Phaser.GameObjects.Zone;
  var AddItem = Phaser.Utils.Array.Add;
  var RemoveItem$1 = Phaser.Utils.Array.Remove;
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
        RemoveItem$1(this.children, gameObjects,
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

  var DegToRad$4 = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
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
        visible: true,
        active: true
      };
      Object.defineProperty(rexContainer, 'angle', {
        get: function get() {
          return RadToDeg(this.rotation);
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

  var GetValue$i = Phaser.Utils.Objects.GetValue;
  var BaseAdd = Base.prototype.add;
  var Add = function Add(gameObject, config) {
    this.setParent(gameObject);
    var state = GetLocalState(gameObject);
    SetupSyncFlags(state, config);
    this.resetChildState(gameObject) // Reset local state of child
    .updateChildVisible(gameObject) // Apply parent's visible to child
    .updateChildActive(gameObject) // Apply parent's active to child
    .updateChildScrollFactor(gameObject) // Apply parent's scroll factor to child
    .updateChildMask(gameObject); // Apply parent's mask to child

    BaseAdd.call(this, gameObject);
    this.addToParentContainer(gameObject);
    this.addToRenderLayer(gameObject);
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
    this.addToRenderLayer(gameObject);
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
    } else {
      state.syncPosition = GetValue$i(config, 'syncPosition', true);
      state.syncRotation = GetValue$i(config, 'syncRotation', true);
      state.syncScale = GetValue$i(config, 'syncScale', true);
      state.syncAlpha = GetValue$i(config, 'syncAlpha', true);
      state.syncScrollFactor = GetValue$i(config, 'syncScrollFactor', true);
    }
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

  var RotateAround$4 = Phaser.Math.RotateAround;
  var Transform = {
    worldToLocal: function worldToLocal(point) {
      // Transform
      point.x -= this.x;
      point.y -= this.y;
      // Rotate
      RotateAround$4(point, 0, 0, -this.rotation);
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
      RotateAround$4(point, 0, 0, this.rotation);
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

  var DegToRad$3 = Phaser.Math.DegToRad;
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
      state.rotation = DegToRad$3(angle);
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

  var Scale$1 = {
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
        child.setScrollFactor(parent.scrollFactorX, parent.scrollFactorY);
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

      // Clear current mask
      this._mask = null;
      // Clear children mask
      this.children.forEach(function (child) {
        child.clearMask(false);
      });
      if (destroyMask && this.mask) {
        this.mask.destroy();
      }
      return this;
    }
  };

  var SortGameObjectsByDepth = function SortGameObjectsByDepth(gameObjects, descending) {
    if (gameObjects.length <= 1) {
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
    bringToTop: function bringToTop() {
      var displayList = this.displayList;
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
    moveDepthBelow: function moveDepthBelow(gameObject) {
      var displayList = this.displayList;
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
    moveDepthAbove: function moveDepthAbove(gameObject) {
      var displayList = this.displayList;
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
    bringChildToTop: function bringChildToTop(gameObject) {
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children, true);
      var topChild = children[0];
      if (topChild === gameObject) {
        return this;
      }
      if (topChild.displayList !== gameObject.displayList) {
        return this;
      }
      topChild.displayList.moveAbove(gameObject, topChild);
      return this;
    },
    sendChildToBack: function sendChildToBack(gameObject) {
      var children = this.getAllChildren([this]);
      SortGameObjectsByDepth(children, false);
      var bottomChild = children[0];
      if (bottomChild === gameObject) {
        return this;
      }
      if (bottomChild.displayList !== gameObject.displayList) {
        return this;
      }
      bottomChild.displayList.moveBelow(gameObject, bottomChild);
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

  var P3Container = {
    addToContainer: function addToContainer(p3Container) {
      this._setParentContainerFlag = true;
      var gameObjects = this.getAllChildren([this]);
      SortGameObjectsByDepth(gameObjects);
      p3Container.add(gameObjects);
      this._setParentContainerFlag = false;
      return this;
    },
    addToLayer: function addToLayer(layer) {
      this.addToContainer(layer);
      return this;
    },
    removeFromContainer: function removeFromContainer() {
      if (!this.parentContainer) {
        return this;
      }

      // Will add gameObjects to scene
      var gameObjects = this.getAllChildren([this]).filter(function (gameObject) {
        return !!gameObject.scene;
      });
      if (gameObjects.length === 0) {
        return this;
      }
      this._setParentContainerFlag = true;
      if (gameObjects.length > 1) {
        SortGameObjectsByDepth(gameObjects);
        gameObjects.reverse();
      }
      this.parentContainer.remove(gameObjects);
      this._setParentContainerFlag = false;
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
      // Don't add to layer if gameObject is not in any displayList
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
    }
  };

  var Layer = {
    enableLayer: function enableLayer() {
      if (this.privateRenderLayer) {
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
      if (!this.privateRenderLayer) {
        this.enableLayer();
      }
      return this.privateRenderLayer;
    },
    getRenderLayer: function getRenderLayer() {
      // This containerLite has a layer
      if (this.privateRenderLayer) {
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
      layer.remove(gameObject);
      state.layer = null;
      return this;
    }
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

  var Rectangle$2 = Phaser.Geom.Rectangle;
  var Vector2 = Phaser.Math.Vector2;
  var RotateAround$3 = Phaser.Math.RotateAround;
  var GetBounds = function GetBounds(gameObject, output) {
    if (output === undefined) {
      output = new Rectangle$2();
    } else if (output === true) {
      if (GlobRect$1 === undefined) {
        GlobRect$1 = new Rectangle$2();
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
      RotateAround$3(output, gameObject.x, gameObject.y, gameObject.rotation);
    }
    if (includeParent && gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      parentMatrix.transformPoint(output.x, output.y, output);
    }
    return output;
  };

  var Rectangle$1 = Phaser.Geom.Rectangle;
  var Union = Phaser.Geom.Rectangle.Union;
  var GetBoundsOfGameObjects = function GetBoundsOfGameObjects(gameObjects, out) {
    if (out === undefined) {
      out = new Rectangle$1();
    } else if (out === true) {
      if (GlobRect === undefined) {
        GlobRect = new Rectangle$1();
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

  var GameObjectClass = Phaser.GameObjects.GameObject;
  var IsGameObject = function IsGameObject(object) {
    return object instanceof GameObjectClass;
  };

  var GetValue$h = Phaser.Utils.Objects.GetValue;
  var DynamicTexture = Phaser.Textures.DynamicTexture;
  var UUID = Phaser.Utils.String.UUID;
  var Snapshot = function Snapshot(config) {
    if (!config) {
      return;
    }
    var gameObjects = config.gameObjects;
    var renderTexture = config.renderTexture; // renderTexture, or dynamicTexture
    var x = GetValue$h(config, 'x', undefined);
    var y = GetValue$h(config, 'y', undefined);
    var width = GetValue$h(config, 'width', undefined);
    var height = GetValue$h(config, 'height', undefined);
    var originX = GetValue$h(config, 'originX', 0);
    var originY = GetValue$h(config, 'originY', 0);
    var padding = GetValue$h(config, 'padding', 0);
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

    // Snapshot on dynamicTexture directly
    if (saveTexture && !renderTexture) {
      renderTexture = new DynamicTexture(scene.sys.textures, UUID(), width, height);
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
    var saveTexture = config.saveTexture;
    if (saveTexture) {
      if (IsGameObject(renderTexture)) {
        renderTexture.saveTexture(saveTexture);
      } else {
        var dynamicTexture = renderTexture;
        var textureManager = dynamicTexture.manager;
        if (textureManager.exists(dynamicTexture.key)) {
          // Rename texture
          textureManager.renameTexture(dynamicTexture.key, key);
        } else {
          // Add texture to texture manager
          dynamicTexture.key = key;
          textureManager.list[key] = dynamicTexture;
          textureManager.emit('addtexture', key, dynamicTexture);
          textureManager.emit("addtexture-".concat(key), dynamicTexture);
        }
      }
    }
    return renderTexture;
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

  var GetValue$g = Phaser.Utils.Objects.GetValue;
  var DrawBounds$1 = function DrawBounds(gameObjects, graphics, config) {
    var strokeColor, lineWidth, fillColor, fillAlpha, padding;
    if (typeof config === 'number') {
      strokeColor = config;
    } else {
      strokeColor = GetValue$g(config, 'color');
      lineWidth = GetValue$g(config, 'lineWidth');
      fillColor = GetValue$g(config, 'fillColor');
      fillAlpha = GetValue$g(config, 'fillAlpha', 1);
      padding = GetValue$g(config, 'padding', 0);
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

  var GetValue$f = Phaser.Utils.Objects.GetValue;
  var DrawBounds = function DrawBounds(graphics, config) {
    var drawContainer = GetValue$f(config, 'drawContainer', true);
    var gameObjects = GetValue$f(config, 'children');
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

  var RotateAround$2 = Phaser.Math.RotateAround;
  var ChangeOrigin$1 = function ChangeOrigin(gameObject, originX, originY) {
    if (originY === undefined) {
      originY = originX;
    }
    var deltaXY = {
      x: (originX - gameObject.originX) * gameObject.displayWidth,
      y: (originY - gameObject.originY) * gameObject.displayHeight
    };
    RotateAround$2(deltaXY, 0, 0, gameObject.rotation);
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

  var methods$1 = {
    changeOrigin: ChangeOrigin,
    drawBounds: DrawBounds
  };
  Object.assign(methods$1, Parent, AddChild, RemoveChild, ChildState, Transform, Position, Rotation, Scale$1, Visible, Alpha, Active, ScrollFactor, Mask, Depth, Children, Tween, P3Container, Layer, RenderTexture);

  var ContainerLite = /*#__PURE__*/function (_Base) {
    _inherits(ContainerLite, _Base);
    var _super = _createSuper(ContainerLite);
    function ContainerLite(scene, x, y, width, height, children) {
      var _this;
      _classCallCheck(this, ContainerLite);
      if (Array.isArray(width)) {
        children = width;
        width = undefined;
        height = undefined;
      }
      _this = _super.call(this, scene, x, y, width, height);
      _this.type = 'rexContainerLite';
      _this.isRexContainerLite = true;
      _this.syncChildrenEnable = true;
      _this._active = true;
      _this._mask = null;
      _this._scrollFactorX = 1;
      _this._scrollFactorY = 1;
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
  Object.assign(ContainerLite.prototype, methods$1);

  var SetTransitionCallbackMethods = {
    setTransitionStartCallback: function setTransitionStartCallback(callback, scope) {
      this.onStartCallback = callback;
      this.onStartCallbackScope = scope;
      return this;
    },
    setTransitionProgressCallback: function setTransitionProgressCallback(callback, scope) {
      this.onProgressCallback = callback;
      this.onProgressCallbackScope = scope;
      return this;
    },
    setTransitionCompleteCallback: function setTransitionCompleteCallback(callback, scope) {
      this.onCompleteCallback = callback;
      this.onCompleteCallbackScope = scope;
      return this;
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

  var GetValue$e = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$e(config, 'eventEmitter', true));

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

  var GetValue$d = Phaser.Utils.Objects.GetValue;
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
      _this.setTickingMode(GetValue$d(config, 'tickingMode', 1));
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

  var GetValue$c = Phaser.Utils.Objects.GetValue;
  var SceneUpdateTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(SceneUpdateTickTask, _TickTask);
    var _super = _createSuper(SceneUpdateTickTask);
    function SceneUpdateTickTask(parent, config) {
      var _this;
      _classCallCheck(this, SceneUpdateTickTask);
      _this = _super.call(this, parent, config);

      // scene update : update, preupdate, postupdate, prerender, render
      // game update : step, poststep, 

      // If this.scene is not available, use game's 'step' event
      var defaultEventName = _this.scene ? 'update' : 'step';
      _this.tickEventName = GetValue$c(config, 'tickEventName', defaultEventName);
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

  var GetValue$b = Phaser.Utils.Objects.GetValue;
  var Clamp$2 = Phaser.Math.Clamp;
  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);
      this.resetFromJSON(config);
    }
    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$b(o, 'state', IDLE);
        this.timeScale = GetValue$b(o, 'timeScale', 1);
        this.delay = GetValue$b(o, 'delay', 0);
        this.repeat = GetValue$b(o, 'repeat', 0);
        this.repeatCounter = GetValue$b(o, 'repeatCounter', 0);
        this.repeatDelay = GetValue$b(o, 'repeatDelay', 0);
        this.duration = GetValue$b(o, 'duration', 0);
        this.nowTime = GetValue$b(o, 'nowTime', 0);
        this.justRestart = GetValue$b(o, 'justRestart', false);
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
        return Clamp$2(t, 0, 1);
      },
      set: function set(value) {
        value = Clamp$2(value, -1, 1);
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
    var _super = _createSuper(TimerTickTask);
    function TimerTickTask(parent, config) {
      var _this;
      _classCallCheck(this, TimerTickTask);
      _this = _super.call(this, parent, config);
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

  var GetValue$a = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
  var GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;
  var EaseValueTaskBase = /*#__PURE__*/function (_TimerTask) {
    _inherits(EaseValueTaskBase, _TimerTask);
    var _super = _createSuper(EaseValueTaskBase);
    function EaseValueTaskBase() {
      _classCallCheck(this, EaseValueTaskBase);
      return _super.apply(this, arguments);
    }
    _createClass(EaseValueTaskBase, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue$a(o, 'timer'));
        this.setEnable(GetValue$a(o, 'enable', true));
        this.setTarget(GetValue$a(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue$1(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$1(o, 'duration', 1000));
        this.setEase(GetValue$a(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$a(o, 'repeat', 0));
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

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var Linear$2 = Phaser.Math.Linear;
  var EaseValueTask = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(EaseValueTask, _EaseValueTaskBase);
    var _super = _createSuper(EaseValueTask);
    function EaseValueTask(gameObject, config) {
      var _this;
      _classCallCheck(this, EaseValueTask);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON();
      _this.boot();
      return _this;
    }
    _createClass(EaseValueTask, [{
      key: "start",
      value: function start(config) {
        if (this.timer.isRunning) {
          return this;
        }
        var target = this.target;
        this.propertyKey = GetValue$9(config, 'key', 'value');
        var currentValue = target[this.propertyKey];
        this.fromValue = GetValue$9(config, 'from', currentValue);
        this.toValue = GetValue$9(config, 'to', currentValue);
        this.setEase(GetValue$9(config, 'ease', this.ease));
        this.setDuration(GetValue$9(config, 'duration', this.duration));
        this.setRepeat(GetValue$9(config, 'repeat', 0));
        this.setDelay(GetValue$9(config, 'delay', 0));
        this.setRepeatDelay(GetValue$9(config, 'repeatDelay', 0));
        this.timer.setDuration(this.duration).setRepeat(this.repeat).setDelay(this.delay).setRepeatDelay(this.repeatDelay);
        target[this.propertyKey] = this.fromValue;
        _get(_getPrototypeOf(EaseValueTask.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(target, timer) {
        var t = timer.t;
        t = this.easeFn(t);
        target[this.propertyKey] = Linear$2(this.fromValue, this.toValue, t);
      }
    }]);
    return EaseValueTask;
  }(EaseValueTaskBase);

  var IsPlainObject$5 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var GetRandomItem = Phaser.Utils.Array.GetRandom;
  var DirMode = {
    out: 0,
    "in": 1
  };
  var GetValueFromConfigs = function GetValueFromConfigs(key, defaultValue) {
    for (var i = 0, cnt = arguments.length <= 2 ? 0 : arguments.length - 2; i < cnt; i++) {
      var config = i + 2 < 2 || arguments.length <= i + 2 ? undefined : arguments[i + 2];
      if (config && config.hasOwnProperty(key)) {
        return config[key];
      }
    }
    return defaultValue;
  };
  var TransitionMethods = {
    setTransitionDirection: function setTransitionDirection(dir) {
      if (typeof dir === 'string') {
        dir = DirMode[dir];
      }
      this.dir = dir;
      return this;
    },
    setDuration: function setDuration(duration) {
      this.duration = duration;
      return this;
    },
    setEaseFunction: function setEaseFunction(ease) {
      this.easeFunction = ease;
      return this;
    },
    setNextTexture: function setNextTexture(texture, frame) {
      this.nextImage.setTexture(texture, frame);
      return this;
    },
    transit: function transit(texture, frame, mode) {
      if (this.isRunning) {
        this.ignoreCompleteEvent = true;
        this.stop();
        this.ignoreCompleteEvent = false;
      }
      if (mode !== undefined) {
        texture = {
          key: texture,
          frame: frame,
          mode: mode
        };
      }
      this.currentTransitionMode = undefined;
      if (IsPlainObject$5(texture)) {
        var config = texture;
        texture = GetValue$8(config, 'key', undefined);
        frame = GetValue$8(config, 'frame', undefined);
        mode = GetValue$8(config, 'mode');
        if (Array.isArray(mode)) {
          mode = GetRandomItem(mode);
        }
        var modeConfig;
        if (this.transitionModes && this.transitionModes.hasOwnProperty(mode)) {
          modeConfig = this.transitionModes[mode];
          this.currentTransitionMode = mode;
        }
        this.setDuration(GetValueFromConfigs('duration', this.duration, config, modeConfig)).setEaseFunction(GetValueFromConfigs('ease', this.easeFunction, config, modeConfig)).setTransitionDirection(GetValueFromConfigs('dir', this.dir, config, modeConfig));
        var maskGameObject = GetValueFromConfigs('mask', undefined, config, modeConfig);
        if (maskGameObject) {
          this.setMaskGameObject(maskGameObject);
        }
        this.setMaskEnable(maskGameObject === true);
        var onStart = GetValueFromConfigs('onStart', undefined, config, modeConfig);
        var onProgress = GetValueFromConfigs('onProgress', undefined, config, modeConfig);
        var onComplete = GetValueFromConfigs('onComplete', undefined, config, modeConfig);
        if (onStart !== undefined || onProgress !== undefined || onComplete !== undefined) {
          this.setTransitionStartCallback(onStart, GetValueFromConfigs('onStartScope', undefined, config, modeConfig)).setTransitionProgressCallback(onProgress, GetValueFromConfigs('onProgressScope', undefined, config, modeConfig)).setTransitionCompleteCallback(onComplete, GetValueFromConfigs('onCompleteScope', undefined, config, modeConfig));
        }
      }
      this.setNextTexture(texture, frame);
      this.start();
      return this;
    },
    addTransitionMode: function addTransitionMode(name, config) {
      if (this.transitionModes === undefined) {
        this.transitionModes = {};
      }
      if (IsPlainObject$5(name)) {
        config = name;
        name = config.name;
        delete config.name;
      }
      this.transitionModes[name] = config;
      return this;
    },
    start: function start() {
      if (this.easeValueTask === undefined) {
        this.easeValueTask = new EaseValueTask(this, {
          eventEmitter: null
        });
      }
      this.easeValueTask.restart({
        key: 't',
        from: 0,
        to: 1,
        duration: this.duration,
        ease: this.easeFunction
      });
      return this;
    },
    pause: function pause() {
      if (this.easeValueTask) {
        this.easeValueTask.pause();
      }
      return this;
    },
    resume: function resume() {
      if (this.easeValueTask) {
        this.easeValueTask.resume();
      }
      return this;
    },
    stop: function stop() {
      if (this.easeValueTask) {
        this.easeValueTask.stop();
      }
      this.setT(1);
      return this;
    }
  };

  var DrawShape = function DrawShape(width, height, padding, originX, originY) {
    this.clear().fillStyle(0xffffff);
    switch (this.shape) {
      case 1:
        // circle
        var radius = Math.min(width, height) / 2;
        this.fillCircle(-width * (originX - 0.5), -height * (originY - 0.5), radius + padding);
        break;
      default:
        // 0|'rectangle'
        this.fillRect(-(width * originX) - padding, -(height * originY) - padding, width + 2 * padding, height + 2 * padding);
        break;
    }
  };

  var Graphics = Phaser.GameObjects.Graphics;
  var DefaultMaskGraphics = /*#__PURE__*/function (_Graphics) {
    _inherits(DefaultMaskGraphics, _Graphics);
    var _super = _createSuper(DefaultMaskGraphics);
    function DefaultMaskGraphics(parent, shape, padding) {
      var _this;
      _classCallCheck(this, DefaultMaskGraphics);
      if (shape === undefined) {
        shape = 0;
      }
      if (typeof shape === 'string') {
        shape = SHAPEMODE[shape];
      }
      if (padding === undefined) {
        padding = 0;
      }
      _this = _super.call(this, parent.scene);
      _this.parent = parent;
      _this.shape = shape;
      _this.padding = padding;
      _this.setPosition().resize().setVisible(false);
      // Don't add it to display list
      return _this;
    }
    _createClass(DefaultMaskGraphics, [{
      key: "destroy",
      value: function destroy() {
        this.parent = undefined;
        _get(_getPrototypeOf(DefaultMaskGraphics.prototype), "destroy", this).call(this);
        return this;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        var parent = this.parent;
        if (x === undefined) {
          x = parent.x;
        }
        if (y === undefined) {
          y = parent.y;
        }
        _get(_getPrototypeOf(DefaultMaskGraphics.prototype), "setPosition", this).call(this, x, y);
        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height, padding) {
        var parent = this.parent;
        if (width === undefined) {
          width = parent.width;
        }
        if (height === undefined) {
          height = parent.height;
        }
        if (padding === undefined) {
          padding = this.padding;
        }
        if (this.width === width && this.height === height && this.paddingSave === padding) {
          return this;
        }
        this.width = width;
        this.height = height;
        this.originX = parent.originX;
        this.originY = parent.originY;
        this.paddingSave = padding;
        DrawShape.call(this, width, height, padding, parent.originX, parent.originY);
        return this;
      }
    }, {
      key: "setOrigin",
      value: function setOrigin(originX, originY) {
        if (originY === undefined) {
          originY = originX;
        }
        var parent = this.parent;
        if (originX === undefined) {
          originX = parent.originX;
        }
        if (originY === undefined) {
          originY = parent.originY;
        }
        if (this.originX === originX && this.originY === originY) {
          return this;
        }
        this.originX = originX;
        this.originY = originY;
        DrawShape.call(this, this.width, this.height, this.paddingSave, originX, originY);
        return this;
      }
    }]);
    return DefaultMaskGraphics;
  }(Graphics);
  var SHAPEMODE = {
    rectangle: 0,
    circle: 1
  };

  var MaskMethods = {
    setMaskGameObject: function setMaskGameObject(gameObject) {
      if (!gameObject) {
        this.removeMaskGameObject();
        return this;
      }
      if (this.maskGameObject) {
        if (gameObject === true && this.maskGameObject instanceof DefaultMaskGraphics) {
          return this;
        }
        if (this.maskGameObject === gameObject) {
          return this;
        }

        // Remove previous Mask Game Object
        this.removeMaskGameObject();
      }

      // Add new Mask Game Object
      if (gameObject === true) {
        gameObject = new DefaultMaskGraphics(this);
      }
      this.maskGameObject = gameObject;
      this.maskGameObject.resize(this.width, this.height).setOrigin(this.originX, this.originY).setPosition(0, 0).setScale(1).setVisible(false);
      this.addLocal(this.maskGameObject);
      this.childrenMask = this.maskGameObject.createGeometryMask();
      return this;
    },
    removeMaskGameObject: function removeMaskGameObject(destroyMaskGameObject) {
      if (destroyMaskGameObject === undefined) {
        destroyMaskGameObject = true;
      }
      this.backImage.clearMask();
      this.frontImage.clearMask();
      this.childrenMask = undefined;
      this.remove(this.maskGameObject, destroyMaskGameObject);
      this.maskGameObject = undefined;
      return this;
    },
    setImageMaskEnable: function setImageMaskEnable(gameObject, enable, invertAlpha) {
      if (enable === undefined) {
        enable = true;
      }
      if (invertAlpha === undefined) {
        invertAlpha = false;
      }
      if (enable) {
        // Use DefaultMaskGraphics if not given    
        if (!this.childrenMask) {
          this.setMaskGameObject(true);
        }
        gameObject.setMask(this.childrenMask);
        if (invertAlpha) {
          this.childrenMask.setInvertAlpha();
        }
      } else {
        gameObject.clearMask();
      }
      return this;
    },
    setCurrentImageMaskEnable: function setCurrentImageMaskEnable(enable, invertAlpha) {
      this.setImageMaskEnable(this.currentImage, enable, invertAlpha);
      return this;
    },
    setNextImageMaskEnable: function setNextImageMaskEnable(enable, invertAlpha) {
      this.setImageMaskEnable(this.nextImage, enable, invertAlpha);
      return this;
    },
    setCellImagesMaskEnable: function setCellImagesMaskEnable(enable, invertAlpha) {
      var cellImages = this.getCellImages();
      for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
        this.setImageMaskEnable(cellImages[i], enable, invertAlpha);
      }
      return this;
    },
    setMaskEnable: function setMaskEnable(enable, invertAlpha) {
      this.setImageMaskEnable(this.backImage, enable, invertAlpha);
      this.setImageMaskEnable(this.frontImage, enable, invertAlpha);
      this.setCellImagesMaskEnable(enable, invertAlpha);
      return this;
    }
  };

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

  var GridCut = function GridCut(scene, key, frame, columns, rows, getFrameNameCallback) {
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
    var offsetX = 0,
      offsetY = 0;
    for (var y = 0; y < rows; y++) {
      offsetX = 0;
      for (var x = 0; x < columns; x++) {
        cellName = getFrameNameCallback(x, y);
        cellX = offsetX + baseFrame.cutX;
        cellY = offsetY + baseFrame.cutY;
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

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var DefaultImageClass = Phaser.GameObjects.Image;
  var IsPlainObject$4 = Phaser.Utils.Objects.IsPlainObject;
  var RotateAround$1 = Phaser.Math.RotateAround;
  var GridCutImage = function GridCutImage(gameObject, columns, rows, config) {
    if (IsPlainObject$4(columns)) {
      config = columns;
      columns = GetValue$7(config, 'columns', 1);
      rows = GetValue$7(config, 'rows', 1);
    }
    var createImageCallback = GetValue$7(config, 'onCreateImage');
    if (!createImageCallback) {
      var ImageClass = GetValue$7(config, 'ImageClass', DefaultImageClass);
      createImageCallback = function createImageCallback(scene, key, frame) {
        return new ImageClass(scene, 0, 0, key, frame);
      };
    }
    var originX = GetValue$7(config, 'originX', 0.5);
    var originY = GetValue$7(config, 'originY', 0.5);
    var addToScene = GetValue$7(config, 'add', true);
    var align = GetValue$7(config, 'align', addToScene);
    var imageObjectPool = GetValue$7(config, 'objectPool', undefined);
    var scene = gameObject.scene;
    var texture = gameObject.texture;
    var frame = gameObject.frame;
    var result = GridCut(scene, texture, frame, columns, rows);
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
          cellGameObject = imageObjectPool.pop().setTexture(texture, frameName);
        } else {
          cellGameObject = createImageCallback(scene, texture, frameName);
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
          RotateAround$1(cellGameObject, startX, startY, rotation);
        }
        cellGameObjects.push(cellGameObject);
      }
    }
    return cellGameObjects;
  };

  var GridCutMethods = {
    gridCutImage: function gridCutImage(gameObject, columns, rows, config) {
      if (config === undefined) {
        config = {};
      }
      config.objectPool = this.imagesPool;
      var cellImages = GridCutImage(gameObject, columns, rows, config),
        cellImage;
      for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
        cellImage = cellImages[i];
        cellImage.setVisible(true);
        this.add(cellImage);
      }
      this.cellImages = cellImages;
      this.setChildLocalVisible(gameObject, false); // Set cut target to invisible
      return cellImages;
    },
    gridCutCurrentImage: function gridCutCurrentImage(columns, rows, config) {
      return this.gridCutImage(this.currentImage, columns, rows, config);
    },
    gridCutNextImage: function gridCutNextImage(columns, rows, config) {
      return this.gridCutImage(this.nextImage, columns, rows, config);
    },
    getCellImages: function getCellImages() {
      return this.cellImages;
    },
    freeCellImages: function freeCellImages() {
      var _this$imagesPool;
      if (this.cellImages.length === 0) {
        return this;
      }
      var texture = this.cellImages[0].texture;
      var cellImages = this.cellImages,
        cellImage,
        frameName;
      for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
        cellImage = cellImages[i];

        // Reset property of cell image
        this.setChildLocalAlpha(cellImage, 1).setChildLocalScale(cellImage, 1).setChildLocalVisible(cellImage, false);
        cellImage.clearMask();

        // Remove frame object
        frameName = cellImage.frame.name;
        cellImage.setTexture();
        texture.remove(frameName);
      }
      (_this$imagesPool = this.imagesPool).push.apply(_this$imagesPool, _toConsumableArray(cellImages));
      cellImages.length = 0;
      return this;
    }
  };

  var FlipMethods = {
    setFlipX: function setFlipX(value) {
      this.flipX = value;
      return this;
    },
    setFlipY: function setFlipY(value) {
      this.flipY = value;
      return this;
    },
    toggleFlipX: function toggleFlipX() {
      this.flipX = !this.flipX;
      return this;
    },
    toggleFlipY: function toggleFlipY() {
      this.flipY = !this.flipY;
      return this;
    },
    setFlip: function setFlip(x, y) {
      this.flipX = x;
      this.flipY = y;
      return this;
    },
    resetFlip: function resetFlip() {
      this.flipX = false;
      this.flipY = false;
      return this;
    }
  };

  var methods = {};
  Object.assign(methods, SetTransitionCallbackMethods, TransitionMethods, MaskMethods, GridCutMethods, FlipMethods);

  var OnStart = function OnStart(parent, currentImage, nextImage, t) {};
  var OnProgress = function OnProgress(parent, currentImage, nextImage, t) {
    parent.setChildLocalAlpha(currentImage, 1 - t).setChildLocalAlpha(nextImage, t);
  };
  var OnComplete = function OnComplete(parent, currentImage, nextImage, t) {
    parent.setChildLocalAlpha(currentImage, 1);
  };

  var IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var Clamp$1 = Phaser.Math.Clamp;
  var TransitionImage = /*#__PURE__*/function (_Container) {
    _inherits(TransitionImage, _Container);
    var _super = _createSuper(TransitionImage);
    function TransitionImage(scene, x, y, texture, frame, config) {
      var _this;
      _classCallCheck(this, TransitionImage);
      if (IsPlainObject$3(x)) {
        config = x;
        x = GetValue$6(config, 'x', 0);
        y = GetValue$6(config, 'y', 0);
        texture = GetValue$6(config, 'key', undefined);
        frame = GetValue$6(config, 'frame', undefined);
      } else if (IsPlainObject$3(frame)) {
        config = frame;
        frame = undefined;
      }
      var backImage = GetValue$6(config, 'back', undefined);
      var frontImage = GetValue$6(config, 'front', undefined);
      if (!backImage) {
        backImage = scene.add.image(x, y, texture, frame);
      }
      if (!frontImage) {
        frontImage = scene.add.image(x, y, texture, frame);
      }
      var width = GetValue$6(config, 'width', frontImage.width);
      var height = GetValue$6(config, 'height', frontImage.height);
      _this = _super.call(this, scene, x, y, width, height);
      _this.type = 'rexTransitionImage';
      backImage.setVisible(false);
      _this.addMultiple([backImage, frontImage]);
      _this.backImage = backImage;
      _this.frontImage = frontImage;
      _this.maskGameObject = undefined;
      _this.cellImages = [];
      _this.imagesPool = [];
      _this.transitionModes = undefined;
      _this.currentTransitionMode = undefined;

      // Transition parameters
      var onStart = GetValue$6(config, 'onStart', undefined);
      var onProgress = GetValue$6(config, 'onProgress', undefined);
      var onComplete = GetValue$6(config, 'onComplete', undefined);
      var dir = GetValue$6(config, 'dir', 0);
      if (onStart === undefined && onProgress === undefined && onComplete === undefined) {
        onStart = OnStart;
        onProgress = OnProgress;
        onComplete = OnComplete;
        dir = 0;
      }
      _this.setTransitionStartCallback(onStart, GetValue$6(config, 'onStartScope', undefined)).setTransitionProgressCallback(onProgress, GetValue$6(config, 'onProgressScope', undefined)).setTransitionCompleteCallback(onComplete, GetValue$6(config, 'onCompleteScope', undefined)).setTransitionDirection(dir).setDuration(GetValue$6(config, 'duration', 1000)).setEaseFunction(GetValue$6(config, 'ease', 'Linear'));
      var maskGameObject = GetValue$6(config, 'mask', undefined);
      if (maskGameObject) {
        _this.setMaskGameObject(maskGameObject);
      }
      _this.setMaskEnable(false);
      _this.ignoreCompleteEvent = false;
      return _this;
    }
    _createClass(TransitionImage, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
          return;
        }
        if (this.childrenMask) {
          this.childrenMask.destroy();
          this.childrenMask = undefined;
        }
        this.backImage = undefined;
        this.frontImage = undefined;
        this.maskGameObject = undefined;
        this.cellImages.length = 0;
        this.imagesPool.length = 0;
        this.transitionModes = undefined;
        _get(_getPrototypeOf(TransitionImage.prototype), "destroy", this).call(this, fromScene);
        this.onStartCallback = undefined;
        this.onStartCallbackScope = undefined;
        this.onProgressCallback = undefined;
        this.onProgressCallbackScope = undefined;
        this.onCompleteCallback = undefined;
        this.onCompleteCallbackScope = undefined;
        this.easeValueTask = undefined;
      }
    }, {
      key: "currentImage",
      get: function get() {
        return this.dir === 0 ? this.frontImage : this.backImage;
      }
    }, {
      key: "nextImage",
      get: function get() {
        return this.dir === 0 ? this.backImage : this.frontImage;
      }
    }, {
      key: "texture",
      get: function get() {
        return this.nextImage.texture;
      }
    }, {
      key: "frame",
      get: function get() {
        return this.nextImage.frame;
      }
    }, {
      key: "flipX",
      get: function get() {
        return this._flipX;
      },
      set: function set(value) {
        if (this._flipX === value) {
          return;
        }
        this._flipX = value;
        this.backImage.setFlipX(value);
        this.frontImage.setFlipX(value);
      }
    }, {
      key: "flipY",
      get: function get() {
        return this._flipY;
      },
      set: function set(value) {
        if (this._flipY === value) {
          return;
        }
        this._flipY = value;
        this.backImage.setFlipY(value);
        this.frontImage.setFlipY(value);
      }
    }, {
      key: "t",
      get: function get() {
        return this._t;
      },
      set: function set(value) {
        value = Clamp$1(value, 0, 1);
        if (this._t === value) {
          return;
        }
        this._t = value;
        var currentImage = this.currentImage;
        var nextImage = this.nextImage;

        // Start
        if (value === 0) {
          this.setChildVisible(this.frontImage, true).setChildVisible(this.backImage, true);
          RunCallback(this.onStartCallback, this.onStartCallbackScope, this, currentImage, nextImage, value);
        }

        // Progress
        RunCallback(this.onProgressCallback, this.onProgressCallbackScope, this, currentImage, nextImage, value);

        // Complete
        if (value === 1) {
          RunCallback(this.onCompleteCallback, this.onCompleteCallbackScope, this, currentImage, nextImage, value);
          var key = nextImage.texture.key,
            frame = nextImage.frame.name;
          this.frontImage.setTexture(key, frame);
          this.backImage.setTexture(key, frame);
          this.setChildVisible(this.frontImage, true).setChildVisible(this.backImage, false).setMaskEnable(false).freeCellImages();
        }
        if (value === 1 && !this.ignoreCompleteEvent) {
          this.emit('complete');
        }
      }
    }, {
      key: "setT",
      value: function setT(value) {
        this.t = value;
        return this;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this.easeValueTask ? this.easeValueTask.isRunning : false;
      }
    }, {
      key: "setOrigin",
      value: function setOrigin(originX, originY) {
        _get(_getPrototypeOf(TransitionImage.prototype), "setOrigin", this).call(this, originX, originY);
        this.backImage.setOrigin(originX, originY);
        this.frontImage.setOrigin(originX, originY);
        if (this.maskGameObject) {
          this.maskGameObject.setOrigin(originX, originY);
        }
        return this;
      }
    }, {
      key: "setTexture",
      value: function setTexture(texture, frame) {
        // Without transition
        this.frontImage.setTexture(texture, frame);
        this.backImage.setTexture(texture, frame).setVisible(false);
        return this;
      }
    }]);
    return TransitionImage;
  }(ContainerLite);
  var RunCallback = function RunCallback(callback, scope, parent, currentImage, nextImage, t) {
    if (!callback) {
      return;
    }
    if (scope) {
      callback.call(scope, parent, currentImage, nextImage, t);
    } else {
      callback(parent, currentImage, nextImage, t);
    }
  };

  // mixin
  Object.assign(TransitionImage.prototype, methods);

  // Slide modes
  var SlideLeft = 'slideLeft';
  var SlideRight = 'slideRight';
  var SlideUp = 'slideUp';
  var SlideDown = 'slideDown';
  var SlideAwayLeft = 'slideAwayLeft';
  var SlideAwayRight = 'slideAwayRight';
  var SlideAwayUp = 'slideAwayUp';
  var SlideAwayDown = 'slideAwayDown';
  var PushLeft = 'pushLeft';
  var PushRight = 'pushRight';
  var PushUp = 'pushUp';
  var PushDown = 'pushDown';

  // Zoom modes
  var ZoomOut = 'zoomOut';
  var ZoomIn = 'zoomIn';
  var ZoomInOut = 'zoomInOut';

  // Fade effect mode
  var Fade = 'fade';
  var CrossFade = 'crossFade';

  // Wipe modes
  var WipeLeft = 'wipeLeft';
  var WipeRight = 'wipeRight';
  var WipeUp = 'wipeUp';
  var WipeDown = 'wipeDown';

  // Iris modes
  var IrisOut = 'irisOut';
  var IrisIn = 'irisIn';

  // Iris modes
  var PieOut = 'pieOut';
  var PieIn = 'pieIn';

  // blinds, squares, curtain
  var Blinds = 'blinds';
  var Squares = 'squares';
  var Curtain = 'curtain';

  // Shader effect modes
  var Pixellate = 'pixellate';

  var AddSlideAwayModes = function AddSlideAwayModes(image) {
    image.addTransitionMode(SlideAwayRight, {
      ease: 'Linear',
      dir: 'out',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        var x = currentImage.width * t;
        parent.setChildLocalPosition(currentImage, x, 0);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalPosition(currentImage, 0, 0);
      }
    }).addTransitionMode(SlideAwayLeft, {
      ease: 'Linear',
      dir: 'out',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        var x = currentImage.width * -t;
        parent.setChildLocalPosition(currentImage, x, 0);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalPosition(currentImage, 0, 0);
      }
    }).addTransitionMode(SlideAwayDown, {
      ease: 'Linear',
      dir: 'out',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        var y = currentImage.height * t;
        parent.setChildLocalPosition(currentImage, 0, y);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalPosition(currentImage, 0, 0);
      }
    }).addTransitionMode(SlideAwayUp, {
      ease: 'Linear',
      dir: 'out',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        var y = currentImage.height * -t;
        parent.setChildLocalPosition(currentImage, 0, y);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalPosition(currentImage, 0, 0);
      }
    });
  };

  var AddSlideModes = function AddSlideModes(image) {
    image.addTransitionMode(SlideRight, {
      ease: 'Linear',
      dir: 'in',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        var x = nextImage.width * (t - 1);
        parent.setChildLocalPosition(nextImage, x, 0);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalPosition(nextImage, 0, 0);
      }
    }).addTransitionMode(SlideLeft, {
      ease: 'Linear',
      dir: 'in',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        var x = nextImage.width * (1 - t);
        parent.setChildLocalPosition(nextImage, x, 0);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalPosition(nextImage, 0, 0);
      }
    }).addTransitionMode(SlideDown, {
      ease: 'Linear',
      dir: 'in',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        var y = nextImage.height * (t - 1);
        parent.setChildLocalPosition(nextImage, 0, y);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalPosition(nextImage, 0, 0);
      }
    }).addTransitionMode(SlideUp, {
      ease: 'Linear',
      dir: 'in',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        var y = nextImage.height * (1 - t);
        parent.setChildLocalPosition(nextImage, 0, y);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalPosition(nextImage, 0, 0);
      }
    });
  };

  var AddSliderModes = function AddSliderModes(image) {
    image.addTransitionMode(PushRight, {
      ease: 'Linear',
      dir: 'out',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        // SlideAwayRight
        var x = currentImage.width * t;
        parent.setChildLocalPosition(currentImage, x, 0);

        // SlideLeft
        var x = nextImage.width * (t - 1);
        parent.setChildLocalPosition(nextImage, x, 0);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalPosition(currentImage, 0, 0);
        parent.setChildLocalPosition(nextImage, 0, 0);
      }
    }).addTransitionMode(PushLeft, {
      ease: 'Linear',
      dir: 'out',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        // SlideAwayLeft
        var x = currentImage.width * -t;
        parent.setChildLocalPosition(currentImage, x, 0);

        // SlideRight
        var x = nextImage.width * (1 - t);
        parent.setChildLocalPosition(nextImage, x, 0);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalPosition(currentImage, 0, 0);
        parent.setChildLocalPosition(nextImage, 0, 0);
      }
    }).addTransitionMode(PushDown, {
      ease: 'Linear',
      dir: 'out',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        // SlideAwayDown
        var y = currentImage.height * t;
        parent.setChildLocalPosition(currentImage, 0, y);

        // SlideUp
        var y = nextImage.height * (t - 1);
        parent.setChildLocalPosition(nextImage, 0, y);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalPosition(currentImage, 0, 0);
        parent.setChildLocalPosition(nextImage, 0, 0);
      }
    }).addTransitionMode(PushUp, {
      ease: 'Linear',
      dir: 'out',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        // SlideAwayUp
        var y = currentImage.height * -t;
        parent.setChildLocalPosition(currentImage, 0, y);

        // SlideDown
        var y = nextImage.height * (1 - t);
        parent.setChildLocalPosition(nextImage, 0, y);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalPosition(currentImage, 0, 0);
        parent.setChildLocalPosition(nextImage, 0, 0);
      }
    });
  };

  var AddZoomModes = function AddZoomModes(image) {
    image.addTransitionMode(ZoomOut, {
      ease: 'Linear',
      dir: 'out',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        var scale = 1 - t;
        parent.setChildScale(currentImage, scale, scale);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildScale(currentImage, 1, 1);
      }
    }).addTransitionMode(ZoomIn, {
      ease: 'Linear',
      dir: 'in',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        var scale = t;
        parent.setChildScale(nextImage, scale, scale);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildScale(nextImage, 1, 1);
      }
    }).addTransitionMode(ZoomInOut, {
      ease: 'Linear',
      dir: 'out',
      mask: true,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        parent.setChildVisible(nextImage, false);
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        var scale;
        if (t < 0.5) {
          scale = 1 - t * 2;
          parent.setChildScale(currentImage, scale, scale);
        } else {
          if (currentImage.visible) {
            parent.setChildVisible(currentImage, false);
          }
          if (!nextImage.visible) {
            parent.setChildVisible(nextImage, true);
          }
          scale = (t - 0.5) * 2;
          parent.setChildScale(nextImage, scale, scale);
        }
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildScale(currentImage, 1, 1);
        parent.setChildVisible(currentImage, true);
        parent.setChildScale(nextImage, 1, 1);
        parent.setChildVisible(nextImage, true);
      }
    });
  };

  var Yoyo = function Yoyo(t, threshold) {
    if (threshold === undefined) {
      threshold = 0.5;
    }
    if (t <= threshold) {
      t = t / threshold;
    } else {
      t = 1 - (t - threshold) / (1 - threshold);
    }
    return t;
  };

  var AddFadeModes = function AddFadeModes(image) {
    image.addTransitionMode(Fade, {
      ease: 'Linear',
      dir: 'out',
      mask: false,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        var tintGray;
        if (t < 0.5) {
          if (nextImage.visible) {
            parent.setChildVisible(nextImage, false);
          }
          t = Yoyo(t);
          tintGray = Math.floor(255 * (1 - t));
          currentImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
        } else {
          if (currentImage.visible) {
            parent.setChildVisible(currentImage, false);
          }
          if (!nextImage.visible) {
            parent.setChildVisible(nextImage, true);
          }
          t = Yoyo(t);
          tintGray = Math.floor(255 * (1 - t));
          nextImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
        }
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        currentImage.tint = 0xffffff;
        parent.setChildVisible(currentImage, true);
        nextImage.tint = 0xffffff;
      }
    }).addTransitionMode(CrossFade, {
      ease: 'Linear',
      dir: 'out',
      mask: false,
      onStart: function onStart(parent, currentImage, nextImage, t) {},
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        parent.setChildLocalAlpha(currentImage, 1 - t);
        parent.setChildLocalAlpha(nextImage, t);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.setChildLocalAlpha(currentImage, 1);
      }
    });
  };

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
  var GetValue$5 = function GetValue(source, key, defaultValue) {
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
      return key === undefined ? this.data : GetValue$5(this.data, key, defaultValue);
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

  var DegToRad$2 = Phaser.Math.DegToRad;
  var ArcTo = function ArcTo(centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && endAngle > startAngle) {
      endAngle -= 360;
    } else if (!antiClockWise && endAngle < startAngle) {
      endAngle += 360;
    }
    var deltaAngle = endAngle - startAngle;
    var step = DegToRad$2(deltaAngle) / iteration;
    startAngle = DegToRad$2(startAngle);
    for (var i = 0; i <= iteration; i++) {
      var angle = startAngle + step * i;
      var x = centerX + radiusX * Math.cos(angle);
      var y = centerY + radiusY * Math.sin(angle);
      LineTo(x, y, pathData);
    }
    return pathData;
  };

  var DegToRad$1 = Phaser.Math.DegToRad;
  var Arc = /*#__PURE__*/function (_PathBase) {
    _inherits(Arc, _PathBase);
    var _super = _createSuper(Arc);
    function Arc(x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise, pie) {
      var _this;
      _classCallCheck(this, Arc);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (radiusX === undefined) {
        radiusX = 0;
      }
      if (radiusY === undefined) {
        radiusY = 0;
      }
      if (startAngle === undefined) {
        startAngle = 0;
      }
      if (endAngle === undefined) {
        endAngle = 360;
      }
      if (anticlockwise === undefined) {
        anticlockwise = false;
      }
      if (pie === undefined) {
        pie = false;
      }
      _this = _super.call(this);
      _this.setCenterPosition(x, y);
      _this.setRadius(radiusX, radiusY);
      _this.setAngle(startAngle, endAngle, anticlockwise);
      _this.setPie(pie);
      _this.setIterations(32);
      return _this;
    }
    _createClass(Arc, [{
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x !== value;
        this._x = value;
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y !== value;
        this._y = value;
      }
    }, {
      key: "setCenterPosition",
      value: function setCenterPosition(x, y) {
        if (y === undefined) {
          y = x;
        }
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "radiusX",
      get: function get() {
        return this._radiusX;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._radiusX !== value;
        this._radiusX = value;
      }
    }, {
      key: "radiusY",
      get: function get() {
        return this._radiusY;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._radiusY !== value;
        this._radiusY = value;
      }
    }, {
      key: "setRadius",
      value: function setRadius(radiusX, radiusY) {
        if (radiusY === undefined) {
          radiusY = radiusX;
        }
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        return this;
      }
    }, {
      key: "startAngle",
      get: function get() {
        return this._startAngle;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._startAngle !== value;
        this._startAngle = value;
      }
    }, {
      key: "endAngle",
      get: function get() {
        return this._endAngle;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._endAngle !== value;
        this._endAngle = value;
      }
    }, {
      key: "anticlockwise",
      get: function get() {
        return this._anticlockwise;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._anticlockwise !== value;
        this._anticlockwise = value;
      }
    }, {
      key: "setAngle",
      value: function setAngle(startAngle, endAngle, anticlockwise) {
        // startAngle, endAngle in degrees
        if (anticlockwise === undefined) {
          anticlockwise = false;
        }
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
        return this;
      }
    }, {
      key: "pie",
      get: function get() {
        return this._pie;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._pie !== value;
        this._pie = value;
      }
    }, {
      key: "setPie",
      value: function setPie(pie) {
        if (pie === undefined) {
          pie = true;
        }
        this.pie = pie;
        return this;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._iterations !== value;
        this._iterations = value;
      }
    }, {
      key: "setIterations",
      value: function setIterations(iterations) {
        this.iterations = iterations;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        this.pathData.length = 0;
        if (this.pie) {
          this.pathData.push(this.x, this.y);
        }
        ArcTo(this.x, this.y, this.radiusX, this.radiusY, this.startAngle, this.endAngle, this.anticlockwise, this.iterations, this.pathData);
        if (this.pie) {
          this.pathData.push(this.x, this.y);
        }
        this.pathData.push(this.pathData[0], this.pathData[1]);
        _get(_getPrototypeOf(Arc.prototype), "updateData", this).call(this);
        return this;
      }
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {
        ctx.beginPath();
        var x = this.x - dx,
          y = this.y - dy,
          startAngle = DegToRad$1(this.startAngle),
          endAngle = DegToRad$1(this.endAngle);
        if (this.pie) {
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(startAngle) * this.radiusX, y + Math.sin(startAngle) * this.radiusY);
        }
        ctx.ellipse(x, y, this.radiusX, this.radiusY, 0, startAngle, endAngle, this.anticlockwise);
        if (this.pie) {
          ctx.lineTo(x, y);
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
    return Arc;
  }(PathBase);

  var Circle = /*#__PURE__*/function (_Arc) {
    _inherits(Circle, _Arc);
    var _super = _createSuper(Circle);
    function Circle(x, y, radius) {
      _classCallCheck(this, Circle);
      return _super.call(this, x, y, radius, radius, 0, 360);
    }
    return _createClass(Circle);
  }(Arc);

  var Curve = /*#__PURE__*/function (_PathBase) {
    _inherits(Curve, _PathBase);
    var _super = _createSuper(Curve);
    function Curve(curve) {
      var _this;
      _classCallCheck(this, Curve);
      _this = _super.call(this);
      _this.setCurve(curve);
      _this.setIterations(32);
      return _this;
    }
    _createClass(Curve, [{
      key: "curve",
      get: function get() {
        return this._curve;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._curve !== value;
        this._curve = value;
      }
    }, {
      key: "setCurve",
      value: function setCurve(curve) {
        this.curve = curve;
        return this;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._iterations !== value;
        this._iterations = value;
      }
    }, {
      key: "setIterations",
      value: function setIterations(iterations) {
        this.iterations = iterations;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        this.pathData.length = 0;
        var points = this.curve.getPoints(this.iterations);
        for (var i = 0, cnt = points.length; i < cnt; i++) {
          this.pathData.push(points[i].x, points[i].y);
        }
        this.pathData.push(points[0].x, points[0].y);
        _get(_getPrototypeOf(Curve.prototype), "updateData", this).call(this);
        return this;
      }
    }]);
    return Curve;
  }(PathBase);

  var Ellipse = /*#__PURE__*/function (_Arc) {
    _inherits(Ellipse, _Arc);
    var _super = _createSuper(Ellipse);
    function Ellipse(x, y, radiusX, radiusY) {
      _classCallCheck(this, Ellipse);
      return _super.call(this, x, y, radiusX, radiusY, 0, 360);
    }
    return _createClass(Ellipse);
  }(Arc);

  var Line = /*#__PURE__*/function (_PathBase) {
    _inherits(Line, _PathBase);
    var _super = _createSuper(Line);
    function Line(x0, y0, x1, y1) {
      var _this;
      _classCallCheck(this, Line);
      if (x0 === undefined) {
        x0 = 0;
      }
      if (y0 === undefined) {
        y0 = 0;
      }
      if (x1 === undefined) {
        x1 = 0;
      }
      if (y1 === undefined) {
        y1 = 0;
      }
      _this = _super.call(this);
      _this.setP0(x0, y0);
      _this.setP1(x1, y1);
      return _this;
    }
    _createClass(Line, [{
      key: "x0",
      get: function get() {
        return this._x0;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x0 !== value;
        this._x0 = value;
      }
    }, {
      key: "y0",
      get: function get() {
        return this._y0;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y0 !== value;
        this._y0 = value;
      }
    }, {
      key: "setP0",
      value: function setP0(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
      }
    }, {
      key: "x1",
      get: function get() {
        return this._x1;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x1 !== value;
        this._x1 = value;
      }
    }, {
      key: "y1",
      get: function get() {
        return this._y1;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y1 !== value;
        this._y1 = value;
      }
    }, {
      key: "setP1",
      value: function setP1(x, y) {
        this.x1 = x;
        this.y1 = y;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        this.pathData.length = 0;
        this.pathData.push(this.x0, this.y0);
        this.pathData.push(this.x1, this.y1);
        this.pathData.push(this.x0, this.y0);
        _get(_getPrototypeOf(Line.prototype), "updateData", this).call(this);
        return this;
      }
    }]);
    return Line;
  }(PathBase);

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

  // import CubicBezierInterpolation from '../../utils/math/interpolation/CubicBezierInterpolation.js';

  var CubicBezierInterpolation = Phaser.Math.Interpolation.CubicBezier;
  var CubicBezierCurveTo = function CubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y, iterations, pathData) {
    var pathDataCnt = pathData.length;
    var p0x = pathData[pathDataCnt - 2];
    var p0y = pathData[pathDataCnt - 1];
    for (var i = 1, last = iterations - 1; i <= last; i++) {
      var t = i / last;
      pathData.push(CubicBezierInterpolation(t, p0x, cx0, cx1, x), CubicBezierInterpolation(t, p0y, cy0, cy1, y));
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
      CubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y, this.iterations, this.pathData);
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

  var DegToRad = Phaser.Math.DegToRad;
  var PointRotateAround = Phaser.Math.RotateAround;
  var TransformPointsMethods = {
    rotateAround: function rotateAround(centerX, centerY, angle) {
      if (this.pathData.length === 0) {
        return this;
      }
      angle = DegToRad(angle);
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
  var Wrap = Phaser.Math.Wrap;
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
    return Wrap(t, 0, 1);
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

  var GetTint$1 = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;
  var Rectangle = /*#__PURE__*/function (_BaseGeom) {
    _inherits(Rectangle, _BaseGeom);
    var _super = _createSuper(Rectangle);
    function Rectangle(x, y, width, height) {
      var _this;
      _classCallCheck(this, Rectangle);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (width === undefined) {
        width = 0;
      }
      if (height === undefined) {
        height = width;
      }
      _this = _super.call(this);
      _this.pathData = [];
      _this.closePath = true;
      _this.setTopLeftPosition(x, y);
      _this.setSize(width, height);
      return _this;
    }
    _createClass(Rectangle, [{
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x !== value;
        this._x = value;
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y !== value;
        this._y = value;
      }
    }, {
      key: "setTopLeftPosition",
      value: function setTopLeftPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._width !== value;
        this._width = value;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._height !== value;
        this._height = value;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "centerX",
      get: function get() {
        return this.x + this.width / 2;
      },
      set: function set(value) {
        this.x = value - this.width / 2;
      }
    }, {
      key: "centerY",
      get: function get() {
        return this.y + this.height / 2;
      },
      set: function set(value) {
        this.y = value - this.height / 2;
      }
    }, {
      key: "setCenterPosition",
      value: function setCenterPosition(x, y) {
        this.centerX = x;
        this.centerY = y;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        this.pathData.length = 0;
        var x0 = this.x,
          x1 = x0 + this.width,
          y0 = this.y,
          y1 = y0 + this.height;
        this.pathData.push(x0, y0);
        this.pathData.push(x1, y0);
        this.pathData.push(x1, y1);
        this.pathData.push(x0, y1);
        this.pathData.push(x0, y0);
        _get(_getPrototypeOf(Rectangle.prototype), "updateData", this).call(this);
        return this;
      }
    }, {
      key: "webglRender",
      value: function webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
          var fillTint = pipeline.fillTint;
          var fillTintColor = GetTint$1(this.fillColor, this.fillAlpha * alpha);
          fillTint.TL = fillTintColor;
          fillTint.TR = fillTintColor;
          fillTint.BL = fillTintColor;
          fillTint.BR = fillTintColor;
          pipeline.batchFillRect(-dx + this.x, -dy + this.y, this.width, this.height);
        }
        if (this.isStroked) {
          StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
      }
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {
        if (this.isFilled) {
          FillStyleCanvas(ctx, this);
          ctx.fillRect(-dx, -dy, this.width, this.height);
        }
        if (this.isStroked) {
          LineStyleCanvas(ctx, this);
          ctx.beginPath();
          ctx.rect(-dx, -dy, this.width, this.height);
          ctx.stroke();
        }
      }
    }]);
    return Rectangle;
  }(BaseGeom);

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var RoundRectangle = /*#__PURE__*/function (_PathBase) {
    _inherits(RoundRectangle, _PathBase);
    var _super = _createSuper(RoundRectangle);
    function RoundRectangle(x, y, width, height, radius, iterations) {
      var _this;
      _classCallCheck(this, RoundRectangle);
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (width === undefined) {
        width = 0;
      }
      if (height === undefined) {
        height = width;
      }
      if (radius === undefined) {
        radius = 0;
      }
      if (iterations === undefined) {
        iterations = 6;
      }
      _this = _super.call(this);
      _this.setTopLeftPosition(x, y);
      _this.setSize(width, height);
      _this.setRadius(radius);
      _this.setIterations(iterations);
      _this.closePath = true;
      return _this;
    }
    _createClass(RoundRectangle, [{
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x !== value;
        this._x = value;
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y !== value;
        this._y = value;
      }
    }, {
      key: "setTopLeftPosition",
      value: function setTopLeftPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._width !== value;
        this._width = value;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._height !== value;
        this._height = value;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "centerX",
      get: function get() {
        return this.x + this.width / 2;
      },
      set: function set(value) {
        this.x = value - this.width / 2;
      }
    }, {
      key: "centerY",
      get: function get() {
        return this.y + this.height / 2;
      },
      set: function set(value) {
        this.y = value - this.height / 2;
      }
    }, {
      key: "setCenterPosition",
      value: function setCenterPosition(x, y) {
        this.centerX = x;
        this.centerY = y;
        return this;
      }
    }, {
      key: "radiusTL",
      get: function get() {
        return this._radiusTL;
      },
      set: function set(value) {
        var isConvex = value > 0;
        this.dirty = this.dirty || this._radiusTL !== value || this._convexTL !== isConvex;
        this._convexTL = isConvex;
        this._radiusTL = Math.abs(value);
      }
    }, {
      key: "radiusTR",
      get: function get() {
        return this._radiusTR;
      },
      set: function set(value) {
        var isConvex = value > 0;
        this.dirty = this.dirty || this._radiusTR !== value || this._convexTR !== isConvex;
        this._convexTR = isConvex;
        this._radiusTR = Math.abs(value);
      }
    }, {
      key: "radiusBL",
      get: function get() {
        return this._radiusBL;
      },
      set: function set(value) {
        var isConvex = value > 0;
        this.dirty = this.dirty || this._radiusBL !== value || this._convexBL !== isConvex;
        this._convexBL = isConvex;
        this._radiusBL = Math.abs(value);
      }
    }, {
      key: "radiusBR",
      get: function get() {
        return this._radiusBR;
      },
      set: function set(value) {
        var isConvex = value > 0;
        this.dirty = this.dirty || this._radiusBR !== value || this._convexBR !== isConvex;
        this._convexBR = isConvex;
        this._radiusBR = Math.abs(value);
      }
    }, {
      key: "radius",
      get: function get() {
        return Math.max(this.radiusTL, this.radiusTR, this.radiusBL, this.radiusBR);
      },
      set: function set(value) {
        if (typeof value === 'number') {
          this.radiusTL = value;
          this.radiusTR = value;
          this.radiusBL = value;
          this.radiusBR = value;
        } else {
          this.radiusTL = GetValue$4(value, 'tl', 0);
          this.radiusTR = GetValue$4(value, 'tr', 0);
          this.radiusBL = GetValue$4(value, 'bl', 0);
          this.radiusBR = GetValue$4(value, 'br', 0);
        }
      }
    }, {
      key: "setRadius",
      value: function setRadius(radius) {
        if (radius === undefined) {
          radius = 0;
        }
        this.radius = radius;
        return this;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._iterations !== value;
        this._iterations = value;
      }
    }, {
      key: "setIterations",
      value: function setIterations(iterations) {
        this.iterations = iterations;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        var pathData = this.pathData;
        pathData.length = 0;
        var width = this.width,
          height = this.height,
          radius,
          iterations = this.iterations + 1;

        // top-left
        radius = this.radiusTL;
        if (radius > 0) {
          if (this._convexTL) {
            var centerX = radius;
            var centerY = radius;
            ArcTo(centerX, centerY, radius, radius, 180, 270, false, iterations, pathData);
          } else {
            var centerX = 0;
            var centerY = 0;
            ArcTo(centerX, centerY, radius, radius, 90, 0, true, iterations, pathData);
          }
        } else {
          LineTo(0, 0, pathData);
        }

        // top-right
        radius = this.radiusTR;
        if (radius > 0) {
          if (this._convexTR) {
            var centerX = width - radius;
            var centerY = radius;
            ArcTo(centerX, centerY, radius, radius, 270, 360, false, iterations, pathData);
          } else {
            var centerX = width;
            var centerY = 0;
            ArcTo(centerX, centerY, radius, radius, 180, 90, true, iterations, pathData);
          }
        } else {
          LineTo(width, 0, pathData);
        }

        // bottom-right
        radius = this.radiusBR;
        if (radius > 0) {
          if (this._convexBR) {
            var centerX = width - radius;
            var centerY = height - radius;
            ArcTo(centerX, centerY, radius, radius, 0, 90, false, iterations, pathData);
          } else {
            var centerX = width;
            var centerY = height;
            ArcTo(centerX, centerY, radius, radius, 270, 180, true, iterations, pathData);
          }
        } else {
          LineTo(width, height, pathData);
        }

        // bottom-left
        radius = this.radiusBL;
        if (radius > 0) {
          if (this._convexBL) {
            var centerX = radius;
            var centerY = height - radius;
            ArcTo(centerX, centerY, radius, radius, 90, 180, false, iterations, pathData);
          } else {
            var centerX = 0;
            var centerY = height;
            ArcTo(centerX, centerY, radius, radius, 360, 270, true, iterations, pathData);
          }
        } else {
          LineTo(0, height, pathData);
        }
        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        Offset(this.x, this.y, pathData);
        _get(_getPrototypeOf(RoundRectangle.prototype), "updateData", this).call(this);
        return this;
      }
    }]);
    return RoundRectangle;
  }(PathBase);

  var GetTint = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;
  var Triangle = /*#__PURE__*/function (_BaseGeom) {
    _inherits(Triangle, _BaseGeom);
    var _super = _createSuper(Triangle);
    function Triangle(x0, y0, x1, y1, x2, y2) {
      var _this;
      _classCallCheck(this, Triangle);
      if (x0 === undefined) {
        x0 = 0;
      }
      if (y0 === undefined) {
        y0 = 0;
      }
      if (x1 === undefined) {
        x1 = 0;
      }
      if (y1 === undefined) {
        y1 = 0;
      }
      if (x2 === undefined) {
        x2 = 0;
      }
      if (y2 === undefined) {
        y2 = 0;
      }
      _this = _super.call(this);
      _this.pathData = [];
      _this.closePath = true;
      _this.setP0(x0, y0);
      _this.setP1(x1, y1);
      _this.setP2(x2, y2);
      return _this;
    }
    _createClass(Triangle, [{
      key: "x0",
      get: function get() {
        return this._x0;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x0 !== value;
        this._x0 = value;
      }
    }, {
      key: "y0",
      get: function get() {
        return this._y0;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y0 !== value;
        this._y0 = value;
      }
    }, {
      key: "setP0",
      value: function setP0(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
      }
    }, {
      key: "x1",
      get: function get() {
        return this._x1;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x1 !== value;
        this._x1 = value;
      }
    }, {
      key: "y1",
      get: function get() {
        return this._y1;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y1 !== value;
        this._y1 = value;
      }
    }, {
      key: "setP1",
      value: function setP1(x, y) {
        this.x1 = x;
        this.y1 = y;
        return this;
      }
    }, {
      key: "x2",
      get: function get() {
        return this._x2;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._x2 !== value;
        this._x2 = value;
      }
    }, {
      key: "y2",
      get: function get() {
        return this._y2;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._y2 !== value;
        this._y2 = value;
      }
    }, {
      key: "setP2",
      value: function setP2(x, y) {
        this.dirty = this.dirty || this.x2 !== x || this.y2 !== y;
        this.x2 = x;
        this.y2 = y;
        return this;
      }
    }, {
      key: "updateData",
      value: function updateData() {
        this.pathData.length = 0;
        this.pathData.push(this.x0, this.y0);
        this.pathData.push(this.x1, this.y1);
        this.pathData.push(this.x2, this.y2);
        this.pathData.push(this.x0, this.y0);
        _get(_getPrototypeOf(Triangle.prototype), "updateData", this).call(this);
        return this;
      }
    }, {
      key: "webglRender",
      value: function webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
          var fillTintColor = GetTint(this.fillColor, this.fillAlpha * alpha);
          var x0 = this.x0 - dx;
          var y0 = this.y0 - dy;
          var x1 = this.x1 - dx;
          var y1 = this.y1 - dy;
          var x2 = this.x2 - dx;
          var y2 = this.y2 - dy;
          var tx0 = calcMatrix.getX(x0, y0);
          var ty0 = calcMatrix.getY(x0, y0);
          var tx1 = calcMatrix.getX(x1, y1);
          var ty1 = calcMatrix.getY(x1, y1);
          var tx2 = calcMatrix.getX(x2, y2);
          var ty2 = calcMatrix.getY(x2, y2);
          pipeline.batchTri(tx0, ty0, tx1, ty1, tx2, ty2, fillTintColor, fillTintColor, fillTintColor);
        }
        if (this.isStroked) {
          StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
      }
    }, {
      key: "canvasRender",
      value: function canvasRender(ctx, dx, dy) {
        var x1 = this.x1 - dx;
        var y1 = this.y1 - dy;
        var x2 = this.x2 - dx;
        var y2 = this.y2 - dy;
        var x3 = this.x3 - dx;
        var y3 = this.y3 - dy;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
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
    return Triangle;
  }(BaseGeom);

  var ShapeClasses = {
    arc: Arc,
    circle: Circle,
    curve: Curve,
    ellipse: Ellipse,
    line: Line,
    lines: Lines,
    rectangle: Rectangle,
    roundRectangle: RoundRectangle,
    triangle: Triangle
  };
  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
  var ClearAll = function ClearAll() {
    var shapes = this.getShapes();
    for (var i = 0, cnt = shapes.length; i < cnt; i++) {
      shapes[i].lineStyle().fillStyle();
    }
  };
  var ShapesUpdateMethods = {
    createShape: function createShape(shapeType, name) {
      var ShapeClass = ShapeClasses[shapeType];
      var shape = new ShapeClass();
      if (name) {
        shape.setName(name);
      }
      return shape;
    },
    buildShapes: function buildShapes(config) {
      var createCallback = GetValue$3(config, 'create', undefined);
      if (IsPlainObject$2(createCallback)) {
        var shapes = createCallback;
        for (var shapeType in shapes) {
          var name = shapes[shapeType];
          switch (_typeof(name)) {
            case 'number':
              for (var i = 0; i < name; i++) {
                this.addShape(this.createShape(shapeType));
              }
              break;
            case 'string':
              this.addShape(this.createShape(shapeType, name));
              break;
            default:
              //Array
              var names = name;
              for (var i = 0, cnt = names.length; i < cnt; i++) {
                this.addShape(this.createShape(shapeType, names[i]));
              }
              break;
          }
        }
      } else if (Array.isArray(createCallback)) {
        var shapes = createCallback;
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
          var shape = shapes[i];
          this.addShape(this.createShape(shape.type, shape.name));
        }
      } else if (typeof createCallback === 'function') {
        createCallback.call(this);
      }
      this.setUpdateShapesCallback(GetValue$3(config, 'update'));
    },
    setUpdateShapesCallback: function setUpdateShapesCallback(callback) {
      if (callback === undefined) {
        callback = ClearAll;
      }
      this.dirty = this.dirty || this.updateCallback !== callback;
      this.updateCallback = callback;
      return this;
    },
    updateShapes: function updateShapes() {
      this.updateCallback.call(this);
    }
  };

  var TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
  var TransformXY = Phaser.Math.TransformXY;
  var WorldXYToGameObjectLocalXY = function WorldXYToGameObjectLocalXY(gameObject, worldX, worldY, camera, out) {
    if (camera === undefined) {
      camera = gameObject.scene.cameras.main;
    }
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globOut;
    }
    var csx = camera.scrollX;
    var csy = camera.scrollY;
    var px = worldX + csx * gameObject.scrollFactorX - csx;
    var py = worldY + csy * gameObject.scrollFactorY - csy;
    if (gameObject.parentContainer) {
      if (tempMatrix === undefined) {
        tempMatrix = new TransformMatrix();
        parentMatrix = new TransformMatrix();
      }
      gameObject.getWorldTransformMatrix(tempMatrix, parentMatrix);
      tempMatrix.applyInverse(px, py, out);
    } else {
      TransformXY(px, py, gameObject.x, gameObject.y, gameObject.rotation, gameObject.scaleX, gameObject.scaleY, out);
    }
    out.x += gameObject.displayOriginX;
    out.y += gameObject.displayOriginY;
    return out;
  };
  var tempMatrix, parentMatrix;
  var globOut = {};

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
  var CustomShapes = /*#__PURE__*/function (_BaseShapes) {
    _inherits(CustomShapes, _BaseShapes);
    var _super = _createSuper(CustomShapes);
    function CustomShapes(scene, x, y, width, height, config) {
      var _this;
      _classCallCheck(this, CustomShapes);
      if (IsPlainObject$1(x)) {
        config = x;
        x = GetValue$2(config, 'x', 0);
        y = GetValue$2(config, 'y', 0);
        width = GetValue$2(config, 'width', 2);
        height = GetValue$2(config, 'height', 2);
      }
      _this = _super.call(this, scene, x, y, width, height);
      _this.type = GetValue$2(config, 'type', 'rexCustomShapes');
      _this.buildShapes(config);
      return _this;
    }
    _createClass(CustomShapes, [{
      key: "centerX",
      get: function get() {
        return this.width / 2;
      }
    }, {
      key: "centerY",
      get: function get() {
        return this.height / 2;
      }
    }, {
      key: "worldToLocalXY",
      value: function worldToLocalXY(worldX, worldY, camera, out) {
        if (typeof camera === 'boolean') {
          out = camera;
          camera = undefined;
        }
        return WorldXYToGameObjectLocalXY(this, worldX, worldY, camera, out);
      }
    }]);
    return CustomShapes;
  }(BaseShapes);
  Object.assign(CustomShapes.prototype, ShapesUpdateMethods);

  var Linear = Phaser.Math.Linear;
  var Percent$1 = Phaser.Math.Percent;
  var ProgressValueMethods = {
    setValue: function setValue(value, min, max) {
      if (value === undefined || value === null) {
        return this;
      }
      if (min !== undefined) {
        value = Percent$1(value, min, max);
      }
      this.value = value;
      return this;
    },
    addValue: function addValue(inc, min, max) {
      if (min !== undefined) {
        inc = Percent$1(inc, min, max);
      }
      this.value += inc;
      return this;
    },
    getValue: function getValue(min, max) {
      var value = this.value;
      if (min !== undefined) {
        value = Linear(min, max, value);
      }
      return value;
    }
  };

  var Percent = Phaser.Math.Percent;
  var SetEaseValuePropName = function SetEaseValuePropName(name) {
    this.easeValuePropName = name;
    return this;
  };
  var SetEaseValueDuration = function SetEaseValueDuration(duration) {
    this.easeValueDuration = duration;
    return this;
  };
  var SetEaseValueFunction = function SetEaseValueFunction(ease) {
    this.easeFunction = ease;
    return this;
  };
  var StopEaseValue = function StopEaseValue() {
    if (this.easeValueTask) {
      this.easeValueTask.stop();
    }
    return this;
  };
  var EaseValueTo = function EaseValueTo(value, min, max) {
    if (value === undefined || value === null) {
      return this;
    }
    if (min !== undefined) {
      value = Percent(value, min, max);
    }
    if (this.easeValueTask === undefined) {
      this.easeValueTask = new EaseValueTask(this, {
        eventEmitter: null
      });
    }
    this.easeValueTask.restart({
      key: this.easeValuePropName,
      to: value,
      duration: this.easeValueDuration,
      ease: this.easeFunction
    });
    return this;
  };
  var EaseValueRepeat = function EaseValueRepeat(from, to, repeat, repeatDelay) {
    if (repeat === undefined) {
      repeat = -1;
    }
    if (repeatDelay === undefined) {
      repeatDelay = 0;
    }
    if (this.easeValueTask === undefined) {
      this.easeValueTask = new EaseValueTask(this, {
        eventEmitter: null
      });
    }
    this.easeValueTask.restart({
      key: this.easeValuePropName,
      from: from,
      to: to,
      duration: this.easeValueDuration,
      ease: this.easeFunction,
      repeat: repeat,
      repeatDelay: repeatDelay
    });
    return this;
  };
  var EaseValueMethods = {
    setEaseValuePropName: SetEaseValuePropName,
    setEaseValueDuration: SetEaseValueDuration,
    setEaseValueFunction: SetEaseValueFunction,
    stopEaseValue: StopEaseValue,
    easeValueTo: EaseValueTo,
    easeValueRepeat: EaseValueRepeat
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;
  function ProgressBase (BaseClass) {
    var ProgressBase = /*#__PURE__*/function (_BaseClass) {
      _inherits(ProgressBase, _BaseClass);
      var _super = _createSuper(ProgressBase);
      function ProgressBase() {
        _classCallCheck(this, ProgressBase);
        return _super.apply(this, arguments);
      }
      _createClass(ProgressBase, [{
        key: "bootProgressBase",
        value: function bootProgressBase(config) {
          this.eventEmitter = GetValue$1(config, 'eventEmitter', this);
          var callback = GetValue$1(config, 'valuechangeCallback', null);
          if (callback !== null) {
            var scope = GetValue$1(config, 'valuechangeCallbackScope', undefined);
            this.eventEmitter.on('valuechange', callback, scope);
          }
          this.setEaseValuePropName('value').setEaseValueDuration(GetValue$1(config, 'easeValue.duration', 0)).setEaseValueFunction(GetValue$1(config, 'easeValue.ease', 'Linear'));
          return this;
        }
      }, {
        key: "value",
        get: function get() {
          return this._value;
        },
        set: function set(value) {
          value = Clamp(value, 0, 1);
          var oldValue = this._value;
          var valueChanged = oldValue != value;
          this.dirty = this.dirty || valueChanged;
          this._value = value;
          if (valueChanged) {
            this.eventEmitter.emit('valuechange', this._value, oldValue, this.eventEmitter);
          }
        }
      }]);
      return ProgressBase;
    }(BaseClass);
    Object.assign(ProgressBase.prototype, ProgressValueMethods, EaseValueMethods);
    return ProgressBase;
  }

  var GetValue = Phaser.Utils.Objects.GetValue;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var CustomProgress = /*#__PURE__*/function (_ProgressBase) {
    _inherits(CustomProgress, _ProgressBase);
    var _super = _createSuper(CustomProgress);
    function CustomProgress(scene, x, y, width, height, config) {
      var _this;
      _classCallCheck(this, CustomProgress);
      if (IsPlainObject(x)) {
        config = x;
        x = GetValue(config, 'x', 0);
        y = GetValue(config, 'y', 0);
        width = GetValue(config, 'width', 2);
        height = GetValue(config, 'height', 2);
      }
      if (config === undefined) {
        config = {};
      }
      if (!config.type) {
        config.type = 'rexCustomProgress';
      }
      _this = _super.call(this, scene, x, y, width, height, config);
      _this.bootProgressBase(config);
      _this.setValue(GetValue(config, 'value', 0));
      return _this;
    }
    _createClass(CustomProgress, [{
      key: "centerX",
      get: function get() {
        return this.width / 2;
      }
    }, {
      key: "centerY",
      get: function get() {
        return this.height / 2;
      }
    }, {
      key: "radius",
      get: function get() {
        return Math.min(this.centerX, this.centerY);
      }
    }]);
    return CustomProgress;
  }(ProgressBase(CustomShapes));

  var CreateMask$5 = function CreateMask(scene) {
    var maskGameObject = new CustomProgress(scene, {
      type: 'Graphics',
      create: [{
        name: 'rect',
        type: 'rectangle'
      }],
      update: function update() {
        var rect = this.getShape('rect').fillStyle(0xffffff);
        var t = 1 - this.value;
        switch (this.wipeMode) {
          case 'right':
            rect.setSize(this.width * t, this.height).setTopLeftPosition(this.width - rect.width, 0);
            break;
          case 'left':
            rect.setSize(this.width * t, this.height).setTopLeftPosition(0, 0);
            break;
          case 'down':
            rect.setSize(this.width, this.height * t).setTopLeftPosition(0, this.height - rect.height);
            break;
          case 'up':
            rect.setSize(this.width, this.height * t).setTopLeftPosition(0, 0);
            break;
        }
      }
    });
    return maskGameObject;
  };
  var AddWipeModes = function AddWipeModes(image) {
    var maskGameObject = CreateMask$5(image.scene);
    image.once('destroy', function () {
      maskGameObject.destroy();
    }).addTransitionMode(WipeRight, {
      ease: 'Linear',
      dir: 'out',
      mask: maskGameObject,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        parent.setCurrentImageMaskEnable(true);
        parent.maskGameObject.wipeMode = 'right';
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        parent.maskGameObject.setValue(t);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.removeMaskGameObject(false);
      }
    }).addTransitionMode(WipeLeft, {
      ease: 'Linear',
      dir: 'out',
      mask: maskGameObject,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        parent.setCurrentImageMaskEnable(true);
        parent.maskGameObject.wipeMode = 'left';
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        parent.maskGameObject.setValue(t);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.removeMaskGameObject(false);
      }
    }).addTransitionMode(WipeDown, {
      ease: 'Linear',
      dir: 'out',
      mask: maskGameObject,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        parent.setCurrentImageMaskEnable(true);
        parent.maskGameObject.wipeMode = 'down';
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        parent.maskGameObject.setValue(t);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.removeMaskGameObject(false);
      }
    }).addTransitionMode(WipeUp, {
      ease: 'Linear',
      dir: 'out',
      mask: maskGameObject,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        parent.setCurrentImageMaskEnable(true);
        parent.maskGameObject.wipeMode = 'up';
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        parent.maskGameObject.setValue(t);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.removeMaskGameObject(false);
      }
    });
  };

  var CreateMask$4 = function CreateMask(scene) {
    var maskGameObject = new CustomProgress(scene, {
      type: 'Graphics',
      create: [{
        name: 'rect',
        type: 'rectangle'
      }],
      update: function update() {
        this.getShape('rect').fillStyle(0xffffff).setSize(this.width * this.value, this.height * this.value).setCenterPosition(this.centerX, this.centerY);
      }
    });
    return maskGameObject;
  };
  var AddIrisModes = function AddIrisModes(image) {
    var maskGameObject = CreateMask$4(image.scene);
    image.once('destroy', function () {
      maskGameObject.destroy();
    }).addTransitionMode(IrisOut, {
      ease: 'Linear',
      dir: 'out',
      mask: maskGameObject,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        parent.setCurrentImageMaskEnable(true, true);
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        parent.maskGameObject.setValue(t);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.removeMaskGameObject(false);
      }
    }).addTransitionMode(IrisIn, {
      ease: 'Linear',
      dir: 'out',
      mask: maskGameObject,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        parent.setCurrentImageMaskEnable(true);
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        parent.maskGameObject.setValue(1 - t);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.removeMaskGameObject(false);
      }
    });
  };

  var CreateMask$3 = function CreateMask(scene) {
    var maskGameObject = new CustomProgress(scene, {
      type: 'Graphics',
      create: [{
        name: 'pie',
        type: 'arc'
      }],
      update: function update() {
        var radius = Math.max(this.width, this.height) * 2;
        var deltaAngle = 90 * this.value;
        this.getShape('pie').fillStyle(0xffffff).setCenterPosition(this.centerX, 0).setRadius(radius).setAngle(90 - deltaAngle, 90 + deltaAngle).setPie();
      }
    });
    return maskGameObject;
  };
  var AddPieModes = function AddPieModes(image) {
    var maskGameObject = CreateMask$3(image.scene);
    image.once('destroy', function () {
      maskGameObject.destroy();
    }).addTransitionMode(PieOut, {
      ease: 'Linear',
      dir: 'out',
      mask: maskGameObject,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        parent.setCurrentImageMaskEnable(true, true);
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        parent.maskGameObject.setValue(t);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.removeMaskGameObject(false);
      }
    }).addTransitionMode(PieIn, {
      ease: 'Linear',
      dir: 'out',
      mask: maskGameObject,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        parent.setCurrentImageMaskEnable(true);
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        parent.maskGameObject.setValue(1 - t);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.removeMaskGameObject(false);
      }
    });
  };

  var CreateMask$2 = function CreateMask(scene, columns) {
    var maskGameObject = new CustomProgress(scene, {
      type: 'Graphics',
      create: {
        rectangle: columns
      },
      update: function update() {
        var shapes = this.getShapes();
        var shapeWidth = this.width / columns;
        for (var i = 0; i < columns; i++) {
          shapes[i].fillStyle(0xffffff).setSize(shapeWidth * this.value, this.height).setTopLeftPosition(shapeWidth * i, 0);
        }
      }
    });
    return maskGameObject;
  };
  var AddBlindsModes$1 = function AddBlindsModes(image) {
    var maskGameObject = CreateMask$2(image.scene, 10);
    image.once('destroy', function () {
      maskGameObject.destroy();
    }).addTransitionMode(Blinds, {
      ease: 'Linear',
      dir: 'out',
      mask: maskGameObject,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        parent.setCurrentImageMaskEnable(true, true);
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        parent.maskGameObject.setValue(t);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.removeMaskGameObject(false);
      }
    });
  };

  var CreateMask$1 = function CreateMask(scene, columns, rows) {
    var maskGameObject = new CustomProgress(scene, {
      type: 'Graphics',
      create: {
        rectangle: columns * rows
      },
      update: function update() {
        var shapes = this.getShapes();
        var shapeWidth = this.width / columns,
          shapeHeight = this.height / rows;
        for (var r = 0; r < rows; r++) {
          for (var c = 0; c < columns; c++) {
            shapes[c * rows + r].fillStyle(0xffffff).setSize(shapeWidth * this.value, shapeHeight * this.value).setCenterPosition(shapeWidth * (c + 0.5), shapeHeight * (r + 0.5));
          }
        }
      }
    });
    return maskGameObject;
  };
  var AddBlindsModes = function AddBlindsModes(image) {
    var maskGameObject = CreateMask$1(image.scene, Math.ceil(image.width / 40), Math.ceil(image.height / 40));
    image.once('destroy', function () {
      maskGameObject.destroy();
    }).addTransitionMode(Squares, {
      ease: 'Linear',
      dir: 'out',
      mask: maskGameObject,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        parent.setCurrentImageMaskEnable(true, true);
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        parent.maskGameObject.setValue(t);
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.removeMaskGameObject(false);
      }
    });
  };

  var CreateMask = function CreateMask(scene, columns) {
    var maskGameObject = new CustomProgress(scene, {
      type: 'Graphics',
      create: {
        lines: columns
      },
      update: function update() {
        var shapes = this.getShapes();
        var shapeWidth = this.width / columns;
        var radius = shapeWidth / 2;
        for (var i = 0; i < columns; i++) {
          var leftX = shapeWidth * i;
          var bottomY = this.height * this.value;
          var centerX = leftX + radius;
          shapes[i].fillStyle(0xffffff).start(leftX, 0).horizontalLineTo(bottomY).arc(centerX, bottomY, radius, 180, 0, true).horizontalLineTo(-bottomY).lineTo(leftX, 0).close();
        }
      }
    });
    return maskGameObject;
  };
  var AddCurtainMode = function AddCurtainMode(image) {
    var maskGameObject = CreateMask(image.scene, 10);
    image.once('destroy', function () {
      maskGameObject.destroy();
    }).addTransitionMode(Curtain, {
      ease: 'Linear',
      dir: 'out',
      mask: maskGameObject,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        parent.setCurrentImageMaskEnable(true, true);
        parent.setNextImageMaskEnable(true, true);
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        if (t < 0.5) {
          if (nextImage.visible) {
            parent.setChildVisible(nextImage, false);
          }
          t = Yoyo(t);
          parent.maskGameObject.setValue(t);
        } else {
          if (currentImage.visible) {
            parent.setChildVisible(currentImage, false);
          }
          if (!nextImage.visible) {
            parent.setChildVisible(nextImage, true);
          }
          t = Yoyo(t);
          parent.maskGameObject.setValue(t);
        }
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        parent.removeMaskGameObject(false);
        parent.setChildVisible(currentImage, true);
      }
    });
  };

  var AddPixellateMode = function AddPixellateMode(image) {
    image.addTransitionMode(Pixellate, {
      ease: 'Linear',
      dir: 'out',
      mask: false,
      onStart: function onStart(parent, currentImage, nextImage, t) {
        currentImage.effect = currentImage.preFX.addPixelate(0);
        nextImage.effect = nextImage.preFX.addPixelate(0);
      },
      onProgress: function onProgress(parent, currentImage, nextImage, t) {
        if (t < 0.5) {
          t = Yoyo(t);
          var maxAmount = Math.min(currentImage.width, currentImage.height) / 5;
          currentImage.effect.amount = Math.ceil(maxAmount * t);
        } else {
          if (currentImage.visible) {
            parent.setChildVisible(currentImage, false);
          }
          t = Yoyo(t);
          var maxAmount = Math.min(nextImage.width, nextImage.height) / 5;
          nextImage.effect.amount = Math.ceil(maxAmount * t);
        }
      },
      onComplete: function onComplete(parent, currentImage, nextImage, t) {
        currentImage.preFX.remove(currentImage.effect);
        delete currentImage.effect;
        parent.setChildVisible(currentImage, true);
        nextImage.preFX.remove(nextImage.effect);
        delete nextImage.effect;
      }
    });
  };

  var Modes = [AddSlideAwayModes, AddSlideModes, AddSliderModes, AddZoomModes, AddFadeModes, AddIrisModes, AddPieModes, AddWipeModes, AddBlindsModes$1, AddBlindsModes, AddCurtainMode, AddPixellateMode];

  var TransitionImagePack = /*#__PURE__*/function (_Base) {
    _inherits(TransitionImagePack, _Base);
    var _super = _createSuper(TransitionImagePack);
    function TransitionImagePack(scene, x, y, texture, frame, config) {
      var _this;
      _classCallCheck(this, TransitionImagePack);
      _this = _super.call(this, scene, x, y, texture, frame, config);
      for (var i = 0, cnt = Modes.length; i < cnt; i++) {
        Modes[i](_assertThisInitialized(_this));
      }
      return _this;
    }
    return _createClass(TransitionImagePack);
  }(TransitionImage);

  function Factory (x, y, texture, frame, config) {
    var gameObject = new TransitionImagePack(this.scene, x, y, texture, frame, config);
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
    var key = GetAdvancedValue(config, 'key', null);
    var frame = GetAdvancedValue(config, 'frame', null);
    var gameObject = new TransitionImagePack(this.scene, 0, 0, key, frame, config);
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

  var TransitionImagePackPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(TransitionImagePackPlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(TransitionImagePackPlugin);
    function TransitionImagePackPlugin(pluginManager) {
      var _this;
      _classCallCheck(this, TransitionImagePackPlugin);
      _this = _super.call(this, pluginManager);

      //  Register our new Game Object type
      pluginManager.registerGameObject('rexTransitionImagePack', Factory, Creator);
      return _this;
    }
    _createClass(TransitionImagePackPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return TransitionImagePackPlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.GameObjects.TransitionImagePack', TransitionImagePack);

  return TransitionImagePackPlugin;

}));
