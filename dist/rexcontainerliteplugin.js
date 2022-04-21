(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcontainerliteplugin = factory());
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

  var DegToRad = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;

  var GetLocalState = function GetLocalState(gameObject) {
    if (!gameObject.hasOwnProperty('rexContainer')) {
      var rexContainer = {
        parent: null,
        self: null,
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
          this.rotation = DegToRad(value);
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

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
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
    return this;
  };

  var AddLocal = function AddLocal(gameObject, config) {
    this.setParent(gameObject); // Set local state from child directly

    var state = GetLocalState(gameObject);
    SetupSyncFlags(state, config); // Position

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

  var SetupSyncFlags = function SetupSyncFlags(state, config) {
    state.syncPosition = GetValue$1(config, 'syncPosition', true);
    state.syncRotation = GetValue$1(config, 'syncRotation', true);
    state.syncScale = GetValue$1(config, 'syncScale', true);
    state.syncAlpha = GetValue$1(config, 'syncAlpha', true);
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

  function Factory (x, y, width, height, children) {
    var gameObject = new ContainerLite(this.scene, x, y, width, height, children);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var BuildGameObject = Phaser.GameObjects.BuildGameObject;
  function Creator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }

    if (addToScene !== undefined) {
      config.add = addToScene;
    }

    var width = GetAdvancedValue(config, 'width', 1);
    var height = GetAdvancedValue(config, 'height', width);
    var children = GetValue(config, 'children', undefined);
    var gameObject = new ContainerLite(this.scene, 0, 0, width, height); // set properties wo modify children

    gameObject.syncChildrenEnable = false;
    BuildGameObject(this.scene, gameObject, config); // sync properties of children

    gameObject.syncChildrenEnable = true;
    gameObject.add(children);
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

  var ContainerLitePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(ContainerLitePlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(ContainerLitePlugin);

    function ContainerLitePlugin(pluginManager) {
      var _this;

      _classCallCheck(this, ContainerLitePlugin);

      _this = _super.call(this, pluginManager); //  Register our new Game Object type

      pluginManager.registerGameObject('rexContainerLite', Factory, Creator);
      return _this;
    }

    _createClass(ContainerLitePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "getParent",
      value: function getParent(child) {
        return ContainerLite.GetParent(child);
      }
    }]);

    return ContainerLitePlugin;
  }(Phaser.Plugins.BasePlugin);

  SetValue(window, 'RexPlugins.GameObjects.ContainerLite', ContainerLite);

  return ContainerLitePlugin;

})));
