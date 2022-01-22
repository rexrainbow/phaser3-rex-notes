(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexgridtableplugin = factory());
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

  var DegToRad = Phaser.Math.DegToRad;
  var RadToDeg = Phaser.Math.RadToDeg;

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

  var methods$1 = {
    changeOrigin: ChangeOrigin
  };
  Object.assign(methods$1, Parent, AddChild, RemoveChild, ChildState, Transform, Position, Rotation, Scale, Visible, Alpha, Active, ScrollFactor, Mask, Depth, Children, Tween, AddToContainer);

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

  Object.assign(ContainerLite.prototype, methods$1);

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
  var GetValue$4 = function GetValue(source, key, defaultValue) {
    if (!source || typeof source === 'number') {
      return defaultValue;
    } else if (source.hasOwnProperty(key)) {
      return source[key];
    } else if (key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var parent = source;
      var value = defaultValue; //  Use for loop here so we can break early

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

  var DataMethods = {
    enableData: function enableData() {
      if (this.data === undefined) {
        this.data = {};
      }

      return this;
    },
    getData: function getData(key, defaultValue) {
      this.enableData();
      return key === undefined ? this.data : GetValue$4(this.data, key, defaultValue);
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
    },
    resetData: function resetData(data) {
      this.clearData();

      if (data) {
        this.enableData();

        for (var key in data) {
          this.data[key] = data[key];
        }
      }

      return this;
    },
    cloneData: function cloneData() {
      if (this.data) {
        return Clone(this.data);
      } else {
        return {};
      }
    }
  };

  var Cell = /*#__PURE__*/function () {
    function Cell(parent, config) {
      _classCallCheck(this, Cell);

      this.container = null;
      this._deltaHeight = 0;
      this.setParent(parent); // this.resetFromJSON(config);
    }

    _createClass(Cell, [{
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent; // parent: table

        this.parentContainer = parent.getParentContainer();
      } // resetFromJSON(o) {
      //     return this;
      // }

    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        if (fromScene === undefined) {
          fromScene = false;
        }

        if (!fromScene) {
          this.destroyContainer();
        }

        this.deltaHeight = 0;
        this.data = undefined;
        this.container = null;
        this.parent = undefined;
        this.parentContainer = undefined;
      }
    }, {
      key: "table",
      get: function get() {
        return this.parent;
      }
    }, {
      key: "scrollMode",
      get: function get() {
        return this.parentContainer.scrollMode;
      }
    }, {
      key: "colIndx",
      get: function get() {
        return this.parent.cellIndxeToColIndex(this.index);
      }
    }, {
      key: "rowIndx",
      get: function get() {
        return this.parent.cellIndxeToRowIndex(this.index);
      }
    }, {
      key: "getContainer",
      value: function getContainer() {
        return this.container;
      }
    }, {
      key: "setContainer",
      value: function setContainer(container) {
        if (!container) {
          this.destroyContainer();
          return this;
        }

        if (this.container) {
          this.container.destroy();
        }

        this.container = container;
        this.parentContainer.add(container);
        return this;
      }
    }, {
      key: "destroyContainer",
      value: function destroyContainer() {
        if (this.container) {
          this.container.destroy();
          this.container = null;
        }

        return this;
      }
    }, {
      key: "popContainer",
      value: function popContainer() {
        if (this.container) {
          var container = this.container;
          this.container = null;
          this.parentContainer.remove(container);
          return container;
        } else {
          return null;
        }
      }
    }, {
      key: "setXY",
      value: function setXY(x, y) {
        if (this.container) {
          this.parentContainer.setChildLocalPosition(this.container, x, y);
        }

        return this;
      }
    }, {
      key: "deltaHeight",
      get: function get() {
        return this._deltaHeight;
      },
      set: function set(deltaHeight) {
        if (deltaHeight == null) {
          deltaHeight = 0;
        }

        var table = this.parent;

        if (this._deltaHeight === 0 && deltaHeight !== 0) {
          table.nonZeroDeltaHeightCount++;
        } else if (this._deltaHeight !== 0 && deltaHeight === 0) {
          table.nonZeroDeltaHeightCount--;
        }

        var isTableHeightChanged = this._deltaHeight !== deltaHeight;
        this._deltaHeight = deltaHeight;

        if (isTableHeightChanged) {
          table.resetTotalRowsHeight();
          var eventName = this.scrollMode === 0 ? 'cellheightchange' : 'cellwidthchange';
          this.parentContainer.emit(eventName, this, this.container, this.parentContainer);
        }
      }
    }, {
      key: "deltaWidth",
      get: function get() {
        return this.deltaHeight;
      },
      set: function set(deltaWidth) {
        this.deltaHeight = deltaWidth;
      }
    }, {
      key: "setDeltaHeight",
      value: function setDeltaHeight(deltaHeight) {
        this.deltaHeight = deltaHeight;
        return this;
      }
    }, {
      key: "setDeltaWidth",
      value: function setDeltaWidth(deltaWidth) {
        this.deltaHeight = deltaWidth;
        return this;
      }
    }, {
      key: "height",
      get: function get() {
        if (this.scrollMode === 0) {
          return this.deltaHeight + this.parent.defaultCellHeight;
        } else {
          return this.parent.defaultCellWidth;
        }
      },
      set: function set(height) {
        // Only worked when scrollMode is 0
        if (this.scrollMode === 1) {
          return;
        }

        this.setDeltaHeight(height - this.parent.defaultCellHeight);
      }
    }, {
      key: "setHeight",
      value: function setHeight(height) {
        // Only worked when scrollMode is 0
        this.height = height;
        return this;
      }
    }, {
      key: "width",
      get: function get() {
        if (this.scrollMode === 0) {
          return this.parent.defaultCellWidth;
        } else {
          return this.deltaHeight + this.parent.defaultCellHeight;
        }
      },
      set: function set(width) {
        // Only worked when scrollMode is 1
        if (this.scrollMode === 0) {
          return;
        }

        this.setDeltaHeight(width - this.parent.defaultCellHeight);
      }
    }, {
      key: "setWidth",
      value: function setWidth(width) {
        this.width = width;
        return this;
      }
    }, {
      key: "scene",
      get: function get() {
        return this.parentContainer.scene;
      }
    }]);

    return Cell;
  }();
  Object.assign(Cell.prototype, DataMethods);

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

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var SpliceOne = Phaser.Utils.Array.SpliceOne;

  var Table = /*#__PURE__*/function () {
    function Table(parent, config) {
      _classCallCheck(this, Table);

      this.parent = parent; // parent: GridTable game object (Container)

      this.cells = [];
      this.cellPool = new Stack();
      this.resetFromJSON(config);
    }

    _createClass(Table, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.colCount = undefined;
        this.nonZeroDeltaHeightCount = 0;
        this.resetTotalRowsHeight();
        this.setDefaultCellHeight(GetValue$3(o, 'cellHeight', 30));
        this.setDefaultCellWidth(GetValue$3(o, 'cellWidth', 30));
        this.initCells(GetValue$3(o, 'cellsCount', 0));
        this.setColumnCount(GetValue$3(o, 'columns', 1));
        return this;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        // GridTable is destroyed, all cell containers will also be destroyed too
        // Don't have to freeCell
        this.cellPool.destroy();
        this.cells = undefined;
        this.parent = undefined;
      }
    }, {
      key: "defaultCellHeightMode",
      get: function get() {
        return this.nonZeroDeltaHeightCount === 0;
      }
    }, {
      key: "setDefaultCellHeight",
      value: function setDefaultCellHeight(height) {
        this.defaultCellHeight = height;
        return this;
      }
    }, {
      key: "setDefaultCellWidth",
      value: function setDefaultCellWidth(width) {
        this.defaultCellWidth = width;
        return this;
      }
    }, {
      key: "initCells",
      value: function initCells(size) {
        var cells = this.cells;
        cells.length = size;

        for (var i = 0; i < size; i++) {
          cells[i] = null;
        }

        return this;
      }
    }, {
      key: "insertNewCells",
      value: function insertNewCells(cellIdx, count) {
        var cells = this.cells;

        if (cellIdx === cells.length) {
          // append at end of array
          var endIdx = cellIdx + count;
          cells.legth = endIdx;

          for (var i = cellIdx; i < endIdx; i++) {
            cells[i] = null;
          }
        } else {
          var _this$cells;

          var newCells = [];
          newCells.length = count;

          for (var i = 0; i < count; i++) {
            newCells[i] = null;
          }

          (_this$cells = this.cells).splice.apply(_this$cells, [cellIdx, 0].concat(newCells));
        }

        this.resetTotalRowsHeight();
        return this;
      }
    }, {
      key: "removeCells",
      value: function removeCells(cellIdx, count) {
        var endIdx = cellIdx + count;

        for (var i = cellIdx; i < endIdx; i++) {
          this.freeCell(i);
        }

        if (endIdx === this.cells.length) {
          // remove until end of array
          this.cells.length = cellIdx;
        } else {
          if (count === 1) {
            SpliceOne(this.cells, cellIdx);
          } else {
            this.cells.splice(cellIdx, count);
          }

          this.buildCellIndex(cellIdx);
        }

        this.resetTotalRowsHeight();
        return this;
      }
    }, {
      key: "setColumnCount",
      value: function setColumnCount(cnt) {
        this.colCount = cnt;
        this.resetTotalRowsHeight();
        return this;
      }
    }, {
      key: "rowCount",
      get: function get() {
        return Math.ceil(this.cells.length / this.colCount);
      }
    }, {
      key: "cellsCount",
      get: function get() {
        return this.cells.length;
      }
    }, {
      key: "isValidCellIdx",
      value: function isValidCellIdx(idx) {
        return idx >= 0 && idx < this.cells.length;
      }
    }, {
      key: "heightToRowIndex",
      value: function heightToRowIndex(height, isCeil) {
        // defaultCellHeightMode
        if (this.defaultCellHeightMode) {
          var rowIdx = height / this.defaultCellHeight;

          if (isCeil) {
            rowIdx = Math.ceil(rowIdx);
          } else {
            rowIdx = Math.floor(rowIdx);
          }

          return rowIdx;
        } // count cell height one by one


        var rowCount = this.rowCount;
        var remainder = height,
            isValidIdx;
        var rowHeight,
            rowIdx = 0;

        while (1) {
          rowHeight = this.getRowHeight(rowIdx);
          remainder -= rowHeight;
          isValidIdx = rowIdx >= 0 && rowIdx < rowCount;

          if (remainder > 0 && isValidIdx) {
            rowIdx += 1;
          } else if (remainder === 0) {
            return rowIdx;
          } else {
            if (isCeil) {
              var preRowIdx = rowIdx;
              rowIdx += 1;
              isValidIdx = rowIdx >= 0 && rowIdx < rowCount;
              if (!isValidIdx) rowIdx = preRowIdx;
            }

            return rowIdx;
          }
        }
      }
    }, {
      key: "widthToColIndex",
      value: function widthToColIndex(width, isCeil) {
        var colIdx = width / this.defaultCellWidth;

        if (isCeil) {
          colIdx = Math.ceil(colIdx);
        } else {
          colIdx = Math.floor(colIdx);
        }

        return colIdx;
      }
    }, {
      key: "colRowToCellIndex",
      value: function colRowToCellIndex(colIdx, rowIdx) {
        if (colIdx >= this.colCount) {
          return null;
        }

        return rowIdx * this.colCount + colIdx;
      }
    }, {
      key: "rowIndexToHeight",
      value: function rowIndexToHeight(start, end) {
        // defaultCellHeightMode
        if (this.defaultCellHeightMode) {
          return (end - start + 1) * this.defaultCellHeight;
        }

        var h,
            sum = 0;

        for (var i = start; i <= end; i++) {
          h = this.getRowHeight(i);
          sum += h;
        }

        return sum;
      }
    }, {
      key: "colIndexToWidth",
      value: function colIndexToWidth(start, end) {
        return (end - start + 1) * this.defaultCellWidth;
      }
    }, {
      key: "getRowHeight",
      value: function getRowHeight(rowIdx) {
        var cnt = this.colCount; // single column

        if (cnt <= 1) {
          return this.getCellHeight(this.colRowToCellIndex(0, rowIdx));
        } // multiple columns, get the maximum height


        var maxHeight = 0,
            cellHeight;

        for (var i = 0; i < cnt; i++) {
          cellHeight = this.getCellHeight(this.colRowToCellIndex(i, rowIdx));
          if (maxHeight < cellHeight) maxHeight = cellHeight;
        }

        return maxHeight;
      }
    }, {
      key: "getColWidth",
      value: function getColWidth(idx) {
        return this.defaultCellWidth;
      }
    }, {
      key: "getCellHeight",
      value: function getCellHeight(cellIdx) {
        if (!this.isValidCellIdx(cellIdx)) {
          return 0;
        }

        var cellHeight;
        if (this.defaultCellHeightMode) cellHeight = this.defaultCellHeight;else {
          var cell = this.getCell(cellIdx, false);
          var deltaHeight = cell ? cell.deltaHeight : 0;
          cellHeight = this.defaultCellHeight + deltaHeight;
        }
        return cellHeight;
      }
    }, {
      key: "resetTotalRowsHeight",
      value: function resetTotalRowsHeight() {
        this._totalRowsHeight = null;
      }
    }, {
      key: "totalRowsHeight",
      get: function get() {
        if (this._totalRowsHeight === null) {
          this._totalRowsHeight = this.rowIndexToHeight(0, this.rowCount - 1);
        }

        return this._totalRowsHeight;
      }
    }, {
      key: "totalColumnWidth",
      get: function get() {
        return this.colCount * this.defaultCellWidth;
      }
    }, {
      key: "cellIndxeToColIndex",
      value: function cellIndxeToColIndex(cellIdx) {
        return cellIdx % this.colCount;
      }
    }, {
      key: "cellIndxeToRowIndex",
      value: function cellIndxeToRowIndex(cellIdx) {
        return Math.floor(cellIdx / this.colCount);
      }
    }, {
      key: "getCell",
      value: function getCell(cellIdx, createNewCell) {
        if (!this.isValidCellIdx(cellIdx)) {
          return null;
        }

        if (createNewCell === undefined) {
          createNewCell = true;
        }

        if (this.cells[cellIdx] === null && createNewCell) {
          var cell = this.newCell(cellIdx);
          this.cells[cellIdx] = cell;
        }

        return this.cells[cellIdx];
      }
    }, {
      key: "newCell",
      value: function newCell(cellIdx) {
        var cell = this.cellPool.pop();

        if (cell === null) {
          cell = new Cell(this);
        } else {
          cell.setParent(this);
        }

        cell.index = cellIdx;
        return cell;
      }
    }, {
      key: "buildCellIndex",
      value: function buildCellIndex(startIdx) {
        if (startIdx === undefined) {
          startIdx = 0;
        }

        var cells = this.cells,
            cell;

        for (var i = startIdx, len = cells.length; i < len; i++) {
          cell = cells[i];

          if (cell) {
            cell.index = i;
          }
        }

        return this;
      }
    }, {
      key: "getParentContainer",
      value: function getParentContainer() {
        return this.parent;
      }
    }, {
      key: "freeCell",
      value: function freeCell(cell) {
        if (typeof cell === 'number') {
          cell = this.cells[cell];
        }

        if (!cell) {
          return this;
        }

        cell.destroy();
        this.cellPool.push(cell);
        return this;
      }
    }]);

    return Table;
  }();

  var SetTableOY = function SetTableOY(oy) {
    var table = this.table;
    var topTableOY = this.topTableOY;
    var bottomTableOY = this.bottomTableOY;
    var tableOYExceedTop = oy > this.topTableOY;
    var tableOYExeceedBottom = oy < this.bottomTableOY;

    if (this.clampTableOXY) {
      var rowCount = table.rowCount;
      var visibleRowCount = table.heightToRowIndex(this.instHeight, true); // less then 1 page            

      if (rowCount < visibleRowCount) {
        oy = 0;
      } else if (tableOYExceedTop) {
        oy = topTableOY;
      } else if (tableOYExeceedBottom) {
        oy = bottomTableOY;
      }
    }

    if (this._tableOY !== oy) {
      this._tableOY = oy;
    }

    if (tableOYExceedTop) {
      if (!this.execeedTopState) {
        this.emit('execeedtop', this, oy, topTableOY);
      }
    }

    this.execeedTopState = tableOYExceedTop;

    if (tableOYExeceedBottom) {
      if (!this.execeedBottomState) {
        this.emit('execeedbottom', this, oy, bottomTableOY);
      }
    }

    this.execeedBottomState = tableOYExeceedBottom;
    return this;
  };

  var SetTableOX = function SetTableOX(ox) {
    var table = this.table;
    var leftTableOX = this.leftTableOX;
    var rightTableOX = this.rightTableOX;
    var tableOXExeceedLeft = ox > this.leftTableOX;
    var tableOXExeceedRight = ox < this.rightTableOX;

    if (this.clampTableOXY) {
      var colCount = table.colCount;
      var visibleColCount = table.widthToColIndex(this.instWidth, true); // less then 1 page            

      if (colCount < visibleColCount) {
        ox = 0;
      } else if (tableOXExeceedLeft) {
        ox = leftTableOX;
      } else {
        // var tableVisibleWidth = this.tableVisibleWidth;
        if (tableOXExeceedRight) ox = rightTableOX;
      }
    }

    if (this._tableOX !== ox) {
      this._tableOX = ox;
    }

    if (tableOXExeceedLeft) {
      if (!this.execeedLeftState) {
        this.emit('execeedleft', this, ox, leftTableOX);
      }
    }

    this.execeedLeftState = tableOXExeceedLeft;

    if (tableOXExeceedRight) {
      if (!this.execeedRightState) {
        this.emit('execeedright', this, ox, rightTableOX);
      }
    }

    this.execeedRightState = tableOXExeceedRight;
    return this;
  };

  var MaskToGameObject = function MaskToGameObject(mask) {
    return mask.hasOwnProperty('geometryMask') ? mask.geometryMask : mask.bitmapMask;
  };

  var Intersects = Phaser.Geom.Intersects.RectangleToRectangle;
  var Overlaps = Phaser.Geom.Rectangle.Overlaps;

  var MaskChildren = function MaskChildren(parent, mask, children) {
    if (!mask) {
      return;
    }

    if (children === undefined) {
      children = parent.getAllChildren();
    }

    var parentBounds = parent.getBounds();
    var maskGameObject = MaskToGameObject(mask);
    var child, childBounds, visiblePointsNumber;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = children[i];

      if (child.hasOwnProperty('isRexContainerLite')) {
        continue;
      }

      if (child === maskGameObject) {
        continue;
      }

      if (!IsVisible(child)) {
        // Child is invisible before masking
        continue;
      }

      if (child.getBounds) {
        childBounds = child.getBounds(childBounds);
        visiblePointsNumber = ContainsPoints(parentBounds, childBounds);

        switch (visiblePointsNumber) {
          case 4:
            // 4 points are all inside visible window, set visible
            ShowAll(parent, child);
            break;

          case 0:
            // No point is inside visible window
            // Parent intersects with child, or parent is inside child, set visible, and apply mask
            if (Intersects(parentBounds, childBounds) || Overlaps(parentBounds, childBounds)) {
              ShowSome(parent, child, mask);
            } else {
              // Set invisible
              ShowNone(parent, child);
            }

            break;

          default:
            // Part of points are inside visible window, set visible, and apply mask
            ShowSome(parent, child, mask);
            break;
        }
      } else {
        ShowSome(parent, child, mask);
      }
    }
  };

  var IsVisible = function IsVisible(gameObject) {
    while (1) {
      var localState = gameObject.rexContainer;

      if (!localState) {
        // Top game object
        return gameObject.visible;
      } else if (localState.visible) {
        var parent = localState.parent;

        if (parent) {
          // Test parent's visible
          gameObject = parent;
          continue;
        } else {
          // Top visible game object
          return true;
        }
      } else {
        // Current game object is invisible
        return false;
      }
    }
  };

  var ContainsPoints = function ContainsPoints(rectA, rectB) {
    var result = 0;
    var top = rectB.top,
        bottom = rectB.bottom,
        left = rectB.left,
        right = rectB.right;
    result += rectA.contains(left, top) ? 1 : 0;
    result += rectA.contains(left, bottom) ? 1 : 0;
    result += rectA.contains(right, top) ? 1 : 0;
    result += rectA.contains(right, bottom) ? 1 : 0;
    return result;
  };

  var ShowAll = function ShowAll(parent, child, mask) {
    parent.setChildMaskVisible(child, true);

    if (child.clearMask) {
      child.clearMask();
    }
  };

  var ShowSome = function ShowSome(parent, child, mask) {
    parent.setChildMaskVisible(child, true);

    if (child.setMask) {
      child.setMask(mask);
    }
  };

  var ShowNone = function ShowNone(parent, child, mask) {
    parent.setChildMaskVisible(child, false);

    if (child.clearMask) {
      child.clearMask();
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

      _this.setPosition().resize().setVisible(false); // Don't add it to display list


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

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var MASKUPDATEMODE = {
    update: 0,
    everyTick: 1
  };
  var ChildrenMaskMethods = {
    setupChildrenMask: function setupChildrenMask(config) {
      if (config === false) {
        // No children mask
        return this;
      }

      this.setMaskUpdateMode(GetValue$2(config, 'updateMode', 0));
      this.enableChildrenMask(GetValue$2(config, 'padding', 0));
      this.setMaskLayer(GetValue$2(config, 'layer', undefined));
      this.startMaskUpdate();
      return this;
    },
    destroyChildrenMask: function destroyChildrenMask() {
      if (!this.childrenMask) {
        return this;
      }

      this.stopMaskUpdate();
      this.childrenMask.destroy();
      this.childrenMask = undefined;
      return this;
    },
    setMaskUpdateMode: function setMaskUpdateMode(mode) {
      if (typeof mode === 'string') {
        mode = MASKUPDATEMODE[mode];
      }

      this.maskUpdateMode = mode;
      return this;
    },
    startMaskUpdate: function startMaskUpdate() {
      this.scene.game.events.on('poststep', this.maskChildren, this);
    },
    stopMaskUpdate: function stopMaskUpdate() {
      this.scene.game.events.off('poststep', this.maskChildren, this);
    },
    enableChildrenMask: function enableChildrenMask(maskPadding) {
      var maskGameObject = AddChildMask.call(this, null, this, 0, maskPadding);
      this.childrenMask = maskGameObject.createGeometryMask(); // this.childrenMask is a mask object, not a (Graphics) game object

      return this;
    },
    setMaskChildrenFlag: function setMaskChildrenFlag(value) {
      if (value === undefined) {
        value = true;
      }

      this.maskChildrenFlag = value;
      return this;
    },
    setMaskLayer: function setMaskLayer(layer) {
      // To reduce amount of masked game object
      this.maskLayer = layer;
      return this;
    },
    maskChildren: function maskChildren() {
      if (!this.childrenMask || !this.maskChildrenFlag || this.alpha === 0 || !this.visible // Parent is not visible
      ) {
        return this;
      }

      if (this.maskLayer) {
        // 1. Add parent and children into layer
        this.addToLayer(this.maskLayer); // 2. Mask this layer

        this.maskLayer.setMask(this.childrenMask);
      } else {
        MaskChildren(this, this.childrenMask, this.getAllChildren(), this.maskLayer);
      }

      if (this.maskUpdateMode === 0) {
        this.maskChildrenFlag = false;
      }

      return this;
    },
    layoutChildrenMask: function layoutChildrenMask() {
      if (!this.childrenMask) {
        return this;
      }

      var maskGameObject = MaskToGameObject(this.childrenMask);
      maskGameObject.setPosition().resize();
      this.resetChildPositionState(maskGameObject);
      return this;
    }
  };

  var HideCell = function HideCell(cell) {
    // Option: pop container of cell by cell.popContainer() under this event 
    this.emit('cellinvisible', cell);

    if (this.cellContainersPool) {
      var cellContainer = cell.popContainer(); // null if already been removed

      if (cellContainer) {
        this.cellContainersPool.killAndHide(cellContainer);
      }
    }

    cell.destroyContainer(); // Destroy container of cell
  };

  var HideCells = function HideCells() {
    var preList = this.preVisibleCells;
    var curList = this.visibleCells;
    preList.iterate(function (cell) {
      if (!curList.contains(cell)) {
        HideCell.call(this, cell);
      }
    }, this);
  };

  var ShowCell = function ShowCell(cell) {
    // Attach container to cell by cell.setContainer(container) under this event
    var reusedCellContainer = null;
    var cellContainer = cell.getContainer();

    if (cellContainer) {
      reusedCellContainer = cellContainer;
      cell.popContainer();
    } else if (this.cellContainersPool) {
      reusedCellContainer = this.cellContainersPool.getFirstDead();

      if (reusedCellContainer !== null) {
        // Reuse this game object
        reusedCellContainer.setActive(true).setVisible(true);
      }
    }

    this.emit('cellvisible', cell, reusedCellContainer, this);

    if (this.cellContainersPool) {
      var cellContainer = cell.getContainer();

      if (cellContainer) {
        if (reusedCellContainer === null) {
          this.cellContainersPool.add(cellContainer); // New cell container, add to pool
        } else if (reusedCellContainer !== cellContainer) {
          // Why reusedCellContainer is not equal to cellContainer?
          this.cellContainersPool.add(cellContainer); // New cell container, add to pool

          this.cellContainersPool.killAndHide(reusedCellContainer); // Unused cell container, put back to pool
        }
      } else {
        // No cell container added
        if (reusedCellContainer !== null) {
          this.cellContainersPool.killAndHide(reusedCellContainer); // Unused cell container, put back to pool
        }
      }
    }
  };

  var ShowCells = function ShowCells() {
    if (this.cellsCount === 0) {
      return;
    }

    var table = this.table;
    var startRowIdx = table.heightToRowIndex(-this.tableOY);

    if (startRowIdx <= 0) {
      startRowIdx = 0; //Turn -0 to 0
    }

    var rowIdx = startRowIdx;
    var startColIdx = table.widthToColIndex(-this.tableOX);

    if (startColIdx <= 0) {
      startColIdx = 0; //Turn -0 to 0
    }

    var colIdx = startColIdx;
    var cellIdx = table.colRowToCellIndex(colIdx, rowIdx);
    var bottomBound = this.bottomBound;
    var rightBound = this.rightBound;
    var lastIdx = table.cellsCount - 1;
    var lastColIdx = table.colCount - 1;
    var startCellTLX = GetCellTLX.call(this, colIdx),
        cellTLX = startCellTLX;
    var cellTLY = GetCellTLY.call(this, rowIdx);

    while (cellTLY < bottomBound && cellIdx <= lastIdx) {
      if (this.table.isValidCellIdx(cellIdx)) {
        var cell = table.getCell(cellIdx, true);
        this.visibleCells.set(cell);

        if (!this.preVisibleCells.contains(cell)) {
          ShowCell.call(this, cell);
        }

        if (this.scrollMode === 0) {
          cell.setXY(cellTLX, cellTLY);
        } else {
          cell.setXY(cellTLY, cellTLX);
        }
      }

      if (cellTLX < rightBound && colIdx < lastColIdx) {
        cellTLX += table.getColWidth(colIdx);
        colIdx += 1;
      } else {
        cellTLX = startCellTLX;
        cellTLY += table.getRowHeight(rowIdx);
        colIdx = startColIdx;
        rowIdx += 1;
      }

      cellIdx = table.colRowToCellIndex(colIdx, rowIdx);
    }
  };

  var GetCellTLX = function GetCellTLX(colIdx) {
    var ox = this.scrollMode === 0 ? this.topLeftX : this.topLeftY;
    var x = this.tableOX + this.table.colIndexToWidth(0, colIdx - 1) + ox;
    return x;
  };

  var GetCellTLY = function GetCellTLY(rowIdx) {
    var oy = this.scrollMode === 0 ? this.topLeftY : this.topLeftX;
    var y = this.tableOY + this.table.rowIndexToHeight(0, rowIdx - 1) + oy;
    return y;
  };

  var UpdateTable = function UpdateTable(refresh) {
    if (refresh === undefined) {
      refresh = false;
    }

    if (refresh) {
      ClearVisibleCellIndexes.call(this);
      HideCells.call(this);
    }

    ClearVisibleCellIndexes.call(this);
    ShowCells.call(this);
    HideCells.call(this);
    this.setMaskChildrenFlag();
    return this;
  };

  var ClearVisibleCellIndexes = function ClearVisibleCellIndexes() {
    var tmp = this.preVisibleCells;
    this.preVisibleCells = this.visibleCells;
    this.visibleCells = tmp;
    this.visibleCells.clear();
  };

  var IsCellVisible = function IsCellVisible(cellIdx) {
    var cell = this.table.getCell(cellIdx, false);
    return cell && this.visibleCells.contains(cell);
  };

  var PointToCellIndex = function PointToCellIndex(x, y) {
    y -= this.y + this.topLeftY;
    x -= this.x + this.topLeftX;
    var offsetTableOY = this.tableOY - (this.scrollMode === 0 ? y : x);
    var offsetTableOX = this.tableOX - (this.scrollMode === 0 ? x : y);
    var table = this.table;
    var rowIdx = table.heightToRowIndex(-offsetTableOY);
    var colIdx = table.widthToColIndex(-offsetTableOX);
    var cellIdx = table.colRowToCellIndex(colIdx, rowIdx);

    if (cellIdx === null) {
      return null;
    }

    if (!this.isCellVisible(cellIdx)) {
      return null;
    }

    return cellIdx;
  };

  var PointToCellContainer = function PointToCellContainer(x, y) {
    var cellIdx = PointToCellIndex.call(this, x, y);

    if (cellIdx === null) {
      return undefined;
    }

    return this.getCellContainer(cellIdx);
  };

  // For when you know this Set will be modified during the iteration
  var EachVisibleCell = function EachVisibleCell(callback, scope) {
    this.visibleCells.each(callback, scope);
    return this;
  }; // For when you absolutely know this Set won't be modified during the iteration


  var IterateVisibleCell = function IterateVisibleCell(callback, scope) {
    this.visibleCells.iterate(callback, scope);
    return this;
  };

  var EachCell = function EachCell(callback, scope) {
    this.table.cells.slice().forEach(callback, scope);
    return this;
  };

  var IterateCell = function IterateCell(callback, scope) {
    this.table.cells.forEach(callback, scope);
    return this;
  };

  var SetCellsCount = function SetCellsCount(count) {
    var cellsCount = this.cellsCount;

    if (cellsCount === count) {
      return this;
    }

    if (cellsCount > count) {
      this.removeCells(count, cellsCount - count);
    } else {
      // cellsCount < count
      this.insertNewCells(cellsCount, count - cellsCount);
    }

    return this;
  };

  var Clamp = Phaser.Math.Clamp;

  var InsertNewCells = function InsertNewCells(cellIdx, count) {
    if (_typeof(cellIdx) === 'object') {
      cellIdx = cellIdx.index;
    }

    if (count === undefined) {
      count = 1;
    }

    if (count <= 0) {
      return this;
    }

    cellIdx = Clamp(cellIdx, 0, this.cellsCount);
    this.table.insertNewCells(cellIdx, count);
    return this;
  };

  var RemoveCells = function RemoveCells(cellIdx, count) {
    if (_typeof(cellIdx) === 'object') {
      cellIdx = cellIdx.index;
    }

    if (count === undefined) {
      count = 1;
    }

    if (cellIdx < 0) {
      count += cellIdx;
      cellIdx = 0;
    }

    if (count <= 0) {
      return this;
    } // out-of-range


    if (cellIdx > this.cellsCount) {
      return this;
    }

    var cell;

    for (var i = cellIdx, endIdx = cellIdx + count; i < endIdx; i++) {
      cell = this.getCell(i, false);

      if (cell) {
        if (this.visibleCells.contains(cell)) {
          HideCell.call(this, cell);
          this.visibleCells["delete"](cell);
        }

        this.preVisibleCells["delete"](cell);
      }
    }

    this.table.removeCells(cellIdx, count);
    return this;
  };

  var SetColumnCount = function SetColumnCount(count) {
    if (this.table.colCount === count) {
      return this;
    }

    this.table.setColumnCount(count);
    return this;
  };

  var SetGridSize = function SetGridSize(colCount, rowCount) {
    this.setCellsCount(colCount * rowCount);
    this.table.setColumnCount(colCount);
    return this;
  };

  var UpdateVisibleCell = function UpdateVisibleCell(cellIdx) {
    var cell = this.table.getCell(cellIdx, false);

    if (!cell || !cell.container) {
      return this;
    }

    ShowCell.call(this, cell);
    return this;
  };

  var methods = {
    setTableOY: SetTableOY,
    setTableOX: SetTableOX,
    updateTable: UpdateTable,
    isCellVisible: IsCellVisible,
    pointToCellIndex: PointToCellIndex,
    pointToCellContainer: PointToCellContainer,
    eachVisibleCell: EachVisibleCell,
    iterateVisibleCell: IterateVisibleCell,
    eachCell: EachCell,
    iterateCell: IterateCell,
    setCellsCount: SetCellsCount,
    insertNewCells: InsertNewCells,
    removeCells: RemoveCells,
    setColumnCount: SetColumnCount,
    setGridSize: SetGridSize,
    updateVisibleCell: UpdateVisibleCell
  };
  Object.assign(methods, ChildrenMaskMethods);

  var Group = Phaser.GameObjects.Group;
  var Set = Phaser.Structs.Set;
  var GetValue$1 = Phaser.Utils.Objects.GetValue;

  var GridTable = /*#__PURE__*/function (_ContainerLite) {
    _inherits(GridTable, _ContainerLite);

    var _super = _createSuper(GridTable);

    function GridTable(scene, x, y, width, height, config) {
      var _this;

      _classCallCheck(this, GridTable);

      if (config === undefined) {
        config = {};
      }

      _this = _super.call(this, scene, x, y, width, height);
      _this.type = 'rexGridTable';
      _this._tableOX = 0;
      _this._tableOY = 0;
      _this.visibleCells = new Set();
      _this.preVisibleCells = new Set();
      _this.execeedTopState = false;
      _this.execeedBottomState = false;
      _this.execeedLeftState = false;
      _this.execeedRightState = false;
      var reuseCellContainer = GetValue$1(config, 'reuseCellContainer', false);

      if (reuseCellContainer) {
        _this.cellContainersPool = new Group(scene); // Don't add Group into update list, I will destroy it manually
      }

      var callback = GetValue$1(config, 'cellVisibleCallback', null);

      if (callback !== null) {
        var scope = GetValue$1(config, 'cellVisibleCallbackScope', undefined);

        _this.on('cellvisible', callback, scope);
      }

      callback = GetValue$1(config, 'cellInvisibleCallback', null);

      if (callback !== null) {
        var scope = GetValue$1(config, 'cellInvisibleCallbackScope', undefined);

        _this.on('cellinvisible', callback, scope);
      }

      _this.setupChildrenMask(GetValue$1(config, 'mask', undefined));

      _this.setScrollMode(GetValue$1(config, 'scrollMode', 0));

      _this.setClampMode(GetValue$1(config, 'clamplTableOXY', true)); // Pre-process cell size


      if (_this.scrollMode === 0) {
        // scroll y
        var cellWidth = GetValue$1(config, 'cellWidth', undefined);
        _this.expandCellSize = cellWidth === undefined;

        if (cellWidth === undefined) {
          var columns = GetValue$1(config, 'columns', 1);
          config.cellWidth = _this.width / columns;
        }
      } else {
        // scroll x
        // Swap cell width and cell height
        var cellWidth = GetValue$1(config, 'cellHeight', undefined);
        var cellHeight = GetValue$1(config, 'cellWidth', undefined);
        _this.expandCellSize = cellWidth === undefined;
        config.cellWidth = cellWidth;
        config.cellHeight = cellHeight;
      }

      _this.table = new Table(_assertThisInitialized(_this), config);

      _this.updateTable();

      return _this;
    }

    _createClass(GridTable, [{
      key: "destroy",
      value: function destroy(fromScene) {
        // preDestroy method does not have fromScene parameter
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        this.destroyChildrenMask();
        this.table.destroy(fromScene);
        this.table = undefined;

        if (this.cellContainersPool) {
          this.cellContainersPool.destroy(true);
          this.cellContainersPool = undefined;
        }

        _get(_getPrototypeOf(GridTable.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "setScrollMode",
      value: function setScrollMode(mode) {
        if (typeof mode === 'string') {
          mode = SCROLLMODE[mode.toLowerCase()];
        }

        this.scrollMode = mode;
        return this;
      }
    }, {
      key: "setClampMode",
      value: function setClampMode(mode) {
        if (mode === undefined) {
          mode = true;
        }

        this.clampTableOXY = mode;
        return this;
      }
    }, {
      key: "tableOY",
      get: function get() {
        return this._tableOY;
      },
      set: function set(oy) {
        this.setTableOY(oy).updateTable();
      }
    }, {
      key: "tableOX",
      get: function get() {
        return this._tableOX;
      },
      set: function set(ox) {
        this.setTableOX(ox).updateTable();
      }
    }, {
      key: "setTableOXY",
      value: function setTableOXY(ox, oy) {
        this.setTableOY(oy).setTableOX(ox);
        return this;
      }
    }, {
      key: "addTableOY",
      value: function addTableOY(dy) {
        this.setTableOY(this.tableOY + dy);
        return this;
      }
    }, {
      key: "addTableOX",
      value: function addTableOX(dx) {
        this.setTableOX(this.tableOX + dx);
        return this;
      }
    }, {
      key: "addTableOXY",
      value: function addTableOXY(dx, dy) {
        this.addTableOY(dy).addTableOX(dx);
        return this;
      }
    }, {
      key: "setTableOYByPercentage",
      value: function setTableOYByPercentage(percentage) {
        this.setTableOY(-this.tableVisibleHeight * percentage);
        return this;
      }
    }, {
      key: "getTableOYPercentage",
      value: function getTableOYPercentage() {
        var tableVisibleHeight = this.tableVisibleHeight;

        if (tableVisibleHeight === 0) {
          return 0;
        }

        return this.tableOY / -tableVisibleHeight;
      }
    }, {
      key: "t",
      get: function get() {
        return this.getTableOYPercentage();
      },
      set: function set(value) {
        this.setTableOYByPercentage(value).updateTable();
      }
    }, {
      key: "getCell",
      value: function getCell(cellIdx) {
        return this.table.getCell(cellIdx, true);
      }
    }, {
      key: "getCellContainer",
      value: function getCellContainer(cellIdx) {
        var cell = this.table.getCell(cellIdx, false);
        var container;

        if (cell) {
          container = cell.getContainer();
        }

        return container;
      }
    }, {
      key: "cellsCount",
      get: function get() {
        return this.table.cellsCount;
      }
    }, {
      key: "columnCount",
      get: function get() {
        return this.table.colCount;
      }
    }, {
      key: "setCellHeight",
      value: function setCellHeight(cellIdx, height) {
        var cell;

        if (typeof cellIdx === 'number') {
          cell = this.table.getCell(cellIdx, true);
        } else {
          cell = cellIdx;
        }

        cell.height = height; // Only worked when scrollMode is 0

        return this;
      }
    }, {
      key: "setCellWidth",
      value: function setCellWidth(cellIdx, width) {
        var cell;

        if (typeof cellIdx === 'number') {
          cell = this.table.getCell(cellIdx, true);
        } else {
          cell = cellIdx;
        }

        cell.width = width; // Only worked when scrollMode is 1

        return this;
      }
    }, {
      key: "instHeight",
      get: function get() {
        return this.scrollMode === 0 ? this.height : this.width;
      }
    }, {
      key: "instWidth",
      get: function get() {
        return this.scrollMode === 0 ? this.width : this.height;
      }
    }, {
      key: "tableHeight",
      get: function get() {
        return this.table.totalRowsHeight;
      }
    }, {
      key: "tableWidth",
      get: function get() {
        return this.table.totalColumnWidth;
      }
    }, {
      key: "topTableOY",
      get: function get() {
        return 0;
      }
    }, {
      key: "bottomTableOY",
      get: function get() {
        return -this.tableVisibleHeight;
      }
    }, {
      key: "leftTableOX",
      get: function get() {
        return 0;
      }
    }, {
      key: "rightTableOX",
      get: function get() {
        return -this.tableVisibleWidth;
      }
    }, {
      key: "tableVisibleHeight",
      get: function get() {
        var h;
        var tableHeight = this.tableHeight;
        var instHeight = this.instHeight;

        if (tableHeight > instHeight) {
          h = tableHeight - instHeight;
        } else {
          h = 0;
        }

        return h;
      }
    }, {
      key: "tableVisibleWidth",
      get: function get() {
        var w;
        var tableWidth = this.tableWidth;
        var instWidth = this.instWidth;

        if (tableWidth > instWidth) {
          w = tableWidth - instWidth;
        } else {
          w = 0;
        }

        return w;
      }
    }, {
      key: "bottomLeftY",
      get: function get() {
        return -(this.displayHeight * this.originY) + this.displayHeight;
      }
    }, {
      key: "topRightX",
      get: function get() {
        return -(this.displayWidth * this.originX) + this.displayWidth;
      }
    }, {
      key: "topLeftX",
      get: function get() {
        return -(this.displayWidth * this.originX);
      }
    }, {
      key: "topLeftY",
      get: function get() {
        return -(this.displayHeight * this.originY);
      }
    }, {
      key: "bottomBound",
      get: function get() {
        if (this.scrollMode === 0) {
          return this.bottomLeftY;
        } else {
          return this.topRightX;
        }
      }
    }, {
      key: "rightBound",
      get: function get() {
        if (this.scrollMode === 0) {
          return this.topRightX;
        } else {
          return this.bottomLeftY;
        }
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        if (this.width === width && this.height === height) {
          return this;
        }

        _get(_getPrototypeOf(GridTable.prototype), "resize", this).call(this, width, height);

        if (this.expandCellSize) {
          this.table.setDefaultCellWidth(this.instWidth / this.table.colCount);
        }

        this.updateTable(true); // Layout children-mask

        this.layoutChildrenMask(); // Re-mask children

        this.maskChildren();
        return this;
      }
    }]);

    return GridTable;
  }(ContainerLite);

  Object.assign(GridTable.prototype, methods);
  var SCROLLMODE = {
    v: 0,
    vertical: 0,
    h: 1,
    horizontal: 1
  };

  function Factory (x, y, width, height, config) {
    var gameObject = new GridTable(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var GetValue = Phaser.Utils.Objects.GetValue;
  var BuildGameObject = Phaser.GameObjects.BuildGameObject;
  function Creator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }

    if (addToScene !== undefined) {
      config.add = addToScene;
    }

    var width = GetValue(config, 'width', 256);
    var height = GetValue(config, 'height', 256);
    var gameObject = new GridTable(this.scene, 0, 0, width, height, config); // set properties wo modify children

    gameObject.syncChildrenEnable = false;
    BuildGameObject(this.scene, gameObject, config); // sync properties of children

    gameObject.syncChildrenEnable = true;
    gameObject.syncPosition().syncVisible().syncAlpha();
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

  var GridTablePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(GridTablePlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(GridTablePlugin);

    function GridTablePlugin(pluginManager) {
      var _this;

      _classCallCheck(this, GridTablePlugin);

      _this = _super.call(this, pluginManager); //  Register our new Game Object type

      pluginManager.registerGameObject('rexGridTable', Factory, Creator);
      return _this;
    }

    _createClass(GridTablePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);

    return GridTablePlugin;
  }(Phaser.Plugins.BasePlugin);

  SetValue(window, 'RexPlugins.GameObjects.GridTable', GridTable);

  return GridTablePlugin;

})));
