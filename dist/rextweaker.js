(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextweaker = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
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
      Object.defineProperty(target, descriptor.key, descriptor);
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

  var Zone$1 = Phaser.GameObjects.Zone;
  var AddItem = Phaser.Utils.Array.Add;
  var RemoveItem$8 = Phaser.Utils.Array.Remove;
  var Base$2 = /*#__PURE__*/function (_Zone) {
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
        RemoveItem$8(this.children, gameObjects,
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
  }(Zone$1);
  var Components$1 = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Base$2, [Components$1.Alpha, Components$1.Flip]);

  var GetParent$1 = function GetParent(gameObject, name) {
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
  var GetTopmostParent$1 = function GetTopmostParent(gameObject) {
    var parent = GetParent$1(gameObject);
    while (parent) {
      gameObject = parent;
      parent = GetParent$1(parent);
    }
    return gameObject;
  };

  var DegToRad$6 = Phaser.Math.DegToRad;
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
        visible: true,
        active: true
      };
      Object.defineProperty(rexContainer, 'angle', {
        get: function get() {
          return RadToDeg$3(this.rotation);
        },
        set: function set(value) {
          this.rotation = DegToRad$6(value);
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
      return GetParent$1(gameObject, name);
    },
    getTopmostParent: function getTopmostParent(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }
      return GetTopmostParent$1(gameObject);
    }
  };

  var GetValue$1s = Phaser.Utils.Objects.GetValue;
  var BaseAdd = Base$2.prototype.add;
  var Add$6 = function Add(gameObject, config) {
    this.setParent(gameObject);
    var state = GetLocalState(gameObject);
    SetupSyncFlags(state, config);
    this.resetChildState(gameObject) // Reset local state of child
    .updateChildVisible(gameObject) // Apply parent's visible to child
    .updateChildActive(gameObject) // Apply parent's active to child
    .updateChildScrollFactor(gameObject) // Apply parent's scroll factor to child
    .updateChildMask(gameObject); // Apply parent's mask to child

    BaseAdd.call(this, gameObject);
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
    state.syncPosition = GetValue$1s(config, 'syncPosition', true);
    state.syncRotation = GetValue$1s(config, 'syncRotation', true);
    state.syncScale = GetValue$1s(config, 'syncScale', true);
    state.syncAlpha = GetValue$1s(config, 'syncAlpha', true);
  };
  var AddChild$2 = {
    // Can override this method
    add: function add(gameObject) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject);
      } else {
        Add$6.call(this, gameObject);
      }
      return this;
    },
    // Don't override this method
    pin: function pin(gameObject, config) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject, config);
      } else {
        Add$6.call(this, gameObject, config);
      }
      return this;
    },
    addMultiple: function addMultiple(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Add$6.call(this, gameObjects[i]);
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

  var BaseRemove = Base$2.prototype.remove;
  var BaseClear = Base$2.prototype.clear;
  var RemoveChild$2 = {
    // Can override this method
    remove: function remove(gameObject, destroyChild) {
      if (GetParent$1(gameObject) !== this) {
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
      if (GetParent$1(gameObject) !== this) {
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

  var RotateAround$7 = Phaser.Math.RotateAround;
  var Transform = {
    worldToLocal: function worldToLocal(point) {
      // Transform
      point.x -= this.x;
      point.y -= this.y;
      // Rotate
      RotateAround$7(point, 0, 0, -this.rotation);
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
      RotateAround$7(point, 0, 0, this.rotation);
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

  var DegToRad$5 = Phaser.Math.DegToRad;
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
      state.rotation = DegToRad$5(angle);
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

  var Scale$2 = {
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
      var parent = GetParent$1(gameObject);
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
    },
    timelineChild: function timelineChild(timelineConfig) {
      var targets = timelineConfig.targets;
      // Map child game objects to local states
      if (targets) {
        if (!Array.isArray(targets)) {
          targets = [targets];
        }
        timelineConfig.targets = GetLocalStates(targets);
      }
      var tweens = timelineConfig.tweens;
      for (var i = 0, cnt = tweens.length; i < cnt; i++) {
        tweens[i] = this.createTweenChildConfig(tweens[i]);
      }
      var timeline = this.scene.tweens.timeline(timelineConfig);
      return timeline;
    }
  };

  var AddToContainer = function AddToContainer(layer) {
    this._setParentContainerFlag = true;
    var gameObjects = this.getAllChildren([this]);
    SortGameObjectsByDepth(gameObjects);
    layer.add(gameObjects);
    this._setParentContainerFlag = false;
    return this;
  };
  var RemoveFromContainer = function RemoveFromContainer() {
    if (!this.parentContainer) {
      return this;
    }
    this._setParentContainerFlag = true;
    var gameObjects = this.getAllChildren([this]);
    SortGameObjectsByDepth(gameObjects);
    gameObjects.reverse();
    this.parentContainer.remove(gameObjects);
    this._setParentContainerFlag = false;
    return this;
  };
  var AddToContainer$1 = {
    addToLayer: AddToContainer,
    addToContainer: AddToContainer,
    removeFromContainer: RemoveFromContainer
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

  var Rectangle$3 = Phaser.Geom.Rectangle;
  var Vector2 = Phaser.Math.Vector2;
  var RotateAround$6 = Phaser.Math.RotateAround;
  var GetBounds$1 = function GetBounds(gameObject, output) {
    if (output === undefined) {
      output = new Rectangle$3();
    } else if (output === true) {
      if (GlobRect$2 === undefined) {
        GlobRect$2 = new Rectangle$3();
      }
      output = GlobRect$2;
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
  var GlobRect$2 = undefined;
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
      RotateAround$6(output, gameObject.x, gameObject.y, gameObject.rotation);
    }
    if (includeParent && gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      parentMatrix.transformPoint(output.x, output.y, output);
    }
    return output;
  };

  var Rectangle$2 = Phaser.Geom.Rectangle;
  var Union = Phaser.Geom.Rectangle.Union;
  var GetBoundsOfGameObjects = function GetBoundsOfGameObjects(gameObjects, out) {
    if (out === undefined) {
      out = new Rectangle$2();
    } else if (out === true) {
      if (GlobRect$1 === undefined) {
        GlobRect$1 = new Rectangle$2();
      }
      out = GlobRect$1;
    }
    out.setTo(0, 0, 0, 0);
    var gameObject;
    var firstClone = true;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      gameObject = gameObjects[i];
      if (!gameObject.getBounds) {
        continue;
      }
      var boundsRect = GetBounds$1(gameObject, true);
      if (firstClone) {
        out.setTo(boundsRect.x, boundsRect.y, boundsRect.width, boundsRect.height);
        firstClone = false;
      } else {
        Union(boundsRect, out, out);
      }
    }
    return out;
  };
  var GlobRect$1;

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

  var GetValue$1r = Phaser.Utils.Objects.GetValue;
  var Snapshot = function Snapshot(config) {
    if (!config) {
      return;
    }
    var gameObjects = config.gameObjects;
    var renderTexture = config.renderTexture;
    var x = GetValue$1r(config, 'x', undefined);
    var y = GetValue$1r(config, 'y', undefined);
    var width = GetValue$1r(config, 'width', undefined);
    var height = GetValue$1r(config, 'height', undefined);
    var originX = GetValue$1r(config, 'originX', 0);
    var originY = GetValue$1r(config, 'originY', 0);
    var padding = GetValue$1r(config, 'padding', 0);
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
    var tempRT = !renderTexture;
    // Configurate render texture
    if (tempRT) {
      var scene = gameObjects[0].scene;
      renderTexture = scene.add.renderTexture(0, 0, width, height);
    }
    renderTexture.setPosition(x, y);
    if (renderTexture.width !== width || renderTexture.height !== height) {
      renderTexture.setSize(width, height);
    }
    renderTexture.setOrigin(originX, originY);
    renderTexture.camera.setScroll(scrollX, scrollY);

    // Draw gameObjects
    gameObjects = SortGameObjectsByDepth(Clone(gameObjects));
    renderTexture.draw(gameObjects);

    // Save render result to texture    
    var saveTexture = config.saveTexture;
    if (saveTexture) {
      renderTexture.saveTexture(saveTexture);
    }
    // Destroy render texture if tempRT and saveTexture
    if (tempRT && saveTexture) {
      renderTexture.destroy();
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

  var GetValue$1q = Phaser.Utils.Objects.GetValue;
  var DrawBounds$2 = function DrawBounds(gameObject, graphics, config) {
    var canDrawBound = gameObject.getBounds || gameObject.width !== undefined && gameObject.height !== undefined;
    if (!canDrawBound) {
      return;
    }
    var color, lineWidth;
    if (typeof config === 'number') {
      color = config;
    } else {
      color = GetValue$1q(config, 'color');
      lineWidth = GetValue$1q(config, 'lineWidth');
    }
    if (color === undefined) {
      color = 0xffffff;
    }
    if (lineWidth === undefined) {
      lineWidth = 1;
    }
    Points[0] = GetTopLeft(gameObject, Points[0]);
    Points[1] = GetTopRight(gameObject, Points[1]);
    Points[2] = GetBottomRight(gameObject, Points[2]);
    Points[3] = GetBottomLeft(gameObject, Points[3]);
    graphics.lineStyle(lineWidth, color).strokePoints(Points, true, true);
  };
  var Points = [undefined, undefined, undefined, undefined];

  var GetValue$1p = Phaser.Utils.Objects.GetValue;
  var DrawBounds$1 = function DrawBounds(graphics, config) {
    var drawContainer = GetValue$1p(config, 'drawContainer', true);
    var gameObjects = this.getAllVisibleChildren([this]);
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var gameObject = gameObjects[i];
      if (!drawContainer && gameObject.isRexContainerLite) {
        continue;
      }
      DrawBounds$2(gameObject, graphics, config);
    }
    return this;
  };

  var RotateAround$5 = Phaser.Math.RotateAround;
  var ChangeOrigin$1 = function ChangeOrigin(gameObject, originX, originY) {
    if (originY === undefined) {
      originY = originX;
    }
    var deltaXY = {
      x: (originX - gameObject.originX) * gameObject.displayWidth,
      y: (originY - gameObject.originY) * gameObject.displayHeight
    };
    RotateAround$5(deltaXY, 0, 0, gameObject.rotation);
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

  var methods$e = {
    changeOrigin: ChangeOrigin,
    drawBounds: DrawBounds$1
  };
  Object.assign(methods$e, Parent, AddChild$2, RemoveChild$2, ChildState, Transform, Position, Rotation, Scale$2, Visible, Alpha, Active, ScrollFactor, Mask, Depth, Children, Tween, AddToContainer$1, Layer, RenderTexture);

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
        if (!this.scene) {
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
        var parent = GetParent$1(this);
        return parent ? parent.setParentContainerFlag : false;
      }
    }], [{
      key: "GetParent",
      value: function GetParent(child) {
        return GetParent$1(child);
      }
    }]);
    return ContainerLite;
  }(Base$2);
  Object.assign(ContainerLite.prototype, methods$e);

  var GetSizerConfig$1 = function GetSizerConfig(gameObject) {
    if (!gameObject.hasOwnProperty('rexSizer')) {
      gameObject.rexSizer = {};
    }
    return gameObject.rexSizer;
  };

  function GetSizerConfig (gameObject) {
    if (gameObject === undefined) {
      gameObject = this;
    }
    return GetSizerConfig$1(gameObject);
  }

  var GetChildPrevState = function GetChildPrevState(child) {
    var childConfig = GetSizerConfig$1(child);
    if (!childConfig.hasOwnProperty('prevState')) {
      childConfig.prevState = {};
    }
    return childConfig.prevState;
  };

  var CameraClass = Phaser.Cameras.Scene2D.BaseCamera;
  var IsCameraObject = function IsCameraObject(object) {
    return object instanceof CameraClass;
  };

  var Rectangle$1 = Phaser.Geom.Rectangle;
  var GetViewport = function GetViewport(scene, camera, out) {
    if (!IsCameraObject(camera)) {
      out = camera;
      camera = undefined;
    }
    if (out === undefined) {
      out = new Rectangle$1();
    } else if (out === true) {
      out = globRect;
    }
    var scaleManager = scene.sys.scale;
    var baseSize = scaleManager.baseSize;
    var parentSize = scaleManager.parentSize;
    var canvasBounds = scaleManager.canvasBounds;
    var displayScale = scaleManager.displayScale;
    var x = canvasBounds.x >= 0 ? 0 : -(canvasBounds.x * displayScale.x);
    var y = canvasBounds.y >= 0 ? 0 : -(canvasBounds.y * displayScale.y);
    var width;
    if (parentSize.width >= canvasBounds.width) {
      width = baseSize.width;
    } else {
      width = baseSize.width - (canvasBounds.width - parentSize.width) * displayScale.x;
    }
    var height;
    if (parentSize.height >= canvasBounds.height) {
      height = baseSize.height;
    } else {
      height = baseSize.height - (canvasBounds.height - parentSize.height) * displayScale.y;
    }
    out.setTo(x, y, width, height);
    if (camera) {
      out.width /= camera.zoomX;
      out.height /= camera.zoomY;
      out.centerX = camera.centerX + camera.scrollX;
      out.centerY = camera.centerY + camera.scrollY;
    }
    return out;
  };
  var globRect = new Rectangle$1();

  var PushIntoBounds = function PushIntoBounds(bounds) {
    if (bounds === undefined) {
      bounds = GetViewport(this.scene);
    }
    this.left = Math.max(this.left, bounds.left);
    this.right = Math.min(this.right, bounds.right);
    this.top = Math.max(this.top, bounds.top);
    this.bottom = Math.min(this.bottom, bounds.bottom);
    return this;
  };

  var ALIGN$1 = Phaser.Display.Align;
  var AlignConst = {
    center: ALIGN$1.CENTER,
    left: ALIGN$1.LEFT_CENTER,
    right: ALIGN$1.RIGHT_CENTER,
    top: ALIGN$1.TOP_CENTER,
    bottom: ALIGN$1.BOTTOM_CENTER,
    'left-top': ALIGN$1.TOP_LEFT,
    'left-center': ALIGN$1.LEFT_CENTER,
    'left-bottom': ALIGN$1.BOTTOM_LEFT,
    'center-top': ALIGN$1.TOP_CENTER,
    'center-center': ALIGN$1.CENTER,
    'center-bottom': ALIGN$1.BOTTOM_CENTER,
    'right-top': ALIGN$1.TOP_RIGHT,
    'right-center': ALIGN$1.RIGHT_CENTER,
    'right-bottom': ALIGN$1.BOTTOM_RIGHT
  };

  var NOOP = function NOOP() {
    //  NOOP
  };

  var globZone = new Phaser.GameObjects.Zone({
    sys: {
      queueDepthSort: NOOP,
      events: {
        once: NOOP
      }
    }
  }, 0, 0, 1, 1);
  globZone.setOrigin(0);

  var ALIGN_CONST = {
    /**
    * A constant representing a top-left alignment or position.
    * @constant
    * @name Phaser.Display.Align.TOP_LEFT
    * @since 3.0.0
    * @type {integer}
    */
    TOP_LEFT: 0,
    /**
    * A constant representing a top-center alignment or position.
    * @constant
    * @name Phaser.Display.Align.TOP_CENTER
    * @since 3.0.0
    * @type {integer}
    */
    TOP_CENTER: 1,
    /**
    * A constant representing a top-right alignment or position.
    * @constant
    * @name Phaser.Display.Align.TOP_RIGHT
    * @since 3.0.0
    * @type {integer}
    */
    TOP_RIGHT: 2,
    /**
    * A constant representing a left-top alignment or position.
    * @constant
    * @name Phaser.Display.Align.LEFT_TOP
    * @since 3.0.0
    * @type {integer}
    */
    LEFT_TOP: 3,
    /**
    * A constant representing a left-center alignment or position.
    * @constant
    * @name Phaser.Display.Align.LEFT_CENTER
    * @since 3.0.0
    * @type {integer}
    */
    LEFT_CENTER: 4,
    /**
    * A constant representing a left-bottom alignment or position.
    * @constant
    * @name Phaser.Display.Align.LEFT_BOTTOM
    * @since 3.0.0
    * @type {integer}
    */
    LEFT_BOTTOM: 5,
    /**
    * A constant representing a center alignment or position.
    * @constant
    * @name Phaser.Display.Align.CENTER
    * @since 3.0.0
    * @type {integer}
    */
    CENTER: 6,
    /**
    * A constant representing a right-top alignment or position.
    * @constant
    * @name Phaser.Display.Align.RIGHT_TOP
    * @since 3.0.0
    * @type {integer}
    */
    RIGHT_TOP: 7,
    /**
    * A constant representing a right-center alignment or position.
    * @constant
    * @name Phaser.Display.Align.RIGHT_CENTER
    * @since 3.0.0
    * @type {integer}
    */
    RIGHT_CENTER: 8,
    /**
    * A constant representing a right-bottom alignment or position.
    * @constant
    * @name Phaser.Display.Align.RIGHT_BOTTOM
    * @since 3.0.0
    * @type {integer}
    */
    RIGHT_BOTTOM: 9,
    /**
    * A constant representing a bottom-left alignment or position.
    * @constant
    * @name Phaser.Display.Align.BOTTOM_LEFT
    * @since 3.0.0
    * @type {integer}
    */
    BOTTOM_LEFT: 10,
    /**
    * A constant representing a bottom-center alignment or position.
    * @constant
    * @name Phaser.Display.Align.BOTTOM_CENTER
    * @since 3.0.0
    * @type {integer}
    */
    BOTTOM_CENTER: 11,
    /**
    * A constant representing a bottom-right alignment or position.
    * @constant
    * @name Phaser.Display.Align.BOTTOM_RIGHT
    * @since 3.0.0
    * @type {integer}
    */
    BOTTOM_RIGHT: 12
  };

  var GetBottom = function GetBottom(gameObject) {
    var height = GetDisplayHeight(gameObject);
    return gameObject.y + height - height * gameObject.originY;
  };

  var GetCenterX = function GetCenterX(gameObject) {
    var width = GetDisplayWidth(gameObject);
    return gameObject.x - width * gameObject.originX + width * 0.5;
  };

  var SetBottom = function SetBottom(gameObject, value) {
    var height = GetDisplayHeight(gameObject);
    gameObject.y = value - height + height * gameObject.originY;
    return gameObject;
  };

  var SetCenterX = function SetCenterX(gameObject, x) {
    var width = GetDisplayWidth(gameObject);
    var offsetX = width * gameObject.originX;
    gameObject.x = x + offsetX - width * 0.5;
    return gameObject;
  };

  var BottomCenter = function BottomCenter(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetCenterX(gameObject, GetCenterX(alignIn) + offsetX);
    SetBottom(gameObject, GetBottom(alignIn) + offsetY);
    return gameObject;
  };

  var GetLeft = function GetLeft(gameObject) {
    var width = GetDisplayWidth(gameObject);
    return gameObject.x - width * gameObject.originX;
  };

  var SetLeft = function SetLeft(gameObject, value) {
    var width = GetDisplayWidth(gameObject);
    gameObject.x = value + width * gameObject.originX;
    return gameObject;
  };

  var BottomLeft = function BottomLeft(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetLeft(gameObject, GetLeft(alignIn) - offsetX);
    SetBottom(gameObject, GetBottom(alignIn) + offsetY);
    return gameObject;
  };

  var GetRight = function GetRight(gameObject) {
    var width = GetDisplayWidth(gameObject);
    return gameObject.x + width - width * gameObject.originX;
  };

  var SetRight = function SetRight(gameObject, value) {
    var width = GetDisplayWidth(gameObject);
    gameObject.x = value - width + width * gameObject.originX;
    return gameObject;
  };

  var BottomRight = function BottomRight(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetRight(gameObject, GetRight(alignIn) + offsetX);
    SetBottom(gameObject, GetBottom(alignIn) + offsetY);
    return gameObject;
  };

  var SetCenterY = function SetCenterY(gameObject, y) {
    var height = GetDisplayHeight(gameObject);
    var offsetY = height * gameObject.originY;
    gameObject.y = y + offsetY - height * 0.5;
    return gameObject;
  };

  var CenterOn = function CenterOn(gameObject, x, y) {
    SetCenterX(gameObject, x);
    return SetCenterY(gameObject, y);
  };

  var GetCenterY = function GetCenterY(gameObject) {
    var height = GetDisplayHeight(gameObject);
    return gameObject.y - height * gameObject.originY + height * 0.5;
  };

  var Center = function Center(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    CenterOn(gameObject, GetCenterX(alignIn) + offsetX, GetCenterY(alignIn) + offsetY);
    return gameObject;
  };

  var LeftCenter = function LeftCenter(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetLeft(gameObject, GetLeft(alignIn) - offsetX);
    SetCenterY(gameObject, GetCenterY(alignIn) + offsetY);
    return gameObject;
  };

  var RightCenter = function RightCenter(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetRight(gameObject, GetRight(alignIn) + offsetX);
    SetCenterY(gameObject, GetCenterY(alignIn) + offsetY);
    return gameObject;
  };

  var GetTop = function GetTop(gameObject) {
    var height = GetDisplayHeight(gameObject);
    return gameObject.y - height * gameObject.originY;
  };

  var SetTop = function SetTop(gameObject, value) {
    var height = GetDisplayHeight(gameObject);
    gameObject.y = value + height * gameObject.originY;
    return gameObject;
  };

  var TopCenter = function TopCenter(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetCenterX(gameObject, GetCenterX(alignIn) + offsetX);
    SetTop(gameObject, GetTop(alignIn) - offsetY);
    return gameObject;
  };

  var TopLeft = function TopLeft(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetLeft(gameObject, GetLeft(alignIn) - offsetX);
    SetTop(gameObject, GetTop(alignIn) - offsetY);
    return gameObject;
  };

  var TopRight = function TopRight(gameObject, alignIn, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    SetRight(gameObject, GetRight(alignIn) + offsetX);
    SetTop(gameObject, GetTop(alignIn) - offsetY);
    return gameObject;
  };

  var AlignInMap = [];
  AlignInMap[ALIGN_CONST.BOTTOM_CENTER] = BottomCenter;
  AlignInMap[ALIGN_CONST.BOTTOM_LEFT] = BottomLeft;
  AlignInMap[ALIGN_CONST.BOTTOM_RIGHT] = BottomRight;
  AlignInMap[ALIGN_CONST.CENTER] = Center;
  AlignInMap[ALIGN_CONST.LEFT_CENTER] = LeftCenter;
  AlignInMap[ALIGN_CONST.RIGHT_CENTER] = RightCenter;
  AlignInMap[ALIGN_CONST.TOP_CENTER] = TopCenter;
  AlignInMap[ALIGN_CONST.TOP_LEFT] = TopLeft;
  AlignInMap[ALIGN_CONST.TOP_RIGHT] = TopRight;
  var QuickSet = function QuickSet(child, alignIn, position, offsetX, offsetY) {
    return AlignInMap[position](child, alignIn, offsetX, offsetY);
  };

  var AlignIn = function AlignIn(child, x, y, width, height, align) {
    globZone.setPosition(x, y).setSize(width, height);
    QuickSet(child, globZone, align);
  };

  var GetValue$1o = Phaser.Utils.Objects.GetValue;
  var Group = Phaser.GameObjects.Group;
  var DrawBounds = function DrawBounds(graphics, config) {
    var scene = graphics.scene;
    var color, lineWidth;
    var createTextCallback, createTextCallbackScope, textAlign;
    if (typeof config === 'number') {
      color = config;
    } else {
      color = GetValue$1o(config, 'color');
      lineWidth = GetValue$1o(config, 'lineWidth');
      var nameTextConfig = GetValue$1o(config, 'name', false);
      if (nameTextConfig) {
        createTextCallback = GetValue$1o(nameTextConfig, 'createTextCallback', DefaultCreateTextCallback);
        createTextCallbackScope = GetValue$1o(nameTextConfig, 'createTextCallbackScope', undefined);
        textAlign = GetValue$1o(nameTextConfig, 'align', 'left-top');
        if (typeof textAlign === 'string') {
          textAlign = AlignConst[textAlign];
        }
      }
    }
    if (color === undefined) {
      color = 0xffffff;
    }
    if (lineWidth === undefined) {
      lineWidth = 1;
    }
    if (createTextCallback && !graphics.children) {
      graphics.children = new Group(scene);
      graphics.once('destroy', function (graphics, fromScene) {
        graphics.children.destroy(!fromScene);
        graphics.children = undefined;
      });
      var graphicsClear = graphics.clear.bind(graphics);
      graphics.clear = function () {
        graphicsClear();
        graphics.children.clear(false, true);
      };
    }
    var children = this.getAllShownChildren([this]),
      child;
    var nameText;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];
      if (child.getBounds || child.width !== undefined && child.height !== undefined) {
        GlobRect = GetBounds$1(child, GlobRect);
      } else {
        continue;
      }
      if (color != null) {
        graphics.lineStyle(lineWidth, color).strokeRectShape(GlobRect);
      }
      if (child.name && createTextCallback) {
        if (createTextCallbackScope) {
          nameText = createTextCallback.call(createTextCallbackScope, scene);
        } else {
          nameText = createTextCallback(scene);
        }
        if (nameText) {
          nameText.setText(child.name);
          graphics.children.add(nameText);
          AlignIn(nameText, GlobRect.x, GlobRect.y, GlobRect.width, GlobRect.height, textAlign);
        }
      }
    }
    return this;
  };
  var DefaultCreateTextCallback = function DefaultCreateTextCallback(scene, child, childBoundsRect) {
    return scene.add.text(0, 0, '');
  };
  var GlobRect = undefined;

  var GetValue$1n = Phaser.Utils.Objects.GetValue;
  var GetBoundsConfig = function GetBoundsConfig(config, out) {
    if (out === undefined) {
      out = {};
    }
    if (typeof config === 'number') {
      out.left = config;
      out.right = config;
      out.top = config;
      out.bottom = config;
    } else {
      out.left = GetValue$1n(config, 'left', 0);
      out.right = GetValue$1n(config, 'right', 0);
      out.top = GetValue$1n(config, 'top', 0);
      out.bottom = GetValue$1n(config, 'bottom', 0);
    }
    return out;
  };

  var ContainerAdd = ContainerLite.prototype.add;
  var AddChild$1 = function AddChild(gameObject) {
    ContainerAdd.call(this, gameObject);
    if (this.sizerEventsEnable) {
      gameObject.emit('sizer.add', gameObject, this);
      this.emit('add', gameObject, this);
    }
    return this;
  };

  var AddChildMethods$6 = {
    addBackground: function addBackground(gameObject, paddingConfig, childKey) {
      if (this.backgroundChildren === undefined) {
        this.backgroundChildren = [];
      }
      if (typeof paddingConfig === 'string') {
        childKey = paddingConfig;
        paddingConfig = undefined;
      }
      if (paddingConfig === undefined) {
        paddingConfig = 0;
      }
      AddChild$1.call(this, gameObject);
      this.backgroundChildren.push(gameObject);
      var config = this.getSizerConfig(gameObject);
      config.padding = GetBoundsConfig(paddingConfig);
      if (childKey !== undefined) {
        this.addChildrenMap(childKey, gameObject);
      }
      return this;
    },
    isBackground: function isBackground(gameObject) {
      if (this.backgroundChildren === undefined) {
        return false;
      }
      return this.backgroundChildren.indexOf(gameObject) !== -1;
    }
  };

  var RemoveChildMethods$5 = {
    removeFromParentSizer: function removeFromParentSizer() {
      var parent = this.getParentSizer();
      if (parent) {
        parent.remove(this);
      }
      return this;
    }
  };

  var AddChildrenMap = function AddChildrenMap(key, gameObject) {
    this.childrenMap[key] = gameObject;
    return this;
  };

  var RemoveChildrenMap = function RemoveChildrenMap(key) {
    if (_typeof(key) === 'object') {
      var gameObject = key;
      for (var key in this.childrenMap) {
        if (this.childrenMap[key] === gameObject) {
          delete this.childrenMap[key];
          return this;
        }
      }
    }
    delete this.childrenMap[key];
    return this;
  };

  var GetElement = function GetElement(mapNameList, recursive) {
    if (typeof mapNameList === 'string') {
      mapNameList = mapNameList.split('.');
    }
    if (mapNameList.length === 0) {
      return undefined;
    }
    var name = mapNameList.shift(),
      element = null;
    if (name.charAt(0) === '#') {
      // Get element by name
      name = name.substring(1);
      element = this.getByName(name, recursive);
    } else if (name.indexOf('[') === -1) {
      // Get element by key
      if (this.childrenMap) {
        element = this.childrenMap[name];
      }
    } else {
      // Get element by key[]
      var innerMatch = name.match(RE_OBJ);
      if (innerMatch != null) {
        if (this.childrenMap) {
          var elements = this.childrenMap[innerMatch[1]];
          if (elements) {
            element = elements[innerMatch[2]];
          }
        }
      }
    }
    if (mapNameList.length === 0) {
      return element;
    } else if (element && element.childrenMap) {
      return element.getElement(mapNameList);
    } else {
      return null;
    }
  };
  var RE_OBJ = /(\S+)\[(\d+)\]/i;

  var GetValue$1m = Phaser.Utils.Objects.GetValue;
  var GetPadding$1 = function GetPadding(padding, key) {
    if (key === undefined) {
      return padding;
    }
    return padding[key];
  };
  var SetPadding$1 = function SetPadding(padding, key, value) {
    if (padding === undefined) {
      padding = {};
    }
    if (key === undefined) {
      key = 0;
    }
    var keyType = _typeof(key);
    if (keyType === 'string') {
      padding[key] = value;
    } else if (keyType === 'number') {
      padding.left = key;
      padding.right = key;
      padding.top = key;
      padding.bottom = key;
    } else {
      padding.left = GetValue$1m(key, 'left', 0);
      padding.right = GetValue$1m(key, 'right', 0);
      padding.top = GetValue$1m(key, 'top', 0);
      padding.bottom = GetValue$1m(key, 'bottom', 0);
    }
    return padding;
  };

  var PaddingMethods = {
    getInnerPadding: function getInnerPadding(key) {
      return GetPadding$1(this.space, key);
    },
    setInnerPadding: function setInnerPadding(key, value) {
      SetPadding$1(this.space, key, value);
      return this;
    },
    getOuterPadding: function getOuterPadding(key) {
      return GetPadding$1(this.getSizerConfig(this).padding, key);
    },
    setOuterPadding: function setOuterPadding(key, value) {
      SetPadding$1(this.getSizerConfig(this).padding, key, value);
      return this;
    },
    getChildOuterPadding: function getChildOuterPadding(child, key) {
      if (typeof child === 'string') {
        child = this.getElement(child);
      }
      return GetPadding$1(this.getSizerConfig(child).padding, key);
    },
    setChildOuterPadding: function setChildOuterPadding(child, key, value) {
      if (typeof child === 'string') {
        child = this.getElement(child);
      }
      SetPadding$1(this.getSizerConfig(child).padding, key, value);
      return this;
    }
  };

  var ResolveWidth$1 = function ResolveWidth(width) {
    if (width === undefined) {
      width = Math.max(this.childrenWidth, this.minWidth);
    }
    return width;
  };

  var ResolveChildrenWidth = function ResolveChildrenWidth(parentWidth) {
    // Resolve width of sizer children
    var child, childWidth;
    for (var i in this.sizerChildren) {
      child = this.sizerChildren[i];
      if (child && child.isRexSizer && !child.ignoreLayout) {
        childWidth = this.getExpandedChildWidth(child, parentWidth);
        childWidth = child.resolveWidth(childWidth);
        child.resolveChildrenWidth(childWidth);
      }
    }
  };

  var ResolveHeight$1 = function ResolveHeight(height) {
    var minHeight = Math.max(this.childrenHeight, this.minHeight);
    if (height === undefined) {
      height = minHeight;
    }
    return height;
  };

  var PostResolveSize = function PostResolveSize(width, height) {};

  var GetChildWidth$1 = function GetChildWidth(child) {
    var childWidth;
    if (child.isRexSizer) {
      // Sizer game object
      childWidth = Math.max(child.minWidth, child.childrenWidth);
    } else {
      // Normal game object
      if (child.minWidth !== undefined) {
        // Force minWidth
        childWidth = child.minWidth;
      } else {
        childWidth = GetDisplayWidth(child);
      }
    }
    return childWidth;
  };

  var GetChildHeight = function GetChildHeight(child) {
    var childHeight;
    if (child.isRexSizer) {
      // Sizer game object
      childHeight = Math.max(child.minHeight, child.childrenHeight);
    } else {
      // Normal game object
      if (child.minHeight !== undefined) {
        // Force minHeight
        childHeight = child.minHeight;
      } else {
        childHeight = GetDisplayHeight(child);
      }
    }
    return childHeight;
  };

  // Override
  var GetExpandedChildWidth$2 = function GetExpandedChildWidth(child, parentWidth) {
    return parentWidth;
  };

  // Override
  var GetExpandedChildHeight$2 = function GetExpandedChildHeight(child, parentHeight) {
    return parentHeight;
  };

  // Override
  var GetChildrenWidth$3 = function GetChildrenWidth() {
    return 0;
  };

  // Override
  var GetChildrenHeight$3 = function GetChildrenHeight() {
    return 0;
  };

  var GetAllChildrenSizers = function GetAllChildrenSizers(out) {
    if (out === undefined) {
      out = [];
    }
    var startIdx = out.length;
    var children = this.getChildrenSizers(out);
    var endIdx = out.length;
    for (var i = startIdx; i < endIdx; i++) {
      children[i].getAllChildrenSizers(out);
    }
    return out;
  };

  // Default method
  var GetChildrenSizers$3 = function GetChildrenSizers(out) {
    if (out === undefined) {
      out = [];
    }
    return out;
  };

  var GetShownChildrenMethods = {
    getShownChildren: function getShownChildren(out) {
      if (out === undefined) {
        out = [];
      }
      var children = this.children,
        child;
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child.rexSizer && child.rexSizer.hidden) {
          // Don't add hidden child
          continue;
        }
        out.push(child);
      }
      return out;
    },
    getAllShownChildren: function getAllShownChildren(out) {
      if (out === undefined) {
        out = [];
      }
      var queue = [this];
      while (queue.length > 0) {
        var current = queue.shift();
        if (current.rexSizer && current.rexSizer.hidden) {
          continue;
        }
        if (current !== this) {
          out.push(current);
        }
        if (current.isRexContainerLite) {
          queue.push.apply(queue, _toConsumableArray(current.children));
        }
      }
      return out;
    }
  };

  var PreLayout$2 = function PreLayout() {
    this._childrenWidth = undefined;
    this._childrenHeight = undefined;
    var children = this.getChildrenSizers(),
      child;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];
      if (child.ignoreLayout) {
        continue;
      }
      child.preLayout();
    }
  };

  var Layout = function Layout() {
    // Save scale
    var scaleXSave = this.scaleX;
    var scaleYSave = this.scaleY;
    var scale1 = scaleXSave === 1 && scaleYSave === 1;
    if (!scale1) {
      this.setScale(1);
    }

    // Run layout with scale = 1
    this.runLayout();

    // Restore scale
    if (!scale1) {
      this.setScale(scaleXSave, scaleYSave);
    }
    return this;
  };

  // Override
  var RunLayout = function RunLayout(parent, newWidth, newHeight) {
    // Skip hidden or !dirty sizer
    if (this.ignoreLayout) {
      return this;
    }
    var isTopmostParent = !parent;
    // Preprocessor, top parent only
    if (isTopmostParent) {
      this.preLayout();
    }

    // Calculate parent width
    newWidth = this.resolveWidth(newWidth);
    // Calculate all children width, run width wrap
    if (isTopmostParent) {
      this.resolveChildrenWidth(newWidth);
      this.runWidthWrap(newWidth);
    }
    // Calculate parent height
    newHeight = this.resolveHeight(newHeight);
    // The last chance of resolving size
    this.postResolveSize(newWidth, newHeight);
    // Resize parent
    this.resize(newWidth, newHeight);
    if (this.sizerEventsEnable) {
      if (this.layoutedChildren === undefined) {
        this.layoutedChildren = [];
      }
    }

    // Layout children    
    this.layoutChildren();

    // Layout background children
    this.layoutBackgrounds();
    if (this.sizerEventsEnable) {
      this.emit('postlayout', this.layoutedChildren, this);
      this.layoutedChildren.length = 0;
    }
    return this.postLayout();
  };

  // Override
  var LayoutChildren$3 = function LayoutChildren() {};

  var PostLayout = function PostLayout(parent, newWidth, newHeight) {
    if (this._anchor) {
      this._anchor.updatePosition();
    }
    return this;
  };

  // Default method
  var RunWidthWrap$1 = function RunWidthWrap(parentWidth) {
    var child, childWidth;
    for (var i in this.sizerChildren) {
      child = this.sizerChildren[i];
      if (!child || child.isRexSizer && child.ignoreLayout || !child.runWidthWrap) {
        continue;
      }
      childWidth = this.getExpandedChildWidth(child, parentWidth);
      if (child.isRexSizer) {
        childWidth = child.resolveWidth(childWidth);
      }
      child.runWidthWrap(childWidth);
    }
    return this;
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

  var GetValue$1l = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$1l(config, 'eventEmitter', true));

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

  var Anchor = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Anchor, _ComponentBase);
    var _super = _createSuper(Anchor);
    function Anchor(gameObject, config) {
      var _this;
      _classCallCheck(this, Anchor);
      _this = _super.call(this, gameObject, {
        eventEmitter: false
      });
      // No event emitter
      // this.parent = gameObject;

      _this.viewport = undefined;
      _this.resetFromJSON(config);
      return _this;
    }
    _createClass(Anchor, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.autoAnchor(false);
        this.viewport = undefined;
        this.onUpdateViewportCallback = undefined;
        this.onUpdateViewportCallbackScope = undefined;
        this.onResizeCallback = undefined;
        this.onResizeCallbackScope = undefined;
        _get(_getPrototypeOf(Anchor.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        if (o === undefined) {
          o = {};
        }

        // Position
        var alignX, configX;
        if (o.x !== undefined) {
          alignX = null;
          configX = o.x;
        } else if (o.left !== undefined) {
          alignX = 0;
          configX = o.left;
        } else if (o.right !== undefined) {
          alignX = 1;
          configX = o.right;
        } else if (o.centerX !== undefined) {
          alignX = 0.5;
          configX = o.centerX;
        }
        var alignY, configY;
        if (o.y !== undefined) {
          alignY = null;
          configY = o.y;
        } else if (o.top !== undefined) {
          alignY = 0;
          configY = o.top;
        } else if (o.bottom !== undefined) {
          alignY = 1;
          configY = o.bottom;
        } else if (o.centerY !== undefined) {
          alignY = 0.5;
          configY = o.centerY;
        }
        var percentageX, offsetX;
        if (configX !== undefined) {
          configX = configX.replace('left', '0%').replace('right', '100%').replace('center', '50%').split('%');
          percentageX = parseFloat(configX[0]) / 100;
          offsetX = configX[1] === '' ? 0 : parseFloat(configX[1]);
        }
        var percentageY, offsetY;
        if (configY !== undefined) {
          configY = configY.replace('top', '0%').replace('bottom', '100%').replace('center', '50%').split('%');
          percentageY = parseFloat(configY[0]) / 100;
          offsetY = configY[1] === '' ? 0 : parseFloat(configY[1]);
        }

        // Size
        var configWidth = o.width;
        var percentageWidth, paddingWidth;
        if (configWidth !== undefined) {
          configWidth = configWidth.split('%');
          percentageWidth = parseFloat(configWidth[0]) / 100;
          paddingWidth = configWidth[1] === '' ? 0 : parseFloat(configWidth[1]);
        }
        var configHeight = o.height;
        var percentageHeight, paddingHeight;
        if (configHeight !== undefined) {
          configHeight = configHeight.split('%');
          percentageHeight = parseFloat(configHeight[0]) / 100;
          paddingHeight = configHeight[1] === '' ? 0 : parseFloat(configHeight[1]);
        }

        // Position
        this.setAlign(alignX, alignY);
        this.setPercentage(percentageX, percentageY);
        this.setOffset(offsetX, offsetY);
        // Size
        this.setSizePercentage(percentageWidth, percentageHeight);
        this.setSizePadding(paddingWidth, paddingHeight);
        var onResizeCallback = o.onResizeCallback;
        var onResizeCallbackScope = o.onResizeCallbackScope;
        if (onResizeCallback !== undefined) {
          this.setResizeCallback(onResizeCallback, onResizeCallbackScope);
        }
        var onUpdateViewportCallback = o.onUpdateViewportCallback;
        var onUpdateViewportCallbackScope = o.onUpdateViewportCallbackScope;
        if (onUpdateViewportCallback !== undefined) {
          this.setUpdateViewportCallback(onUpdateViewportCallback, onUpdateViewportCallbackScope);
        }
        this.autoAnchor(o.enable);
        return this;
      }
    }, {
      key: "autoAnchor",
      value: function autoAnchor(enable) {
        if (enable === undefined) {
          enable = true;
        }
        enable = !!enable;
        if (this.autoAnchorEnable === enable) {
          return this;
        }
        if (enable) {
          this.scene.sys.scale.on('resize', this.anchor, this);
          this.anchor();
        } else {
          this.scene.sys.scale.off('resize', this.anchor, this);
        }
        this.autoAnchorEnable = enable;
        return this;
      }

      // Position
    }, {
      key: "setAlign",
      value: function setAlign(x, y) {
        this.alignX = x;
        this.alignY = y;
        return this;
      }
    }, {
      key: "setPercentage",
      value: function setPercentage(x, y) {
        this.percentageX = x;
        this.percentageY = y;
        return this;
      }
    }, {
      key: "setOffset",
      value: function setOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
        return this;
      }

      // Size
    }, {
      key: "setSizePercentage",
      value: function setSizePercentage(width, height) {
        this.percentageWidth = width;
        this.percentageHeight = height;
        return this;
      }
    }, {
      key: "setSizePadding",
      value: function setSizePadding(width, height) {
        this.paddingWidth = width;
        this.paddingHeight = height;
        return this;
      }
    }, {
      key: "setResizeCallback",
      value: function setResizeCallback(callback, scope) {
        this.onResizeCallback = callback;
        this.onResizeCallbackScope = scope;
        return this;
      }
    }, {
      key: "setUpdateViewportCallback",
      value: function setUpdateViewportCallback(callback, scope) {
        this.onUpdateViewportCallback = callback;
        this.onUpdateViewportCallbackScope = scope;
        return this;
      }
    }, {
      key: "anchor",
      value: function anchor() {
        this.updateViewport();
        this.updateSize();
        this.updatePosition();
        return this;
      }
    }, {
      key: "updateSize",
      value: function updateSize() {
        var callback = this.onResizeCallback,
          scope = this.onResizeCallbackScope;
        var newWidth = this.anchorWidth,
          newHeight = this.anchorHeight;
        if (newWidth === undefined && newHeight === undefined || !callback) {
          return;
        }
        var gameObject = this.parent;
        if (newWidth === undefined) {
          newWidth = gameObject.width;
        }
        if (newHeight === undefined) {
          newHeight = gameObject.height;
        }
        if (scope) {
          callback.call(scope, newWidth, newHeight, gameObject, this);
        } else {
          callback(newWidth, newHeight, gameObject, this);
        }
      }
    }, {
      key: "updatePosition",
      value: function updatePosition() {
        var gameObject = this.parent;
        if (this.alignX === null) {
          gameObject.x = this.anchorX;
        } else if (this.alignX !== undefined) {
          gameObject.x = this.anchorX + gameObject.displayWidth * (gameObject.originX - this.alignX);
        }
        if (this.alignY === null) {
          gameObject.y = this.anchorY;
        } else if (this.alignY !== undefined) {
          gameObject.y = this.anchorY + gameObject.displayHeight * (gameObject.originY - this.alignY);
        }
        return this;
      }
    }, {
      key: "anchorX",
      get: function get() {
        return this.viewport.x + this.viewport.width * this.percentageX + this.offsetX;
      }
    }, {
      key: "anchorY",
      get: function get() {
        return this.viewport.y + this.viewport.height * this.percentageY + this.offsetY;
      }
    }, {
      key: "anchorWidth",
      get: function get() {
        if (this.percentageWidth === undefined) {
          return undefined;
        }
        return this.viewport.width * this.percentageWidth + this.paddingWidth;
      }
    }, {
      key: "anchorHeight",
      get: function get() {
        if (this.percentageHeight === undefined) {
          return undefined;
        }
        return this.viewport.height * this.percentageHeight + this.paddingHeight;
      }
    }, {
      key: "updateViewport",
      value: function updateViewport() {
        var camera = this.parent.scene.cameras.main;
        this.viewport = GetViewport(this.scene, camera, this.viewport);
        var viewport = this.viewport;
        var callback = this.onUpdateViewportCallback,
          scope = this.onUpdateViewportCallbackScope;
        if (callback) {
          if (scope) {
            callback.call(scope, viewport, this.parent, this);
          } else {
            callback(viewport, this.parent, this);
          }
        }
      }
    }]);
    return Anchor;
  }(ComponentBase);

  var SetAnchor = function SetAnchor(config) {
    if (config === undefined) {
      config = {};
    }

    // Assign default onResizeCallback if not given    
    var hasMinWidth = config.hasOwnProperty('width');
    var hasMinHeight = config.hasOwnProperty('height');
    var hasOnResizeCallback = config.hasOwnProperty('onResizeCallback');
    if ((hasMinWidth || hasMinHeight) && !hasOnResizeCallback) {
      config.onResizeCallback = function (width, height, sizer) {
        if (hasMinWidth) {
          sizer.setMinWidth(width);
        }
        if (hasMinHeight) {
          sizer.setMinHeight(height);
        }
        sizer.layout();
      };
    }
    if (this._anchor === undefined) {
      this._anchor = new Anchor(this, config);
    } else {
      this._anchor.resetFromJSON(config);
    }
    return this;
  };

  var GetValue$1k = Phaser.Utils.Objects.GetValue;
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
      _this.setTickingMode(GetValue$1k(config, 'tickingMode', 1));
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

  var GetValue$1j = Phaser.Utils.Objects.GetValue;
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
      _this.tickEventName = GetValue$1j(config, 'tickEventName', defaultEventName);
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

  var GetValue$1i = Phaser.Utils.Objects.GetValue;
  var Clamp$4 = Phaser.Math.Clamp;
  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);
      this.resetFromJSON(config);
    }
    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$1i(o, 'state', IDLE$6);
        this.timeScale = GetValue$1i(o, 'timeScale', 1);
        this.delay = GetValue$1i(o, 'delay', 0);
        this.repeat = GetValue$1i(o, 'repeat', 0);
        this.repeatCounter = GetValue$1i(o, 'repeatCounter', 0);
        this.repeatDelay = GetValue$1i(o, 'repeatDelay', 0);
        this.duration = GetValue$1i(o, 'duration', 0);
        this.nowTime = GetValue$1i(o, 'nowTime', 0);
        this.justRestart = GetValue$1i(o, 'justRestart', false);
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
        this.state = IDLE$6;
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (this.state === IDLE$6 || this.state === DONE || delta === 0 || this.timeScale === 0) {
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
          case IDLE$6:
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
        return Clamp$4(t, 0, 1);
      },
      set: function set(value) {
        value = Clamp$4(value, -1, 1);
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
        return this.state === IDLE$6;
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
  var IDLE$6 = 0;
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

  var GetValue$1h = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$3 = Phaser.Utils.Objects.GetAdvancedValue;
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
        this.timer.resetFromJSON(GetValue$1h(o, 'timer'));
        this.setEnable(GetValue$1h(o, 'enable', true));
        this.setTarget(GetValue$1h(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue$3(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$3(o, 'duration', 1000));
        this.setEase(GetValue$1h(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$1h(o, 'repeat', 0));
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

  var GetValue$1g = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$2 = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$7 = Phaser.Math.Linear;
  var Scale$1 = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Scale, _EaseValueTaskBase);
    var _super = _createSuper(Scale);
    function Scale(gameObject, config) {
      var _this;
      _classCallCheck(this, Scale);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;
      // this.timer

      _this.scaleStart = {};
      _this.scaleEnd = {};
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(Scale, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Scale.prototype), "resetFromJSON", this).call(this, o);
        this.setMode(GetValue$1g(o, 'mode', 0));
        this.setScaleRange(GetAdvancedValue$2(o, 'start', undefined), GetAdvancedValue$2(o, 'end', 0));
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE$3[m];
        }
        this.mode = m;
        return this;
      }
    }, {
      key: "setScaleRange",
      value: function setScaleRange(start, end) {
        if (typeof start === 'number') {
          this.startX = start;
          this.startY = start;
        } else {
          this.startX = GetAdvancedValue$2(start, 'x', this.parent.scaleX);
          this.startY = GetAdvancedValue$2(start, 'y', this.parent.scaleY);
        }
        if (typeof end === 'number') {
          this.endX = end;
          this.endY = end;
        } else {
          this.endX = GetAdvancedValue$2(end, 'x', undefined);
          this.endY = GetAdvancedValue$2(end, 'y', undefined);
        }
        this.hasScaleX = this.startX !== undefined && this.endX !== undefined;
        this.hasScaleY = this.startY !== undefined && this.endY !== undefined;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }
        var gameObject = this.parent;
        if (this.hasScaleX) {
          gameObject.scaleX = this.startX;
        }
        if (this.hasScaleY) {
          gameObject.scaleY = this.startY;
        }
        var repeat = this.repeat;
        if (this.mode === 2) {
          // Yoyo
          if (repeat !== -1) {
            repeat = (repeat + 1) * 2 - 1;
          }
        }
        this.timer.setDelay(this.delay).setDuration(this.duration).setRepeat(repeat);
        _get(_getPrototypeOf(Scale.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {
        var t = timer.t;
        if (timer.isOddIteration) {
          // Yoyo
          t = 1 - t;
        }
        t = this.easeFn(t);
        if (this.hasScaleX) {
          gameObject.scaleX = Linear$7(this.startX, this.endX, t);
        }
        if (this.hasScaleY) {
          gameObject.scaleY = Linear$7(this.startY, this.endY, t);
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(Scale.prototype), "complete", this).call(this);
        if (this.mode === 1) {
          this.parent.destroy();
          // Will also destroy this behavior
        }

        return this;
      }
    }]);
    return Scale;
  }(EaseValueTaskBase);
  var MODE$3 = {
    stop: 0,
    destroy: 1,
    yoyo: 2
  };

  var PopUp = function PopUp(gameObject, duration, orientation, ease, scale) {
    if (ease === undefined) {
      ease = 'Cubic';
    }

    // Ease scale from 0 to current scale
    var start, end;
    switch (orientation) {
      case 0:
      case 'x':
        start = {
          x: 0
        };
        end = {
          x: gameObject.scaleX
        };
        break;
      case 1:
      case 'y':
        start = {
          y: 0
        };
        end = {
          y: gameObject.scaleY
        };
        break;
      default:
        start = 0;
        end = gameObject.scale;
        break;
    }
    var config = {
      mode: 0,
      start: start,
      end: end,
      duration: duration,
      ease: ease
    };
    if (scale === undefined) {
      scale = new Scale$1(gameObject, config);
    } else {
      scale.resetFromJSON(config);
    }
    scale.restart();
    return scale;
  };

  var ScaleDownDestroy = function ScaleDownDestroy(gameObject, duration, orientation, ease, destroyMode, scale) {
    if (ease === undefined) {
      ease = 'Linear';
    }

    // Ease from current scale to 0
    if (destroyMode instanceof Scale$1) {
      scale = destroyMode;
      destroyMode = undefined;
    }
    if (destroyMode === undefined) {
      destroyMode = true;
    }
    var config = {};
    config.mode = destroyMode ? 1 : 0;
    switch (orientation) {
      case 0:
      case 'x':
        config.end = {
          x: 0
        };
        break;
      case 1:
      case 'y':
        config.end = {
          y: 0
        };
        break;
      default:
        config.end = 0;
        break;
    }
    config.duration = duration;
    config.ease = ease;
    if (scale === undefined) {
      scale = new Scale$1(gameObject, config);
    } else {
      scale.resetFromJSON(config);
    }
    scale.restart();
    return scale;
  };

  var Yoyo = function Yoyo(gameObject, duration, peakValue, repeat, orientation, ease, scale) {
    if (peakValue === undefined) {
      peakValue = 1.2;
    }
    if (repeat === undefined) {
      repeat = 0;
    }
    if (ease === undefined) {
      ease = 'Cubic';
    }

    // Ease scale from 0 to current scale
    var start, end;
    switch (orientation) {
      case 0:
      case 'x':
        start = {
          x: gameObject.scaleX
        };
        end = {
          x: peakValue
        };
        break;
      case 1:
      case 'y':
        start = {
          y: gameObject.scaleX
        };
        end = {
          y: peakValue
        };
        break;
      default:
        start = gameObject.scaleX;
        end = peakValue;
        break;
    }
    var config = {
      mode: 2,
      start: start,
      end: end,
      duration: duration / 2,
      ease: ease,
      repeat: repeat
    };
    if (scale === undefined) {
      scale = new Scale$1(gameObject, config);
    } else {
      scale.resetFromJSON(config);
    }
    scale.restart();
    return scale;
  };

  var WaitEvent = function WaitEvent(eventEmitter, eventName) {
    return new Promise(function (resolve, reject) {
      eventEmitter.once(eventName, function () {
        resolve();
      });
    });
  };
  var WaitComplete = function WaitComplete(eventEmitter) {
    return WaitEvent(eventEmitter, 'complete');
  };

  var IsPlainObject$g = Phaser.Utils.Objects.IsPlainObject;
  var OnInitScale = function OnInitScale(gameObject, scale) {
    // Route 'complete' of scale to gameObject
    scale.completeEventName = undefined;
    scale.on('complete', function () {
      if (scale.completeEventName) {
        gameObject.emit(scale.completeEventName, gameObject);
        scale.completeEventName = undefined;
      }
    });

    // Update local state
    scale.on('update', function () {
      var parent = gameObject.getParentSizer();
      if (parent) {
        parent.resetChildPositionState(gameObject);
      }
    });
  };
  var ScaleMethods = {
    popUp: function popUp(duration, orientation, ease) {
      if (IsPlainObject$g(duration)) {
        var config = duration;
        duration = config.duration;
        orientation = config.orientation;
        ease = config.ease;
      }
      var isInit = this._scale === undefined;
      this._scale = PopUp(this, duration, orientation, ease, this._scale);
      if (isInit) {
        OnInitScale(this, this._scale);
      }
      this._scale.completeEventName = 'popup.complete';
      return this;
    },
    popUpPromise: function popUpPromise(duration, orientation, ease) {
      this.popUp(duration, orientation, ease);
      return WaitComplete(this._scale);
    },
    scaleDownDestroy: function scaleDownDestroy(duration, orientation, ease, destroyMode) {
      if (IsPlainObject$g(duration)) {
        var config = duration;
        duration = config.duration;
        orientation = config.orientation;
        ease = config.ease;
        destroyMode = config.destroy;
      }
      var isInit = this._scale === undefined;
      this._scale = ScaleDownDestroy(this, duration, orientation, ease, destroyMode, this._scale);
      if (isInit) {
        OnInitScale(this, this._scale);
      }
      this._scale.completeEventName = 'scaledown.complete';
      return this;
    },
    scaleDownDestroyPromise: function scaleDownDestroyPromise(duration, orientation, ease, destroyMode) {
      this.scaleDownDestroy(duration, orientation, ease, destroyMode);
      return WaitComplete(this._scale);
    },
    scaleDown: function scaleDown(duration, orientation, ease) {
      this.scaleDownDestroy(duration, orientation, ease, false);
      return this;
    },
    scaleDownPromise: function scaleDownPromise(duration, orientation, ease) {
      this.scaleDown(duration, orientation, ease);
      return WaitComplete(this._scale);
    },
    scaleYoyo: function scaleYoyo(duration, peakValue, repeat, orientation, ease) {
      if (IsPlainObject$g(duration)) {
        var config = duration;
        duration = config.duration;
        peakValue = config.peakValue;
        repeat = config.repeat;
        orientation = config.orientation;
        ease = config.ease;
      }
      var isInit = this._scale === undefined;
      this._scale = Yoyo(this, duration, peakValue, repeat, orientation, ease, this._scale);
      if (isInit) {
        OnInitScale(this, this._scale);
      }
      this._scale.completeEventName = 'scaleyoyo.complete';
      return this;
    },
    scaleYoyoPromise: function scaleYoyoPromise(duration, peakValue, repeat, orientation, ease) {
      this.scaleYoyo(duration, peakValue, repeat, orientation, ease);
      return WaitComplete(this._scale);
    }
  };

  var GetValue$1f = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$6 = Phaser.Math.Linear;
  var Fade = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Fade, _EaseValueTaskBase);
    var _super = _createSuper(Fade);
    function Fade(gameObject, config) {
      var _this;
      _classCallCheck(this, Fade);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(Fade, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Fade.prototype), "resetFromJSON", this).call(this, o);
        this.setMode(GetValue$1f(o, 'mode', 0));
        this.setAlphaRange(GetAdvancedValue$1(o, 'start', this.parent.alpha), GetAdvancedValue$1(o, 'end', 0));
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE$2[m];
        }
        this.mode = m;
        return this;
      }
    }, {
      key: "setAlphaRange",
      value: function setAlphaRange(start, end) {
        this.alphaStart = start;
        this.alphaEnd = end;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }
        var gameObject = this.parent;
        gameObject.setAlpha(this.alphaStart);
        this.timer.setDelay(this.delay).setDuration(this.duration).setRepeat(this.mode === 2 ? -1 : 0);
        _get(_getPrototypeOf(Fade.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {
        var t = timer.t;
        if (timer.isOddIteration) {
          // Yoyo
          t = 1 - t;
        }
        gameObject.alpha = Linear$6(this.alphaStart, this.alphaEnd, t);
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(Fade.prototype), "complete", this).call(this);
        if (this.mode === 1) {
          this.parent.destroy();
          // Will also destroy this behavior
        }

        return this;
      }
    }]);
    return Fade;
  }(EaseValueTaskBase);
  var MODE$2 = {
    stop: 0,
    destroy: 1,
    yoyo: 2
  };

  var IsPlainObject$f = Phaser.Utils.Objects.IsPlainObject;
  var FadeIn = function FadeIn(gameObject, duration, alpha, fade) {
    var startAlpha, endAlpha;
    if (IsPlainObject$f(alpha)) {
      startAlpha = alpha.start;
      endAlpha = alpha.end;
    } else {
      endAlpha = alpha;
    }
    if (startAlpha === undefined) {
      startAlpha = 0;
    }
    if (endAlpha === undefined) {
      endAlpha = 1;
    }
    var config = {
      mode: 0,
      start: startAlpha,
      end: endAlpha,
      duration: duration
    };
    if (fade === undefined) {
      fade = new Fade(gameObject, config);
    } else {
      fade.resetFromJSON(config);
    }
    fade.restart();
    return fade;
  };

  var FadeOutDestroy = function FadeOutDestroy(gameObject, duration, destroyMode, fade) {
    if (destroyMode instanceof Fade) {
      fade = destroyMode;
      destroyMode = undefined;
    }
    if (destroyMode === undefined) {
      destroyMode = true;
    }
    var config = {
      mode: destroyMode ? 1 : 0,
      end: 0,
      duration: duration
    };
    if (fade === undefined) {
      fade = new Fade(gameObject, config);
    } else {
      fade.resetFromJSON(config);
    }
    fade.restart();
    return fade;
  };

  var IsPlainObject$e = Phaser.Utils.Objects.IsPlainObject;
  var OnInitFade = function OnInitFade(gameObject, fade) {
    // Route 'complete' of fade to gameObject
    fade.completeEventName = undefined;
    fade.on('complete', function () {
      if (fade.completeEventName) {
        gameObject.emit(fade.completeEventName, gameObject);
        fade.completeEventName = undefined;
      }
    });

    // Update local state
    fade.on('update', function () {
      var parent = gameObject.getParentSizer();
      if (parent) {
        parent.resetChildAlphaState(gameObject);
      }
    });
  };
  var FadeMethods = {
    fadeIn: function fadeIn(duration, alpha) {
      if (IsPlainObject$e(duration)) {
        var config = duration;
        duration = config.duration;
        alpha = config.alpha;
      }
      var isInit = this._fade === undefined;
      this._fade = FadeIn(this, duration, alpha, this._fade);
      if (isInit) {
        OnInitFade(this, this._fade);
      }
      this._fade.completeEventName = 'fadein.complete';
      return this;
    },
    fadeInPromise: function fadeInPromise(duration, alpha) {
      this.fadeIn(duration, alpha);
      return WaitComplete(this._fade);
    },
    fadeOutDestroy: function fadeOutDestroy(duration, destroyMode) {
      if (IsPlainObject$e(duration)) {
        var config = duration;
        duration = config.duration;
        destroyMode = config.destroy;
      }
      var isInit = this._fade === undefined;
      this._fade = FadeOutDestroy(this, duration, destroyMode, this._fade);
      if (isInit) {
        OnInitFade(this, this._fade);
      }
      this._fade.completeEventName = 'fadeout.complete';
      return this;
    },
    fadeOutDestroyPromise: function fadeOutDestroyPromise(duration, destroyMode) {
      this.fadeOutDestroy(duration, destroyMode);
      return WaitComplete(this._fade);
    },
    fadeOut: function fadeOut(duration) {
      this.fadeOutDestroy(duration, false);
      return this;
    },
    fadeOutPromise: function fadeOutPromise(duration) {
      this.fadeOut(duration);
      return WaitComplete(this._fade);
    }
  };

  var GetValue$1e = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$5 = Phaser.Math.Linear;
  var EaseMove = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(EaseMove, _EaseValueTaskBase);
    var _super = _createSuper(EaseMove);
    function EaseMove(gameObject, config) {
      var _this;
      _classCallCheck(this, EaseMove);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(EaseMove, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(EaseMove.prototype), "resetFromJSON", this).call(this, o);
        this.setMode(GetValue$1e(o, 'mode', 0));
        if (o && (o.hasOwnProperty('x') || o.hasOwnProperty('y'))) {
          var endX = GetAdvancedValue(o, 'x', undefined);
          var endY = GetAdvancedValue(o, 'y', undefined);
          this.setTargetPosition(endX, endY);
        } else {
          this.setTargetPosition(o);
        }
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE$1[m];
        }
        this.mode = m;
        return this;
      }
    }, {
      key: "setTargetPosition",
      value: function setTargetPosition(x, y) {
        if (typeof x === 'number' || typeof y === 'number') {
          // endX, endY
          // x,y : a number, or undefined
          this.startX = this.parent.x;
          this.startY = this.parent.y;
          this.endX = x;
          this.endY = y;
        } else {
          var config = x;
          this.startX = GetAdvancedValue(config, 'startX', undefined);
          this.startY = GetAdvancedValue(config, 'startY', undefined);
          this.endX = GetAdvancedValue(config, 'endX', undefined);
          this.endY = GetAdvancedValue(config, 'endY', undefined);
        }
        this.hasMoveX = this.startX !== undefined && this.endX !== undefined;
        this.hasMoveY = this.startY !== undefined && this.endY !== undefined;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }
        var gameObject = this.parent;
        if (this.hasMoveX) {
          gameObject.x = this.startX;
        }
        if (this.hasMoveY) {
          gameObject.y = this.startY;
        }
        this.timer.setDelay(this.delay).setDuration(this.duration).setRepeat(this.mode === 2 ? -1 : 0);
        _get(_getPrototypeOf(EaseMove.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {
        var t = timer.t;
        if (timer.isOddIteration) {
          // Yoyo
          t = 1 - t;
        }
        t = this.easeFn(t);
        if (this.hasMoveX) {
          gameObject.x = Linear$5(this.startX, this.endX, t);
        }
        if (this.hasMoveY) {
          gameObject.y = Linear$5(this.startY, this.endY, t);
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(EaseMove.prototype), "complete", this).call(this);
        if (this.mode === 1) {
          this.parent.destroy();
          // Will also destroy this behavior
        }

        return this;
      }
    }]);
    return EaseMove;
  }(EaseValueTaskBase);
  var MODE$1 = {
    stop: 0,
    destroy: 1,
    yoyo: 2
  };

  var ParseValue = function ParseValue(propertyValue, startValue) {
    // propertyValue : number or string
    if (typeof propertyValue === 'number') {
      return propertyValue;
    } else {
      var op = propertyValue[0];
      var num = parseFloat(propertyValue.substr(2));
      switch (op) {
        case '+':
          return startValue + num;
        case '-':
          return startValue - num;
        case '*':
          return startValue * num;
        case '/':
          return startValue / num;
      }
    }
  };

  var EaseMoveTo = function EaseMoveTo(gameObject, duration, endX, endY, ease, destroyMode, easeMove) {
    if (destroyMode instanceof EaseMove) {
      easeMove = destroyMode;
      destroyMode = undefined;
    }
    if (destroyMode === undefined) {
      destroyMode = false;
    }
    var config = {};
    config.mode = destroyMode ? 1 : 0;
    if (endX !== undefined) {
      config.startX = gameObject.x;
      config.endX = ParseValue(endX, gameObject.x);
    }
    if (endY !== undefined) {
      config.startY = gameObject.y;
      config.endY = ParseValue(endY, gameObject.y);
    }
    config.duration = duration;
    config.ease = ease === undefined ? 'Linear' : ease;
    if (easeMove === undefined) {
      easeMove = new EaseMove(gameObject, config);
    } else {
      easeMove.resetFromJSON(config);
    }
    easeMove.restart();
    return easeMove;
  };

  var EaseMoveFrom = function EaseMoveFrom(gameObject, duration, startX, startY, ease, destroyMode, easeMove) {
    if (destroyMode instanceof EaseMove) {
      easeMove = destroyMode;
      destroyMode = undefined;
    }
    if (destroyMode === undefined) {
      destroyMode = false;
    }
    var config = {};
    config.mode = destroyMode ? 1 : 0;
    if (startX !== undefined) {
      config.startX = ParseValue(startX, gameObject.x);
      config.endX = gameObject.x;
    }
    if (startY !== undefined) {
      config.startY = ParseValue(startY, gameObject.y);
      config.endY = gameObject.y;
    }
    config.duration = duration;
    config.ease = ease === undefined ? 'Linear' : ease;
    if (easeMove === undefined) {
      easeMove = new EaseMove(gameObject, config);
    } else {
      easeMove.resetFromJSON(config);
    }
    easeMove.restart();
    return easeMove;
  };

  var IsPlainObject$d = Phaser.Utils.Objects.IsPlainObject;
  var DistanceBetween$5 = Phaser.Math.Distance.Between;
  var OnInitEaseMove = function OnInitEaseMove(gameObject, easeMove) {
    // Route 'complete' of easeMove to gameObject
    easeMove.completeEventName = undefined;
    easeMove.on('complete', function () {
      if (easeMove.completeEventName) {
        gameObject.emit(easeMove.completeEventName, gameObject);
        easeMove.completeEventName = undefined;
      }
    });

    // Update local state
    easeMove.on('update', function () {
      var parent = gameObject.getParentSizer();
      if (parent) {
        parent.resetChildPositionState(gameObject);
      }
    });
  };
  var EaseMoveMethods = {
    moveFrom: function moveFrom(duration, x, y, ease, destroyMode) {
      if (IsPlainObject$d(duration)) {
        var config = duration;
        x = config.x;
        y = config.y;
        if (config.hasOwnProperty('speed')) {
          duration = DistanceBetween$5(x, y, this.x, this.y) * 1000 / config.speed;
        } else {
          duration = config.duration;
        }
        ease = config.ease;
      }
      var isInit = this._easeMove === undefined;
      this._easeMove = EaseMoveFrom(this, duration, x, y, ease, destroyMode, this._easeMove);
      if (isInit) {
        OnInitEaseMove(this, this._easeMove);
      }
      this._easeMove.completeEventName = 'movefrom.complete';
      return this;
    },
    moveFromPromise: function moveFromPromise(duration, x, y, ease, destroyMode) {
      this.moveFrom(duration, x, y, ease, destroyMode);
      return WaitComplete(this._easeMove);
    },
    moveFromDestroy: function moveFromDestroy(duration, x, y, ease) {
      this.moveFrom(duration, x, y, ease, true);
      return this;
    },
    moveFromDestroyPromise: function moveFromDestroyPromise(duration, x, y, ease) {
      this.moveFromDestroy(duration, x, y, ease);
      return WaitComplete(this._easeMove);
    },
    moveTo: function moveTo(duration, x, y, ease, destroyMode) {
      if (IsPlainObject$d(duration)) {
        var config = duration;
        x = config.x;
        y = config.y;
        if (config.hasOwnProperty('speed')) {
          duration = DistanceBetween$5(x, y, this.x, this.y) * 1000 / config.speed;
        } else {
          duration = config.duration;
        }
        ease = config.ease;
      }
      var isInit = this._easeMove === undefined;
      this._easeMove = EaseMoveTo(this, duration, x, y, ease, destroyMode, this._easeMove);
      if (isInit) {
        OnInitEaseMove(this, this._easeMove);
      }
      this._easeMove.completeEventName = 'moveto.complete';
      return this;
    },
    moveToPromise: function moveToPromise(duration, x, y, ease, destroyMode) {
      this.moveTo(duration, x, y, ease, destroyMode);
      return WaitComplete(this._easeMove);
    },
    moveToDestroy: function moveToDestroy(duration, x, y, ease) {
      this.moveTo(duration, x, y, ease, true);
      return this;
    },
    moveToDestroyPromise: function moveToDestroyPromise(duration, x, y, ease) {
      this.moveToDestroy(duration, x, y, ease, true);
      return WaitComplete(this._easeMove);
    },
    moveStop: function moveStop(toEnd) {
      if (!this._easeMove) {
        return this;
      }
      this._easeMove.stop(toEnd);
      return this;
    }
  };

  var GetValue$1d = Phaser.Utils.Objects.GetValue;
  var ShakePosition = /*#__PURE__*/function (_TickTask) {
    _inherits(ShakePosition, _TickTask);
    var _super = _createSuper(ShakePosition);
    function ShakePosition(gameObject, config) {
      var _this;
      _classCallCheck(this, ShakePosition);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;

      _this.timer = new Timer();
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(ShakePosition, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue$1d(o, 'timer'));
        this.setEnable(GetValue$1d(o, 'enable', true));
        this.setMode(GetValue$1d(o, 'mode', 1));
        this.isRunning = GetValue$1d(o, 'isRunning', false);
        this.setMagnitudeMode(GetValue$1d(o, 'magnitudeMode', 1));
        this.setDuration(GetValue$1d(o, 'duration', 500));
        this.setMagnitude(GetValue$1d(o, 'magnitude', 10));
        this.ox = GetValue$1d(o, 'ox', undefined);
        this.oy = GetValue$1d(o, 'oy', undefined);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          timer: this.timer.toJSON(),
          enable: this.enable,
          mode: this.mode,
          isRunning: this.isRunning,
          magnitudeMode: magnitudeMode,
          duration: this.duration,
          magnitude: this.magnitude,
          ox: this.ox,
          oy: this.oy
        };
      }

      // override
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        _get(_getPrototypeOf(ShakePosition.prototype), "shutdown", this).call(this, fromScene);
        this.timer.destroy();
        this.timer = undefined;
      }
    }, {
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(ShakePosition.prototype), "startTicking", this).call(this);
        if (this.mode === 0) {
          // Effect mode
          this.scene.game.events.on('poststep', this.update, this);
          this.scene.game.events.on('prestep', this.backToOrigin, this);
        } else {
          // Behavior Mode
          this.scene.sys.events.on('preupdate', this.update, this);
        }
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(ShakePosition.prototype), "stopTicking", this).call(this);
        if (this.scene) {
          // Scene might be destoryed
          if (this.mode === 0) {
            // Effect mode
            this.scene.game.events.off('poststep', this.update, this);
            this.scene.game.events.off('prestep', this.backToOrigin, this);
          } else {
            // Behavior Mode
            this.scene.sys.events.off('preupdate', this.update, this);
          }
        }
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
      key: "setMode",
      value: function setMode(mode) {
        if (typeof mode === 'string') {
          mode = MODE[mode];
        }
        this.mode = mode;
        return this;
      }
    }, {
      key: "setMagnitudeMode",
      value: function setMagnitudeMode(magnitudeMode) {
        if (typeof magnitudeMode === 'string') {
          magnitudeMode = MANITUDEMODE[magnitudeMode];
        }
        this.magnitudeMode = magnitudeMode;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration) {
        this.duration = duration;
        return this;
      }
    }, {
      key: "setMagnitude",
      value: function setMagnitude(magnitude) {
        this.magnitude = magnitude;
        return this;
      }
    }, {
      key: "start",
      value: function start(duration, magnitude) {
        if (typeof duration !== 'number') {
          var config = duration;
          magnitude = GetValue$1d(config, 'magnitude', undefined);
          duration = GetValue$1d(config, 'duration', undefined);
        }
        if (magnitude !== undefined) {
          this.setMagnitude(magnitude);
        }
        if (duration !== undefined) {
          this.setDuration(duration);
        }
        this.timer.setDuration(this.duration).start();
        _get(_getPrototypeOf(ShakePosition.prototype), "start", this).call(this);
        return this;
      }
    }, {
      key: "shake",
      value: function shake(duration, magnitude) {
        this.start(duration, magnitude);
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
        this.timer.update(time, delta);
        if (this.timer.isDone) {
          this.backToOrigin();
          this.complete();
        } else {
          if (this.ox === undefined) {
            this.ox = gameObject.x;
            this.oy = gameObject.y;
          }
          var magnitude = this.magnitude;
          if (this.magnitudeMode === 1)
            // decay
            {
              magnitude *= 1 - this.timer.t;
            }
          var a = Math.random() * Math.PI * 2;
          var offsetX = Math.cos(a) * magnitude;
          var offsetY = Math.sin(a) * magnitude;
          gameObject.setPosition(this.ox + offsetX, this.oy + offsetY);
        }
        return this;
      }
    }, {
      key: "backToOrigin",
      value: function backToOrigin() {
        if (!this.isRunning || !this.enable) {
          return this;
        }
        if (this.ox === undefined) {
          return this;
        }
        var gameObject = this.parent;
        if (this.ox === gameObject.x && this.oy === gameObject.y) {
          return this;
        }
        gameObject.setPosition(this.ox, this.oy);
        this.ox = undefined;
        this.oy = undefined;
        return this;
      }
    }]);
    return ShakePosition;
  }(TickTask);
  var MODE = {
    effect: 0,
    behavior: 1
  };
  var MANITUDEMODE = {
    constant: 0,
    decay: 1
  };

  var IsPlainObject$c = Phaser.Utils.Objects.IsPlainObject;
  var OnInitShake = function OnInitShake(gameObject, shake) {
    // Route 'complete' of shake to gameObject
    shake.on('complete', function () {
      gameObject.emit('shake.complete', gameObject);
    });

    // Shake effect won't change position
  };

  var ShakeMethods = {
    shake: function shake(duration, magnitude, magnitudeMode) {
      if (IsPlainObject$c(duration)) {
        var config = duration;
        duration = config.duration;
        magnitude = config.magnitude;
        magnitudeMode = config.magnitudeMode;
      }
      if (this._shake === undefined) {
        this._shake = new ShakePosition(this, {
          mode: 0,
          magnitudeMode: 1
        });
        OnInitShake(this, this._shake);
      }
      if (duration !== undefined) {
        this._shake.setDuration(duration);
      }
      if (magnitude !== undefined) {
        this._shake.setMagnitude(magnitude);
      }
      if (magnitudeMode !== undefined) {
        this._shake.setMagnitudeMode(magnitudeMode);
      }
      this._shake.shake();
      return this;
    },
    shakePromise: function shakePromise(duration, alpha) {
      this.shake(duration, alpha);
      return WaitComplete(this._shake);
    }
  };

  var GetValue$1c = Phaser.Utils.Objects.GetValue;
  var Linear$4 = Phaser.Math.Linear;
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
        this.propertyKey = GetValue$1c(config, 'key', 'value');
        var currentValue = target[this.propertyKey];
        this.fromValue = GetValue$1c(config, 'from', currentValue);
        this.toValue = GetValue$1c(config, 'to', currentValue);
        this.setEase(GetValue$1c(config, 'ease', this.ease));
        this.setDuration(GetValue$1c(config, 'duration', this.duration));
        this.setRepeat(GetValue$1c(config, 'repeat', 0));
        this.setDelay(GetValue$1c(config, 'delay', 0));
        this.setRepeatDelay(GetValue$1c(config, 'repeatDelay', 0));
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
        target[this.propertyKey] = Linear$4(this.fromValue, this.toValue, t);
      }
    }]);
    return EaseValueTask;
  }(EaseValueTaskBase);

  var IsPlainObject$b = Phaser.Utils.Objects.IsPlainObject;
  var EaseData = /*#__PURE__*/function (_ComponentBase) {
    _inherits(EaseData, _ComponentBase);
    var _super = _createSuper(EaseData);
    function EaseData(parent, config) {
      var _this;
      _classCallCheck(this, EaseData);
      _this = _super.call(this, parent, config);
      _this.parent.setDataEnabled();
      _this.easeTasks = {};
      return _this;
    }
    _createClass(EaseData, [{
      key: "complete",
      value: function complete(key) {
        this.emit("complete-".concat(key), this.parent, this);
        this.emit('complete', key, this.parent, this);
      }
    }, {
      key: "getEaseTask",
      value: function getEaseTask(key) {
        var easeTask = this.easeTasks[key];
        if (easeTask === undefined) {
          easeTask = new EaseValueTask(this.parent);
          this.easeTasks[key] = easeTask;
          easeTask.setTarget(this.parent.data.values).on('complete', function () {
            this.complete(key);
          }, this);
        }
        return easeTask;
      }
    }, {
      key: "easeTo",
      value: function easeTo(key, value, duration, ease) {
        if (IsPlainObject$b(key)) {
          var config = key;
          key = config.key;
          value = config.value;
          duration = config.duration;
          ease = config.ease;
          var speed = config.speed;
          if (duration === undefined && speed !== undefined) {
            duration = Math.abs(value - this.parent.data.values[key]) / speed * 1000;
          }
        }
        if (duration === undefined) {
          duration = 1000;
        }
        if (ease === undefined) {
          ease = 'Linear';
        }
        var easeTask = this.getEaseTask(key);
        easeTask.restart({
          key: key,
          to: value,
          duration: duration,
          ease: ease
        });
        return this;
      }
    }, {
      key: "easeFrom",
      value: function easeFrom(key, value, duration, ease) {
        if (IsPlainObject$b(key)) {
          var config = key;
          key = config.key;
          value = config.value;
          duration = config.duration;
          ease = config.ease;
          var speed = config.speed;
          if (duration === undefined && speed !== undefined) {
            duration = Math.abs(value - this.parent.data.values[key]) / speed * 1000;
          }
        }
        if (duration === undefined) {
          duration = 1000;
        }
        if (ease === undefined) {
          ease = 'Linear';
        }
        var easeTask = this.getEaseTask(key);
        easeTask.restart({
          key: key,
          from: value,
          duration: duration,
          ease: ease
        });
        return this;
      }
    }, {
      key: "stopEase",
      value: function stopEase(key, toEnd) {
        if (toEnd === undefined) {
          toEnd = true;
        }
        var easeTask = this.easeTasks[key];
        if (easeTask) {
          easeTask.stop(toEnd);
        }
        return this;
      }
    }, {
      key: "stopAll",
      value: function stopAll(toEnd) {
        if (toEnd === undefined) {
          toEnd = true;
        }
        for (var key in this.easeTasks) {
          this.stopEase(key, toEnd);
        }
        return this;
      }
    }]);
    return EaseData;
  }(ComponentBase);

  var OnInitEaseData = function OnInitEaseData(gameObject, easeData) {
    // Route 'complete' of easeData to gameObject
    easeData.on('complete', function (key) {
      gameObject.emit("easedata.".concat(key, ".complete"), gameObject);
      gameObject.emit('easedata.complete', key, gameObject);
    });
  };
  var EaseDataMethods = {
    easeDataTo: function easeDataTo(key, value, duration, ease) {
      if (!this._easeData) {
        this._easeData = new EaseData(this);
        OnInitEaseData(this, this._easeData);
      }
      this._easeData.easeTo(key, value, duration, ease);
      return this;
    },
    easeDataToPromise: function easeDataToPromise(key, value, duration, ease) {
      this.easeDataTo(key, value, duration, ease);
      return WaitEvent(this._easeData, "complete-".concat(key));
    },
    stopEaseData: function stopEaseData(key, toEnd) {
      if (!this._easeData) {
        return this;
      }
      this._easeData.stopEase(key, toEnd);
      return this;
    },
    stopAllEaseData: function stopAllEaseData(toEnd) {
      if (!this._easeData) {
        return this;
      }
      this._easeData.stopAll(toEnd);
      return this;
    }
  };

  var Show = function Show(gameObject) {
    _hide(gameObject, false);
  };
  var Hide = function Hide(gameObject) {
    _hide(gameObject, true);
  };
  var IsShown = function IsShown(gameObject) {
    if (!gameObject) {
      return false;
    }
    var config = GetSizerConfig$1(gameObject);
    return !config.hidden;
  };
  var _hide = function _hide(gameObject, hidden) {
    if (!gameObject) {
      return;
    }
    var config = GetSizerConfig$1(gameObject);
    config.hidden = hidden;
    var parent = GetParent$1(gameObject);
    if (parent) {
      parent.setChildVisible(gameObject, !hidden);
    } else {
      gameObject.setVisible(!hidden);
    }
  };

  var HideMethods = {
    show: function show(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }
      Show(gameObject);
      return this;
    },
    hide: function hide(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }
      Hide(gameObject);
      return this;
    },
    isShow: function isShow(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }
      return IsShown(gameObject);
    }
  };

  var IsPointInBounds = function IsPointInBounds(gameObject, x, y, preTest, postTest) {
    // Can't get bounds
    if (!gameObject || !gameObject.getBounds) {
      return false;
    }
    if (preTest && !preTest(gameObject, x, y)) {
      return false;
    }
    var boundsRect = GetBounds$1(gameObject, true);
    if (!boundsRect.contains(x, y)) {
      return false;
    }
    if (postTest && !postTest(gameObject, x, y)) {
      return false;
    }
    return true;
  };

  var IsPointerInBounds = function IsPointerInBounds(gameObject, pointer, preTest, postTest) {
    if (pointer) {
      return IsPointInBounds(gameObject, pointer.worldX, pointer.worldY, preTest, postTest);
    } else {
      var inputManager = gameObject.scene.input.manager;
      var pointersTotal = inputManager.pointersTotal;
      var pointers = inputManager.pointers;
      for (var i = 0; i < pointersTotal; i++) {
        pointer = pointers[i];
        if (IsPointInBounds(gameObject, pointer.worldX, pointer.worldY, preTest, postTest)) {
          return true;
        }
      }
      return false;
    }
  };

  var IsInTouching = function IsInTouching(pointer, gameObject) {
    if (gameObject === undefined) {
      gameObject = this;
    }
    return IsPointerInBounds(gameObject, pointer);
  };

  var IsFunction = function IsFunction(obj) {
    return obj && typeof obj === 'function';
  };

  var IsArray = function IsArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var ContainsPoint = function ContainsPoint(gameObject, x, y, preTest, postTest) {
    return IsPointInBounds(gameObject, x, y, GetPreTestCallback(preTest), GetPostTestCallback(postTest));
  };
  var IsNotHiddenSizer = function IsNotHiddenSizer(gameObject) {
    var isHiddenSizer = gameObject.rexSizer && gameObject.rexSizer.hidden;
    return !isHiddenSizer;
  };
  var GetPreTestCallback = function GetPreTestCallback(preTest) {
    if (!preTest) {
      return IsNotHiddenSizer;
    }
    return function (gameObject, x, y) {
      if (!IsNotHiddenSizer(gameObject)) {
        return false;
      }
      preTest(gameObject, x, y);
      return true;
    };
  };
  var GetPostTestCallback = function GetPostTestCallback(postTest) {
    return postTest;
  };

  var PointToChild$1 = function PointToChild(x, y, preTest, postTest, children) {
    if (!IsFunction(preTest)) {
      children = preTest;
      preTest = undefined;
      postTest = undefined;
    }
    if (children === undefined) {
      if (this.sizerChildren) {
        children = this.sizerChildren;
      } else {
        children = this.children;
      }
    }
    if (IsArray(children)) {
      var child;
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (ContainsPoint(child, x, y, preTest, postTest)) {
          return child;
        }
      }
    } else {
      var child;
      for (var key in children) {
        child = children[key];
        if (ContainsPoint(child, x, y, preTest, postTest)) {
          return child;
        }
      }
    }
    return null;
  };

  var GetParent = function GetParent(gameObject, name) {
    var parent;
    if (name === undefined) {
      if (gameObject.hasOwnProperty('rexContainer')) {
        parent = gameObject.rexContainer.parent;
        if (parent && !parent.isRexSizer) {
          parent = null;
        }
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
  var GetParentSizerMethods = {
    getParentSizer: function getParentSizer(gameObject, name) {
      if (typeof gameObject === 'string') {
        name = gameObject;
        gameObject = undefined;
      }
      if (gameObject === undefined) {
        gameObject = this;
      }
      return GetParent(gameObject, name);
    },
    getTopmostSizer: function getTopmostSizer(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }
      return GetTopmostParent(gameObject);
    }
  };

  var ResizeGameObject = function ResizeGameObject(gameObject, newWidth, newHeight) {
    if (!gameObject || newWidth === undefined && newHeight === undefined) {
      return;
    }
    if (gameObject.resize) {
      // Has `resize` method
      if (newWidth === undefined) {
        newWidth = gameObject.width;
      }
      if (newHeight === undefined) {
        newHeight = gameObject.height;
      }
      gameObject.resize(newWidth, newHeight);
    } else {
      // Set display width/height
      if (newWidth !== undefined) {
        gameObject.displayWidth = newWidth;
      }
      if (newHeight !== undefined) {
        gameObject.displayHeight = newHeight;
      }
    }
  };

  var CopyState = function CopyState(gamObject, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = GlobState;
    }
    out.x = gamObject.x;
    out.y = gamObject.y;
    out.scaleX = gamObject.scaleX;
    out.scaleY = gamObject.scaleY;
    out.width = gamObject.width;
    out.height = gamObject.height;
    out.displayWidth = gamObject.displayWidth;
    out.displayHeight = gamObject.displayHeight;
    return out;
  };
  var GlobState = {};

  var PreLayoutChild = function PreLayoutChild(child) {
    if (this.sizerEventsEnable) {
      CopyState(child, this.getChildPrevState(child));
      this.layoutedChildren.push(child);
    }
  };

  var LayoutChild = function LayoutChild(child, x, y, width, height, align, offsetX, offsetY) {
    AlignIn(child, x, y, width, height, align);
    if (offsetX !== undefined) {
      child.x += offsetX;
    }
    if (offsetY !== undefined) {
      child.y += offsetY;
    }
    this.resetChildPositionState(child);
    if (this.sizerEventsEnable) {
      child.emit('sizer.postlayout', child, this);
    }
  };

  var ALIGN_CENTER$3 = Phaser.Display.Align.CENTER;
  var LayoutBackgrounds = function LayoutBackgrounds() {
    if (this.backgroundChildren === undefined) {
      return;
    }
    var backgrounds = this.backgroundChildren;
    var startX = this.left,
      startY = this.top;
    var parentWidth = this.width,
      parentHeight = this.height;
    var child, childConfig, padding, x, y, width, height;
    for (var i = 0, cnt = backgrounds.length; i < cnt; i++) {
      child = backgrounds[i];
      childConfig = child.rexSizer;
      if (childConfig.hidden) {
        continue;
      }
      padding = childConfig.padding;
      PreLayoutChild.call(this, child);
      x = startX + padding.left;
      y = startY + padding.top;
      width = parentWidth - padding.left - padding.right;
      height = parentHeight - padding.top - padding.bottom;
      ResizeGameObject(child, width, height);
      LayoutChild.call(this, child, x, y, width, height, ALIGN_CENTER$3);
    }
  };

  var SetDraggable = function SetDraggable(senser, draggable) {
    var senserType = _typeof(senser);
    if (senserType === 'string') {
      senser = this.getElement(senser);
    } else if (senser === undefined || senserType != 'object') {
      draggable = senser;
      senser = this;
    }
    if (draggable === undefined) {
      draggable = true;
    }
    if (senser.input && senser.input.hasOwnProperty('draggable')) {
      // Draggable is already registered
      senser.input.draggable = draggable;
    } else if (draggable) {
      // Register draggable
      senser.setInteractive();
      senser.scene.input.setDraggable(senser);
      senser.on('drag', function (pointer, dragX, dragY) {
        var topmostParent = this.getTopmostSizer();
        topmostParent.x += dragX - senser.x;
        topmostParent.y += dragY - senser.y;
        topmostParent.emit('sizer.drag', pointer, dragX, dragY);
      }, this).on('dragstart', function (pointer, dragX, dragY) {
        var topmostParent = this.getTopmostSizer();
        topmostParent.emit('sizer.dragstart', pointer, dragX, dragY);
      }, this).on('dragend', function (pointer, dragX, dragY, dropped) {
        var topmostParent = this.getTopmostSizer();
        topmostParent.emit('sizer.dragend', pointer, dragX, dragY, dropped);
      }, this);
    } else ;
    return this;
  };

  var GetValue$1b = Phaser.Utils.Objects.GetValue;
  var Button = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Button, _ComponentBase);
    var _super = _createSuper(Button);
    function Button(gameObject, config) {
      var _this;
      _classCallCheck(this, Button);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;

      _this._enable = undefined;
      gameObject.setInteractive(GetValue$1b(config, "inputConfig", undefined));
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(Button, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.lastClickTime = undefined;
        this.setEnable(GetValue$1b(o, "enable", true));
        this.setMode(GetValue$1b(o, "mode", 1));
        this.setClickInterval(GetValue$1b(o, "clickInterval", 100));
        this.setDragThreshold(GetValue$1b(o, 'threshold', undefined));
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        var gameObject = this.parent;
        gameObject.on('pointerdown', this.onPress, this);
        gameObject.on('pointerup', this.onRelease, this);
        gameObject.on('pointerout', this.onPointOut, this);
        gameObject.on('pointermove', this.onMove, this);
        gameObject.on('pointerover', this.onOver, this);
        gameObject.on('pointerout', this.onOut, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // GameObject events will be removed when this gameObject destroyed 
        // this.parent.on('pointerdown', this.onPress, this);
        // this.parent.on('pointerup', this.onRelease, this);
        // this.parent.on('pointerout', this.onPointOut, this);
        // this.parent.on('pointermove', this.onMove, this);
        this.pointer = null;
        _get(_getPrototypeOf(Button.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }
        if (!e) {
          this.cancel();
        }
        this._enable = e;
        var eventName = e ? 'enable' : 'disable';
        this.emit(eventName, this, this.parent);
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = CLICKMODE$1[m];
        }
        this.mode = m;
        return this;
      }
    }, {
      key: "setClickInterval",
      value: function setClickInterval(interval) {
        this.clickInterval = interval; // ms
        return this;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }

      // internal
    }, {
      key: "onPress",
      value: function onPress(pointer, localX, localY, event) {
        if (this.pointer !== undefined) {
          return;
        }
        this.pointer = pointer;
        if (this.mode === 0) {
          this.click(pointer.downTime, pointer, event);
        }
      }
    }, {
      key: "onRelease",
      value: function onRelease(pointer, localX, localY, event) {
        if (this.pointer !== pointer) {
          return;
        }
        if (this.mode === 1) {
          this.click(pointer.upTime, pointer, event);
        }
        this.pointer = undefined;
      }
    }, {
      key: "onPointOut",
      value: function onPointOut(pointer, event) {
        if (this.pointer !== pointer) {
          return;
        }
        this.cancel();
      }
    }, {
      key: "onMove",
      value: function onMove(pointer, localX, localY, event) {
        if (this.pointer !== pointer) {
          return;
        }
        if (this.dragThreshold === undefined) {
          return;
        }
        if (pointer.getDistance() >= this.dragThreshold) {
          this.cancel();
        }
      }
    }, {
      key: "click",
      value: function click(nowTime, pointer, event) {
        if (!this.enable) {
          return this;
        }
        if (nowTime === undefined) {
          // fires 'click' event manually
          this.emit('click', this, this.parent, pointer, event);
          return this;
        }
        this.pointer = undefined;
        var lastClickTime = this.lastClickTime;
        if (lastClickTime !== undefined && nowTime - lastClickTime <= this.clickInterval) {
          return this;
        }
        this.lastClickTime = nowTime;
        this.emit('click', this, this.parent, pointer, event);
        return this;
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.pointer = undefined;
        return this;
      }
    }, {
      key: "onOver",
      value: function onOver(pointer, localX, localY, event) {
        if (!this.enable) {
          return this;
        }
        this.emit('over', this, this.parent, pointer, event);
        return this;
      }
    }, {
      key: "onOut",
      value: function onOut(pointer, event) {
        if (!this.enable) {
          return this;
        }
        this.emit('out', this, this.parent, pointer, event);
        return this;
      }
    }]);
    return Button;
  }(ComponentBase);
  var CLICKMODE$1 = {
    press: 0,
    pointerdown: 0,
    release: 1,
    pointerup: 1
  };

  var ClickMethods = {
    onClick: function onClick(gameObject, callback, scope, config) {
      if (!gameObject) {
        return this;
      }
      if (typeof gameObject === 'function') {
        config = scope;
        scope = callback;
        callback = gameObject;
        gameObject = this;
      }
      if (gameObject._click === undefined) {
        gameObject._click = new Button(gameObject, config);
      }
      gameObject._click.on('click', callback, scope);
      return this;
    },
    offClick: function offClick(gameObject, callback, scope) {
      if (typeof gameObject === 'function') {
        scope = callback;
        callback = gameObject;
        gameObject = this;
      }
      if (gameObject._click === undefined) {
        return this;
      }
      gameObject._click.off('click', callback, scope);
      return this;
    },
    enableClick: function enableClick(gameObject, enabled) {
      if (gameObject && _typeof(gameObject) !== 'object') {
        enabled = gameObject;
        gameObject = this;
      }
      if (gameObject._click === undefined) {
        return this;
      }
      gameObject._click.setEnable(enabled);
      return this;
    },
    disableClick: function disableClick(gameObject) {
      if (gameObject && _typeof(gameObject) !== 'object') {
        gameObject = this;
      }
      if (gameObject._click === undefined) {
        return this;
      }
      gameObject._click.setEnable(false);
      return this;
    }
  };

  var IsPointerInHitArea = function IsPointerInHitArea(gameObject, pointer, preTest, postTest) {
    if (pointer) {
      if (preTest && !preTest(gameObject, pointer)) {
        return false;
      }
      if (!HitTest(gameObject, pointer)) {
        return false;
      }
      if (postTest && !postTest(gameObject, pointer)) {
        return false;
      }
      return true;
    } else {
      var inputManager = gameObject.scene.input.manager;
      var pointersTotal = inputManager.pointersTotal;
      var pointers = inputManager.pointers,
        pointer;
      for (var i = 0; i < pointersTotal; i++) {
        pointer = pointers[i];
        if (preTest && !preTest(gameObject, pointer)) {
          continue;
        }
        if (!HitTest(gameObject, pointer)) {
          continue;
        }
        if (postTest && !postTest(gameObject, pointer)) {
          continue;
        }
        return true;
      }
      return false;
    }
  };
  var HitTest = function HitTest(gameObject, pointer) {
    var scene = gameObject.scene;
    var cameras = scene.input.cameras.getCamerasBelowPointer(pointer);
    var inputManager = scene.input.manager;
    var gameObjects = [gameObject];
    var output;
    for (var i = 0, len = cameras.length; i < len; i++) {
      output = inputManager.hitTest(pointer, gameObjects, cameras[i]);
      if (output.length > 0) {
        return true;
      }
    }
    return false;
  };

  var GetValue$1a = Phaser.Utils.Objects.GetValue;
  var ClickOutside = /*#__PURE__*/function (_ComponentBase) {
    _inherits(ClickOutside, _ComponentBase);
    var _super = _createSuper(ClickOutside);
    function ClickOutside(gameObject, config) {
      var _this;
      _classCallCheck(this, ClickOutside);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;

      _this._enable = undefined;
      var inputConfig = GetValue$1a(config, "inputConfig", undefined);
      if (inputConfig) {
        gameObject.setInteractive(inputConfig);
      }
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(ClickOutside, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$1a(o, "enable", true));
        this.setMode(GetValue$1a(o, "mode", 1));
        this.setClickInterval(GetValue$1a(o, "clickInterval", 100));
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        var scene = this.parent.scene;
        scene.input.on('pointerdown', this.onPress, this);
        scene.input.on('pointerup', this.onRelease, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        var scene = this.parent.scene;
        scene.input.off('pointerdown', this.onPress, this);
        scene.input.off('pointerup', this.onRelease, this);
        _get(_getPrototypeOf(ClickOutside.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }
        this._enable = e;
        var eventName = e ? 'enable' : 'disable';
        this.emit(eventName, this, this.parent);
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = CLICKMODE[m];
        }
        this.mode = m;
        return this;
      }
    }, {
      key: "setClickInterval",
      value: function setClickInterval(interval) {
        this.clickInterval = interval; // ms
        return this;
      }
    }, {
      key: "isPointerInside",
      value: function isPointerInside(pointer) {
        var gameObject = this.parent;
        var isInsideCallback = gameObject.input ? IsPointerInHitArea : IsPointerInBounds;
        return isInsideCallback(gameObject, pointer);
      }

      // internal
    }, {
      key: "onPress",
      value: function onPress(pointer) {
        if (this.mode === 0) {
          // Do nothing if game object is not visible
          if (!this.parent.willRender(pointer.camera)) {
            return;
          }
          if (!this.isPointerInside(pointer)) {
            this.click(pointer.downTime, pointer);
          }
        }
      }
    }, {
      key: "onRelease",
      value: function onRelease(pointer) {
        if (this.mode === 1) {
          // Do nothing if game object is not visible
          if (!this.parent.willRender(pointer.camera)) {
            return;
          }
          if (!this.isPointerInside(pointer)) {
            this.click(pointer.upTime, pointer);
          }
        }
      }
    }, {
      key: "click",
      value: function click(nowTime, pointer) {
        if (!this.enable) {
          return this;
        }
        if (nowTime === undefined) {
          // fires 'clickoutside' event manually
          this.emit('clickoutside', this, this.parent, pointer);
          return this;
        }
        var lastClickTime = this.lastClickTime;
        if (lastClickTime !== undefined && nowTime - lastClickTime <= this.clickInterval) {
          return this;
        }
        this.lastClickTime = nowTime;
        this.emit('clickoutside', this, this.parent, pointer);
        return this;
      }
    }]);
    return ClickOutside;
  }(ComponentBase);
  var CLICKMODE = {
    press: 0,
    pointerdown: 0,
    release: 1,
    pointerup: 1
  };

  var ClickOutsideMethods = {
    onClickOutside: function onClickOutside(gameObject, callback, scope, config) {
      if (!gameObject) {
        return this;
      }
      if (typeof gameObject === 'function') {
        config = scope;
        scope = callback;
        callback = gameObject;
        gameObject = this;
      }
      if (gameObject._clickOutside === undefined) {
        gameObject._clickOutside = new ClickOutside(gameObject, config);
      }
      gameObject._clickOutside.on('clickoutside', callback, scope);
      return this;
    },
    offClickOutside: function offClickOutside(gameObject, callback, scope) {
      if (typeof gameObject === 'function') {
        scope = callback;
        callback = gameObject;
        gameObject = this;
      }
      if (gameObject._clickOutside === undefined) {
        return this;
      }
      gameObject._clickOutside.off('clickoutside', callback, scope);
      return this;
    },
    enableClickOutside: function enableClickOutside(gameObject, enabled) {
      if (gameObject && _typeof(gameObject) !== 'object') {
        enabled = gameObject;
        gameObject = this;
      }
      if (gameObject._clickOutside === undefined) {
        return this;
      }
      gameObject._clickOutside.setEnable(enabled);
      return this;
    },
    disableClickOutside: function disableClickOutside(gameObject) {
      if (gameObject && _typeof(gameObject) !== 'object') {
        gameObject = this;
      }
      if (gameObject._clickOutside === undefined) {
        return this;
      }
      gameObject._clickOutside.setEnable(false);
      return this;
    }
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
  var GetValue$19 = function GetValue(source, key, defaultValue) {
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

  var StateProperties$1 = ['next', 'exit', 'enter'];
  var FSM$1 = /*#__PURE__*/function () {
    /*
    var config = {
        start: 'A',   // default: undefined
        states: {
            A: {
                next: 'B',  // function() { return 'B'; }
                enter: function() {},
                exit: function() {},
            },
            // ...
        },        
        extend: {
            i: 0,
            name: 'abc'
            // ...
        },
        init: function() {},
        enable: true,
        eventEmitter: true,
    };
    */
    function FSM(config) {
      _classCallCheck(this, FSM);
      // Attach get-next-state function
      var states = GetValue$19(config, 'states', undefined);
      if (states) {
        this.addStates(states);
      }

      // Attach extend members
      var extend = GetValue$19(config, 'extend', undefined);
      if (extend) {
        for (var name in extend) {
          if (!this.hasOwnProperty(name) || this[name] === undefined) {
            this[name] = extend[name];
          }
        }
      }

      // Event emitter
      var eventEmitter = GetValue$19(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue$19(config, 'EventEmitterClass', undefined);
      this.setEventEmitter(eventEmitter, EventEmitterClass);
      this._stateLock = false;
      this.resetFromJSON(config);
    }
    _createClass(FSM, [{
      key: "shutdown",
      value: function shutdown() {
        this.destroyEventEmitter();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$19(o, 'enable', true));
        this.start(GetValue$19(o, 'start', undefined));
        var init = GetValue$19(o, 'init', undefined);
        if (init) {
          init.call(this);
        }
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          curState: this.state,
          prevState: this.prevState,
          enable: this.enable,
          start: this._start
        };
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "state",
      get: function get() {
        return this._state;
      },
      set: function set(newState) {
        if (!this.enable || this._stateLock) {
          return;
        }
        if (this._state === newState) {
          return;
        }
        this._prevState = this._state;
        this._state = newState;
        this._stateLock = true; // lock state

        this.emit('statechange', this);
        if (this._prevState != null) {
          var exitEventName = 'exit_' + this._prevState;
          var exitCallback = this[exitEventName];
          if (exitCallback) {
            exitCallback.call(this);
          }
          this.emit(exitEventName, this);
        }
        this._stateLock = false;
        if (this._state != null) {
          var enterEventName = 'enter_' + this._state;
          var enterCallback = this[enterEventName];
          if (enterCallback) {
            enterCallback.call(this);
          }
          this.emit(enterEventName, this);
        }
      }
    }, {
      key: "prevState",
      get: function get() {
        return this._prevState;
      }
    }, {
      key: "start",
      value: function start(state) {
        this._start = state;
        this._prevState = undefined;
        this._state = state; // Won't fire statechange events
        return this;
      }
    }, {
      key: "goto",
      value: function goto(nextState) {
        if (nextState != null) {
          this.state = nextState;
        }
        return this;
      }
    }, {
      key: "next",
      value: function next() {
        var nextState;
        var getNextState = this['next_' + this.state];
        if (getNextState) {
          if (typeof getNextState === 'string') {
            nextState = getNextState;
          } else {
            nextState = getNextState.call(this);
          }
        }
        this["goto"](nextState);
        return this;
      }
    }, {
      key: "stateProperties",
      get: function get() {
        return StateProperties$1;
      }
    }, {
      key: "addState",
      value: function addState(name, state) {
        if (typeof name !== 'string') {
          state = name;
          name = state.name;
        }
        var stateProperties = this.stateProperties;
        for (var i = 0, cnt = stateProperties.length; i < cnt; i++) {
          var propertyName = stateProperties[i];
          var propertyValue = state[propertyName];
          if (propertyValue) {
            this["".concat(propertyName, "_").concat(name)] = propertyValue;
          }
        }
        return this;
      }
    }, {
      key: "addStates",
      value: function addStates(states) {
        if (Array.isArray(states)) {
          for (var i = 0, cnt = states.length; i < cnt; i++) {
            this.addState(states[i]);
          }
        } else {
          for (var name in states) {
            this.addState(name, states[name]);
          }
        }
        return this;
      }
    }, {
      key: "runMethod",
      value: function runMethod(methodName, a1, a2, a3, a4, a5) {
        var fn = this[methodName + '_' + this.state];
        if (!fn) {
          return undefined;
        }

        // Copy from eventemitter3
        var len = arguments.length;
        switch (len) {
          case 1:
            return fn.call(this);
          case 2:
            return fn.call(this, a1);
          case 3:
            return fn.call(this, a1, a2);
          case 4:
            return fn.call(this, a1, a2, a3);
          case 5:
            return fn.call(this, a1, a2, a3, a4);
          case 6:
            return fn.call(this, a1, a2, a3, a4, a5);
        }
        var args = new Array(len - 1);
        for (var i = 1; i < len; i++) {
          args[i - 1] = arguments[i];
        }
        return fn.apply(this, args);
      }
    }]);
    return FSM;
  }();
  Object.assign(FSM$1.prototype, EventEmitterMethods);

  var HasListener = function HasListener(eventEmitter, eventName, fn, context, once) {
    if (once === undefined) {
      once = false;
    }
    var listeners = eventEmitter._events[eventName];
    if (!listeners) {
      return false;
    }
    for (var i = 0, cnt = listeners.length; i < cnt; i++) {
      var listener = listeners[i];
      if (listener.fn === fn && listener.context === context && listener.once === once) {
        return true;
      }
    }
    return false;
  };

  var StateProperties = ['next', 'exit', 'enter', 'update', 'preupdate', 'postupdate'];
  var FSM = /*#__PURE__*/function (_FSMBase) {
    _inherits(FSM, _FSMBase);
    var _super = _createSuper(FSM);
    function FSM() {
      _classCallCheck(this, FSM);
      return _super.apply(this, arguments);
    }
    _createClass(FSM, [{
      key: "shutdown",
      value:
      /*
      var config = {
          start: 'A',   // default: undefined
          states: {
              A: {
                  next: 'B',  // function() { return 'B'; }
                  enter: function() {},
                  exit: function() {},
                  update: function(time, delta) {},
                  preupdate: function(time, delta) {},
                  postupdate: function(time, delta) {},
              },
              // ...
          },        
          extend: {
              i: 0,
              name: 'abc'
              // ...
          },
          init: function() {},
          enable: true,
          scene: undefined,
          eventEmitter: true,
      };
      */
      function shutdown() {
        this.stopUpdate();
        this.stopPreUpdate();
        this.stopPostUpdate();
        this._scene = undefined;
        _get(_getPrototypeOf(FSM.prototype), "shutdown", this).call(this);
      }
    }, {
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(FSM.prototype), "resetFromJSON", this).call(this, o);
        this._scene = GetValue$19(o, 'scene', undefined);
        return this;
      }
    }, {
      key: "stateProperties",
      get: function get() {
        return StateProperties;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        this.runMethod('update', time, delta);
      }
    }, {
      key: "preupdate",
      value: function preupdate(time, delta) {
        this.runMethod('preupdate', time, delta);
      }
    }, {
      key: "postupdate",
      value: function postupdate(time, delta) {
        this.runMethod('postupdate', time, delta);
      }
    }, {
      key: "startUpdate",
      value: function startUpdate(scene) {
        if (!scene) {
          scene = this._scene;
        }
        var eventEmitter = scene.sys.events;
        if (HasListener(eventEmitter, 'update', this.update, this)) {
          return this;
        }
        this._scene = scene;
        eventEmitter.on('update', this.update, this);
        return this;
      }
    }, {
      key: "stopUpdate",
      value: function stopUpdate() {
        if (!this._scene) {
          return this;
        }
        this._scene.sys.events.off('update', this.update, this);
        return this;
      }
    }, {
      key: "startPreUpdate",
      value: function startPreUpdate(scene) {
        if (!scene) {
          scene = this._scene;
        }
        var eventEmitter = scene.sys.events;
        if (HasListener(eventEmitter, 'preupdate', this.preupdate, this)) {
          return this;
        }
        this._scene = scene;
        eventEmitter.on('preupdate', this.preupdate, this);
        return this;
      }
    }, {
      key: "stopPreUpdate",
      value: function stopPreUpdate() {
        if (!this._scene) {
          return this;
        }
        this._scene.sys.events.off('preupdate', this.preupdate, this);
        return this;
      }
    }, {
      key: "startPostUpdate",
      value: function startPostUpdate(scene) {
        if (!scene) {
          scene = this._scene;
        }
        var eventEmitter = scene.sys.events;
        if (HasListener(eventEmitter, 'postupdate', this.postupdate, this)) {
          return this;
        }
        this._scene = scene;
        eventEmitter.on('postupdate', this.postupdate, this);
        return this;
      }
    }, {
      key: "stopPostUpdate",
      value: function stopPostUpdate() {
        if (!this._scene) {
          return this;
        }
        this._scene.sys.events.off('postupdate', this.postupdate, this);
        return this;
      }
    }]);
    return FSM;
  }(FSM$1);

  var Cooldown = /*#__PURE__*/function (_FSM) {
    _inherits(Cooldown, _FSM);
    var _super = _createSuper(Cooldown);
    function Cooldown() {
      var _this;
      _classCallCheck(this, Cooldown);
      _this = _super.call(this, {
        eventEmitter: false
      });
      _this["goto"]('IDLE');
      return _this;
    }
    _createClass(Cooldown, [{
      key: "setCooldownTime",
      value: function setCooldownTime(time) {
        this.cooldownTime = time;
        this.cooldownMode = time !== undefined;
        return this;
      }
    }, {
      key: "request",
      value: function request() {
        return this.runMethod('request');
      }

      // IDLE state
    }, {
      key: "update_IDLE",
      value: function update_IDLE() {
        this.compensationTime = 0;
      }
    }, {
      key: "request_IDLE",
      value: function request_IDLE() {
        this.next();
        return true;
      }
    }, {
      key: "next_IDLE",
      value: function next_IDLE() {
        if (this.cooldownMode) {
          return 'COOLDOWN';
        }
      }

      // COOLDOWN state
    }, {
      key: "enter_COOLDOWN",
      value: function enter_COOLDOWN() {
        this.remainderTime = this.cooldownTime + this.compensationTime;
      }
    }, {
      key: "update_COOLDOWN",
      value: function update_COOLDOWN(time, delta) {
        this.remainderTime -= delta;
        if (this.remainderTime < 0) {
          this.compensationTime = this.cooldownTime > delta ? -this.remainderTime : 0;
          this["goto"]('IDLE');
        }
      }
    }, {
      key: "request_COOLDOWN",
      value: function request_COOLDOWN() {
        return false;
      }
    }]);
    return Cooldown;
  }(FSM);

  var GetValue$18 = Phaser.Utils.Objects.GetValue;
  var InTouching = /*#__PURE__*/function (_ComponentBase) {
    _inherits(InTouching, _ComponentBase);
    var _super = _createSuper(InTouching);
    function InTouching(gameObject, config) {
      var _this;
      _classCallCheck(this, InTouching);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;

      _this._enable = undefined;
      _this.cooldown = new Cooldown();
      _this.parent.setInteractive(GetValue$18(config, 'inputConfig', undefined));
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(InTouching, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.isInTouching = false;
        this.setEnable(GetValue$18(o, 'enable', true));
        this.setCooldown(GetValue$18(o, 'cooldown', undefined));
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        var gameObject = this.parent;
        gameObject.on('pointerdown', this.onPointIn, this);
        gameObject.on('pointerover', this.onPointIn, this);
        gameObject.on('pointerup', this.onPointOut, this);
        gameObject.on('pointerout', this.onPointOut, this);
        this.scene.sys.events.on('preupdate', this.preupdate, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // GameObject events will be removed when this gameObject destroyed 
        // this.parent.off('pointerdown', this.onPointIn, this);
        // this.parent.off('pointerover', this.onPointIn, this);
        // this.parent.off('pointerup', this.onPointOut, this);
        // this.parent.off('pointerout', this.onPointOut, this);
        this.scene.sys.events.off('preupdate', this.preupdate, this);
        this.pointer = undefined;
        _get(_getPrototypeOf(InTouching.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }
        if (!e) {
          this.isInTouching = false;
          this.pointer = undefined;
        }
        this._enable = e;
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "cooldownTime",
      get: function get() {
        return this.cooldown.cooldownTime;
      },
      set: function set(time) {
        this.cooldown.setCooldownTime(time);
      }
    }, {
      key: "setCooldown",
      value: function setCooldown(time) {
        this.cooldownTime = time;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }

      // internal
    }, {
      key: "onPointIn",
      value: function onPointIn(pointer, localX, localY) {
        if (!this.enable || !pointer.isDown || this.pointer !== undefined) {
          return;
        }
        this.pointer = pointer;
        this.isInTouching = true;
      }
    }, {
      key: "onPointOut",
      value: function onPointOut(pointer) {
        if (!this.enable || this.pointer !== pointer) {
          return;
        }
        this.pointer = undefined;
        this.isInTouching = false;
      }
    }, {
      key: "preupdate",
      value: function preupdate(time, delta) {
        this.cooldown.update(time, delta);
        if (this.isInTouching && this.cooldown.request()) {
          this.emit('intouch', this, this.parent, this.pointer);
        }
      }
    }]);
    return InTouching;
  }(ComponentBase);

  var TouchingMethods = {
    onTouching: function onTouching(gameObject, callback, scope, config) {
      if (!gameObject) {
        return this;
      }
      if (typeof gameObject === 'function') {
        config = scope;
        scope = callback;
        callback = gameObject;
        gameObject = this;
      }
      if (gameObject._inTouching === undefined) {
        gameObject._inTouching = new InTouching(gameObject, config);
      }
      gameObject._inTouching.on('intouch', callback, scope);
      return this;
    },
    offTouching: function offTouching(gameObject, callback, scope) {
      if (typeof gameObject === 'function') {
        scope = callback;
        callback = gameObject;
        gameObject = this;
      }
      if (gameObject._inTouching === undefined) {
        return this;
      }
      gameObject._inTouching.off('intouch', callback, scope);
      return this;
    },
    enableTouching: function enableTouching(gameObject, enabled) {
      if (gameObject && _typeof(gameObject) !== 'object') {
        enabled = gameObject;
        gameObject = this;
      }
      if (gameObject._inTouching === undefined) {
        return this;
      }
      gameObject._inTouching.setEnable(enabled);
      return this;
    },
    disableTouching: function disableTouching(gameObject) {
      if (gameObject && _typeof(gameObject) !== 'object') {
        gameObject = this;
      }
      if (gameObject._inTouching === undefined) {
        return this;
      }
      gameObject._inTouching.setEnable(false);
      return this;
    }
  };

  var PointToChild = function PointToChild(parents, x, y) {
    var parent;
    for (var i = 0, cnt = parents.length; i < cnt; i++) {
      parent = parents[i];
      if (!ContainsPoint(parent, x, y)) {
        continue;
      }
      return parent.pointToChild(x, y);
    }
    return null;
  };

  var EmitChildEvent = function EmitChildEvent(eventEmitter, eventName, parents, x, y, pointer, event) {
    var child;
    if (y === undefined) {
      child = x;
    } else {
      child = PointToChild(parents, x, y);
    }
    if (!child) {
      return;
    }
    eventEmitter.emit(eventName, child, pointer, event);
  };

  var GetValue$17 = Phaser.Utils.Objects.GetValue;
  var DownChild = function DownChild(config) {
    var downConfig = GetValue$17(config, 'down', undefined);
    if (downConfig === false) {
      return;
    } else if (downConfig === true) {
      downConfig = undefined;
    }
    this.on('pointerdown', OnDown, this);
  };
  var OnDown = function OnDown(pointer, localX, localY, event) {
    var childrenInteractive = this._childrenInteractive;
    EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "down"), childrenInteractive.targetSizers, pointer.worldX, pointer.worldY, pointer, event);
  };

  var GetValue$16 = Phaser.Utils.Objects.GetValue;
  var UpChild = function UpChild(config) {
    var upConfig = GetValue$16(config, 'up', undefined);
    if (upConfig === false) {
      return;
    } else if (upConfig === true) {
      upConfig = undefined;
    }
    this.on('pointerup', OnUp, this);
  };
  var OnUp = function OnUp(pointer, localX, localY, event) {
    var childrenInteractive = this._childrenInteractive;
    EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "up"), childrenInteractive.targetSizers, pointer.worldX, pointer.worldY, pointer, event);
  };

  var GetValue$15 = Phaser.Utils.Objects.GetValue;
  var OverChild = function OverChild(config) {
    var overConfig = GetValue$15(config, 'over', undefined);
    if (overConfig === false) {
      return;
    } else if (overConfig === true) {
      overConfig = undefined;
    }
    this.on('pointermove', OnMove, this).on('pointerover', OnMove, this).on('pointerout', OnOut, this); // pointer-up is included too
  };

  var OnMove = function OnMove(pointer, localX, localY, event) {
    var childrenInteractive = this._childrenInteractive;
    var child = PointToChild(childrenInteractive.targetSizers, pointer.worldX, pointer.worldY);
    var preChild = childrenInteractive.lastOverChild;
    if (child && preChild && child === preChild) {
      return;
    }
    childrenInteractive.lastOverChild = child;
    EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "out"), childrenInteractive.targetSizers, preChild, undefined, pointer, event);
    EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "over"), childrenInteractive.targetSizers, child, undefined, pointer, event);
  };
  var OnOut = function OnOut(pointer, event) {
    var childrenInteractive = this._childrenInteractive;
    var child = childrenInteractive.lastOverChild;
    childrenInteractive.lastOverChild = null;
    EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "out"), childrenInteractive.targetSizers, child, undefined, pointer, event);
  };

  var GetValue$14 = Phaser.Utils.Objects.GetValue;
  var ClickChild = function ClickChild(config) {
    var clickConfig = GetValue$14(config, 'click', undefined);
    if (clickConfig === false) {
      return;
    } else if (clickConfig === true) {
      clickConfig = undefined;
    }
    if (clickConfig === undefined) {
      clickConfig = {};
    }
    if (!clickConfig.hasOwnProperty('threshold')) {
      clickConfig.threshold = 10;
    }
    var childrenInteractive = this._childrenInteractive;
    this._click = new Button(this, clickConfig);
    this._click.on('click', function (button, gameObject, pointer, event) {
      EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "click"), childrenInteractive.targetSizers, pointer.worldX, pointer.worldY, pointer, event);
    }, this);
  };

  var GetValue$13 = Phaser.Utils.Objects.GetValue;
  var OnePointerTracer = /*#__PURE__*/function (_TickTask) {
    _inherits(OnePointerTracer, _TickTask);
    var _super = _createSuper(OnePointerTracer);
    function OnePointerTracer(gameObject, config) {
      var _this;
      _classCallCheck(this, OnePointerTracer);
      var scene = GetSceneObject(gameObject);
      if (scene === gameObject) {
        gameObject = undefined;
      }
      _this = _super.call(this, scene, config);
      _this.gameObject = gameObject;
      if (gameObject) {
        gameObject.setInteractive(GetValue$13(config, "inputConfig", undefined));
      }
      _this._enable = undefined;
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(OnePointerTracer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$13(o, 'enable', true));
        this.setDetectBounds();
        if (this.gameObject === undefined) {
          this.setDetectBounds(GetValue$13(o, 'bounds', undefined));
        } else {
          this.setDetectBounds();
        }
        this.tracerState = TOUCH0$1;
        // this.recongizedState = new stateClass(this);
        this.pointer = undefined;
        this.lastPointer = undefined; // Last catched pointer
        this.movedState = false;
        this.isTouchingAnyObject = false;
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        _get(_getPrototypeOf(OnePointerTracer.prototype), "boot", this).call(this);
        if (this.gameObject) {
          this.gameObject.on('pointerdown', this.onPointerDown, this);
        } else {
          this.scene.input.on('pointerdown', this.onPointerDown, this);
        }
        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('gameout', this.dragCancel, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.sys.events.once('shutdown', this.destroy, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        if (!this.scene) {
          return;
        }
        if (this.gameObject) ; else {
          this.scene.input.off('pointerdown', this.onPointerDown, this);
        }
        this.scene.input.off('pointerup', this.onPointerUp, this);
        this.scene.input.off('gameout', this.dragCancel, this);
        this.scene.input.off('pointermove', this.onPointerMove, this);
        this.scene.sys.events.off('shutdown', this.destroy, this);
        this.gameObject = undefined;
        this.bounds = undefined;
        this.pointer = undefined;
        this.lastPointer = undefined; // Last catched pointer
        this.movedState = false;
        _get(_getPrototypeOf(OnePointerTracer.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }
        if (!e) {
          this.dragCancel();
        }
        this._enable = e;
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "setDetectBounds",
      value: function setDetectBounds(bounds) {
        this.bounds = bounds;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "onPointerDown",
      value: function onPointerDown(pointer, gameObjects) {
        if (!this.enable) {
          return;
        }
        if (this.pointer !== undefined) {
          return;
        }
        var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;
        if (!isInsideBounds) {
          return;
        }
        if (this.pointer === pointer) {
          return;
        }
        this.pointer = pointer;
        this.lastPointer = pointer;
        this.movedState = false;
        this.tracerState = TOUCH1$1;
        if (this.gameObject === undefined) {
          this.isTouchingAnyObject = gameObjects.length > 0;
        }
        this.onDragStart();
      }
    }, {
      key: "onPointerUp",
      value: function onPointerUp(pointer) {
        if (!this.enable) {
          return;
        }
        var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;
        if (!isInsideBounds) {
          return;
        }
        if (this.pointer !== pointer) {
          return;
        }
        this.pointer = undefined;
        this.movedState = false;
        this.tracerState = TOUCH0$1;
        this.onDragEnd();
      }
    }, {
      key: "onPointerMove",
      value: function onPointerMove(pointer) {
        if (!this.enable) {
          return;
        }
        if (pointer.isDown) {
          var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;
          var isCatchedPointer = this.pointer === pointer;
          if (!isCatchedPointer && isInsideBounds) ; else if (isCatchedPointer && !isInsideBounds) {
            // Pointer moves out of bounds
            this.onPointerUp(pointer);
          } else {
            // Pointer drags in bounds
            if (!this.movedState) {
              this.movedState = pointer.x !== pointer.downX || pointer.y !== pointer.downY;
            }
            if (this.movedState) {
              this.onDrag();
            }
          }
        }
      }
    }, {
      key: "dragCancel",
      value: function dragCancel() {
        if (this.tracerState === TOUCH1$1) {
          this.onDragEnd();
        }
        this.pointer = undefined;
        this.tracerState = TOUCH0$1;
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        this.emit('dragstart', this);
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.emit('dragend', this);
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        this.emit('drag', this);
      }

      // onLastPointerMove() { }
    }, {
      key: "preUpdate",
      value: function preUpdate(time, delta) {}
    }, {
      key: "postUpdate",
      value: function postUpdate(time, delta) {}
    }, {
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(OnePointerTracer.prototype), "startTicking", this).call(this);
        this.scene.sys.events.on('preupdate', this.preUpdate, this);
        this.scene.sys.events.on('postupdate', this.postUpdate, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(OnePointerTracer.prototype), "stopTicking", this).call(this);
        if (this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off('preupdate', this.preUpdate, this);
          this.scene.sys.events.off('postupdate', this.postUpdate, this);
        }
      }
    }, {
      key: "setRecongizedStateObject",
      value: function setRecongizedStateObject(stateObject) {
        this.recongizedState = stateObject;
        return this;
      }
    }, {
      key: "state",
      get: function get() {
        return this.recongizedState.state;
      },
      set: function set(newState) {
        this.recongizedState.state = newState;
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.state = IDLE$5;
        return this;
      }
    }]);
    return OnePointerTracer;
  }(TickTask);
  var TOUCH0$1 = 0;
  var TOUCH1$1 = 1;
  var IDLE$5 = 'IDLE';

  var GetValue$12 = Phaser.Utils.Objects.GetValue;
  var DistanceBetween$4 = Phaser.Math.Distance.Between;
  var Tap = /*#__PURE__*/function (_OnePointerTracer) {
    _inherits(Tap, _OnePointerTracer);
    var _super = _createSuper(Tap);
    function Tap(gameObject, config) {
      var _this;
      _classCallCheck(this, Tap);
      _this = _super.call(this, gameObject, config);
      var self = _assertThisInitialized(_this);
      var stateConfig = {
        states: {
          IDLE: {
            enter: function enter() {
              self.stop();
              self.tapsCount = 0;
              self.x = 0;
              self.y = 0;
              self.worldX = 0;
              self.worldY = 0;
            },
            exit: function exit() {
              var pointer = self.lastPointer;
              self.x = pointer.x;
              self.y = pointer.y;
              self.worldX = pointer.worldX;
              self.worldY = pointer.worldY;
            }
          },
          BEGIN: {
            enter: function enter() {
              self.start();
              self.tapsCount = 0;
              self.emit('tappingstart', self, self.gameObject, self.lastPointer);
            }
          },
          RECOGNIZED: {
            enter: function enter() {
              self.start();
              self.emit('tap', self, self.gameObject, self.lastPointer);
              self.emit("".concat(self.tapsCount, "tap"), self, self.gameObject, self.lastPointer);
            }
          }
        },
        init: function init() {
          this.state = IDLE$4;
        },
        eventEmitter: false
      };
      _this.setRecongizedStateObject(new FSM(stateConfig));
      return _this;
    }
    _createClass(Tap, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Tap.prototype), "resetFromJSON", this).call(this, o);
        this.setHoldTime(GetValue$12(o, 'time', 250)); // min-hold-time of Press is 251
        this.setTapInterval(GetValue$12(o, 'tapInterval', 200));
        this.setDragThreshold(GetValue$12(o, 'threshold', 9));
        this.setTapOffset(GetValue$12(o, 'tapOffset', 10));
        var taps = GetValue$12(o, 'taps', undefined);
        if (taps !== undefined) {
          this.setTaps(taps);
        } else {
          this.setMaxTaps(GetValue$12(o, 'maxTaps', undefined));
          this.setMinTaps(GetValue$12(o, 'minTaps', undefined));
        }
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        switch (this.state) {
          case IDLE$4:
            this.state = BEGIN$3;
            break;
          case BEGIN$3:
            var pointer = this.lastPointer;
            var tapsOffset = DistanceBetween$4(pointer.upX, pointer.upY, pointer.x, pointer.y);
            if (tapsOffset > this.tapOffset) {
              // Can't recognize next level, restart here
              this.state = RECOGNIZED$3;
              this.state = BEGIN$3;
            }
            break;
          case RECOGNIZED$3:
            this.state = BEGIN$3;
            break;
        }
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        if (this.state === BEGIN$3) {
          this.tapsCount++; // Try recognize next level
          this.emit('tapping', this, this.gameObject, this.lastPointer);
          if (this.maxTaps !== undefined && this.tapsCount === this.maxTaps) {
            // Reach to maxTaps, stop here                
            this.state = RECOGNIZED$3;
          }
        }
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        if (this.state === IDLE$4) {
          return;
        }
        if (this.pointer.getDistance() > this.dragThreshold) {
          // Cancel
          this.state = IDLE$4;
        }
      }
    }, {
      key: "preUpdate",
      value: function preUpdate(time, delta) {
        if (!this.isRunning || !this.enable) {
          return;
        }
        if (this.state === BEGIN$3) {
          var pointer = this.lastPointer;
          if (pointer.isDown) {
            var holdTime = time - pointer.downTime;
            if (holdTime > this.holdTime) {
              this.state = IDLE$4;
            }
          } else {
            // isUp
            var releasedTime = time - pointer.upTime;
            if (releasedTime > this.tapInterval) {
              if (this.minTaps === undefined || this.tapsCount >= this.minTaps) {
                this.state = RECOGNIZED$3;
              } else {
                this.state = IDLE$4;
              }
            }
          }
        }
      }
    }, {
      key: "postUpdate",
      value: function postUpdate(time, delta) {
        if (!this.isRunning || !this.enable) {
          return;
        }
        // Clear RECOGNIZED after update()
        if (this.state === RECOGNIZED$3) {
          this.state = IDLE$4;
        }
      }
    }, {
      key: "isTapped",
      get: function get() {
        return this.state === RECOGNIZED$3;
      }
    }, {
      key: "setHoldTime",
      value: function setHoldTime(time) {
        this.holdTime = time; // ms
        return this;
      }
    }, {
      key: "setTapInterval",
      value: function setTapInterval(time) {
        this.tapInterval = time; // ms
        return this;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }, {
      key: "setTapOffset",
      value: function setTapOffset(distance) {
        this.tapOffset = distance;
        return this;
      }
    }, {
      key: "setMaxTaps",
      value: function setMaxTaps(taps) {
        this.maxTaps = taps;
        return this;
      }
    }, {
      key: "setMinTaps",
      value: function setMinTaps(taps) {
        this.minTaps = taps;
        return this;
      }
    }, {
      key: "setTaps",
      value: function setTaps(minTaps, maxTaps) {
        if (maxTaps === undefined) {
          maxTaps = minTaps;
        }
        this.setMinTaps(minTaps).setMaxTaps(maxTaps);
        return this;
      }
    }]);
    return Tap;
  }(OnePointerTracer);
  var IDLE$4 = 'IDLE';
  var BEGIN$3 = 'BEGIN';
  var RECOGNIZED$3 = 'RECOGNIZED';

  var GetValue$11 = Phaser.Utils.Objects.GetValue;
  var Press = /*#__PURE__*/function (_OnePointerTracer) {
    _inherits(Press, _OnePointerTracer);
    var _super = _createSuper(Press);
    function Press(gameObject, config) {
      var _this;
      _classCallCheck(this, Press);
      _this = _super.call(this, gameObject, config);
      var self = _assertThisInitialized(_this);
      var stateConfig = {
        states: {
          IDLE: {
            enter: function enter() {
              self.x = 0;
              self.y = 0;
              self.worldX = 0;
              self.worldY = 0;
            },
            exit: function exit() {
              var pointer = self.lastPointer;
              self.x = pointer.x;
              self.y = pointer.y;
              self.worldX = pointer.worldX;
              self.worldY = pointer.worldY;
            }
          },
          BEGIN: {
            enter: function enter() {
              self.start();
            },
            exit: function exit() {
              self.stop();
            }
          },
          RECOGNIZED: {
            enter: function enter() {
              self.emit('pressstart', self, self.gameObject, self.lastPointer);
            },
            exit: function exit() {
              self.emit('pressend', self, self.gameObject, self.lastPointer);
            }
          }
        },
        init: function init() {
          this.state = IDLE$3;
        },
        eventEmitter: false
      };
      _this.setRecongizedStateObject(new FSM(stateConfig));
      return _this;
    }
    _createClass(Press, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Press.prototype), "resetFromJSON", this).call(this, o);
        this.setDragThreshold(GetValue$11(o, 'threshold', 9));
        this.setHoldTime(GetValue$11(o, 'time', 251));
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        this.state = BEGIN$2;
        if (this.holdTime === 0) {
          this.state = RECOGNIZED$2;
        }
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.state = IDLE$3;
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        if (this.state === IDLE$3) {
          return;
        }
        if (this.pointer.getDistance() > this.dragThreshold) {
          this.state = IDLE$3;
        }
      }
    }, {
      key: "preUpdate",
      value: function preUpdate(time, delta) {
        if (!this.isRunning || !this.enable) {
          return;
        }
        if (this.state === BEGIN$2) {
          var holdTime = time - this.pointer.downTime;
          if (holdTime >= this.holdTime) {
            this.state = RECOGNIZED$2;
          }
        }
      }
    }, {
      key: "isPressed",
      get: function get() {
        return this.state === RECOGNIZED$2;
      }
    }, {
      key: "setHoldTime",
      value: function setHoldTime(time) {
        this.holdTime = time; // ms
        return this;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }]);
    return Press;
  }(OnePointerTracer);
  var IDLE$3 = 'IDLE';
  var BEGIN$2 = 'BEGIN';
  var RECOGNIZED$2 = 'RECOGNIZED';

  Phaser.Utils.Objects.GetValue;

  var GetTickDelta = function GetTickDelta(game) {
    return GetGame(game).loop.delta;
  };

  var DistanceBetween$3 = Phaser.Math.Distance.Between;
  var AngleBetween$1 = Phaser.Math.Angle.Between;
  var VelocityMethods = {
    getDt: function getDt() {
      var dt = GetTickDelta(this.scene);
      return dt;
    },
    getVelocity: function getVelocity() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var d = DistanceBetween$3(p0.x, p0.y, p1.x, p1.y);
      var velocity = d / (this.getDt() * 0.001);
      return velocity;
    },
    getVelocityX: function getVelocityX() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var d = Math.abs(p1.x - p0.x);
      var velocity = d / (this.getDt() * 0.001);
      return velocity;
    },
    getVelocityY: function getVelocityY() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var d = Math.abs(p1.y - p0.y);
      var velocity = d / (this.getDt() * 0.001);
      return velocity;
    },
    getVelocityAngle: function getVelocityAngle() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var angle = AngleBetween$1(p0.x, p0.y, p1.x, p1.y);
      return angle;
    }
  };

  var DIRMODE = {
    'up&down': 0,
    'left&right': 1,
    '4dir': 2,
    '8dir': 3
  };

  var AngleToDirections = function AngleToDirections(angle, dirMode, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globOut;
    }
    out.left = false;
    out.right = false;
    out.up = false;
    out.down = false;
    angle = (angle + 360) % 360;
    switch (dirMode) {
      case 0:
        // up & down
        if (angle < 180) {
          out.down = true;
        } else {
          out.up = true;
        }
        break;
      case 1:
        // left & right
        if (angle > 90 && angle <= 270) {
          out.left = true;
        } else {
          out.right = true;
        }
        break;
      case 2:
        // 4 dir
        if (angle > 45 && angle <= 135) {
          out.down = true;
        } else if (angle > 135 && angle <= 225) {
          out.left = true;
        } else if (angle > 225 && angle <= 315) {
          out.up = true;
        } else {
          out.right = true;
        }
        break;
      case 3:
        // 8 dir
        if (angle > 22.5 && angle <= 67.5) {
          out.down = true;
          out.right = true;
        } else if (angle > 67.5 && angle <= 112.5) {
          out.down = true;
        } else if (angle > 112.5 && angle <= 157.5) {
          out.down = true;
          out.left = true;
        } else if (angle > 157.5 && angle <= 202.5) {
          out.left = true;
        } else if (angle > 202.5 && angle <= 247.5) {
          out.left = true;
          out.up = true;
        } else if (angle > 247.5 && angle <= 292.5) {
          out.up = true;
        } else if (angle > 292.5 && angle <= 337.5) {
          out.up = true;
          out.right = true;
        } else {
          out.right = true;
        }
        break;
    }
    return out;
  };
  var globOut = {};

  var GetValue$10 = Phaser.Utils.Objects.GetValue;
  var RadToDeg$2 = Phaser.Math.RadToDeg;
  var Swipe = /*#__PURE__*/function (_OnePointerTracer) {
    _inherits(Swipe, _OnePointerTracer);
    var _super = _createSuper(Swipe);
    function Swipe(gameObject, config) {
      var _this;
      _classCallCheck(this, Swipe);
      _this = _super.call(this, gameObject, config);
      var self = _assertThisInitialized(_this);
      var stateConfig = {
        states: {
          IDLE: {
            enter: function enter() {
              self.x = 0;
              self.y = 0;
              self.worldX = 0;
              self.worldY = 0;
            },
            exit: function exit() {
              var pointer = self.lastPointer;
              self.x = pointer.x;
              self.y = pointer.y;
              self.worldX = pointer.worldX;
              self.worldY = pointer.worldY;
            }
          },
          BEGIN: {
            enter: function enter() {
              self.validDrag = false;
            }
          },
          RECOGNIZED: {
            enter: function enter() {
              self.start();
              self.updateDirectionStates();
              self.emit('swipe', self, self.gameObject, self.lastPointer);
            },
            exit: function exit() {
              self.stop();
              self.clearDirectionStates();
            }
          }
        },
        init: function init() {
          this.state = IDLE$2;
        },
        eventEmitter: false
      };
      _this.setRecongizedStateObject(new FSM(stateConfig));
      _this.clearDirectionStates();
      return _this;
    }
    _createClass(Swipe, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Swipe.prototype), "resetFromJSON", this).call(this, o);
        this.setDragThreshold(GetValue$10(o, 'threshold', 10));
        this.setVelocityThreshold(GetValue$10(o, 'velocityThreshold', 1000));
        this.setDirectionMode(GetValue$10(o, 'dir', '8dir'));
        return this;
      }
    }, {
      key: "onDragStart",
      value: function onDragStart() {
        this.state = BEGIN$1;
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.state = IDLE$2;
      }
    }, {
      key: "onDrag",
      value: function onDrag() {
        if (this.state === BEGIN$1) {
          if (!this.validDrag) {
            this.validDrag = this.dragThreshold === 0 || this.pointer.getDistance() >= this.dragThreshold;
          }
          if (this.validDrag && this.dragVelocity > this.velocityThreshold) {
            this.state = RECOGNIZED$1;
          }
        }
      }
    }, {
      key: "postUpdate",
      value: function postUpdate(time, delta) {
        if (!this.isRunning || !this.enable) {
          return;
        }
        // Clear RECOGNIZED after update()
        if (this.state === RECOGNIZED$1) {
          this.state = IDLE$2;
        }
      }
    }, {
      key: "isSwiped",
      get: function get() {
        return this.state === RECOGNIZED$1;
      }
    }, {
      key: "dragVelocity",
      get: function get() {
        var velocity;
        switch (this.dirMode) {
          case 0:
            velocity = this.getVelocityY();
            break;
          // up & down
          case 1:
            velocity = this.getVelocityX();
            break;
          // left & right
          default:
            velocity = this.getVelocity();
            break;
          // 4 dir, 8 dir
        }

        return velocity;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }, {
      key: "setVelocityThreshold",
      value: function setVelocityThreshold(velocity) {
        this.velocityThreshold = velocity;
        return this;
      }
    }, {
      key: "setDirectionMode",
      value: function setDirectionMode(m) {
        if (typeof m === 'string') {
          m = DIRMODE[m];
        }
        this.dirMode = m;
        return this;
      }
    }, {
      key: "updateDirectionStates",
      value: function updateDirectionStates() {
        var angle = RadToDeg$2(this.getVelocityAngle());
        AngleToDirections(angle, this.dirMode, this);
        return this;
      }
    }, {
      key: "clearDirectionStates",
      value: function clearDirectionStates() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        return this;
      }
    }]);
    return Swipe;
  }(OnePointerTracer);
  Object.assign(Swipe.prototype, VelocityMethods);
  var IDLE$2 = 'IDLE';
  var BEGIN$1 = 'BEGIN';
  var RECOGNIZED$1 = 'RECOGNIZED';

  var GetValue$$ = Phaser.Utils.Objects.GetValue;
  var SpliceOne = Phaser.Utils.Array.SpliceOne;
  var DistanceBetween$2 = Phaser.Math.Distance.Between;
  var AngleBetween = Phaser.Math.Angle.Between;
  var TwoPointersTracer = /*#__PURE__*/function () {
    function TwoPointersTracer(scene, config) {
      _classCallCheck(this, TwoPointersTracer);
      var amount = scene.input.manager.pointersTotal - 1;
      if (amount < 2) {
        scene.input.addPointer(2 - amount);
      }
      this.scene = scene;
      // Event emitter
      this.setEventEmitter(GetValue$$(config, 'eventEmitter', undefined));
      this._enable = undefined;
      this.pointers = [];
      this.movedState = {};
      this.resetFromJSON(config);
      this.boot();
    }
    _createClass(TwoPointersTracer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$$(o, "enable", true));
        this.bounds = GetValue$$(o, 'bounds', undefined);
        this.tracerState = TOUCH0;
        this.pointers.length = 0;
        Clear(this.movedState);
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        this.scene.input.on('pointerdown', this.onPointerDown, this);
        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('gameout', this.dragCancel, this);
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.sys.events.once('shutdown', this.destroy, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown() {
        if (!this.scene) {
          return;
        }
        this.destroyEventEmitter();
        this.pointers.length = 0;
        Clear(this.movedState);
        this.scene.input.off('pointerdown', this.onPointerDown, this);
        this.scene.input.off('pointerup', this.onPointerUp, this);
        this.scene.input.off('gameout', this.dragCancel, this);
        this.scene.input.off('pointermove', this.onPointerMove, this);
        this.scene.sys.events.off('shutdown', this.destroy, this);
        this.scene = undefined;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "enable",
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        if (this._enable === e) {
          return;
        }
        if (!e) {
          this.dragCancel();
        }
        this._enable = e;
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }, {
      key: "onPointerDown",
      value: function onPointerDown(pointer) {
        if (!this.enable) {
          return;
        }
        if (this.pointers.length === 2) {
          return;
        }
        var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;
        if (!isInsideBounds) {
          return;
        }
        var index = this.pointers.indexOf(pointer);
        if (index !== -1) {
          // Already in catched pointers
          return;
        }
        this.movedState[pointer.id] = false;
        this.pointers.push(pointer);
        switch (this.tracerState) {
          case TOUCH0:
            this.tracerState = TOUCH1;
            this.onDrag1Start();
            break;
          case TOUCH1:
            this.tracerState = TOUCH2;
            this.onDrag2Start();
            break;
        }
      }
    }, {
      key: "onPointerUp",
      value: function onPointerUp(pointer) {
        if (!this.enable) {
          return;
        }
        var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;
        if (!isInsideBounds) {
          return;
        }
        var index = this.pointers.indexOf(pointer);
        if (index === -1) {
          // Not in catched pointers
          return;
        } else {
          delete this.movedState[pointer.id];
          SpliceOne(this.pointers, index);
        }
        switch (this.tracerState) {
          case TOUCH1:
            this.tracerState = TOUCH0;
            this.onDrag1End();
            break;
          case TOUCH2:
            this.tracerState = TOUCH1;
            this.onDrag2End();
            this.onDrag1Start();
            break;
        }
      }
    }, {
      key: "onPointerMove",
      value: function onPointerMove(pointer) {
        if (!this.enable) {
          return;
        }
        if (pointer.isDown) {
          var isInsideBounds = this.bounds ? this.bounds.contains(pointer.x, pointer.y) : true;
          var isCatchedPointer = this.pointers.indexOf(pointer) !== -1;
          if (!isCatchedPointer && isInsideBounds) ; else if (isCatchedPointer && !isInsideBounds) {
            // Pointer moves out of bounds, lose pointer
            this.onPointerUp(pointer);
          } else {
            // Pointer drags in bounds
            if (!this.movedState[pointer.id]) {
              this.movedState[pointer.id] = pointer.x !== pointer.downX || pointer.y !== pointer.downY;
            }
            if (this.movedState[pointer.id]) {
              switch (this.tracerState) {
                case TOUCH1:
                  this.onDrag1();
                  break;
                case TOUCH2:
                  this.onDrag2();
                  break;
              }
            }
          }
        }
      }
    }, {
      key: "dragCancel",
      value: function dragCancel() {
        if (this.tracerState === TOUCH2) {
          this.onDrag2End();
        }
        this.pointers.length = 0;
        Clear(this.movedState);
        this.tracerState = TOUCH0;
        return this;
      }
    }, {
      key: "onDrag1Start",
      value: function onDrag1Start() {
        this.emit('drag1start', this);
      }
    }, {
      key: "onDrag1End",
      value: function onDrag1End() {
        this.emit('drag1end', this);
      }
    }, {
      key: "onDrag1",
      value: function onDrag1() {
        this.emit('drag1', this);
      }
    }, {
      key: "onDrag2Start",
      value: function onDrag2Start() {
        this.emit('drag2start', this);
      }
    }, {
      key: "onDrag2End",
      value: function onDrag2End() {
        this.emit('drag2end', this);
      }
    }, {
      key: "onDrag2",
      value: function onDrag2() {
        this.emit('drag2', this);
      }
    }, {
      key: "distanceBetween",
      get: function get() {
        if (this.tracerState !== TOUCH2) {
          return 0;
        }
        var p0 = this.pointers[0],
          p1 = this.pointers[1];
        return DistanceBetween$2(p0.x, p0.y, p1.x, p1.y);
      }
    }, {
      key: "angleBetween",
      get: function get() {
        if (this.tracerState !== TOUCH2) {
          return 0;
        }
        var p0 = this.pointers[0],
          p1 = this.pointers[1];
        return AngleBetween(p0.x, p0.y, p1.x, p1.y);
      }
    }, {
      key: "drag1Vector",
      get: function get() {
        var pointer = this.pointers[0];
        if (pointer && this.movedState[pointer.id]) {
          var p1 = pointer.position;
          var p0 = pointer.prevPosition;
          tmpDragVector.x = p1.x - p0.x;
          tmpDragVector.y = p1.y - p0.y;
        } else {
          tmpDragVector.x = 0;
          tmpDragVector.y = 0;
        }
        return tmpDragVector;
      }
    }, {
      key: "centerX",
      get: function get() {
        if (this.tracerState !== TOUCH2) {
          return 0;
        }
        var p0 = this.pointers[0].position;
        var p1 = this.pointers[1].position;
        return (p0.x + p1.x) / 2;
      }
    }, {
      key: "centerY",
      get: function get() {
        if (this.tracerState !== TOUCH2) {
          return 0;
        }
        var p0 = this.pointers[0].position;
        var p1 = this.pointers[1].position;
        return (p0.y + p1.y) / 2;
      }
    }, {
      key: "prevCenterX",
      get: function get() {
        if (this.tracerState !== TOUCH2) {
          return 0;
        }
        var preP0 = this.movedState[this.pointers[0].id] ? this.pointers[0].prevPosition : this.pointers[0].position;
        var preP1 = this.movedState[this.pointers[1].id] ? this.pointers[1].prevPosition : this.pointers[1].position;
        return (preP0.x + preP1.x) / 2;
      }
    }, {
      key: "prevCenterY",
      get: function get() {
        if (this.tracerState !== TOUCH2) {
          return 0;
        }
        var preP0 = this.movedState[this.pointers[0].id] ? this.pointers[0].prevPosition : this.pointers[0].position;
        var preP1 = this.movedState[this.pointers[1].id] ? this.pointers[1].prevPosition : this.pointers[1].position;
        return (preP0.y + preP1.y) / 2;
      }
    }, {
      key: "movementCenterX",
      get: function get() {
        return this.centerX - this.prevCenterX;
      }
    }, {
      key: "movementCenterY",
      get: function get() {
        return this.centerY - this.prevCenterY;
      }
    }, {
      key: "setRecongizedStateObject",
      value: function setRecongizedStateObject(stateObject) {
        this.recongizedState = stateObject;
        return this;
      }
    }, {
      key: "state",
      get: function get() {
        return this.recongizedState.state;
      },
      set: function set(newState) {
        this.recongizedState.state = newState;
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.state = IDLE$1;
        return this;
      }
    }]);
    return TwoPointersTracer;
  }();
  Object.assign(TwoPointersTracer.prototype, EventEmitterMethods);
  var tmpDragVector = {};
  var TOUCH0 = 0;
  var TOUCH1 = 1;
  var TOUCH2 = 2;
  var IDLE$1 = 'IDLE';

  Phaser.Utils.Objects.GetValue;

  var RotateAround$4 = Phaser.Math.RotateAround;
  var RotateObjectAround = function RotateObjectAround(gameObject, x, y, angle) {
    RotateAround$4(gameObject, x, y, angle);
    gameObject.rotation += angle;
    return gameObject;
  };

  var ScreenXYToWorldXY = function ScreenXYToWorldXY(screenX, screenY, camera, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      out = globalOut;
    }
    camera.getWorldPoint(screenX, screenY, out);
    return out;
  };
  var globalOut = {};

  var SpinObject = function SpinObject(gameObject, camera) {
    if (!this.isRotation) {
      return this;
    }
    if (camera === undefined) {
      camera = this.pointers[0].camera;
    }
    var movementX = this.movementCenterX,
      movementY = this.movementCenterY;
    var worldXY = ScreenXYToWorldXY(this.centerX, this.centerY, camera, true);
    var centerWorldX = worldXY.x;
    var centerWorldY = worldXY.y;
    var angle = this.rotation;
    if (Array.isArray(gameObject)) {
      var gameObjects = gameObject;
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        gameObject.x += movementX;
        gameObject.y += movementY;
        RotateObjectAround(gameObject, centerWorldX, centerWorldY, angle);
      }
    } else {
      gameObject.x += movementX;
      gameObject.y += movementY;
      RotateObjectAround(gameObject, centerWorldX, centerWorldY, angle);
    }
    return this;
  };

  var GetValue$_ = Phaser.Utils.Objects.GetValue;
  var WrapDegrees = Phaser.Math.Angle.WrapDegrees; // Wrap degrees: -180 to 180 
  var ShortestBetween = Phaser.Math.Angle.ShortestBetween;
  var RadToDeg$1 = Phaser.Math.RadToDeg;
  var DegToRad$4 = Phaser.Math.DegToRad;
  var Rotate = /*#__PURE__*/function (_TwoPointersTracer) {
    _inherits(Rotate, _TwoPointersTracer);
    var _super = _createSuper(Rotate);
    function Rotate(scene, config) {
      var _this;
      _classCallCheck(this, Rotate);
      _this = _super.call(this, scene, config);
      var self = _assertThisInitialized(_this);
      var stateConfig = {
        states: {
          IDLE: {
            enter: function enter() {
              self.prevAngle = undefined;
              self.angle = 0;
            }
          },
          BEGIN: {},
          RECOGNIZED: {
            enter: function enter() {
              self.emit('rotatestart', self);
            },
            exit: function exit() {
              self.emit('rotateend', self);
            }
          }
        },
        init: function init() {
          this.state = IDLE;
        },
        eventEmitter: false
      };
      _this.setRecongizedStateObject(new FSM(stateConfig));
      return _this;
    }
    _createClass(Rotate, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Rotate.prototype), "resetFromJSON", this).call(this, o);
        this.setDragThreshold(GetValue$_(o, 'threshold', 0));
        return this;
      }
    }, {
      key: "onDrag2Start",
      value: function onDrag2Start() {
        this.prevAngle = WrapDegrees(RadToDeg$1(this.angleBetween)); // Degrees
        this.state = BEGIN;
        if (this.dragThreshold === 0) {
          this.state = RECOGNIZED;
        }
      }
    }, {
      key: "onDrag2End",
      value: function onDrag2End() {
        this.state = IDLE;
      }
    }, {
      key: "onDrag2",
      value: function onDrag2() {
        switch (this.state) {
          case BEGIN:
            if (this.pointers[0].getDistance() >= this.dragThreshold && this.pointers[1].getDistance() >= this.dragThreshold) {
              var curAngle = WrapDegrees(RadToDeg$1(this.angleBetween));
              this.angle = ShortestBetween(this.prevAngle, curAngle);
              this.prevAngle = curAngle;
              this.state = RECOGNIZED;
            }
            break;
          case RECOGNIZED:
            var curAngle = WrapDegrees(RadToDeg$1(this.angleBetween));
            this.angle = ShortestBetween(this.prevAngle, curAngle);
            this.prevAngle = curAngle;
            this.emit('rotate', this);
            break;
        }
      }
    }, {
      key: "isRotated",
      get: function get() {
        return this.state === RECOGNIZED;
      }
    }, {
      key: "rotation",
      get: function get() {
        return DegToRad$4(this.angle);
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }]);
    return Rotate;
  }(TwoPointersTracer);
  var methods$d = {
    spinObject: SpinObject
  };
  Object.assign(Rotate.prototype, methods$d);
  var IDLE = 'IDLE';
  var BEGIN = 'BEGIN';
  var RECOGNIZED = 'RECOGNIZED';

  var GetValue$Z = Phaser.Utils.Objects.GetValue;
  var TapChild = function TapChild(config) {
    var tapConfig = GetValue$Z(config, 'tap', undefined);
    if (tapConfig === false) {
      return;
    } else if (tapConfig === true) {
      tapConfig = undefined;
    }
    var childrenInteractive = this._childrenInteractive;
    this._tap = new Tap(this, tapConfig);
    this._tap.on('tap', function (tap, gameObject, lastPointer) {
      EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix).concat(tap.tapsCount, "tap"), childrenInteractive.targetSizers, tap.worldX, tap.worldY, lastPointer);
    }, this);
  };

  var GetValue$Y = Phaser.Utils.Objects.GetValue;
  var PressChild = function PressChild(config) {
    var pressConfig = GetValue$Y(config, 'press', undefined);
    if (pressConfig === false) {
      return;
    } else if (pressConfig === true) {
      pressConfig = undefined;
    }
    var childrenInteractive = this._childrenInteractive;
    this._press = new Press(this, pressConfig);
    this._press.on('pressstart', function (press, gameObject, lastPointer) {
      EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "pressstart"), childrenInteractive.targetSizers, press.worldX, press.worldY, lastPointer);
    }, this).on('pressend', function (press, gameObject, lastPointer) {
      EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "pressend"), childrenInteractive.targetSizers, press.worldX, press.worldY, lastPointer);
    }, this);
  };

  var GetValue$X = Phaser.Utils.Objects.GetValue;
  var SwipeChild = function SwipeChild(config) {
    var swipeConfig = GetValue$X(config, 'swipe', undefined);
    if (swipeConfig === false) {
      return;
    } else if (swipeConfig === true) {
      swipeConfig = undefined;
    }
    if (swipeConfig === undefined) {
      swipeConfig = {};
    }
    if (!swipeConfig.hasOwnProperty('dir')) {
      swipeConfig.dir = '4dir';
    }
    var childrenInteractive = this._childrenInteractive;
    this._swipe = new Swipe(this, swipeConfig);
    this._swipe.on('swipe', function (swipe, gameObject, lastPointer) {
      var dirName = swipe.left ? 'left' : swipe.right ? 'right' : swipe.up ? 'up' : 'down';
      EmitChildEvent(childrenInteractive.eventEmitter, "".concat(childrenInteractive.eventNamePrefix, "swipe").concat(dirName), childrenInteractive.targetSizers, swipe.worldX, swipe.worldY, lastPointer);
    }, this);
  };

  var GetValue$W = Phaser.Utils.Objects.GetValue;
  var SetChildrenInteractive$1 = function SetChildrenInteractive(gameObject, config) {
    gameObject.setInteractive();
    gameObject._childrenInteractive = {
      targetSizers: GetValue$W(config, 'targets', [gameObject]),
      eventEmitter: GetValue$W(config, 'eventEmitter', gameObject),
      eventNamePrefix: GetValue$W(config, 'inputEventPrefix', 'child.')
    };
    DownChild.call(gameObject, config);
    UpChild.call(gameObject, config);
    OverChild.call(gameObject, config);
    ClickChild.call(gameObject, config);
    TapChild.call(gameObject, config);
    PressChild.call(gameObject, config);
    SwipeChild.call(gameObject, config);
    return gameObject;
  };

  var SetChildrenInteractiveWrap = function SetChildrenInteractiveWrap(config) {
    SetChildrenInteractive$1(this, config);
    return this;
  };

  var BroadcastEvent = function BroadcastEvent() {
    var gameObjects = this.getAllChildren([this]);
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var gameObject = gameObjects[i];
      gameObject.emit.apply(gameObject, arguments);
    }
    return this;
  };

  var methods$c = {
    getSizerConfig: GetSizerConfig,
    getChildPrevState: GetChildPrevState,
    pushIntoBounds: PushIntoBounds,
    drawBounds: DrawBounds,
    resolveWidth: ResolveWidth$1,
    resolveChildrenWidth: ResolveChildrenWidth,
    resolveHeight: ResolveHeight$1,
    postResolveSize: PostResolveSize,
    getChildWidth: GetChildWidth$1,
    getChildHeight: GetChildHeight,
    getExpandedChildWidth: GetExpandedChildWidth$2,
    getExpandedChildHeight: GetExpandedChildHeight$2,
    getChildrenWidth: GetChildrenWidth$3,
    getChildrenHeight: GetChildrenHeight$3,
    addChildrenMap: AddChildrenMap,
    addElement: AddChildrenMap,
    removeChildrenMap: RemoveChildrenMap,
    getElement: GetElement,
    getAllChildrenSizers: GetAllChildrenSizers,
    getChildrenSizers: GetChildrenSizers$3,
    preLayout: PreLayout$2,
    layout: Layout,
    runLayout: RunLayout,
    layoutChildren: LayoutChildren$3,
    runWidthWrap: RunWidthWrap$1,
    layoutBackgrounds: LayoutBackgrounds,
    postLayout: PostLayout,
    setAnchor: SetAnchor,
    isInTouching: IsInTouching,
    pointToChild: PointToChild$1,
    setDraggable: SetDraggable,
    setChildrenInteractive: SetChildrenInteractiveWrap,
    broadcastEvent: BroadcastEvent
  };
  Object.assign(methods$c, PaddingMethods, AddChildMethods$6, RemoveChildMethods$5, GetParentSizerMethods, ScaleMethods, FadeMethods, EaseMoveMethods, ShakeMethods, EaseDataMethods, ClickMethods, ClickOutsideMethods, TouchingMethods, HideMethods, GetShownChildrenMethods);

  var GetValue$V = Phaser.Utils.Objects.GetValue;
  var Base$1 = /*#__PURE__*/function (_Container) {
    _inherits(Base, _Container);
    var _super = _createSuper(Base);
    function Base(scene, x, y, minWidth, minHeight, config) {
      var _this;
      _classCallCheck(this, Base);
      _this = _super.call(this, scene, x, y, 2, 2);
      _this.isRexSizer = true;
      _this.setMinSize(minWidth, minHeight);
      _this.setName(GetValue$V(config, 'name', ''));
      _this.rexSizer = {};
      _this.space = {};
      _this.backgroundChildren = undefined;
      _this.sizerChildren = undefined; // [] or {}
      _this.childrenMap = {};
      _this.layoutedChildren = undefined;
      var anchorConfig = GetValue$V(config, 'anchor', undefined);
      if (anchorConfig) {
        _this.setAnchor(anchorConfig);
      }
      _this.setInnerPadding(GetValue$V(config, 'space', 0));
      _this.setDraggable(GetValue$V(config, 'draggable', false));
      _this.setSizerEventsEnable(GetValue$V(config, 'sizerEvents', false));
      _this.setDirty(true);
      if (GetValue$V(config, 'enableLayer', false)) {
        _this.enableLayer();
      }
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
          // In this case, children will be cleared and destroy in scene level
          var sizers = this.getAllChildrenSizers([this]);
          for (var i = 0, cnt = sizers.length; i < cnt; i++) {
            sizers[i].sizerEventsEnable = false;
          }
        }
        _get(_getPrototypeOf(Base.prototype), "destroy", this).call(this, fromScene);
        Clear(this.backgroundChildren);
        Clear(this.sizerChildren);
        this.childrenMap = undefined;
        this.space = undefined;
        this.rexSizer = undefined;
        this.layoutedChildren = undefined;
      }
    }, {
      key: "setMinSize",
      value: function setMinSize(minWidth, minHeight) {
        this.setMinWidth(minWidth).setMinHeight(minHeight);
        return this;
      }
    }, {
      key: "setMinWidth",
      value: function setMinWidth(minWidth) {
        if (minWidth == null) {
          minWidth = 0;
        }
        this.minWidth = minWidth;
        return this;
      }
    }, {
      key: "setMinHeight",
      value: function setMinHeight(minHeight) {
        if (minHeight == null) {
          minHeight = 0;
        }
        this.minHeight = minHeight;
        return this;
      }
    }, {
      key: "setDirty",
      value: function setDirty(dirty) {
        if (dirty === undefined) {
          dirty = true;
        }
        this.dirty = dirty;
        return this;
      }
    }, {
      key: "setSizerEventsEnable",
      value: function setSizerEventsEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.sizerEventsEnable = enable;
        return this;
      }
    }, {
      key: "ignoreLayout",
      get: function get() {
        // Skip hidden or !dirty sizer
        return this.rexSizer.hidden || !this.dirty;
      }
    }, {
      key: "childrenWidth",
      get: function get() {
        if (this._childrenWidth === undefined) {
          this._childrenWidth = this.getChildrenWidth();
        }
        return this._childrenWidth;
      }
    }, {
      key: "childrenHeight",
      get: function get() {
        if (this._childrenHeight === undefined) {
          this._childrenHeight = this.getChildrenHeight();
        }
        return this._childrenHeight;
      }
    }, {
      key: "left",
      get: function get() {
        return this.x - GetDisplayWidth(this) * this.originX;
      },
      set: function set(value) {
        this.x += value - this.left;
      }
    }, {
      key: "alignLeft",
      value: function alignLeft(value) {
        this.left = value;
        return this;
      }
    }, {
      key: "right",
      get: function get() {
        return this.left + GetDisplayWidth(this);
      },
      set: function set(value) {
        this.x += value - this.right;
      }
    }, {
      key: "alignRight",
      value: function alignRight(value) {
        this.right = value;
        return this;
      }
    }, {
      key: "centerX",
      get: function get() {
        return this.left + GetDisplayWidth(this) / 2;
      },
      set: function set(value) {
        this.x += value - this.centerX;
      }
    }, {
      key: "alignCenterX",
      value: function alignCenterX(value) {
        this.centerX = value;
        return this;
      }
    }, {
      key: "top",
      get: function get() {
        return this.y - GetDisplayHeight(this) * this.originY;
      },
      set: function set(value) {
        this.y += value - this.top;
      }
    }, {
      key: "alignTop",
      value: function alignTop(value) {
        this.top = value;
        return this;
      }
    }, {
      key: "bottom",
      get: function get() {
        return this.top + GetDisplayHeight(this);
      },
      set: function set(value) {
        this.y += value - this.bottom;
      }
    }, {
      key: "alignBottom",
      value: function alignBottom(value) {
        this.bottom = value;
        return this;
      }
    }, {
      key: "centerY",
      get: function get() {
        return this.top + GetDisplayHeight(this) / 2;
      },
      set: function set(value) {
        this.y += value - this.centerY;
      }
    }, {
      key: "alignCenterY",
      value: function alignCenterY(value) {
        this.centerY = value;
        return this;
      }
    }, {
      key: "innerLeft",
      get: function get() {
        return this.left + this.space.left;
      }
    }, {
      key: "innerRight",
      get: function get() {
        return this.right - this.space.right;
      }
    }, {
      key: "innerTop",
      get: function get() {
        return this.top + this.space.top;
      }
    }, {
      key: "innerBottom",
      get: function get() {
        return this.bottom - this.space.bottom;
      }
    }, {
      key: "innerWidth",
      get: function get() {
        return this.width - this.space.left - this.space.right;
      }
    }, {
      key: "innerHeight",
      get: function get() {
        return this.height - this.space.top - this.space.bottom;
      }
    }, {
      key: "minInnerWidth",
      get: function get() {
        var result = this.minWidth - this.space.left - this.space.right;
        return Math.max(result, 0);
      }
    }, {
      key: "minInnerHeight",
      get: function get() {
        var result = this.minHeight - this.space.top - this.space.bottom;
        return Math.max(result, 0);
      }
    }]);
    return Base;
  }(ContainerLite);
  Object.assign(Base$1.prototype, methods$c);

  var GetChildrenWidth$2 = function GetChildrenWidth(minimumMode) {
    if (this.rexSizer.hidden) {
      return 0;
    }
    if (minimumMode === undefined) {
      minimumMode = true;
    }
    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childWidth;
    if (this.orientation === 0) {
      // x
      // Get summation of minimum width
      var itemSpace = this.space.item;
      var isFirstChild = true;
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child.rexSizer.hidden) {
          continue;
        }
        if (child.rexSizer.proportion === 0 || minimumMode) {
          childWidth = this.getChildWidth(child);
        } else {
          childWidth = 0;
        }
        padding = child.rexSizer.padding;
        childWidth += padding.left + padding.right;
        if (isFirstChild) {
          isFirstChild = false;
        } else {
          childWidth += itemSpace;
        }
        result += childWidth;
      }
    } else {
      // Get maximun width
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (!child.hasOwnProperty('rexSizer')) {
          continue;
        }
        if (child.rexSizer.hidden) {
          continue;
        }
        padding = child.rexSizer.padding;
        childWidth = this.getChildWidth(child) + padding.left + padding.right;
        result = Math.max(childWidth, result);
      }
    }
    return result + this.space.left + this.space.right;
  };

  var GetChildrenHeight$2 = function GetChildrenHeight(minimumMode) {
    if (this.rexSizer.hidden) {
      return 0;
    }
    if (minimumMode === undefined) {
      minimumMode = true;
    }
    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childHeight;
    if (this.orientation === 0) {
      // x
      // Get maximun height
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child.rexSizer.hidden) {
          continue;
        }
        padding = child.rexSizer.padding;
        childHeight = this.getChildHeight(child) + padding.top + padding.bottom;
        result = Math.max(childHeight, result);
      }
    } else {
      // Get summation of minimum height
      var itemSpace = this.space.item;
      var isFirstChild = true;
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (!child.hasOwnProperty('rexSizer')) {
          continue;
        }
        if (child.rexSizer.hidden) {
          continue;
        }
        if (child.rexSizer.proportion === 0 || minimumMode) {
          childHeight = this.getChildHeight(child);
        } else {
          childHeight = 0;
        }
        padding = child.rexSizer.padding;
        childHeight += padding.top + padding.bottom;
        if (isFirstChild) {
          isFirstChild = false;
        } else {
          childHeight += itemSpace;
        }
        result += childHeight;
      }
    }
    return result + this.space.top + this.space.bottom;
  };

  var GetExpandedChildWidth$1 = function GetExpandedChildWidth(child, parentWidth) {
    if (parentWidth === undefined) {
      parentWidth = this.width;
    }
    var childWidth;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (this.orientation === 0) {
      // x
      if (childConfig.proportion > 0 && this.proportionLength > 0) {
        childWidth = childConfig.proportion * this.proportionLength;
      }
    } else {
      // y
      if (childConfig.expand) {
        var innerWidth = parentWidth - this.space.left - this.space.right;
        childWidth = innerWidth - padding.left - padding.right;
      }
    }
    return childWidth;
  };

  var GetExpandedChildHeight$1 = function GetExpandedChildHeight(child, parentHeight) {
    if (parentHeight === undefined) {
      parentHeight = this.height;
    }
    var childHeight;
    var childConfig = child.rexSizer;
    var padding = childConfig.padding;
    if (this.orientation === 0) {
      // x
      if (childConfig.expand) {
        var innerHeight = parentHeight - this.space.top - this.space.bottom;
        childHeight = innerHeight - padding.top - padding.bottom;
      }
    } else {
      // y
      if (childConfig.proportion > 0 && this.proportionLength > 0) {
        childHeight = childConfig.proportion * this.proportionLength;
      }
    }
    return childHeight;
  };

  var GetChildrenSizers$2 = function GetChildrenSizers(out) {
    if (out === undefined) {
      out = [];
    }
    var children = this.sizerChildren,
      child;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];
      if (child.isRexSizer) {
        out.push(child);
      }
    }
    return out;
  };

  var PreLayout$1 = function PreLayout() {
    this._childrenProportion = undefined;
    this.proportionLength = undefined;
    PreLayout$2.call(this);
    return this;
  };

  var CheckSize = function CheckSize(child, parent) {
    if (child.width < child.childrenWidth) {
      // Warning
      console.warn("Layout width error: Parent=".concat(parent.constructor.name, ", Child=").concat(child.constructor.name));
    }
    if (child.height < child.childrenHeight) {
      // Warning
      console.warn("Layout height error: Parent=".concat(parent.constructor.name, ", Child=").concat(child.constructor.name));
    }
  };

  var Wrap$1 = Phaser.Math.Wrap;
  var LayoutChildren$2 = function LayoutChildren() {
    var children = this.sizerChildren;
    var child, childConfig, padding;
    var startX = this.innerLeft,
      startY = this.innerTop;
    var innerWidth = this.innerWidth;
    var innerHeight = this.innerHeight;
    var itemX = startX,
      itemY = startY;
    var x, y, width, height; // Align zone
    var childWidth, childHeight;
    var childIndex,
      startChildIndex = this.startChildIndex;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      if (startChildIndex === 0) {
        childIndex = i;
      } else {
        childIndex = Wrap$1(i + startChildIndex, 0, cnt);
      }
      if (this.rtl) {
        childIndex = cnt - childIndex - 1;
      }
      child = children[childIndex];
      if (child.rexSizer.hidden) {
        continue;
      }
      childConfig = child.rexSizer;
      padding = childConfig.padding;
      PreLayoutChild.call(this, child);

      // Set size
      if (child.isRexSpace) {
        childWidth = 0;
        childHeight = 0;
      } else {
        childWidth = this.getExpandedChildWidth(child);
        childHeight = this.getExpandedChildHeight(child);
      }
      if (child.isRexSizer) {
        child.runLayout(this, childWidth, childHeight);
        CheckSize(child, this);
      } else {
        ResizeGameObject(child, childWidth, childHeight);
      }
      if (childWidth === undefined) {
        childWidth = GetDisplayWidth(child);
      }
      if (childHeight === undefined) {
        childHeight = GetDisplayHeight(child);
      }

      // Set position
      if (this.orientation === 0) {
        // x
        x = itemX + padding.left;
        if (childConfig.proportion === 0 || this.proportionLength === 0) {
          width = childWidth;
        } else {
          width = childConfig.proportion * this.proportionLength;
        }
        y = itemY + padding.top;
        height = innerHeight - padding.top - padding.bottom;
      } else {
        // y
        x = itemX + padding.left;
        width = innerWidth - padding.left - padding.right;
        y = itemY + padding.top;
        if (childConfig.proportion === 0 || this.proportionLength === 0) {
          height = childHeight;
        } else {
          height = childConfig.proportion * this.proportionLength;
        }
      }
      LayoutChild.call(this, child, x, y, width, height, childConfig.align);
      if (this.orientation === 0) {
        // x
        itemX += width + padding.left + padding.right + this.space.item;
      } else {
        // y
        itemY += height + padding.top + padding.bottom + this.space.item;
      }
    }
  };

  var ResolveWidth = function ResolveWidth(width) {
    var width = ResolveWidth$1.call(this, width);

    // Calculate proportionLength
    if (this.proportionLength === undefined && this.orientation === 0) {
      var remainder = width - this.childrenWidth;
      if (remainder > 0) {
        remainder = width - this.getChildrenWidth(false);
        this.proportionLength = remainder / this.childrenProportion;
      } else {
        this.proportionLength = 0;
      }
    }
    return width;
  };

  var ResolveHeight = function ResolveHeight(height) {
    var height = ResolveHeight$1.call(this, height);

    // Get proportionLength
    if (this.proportionLength === undefined && this.orientation === 1) {
      var remainder = height - this.childrenHeight;
      if (remainder > 0) {
        remainder = height - this.getChildrenHeight(false);
        this.proportionLength = remainder / this.childrenProportion;
      } else {
        this.proportionLength = 0;
      }
    }
    return height;
  };

  var Zone = Phaser.GameObjects.Zone;
  var Space$1 = /*#__PURE__*/function (_Zone) {
    _inherits(Space, _Zone);
    var _super = _createSuper(Space);
    function Space(scene) {
      var _this;
      _classCallCheck(this, Space);
      _this = _super.call(this, scene, 0, 0, 1, 1);
      // Don't add Zone into scene
      _this.isRexSpace = true;
      return _this;
    }
    return _createClass(Space);
  }(Zone);

  var GetNearestChildIndex$1 = function GetNearestChildIndex(x, y) {
    var children = this.sizerChildren;
    if (children.length === 0) {
      return -1;
    }
    var nearestIndex = -1,
      minDistance = Infinity;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      var distance;
      if (this.orientation === 0) {
        // x
        distance = Math.abs(child.left - x);
      } else {
        distance = Math.abs(child.top - y);
      }
      if (minDistance > distance) {
        minDistance = distance;
        nearestIndex = i;
      }
    }

    // Check right bound of last child
    var child = children[children.length - 1];
    var distance;
    if (this.orientation === 0) {
      // x
      distance = Math.abs(child.right - x);
    } else {
      distance = Math.abs(child.bottom - y);
    }
    if (minDistance > distance) {
      minDistance = distance;
      nearestIndex = i + 1;
    }
    return nearestIndex;
  };

  var IsPlainObject$a = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$U = Phaser.Utils.Objects.GetValue;
  var ALIGN_CENTER$2 = Phaser.Display.Align.CENTER;
  var PROPORTIONMODE = {
    min: 0,
    full: -1
  };
  var Add$5 = function Add(gameObject, proportion, align, paddingConfig, expand, childKey, index, minWidth, minHeight) {
    AddChild$1.call(this, gameObject);
    var isRexSpace = gameObject.isRexSpace;
    var proportionType = _typeof(proportion);
    if (proportion === null) {
      return this;
    } else if (proportionType === 'number') ; else if (proportionType === 'string') {
      proportion = PROPORTIONMODE[proportion];
    } else if (IsPlainObject$a(proportion)) {
      var config = proportion;
      proportion = GetValue$U(config, 'proportion', undefined);
      align = GetValue$U(config, 'align', ALIGN_CENTER$2);
      paddingConfig = GetValue$U(config, 'padding', 0);
      expand = GetValue$U(config, 'expand', false);
      childKey = GetValue$U(config, 'key', undefined);
      index = GetValue$U(config, 'index', undefined);
      if (!gameObject.isRexSizer) {
        minWidth = GetValue$U(config, 'minWidth', undefined);
        minHeight = GetValue$U(config, 'minHeight', undefined);
      }
    }
    if (typeof align === 'string') {
      align = AlignConst[align];
    }
    if (proportion === undefined) {
      proportion = isRexSpace ? 1 : 0;
    }
    if (align === undefined) {
      align = ALIGN_CENTER$2;
    }
    if (paddingConfig === undefined) {
      paddingConfig = 0;
    }
    if (expand === undefined) {
      expand = false;
    }
    if (minWidth === undefined) {
      if (isRexSpace) {
        minWidth = 0;
      } else if (!gameObject.isRexSizer) {
        minWidth = gameObject._minWidth;
      }
    }
    if (minHeight === undefined) {
      if (isRexSpace) {
        minHeight = 0;
      } else if (!gameObject.isRexSizer) {
        minHeight = gameObject._minHeight;
      }
    }
    var config = this.getSizerConfig(gameObject);
    config.proportion = proportion;
    config.align = align;
    config.padding = GetBoundsConfig(paddingConfig);
    config.expand = expand;
    if (index === undefined || index >= this.sizerChildren.length) {
      this.sizerChildren.push(gameObject);
    } else {
      this.sizerChildren.splice(index, 0, gameObject);
    }
    if (!gameObject.isRexSizer) {
      // Expand normal game object
      if (proportion > 0) {
        if (this.orientation === 0) {
          // x
          // minWidth is still undefined, uses current display width
          gameObject.minWidth = minWidth === undefined ? GetDisplayWidth(gameObject) : minWidth;
        } else {
          // minHeight is still undefined, uses current display height
          gameObject.minHeight = minHeight === undefined ? GetDisplayHeight(gameObject) : minHeight;
        }
      }
      if (expand) {
        if (this.orientation === 0) {
          // x
          // Might have minHeight value, or still undefined
          gameObject.minHeight = minHeight;
        } else {
          // Might have minWidth value, or still undefined
          gameObject.minWidth = minWidth;
        }
      }
    }
    if (childKey !== undefined) {
      this.addChildrenMap(childKey, gameObject);
    }
    return this;
  };
  var AddChildMethods$5 = {
    add: Add$5,
    // sizer.add could be override
    addSpace: function addSpace(proportion) {
      this.insertSpace(undefined, proportion);
      return this;
    },
    insertSpace: function insertSpace(index, proportion) {
      if (proportion === undefined) {
        proportion = 1;
      }
      Add$5.call(this, new Space$1(this.scene), {
        proportion: proportion,
        minWidth: 0,
        minHeight: 0,
        index: index
      });
      // No problem if sizer.add is override
      return this;
    },
    insert: function insert(index, gameObject, proportion, align, paddingConfig, expand, childKey, minSize) {
      if (IsPlainObject$a(proportion)) {
        proportion.index = index;
      }
      Add$5.call(this, gameObject, proportion, align, paddingConfig, expand, childKey, index, minSize);
      // No problem if sizer.add is override
      return this;
    },
    insertAtPosition: function insertAtPosition(x, y, gameObject, proportion, align, paddingConfig, expand, childKey, minSize) {
      var index = GetNearestChildIndex$1.call(this, x, y);
      if (index === -1) {
        index = undefined;
      }
      this.insert(index, gameObject, proportion, align, paddingConfig, expand, childKey, minSize);
      return this;
    }
  };

  var RemoveItem$7 = Phaser.Utils.Array.Remove;
  var ContainerRemove = ContainerLite.prototype.remove;
  var RemoveChild$1 = function RemoveChild(gameObject, destroyChild) {
    if (this.isBackground(gameObject)) {
      RemoveItem$7(this.backgroundChildren, gameObject);
    }
    ContainerRemove.call(this, gameObject, destroyChild);
    if (!destroyChild && this.sizerEventsEnable) {
      gameObject.emit('sizer.remove', gameObject, this);
      this.emit('remove', gameObject, this);
    }
    return this;
  };

  var ContainerClear = ContainerLite.prototype.clear;
  var ClearChildren = function ClearChildren(destroyChild) {
    if (this.backgroundChildren) {
      this.backgroundChildren.length = 0;
    }
    var fireRemoveEvent = !destroyChild && this.sizerEventsEnable;
    var children;
    if (fireRemoveEvent) {
      children = this.getChildren([]);
    }
    ContainerClear.call(this, destroyChild);
    if (fireRemoveEvent) {
      var gameObject;
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        gameObject = children[i];
        gameObject.emit('sizer.remove', gameObject, this);
        this.emit('remove', gameObject, this);
      }
    }
    return this;
  };

  var RemoveItem$6 = Phaser.Utils.Array.Remove;
  var RemoveChildMethods$4 = {
    remove: function remove(gameObject, destroyChild) {
      if (this.getParentSizer(gameObject) !== this) {
        return this;
      }
      RemoveItem$6(this.sizerChildren, gameObject);
      RemoveChild$1.call(this, gameObject, destroyChild);
      return this;
    },
    removeAll: function removeAll(destroyChild) {
      for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
        this.remove(this.sizerChildren[i], destroyChild);
      }
      return this;
    },
    clear: function clear(destroyChild) {
      this.sizerChildren.length = 0;
      ClearChildren.call(this, destroyChild);
      return this;
    }
  };

  var AlignMethods = {
    getChildAlign: function getChildAlign(gameObject) {
      return this.getSizerConfig(gameObject).align;
    },
    setChildAlign: function setChildAlign(gameObject, align) {
      if (typeof align === 'string') {
        align = AlignConst[align];
      }
      this.getSizerConfig(gameObject).align = align;
      return this;
    }
  };

  var ProportionMethods = {
    getChildProportion: function getChildProportion(gameObject) {
      return this.getSizerConfig(gameObject).proportion;
    },
    setChildProportion: function setChildProportion(gameObject, proportion) {
      this.getSizerConfig(gameObject).proportion = proportion;
      return this;
    }
  };

  var ExpandMethods$1 = {
    getChildExpand: function getChildExpand(gameObject) {
      return this.getSizerConfig(gameObject).expand;
    },
    setChildExpand: function setChildExpand(gameObject, expand) {
      this.getSizerConfig(gameObject).expand = expand;
      return this;
    }
  };

  var methods$b = {
    getChildrenWidth: GetChildrenWidth$2,
    getChildrenHeight: GetChildrenHeight$2,
    getExpandedChildWidth: GetExpandedChildWidth$1,
    getExpandedChildHeight: GetExpandedChildHeight$1,
    getChildrenSizers: GetChildrenSizers$2,
    preLayout: PreLayout$1,
    layoutChildren: LayoutChildren$2,
    resolveWidth: ResolveWidth,
    resolveHeight: ResolveHeight
  };
  Object.assign(methods$b, AddChildMethods$5, RemoveChildMethods$4, AlignMethods, ProportionMethods, ExpandMethods$1);

  var GetChildrenProportion = function GetChildrenProportion() {
    var result = 0;
    var children = this.sizerChildren;
    var child, proportion;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];
      if (child.rexSizer.hidden) {
        continue;
      }
      proportion = child.rexSizer.proportion;
      if (proportion > 0) {
        result += proportion;
      }
    }
    return result;
  };

  var OrientationMode = {
    x: 0,
    h: 0,
    horizontal: 0,
    'left-to-right': 0,
    y: 1,
    v: 1,
    vertical: 1,
    'top-to-bottom': 1
  };
  var GetOrientationMode = function GetOrientationMode(orientation) {
    if (typeof orientation === 'string') {
      orientation = OrientationMode[orientation];
    }
    return orientation;
  };

  var IsPlainObject$9 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$T = Phaser.Utils.Objects.GetValue;
  var Sizer = /*#__PURE__*/function (_BaseSizer) {
    _inherits(Sizer, _BaseSizer);
    var _super = _createSuper(Sizer);
    function Sizer(scene, x, y, minWidth, minHeight, orientation, config) {
      var _this;
      _classCallCheck(this, Sizer);
      if (IsPlainObject$9(x)) {
        config = x;
        x = GetValue$T(config, 'x', 0);
        y = GetValue$T(config, 'y', 0);
        minWidth = GetValue$T(config, 'width', undefined);
        minHeight = GetValue$T(config, 'height', undefined);
        orientation = GetValue$T(config, 'orientation', 0);
      } else if (IsPlainObject$9(minWidth)) {
        config = minWidth;
        minWidth = GetValue$T(config, 'width', undefined);
        minHeight = GetValue$T(config, 'height', undefined);
        orientation = GetValue$T(config, 'orientation', 0);
      } else if (IsPlainObject$9(orientation)) {
        config = orientation;
        orientation = GetValue$T(config, 'orientation', 0);
      }
      if (orientation === undefined) {
        orientation = 0;
      }
      _this = _super.call(this, scene, x, y, minWidth, minHeight, config);
      _this.type = 'rexSizer';
      _this.sizerChildren = [];
      _this.setOrientation(orientation);
      _this.setItemSpacing(GetValue$T(config, 'space.item', 0));
      _this.setStartChildIndex(GetValue$T(config, 'startChildIndex', 0));
      _this.setRTL(GetValue$T(config, 'rtl', false));
      _this.addChildrenMap('items', _this.sizerChildren);
      return _this;
    }
    _createClass(Sizer, [{
      key: "setOrientation",
      value: function setOrientation(orientation) {
        this.orientation = GetOrientationMode(orientation);
        return this;
      }
    }, {
      key: "setItemSpacing",
      value: function setItemSpacing(space) {
        this.space.item = space;
        return this;
      }
    }, {
      key: "setStartChildIndex",
      value: function setStartChildIndex(index) {
        this.startChildIndex = index;
        return this;
      }
    }, {
      key: "setRTL",
      value: function setRTL(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.rtl = enable;
        return this;
      }
    }, {
      key: "childrenProportion",
      get: function get() {
        if (this._childrenProportion === undefined) {
          this._childrenProportion = GetChildrenProportion.call(this);
        }
        return this._childrenProportion;
      }
    }]);
    return Sizer;
  }(Base$1);
  Object.assign(Sizer.prototype, methods$b);

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
        if (this.widthSave === width && this.heightSave === height && this.paddingSave === padding) {
          return this;
        }
        this.widthSave = width;
        this.heightSave = height;
        this.paddingSave = padding;
        this.originXSave = parent.originX;
        this.originYSave = parent.originY;
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
        if (this.originXSave === originX && this.originYSave === originY) {
          return this;
        }
        this.originXSave = originX;
        this.originYSave = originY;
        DrawShape.call(this, this.widthSave, this.heightSave, this.paddingSave, originX, originY);
        return this;
      }
    }]);
    return DefaultMaskGraphics;
  }(Graphics);
  var SHAPEMODE = {
    rectangle: 0,
    circle: 1
  };

  var AddChildMask = function AddChildMask(maskTarget, sizeTarget, shape, padding) {
    var maskGameObject = new DefaultMaskGraphics(sizeTarget, shape, padding); // A Graphics game object
    if (maskTarget && !maskTarget.isRexSizer) {
      // Sizer game object can't apply mask
      var mask = maskGameObject.createGeometryMask();
      maskTarget.setMask(mask);
      this.once('destroy', function () {
        maskTarget.setMask();
        mask.destroy();
      });
    }
    this.pin(maskGameObject);
    return maskGameObject;
  };

  var SetDisplaySize = function SetDisplaySize(gameObject, width, height) {
    if (!gameObject) {
      return;
    }
    var unknownWidth = width == null;
    var unknownHeight = height == null;
    if (unknownWidth && unknownHeight) {
      return gameObject;
    }
    if (!unknownWidth) {
      gameObject.displayWidth = width;
    }
    if (!unknownHeight) {
      gameObject.displayHeight = height;
    }
    if (unknownWidth) {
      gameObject.scaleX = gameObject.scaleY;
    }
    if (unknownHeight) {
      gameObject.scaleY = gameObject.scaleX;
    }
    return gameObject;
  };

  var GetValue$S = Phaser.Utils.Objects.GetValue;
  var Label$1 = /*#__PURE__*/function (_Sizer) {
    _inherits(Label, _Sizer);
    var _super = _createSuper(Label);
    function Label(scene, config) {
      var _this;
      _classCallCheck(this, Label);
      // Create sizer
      _this = _super.call(this, scene, config);
      _this.type = 'rexLabel';

      // Add elements
      var background = GetValue$S(config, 'background', undefined);
      var icon = GetValue$S(config, 'icon', undefined);
      var iconMask = GetValue$S(config, 'iconMask', undefined);
      var text = GetValue$S(config, 'text', undefined);
      var action = GetValue$S(config, 'action', undefined);
      var actionMask = GetValue$S(config, 'actionMask', undefined);
      // Align
      var align = GetValue$S(config, 'align', undefined); // undefined/left/top: no space
      // Space
      var iconSpace = GetValue$S(config, 'space.icon', 0);
      var textSpace = GetValue$S(config, 'space.text', 0);
      if (background) {
        _this.addBackground(background);
      }

      // Add space
      if (align === 'right' || align === 'bottom' || align === 'center') {
        _this.addSpace();
      }
      if (icon) {
        var padding;
        if (_this.orientation === 0) {
          if (text || action) {
            padding = {
              right: iconSpace
            };
          }
        } else {
          if (text || action) {
            padding = {
              bottom: iconSpace
            };
          }
        }
        _this.add(icon, {
          proportion: 0,
          padding: padding
        });
        if (iconMask) {
          iconMask = AddChildMask.call(_assertThisInitialized(_this), icon, icon, 1); // Circle mask
        }
      }

      var iconSize = GetValue$S(config, 'iconSize');
      _this.setIconSize(GetValue$S(config, 'iconWidth', iconSize), GetValue$S(config, 'iconHeight', iconSize));
      if (text) {
        var expandTextWidth = GetValue$S(config, 'expandTextWidth', false);
        var expandTextHeight = GetValue$S(config, 'expandTextHeight', false);
        var proportion, padding, expand;
        if (_this.orientation === 0) {
          proportion = expandTextWidth ? 1 : 0;
          if (action) {
            padding = {
              right: textSpace
            };
          }
          expand = expandTextHeight;
        } else {
          proportion = expandTextHeight ? 1 : 0;
          if (action) {
            padding = {
              bottom: textSpace
            };
          }
          expand = expandTextWidth;
        }
        _this.add(text, {
          proportion: proportion,
          expand: expand,
          padding: padding
        });
      }
      if (action) {
        _this.add(action);
        if (actionMask) {
          actionMask = AddChildMask.call(_assertThisInitialized(_this), action, action, 1); // Circle mask
        }
      }

      var actionSize = GetValue$S(config, 'actionSize');
      _this.setActionSize(GetValue$S(config, 'actionWidth', actionSize), GetValue$S(config, 'actionHeight', actionSize));

      // Add space
      if (align === 'center') {
        _this.addSpace();
      }
      _this.addChildrenMap('background', background);
      _this.addChildrenMap('icon', icon);
      _this.addChildrenMap('iconMask', iconMask);
      _this.addChildrenMap('text', text);
      _this.addChildrenMap('action', action);
      _this.addChildrenMap('actionMask', actionMask);
      return _this;
    }

    // Access text game object
    _createClass(Label, [{
      key: "text",
      get: function get() {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
          return '';
        }
        return textObject.text;
      },
      set: function set(value) {
        var textObject = this.childrenMap.text;
        if (textObject === undefined) {
          return;
        }
        textObject.setText(value);
      }
    }, {
      key: "setText",
      value: function setText(value) {
        this.text = value;
        return this;
      }
    }, {
      key: "appendText",
      value: function appendText(value) {
        this.text += value;
        return this;
      }

      // Access icon game object
    }, {
      key: "setIconTexture",
      value: function setIconTexture(key, frame) {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
          return this;
        }
        imageObject.setTexture(key, frame);
        SetDisplaySize(imageObject, this.iconWidth, this.iconHeight);
        this.resetChildScaleState(imageObject);
        return this;
      }
    }, {
      key: "setTexture",
      value: function setTexture(key, frame) {
        this.setIconTexture(key, frame);
        return this;
      }
    }, {
      key: "setIconSize",
      value: function setIconSize(width, height) {
        this.iconWidth = width;
        this.iconHeight = height;
        return this;
      }
    }, {
      key: "texture",
      get: function get() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
          return undefined;
        }
        return imageObject.texture;
      }
    }, {
      key: "frame",
      get: function get() {
        var imageObject = this.childrenMap.icon;
        if (imageObject === undefined) {
          return undefined;
        }
        return imageObject.frame;
      }
    }, {
      key: "setActionTexture",
      value: function setActionTexture(key, frame) {
        var imageObject = this.childrenMap.action;
        if (imageObject === undefined) {
          return this;
        }
        imageObject.setTexture(key, frame);
        SetDisplaySize(imageObject, this.actionWidth, this.actionHeight);
        this.resetChildScaleState(imageObject);
        return this;
      }
    }, {
      key: "actionTexture",
      get: function get() {
        var imageObject = this.childrenMap.action;
        if (imageObject === undefined) {
          return undefined;
        }
        return imageObject.texture;
      }
    }, {
      key: "actionFrame",
      get: function get() {
        var imageObject = this.childrenMap.action;
        if (imageObject === undefined) {
          return undefined;
        }
        return imageObject.frame;
      }
    }, {
      key: "setActionSize",
      value: function setActionSize(width, height) {
        this.actionWidth = width;
        this.actionHeight = height;
        return this;
      }
    }, {
      key: "preLayout",
      value: function preLayout() {
        _get(_getPrototypeOf(Label.prototype), "preLayout", this).call(this);
        SetDisplaySize(this.childrenMap.icon, this.iconWidth, this.iconHeight);
        SetDisplaySize(this.childrenMap.action, this.actionWidth, this.actionHeight);
      }
    }, {
      key: "runLayout",
      value: function runLayout(parent, newWidth, newHeight) {
        if (this.ignoreLayout) {
          return this;
        }
        _get(_getPrototypeOf(Label.prototype), "runLayout", this).call(this, parent, newWidth, newHeight);
        // Pin icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
          iconMask.setPosition();
          this.resetChildPositionState(iconMask);
        }
        // Pin action-mask to action game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
          actionMask.setPosition();
          this.resetChildPositionState(actionMask);
        }
        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        _get(_getPrototypeOf(Label.prototype), "resize", this).call(this, width, height);
        // Resize icon-mask to icon game object
        var iconMask = this.childrenMap.iconMask;
        if (iconMask) {
          iconMask.resize();
        }
        // Resize action-mask to icon game object
        var actionMask = this.childrenMap.actionMask;
        if (actionMask) {
          actionMask.resize();
        }
        return this;
      }
    }, {
      key: "resetDisplayContent",
      value: function resetDisplayContent(config) {
        if (config === undefined) {
          config = {};
        }
        var text = config.text || '';
        this.setText(text);
        var iconGameObjct = this.childrenMap.icon;
        if (iconGameObjct) {
          if (config.icon === undefined) {
            this.hide(iconGameObjct);
          } else {
            this.show(iconGameObjct);
          }
          if (config.iconSize) {
            iconGameObjct.setDisplaySize(config.iconSize, config.iconSize);
          }
          this.setIconTexture(config.icon, config.iconFrame);
        }
        var actionGameObjct = this.childrenMap.action;
        if (actionGameObjct) {
          if (config.action === undefined) {
            this.hide(actionGameObjct);
          } else {
            this.show(actionGameObjct);
          }
          if (config.actionSize) {
            actionGameObjct.setDisplaySize(config.actionSize, config.actionSize);
          }
          this.setActionTexture(config.action, config.actionFrame);
        }
        return this;
      }
    }]);
    return Label;
  }(Sizer);

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
    for (key in inObject) {
      value = inObject[key];

      //  Recursively (deep) copy for nested objects, including arrays
      outObject[key] = DeepClone(value);
    }
    return outObject;
  };

  var GetValue$R = Phaser.Utils.Objects.GetValue;
  var RoundRectangle$3 = /*#__PURE__*/function () {
    function RoundRectangle(x, y, width, height, radiusConfig) {
      _classCallCheck(this, RoundRectangle);
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
      if (radiusConfig === undefined) {
        radiusConfig = 0;
      }
      this.cornerRadius = {};
      this._width = 0;
      this._height = 0;
      this.setTo(x, y, width, height, radiusConfig);
    }
    _createClass(RoundRectangle, [{
      key: "setTo",
      value: function setTo(x, y, width, height, radiusConfig) {
        this.setPosition(x, y);
        this.setRadius(radiusConfig);
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
      key: "setRadius",
      value: function setRadius(value) {
        if (value === undefined) {
          value = 0;
        }
        this.radius = value;
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
      key: "minWidth",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
      }
    }, {
      key: "minHeight",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        if (value == null) {
          value = 0;
        }
        this._width = Math.max(value, this.minWidth);
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        if (value == null) {
          value = 0;
        }
        this._height = Math.max(value, this.minHeight);
      }
    }, {
      key: "radius",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.x, radius.tl.y, radius.tr.x, radius.tr.y, radius.bl.x, radius.bl.y, radius.br.x, radius.br.y);
      },
      set: function set(value) {
        var defaultRadiusX, defaultRadiusY;
        if (typeof value === 'number') {
          defaultRadiusX = value;
          defaultRadiusY = value;
        } else {
          defaultRadiusX = GetValue$R(value, 'x', 0);
          defaultRadiusY = GetValue$R(value, 'y', 0);
        }
        var radius = this.cornerRadius;
        radius.tl = GetRadius(GetValue$R(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
        radius.tr = GetRadius(GetValue$R(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
        radius.bl = GetRadius(GetValue$R(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
        radius.br = GetRadius(GetValue$R(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
      }
    }, {
      key: "radiusTL",
      get: function get() {
        var radius = this.cornerRadius.tl;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.tl, value);
      }
    }, {
      key: "radiusTR",
      get: function get() {
        var radius = this.cornerRadius.tr;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.tr, value);
      }
    }, {
      key: "radiusBL",
      get: function get() {
        var radius = this.cornerRadius.bl;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.bl, value);
      }
    }, {
      key: "radiusBR",
      get: function get() {
        var radius = this.cornerRadius.br;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.br, value);
      }
    }]);
    return RoundRectangle;
  }();
  var GetRadius = function GetRadius(radius, defaultRadiusX, defaultRadiusY) {
    if (radius === undefined) {
      return {
        x: defaultRadiusX,
        y: defaultRadiusY
      };
    } else if (typeof radius === 'number') {
      return {
        x: radius,
        y: radius
      };
    } else {
      return radius;
    }
  };
  var SetRadius = function SetRadius(radius, value) {
    if (typeof value === 'number') {
      radius.x = value;
      radius.y = value;
    } else {
      radius.x = GetValue$R(value, 'x', 0);
      radius.y = GetValue$R(value, 'y', 0);
    }
  };

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

  var DegToRad$3 = Phaser.Math.DegToRad;
  var ArcTo$1 = function ArcTo(centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && endAngle > startAngle) {
      endAngle -= 360;
    } else if (!antiClockWise && endAngle < startAngle) {
      endAngle += 360;
    }
    var deltaAngle = endAngle - startAngle;
    var step = DegToRad$3(deltaAngle) / iteration;
    startAngle = DegToRad$3(startAngle);
    for (var i = 0; i <= iteration; i++) {
      var angle = startAngle + step * i;
      var x = centerX + radiusX * Math.cos(angle);
      var y = centerY + radiusY * Math.sin(angle);
      LineTo(x, y, pathData);
    }
    return pathData;
  };

  /*
  src: {
      fillColor, 
      fillAlpha, 
      pathData, 
      pathIndexes  // Earcut(pathData)
  }
  */

  var Utils$2 = Phaser.Renderer.WebGL.Utils;
  var FillPathWebGL = function FillPathWebGL(pipeline, calcMatrix, src, alpha, dx, dy) {
    var fillTintColor = Utils$2.getTintAppendFloatAlpha(src.fillColor, src.fillAlpha * alpha);
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
  var Utils$1 = Phaser.Renderer.WebGL.Utils;
  var StrokePathWebGL = function StrokePathWebGL(pipeline, src, alpha, dx, dy) {
    var strokeTint = pipeline.strokeTint;
    var strokeTintColor = Utils$1.getTintAppendFloatAlpha(src.strokeColor, src.strokeAlpha * alpha);
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

  var GetCalcMatrix$1 = Phaser.GameObjects.GetCalcMatrix;
  var PolygonWebGLRenderer = function PolygonWebGLRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateData();
      src.dirty = false;
    }
    camera.addToRenderList(src);
    var pipeline = renderer.pipelines.set(src.pipeline);
    var result = GetCalcMatrix$1(src, camera, parentMatrix);
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

  var SetTransform$1 = Phaser.Renderer.Canvas.SetTransform;
  var PolygonCanvasRenderer = function PolygonCanvasRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateData();
      src.dirty = false;
    }
    camera.addToRenderList(src);
    var ctx = renderer.currentContext;
    if (SetTransform$1(renderer, ctx, src, camera, parentMatrix)) {
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

  var Render$2 = {
    renderWebGL: PolygonWebGLRenderer,
    renderCanvas: PolygonCanvasRenderer
  };

  var Shape$1 = Phaser.GameObjects.Shape;
  var IsPlainObject$8 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$Q = Phaser.Utils.Objects.GetValue;
  var Earcut$1 = Phaser.Geom.Polygon.Earcut;
  var RoundRectangle$2 = /*#__PURE__*/function (_Shape) {
    _inherits(RoundRectangle, _Shape);
    var _super = _createSuper(RoundRectangle);
    function RoundRectangle(scene, x, y, width, height, radiusConfig, fillColor, fillAlpha) {
      var _this;
      _classCallCheck(this, RoundRectangle);
      var strokeColor, strokeAlpha, strokeWidth, shapeType;
      if (IsPlainObject$8(x)) {
        var config = x;
        x = config.x;
        y = config.y;
        width = config.width;
        height = config.height;
        radiusConfig = config.radius;
        fillColor = config.color;
        fillAlpha = config.alpha;
        strokeColor = config.strokeColor;
        strokeAlpha = config.strokeAlpha;
        strokeWidth = config.strokeWidth;
        shapeType = config.shape;
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
      if (radiusConfig === undefined) {
        radiusConfig = 0;
      }
      if (shapeType === undefined) {
        shapeType = 0;
      }
      var geom = new RoundRectangle$3(); // Configurate it later
      _this = _super.call(this, scene, 'rexRoundRectangleShape', geom);
      _this.setShapeType(shapeType);
      if (_this.shapeType === 0) {
        var radius = GetValue$Q(radiusConfig, 'radius', radiusConfig);
        geom.setTo(0, 0, width, height, radius);
      } else {
        var radius = {
          x: width / 2,
          y: height / 2
        };
        geom.setTo(0, 0, width, height, radius);
      }
      var iteration = GetValue$Q(radiusConfig, 'iteration', undefined);
      _this.setIteration(iteration);
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
    _createClass(RoundRectangle, [{
      key: "updateData",
      value: function updateData() {
        var geom = this.geom;
        var pathData = this.pathData;
        pathData.length = 0;
        var width = geom.width,
          height = geom.height,
          cornerRadius = geom.cornerRadius,
          radius,
          iteration = this.iteration + 1;

        // top-left
        radius = cornerRadius.tl;
        if (IsArcCorner(radius)) {
          var centerX = radius.x;
          var centerY = radius.y;
          ArcTo$1(centerX, centerY, radius.x, radius.y, 180, 270, false, iteration, pathData);
        } else {
          LineTo(0, 0, pathData);
        }

        // top-right
        radius = cornerRadius.tr;
        if (IsArcCorner(radius)) {
          var centerX = width - radius.x;
          var centerY = radius.y;
          ArcTo$1(centerX, centerY, radius.x, radius.y, 270, 360, false, iteration, pathData);
        } else {
          LineTo(width, 0, pathData);
        }

        // bottom-right
        radius = cornerRadius.br;
        if (IsArcCorner(radius)) {
          var centerX = width - radius.x;
          var centerY = height - radius.y;
          ArcTo$1(centerX, centerY, radius.x, radius.y, 0, 90, false, iteration, pathData);
        } else {
          LineTo(width, height, pathData);
        }

        // bottom-left
        radius = cornerRadius.bl;
        if (IsArcCorner(radius)) {
          var centerX = radius.x;
          var centerY = height - radius.y;
          ArcTo$1(centerX, centerY, radius.x, radius.y, 90, 180, false, iteration, pathData);
        } else {
          LineTo(0, height, pathData);
        }
        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        this.pathIndexes = Earcut$1(pathData);
        return this;
      }
    }, {
      key: "setShapeType",
      value: function setShapeType(shapeType) {
        if (typeof shapeType === 'string') {
          shapeType = ShapeTypeMap[shapeType];
        }
        this.shapeType = shapeType;
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
        // Override Shape's setSize method
        if (height === undefined) {
          height = width;
        }
        if (this.geom.width === width && this.geom.height === height) {
          return this;
        }
        this.geom.setSize(width, height);
        if (this.shapeType === 1) {
          this.setRadius({
            x: width / 2,
            y: height / 2
          });
        }
        this.updateDisplayOrigin();
        this.dirty = true;
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
      key: "radius",
      get: function get() {
        return this.geom.radius;
      },
      set: function set(value) {
        this.geom.setRadius(value);
        this.updateDisplayOrigin();
        this.dirty = true;
      }
    }, {
      key: "radiusTL",
      get: function get() {
        return this.geom.radiusTL;
      },
      set: function set(value) {
        this.geom.radiusTL = value;
        this.dirty = true;
      }
    }, {
      key: "radiusTR",
      get: function get() {
        return this.geom.radiusTR;
      },
      set: function set(value) {
        this.geom.radiusTR = value;
        this.dirty = true;
      }
    }, {
      key: "radiusBL",
      get: function get() {
        return this.geom.radiusBL;
      },
      set: function set(value) {
        this.geom.radiusBL = value;
        this.dirty = true;
      }
    }, {
      key: "radiusBR",
      get: function get() {
        return this.geom.radiusBR;
      },
      set: function set(value) {
        this.geom.radiusBR = value;
        this.dirty = true;
      }
    }, {
      key: "setRadius",
      value: function setRadius(value) {
        if (value === undefined) {
          value = 0;
        }
        this.radius = value;
        return this;
      }
    }, {
      key: "setRadiusTL",
      value: function setRadiusTL(value) {
        if (value === undefined) {
          value = 0;
        }
        this.radiusTL = value;
        return this;
      }
    }, {
      key: "setRadiusTR",
      value: function setRadiusTR(value) {
        if (value === undefined) {
          value = 0;
        }
        this.radiusTR = value;
        return this;
      }
    }, {
      key: "setRadiusBL",
      value: function setRadiusBL(value) {
        if (value === undefined) {
          value = 0;
        }
        this.radiuBL = value;
        return this;
      }
    }, {
      key: "setRadiusBR",
      value: function setRadiusBR(value) {
        if (value === undefined) {
          value = 0;
        }
        this.radiusBR = value;
        return this;
      }
    }, {
      key: "cornerRadius",
      get: function get() {
        return this.geom.cornerRadius;
      },
      set: function set(value) {
        this.radius = value;
      }
    }, {
      key: "setCornerRadius",
      value: function setCornerRadius(value) {
        return this.setRadius(value);
      }
    }, {
      key: "iteration",
      get: function get() {
        return this._iteration;
      },
      set: function set(value) {
        // Set iteration first time
        if (this._iteration === undefined) {
          this._iteration = value;
          return;
        }

        // Change iteration value
        if (this._iteration === value) {
          return;
        }
        this._iteration = value;
        this.dirty = true;
      }
    }, {
      key: "setIteration",
      value: function setIteration(iteration) {
        if (iteration === undefined) {
          iteration = 6;
        }
        this.iteration = iteration;
        return this;
      }
    }]);
    return RoundRectangle;
  }(Shape$1);
  var IsArcCorner = function IsArcCorner(radius) {
    return radius.x !== 0 && radius.y !== 0;
  };
  var ShapeTypeMap = {
    rectangle: 0,
    circle: 1
  };
  Object.assign(RoundRectangle$2.prototype, Render$2);

  var CreateRoundRectangle = function CreateRoundRectangle(scene, config) {
    var gameObject = new RoundRectangle$2(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var PhaserText = Phaser.GameObjects.Text;
  var CreateText = function CreateText(scene, style) {
    var gameObject = new PhaserText(scene, 0, 0, '', style);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var PhaserImage = Phaser.GameObjects.Image;
  var CreateImage = function CreateImage(scene, config) {
    var gameObject = new PhaserImage(scene, 0, 0, '');
    scene.add.existing(gameObject);
    return gameObject;
  };

  var BuildDisplayLabelConfig = function BuildDisplayLabelConfig(scene, config) {
    config = config ? DeepClone(config) : {};
    config.background = CreateRoundRectangle(scene, config.background);
    config.text = CreateText(scene, config.text);
    if (config.icon !== null) {
      config.icon = CreateImage(scene, config.icon);
    }
    if (config.action != null) {
      config.action = CreateImage(scene, config.action);
    }
    return config;
  };

  var Title = /*#__PURE__*/function (_Label) {
    _inherits(Title, _Label);
    var _super = _createSuper(Title);
    function Title(scene, config) {
      var _this;
      _classCallCheck(this, Title);
      config = BuildDisplayLabelConfig(scene, config);
      _this = _super.call(this, scene, config);
      _this.type = 'rexTweaker.Title';
      return _this;
    }
    _createClass(Title, [{
      key: "setTitle",
      value: function setTitle(config) {
        config = config ? DeepClone(config) : {};
        if (config.hasOwnProperty('text')) ; else if (config.hasOwnProperty('title')) {
          config.text = config.title;
        } else {
          config.text = '';
        }
        this.resetDisplayContent(config);
        return this;
      }
    }]);
    return Title;
  }(Label$1);

  var CreateTitleLabel = function CreateTitleLabel(scene, config, style) {
    var gameObject = new Title(scene, style);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var CreateTweaker = function CreateTweaker(scene, config) {
    var tweaker = new TweakerShell(scene, config);
    scene.add.existing(tweaker);
    return tweaker;
  };

  var CreateBackground = function CreateBackground(scene, config, style) {
    // TODO: Might create nine-slice as background
    return CreateRoundRectangle(scene, style);
  };

  var ExpandMethods = {
    expand: function expand(transitionDuration) {
      if (this.expanded) {
        return this;
      }
      if (transitionDuration === undefined) {
        transitionDuration = this.transitionDuration;
      }
      var child = this.childrenMap.child;
      this.show(child).getTopmostSizer().layout();
      child.popUp(transitionDuration, 'y');
      this.expanded = true;
      return this;
    },
    collapse: function collapse(transitionDuration) {
      if (!this.expanded) {
        return this;
      }
      if (transitionDuration === undefined) {
        transitionDuration = this.transitionDuration;
      }
      var child = this.childrenMap.child;
      child.once('scaledown.complete', function () {
        this.setChildScale(child, 1, 1).hide(child).getTopmostSizer().layout();
      }, this).scaleDown(transitionDuration, 'y');
      this.expanded = false;
      return this;
    },
    toggle: function toggle(transitionDuration) {
      if (this.expanded) {
        this.collapse(transitionDuration);
      } else {
        this.expand(transitionDuration);
      }
      return this;
    }
  };

  var GetValue$P = Phaser.Utils.Objects.GetValue;
  var Folder = /*#__PURE__*/function (_Sizer) {
    _inherits(Folder, _Sizer);
    var _super = _createSuper(Folder);
    function Folder(scene, config) {
      var _this;
      _classCallCheck(this, Folder);
      _this = _super.call(this, scene, {
        orientation: 1
      });
      _this.type = 'rexTweaker.Folder';
      _this.expanded = true;
      var title = config.title;
      var child = config.child;
      var background = config.background;
      _this.add(title, {
        proportion: 0,
        expand: true
      });
      child.setOrigin(0.5, 0);
      _this.add(child, {
        proportion: 0,
        expand: true
      });
      if (background) {
        _this.addBackground(background);
      }
      _this.addChildrenMap('title', title);
      _this.addChildrenMap('child', child);
      _this.addChildrenMap('background', background);
      _this.setTransitionDuration(GetValue$P(config, 'transition.duration', 200));
      title.onClick(function () {
        this.toggle();
      }, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(Folder, [{
      key: "setTransitionDuration",
      value: function setTransitionDuration(duration) {
        this.transitionDuration = duration;
        return this;
      }
    }, {
      key: "setTitle",
      value: function setTitle(config) {
        var title = this.childrenMap.title;
        title.setTitle(config);
        return this;
      }
    }, {
      key: "setBindingTarget",
      value: function setBindingTarget(target) {
        var child = this.childrenMap.child;
        child.setBindingTarget(target);
        return this;
      }
    }]);
    return Folder;
  }(Sizer);
  Object.assign(Folder.prototype, ExpandMethods);

  var GetValue$O = Phaser.Utils.Objects.GetValue;
  var CreateFolder = function CreateFolder(scene, config, style) {
    // Create Folder-title
    var titleStyle = GetValue$O(style, 'title') || {};
    var title = CreateTitleLabel(scene, config, titleStyle);
    var tweakerConfig = {
      root: GetValue$O(style, 'root'),
      styles: GetValue$O(style, 'tweaker'),
      space: GetValue$O(style, 'space') || {}
    };
    var child = CreateTweaker(scene, tweakerConfig);
    var backgroundStyle = GetValue$O(style, 'background');
    var background = CreateBackground(scene, config, backgroundStyle);
    var folder = new Folder(scene, {
      title: title,
      child: child,
      background: background,
      transition: {
        duration: GetValue$O(style, 'transition.duration', 200)
      }
    });
    scene.add.existing(folder);
    return folder;
  };

  var GetValue$N = Phaser.Utils.Objects.GetValue;
  var AddFolder = function AddFolder(config) {
    var scene = this.scene;

    // Create folder
    var folderStyle = GetValue$N(this.styles, 'folder') || {};
    folderStyle.tweaker = this.styles;
    folderStyle.root = this.root;
    var folder = CreateFolder(scene, config, folderStyle);
    delete folderStyle.tweaker;
    delete folderStyle.root;

    // Add folder
    this.add(folder, {
      expand: true
    });

    // Set content
    folder.setTitle(config);
    var expanded = GetValue$N(config, 'expanded', true);
    if (!expanded) {
      folder.collapse(0);
    }
    var childTweaker = folder.getElement('child');
    if (config.key) {
      this.root.addChildrenMap(config.key, childTweaker);
    }
    return childTweaker;
  };

  var SizerAdd$2 = Sizer.prototype.add;
  var SizerAddSpace = Sizer.prototype.addSpace;
  var Add$4 = function Add(gameObject) {
    var isNormalGameObject = !gameObject.isRexSpace;
    var proportion = !isNormalGameObject || this.buttonsExpand ? 1 : 0;
    if (this.sizerChildren.length === 0) {
      // First element
      if (isNormalGameObject) {
        // Add space at head
        var hasHeadSpace = !this.buttonsExpand && (this.buttonsAlign === 'right' || this.buttonsAlign === 'center' || this.buttonsAlign === 'bottom');
        if (hasHeadSpace) {
          SizerAddSpace.call(this);
        }
        SizerAdd$2.call(this, gameObject, {
          proportion: proportion,
          expand: true
        });

        // Add space at tail
        var hasTailSpace = !this.buttonsExpand && this.buttonsAlign === 'center';
        if (hasTailSpace) {
          SizerAddSpace.call(this);
        }
        this.hasTailSpace = hasTailSpace;
      } else {
        // A space
        SizerAdd$2.call(this, gameObject, {
          proportion: proportion,
          expand: true
        });
        this.hasTailSpace = false;
      }
    } else {
      // Others
      if (this.hasTailSpace) {
        var lastIndex = this.sizerChildren.length - 1;
        SizerAdd$2.call(this, gameObject, {
          index: lastIndex,
          proportion: proportion,
          expand: true
        });
      } else {
        SizerAdd$2.call(this, gameObject, {
          proportion: proportion,
          expand: true
        });
      }
    }

    // Space or other game object as button
    if (isNormalGameObject) {
      this.buttonGroup.add(gameObject);
    }
    return this;
  };
  var AddChildMethods$4 = {
    addButton: function addButton(gameObject) {
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Add$4.call(this, gameObjects[i]);
        }
      } else {
        Add$4.call(this, gameObject);
      }
      return this;
    },
    addButtons: function addButtons(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Add$4.call(this, gameObjects[i]);
      }
      return this;
    }
  };

  var SizerRmove$1 = Sizer.prototype.remove;
  var SizerClear$1 = Sizer.prototype.clear;
  var Remove$1 = function Remove(gameObject, destroyChild) {
    if (this.getParentSizer(gameObject) !== this) {
      return this;
    }
    this.buttonGroup.remove(gameObject);
    SizerRmove$1.call(this, gameObject, destroyChild);
    return this;
  };
  var RemoveChildMethods$3 = {
    remove: function remove(gameObject, destroyChild) {
      // Remove gameObject no matter it is a button or not
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Remove$1.call(this, gameObjects[i], destroyChild);
        }
      } else {
        Remove$1.call(this, gameObject, destroyChild);
      }
      return this;
    },
    clear: function clear(destroyChild) {
      var buttons = this.buttonGroup.buttons;
      buttons.length = 0;
      SizerClear$1.call(this, destroyChild);
      return this;
    },
    removeButton: function removeButton(gameObject, destroyChild) {
      var gameObject = this.getButton(gameObject);
      // Don't remove this gameObject, it is not a button
      if (!gameObject) {
        return this;
      }
      this.remove(gameObject, destroyChild);
      return this;
    },
    clearButtons: function clearButtons(destroyChild) {
      var buttons = this.buttonGroup.buttons;
      for (var i = buttons.length - 1; i >= 0; i--) {
        Remove$1.call(this, buttons[i], destroyChild);
      }
      return this;
    }
  };

  var AddMethods = {
    add: function add(gameObject) {
      this.buttons.push(gameObject);
      if (this.buttonsType) {
        var key = gameObject.name;
        if (key === '') {
          console.error("".concat(this.parent.constructor.name, ": Button key is an empty string"));
        } else if (this.buttonMap.hasOwnProperty(key)) {
          console.error("".concat(this.parent.constructor.name, ": Duplicate button key '").concat(key, "'"));
        }
        this.buttonMap[key] = gameObject;
        this.dataManager.set(key, undefined).set(key, false); // Trigger data event 'changedata'
      }

      //Default: Fire 'click' event when touch released after pressed.
      gameObject._buttonBehavior = new Button(gameObject, this.clickConfig);
      gameObject._buttonBehavior.on('click', function (buttonBehavior, gameObject, pointer, event) {
        this.fireEvent('button.click', gameObject, pointer, event);
      }, this).on('enable', function (buttonBehavior, gameObject) {
        this.fireEvent('button.enable', gameObject);
      }, this).on('disable', function (buttonBehavior, gameObject) {
        this.fireEvent('button.disable', gameObject);
      }, this);
      gameObject.on('pointerover', function (pointer, localX, localY, event) {
        this.fireEvent('button.over', gameObject, pointer, event);
      }, this).on('pointerout', function (pointer, event) {
        this.fireEvent('button.out', gameObject, pointer, event);
      }, this);
      return this;
    },
    addMultiple: function addMultiple(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        this.add(gameObject[i]);
      }
      return this;
    }
  };

  var RemoveItem$5 = Phaser.Utils.Array.Remove;
  var RemoveMethods = {
    remove: function remove(gameObject) {
      RemoveItem$5(this.buttons, gameObject);
      if (this.buttonsType) {
        var key = gameObject.name;
        delete this.buttonMap[key];
        this.dataManager.remove(key);
      }
      return this;
    },
    clear: function clear() {
      this.buttons.length = 0;
      if (this.buttonsType) {
        for (var key in this.buttonMap) {
          delete this.buttonMap[key];
          this.dataManager.remove(key);
        }
      }
      return this;
    }
  };

  var FireEvent = function FireEvent(eventName, button) {
    var index;
    if (typeof button === 'number') {
      index = button;
      button = this.buttons[index];
      if (!button) {
        return;
      }
    } else {
      index = this.buttons.indexOf(button);
      if (index === -1) {
        return;
      }
    }

    // Buttons is a child. Fire internal events.
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    if (this.eventEmitter !== this.parent) {
      var _this$parent;
      (_this$parent = this.parent).emit.apply(_this$parent, [eventName, button, index].concat(args));
    }
    if (this.groupName !== undefined) {
      var _this$eventEmitter;
      (_this$eventEmitter = this.eventEmitter).emit.apply(_this$eventEmitter, [eventName, button, this.groupName, index].concat(args));
    } else {
      var _this$eventEmitter2;
      (_this$eventEmitter2 = this.eventEmitter).emit.apply(_this$eventEmitter2, [eventName, button, index].concat(args));
    }
  };

  var GetValue$M = Phaser.Utils.Objects.GetValue;
  var Initialize = function Initialize(config) {
    // Assign this.dataManager
    var dataManager = GetValue$M(config, 'dataManager', undefined);
    if (dataManager === undefined) {
      var parent = this.parent;
      parent.setDataEnabled();
      dataManager = parent.data;
    }
    this.dataManager = dataManager;

    // Assign this.setValueCallback, this.setValueCallbackScope
    var setValueCallback, setValueCallbackScope;
    setValueCallback = GetValue$M(config, 'setValueCallback', undefined);
    setValueCallbackScope = GetValue$M(config, 'setValueCallbackScope', undefined);
    if (setValueCallback === undefined) {
      setValueCallback = GetValue$M(config, 'setButtonStateCallback', undefined);
      setValueCallbackScope = GetValue$M(config, 'setButtonStateCallbackScope', undefined);
    }
    this.setValueCallback = setValueCallback;
    this.setValueCallbackScope = setValueCallbackScope;

    // Register event callback
    dataManager.events.on("changedata", function (parent, key, value, previousValue) {
      var button = this.buttonMap[key];
      if (!button) {
        return;
      }
      var callback = this.setValueCallback;
      var scope = this.setValueCallbackScope;
      if (callback) {
        if (scope) {
          callback.call(scope, button, value, previousValue);
        } else {
          callback(button, value, previousValue);
        }
      }
      this.fireEvent('button.statechange', button, value, previousValue);
    }, this);
  };
  var SetTypeMethods = {
    setButtonsType: function setButtonsType(config) {
      if (config === undefined) {
        config = {};
      }
      var buttonsType = GetValue$M(config, 'buttonsType', config.type);
      this.buttonsType = buttonsType;
      switch (buttonsType) {
        case 'radio':
          this.setRadioType(config);
          break;
        case 'checkboxes':
          this.setCheckboxesType(config);
          break;
      }
      return this;
    },
    setRadioType: function setRadioType(config) {
      Initialize.call(this, config);
      var radioValue = undefined;
      var parent = this.parent,
        buttons = this.buttons,
        dataManager = this.dataManager;
      Object.defineProperty(parent, 'value', {
        get: function get() {
          return radioValue;
        },
        set: function set(newValue) {
          if (newValue === radioValue) {
            return;
          }
          radioValue = newValue;
          // Update state of button -> Fire `changedata-btnName` event -> setValueCallback                
          buttons.forEach(function (button) {
            var key = button.name;
            var state = dataManager.get(key);
            if (key === newValue) {
              if (!state) {
                dataManager.set(key, true);
              }
            } else {
              if (state) {
                dataManager.set(key, false);
              }
            }
          });
        },
        enumerable: true,
        configurable: true
      });
      parent.on('button.click', function (button) {
        parent.value = button.name;
      });
      // button.click event -> parent.value -> dataManager -> changedata event -> ...
      // parent.value -> dataManager -> changedata event -> ...

      return this;
    },
    setCheckboxesType: function setCheckboxesType(config) {
      Initialize.call(this, config);
      var parent = this.parent,
        dataManager = this.dataManager;
      parent.on('button.click', function (button) {
        dataManager.toggle(button.name);
      });
      // button.click event -> dataManager -> changedata event -> ...
      // dataManager.set() -> changedata event -> ...

      return this;
    },
    // Common
    clearAllButtonsState: function clearAllButtonsState() {
      for (var key in this.buttonMap) {
        this.dataManager.set(key, false);
      }
      return this;
    },
    getAllButtonsState: function getAllButtonsState() {
      var states = {};
      for (var key in this.buttonMap) {
        states[key] = this.dataManager.get(key);
      }
      return states;
    },
    // For radio
    setSelectedButtonName: function setSelectedButtonName(name) {
      this.parent.value = name;
      return this;
    },
    getSelectedButtonName: function getSelectedButtonName() {
      return this.parent.value;
    },
    // For checkboxes
    setButtonState: function setButtonState(name, state) {
      if (state === undefined) {
        state = true;
      }
      this.dataManager.set(name, state);
      return this;
    },
    getButtonState: function getButtonState(name) {
      return this.dataManager.get(name);
    }
  };

  var GetGameObjectByName = function GetGameObjectByName(children, name) {
    if (!children) {
      return null;
    } else if (IsArray(children)) {
      var child;
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = TestName(children[i], name);
        if (child) {
          return child;
        }
      }
    } else {
      // Is plain object
      var child;
      for (var key in children) {
        child = TestName(children[key], name);
        if (child) {
          return child;
        }
      }
    }
  };
  var TestName = function TestName(gameObject, name) {
    if (!gameObject) {
      return null;
    } else if (gameObject.hasOwnProperty('name')) {
      return gameObject.name === name ? gameObject : null;
    } else {
      // Array, or plain object
      return GetElementByName(gameObject, name);
    }
  };

  var ButtonMethods = {
    getButton: function getButton(index) {
      // buttonGroup and button-sizer have *buttons* member both
      var buttons = this.buttons,
        button;
      var indexType = _typeof(index);
      switch (indexType) {
        case 'number':
          button = buttons[index];
          break;
        case 'string':
          button = GetGameObjectByName(buttons, index);
          break;
        default:
          button = index;
          if (buttons.indexOf(button) === -1) {
            button = undefined;
          }
          break;
      }
      return button;
    },
    setButtonEnable: function setButtonEnable(index, enabled) {
      // buttonGroup and button-sizer have *buttons* member both
      var buttons = this.buttons;
      if (index === undefined || typeof index === 'boolean') {
        enabled = index;
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
          buttons[i]._buttonBehavior.setEnable(enabled);
        }
      } else {
        this.getButton(index)._buttonBehavior.setEnable(enabled);
      }
      return this;
    },
    toggleButtonEnable: function toggleButtonEnable(index) {
      // buttonGroup and button-sizer have *buttons* member both
      var buttons = this.buttons;
      if (index === undefined || typeof index === 'boolean') {
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
          buttons[i]._buttonBehavior.toggleEnable();
        }
      } else {
        this.getButton(index)._buttonBehavior.toggleEnable();
      }
      return this;
    },
    getButtonEnable: function getButtonEnable(index) {
      if (index === undefined) {
        index = 0;
      }
      return this.getButton(index)._buttonBehavior.enable;
    },
    emitButtonClick: function emitButtonClick(index) {
      // index or button game object
      // this: buttonGroup or button-sizer
      var buttonGroup = this.buttonGroup ? this.buttonGroup : this;
      buttonGroup.fireEvent('button.click', index);
      return this;
    },
    showButton: function showButton(index) {
      Show(this.getButton(index));
      return this;
    },
    hideButton: function hideButton(index) {
      Hide(this.getButton(index));
      return this;
    },
    isButtonShown: function isButtonShown(index) {
      IsShown(this.getButton(index));
      return this;
    },
    forEachButtton: function forEachButtton(callback, scope) {
      // buttonGroup and button-sizer have *buttons* member both
      var buttons = this.buttons;
      for (var i = 0, cnt = buttons.length; i < cnt; i++) {
        if (scope) {
          callback.call(scope, buttons[i], i, buttons);
        } else {
          callback(buttons[i], i, buttons);
        }
      }
      return this;
    }
  };

  var ButtonGroup = /*#__PURE__*/function () {
    function ButtonGroup(config) {
      _classCallCheck(this, ButtonGroup);
      this.parent = config.parent;
      this.eventEmitter = config.eventEmitter;
      this.groupName = config.groupName;
      this.clickConfig = config.clickConfig;
      this.buttonsType = undefined;
      this.buttons = [];
      this.buttonMap = {};
    }
    _createClass(ButtonGroup, [{
      key: "destroy",
      value: function destroy() {
        this.parent = undefined;
        this.eventEmitter = undefined;
        this.clickConfig = undefined;
        this.buttons = undefined; // GameObjects will be destroyed outside
      }
    }]);
    return ButtonGroup;
  }();
  var methods$a = {
    fireEvent: FireEvent
  };
  Object.assign(ButtonGroup.prototype, AddMethods, RemoveMethods, SetTypeMethods, ButtonMethods, methods$a);

  // Include in Buttons/GridButtons/FixedWidthButtons class

  var ButtonStateMethods = {
    // Common
    clearAllButtonsState: function clearAllButtonsState() {
      this.buttonGroup.clearAllButtonsState();
      return this;
    },
    getAllButtonsState: function getAllButtonsState() {
      return this.buttonGroup.getAllButtonsState();
    },
    // For radio
    setSelectedButtonName: function setSelectedButtonName(name) {
      this.buttonGroup.setSelectedButtonName(name);
      return this;
    },
    getSelectedButtonName: function getSelectedButtonName() {
      return this.buttonGroup.getSelectedButtonName();
    },
    // For checkboxes
    setButtonState: function setButtonState(name, state) {
      this.buttonGroup.setButtonState(name, state);
      return this;
    },
    getButtonState: function getButtonState(name) {
      return this.buttonGroup.getButtonState(name);
    }
  };

  var GetValue$L = Phaser.Utils.Objects.GetValue;
  var Buttons$1 = /*#__PURE__*/function (_Sizer) {
    _inherits(Buttons, _Sizer);
    var _super = _createSuper(Buttons);
    function Buttons(scene, config) {
      var _this;
      _classCallCheck(this, Buttons);
      if (config === undefined) {
        config = {};
      }
      var buttonSpace = config.space;
      if (typeof buttonSpace === 'number') {
        config.space = {
          item: buttonSpace
        };
      }

      // Create
      _this = _super.call(this, scene, config);
      _this.type = 'rexButtons';
      _this.buttonGroup = new ButtonGroup({
        parent: _assertThisInitialized(_this),
        eventEmitter: GetValue$L(config, 'eventEmitter', _assertThisInitialized(_this)),
        groupName: GetValue$L(config, 'groupName', undefined),
        clickConfig: GetValue$L(config, 'click', undefined)
      }).setButtonsType(config);

      // Add elements
      var background = GetValue$L(config, 'background', undefined);
      var buttons = GetValue$L(config, 'buttons', undefined);

      // Buttons properties
      _this.buttonsExpand = GetValue$L(config, 'expand', false);
      _this.buttonsAlign = GetValue$L(config, 'align', undefined); // undefined/left/top: no space                

      if (background) {
        _this.addBackground(background);
      }
      if (buttons) {
        _this.addButtons(buttons);
      }
      _this.addChildrenMap('background', background);
      _this.addChildrenMap('buttons', _this.buttonGroup.buttons);
      return _this;
    }
    _createClass(Buttons, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }
        _get(_getPrototypeOf(Buttons.prototype), "destroy", this).call(this, fromScene);
        this.buttonGroup.destroy();
        this.buttonGroup = undefined;
      }
    }, {
      key: "buttons",
      get: function get() {
        return this.buttonGroup.buttons;
      }
    }, {
      key: "groupName",
      get: function get() {
        return this.buttonGroup.groupName;
      },
      set: function set(value) {
        this.buttonGroup.groupName = value;
      }
    }, {
      key: "eventEmitter",
      get: function get() {
        return this.buttonGroup.eventEmitter;
      }
    }]);
    return Buttons;
  }(Sizer);
  Object.assign(Buttons$1.prototype, AddChildMethods$4, RemoveChildMethods$3, ButtonMethods, ButtonStateMethods);

  var GetChildrenWidth$1 = function GetChildrenWidth() {
    if (this.rexSizer.hidden) {
      return 0;
    }

    // Before RunChildrenWrap
    return this.maxChildWidth + this.space.left + this.space.right;
  };

  var GetChildrenHeight$1 = function GetChildrenHeight() {
    if (this.rexSizer.hidden) {
      return 0;
    }

    // After RunChildrenWrap
    return this.widthWrapResult.height + this.space.top + this.space.bottom;
  };

  var GetChildrenSizers$1 = function GetChildrenSizers(out) {
    if (out === undefined) {
      out = [];
    }
    var children = this.sizerChildren,
      child;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];
      if (child === '\n') {
        continue;
      }
      if (child.isRexSizer) {
        out.push(child);
      }
    }
    return out;
  };

  var PreLayout = function PreLayout() {
    this._maxChildWidth = undefined;
    this._maxChildHeight = undefined;
    PreLayout$2.call(this);
    return this;
  };

  var LayoutChildren$1 = function LayoutChildren() {
    var innerLineWidth = this.innerWidth;
    var justifyPercentage = this.justifyPercentage;
    var itemSpace = this.space.item,
      lineSpace = this.space.line,
      indentLeftOdd = this.space.indentLeftOdd,
      indentLeftEven = this.space.indentLeftEven,
      indentTopOdd = this.space.indentTopOdd,
      indentTopEven = this.space.indentTopEven;
    var child,
      childConfig,
      padding,
      justifySpace = 0,
      indentLeft,
      indentTop;
    var startX = this.innerLeft,
      startY = this.innerTop;
    var x, y, width, height; // Align zone
    var lines = this.widthWrapResult.lines;
    var line, lineChlidren, remainderLineWidth;
    var itemX,
      itemY = startY;
    for (var i = 0, icnt = lines.length; i < icnt; i++) {
      // Layout this line
      line = lines[i];
      lineChlidren = line.children;
      if (this.rtl) {
        lineChlidren.reverse();
      }
      indentLeft = i % 2 ? indentLeftEven : indentLeftOdd;
      itemX = startX + indentLeft;
      remainderLineWidth = innerLineWidth - line.width;
      switch (this.align) {
        case 0:
          // left
          break;
        case 1:
          // right
          itemX += remainderLineWidth;
          break;
        case 2:
          // center
          itemX += remainderLineWidth / 2;
          break;
        case 3:
          // justify-left
          justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, justifyPercentage, lineChlidren.length);
          break;
        case 4:
          // justify-right
          justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, justifyPercentage, lineChlidren.length);
          if (justifySpace === 0) {
            // Align right
            itemX += remainderLineWidth;
          }
          break;
        case 5:
          // justify-center
          justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, justifyPercentage, lineChlidren.length);
          if (justifySpace === 0) {
            // Align center
            itemX += remainderLineWidth / 2;
          }
          break;
      }
      var isFirstChild = true;
      for (var j = 0, jcnt = lineChlidren.length; j < jcnt; j++) {
        child = lineChlidren[j];
        if (child.rexSizer.hidden) {
          continue;
        }
        childConfig = child.rexSizer;
        padding = childConfig.padding;
        PreLayoutChild.call(this, child);
        x = itemX + padding.left;
        if (isFirstChild) {
          isFirstChild = false;
        } else {
          x += itemSpace;
        }
        indentTop = j % 2 ? indentTopEven : indentTopOdd;
        y = itemY + indentTop + padding.top;
        width = GetDisplayWidth(child);
        height = GetDisplayHeight(child);
        itemX = x + width + padding.right + justifySpace;
        LayoutChild.call(this, child, x, y, width, height, childConfig.align);
      }
      itemY += line.height + lineSpace;
    }
  };
  var GetJustifySpace = function GetJustifySpace(total, remainder, justifyPercentage, childCount) {
    return remainder / total <= justifyPercentage ? remainder / (childCount - 1) : 0;
  };

  var RunChildrenWrap = function RunChildrenWrap(lineWidth, out) {
    if (out === undefined) {
      out = {
        lines: [],
        width: 0,
        height: 0
      };
    } else {
      out.lines.length = 0;
      out.width = 0;
      out.height = 0;
    }
    var children = this.sizerChildren;
    var itemSpace = this.space.item,
      lineSpace = this.space.line,
      indentLeftOdd = this.space.indentLeftOdd,
      indentLeftEven = this.space.indentLeftEven,
      indentTopOdd = this.space.indentTopOdd,
      indentTopEven = this.space.indentTopEven;
    var child,
      childWidth,
      childHeight,
      remainder = 0,
      indentLeft;
    var lines = out.lines,
      lastLine = undefined,
      newLine;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];
      if (child === '\n') {
        child = undefined;
        childWidth = 0;
        newLine = true;
      } else {
        if (child.rexSizer.hidden) {
          continue;
        }
        if (child.isRexSizer) {
          child.layout(); // Use original size
        }

        childWidth = GetChildWidth(child);
        newLine = remainder < childWidth || lastLine === undefined;
      }
      // New line
      if (newLine) {
        if (lastLine) {
          lastLine.width = lineWidth - (remainder + itemSpace);
          out.width = Math.max(out.width, lastLine.width);
          out.height += lastLine.height + lineSpace;
        }
        lastLine = {
          children: [],
          // width: 0,
          height: 0
        };
        lines.push(lastLine);
        var indentLeft = lines.length % 2 ? indentLeftOdd : indentLeftEven;
        remainder = lineWidth - indentLeft;
      }
      remainder -= childWidth + itemSpace;
      if (child) {
        lastLine.children.push(child);
        childHeight = GeChildHeight(child);
        lastLine.height = Math.max(lastLine.height, childHeight);
      }
    }
    if (lastLine) {
      lastLine.width = lineWidth - (remainder + itemSpace);
      out.width = Math.max(out.width, lastLine.width);
      out.height += lastLine.height;
    }
    out.height += Math.max(indentTopOdd, indentTopEven);
    return out;
  };
  var GetChildWidth = function GetChildWidth(child) {
    var padding = child.rexSizer.padding;
    return GetDisplayWidth(child) + padding.left + padding.right;
  };
  var GeChildHeight = function GeChildHeight(child) {
    var padding = child.rexSizer.padding;
    return GetDisplayHeight(child) + padding.top + padding.bottom;
  };

  var RunWidthWrap = function RunWidthWrap(width) {
    var innerWidth = width - this.space.left - this.space.right;
    this.widthWrapResult = RunChildrenWrap.call(this, innerWidth, this.widthWrapResult);
    RunWidthWrap$1.call(this, width);
  };

  var DistanceBetween$1 = Phaser.Math.Distance.Between;
  var GetNearestChildIndex = function GetNearestChildIndex(x, y) {
    var children = this.sizerChildren;
    if (children.length === 0) {
      return -1;
    }
    var nearestIndex = -1,
      minDistance = Infinity;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      // position is not at this line
      if (Math.abs(child.centerY - y) > child.height / 2) {
        continue;
      }

      // Check left bound
      var distance = DistanceBetween$1(child.left, child.centerY, x, y);
      if (minDistance > distance) {
        minDistance = distance;
        nearestIndex = i;
      }

      // Is last child of this line
      var nextChild = children[i + 1];
      if (nextChild && nextChild.y === child.y) {
        continue;
      }
      var distance = DistanceBetween$1(child.right, child.centerY, x, y);
      if (minDistance > distance) {
        minDistance = distance;
        nearestIndex = i + 1;
      }
    }
    return nearestIndex;
  };

  var IsPlainObject$7 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$K = Phaser.Utils.Objects.GetValue;
  var ALIGN_CENTER$1 = Phaser.Display.Align.CENTER;
  var Add$3 = function Add(gameObject, paddingConfig, childKey, index) {
    if (gameObject === '\n') {
      this.addNewLine();
      return this;
    }
    AddChild$1.call(this, gameObject);
    if (IsPlainObject$7(paddingConfig)) {
      var config = paddingConfig;
      paddingConfig = GetValue$K(config, 'padding', 0);
      childKey = GetValue$K(config, 'key', undefined);
      index = GetValue$K(config, 'index', undefined);
    }
    if (paddingConfig === undefined) {
      paddingConfig = 0;
    }
    var config = this.getSizerConfig(gameObject);
    config.align = ALIGN_CENTER$1;
    config.padding = GetBoundsConfig(paddingConfig);
    if (index === undefined || index >= this.sizerChildren.length) {
      this.sizerChildren.push(gameObject);
    } else {
      this.sizerChildren.splice(index, 0, gameObject);
    }
    if (childKey !== undefined) {
      this.addChildrenMap(childKey, gameObject);
    }
    return this;
  };
  var AddChildMethods$3 = {
    add: function add(gameObject, paddingConfig, childKey) {
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Add$3.call(this, gameObjects[i], paddingConfig);
        }
      } else {
        Add$3.call(this, gameObject, paddingConfig, childKey);
      }
      return this;
    },
    addNewLine: function addNewLine() {
      this.sizerChildren.push('\n');
      return this;
    },
    insert: function insert(index, gameObject, paddingConfig, childKey) {
      Add$3.call(this, gameObject, paddingConfig, childKey, index);
      return this;
    },
    insertAtPosition: function insertAtPosition(x, y, gameObject, paddingConfig, childKey) {
      var index = GetNearestChildIndex.call(this, x, y);
      if (index === -1) {
        index = undefined;
      }
      this.insert(index, gameObject, paddingConfig, childKey);
      return this;
    }
  };

  var RemoveItem$4 = Phaser.Utils.Array.Remove;
  var RemoveChildMethods$2 = {
    remove: function remove(gameObject, destroyChild) {
      if (this.getParentSizer(gameObject) !== this) {
        return this;
      }
      RemoveItem$4(this.sizerChildren, gameObject);
      RemoveChild$1.call(this, gameObject, destroyChild);
      return this;
    },
    removeAll: function removeAll(destroyChild) {
      for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
        this.remove(this.sizerChildren[i], destroyChild);
      }
      return this;
    },
    clear: function clear(destroyChild) {
      this.sizerChildren.length = 0;
      ClearChildren.call(this, destroyChild);
      return this;
    }
  };

  var methods$9 = {
    getChildrenWidth: GetChildrenWidth$1,
    getChildrenHeight: GetChildrenHeight$1,
    getChildrenSizers: GetChildrenSizers$1,
    preLayout: PreLayout,
    layoutChildren: LayoutChildren$1,
    runWidthWrap: RunWidthWrap
  };
  Object.assign(methods$9, AddChildMethods$3, RemoveChildMethods$2);

  var GetMaxChildWidth = function GetMaxChildWidth(children) {
    if (children === undefined) {
      children = this.sizerChildren;
    }
    var result = 0;
    var child, childWidth;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];
      if (child === '\n') {
        continue;
      }
      childWidth = this.getChildWidth(child);
      result = Math.max(childWidth, result);
    }
    return result;
  };

  var GetMaxChildHeight = function GetMaxChildHeight(children) {
    if (children === undefined) {
      children = this.sizerChildren;
    }
    var result = 0;
    var child, childHeight;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];
      if (child === '\n') {
        continue;
      }
      childHeight = child.isRexSizer ? Math.max(child.minHeight, child.childrenHeight) : child.hasOwnProperty('minHeight') ? child.minHeight : GetDisplayHeight(child);
      result = Math.max(childHeight, result);
    }
    return result;
  };

  var IsPlainObject$6 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$J = Phaser.Utils.Objects.GetValue;
  var FixWidthSizer = /*#__PURE__*/function (_BaseSizer) {
    _inherits(FixWidthSizer, _BaseSizer);
    var _super = _createSuper(FixWidthSizer);
    function FixWidthSizer(scene, x, y, minWidth, minHeight, config) {
      var _this;
      _classCallCheck(this, FixWidthSizer);
      if (IsPlainObject$6(x)) {
        config = x;
        x = GetValue$J(config, 'x', 0);
        y = GetValue$J(config, 'y', 0);
        minWidth = GetValue$J(config, 'width', undefined);
        minHeight = GetValue$J(config, 'height', undefined);
      } else if (IsPlainObject$6(minWidth)) {
        config = minWidth;
        minWidth = GetValue$J(config, 'width', undefined);
        minHeight = GetValue$J(config, 'height', undefined);
      }
      _this = _super.call(this, scene, x, y, minWidth, minHeight, config);
      _this.type = 'rexFixWidthSizer';
      _this.sizerChildren = [];
      _this.setOrientation(GetValue$J(config, 'orientation', 0));
      _this.setItemSpacing(GetValue$J(config, 'space.item', 0));
      _this.setLineSpacing(GetValue$J(config, 'space.line', 0));
      _this.setIntentLeft(GetValue$J(config, 'space.indentLeftOdd', 0), GetValue$J(config, 'space.indentLeftEven', 0));
      _this.setIntentTop(GetValue$J(config, 'space.indentTopOdd', 0), GetValue$J(config, 'space.indentTopEven', 0));
      _this.setAlign(GetValue$J(config, 'align', 0));
      _this.setJustifyPercentage(GetValue$J(config, 'justifyPercentage', 0.25));
      _this.setRTL(GetValue$J(config, 'rtl', false));
      _this.addChildrenMap('items', _this.sizerChildren);
      return _this;
    }
    _createClass(FixWidthSizer, [{
      key: "setOrientation",
      value: function setOrientation(orientation) {
        this.orientation = GetOrientationMode(orientation);
        return this;
      }
    }, {
      key: "setItemSpacing",
      value: function setItemSpacing(space) {
        this.space.item = space;
        return this;
      }
    }, {
      key: "setLineSpacing",
      value: function setLineSpacing(space) {
        this.space.line = space;
        return this;
      }
    }, {
      key: "setIntentLeft",
      value: function setIntentLeft(odd, even) {
        this.space.indentLeftOdd = odd;
        this.space.indentLeftEven = even;
        return this;
      }
    }, {
      key: "setIntentTop",
      value: function setIntentTop(odd, even) {
        this.space.indentTopOdd = odd;
        this.space.indentTopEven = even;
        return this;
      }
    }, {
      key: "setAlign",
      value: function setAlign(align) {
        if (typeof align === 'string') {
          align = ALIGN[align];
        }
        this.align = align;
        return this;
      }
    }, {
      key: "setJustifyPercentage",
      value: function setJustifyPercentage(value) {
        this.justifyPercentage = value;
        return this;
      }
    }, {
      key: "setRTL",
      value: function setRTL(enabled) {
        if (enabled === undefined) {
          enabled = true;
        }
        this.rtl = enabled;
        return this;
      }
    }, {
      key: "maxChildWidth",
      get: function get() {
        if (this._maxChildWidth === undefined) {
          this._maxChildWidth = GetMaxChildWidth.call(this);
        }
        return this._maxChildWidth;
      }
    }, {
      key: "maxChildHeight",
      get: function get() {
        if (this._maxChildHeight === undefined) {
          this._maxChildHeight = GetMaxChildHeight.call(this);
        }
        return this._maxChildHeight;
      }
    }]);
    return FixWidthSizer;
  }(Base$1);
  var ALIGN = {
    left: 0,
    top: 0,
    right: 1,
    bottom: 1,
    center: 2,
    justify: 3,
    'justify-left': 3,
    'justify-top': 3,
    'justify-right': 4,
    'justify-bottom': 4,
    'justify-center': 5
  };
  Object.assign(FixWidthSizer.prototype, methods$9);

  var SizerAdd$1 = FixWidthSizer.prototype.add;
  var Add$2 = function Add(gameObject) {
    SizerAdd$1.call(this, gameObject);
    this.buttonGroup.add(gameObject);
    return this;
  };
  var AddChildMethods$2 = {
    addButton: function addButton(gameObject) {
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Add$2.call(this, gameObjects[i]);
        }
      } else {
        Add$2.call(this, gameObject);
      }
      return this;
    },
    addButtons: function addButtons(gameObjects) {
      if (IsArray(gameObjects[0])) {
        // 2d array
        var lines = gameObjects,
          line;
        for (var lineIdx = 0, lastLineIdx = lines.length - 1; lineIdx <= lastLineIdx; lineIdx++) {
          line = lines[lineIdx];
          for (var i = 0, cnt = line.length; i < cnt; i++) {
            Add$2.call(this, line[i]);
          }
          if (lineIdx > lastLineIdx) {
            SizerAdd$1.addNewLine(this);
          }
        }
      } else {
        // 1d array
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Add$2.call(this, gameObjects[i]);
        }
      }
      return this;
    }
  };

  var SizerRmove = FixWidthSizer.prototype.remove;
  var SizerClear = FixWidthSizer.prototype.clear;
  var Remove = function Remove(gameObject, destroyChild) {
    var gameObject = this.getButton(gameObject);
    if (!gameObject) {
      return this;
    }
    this.buttonGroup.remove(gameObject);
    SizerRmove.call(this, gameObject, destroyChild);
    return this;
  };
  var RemoveChildMethods$1 = {
    remove: function remove(gameObject, destroyChild) {
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Remove.call(this, gameObjects[i], destroyChild);
        }
      } else {
        Remove.call(this, gameObject, destroyChild);
      }
      return this;
    },
    clear: function clear(destroyChild) {
      var buttons = this.buttonGroup.buttons;
      buttons.length = 0;
      SizerClear.call(this, destroyChild);
      return this;
    },
    removeButton: function removeButton(gameObject, destroyChild) {
      this.remove(gameObject, destroyChild);
      return this;
    },
    clearButtons: function clearButtons(destroyChild) {
      var buttons = this.buttonGroup.buttons;
      for (var i = buttons.length - 1; i >= 0; i--) {
        Remove.call(this, buttons[i], destroyChild);
      }
      return this;
    }
  };

  var GetValue$I = Phaser.Utils.Objects.GetValue;
  var Buttons = /*#__PURE__*/function (_FixWidthSizer) {
    _inherits(Buttons, _FixWidthSizer);
    var _super = _createSuper(Buttons);
    function Buttons(scene, config) {
      var _this;
      _classCallCheck(this, Buttons);
      if (config === undefined) {
        config = {};
      }
      var buttonSpace = config.space;
      if (typeof buttonSpace === 'number') {
        config.space = {
          item: buttonSpace,
          line: buttonSpace
        };
      }

      // Create
      _this = _super.call(this, scene, config);
      _this.type = 'rexFixWidthButtons';
      _this.buttonGroup = new ButtonGroup({
        parent: _assertThisInitialized(_this),
        eventEmitter: GetValue$I(config, 'eventEmitter', _assertThisInitialized(_this)),
        groupName: GetValue$I(config, 'groupName', undefined),
        clickConfig: GetValue$I(config, 'click', undefined)
      }).setButtonsType(config);

      // Add elements
      var background = GetValue$I(config, 'background', undefined);
      var buttons = GetValue$I(config, 'buttons', undefined);

      // Buttons properties
      _this.buttonsAlign = GetValue$I(config, 'align', undefined);
      if (background) {
        _this.addBackground(background);
      }
      if (buttons) {
        _this.addButtons(buttons);
      }
      _this.addChildrenMap('background', background);
      _this.addChildrenMap('buttons', _this.buttonGroup.buttons);
      return _this;
    }
    _createClass(Buttons, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }
        _get(_getPrototypeOf(Buttons.prototype), "destroy", this).call(this, fromScene);
        this.buttonGroup.destroy();
        this.buttonGroup = undefined;
      }
    }, {
      key: "buttons",
      get: function get() {
        return this.buttonGroup.buttons;
      }
    }, {
      key: "groupName",
      get: function get() {
        return this.buttonGroup.groupName;
      },
      set: function set(value) {
        this.buttonGroup.groupName = value;
      }
    }, {
      key: "eventEmitter",
      get: function get() {
        return this.buttonGroup.eventEmitter;
      }
    }]);
    return Buttons;
  }(FixWidthSizer);
  Object.assign(Buttons.prototype, AddChildMethods$2, RemoveChildMethods$1, ButtonMethods, ButtonStateMethods);

  var GetChildrenWidth = function GetChildrenWidth() {
    if (this.rexSizer.hidden) {
      return 0;
    }
    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childWidth;
    for (var key in children) {
      child = children[key];
      padding = child.rexSizer.padding;
      childWidth = this.getChildWidth(child) + padding.left + padding.right;
      result = Math.max(childWidth, result);
    }
    return result + this.space.left + this.space.right;
  };

  var GetChildrenHeight = function GetChildrenHeight() {
    if (this.rexSizer.hidden) {
      return 0;
    }
    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childHeight;
    for (var key in children) {
      child = children[key];
      childHeight = child.isRexSizer ? Math.max(child.minHeight, child.childrenHeight) : child.minHeight !== undefined ? child.minHeight : GetDisplayHeight(child);
      padding = child.rexSizer.padding;
      childHeight += padding.top + padding.bottom;
      result = Math.max(childHeight, result);
    }
    return result + this.space.top + this.space.bottom;
  };

  var GetExpandedChildWidth = function GetExpandedChildWidth(child, parentWidth) {
    if (parentWidth === undefined) {
      parentWidth = this.width;
    }
    var childWidth;
    var childConfig = child.rexSizer;
    if (childConfig.expandWidth) {
      var innerWidth = parentWidth - this.space.left - this.space.right;
      var padding = childConfig.padding;
      childWidth = innerWidth - padding.left - padding.right;
    }
    return childWidth;
  };

  var GetExpandedChildHeight = function GetExpandedChildHeight(child, parentHeight) {
    if (parentHeight === undefined) {
      parentHeight = this.height;
    }
    var childHeight;
    var childConfig = child.rexSizer;
    if (childConfig.expandHeight) {
      var innerHeight = parentHeight - this.space.top - this.space.bottom;
      var padding = childConfig.padding;
      childHeight = innerHeight - padding.top - padding.bottom;
    }
    return childHeight;
  };

  var GetChildrenSizers = function GetChildrenSizers(out) {
    if (out === undefined) {
      out = [];
    }
    var children = this.sizerChildren,
      child;
    for (var key in children) {
      child = children[key];
      if (child.isRexSizer) {
        out.push(child);
      }
    }
    return out;
  };

  var LayoutChildren = function LayoutChildren() {
    var child, childConfig, padding;
    var startX = this.innerLeft,
      startY = this.innerTop;
    var innerWidth = this.innerWidth,
      innerHeight = this.innerHeight;
    var x, y, width, height; // Align zone
    var childWidth, childHeight;
    // Layout current page
    var children = this.sizerChildren;
    for (var key in children) {
      child = children[key];
      if (child.rexSizer.hidden) {
        continue;
      }
      childConfig = child.rexSizer;
      padding = childConfig.padding;
      PreLayoutChild.call(this, child);

      // Set size
      if (child.isRexSizer) {
        child.runLayout(this, this.getExpandedChildWidth(child), this.getExpandedChildHeight(child));
        CheckSize(child, this);
      } else {
        childWidth = undefined;
        childHeight = undefined;
        if (childConfig.expandWidth) {
          // Expand width
          childWidth = innerWidth - padding.left - padding.right;
        }
        if (childConfig.expandHeight) {
          // Expand height
          childHeight = innerHeight - padding.top - padding.bottom;
        }
        ResizeGameObject(child, childWidth, childHeight);
      }

      // Set position
      x = startX + padding.left;
      width = innerWidth - padding.left - padding.right;
      y = startY + padding.top;
      height = innerHeight - padding.top - padding.bottom;
      LayoutChild.call(this, child, x, y, width, height, childConfig.align, childConfig.alignOffsetX, childConfig.alignOffsetY);
    }
  };

  var IsPlainObject$5 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$H = Phaser.Utils.Objects.GetValue;
  var ALIGN_CENTER = Phaser.Display.Align.CENTER;
  var UUID$1 = Phaser.Utils.String.UUID;
  var Add$1 = function Add(gameObject, childKey, align, padding, expand, minWidth, minHeight, offsetX, offsetY) {
    AddChild$1.call(this, gameObject);
    if (IsPlainObject$5(childKey)) {
      var config = childKey;
      childKey = GetValue$H(config, 'key', undefined);
      align = GetValue$H(config, 'align', ALIGN_CENTER);
      offsetX = GetValue$H(config, 'offsetX', 0);
      offsetY = GetValue$H(config, 'offsetY', 0);
      padding = GetValue$H(config, 'padding', 0);
      expand = GetValue$H(config, 'expand', true);
      if (!gameObject.isRexSizer) {
        // Get minWidth,minHeight from config
        minWidth = GetValue$H(config, 'minWidth', gameObject._minWidth);
        minHeight = GetValue$H(config, 'minHeight', gameObject._minHeighted);
      }
    }
    var hasValidKey = childKey !== undefined;
    if (!hasValidKey) {
      childKey = UUID$1();
    }
    if (typeof align === 'string') {
      align = AlignConst[align];
    }
    if (align === undefined) {
      align = ALIGN_CENTER;
    }
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    if (padding === undefined) {
      padding = 0;
    }
    if (expand === undefined) {
      expand = true;
    }
    if (!gameObject.isRexSizer) {
      // Get minWidth,minHeight from game object
      if (minWidth === undefined) {
        minWidth = gameObject._minWidth;
      }
      if (minHeight === undefined) {
        minHeight = gameObject._minHeight;
      }
    }
    var config = this.getSizerConfig(gameObject);
    config.align = align;
    config.alignOffsetX = offsetX;
    config.alignOffsetY = offsetY;
    config.padding = GetBoundsConfig(padding);
    if (IsPlainObject$5(expand)) {
      config.expandWidth = GetValue$H(expand, 'width', false);
      config.expandHeight = GetValue$H(expand, 'height', false);
    } else {
      config.expandWidth = expand;
      config.expandHeight = expand;
    }
    if (!gameObject.isRexSizer) {
      // Expand normal game object
      if (config.expandWidth) {
        // minWidth is still undefined, uses current display width
        gameObject.minWidth = minWidth === undefined ? GetDisplayWidth(gameObject) : minWidth;
      }
      if (config.expandHeight) {
        // minHeight is still undefined, uses current display height
        gameObject.minHeight = minHeight === undefined ? GetDisplayHeight(gameObject) : minHeight;
      }
    }
    if (this.sizerChildren.hasOwnProperty(childKey)) {
      this.sizerChildren[childKey].destroy();
    }
    this.sizerChildren[childKey] = gameObject;
    if (hasValidKey) {
      this.addChildrenMap(childKey, gameObject);
    }
    return this;
  };
  var AddChildMethods$1 = {
    add: Add$1
  };

  var RemoveChildMethods = {
    remove: function remove(gameObject, destroyChild) {
      var key;
      if (typeof gameObject === 'string') {
        key = gameObject;
        gameObject = this.sizerChildren[key];
        if (!gameObject) {
          return this;
        }
      } else if (this.getParentSizer(gameObject) !== this) {
        return this;
      } else {
        key = this.childToKey(gameObject);
      }
      if (key) {
        delete this.sizerChildren[key];
        if (this.childrenMap.hasOwnProperty(key)) {
          delete this.childrenMap[key];
        }
      }
      RemoveChild$1.call(this, gameObject, destroyChild);
      return this;
    },
    removeAll: function removeAll(destroyChild) {
      for (var key in this.sizerChildren) {
        this.remove(key, destroyChild);
      }
      return this;
    },
    clear: function clear(destroyChild) {
      for (var key in this.sizerChildren) {
        delete this.sizerChildren[key];
        if (this.childrenMap.hasOwnProperty(key)) {
          delete this.childrenMap[key];
        }
      }
      ClearChildren.call(this, destroyChild);
      return this;
    }
  };

  var methods$8 = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,
    getChildrenSizers: GetChildrenSizers,
    layoutChildren: LayoutChildren
  };
  Object.assign(methods$8, AddChildMethods$1, RemoveChildMethods);

  var IndexOf = function IndexOf(obj, child) {
    if (Array.isArray(obj)) {
      return obj.indexOf(child);
    } else {
      for (var key in obj) {
        if (obj[key] === child) {
          return key;
        }
      }
      return null;
    }
  };

  var IsPlainObject$4 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$G = Phaser.Utils.Objects.GetValue;
  var OverlapSizer = /*#__PURE__*/function (_BaseSizer) {
    _inherits(OverlapSizer, _BaseSizer);
    var _super = _createSuper(OverlapSizer);
    function OverlapSizer(scene, x, y, minWidth, minHeight, config) {
      var _this;
      _classCallCheck(this, OverlapSizer);
      if (IsPlainObject$4(x)) {
        config = x;
        x = GetValue$G(config, 'x', 0);
        y = GetValue$G(config, 'y', 0);
        minWidth = GetValue$G(config, 'width', undefined);
        minHeight = GetValue$G(config, 'height', undefined);
      } else if (IsPlainObject$4(minWidth)) {
        config = minWidth;
        minWidth = GetValue$G(config, 'width', undefined);
        minHeight = GetValue$G(config, 'height', undefined);
      }
      _this = _super.call(this, scene, x, y, minWidth, minHeight, config);
      _this.type = 'rexOverlapSizer';
      _this.sizerChildren = {};
      _this.addChildrenMap('items', _this.sizerChildren);
      return _this;
    }
    _createClass(OverlapSizer, [{
      key: "childToKey",
      value: function childToKey(gameObject) {
        if (typeof gameObject === 'string') {
          var key = gameObject;
          if (this.sizerChildren.hasOwnPropery(key)) {
            return key;
          }
        } else {
          return IndexOf(this.sizerChildren, gameObject);
        }
        return null;
      }
    }]);
    return OverlapSizer;
  }(Base$1);
  Object.assign(OverlapSizer.prototype, methods$8);

  var OverlapSizerAdd = OverlapSizer.prototype.add;
  var Add = function Add(gameObject, childKey, align, padding, expand, minWidth, minHeight, offsetX, offsetY) {
    gameObject.setVisible(false); // Default is invisible
    OverlapSizerAdd.call(this, gameObject, childKey, align, padding, expand, minWidth, minHeight, offsetX, offsetY);
    return this;
  };
  var AddChildMethods = {
    add: Add,
    addPage: Add
  };

  var GetPage$1 = function GetPage(key) {
    if (key === undefined) {
      return null;
    } else if (!this.sizerChildren.hasOwnProperty(key)) {
      return null;
    } else {
      return this.sizerChildren[key];
    }
  };

  var ContainerSetChildVisible = ContainerLite.prototype.setChildVisible;
  var SwapPage$1 = function SwapPage(key, fadeInDuration) {
    this._previousKey = this._currentKey;
    var prevoiusPage = this.previousPage;
    if (prevoiusPage) {
      if (this.swapMode === 0) {
        // Invisible
        ContainerSetChildVisible.call(this, prevoiusPage, false);
        this.emit('pageinvisible', prevoiusPage, this._previousKey, this);
      } else {
        // Destroy
        prevoiusPage.destroy();
      }
    }
    if (key && !this.sizerChildren.hasOwnProperty(key)) {
      this.emit('createpage', key, this);
    }
    this._currentKey = key;
    var currentPage = this.currentPage;
    if (currentPage) {
      ContainerSetChildVisible.call(this, currentPage, true);
      this.emit('pagevisible', currentPage, this._currentKey, this);
      if (fadeInDuration === undefined) {
        fadeInDuration = this.fadeInDuration;
      }
      if (fadeInDuration > 0) {
        currentPage.setAlpha(0).fadeIn(fadeInDuration, 1);
      }
    }
    return this;
  };

  var HasPage = function HasPage(key) {
    return this.sizerChildren.hasOwnProperty(key);
  };

  var methods$7 = {
    getPage: GetPage$1,
    swapPage: SwapPage$1,
    hasPage: HasPage
  };
  Object.assign(methods$7, AddChildMethods);

  var GetValue$F = Phaser.Utils.Objects.GetValue;
  var Pages = /*#__PURE__*/function (_OverlapSizer) {
    _inherits(Pages, _OverlapSizer);
    var _super = _createSuper(Pages);
    function Pages(scene, config) {
      var _this;
      _classCallCheck(this, Pages);
      _this = _super.call(this, scene, config);
      _this.type = 'rexPages';
      _this.childrenMap = _this.sizerChildren;
      _this._previousKey = undefined;
      _this._currentKey = undefined;
      _this.setSwapMode(GetValue$F(config, 'swapMode', 0));
      _this.setFadeInDuration(GetValue$F(config, 'fadeIn', 0));
      return _this;
    }
    _createClass(Pages, [{
      key: "setSwapMode",
      value: function setSwapMode(mode) {
        if (typeof mode === 'string') {
          mode = SWAPMODE[mode];
        }
        this.swapMode = mode;
        return this;
      }
    }, {
      key: "setFadeInDuration",
      value: function setFadeInDuration(duration) {
        this.fadeInDuration = duration;
        return this;
      }
    }, {
      key: "previousKey",
      get: function get() {
        return this._previousKey;
      }
    }, {
      key: "currentKey",
      get: function get() {
        return this._currentKey;
      },
      set: function set(key) {
        this.swapPage(key);
      }
    }, {
      key: "currentPage",
      get: function get() {
        return this.getPage(this.currentKey);
      }
    }, {
      key: "previousPage",
      get: function get() {
        return this.getPage(this.previousKey);
      }
    }, {
      key: "keys",
      get: function get() {
        return Object.keys(this.sizerChildren);
      }
    }]);
    return Pages;
  }(OverlapSizer);
  Object.assign(Pages.prototype, methods$7);
  var SWAPMODE = {
    invisible: 0,
    destroy: 1
  };

  var GetPageKeyByIndex = function GetPageKeyByIndex(index) {
    var buttons = this.getElement('tabs.buttons');
    if (index >= buttons.length) {
      return undefined;
    }
    return buttons[index].name;
  };

  var GetPageIndexByKey = function GetPageIndexByKey(key) {
    var buttons = this.getElement('tabs.buttons');
    for (var i = 0, cnt = buttons.length; i < cnt; i++) {
      if (buttons[i].name === key) {
        return i;
      }
    }
    return undefined;
  };

  var IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$E = Phaser.Utils.Objects.GetValue;
  var UUID = Phaser.Utils.String.UUID;
  var AddPage = function AddPage(key, tabGameObject, pageGameObject) {
    if (IsPlainObject$3(key)) {
      var config = key;
      key = GetValue$E(config, 'key');
      tabGameObject = GetValue$E(config, 'tab');
      pageGameObject = GetValue$E(config, 'page');
    }
    if (!key) {
      key = UUID();
    }
    tabGameObject.name = key; // For ratio buttons

    this.childrenMap.tabs.addButton(tabGameObject);
    this.childrenMap.pages.addPage(pageGameObject, {
      key: key
    });
    return this;
  };

  var SwapPage = function SwapPage(key, fadeInDuration) {
    var index;
    if (typeof key === 'number') {
      index = key;
    } else {
      index = this.getPageIndex(key);
    }
    if (index != null) {
      // Override fadeInDuration
      var fadeInDurationSave;
      if (fadeInDuration !== undefined) {
        fadeInDurationSave = this.childrenMap.pages.fadeInDuration;
        this.childrenMap.pages.fadeInDuration = fadeInDuration;
      }
      this.childrenMap.tabs.emitButtonClick(index);

      // Restore fadeInDuration
      if (fadeInDurationSave !== undefined) {
        this.childrenMap.pages.fadeInDuration = fadeInDurationSave;
      }
    }
    return this;
  };
  var SwapFirstPage = function SwapFirstPage(fadeInDuration) {
    this.swapPage(0, fadeInDuration);
    return this;
  };
  var SwapLastPage = function SwapLastPage(fadeInDuration) {
    var index = this.getElement('tabs.buttons').length - 1;
    this.swapPage(index, fadeInDuration);
    return this;
  };
  var SwapPageMethods = {
    swapPage: SwapPage,
    swapFirstPage: SwapFirstPage,
    swapLastPage: SwapLastPage
  };

  var RemovePage = function RemovePage(key, destroyChild) {
    if (typeof key === 'number') {
      key = this.getPageKey(key);
    }
    var tabs = this.childrenMap.tabs;
    var tabGameObject = tabs.getByName(key);
    var pages = this.childrenMap.pages;
    var pageGameObject = pages.getElement(key);
    if (!tabGameObject || !pageGameObject) {
      return this;
    }
    pages.removeChildrenMap(key);
    tabs.removeButton(tabGameObject, destroyChild);
    pages.remove(pageGameObject, destroyChild);
    return this;
  };
  var RemovePageMethods = {
    removePage: RemovePage
  };

  var GetPage = function GetPage(key) {
    if (typeof key === 'number') {
      key = this.getPageKey(key);
    }
    return this.childrenMap.pages.getPage(key);
  };

  var GetTab = function GetTab(key) {
    var index;
    if (typeof key === 'number') {
      index = key;
    } else {
      index = this.getPageIndex(key);
    }
    return this.getElement('tabs.buttons')[index];
  };

  var methods$6 = {
    getPageKey: GetPageKeyByIndex,
    getPageIndex: GetPageIndexByKey,
    addPage: AddPage,
    getPage: GetPage,
    getTab: GetTab
  };
  Object.assign(methods$6, SwapPageMethods, RemovePageMethods);

  var GetValue$D = Phaser.Utils.Objects.GetValue;
  var SizerAdd = Sizer.prototype.add;
  var TabPages$1 = /*#__PURE__*/function (_Sizer) {
    _inherits(TabPages, _Sizer);
    var _super = _createSuper(TabPages);
    function TabPages(scene, config) {
      var _this;
      _classCallCheck(this, TabPages);
      if (config === undefined) {
        config = {};
      }
      var tabsPosition = GetValue$D(config, 'tabPosition', 'top');
      var sizerOrientation = tabsPosition === 'left' || tabsPosition === 'right' ? 'x' : 'y';
      config.orientation = sizerOrientation;
      _this = _super.call(this, scene, config);
      _this.type = 'rexTabPages';

      // Add elements
      var background = GetValue$D(config, 'background', undefined);
      if (background) {
        _this.addBackground(background);
      }
      var pagesConfig = GetValue$D(config, 'pages');
      var pages = new Pages(scene, pagesConfig);
      scene.add.existing(pages);
      var isHorizontalTabs = sizerOrientation === 'y';
      var wrapTabs = isHorizontalTabs ? GetValue$D(config, 'wrapTabs', false) : false;
      var tabsConfig = GetValue$D(config, 'tabs', undefined);
      if (tabsConfig === undefined) {
        tabsConfig = {};
      }
      var ButtonsClass = wrapTabs ? Buttons : Buttons$1;
      tabsConfig.orientation = isHorizontalTabs ? 'x' : 'y';
      tabsConfig.buttonsType = 'radio';
      var tabs = new ButtonsClass(scene, tabsConfig);
      scene.add.existing(tabs);
      var tabsExpand = wrapTabs ? true : GetValue$D(config, 'expand.tabs', false);
      var tabAlign = GetValue$D(config, 'align.tabs', 'left');
      switch (tabsPosition) {
        case 'top':
        case 'left':
          SizerAdd.call(_assertThisInitialized(_this), tabs, {
            proportion: 0,
            expand: tabsExpand,
            align: tabAlign
          });
          SizerAdd.call(_assertThisInitialized(_this), pages, {
            proportion: 1,
            expand: true
          });
          break;
        case 'bottom':
        case 'right':
          SizerAdd.call(_assertThisInitialized(_this), pages, {
            proportion: 1,
            expand: true
          });
          SizerAdd.call(_assertThisInitialized(_this), tabs, {
            proportion: 0,
            expand: tabsExpand,
            align: tabAlign
          });
          break;
      }
      _this.addChildrenMap('background', background);
      _this.addChildrenMap('tabs', tabs);
      _this.addChildrenMap('pages', pages);

      // Register events
      tabs.on('button.click', function (tab) {
        var key = tab.name;
        if (pages.hasPage(key)) {
          pages.swapPage(key);
        }
      });
      tabs.on('button.statechange', function (tab, index, value, previousValue) {
        var eventName = value ? 'tab.focus' : 'tab.blur';
        this.emit(eventName, tab, tab.name);
      }, _assertThisInitialized(_this));
      pages.on('pagevisible', function (pageObject, key, pages) {
        this.emit('page.focus', pageObject, key);
      });
      pages.on('pageinvisible', function (pageObject, key, pages) {
        this.emit('page.blur', pageObject, key);
      });
      return _this;
    }
    _createClass(TabPages, [{
      key: "currentKey",
      get: function get() {
        return this.getElement('pages').currentKey;
      },
      set: function set(key) {
        this.showPage(key);
      }
    }, {
      key: "keys",
      get: function get() {
        return this.getElement('pages').keys;
      }
    }, {
      key: "currentPage",
      get: function get() {
        return this.getElement('pages').currentPage;
      }
    }, {
      key: "previousPage",
      get: function get() {
        return this.getElement('pages').previousPage;
      }
    }]);
    return TabPages;
  }(Sizer);
  Object.assign(TabPages$1.prototype, methods$6);

  var TabPages = /*#__PURE__*/function (_TabPagesBase) {
    _inherits(TabPages, _TabPagesBase);
    var _super = _createSuper(TabPages);
    function TabPages() {
      _classCallCheck(this, TabPages);
      return _super.apply(this, arguments);
    }
    _createClass(TabPages, [{
      key: "setBindingTarget",
      value: function setBindingTarget(target) {
        var children = this.childrenMap.pages.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
          children[i].setBindingTarget(target);
        }
        return this;
      }
    }]);
    return TabPages;
  }(TabPages$1);

  var ExtractByPrefix = function ExtractByPrefix(obj, prefix, delimiter, out) {
    if (delimiter === undefined) {
      delimiter = '.';
    }
    if (out === undefined) {
      out = {};
    }
    if (!obj) {
      return out;
    }
    if (prefix in obj) {
      return Object.assign(out, obj[prefix]);
    }
    prefix += delimiter;
    for (var key in obj) {
      if (!key.startsWith(prefix)) {
        continue;
      }
      out[key.replace(prefix, '')] = obj[key];
    }
    return out;
  };

  var GetPartialData = function GetPartialData(obj, keys, out) {
    if (out === undefined) {
      out = {};
    }
    if (Array.isArray(keys)) {
      var key;
      for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];
        out[key] = obj[key];
      }
    } else {
      for (var key in keys) {
        out[key] = obj[key];
      }
    }
    return out;
  };

  var IsKeyValueEqual = function IsKeyValueEqual(objA, objB) {
    for (var key in objA) {
      if (!(key in objB)) {
        return false;
      }
      if (objA[key] !== objB[key]) {
        return false;
      }
    }
    for (var key in objB) {
      if (!(key in objA)) {
        return false;
      }
    }
    return true;
  };

  var CreateButtonRoundRectangleBackground = function CreateButtonRoundRectangleBackground(scene, config) {
    var gameObject = new RoundRectangle$1(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
  };
  var RoundRectangle$1 = /*#__PURE__*/function (_RoundRectangleBase) {
    _inherits(RoundRectangle, _RoundRectangleBase);
    var _super = _createSuper(RoundRectangle);
    function RoundRectangle(scene, config) {
      var _this;
      _classCallCheck(this, RoundRectangle);
      if (config === undefined) {
        config = {};
      }
      _this = _super.call(this, scene, config);
      var activeStyle = ExtractByPrefix(config, 'active');
      for (var name in activeStyle) {
        var propertyName = StyleToProperty[name] || name;
        var value = activeStyle[name];
        delete activeStyle[name];
        activeStyle[propertyName] = value;
      }
      _this.activeStyle = activeStyle;
      return _this;
    }
    _createClass(RoundRectangle, [{
      key: "modifyStyle",
      value: function modifyStyle(style) {
        for (var key in style) {
          this[key] = style[key];
        }
        return this;
      }
    }, {
      key: "setActiveState",
      value: function setActiveState(enable) {
        if (enable === undefined) {
          enable = true;
        }
        if (this.activeState === enable) {
          return this;
        }
        this.activeState = enable;
        if (enable) {
          var activeStyle = this.activeStyle;
          var styleSave = GetPartialData(this, activeStyle);
          if (IsKeyValueEqual(activeStyle, styleSave)) {
            return;
          }
          this.styleSave = styleSave;
          this.modifyStyle(activeStyle);
        } else {
          if (!this.styleSave) {
            return this;
          }
          this.modifyStyle(this.styleSave);
          this.styleSave = undefined;
        }
        return this;
      }
    }]);
    return RoundRectangle;
  }(RoundRectangle$2);
  var StyleToProperty = {
    color: 'fillColor',
    alpha: 'fillAlpha',
    strokeColor: 'strokeColor',
    strokeAlpha: 'strokeAlpha',
    strokeWidth: 'lineWidth'
  };

  var BuildInteractiveLabelConfig = function BuildInteractiveLabelConfig(scene, config) {
    config = config ? DeepClone(config) : {};
    config.background = CreateButtonRoundRectangleBackground(scene, config.background);
    config.text = CreateText(scene, config.text);
    if (config.icon !== null) {
      config.icon = CreateImage(scene, config.icon);
    }
    if (config.action != null) {
      config.action = CreateImage(scene, config.action);
    }
    return config;
  };

  var CreateInteractiveLabel = function CreateInteractiveLabel(scene, config) {
    config = BuildInteractiveLabelConfig(scene, config);
    var gameObject = new Label(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
  };
  var Label = /*#__PURE__*/function (_LabelBase) {
    _inherits(Label, _LabelBase);
    var _super = _createSuper(Label);
    function Label() {
      _classCallCheck(this, Label);
      return _super.apply(this, arguments);
    }
    _createClass(Label, [{
      key: "setActiveState",
      value: function setActiveState(enable) {
        this.childrenMap.background.setActiveState(enable);
        return this;
      }
    }]);
    return Label;
  }(Label$1);

  var GetValue$C = Phaser.Utils.Objects.GetValue;
  var CreateTab = function CreateTab(scene, config, style) {
    var tabPages = new TabPages(scene, style);
    scene.add.existing(tabPages);
    var tabConfig = GetValue$C(style, 'tab');
    var tweakerConfig = {
      root: GetValue$C(style, 'root'),
      styles: GetValue$C(style, 'tweaker')
    };
    var pages = GetValue$C(config, 'pages') || [];
    for (var i = 0, cnt = pages.length; i < cnt; i++) {
      var page = pages[i];
      tabPages.addPage({
        key: page.title,
        tab: CreateInteractiveLabel(scene, tabConfig).setActiveState(false).resetDisplayContent({
          text: page.title
        }),
        page: CreateTweaker(scene, tweakerConfig)
      });
    }
    tabPages.on('tab.focus', function (tab, key) {
      tab.setActiveState(true);
    }).on('tab.blur', function (tab, key) {
      tab.setActiveState(false);
    });
    return tabPages;
  };

  var GetValue$B = Phaser.Utils.Objects.GetValue;
  var AddTab = function AddTab(config) {
    var scene = this.scene;

    // Create tab
    var tabStyle = GetValue$B(this.styles, 'tab') || {};
    tabStyle.tweaker = this.styles;
    tabStyle.root = this.root;
    var tab = CreateTab(scene, config, tabStyle);
    delete tabStyle.tweaker;
    delete tabStyle.root;

    // Add tab
    this.add(tab, {
      expand: true
    });
    var pagesConfig = GetValue$B(config, 'pages') || [];
    var pages = [];
    var shownPageIndex = 0;
    for (var i = 0, cnt = pagesConfig.length; i < cnt; i++) {
      var childTweaker = tab.getPage(i);
      var isPageShown = pagesConfig[i].show;
      if (isPageShown) {
        shownPageIndex = i;
      }
      var key = pagesConfig[i].key;
      if (key) {
        this.root.addChildrenMap(key, childTweaker);
      }
      pages.push(childTweaker);
    }
    tab.swapPage(shownPageIndex, 0);
    return pages;
  };

  var StringType = 'string';
  var NumberType = 'number';
  var RangeType = 'range';
  var ListType = 'list';
  var ButtonsType = 'buttons';
  var BooleanType = 'boolean';
  var ColorType = 'color';

  var GetInputType = function GetInputType(value, config) {
    // Force input type to view
    if (config.view) {
      return config.view;
    }
    if (config.options) {
      return ListType;
    }
    switch (_typeof(value)) {
      case 'number':
        if (HasProperties(config, 'min', 'max')) {
          return RangeType;
        }
        return NumberType;
      case 'string':
        return StringType;
      case 'boolean':
        return BooleanType;

      // case 'object':
      //     if (HasProperties(value, 'r', 'g', 'b')) {
      //         return ColorType;
      //     }
      //     if (HasProperties(value, 'x', 'y', 'z')) {
      //         return Pointer3dType;
      //     }
      //     if (HasProperties(value, 'x', 'y')) {
      //         return Pointer2dType;
      //     }

      default:
        return StringType;
    }
  };
  var HasProperties = function HasProperties(object) {
    for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      keys[_key - 1] = arguments[_key];
    }
    for (var i = 0, cnt = keys.length; i < cnt; i++) {
      if (object[keys[i]] === undefined) {
        return false;
      }
    }
    return true;
  };

  var BindingTargetMethods = {
    setupBinding: function setupBinding() {
      var inputField = this.childrenMap.inputField;
      inputField
      // Set text value to object when closing editor
      .on('valuechange', function (value) {
        if (!this.bindingTarget) {
          return;
        }
        this.bindingTarget[this.bindTargetKey] = value;
      }, this);
      return this;
    },
    setBindingTarget: function setBindingTarget(target, key) {
      this.bindingTarget = target;
      if (key !== undefined) {
        this.setBindingTargetKey(key);
      }
      this.syncTargetValue();
      return this;
    },
    setBindingTargetKey: function setBindingTargetKey(key) {
      this.bindTargetKey = key;
      return this;
    },
    syncTargetValue: function syncTargetValue() {
      if (!this.bindingTarget || !this.bindTargetKey) {
        return this;
      }
      var inputField = this.childrenMap.inputField;
      inputField.setValue(this.bindingTarget[this.bindTargetKey]);
      return this;
    }
  };

  var MonitorTargetMethods = {
    startMonitorTarget: function startMonitorTarget() {
      if (this.isMonitoring) {
        return this;
      }
      this.isMonitoring = true;
      this.scene.events.on('postupdate', this.onMonitorTarget, this);
      return this;
    },
    stopMonitorTarget: function stopMonitorTarget() {
      if (!this.isMonitoring) {
        return this;
      }
      this.isMonitoring = false;
      this.scene.events.off('postupdate', this.onMonitorTarget, this);
      return this;
    },
    onMonitorTarget: function onMonitorTarget() {
      if (!this.bindingTarget) {
        return;
      }
      var newValue = this.bindingTarget[this.bindTargetKey];
      var inputField = this.childrenMap.inputField;
      if (inputField.value === newValue) {
        return;
      }
      // Sync new value
      inputField.setValue(newValue);
    }
  };

  var GetValue$A = Phaser.Utils.Objects.GetValue;
  var InputRow = /*#__PURE__*/function (_Sizer) {
    _inherits(InputRow, _Sizer);
    var _super = _createSuper(InputRow);
    function InputRow(scene, config) {
      var _this;
      _classCallCheck(this, InputRow);
      _this = _super.call(this, scene, config);
      _this.type = 'rexTweaker.InputRow';
      var inputTitle = config.inputTitle;
      var inputField = config.inputField;
      var background = config.background;
      var proportion = GetValue$A(config, 'proportion.title', 1);
      _this.add(inputTitle, {
        proportion: proportion,
        expand: true
      });
      var proportion = GetValue$A(config, 'proportion.inputField', 2);
      _this.add(inputField, {
        proportion: proportion,
        expand: true
      });
      if (background) {
        _this.addBackground(background);
      }
      _this.addChildrenMap('title', inputTitle);
      _this.addChildrenMap('inputField', inputField);
      _this.addChildrenMap('background', background);
      _this.setupBinding();
      return _this;
    }
    _createClass(InputRow, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }
        this.stopMonitorTarget();
        _get(_getPrototypeOf(InputRow.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "setTitle",
      value: function setTitle(config) {
        var title = this.childrenMap.title;
        title.setTitle(config);
        return this;
      }
    }]);
    return InputRow;
  }(Sizer);
  Object.assign(InputRow.prototype, BindingTargetMethods, MonitorTargetMethods);

  var InputFiledBase = /*#__PURE__*/function (_Sizer) {
    _inherits(InputFiledBase, _Sizer);
    var _super = _createSuper(InputFiledBase);
    function InputFiledBase() {
      _classCallCheck(this, InputFiledBase);
      return _super.apply(this, arguments);
    }
    _createClass(InputFiledBase, [{
      key: "value",
      get: function get() {
        return this._value;
      }

      // Override
      ,
      set: function set(value) {
        if (this._value === value) {
          return;
        }
        this._value = value;
        this.emit('valuechange', value);
      }
    }, {
      key: "getValue",
      value: function getValue() {
        return this.value;
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }

      // Override
    }, {
      key: "readOnly",
      get: function get() {
        return this._readOnly;
      }

      // Override
      ,
      set: function set(value) {
        this._readOnly = value;
      }
    }, {
      key: "setReadOnly",
      value: function setReadOnly(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.readOnly = enable;
        return true;
      }
    }, {
      key: "setTextFormatCallback",
      value: function setTextFormatCallback(callback) {
        this.textFormatCallback = callback;
        return this;
      }
    }]);
    return InputFiledBase;
  }(Sizer);

  // copy from Phaser.GameObjects.Text

  var Utils = Phaser.Renderer.WebGL.Utils;
  var WebGLRenderer$1 = function WebGLRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateTexture();
      src.dirty = false;
    }
    if (src.width === 0 || src.height === 0) {
      return;
    }
    camera.addToRenderList(src);
    var frame = src.frame;
    var width = frame.width;
    var height = frame.height;
    var getTint = Utils.getTintAppendFloatAlpha;
    var pipeline = renderer.pipelines.set(src.pipeline, src);
    var textureUnit = pipeline.setTexture2D(frame.glTexture, src);
    renderer.pipelines.preBatch(src);
    pipeline.batchTexture(src, frame.glTexture, width, height, src.x, src.y, width / src.resolution, height / src.resolution, src.scaleX, src.scaleY, src.rotation, src.flipX, src.flipY, src.scrollFactorX, src.scrollFactorY, src.displayOriginX, src.displayOriginY, 0, 0, width, height, getTint(src.tintTopLeft, camera.alpha * src._alphaTL), getTint(src.tintTopRight, camera.alpha * src._alphaTR), getTint(src.tintBottomLeft, camera.alpha * src._alphaBL), getTint(src.tintBottomRight, camera.alpha * src._alphaBR), src.tintFill, 0, 0, camera, parentMatrix, false, textureUnit);
    renderer.pipelines.postBatch(src);
  };

  // copy from Phaser.GameObjects.Text

  var CanvasRenderer$1 = function CanvasRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateTexture();
      src.dirty = false;
    }
    if (src.width === 0 || src.height === 0) {
      return;
    }
    camera.addToRenderList(src);
    renderer.batchSprite(src, src.frame, camera, parentMatrix);
  };

  var Render$1 = {
    renderWebGL: WebGLRenderer$1,
    renderCanvas: CanvasRenderer$1
  };

  var Color$4 = Phaser.Display.Color;
  var CanvasMethods = {
    clear: function clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.dirty = true;
      return this;
    },
    fill: function fill(color) {
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.dirty = true;
      return this;
    },
    loadFromURL: function loadFromURL(url, callback) {
      var self = this;
      var img = new Image();
      img.onload = function () {
        if (self.width !== img.width || self.height !== img.height) {
          self.resize(img.width, img.height);
        } else {
          self.clear();
        }
        self.context.drawImage(img, 0, 0);
        self.updateTexture();
        if (callback) {
          callback();
        }
        img.onload = null;
        img.src = '';
        img.remove();
      };
      img.src = url;
      return this;
    },
    loadFromURLPromise: function loadFromURLPromise(url) {
      var self = this;
      return new Promise(function (resolve, reject) {
        self.loadFromURL(url, resolve);
      });
    },
    drawFrame: function drawFrame(key, frame, x, y, width, height) {
      var textureFrame = this.scene.sys.textures.getFrame(key, frame);
      if (!textureFrame) {
        return this;
      }
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      if (width === undefined) {
        width = textureFrame.cutWidth;
      }
      if (height === undefined) {
        height = textureFrame.cutHeight;
      }
      this.context.drawImage(textureFrame.source.image, textureFrame.cutX, textureFrame.cutY, textureFrame.cutWidth, textureFrame.cutHeight, x, y, width, height);
      this.dirty = true;
      return this;
    },
    getDataURL: function getDataURL(type, encoderOptions) {
      return this.canvas.toDataURL(type, encoderOptions);
    },
    getPixel: function getPixel(x, y, out) {
      if (out === undefined) {
        out = new Color$4();
      }
      var rgb = this.context.getImageData(x, y, 1, 1);
      out.setTo(rgb.data[0], rgb.data[1], rgb.data[2], rgb.data[3]);
      return out;
    },
    setPixel: function setPixel(x, y, r, g, b, a) {
      if (typeof r !== 'number') {
        var color = r;
        r = color.red;
        g = color.green;
        b = color.blue;
        a = color.alpha;
      }
      if (a === undefined) {
        a = r !== 0 || g !== 0 || b !== 0 ? 255 : 0;
      }
      var imgData = this.context.createImageData(1, 1);
      imgData.data[0] = r;
      imgData.data[1] = g;
      imgData.data[2] = b;
      imgData.data[3] = a;
      this.context.putImageData(imgData, x, y);
      this.dirty = true;
      return this;
    }
  };

  var CopyCanvasToTexture = function CopyCanvasToTexture(scene, srcCanvas, key, x, y, width, height) {
    var textures = scene.sys.textures;
    var renderer = scene.renderer;
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = 0;
    }
    if (width === undefined) {
      width = srcCanvas.width;
    }
    if (height === undefined) {
      height = srcCanvas.height;
    }
    var texture;
    if (textures.exists(key)) {
      texture = textures.get(key);
    } else {
      texture = textures.createCanvas(key, width, height);
    }
    var destCanvas = texture.getSourceImage();
    if (destCanvas.width !== width) {
      destCanvas.width = width;
    }
    if (destCanvas.height !== height) {
      destCanvas.height = height;
    }
    var destCtx = destCanvas.getContext('2d');
    destCtx.clearRect(0, 0, width, height);
    destCtx.drawImage(srcCanvas, x, y, width, height);
    if (renderer.gl && texture) {
      renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
    }
  };

  var TextureMethods = {
    updateTexture: function updateTexture(callback, scope) {
      if (callback) {
        if (scope) {
          callback.call(scope, this.canvas, this.context);
        } else {
          callback(this.canvas, this.context);
        }
      }
      if (this.canvas.width !== this.frame.width || this.canvas.height !== this.frame.height) {
        this.frame.setSize(this.canvas.width, this.canvas.height);
      }
      if (this.renderer.gl) {
        this.frame.source.glTexture = this.renderer.canvasToTexture(this.canvas, this.frame.source.glTexture, true);
        this.frame.glTexture = this.frame.source.glTexture;
      }
      this.dirty = false;
      var input = this.input;
      if (input && !input.customHitArea) {
        input.hitArea.width = this.width;
        input.hitArea.height = this.height;
      }
      return this;
    },
    generateTexture: function generateTexture(key, x, y, width, height) {
      var srcCanvas = this.canvas;
      if (width === undefined) {
        width = srcCanvas.width;
      } else {
        width *= this.resolution;
      }
      if (height === undefined) {
        height = srcCanvas.height;
      } else {
        height *= this.resolution;
      }
      CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);
      return this;
    },
    loadTexture: function loadTexture(key, frame) {
      var textureFrame = this.scene.sys.textures.getFrame(key, frame);
      if (!textureFrame) {
        return this;
      }
      if (this.width !== textureFrame.cutWidth || this.height !== textureFrame.cutHeight) {
        this.setSize(textureFrame.cutWidth, textureFrame.cutHeight);
      } else {
        this.clear();
      }
      this.drawFrame(key, frame);
      this.dirty = true;
      return this;
    }
  };

  var CanvasPool = Phaser.Display.Canvas.CanvasPool;
  var GameObject$1 = Phaser.GameObjects.GameObject;
  var Canvas = /*#__PURE__*/function (_GameObject) {
    _inherits(Canvas, _GameObject);
    var _super = _createSuper(Canvas);
    function Canvas(scene, x, y, width, height) {
      var _this;
      _classCallCheck(this, Canvas);
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
      _this = _super.call(this, scene, 'rexCanvas');
      _this.renderer = scene.sys.game.renderer;
      _this.resolution = 1;
      _this._width = width;
      _this._height = height;
      width = Math.max(Math.ceil(width * _this.resolution), 1);
      height = Math.max(Math.ceil(height * _this.resolution), 1);
      _this.canvas = CanvasPool.create(_assertThisInitialized(_this), width, height);
      _this.context = _this.canvas.getContext('2d');
      _this.dirty = false;
      _this.setPosition(x, y);
      _this.setOrigin(0.5, 0.5);
      _this.initPipeline();
      _this._crop = _this.resetCropObject();

      //  Create a Texture for this Text object
      _this.texture = scene.sys.textures.addCanvas(null, _this.canvas, true);

      //  Get the frame
      _this.frame = _this.texture.get();

      //  Set the resolution
      _this.frame.source.resolution = _this.resolution;
      if (_this.renderer && _this.renderer.gl) {
        //  Clear the default 1x1 glTexture, as we override it later
        _this.renderer.deleteTexture(_this.frame.source.glTexture);
        _this.frame.source.glTexture = null;
      }
      _this.dirty = true;
      return _this;
    }
    _createClass(Canvas, [{
      key: "preDestroy",
      value: function preDestroy() {
        CanvasPool.remove(this.canvas);
        this.texture.destroy();
        this.canvas = null;
        this.context = null;
      }
    }, {
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
      key: "setCanvasSize",
      value: function setCanvasSize(width, height) {
        if (this._width === width && this._height === height) {
          return this;
        }
        this._width = width;
        this._height = height;
        this.updateDisplayOrigin();
        width = Math.max(Math.ceil(width * this.resolution), 1);
        height = Math.max(Math.ceil(height * this.resolution), 1);
        this.canvas.width = width;
        this.canvas.height = height;
        this.frame.setSize(width, height);
        this.dirty = true;
        return this;
      }

      // setSize might be override
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.setCanvasSize(width, height);
        return this;
      }
    }, {
      key: "displayWidth",
      get: function get() {
        return this.scaleX * this._width;
      },
      set: function set(value) {
        this.scaleX = value / this._width;
      }
    }, {
      key: "displayHeight",
      get: function get() {
        return this.scaleY * this._height;
      },
      set: function set(value) {
        this.scaleY = value / this._height;
      }
    }, {
      key: "setDisplaySize",
      value: function setDisplaySize(width, height) {
        this.displayWidth = width;
        this.displayHeight = height;
        return this;
      }
    }, {
      key: "getCanvas",
      value: function getCanvas(readOnly) {
        if (!readOnly) {
          this.dirty = true;
        }
        return this.canvas;
      }
    }, {
      key: "getContext",
      value: function getContext(readOnly) {
        if (!readOnly) {
          this.dirty = true;
        }
        return this.context;
      }
    }, {
      key: "needRedraw",
      value: function needRedraw() {
        this.dirty = true;
        return this;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        this.setSize(width, height);
        return this;
      }
    }]);
    return Canvas;
  }(GameObject$1);
  var Components = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Canvas, [Components.Alpha, Components.BlendMode, Components.Crop, Components.Depth, Components.Flip,
  // Components.FX,  // Open for 3.60
  Components.GetBounds, Components.Mask, Components.Origin, Components.Pipeline, Components.ScrollFactor, Components.Tint, Components.Transform, Components.Visible, Render$1, CanvasMethods, TextureMethods]);

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
      return key === undefined ? this.data : GetValue$19(this.data, key, defaultValue);
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
      this.setParent(parent);
      this.type = type;
      this.renderable = false;
      this.reset().setActive();
    }
    _createClass(Base, [{
      key: "destroy",
      value: function destroy() {
        this.parent.removeChild(this);
      }
    }, {
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent;
        return this;
      }
    }, {
      key: "scene",
      get: function get() {
        return this.parent.scene;
      }
    }, {
      key: "canvas",
      get: function get() {
        return this.parent ? this.parent.canvas : null;
      }
    }, {
      key: "context",
      get: function get() {
        return this.parent ? this.parent.context : null;
      }
    }, {
      key: "setDirty",
      value: function setDirty(dirty) {
        if (dirty && this.parent) {
          this.parent.dirty = true;
        }
        return this;
      }
    }, {
      key: "active",
      get: function get() {
        return this._active;
      },
      set: function set(value) {
        this.setDirty(this._active != value);
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
      key: "onFree",
      value: function onFree() {
        this.reset().setParent();
      }

      // Override
    }, {
      key: "reset",
      value: function reset() {
        return this;
      }

      // Override
    }, {
      key: "render",
      value: function render() {}

      // Override
    }, {
      key: "contains",
      value: function contains(x, y) {
        return false;
      }
    }]);
    return Base;
  }();
  Object.assign(Base.prototype, DataMethods);

  var RenderMethods = {
    // Override
    renderContent: function renderContent() {},
    // Override
    render: function render() {
      if (!this.willRender) {
        return this;
      }
      var context = this.context;
      context.save();
      context.globalAlpha = this.alpha;
      if (this.toLocalPosition) {
        var x = this.drawX,
          y = this.drawY;
        if (this.autoRound) {
          x = Math.round(x);
          y = Math.round(y);
        }
        context.translate(x, y);
        context.scale(this.scaleX, this.scaleY);
        context.rotate(this.rotation);
      }
      if (this.drawBelowCallback) {
        this.drawBelowCallback(this);
      }
      this.renderContent();
      if (this.drawAboveCallback) {
        this.drawAboveCallback(this);
      }
      context.restore();
      return this;
    }
  };

  var RotateAround$3 = Phaser.Math.RotateAround;
  var CanvasPositionToBobPosition = function CanvasPositionToBobPosition(canvasX, canvasY, bob, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      if (globPoint$1 === undefined) {
        globPoint$1 = {};
      }
      out = globPoint$1;
    }
    out.x = (canvasX - bob.drawX) / bob.scaleX;
    out.y = (canvasY - bob.drawY) / bob.scaleY;
    if (bob.rotation !== 0) {
      RotateAround$3(out, 0, 0, -bob.rotation);
    }
    return out;
  };
  var globPoint$1;

  var Rectangle = Phaser.Geom.Rectangle;
  var Contains = function Contains(canvasX, canvasY) {
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    var bobPosition = CanvasPositionToBobPosition(canvasX, canvasY, this, true);
    return GetBounds(this).contains(bobPosition.x, bobPosition.y);
  };
  var GetBounds = function GetBounds(bob) {
    if (globBounds === undefined) {
      globBounds = new Rectangle();
    }
    var x = bob.drawTLX,
      y = bob.drawTLY;
    globBounds.setTo(x, y, bob.drawTRX - x, bob.drawBLY - y);
    return globBounds;
  };
  var globBounds;

  var Methods$3 = {
    contains: Contains
  };
  Object.assign(Methods$3, RenderMethods);

  var DegToRad$2 = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;
  var GetValue$z = Phaser.Utils.Objects.GetValue;
  var RenderBase = /*#__PURE__*/function (_Base) {
    _inherits(RenderBase, _Base);
    var _super = _createSuper(RenderBase);
    function RenderBase(parent, type) {
      var _this;
      _classCallCheck(this, RenderBase);
      _this = _super.call(this, parent, type);
      _this.renderable = true;
      _this.toLocalPosition = true;
      _this.originX = 0;
      _this.offsetX = 0; // Override
      _this.offsetY = 0; // Override
      return _this;
    }
    _createClass(RenderBase, [{
      key: "visible",
      get: function get() {
        return this._visible;
      },
      set: function set(value) {
        this.setDirty(this._visible != value);
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
        this.setDirty(this._alpha != value);
        this._alpha = value;
      }
    }, {
      key: "setAlpha",
      value: function setAlpha(alpha) {
        this.alpha = alpha;
        return this;
      }
    }, {
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        this.setDirty(this._x != value);
        this._x = value;
      }
    }, {
      key: "setX",
      value: function setX(x) {
        this.x = x;
        return this;
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        this.setDirty(this._y != value);
        this._y = value;
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
      key: "setInitialPosition",
      value: function setInitialPosition(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
      }
    }, {
      key: "rotation",
      get: function get() {
        return this._rotation;
      },
      set: function set(value) {
        this.setDirty(this._rotation != value);
        this._rotation = value;
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
        return RadToDeg(this._rotation);
      },
      set: function set(value) {
        this.rotation = DegToRad$2(value);
      }
    }, {
      key: "setAngle",
      value: function setAngle(angle) {
        this.angle = angle;
        return this;
      }
    }, {
      key: "scaleX",
      get: function get() {
        return this._scaleX;
      },
      set: function set(value) {
        this.setDirty(this._scaleX !== value);
        this._scaleX = value;
      }
    }, {
      key: "setScaleX",
      value: function setScaleX(scaleX) {
        this.scaleX = scaleX;
        return this;
      }

      // Override
    }, {
      key: "width",
      get: function get() {
        return 0;
      }

      // Override
      ,
      set: function set(value) {}
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
      key: "leftSpace",
      get: function get() {
        return this._leftSpace;
      },
      set: function set(value) {
        this.setDirty(this._leftSpace !== value);
        this._leftSpace = value;
      }
    }, {
      key: "setLeftSpace",
      value: function setLeftSpace(value) {
        this.leftSpace = value;
        return this;
      }
    }, {
      key: "rightSpace",
      get: function get() {
        return this._rightSpace;
      },
      set: function set(value) {
        this.setDirty(this._rightSpace !== value);
        this._rightSpace = value;
      }
    }, {
      key: "setRightSpace",
      value: function setRightSpace(value) {
        this.rightSpace = value;
        return this;
      }
    }, {
      key: "outerWidth",
      get: function get() {
        return this.width + this.leftSpace + this.rightSpace;
      }
    }, {
      key: "scaleY",
      get: function get() {
        return this._scaleY;
      },
      set: function set(value) {
        this.setDirty(this._scaleY !== value);
        this._scaleY = value;
      }
    }, {
      key: "setScaleY",
      value: function setScaleY(scaleY) {
        this.scaleY = scaleY;
        return this;
      }

      // Override
    }, {
      key: "height",
      get: function get() {
        return 0;
      }

      // Override
      ,
      set: function set(value) {}
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
      key: "setOrigin",
      value: function setOrigin(x) {
        this.originX = x;
        return this;
      }
    }, {
      key: "setAlign",
      value: function setAlign(align) {
        this.align = align;
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
        var width = GetValue$z(o, 'width', undefined);
        var height = GetValue$z(o, 'height', undefined);
        var scaleX = GetValue$z(o, 'scaleX', undefined);
        var scaleY = GetValue$z(o, 'scaleY', undefined);
        if (width !== undefined) {
          if (height === undefined && scaleY === undefined) {
            this.setWidth(width, true);
          } else {
            this.setWidth(width);
          }
        } else if (scaleX !== undefined) {
          this.setScaleX(scaleX);
        }
        if (height !== undefined) {
          if (width === undefined && scaleX === undefined) {
            this.setHeight(height, true);
          } else {
            this.setHeight(height);
          }
        } else if (scaleY !== undefined) {
          this.setScaleY(scaleY);
        }
        if (o.hasOwnProperty('leftSpace')) {
          this.setLeftSpace(o.leftSpace);
        }
        if (o.hasOwnProperty('rightSpace')) {
          this.setRightSpace(o.rightSpace);
        }
        if (o.hasOwnProperty('align')) {
          this.setAlign(o.align);
        }
        return this;
      }
    }, {
      key: "setDrawBelowCallback",
      value: function setDrawBelowCallback(callback) {
        this.drawBelowCallback = callback;
        return this;
      }
    }, {
      key: "setDrawAboveCallback",
      value: function setDrawAboveCallback(callback) {
        this.drawAboveCallback = callback;
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.setVisible().setAlpha(1).setPosition(0, 0).setRotation(0).setScale(1, 1).setLeftSpace(0).setRightSpace(0).setOrigin(0).setAlign().setDrawBelowCallback().setDrawAboveCallback();
        return this;
      }

      // Override
    }, {
      key: "willRender",
      get: function get() {
        return this.visible && this.alpha > 0;
      }
    }, {
      key: "drawX",
      get: function get() {
        return this.x + this.leftSpace + this.offsetX - this.originX * this.width;
      }
    }, {
      key: "drawY",
      get: function get() {
        return this.y + this.offsetY;
      }

      // Override
    }, {
      key: "drawTLX",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawTLY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBLX",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBLY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawTRX",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawTRY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBRX",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBRY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawCenterX",
      get: function get() {
        return (this.drawTRX + this.drawTLX) / 2;
      }
    }, {
      key: "drawCenterY",
      get: function get() {
        return (this.drawBLY + this.drawTLY) / 2;
      }
    }]);
    return RenderBase;
  }(Base);
  Object.assign(RenderBase.prototype, Methods$3);

  var Pad$1 = Phaser.Utils.String.Pad;
  var GetStyle = function GetStyle(style, canvas, context) {
    if (style == null) {
      return style;
    }
    switch (_typeof(style)) {
      case 'string':
        return style;
      case 'number':
        return "#".concat(Pad$1(Math.floor(style).toString(16), 6, '0', 1));
      case 'function':
        return style(canvas, context);
      case 'object':
        if (style.hasOwnProperty('r')) {
          if (style.hasOwnProperty('a')) {
            // rgba
            return "rgba(".concat(style.r, ",").concat(style.g, ",").concat(style.b, ",").concat(style.a, ")");
          } else {
            // rgb
            return "rgb(".concat(style.r, ",").concat(style.g, ",").concat(style.b, ")");
          }
        } else if (style.hasOwnProperty('h')) {
          if (style.hasOwnProperty('a')) {
            // hsla
            return "hsla(".concat(style.h, ",").concat(style.s, ",").concat(style.l, ",").concat(style.a, ")");
          } else {
            // hsl
            return "hsl(".concat(style.h, ",").concat(style.s, ",").concat(style.l, ")");
          }
        } else {
          return style; // Not a valid input
        }

      default:
        return style;
    }
  };

  var GetProperty = function GetProperty(name, config, defaultConfig) {
    if (config.hasOwnProperty(name)) {
      return config[name];
    } else {
      return defaultConfig[name];
    }
  };

  var DegToRad$1 = Phaser.Math.DegToRad;
  var Rad0 = DegToRad$1(0);
  var Rad90 = DegToRad$1(90);
  var Rad180 = DegToRad$1(180);
  var Rad270 = DegToRad$1(270);
  var AddRoundRectanglePath = function AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration) {
    var geom = new RoundRectangle$3(x, y, width, height, radiusConfig),
      minWidth = geom.minWidth,
      minHeight = geom.minHeight,
      scaleRX = width >= minWidth ? 1 : width / minWidth,
      scaleRY = height >= minHeight ? 1 : height / minHeight;
    var cornerRadius = geom.cornerRadius;
    var radius, radiusX, radiusY, centerX, centerY;
    context.save();
    context.beginPath();
    context.translate(x, y);

    // Bottom-right
    radius = cornerRadius.br;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = width - radiusX;
    centerY = height - radiusY;
    context.moveTo(width, centerY);
    if (radiusX > 0 && radiusY > 0) {
      ArcTo(context, centerX, centerY, radiusX, radiusY, Rad0, Rad90, iteration);
    } else {
      context.lineTo(width, height);
      context.lineTo(centerX, height);
    }

    // Bottom-left
    radius = cornerRadius.bl;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = radiusX;
    centerY = height - radiusY;
    context.lineTo(radiusX, height);
    if (radiusX > 0 && radiusY > 0) {
      ArcTo(context, centerX, centerY, radiusX, radiusY, Rad90, Rad180, iteration);
    } else {
      context.lineTo(0, height);
      context.lineTo(0, centerY);
    }

    // Top-left
    radius = cornerRadius.tl;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = radiusX;
    centerY = radiusY;
    context.lineTo(0, centerY);
    if (radiusX > 0 && radiusY > 0) {
      ArcTo(context, centerX, centerY, radiusX, radiusY, Rad180, Rad270, iteration);
    } else {
      context.lineTo(0, 0);
      context.lineTo(centerX, 0);
    }

    // Top-right
    radius = cornerRadius.tr;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = width - radiusX;
    centerY = radiusY;
    context.lineTo(centerX, 0);
    if (radiusX > 0 && radiusY > 0) {
      ArcTo(context, centerX, centerY, radiusX, radiusY, Rad270, Rad0, iteration);
    } else {
      context.lineTo(width, 0);
      context.lineTo(width, centerY);
    }
    context.closePath();
    context.restore();
  };
  var ArcTo = function ArcTo(context, centerX, centerY, radiusX, radiusY, startAngle, endAngle, iteration) {
    if (iteration == null) {
      // undefined, or null
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle);
    } else {
      iteration += 1;
      var x, y, angle;
      var step = (endAngle - startAngle) / iteration;
      for (var i = 0; i <= iteration; i++) {
        angle = startAngle + step * i;
        x = centerX + radiusX * Math.cos(angle);
        y = centerY + radiusY * Math.sin(angle);
        context.lineTo(x, y);
      }
    }
  };

  var DrawRoundRectangle = function DrawRoundRectangle(canvas, context, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient, iteration) {
    AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration);
    if (fillStyle != null) {
      if (fillColor2 != null) {
        var grd;
        if (isHorizontalGradient) {
          grd = context.createLinearGradient(0, 0, width, 0);
        } else {
          grd = context.createLinearGradient(0, 0, 0, height);
        }
        grd.addColorStop(0, fillStyle);
        grd.addColorStop(1, fillColor2);
        fillStyle = grd;
      }
      context.fillStyle = fillStyle;
      context.fill();
    }
    if (strokeStyle != null && lineWidth > 0) {
      context.strokeStyle = strokeStyle;
      context.lineWidth = lineWidth;
      context.stroke();
    }
  };

  var DrawRoundRectangleBackground = function DrawRoundRectangleBackground(canvasObject, color, strokeColor, strokeLineWidth, radius, color2, isHorizontalGradient, iteration) {
    if (color == null && strokeColor == null) {
      return;
    }
    var width = canvasObject.canvas.width,
      height = canvasObject.canvas.height;
    if (strokeColor == null) {
      strokeLineWidth = 0;
    }
    var x = strokeLineWidth / 2;
    width -= strokeLineWidth;
    height -= strokeLineWidth;
    DrawRoundRectangle(canvasObject.canvas, canvasObject.context, x, x, width, height, radius, color, strokeColor, strokeLineWidth, color2, isHorizontalGradient, iteration);
  };

  var GetValue$y = Phaser.Utils.Objects.GetValue;
  var Background = /*#__PURE__*/function (_RenderBase) {
    _inherits(Background, _RenderBase);
    var _super = _createSuper(Background);
    function Background(parent, config) {
      var _this;
      _classCallCheck(this, Background);
      _this = _super.call(this, parent, 'background');
      _this.setColor(GetValue$y(config, 'color', null), GetValue$y(config, 'color2', null), GetValue$y(config, 'horizontalGradient', true));
      _this.setStroke(GetValue$y(config, 'stroke', null), GetValue$y(config, 'strokeThickness', 2));
      _this.setCornerRadius(GetValue$y(config, 'cornerRadius', 0), GetValue$y(config, 'cornerIteration', null));
      return _this;
    }
    _createClass(Background, [{
      key: "color",
      get: function get() {
        return this._color;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color != value);
        this._color = value;
      }
    }, {
      key: "color2",
      get: function get() {
        return this._color2;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color2 != value);
        this._color2 = value;
      }
    }, {
      key: "horizontalGradient",
      get: function get() {
        return this._horizontalGradient;
      },
      set: function set(value) {
        this.setDirty(this._horizontalGradient != value);
        this._horizontalGradient = value;
      }
    }, {
      key: "setColor",
      value: function setColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
          isHorizontalGradient = true;
        }
        this.color = color;
        this.color2 = color2;
        this.horizontalGradient = isHorizontalGradient;
        return this;
      }
    }, {
      key: "stroke",
      get: function get() {
        return this._stroke;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._stroke != value);
        this._stroke = value;
      }
    }, {
      key: "strokeThickness",
      get: function get() {
        return this._strokeThickness;
      },
      set: function set(value) {
        this.setDirty(this._strokeThickness != value);
        this._strokeThickness = value;
      }
    }, {
      key: "setStroke",
      value: function setStroke(color, lineWidth) {
        if (color != null) {
          if (lineWidth === undefined) {
            lineWidth = 2;
          }
        }
        this.stroke = color;
        this.strokeThickness = lineWidth;
        return this;
      }
    }, {
      key: "cornerRadius",
      get: function get() {
        return this._cornerRadius;
      },
      set: function set(value) {
        this.setDirty(this._cornerRadius != value);
        this._cornerRadius = value;
      }
    }, {
      key: "cornerIteration",
      get: function get() {
        return this._cornerIteration;
      },
      set: function set(value) {
        this.setDirty(this._cornerIteration != value);
        this._cornerIteration = value;
      }
    }, {
      key: "modifyStyle",
      value: function modifyStyle(o) {
        if (o.hasOwnProperty('color')) {
          this.setColor(o.color, GetProperty('color2', o, this), GetProperty('horizontalGradient', o, this));
        }
        if (o.hasOwnProperty('stroke')) {
          this.setStroke(o.stroke, GetProperty('strokeThickness', o, this));
        }
        if (o.hasOwnProperty('cornerRadius')) {
          this.setCornerRadius(o.cornerRadius, GetProperty('cornerIteration', o, this));
        }
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        _get(_getPrototypeOf(Background.prototype), "modifyPorperties", this).call(this, o);
        this.modifyStyle(o);
        return this;
      }
    }, {
      key: "setCornerRadius",
      value: function setCornerRadius(radius, iteration) {
        this.cornerRadius = radius;
        this.cornerIteration = iteration;
        return this;
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        DrawRoundRectangleBackground(this.parent, this.color, this.stroke, this.strokeThickness, this.cornerRadius, this.color2, this.horizontalGradient, this.cornerIteration);
      }
    }]);
    return Background;
  }(RenderBase);

  var GetValue$x = Phaser.Utils.Objects.GetValue;
  var InnerBounds = /*#__PURE__*/function (_RenderBase) {
    _inherits(InnerBounds, _RenderBase);
    var _super = _createSuper(InnerBounds);
    function InnerBounds(parent, config) {
      var _this;
      _classCallCheck(this, InnerBounds);
      _this = _super.call(this, parent, 'innerbounds');
      _this.setColor(GetValue$x(config, 'color', null), GetValue$x(config, 'color2', null), GetValue$x(config, 'horizontalGradient', true));
      _this.setStroke(GetValue$x(config, 'stroke', null), GetValue$x(config, 'strokeThickness', 2));
      return _this;
    }
    _createClass(InnerBounds, [{
      key: "color",
      get: function get() {
        return this._color;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color != value);
        this._color = value;
      }
    }, {
      key: "color2",
      get: function get() {
        return this._color2;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._color2 != value);
        this._color2 = value;
      }
    }, {
      key: "horizontalGradient",
      get: function get() {
        return this._horizontalGradient;
      },
      set: function set(value) {
        this.setDirty(this._horizontalGradient != value);
        this._horizontalGradient = value;
      }
    }, {
      key: "setColor",
      value: function setColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
          isHorizontalGradient = true;
        }
        this.color = color;
        this.color2 = color2;
        this.horizontalGradient = isHorizontalGradient;
        return this;
      }
    }, {
      key: "stroke",
      get: function get() {
        return this._stroke;
      },
      set: function set(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.setDirty(this._stroke != value);
        this._stroke = value;
      }
    }, {
      key: "strokeThickness",
      get: function get() {
        return this._strokeThickness;
      },
      set: function set(value) {
        this.setDirty(this._strokeThickness != value);
        this._strokeThickness = value;
      }
    }, {
      key: "setStroke",
      value: function setStroke(color, lineWidth) {
        if (color != null) {
          if (lineWidth === undefined) {
            lineWidth = 2;
          }
        }
        this.stroke = color;
        this.strokeThickness = lineWidth;
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        _get(_getPrototypeOf(InnerBounds.prototype), "modifyPorperties", this).call(this, o);
        if (o.hasOwnProperty('color')) {
          this.setColor(o.color, GetValue$x(o, 'color2', null), GetValue$x(o, 'horizontalGradient', true));
        }
        if (o.hasOwnProperty('stroke')) {
          this.setStroke(o.stroke, GetValue$x(o, 'strokeThickness', 2));
        }
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        var padding = this.parent.padding;
        var x = padding.left,
          y = padding.top,
          width = this.parent.width - padding.left - padding.right,
          height = this.parent.height - padding.top - padding.bottom;
        var context = this.context;
        if (this.color != null) {
          var fillStyle;
          if (this.color2 != null) {
            var grd;
            if (this.horizontalGradient) {
              grd = context.createLinearGradient(0, 0, width, 0);
            } else {
              grd = context.createLinearGradient(0, 0, 0, height);
            }
            grd.addColorStop(0, this.color);
            grd.addColorStop(1, this.color2);
            fillStyle = grd;
          } else {
            fillStyle = this.color;
          }
          context.fillStyle = fillStyle;
          context.fillRect(x, y, width, height);
        }
        if (this.stroke != null && this.strokeThickness > 0) {
          context.strokeStyle = this.stroke;
          context.lineWidth = this.strokeThickness;
          context.strokeRect(x, y, width, height);
        }
      }
    }]);
    return InnerBounds;
  }(RenderBase);

  var GetValue$w = Phaser.Utils.Objects.GetValue;
  var TextStyle = /*#__PURE__*/function () {
    function TextStyle(parent, config) {
      _classCallCheck(this, TextStyle);
      this.parent = parent;
      this.set(config);
    }
    _createClass(TextStyle, [{
      key: "toJSON",
      value: function toJSON() {
        return {
          bold: this.bold,
          italic: this.italic,
          fontSize: this.fontSize,
          fontFamily: this.fontFamily,
          color: this.color,
          stroke: this.stroke,
          strokeThickness: this.strokeThickness,
          shaodwColor: this.shadowColor,
          shadowBlur: this.shadowBlur,
          shadowOffsetX: this.shadowOffsetX,
          shadowOffsetY: this.shadowOffsetY,
          offsetX: this.offsetX,
          offsetY: this.offsetY,
          leftSpace: this.leftSpace,
          rightSpace: this.rightSpace,
          backgroundHeight: this.backgroundHeight,
          backgroundBottomY: this.backgroundBottomY,
          align: this.align
        };
      }
    }, {
      key: "set",
      value: function set(o) {
        this.setBold(GetValue$w(o, 'bold', false));
        this.setItalic(GetValue$w(o, 'italic', false));
        this.setFontSize(GetValue$w(o, 'fontSize', '16px'));
        this.setFontFamily(GetValue$w(o, 'fontFamily', 'Courier'));
        this.setColor(GetValue$w(o, 'color', '#fff'));
        this.setStrokeStyle(GetValue$w(o, 'stroke', null), GetValue$w(o, 'strokeThickness', 0));
        this.setShadow(GetValue$w(o, 'shadowColor', null), GetValue$w(o, 'shadowOffsetX', 0), GetValue$w(o, 'shadowOffsetY', 0), GetValue$w(o, 'shadowBlur', 0));
        this.setOffset(GetValue$w(o, 'offsetX', 0), GetValue$w(o, 'offsetY', 0));
        this.setSpace(GetValue$w(o, 'leftSpace', 0), GetValue$w(o, 'rightSpace', 0));
        this.setAlign(GetValue$w(o, 'align', undefined));
        this.setBackgroundColor(GetValue$w(o, 'backgroundColor', null));
        this.setBackgroundHeight(GetValue$w(o, 'backgroundHeight', undefined));
        this.setBackgroundBottomY(GetValue$w(o, 'backgroundBottomY', undefined));
        return this;
      }
    }, {
      key: "modify",
      value: function modify(o) {
        if (o.hasOwnProperty('bold')) {
          this.setBold(o.bold);
        }
        if (o.hasOwnProperty('italic')) {
          this.setItalic(o.italic);
        }
        if (o.hasOwnProperty('fontSize')) {
          this.setFontSize(o.fontSize);
        }
        if (o.hasOwnProperty('fontFamily')) {
          this.setFontFamily(o.fontFamily);
        }
        if (o.hasOwnProperty('color')) {
          this.setColor(o.color);
        }
        if (o.hasOwnProperty('stroke') || o.hasOwnProperty('strokeThickness')) {
          this.setStrokeStyle(GetProperty('stroke', o, this), GetProperty('strokeThickness', o, this));
        }
        if (o.hasOwnProperty('shadowColor')) {
          this.setShadowColor(o.shadowColor);
        }
        if (o.hasOwnProperty('shadowOffsetX') || o.hasOwnProperty('shadowOffsetY')) {
          this.setShadowOffset(GetProperty('shadowOffsetX', o, this), GetProperty('shadowOffsetY', o, this));
        }
        if (o.hasOwnProperty('shadowBlur')) {
          this.setShadowBlur(o.shaodwBlur);
        }
        if (o.hasOwnProperty('offsetX')) {
          this.setOffsetX(o.offsetX);
        }
        if (o.hasOwnProperty('offsetY')) {
          this.setOffsetY(o.offsetY);
        }
        if (o.hasOwnProperty('leftSpace')) {
          this.setLeftSpace(o.leftSpace);
        }
        if (o.hasOwnProperty('rightSpace')) {
          this.setRightSpace(o.rightSpace);
        }
        if (o.hasOwnProperty('align')) {
          this.setAlign(o.align);
        }
        if (o.hasOwnProperty('backgroundColor')) {
          this.setBackgroundColor(o.backgroundColor);
        }
        if (o.hasOwnProperty('backgroundHeight')) {
          this.setBackgroundHeight(o.backgroundHeight);
        }
        if (o.hasOwnProperty('backgroundBottomY')) {
          this.setBackgroundBottomY(o.backgroundBottomY);
        }
        return this;
      }
    }, {
      key: "setUpdateTextFlag",
      value: function setUpdateTextFlag() {
        if (this.parent) {
          this.parent.updateTextFlag = true;
        }
        return this;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new TextStyle(null, this.toJSON());
      }
    }, {
      key: "copyFrom",
      value: function copyFrom(sourceTextStyle) {
        this.set(sourceTextStyle.toJSON());
        return this;
      }
    }, {
      key: "copyTo",
      value: function copyTo(targetTextStyle) {
        targetTextStyle.set(this.toJSON());
        return this;
      }
    }, {
      key: "setBold",
      value: function setBold(value) {
        if (value === undefined) {
          value = true;
        }
        this.bold = value;
        this.setUpdateTextFlag();
        return this;
      }
    }, {
      key: "setItalic",
      value: function setItalic(value) {
        if (value === undefined) {
          value = true;
        }
        this.italic = value;
        this.setUpdateTextFlag();
        return this;
      }
    }, {
      key: "fontStyle",
      get: function get() {
        if (this.bold && this.italic) {
          return 'bold italic';
        } else if (this.bold) {
          return 'bold';
        } else if (this.italic) {
          return 'italic';
        } else {
          return '';
        }
      }
    }, {
      key: "setFontSize",
      value: function setFontSize(fontSize) {
        if (typeof fontSize === 'number') {
          fontSize = "".concat(fontSize, "px");
        }
        this.fontSize = fontSize;
        this.setUpdateTextFlag();
        return this;
      }
    }, {
      key: "setFontFamily",
      value: function setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        this.setUpdateTextFlag();
        return this;
      }
    }, {
      key: "font",
      get: function get() {
        return "".concat(this.fontStyle, " ").concat(this.fontSize, " ").concat(this.fontFamily);
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        this.color = GetStyle(color);
        return this;
      }
    }, {
      key: "hasFill",
      get: function get() {
        return this.color != null;
      }
    }, {
      key: "setStrokeStyle",
      value: function setStrokeStyle(stroke, strokeThickness) {
        this.stroke = GetStyle(stroke);
        if (strokeThickness !== undefined) {
          this.strokeThickness = strokeThickness;
        }
        return this;
      }
    }, {
      key: "setStrokeThickness",
      value: function setStrokeThickness(strokeThickness) {
        this.strokeThickness = strokeThickness;
        return this;
      }
    }, {
      key: "hasStroke",
      get: function get() {
        return this.stroke != null && this.strokeThickness > 0;
      }
    }, {
      key: "setShadowColor",
      value: function setShadowColor(color) {
        this.shadowColor = GetStyle(color);
        return this;
      }
    }, {
      key: "setShadowOffset",
      value: function setShadowOffset(offsetX, offsetY) {
        if (offsetX === undefined) {
          offsetX = 0;
        }
        if (offsetY === undefined) {
          offsetY = 0;
        }
        this.shadowOffsetX = offsetX;
        this.shadowOffsetY = offsetY;
        return this;
      }
    }, {
      key: "setShadowBlur",
      value: function setShadowBlur(blur) {
        if (blur === undefined) {
          blur = 0;
        }
        this.shaodwBlur = blur;
        return this;
      }
    }, {
      key: "setShadow",
      value: function setShadow(color, offsetX, offsetY, blur) {
        this.setShadowColor(color).setShadowOffset(offsetX, offsetY).setShadowBlur(blur);
        return this;
      }
    }, {
      key: "setBackgroundColor",
      value: function setBackgroundColor(color) {
        this.backgroundColor = GetStyle(color);
        return this;
      }
    }, {
      key: "hasBackgroundColor",
      get: function get() {
        return this.backgroundColor != null;
      }
    }, {
      key: "setBackgroundHeight",
      value: function setBackgroundHeight(height) {
        this.backgroundHeight = height;
        return this;
      }
    }, {
      key: "setBackgroundBottomY",
      value: function setBackgroundBottomY(y) {
        this.backgroundBottomY = y;
        return this;
      }
    }, {
      key: "setOffsetX",
      value: function setOffsetX(offsetX) {
        if (offsetX === undefined) {
          offsetX = 0;
        }
        this.offsetX = offsetX;
        return this;
      }
    }, {
      key: "setOffsetY",
      value: function setOffsetY(offsetY) {
        if (offsetY === undefined) {
          offsetY = 0;
        }
        this.offsetY = offsetY;
        return this;
      }
    }, {
      key: "setOffset",
      value: function setOffset(offsetX, offsetY) {
        this.setOffsetX(offsetX).setOffsetY(offsetY);
        return this;
      }
    }, {
      key: "setLeftSpace",
      value: function setLeftSpace(space) {
        if (space === undefined) {
          space = 0;
        }
        this.leftSpace = space;
        return this;
      }
    }, {
      key: "setRightSpace",
      value: function setRightSpace(space) {
        if (space === undefined) {
          space = 0;
        }
        this.rightSpace = space;
        return this;
      }
    }, {
      key: "setSpace",
      value: function setSpace(leftSpace, rightSpace) {
        this.setLeftSpace(leftSpace).setRightSpace(rightSpace);
        return this;
      }
    }, {
      key: "setAlign",
      value: function setAlign(align) {
        this.align = align;
        return this;
      }
    }, {
      key: "syncFont",
      value: function syncFont(context) {
        context.font = this.font;
        return this;
      }
    }, {
      key: "syncStyle",
      value: function syncStyle(context) {
        context.textBaseline = 'alphabetic';
        var hasFill = this.hasFill;
        var hasStroke = this.hasStroke;
        context.fillStyle = hasFill ? this.color : '#000';
        context.strokeStyle = hasStroke ? this.stroke : '#000';
        context.lineWidth = hasStroke ? this.strokeThickness : 0;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        return this;
      }
    }, {
      key: "syncShadow",
      value: function syncShadow(context) {
        if (context.shadowColor != null) {
          context.shadowColor = this.shadowColor;
          context.shadowOffsetX = this.shadowOffsetX;
          context.shadowOffsetY = this.shadowOffsetY;
          context.shadowBlur = this.shadowBlur;
        } else {
          context.shadowColor = 0;
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.shadowBlur = 0;
        }
      }
    }, {
      key: "getTextMetrics",
      value: function getTextMetrics(context, text) {
        this.syncFont(context).syncStyle(context);
        return context.measureText(text);
      }
    }]);
    return TextStyle;
  }();

  var SetFixedSize = function SetFixedSize(width, height) {
    if (width === undefined) {
      width = 0;
    }
    if (height === undefined) {
      height = 0;
    }
    var dirty = this.fixedWidth !== width || this.fixedHeight !== height;
    if (!dirty) {
      return this;
    }
    this.fixedWidth = width;
    this.fixedHeight = height;
    this.dirty = true;
    this.setCanvasSize(width > 0 ? width : this.width, height > 0 ? height : this.height);
    return this;
  };

  var SetPadding = function SetPadding(key, value) {
    var padding = this.padding;
    var paddingLeft = padding.left,
      paddingRight = padding.right,
      paddingTop = padding.top,
      paddingBottom = padding.bottom;
    SetPadding$1(padding, key, value);
    this.dirty = this.dirty || paddingLeft != padding.left || paddingRight != padding.right || paddingTop != padding.top || paddingBottom != padding.bottom;
    return this;
  };

  var GetPadding = function GetPadding(key) {
    return GetPadding$1(this.padding, key);
  };

  var ModifyTextStyle = function ModifyTextStyle(style) {
    this.textStyle.modify(style);
    return this;
  };

  var ModifyDefaultTextStyle = function ModifyDefaultTextStyle(style) {
    this.defaultTextStyle.modify(style);
    return this;
  };

  var ResetTextStyle = function ResetTextStyle() {
    this.textStyle.copyFrom(this.defaultTextStyle);
    return this;
  };

  var SetTestString = function SetTestString(testString) {
    this.testString = testString;
    return this;
  };

  var RemoveItem$3 = Phaser.Utils.Array.Remove;
  var RemoveChild = function RemoveChild(child) {
    this.poolManager.free(child);
    RemoveItem$3(this.children, child);
    this.lastAppendedChildren.length = 0;
    this.lastOverChild = null;
    this.dirty = true;
    return this;
  };

  var RemoveChildren = function RemoveChildren() {
    this.poolManager.freeMultiple(this.children);
    this.children.length = 0;
    this.lastAppendedChildren.length = 0;
    this.lastOverChild = null;
    this.dirty = true;
    return this;
  };

  var RemoveItem$2 = Phaser.Utils.Array.Remove;
  var PopChild = function PopChild(child) {
    RemoveItem$2(this.children, child);
    this.lastAppendedChildren.length = 0;
    this.lastOverChild = null;
    this.dirty = true;
    return this;
  };

  var ClearContent = function ClearContent() {
    this.setText();
    return this;
  };

  // const RemoveItem = Phaser.Utils.Array.Remove;

  var AddChild = function AddChild(child, index) {
    var areChildren = Array.isArray(child);

    // Remove existed child(s)
    // RemoveItem(this.children, child);

    if (index === undefined || index === this.children.length) {
      if (areChildren) {
        var _this$children;
        (_this$children = this.children).push.apply(_this$children, _toConsumableArray(child));
      } else {
        this.children.push(child);
      }
    } else {
      if (areChildren) {
        var _this$children2;
        (_this$children2 = this.children).splice.apply(_this$children2, [index, 0].concat(_toConsumableArray(child)));
      } else {
        this.children.splice(index, 0, child);
      }
    }
    this.lastAppendedChildren.length = 0;
    if (areChildren) {
      var _this$lastAppendedChi;
      (_this$lastAppendedChi = this.lastAppendedChildren).push.apply(_this$lastAppendedChi, _toConsumableArray(child));
    } else {
      this.lastAppendedChildren.push(child);
    }
    return this;
  };

  var CharTypeName = 'text';
  var ImageTypeName = 'image';
  var DrawerTypeName = 'drawer';
  var SpaceTypeName = 'space';
  var CmdTypeName = 'command';
  var IsNewLineChar = function IsNewLineChar(bob) {
    return bob.type === CharTypeName && bob.text === '\n';
  };
  var IsChar = function IsChar(bob) {
    return bob.type === CharTypeName;
  };

  var CharData = /*#__PURE__*/function (_RenderBase) {
    _inherits(CharData, _RenderBase);
    var _super = _createSuper(CharData);
    function CharData(parent, text, style) {
      var _this;
      _classCallCheck(this, CharData);
      _this = _super.call(this, parent, CharTypeName);
      _this.updateTextFlag = false;
      _this.style = new TextStyle(_assertThisInitialized(_this), style);
      _this.setText(text);
      return _this;
    }
    _createClass(CharData, [{
      key: "autoRound",
      get: function get() {
        return this.parent.autoRound;
      }
    }, {
      key: "offsetX",
      get: function get() {
        return this.style.offsetX;
      },
      set: function set(value) {
        if (this.style) {
          this.style.offsetX = value;
        }
      }
    }, {
      key: "offsetY",
      get: function get() {
        return this.style.offsetY;
      },
      set: function set(value) {
        if (this.style) {
          this.style.offsetY = value;
        }
      }
    }, {
      key: "leftSpace",
      get: function get() {
        return this.style.leftSpace * this.scaleX;
      },
      set: function set(value) {
        if (this.style) {
          this.style.leftSpace = value;
        }
        _set(_getPrototypeOf(CharData.prototype), "leftSpace", value, this, true);
      }
    }, {
      key: "rightSpace",
      get: function get() {
        return this.style.rightSpace * this.scaleX;
      },
      set: function set(value) {
        if (this.style) {
          this.style.rightSpace = value;
        }
        _set(_getPrototypeOf(CharData.prototype), "rightSpace", value, this, true);
      }
    }, {
      key: "align",
      get: function get() {
        return this.style.align;
      },
      set: function set(value) {
        if (this.style) {
          this.style.align = value;
        }
      }
    }, {
      key: "modifyStyle",
      value: function modifyStyle(style) {
        this.setDirty(true);
        this.style.modify(style);
        if (this.updateTextFlag) {
          this.updateTextSize();
        }
        return this;
      }
    }, {
      key: "modifyPorperties",
      value: function modifyPorperties(o) {
        if (!o) {
          return this;
        }
        this.modifyStyle(o);
        _get(_getPrototypeOf(CharData.prototype), "modifyPorperties", this).call(this, o);
        return this;
      }
    }, {
      key: "setText",
      value: function setText(text) {
        this.setDirty(this.text != text);
        this.text = text;
        this.updateTextSize();
        return this;
      }
    }, {
      key: "updateTextSize",
      value: function updateTextSize() {
        if (this.text === '\n' || this.text === '') {
          this.textWidth = 0;
          this.textHeight = 0;
          this.ascent = 0;
          this.descent = 0;
        } else {
          var metrics = this.style.getTextMetrics(this.context, this.text);
          this.textWidth = metrics.width;
          var ascent, descent;
          if ('actualBoundingBoxAscent' in metrics) {
            ascent = metrics.actualBoundingBoxAscent;
            descent = metrics.actualBoundingBoxDescent;
          } else {
            ascent = 0;
            descent = 0;
          }
          this.textHeight = ascent + descent;
          this.ascent = ascent;
          this.descent = descent;
        }
        this.updateTextFlag = false;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this.textWidth * this.scaleX;
      },
      set: function set(value) {
        if (this.textWidth > 0) {
          this.scaleX = value / this.textWidth;
        } else {
          this.scaleX = 1;
        }
      }
    }, {
      key: "height",
      get: function get() {
        return this.textHeight * this.scaleY;
      },
      set: function set(value) {
        if (this.textHeight > 0) {
          this.scaleY = value / this.textHeight;
        } else {
          this.scaleY = 1;
        }
      }
    }, {
      key: "willRender",
      get: function get() {
        if (this.text === '\n') {
          return false;
        }
        return _get(_getPrototypeOf(CharData.prototype), "willRender", this);
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        var context = this.context;
        var textStyle = this.style;
        if (textStyle.hasBackgroundColor) {
          context.fillStyle = textStyle.backgroundColor;
          var x = this.drawTLX;
          var width = this.drawTRX - x;
          var bottomY = textStyle.backgroundBottomY;
          if (bottomY == null) {
            bottomY = this.drawBLY;
          }
          var height = textStyle.backgroundHeight;
          if (height == null) {
            height = bottomY - this.drawTLY;
          }
          var y = bottomY - height;
          context.fillRect(x, y, width, height);
        }
        var hasFill = textStyle.hasFill,
          hasStroke = textStyle.hasStroke;
        if (!hasFill && !hasStroke) {
          return;
        }
        textStyle.syncFont(context).syncStyle(context);
        // textBaseline = 'alphabetic'

        if (hasStroke) {
          textStyle.syncShadow(context);
          context.strokeText(this.text, 0, 0);
        }
        if (hasFill) {
          textStyle.syncShadow(context);
          context.fillText(this.text, 0, 0);
        }
      }
    }, {
      key: "drawTLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawTLY",
      get: function get() {
        return -this.ascent;
      }
    }, {
      key: "drawBLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawBLY",
      get: function get() {
        return this.descent;
      }
    }, {
      key: "drawTRX",
      get: function get() {
        return this.textWidth + this.rightSpace;
      }
    }, {
      key: "drawTRY",
      get: function get() {
        return -this.ascent;
      }
    }, {
      key: "drawBRX",
      get: function get() {
        return this.textWidth + this.rightSpace;
      }
    }, {
      key: "drawBRY",
      get: function get() {
        return this.descent;
      }
    }]);
    return CharData;
  }(RenderBase);

  var CreateCharChild = function CreateCharChild(text, style) {
    if (style) {
      this.textStyle.modify(style);
    }
    var child = this.poolManager.allocate(CharTypeName);
    if (child === null) {
      child = new CharData(this,
      // parent
      text,
      // text
      this.textStyle);
    } else {
      child.setParent(this).setActive().modifyStyle(this.textStyle).setText(text);
    }
    return child;
  };

  var CreateCharChildren = function CreateCharChildren(text, style) {
    if (style) {
      this.textStyle.modify(style);
    }
    var children = [];
    for (var i = 0, cnt = text.length; i < cnt; i++) {
      var _char = text.charAt(i);
      var child = this.poolManager.allocate(CharTypeName);
      if (child === null) {
        child = new CharData(this,
        // parent
        _char,
        // text
        this.textStyle);
      } else {
        child.setParent(this).setActive().modifyStyle(this.textStyle).setText(_char);
      }
      // child.modifyPorperties(properties);  // Warning: Will modify text-style twice

      children.push(child);
    }
    return children;
  };

  var AppendText = function AppendText(text, style) {
    var children = this.createCharChildren(text, style);
    this.addChild(children);
    return this;
  };

  var SetText$1 = function SetText(text, style) {
    if (text === undefined) {
      text = '';
    }
    this.removeChildren();
    AppendText.call(this, text, style); // this.appendText might be override

    this.dirty = true;
    return this;
  };

  var InsertText = function InsertText(index, text, style) {
    var children = this.createCharChildren(text, style);
    index = this.getCharChildIndex(index, true);
    this.addChild(children, index);
    return this;
  };

  var RemoveText = function RemoveText(index, length) {
    if (length === undefined) {
      length = 1;
    }
    for (var i = 0; i < length; i++) {
      var childIndex = this.getCharChildIndex(index, true);
      if (childIndex === undefined) {
        break;
      }
      this.removeChild(this.children[childIndex]);
    }
    return this;
  };

  var GetText = function GetText(activeOnly) {
    var text = '';
    this.forEachCharChild(function (child) {
      text += child.text;
    }, undefined, activeOnly);
    return text;
  };

  var ImageData = /*#__PURE__*/function (_RenderBase) {
    _inherits(ImageData, _RenderBase);
    var _super = _createSuper(ImageData);
    function ImageData(parent, key, frame) {
      var _this;
      _classCallCheck(this, ImageData);
      _this = _super.call(this, parent, ImageTypeName);
      _this.setTexture(key, frame);
      return _this;
    }
    _createClass(ImageData, [{
      key: "frameWidth",
      get: function get() {
        return this.frameObj ? this.frameObj.cutWidth : 0;
      }
    }, {
      key: "frameHeight",
      get: function get() {
        return this.frameObj ? this.frameObj.cutHeight : 0;
      }
    }, {
      key: "offsetY",
      get: function get() {
        return -this.height;
      },
      set: function set(value) {}
    }, {
      key: "key",
      get: function get() {
        return this._key;
      },
      set: function set(value) {
        this.setDirty(this._key != value);
        this._key = value;
      }
    }, {
      key: "frame",
      get: function get() {
        return this._frame;
      },
      set: function set(value) {
        this.setDirty(this._frame != value);
        this._frame = value;
      }
    }, {
      key: "setTexture",
      value: function setTexture(key, frame) {
        this.key = key;
        this.frame = frame;
        this.frameObj = this.scene.sys.textures.getFrame(key, frame);
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        return this.frameWidth * this.scaleX;
      },
      set: function set(value) {
        this.setDirty(this.width !== value);
        this.scaleX = value / this.frameWidth;
      }
    }, {
      key: "height",
      get: function get() {
        return this.frameHeight * this.scaleY;
      },
      set: function set(value) {
        this.setDirty(this.height !== value);
        this.scaleY = value / this.frameHeight;
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
      key: "renderContent",
      value: function renderContent() {
        var context = this.context;
        var frame = this.frameObj;
        var width = this.frameWidth,
          height = this.frameHeight;
        context.drawImage(frame.source.image,
        // image
        frame.cutX, frame.cutY, width, height, 0, 0, width, height);
      }
    }, {
      key: "drawTLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawTLY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawBLY",
      get: function get() {
        return this.frameHeight;
      }
    }, {
      key: "drawTRX",
      get: function get() {
        return this.frameWidth + this.rightSpace;
      }
    }, {
      key: "drawTRY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBRX",
      get: function get() {
        return this.frameWidth + this.rightSpace;
      }
    }, {
      key: "drawBRY",
      get: function get() {
        return this.frameHeight;
      }
    }]);
    return ImageData;
  }(RenderBase);

  var CreateImageChild = function CreateImageChild(key, frame, properties) {
    var child = this.poolManager.allocate(ImageTypeName);
    if (child === null) {
      child = new ImageData(this,
      // parent
      key, frame);
    } else {
      child.setParent(this).setActive().setTexture(key, frame);
    }
    child.modifyPorperties(properties);
    return child;
  };

  var AppendImage = function AppendImage(key, frame, properties) {
    var child = this.createImageChild(key, frame, properties);
    this.addChild(child);
    return this;
  };

  var Drawer = /*#__PURE__*/function (_RenderBase) {
    _inherits(Drawer, _RenderBase);
    var _super = _createSuper(Drawer);
    function Drawer(parent, renderCallback, width, height) {
      var _this;
      _classCallCheck(this, Drawer);
      _this = _super.call(this, parent, DrawerTypeName);
      _this.setRenderCallback(renderCallback);
      _this.setDrawerSize(width, height);
      return _this;
    }
    _createClass(Drawer, [{
      key: "setRenderCallback",
      value: function setRenderCallback(callback) {
        if (callback) {
          this.renderContent = callback.bind(this);
        } else {
          delete this.renderContent;
        }
        return this;
      }
    }, {
      key: "setDrawerSize",
      value: function setDrawerSize(width, height) {
        // Whole canvas
        if (width === true) {
          this.toLocalPosition = false;
          width = undefined;
          height = undefined;
        } else {
          this.toLocalPosition = true;
        }
        if (width === undefined) {
          width = 0;
        }
        if (height === undefined) {
          height = width;
        }
        this.drawerWidth = width;
        this.drawerHeight = height;
        return this;
      }
    }, {
      key: "onFree",
      value: function onFree() {
        _get(_getPrototypeOf(Drawer.prototype), "onFree", this).call(this);
        this.setRenderCallback();
      }
    }, {
      key: "width",
      get: function get() {
        return this.drawerWidth * this.scaleX;
      },
      set: function set(value) {
        this.setDirty(this.width !== value);
        this.scaleX = this.drawerWidth > 0 ? value / this.drawerWidth : 1;
      }
    }, {
      key: "height",
      get: function get() {
        return this.drawerHeight * this.scaleY;
      },
      set: function set(value) {
        this.setDirty(this.height !== value);
        this.scaleY = this.drawerHeight > 0 ? value / this.drawerHeight : 1;
      }
    }, {
      key: "offsetY",
      get: function get() {
        return -this.height;
      },
      set: function set(value) {}
    }, {
      key: "drawTLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawTLY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBLX",
      get: function get() {
        return -this.leftSpace;
      }
    }, {
      key: "drawBLY",
      get: function get() {
        return this.drawerHeight;
      }
    }, {
      key: "drawTRX",
      get: function get() {
        return this.drawerWidth + this.rightSpace;
      }
    }, {
      key: "drawTRY",
      get: function get() {
        return 0;
      }
    }, {
      key: "drawBRX",
      get: function get() {
        return this.drawerWidth + this.rightSpace;
      }
    }, {
      key: "drawBRY",
      get: function get() {
        return this.drawerHeight;
      }
    }]);
    return Drawer;
  }(RenderBase);

  var CreateDrawerChild = function CreateDrawerChild(renderCallback, width, height) {
    var child = this.poolManager.allocate(DrawerTypeName);
    if (child === null) {
      child = new Drawer(this,
      // parent
      renderCallback, width, height);
    } else {
      child.setParent(this).setActive().setRenderCallback(renderCallback).setDrawerSize(width, height);
    }
    return child;
  };

  var AppendDrawer = function AppendDrawer(renderCallback, width, height) {
    var child = this.createDrawerChild(renderCallback, width, height);
    this.addChild(child);
    return this;
  };

  var Space = /*#__PURE__*/function (_RenderBase) {
    _inherits(Space, _RenderBase);
    var _super = _createSuper(Space);
    function Space(parent, width) {
      var _this;
      _classCallCheck(this, Space);
      _this = _super.call(this, parent, SpaceTypeName);
      _this.setSpaceWidth(width);
      return _this;
    }
    _createClass(Space, [{
      key: "width",
      get: function get() {
        return this.spaceWidth * this.scaleX;
      },
      set: function set(value) {
        if (this.spaceWidth > 0) {
          this.scaleX = value / this.spaceWidth;
        } else {
          this.scaleX = 1;
        }
      }
    }, {
      key: "setSpaceWidth",
      value: function setSpaceWidth(width) {
        this.spaceWidth = width;
        return this;
      }
    }]);
    return Space;
  }(RenderBase);

  var CreateSpaceChild = function CreateSpaceChild(width) {
    var child = this.poolManager.allocate(SpaceTypeName);
    if (child === null) {
      child = new Space(this,
      // parent
      width);
    } else {
      child.setParent(this).setActive().setSpaceWidth(width);
    }
    return child;
  };

  var AppendSpace = function AppendSpace(width) {
    var child = this.createSpaceChild(width);
    this.addChild(child);
    return this;
  };

  var Command = /*#__PURE__*/function (_Base) {
    _inherits(Command, _Base);
    var _super = _createSuper(Command);
    function Command(parent, name, callback, param, scope) {
      var _this;
      _classCallCheck(this, Command);
      _this = _super.call(this, parent, CmdTypeName);
      _this.setName(name).setParameter(param).setCallback(callback, scope);
      return _this;
    }
    _createClass(Command, [{
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
      }
    }, {
      key: "setParameter",
      value: function setParameter(param) {
        this.param = param;
        return this;
      }
    }, {
      key: "setCallback",
      value: function setCallback(callback, scope) {
        this.callback = callback;
        this.scope = scope;
        return this;
      }
    }, {
      key: "exec",
      value: function exec() {
        var result;
        if (this.scope) {
          result = this.callback.call(this.scope, this.param, this.name);
        } else {
          result = this.callback(this.param, this.name);
        }
        return result;
      }
    }, {
      key: "onFree",
      value: function onFree() {
        _get(_getPrototypeOf(Command.prototype), "onFree", this).call(this);
        this.setName().setCallback().setParameter();
      }
    }]);
    return Command;
  }(Base);

  var CreateCommandChild = function CreateCommandChild(name, callback, param, scope) {
    var child = this.poolManager.allocate(CmdTypeName);
    if (child === null) {
      child = new Command(this,
      // parent
      name, callback, param, scope);
    } else {
      child.setParent(this).setActive().setName(name).setCallback(callback, scope).setParameter(param);
    }
    return child;
  };

  var AppendCommand = function AppendCommand(name, callback, param, scope) {
    var child = this.createCommandChild(name, callback, param, scope);
    this.addChild(child);
    return this;
  };

  var SetWrapConfig = function SetWrapConfig(config) {
    if (config === undefined) {
      config = {};
    } else if (_typeof(config) === 'object') {
      config = DeepClone(config);
    }
    this.wrapConfig = config;
    return this;
  };

  var GetWord = function GetWord(children, startIndex, charMode, result) {
    if (result === undefined) {
      result = {
        word: [],
        width: 0
      };
    }
    result.word.length = 0;
    var endIndex = children.length;
    var currentIndex = startIndex;
    var word = result.word,
      wordWidth = 0;
    while (currentIndex < endIndex) {
      var child = children[currentIndex];
      // Can't render (command child), put into output directly
      if (!child.renderable) {
        word.push(child);
        currentIndex++;
        continue;
      }
      if (child.type === CharTypeName && child.text !== ' ' && child.text !== '\n') {
        word.push(child);
        wordWidth += child.outerWidth;
        currentIndex++;
        // Continue
      } else {
        // Get image child, a space, or a new-line
        if (currentIndex === startIndex) {
          // Single child
          word.push(child);
          wordWidth += child.outerWidth;
        }
        break;
      }
      if (charMode) {
        // Word only contains 1 character
        break;
      }
    }
    result.width = wordWidth;
    return result;
  };

  var GetChildrenAlign = function GetChildrenAlign(children) {
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (child.align !== undefined) {
        return child.align;
      }
    }
    return undefined;
  };

  var OffsetChildren = function OffsetChildren(children, offsetX, offsetY) {
    if (offsetX === 0 && offsetY === 0) {
      return;
    }
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (!child.renderable) {
        continue;
      }
      child.x += offsetX;
      child.y += offsetY;
    }
  };

  var AlignLines$1 = function AlignLines(result, width, height) {
    var hAlign = result.hAlign,
      vAlign = result.vAlign;
    var offsetX, offsetY;
    var linesHeight = result.linesHeight;
    switch (vAlign) {
      case 1: // center
      case 'center':
        offsetY = (height - linesHeight) / 2;
        break;
      case 2: // bottom
      case 'bottom':
        offsetY = height - linesHeight;
        break;
      default:
        offsetY = 0;
        break;
    }
    var lines = result.lines;
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
      var line = lines[li];
      var lineWidth = line.width,
        children = line.children;
      var lineHAlign = GetChildrenAlign(children);
      if (lineHAlign === undefined) {
        lineHAlign = hAlign;
      }
      switch (lineHAlign) {
        case 1: // center
        case 'center':
          offsetX = (width - lineWidth) / 2;
          break;
        case 2: // right
        case 'right':
          offsetX = width - lineWidth;
          break;
        default:
          offsetX = 0;
          break;
      }
      OffsetChildren(children, offsetX, offsetY);
    }
  };

  var GetDefaultTextHeight = function GetDefaultTextHeight() {
    var metrics = this.defaultTextStyle.getTextMetrics(this.context, this.testString);
    var ascent, descent;
    if ('actualBoundingBoxAscent' in metrics) {
      ascent = metrics.actualBoundingBoxAscent;
      descent = metrics.actualBoundingBoxDescent;
    } else {
      ascent = 0;
      descent = 0;
    }
    Result.ascent = ascent;
    Result.descent = descent;
    Result.height = ascent + descent;
    return Result;
  };
  var Result = {};

  var GetValue$v = Phaser.Utils.Objects.GetValue;
  var RunWordWrap$1 = function RunWordWrap(config) {
    // Parse parameters
    var startIndex = GetValue$v(config, 'start', 0);
    SetPadding$1(this.wrapPadding, GetValue$v(config, 'padding', 0));
    var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
    var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;

    // Get lineHeight, maxLines
    var lineHeight = GetValue$v(config, 'lineHeight');
    var ascent = GetValue$v(config, 'ascent', lineHeight);
    var maxLines;
    if (lineHeight === undefined) {
      // Calculate lineHeight
      var useDefaultTextHeight = GetValue$v(config, 'useDefaultTextHeight', false);
      maxLines = GetValue$v(config, 'maxLines', 0);
      if (this.fixedHeight > 0 && !useDefaultTextHeight) {
        var innerHeight = this.fixedHeight - paddingVertical;
        if (maxLines > 0) {
          // Calculate lineHeight via maxLines, in fixedHeight mode
          lineHeight = innerHeight / maxLines;
        } else {
          var textHeightResult = GetDefaultTextHeight.call(this);
          lineHeight = textHeightResult.height;
          ascent = textHeightResult.ascent;
          // Calculate maxLines via (ascent, lineHeight), in fixedHeight mode
          maxLines = Math.floor((innerHeight - ascent) / lineHeight);
        }
      } else {
        var textHeightResult = GetDefaultTextHeight.call(this);
        lineHeight = textHeightResult.height;
        ascent = textHeightResult.ascent;
      }
    } else {
      // Calculate maxLines
      if (this.fixedHeight > 0) {
        // Calculate maxLines via lineHeight, in fixedHeight mode
        maxLines = GetValue$v(config, 'maxLines');
        if (maxLines === undefined) {
          var innerHeight = this.fixedHeight - paddingVertical;
          maxLines = Math.floor(innerHeight / lineHeight);
        }
      } else {
        maxLines = GetValue$v(config, 'maxLines', 0); // Default is show all lines
      }
    }

    // If ascent is undefined, assign to lineHeight
    if (ascent === undefined) {
      ascent = lineHeight;
    }
    var showAllLines = maxLines === 0;

    // Get wrapWidth
    var wrapWidth = GetValue$v(config, 'wrapWidth', undefined);
    if (wrapWidth === undefined) {
      if (this.fixedWidth > 0) {
        wrapWidth = this.fixedWidth - paddingHorizontal;
      } else {
        wrapWidth = Infinity; // No word-wrap
      }
    }

    var letterSpacing = GetValue$v(config, 'letterSpacing', 0);
    var hAlign = GetValue$v(config, 'hAlign', 0);
    var vAlign = GetValue$v(config, 'vAlign', 0);
    var charWrap = GetValue$v(config, 'charWrap', false);
    var result = {
      callback: 'runWordWrap',
      start: startIndex,
      // Next start index
      isLastPage: false,
      // Is last page
      padding: this.wrapPadding,
      ascent: ascent,
      lineHeight: lineHeight,
      maxLines: maxLines,
      wrapWidth: wrapWidth,
      letterSpacing: letterSpacing,
      hAlign: hAlign,
      vAlign: vAlign,
      charWrap: charWrap,
      children: [],
      // Word-wrap result
      lines: [],
      // Word-wrap result in lines
      maxLineWidth: 0,
      linesHeight: 0
    };

    // Set all children to inactive
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      children[i].setActive(false);
    }

    // Layout children
    wrapWidth += letterSpacing;
    var startX = this.padding.left + this.wrapPadding.left,
      startY = this.padding.top + this.wrapPadding.top + ascent,
      // Start(baseline) from ascent, not 0
      x = startX,
      y = startY;
    var remainderWidth = wrapWidth,
      childIndex = startIndex,
      lastChildIndex = children.length;
    var resultChildren = result.children;
    var resultLines = result.lines,
      lastLine = [],
      lastLineWidth = 0,
      maxLineWidth = 0;
    var wordResult;
    while (childIndex < lastChildIndex) {
      wordResult = GetWord(children, childIndex, charWrap, wordResult);
      var word = wordResult.word;
      var charCnt = word.length;
      var wordWidth = wordResult.width + charCnt * letterSpacing;
      childIndex += charCnt;
      // Next line
      var isNewLineChar = IsNewLineChar(word[0]);
      if (remainderWidth < wordWidth || isNewLineChar) {
        // Add to result
        if (isNewLineChar) {
          var _char = word[0];
          _char.setActive().setPosition(x, y);
          resultChildren.push(_char);
          lastLine.push(_char);
        }

        // Move cursor
        x = startX;
        y += lineHeight;
        remainderWidth = wrapWidth;
        resultLines.push({
          children: lastLine,
          width: lastLineWidth
        });
        maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
        lastLineWidth = 0;
        lastLine = [];
        if (!showAllLines && resultLines.length === maxLines) {
          // Exceed maxLines
          break;
        } else if (isNewLineChar) {
          // Already add to result
          continue;
        }
      }
      remainderWidth -= wordWidth;
      lastLineWidth += wordWidth;
      for (var i = 0, cnt = word.length; i < cnt; i++) {
        var child = word[i];
        child.setActive();
        resultChildren.push(child);
        lastLine.push(child);
        if (child.renderable) {
          child.setPosition(x, y);
          x += child.outerWidth + letterSpacing;
        }
      }
    }
    if (lastLine.length > 0) {
      resultLines.push({
        children: lastLine,
        width: lastLineWidth
      });
      maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
    }
    result.start += resultChildren.length;
    result.isLastPage = result.start === lastChildIndex;
    result.maxLineWidth = maxLineWidth;
    result.linesHeight = resultLines.length * lineHeight;

    // Calculate size of game object
    var width = this.fixedWidth > 0 ? this.fixedWidth : result.maxLineWidth + paddingHorizontal;
    var height = this.fixedHeight > 0 ? this.fixedHeight : result.linesHeight + paddingVertical;

    // Size might be changed after wrapping
    var innerWidth = width - paddingHorizontal;
    var innerHeight = height - paddingVertical;
    AlignLines$1(result, innerWidth, innerHeight);

    // Resize
    this.setCanvasSize(width, height);

    // Set initial position
    for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
      var child = resultChildren[i];
      if (!child.renderable) {
        continue;
      }
      child.x0 = child.x;
      child.y0 = child.y;
    }
    return result;
  };

  var Merge$1 = Phaser.Utils.Objects.Merge;
  var RunWordWrap = function RunWordWrap(config) {
    if (config === undefined) {
      config = {};
    }
    return RunWordWrap$1.call(this, Merge$1(config, this.wrapConfig));
  };

  var AlignLines = function AlignLines(result, width, height) {
    var hAlign = result.hAlign,
      vAlign = result.vAlign;
    var offsetX, offsetY;
    var rtl = result.rtl;
    var lines = result.lines,
      lineWidth = result.lineWidth,
      linesWidth = result.linesWidth;
    switch (hAlign) {
      case 1: // center
      case 'center':
        offsetX = (width - linesWidth) / 2;
        break;
      case 2: // right
      case 'right':
        offsetX = width - linesWidth;
        break;
      default:
        // left
        offsetX = 0;
        break;
    }
    if (rtl) {
      offsetX += lineWidth;
    }
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
      var line = lines[rtl ? lcnt - li - 1 : li];
      var children = line.children;
      var lineHeight = line.height;
      var lineVAlign = GetChildrenAlign(children);
      if (lineVAlign === undefined) {
        lineVAlign = vAlign;
      }
      switch (lineVAlign) {
        case 1: // center
        case 'center':
          offsetY = (height - lineHeight) / 2;
          break;
        case 2: // bottom
        case 'bottom':
          offsetY = height - lineHeight;
          break;
        default:
          // top
          offsetY = 0;
          break;
      }
      OffsetChildren(children, offsetX, offsetY);
      offsetX += lineWidth;
    }
  };

  var GetValue$u = Phaser.Utils.Objects.GetValue;
  var RunVerticalWrap$1 = function RunVerticalWrap(config) {
    // Parse parameters
    var startIndex = GetValue$u(config, 'start', 0);
    SetPadding$1(this.wrapPadding, GetValue$u(config, 'padding', 0));
    var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
    var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;
    var lineWidth = GetValue$u(config, 'lineWidth', undefined);
    var maxLines;
    if (lineWidth === undefined) {
      // Calculate lineWidth via maxLines, in fixedWidth mode
      maxLines = GetValue$u(config, 'maxLines', 0);
      if (this.fixedWidth > 0) {
        var innerWidth = this.fixedWidth - paddingHorizontal;
        lineWidth = innerWidth / maxLines;
      } else {
        lineWidth = 0;
      }
    } else {
      if (this.fixedWidth > 0) {
        // Calculate maxLines via lineWidth, in fixedWidth mode
        maxLines = GetValue$u(config, 'maxLines', undefined);
        if (maxLines === undefined) {
          var innerWidth = this.fixedWidth - paddingHorizontal;
          maxLines = Math.floor(innerWidth / lineWidth) + 1;
        }
      } else {
        maxLines = GetValue$u(config, 'maxLines', 0); // Default is show all lines
      }
    }

    var showAllLines = maxLines === 0;

    // Get fixedChildHeight
    var fixedChildHeight = GetValue$u(config, 'fixedChildHeight', undefined);
    if (fixedChildHeight === undefined) {
      var charPerLine = GetValue$u(config, 'charPerLine', undefined);
      if (charPerLine !== undefined) {
        var innerHeight = this.fixedHeight - paddingVertical;
        fixedChildHeight = Math.floor(innerHeight / charPerLine);
      }
    }

    // Get wrapHeight
    var wrapHeight = GetValue$u(config, 'wrapHeight', undefined);
    if (wrapHeight === undefined) {
      if (this.fixedHeight > 0) {
        wrapHeight = this.fixedHeight - paddingVertical;
      } else {
        wrapHeight = Infinity; // No word-wrap
      }
    }

    var letterSpacing = GetValue$u(config, 'letterSpacing', 0);
    var rtl = GetValue$u(config, 'rtl', true);
    var hAlign = GetValue$u(config, 'hAlign', rtl ? 2 : 0);
    var vAlign = GetValue$u(config, 'vAlign', 0);
    var result = {
      callback: 'runVerticalWrap',
      start: startIndex,
      // Next start index
      isLastPage: false,
      // Is last page
      padding: this.wrapPadding,
      lineWidth: lineWidth,
      maxLines: maxLines,
      fixedChildHeight: fixedChildHeight,
      wrapHeight: wrapHeight,
      letterSpacing: letterSpacing,
      hAlign: hAlign,
      vAlign: vAlign,
      rtl: rtl,
      children: [],
      // Word-wrap result
      lines: [],
      // Word-wrap result in lines
      maxLineHeight: 0,
      linesWidth: 0
    };

    // Set all children to active
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      children[i].setActive(false);
    }

    // Layout children
    wrapHeight += letterSpacing;
    var startX = this.padding.left + this.wrapPadding.left,
      // Reset x of each character in AlignLines method
      startY = this.padding.top + this.wrapPadding.top,
      x = startX,
      y = startY;
    var remainderHeight = wrapHeight,
      childIndex = startIndex,
      lastChildIndex = children.length;
    var resultChildren = result.children;
    var resultLines = result.lines,
      lastLine = [],
      lastLineHeight = 0,
      maxLineHeight = 0;
    while (childIndex < lastChildIndex) {
      // Append non-typeable child directly
      var _char = children[childIndex];
      childIndex++;
      if (!child.renderable) {
        _char.setActive();
        resultChildren.push(_char);
        lastLine.push(_char);
        continue;
      }
      var childHeight = (fixedChildHeight !== undefined ? fixedChildHeight : _char.height) + letterSpacing;
      // Next line
      var isNewLineChar = IsNewLineChar(_char);
      if (remainderHeight < childHeight || isNewLineChar) {
        // Add to result
        if (isNewLineChar) {
          _char.setActive().setPosition(x, y).setOrigin(0.5);
          resultChildren.push(_char);
          lastLine.push(_char);
        }

        // Move cursor
        x = startX;
        y = startY;
        remainderHeight = wrapHeight;
        resultLines.push({
          children: lastLine,
          height: lastLineHeight
        });
        maxLineHeight = Math.max(maxLineHeight, lastLineHeight);
        lastLineHeight = 0;
        lastLine = [];
        if (!showAllLines && resultLines.length === maxLines) {
          // Exceed maxLines
          break;
        } else if (isNewLineChar) {
          // Already add to result                
          continue;
        }
      }
      remainderHeight -= childHeight;
      lastLineHeight += childHeight;
      _char.setActive().setPosition(x, y).setOrigin(0.5);
      resultChildren.push(_char);
      lastLine.push(_char);
      y += childHeight;
    }
    if (lastLine.length > 0) {
      resultLines.push({
        children: lastLine,
        height: lastLineHeight
      });
      maxLineHeight = Math.max(maxLineHeight, lastLineHeight);
    }
    result.start += resultChildren.length;
    result.isLastPage = result.start === lastChildIndex;
    result.maxLineHeight = maxLineHeight;
    result.linesWidth = resultLines.length * lineWidth;

    // Calculate size of game object
    var width = this.fixedWidth > 0 ? this.fixedWidth : result.linesWidth + paddingHorizontal;
    var height = this.fixedHeight > 0 ? this.fixedHeight : result.maxLineHeight + paddingVertical;

    // Size might be changed after wrapping
    var innerWidth = width - paddingHorizontal;
    var innerHeight = height - paddingVertical;
    AlignLines(result, innerWidth, innerHeight);

    // Resize
    this.setCanvasSize(width, height);

    // Set initial position
    for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
      var child = resultChildren[i];
      if (!child.renderable) {
        continue;
      }
      child.x0 = child.x;
      child.y0 = child.y;
    }
    return result;
  };

  var Merge = Phaser.Utils.Objects.Merge;
  var RunVerticalWrap = function RunVerticalWrap(config) {
    if (config === undefined) {
      config = {};
    }
    return RunVerticalWrap$1.call(this, Merge(config, this.wrapConfig));
  };

  var GetValue$t = Phaser.Utils.Objects.GetValue;
  var RunWrap = function RunWrap(config) {
    var wrapCallback = GetValue$t(this.wrapConfig, 'callback');
    if (!wrapCallback) {
      wrapCallback = GetValue$t(config, 'callback', this.runWordWrap);
    }
    if (typeof wrapCallback === 'string') {
      wrapCallback = this[wrapCallback];
    }
    return wrapCallback.call(this, config);
  };

  var SetAlignMethods = {
    setVAlign: function setVAlign(align) {
      this.wrapConfig.vAlign = align;
      return this;
    },
    setHAlign: function setHAlign(align) {
      this.wrapConfig.hAlign = align;
      return this;
    }
  };

  var RenderContent = function RenderContent() {
    this.clear();
    this.setCanvasSize(this.width, this.height);
    if (this.background.active) {
      this.background.render();
    }
    var child;
    for (var i = 0, cnt = this.children.length; i < cnt; i++) {
      child = this.children[i];
      if (child.active) {
        child.render();
      }
    }
    if (this.innerBounds.active) {
      this.innerBounds.render();
    }
  };

  var ForEachChild = function ForEachChild(callback, scope, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    var childIndex = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      var isBreak;
      if (scope) {
        isBreak = callback.call(this, child, childIndex, children);
      } else {
        isBreak = callback(child, childIndex, children);
      }
      childIndex++;
      if (isBreak) {
        break;
      }
    }
    return this;
  };

  var ForEachRenderableChild = function ForEachRenderableChild(callback, scope, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    var childIndex = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (child.renderable && !child.removed) {
        var isBreak;
        if (scope) {
          isBreak = callback.call(this, child, childIndex, children);
        } else {
          isBreak = callback(child, childIndex, children);
        }
        childIndex++;
        if (isBreak) {
          break;
        }
      }
    }
    return this;
  };

  var ForEachCharChild = function ForEachCharChild(callback, scope, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    var charIndex = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (IsChar(child) && !child.removed) {
        var isBreak;
        if (scope) {
          isBreak = callback.call(this, child, charIndex, children);
        } else {
          isBreak = callback(child, charIndex, children);
        }
        charIndex++;
        if (isBreak) {
          break;
        }
      }
    }
    return this;
  };

  var GetChildren = function GetChildren() {
    return this.children;
  };

  var GetAll = Phaser.Utils.Array.GetAll;
  var GetActiveChildren = function GetActiveChildren() {
    return GetAll(this.children, 'active', true);
  };

  var GetCharChildren = function GetCharChildren(activeOnly, out) {
    if (out === undefined) {
      out = [];
    }
    this.forEachCharChild(function (child) {
      out.push(child);
    }, undefined, activeOnly);
    return out;
  };

  var GetLastAppendedChildren = function GetLastAppendedChildren() {
    return this.lastAppendedChildren;
  };

  var RotateAround$2 = Phaser.Math.RotateAround;
  var BobPositionToCanvasPosition = function BobPositionToCanvasPosition(bobX, bobY, bob, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      if (globPoint === undefined) {
        globPoint = {};
      }
      out = globPoint;
    }
    out.x = bobX;
    out.y = bobY;
    if (bob.rotation !== 0) {
      RotateAround$2(out, 0, 0, bob.rotation);
    }
    out.x = out.x * bob.scaleX + bob.drawX;
    out.y = out.y * bob.scaleY + bob.drawY;
    return out;
  };
  var globPoint;

  var GetBobCenterPosition = function GetBobCenterPosition(bob, out) {
    return BobPositionToCanvasPosition(bob.drawCenterX, bob.drawCenterY, bob, out);
  };

  var GetDistance = Phaser.Math.Distance.BetweenPointsSquared;
  var GetNearestChild = function GetNearestChild(canvasX, canvasY) {
    var pointA = {
      x: canvasX,
      y: canvasY
    };
    var minDistance = Infinity;
    var nearestChild = null;
    this.forEachRenderableChild(function (child) {
      var distance = GetDistance(pointA, GetBobCenterPosition(child, true));
      if (minDistance > distance) {
        minDistance = distance;
        nearestChild = child;
      }
    });
    return nearestChild;
  };

  var SetToMinSize = function SetToMinSize() {
    var children = this.children;
    var maxX = 0,
      maxY = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (!child.renderable || !child.active || !child.visible) {
        continue;
      }
      var x0 = child.x0 !== undefined ? child.x0 : child.x;
      var y0 = child.y0 !== undefined ? child.y0 : child.y;
      maxX = Math.max(maxX, x0);
      maxY = Math.max(maxY, y0);
    }
    var width = maxX + this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;
    var height = maxY + this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;

    // Ignore fixedWidth, and fixedHeight
    if (this.width !== width || this.height !== height) {
      this.dirty = true;
      this.setCanvasSize(width, height);
    }
    return this;
  };

  var GetCharChildIndex = function GetCharChildIndex(charIndex, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (IsChar(child) && !child.removed) {
        if (charIndex === 0) {
          return i;
        } else {
          charIndex--;
        }
      }
    }
    return undefined;
  };

  var GetCharChild = function GetCharChild(charIndex, activeOnly) {
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (IsChar(child) && !child.removed) {
        if (charIndex === 0) {
          return child;
        } else {
          charIndex--;
        }
      }
    }
    return undefined;
  };

  var GetCharIndex = function GetCharIndex(childIndex, activeOnly) {
    if (typeof childIndex !== 'number') {
      childIndex = this.children.indexOf(childIndex);
      if (childIndex < 0) {
        return null;
      }
    }
    if (activeOnly === undefined) {
      activeOnly = true;
    }
    var children = this.children;
    if (childIndex >= children.length) {
      childIndex = children.length;
    }
    var charIndex = 0;
    for (var i = 0; i < childIndex; i++) {
      var child = children[i];
      if (activeOnly && !child.active) {
        continue;
      }
      if (IsChar(child) && !child.removed) {
        charIndex++;
      }
    }
    return charIndex;
  };

  var SetChildrenInteractiveEnable = function SetChildrenInteractiveEnable(enable) {
    if (enable === undefined) {
      enable = true;
    }
    if (this.childrenInteractiveEnable !== enable) {
      this.lastOverChild = null;
    }
    this.childrenInteractiveEnable = enable;
    return this;
  };

  var GetFirstChildContains = function GetFirstChildContains(children, x, y) {
    var children = children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (!child.active || !child.renderable) {
        continue;
      }
      if (child.contains(x, y)) {
        return child;
      }
    }
    return null;
  };

  var SetChildrenInteractive = function SetChildrenInteractive() {
    this.on('pointerdown', OnPointerDown, this).on('pointerdown', OnPointerUp, this).on('pointermove', OnPointOverOut, this).on('pointerover', OnPointOverOut, this).on('pointerout', function (pointer, event) {
      OnPointOverOut.call(this, pointer, null, null, event);
    }, this);
    return this;
  };
  var OnPointerDown = function OnPointerDown(pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
      return;
    }
    var child = GetFirstChildContains(this.children, localX, localY);
    if (!child) {
      return;
    }
    this.emit('child.pointerdown', child, pointer, localX, localY, event);
  };
  var OnPointerUp = function OnPointerUp(pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
      return;
    }
    var child = GetFirstChildContains(this.children, localX, localY);
    if (!child) {
      return;
    }
    this.emit('child.pointerup', child, pointer, localX, localY, event);
  };
  var OnPointOverOut = function OnPointOverOut(pointer, localX, localY, event) {
    if (!this.childrenInteractiveEnable) {
      return;
    }
    if (localX === null) {
      // Case of pointerout
      if (this.lastOverChild !== null) {
        this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
        this.lastOverChild = null;
      }
      return;
    }
    var child = GetFirstChildContains(this.children, localX, localY);
    if (child === this.lastOverChild) {
      return;
    }
    if (this.lastOverChild !== null) {
      this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
    }
    if (child !== null) {
      this.emit('child.pointerover', child, pointer, localX, localY, event);
    }
    this.lastOverChild = child;
  };

  var GameObject = Phaser.GameObjects.GameObject;
  var SetInteractive = function SetInteractive(hitArea, hitAreaCallback, dropZone) {
    var isInteractived = !!this.input;
    GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);
    if (!isInteractived) {
      SetChildrenInteractive.call(this);
    }
    return this;
  };

  var BringToTop = Phaser.Utils.Array.BringToTop;
  var SendToBack = Phaser.Utils.Array.SendToBack;
  var MoveUp = Phaser.Utils.Array.MoveUp;
  var MoveDown = Phaser.Utils.Array.MoveDown;
  var MoveAbove = Phaser.Utils.Array.MoveAbove;
  var MoveBelow = Phaser.Utils.Array.MoveBelow;
  var MoveChildMethods = {
    moveChildToFist: function moveChildToFist(child) {
      SendToBack(this.children, child);
      return this;
    },
    moveChildToLast: function moveChildToLast(child) {
      BringToTop(this.children, child);
      return this;
    },
    movechildUp: function movechildUp(child) {
      MoveUp(this.children, child);
      return this;
    },
    movechildDown: function movechildDown(child) {
      MoveDown(this.children, child);
      return this;
    },
    movechildAbove: function movechildAbove(child, baseChild) {
      MoveAbove(this.children, child, baseChild);
      return this;
    },
    movechildBelow: function movechildBelow(child, baseChild) {
      MoveBelow(this.children, child, baseChild);
      return this;
    }
  };

  var BackgroundMethods = {
    setBackgroundColor: function setBackgroundColor(color, color2, isHorizontalGradient) {
      this.background.setColor(color, color2, isHorizontalGradient);
      return this;
    },
    setBackgroundStroke: function setBackgroundStroke(color, lineWidth) {
      this.background.setStroke(color, lineWidth);
      return this;
    },
    setBackgroundCornerRadius: function setBackgroundCornerRadius(radius, iteration) {
      this.background.setCornerRadius(radius, iteration);
      return this;
    }
  };

  var InnerBoundsMethods = {
    setInnerBoundsColor: function setInnerBoundsColor(color, color2, isHorizontalGradient) {
      this.innerBounds.setColor(color, color2, isHorizontalGradient);
      return this;
    },
    setInnerBoundsStroke: function setInnerBoundsStroke(color, lineWidth) {
      this.innerBounds.setStroke(color, lineWidth);
      return this;
    }
  };

  var Methods$2 = {
    setFixedSize: SetFixedSize,
    setPadding: SetPadding,
    getPadding: GetPadding,
    modifyTextStyle: ModifyTextStyle,
    modifyDefaultTextStyle: ModifyDefaultTextStyle,
    resetTextStyle: ResetTextStyle,
    setTestString: SetTestString,
    removeChild: RemoveChild,
    removeChildren: RemoveChildren,
    popChild: PopChild,
    clearContent: ClearContent,
    addChild: AddChild,
    createCharChild: CreateCharChild,
    createCharChildren: CreateCharChildren,
    setText: SetText$1,
    appendText: AppendText,
    insertText: InsertText,
    removeText: RemoveText,
    getText: GetText,
    createImageChild: CreateImageChild,
    appendImage: AppendImage,
    createDrawerChild: CreateDrawerChild,
    appendDrawer: AppendDrawer,
    createSpaceChild: CreateSpaceChild,
    appendSpace: AppendSpace,
    createCommandChild: CreateCommandChild,
    appendCommand: AppendCommand,
    setWrapConfig: SetWrapConfig,
    runWordWrap: RunWordWrap,
    runVerticalWrap: RunVerticalWrap,
    runWrap: RunWrap,
    renderContent: RenderContent,
    forEachChild: ForEachChild,
    forEachRenderableChild: ForEachRenderableChild,
    forEachCharChild: ForEachCharChild,
    getChildren: GetChildren,
    getActiveChildren: GetActiveChildren,
    getCharChildren: GetCharChildren,
    getLastAppendedChildren: GetLastAppendedChildren,
    getNearestChild: GetNearestChild,
    setToMinSize: SetToMinSize,
    getCharChildIndex: GetCharChildIndex,
    getCharChild: GetCharChild,
    getCharIndex: GetCharIndex,
    setChildrenInteractiveEnable: SetChildrenInteractiveEnable,
    setInteractive: SetInteractive
  };
  Object.assign(Methods$2, MoveChildMethods, BackgroundMethods, InnerBoundsMethods, SetAlignMethods);

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

  var GetFastValue = Phaser.Utils.Objects.GetFastValue;
  var Pools = {};
  var PoolManager = /*#__PURE__*/function () {
    function PoolManager(config) {
      _classCallCheck(this, PoolManager);
      this.pools = GetFastValue(config, 'pools', Pools);
    }
    _createClass(PoolManager, [{
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
      value: function freeMultiple(arr) {
        if (!this.pools) {
          return this;
        }
        for (var i = 0, cnt = arr.length; i < cnt; i++) {
          this.free(arr[i]);
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

  var IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$s = Phaser.Utils.Objects.GetValue;
  var DynamicText = /*#__PURE__*/function (_Canvas) {
    _inherits(DynamicText, _Canvas);
    var _super = _createSuper(DynamicText);
    function DynamicText(scene, x, y, fixedWidth, fixedHeight, config) {
      var _this;
      _classCallCheck(this, DynamicText);
      if (IsPlainObject$2(x)) {
        config = x;
        x = GetValue$s(config, 'x', 0);
        y = GetValue$s(config, 'y', 0);
        fixedWidth = GetValue$s(config, 'width', 0);
        fixedHeight = GetValue$s(config, 'height', 0);
      } else if (IsPlainObject$2(fixedWidth)) {
        config = fixedWidth;
        fixedWidth = GetValue$s(config, 'width', 0);
        fixedHeight = GetValue$s(config, 'height', 0);
      }
      var width = fixedWidth === 0 ? 1 : fixedWidth;
      var height = fixedHeight === 0 ? 1 : fixedHeight;
      _this = _super.call(this, scene, x, y, width, height);
      _this.type = 'rexDynamicText';
      _this.autoRound = true;
      _this.padding = SetPadding$1();
      _this.wrapPadding = SetPadding$1();
      var textStyleConfig = GetValue$s(config, 'style', undefined);
      _this.defaultTextStyle = new TextStyle(null, textStyleConfig);
      _this.textStyle = _this.defaultTextStyle.clone();
      _this.setTestString(GetValue$s(config, 'testString', '|MÉqgy'));
      _this.background = new Background(_assertThisInitialized(_this), GetValue$s(config, 'background', undefined));
      _this.innerBounds = new InnerBounds(_assertThisInitialized(_this), GetValue$s(config, 'innerBounds', undefined));
      _this.children = [];
      _this.lastAppendedChildren = [];
      _this.lastOverChild = null;
      _this.poolManager = new PoolManager(config);
      _this.setFixedSize(fixedWidth, fixedHeight);
      _this.setPadding(GetValue$s(config, 'padding', 0));
      _this.setWrapConfig(GetValue$s(config, 'wrap', undefined));
      _this.setChildrenInteractiveEnable(GetValue$s(config, 'childrenInteractive', false));
      var text = GetValue$s(config, 'text', undefined);
      if (text) {
        _this.setText(text);
      }
      return _this;
    }
    _createClass(DynamicText, [{
      key: "updateTexture",
      value: function updateTexture() {
        this.renderContent();
        _get(_getPrototypeOf(DynamicText.prototype), "updateTexture", this).call(this);
        return this;
      }
    }, {
      key: "text",
      get: function get() {
        return this.getText(true);
      },
      set: function set(value) {
        this.setText(value);
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.setFixedSize(width, height);
        return this;
      }
    }]);
    return DynamicText;
  }(Canvas);
  Object.assign(DynamicText.prototype, Methods$2);

  var ElementProperties = {
    maxLength: ['maxLength', undefined],
    minLength: ['minLength', undefined],
    readOnly: ['readOnly', false]
  };
  var StyleProperties = {
    direction: ['direction', undefined]
  };

  var CopyProperty = function CopyProperty(from, to, key) {
    if (typeof key === 'string') {
      if (from.hasOwnProperty(key)) {
        to[key] = from[key];
      }
    } else {
      var keys = key;
      if (Array.isArray(keys)) {
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
          CopyProperty(from, to, keys[i]);
        }
      } else {
        for (var key in keys) {
          CopyProperty(from, to, key);
        }
      }
    }
  };

  var CopyElementConfig = function CopyElementConfig(from) {
    if (from === undefined) {
      from = {};
    }
    var to = {};
    CopyProperty(from, to, 'inputType');
    CopyProperty(from, to, 'type');
    CopyProperty(from, to, 'style');
    CopyProperty(from, to, StyleProperties);
    CopyProperty(from, to, ElementProperties);
    return to;
  };

  var LastOpenedEditor = undefined;
  var SetLastOpenedEditor = function SetLastOpenedEditor(editor) {
    if (editor === LastOpenedEditor) {
      return;
    }
    if (LastOpenedEditor !== undefined) {
      LastOpenedEditor.close();
    }
    LastOpenedEditor = editor;
  };
  var CloseLastOpenEditor = function CloseLastOpenEditor(editor) {
    if (editor !== LastOpenedEditor) {
      return;
    }

    // Don't call `LastOpenedEditor.close()`
    LastOpenedEditor = undefined;
  };

  var GetValue$r = Phaser.Utils.Objects.GetValue;
  var SetProperties = function SetProperties(properties, config, out) {
    if (out === undefined) {
      out = {};
    }
    var property, value;
    for (var key in properties) {
      property = properties[key]; // [propName, defaultValue]
      value = GetValue$r(config, key, property[1]);
      if (value !== undefined) {
        out[property[0]] = value;
      }
    }
    return out;
  };

  var StopPropagationTouchEvents = function StopPropagationTouchEvents(element) {
    // Don't propagate touch/mouse events to parent(game canvas)
    element.addEventListener('touchstart', callback, false);
    element.addEventListener('touchmove', callback, false);
    element.addEventListener('touchend', callback, false);
    element.addEventListener('mousedown', callback, false);
    element.addEventListener('mouseup', callback, false);
    element.addEventListener('mousemove', callback, false);
  };
  var callback = function callback(e) {
    e.stopPropagation();
  };

  var GetValue$q = Phaser.Utils.Objects.GetValue;
  var CreateElement = function CreateElement(parent, config) {
    var element;
    var textType = GetValue$q(config, 'inputType', undefined);
    if (textType === undefined) {
      textType = GetValue$q(config, 'type', 'text');
    }
    if (textType === 'textarea') {
      element = document.createElement('textarea');
      element.style.resize = 'none';
    } else {
      element = document.createElement('input');
      element.type = textType;
    }
    var style = GetValue$q(config, 'style', undefined);
    // Apply other style properties
    var elementStyle = element.style;
    SetProperties(StyleProperties, style, elementStyle);
    // Set style
    elementStyle.position = 'absolute';
    elementStyle.opacity = 0;
    elementStyle.pointerEvents = 'none';
    elementStyle.zIndex = 0;
    // hide native blue text cursor on iOS
    elementStyle.transform = 'scale(0)';
    SetProperties(ElementProperties, config, element);

    // Don't propagate touch/mouse events to parent(game canvas)
    StopPropagationTouchEvents(element);
    document.body.appendChild(element);
    return element;
  };

  var Open = function Open() {
    // Already opened
    if (this.isOpened) {
      return this;
    }
    // Read only
    if (this.readOnly) {
      return this;
    }
    SetLastOpenedEditor(this);
    this.isOpened = true;
    if (!this.node) {
      // Create input text element when opening editor
      this.node = CreateElement(this, this.nodeConfig);
    }
    this.setFocus();
    this.initText();
    if (this.enterCloseEnable) {
      this.scene.input.keyboard.once('keydown-ENTER', this.close, this);
    }

    // There is no cursor-position-change event, 
    // so updating cursor position every tick
    this.scene.sys.events.on('postupdate', this.updateText, this);
    this.scene.input.on('pointerdown', this.onClickOutside, this);
    if (this.onOpenCallback) {
      this.onOpenCallback(this.parent, this);
    }
    this.emit('open', this);
    return this;
  };

  var RemoveElement = function RemoveElement(element) {
    if (!element) {
      return;
    }
    document.body.removeChild(element);
  };

  var Close = function Close() {
    // Already closed
    if (!this.isOpened) {
      return this;
    }
    CloseLastOpenEditor(this);
    this.setBlur();
    this.isOpened = false;
    this.updateText();
    this.scene.sys.events.off('postupdate', this.updateText, this);
    this.scene.input.off('pointerdown', this.onClickOutside, this);
    if (this.onCloseCallback) {
      this.onCloseCallback(this.parent, this);
    }

    // Remove input text element when closing editor
    RemoveElement(this.node);
    this.node = undefined;
    this.emit('close', this);
    return this;
  };

  var Methods$1 = {
    open: Open,
    close: Close
  };

  var GetValue$p = Phaser.Utils.Objects.GetValue;
  var HiddenTextEditBase = /*#__PURE__*/function (_ComponentBase) {
    _inherits(HiddenTextEditBase, _ComponentBase);
    var _super = _createSuper(HiddenTextEditBase);
    function HiddenTextEditBase(gameObject, config) {
      var _this;
      _classCallCheck(this, HiddenTextEditBase);
      _this = _super.call(this, gameObject);
      // this.parent = gameObject;

      var textType = GetValue$p(config, 'inputType', undefined);
      if (textType === undefined) {
        textType = GetValue$p(config, 'type', 'text');
      }
      _this.setEnterCloseEnable(GetValue$p(config, 'enterClose', textType !== 'textarea'));
      var onOpen = GetValue$p(config, 'onOpen', undefined);
      if (!onOpen) {
        onOpen = GetValue$p(config, 'onFocus', undefined);
      }
      _this.onOpenCallback = onOpen;
      var onClose = GetValue$p(config, 'onClose', undefined);
      if (!onClose) {
        onClose = GetValue$p(config, 'onBlur', undefined);
      }
      _this.onCloseCallback = onClose;
      _this.onUpdateCallback = GetValue$p(config, 'onUpdate', undefined);
      _this.isOpened = false;
      gameObject.on('pointerdown', function () {
        this.open();
      }, _assertThisInitialized(_this)).setInteractive();
      _this.nodeConfig = CopyElementConfig(config);
      // Create/remove input text element when opening/closing editor
      _this.node = undefined;
      return _this;
    }
    _createClass(HiddenTextEditBase, [{
      key: "destroy",
      value: function destroy() {
        // this.parent.off('pointerdown', this.open, this);

        this.close();
        _get(_getPrototypeOf(HiddenTextEditBase.prototype), "destroy", this).call(this);
      }
    }, {
      key: "onClickOutside",
      value: function onClickOutside(pointer) {
        if (!IsPointerInHitArea(this.parent, pointer)) {
          this.close();
        }
      }
    }, {
      key: "setEnterCloseEnable",
      value: function setEnterCloseEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.enterCloseEnable = enable;
        return this;
      }

      // Override
    }, {
      key: "initText",
      value: function initText() {}

      // Override
    }, {
      key: "updateText",
      value: function updateText() {}

      // Copy from InputText class
    }, {
      key: "text",
      get: function get() {
        if (!this.node) {
          return '';
        }
        return this.node.value;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.value = value;
      }
    }, {
      key: "setText",
      value: function setText(value) {
        // Override
        this.text = value;
        return this;
      }
    }, {
      key: "maxLength",
      get: function get() {
        return this.nodeConfig.maxLength;
      },
      set: function set(value) {
        this.nodeConfig.maxLength = value;
        if (this.node) {
          this.node.maxLength = value;
        }
      }
    }, {
      key: "setMaxLength",
      value: function setMaxLength(value) {
        this.maxLength = value;
        return this;
      }
    }, {
      key: "minLength",
      get: function get() {
        return this.nodeConfig.minLength;
      },
      set: function set(value) {
        this.nodeConfig.minLength = value;
        if (this.node) {
          this.node.minLength = value;
        }
      }
    }, {
      key: "setMinLength",
      value: function setMinLength(value) {
        this.minLength = value;
        return this;
      }
    }, {
      key: "placeholder",
      get: function get() {
        return this.node.placeholder;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.placeholder = value;
      }
    }, {
      key: "setPlaceholder",
      value: function setPlaceholder(value) {
        this.placeholder = value;
        return this;
      }
    }, {
      key: "selectText",
      value: function selectText(selectionStart, selectionEnd) {
        if (!this.node) {
          return this;
        }
        if (selectionStart === undefined) {
          this.node.select();
        } else {
          this.node.setSelectionRange(selectionStart, selectionEnd);
        }
        return this;
      }
    }, {
      key: "selectAll",
      value: function selectAll() {
        this.selectText();
        return this;
      }
    }, {
      key: "selectionStart",
      get: function get() {
        if (!this.node) {
          return 0;
        }
        return this.node.selectionStart;
      }
    }, {
      key: "selectionEnd",
      get: function get() {
        if (!this.node) {
          return 0;
        }
        return this.node.selectionEnd;
      }
    }, {
      key: "selectedText",
      get: function get() {
        if (!this.node) {
          return '';
        }
        var node = this.node;
        return node.value.substring(node.selectionStart, node.selectionEnd);
      }
    }, {
      key: "cursorPosition",
      get: function get() {
        if (!this.node) {
          return 0;
        }
        return this.node.selectionStart;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.setSelectionRange(value, value);
      }
    }, {
      key: "setCursorPosition",
      value: function setCursorPosition(value) {
        if (value === undefined) {
          value = this.text.length;
        } else if (value < 0) {
          value = this.text.length + value;
        }
        this.cursorPosition = value;
        return this;
      }
    }, {
      key: "tooltip",
      get: function get() {
        if (!this.node) {
          return '';
        }
        return this.node.title;
      },
      set: function set(value) {
        if (!this.node) {
          return this;
        }
        this.node.title = value;
      }
    }, {
      key: "setTooltip",
      value: function setTooltip(value) {
        this.tooltip = value;
        return this;
      }
    }, {
      key: "setTextChangedCallback",
      value: function setTextChangedCallback(callback) {
        this.onTextChanged = callback;
        return this;
      }
    }, {
      key: "readOnly",
      get: function get() {
        return this.nodeConfig.readOnly;
      },
      set: function set(value) {
        this.nodeConfig.readOnly = value;
        if (this.node) {
          this.node.readOnly = value;
        }
      }
    }, {
      key: "setReadOnly",
      value: function setReadOnly(value) {
        if (value === undefined) {
          value = true;
        }
        this.readOnly = value;
        return this;
      }
    }, {
      key: "spellCheck",
      get: function get() {
        if (!this.node) {
          return '';
        }
        return this.node.spellcheck;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.spellcheck = value;
      }
    }, {
      key: "setSpellCheck",
      value: function setSpellCheck(value) {
        this.spellCheck = value;
        return this;
      }
    }, {
      key: "fontColor",
      get: function get() {
        if (!this.node) {
          return undefined;
        }
        return this.node.style.color;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.style.color = value;
      }
    }, {
      key: "setFontColor",
      value: function setFontColor(value) {
        this.fontColor = value;
        return this;
      }
    }, {
      key: "setStyle",
      value: function setStyle(key, value) {
        if (!this.node) {
          return this;
        }
        this.node.style[key] = value;
        return this;
      }
    }, {
      key: "getStyle",
      value: function getStyle(key) {
        if (!this.node) {
          return undefined;
        }
        return this.node.style[key];
      }
    }, {
      key: "scrollToBottom",
      value: function scrollToBottom() {
        if (!this.node) {
          return this;
        }
        this.node.scrollTop = this.node.scrollHeight;
        return this;
      }
    }, {
      key: "setEnabled",
      value: function setEnabled(enabled) {
        if (!this.node) {
          return this;
        }
        if (enabled === undefined) {
          enabled = true;
        }
        this.node.disabled = !enabled;
        return this;
      }
    }, {
      key: "setBlur",
      value: function setBlur() {
        if (!this.node) {
          return this;
        }
        this.node.blur();
        return this;
      }
    }, {
      key: "setFocus",
      value: function setFocus() {
        if (!this.node) {
          return this;
        }
        this.node.focus();
        return this;
      }
    }, {
      key: "isFocused",
      get: function get() {
        return this.isOpened;
      }
    }]);
    return HiddenTextEditBase;
  }(ComponentBase);
  Object.assign(HiddenTextEditBase.prototype, Methods$1);

  var NumberInputUpdateCallback = function NumberInputUpdateCallback(text, textObject, hiddenInputText) {
    text = text.replace(' ', '');
    var previousText = hiddenInputText.previousText;
    if (text === previousText) {
      return text;
    }
    if (isNaN(text)) {
      // Enter a NaN character, back to previous text
      hiddenInputText.emit('nan', text, hiddenInputText);
      text = previousText;
      var cursorPosition = hiddenInputText.cursorPosition - 1;
      hiddenInputText.setText(text);
      hiddenInputText.setCursorPosition(cursorPosition);
    } else {
      // New number text, update previous texr
      hiddenInputText.previousText = text;
    }
    return text;
  };

  var OnSelectRange = function OnSelectRange(hiddenTextEdit) {
    var textObject = hiddenTextEdit.parent;
    // var text = textObject.text;
    var selectionStart = hiddenTextEdit.isOpened ? hiddenTextEdit.selectionStart : null;
    var selectionEnd = hiddenTextEdit.isOpened ? hiddenTextEdit.selectionEnd : null;
    var prevSelectionStart = hiddenTextEdit.prevSelectionStart;
    var prevSelectionEnd = hiddenTextEdit.prevSelectionEnd;
    if (prevSelectionStart === selectionStart && prevSelectionEnd === selectionEnd) {
      return;
    }
    var min, max;
    if (prevSelectionStart === null) {
      min = selectionStart;
      max = selectionEnd;
    } else {
      min = Math.min(prevSelectionStart, selectionStart);
      max = Math.max(prevSelectionEnd, selectionEnd);
    }
    for (var i = min; i < max; i++) {
      var inPrevSelectionRange = prevSelectionStart === null ? false : i >= prevSelectionStart && i < prevSelectionEnd;
      var inSelectionRange = i >= selectionStart && i < selectionEnd;
      if (inPrevSelectionRange && inSelectionRange) {
        continue;
      }
      var child = textObject.getCharChild(i);
      if (child) {
        if (inPrevSelectionRange) {
          textObject.emit('cursorout', child, i, textObject);
        } else {
          textObject.emit('cursorin', child, i, textObject);
        }
      }
    }
    hiddenTextEdit.prevSelectionStart = selectionStart;
    hiddenTextEdit.prevSelectionEnd = selectionEnd;
  };

  var MoveCursor = function MoveCursor(hiddenTextEdit) {
    var textObject = hiddenTextEdit.parent;
    var text = textObject.text;
    var cursorPosition = hiddenTextEdit.cursorPosition;
    if (hiddenTextEdit.prevCursorPosition === cursorPosition) {
      return;
    }
    if (hiddenTextEdit.prevCursorPosition !== null) {
      if (hiddenTextEdit.prevCursorPosition > text.length) {
        hiddenTextEdit.prevCursorPosition = null;
      }
    }
    if (hiddenTextEdit.prevCursorPosition !== null) {
      var child = textObject.getCharChild(hiddenTextEdit.prevCursorPosition);
      if (child) {
        textObject.emit('cursorout', child, hiddenTextEdit.prevCursorPosition, textObject);
      }
    }
    if (cursorPosition != null) {
      var child = textObject.getCharChild(cursorPosition);
      if (child) {
        textObject.emit('cursorin', child, cursorPosition, textObject);
      }
    }
    textObject.emit('movecursor', cursorPosition, hiddenTextEdit.prevCursorPosition, textObject);
    hiddenTextEdit.prevCursorPosition = cursorPosition;
  };

  var ClearSelectRange = function ClearSelectRange(hiddenTextEdit) {
    var prevSelectionStart = hiddenTextEdit.prevSelectionStart;
    if (prevSelectionStart === null) {
      return;
    }
    var prevSelectionEnd = hiddenTextEdit.prevSelectionEnd;
    var textObject = hiddenTextEdit.parent;
    for (var i = prevSelectionStart; i < prevSelectionEnd; i++) {
      var child = textObject.getCharChild(i);
      if (child) {
        textObject.emit('cursorout', child, i, textObject);
      }
    }
    hiddenTextEdit.prevSelectionStart = null;
    hiddenTextEdit.prevSelectionEnd = null;
  };

  var ClearCursor = function ClearCursor(hiddenTextEdit) {
    var prevCursorPosition = hiddenTextEdit.prevCursorPosition;
    if (prevCursorPosition === null) {
      return;
    }
    var textObject = hiddenTextEdit.parent;
    var child = textObject.getCharChild(prevCursorPosition);
    if (child) {
      textObject.emit('cursorout', child, prevCursorPosition, textObject);
    }
    hiddenTextEdit.prevCursorPosition = null;
  };

  var GetValue$o = Phaser.Utils.Objects.GetValue;
  var HiddenTextEdit = /*#__PURE__*/function (_HiddenTextEditBase) {
    _inherits(HiddenTextEdit, _HiddenTextEditBase);
    var _super = _createSuper(HiddenTextEdit);
    function HiddenTextEdit(gameObject, config) {
      var _this;
      _classCallCheck(this, HiddenTextEdit);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;

      _this.setSelectAllWhenFocusEnable(GetValue$o(config, 'selectAll', false));
      _this.cursorMoveStartIndex = null;
      _this.prevCursorPosition = null;
      _this.prevSelectionStart = null;
      _this.prevSelectionEnd = null;
      _this.firstClickAfterOpen = false;
      gameObject
      // Open editor by 'pointerdown' event
      // Then set cursor position to nearest char
      .on('pointerdown', function (pointer, localX, localY, event) {
        var child = gameObject.getNearestChild(localX, localY);
        var charIndex = gameObject.getCharIndex(child);
        if (!this.selectAllWhenFocus || !this.firstClickAfterOpen) {
          this.setCursorPosition(charIndex);
        }
        this.cursorMoveStartIndex = charIndex;
        this.firstClickAfterOpen = false;
      }, _assertThisInitialized(_this)).on('pointermove', function (pointer, localX, localY, event) {
        if (!pointer.isDown) {
          return;
        }
        var child = gameObject.getNearestChild(localX, localY);
        var charIndex = gameObject.getCharIndex(child);
        if (this.cursorMoveStartIndex < charIndex) {
          this.selectText(this.cursorMoveStartIndex, charIndex + 1);
        } else {
          this.selectText(charIndex, this.cursorMoveStartIndex + 1);
        }
      }, _assertThisInitialized(_this));
      _this.on('open', function () {
        if (this.selectAllWhenFocus) {
          this.selectAll();
        }
        this.firstClickAfterOpen = true;
        gameObject.emit('open');
      }, _assertThisInitialized(_this)).on('close', function () {
        gameObject.emit('close');
      }, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(HiddenTextEdit, [{
      key: "initText",
      value: function initText() {
        var textObject = this.parent;
        this.prevCursorPosition = null;
        this.setText(textObject.text);
        return this;
      }
    }, {
      key: "updateText",
      value: function updateText() {
        var textObject = this.parent;
        var text = this.text;
        if (this.onUpdateCallback) {
          var newText = this.onUpdateCallback(text, textObject, this);
          if (newText != null) {
            text = newText;
          }
        }
        if (textObject.text !== text) {
          textObject.setText(text);
          textObject.emit('textchange', text, textObject, this);
        }
        if (this.isOpened) {
          if (this.selectionStart !== this.selectionEnd) {
            ClearCursor(this);
            OnSelectRange(this);
          } else {
            ClearSelectRange(this);
            MoveCursor(this);
          }
        } else {
          ClearSelectRange(this);
          ClearCursor(this);
        }
        return this;
      }
    }, {
      key: "setNumberInput",
      value: function setNumberInput() {
        this.onUpdateCallback = NumberInputUpdateCallback;
        return this;
      }
    }, {
      key: "setSelectAllWhenFocusEnable",
      value: function setSelectAllWhenFocusEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.selectAllWhenFocus = enable;
        return this;
      }
    }]);
    return HiddenTextEdit;
  }(HiddenTextEditBase);

  var GetValue$n = Phaser.Utils.Objects.GetValue;
  var PropertiesList = ['inputType', 'onOpen', 'onFocus', 'onClose', 'onBlur', 'onUpdate', 'enterClose', 'readOnly', 'maxLength', 'minLength', 'selectAll'];
  var CreateHiddenTextEdit = function CreateHiddenTextEdit(parent, parentConfig) {
    var config = GetValue$n(parentConfig, 'edit');
    if (config === undefined) {
      config = {};
    }
    CopyProperty(parentConfig, config, PropertiesList);
    return new HiddenTextEdit(parent, config);
  };

  var HasValue = function HasValue(source, key) {
    if (!source || typeof source === 'number') {
      return false;
    } else if (source.hasOwnProperty(key)) {
      return true;
    } else if (key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var parent = source;

      //  Use for loop here so we can break early
      for (var i = 0; i < keys.length; i++) {
        if (parent.hasOwnProperty(keys[i])) {
          parent = parent[keys[i]];
        } else {
          //  Can't go any further
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  };

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

  var InjectDefaultConfig = function InjectDefaultConfig(config) {
    if (!HasValue(config, 'wrap.vAlign')) {
      SetValue(config, 'wrap.vAlign', 'center');
    }
    if (!HasValue(config, 'wrap.charWrap')) {
      SetValue(config, 'wrap.charWrap', true);
    }
    if (!HasValue(config, 'wrap.maxLines')) {
      SetValue(config, 'wrap.maxLines', 1);
    }
    if (!HasValue(config, 'wrap.useDefaultTextHeight')) {
      SetValue(config, 'wrap.useDefaultTextHeight', true);
    }
    return config;
  };

  var IsEmpty = function IsEmpty(source) {
    for (var k in source) {
      return false;
    }
    return true;
  };

  var RegisterCursorStyle = function RegisterCursorStyle(cursorStyle) {
    if (IsEmpty(cursorStyle)) {
      return;
    }
    this.setCursorStyle(cursorStyle).on('cursorin', function (child) {
      var cursorStyle = this.cursorStyle;
      var styleSave = GetPartialData(child.style, cursorStyle);
      if (IsKeyValueEqual(cursorStyle, styleSave)) {
        return;
      }
      child.styleSave = styleSave;
      child.modifyStyle(cursorStyle);
    }, this).on('cursorout', function (child) {
      if (!child.styleSave) {
        return;
      }
      child.modifyStyle(child.styleSave);
      child.styleSave = undefined;
    }, this);
  };

  var RegisterFocusStyle = function RegisterFocusStyle(focusStyle) {
    if (IsEmpty(focusStyle)) {
      return;
    }
    this.setFocusStyle(focusStyle).on('open', function () {
      var child = this.background;
      var focusStyle = this.focusStyle;
      var styleSave = GetPartialData(child, focusStyle);
      if (IsKeyValueEqual(focusStyle, styleSave)) {
        return;
      }
      child.styleSave = styleSave;
      child.modifyStyle(focusStyle);
    }, this).on('close', function () {
      var child = this.background;
      if (!child.styleSave) {
        return;
      }
      child.modifyStyle(child.styleSave);
      child.styleSave = undefined;
    }, this);
  };

  var AddLastInsertCursor = function AddLastInsertCursor(textObject) {
    var child = textObject.createCharChild('|'); // Use '|' to update render size
    child.text = ''; // Render empty string ''

    // Invoke DynamicText's addChild method directly
    AddChild.call(textObject, child);
    return child;
  };

  function Diff() {}
  Diff.prototype = {
    diff: function diff(oldString, newString) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = options.callback;
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      this.options = options;
      var self = this;
      function done(value) {
        if (callback) {
          setTimeout(function () {
            callback(undefined, value);
          }, 0);
          return true;
        } else {
          return value;
        }
      }

      // Allow subclasses to massage the input prior to running
      oldString = this.castInput(oldString);
      newString = this.castInput(newString);
      oldString = this.removeEmpty(this.tokenize(oldString));
      newString = this.removeEmpty(this.tokenize(newString));
      var newLen = newString.length,
        oldLen = oldString.length;
      var editLength = 1;
      var maxEditLength = newLen + oldLen;
      if (options.maxEditLength) {
        maxEditLength = Math.min(maxEditLength, options.maxEditLength);
      }
      var bestPath = [{
        newPos: -1,
        components: []
      }];

      // Seed editLength = 0, i.e. the content starts with the same values
      var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
      if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
        // Identity per the equality and tokenizer
        return done([{
          value: this.join(newString),
          count: newString.length
        }]);
      }

      // Main worker method. checks all permutations of a given edit length for acceptance.
      function execEditLength() {
        for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
          var basePath = void 0;
          var addPath = bestPath[diagonalPath - 1],
            removePath = bestPath[diagonalPath + 1],
            _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
          if (addPath) {
            // No one else is going to attempt to use this value, clear it
            bestPath[diagonalPath - 1] = undefined;
          }
          var canAdd = addPath && addPath.newPos + 1 < newLen,
            canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
          if (!canAdd && !canRemove) {
            // If this path is a terminal then prune
            bestPath[diagonalPath] = undefined;
            continue;
          }

          // Select the diagonal that we want to branch from. We select the prior
          // path whose position in the new string is the farthest from the origin
          // and does not pass the bounds of the diff graph
          if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
            basePath = clonePath(removePath);
            self.pushComponent(basePath.components, undefined, true);
          } else {
            basePath = addPath; // No need to clone, we've pulled it from the list
            basePath.newPos++;
            self.pushComponent(basePath.components, true, undefined);
          }
          _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);

          // If we have hit the end of both strings, then we are done
          if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
            return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
          } else {
            // Otherwise track this path as a potential candidate and continue.
            bestPath[diagonalPath] = basePath;
          }
        }
        editLength++;
      }

      // Performs the length of edit iteration. Is a bit fugly as this has to support the
      // sync and async mode which is never fun. Loops over execEditLength until a value
      // is produced, or until the edit length exceeds options.maxEditLength (if given),
      // in which case it will return undefined.
      if (callback) {
        (function exec() {
          setTimeout(function () {
            if (editLength > maxEditLength) {
              return callback();
            }
            if (!execEditLength()) {
              exec();
            }
          }, 0);
        })();
      } else {
        while (editLength <= maxEditLength) {
          var ret = execEditLength();
          if (ret) {
            return ret;
          }
        }
      }
    },
    pushComponent: function pushComponent(components, added, removed) {
      var last = components[components.length - 1];
      if (last && last.added === added && last.removed === removed) {
        // We need to clone here as the component clone operation is just
        // as shallow array clone
        components[components.length - 1] = {
          count: last.count + 1,
          added: added,
          removed: removed
        };
      } else {
        components.push({
          count: 1,
          added: added,
          removed: removed
        });
      }
    },
    extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
      var newLen = newString.length,
        oldLen = oldString.length,
        newPos = basePath.newPos,
        oldPos = newPos - diagonalPath,
        commonCount = 0;
      while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
        newPos++;
        oldPos++;
        commonCount++;
      }
      if (commonCount) {
        basePath.components.push({
          count: commonCount
        });
      }
      basePath.newPos = newPos;
      return oldPos;
    },
    equals: function equals(left, right) {
      if (this.options.comparator) {
        return this.options.comparator(left, right);
      } else {
        return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
      }
    },
    removeEmpty: function removeEmpty(array) {
      var ret = [];
      for (var i = 0; i < array.length; i++) {
        if (array[i]) {
          ret.push(array[i]);
        }
      }
      return ret;
    },
    castInput: function castInput(value) {
      return value;
    },
    tokenize: function tokenize(value) {
      return value.split('');
    },
    join: function join(chars) {
      return chars.join('');
    }
  };
  function buildValues(diff, components, newString, oldString, useLongestToken) {
    var componentPos = 0,
      componentLen = components.length,
      newPos = 0,
      oldPos = 0;
    for (; componentPos < componentLen; componentPos++) {
      var component = components[componentPos];
      if (!component.removed) {
        if (!component.added && useLongestToken) {
          var value = newString.slice(newPos, newPos + component.count);
          value = value.map(function (value, i) {
            var oldValue = oldString[oldPos + i];
            return oldValue.length > value.length ? oldValue : value;
          });
          component.value = diff.join(value);
        } else {
          component.value = diff.join(newString.slice(newPos, newPos + component.count));
        }
        newPos += component.count;

        // Common case
        if (!component.added) {
          oldPos += component.count;
        }
      } else {
        component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
        oldPos += component.count;

        // Reverse add and remove so removes are output first to match common convention
        // The diffing algorithm is tied to add then remove output and this is the simplest
        // route to get the desired output with minimal overhead.
        if (componentPos && components[componentPos - 1].added) {
          var tmp = components[componentPos - 1];
          components[componentPos - 1] = components[componentPos];
          components[componentPos] = tmp;
        }
      }
    }

    // Special case handle for when one terminal is ignored (i.e. whitespace).
    // For this case we merge the terminal into the prior string and drop the change.
    // This is only available for string mode.
    var lastComponent = components[componentLen - 1];
    if (componentLen > 1 && typeof lastComponent.value === 'string' && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
      components[componentLen - 2].value += lastComponent.value;
      components.pop();
    }
    return components;
  }
  function clonePath(path) {
    return {
      newPos: path.newPos,
      components: path.components.slice(0)
    };
  }

  var characterDiff = new Diff();
  function diffChars(oldStr, newStr, options) {
    return characterDiff.diff(oldStr, newStr, options);
  }

  // Based on https://en.wikipedia.org/wiki/Latin_script_in_Unicode
  //
  // Ranges and exceptions:
  // Latin-1 Supplement, 0080–00FF
  //  - U+00D7  × Multiplication sign
  //  - U+00F7  ÷ Division sign
  // Latin Extended-A, 0100–017F
  // Latin Extended-B, 0180–024F
  // IPA Extensions, 0250–02AF
  // Spacing Modifier Letters, 02B0–02FF
  //  - U+02C7  ˇ &#711;  Caron
  //  - U+02D8  ˘ &#728;  Breve
  //  - U+02D9  ˙ &#729;  Dot Above
  //  - U+02DA  ˚ &#730;  Ring Above
  //  - U+02DB  ˛ &#731;  Ogonek
  //  - U+02DC  ˜ &#732;  Small Tilde
  //  - U+02DD  ˝ &#733;  Double Acute Accent
  // Latin Extended Additional, 1E00–1EFF
  var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
  var reWhitespace = /\S/;
  var wordDiff = new Diff();
  wordDiff.equals = function (left, right) {
    if (this.options.ignoreCase) {
      left = left.toLowerCase();
      right = right.toLowerCase();
    }
    return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
  };
  wordDiff.tokenize = function (value) {
    // All whitespace symbols except newline group into one token, each newline - in separate token
    var tokens = value.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/);

    // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.
    for (var i = 0; i < tokens.length - 1; i++) {
      // If we have an empty string in the next field and we have only word chars before and after, merge
      if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
        tokens[i] += tokens[i + 2];
        tokens.splice(i + 1, 2);
        i--;
      }
    }
    return tokens;
  };

  var lineDiff = new Diff();
  lineDiff.tokenize = function (value) {
    var retLines = [],
      linesAndNewlines = value.split(/(\n|\r\n)/);

    // Ignore the final empty token that occurs if the string ends with a new line
    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
      linesAndNewlines.pop();
    }

    // Merge the content and line separators into single tokens
    for (var i = 0; i < linesAndNewlines.length; i++) {
      var line = linesAndNewlines[i];
      if (i % 2 && !this.options.newlineIsToken) {
        retLines[retLines.length - 1] += line;
      } else {
        if (this.options.ignoreWhitespace) {
          line = line.trim();
        }
        retLines.push(line);
      }
    }
    return retLines;
  };

  var sentenceDiff = new Diff();
  sentenceDiff.tokenize = function (value) {
    return value.split(/(\S.+?[.!?])(?=\s+|$)/);
  };

  var cssDiff = new Diff();
  cssDiff.tokenize = function (value) {
    return value.split(/([{}:;,]|\s+)/);
  };

  var objectPrototypeToString = Object.prototype.toString;
  var jsonDiff = new Diff();
  // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
  // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:
  jsonDiff.useLongestToken = true;
  jsonDiff.tokenize = lineDiff.tokenize;
  jsonDiff.castInput = function (value) {
    var _this$options = this.options,
      undefinedReplacement = _this$options.undefinedReplacement,
      _this$options$stringi = _this$options.stringifyReplacer,
      stringifyReplacer = _this$options$stringi === void 0 ? function (k, v) {
        return typeof v === 'undefined' ? undefinedReplacement : v;
      } : _this$options$stringi;
    return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');
  };
  jsonDiff.equals = function (left, right) {
    return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'));
  };

  // This function handles the presence of circular references by bailing out when encountering an
  // object that is already on the "stack" of items being processed. Accepts an optional replacer
  function canonicalize(obj, stack, replacementStack, replacer, key) {
    stack = stack || [];
    replacementStack = replacementStack || [];
    if (replacer) {
      obj = replacer(key, obj);
    }
    var i;
    for (i = 0; i < stack.length; i += 1) {
      if (stack[i] === obj) {
        return replacementStack[i];
      }
    }
    var canonicalizedObj;
    if ('[object Array]' === objectPrototypeToString.call(obj)) {
      stack.push(obj);
      canonicalizedObj = new Array(obj.length);
      replacementStack.push(canonicalizedObj);
      for (i = 0; i < obj.length; i += 1) {
        canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
      }
      stack.pop();
      replacementStack.pop();
      return canonicalizedObj;
    }
    if (obj && obj.toJSON) {
      obj = obj.toJSON();
    }
    if (_typeof(obj) === 'object' && obj !== null) {
      stack.push(obj);
      canonicalizedObj = {};
      replacementStack.push(canonicalizedObj);
      var sortedKeys = [],
        _key;
      for (_key in obj) {
        /* istanbul ignore else */
        if (obj.hasOwnProperty(_key)) {
          sortedKeys.push(_key);
        }
      }
      sortedKeys.sort();
      for (i = 0; i < sortedKeys.length; i += 1) {
        _key = sortedKeys[i];
        canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
      }
      stack.pop();
      replacementStack.pop();
    } else {
      canonicalizedObj = obj;
    }
    return canonicalizedObj;
  }

  var arrayDiff = new Diff();
  arrayDiff.tokenize = function (value) {
    return value.slice();
  };
  arrayDiff.join = arrayDiff.removeEmpty = function (value) {
    return value;
  };

  var RemoveItem$1 = Phaser.Utils.Array.Remove;
  var SetText = function SetText(textObject, newText) {
    var text = textObject.text;
    if (newText === text) {
      return;
    }

    // textObject.setText(newText);

    // Remove lastInsertCursor directly 
    RemoveItem$1(textObject.children, textObject.lastInsertCursor);
    if (newText === '') {
      textObject.removeChildren();
    } else {
      var results = diffChars(text, newText);
      var charIndex = 0;
      for (var i = 0, cnt = results.length; i < cnt; i++) {
        var result = results[i];
        if (result.removed) {
          // Remove character at charIndex
          textObject.removeText(charIndex, result.count);
        } else if (result.added) {
          textObject.insertText(charIndex, result.value);
          charIndex += result.count;
        } else {
          charIndex += result.count;
        }
      }
    }

    // Push back lastInsertCursor directly
    textObject.children.push(textObject.lastInsertCursor);
    textObject.runWordWrap();
  };

  var IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
  var CanvasInput = /*#__PURE__*/function (_DynamicText) {
    _inherits(CanvasInput, _DynamicText);
    var _super = _createSuper(CanvasInput);
    function CanvasInput(scene, x, y, fixedWidth, fixedHeight, config) {
      var _this;
      _classCallCheck(this, CanvasInput);
      if (IsPlainObject$1(x)) {
        config = x;
      } else if (IsPlainObject$1(fixedWidth)) {
        config = fixedWidth;
      }
      if (config === undefined) {
        config = {};
      }
      InjectDefaultConfig(config);

      // Set text later
      var text = config.text;
      if (text) {
        delete config.text;
      }
      var focusStyle = ExtractByPrefix(config.background, 'focus');
      var cursorStyle = ExtractByPrefix(config.style, 'cursor');
      _this = _super.call(this, scene, x, y, fixedWidth, fixedHeight, config);
      _this.type = 'rexCanvasInput';
      _this._text = '';
      _this.textEdit = CreateHiddenTextEdit(_assertThisInitialized(_this), config);
      if (config.focusStyle) {
        Object.assign(focusStyle, config.focusStyle);
      }
      RegisterFocusStyle.call(_assertThisInitialized(_this), focusStyle);
      if (config.cursorStyle) {
        Object.assign(cursorStyle, config.cursorStyle);
      }
      RegisterCursorStyle.call(_assertThisInitialized(_this), cursorStyle);
      var addCharCallback = config.onAddChar;
      if (addCharCallback) {
        _this.on('addchar', addCharCallback);
      }
      var cursorOutCallback = config.onCursorOut;
      if (cursorOutCallback) {
        _this.on('cursorout', cursorOutCallback);
      }
      var cursorInCallback = config.onCursorIn;
      if (cursorInCallback) {
        _this.on('cursorin', cursorInCallback);
      }
      var moveCursorCallback = config.onMoveCursor;
      if (moveCursorCallback) {
        _this.on('movecursor', moveCursorCallback);
      }
      _this.setParseTextCallback(config.parseTextCallback);
      _this.lastInsertCursor = AddLastInsertCursor(_assertThisInitialized(_this));
      if (text) {
        _this.setText(text);
      } else {
        // Still need run word wrap for lastInsertCursor child
        _this.runWordWrap();
      }
      return _this;
    }
    _createClass(CanvasInput, [{
      key: "addChild",
      value: function addChild(child, index) {
        _get(_getPrototypeOf(CanvasInput.prototype), "addChild", this).call(this, child, index);
        if (Array.isArray(child)) {
          var children = child;
          for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (IsChar(child)) {
              this.emit('addchar', child, index + i, this);
            }
          }
        } else {
          if (IsChar(child)) {
            this.emit('addchar', child, index, this);
          }
        }
        return this;
      }
    }, {
      key: "text",
      get: function get() {
        return this._text;
      },
      set: function set(value) {
        if (value == null) {
          value = '';
        } else {
          value = value.toString();
        }
        if (this._text === value) {
          return;
        }
        SetText(this, value);
        this._text = value;
      }
    }, {
      key: "setText",
      value: function setText(text) {
        this.text = text;
        return this;
      }
    }, {
      key: "appendText",
      value: function appendText(text) {
        this.setText(this.text + text);
        return this;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        if (this.width === width && this.height === height) {
          return this;
        }
        _get(_getPrototypeOf(CanvasInput.prototype), "setSize", this).call(this, width, height);

        // Run wrap again since fixedWidth and fixedHeight are changed
        this.runWrap();
        return this;
      }
    }, {
      key: "displayText",
      get: function get() {
        return this.text;
      },
      set: function set(value) {
        this.text = value;
      }
    }, {
      key: "setDisplayText",
      value: function setDisplayText(value) {
        this.displayText = value;
        return this;
      }
    }, {
      key: "inputText",
      get: function get() {
        return this.textEdit.text;
      },
      set: function set(value) {
        this.textEdit.text = value;
      }
    }, {
      key: "setInputText",
      value: function setInputText(value) {
        this.inputText = value;
        return this;
      }
    }, {
      key: "setParseTextCallback",
      value: function setParseTextCallback(callback) {
        if (!callback) {
          callback = DefaultParseTextCallback;
        }
        this.parseTextCallback = callback;
        return this;
      }
    }, {
      key: "value",
      get: function get() {
        return this.parseTextCallback(this.text);
      },
      set: function set(value) {
        this.setText(value);
      }
    }, {
      key: "getValue",
      value: function getValue() {
        return this.value;
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }
    }, {
      key: "readOnly",
      get: function get() {
        return this.textEdit.readOnly;
      },
      set: function set(value) {
        this.textEdit.readOnly = value;
      }
    }, {
      key: "setReadOnly",
      value: function setReadOnly(value) {
        this.textEdit.setReadOnly(value);
        return this;
      }
    }, {
      key: "open",
      value: function open(onCloseCallback) {
        if (onCloseCallback) {
          this.textEdit.once('close', onCloseCallback);
        }
        this.textEdit.open();
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        this.textEdit.close();
        return this;
      }
    }, {
      key: "isOpened",
      get: function get() {
        return this.textEdit.isOpened;
      }
    }, {
      key: "setFocusStyle",
      value: function setFocusStyle(style) {
        this.focusStyle = style;
        return this;
      }
    }, {
      key: "setCursorStyle",
      value: function setCursorStyle(style) {
        this.cursorStyle = style;
        return this;
      }
    }, {
      key: "setNumberInput",
      value: function setNumberInput() {
        this.textEdit.setNumberInput();
        this.parseTextCallback = Number;
        return this;
      }
    }, {
      key: "maxLength",
      get: function get() {
        return this.textEdit.maxLength;
      },
      set: function set(value) {
        this.textEdit.maxLength = value;
      }
    }, {
      key: "setMaxLength",
      value: function setMaxLength(value) {
        this.maxLength = value;
        return this;
      }
    }, {
      key: "minLength",
      get: function get() {
        return this.textEdit.minLength;
      },
      set: function set(value) {
        this.textEdit.minLength = value;
      }
    }, {
      key: "setMinLength",
      value: function setMinLength(value) {
        this.minLength = value;
        return this;
      }
    }]);
    return CanvasInput;
  }(DynamicText);
  var DefaultParseTextCallback = function DefaultParseTextCallback(text) {
    return text;
  };

  var CreateInputText = function CreateInputText(scene, config) {
    config = config ? DeepClone(config) : {};
    var inputText = new CanvasInput(scene, config);
    scene.add.existing(inputText);
    return inputText;
  };

  var TextInput = /*#__PURE__*/function (_InputFiledBase) {
    _inherits(TextInput, _InputFiledBase);
    var _super = _createSuper(TextInput);
    function TextInput(scene, config) {
      var _this;
      _classCallCheck(this, TextInput);
      if (config === undefined) {
        config = {};
      }
      _this = _super.call(this, scene);
      _this.type = 'rexTweaker.TextInput';
      var inputTextConfig = config.inputText;
      var inputText = CreateInputText(scene, inputTextConfig);
      _this.add(inputText, {
        proportion: 1,
        expand: true
      });
      _this.addChildrenMap('inputText', inputText);
      inputText.on('close', function () {
        this.setValue(inputText.value);
      }, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(TextInput, [{
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this._value === value) {
          return;
        }
        var text = this.textFormatCallback ? this.textFormatCallback(value) : value;
        this.childrenMap.inputText.setText(text);
        _set(_getPrototypeOf(TextInput.prototype), "value", value, this, true);
      }
    }, {
      key: "setInputTextReadOnly",
      value: function setInputTextReadOnly(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.childrenMap.inputText.setReadOnly(enable);
        return this;
      }
    }]);
    return TextInput;
  }(InputFiledBase);

  var CreateTextInput = function CreateTextInput(scene, config, style) {
    var gameObject = new TextInput(scene, style);
    scene.add.existing(gameObject);
    gameObject.setInputTextReadOnly(!!config.inputTextReadOnly);
    return gameObject;
  };

  var NumberInput = /*#__PURE__*/function (_InputFiledBase) {
    _inherits(NumberInput, _InputFiledBase);
    var _super = _createSuper(NumberInput);
    function NumberInput(scene, config) {
      var _this;
      _classCallCheck(this, NumberInput);
      if (config === undefined) {
        config = {};
      }
      _this = _super.call(this, scene);
      _this.type = 'rexTweaker.NumberInput';
      var inputTextConfig = config.inputNumber || config.inputText;
      var inputText = CreateInputText(scene, inputTextConfig).setNumberInput();
      _this.add(inputText, {
        proportion: 1,
        expand: true
      });
      _this.addChildrenMap('inputText', inputText);
      inputText.on('close', function () {
        this.setValue(inputText.value);
      }, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(NumberInput, [{
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this._value === value) {
          return;
        }
        var text = this.textFormatCallback ? this.textFormatCallback(value) : value;
        this.childrenMap.inputText.setText(text);
        _set(_getPrototypeOf(NumberInput.prototype), "value", value, this, true);
      }
    }, {
      key: "setInputTextReadOnly",
      value: function setInputTextReadOnly(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.childrenMap.inputText.setReadOnly(enable);
        return this;
      }
    }]);
    return NumberInput;
  }(InputFiledBase);

  var CreateNumberInput = function CreateNumberInput(scene, config, style) {
    var gameObject = new NumberInput(scene, style);
    scene.add.existing(gameObject);
    gameObject.setInputTextReadOnly(!!config.inputTextReadOnly);
    return gameObject;
  };

  var Linear$3 = Phaser.Math.Linear;
  var Percent$5 = Phaser.Math.Percent;
  var ProgressValueMethods = {
    setValue: function setValue(value, min, max) {
      if (value === undefined || value === null) {
        return this;
      }
      if (min !== undefined) {
        value = Percent$5(value, min, max);
      }
      this.value = value;
      return this;
    },
    addValue: function addValue(inc, min, max) {
      if (min !== undefined) {
        inc = Percent$5(inc, min, max);
      }
      this.value += inc;
      return this;
    },
    getValue: function getValue(min, max) {
      var value = this.value;
      if (min !== undefined) {
        value = Linear$3(min, max, value);
      }
      return value;
    }
  };

  var Percent$4 = Phaser.Math.Percent;
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
      value = Percent$4(value, min, max);
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

  var GetValue$m = Phaser.Utils.Objects.GetValue;
  var Clamp$3 = Phaser.Math.Clamp;
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
          this.eventEmitter = GetValue$m(config, 'eventEmitter', this);
          var callback = GetValue$m(config, 'valuechangeCallback', null);
          if (callback !== null) {
            var scope = GetValue$m(config, 'valuechangeCallbackScope', undefined);
            this.eventEmitter.on('valuechange', callback, scope);
          }
          this.setEaseValuePropName('value').setEaseValueDuration(GetValue$m(config, 'easeValue.duration', 0)).setEaseValueFunction(GetValue$m(config, 'easeValue.ease', 'Linear'));
          return this;
        }
      }, {
        key: "value",
        get: function get() {
          return this._value;
        },
        set: function set(value) {
          value = Clamp$3(value, 0, 1);
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

  var Percent$3 = Phaser.Math.Percent;
  var PositionToPercent = function PositionToPercent(startPoint, endPoint, currentPoint) {
    var value;
    if (startPoint.y === endPoint.y) {
      value = Percent$3(currentPoint.x, startPoint.x, endPoint.x);
    } else if (startPoint.x === endPoint.x) {
      value = Percent$3(currentPoint.y, startPoint.y, endPoint.y);
    }
    return value;
  };

  var OnDragThumb = function OnDragThumb(pointer, dragX, dragY) {
    if (!this.enable) {
      return;
    }
    tmpPoint$4.x = dragX;
    tmpPoint$4.y = dragY;
    var startPoint, endPoint;
    if (!this.reverseAxis) {
      startPoint = this.getStartPoint();
      endPoint = this.getEndPoint();
    } else {
      startPoint = this.getEndPoint();
      endPoint = this.getStartPoint();
    }
    this.value = PositionToPercent(startPoint, endPoint, tmpPoint$4);
  };
  var tmpPoint$4 = {};

  var OnTouchTrack = function OnTouchTrack(pointer, localX, localY) {
    if (!this.enable) {
      return;
    }
    if (!pointer.isDown) {
      return;
    }
    tmpPoint$3.x = pointer.worldX;
    tmpPoint$3.y = pointer.worldY;
    var startPoint, endPoint;
    if (!this.reverseAxis) {
      startPoint = this.getStartPoint();
      endPoint = this.getEndPoint();
    } else {
      startPoint = this.getEndPoint();
      endPoint = this.getStartPoint();
    }
    var value = PositionToPercent(startPoint, endPoint, tmpPoint$3);
    this.stopEaseValue();
    if (this.easeValueDuration === 0 || Math.abs(this.value - value) < 0.1) {
      this.value = value;
    } else {
      this.easeValueTo(value);
    }
  };
  var tmpPoint$3 = {};

  var GetThumbAlignPoint = function GetThumbAlignPoint(align, out) {
    if (out === undefined) {
      out = tmpPoint$2;
    }
    var thumb = this.childrenMap.thumb;
    var currentX = thumb.x;
    var currentY = thumb.y;
    AlignIn(thumb, this.innerLeft, this.innerTop, this.innerWidth, this.innerHeight, align);
    out.x = thumb.x;
    out.y = thumb.y;
    thumb.x = currentX;
    thumb.y = currentY;
    return out;
  };
  var tmpPoint$2 = {};

  var AlignLeft$1 = Phaser.Display.Align.LEFT_CENTER;
  var AlignTop$1 = Phaser.Display.Align.TOP_CENTER;
  var GetStartPoint = function GetStartPoint(out) {
    if (out === undefined) {
      out = tmpPoint$1;
    }
    if (this.childrenMap.thumb) {
      var align = this.orientation === 0 ? AlignLeft$1 : AlignTop$1;
      GetThumbAlignPoint.call(this, align, out);
    } else {
      if (this.orientation === 0) {
        out.x = this.innerLeft + 1; // Add 1 pixel margin
        out.y = this.centerY;
      } else {
        out.x = this.centerX;
        out.y = this.innerTop + 1; // Add 1 pixel margin
      }
    }

    return out;
  };
  var tmpPoint$1 = {};

  var AlignRight$1 = Phaser.Display.Align.RIGHT_CENTER;
  var AlignBottom$1 = Phaser.Display.Align.BOTTOM_CENTER;
  var GetEndoint = function GetEndoint(out) {
    if (out === undefined) {
      out = tmpPoint;
    }
    if (this.childrenMap.thumb) {
      var align = this.orientation === 0 ? AlignRight$1 : AlignBottom$1;
      GetThumbAlignPoint.call(this, align, out);
    } else {
      if (this.orientation === 0) {
        out.x = this.innerRight - 1; // Add 1 pixel margin
        out.y = this.centerY;
      } else {
        out.x = this.centerX;
        out.y = this.innerBottom - 1; // Add 1 pixel margin
      }
    }

    return out;
  };
  var tmpPoint = {};

  var Linear$2 = Phaser.Math.Linear;
  var PercentToPosition = function PercentToPosition(t, startPoint, endPoint, out) {
    if (out === undefined) {
      out = tmpOut;
    }
    out.x = Linear$2(startPoint.x, endPoint.x, t);
    out.y = Linear$2(startPoint.y, endPoint.y, t);
    return out;
  };
  var tmpOut = {};

  var UpdateThumb = function UpdateThumb(t) {
    var thumb = this.childrenMap.thumb;
    if (thumb === undefined) {
      return this;
    }
    if (t === undefined) {
      t = this.value;
    }
    var startPoint, endPoint;
    if (!this.reverseAxis) {
      startPoint = this.getStartPoint();
      endPoint = this.getEndPoint();
    } else {
      startPoint = this.getEndPoint();
      endPoint = this.getStartPoint();
    }
    PercentToPosition(t, startPoint, endPoint, thumb);
    this.resetChildPositionState(thumb);
    return this;
  };

  var AlignLeft = Phaser.Display.Align.LEFT_CENTER;
  var AlignTop = Phaser.Display.Align.TOP_CENTER;
  var AlignRight = Phaser.Display.Align.RIGHT_CENTER;
  var AlignBottom = Phaser.Display.Align.BOTTOM_CENTER;
  var UpdateIndicator = function UpdateIndicator(t) {
    var indicator = this.childrenMap.indicator;
    if (indicator === undefined) {
      return this;
    }
    if (t === undefined) {
      t = this.value;
    }
    var reverseAxis = this.reverseAxis;
    var newWidth, newHeight;
    var thumb = this.childrenMap.thumb;
    if (thumb) {
      if (this.orientation === 0) {
        // x, extend width
        var thumbWidth = GetDisplayWidth(thumb);
        if (!reverseAxis) {
          var thumbLeft = thumb.x - thumbWidth * thumb.originX;
          var thumbRight = thumbLeft + thumbWidth;
          newWidth = thumbRight - this.left;
        } else {
          var thumbLeft = thumb.x - thumbWidth * thumb.originX;
          newWidth = this.right - thumbLeft;
        }
      } else {
        // y, extend height
        var thumbHeight = GetDisplayHeight(thumb);
        if (!reverseAxis) {
          var thumbTop = thumb.y - thumbHeight * thumb.originY;
          var thumbBottom = thumbTop + thumbHeight;
          newHeight = thumbBottom - this.top;
        } else {
          var thumbTop = thumb.y - thumbHeight * thumb.originY;
          newHeight = this.bottom - thumbTop;
        }
      }
    } else {
      if (this.orientation === 0) {
        // x, extend width
        newWidth = this.width * t;
      } else {
        // y, extend eight
        newHeight = this.height * t;
      }
    }
    ResizeGameObject(indicator, newWidth, newHeight);
    var align;
    if (!reverseAxis) {
      align = this.orientation === 0 ? AlignLeft : AlignTop;
    } else {
      align = this.orientation === 0 ? AlignRight : AlignBottom;
    }
    QuickSet(indicator, this, align);
    this.resetChildPositionState(indicator);
  };

  var GetValue$l = Phaser.Utils.Objects.GetValue;
  var Clamp$2 = Phaser.Math.Clamp;
  var SnapTo = Phaser.Math.Snap.To;
  var Slider = /*#__PURE__*/function (_ProgressBase) {
    _inherits(Slider, _ProgressBase);
    var _super = _createSuper(Slider);
    function Slider(scene, config) {
      var _this;
      _classCallCheck(this, Slider);
      // Create sizer
      _this = _super.call(this, scene, config);
      _this.type = 'rexSlider';
      _this.bootProgressBase(config);
      _this.reverseAxis = GetValue$l(config, 'reverseAxis', false);

      // Add elements
      var background = GetValue$l(config, 'background', undefined);
      var track = GetValue$l(config, 'track', undefined);
      var indicator = GetValue$l(config, 'indicator', undefined);
      var thumb = GetValue$l(config, 'thumb', undefined);
      if (background) {
        _this.addBackground(background);
      }
      if (track) {
        _this.add(track, {
          proportion: 1,
          expand: true,
          minWidth: _this.orientation === 0 ? 0 : undefined,
          minHeight: _this.orientation === 1 ? 0 : undefined
        });
      }
      if (indicator) {
        _this.pin(indicator); // Put into container but not layout it
      }

      if (thumb) {
        _this.pin(thumb); // Put into container but not layout it
      }

      // Input
      var inputMode = GetValue$l(config, 'input', 0);
      if (typeof inputMode === 'string') {
        inputMode = INPUTMODE[inputMode];
      }
      switch (inputMode) {
        case 0:
          // 'drag'
          if (thumb) {
            thumb.setInteractive();
            _this.scene.input.setDraggable(thumb);
            thumb.on('drag', OnDragThumb, _assertThisInitialized(_this)).on('dragstart', function (pointer) {
              this.eventEmitter.emit('inputstart', pointer);
            }, _assertThisInitialized(_this)).on('dragend', function (pointer) {
              this.eventEmitter.emit('inputend', pointer);
            }, _assertThisInitialized(_this));
          }
          break;
        case 1:
          // 'click'
          _this.on('pointerdown', OnTouchTrack, _assertThisInitialized(_this)).on('pointermove', OnTouchTrack, _assertThisInitialized(_this)).on('pointerdown', function (pointer) {
            this.eventEmitter.emit('inputstart', pointer);
          }, _assertThisInitialized(_this)).on('pointerup', function (pointer) {
            this.eventEmitter.emit('inputend', pointer);
          }, _assertThisInitialized(_this)).on('pointerover', function (pointer) {
            if (pointer.isDown) {
              this.eventEmitter.emit('inputstart', pointer);
            }
          }, _assertThisInitialized(_this)).on('pointerout', function (pointer) {
            if (pointer.isDown) {
              this.eventEmitter.emit('inputend', pointer);
            }
          }, _assertThisInitialized(_this)).setInteractive();
          break;
      }
      _this.addChildrenMap('background', background);
      _this.addChildrenMap('track', track);
      _this.addChildrenMap('indicator', indicator);
      _this.addChildrenMap('thumb', thumb);
      _this.setEnable(GetValue$l(config, 'enable', undefined));
      _this.setGap(GetValue$l(config, 'gap', undefined));
      _this.setValue(GetValue$l(config, 'value', 0), GetValue$l(config, 'min', undefined), GetValue$l(config, 'max', undefined));
      return _this;
    }
    _createClass(Slider, [{
      key: "setEnable",
      value: function setEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.enable = enable;
        return this;
      }
    }, {
      key: "setGap",
      value: function setGap(gap, min, max) {
        if (gap && min !== undefined) {
          gap = gap / (max - min);
        }
        this.gap = gap;
        return this;
      }

      // Override
    }, {
      key: "value",
      get: function get() {
        return this._value;
      }

      // Override
      ,
      set: function set(value) {
        if (this.gap !== undefined) {
          value = SnapTo(value, this.gap);
        }
        var oldValue = this._value;
        this._value = Clamp$2(value, 0, 1);
        if (oldValue !== this._value) {
          this.updateThumb(this._value);
          this.updateIndicator(this._value);
          this.eventEmitter.emit('valuechange', this._value, oldValue, this.eventEmitter);
        }
      }
    }, {
      key: "runLayout",
      value: function runLayout(parent, newWidth, newHeight) {
        // Skip hidden or !dirty sizer
        if (this.ignoreLayout) {
          return this;
        }
        _get(_getPrototypeOf(Slider.prototype), "runLayout", this).call(this, parent, newWidth, newHeight);
        this.updateThumb();
        this.updateIndicator();
        return this;
      }
    }]);
    return Slider;
  }(ProgressBase(Sizer));
  var INPUTMODE = {
    pan: 0,
    drag: 0,
    click: 1,
    none: -1
  };
  var methods$5 = {
    getStartPoint: GetStartPoint,
    getEndPoint: GetEndoint,
    updateThumb: UpdateThumb,
    updateIndicator: UpdateIndicator
  };
  Object.assign(Slider.prototype, methods$5);

  var BuildSliderConfig = function BuildSliderConfig(scene, config) {
    config = config ? DeepClone(config) : {};
    if (config.track) {
      config.track = CreateRoundRectangle(scene, config.track);
    }
    if (config.indicator) {
      config.indicator = CreateRoundRectangle(scene, config.indicator);
    }
    var thumbConfig = config.thumb;
    if (thumbConfig) {
      config.thumb = CreateRoundRectangle(scene, thumbConfig);
    }
    return config;
  };

  var CreateSlider = function CreateSlider(scene, config) {
    config = BuildSliderConfig(scene, config);
    var gameObject = new Slider(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var GetValue$k = Phaser.Utils.Objects.GetValue;
  var Linear$1 = Phaser.Math.Linear;
  var SnapFloor = Phaser.Math.Snap.Floor;
  var RangeInput = /*#__PURE__*/function (_InputFiledBase) {
    _inherits(RangeInput, _InputFiledBase);
    var _super = _createSuper(RangeInput);
    function RangeInput(scene, config) {
      var _this;
      _classCallCheck(this, RangeInput);
      if (config === undefined) {
        config = {};
      }
      _this = _super.call(this, scene);
      _this.type = 'rexTweaker.RangeInput';
      var sliderConfig = config.slider;
      var trackSizeKey = _this.orientation === 0 ? 'track.height' : 'track.width';
      var trackSize = GetValue$k(sliderConfig, trackSizeKey);
      var slider = CreateSlider(scene, sliderConfig);
      var proportion = GetValue$k(config, 'proportion.range.slider', 2);
      var expand = trackSize === undefined;
      _this.add(slider, {
        proportion: proportion,
        expand: expand
      });
      var inputTextConfig = config.inputNumber || config.inputText;
      var inputText = CreateInputText(scene, inputTextConfig).setNumberInput();
      var proportion = GetValue$k(config, 'proportion.range.inputText', 1);
      _this.add(inputText, {
        proportion: proportion,
        expand: true
      });
      _this.addChildrenMap('slider', slider);
      _this.addChildrenMap('inputText', inputText);
      inputText.on('close', function () {
        this.setValue(inputText.value);
      }, _assertThisInitialized(_this));
      slider.on('valuechange', function () {
        var value = Linear$1(this.minValue, this.maxValue, slider.value);
        if (this.step) {
          value = SnapFloor(value, this.step, this.minValue);
        }
        this.setValue(value);
      }, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(RangeInput, [{
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this._value === value) {
          return;
        }
        var text = this.textFormatCallback ? this.textFormatCallback(value) : value;
        this.childrenMap.inputText.setText('').setText(text);
        this.childrenMap.slider.setValue(value, this.minValue, this.maxValue);
        _set(_getPrototypeOf(RangeInput.prototype), "value", value, this, true);
      }
    }, {
      key: "setRange",
      value: function setRange(min, max, step) {
        this.minValue = min;
        this.maxValue = max;
        this.step = step;
        this.childrenMap.slider.setGap(step, min, max);
        return this;
      }
    }, {
      key: "setInputTextReadOnly",
      value: function setInputTextReadOnly(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.childrenMap.inputText.setReadOnly(enable);
        return this;
      }
    }]);
    return RangeInput;
  }(InputFiledBase);

  var CreateRangeInput = function CreateRangeInput(scene, config, style) {
    var gameObject = new RangeInput(scene, style);
    scene.add.existing(gameObject);
    gameObject.setRange(config.min, config.max, config.step);
    gameObject.setInputTextReadOnly(!!config.inputTextReadOnly);
    return gameObject;
  };

  var BuildListConfig = function BuildListConfig(scene, config) {
    config = config ? DeepClone(config) : {};
    var labelConfig = config.label || config.button;
    var listButtonConfig = config.button || config.label;
    delete config.label;
    delete config.button;
    var listConfig = BuildDisplayLabelConfig(scene, labelConfig);
    listConfig.list = config;
    listConfig.list.createButtonCallback = function (scene, option) {
      var gameObject = CreateInteractiveLabel(scene, listButtonConfig).resetDisplayContent({
        text: option.text
      });
      return gameObject;
    };
    listConfig.list.onButtonOver = function (button, index, pointer, event) {
      button.setActiveState(true);
    };
    listConfig.list.onButtonOut = function (button, index, pointer, event) {
      button.setActiveState(false);
    };
    return listConfig;
  };

  var methods$4 = {
    setWrapEnable: function setWrapEnable(enable) {
      if (enable === undefined) {
        enable = true;
      }
      this.listWrapEnable = enable;
      return this;
    },
    setCreateButtonCallback: function setCreateButtonCallback(callback) {
      this.listCreateButtonCallback = callback;
      return this;
    },
    setCreateListBackgroundCallback: function setCreateListBackgroundCallback(callback) {
      this.listCreateBackgroundCallback = callback;
      return this;
    },
    setButtonClickCallback: function setButtonClickCallback(callback) {
      this.listOnButtonClick = callback;
      return this;
    },
    setButtonOverCallback: function setButtonOverCallback(callback) {
      this.listOnButtonOver = callback;
      return this;
    },
    setButtonOutCallback: function setButtonOutCallback(callback) {
      this.listOnButtonOut = callback;
      return this;
    },
    setListExpandDirection: function setListExpandDirection(direction) {
      if (typeof direction === 'string') {
        direction = ListExpandDirections[direction];
      }
      this.listExpandDirection = direction;
      return this;
    },
    setListEaseInDuration: function setListEaseInDuration(duration) {
      if (duration === undefined) {
        duration = 0;
      }
      this.listEaseInDuration = duration;
      return this;
    },
    setListEaseOutDuration: function setListEaseOutDuration(duration) {
      if (duration === undefined) {
        duration = 0;
      }
      this.listEaseOutDuration = duration;
      return this;
    },
    setListTransitInCallback: function setListTransitInCallback(callback) {
      this.listTransitInCallback = callback;
      // callback = function(gameObject, duration) {}
      return this;
    },
    settListTransitOutCallback: function settListTransitOutCallback(callback) {
      this.listTransitOutCallback = callback;
      // callback = function(gameObject, duration) {}
      return this;
    },
    setListBounds: function setListBounds(bounds) {
      this.listBounds = bounds;
      return this;
    },
    setListWidth: function setListWidth(width) {
      this.listWidth = width;
      return this;
    },
    setListHeight: function setListHeight(height) {
      this.listHeight = height;
      return this;
    },
    setListSize: function setListSize(width, height) {
      this.setListWidth(width).setListHeight(height);
      return this;
    },
    setListAlignmentMode: function setListAlignmentMode(mode) {
      this.listAlignMode = mode;
      return this;
    },
    setListSpace: function setListSpace(space) {
      if (space === undefined) {
        space = {};
      }
      this.listSpace = space;
      return this;
    },
    setListDraggable: function setListDraggable(enable) {
      if (enable === undefined) {
        enable = true;
      }
      this.listDraggable = enable;
      return this;
    }
  };
  var ListExpandDirections = {
    down: 0,
    up: 1
  };

  var CreateListPanel = function CreateListPanel() {
    var scene = this.scene;
    var background;
    var createBackgroundCallback = this.listCreateBackgroundCallback;
    if (createBackgroundCallback) {
      background = createBackgroundCallback.call(this, scene);
      scene.add.existing(background);
    }
    var buttons = [];
    var createButtonCallback = this.listCreateButtonCallback;
    if (createButtonCallback) {
      var options = this.options;
      for (var i = 0, cnt = options.length; i < cnt; i++) {
        var button = createButtonCallback.call(this, scene, options[i], i, options);
        scene.add.existing(button);
        buttons.push(button);
      }
    }
    var width = this.listWidth;
    if (width === undefined) {
      if (this.listAlignMode === 'text') {
        width = this.getElement('text').width;
      } else {
        width = this.width;
      }
    }
    var height = this.listHeight;
    var listPanel;
    if (!this.listWrapEnable) {
      listPanel = new Buttons$1(scene, {
        width: width,
        height: height,
        orientation: 'y',
        background: background,
        buttons: buttons,
        space: this.listSpace,
        draggable: this.listDraggable
      });
    } else {
      listPanel = new Buttons(scene, {
        width: width,
        height: height,
        background: background,
        buttons: buttons,
        space: this.listSpace,
        draggable: this.listDraggable
      });
    }
    scene.add.existing(listPanel);
    return listPanel;
  };

  var State = /*#__PURE__*/function (_FSM) {
    _inherits(State, _FSM);
    var _super = _createSuper(State);
    function State(parent, config) {
      var _this;
      _classCallCheck(this, State);
      _this = _super.call(this, config);
      _this.parent = parent;
      _this.init();
      return _this;
    }
    _createClass(State, [{
      key: "init",
      value: function init() {
        this.start('IDLE');
      }

      // IDLE -> TRANS_OPNE
    }, {
      key: "next_IDLE",
      value: function next_IDLE() {
        return 'TRANS_OPNE';
      }
      // IDLE

      // TRANS_OPNE -> OPEN
    }, {
      key: "next_TRANS_OPNE",
      value: function next_TRANS_OPNE() {
        return 'OPEN';
      }
    }, {
      key: "enter_TRANS_OPNE",
      value: function enter_TRANS_OPNE() {
        var transitionBehavior = this.parent;
        transitionBehavior.transitionIn();
        transitionBehavior.delayCall(transitionBehavior.transitInTime, this.next, this);
      }
    }, {
      key: "exit_TRANS_OPNE",
      value: function exit_TRANS_OPNE() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
      }
      // TRANS_OPNE

      // OPEN -> TRANS_CLOSE    
    }, {
      key: "next_OPEN",
      value: function next_OPEN() {
        return 'TRANS_CLOSE';
      }
    }, {
      key: "enter_OPEN",
      value: function enter_OPEN() {
        var transitionBehavior = this.parent;
        transitionBehavior.onOpen();
      }
    }, {
      key: "exit_OPEN",
      value: function exit_OPEN() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
      }
      // OPEN

      // TRANS_CLOSE -> CLOSE
    }, {
      key: "next_TRANS_CLOSE",
      value: function next_TRANS_CLOSE() {
        return 'CLOSE';
      }
    }, {
      key: "enter_TRANS_CLOSE",
      value: function enter_TRANS_CLOSE() {
        var transitionBehavior = this.parent;
        transitionBehavior.transitionOut();
        transitionBehavior.delayCall(transitionBehavior.transitOutTime, this.next, this);
      }
    }, {
      key: "exit_TRANS_CLOSE",
      value: function exit_TRANS_CLOSE() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
      }
      // TRANS_CLOSE

      // CLOSE
    }, {
      key: "next_CLOSE",
      value: function next_CLOSE() {}
    }, {
      key: "enter_CLOSE",
      value: function enter_CLOSE() {
        var transitionBehavior = this.parent;
        transitionBehavior.onClose();
      }
    }, {
      key: "exit_CLOSE",
      value: function exit_CLOSE() {}
      // CLOSE
    }]);
    return State;
  }(FSM);

  var PostUpdateDelayCall = function PostUpdateDelayCall(gameObject, delay, callback, scope, args) {
    // Invoke callback under scene's 'postupdate' event
    var scene = gameObject.scene;
    var sceneEE = scene.sys.events;
    var timer = scene.time.delayedCall(delay,
    // delay
    sceneEE.once,
    // callback
    [
    // Event name of scene
    'postupdate',
    // Callback
    function () {
      callback.call(scope, args);
    }],
    // args
    sceneEE // scope, scene's EE
    );

    return timer;
  };

  var GetValue$j = Phaser.Utils.Objects.GetValue;
  var Transition = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Transition, _ComponentBase);
    var _super = _createSuper(Transition);
    function Transition(gameObject, config) {
      var _this;
      _classCallCheck(this, Transition);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;
      // this.scene

      _this.setTransitInTime(GetValue$j(config, 'duration.in', 200));
      _this.setTransitOutTime(GetValue$j(config, 'duration.out', 200));
      _this.setTransitInCallback(GetValue$j(config, 'transitIn'));
      _this.setTransitOutCallback(GetValue$j(config, 'transitOut'));
      _this.destroyParent = GetValue$j(config, 'destroy', true);
      _this.delayCallTimer = undefined;
      _this._state = new State(_assertThisInitialized(_this), {
        eventEmitter: false
      });
      _this.closeEventData = undefined;
      return _this;
    }
    _createClass(Transition, [{
      key: "start",
      value: function start() {
        this._state.next();
      }
    }, {
      key: "state",
      get: function get() {
        return this._state.state;
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.transitInCallback = undefined;
        this.transitOutCallback = undefined;
        this.closeEventData = undefined;
        this.removeDelayCall();
        _get(_getPrototypeOf(Transition.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "transitionIn",
      value: function transitionIn() {
        var duration = this.transitInTime;
        this.transitInCallback(this.parent, duration);
        return this;
      }
    }, {
      key: "transitionOut",
      value: function transitionOut() {
        var duration = this.transitOutTime;
        this.transitOutCallback(this.parent, duration);
        return this;
      }
    }, {
      key: "onOpen",
      value: function onOpen() {}
    }, {
      key: "onClose",
      value: function onClose() {
        if (this.destroyParent) {
          this.parent.destroy();
          // Will invoke `this.destroy()`
        } else {
          this.destroy();
        }
      }
    }, {
      key: "delayCall",
      value: function delayCall(delay, callback, scope) {
        // Invoke callback under scene's 'postupdate' event
        this.delayCallTimer = PostUpdateDelayCall(this, delay, callback, scope);
        return this;
      }
    }, {
      key: "removeDelayCall",
      value: function removeDelayCall() {
        if (this.delayCallTimer) {
          this.delayCallTimer.remove(false);
          this.delayCallTimer = undefined;
        }
        return this;
      }
    }, {
      key: "setTransitInTime",
      value: function setTransitInTime(time) {
        this.transitInTime = time;
        return this;
      }
    }, {
      key: "setTransitOutTime",
      value: function setTransitOutTime(time) {
        this.transitOutTime = time;
        return this;
      }
    }, {
      key: "setTransitInCallback",
      value: function setTransitInCallback(callback) {
        if (!callback) {
          callback = NOOP;
        }
        this.transitInCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
      }
    }, {
      key: "setTransitOutCallback",
      value: function setTransitOutCallback(callback) {
        if (!callback) {
          callback = NOOP;
        }
        this.transitOutCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
      }
    }, {
      key: "requestClose",
      value: function requestClose(closeEventData) {
        // Only can close modal in OPEN state
        if (this._state.state === 'OPEN') {
          this.closeEventData = arguments.length > 0 ? closeEventData : this.parent;
          this._state.next(); // OPEN -> TRANS_CLOSE 
        }

        return this;
      }
    }]);
    return Transition;
  }(ComponentBase);

  var ScaleDown = function ScaleDown(gameObject, duration, orientation, ease, scale) {
    if (ease === undefined) {
      ease = 'Linear';
    }
    var config = {};
    config.mode = 0;
    switch (orientation) {
      case 0:
      case 'x':
        config.end = {
          x: 0
        };
        break;
      case 1:
      case 'y':
        config.end = {
          y: 0
        };
        break;
      default:
        config.end = 0;
        break;
    }
    config.duration = duration;
    config.ease = ease;
    if (scale === undefined) {
      scale = new Scale$1(gameObject, config);
    } else {
      scale.resetFromJSON(config);
    }
    scale.restart();
    return scale;
  };

  var GetValueFromAliasKeys = function GetValueFromAliasKeys(source, key0, key1, key2, defaultValue) {
    if (HasValue(source, key0)) {
      return GetValue$19(source, key0);
    } else if (key1 && HasValue(source, key1)) {
      return GetValue$19(source, key1);
    } else if (key2 && HasValue(source, key2)) {
      return GetValue$19(source, key2);
    } else {
      return defaultValue;
    }
  };

  var GetValue$i = Phaser.Utils.Objects.GetValue;
  var SetPosition = function SetPosition(gameObject, config) {
    var expandDirection = GetValue$i(config, 'expandDirection', undefined);
    if (typeof expandDirection === 'string') {
      expandDirection = ExpandDirections[expandDirection];
    }
    var alignTargetX = GetValueFromAliasKeys(config, 'alignTarget', 'alignTargetX');
    var alignTargetY = GetValue$i(config, 'alignTargetY', alignTargetX);
    var alignOffsetX = GetValue$i(config, 'alignOffsetX', 0);
    var alignOffsetY = GetValue$i(config, 'alignOffsetY', 0);
    var positionBounds = GetValue$i(config, 'bounds');

    // Expand direction
    var isExpandDown = expandDirection === 0;
    var isExpandUp = expandDirection === 1;
    var flexExpand = !isExpandDown && !isExpandUp;
    var originY = isExpandDown || flexExpand ? 0 : 1;
    gameObject.setOrigin(0, originY);
    var x = alignTargetX.getTopLeft().x;
    var y = alignTargetY.getBottomLeft().y;
    gameObject.setPosition(x + alignOffsetX, y + alignOffsetY);
    var bounds = positionBounds;
    if (!bounds) {
      bounds = GetViewport(gameObject.scene);
    }
    if (flexExpand && gameObject.getBottomLeft().y > bounds.bottom) {
      // Out of bounds, can't put list-panel below parent
      y = alignTargetY.getTopLeft().y;
      gameObject.setOrigin(0, 1).setPosition(x + alignOffsetX, y + alignOffsetY);
    }
  };
  var ExpandDirections = {
    down: 0,
    up: 1
  };

  var GetValue$h = Phaser.Utils.Objects.GetValue;
  var DropDown = /*#__PURE__*/function (_Transition) {
    _inherits(DropDown, _Transition);
    var _super = _createSuper(DropDown);
    function DropDown(gameObject, config) {
      var _this;
      _classCallCheck(this, DropDown);
      if (config === undefined) {
        config = {};
      }
      if (config.transitIn == null) {
        config.transitIn = function (gameObject, duration) {
          PopUp(gameObject, duration, 'y', 'Cubic');
        };
      }
      if (config.transitOut == null) {
        config.transitOut = function (gameObject, duration) {
          // Don't destroy here
          ScaleDown(gameObject, duration, 'y', 'Linear');
        };
      }
      config.manualClose = true;
      config.clickOutsideClose = true;
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;
      // this.scene

      SetPosition(gameObject, config);
      if (gameObject.isRexSizer) {
        gameObject.layout();
      }

      // Close conditions:
      var touchOutsideClose = GetValue$h(config, 'touchOutsideClose', false);
      var anyTouchClose = GetValue$h(config, 'anyTouchClose', false);
      if (anyTouchClose) {
        touchOutsideClose = false;
      }

      // Registet touch-close event after opened
      if (anyTouchClose) {
        _this.once('open', _this.anyTouchClose, _assertThisInitialized(_this));
      } else if (touchOutsideClose) {
        _this.once('open', _this.touchOutsideClose, _assertThisInitialized(_this));
      }
      _this.start();
      return _this;
    }
    _createClass(DropDown, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // Registered in touchOutsideClose()
        this.scene.input.off('pointerup', this.touchCloseCallback, this);
        _get(_getPrototypeOf(DropDown.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "touchOutsideClose",
      value: function touchOutsideClose() {
        this.scene.input.on('pointerup', this.touchCloseCallback, this);
        this.clickOutsideTest = true;
        return this;
      }
    }, {
      key: "anyTouchClose",
      value: function anyTouchClose() {
        this.scene.input.once('pointerup', this.touchCloseCallback, this);
        return this;
      }
    }, {
      key: "touchCloseCallback",
      value: function touchCloseCallback(pointer) {
        if (this.clickOutsideTest && IsPointInBounds(this.parent, pointer.worldX, pointer.worldY)) {
          return;
        }
        this.requestClose();
      }
    }, {
      key: "onOpen",
      value: function onOpen() {
        this.emit('open', this.parent, this);
        _get(_getPrototypeOf(DropDown.prototype), "onOpen", this).call(this);
      }
    }, {
      key: "onClose",
      value: function onClose() {
        this.emit('close', this.parent, this);
        _get(_getPrototypeOf(DropDown.prototype), "onClose", this).call(this);
      }
    }]);
    return DropDown;
  }(Transition);

  var OpenListPanel = function OpenListPanel() {
    if (this.listPanel) {
      return this;
    }
    var listPanel = CreateListPanel.call(this);

    // Button over/out
    listPanel.on('button.over', function (button, index, pointer, event) {
      if (this.listOnButtonOver) {
        this.listOnButtonOver.call(this, button, index, pointer, event);
      }
      this.emit('button.over', this, listPanel, button, index, pointer, event);
    }, this).on('button.out', function (button, index, pointer, event) {
      if (this.listOnButtonOut) {
        this.listOnButtonOut.call(this, button, index, pointer, event);
      }
      this.emit('button.out', this, listPanel, button, index, pointer, event);
    }, this);
    var dropDownBehavior = new DropDown(listPanel, {
      // Transition
      duration: {
        "in": this.listEaseInDuration,
        out: this.listEaseOutDuration
      },
      transitIn: this.listTransitInCallback,
      transitOut: this.listTransitOutCallback,
      // Position
      expandDirection: this.listExpandDirection,
      alignTargetX: this.getElement(this.listAlignMode),
      alignTargetY: this,
      bounds: this.listBounds,
      // Close condition
      anyTouchClose: true
    }).on('open', function () {
      // After popping up
      // Can click
      listPanel.on('button.click', function (button, index, pointer, event) {
        if (this.listOnButtonClick) {
          this.listOnButtonClick.call(this, button, index, pointer, event);
        }
        this.emit('button.click', this, listPanel, button, index, pointer, event);
      }, this);
      this.emit('list.open', this, listPanel);
    }, this).on('close', function () {
      this.listPanel = undefined;
      this.dropDownBehavior = undefined;
    }, this);
    this.listPanel = listPanel;
    this.dropDownBehavior = dropDownBehavior;
    this.pin(listPanel);
    return this;
  };

  var CloseListPanel = function CloseListPanel() {
    if (!this.dropDownBehavior) {
      return this;
    }
    this.dropDownBehavior.requestClose();
    return this;
  };

  var ToggleListPanel = function ToggleListPanel() {
    if (!this.listPanel) {
      this.openListPanel();
    } else {
      this.closeListPanel();
    }
    return this;
  };

  var Methods = {
    openListPanel: OpenListPanel,
    closeListPanel: CloseListPanel,
    toggleListPanel: ToggleListPanel
  };
  Object.assign(Methods, methods$4);

  var GetValue$g = Phaser.Utils.Objects.GetValue;
  var DropDownList = /*#__PURE__*/function (_Label) {
    _inherits(DropDownList, _Label);
    var _super = _createSuper(DropDownList);
    function DropDownList(scene, config) {
      var _this;
      _classCallCheck(this, DropDownList);
      _this = _super.call(this, scene, config);
      _this.type = 'rexDropDownList';
      _this.timer = undefined;
      _this.setOptions(GetValue$g(config, 'options'));
      var listConfig = GetValue$g(config, 'list');
      _this.setWrapEnable(GetValue$g(listConfig, 'wrap', false));
      _this.setCreateButtonCallback(GetValue$g(listConfig, 'createButtonCallback'));
      _this.setCreateListBackgroundCallback(GetValue$g(listConfig, 'createBackgroundCallback'));
      _this.setButtonClickCallback(GetValue$g(listConfig, 'onButtonClick'));
      _this.setButtonOverCallback(GetValue$g(listConfig, 'onButtonOver'));
      _this.setButtonOutCallback(GetValue$g(listConfig, 'onButtonOut'));
      _this.setListExpandDirection(GetValue$g(listConfig, 'expandDirection'));
      _this.setListEaseInDuration(GetValue$g(listConfig, 'easeIn', 500));
      _this.setListEaseOutDuration(GetValue$g(listConfig, 'easeOut', 100));
      _this.setListTransitInCallback(GetValue$g(listConfig, 'transitIn'));
      _this.settListTransitOutCallback(GetValue$g(listConfig, 'transitOut'));
      _this.setListSize(GetValue$g(listConfig, 'width'), GetValue$g(listConfig, 'height'));
      _this.setListAlignmentMode(GetValue$g(listConfig, 'alignParent', 'text'));
      _this.setListBounds(GetValue$g(listConfig, 'bounds'));
      _this.setListSpace(GetValue$g(listConfig, 'space'));
      _this.setListDraggable(GetValue$g(listConfig, 'draggable', false));
      _this.setValueChangeCallback(GetValue$g(config, 'setValueCallback'), GetValue$g(config, 'setValueCallbackScope'));
      _this.setValue(GetValue$g(config, 'value'));
      _this.onClick(_this.toggleListPanel, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(DropDownList, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }
        if (this.listPanel) {
          this.listPanel.destroy(fromScene);
          this.listPanel = undefined;
        }
        _get(_getPrototypeOf(DropDownList.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        if (options === undefined) {
          options = [];
        }
        this.options = options;
        return this;
      }
    }, {
      key: "setValueChangeCallback",
      value: function setValueChangeCallback(callback, scope) {
        this.valueChangeCallback = callback;
        this.valueChangeCallbackScope = scope;
        return this;
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this._value === value) {
          return;
        }
        var previousValue = this._value;
        this._value = value;
        var callback = this.valueChangeCallback,
          scope = this.valueChangeCallbackScope;
        if (callback) {
          if (scope) {
            callback.call(scope, this, value, previousValue);
          } else {
            callback(this, value, previousValue);
          }
        }
      }
    }]);
    return DropDownList;
  }(Label$1);
  Object.assign(DropDownList.prototype, Methods);

  var CreateDropDownList = function CreateDropDownList(scene, config) {
    config = BuildListConfig(scene, config);
    var gameObject = new DropDownList(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var GetOptionText = function GetOptionText(options, value) {
    for (var i = 0, cnt = options.length; i < cnt; i++) {
      var option = options[i];
      if (option.value === value) {
        return option.text;
      }
    }
    return undefined;
  };
  var GetOptionValue = function GetOptionValue(options, text) {
    for (var i = 0, cnt = options.length; i < cnt; i++) {
      var option = options[i];
      if (option.text === text) {
        return option.value;
      }
    }
    return undefined;
  };

  var ListInput = /*#__PURE__*/function (_InputFiledBase) {
    _inherits(ListInput, _InputFiledBase);
    var _super = _createSuper(ListInput);
    function ListInput(scene, config) {
      var _this;
      _classCallCheck(this, ListInput);
      if (config === undefined) {
        config = {};
      }
      _this = _super.call(this, scene);
      _this.type = 'rexTweaker.ListInput';
      var list = CreateDropDownList(scene, config.list);
      _this.add(list, {
        proportion: 1,
        expand: true
      });
      _this.addChildrenMap('list', list);
      list.on('button.click', function (dropDownList, listPanel, button, index, pointer, event) {
        var value = GetOptionValue(list.options, button.text);
        this.setValue(value);
      }, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(ListInput, [{
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this._value === value) {
          return;
        }
        var list = this.childrenMap.list;
        var text = GetOptionText(list.options, value);
        list.resetDisplayContent({
          text: text
        });
        _set(_getPrototypeOf(ListInput.prototype), "value", value, this, true);
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        this.childrenMap.list.setOptions(options);
        return this;
      }
    }]);
    return ListInput;
  }(InputFiledBase);

  var CreateListInput = function CreateListInput(scene, config, style) {
    var gameObject = new ListInput(scene, style);
    scene.add.existing(gameObject);
    gameObject.setOptions(config.options);
    return gameObject;
  };

  var CreateButtons$1 = function CreateButtons(scene, config) {
    var gameObject = new Buttons$1(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var SetButtonsActiveStateByText = function SetButtonsActiveStateByText(buttons, text) {
    for (var i = 0, cnt = buttons.length; i < cnt; i++) {
      var button = buttons[i];
      if (!button) {
        continue;
      }
      button.setActiveState(button.text === text);
    }
  };

  var GetValue$f = Phaser.Utils.Objects.GetValue;
  var ButtonsInput = /*#__PURE__*/function (_InputFiledBase) {
    _inherits(ButtonsInput, _InputFiledBase);
    var _super = _createSuper(ButtonsInput);
    function ButtonsInput(scene, config) {
      var _this;
      _classCallCheck(this, ButtonsInput);
      if (config === undefined) {
        config = {};
      }
      _this = _super.call(this, scene);
      _this.type = 'rexTweaker.ButtonsInput';
      var buttonConfig = config.button ? DeepClone(config.button) : {};
      var buttonExpand = GetValue$f(buttonConfig, 'expand', true);
      if (buttonExpand) {
        buttonConfig.align = 'center';
      }
      delete buttonConfig.expand;
      var list = CreateButtons$1(scene, {
        expand: buttonExpand
      });
      list.buttonConfig = buttonConfig;
      _this.add(list, {
        proportion: 1,
        expand: true
      });
      _this.addChildrenMap('list', list);
      list.on('button.click', function (button, index, pointer, event) {
        var value = GetOptionValue(list.options, button.text);
        this.setValue(value);
      }, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(ButtonsInput, [{
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this._value === value) {
          return;
        }
        var list = this.childrenMap.list;
        var text = GetOptionText(list.options, value);
        SetButtonsActiveStateByText(list.childrenMap.buttons, text);
        _set(_getPrototypeOf(ButtonsInput.prototype), "value", value, this, true);
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        var list = this.childrenMap.list;
        list.options = options;
        var scene = this.scene;
        var buttonConfig = list.buttonConfig;
        list.clearButtons(true);
        for (var i = 0, cnt = options.length; i < cnt; i++) {
          var option = options[i];
          var button = CreateInteractiveLabel(scene, buttonConfig).setActiveState(false).resetDisplayContent({
            text: option.text
          });
          list.addButton(button);
        }
        return this;
      }
    }]);
    return ButtonsInput;
  }(InputFiledBase);

  var CreateButtonsInput = function CreateButtonsInput(scene, config, style) {
    var gameObject = new ButtonsInput(scene, style);
    scene.add.existing(gameObject);
    gameObject.setOptions(config.options);
    return gameObject;
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

  var StyleMethods$1 = {
    setBoxFillStyle: function setBoxFillStyle(color, alpha) {
      if (alpha === undefined) {
        alpha = 1;
      }
      this.dirty = this.dirty || this.boxFillColor !== color || this.boxFillAlpha !== alpha;
      this.boxFillColor = color;
      this.boxFillAlpha = alpha;
      return this;
    },
    setUncheckedBoxFillStyle: function setUncheckedBoxFillStyle(color, alpha) {
      if (alpha === undefined) {
        alpha = 1;
      }
      this.dirty = this.dirty || this.uncheckedBoxFillColor !== color || this.uncheckedBoxFillAlpha !== alpha;
      this.uncheckedBoxFillColor = color;
      this.uncheckedBoxFillAlpha = alpha;
      return this;
    },
    setBoxStrokeStyle: function setBoxStrokeStyle(lineWidth, color, alpha) {
      if (alpha === undefined) {
        alpha = 1;
      }
      this.dirty = this.dirty || this.boxLineWidth !== lineWidth || this.boxStrokeColor !== color || this.boxStrokeAlpha !== alpha;
      this.boxLineWidth = lineWidth;
      this.boxStrokeColor = color;
      this.boxStrokeAlpha = alpha;
      return this;
    },
    setUncheckedBoxStrokeStyle: function setUncheckedBoxStrokeStyle(lineWidth, color, alpha) {
      if (alpha === undefined) {
        alpha = 1;
      }
      this.dirty = this.dirty || this.uncheckedBoxLineWidth !== lineWidth || this.uncheckedBoxStrokeColor !== color || this.uncheckedBoxStrokeAlpha !== alpha;
      this.uncheckedBoxLineWidth = lineWidth;
      this.uncheckedBoxStrokeColor = color;
      this.uncheckedBoxStrokeAlpha = alpha;
      return this;
    },
    setCheckerStyle: function setCheckerStyle(color, alpha) {
      if (alpha === undefined) {
        alpha = 1;
      }
      this.dirty = this.dirty || this.checkerColor !== color || this.checkAlpha !== alpha;
      this.checkerColor = color;
      this.checkAlpha = alpha;
      return this;
    },
    setBoxShape: function setBoxShape(isCircleShape) {
      if (isCircleShape === undefined) {
        isCircleShape = false;
      }
      if (this.isCircleShape === isCircleShape) {
        return this;
      }
      this.isCircleShape = isCircleShape;
      this.isSizeChanged = true;
      this.dirty = true;
      return this;
    }
  };

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

  Phaser.Math.DegToRad;

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
      ArcTo$1(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise, this.iterations, this.pathData);
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
      QuadraticBezierTo(cx0, cy0, cx1, cy1, x, y, this.iterations, this.pathData);
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
  var RotateAround$1 = function RotateAround(centerX, centerY, angle, pathData) {
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
      RotateAround$1(centerX, centerY, angle, this.pathData);
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
  var Linear = Phaser.Math.Linear;
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
    return Linear(p0, p1, t);
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

  Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

  var GetValue$e = Phaser.Utils.Objects.GetValue;
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
      key: "radiusTL",
      get: function get() {
        return this._radiusTL;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._radiusTL !== value;
        this._radiusTL = value;
      }
    }, {
      key: "radiusTR",
      get: function get() {
        return this._radiusTR;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._radiusTR !== value;
        this._radiusTR = value;
      }
    }, {
      key: "radiusBL",
      get: function get() {
        return this._radiusBL;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._radiusBL !== value;
        this._radiusBL = value;
      }
    }, {
      key: "radiusBR",
      get: function get() {
        return this._radiusBR;
      },
      set: function set(value) {
        this.dirty = this.dirty || this._radiusBR !== value;
        this._radiusBR = value;
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
          this.radiusTL = GetValue$e(value, 'tl', 0);
          this.radiusTR = GetValue$e(value, 'tr', 0);
          this.radiusBL = GetValue$e(value, 'bl', 0);
          this.radiusBR = GetValue$e(value, 'br', 0);
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
          var centerX = radius;
          var centerY = radius;
          ArcTo$1(centerX, centerY, radius, radius, 180, 270, false, iterations, pathData);
        } else {
          LineTo(0, 0, pathData);
        }

        // top-right
        radius = this.radiusTR;
        if (radius > 0) {
          var centerX = width - radius;
          var centerY = radius;
          ArcTo$1(centerX, centerY, radius, radius, 270, 360, false, iterations, pathData);
        } else {
          LineTo(width, 0, pathData);
        }

        // bottom-right
        radius = this.radiusBR;
        if (radius > 0) {
          var centerX = width - radius;
          var centerY = height - radius;
          ArcTo$1(centerX, centerY, radius, radius, 0, 90, false, iterations, pathData);
        } else {
          LineTo(width, height, pathData);
        }

        // bottom-left
        radius = this.radiusBL;
        if (radius > 0) {
          var centerX = radius;
          var centerY = height - radius;
          ArcTo$1(centerX, centerY, radius, radius, 90, 180, false, iterations, pathData);
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

  Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

  var ShapesUpdateMethods = {
    buildShapes: function buildShapes() {
      this.addShape(new RoundRectangle().setName('box')).addShape(new Lines().setName('checker'));
    },
    updateShapes: function updateShapes() {
      var centerX = this.width / 2,
        centerY = this.height / 2,
        radius = Math.min(centerX, centerY);
      var width = radius * 2;
      var x = centerX - radius,
        y = centerY - radius;
      var boxLineWidth = this.boxLineWidth;
      var checkLineWidth = Math.max(width / 10, 2);
      var boxShape = this.getShape('box');
      var checkerShape = this.getShape('checker');

      // Setup shapes
      if (this.isSizeChanged) {
        var halfBoxLineWidth = boxLineWidth / 2;
        var boxInnerWidth = width - boxLineWidth;
        boxShape.setTopLeftPosition(x + halfBoxLineWidth, y + halfBoxLineWidth).setSize(boxInnerWidth, boxInnerWidth);
        if (this.isCircleShape) {
          boxShape.setRadius(boxInnerWidth / 2);
        } else {
          boxShape.setRadius(0);
        }
        var unit = width / 4;
        var u1 = unit * 1,
          u2 = unit * 2,
          u3 = unit * 3;
        checkerShape.startAt(u1, u2).lineTo(u2, u3).lineTo(u3, u1).offset(x, y).end();
      }

      // Set styles
      if (this.checked) {
        boxShape.fillStyle(this.boxFillColor, this.boxFillAlpha).lineStyle(boxLineWidth, this.boxStrokeColor, this.boxStrokeAlpha);
        checkerShape.lineStyle(checkLineWidth, this.checkerColor);
      } else {
        boxShape.fillStyle(this.uncheckedBoxFillColor, this.uncheckedBoxFillAlpha).lineStyle(boxLineWidth, this.uncheckedBoxStrokeColor, this.uncheckedBoxStrokeAlpha);
        checkerShape.lineStyle();
      }

      // Play checker animation
      if (this.checked) {
        checkerShape.setDisplayPathSegment(this.checkerAnimProgress);
      }
    }
  };

  var CheckerAnimationMethods = {
    setCheckerAnimDuration: function setCheckerAnimDuration(duration) {
      if (duration === undefined) {
        duration = 0;
      }
      this.checkerAnimDuration = duration;
      return this;
    },
    playCheckerAnimation: function playCheckerAnimation() {
      if (this.checkerAnimProgressTask === undefined) {
        this.checkerAnimProgressTask = new EaseValueTask(this, {
          eventEmitter: null
        });
      }
      this.checkerAnimProgressTask.restart({
        key: 'checkerAnimProgress',
        from: 0,
        to: 1,
        duration: this.checkerAnimDuration
      });
      return this;
    },
    stopCheckerAnimation: function stopCheckerAnimation() {
      if (this.checkerAnimProgressTask === undefined) {
        return this;
      }
      this.checkerAnimProgressTask.stop();
      return this;
    }
  };

  var methods$3 = {};
  Object.assign(methods$3, StyleMethods$1, ShapesUpdateMethods, CheckerAnimationMethods);

  var GetValue$d = Phaser.Utils.Objects.GetValue;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var DefaultBoxFillColor = 0x005cb2;
  var CheckboxShape = /*#__PURE__*/function (_BaseShapes) {
    _inherits(CheckboxShape, _BaseShapes);
    var _super = _createSuper(CheckboxShape);
    function CheckboxShape(scene, x, y, width, height, color, config) {
      var _this;
      _classCallCheck(this, CheckboxShape);
      if (IsPlainObject(x)) {
        config = x;
        x = GetValue$d(config, 'x', 0);
        y = GetValue$d(config, 'y', 0);
        width = GetValue$d(config, 'width', 2);
        height = GetValue$d(config, 'height', 2);
        color = GetValue$d(config, 'color', DefaultBoxFillColor);
      } else if (IsPlainObject(color)) {
        config = color;
        color = GetValue$d(config, 'color', DefaultBoxFillColor);
      }
      _this = _super.call(this, scene, x, y, width, height);
      _this.type = 'rexCheckbox';
      if (color === undefined) {
        color = DefaultBoxFillColor;
      }
      _this.setBoxShape(GetValue$d(config, 'circleBox', false));
      _this.setBoxFillStyle(color, GetValue$d(config, 'boxFillAlpha', 1));
      _this.setUncheckedBoxFillStyle(GetValue$d(config, 'uncheckedColor', null), GetValue$d(config, 'uncheckedBoxFillAlpha', 1));
      _this.setBoxStrokeStyle(GetValue$d(config, 'boxLineWidth', 4), GetValue$d(config, 'boxStrokeColor', color), GetValue$d(config, 'boxStrokeAlpha', 1));
      _this.setUncheckedBoxStrokeStyle(_this.boxLineWidth, GetValue$d(config, 'uncheckedBoxStrokeColor', _this.boxStrokeColor), GetValue$d(config, 'uncheckedBoxStrokeAlpha', _this.boxStrokeAlpha));
      _this.setCheckerStyle(GetValue$d(config, 'checkerColor', 0xffffff), GetValue$d(config, 'checkerAlpha', 1));
      _this.setCheckerAnimDuration(GetValue$d(config, 'animationDuration', 150));
      _this.buildShapes();
      _this.setChecked(GetValue$d(config, 'checked', false));
      return _this;
    }
    _createClass(CheckboxShape, [{
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        value = !!value;
        if (this._value === value) {
          return;
        }
        this.dirty = true;
        this._value = value;
        if (value) {
          this.playCheckerAnimation();
        } else {
          this.stopCheckerAnimation();
        }
        this.emit('valuechange', value);
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }
    }, {
      key: "checked",
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.value = value;
      }
    }, {
      key: "setChecked",
      value: function setChecked(checked) {
        if (checked === undefined) {
          checked = true;
        }
        this.checked = checked;
        return this;
      }
    }, {
      key: "toggleChecked",
      value: function toggleChecked() {
        this.checked = !this.checked;
        return this;
      }
    }, {
      key: "checkerAnimProgress",
      get: function get() {
        return this._checkerAnimProgress;
      },
      set: function set(value) {
        if (this._checkerAnimProgress === value) {
          return;
        }
        this._checkerAnimProgress = value;
        this.dirty = true;
      }
    }]);
    return CheckboxShape;
  }(BaseShapes);
  Object.assign(CheckboxShape.prototype, methods$3);

  var GetValue$c = Phaser.Utils.Objects.GetValue;
  var Checkbox = /*#__PURE__*/function (_CheckboxShape) {
    _inherits(Checkbox, _CheckboxShape);
    var _super = _createSuper(Checkbox);
    function Checkbox(scene, x, y, width, height, color, config) {
      var _this;
      _classCallCheck(this, Checkbox);
      _this = _super.call(this, scene, x, y, width, height, color, config);
      _this._click = new Button(_assertThisInitialized(_this), GetValue$c(config, 'click'));
      _this._click.on('click', _this.toggleChecked, _assertThisInitialized(_this));
      _this.setReadOnly(GetValue$c(config, 'readOnly', false));
      return _this;
    }
    _createClass(Checkbox, [{
      key: "readOnly",
      get: function get() {
        return !this._click.enable;
      },
      set: function set(value) {
        this._click.enable = !value;
      }
    }, {
      key: "setReadOnly",
      value: function setReadOnly(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.readOnly = enable;
        return this;
      }
    }]);
    return Checkbox;
  }(CheckboxShape);

  var CreateCheckbox = function CreateCheckbox(scene, config) {
    var gameObject = new Checkbox(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var CheckboxInput = /*#__PURE__*/function (_InputFiledBase) {
    _inherits(CheckboxInput, _InputFiledBase);
    var _super = _createSuper(CheckboxInput);
    function CheckboxInput(scene, config) {
      var _this;
      _classCallCheck(this, CheckboxInput);
      if (config === undefined) {
        config = {};
      }
      _this = _super.call(this, scene);
      _this.type = 'rexTweaker.CheckboxInput';
      var checkboxConfig = config.checkbox;
      var checkbox = CreateCheckbox(scene, checkboxConfig);
      _this.add(checkbox, {
        proportion: 0,
        expand: false
      });
      _this.addChildrenMap('checkbox', checkbox);
      checkbox.on('valuechange', function (value) {
        this.setValue(value);
      }, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(CheckboxInput, [{
      key: "preLayout",
      value: function preLayout() {
        var checkbox = this.childrenMap.checkbox;
        checkbox.resize(1, 1);
      }
    }, {
      key: "postResolveSize",
      value: function postResolveSize(width, height) {
        var checkbox = this.childrenMap.checkbox;
        var size = height - this.getInnerPadding('top') - this.getInnerPadding('bottom') - this.getChildOuterPadding(checkbox, 'top') - this.getChildOuterPadding(checkbox, 'bottom');
        checkbox.resize(size, size);

        // Recalculate proportionLength
        this.proportionLength = undefined;
        this._childrenWidth = undefined;
        this.resolveWidth(width, true);
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this._value === value) {
          return;
        }
        this.childrenMap.checkbox.setValue(value);
        _set(_getPrototypeOf(CheckboxInput.prototype), "value", value, this, true);
      }
    }]);
    return CheckboxInput;
  }(InputFiledBase);

  var CreateCheckboxInput = function CreateCheckboxInput(scene, config, style) {
    var gameObject = new CheckboxInput(scene, style);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var GameObjectClass = Phaser.GameObjects.GameObject;
  var IsGameObject = function IsGameObject(object) {
    return object instanceof GameObjectClass;
  };

  var CreateSwatch = function CreateSwatch(scene, config) {
    if (config === false) {
      return null;
    } else if (IsGameObject(config)) {
      return config;
    }
    var swatch = new RoundRectangle$2(scene, config);
    scene.add.existing(swatch);
    swatch.expandSquare = true;
    return swatch;
  };

  var ColorNames = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
  var ColorValues = [0xf0f8ff, 0xfaebd7, 0x00ffff, 0x7fffd4, 0xf0ffff, 0xf5f5dc, 0xffe4c4, 0x000000, 0xffebcd, 0x0000ff, 0x8a2be2, 0xa52a2a, 0xdeb887, 0x5f9ea0, 0x7fff00, 0xd2691e, 0xff7f50, 0x6495ed, 0xfff8dc, 0xdc143c, 0x00ffff, 0x00008b, 0x008b8b, 0xb8860b, 0xa9a9a9, 0xa9a9a9, 0x006400, 0xbdb76b, 0x8b008b, 0x556b2f, 0xff8c00, 0x9932cc, 0x8b0000, 0xe9967a, 0x8fbc8f, 0x483d8b, 0x2f4f4f, 0x2f4f4f, 0x00ced1, 0x9400d3, 0xff1493, 0x00bfff, 0x696969, 0x696969, 0x1e90ff, 0xb22222, 0xfffaf0, 0x228b22, 0xff00ff, 0xdcdcdc, 0xf8f8ff, 0xffd700, 0xdaa520, 0x808080, 0x808080, 0x008000, 0xadff2f, 0xf0fff0, 0xff69b4, 0xcd5c5c, 0x4b0082, 0xfffff0, 0xf0e68c, 0xe6e6fa, 0xfff0f5, 0x7cfc00, 0xfffacd, 0xadd8e6, 0xf08080, 0xe0ffff, 0xfafad2, 0xd3d3d3, 0xd3d3d3, 0x90ee90, 0xffb6c1, 0xffa07a, 0x20b2aa, 0x87cefa, 0x778899, 0x778899, 0xb0c4de, 0xffffe0, 0x00ff00, 0x32cd32, 0xfaf0e6, 0xff00ff, 0x800000, 0x66cdaa, 0x0000cd, 0xba55d3, 0x9370db, 0x3cb371, 0x7b68ee, 0x00fa9a, 0x48d1cc, 0xc71585, 0x191970, 0xf5fffa, 0xffe4e1, 0xffe4b5, 0xffdead, 0x000080, 0xfdf5e6, 0x808000, 0x6b8e23, 0xffa500, 0xff4500, 0xda70d6, 0xeee8aa, 0x98fb98, 0xafeeee, 0xdb7093, 0xffefd5, 0xffdab9, 0xcd853f, 0xffc0cb, 0xdda0dd, 0xb0e0e6, 0x800080, 0x663399, 0xff0000, 0xbc8f8f, 0x4169e1, 0x8b4513, 0xfa8072, 0xf4a460, 0x2e8b57, 0xfff5ee, 0xa0522d, 0xc0c0c0, 0x87ceeb, 0x6a5acd, 0x708090, 0x708090, 0xfffafa, 0x00ff7f, 0x4682b4, 0xd2b48c, 0x008080, 0xd8bfd8, 0xff6347, 0x40e0d0, 0xee82ee, 0xf5deb3, 0xffffff, 0xf5f5f5, 0xffff00, 0x9acd32];
  var ColorNameToIntegerDict = {},
    name;
  for (var i = 0, cnt = ColorNames.length; i < cnt; i++) {
    name = ColorNames[i].toLowerCase();
    ColorNameToIntegerDict[name] = ColorValues[i];
  }
  var ColorNameToInteger = function ColorNameToInteger(colorName) {
    colorName = colorName.toLowerCase();
    if (ColorNameToIntegerDict.hasOwnProperty(colorName)) {
      return ColorNameToIntegerDict[colorName];
    } else {
      return null;
    }
  };

  var ColorStringToInteger = function ColorStringToInteger(value) {
    if (typeof value !== 'string') {
      return value;
    }
    if (value.startsWith('#')) {
      value = parseInt(value.substring(1), 16);
    } else if (value.startsWith('0x')) {
      value = parseInt(value.substring(2), 16);
    } else {
      value = ColorNameToInteger(value);
    }
    return value;
  };

  var Pad = Phaser.Utils.String.Pad;
  var GetHexColorString = function GetHexColorString(value, prefix) {
    if (prefix === undefined) {
      prefix = '0x';
    }
    var colorString = value.toString(16).toUpperCase();
    colorString = Pad(colorString, 6, 0, 1);
    colorString = prefix + colorString;
    return colorString;
  };

  var SetSwatchColor = function SetSwatchColor(swatch, color) {
    if (!swatch) {
      return;
    }
    if (swatch.setTint) {
      swatch.setTint(color);
    } else if (swatch.setFillStyle) {
      swatch.setFillStyle(color);
    }
  };

  var GetValue$b = Phaser.Utils.Objects.GetValue;
  var Clamp$1 = Phaser.Math.Clamp;
  var ColorInput$2 = /*#__PURE__*/function (_Sizer) {
    _inherits(ColorInput, _Sizer);
    var _super = _createSuper(ColorInput);
    function ColorInput(scene, config) {
      var _this;
      _classCallCheck(this, ColorInput);
      if (config === undefined) {
        config = {};
      }
      config.orientation = 0;
      _this = _super.call(this, scene, config);
      _this.type = 'rexColorInputLite';

      // Add elements
      var background = GetValue$b(config, 'background', undefined);
      var swatch = CreateSwatch(scene, GetValue$b(config, 'swatch'));
      var inputTextConfig = GetValue$b(config, 'inputText');
      var inputText = CreateInputText(scene, inputTextConfig);
      if (background) {
        _this.addBackground(background);
      }
      if (swatch) {
        _this.add(swatch, {
          proportion: 0,
          expand: false
        });
      }
      var proportion = GetValue$b(inputTextConfig, 'width') === undefined ? 1 : 0;
      var expand = GetValue$b(inputTextConfig, 'height') === undefined ? true : false;
      _this.add(inputText, {
        proportion: proportion,
        expand: expand
      });
      _this.addChildrenMap('background', background);
      _this.addChildrenMap('swatch', swatch);
      _this.addChildrenMap('inputText', inputText);
      inputText.on('close', function () {
        this.setValue(inputText.value);
      }, _assertThisInitialized(_this));
      var callback = GetValue$b(config, 'valuechangeCallback', null);
      if (callback !== null) {
        var scope = GetValue$b(config, 'valuechangeCallbackScope', undefined);
        _this.on('valuechange', callback, scope);
      }
      _this.setValue(GetValue$b(config, 'value', 0x0));
      return _this;
    }
    _createClass(ColorInput, [{
      key: "preLayout",
      value: function preLayout() {
        var swatch = this.childrenMap.swatch;
        if (swatch && swatch.expandSquare) {
          swatch.resize(1, 1);
        }
      }
    }, {
      key: "postResolveSize",
      value: function postResolveSize(width, height) {
        var swatch = this.childrenMap.swatch;
        if (swatch && swatch.expandSquare) {
          var size = height - this.getInnerPadding('top') - this.getInnerPadding('bottom') - this.getChildOuterPadding(swatch, 'top') - this.getChildOuterPadding(swatch, 'bottom');
          swatch.resize(size, size);

          // Recalculate proportionLength
          this.proportionLength = undefined;
          this._childrenWidth = undefined;
          this.resolveWidth(width, true);
        }
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (typeof value === 'string') {
          value = ColorStringToInteger(value);
          if (value == null) {
            var inputText = this.childrenMap.inputText;
            inputText.setText(GetHexColorString(this._value));
            return;
          }
        } else {
          value = Clamp$1(Math.floor(value), 0, 0xffffff);
        }
        if (this._value === value) {
          return;
        }
        this._value = value;
        var swatch = this.childrenMap.swatch;
        if (swatch) {
          SetSwatchColor(swatch, value);
        }
        var inputText = this.childrenMap.inputText;
        inputText.setText(GetHexColorString(value));
        this.emit('valuechange', this._value);
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }
    }, {
      key: "color",
      get: function get() {
        return this._value;
      },
      set: function set(color) {
        this.value = color;
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        this.color = color;
        return this;
      }
    }]);
    return ColorInput;
  }(Sizer);

  var methods$2 = {
    // Color picker
    setCreateColorPickerBackgroundCallback: function setCreateColorPickerBackgroundCallback(callback) {
      this.colorPickerCreateBackgroundCallback = callback;
      return this;
    },
    setColorPickerHPalettePosition: function setColorPickerHPalettePosition(position) {
      this.colorPickerHPalettePosition = position;
      return this;
    },
    setColorPickerExpandDirection: function setColorPickerExpandDirection(direction) {
      if (typeof direction === 'string') {
        direction = ColorPickerExpandDirections[direction];
      }
      this.colorPickerExpandDirection = direction;
      return this;
    },
    setColorPickerEaseInDuration: function setColorPickerEaseInDuration(duration) {
      if (duration === undefined) {
        duration = 0;
      }
      this.colorPickerEaseInDuration = duration;
      return this;
    },
    setColorPickerEaseOutDuration: function setColorPickerEaseOutDuration(duration) {
      if (duration === undefined) {
        duration = 0;
      }
      this.colorPickerEaseOutDuration = duration;
      return this;
    },
    setColorPickerTransitInCallback: function setColorPickerTransitInCallback(callback) {
      this.colorPickerTransitInCallback = callback;
      // callback = function(gameObject, duration) {}
      return this;
    },
    setColorPickerTransitOutCallback: function setColorPickerTransitOutCallback(callback) {
      this.colorPickerTransitOutCallback = callback;
      // callback = function(gameObject, duration) {}
      return this;
    },
    setColorPickerBounds: function setColorPickerBounds(bounds) {
      this.colorPickerBounds = bounds;
      return this;
    },
    setColorPickerWidth: function setColorPickerWidth(width) {
      this.colorPickerWidth = width;
      return this;
    },
    setColorPickerHeight: function setColorPickerHeight(height) {
      this.colorPickerHeight = height;
      return this;
    },
    setColorPickerSize: function setColorPickerSize(width, height) {
      this.setColorPickerWidth(width).setColorPickerHeight(height);
      return this;
    },
    setColorPickerSpace: function setColorPickerSpace(space) {
      if (space === undefined) {
        space = {};
      }
      this.colorPickerSpace = space;
      return this;
    },
    // Color components
    setColorComponentsHeight: function setColorComponentsHeight(height) {
      this.colorComponentsHeight = height;
      return this;
    },
    setColorComponentsFormatLabelConfig: function setColorComponentsFormatLabelConfig(config) {
      this.colorComponentsFormatLabelConfig = config;
      return this;
    },
    setColorComponentsInputTextConfig: function setColorComponentsInputTextConfig(config) {
      this.colorComponentsInputTextConfig = config;
      return this;
    },
    setColorComponentsSpace: function setColorComponentsSpace(space) {
      if (space === undefined) {
        space = {};
      }
      this.colorComponentsSpace = space;
      return this;
    }
  };
  var ColorPickerExpandDirections = {
    down: 0,
    up: 1
  };

  var Color$3 = Phaser.Display.Color;
  var Percent$2 = Phaser.Math.Percent;
  var DrawHPalette = function DrawHPalette(canvas, context, verticalMode) {
    if (verticalMode === undefined) {
      verticalMode = false;
    }
    var width = canvas.width;
    var height = canvas.height;
    var color = new Color$3();
    if (verticalMode) {
      for (var iy = 0; iy < height; iy++) {
        var h = Percent$2(iy, 0, height);
        color.setFromHSV(h, 1, 1);
        context.fillStyle = color.rgba;
        context.fillRect(0, iy, width, 1);
      }
    } else {
      for (var ix = 0; ix < width; ix++) {
        var h = Percent$2(ix, 0, width);
        color.setFromHSV(h, 1, 1);
        context.fillStyle = color.rgba;
        context.fillRect(ix, 0, 1, height);
      }
    }
  };
  var DrawSVPalette = function DrawSVPalette(canvas, context, h) {
    var width = canvas.width;
    var height = canvas.height;
    var imgData = context.getImageData(0, 0, width, height);
    var data = imgData.data;
    var color = new Color$3();
    for (var iy = 0; iy < height; iy++) {
      for (var ix = 0; ix < width; ix++) {
        var s = Percent$2(ix, 0, width);
        var v = 1 - Percent$2(iy, 0, height);
        color.setFromHSV(h, s, v);
        var i = (iy * width + ix) * 4;
        data[i] = color.red;
        data[i + 1] = color.green;
        data[i + 2] = color.blue;
        data[i + 3] = 255;
      }
    }
    context.putImageData(imgData, 0, 0);
  };

  var Color$2 = Phaser.Display.Color;
  var Percent$1 = Phaser.Math.Percent;
  var ColorToRGBA$2 = Phaser.Display.Color.ColorToRGBA;
  var HSVToRGB$2 = Phaser.Display.Color.HSVToRGB;
  var HPaletteCanvas = /*#__PURE__*/function (_Canvas) {
    _inherits(HPaletteCanvas, _Canvas);
    var _super = _createSuper(HPaletteCanvas);
    function HPaletteCanvas(scene, x, y, width, height, orientation) {
      var _this;
      _classCallCheck(this, HPaletteCanvas);
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
        height = 2;
      }
      _this = _super.call(this, scene, x, y, width, height);
      _this.type = 'rexColorPicker.HPaletteCanvas';
      _this.colorObject = new Color$2();
      _this.setOrientation(orientation);
      _this.setSize(width, height);
      return _this;
    }
    _createClass(HPaletteCanvas, [{
      key: "setOrientation",
      value: function setOrientation(orientation) {
        this.orientation = GetOrientationMode(orientation);
        return this;
      }
    }, {
      key: "updateTexture",
      value: function updateTexture() {
        DrawHPalette(this.canvas, this.context, this.orientation);
        _get(_getPrototypeOf(HPaletteCanvas.prototype), "updateTexture", this).call(this);
        return this;
      }
    }, {
      key: "color",
      get: function get() {
        return this.colorObject.color;
      }
    }, {
      key: "hue",
      get: function get() {
        return this._hue;
      },
      set: function set(value) {
        this._hue = value;
      }
    }, {
      key: "getHue",
      value: function getHue(localX, localY) {
        if (localX === undefined) {
          return this.hue;
        }
        if (this.orientation === 0) {
          this.hue = Percent$1(localX, 0, this.width);
        } else {
          this.hue = Percent$1(localY, 0, this.height);
        }
        return this.hue;
      }
    }, {
      key: "getColor",
      value: function getColor(localX, localY) {
        if (localX === undefined) {
          return this.color;
        }
        var h = this.getHue(localX, localY);
        this.colorObject.setFromRGB(HSVToRGB$2(h, 1, 1));
        return this.colorObject.color;
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        if (this.color === color) {
          return this;
        }
        return this;
      }
    }, {
      key: "colorToLocalPosition",
      value: function colorToLocalPosition(color, out) {
        if (out === undefined) {
          out = {};
        } else if (out === true) {
          if (LocalXY$1 === undefined) {
            LocalXY$1 = {};
          }
          out = LocalXY$1;
        }
        this.colorObject.setFromRGB(ColorToRGBA$2(color));
        if (this.orientation === 0) {
          out.x = this.width * this.colorObject.h;
          out.y = this.height / 2;
        } else {
          out.x = this.width / 2;
          out.y = this.height * this.colorObject.h;
        }
        return out;
      }
    }]);
    return HPaletteCanvas;
  }(Canvas);
  var LocalXY$1 = undefined;

  var RotateAround = Phaser.Math.RotateAround;
  var LocalToWorld = function LocalToWorld(gameObject, localX, localY, out) {
    if (out === undefined) {
      out = {};
    } else if (out === true) {
      if (GlobOut === undefined) {
        GlobOut = {};
      }
      out = GlobOut;
    }
    localX -= gameObject.width * gameObject.originX;
    localY -= gameObject.height * gameObject.originY;
    var point = {
      x: localX * gameObject.scaleX,
      y: localY * gameObject.scaleY
    };
    RotateAround(point, 0, 0, -gameObject.rotation);
    out.x = gameObject.x + localX;
    out.y = gameObject.y + localY;
    return out;
  };
  var GlobOut;

  var HPalette = /*#__PURE__*/function (_OverlapSizer) {
    _inherits(HPalette, _OverlapSizer);
    var _super = _createSuper(HPalette);
    function HPalette(scene, config) {
      var _this;
      _classCallCheck(this, HPalette);
      if (config === undefined) {
        config = {};
      }
      _this = _super.call(this, scene, config);
      var orientation = config.width != null ? 1 : 0;
      var paletteCanvas = new HPaletteCanvas(scene).setOrientation(orientation);
      scene.add.existing(paletteCanvas);
      _this.type = 'rexColorPicker.HPalette';
      paletteCanvas.setInteractive().on('pointerdown', _this.onPaletteCanvasPointerDown, _assertThisInitialized(_this)).on('pointermove', _this.onPaletteCanvasPointerDown, _assertThisInitialized(_this));
      var marker = new RoundRectangle$2(scene, {
        strokeColor: 0xffffff,
        strokeWidth: 2
      });
      scene.add.existing(marker);
      _this.add(paletteCanvas, {
        key: 'paletteCanvas',
        expand: true
      }).add(marker, {
        key: 'marker',
        expand: false
      });
      return _this;
    }
    _createClass(HPalette, [{
      key: "resize",
      value: function resize(width, height) {
        if (this.width === width && this.height === height) {
          return this;
        }
        _get(_getPrototypeOf(HPalette.prototype), "resize", this).call(this, width, height);
        var size = Math.min(width, height);
        this.childrenMap.marker.setSize(size, size);
        return this;
      }
    }, {
      key: "onPaletteCanvasPointerDown",
      value: function onPaletteCanvasPointerDown(pointer, localX, localY, event) {
        if (!pointer.isDown) {
          return;
        }
        var paletteCanvas = this.childrenMap.paletteCanvas;
        var color = paletteCanvas.getColor(localX, localY);
        this.setMarkerPosition(color);
        this.emit('input', color);
      }
    }, {
      key: "color",
      get: function get() {
        return this.childrenMap.paletteCanvas.color;
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        if (this.color === color) {
          return this;
        }
        var paletteCanvas = this.childrenMap.paletteCanvas;
        paletteCanvas.setColor(color);
        this.setMarkerPosition(color);
        return this;
      }
    }, {
      key: "setMarkerPosition",
      value: function setMarkerPosition(color) {
        var paletteCanvas = this.childrenMap.paletteCanvas;
        var marker = this.childrenMap.marker;
        var localXY = paletteCanvas.colorToLocalPosition(color, true);
        LocalToWorld(paletteCanvas, localXY.x, localXY.y, marker);
        this.resetChildPositionState(marker);
        return this;
      }
    }, {
      key: "getHue",
      value: function getHue(localX, localY) {
        var paletteCanvas = this.childrenMap.paletteCanvas;
        return paletteCanvas.getHue(localX, localY);
      }
    }]);
    return HPalette;
  }(OverlapSizer);

  var Color$1 = Phaser.Display.Color;
  var Percent = Phaser.Math.Percent;
  var ColorToRGBA$1 = Phaser.Display.Color.ColorToRGBA;
  var HSVToRGB$1 = Phaser.Display.Color.HSVToRGB;
  var SVPaletteCanvas = /*#__PURE__*/function (_Canvas) {
    _inherits(SVPaletteCanvas, _Canvas);
    var _super = _createSuper(SVPaletteCanvas);
    function SVPaletteCanvas(scene, x, y, width, height, hue) {
      var _this;
      _classCallCheck(this, SVPaletteCanvas);
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
        height = 2;
      }
      _this = _super.call(this, scene, x, y, width, height);
      _this.type = 'rexColorPicker.SVPaletteCanvas';
      if (hue === undefined) {
        hue = 1;
      }
      _this.colorObject = new Color$1();
      _this.setHue(hue);
      _this.setSize(width, height);
      return _this;
    }
    _createClass(SVPaletteCanvas, [{
      key: "color",
      get: function get() {
        return this.colorObject.color;
      }
    }, {
      key: "hue",
      get: function get() {
        return this._hue;
      },
      set: function set(hue) {
        if (this._hue === hue) {
          return;
        }
        this._hue = hue;
        this.colorObject.h = hue;
        this.dirty = true;
      }
    }, {
      key: "setHue",
      value: function setHue(hue) {
        this.hue = hue;
        return this;
      }
    }, {
      key: "updateTexture",
      value: function updateTexture() {
        DrawSVPalette(this.canvas, this.context, this.hue);
        _get(_getPrototypeOf(SVPaletteCanvas.prototype), "updateTexture", this).call(this);
        return this;
      }
    }, {
      key: "getColor",
      value: function getColor(localX, localY) {
        if (localX === undefined) {
          return this.colorObject.color;
        }
        var s = Percent(localX, 0, this.width);
        var v = 1 - Percent(localY, 0, this.height);
        this.colorObject.setFromRGB(HSVToRGB$1(this.hue, s, v));
        return this.colorObject.color;
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        if (this.color === color) {
          return this;
        }
        this.colorObject.setFromRGB(ColorToRGBA$1(color));
        this.setHue(this.colorObject.h);
        return this;
      }
    }, {
      key: "colorToLocalPosition",
      value: function colorToLocalPosition(color, out) {
        if (out === undefined) {
          out = {};
        } else if (out === true) {
          if (LocalXY === undefined) {
            LocalXY = {};
          }
          out = LocalXY;
        }
        this.colorObject.setFromRGB(ColorToRGBA$1(color));
        out.x = this.width * this.colorObject.s;
        out.y = this.height * (1 - this.colorObject.v);
        return out;
      }
    }]);
    return SVPaletteCanvas;
  }(Canvas);
  var LocalXY = undefined;

  var SVPalette = /*#__PURE__*/function (_OverlapSizer) {
    _inherits(SVPalette, _OverlapSizer);
    var _super = _createSuper(SVPalette);
    function SVPalette(scene, config) {
      var _this;
      _classCallCheck(this, SVPalette);
      _this = _super.call(this, scene, config);
      var paletteCanvas = new SVPaletteCanvas(scene);
      scene.add.existing(paletteCanvas);
      _this.type = 'rexColorPicker.SVPalette';
      paletteCanvas.setInteractive().on('pointerdown', _this.onPaletteCanvasPointerDown, _assertThisInitialized(_this)).on('pointermove', _this.onPaletteCanvasPointerDown, _assertThisInitialized(_this));
      var marker = new RoundRectangle$2(scene, {
        radius: 5,
        strokeColor: 0xffffff,
        strokeWidth: 2
      });
      scene.add.existing(marker);
      _this.add(paletteCanvas, {
        key: 'paletteCanvas',
        expand: true
      }).add(marker, {
        key: 'marker',
        expand: false
      });
      return _this;
    }
    _createClass(SVPalette, [{
      key: "onPaletteCanvasPointerDown",
      value: function onPaletteCanvasPointerDown(pointer, localX, localY, event) {
        if (!pointer.isDown) {
          return;
        }
        var paletteCanvas = this.childrenMap.paletteCanvas;
        var color = paletteCanvas.getColor(localX, localY);
        this.setMarkerPosition(color);
        this.emit('input', color);
      }
    }, {
      key: "color",
      get: function get() {
        return this.childrenMap.paletteCanvas.color;
      }
    }, {
      key: "setHue",
      value: function setHue(hue) {
        var paletteCanvas = this.childrenMap.paletteCanvas;
        paletteCanvas.setHue(hue); // Redraw paletteCanvas
        // Position of marker does not change
        return this;
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        if (this.color === color) {
          return this;
        }
        var paletteCanvas = this.childrenMap.paletteCanvas;
        paletteCanvas.setColor(color); // Redraw paletteCanvas
        this.setMarkerPosition(color);
        return this;
      }
    }, {
      key: "setMarkerPosition",
      value: function setMarkerPosition(color) {
        var paletteCanvas = this.childrenMap.paletteCanvas;
        var marker = this.childrenMap.marker;
        var localXY = paletteCanvas.colorToLocalPosition(color, true);
        LocalToWorld(paletteCanvas, localXY.x, localXY.y, marker);
        this.resetChildPositionState(marker);
        return this;
      }
    }]);
    return SVPalette;
  }(OverlapSizer);

  var GetValue$a = Phaser.Utils.Objects.GetValue;
  var ColorPicker = /*#__PURE__*/function (_Sizer) {
    _inherits(ColorPicker, _Sizer);
    var _super = _createSuper(ColorPicker);
    function ColorPicker(scene, config) {
      var _this;
      _classCallCheck(this, ColorPicker);
      _this = _super.call(this, scene, config);
      _this.type = 'rexColorPicker';
      _this.freezePalettes = false;

      // orientation
      var hPalettePosition = GetValue$a(config, 'hPalette.position', 0);
      if (typeof hPalettePosition === 'string') {
        hPalettePosition = HPalettePositionNamesMap[hPalettePosition];
      }
      var orientation = hPalettePosition === 0 ||
      // bottom
      hPalettePosition === 2 // top
      ? 1 :
      // y
      0; // x
      _this.setOrientation(orientation);

      // Add elements
      var background = GetValue$a(config, 'background', undefined);
      var hPaletteWidth, hPaletteHeight;
      if (_this.orientation === 0) {
        var hPaletteWidth = GetValue$a(config, 'hPalette.width', undefined);
        if (hPaletteWidth === undefined) {
          hPaletteWidth = GetValue$a(config, 'hPalette.size', 10);
        }
      } else {
        hPaletteHeight = GetValue$a(config, 'hPalette.height', undefined);
        if (hPaletteHeight === undefined) {
          hPaletteHeight = GetValue$a(config, 'hPalette.size', 10);
        }
      }
      var hPalette = new HPalette(scene, {
        width: hPaletteWidth,
        height: hPaletteHeight
      });
      scene.add.existing(hPalette);
      var svPaletteWidth = GetValue$a(config, 'svPalette.width', undefined);
      var svPaletteHeight = GetValue$a(config, 'svPalette.height', undefined);
      var svPalette = new SVPalette(scene, {
        width: svPaletteWidth,
        height: svPaletteHeight
      });
      scene.add.existing(svPalette);
      if (background) {
        _this.addBackground(background);
      }
      var hPaletteAddConfig = {
        proportion: 0,
        expand: true
      };
      var svPaletteProportion, svPaletteExpand;
      if (_this.orientation === 0) {
        svPaletteProportion = svPaletteWidth === undefined ? 1 : 0;
        svPaletteExpand = svPaletteHeight === undefined ? true : false;
      } else {
        svPaletteProportion = svPaletteHeight === undefined ? 1 : 0;
        svPaletteExpand = svPaletteWidth === undefined ? true : false;
      }
      var svPaletteAddConfig = {
        proportion: svPaletteProportion,
        expand: svPaletteExpand
      };
      if (hPalettePosition === 0 || hPalettePosition === 3) {
        // bottom, right
        _this.add(svPalette, svPaletteAddConfig).add(hPalette, hPaletteAddConfig);
      } else {
        // left, top
        _this.add(hPalette, hPaletteAddConfig).add(svPalette, svPaletteAddConfig);
      }
      hPalette.on('input', function () {
        svPalette.setHue(hPalette.getHue());
        this.setValue(svPalette.color, true);
      }, _assertThisInitialized(_this));
      svPalette.on('input', function () {
        this.setValue(svPalette.color, true);
      }, _assertThisInitialized(_this));
      _this.addChildrenMap('background', background);
      _this.addChildrenMap('hPalette', hPalette);
      _this.addChildrenMap('svPalette', svPalette);
      var callback = GetValue$a(config, 'valuechangeCallback', null);
      if (callback !== null) {
        var scope = GetValue$a(config, 'valuechangeCallbackScope', undefined);
        _this.on('valuechange', callback, scope);
      }
      _this.setValue(GetValue$a(config, 'value', 0xffffff));
      return _this;
    }
    _createClass(ColorPicker, [{
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this._value === value) {
          return;
        }
        var oldValue = this._value;
        this._value = value;
        if (!this.freezePalettes) {
          this.updatePalettes();
        }
        this.emit('valuechange', value, oldValue, this);
      }
    }, {
      key: "setValue",
      value: function setValue(value, freezePalettes) {
        this.freezePalettes = !!freezePalettes;
        this.value = value;
        this.freezePalettes = false;
        return this;
      }
    }, {
      key: "color",
      get: function get() {
        return this._value;
      },
      set: function set(color) {
        this.value = color;
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        this.color = color;
        return this;
      }
    }, {
      key: "updatePalettes",
      value: function updatePalettes() {
        this.childrenMap.hPalette.setColor(this.color);
        this.childrenMap.svPalette.setColor(this.color);
        return this;
      }
    }, {
      key: "runLayout",
      value: function runLayout(parent, newWidth, newHeight) {
        if (this.ignoreLayout) {
          return this;
        }
        _get(_getPrototypeOf(ColorPicker.prototype), "runLayout", this).call(this, parent, newWidth, newHeight);
        this.childrenMap.hPalette.setMarkerPosition(this.value);
        this.childrenMap.svPalette.setMarkerPosition(this.value);
        return this;
      }
    }]);
    return ColorPicker;
  }(Sizer);
  var HPalettePositionNamesMap = {
    bottom: 0,
    left: 1,
    top: 2,
    right: 3
  };

  var CreateDisplayLabel = function CreateDisplayLabel(scene, config) {
    config = BuildDisplayLabelConfig(scene, config);
    var gameObject = new Label$1(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var Color = Phaser.Display.Color;
  var ColorToRGBA = Phaser.Display.Color.ColorToRGBA;
  var HSVToRGB = Phaser.Display.Color.HSVToRGB;
  var Clamp = Phaser.Math.Clamp;
  var ColorComponents = /*#__PURE__*/function (_Sizer) {
    _inherits(ColorComponents, _Sizer);
    var _super = _createSuper(ColorComponents);
    function ColorComponents(scene, config) {
      var _this;
      _classCallCheck(this, ColorComponents);
      if (config === undefined) {
        config = {};
      }
      config.orientation = 0;
      _this = _super.call(this, scene, config);
      _this.type = 'rexColorComponents';
      _this.colorObject = new Color();

      // Add elements
      var background = GetValue$9(config, 'background', undefined);
      var formatLabel = GetValue$9(config, 'formatLabel', undefined);
      if (!IsGameObject(formatLabel)) {
        formatLabel = CreateDisplayLabel(scene, formatLabel).resetDisplayContent();
      }
      var components = [];
      if (config.inputText0 && config.inputText1 && config.inputText2) {
        components.push(config.inputText0);
        components.push(config.inputText1);
        components.push(config.inputText2);
      } else {
        var inputTextConfig = GetValue$9(config, 'inputText');
        for (var i = 0; i < 3; i++) {
          var inputText = CreateInputText(scene, inputTextConfig).setMaxLength(3).setNumberInput();
          components.push(inputText);
        }
      }
      if (background) {
        _this.addBackground(background);
      }
      var proportion = GetValue$9(config, 'proportion.formatLabel', 0);
      var defaultExpand = formatLabel.isRexContainerLite ? true : false;
      var expand = GetValue$9(config, 'expand.formatLabel', defaultExpand);
      _this.add(formatLabel, {
        proportion: proportion,
        expand: expand
      });
      var proportion = GetValue$9(inputTextConfig, 'width') === undefined ? 1 : 0;
      var expand = GetValue$9(inputTextConfig, 'height') === undefined ? true : false;
      for (var i = 0, cnt = components.length; i < cnt; i++) {
        _this.add(components[i], {
          proportion: proportion,
          expand: expand
        });
      }
      _this.addChildrenMap('background', background);
      _this.addChildrenMap('formatLabel', formatLabel);
      _this.addChildrenMap('components', components);
      _this.onClick(formatLabel, _this.toggleColorFormat, _assertThisInitialized(_this));
      for (var i = 0, cnt = components.length; i < cnt; i++) {
        components[i].on('close', function () {
          this.updateColorObject();
          this.setValue(this.colorObject.color);
        }, _assertThisInitialized(_this));
      }
      var callback = GetValue$9(config, 'valuechangeCallback', null);
      if (callback !== null) {
        var scope = GetValue$9(config, 'valuechangeCallbackScope', undefined);
        _this.on('valuechange', callback, scope);
      }
      formatLabel.setText('RGB');
      _this.setValue(GetValue$9(config, 'value', 0xffffff));
      return _this;
    }
    _createClass(ColorComponents, [{
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        value = Clamp(Math.floor(value), 0, 0xffffff);
        if (this._value === value) {
          return;
        }
        this._value = value;
        this.colorObject.setFromRGB(ColorToRGBA(value));
        this.updateComponents();
        this.emit('valuechange', this._value);
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }
    }, {
      key: "color",
      get: function get() {
        return this._value;
      },
      set: function set(color) {
        this.value = color;
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        this.color = color;
        return this;
      }
    }, {
      key: "colorFormat",
      get: function get() {
        return this.childrenMap.formatLabel.text;
      },
      set: function set(value) {
        if (this.colorFormat === value) {
          return;
        }
        this.childrenMap.formatLabel.setText(value);
        this.updateComponents();
      }
    }, {
      key: "setColorFormat",
      value: function setColorFormat(colrType) {
        this.colorFormat = colrType;
        return this;
      }
    }, {
      key: "toggleColorFormat",
      value: function toggleColorFormat() {
        this.colorFormat = this.colorFormat === 'RGB' ? 'HSV' : 'RGB';
        return this;
      }
    }, {
      key: "updateComponents",
      value: function updateComponents() {
        var components = this.childrenMap.components;
        var value0, value1, value2;
        if (this.colorFormat === 'RGB') {
          value0 = this.colorObject.red;
          value1 = this.colorObject.green;
          value2 = this.colorObject.blue;
        } else {
          // colorFormat === 'HSV'
          value0 = Math.floor(this.colorObject.h * 360);
          value1 = Math.floor(this.colorObject.s * 100);
          value2 = Math.floor(this.colorObject.v * 100);
        }
        components[0].setValue(value0);
        components[1].setValue(value1);
        components[2].setValue(value2);
        return this;
      }
    }, {
      key: "updateColorObject",
      value: function updateColorObject() {
        var components = this.childrenMap.components;
        if (this.colorFormat === 'RGB') {
          var red = Clamp(components[0].value, 0, 255);
          var green = Clamp(components[1].value, 0, 255);
          var blue = Clamp(components[2].value, 0, 255);
          this.colorObject.setTo(red, green, blue);
        } else {
          var h = Clamp(components[0].value, 0, 359) / 360;
          var s = Clamp(components[1].value, 0, 100) / 100;
          var v = Clamp(components[2].value, 0, 100) / 100;
          this.colorObject.setFromRGB(HSVToRGB(h, s, v));
        }
        return this;
      }
    }]);
    return ColorComponents;
  }(Sizer);

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var TouchEventStop = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TouchEventStop, _ComponentBase);
    var _super = _createSuper(TouchEventStop);
    function TouchEventStop(gameObject, config) {
      var _this;
      _classCallCheck(this, TouchEventStop);
      _this = _super.call(this, gameObject, {
        eventEmitter: false
      });
      // No event emitter
      // this.parent = gameObject;

      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(TouchEventStop, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setHitAreaMode(GetValue$8(o, 'hitAreaMode', 0));
        this.setEnable(GetValue$8(o, 'enable', true));
        this.setStopMode(GetValue$8(o, 'stopAllLevels', true));
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        this.parent.on('pointerdown', function (pointer, localX, localY, event) {
          if (this.stopAllLevels) {
            event.stopPropagation();
          }
        }, this).on('pointerup', function (pointer, localX, localY, event) {
          if (this.stopAllLevels) {
            event.stopPropagation();
          }
        }, this).on('pointermove', function (pointer, localX, localY, event) {
          if (this.stopAllLevels) {
            event.stopPropagation();
          }
        }, this).on('pointerover', function (pointer, localX, localY, event) {
          if (this.stopAllLevels) {
            event.stopPropagation();
          }
        }, this).on('pointerout', function (pointer, event) {
          if (this.stopAllLevels) {
            event.stopPropagation();
          }
        }, this);
      }
    }, {
      key: "setHitAreaMode",
      value: function setHitAreaMode(mode) {
        if (typeof mode === 'string') {
          mode = HitAreaMode[mode];
        }
        var gameObject = this.parent;
        if (gameObject.input) {
          gameObject.removeInteractive();
        }
        if (mode === 0) {
          gameObject.setInteractive();
        } else {
          gameObject.setInteractive({
            hitArea: {},
            hitAreaCallback: function hitAreaCallback() {
              return true;
            }
          });
        }
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e === undefined) {
          e = true;
        }
        if (e) {
          this.parent.setInteractive();
        } else {
          this.parent.disableInteractive();
        }
        this.enable = e;
        return this;
      }
    }, {
      key: "setStopMode",
      value: function setStopMode(allLevels) {
        if (allLevels === undefined) {
          allLevels = true;
        }
        this.stopAllLevels = allLevels;
        return this;
      }
    }, {
      key: "toggleEnable",
      value: function toggleEnable() {
        this.setEnable(!this.enable);
        return this;
      }
    }]);
    return TouchEventStop;
  }(ComponentBase);
  var HitAreaMode = {
    "default": 0,
    fullWindow: 1
  };

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var ColorPickerPanel = /*#__PURE__*/function (_Sizer) {
    _inherits(ColorPickerPanel, _Sizer);
    var _super = _createSuper(ColorPickerPanel);
    function ColorPickerPanel(scene, config) {
      var _this;
      _classCallCheck(this, ColorPickerPanel);
      if (config === undefined) {
        config = {};
      }
      config.orientation = 1;
      _this = _super.call(this, scene, config);
      _this.type = 'rexColorInput.ColorPickerPanel';

      // Add elements
      var background = GetValue$7(config, 'background', undefined);
      var colorPicker = new ColorPicker(scene, {
        hPalette: config.hPalette || {},
        svPalette: config.svPalette || {},
        space: {
          item: GetValue$7(config, 'space.hPalette', 8)
        }
      });
      scene.add.existing(colorPicker);
      var colorComponents;
      if (config.colorComponents) {
        colorComponents = new ColorComponents(scene, config.colorComponents);
        scene.add.existing(colorComponents);
      }
      if (background) {
        _this.addBackground(background);
        new TouchEventStop(background, {
          stopAllLevels: false
        });
      }
      _this.add(colorPicker, {
        proportion: 1,
        expand: true
      });
      if (colorComponents) {
        _this.add(colorComponents, {
          proportion: 0,
          expand: true
        });
      }
      _this.addChildrenMap('background', background);
      _this.addChildrenMap('colorPicker', colorPicker);
      _this.addChildrenMap('colorComponents', colorComponents);
      colorPicker.on('valuechange', function (value) {
        this.setValue(value);
      }, _assertThisInitialized(_this));
      if (colorComponents) {
        colorComponents.on('valuechange', function (value) {
          this.setValue(value);
        }, _assertThisInitialized(_this));
      }
      _this.setValue(GetValue$7(config, 'value', 0xffffff));
      return _this;
    }
    _createClass(ColorPickerPanel, [{
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this._value === value) {
          return;
        }
        this._value = value;
        var colorPicker = this.childrenMap.colorPicker;
        colorPicker.setValue(value);
        var colorComponents = this.childrenMap.colorComponents;
        if (colorComponents) {
          colorComponents.setValue(value);
        }
        this.emit('valuechange', value);
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }
    }]);
    return ColorPickerPanel;
  }(Sizer);

  Phaser.Utils.Objects.GetValue;
  var CreateColorPicker = function CreateColorPicker(scene) {
    var scene = this.scene;
    var background;
    var createBackgroundCallback = this.colorPickerCreateBackgroundCallback;
    if (createBackgroundCallback) {
      background = createBackgroundCallback.call(this, scene);
      scene.add.existing(background);
    }
    var width = this.colorPickerWidth;
    if (width === undefined) {
      width = this.width;
    }
    var height = this.colorPickerHeight;
    if (height === undefined) {
      height = width;
    }
    var colorComponentsConfig;
    if (this.colorComponentsHeight > 0) {
      colorComponentsConfig = {
        height: this.colorComponentsHeight,
        formatLabel: this.colorComponentsFormatLabelConfig,
        inputText: this.colorComponentsInputTextConfig,
        space: this.colorComponentsSpace
      };
    } else {
      colorComponentsConfig = false;
    }
    var colorPicker = new ColorPickerPanel(scene, {
      width: width,
      height: height,
      background: background,
      space: this.colorPickerSpace,
      hPalette: {
        position: this.colorPickerHPalettePosition
      },
      colorComponents: colorComponentsConfig,
      value: this.value
    });
    scene.add.existing(colorPicker);
    return colorPicker;
  };

  var OpenColorPicker = function OpenColorPicker() {
    if (this.colorPicker) {
      return;
    }
    var colorPicker = CreateColorPicker.call(this);
    var dropDownBehavior = new DropDown(colorPicker, {
      // Transition
      duration: {
        "in": this.colorPickerEaseInDuration,
        out: this.colorPickerEaseOutDuration
      },
      transitIn: this.colorPickerTransitInCallback,
      transitOut: this.colorPickerTransitOutCallback,
      // Position
      expandDirection: this.colorPickerExpandDirection,
      alignTargetX: this,
      alignTargetY: this,
      bounds: this.colorPickerBounds,
      // Close condition
      touchOutsideClose: true
    }).on('open', function () {
      // After popping up
      // Can click
      colorPicker.on('valuechange', function (value) {
        this.setValue(value);
      }, this);
    }, this).on('close', function () {
      this.colorPicker = undefined;
      this.dropDownBehavior = undefined;
    }, this);
    this.colorPicker = colorPicker;
    this.dropDownBehavior = dropDownBehavior;
    this.pin(colorPicker);
    return this;
  };

  var methods$1 = {
    openColorPicker: OpenColorPicker
  };
  Object.assign(methods$1, methods$2);

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var ColorInput$1 = /*#__PURE__*/function (_ColorInputBase) {
    _inherits(ColorInput, _ColorInputBase);
    var _super = _createSuper(ColorInput);
    function ColorInput(scene, config) {
      var _this;
      _classCallCheck(this, ColorInput);
      if (config === undefined) {
        config = {};
      }
      _this = _super.call(this, scene, config);
      _this.type = 'rexColorInput';
      if (!config.hasOwnProperty('colorPicker')) {
        config.colorPicker = {
          background: {
            color: 0x0
          }
        };
      }
      var colorPickerConfig = config.colorPicker;
      var hasColorPicker = colorPickerConfig !== false && colorPickerConfig !== null;
      if (hasColorPicker) {
        _this.setColorPickerSize(GetValue$6(colorPickerConfig, 'width', 160), GetValue$6(colorPickerConfig, 'height', 170));
        var createBackgroundCallback;
        var background = GetValue$6(colorPickerConfig, 'background');
        if (background) {
          createBackgroundCallback = function createBackgroundCallback(scene) {
            return CreateRoundRectangle(scene, background);
          };
        } else {
          createBackgroundCallback = GetValue$6(colorPickerConfig, 'createBackgroundCallback');
        }
        _this.setCreateColorPickerBackgroundCallback(createBackgroundCallback);
        _this.setColorPickerHPalettePosition(GetValue$6(colorPickerConfig, 'hPalettePosition', 0));
        _this.setColorPickerExpandDirection(GetValue$6(colorPickerConfig, 'expandDirection'));
        _this.setColorPickerEaseInDuration(GetValue$6(colorPickerConfig, 'easeIn', 500));
        _this.setColorPickerEaseOutDuration(GetValue$6(colorPickerConfig, 'easeOut', 500));
        _this.setColorPickerTransitInCallback(GetValue$6(colorPickerConfig, 'transitIn'));
        _this.setColorPickerTransitOutCallback(GetValue$6(colorPickerConfig, 'transitOut'));
        _this.setColorPickerBounds(GetValue$6(colorPickerConfig, 'bounds'));
        var colorPickerSpaceConfig = GetValue$6(colorPickerConfig, 'space');
        if (colorPickerSpaceConfig === undefined) {
          colorPickerSpaceConfig = {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            item: 8
          };
        }
        _this.setColorPickerSpace(colorPickerSpaceConfig);
      }
      var colorComponentsConfig = config.colorComponents;
      var hasColorComponents = colorComponentsConfig !== false && colorComponentsConfig !== null;
      if (hasColorPicker && hasColorComponents) {
        _this.setColorComponentsHeight(GetValue$6(colorComponentsConfig, 'height', 30));
        _this.setColorComponentsFormatLabelConfig(GetValue$6(colorComponentsConfig, 'formatLabel'));
        var colorComponentsInputTextConfig = GetValue$6(colorComponentsConfig, 'inputText');
        if (!colorComponentsInputTextConfig) {
          colorComponentsInputTextConfig = GetValue$6(config, 'inputText');
        }
        _this.setColorComponentsInputTextConfig(colorComponentsInputTextConfig);
        var colorComponentsSpace = GetValue$6(colorComponentsConfig, 'space');
        if (colorComponentsSpace === undefined) {
          colorComponentsSpace = {
            item: 8
          };
        }
        _this.setColorComponentsSpace(colorComponentsSpace);
      }
      var swatch = _this.childrenMap.swatch;
      if (swatch && hasColorPicker) {
        _this.onClick(swatch, _this.openColorPicker, _assertThisInitialized(_this));
      }
      return _this;
    }
    return _createClass(ColorInput);
  }(ColorInput$2);
  Object.assign(ColorInput$1.prototype, methods$1);

  var CreateColorInput$1 = function CreateColorInput(scene, config) {
    config = config ? DeepClone(config) : {};
    var inputText = new ColorInput$1(scene, config);
    scene.add.existing(inputText);
    return inputText;
  };

  var ColorInput = /*#__PURE__*/function (_InputFiledBase) {
    _inherits(ColorInput, _InputFiledBase);
    var _super = _createSuper(ColorInput);
    function ColorInput(scene, config) {
      var _this;
      _classCallCheck(this, ColorInput);
      if (config === undefined) {
        config = {};
      }
      _this = _super.call(this, scene);
      _this.type = 'rexTweaker.ColorInput';
      var colorInputConfig = config.colorInput;
      var colorInput = CreateColorInput$1(scene, colorInputConfig);
      _this.add(colorInput, {
        proportion: 1,
        expand: true
      });
      _this.addChildrenMap('colorInput', colorInput);
      colorInput.on('valuechange', function (value) {
        this.setValue(value);
      }, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(ColorInput, [{
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this._value === value) {
          return;
        }
        this.childrenMap.colorInput.setValue(value);
        _set(_getPrototypeOf(ColorInput.prototype), "value", value, this, true);
      }
    }]);
    return ColorInput;
  }(InputFiledBase);

  var CreateColorInput = function CreateColorInput(scene, config, style) {
    var gameObject = new ColorInput(scene, style);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var CreateInputField = function CreateInputField(scene, config, style) {
    var viewType = config.view;
    var callback;
    switch (viewType) {
      case StringType:
        callback = CreateTextInput;
        break;
      case NumberType:
        callback = CreateNumberInput;
        break;
      case RangeType:
        callback = CreateRangeInput;
        break;
      case ListType:
        callback = CreateListInput;
        break;
      case ButtonsType:
        callback = CreateButtonsInput;
        break;
      case BooleanType:
        callback = CreateCheckboxInput;
        break;
      case ColorType:
        callback = CreateColorInput;
        break;
      default:
        callback = IsFunction(viewType) ? viewType : CreateTextInput;
        break;
    }
    var gameObject = callback(scene, config, style, gameObject);

    // Extra settings
    gameObject.setTextFormatCallback(config.format);
    return gameObject;
  };

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var CreateInputRow = function CreateInputRow(scene, config, style) {
    // Title
    var titleStyle = GetValue$5(style, 'title') || {};
    var inputTitle = CreateTitleLabel(scene, config, titleStyle);

    // InputField
    var inputField = CreateInputField(scene, config, style);

    // Background
    var backgroundStyle = GetValue$5(style, 'background') || {};
    var background = CreateRoundRectangle(scene, backgroundStyle);
    var inputRow = new InputRow(scene, _objectSpread2(_objectSpread2(_objectSpread2({}, config), style), {}, {
      inputTitle: inputTitle,
      inputField: inputField,
      background: background
    }));
    scene.add.existing(inputRow);
    inputRow.setTitle(config);
    return inputRow;
  };

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var AddInput = function AddInput(object, key, config) {
    if (arguments.length === 1) {
      config = object;
      object = config.bindingTarget;
      key = config.bindingKey;
    } else if (config === undefined) {
      config = {};
    }
    if (!config.title) {
      config.title = key;
    }
    if (!config.view) {
      config.view = GetInputType(object[key], config);
    }

    // Create InputRow
    var inputRowStyle = GetValue$4(this.styles, 'inputRow');
    var inputSizer = CreateInputRow(this.scene, config, inputRowStyle);

    // Add InputRow to Tweaker
    this.add(inputSizer, {
      expand: true
    });

    // Bind target
    inputSizer.setBindingTarget(object, key);
    if (config.monitor) {
      inputSizer.startMonitorTarget();
    }
    if (config.key) {
      this.root.addChildrenMap(config.key, inputSizer);
    }
    return this;
  };

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var CreateButtons = function CreateButtons(scene, config, style) {
    // Title
    var titleStyle = GetValue$3(style, 'title') || {};
    var title = CreateTitleLabel(scene, config, titleStyle);

    // Buttons
    var buttonsConfig = config.buttons;
    var buttonStyle = GetValue$3(style, 'button') || {};
    var buttons = [];
    for (var i = 0, cnt = buttonsConfig.length; i < cnt; i++) {
      var button = CreateDisplayLabel(scene, buttonStyle);
      buttons.push(button);
      var buttonConfig = buttonsConfig[i];
      button.resetDisplayContent({
        text: buttonConfig.label
      });
      button.callback = buttonConfig.callback;
    }
    var buttonsSizer = CreateButtons$1(scene, {
      buttons: buttons,
      expand: buttons.length === 1
    });

    // Background
    var backgroundStyle = GetValue$3(style, 'background') || {};
    var background = CreateRoundRectangle(scene, backgroundStyle);

    // InputRow
    var inputRow = new InputRow(scene, _objectSpread2(_objectSpread2({}, style), {}, {
      inputTitle: title,
      inputField: buttonsSizer,
      background: background
    }));
    scene.add.existing(inputRow);
    inputRow.setTitle(config);
    buttonsSizer.on('button.click', function (button) {
      button.callback(inputRow.bindingTarget);
    });
    return inputRow;
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var AddButtons = function AddButtons(config) {
    var scene = this.scene;
    if (config === undefined) {
      config = {};
    }
    if (config.hasOwnProperty('label')) {
      config.buttons = [{
        label: config.label,
        callback: config.callback
      }];
      delete config.label;
      delete config.callback;
    }
    var target = config.bindingTarget;
    delete config.bindingTarget;

    // Create buttons
    var buttonsStyle = GetValue$2(this.styles, 'inputRow') || {};
    var buttons = CreateButtons(scene, config, buttonsStyle);

    // Add buttons
    this.add(buttons, {
      expand: true
    });

    // Set binding target
    if (target) {
      buttons.setBindingTarget(target);
    }
    if (config.key) {
      this.root.addChildrenMap(config.key, buttons);
    }
    return this;
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var AddSeparator = function AddSeparator(config) {
    var scene = this.scene;

    // Create separator
    var separatorStyle = GetValue$1(this.styles, 'separator');
    var separator = CreateBackground(scene, config, separatorStyle);

    // Add separator
    this.add(separator, {
      expand: true
    });
    return this;
  };

  var SetBindingTarget = function SetBindingTarget(target) {
    var children = this.sizerChildren;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (!child.setBindingTarget) {
        continue;
      }
      child.setBindingTarget(target);
    }
    return this;
  };

  var methods = {
    addFolder: AddFolder,
    addTab: AddTab,
    addInput: AddInput,
    addButton: AddButtons,
    addButtons: AddButtons,
    addSeparator: AddSeparator,
    setBindingTarget: SetBindingTarget
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var TweakerShell = /*#__PURE__*/function (_Sizer) {
    _inherits(TweakerShell, _Sizer);
    var _super = _createSuper(TweakerShell);
    function TweakerShell(scene, config) {
      var _this;
      _classCallCheck(this, TweakerShell);
      if (config === undefined) {
        config = {};
      }
      if (config.orientation === undefined) {
        config.orientation = 'y';
      }

      // Create sizer
      _this = _super.call(this, scene, config);
      _this.type = 'rexTweakerShell';
      _this.styles = GetValue(config, 'styles') || {};
      var background = CreateBackground(scene, undefined, config.background);
      if (background) {
        _this.addBackground(background);
      }
      return _this;
    }
    return _createClass(TweakerShell);
  }(Sizer);
  Object.assign(TweakerShell.prototype, methods);

  var Tweaker = /*#__PURE__*/function (_TweakerShell) {
    _inherits(Tweaker, _TweakerShell);
    var _super = _createSuper(Tweaker);
    function Tweaker(scene, config) {
      var _this;
      _classCallCheck(this, Tweaker);
      if (config === undefined) {
        config = {};
      }
      if (config.styles === undefined) {
        config.styles = {}; // TODO: Default styles
      }

      config.background = config.styles.background || {};
      config.space = config.styles.space || {};

      // Create sizer
      _this = _super.call(this, scene, config);
      _this.type = 'rexTweaker';
      _this.root = config.root || _assertThisInitialized(_this);
      return _this;
    }
    return _createClass(Tweaker);
  }(TweakerShell);

  return Tweaker;

}));
