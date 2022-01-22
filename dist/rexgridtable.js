(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexgridtable = factory());
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

  var Zone$1 = Phaser.GameObjects.Zone;
  var AddItem = Phaser.Utils.Array.Add;
  var RemoveItem$2 = Phaser.Utils.Array.Remove;

  var Base$1 = /*#__PURE__*/function (_Zone) {
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
        RemoveItem$2(this.children, gameObjects, // Callback of item removed
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

  var Components = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Base$1, [Components.Alpha, Components.Flip]);

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

  var DegToRad$1 = Phaser.Math.DegToRad;
  var RadToDeg$2 = Phaser.Math.RadToDeg;

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
          return RadToDeg$2(this.rotation);
        },
        set: function set(value) {
          this.rotation = DegToRad$1(value);
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

  var BaseAdd = Base$1.prototype.add;

  var Add$1 = function Add(gameObject) {
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

  var AddChild$1 = {
    // Can override this method
    add: function add(gameObject) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject);
      } else {
        Add$1.call(this, gameObject);
      }

      return this;
    },
    // Don't override this method
    pin: function pin(gameObject) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject);
      } else {
        Add$1.call(this, gameObject);
      }

      return this;
    },
    addMultiple: function addMultiple(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Add$1.call(this, gameObjects[i]);
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

  var BaseRemove = Base$1.prototype.remove;
  var BaseClear = Base$1.prototype.clear;
  var RemoveChild$1 = {
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

  var RotateAround$2 = Phaser.Math.RotateAround;
  var Transform = {
    worldToLocal: function worldToLocal(point) {
      // Transform
      point.x -= this.x;
      point.y -= this.y; // Rotate

      RotateAround$2(point, 0, 0, -this.rotation); // Scale

      point.x /= this.scaleX;
      point.y /= this.scaleY;
      return point;
    },
    localToWorld: function localToWorld(point) {
      // Scale
      point.x *= this.scaleX;
      point.y *= this.scaleY; // Rotate

      RotateAround$2(point, 0, 0, this.rotation); // Transform

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

  var Scale$1 = {
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

  var RotateAround$1 = Phaser.Math.RotateAround;

  var ChangeOrigin$1 = function ChangeOrigin(gameObject, originX, originY) {
    if (originY === undefined) {
      originY = originX;
    }

    var deltaXY = {
      x: (originX - gameObject.originX) * gameObject.displayWidth,
      y: (originY - gameObject.originY) * gameObject.displayHeight
    };
    RotateAround$1(deltaXY, 0, 0, gameObject.rotation);
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

  var methods$6 = {
    changeOrigin: ChangeOrigin
  };
  Object.assign(methods$6, Parent, AddChild$1, RemoveChild$1, ChildState, Transform, Position, Rotation, Scale$1, Visible, Alpha, Active, ScrollFactor, Mask, Depth, Children, Tween, AddToContainer);

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
  }(Base$1);

  Object.assign(ContainerLite.prototype, methods$6);

  var GetSizerConfig = function GetSizerConfig(gameObject) {
    if (!gameObject.hasOwnProperty('rexSizer')) {
      gameObject.rexSizer = {};
    }

    return gameObject.rexSizer;
  };

  var GetChildPrevState = function GetChildPrevState(child) {
    var childConfig = GetSizerConfig(child);

    if (!childConfig.hasOwnProperty('prevState')) {
      childConfig.prevState = {};
    }

    return childConfig.prevState;
  };

  var GetDefaultBounds = function GetDefaultBounds(scene, out) {
    if (out === undefined) {
      if (GlobRectangle === undefined) {
        GlobRectangle = new Phaser.Geom.Rectangle();
      }

      out = GlobRectangle;
    }

    var gameConfig = scene.game.config;
    out.setTo(0, 0, gameConfig.width, gameConfig.height);
    return out;
  };

  var GlobRectangle;

  var PushIntoBounds = function PushIntoBounds(bounds) {
    if (bounds === undefined) {
      bounds = GetDefaultBounds(this.scene);
    }

    this.left = Math.max(this.left, bounds.left);
    this.right = Math.min(this.right, bounds.right);
    this.top = Math.max(this.top, bounds.top);
    this.bottom = Math.min(this.bottom, bounds.bottom);
    return this;
  };

  var ALIGN = Phaser.Display.Align;
  var ALIGNMODE = {
    center: ALIGN.CENTER,
    left: ALIGN.LEFT_CENTER,
    right: ALIGN.RIGHT_CENTER,
    top: ALIGN.TOP_CENTER,
    bottom: ALIGN.BOTTOM_CENTER,
    'left-top': ALIGN.TOP_LEFT,
    'left-center': ALIGN.LEFT_CENTER,
    'left-bottom': ALIGN.BOTTOM_LEFT,
    'center-top': ALIGN.TOP_CENTER,
    'center-center': ALIGN.CENTER,
    'center-bottom': ALIGN.BOTTOM_CENTER,
    'right-top': ALIGN.TOP_RIGHT,
    'right-center': ALIGN.RIGHT_CENTER,
    'right-bottom': ALIGN.BOTTOM_RIGHT
  };

  var NOOP = function NOOP() {//  NOOP
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

  var GetValue$B = Phaser.Utils.Objects.GetValue;
  var Group$1 = Phaser.GameObjects.Group;

  var DrawBounds = function DrawBounds(graphics, config) {
    var scene = graphics.scene;
    var color;
    var createTextCallback, createTextCallbackScope, textAlign;

    if (typeof config === 'number') {
      color = config;
    } else {
      color = GetValue$B(config, 'color', 0xffffff);
      var nameTextConfig = GetValue$B(config, 'name', false);

      if (nameTextConfig) {
        createTextCallback = GetValue$B(nameTextConfig, 'createTextCallback', DefaultCreateTextCallback);
        createTextCallbackScope = GetValue$B(nameTextConfig, 'createTextCallbackScope', undefined);
        textAlign = GetValue$B(nameTextConfig, 'align', 'left-top');

        if (typeof textAlign === 'string') {
          textAlign = ALIGNMODE[textAlign];
        }
      }
    }

    if (createTextCallback && !graphics.children) {
      graphics.children = new Group$1(scene);
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

      if (!child.getBounds) {
        continue;
      }

      if (color) {
        graphics.lineStyle(1, color).strokeRectShape(child.getBounds(GlobRect));
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

  var GlobRect = new Phaser.Geom.Rectangle();

  var GetValue$A = Phaser.Utils.Objects.GetValue;

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
      out.left = GetValue$A(config, 'left', 0);
      out.right = GetValue$A(config, 'right', 0);
      out.top = GetValue$A(config, 'top', 0);
      out.bottom = GetValue$A(config, 'bottom', 0);
    }

    return out;
  };

  var ContainerAdd = ContainerLite.prototype.add;

  var AddChild = function AddChild(gameObject) {
    ContainerAdd.call(this, gameObject);

    if (this.sizerEventsEnable) {
      gameObject.emit('sizer.add', gameObject, this);
      this.emit('add', gameObject, this);
    }

    return this;
  };

  var AddChildMethods$1 = {
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

      AddChild.call(this, gameObject);
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

  var AddChildrenMap = function AddChildrenMap(key, gameObject) {
    if (this.childrenMap === undefined) {
      this.childrenMap = {};
    }

    this.childrenMap[key] = gameObject;
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

  var GetValue$z = Phaser.Utils.Objects.GetValue;

  var GetPadding = function GetPadding(padding, key) {
    if (key === undefined) {
      return padding;
    }

    return padding[key];
  };

  var SetPadding = function SetPadding(padding, key, value) {
    var keyType = _typeof(key);

    if (keyType === 'string') {
      padding[key] = value;
    } else if (keyType === 'number') {
      padding.left = key;
      padding.right = key;
      padding.top = key;
      padding.bottom = key;
    } else {
      padding.left = GetValue$z(key, 'left', 0);
      padding.right = GetValue$z(key, 'right', 0);
      padding.top = GetValue$z(key, 'top', 0);
      padding.bottom = GetValue$z(key, 'bottom', 0);
    }
  };

  var PaddingMethods = {
    getInnerPadding: function getInnerPadding(key) {
      return GetPadding(this.space, key);
    },
    setInnerPadding: function setInnerPadding(key, value) {
      SetPadding(this.space, key, value);
      return this;
    },
    getOutterPadding: function getOutterPadding(key) {
      return GetPadding(this.getSizerConfig(this).padding, key);
    },
    setOuterPadding: function setOuterPadding(key, value) {
      SetPadding(this.getSizerConfig(this).padding, key, value);
      return this;
    },
    getChildOutterPadding: function getChildOutterPadding(child, key) {
      if (typeof child === 'string') {
        child = this.getElement(child);
      }

      return GetPadding(this.getSizerConfig(child).padding, key);
    },
    setChildOuterPadding: function setChildOuterPadding(child, key, value) {
      if (typeof child === 'string') {
        child = this.getElement(child);
      }

      SetPadding(this.getSizerConfig(child).padding, key, value);
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

  var GetChildWidth = function GetChildWidth(child) {
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
  var GetExpandedChildWidth$1 = function GetExpandedChildWidth(child, parentWidth) {
    return parentWidth;
  };

  // Override
  var GetExpandedChildHeight$1 = function GetExpandedChildHeight(child, parentHeight) {
    return parentHeight;
  };

  // Override
  var GetChildrenWidth$1 = function GetChildrenWidth() {
    return 0;
  };

  // Override
  var GetChildrenHeight$1 = function GetChildrenHeight() {
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
  var GetChildrenSizers$1 = function GetChildrenSizers(out) {
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

      var children = this.children,
          child;

      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];

        if (child.rexSizer && child.rexSizer.hidden) {
          // Don't add hidden child
          continue;
        }

        out.push(child);

        if (child.hasOwnProperty('isRexContainerLite')) {
          var _out;

          (_out = out).push.apply(_out, _toConsumableArray(child.getAllShownChildren()));
        }
      }

      return out;
    }
  };

  var PreLayout$1 = function PreLayout() {
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
    this.runLayout();
    return this;
  };

  // Override
  var RunLayout = function RunLayout(parent, newWidth, newHeight) {
    // Skip hidden or !dirty sizer
    if (this.ignoreLayout) {
      return this;
    }

    var isTopmostParent = !parent; // Preprocessor, top parent only

    if (isTopmostParent) {
      this.preLayout();
    } // Calculate parent width


    newWidth = this.resolveWidth(newWidth); // Calculate all children width, run width wrap

    if (isTopmostParent) {
      this.resolveChildrenWidth(newWidth);
      this.runWidthWrap(newWidth);
    } // Calculate parent height


    newHeight = this.resolveHeight(newHeight); // Resize parent

    this.resize(newWidth, newHeight);

    if (this.sizerEventsEnable) {
      if (this.layoutedChildren === undefined) {
        this.layoutedChildren = [];
      }
    } // Layout children    


    this.layoutChildren(); // Layout background children

    this.layoutBackgrounds();

    if (this.sizerEventsEnable) {
      this.emit('postlayout', this.layoutedChildren, this);
      this.layoutedChildren.length = 0;
    }

    return this.postLayout();
  };

  // Override
  var LayoutChildren$1 = function LayoutChildren() {};

  var PostLayout = function PostLayout(parent, newWidth, newHeight) {
    if (this._anchor) {
      this._anchor.updatePosition();
    }

    return this;
  };

  // Default method
  var RunWidthWrap = function RunWidthWrap(parentWidth) {
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
    }
  };

  var GetValue$y = Phaser.Utils.Objects.GetValue;

  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);

      this.parent = parent; // gameObject or scene

      this.scene = GetSceneObject(parent);
      this.isShutdown = false; // Event emitter, default is private event emitter

      this.setEventEmitter(GetValue$y(config, 'eventEmitter', true)); // Register callback of parent destroy event, also see `shutdown` method

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

  var Rectangle = Phaser.Geom.Rectangle;
  Phaser.Scale.Center;

  var GetViewport = function GetViewport(scene, out) {
    if (out === undefined) {
      out = new Rectangle();
    } else if (out === true) {
      out = globRect$1;
    }

    var scaleManager = scene.scale;
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
    return out;
  };

  var globRect$1 = new Rectangle();

  var Anchor = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Anchor, _ComponentBase);

    var _super = _createSuper(Anchor);

    function Anchor(gameObject, config) {
      var _this;

      _classCallCheck(this, Anchor);

      _this = _super.call(this, gameObject, {
        eventEmitter: false
      }); // No event emitter
      // this.parent = gameObject;

      _this.viewport = undefined;

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(Anchor, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        if (o === undefined) {
          o = {};
        } // Position


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
        } // Size


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
        } // Position


        this.setAlign(alignX, alignY);
        this.setPercentage(percentageX, percentageY);
        this.setOffset(offsetX, offsetY); // Size

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

        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        this.scene.scale.on('resize', this.anchor, this);
        this.anchor();
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.scene.scale.off('resize', this.anchor, this);
        this.viewport = undefined;
        this.onUpdateViewportCallback = undefined;
        this.onUpdateViewportCallbackScope = undefined;
        this.onResizeCallback = undefined;
        this.onResizeCallbackScope = undefined;

        _get(_getPrototypeOf(Anchor.prototype), "shutdown", this).call(this, fromScene);
      } // Position

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
      } // Size

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
        this.viewport = GetViewport(this.scene, this.viewport ? this.viewport : true);
        var callback = this.onUpdateViewportCallback,
            scope = this.onUpdateViewportCallbackScope;

        if (callback) {
          if (scope) {
            callback.call(scope, this.viewport, this.parent, this);
          } else {
            callback(this.viewport, this.parent, this);
          }
        }
      }
    }]);

    return Anchor;
  }(ComponentBase);

  var SetAnchor = function SetAnchor(config) {
    if (config === undefined) {
      config = {};
    } // Assign default onResizeCallback if not given    


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

  var GetValue$x = Phaser.Utils.Objects.GetValue;

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

      _this.setTickingMode(GetValue$x(config, 'tickingMode', 1)); // boot() later


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

  var GetValue$w = Phaser.Utils.Objects.GetValue;
  var Clamp$4 = Phaser.Math.Clamp;

  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);

      this.resetFromJSON(config);
    }

    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$w(o, 'state', IDLE$6);
        this.timeScale = GetValue$w(o, 'timeScale', 1);
        this.delay = GetValue$w(o, 'delay', 0);
        this.repeat = GetValue$w(o, 'repeat', 0);
        this.repeatCounter = GetValue$w(o, 'repeatCounter', 0);
        this.duration = GetValue$w(o, 'duration', 0);
        this.nowTime = GetValue$w(o, 'nowTime', 0);
        this.justRestart = GetValue$w(o, 'justRestart', false);
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
          case IDLE$6:
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

  var GetValue$v = Phaser.Utils.Objects.GetValue;
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
        this.timer.resetFromJSON(GetValue$v(o, 'timer'));
        this.setEnable(GetValue$v(o, 'enable', true));
        this.setDelay(GetAdvancedValue$3(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$3(o, 'duration', 1000));
        this.setEase(GetValue$v(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$v(o, 'repeat', 0));
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

  var GetValue$u = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$2 = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$5 = Phaser.Math.Linear;

  var Scale = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Scale, _EaseValueTaskBase);

    var _super = _createSuper(Scale);

    function Scale(gameObject, config) {
      var _this;

      _classCallCheck(this, Scale);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;
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

        this.setMode(GetValue$u(o, 'mode', 0));
        this.setScaleRange(GetAdvancedValue$2(o, 'start', undefined), GetAdvancedValue$2(o, 'end', 0));
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

        this.timer.setDelay(this.delay).setDuration(this.duration).setRepeat(this.mode === 2 ? -1 : 0);

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
          gameObject.scaleX = Linear$5(this.startX, this.endX, t);
        }

        if (this.hasScaleY) {
          gameObject.scaleY = Linear$5(this.startY, this.endY, t);
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(Scale.prototype), "complete", this).call(this);

        if (this.mode === 1) {
          this.parent.destroy(); // Will also destroy this behavior
        }

        return this;
      }
    }]);

    return Scale;
  }(EaseValueTaskBase);

  var MODE$2 = {
    stop: 0,
    destroy: 1,
    yoyo: 2
  };

  var PopUp = function PopUp(gameObject, duration, orientation, ease, scale) {
    var start;

    switch (orientation) {
      case 0:
      case 'x':
        start = {
          x: 0
        };
        break;

      case 1:
      case 'y':
        start = {
          y: 0
        };
        break;

      default:
        start = 0;
        break;
    }

    var config = {
      mode: 0,
      start: start,
      end: 1,
      duration: duration,
      ease: ease === undefined ? 'Cubic' : ease
    };

    if (scale === undefined) {
      scale = new Scale(gameObject, config);
    } else {
      scale.resetFromJSON(config);
    }

    scale.restart();
    return scale;
  };

  var ScaleDownDestroy = function ScaleDownDestroy(gameObject, duration, orientation, ease, destroyMode, scale) {
    if (destroyMode instanceof Scale) {
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
    config.ease = ease === undefined ? 'Linear' : ease;

    if (scale === undefined) {
      scale = new Scale(gameObject, config);
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

  var IsPlainObject$5 = Phaser.Utils.Objects.IsPlainObject;

  var OnInitScale = function OnInitScale(gameObject, scale) {
    // Route 'complete' of scale to gameObject
    scale.completeEventName = undefined;
    scale.on('complete', function () {
      if (scale.completeEventName) {
        gameObject.emit(scale.completeEventName, gameObject);
        scale.completeEventName = undefined;
      }
    }); // Update local state

    scale.on('update', function () {
      var parent = gameObject.getParentSizer();

      if (parent) {
        parent.resetChildPositionState(gameObject);
      }
    });
  };

  var ScaleMethods = {
    popUp: function popUp(duration, orientation, ease) {
      if (IsPlainObject$5(duration)) {
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
      if (IsPlainObject$5(duration)) {
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
    }
  };

  var GetValue$t = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$4 = Phaser.Math.Linear;

  var Fade = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Fade, _EaseValueTaskBase);

    var _super = _createSuper(Fade);

    function Fade(gameObject, config) {
      var _this;

      _classCallCheck(this, Fade);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(Fade, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Fade.prototype), "resetFromJSON", this).call(this, o);

        this.setMode(GetValue$t(o, 'mode', 0));
        this.setAlphaRange(GetAdvancedValue$1(o, 'start', this.parent.alpha), GetAdvancedValue$1(o, 'end', 0));
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

        gameObject.alpha = Linear$4(this.alphaStart, this.alphaEnd, t);
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(Fade.prototype), "complete", this).call(this);

        if (this.mode === 1) {
          this.parent.destroy(); // Will also destroy this behavior
        }

        return this;
      }
    }]);

    return Fade;
  }(EaseValueTaskBase);

  var MODE$1 = {
    stop: 0,
    destroy: 1,
    yoyo: 2
  };

  var IsPlainObject$4 = Phaser.Utils.Objects.IsPlainObject;

  var FadeIn = function FadeIn(gameObject, duration, alpha, fade) {
    var startAlpha, endAlpha;

    if (IsPlainObject$4(alpha)) {
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

  var IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;

  var OnInitFade = function OnInitFade(gameObject, fade) {
    // Route 'complete' of fade to gameObject
    fade.completeEventName = undefined;
    fade.on('complete', function () {
      if (fade.completeEventName) {
        gameObject.emit(fade.completeEventName, gameObject);
        fade.completeEventName = undefined;
      }
    }); // Update local state

    fade.on('update', function () {
      var parent = gameObject.getParentSizer();

      if (parent) {
        parent.resetChildAlphaState(gameObject);
      }
    });
  };

  var FadeMethods = {
    fadeIn: function fadeIn(duration, alpha) {
      if (IsPlainObject$3(duration)) {
        var config = duration;
        duration = config.duration;
      }

      var isInit = this._fade === undefined;
      this._fade = FadeIn(this, duration, alpha, this._fade);

      if (isInit) {
        OnInitFade(this, this._fade);
      }

      this._fade.completeEventName = 'fadein.complete';
      return this;
    },
    fadeInPromoise: function fadeInPromoise(duration, alpha) {
      this.fadeIn(duration, alpha);
      return WaitComplete(this._fade);
    },
    fadeOutDestroy: function fadeOutDestroy(duration, destroyMode) {
      if (IsPlainObject$3(duration)) {
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

  var GetValue$s = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$3 = Phaser.Math.Linear;

  var EaseMove = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(EaseMove, _EaseValueTaskBase);

    var _super = _createSuper(EaseMove);

    function EaseMove(gameObject, config) {
      var _this;

      _classCallCheck(this, EaseMove);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;
      // this.timer

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(EaseMove, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(EaseMove.prototype), "resetFromJSON", this).call(this, o);

        this.setMode(GetValue$s(o, 'mode', 0));

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
          m = MODE[m];
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
          gameObject.x = Linear$3(this.startX, this.endX, t);
        }

        if (this.hasMoveY) {
          gameObject.y = Linear$3(this.startY, this.endY, t);
        }
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(EaseMove.prototype), "complete", this).call(this);

        if (this.mode === 1) {
          this.parent.destroy(); // Will also destroy this behavior
        }

        return this;
      }
    }]);

    return EaseMove;
  }(EaseValueTaskBase);

  var MODE = {
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

  var IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
  var DistanceBetween$4 = Phaser.Math.Distance.Between;

  var OnInitEaseMove = function OnInitEaseMove(gameObject, easeMove) {
    // Route 'complete' of easeMove to gameObject
    easeMove.completeEventName = undefined;
    easeMove.on('complete', function () {
      if (easeMove.completeEventName) {
        gameObject.emit(easeMove.completeEventName, gameObject);
        easeMove.completeEventName = undefined;
      }
    }); // Update local state

    easeMove.on('update', function () {
      var parent = gameObject.getParentSizer();

      if (parent) {
        parent.resetChildPositionState(gameObject);
      }
    });
  };

  var EaseMoveMethods = {
    moveFrom: function moveFrom(duration, x, y, ease, destroyMode) {
      if (IsPlainObject$2(duration)) {
        var config = duration;
        x = config.x;
        y = config.y;

        if (config.hasOwnProperty('speed')) {
          duration = DistanceBetween$4(x, y, this.x, this.y) * 1000 / config.speed;
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
      if (IsPlainObject$2(duration)) {
        var config = duration;
        x = config.x;
        y = config.y;

        if (config.hasOwnProperty('speed')) {
          duration = DistanceBetween$4(x, y, this.x, this.y) * 1000 / config.speed;
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

    var config = GetSizerConfig(gameObject);
    return !config.hidden;
  };

  var _hide = function _hide(gameObject, hidden) {
    if (!gameObject) {
      return;
    }

    var config = GetSizerConfig(gameObject);
    config.hidden = hidden;
    gameObject.rexContainer.parent.setChildVisible(gameObject, !hidden);
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

    globRect = gameObject.getBounds(globRect);

    if (!globRect.contains(x, y)) {
      return false;
    }

    if (postTest && !postTest(gameObject, x, y)) {
      return false;
    }

    return true;
  };

  var globRect = undefined;

  var IsPointerInBounds = function IsPointerInBounds(gameObject, pointer, preTest, postTest) {
    if (pointer) {
      return IsPointInBounds(gameObject, pointer.x, pointer.y, preTest, postTest);
    } else {
      var inputManager = gameObject.scene.input.manager;
      var pointersTotal = inputManager.pointersTotal;
      var pointers = inputManager.pointers;

      for (var i = 0; i < pointersTotal; i++) {
        pointer = pointers[i];

        if (IsPointInBounds(gameObject, pointer.x, pointer.y, preTest, postTest)) {
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

  var PointToChild = function PointToChild(x, y, preTest, postTest, children) {
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

  var GetParentSizerMethods = {
    getParentSizer: function getParentSizer(gameObject) {
      return this.getParent(gameObject);
    },
    getTopmostSizer: function getTopmostSizer(gameObject) {
      return this.getTopmostParent(gameObject);
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

  var ALIGN_CENTER$1 = Phaser.Display.Align.CENTER;

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
      LayoutChild.call(this, child, x, y, width, height, ALIGN_CENTER$1);
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
      }, this);
    } else ;

    return this;
  };

  var GetValue$r = Phaser.Utils.Objects.GetValue;

  var Button = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Button, _ComponentBase);

    var _super = _createSuper(Button);

    function Button(gameObject, config) {
      var _this;

      _classCallCheck(this, Button);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      _this._enable = undefined;
      gameObject.setInteractive(GetValue$r(config, "inputConfig", undefined));

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(Button, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.lastClickTime = undefined;
        this.setEnable(GetValue$r(o, "enable", true));
        this.setMode(GetValue$r(o, "mode", 1));
        this.setClickInterval(GetValue$r(o, "clickInterval", 100));
        this.setDragThreshold(GetValue$r(o, 'threshold', undefined));
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
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        } // GameObject events will be removed when this gameObject destroyed 
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
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      } // internal

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
    }]);

    return Button;
  }(ComponentBase);

  var CLICKMODE = {
    press: 0,
    pointerdown: 0,
    release: 1,
    pointerup: 1
  };

  var ClickMethods = {
    onClick: function onClick(callback, scope, config) {
      if (!callback) {
        return this;
      }

      if (this._click === undefined) {
        this._click = new Button(this, config);
      }

      this._click.on('click', callback, scope);

      return this;
    },
    offClick: function offClick(callback, scope) {
      if (this._click === undefined) {
        return this;
      }

      this._click.off('click', callback, scope);

      return this;
    },
    enableClick: function enableClick(enabled) {
      if (this._click === undefined) {
        return this;
      }

      this._click.setEnable(enabled);

      return this;
    },
    disableClick: function disableClick() {
      if (this._click === undefined) {
        return this;
      }

      this._click.setEnable(false);

      return this;
    }
  };

  var BroadcastEvent = function BroadcastEvent() {
    var gameObjects = this.getAllChildren([this]);

    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
      var gameObject = gameObjects[i];
      gameObject.emit.apply(gameObject, arguments);
    }

    return this;
  };

  var methods$5 = {
    getSizerConfig: GetSizerConfig,
    getChildPrevState: GetChildPrevState,
    pushIntoBounds: PushIntoBounds,
    drawBounds: DrawBounds,
    resolveWidth: ResolveWidth$1,
    resolveChildrenWidth: ResolveChildrenWidth,
    resolveHeight: ResolveHeight$1,
    getChildWidth: GetChildWidth,
    getChildHeight: GetChildHeight,
    getExpandedChildWidth: GetExpandedChildWidth$1,
    getExpandedChildHeight: GetExpandedChildHeight$1,
    getChildrenWidth: GetChildrenWidth$1,
    getChildrenHeight: GetChildrenHeight$1,
    addChildrenMap: AddChildrenMap,
    addElement: AddChildrenMap,
    getElement: GetElement,
    getAllChildrenSizers: GetAllChildrenSizers,
    getChildrenSizers: GetChildrenSizers$1,
    preLayout: PreLayout$1,
    layout: Layout,
    runLayout: RunLayout,
    layoutChildren: LayoutChildren$1,
    runWidthWrap: RunWidthWrap,
    layoutBackgrounds: LayoutBackgrounds,
    postLayout: PostLayout,
    setAnchor: SetAnchor,
    isInTouching: IsInTouching,
    pointToChild: PointToChild,
    setDraggable: SetDraggable,
    broadcastEvent: BroadcastEvent
  };
  Object.assign(methods$5, PaddingMethods, AddChildMethods$1, GetParentSizerMethods, ScaleMethods, FadeMethods, EaseMoveMethods, ClickMethods, HideMethods, GetShownChildrenMethods);

  var GetValue$q = Phaser.Utils.Objects.GetValue;

  var Base = /*#__PURE__*/function (_Container) {
    _inherits(Base, _Container);

    var _super = _createSuper(Base);

    function Base(scene, x, y, minWidth, minHeight, config) {
      var _this;

      _classCallCheck(this, Base);

      _this = _super.call(this, scene, x, y, 2, 2);
      _this.isRexSizer = true;

      _this.setMinSize(minWidth, minHeight);

      _this.setName(GetValue$q(config, 'name', ''));

      _this.rexSizer = {};
      _this.space = {};
      _this.backgroundChildren = undefined;
      _this.sizerChildren = undefined; // [] or {}

      _this.layoutedChildren = undefined;
      var anchorConfig = GetValue$q(config, 'anchor', undefined);

      if (anchorConfig) {
        _this.setAnchor(anchorConfig);
      }

      _this.setInnerPadding(GetValue$q(config, 'space', 0));

      _this.setDraggable(GetValue$q(config, 'draggable', false));

      _this.setSizerEventsEnable(GetValue$q(config, 'sizerEvents', false));

      _this.setDirty(true);

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

        this.backgroundChildren = undefined;
        this.sizerChildren = undefined;
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

  Object.assign(Base.prototype, methods$5);

  var GetChildrenWidth = function GetChildrenWidth(minimumMode) {
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
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];

        if (child.rexSizer.hidden) {
          continue;
        }

        if (child.rexSizer.proportion === 0 || minimumMode && child.rexSizer.proportion > 0) {
          childWidth = this.getChildWidth(child);
        } else {
          childWidth = 0;
        }

        padding = child.rexSizer.padding;
        childWidth += padding.left + padding.right;

        if (i > 0) {
          childWidth += this.space.item;
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

  var GetChildrenHeight = function GetChildrenHeight(minimumMode) {
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
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];

        if (!child.hasOwnProperty('rexSizer')) {
          continue;
        }

        if (child.rexSizer.hidden) {
          continue;
        }

        padding = child.rexSizer.padding;

        if (child.rexSizer.proportion === 0 || minimumMode && child.rexSizer.proportion > 0) {
          childHeight = this.getChildHeight(child);
        } else {
          childHeight = 0;
        }

        childHeight += padding.top + padding.bottom;

        if (i > 0) {
          childHeight += this.space.item;
        }

        result += childHeight;
      }
    }

    return result + this.space.top + this.space.bottom;
  };

  var GetExpandedChildWidth = function GetExpandedChildWidth(child, parentWidth) {
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

  var GetExpandedChildHeight = function GetExpandedChildHeight(child, parentHeight) {
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

  var GetChildrenSizers = function GetChildrenSizers(out) {
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

  var PreLayout = function PreLayout() {
    this._childrenProportion = undefined;
    this.proportionLength = undefined;
    PreLayout$1.call(this);
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

  var LayoutChildren = function LayoutChildren() {
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

    for (var i = 0, cnt = children.length; i < cnt; i++) {
      child = !this.rtl ? children[i] : children[cnt - i - 1];

      if (child.rexSizer.hidden) {
        continue;
      }

      childConfig = child.rexSizer;
      padding = childConfig.padding;
      PreLayoutChild.call(this, child); // Set size

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
      } // Set position


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
    var width = ResolveWidth$1.call(this, width); // Calculate proportionLength

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

  var ResolveHeight = function ResolveHeight(parent, height) {
    var height = ResolveHeight$1.call(this, parent, height); // Get proportionLength

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

  var Space = /*#__PURE__*/function (_Zone) {
    _inherits(Space, _Zone);

    var _super = _createSuper(Space);

    function Space(scene) {
      var _this;

      _classCallCheck(this, Space);

      _this = _super.call(this, scene, 0, 0, 1, 1); // Don't add Zone into scene

      _this.isRexSpace = true;
      return _this;
    }

    return Space;
  }(Zone);

  var IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$p = Phaser.Utils.Objects.GetValue;
  var ALIGN_CENTER = Phaser.Display.Align.CENTER;
  var PROPORTIONMODE = {
    min: 0,
    full: -1
  };

  var Add = function Add(gameObject, proportion, align, paddingConfig, expand, childKey, index, minSize) {
    AddChild.call(this, gameObject);

    var proportionType = _typeof(proportion);

    if (proportion === null) {
      return this;
    } else if (proportionType === 'number') ; else if (proportionType === 'string') {
      proportion = PROPORTIONMODE[proportion];
    } else if (IsPlainObject$1(proportion)) {
      var config = proportion;
      proportion = GetValue$p(config, 'proportion', 0);
      align = GetValue$p(config, 'align', ALIGN_CENTER);
      paddingConfig = GetValue$p(config, 'padding', 0);
      expand = GetValue$p(config, 'expand', false);
      childKey = GetValue$p(config, 'key', undefined);
      index = GetValue$p(config, 'index', undefined);

      if (!gameObject.isRexSizer) {
        // Get minSize from config
        if (this.orientation === 0) {
          // x
          minSize = GetValue$p(config, 'minWidth', undefined);
        } else {
          // y
          minSize = GetValue$p(config, 'minHeight', undefined);
        }
      }
    }

    if (typeof align === 'string') {
      align = ALIGNMODE[align];
    }

    if (proportion === undefined) {
      proportion = 0;
    }

    if (align === undefined) {
      align = ALIGN_CENTER;
    }

    if (paddingConfig === undefined) {
      paddingConfig = 0;
    }

    if (expand === undefined) {
      expand = false;
    }

    if (!gameObject.isRexSizer && minSize === undefined) {
      // Get minSize from game object
      if (this.orientation === 0) {
        // x
        minSize = gameObject._minWidth;
      } else {
        // y
        minSize = gameObject._minHeight;
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

    if (!gameObject.isRexSizer && proportion > 0) {
      // Expand normal game object
      if (this.orientation === 0) {
        // x
        // minSize is still undefined, uses current display width
        gameObject.minWidth = minSize === undefined ? GetDisplayWidth(gameObject) : minSize;
        gameObject.minHeight = undefined;
      } else {
        gameObject.minWidth = undefined; // minSize is still undefined, uses current display height

        gameObject.minHeight = minSize === undefined ? GetDisplayHeight(gameObject) : minSize;
      }
    }

    if (childKey !== undefined) {
      this.addChildrenMap(childKey, gameObject);
    }

    return this;
  };

  var AddChildMethods = {
    add: Add,
    // sizer.add could be override
    addSpace: function addSpace(proportion) {
      this.insertSpace(undefined, proportion);
      return this;
    },
    insertSpace: function insertSpace(index, proportion) {
      if (proportion === undefined) {
        proportion = 1;
      }

      Add.call(this, new Space(this.scene), {
        proportion: proportion,
        minWidth: 0,
        minHeight: 0,
        index: index
      }); // No problem if sizer.add is override

      return this;
    },
    insert: function insert(index, gameObject, proportion, align, paddingConfig, expand, childKey) {
      Add.call(this, gameObject, proportion, align, paddingConfig, expand, childKey, index); // No problem if sizer.add is override

      return this;
    }
  };

  var RemoveItem$1 = Phaser.Utils.Array.Remove;
  var ContainerRemove = ContainerLite.prototype.remove;

  var RemoveChild = function RemoveChild(gameObject, destroyChild) {
    if (this.isBackground(gameObject)) {
      RemoveItem$1(this.backgroundChildren, gameObject);
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

  var RemoveItem = Phaser.Utils.Array.Remove;
  var RemoveChildMethods = {
    remove: function remove(gameObject, destroyChild) {
      if (this.getParentSizer(gameObject) !== this) {
        return this;
      }

      RemoveItem(this.sizerChildren, gameObject);
      RemoveChild.call(this, gameObject, destroyChild);
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

  var methods$4 = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,
    getChildrenSizers: GetChildrenSizers,
    preLayout: PreLayout,
    layoutChildren: LayoutChildren,
    resolveWidth: ResolveWidth,
    resolveHeight: ResolveHeight
  };
  Object.assign(methods$4, AddChildMethods, RemoveChildMethods);

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

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$o = Phaser.Utils.Objects.GetValue;

  var Sizer = /*#__PURE__*/function (_BaseSizer) {
    _inherits(Sizer, _BaseSizer);

    var _super = _createSuper(Sizer);

    function Sizer(scene, x, y, minWidth, minHeight, orientation, config) {
      var _this;

      _classCallCheck(this, Sizer);

      if (IsPlainObject(x)) {
        config = x;
        x = GetValue$o(config, 'x', 0);
        y = GetValue$o(config, 'y', 0);
        minWidth = GetValue$o(config, 'width', undefined);
        minHeight = GetValue$o(config, 'height', undefined);
        orientation = GetValue$o(config, 'orientation', 0);
      } else if (IsPlainObject(minWidth)) {
        config = minWidth;
        minWidth = GetValue$o(config, 'width', undefined);
        minHeight = GetValue$o(config, 'height', undefined);
        orientation = GetValue$o(config, 'orientation', 0);
      } else if (IsPlainObject(orientation)) {
        config = orientation;
        orientation = GetValue$o(config, 'orientation', 0);
      }

      if (orientation === undefined) {
        orientation = 0;
      }

      _this = _super.call(this, scene, x, y, minWidth, minHeight, config);
      _this.type = 'rexSizer';
      _this.sizerChildren = [];

      _this.setOrientation(orientation);

      _this.setItemSpacing(GetValue$o(config, 'space.item', 0));

      _this.setRTL(GetValue$o(config, 'rtl', false));

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
  }(Base);

  Object.assign(Sizer.prototype, methods$4);

  var SCROLLMODE$1 = {
    v: 0,
    vertical: 0,
    h: 1,
    horizontal: 1
  };

  var GetValue$n = Phaser.Utils.Objects.GetValue;

  var GetScrollMode = function GetScrollMode(config, key) {
    var scrollMode = GetValue$n(config, 'scrollMode', 0); // Vertical

    if (typeof scrollMode === 'string') {
      scrollMode = SCROLLMODE$1[scrollMode];
    }

    return scrollMode;
  };

  var Percent$2 = Phaser.Math.Percent;

  var PositionToPercent = function PositionToPercent(startPoint, endPoint, currentPoint) {
    var min, max, value;

    if (startPoint.y === endPoint.y) {
      min = Math.min(startPoint.x, endPoint.x);
      max = Math.max(startPoint.x, endPoint.x);
      value = Percent$2(currentPoint.x, min, max);
    } else if (startPoint.x === endPoint.x) {
      min = Math.min(startPoint.y, endPoint.y);
      max = Math.max(startPoint.y, endPoint.y);
      value = Percent$2(currentPoint.y, min, max);
    }

    return value;
  };

  var OnDragThumb = function OnDragThumb(pointer, dragX, dragY) {
    if (!this.enable) {
      return;
    }

    tmpPoint$4.x = dragX;
    tmpPoint$4.y = dragY;
    this.value = PositionToPercent(this.getStartPoint(), this.getEndPoint(), tmpPoint$4);
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
    var value = PositionToPercent(this.getStartPoint(), this.getEndPoint(), tmpPoint$3);
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

  var AlignRight = Phaser.Display.Align.RIGHT_CENTER;
  var AlignBottom = Phaser.Display.Align.BOTTOM_CENTER;

  var GetEndoint = function GetEndoint(out) {
    if (out === undefined) {
      out = tmpPoint;
    }

    if (this.childrenMap.thumb) {
      var align = this.orientation === 0 ? AlignRight : AlignBottom;
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

    PercentToPosition(t, this.getStartPoint(), this.getEndPoint(), thumb);
    this.resetChildPositionState(thumb);
    return this;
  };

  var AlignLeft = Phaser.Display.Align.LEFT_CENTER;
  var AlignTop = Phaser.Display.Align.TOP_CENTER;

  var UpdateIndicator = function UpdateIndicator(t) {
    var indicator = this.childrenMap.indicator;

    if (indicator === undefined) {
      return this;
    }

    if (t === undefined) {
      t = this.value;
    }

    var newWidth, newHeight;
    var thumb = this.childrenMap.thumb;

    if (thumb) {
      if (this.orientation === 0) {
        // x, extend width
        var thumbWidth = GetDisplayWidth(thumb);
        var thumbRight = thumb.x - thumbWidth * thumb.originX + thumbWidth;
        newWidth = thumbRight - this.left;
      } else {
        // y, extend height
        var thumbHeight = GetDisplayHeight(thumb);
        var thumbBottom = thumb.y - thumbHeight * thumb.originY + thumbHeight;
        newHeight = thumbBottom - this.top;
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
    var align = this.orientation === 0 ? AlignLeft : AlignTop;
    QuickSet(indicator, this, align);
    this.resetChildPositionState(indicator);
  };

  var GetValue$m = Phaser.Utils.Objects.GetValue;
  var Linear$1 = Phaser.Math.Linear;

  var EaseValueTask = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(EaseValueTask, _EaseValueTaskBase);

    var _super = _createSuper(EaseValueTask);

    function EaseValueTask(gameObject, config) {
      var _this;

      _classCallCheck(this, EaseValueTask);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;
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

        var gameObject = this.parent;
        this.propertyKey = GetValue$m(config, 'key', 'value');
        var currentValue = gameObject[this.propertyKey];
        this.fromValue = GetValue$m(config, 'from', currentValue);
        this.toValue = GetValue$m(config, 'to', currentValue);
        this.setEase(GetValue$m(config, 'ease', this.ease));
        this.setDuration(GetValue$m(config, 'duration', this.duration));
        this.timer.setDuration(this.duration);
        gameObject[this.propertyKey] = this.fromValue;

        _get(_getPrototypeOf(EaseValueTask.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(gameObject, timer) {
        var t = timer.t;
        t = this.easeFn(t);
        gameObject[this.propertyKey] = Linear$1(this.fromValue, this.toValue, t);
      }
    }]);

    return EaseValueTask;
  }(EaseValueTaskBase);

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

  var EaseValueMethods = {
    setEaseValuePropName: SetEaseValuePropName,
    setEaseValueDuration: SetEaseValueDuration,
    setEaseValueFunction: SetEaseValueFunction,
    stopEaseValue: StopEaseValue,
    easeValueTo: EaseValueTo
  };

  var GetValue$l = Phaser.Utils.Objects.GetValue;
  var Clamp$3 = Phaser.Math.Clamp;
  var Linear = Phaser.Math.Linear;
  var Percent$1 = Phaser.Math.Percent;
  var SnapTo = Phaser.Math.Snap.To;

  var Slider = /*#__PURE__*/function (_Sizer) {
    _inherits(Slider, _Sizer);

    var _super = _createSuper(Slider);

    function Slider(scene, config) {
      var _this;

      _classCallCheck(this, Slider);

      // Create sizer
      _this = _super.call(this, scene, config);
      _this.type = 'rexSlider';
      _this.eventEmitter = GetValue$l(config, 'eventEmitter', _assertThisInitialized(_this)); // Add elements

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
          minWidth: 0,
          minHeight: 0
        });
      }

      if (indicator) {
        _this.pin(indicator); // Put into container but not layout it

      }

      if (thumb) {
        _this.pin(thumb); // Put into container but not layout it

      } // Input


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

            thumb.on('drag', OnDragThumb, _assertThisInitialized(_this));
          }

          break;

        case 1:
          // 'click'
          _this.setInteractive().on('pointerdown', OnTouchTrack, _assertThisInitialized(_this)).on('pointermove', OnTouchTrack, _assertThisInitialized(_this));

          break;
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('track', track);

      _this.addChildrenMap('indicator', indicator);

      _this.addChildrenMap('thumb', thumb);

      var callback = GetValue$l(config, 'valuechangeCallback', null);

      if (callback !== null) {
        var scope = GetValue$l(config, 'valuechangeCallbackScope', undefined);

        _this.eventEmitter.on('valuechange', callback, scope);
      }

      _this.setEnable(GetValue$l(config, 'enable', undefined));

      _this.setGap(GetValue$l(config, 'gap', undefined));

      _this.setValue(GetValue$l(config, 'value', 0), GetValue$l(config, 'min', undefined), GetValue$l(config, 'max', undefined));

      _this.setEaseValuePropName('value').setEaseValueDuration(GetValue$l(config, 'easeValue.duration', 0)).setEaseValueFunction(GetValue$l(config, 'easeValue.ease', 'Linear'));

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
      value: function setGap(gap) {
        this.gap = gap;
        return this;
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this.gap !== undefined) {
          value = SnapTo(value, this.gap);
        }

        var oldValue = this._value;
        this._value = Clamp$3(value, 0, 1);

        if (oldValue !== this._value) {
          this.updateThumb(this._value);
          this.updateIndicator(this._value);
          this.eventEmitter.emit('valuechange', this._value, oldValue, this.eventEmitter);
        }
      }
    }, {
      key: "setValue",
      value: function setValue(value, min, max) {
        if (value === undefined || value === null) {
          return this;
        }

        if (min !== undefined) {
          value = Percent$1(value, min, max);
        }

        this.value = value;
        return this;
      }
    }, {
      key: "addValue",
      value: function addValue(inc, min, max) {
        if (min !== undefined) {
          inc = Percent$1(inc, min, max);
        }

        this.value += inc;
        return this;
      }
    }, {
      key: "getValue",
      value: function getValue(min, max) {
        var value = this.value;

        if (min !== undefined) {
          value = Linear(min, max, value);
        }

        return value;
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
  }(Sizer);

  var INPUTMODE = {
    pan: 0,
    drag: 0,
    click: 1,
    none: -1
  };
  var methods$3 = {
    getStartPoint: GetStartPoint,
    getEndPoint: GetEndoint,
    updateThumb: UpdateThumb,
    updateIndicator: UpdateIndicator
  };
  Object.assign(Slider.prototype, methods$3, EaseValueMethods);

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
  var GetValue$k = function GetValue(source, key, defaultValue) {
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

  var FSM = /*#__PURE__*/function () {
    /*
    var config = {
        start: 'A',   // default: undefined
        states: {
            A: {
                next: 'B',  // function() { return 'B'; }
                enter: function() {},
                exit: function() {}
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
      var states = GetValue$k(config, 'states', undefined);

      if (states) {
        this.addStates(states);
      } // Attach extend members


      var extend = GetValue$k(config, 'extend', undefined);

      if (extend) {
        for (var name in extend) {
          if (!this.hasOwnProperty(name) || this[name] === undefined) {
            this[name] = extend[name];
          }
        }
      } // Event emitter


      var eventEmitter = GetValue$k(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue$k(config, 'EventEmitterClass', undefined);
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
        this.setEnable(GetValue$k(o, 'enable', true));
        this.start(GetValue$k(o, 'start', undefined));
        var init = GetValue$k(o, 'init', undefined);

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
      key: "addState",
      value: function addState(name, config) {
        var getNextStateCallback = GetValue$k(config, 'next', undefined);

        if (getNextStateCallback) {
          this['next_' + name] = getNextStateCallback;
        }

        var exitCallback = GetValue$k(config, 'exit', undefined);

        if (exitCallback) {
          this['exit_' + name] = exitCallback;
        }

        var enterCallback = GetValue$k(config, 'enter', undefined);

        if (enterCallback) {
          this['enter_' + name] = enterCallback;
        }

        return this;
      }
    }, {
      key: "addStates",
      value: function addStates(states) {
        for (var name in states) {
          this.addState(name, states[name]);
        }

        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta, key) {
        if (key === undefined) {
          key = 'update';
        }

        var fn = this[key + '_' + this.state];

        if (fn) {
          fn.call(this, time, delta);
        }
      }
    }, {
      key: "preupdate",
      value: function preupdate(time, delta) {
        this.update(time, delta, 'preupdate');
      }
    }, {
      key: "postupdate",
      value: function postupdate(time, delta) {
        this.update(time, delta, 'postupdate');
      }
    }]);

    return FSM;
  }();

  Object.assign(FSM.prototype, EventEmitterMethods);

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
      } // IDLE -> DRAGBEGIN|DRAG

    }, {
      key: "next_IDLE",
      value: function next_IDLE() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;

        if (dragState.isDown) {
          nextState = parent.dragThreshold === 0 ? 'DRAG' : 'DRAGBEGIN';
        }

        return nextState;
      }
    }, {
      key: "update_IDLE",
      value: function update_IDLE(time, delta) {
        this.next();
      } // IDLE
      // DRAGBEGIN -> DRAG|IDLE

    }, {
      key: "next_DRAGBEGIN",
      value: function next_DRAGBEGIN() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;

        if (dragState.isDown) {
          nextState = dragState.pointer.getDistance() >= parent.dragThreshold ? 'DRAG' : 'DRAGBEGIN';
        } else {
          // dragState.isUp
          nextState = 'IDLE';
        }

        return nextState;
      }
    }, {
      key: "update_DRAGBEGIN",
      value: function update_DRAGBEGIN(time, delta) {
        this.next();
      } // DRAGBEGIN
      // DRAG -> BACK|SLIDE|IDLE

    }, {
      key: "next_DRAG",
      value: function next_DRAG() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;

        if (dragState.isUp) {
          if (parent.outOfBounds) {
            nextState = 'BACK';
          } else if (parent.slidingEnable) {
            nextState = 'SLIDE';
          } else {
            nextState = 'IDLE';
          }
        }

        return nextState;
      }
    }, {
      key: "update_DRAG",
      value: function update_DRAG(time, delta) {
        var parent = this.parent,
            dragState = parent.dragState;

        if (dragState.justMoved) {
          parent.dragging();
        }

        this.next();
      } // DRAG    
      // SLIDE -> DRAG|IDLE

    }, {
      key: "next_SLIDE",
      value: function next_SLIDE() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;

        if (dragState.isDown) {
          nextState = 'DRAG';
        } else if (!parent.isSliding) {
          nextState = 'IDLE';
        }

        return nextState;
      }
    }, {
      key: "enter_SLIDE",
      value: function enter_SLIDE() {
        this.parent.onSliding();
      }
    }, {
      key: "exit_SLIDE",
      value: function exit_SLIDE() {
        this.parent.stop();
      }
    }, {
      key: "update_SLIDE",
      value: function update_SLIDE(time, delta) {
        this.parent.sliding(time, delta);
        this.next();
      } // SLIDE    
      // BACK -> DRAG|IDLE

    }, {
      key: "next_BACK",
      value: function next_BACK() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;

        if (dragState.isDown) {
          nextState = 'DRAG';
        } else if (!parent.isPullBack) {
          nextState = 'IDLE';
        }

        return nextState;
      }
    }, {
      key: "enter_BACK",
      value: function enter_BACK() {
        this.parent.onPullBack();
      }
    }, {
      key: "exit_BACK",
      value: function exit_BACK() {
        this.parent.stop();
      }
    }, {
      key: "update_BACK",
      value: function update_BACK(time, delta) {
        this.parent.pullBack(time, delta);
        this.next();
      } // BACK

    }]);

    return State;
  }(FSM);

  var GetValue$j = Phaser.Utils.Objects.GetValue;
  var DistanceBetween$3 = Phaser.Math.Distance.Between;

  var DragSpeed = /*#__PURE__*/function (_ComponentBase) {
    _inherits(DragSpeed, _ComponentBase);

    var _super = _createSuper(DragSpeed);

    function DragSpeed(gameObject, config) {
      var _this;

      _classCallCheck(this, DragSpeed);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      _this._enable = undefined;
      gameObject.setInteractive(GetValue$j(config, "inputConfig", undefined));

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(DragSpeed, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.isInTouched = false;
        this.holdStartTime = undefined;
        this.x = undefined;
        this.y = undefined;
        this.preX = undefined;
        this.preY = undefined;
        this.localX = undefined;
        this.localY = undefined;
        this.justMoved = false;
        this.setEnable(GetValue$j(o, 'enable', true));
        this.holdThreshold = GetValue$j(o, 'holdThreshold', 50); // ms

        this.pointerOutReleaseEnable = GetValue$j(o, 'pointerOutRelease', true);
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        // Drag start only when pointer down
        this.parent.on('pointerdown', this.onPointIn, this); // this.parent.on('pointerover', this.onPointIn, this);

        this.parent.on('pointerup', this.onPointOut, this);

        if (this.pointerOutReleaseEnable) {
          this.parent.on('pointerout', this.onPointOut, this);
        }

        this.parent.on('pointermove', this.onPointerMove, this);
        this.scene.events.on('preupdate', this.preupdate, this);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        } // GameObject events will be removed when this gameObject destroyed 
        // this.parent.off('pointerdown', this.onPointIn, this);
        // this.parent.off('pointerup', this.onPointOut, this);
        // this.parent.off('pointerout', this.onPointOut, this);
        // this.parent.off('pointermove', this.onPointerMove, this);


        this.scene.events.off('preupdate', this.preupdate, this);
        this.pointer = undefined;

        _get(_getPrototypeOf(DragSpeed.prototype), "shutdown", this).call(this, fromScene);
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
          this.isInTouched = false;
          this.pointer = undefined;
        }

        this._enable = e;
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
      key: "setPointerOutReleaseEnable",
      value: function setPointerOutReleaseEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.pointerOutReleaseEnable = enable;
        return this;
      }
    }, {
      key: "isDown",
      get: function get() {
        return this.pointer && this.pointer.isDown;
      }
    }, {
      key: "isUp",
      get: function get() {
        return !this.isDown;
      }
    }, {
      key: "dx",
      get: function get() {
        return this.x - this.preX;
      }
    }, {
      key: "dy",
      get: function get() {
        return this.y - this.preY;
      }
    }, {
      key: "dt",
      get: function get() {
        var game = this.scene.sys.game;
        var delta = game.loop.delta;
        return delta;
      }
    }, {
      key: "speed",
      get: function get() {
        if (this.x === this.preX && this.y === this.preY) {
          return 0;
        }

        var d = DistanceBetween$3(this.preX, this.preY, this.x, this.y);
        var speed = d / (this.dt * 0.001);
        return speed;
      }
    }, {
      key: "speedX",
      get: function get() {
        return this.dx / (this.dt * 0.001);
      }
    }, {
      key: "speedY",
      get: function get() {
        return this.dy / (this.dt * 0.001);
      } // internal

    }, {
      key: "onPointIn",
      value: function onPointIn(pointer, localX, localY) {
        if (!this.enable || !pointer.isDown || this.pointer !== undefined) {
          return;
        }

        this.pointer = pointer;
        this.localX = localX;
        this.localY = localY;
      }
    }, {
      key: "onPointOut",
      value: function onPointOut(pointer) {
        if (!this.enable || this.pointer !== pointer) {
          return;
        }

        this.pointer = undefined;
      }
    }, {
      key: "onPointerMove",
      value: function onPointerMove(pointer, localX, localY) {
        if (!this.enable || !pointer.isDown || this.pointer !== pointer) {
          return;
        }

        this.localX = localX;
        this.localY = localY;
      }
    }, {
      key: "preupdate",
      value: function preupdate(time, delta) {
        if (!this.enable) {
          return;
        }

        var pointer = this.pointer;
        this.justMoved = false;

        if (pointer && !this.isInTouched) {
          // Touch start
          this.x = pointer.x;
          this.y = pointer.y;
          this.preX = pointer.x;
          this.preY = pointer.y;
          this.isInTouched = true;
          this.holdStartTime = undefined;
          this.emit('touchstart', pointer, this.localX, this.localY);
        } else if (pointer && this.isInTouched) {
          // In touch
          if (this.x === pointer.x && this.y === pointer.y) {
            // Hold
            if (this.holdStartTime === undefined) {
              this.holdStartTime = time;
            } else if (time - this.holdStartTime > this.holdThreshold) {
              this.preX = this.x;
              this.preY = this.y;
            }
          } else {
            // Move
            this.preX = this.x;
            this.preY = this.y;
            this.x = pointer.x;
            this.y = pointer.y;
            this.holdStartTime = undefined;
            this.justMoved = true;
            this.emit('touchmove', pointer, this.localX, this.localY);
          }
        } else if (!pointer && this.isInTouched) {
          // Touch end
          this.isInTouched = false;
          this.holdStartTime = undefined;
          this.emit('touchend', pointer);
        }
      }
    }]);

    return DragSpeed;
  }(ComponentBase);

  var GetValue$i = Phaser.Utils.Objects.GetValue;

  var Movement = /*#__PURE__*/function () {
    function Movement(config) {
      _classCallCheck(this, Movement);

      this.resetFromJSON(config);
    }

    _createClass(Movement, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setValue(GetValue$i(o, 'value', 0));
        this.setSpeed(GetValue$i(o, 'speed', 0));
        this.setAcceleration(GetValue$i(o, 'acceleration', 0));
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.setValue(0);
        this.setSpeed(0);
        this.setAcceleration(0);
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.value = value;
        return this;
      }
    }, {
      key: "setSpeed",
      value: function setSpeed(speed) {
        // speed == 0 : stop
        // speed  > 0 : move
        this.speed = speed;
        return this;
      }
    }, {
      key: "setAcceleration",
      value: function setAcceleration(acc) {
        // acc == 0 : constant speed
        // acc  > 0 : acceleration
        // acc  < 0 : deceleration
        this.acceleration = acc;
        return this;
      }
    }, {
      key: "updateSpeed",
      value: function updateSpeed(delta) {
        // delta in sec
        if (this.acceleration !== 0) {
          this.speed += this.acceleration * delta;

          if (this.speed < 0) {
            this.speed = 0;
          }
        }

        return this;
      }
    }, {
      key: "getDeltaValue",
      value: function getDeltaValue(delta) {
        // delta in sec
        this.updateSpeed(delta);

        if (this.speed <= 0) {
          return 0;
        }

        return this.speed * delta;
      }
    }, {
      key: "update",
      value: function update(delta) {
        // delta in sec
        this.updateSpeed(delta);

        if (this.speed > 0) {
          this.value += this.getDeltaValue(delta);
        }

        return this;
      }
    }, {
      key: "isMoving",
      get: function get() {
        return this.speed > 0;
      }
    }]);

    return Movement;
  }();

  var SlowDown = /*#__PURE__*/function () {
    function SlowDown() {
      _classCallCheck(this, SlowDown);

      this.value;
      this.dir; // true:+, false:-

      this.movement = new Movement();
    }

    _createClass(SlowDown, [{
      key: "init",
      value: function init(start, dir, speed, dec, end) {
        this.value = start;
        this.end = end;

        if (end !== undefined) {
          this.dir = start < end;
        } else {
          this.dir = dir;
        }

        this.movement.setSpeed(speed).setAcceleration(-dec);
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.movement.reset();
      }
    }, {
      key: "update",
      value: function update(delta) {
        // delta in sec
        var d = this.movement.getDeltaValue(delta);

        if (!this.dir) {
          d = -d;
        }

        if (this.end === undefined) {
          this.value += d;
        } else {
          if (d === 0) {
            this.value = this.end;
          } else {
            this.value += d;

            if (this.dir) {
              // +
              if (this.value > this.end) {
                this.value = this.end;
              }
            } else {
              // -
              if (this.value < this.end) {
                this.value = this.end;
              }
            }
          }
        }

        return this;
      }
    }, {
      key: "isMoving",
      get: function get() {
        return this.movement.isMoving;
      }
    }]);

    return SlowDown;
  }();

  var GetValue$h = Phaser.Utils.Objects.GetValue;
  var Clamp$2 = Phaser.Math.Clamp;

  var Scroller = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Scroller, _ComponentBase);

    var _super = _createSuper(Scroller);

    function Scroller(gameObject, config) {
      var _this;

      _classCallCheck(this, Scroller);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      var enable = GetValue$h(config, 'enable', true);
      _this._state = new State(_assertThisInitialized(_this), {
        enable: enable,
        eventEmitter: false
      });
      var drapSpeedConfig = {
        inputConfig: GetValue$h(config, 'inputConfig', undefined),
        enable: enable,
        pointerOutRelease: GetValue$h(config, 'pointerOutRelease', true),
        eventEmitter: false
      };
      _this.dragState = new DragSpeed(gameObject, drapSpeedConfig);
      _this._enable = undefined;
      _this._value = undefined;
      _this._slowDown = new SlowDown();
      var callback = GetValue$h(config, 'valuechangeCallback', null);

      if (callback !== null) {
        var scope = GetValue$h(config, 'valuechangeCallbackScope', undefined);

        _this.on('valuechange', callback, scope);
      }

      callback = GetValue$h(config, 'overmaxCallback', null);

      if (callback !== null) {
        var scope = GetValue$h(config, 'overmaxCallbackScope', undefined);

        _this.on('overmax', callback, scope);
      }

      callback = GetValue$h(config, 'overminCallback', null);

      if (callback !== null) {
        var scope = GetValue$h(config, 'overminCallbackScope', undefined);

        _this.on('overmin', callback, scope);
      }

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(Scroller, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setOrientationMode(GetValue$h(o, 'orientation', 0));
        this.setDragThreshold(GetValue$h(o, 'threshold', 10));
        this.setSlidingDeceleration(GetValue$h(o, 'slidingDeceleration', 5000));
        this.setBackDeceleration(GetValue$h(o, 'backDeceleration', 2000));
        var bounds = GetValue$h(o, 'bounds', undefined);

        if (bounds) {
          this.setBounds(bounds);
        } else {
          this.setBounds(GetValue$h(o, 'max', 0), GetValue$h(o, 'min', 0));
        }

        this.setValue(GetValue$h(o, 'value', this.maxValue || 0));
        this.setEnable(GetValue$h(o, "enable", true));
        return this;
      }
    }, {
      key: "boot",
      value: function boot() {
        this.scene.events.on('update', this._state.update, this._state);
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.scene.events.off('update', this._state.update, this._state);

        this._state.destroy(fromScene);

        this.dragState.destroy(fromScene);
        this._state = undefined;
        this.dragState = undefined;

        _get(_getPrototypeOf(Scroller.prototype), "shutdown", this).call(this, fromScene);
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

        this._state.setEnable(e);

        this.dragState.setEnable(e);
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
      key: "setOrientationMode",
      value: function setOrientationMode(m) {
        if (typeof m === 'string') {
          m = ORIENTATIONMODE[m];
        }

        this.orientationMode = m;
        return this;
      }
    }, {
      key: "setDragThreshold",
      value: function setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
      }
    }, {
      key: "setSlidingDeceleration",
      value: function setSlidingDeceleration(dec) {
        this.slidingDeceleration = dec;
        return this;
      }
    }, {
      key: "setBackDeceleration",
      value: function setBackDeceleration(dec) {
        this.backDeceleration = dec;
        return this;
      }
    }, {
      key: "setBounds",
      value: function setBounds(value0, value1) {
        if (Array.isArray(value0)) {
          var bounds = value0;
          value0 = bounds[0];
          value1 = bounds[1];
        }

        if (value0 < value1) {
          this.minValue = value0;
          this.maxValue = value1;
        } else {
          this.minValue = value1;
          this.maxValue = value0;
        }

        return this;
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (value === this._value) {
          return;
        }

        var oldValue = this._value;
        var isOverMax = this.overMax(value);
        var isOverMin = this.overMin(value);

        if (isOverMax) {
          this.emit('overmax', value, oldValue);
        }

        if (isOverMin) {
          this.emit('overmin', value, oldValue);
        }

        if (!this.backEnable) {
          if (isOverMax) {
            value = this.maxValue;
          }

          if (isOverMin) {
            value = this.minValue;
          }
        }

        this._value = value;
        this.emit('valuechange', value, oldValue);
      }
    }, {
      key: "setValue",
      value: function setValue(value, clamp) {
        if (clamp === undefined) {
          clamp = false;
        }

        if (clamp) {
          value = Clamp$2(value, this.minValue, this.maxValue);
        }

        this.value = value;
        return this;
      }
    }, {
      key: "addValue",
      value: function addValue(inc, clamp) {
        this.setValue(this.value + inc, clamp);
        return this;
      }
    }, {
      key: "state",
      get: function get() {
        return this._state.state;
      }
    }, {
      key: "isDragging",
      get: function get() {
        return this.dragState.isInTouched;
      }
    }, {
      key: "outOfMaxBound",
      get: function get() {
        return this.overMax(this.value);
      }
    }, {
      key: "outOfMinBound",
      get: function get() {
        return this.overMin(this.value);
      }
    }, {
      key: "outOfBounds",
      get: function get() {
        return this.outOfMinBound || this.outOfMaxBound;
      } // internal

    }, {
      key: "overMax",
      value: function overMax(value) {
        return this.maxValue != null && value > this.maxValue;
      }
    }, {
      key: "overMin",
      value: function overMin(value) {
        return this.minValue != null && value < this.minValue;
      }
    }, {
      key: "backEnable",
      get: function get() {
        return typeof this.backDeceleration === 'number';
      }
    }, {
      key: "isPullBack",
      get: function get() {
        return this._slowDown.isMoving;
      }
    }, {
      key: "slidingEnable",
      get: function get() {
        return typeof this.slidingDeceleration === 'number';
      }
    }, {
      key: "isSliding",
      get: function get() {
        return this._slowDown.isMoving;
      }
    }, {
      key: "dragDelta",
      get: function get() {
        if (this.orientationMode === 0) {
          // y
          return this.dragState.dy;
        } else if (this.orientationMode === 1) {
          // x
          return this.dragState.dx;
        } else {
          return 0;
        }
      }
    }, {
      key: "dragSpeed",
      get: function get() {
        if (this.orientationMode === 0) {
          // y
          return this.dragState.speedY;
        } else if (this.orientationMode === 1) {
          // x
          return this.dragState.speedX;
        } else {
          return 0;
        }
      } // everyTick_DRAG

    }, {
      key: "dragging",
      value: function dragging() {
        this.value += this.dragDelta;
      } // enter_SLIDE 

    }, {
      key: "onSliding",
      value: function onSliding() {
        var start = this.value;
        var speed = this.dragSpeed;

        if (speed === 0) {
          this._slowDown.stop();

          this._state.next();

          return;
        }

        var dec = this.slidingDeceleration;

        this._slowDown.init(start, speed > 0, Math.abs(speed), dec);
      } // everyTick_SLIDE

    }, {
      key: "sliding",
      value: function sliding(time, delta) {
        delta *= 0.001;

        var newValue = this._slowDown.update(delta).value;

        if (this.overMax(newValue)) {
          this.value = this.maxValue;

          this._slowDown.stop();
        } else if (this.overMin(newValue)) {
          this.value = this.minValue;

          this._slowDown.stop();
        } else {
          this.value = newValue;
        }
      } // enter_BACK

    }, {
      key: "onPullBack",
      value: function onPullBack() {
        var start = this.value;
        var end = this.outOfMinBound ? this.minValue : this.maxValue;
        var dist = Math.abs(end - start);
        var dec = this.backDeceleration;
        var speed = Math.sqrt(2 * dec * dist);

        this._slowDown.init(start, undefined, speed, dec, end);
      } // everyTick_BACK

    }, {
      key: "pullBack",
      value: function pullBack(time, delta) {
        delta *= 0.001;
        this.value = this._slowDown.update(delta).value;

        if (!this._slowDown.isMoving) {
          this._state.next();
        }
      } // exit_SLIDE, exit_BACK

    }, {
      key: "stop",
      value: function stop() {
        this._slowDown.stop();
      }
    }]);

    return Scroller;
  }(ComponentBase);

  var ORIENTATIONMODE = {
    y: 0,
    v: 0,
    vertical: 0,
    x: 1,
    h: 1,
    horizontal: 1
  };

  var GetValue$g = Phaser.Utils.Objects.GetValue;

  var MouseWheelScroller = /*#__PURE__*/function (_ComponentBase) {
    _inherits(MouseWheelScroller, _ComponentBase);

    var _super = _createSuper(MouseWheelScroller);

    function MouseWheelScroller(gameObject, config) {
      var _this;

      _classCallCheck(this, MouseWheelScroller);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      if (_this.parent !== _this.scene) {
        _this.focusMode = GetValue$g(config, 'focus', false);
      } else {
        _this.focusMode = false;
      }

      _this.setSpeed(GetValue$g(config, 'speed', 0.1));

      _this.setEnable(GetValue$g(config, 'enable', true));

      if (!_this.focusMode) {
        // Register on scene
        _this.scene.input.on('wheel', _this.onSceneScroll, _assertThisInitialized(_this));
      } else {
        var gameObject = _this.parent;
        gameObject.setInteractive(GetValue$g(config, "inputConfig", undefined)).on('wheel', function (pointer, dx, dy, dz, event) {
          if (!this.enable) {
            return;
          }

          this.scroll(dy);
        }, _assertThisInitialized(_this));
      }

      return _this;
    }

    _createClass(MouseWheelScroller, [{
      key: "destroy",
      value: function destroy() {
        if (!this.focusMode) {
          this.scene.input.off('wheel', this.onSceneScroll, this);
        }
      }
    }, {
      key: "onSceneScroll",
      value: function onSceneScroll(pointer, currentlyOver, dx, dy, dz, event) {
        if (!this.enable) {
          return;
        }

        this.scroll(dy);
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
      key: "setSpeed",
      value: function setSpeed(speed) {
        this.speed = speed;
        return this;
      }
    }, {
      key: "scroll",
      value: function scroll(dy) {
        dy *= this.speed;
        this.emit('scroll', dy, this.parent, this);
      }
    }]);

    return MouseWheelScroller;
  }(ComponentBase);

  var GetValue$f = Phaser.Utils.Objects.GetValue;

  var CreateScrollableSizer = function CreateScrollableSizer(parent, config) {
    var scene = parent.scene;
    var scrollMode = GetScrollMode(config);
    var scrollableSizer = new Sizer(scene, {
      orientation: scrollMode
    }); // A child which not put into scene

    var child = GetValue$f(config, 'child.gameObject', undefined);
    var sliderConfig = GetValue$f(config, 'slider', undefined),
        slider,
        sliderPosition = GetValue$f(sliderConfig, 'position', 0);

    if (typeof sliderPosition === 'string') {
      sliderPosition = SLIDER_POSITION_MAP[sliderPosition];
    }

    var isRightSlider = sliderPosition === 0; // Right/bottom slider

    var scrollerConfig = GetValue$f(config, 'scroller', true),
        scroller;
    var mouseWheelScrollerConfig = GetValue$f(config, 'mouseWheelScroller', false),
        mouseWheelScroller; // Child, slider, scroller, mouseWheelScroller

    if (child) {
      var childSpace = GetValue$f(config, 'space.child', 0);
      var childPadding = {};
      parent.childMargin = {};

      if (typeof childSpace !== 'number') {
        var paddingConfig = childSpace;

        if (scrollMode === 0) {
          childPadding.left = GetValue$f(paddingConfig, 'left', 0);
          childPadding.right = GetValue$f(paddingConfig, 'right', 0);
          parent.childMargin.top = GetValue$f(paddingConfig, 'top', 0);
          parent.childMargin.bottom = GetValue$f(paddingConfig, 'bottom', 0);
        } else {
          childPadding.top = GetValue$f(paddingConfig, 'top', 0);
          childPadding.bottom = GetValue$f(paddingConfig, 'bottom', 0);
          parent.childMargin.top = GetValue$f(paddingConfig, 'left', 0);
          parent.childMargin.bottom = GetValue$f(paddingConfig, 'right', 0);
        }
      } else {
        if (sliderConfig) {
          // Has slider
          if (scrollMode === 0) {
            childPadding = isRightSlider ? {
              right: childSpace
            } : {
              left: childSpace
            };
          } else {
            childPadding = isRightSlider ? {
              bottom: childSpace
            } : {
              top: childSpace
            };
          }
        }

        parent.childMargin.top = 0;
        parent.childMargin.bottom = 0;
      }

      if (sliderConfig) {
        if (sliderConfig === true) {
          sliderConfig = {};
        } // Vertical slider(orientation=1) for left-right scrollableSizer(orientation=0)
        // Horizontal slider(orientation=0) for top-bottom scrollableSizer(orientation=1)


        sliderConfig.orientation = scrollableSizer.orientation === 0 ? 1 : 0;
        slider = new Slider(scene, sliderConfig);
      }

      if (scrollerConfig) {
        if (scrollerConfig === true) {
          scrollerConfig = {};
        }

        scrollerConfig.orientation = scrollMode;
        scroller = new Scroller(child, scrollerConfig);
      }

      if (mouseWheelScrollerConfig) {
        mouseWheelScroller = new MouseWheelScroller(child, mouseWheelScrollerConfig);
      } // Add slider to parent sizer at left/top side


      if (slider && !isRightSlider) {
        scrollableSizer.add(slider, {
          proportion: 0,
          align: 'center',
          expand: true
        });
      } // Add child to parent sizer


      var proportion = GetValue$f(config, 'child.proportion', 1);
      var expand = GetValue$f(config, 'child.expand', true);
      scrollableSizer.add(child, {
        proportion: proportion,
        align: 'center',
        padding: childPadding,
        expand: expand
      }); // Add slider to parent sizer at right/bottom side

      if (slider && isRightSlider) {
        scrollableSizer.add(slider, {
          proportion: 0,
          align: 'center',
          expand: true
        });
      }
    } // Control


    if (slider) {
      slider.on('valuechange', function (newValue) {
        parent.t = newValue;
        parent.emit('scroll', parent);
      });
    }

    if (scroller) {
      scroller.on('valuechange', function (newValue) {
        parent.childOY = newValue;
        parent.emit('scroll', parent);
      });
    }

    if (mouseWheelScroller) {
      mouseWheelScroller.on('scroll', function (incValue) {
        parent.addChildOY(-incValue, true);
      });
    }

    parent.addChildrenMap('child', child);
    parent.addChildrenMap('slider', slider);
    parent.addChildrenMap('scroller', scroller);
    parent.addChildrenMap('mouseWheelScroller', mouseWheelScroller);
    return scrollableSizer;
  };

  var SLIDER_POSITION_MAP = {
    right: 0,
    left: 1,
    bottom: 0,
    top: 1
  };

  var ResizeController = function ResizeController() {
    var topChildOY = this.topChildOY;
    var bottomChildOY = this.bottomChildOY;
    var scroller = this.childrenMap.scroller;
    var slider = this.childrenMap.slider;

    if (scroller) {
      scroller.setBounds(bottomChildOY, topChildOY);
    }

    if (slider) {
      slider.setEnable(bottomChildOY !== topChildOY);
    }

    this.updateController();
    return this;
  };

  var UpdateController = function UpdateController() {
    var scroller = this.childrenMap.scroller;
    var slider = this.childrenMap.slider;

    if (scroller) {
      scroller.setValue(this.childOY);
    }

    if (slider) {
      slider.setValue(this.t);
    }
  };

  var GetValue$e = Phaser.Utils.Objects.GetValue;
  var Clamp$1 = Phaser.Math.Clamp;

  var Scrollable = /*#__PURE__*/function (_Sizer) {
    _inherits(Scrollable, _Sizer);

    var _super = _createSuper(Scrollable);

    function Scrollable(scene, config) {
      var _this;

      _classCallCheck(this, Scrollable);

      if (config === undefined) {
        config = {};
      }

      var scrollMode = GetScrollMode(config); // Left-to-right, or top-to-bottom
      // Create sizer

      config.orientation = scrollMode === 0 ? 1 : 0;
      _this = _super.call(this, scene, config);
      _this.type = GetValue$e(config, 'type', 'rexScrollable'); // Add elements

      var background = GetValue$e(config, 'background', undefined);
      var scrollableSizer = CreateScrollableSizer(_assertThisInitialized(_this), config);
      var header = GetValue$e(config, 'header', undefined);
      var footer = GetValue$e(config, 'footer', undefined); // Background

      if (background) {
        _this.addBackground(background);
      }

      if (header) {
        var align = GetValue$e(config, 'align.header', 'center');
        var headerSpace = GetValue$e(config, 'space.header', 0);
        var padding;

        if (scrollMode === 0) {
          padding = {
            bottom: headerSpace
          };
        } else {
          padding = {
            right: headerSpace
          };
        }

        var expand = GetValue$e(config, 'expand.header', true);

        _this.add(header, {
          proportion: 0,
          align: align,
          padding: padding,
          expand: expand
        });
      }

      if (scrollableSizer) {
        _this.add(scrollableSizer, {
          proportion: 1,
          align: 'center',
          padding: 0,
          expand: true
        });
      }

      if (footer) {
        var align = GetValue$e(config, 'align.footer', 'center');
        var footerSpace = GetValue$e(config, 'space.footer', 0);
        var padding;

        if (scrollMode === 0) {
          padding = {
            top: footerSpace
          };
        } else {
          padding = {
            left: footerSpace
          };
        }

        var expand = GetValue$e(config, 'expand.footer', true);

        _this.add(footer, {
          proportion: 0,
          align: align,
          padding: padding,
          expand: expand
        });
      }

      _this.addChildrenMap('background', background);

      _this.addChildrenMap('header', header);

      _this.addChildrenMap('footer', footer); // Necessary properties of child object
      // child.t (RW), child.childOY (RW), child.topChildOY (R), child.bottomChildOY (R)


      return _this;
    }

    _createClass(Scrollable, [{
      key: "runLayout",
      value: function runLayout(parent, newWidth, newHeight) {
        // Skip hidden or !dirty sizer
        if (this.ignoreLayout) {
          return this;
        }

        _get(_getPrototypeOf(Scrollable.prototype), "runLayout", this).call(this, parent, newWidth, newHeight);

        this.resizeController();
        return this;
      }
    }, {
      key: "t",
      get: function get() {
        var t = this.childrenMap.child.t; // Get outer childT

        var childMargin = this.childMargin;

        if (childMargin.top !== 0 || childMargin.bottom !== 0) {
          var child = this.childrenMap.child;
          var innerHeight = child.topChildOY - child.bottomChildOY;
          var outerHeight = innerHeight + childMargin.top + childMargin.bottom;
          var outerChildOY = innerHeight * t + childMargin.top;
          t = outerChildOY / outerHeight;
        }

        return t;
      },
      set: function set(t) {
        // Get inner childT
        var childMargin = this.childMargin;

        if (childMargin.top !== 0 || childMargin.bottom !== 0) {
          var child = this.childrenMap.child;
          var innerHeight = child.topChildOY - child.bottomChildOY;
          var outerHeight = innerHeight + childMargin.top + childMargin.bottom;
          var innerChildOY = outerHeight * t - childMargin.top;
          t = innerChildOY / innerHeight;
        }

        this.childrenMap.child.t = t;
        this.updateController();
      }
    }, {
      key: "childOY",
      get: function get() {
        return this.childrenMap.child.childOY;
      },
      set: function set(value) {
        this.childrenMap.child.childOY = value;
        this.updateController();
      }
    }, {
      key: "topChildOY",
      get: function get() {
        return this.childrenMap.child.topChildOY + this.childMargin.top;
      }
    }, {
      key: "bottomChildOY",
      get: function get() {
        return this.childrenMap.child.bottomChildOY - this.childMargin.bottom;
      }
    }, {
      key: "isOverflow",
      get: function get() {
        var child = this.childrenMap.child;
        return child.topChildOY !== child.bottomChildOY;
      }
    }, {
      key: "scrollMode",
      get: function get() {
        return this.orientation === 0 ? 1 : 0;
      }
    }, {
      key: "setChildOY",
      value: function setChildOY(value, clamp) {
        if (clamp === undefined) {
          clamp = false;
        }

        if (clamp) {
          value = Clamp$1(value, this.bottomChildOY, this.topChildOY);
        }

        this.childOY = value;
        return this;
      }
    }, {
      key: "addChildOY",
      value: function addChildOY(inc, clamp) {
        this.setChildOY(this.childOY + inc, clamp);
        return this;
      }
    }, {
      key: "setT",
      value: function setT(value, clamp) {
        if (clamp === undefined) {
          clamp = false;
        }

        if (clamp) {
          value = Clamp$1(value, 0, 1);
        }

        this.t = value;
        return this;
      }
    }, {
      key: "addT",
      value: function addT(inc, clamp) {
        this.setT(this.t + inc, clamp);
        return this;
      }
    }, {
      key: "scrollToTop",
      value: function scrollToTop() {
        this.t = 0;
        return this;
      }
    }, {
      key: "scrollToBottom",
      value: function scrollToBottom() {
        this.t = 1;
        return this;
      }
    }, {
      key: "sliderEnable",
      get: function get() {
        var slider = this.childrenMap.slider;

        if (!slider) {
          return false;
        }

        return slider.enable;
      },
      set: function set(value) {
        var slider = this.childrenMap.slider;

        if (!slider) {
          return;
        }

        slider.setEnable(value);
      }
    }, {
      key: "setSliderEnable",
      value: function setSliderEnable(enabled) {
        if (enabled === undefined) {
          enabled = true;
        }

        this.sliderEnable = enabled;
        return this;
      }
    }, {
      key: "scrollerEnable",
      get: function get() {
        var scroller = this.childrenMap.scroller;

        if (!scroller) {
          return false;
        }

        return scroller.enable;
      },
      set: function set(value) {
        var scroller = this.childrenMap.scroller;

        if (!scroller) {
          return;
        }

        scroller.setEnable(value);
      }
    }, {
      key: "setScrollerEnable",
      value: function setScrollerEnable(enabled) {
        if (enabled === undefined) {
          enabled = true;
        }

        this.scrollerEnable = enabled;
        return this;
      }
    }, {
      key: "mouseWheelScrollerEnable",
      get: function get() {
        var mouseWheelScroller = this.childrenMap.mouseWheelScroller;

        if (!mouseWheelScroller) {
          return false;
        }

        return mouseWheelScroller.enable;
      },
      set: function set(value) {
        var mouseWheelScroller = this.childrenMap.mouseWheelScrollerEnable;

        if (!mouseWheelScroller) {
          return;
        }

        mouseWheelScroller.setEnable(value);
      }
    }, {
      key: "setMouseWheelScrollerEnable",
      value: function setMouseWheelScrollerEnable(enabled) {
        if (enabled === undefined) {
          enabled = true;
        }

        this.mouseWheelScrollerEnable = enabled;
        return this;
      }
    }]);

    return Scrollable;
  }(Sizer);

  var Methods = {
    resizeController: ResizeController,
    updateController: UpdateController
  }; // mixin

  Object.assign(Scrollable.prototype, Methods);

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
      return key === undefined ? this.data : GetValue$k(this.data, key, defaultValue);
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

  var GetValue$d = Phaser.Utils.Objects.GetValue;
  var SpliceOne$1 = Phaser.Utils.Array.SpliceOne;

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
        this.setDefaultCellHeight(GetValue$d(o, 'cellHeight', 30));
        this.setDefaultCellWidth(GetValue$d(o, 'cellWidth', 30));
        this.initCells(GetValue$d(o, 'cellsCount', 0));
        this.setColumnCount(GetValue$d(o, 'columns', 1));
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
            SpliceOne$1(this.cells, cellIdx);
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

  var GetValue$c = Phaser.Utils.Objects.GetValue;
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

      this.setMaskUpdateMode(GetValue$c(config, 'updateMode', 0));
      this.enableChildrenMask(GetValue$c(config, 'padding', 0));
      this.setMaskLayer(GetValue$c(config, 'layer', undefined));
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

  var methods$2 = {
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
  Object.assign(methods$2, ChildrenMaskMethods);

  var Group = Phaser.GameObjects.Group;
  var Set = Phaser.Structs.Set;
  var GetValue$b = Phaser.Utils.Objects.GetValue;

  var GridTable$1 = /*#__PURE__*/function (_ContainerLite) {
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
      var reuseCellContainer = GetValue$b(config, 'reuseCellContainer', false);

      if (reuseCellContainer) {
        _this.cellContainersPool = new Group(scene); // Don't add Group into update list, I will destroy it manually
      }

      var callback = GetValue$b(config, 'cellVisibleCallback', null);

      if (callback !== null) {
        var scope = GetValue$b(config, 'cellVisibleCallbackScope', undefined);

        _this.on('cellvisible', callback, scope);
      }

      callback = GetValue$b(config, 'cellInvisibleCallback', null);

      if (callback !== null) {
        var scope = GetValue$b(config, 'cellInvisibleCallbackScope', undefined);

        _this.on('cellinvisible', callback, scope);
      }

      _this.setupChildrenMask(GetValue$b(config, 'mask', undefined));

      _this.setScrollMode(GetValue$b(config, 'scrollMode', 0));

      _this.setClampMode(GetValue$b(config, 'clamplTableOXY', true)); // Pre-process cell size


      if (_this.scrollMode === 0) {
        // scroll y
        var cellWidth = GetValue$b(config, 'cellWidth', undefined);
        _this.expandCellSize = cellWidth === undefined;

        if (cellWidth === undefined) {
          var columns = GetValue$b(config, 'columns', 1);
          config.cellWidth = _this.width / columns;
        }
      } else {
        // scroll x
        // Swap cell width and cell height
        var cellWidth = GetValue$b(config, 'cellHeight', undefined);
        var cellHeight = GetValue$b(config, 'cellWidth', undefined);
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

  Object.assign(GridTable$1.prototype, methods$2);
  var SCROLLMODE = {
    v: 0,
    vertical: 0,
    h: 1,
    horizontal: 1
  };

  var InjectProperties = function InjectProperties(table) {
    Object.defineProperty(table, 'childOY', {
      configurable: true,
      get: function get() {
        return table.tableOY;
      },
      set: function set(value) {
        table.tableOY = value;
      }
    });
    Object.defineProperty(table, 'topChildOY', {
      get: function get() {
        return table.topTableOY;
      }
    });
    Object.defineProperty(table, 'bottomChildOY', {
      get: function get() {
        return table.bottomTableOY;
      }
    });
  };

  var TableOnCellVisible = function TableOnCellVisible(table) {
    table.on('cellvisible', function (cell, cellContainer, table) {
      var callback = this.createCellContainerCallback;
      var scope = this.createCellContainerCallbackScope;
      cell.item = this.items[cell.index];
      var cellContainer;

      if (scope) {
        cellContainer = callback.call(scope, cell, cellContainer, table);
      } else {
        cellContainer = callback(cell, cellContainer, table);
      }

      if (cellContainer) {
        if (cellContainer.setOrigin) {
          cellContainer.setOrigin(0);
        }

        if (cellContainer.isRexSizer) {
          cellContainer.layout(); // Use original size
        }
      }

      cell.item = undefined;
      cell.setContainer(cellContainer);
    }, this);
  };

  var EmitCellEvent = function EmitCellEvent(eventEmitter, eventName, table, x, y, pointer, event) {
    var cellIndex;

    if (y === undefined) {
      cellIndex = x;
    } else {
      cellIndex = table.pointToCellIndex(x, y);
    }

    if (cellIndex === null || cellIndex === undefined) {
      return;
    }

    var cellContainer = table.getCellContainer(cellIndex);

    if (cellContainer) {
      eventEmitter.emit(eventName, cellContainer, cellIndex, pointer, event);
    }
  };

  var PointerUpDownCell = function PointerUpDownCell(table, tableConfig) {
    table.on('pointerdown', function (pointer, localX, localY, event) {
      EmitCellEvent(this.eventEmitter, 'cell.down', table, pointer.x, pointer.y, pointer, event);
    }, this).on('pointerup', function (pointer, localX, localY, event) {
      EmitCellEvent(this.eventEmitter, 'cell.up', table, pointer.x, pointer.y, pointer, event);
    }, this);
  };

  var OverCell = function OverCell(table, tableConfig) {
    table.on('pointermove', OnMove, this).on('pointerover', OnMove, this).on('pointerout', OnOut, this); // pointer-up is included too
  };

  var OnMove = function OnMove(pointer, localX, localY, event) {
    var table = this.childrenMap.child;
    var cellIndex = table.pointToCellIndex(pointer.x, pointer.y);

    if (cellIndex === table.input.lastOverCellIndex) {
      return;
    }

    var preCellIndex = table.input.lastOverCellIndex;
    table.input.lastOverCellIndex = cellIndex;
    EmitCellEvent(this.eventEmitter, 'cell.out', table, preCellIndex, undefined, pointer, event);
    EmitCellEvent(this.eventEmitter, 'cell.over', table, cellIndex, undefined, pointer, event);
  };

  var OnOut = function OnOut(pointer, event) {
    var table = this.childrenMap.child;
    var cellIndex = table.input.lastOverCellIndex;
    table.input.lastOverCellIndex = undefined;
    EmitCellEvent(this.eventEmitter, 'cell.out', table, cellIndex, undefined, pointer, event);
  };

  var GetValue$a = Phaser.Utils.Objects.GetValue;

  var ClickCell = function ClickCell(table, tableConfig) {
    var buttonConfig = GetValue$a(tableConfig, 'click', undefined);

    if (buttonConfig === false) {
      return;
    } else if (buttonConfig === undefined) {
      buttonConfig = {};
    }

    buttonConfig.threshold = 10;
    table._click = new Button(table, buttonConfig);

    table._click.on('click', function (button, gameObject, pointer, event) {
      EmitCellEvent(this.eventEmitter, 'cell.click', gameObject, pointer.x, pointer.y, pointer, event);
    }, this);
  };

  var GetValue$9 = Phaser.Utils.Objects.GetValue;

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
        gameObject.setInteractive(GetValue$9(config, "inputConfig", undefined));
      }

      _this._enable = undefined;

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(OnePointerTracer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$9(o, 'enable', true));
        this.setDetectBounds();

        if (this.gameObject === undefined) {
          this.setDetectBounds(GetValue$9(o, 'bounds', undefined));
        } else {
          this.setDetectBounds();
        }

        this.tracerState = TOUCH0$1; // this.recongizedState = new stateClass(this);

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
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.events.once('shutdown', this.destroy, this);
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
        this.scene.input.off('pointermove', this.onPointerMove, this);
        this.scene.events.off('shutdown', this.destroy, this);
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
      } // onLastPointerMove() { }

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

        this.scene.events.on('preupdate', this.preUpdate, this);
        this.scene.events.on('postupdate', this.postUpdate, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(OnePointerTracer.prototype), "stopTicking", this).call(this);

        if (this.scene) {
          // Scene might be destoryed
          this.scene.events.off('preupdate', this.preUpdate, this);
          this.scene.events.off('postupdate', this.postUpdate, this);
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

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var DistanceBetween$2 = Phaser.Math.Distance.Between;

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

        this.setHoldTime(GetValue$8(o, 'time', 250)); // min-hold-time of Press is 251

        this.setTapInterval(GetValue$8(o, 'tapInterval', 200));
        this.setDragThreshold(GetValue$8(o, 'threshold', 9));
        this.setTapOffset(GetValue$8(o, 'tapOffset', 10));
        var taps = GetValue$8(o, 'taps', undefined);

        if (taps !== undefined) {
          this.setTaps(taps);
        } else {
          this.setMaxTaps(GetValue$8(o, 'maxTaps', undefined));
          this.setMinTaps(GetValue$8(o, 'minTaps', undefined));
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
            var tapsOffset = DistanceBetween$2(pointer.upX, pointer.upY, pointer.x, pointer.y);

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
        } // Clear RECOGNIZED after update()


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

  var GetValue$7 = Phaser.Utils.Objects.GetValue;

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

        this.setDragThreshold(GetValue$7(o, 'threshold', 9));
        this.setHoldTime(GetValue$7(o, 'time', 251));
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

  var DistanceBetween$1 = Phaser.Math.Distance.Between;
  var AngleBetween$1 = Phaser.Math.Angle.Between;
  var VelocityMethods = {
    getDt: function getDt() {
      var game = this.scene.sys.game;
      var dt = game.loop.delta;
      return dt;
    },
    getVelocity: function getVelocity() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var d = DistanceBetween$1(p0.x, p0.y, p1.x, p1.y);
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

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var RadToDeg$1 = Phaser.Math.RadToDeg;

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

        this.setDragThreshold(GetValue$6(o, 'threshold', 10));
        this.setVelocityThreshold(GetValue$6(o, 'velocityThreshold', 1000));
        this.setDirectionMode(GetValue$6(o, 'dir', '8dir'));
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
        } // Clear RECOGNIZED after update()


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
        var angle = RadToDeg$1(this.getVelocityAngle());
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

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var SpliceOne = Phaser.Utils.Array.SpliceOne;
  var DistanceBetween = Phaser.Math.Distance.Between;
  var AngleBetween = Phaser.Math.Angle.Between;

  var TwoPointersTracer = /*#__PURE__*/function () {
    function TwoPointersTracer(scene, config) {
      _classCallCheck(this, TwoPointersTracer);

      var amount = scene.input.manager.pointersTotal - 1;

      if (amount < 2) {
        scene.input.addPointer(2 - amount);
      }

      this.scene = scene; // Event emitter

      this.setEventEmitter(GetValue$5(config, 'eventEmitter', undefined));
      this._enable = undefined;
      this.pointers = [];
      this.movedState = {};
      this.resetFromJSON(config);
      this.boot();
    }

    _createClass(TwoPointersTracer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$5(o, "enable", true));
        this.bounds = GetValue$5(o, 'bounds', undefined);
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
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.events.once('shutdown', this.destroy, this);
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
        this.scene.input.off('pointermove', this.onPointerMove, this);
        this.scene.events.off('shutdown', this.destroy, this);
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
        return DistanceBetween(p0.x, p0.y, p1.x, p1.y);
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

  var RotateAround = Phaser.Math.RotateAround;

  var RotateObjectAround = function RotateObjectAround(gameObject, x, y, angle) {
    RotateAround(gameObject, x, y, angle);
    gameObject.rotation += angle;
    return gameObject;
  };

  var SpinObject = function SpinObject(gameObject, camera) {
    if (!this.isRotation) {
      return this;
    }

    if (camera === undefined) {
      camera = this.pointers[0].camera;
    }

    var movementX = this.movementCenterX,
        movementY = this.movementCenterY;
    camera.getWorldPoint(this.centerX, this.centerY, tmpPos);
    var centerWorldX = tmpPos.x;
    var centerWorldY = tmpPos.y;
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

  var tmpPos = {};

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var WrapDegrees = Phaser.Math.Angle.WrapDegrees; // Wrap degrees: -180 to 180 

  var ShortestBetween = Phaser.Math.Angle.ShortestBetween;
  var RadToDeg = Phaser.Math.RadToDeg;
  var DegToRad = Phaser.Math.DegToRad;

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

        this.setDragThreshold(GetValue$4(o, 'threshold', 0));
        return this;
      }
    }, {
      key: "onDrag2Start",
      value: function onDrag2Start() {
        this.prevAngle = WrapDegrees(RadToDeg(this.angleBetween)); // Degrees

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
              var curAngle = WrapDegrees(RadToDeg(this.angleBetween));
              this.angle = ShortestBetween(this.prevAngle, curAngle);
              this.prevAngle = curAngle;
              this.state = RECOGNIZED;
            }

            break;

          case RECOGNIZED:
            var curAngle = WrapDegrees(RadToDeg(this.angleBetween));
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
        return DegToRad(this.angle);
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

  var methods$1 = {
    spinObject: SpinObject
  };
  Object.assign(Rotate.prototype, methods$1);
  var IDLE = 'IDLE';
  var BEGIN = 'BEGIN';
  var RECOGNIZED = 'RECOGNIZED';

  var GetValue$3 = Phaser.Utils.Objects.GetValue;

  var TapCell = function TapCell(table, tableConfig) {
    var tapConfig = GetValue$3(tableConfig, 'tap', undefined);

    if (tapConfig === false) {
      return;
    }

    table._tap = new Tap(table, tapConfig);

    table._tap.on('tap', function (tap, gameObject, lastPointer) {
      var eventName = "cell.".concat(tap.tapsCount, "tap");
      EmitCellEvent(this.eventEmitter, eventName, tap.gameObject, tap.x, tap.y, lastPointer);
    }, this);
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;

  var PressCell = function PressCell(table, tableConfig) {
    var pressConfig = GetValue$2(tableConfig, 'press', undefined);

    if (pressConfig === false) {
      return;
    }

    table._press = new Press(table, pressConfig);

    table._press.on('pressstart', function (press, gameObject, lastPointer) {
      EmitCellEvent(this.eventEmitter, 'cell.pressstart', table, press.x, press.y, lastPointer);
    }, this).on('pressend', function (press, gameObject, lastPointer) {
      EmitCellEvent(this.eventEmitter, 'cell.pressend', table, press.x, press.y, lastPointer);
    }, this);
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;

  var SwipeCell = function SwipeCell(table, tableConfig) {
    var swipeConfig = GetValue$1(tableConfig, 'swipe', undefined);

    if (swipeConfig === false) {
      return;
    } else if (swipeConfig === undefined) {
      swipeConfig = {};
    }

    swipeConfig.dir = '4dir';
    table._swipe = new Swipe(table, swipeConfig);

    table._swipe.on('swipe', function (swipe, gameObject, lastPointer) {
      var dirName = swipe.left ? 'left' : swipe.right ? 'right' : swipe.up ? 'up' : 'down';
      EmitCellEvent(this.eventEmitter, "cell.swipe".concat(dirName), table, swipe.x, swipe.y, lastPointer);
    }, this);
  };

  var TableSetInteractive = function TableSetInteractive(table, tableConfig) {
    table.setInteractive();
    PointerUpDownCell.call(this, table, tableConfig);
    OverCell.call(this, table, tableConfig);
    ClickCell.call(this, table, tableConfig);
    TapCell.call(this, table, tableConfig);
    PressCell.call(this, table, tableConfig);
    SwipeCell.call(this, table, tableConfig);
  };

  var SetItems = function SetItems(items) {
    if (items === undefined) {
      this.items.length = 0;
    } else {
      this.items = items;
    }

    var table = this.childrenMap.child;
    table.setCellsCount(this.items.length);
    table.updateTable(true);
    this.resizeController();
    return this;
  };

  var GetValue = Phaser.Utils.Objects.GetValue;

  var GridTable = /*#__PURE__*/function (_Scrollable) {
    _inherits(GridTable, _Scrollable);

    var _super = _createSuper(GridTable);

    function GridTable(scene, config) {
      var _this;

      _classCallCheck(this, GridTable);

      if (config === undefined) {
        config = {};
      } // Create grid table core


      var scrollMode = GetScrollMode(config);
      var tableConfig = GetValue(config, 'table', undefined);

      if (tableConfig === undefined) {
        tableConfig = {};
      }

      tableConfig.scrollMode = scrollMode;
      tableConfig.clamplTableOXY = GetValue(config, 'clamplChildOY', false);
      var tableWidth = GetValue(tableConfig, 'width', undefined);
      var tableHeight = GetValue(tableConfig, 'height', undefined);
      var table = new GridTable$1(scene, 0, 0, tableWidth, tableHeight, tableConfig);
      scene.add.existing(table); // Important: Add to display list for touch detecting

      var proportion, expand;

      if (scrollMode === 0) {
        proportion = tableWidth === undefined ? 1 : 0;
        expand = tableHeight === undefined;
      } else {
        proportion = tableHeight === undefined ? 1 : 0;
        expand = tableWidth === undefined;
      } // Inject properties for scrollable interface


      InjectProperties(table); // Fill config of scrollable

      config.type = 'rexGridTable';
      config.child = {
        gameObject: table,
        proportion: proportion,
        expand: expand
      };
      var spaceConfig = GetValue(config, 'space', undefined);

      if (spaceConfig) {
        spaceConfig.child = spaceConfig.table;
      }

      _this = _super.call(this, scene, config);

      _this.addChildrenMap('table', table);

      _this.eventEmitter = GetValue(config, 'eventEmitter', _assertThisInitialized(_this));
      var callback = GetValue(config, 'createCellContainerCallback', NOOP);
      var scope = GetValue(config, 'createCellContainerCallbackScope', undefined);

      _this.setCreateCellContainerCallback(callback, scope);

      TableOnCellVisible.call(_assertThisInitialized(_this), table);
      _this.resizeControllerFlag = false;
      var eventName = scrollMode === 0 ? 'cellheightchange' : 'cellwidthchange';
      table.on(eventName, function () {
        this.resizeControllerFlag = true;
      }, _assertThisInitialized(_this));

      if (GetValue(tableConfig, 'interactive', true)) {
        TableSetInteractive.call(_assertThisInitialized(_this), table, tableConfig);
      }

      _this.setItems(GetValue(config, 'items', []));

      scene.game.events.on('poststep', _this.onPostStep, _assertThisInitialized(_this));
      return _this;
    }

    _createClass(GridTable, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        this.scene.game.events.off('poststep', this.onPostStep, this);

        _get(_getPrototypeOf(GridTable.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "setCreateCellContainerCallback",
      value: function setCreateCellContainerCallback(callback, scope) {
        this.createCellContainerCallback = callback;
        this.createCellContainerCallbackScope = scope;
        return this;
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.setItems(this.items);
        return this;
      }
    }, {
      key: "getCell",
      value: function getCell(cellIdx) {
        var table = this.childrenMap.child;
        return table.getCell(cellIdx);
      }
    }, {
      key: "getCellContainer",
      value: function getCellContainer(cellIdx) {
        var table = this.childrenMap.child;
        return table.getCellContainer(cellIdx);
      }
    }, {
      key: "updateVisibleCell",
      value: function updateVisibleCell(cellIdx) {
        var table = this.childrenMap.child;
        return table.updateVisibleCell(cellIdx);
      }
    }, {
      key: "onPostStep",
      value: function onPostStep() {
        if (this.resizeControllerFlag) {
          this.resizeController();
          this.resizeControllerFlag = false;
        }
      }
    }]);

    return GridTable;
  }(Scrollable);

  var methods = {
    setItems: SetItems
  };
  Object.assign(GridTable.prototype, methods);

  return GridTable;

})));
