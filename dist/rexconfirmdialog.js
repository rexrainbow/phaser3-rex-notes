(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexconfirmdialog = factory());
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
  var RemoveItem$5 = Phaser.Utils.Array.Remove;
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
        RemoveItem$5(this.children, gameObjects,
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
  var Components$2 = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Base$1, [Components$2.Alpha, Components$2.Flip]);

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

  var DegToRad$4 = Phaser.Math.DegToRad;
  var RadToDeg$2 = Phaser.Math.RadToDeg;
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
          return RadToDeg$2(this.rotation);
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
      return GetParent$1(gameObject, name);
    },
    getTopmostParent: function getTopmostParent(gameObject) {
      if (gameObject === undefined) {
        gameObject = this;
      }
      return GetTopmostParent$1(gameObject);
    }
  };

  var GetValue$Z = Phaser.Utils.Objects.GetValue;
  var BaseAdd = Base$1.prototype.add;
  var Add$7 = function Add(gameObject, config) {
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
      state.syncPosition = GetValue$Z(config, 'syncPosition', true);
      state.syncRotation = GetValue$Z(config, 'syncRotation', true);
      state.syncScale = GetValue$Z(config, 'syncScale', true);
      state.syncAlpha = GetValue$Z(config, 'syncAlpha', true);
      state.syncScrollFactor = GetValue$Z(config, 'syncScrollFactor', true);
    }
  };
  var AddChild$1 = {
    // Can override this method
    add: function add(gameObject) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject);
      } else {
        Add$7.call(this, gameObject);
      }
      return this;
    },
    // Don't override this method
    pin: function pin(gameObject, config) {
      if (Array.isArray(gameObject)) {
        this.addMultiple(gameObject, config);
      } else {
        Add$7.call(this, gameObject, config);
      }
      return this;
    },
    addMultiple: function addMultiple(gameObjects) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Add$7.call(this, gameObjects[i]);
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

  var BaseRemove = Base$1.prototype.remove;
  var BaseClear = Base$1.prototype.clear;
  var RemoveChild$1 = {
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

  var RotateAround$3 = Phaser.Math.RotateAround;
  var Transform = {
    worldToLocal: function worldToLocal(point) {
      // Transform
      point.x -= this.x;
      point.y -= this.y;
      // Rotate
      RotateAround$3(point, 0, 0, -this.rotation);
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
      RotateAround$3(point, 0, 0, this.rotation);
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
      this._setParentContainerFlag = true;
      var gameObjects = this.getAllChildren([this]);
      SortGameObjectsByDepth(gameObjects);
      gameObjects.reverse();
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

  var Rectangle$4 = Phaser.Geom.Rectangle;
  var Vector2 = Phaser.Math.Vector2;
  var RotateAround$2 = Phaser.Math.RotateAround;
  var GetBounds = function GetBounds(gameObject, output) {
    if (output === undefined) {
      output = new Rectangle$4();
    } else if (output === true) {
      if (GlobRect$2 === undefined) {
        GlobRect$2 = new Rectangle$4();
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
      RotateAround$2(output, gameObject.x, gameObject.y, gameObject.rotation);
    }
    if (includeParent && gameObject.parentContainer) {
      var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();
      parentMatrix.transformPoint(output.x, output.y, output);
    }
    return output;
  };

  var Rectangle$3 = Phaser.Geom.Rectangle;
  var Union = Phaser.Geom.Rectangle.Union;
  var GetBoundsOfGameObjects = function GetBoundsOfGameObjects(gameObjects, out) {
    if (out === undefined) {
      out = new Rectangle$3();
    } else if (out === true) {
      if (GlobRect$1 === undefined) {
        GlobRect$1 = new Rectangle$3();
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

  var GetValue$Y = Phaser.Utils.Objects.GetValue;
  var Snapshot = function Snapshot(config) {
    if (!config) {
      return;
    }
    var gameObjects = config.gameObjects;
    var renderTexture = config.renderTexture;
    var x = GetValue$Y(config, 'x', undefined);
    var y = GetValue$Y(config, 'y', undefined);
    var width = GetValue$Y(config, 'width', undefined);
    var height = GetValue$Y(config, 'height', undefined);
    var originX = GetValue$Y(config, 'originX', 0);
    var originY = GetValue$Y(config, 'originY', 0);
    var padding = GetValue$Y(config, 'padding', 0);
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

  var GetValue$X = Phaser.Utils.Objects.GetValue;
  var DrawBounds$2 = function DrawBounds(gameObjects, graphics, config) {
    var color, lineWidth;
    if (typeof config === 'number') {
      color = config;
    } else {
      color = GetValue$X(config, 'color');
      lineWidth = GetValue$X(config, 'lineWidth');
      GetValue$X(config, 'padding', 0);
    }
    if (Array.isArray(gameObjects)) {
      for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        Draw(gameObjects[i], graphics, color, lineWidth);
      }
    } else {
      Draw(gameObjects, graphics, color, lineWidth);
    }
  };
  var Draw = function Draw(gameObject, graphics, color, lineWidth, padding) {
    var canDrawBound = gameObject.getBounds || gameObject.width !== undefined && gameObject.height !== undefined;
    if (!canDrawBound) {
      return;
    }
    if (color === undefined) {
      color = 0xffffff;
    }
    if (lineWidth === undefined) {
      lineWidth = 1;
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
    graphics.lineStyle(lineWidth, color).strokePoints(Points, true, true);
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

  var GetValue$W = Phaser.Utils.Objects.GetValue;
  var DrawBounds$1 = function DrawBounds(graphics, config) {
    var drawContainer = GetValue$W(config, 'drawContainer', true);
    var gameObjects = GetValue$W(config, 'children');
    if (gameObjects === undefined) {
      gameObjects = this.getAllVisibleChildren([this]);
    }
    if (!drawContainer) {
      gameObjects = gameObjects.filter(function (gameObject) {
        return !gameObject.isRexContainerLite;
      });
    }
    DrawBounds$2(gameObjects, graphics, config);
    return this;
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

  var methods$c = {
    changeOrigin: ChangeOrigin,
    drawBounds: DrawBounds$1
  };
  Object.assign(methods$c, Parent, AddChild$1, RemoveChild$1, ChildState, Transform, Position, Rotation, Scale$1, Visible, Alpha, Active, ScrollFactor, Mask, Depth, Children, Tween, P3Container, Layer, RenderTexture);

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
  }(Base$1);
  Object.assign(ContainerLite.prototype, methods$c);

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

  var Rectangle$2 = Phaser.Geom.Rectangle;
  var GetViewport = function GetViewport(scene, camera, out) {
    if (!IsCameraObject(camera)) {
      out = camera;
      camera = undefined;
    }
    if (out === undefined) {
      out = new Rectangle$2();
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
  var globRect = new Rectangle$2();

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

  var ALIGN$2 = Phaser.Display.Align;
  var AlignConst = {
    center: ALIGN$2.CENTER,
    left: ALIGN$2.LEFT_CENTER,
    right: ALIGN$2.RIGHT_CENTER,
    top: ALIGN$2.TOP_CENTER,
    bottom: ALIGN$2.BOTTOM_CENTER,
    'left-top': ALIGN$2.TOP_LEFT,
    'left-center': ALIGN$2.LEFT_CENTER,
    'left-bottom': ALIGN$2.BOTTOM_LEFT,
    'center-top': ALIGN$2.TOP_CENTER,
    'center-center': ALIGN$2.CENTER,
    'center-bottom': ALIGN$2.BOTTOM_CENTER,
    'right-top': ALIGN$2.TOP_RIGHT,
    'right-center': ALIGN$2.RIGHT_CENTER,
    'right-bottom': ALIGN$2.BOTTOM_RIGHT
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

  var GetValue$V = Phaser.Utils.Objects.GetValue;
  var Group = Phaser.GameObjects.Group;
  var DrawBounds = function DrawBounds(graphics, config) {
    var scene = graphics.scene;
    var color, lineWidth;
    var createTextCallback, createTextCallbackScope, textAlign;
    if (typeof config === 'number') {
      color = config;
    } else {
      color = GetValue$V(config, 'color');
      lineWidth = GetValue$V(config, 'lineWidth');
      var nameTextConfig = GetValue$V(config, 'name', false);
      if (nameTextConfig) {
        createTextCallback = GetValue$V(nameTextConfig, 'createTextCallback', DefaultCreateTextCallback);
        createTextCallbackScope = GetValue$V(nameTextConfig, 'createTextCallbackScope', undefined);
        textAlign = GetValue$V(nameTextConfig, 'align', 'left-top');
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
        GlobRect = GetBounds(child, GlobRect);
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

  var GetValue$U = Phaser.Utils.Objects.GetValue;
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
      out.left = GetValue$U(config, 'left', 0);
      out.right = GetValue$U(config, 'right', 0);
      out.top = GetValue$U(config, 'top', 0);
      out.bottom = GetValue$U(config, 'bottom', 0);
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

  var AddChildMethods$7 = {
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

  var RemoveItem$4 = Phaser.Utils.Array.Remove;
  var ContainerRemove = ContainerLite.prototype.remove;
  var RemoveChild = function RemoveChild(gameObject, destroyChild) {
    if (this.isBackground(gameObject)) {
      RemoveItem$4(this.backgroundChildren, gameObject);
    }
    ContainerRemove.call(this, gameObject, destroyChild);
    if (!destroyChild && this.sizerEventsEnable) {
      gameObject.emit('sizer.remove', gameObject, this);
      this.emit('remove', gameObject, this);
    }
    return this;
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

  var RemoveItem$3 = Phaser.Utils.Array.Remove;
  var RemoveChildMethods$7 = {
    removeFromParentSizer: function removeFromParentSizer() {
      var parent = GetParentSizerMethods.getParentSizer(gameObject);
      if (parent) {
        parent.remove(this);
      }
      return this;
    },
    removeBackground: function removeBackground(gameObject, destroyChild) {
      if (this.backgroundChildren === undefined) {
        return this;
      }
      if (this.getParentSizer(gameObject) !== this) {
        return this;
      }
      RemoveItem$3(this.backgroundChildren, gameObject);
      RemoveChild.call(this, gameObject, destroyChild);
      return this;
    },
    removeAllBackgrounds: function removeAllBackgrounds(destroyChild) {
      if (this.backgroundChildren === undefined) {
        return this;
      }
      for (var i = this.backgroundChildren.length - 1; i >= 0; i--) {
        this.remove(this.backgroundChildren[i], destroyChild);
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

  var GetValue$T = Phaser.Utils.Objects.GetValue;
  var GetPadding = function GetPadding(padding, key) {
    if (key === undefined) {
      return padding;
    }
    return padding[key];
  };
  var SetPadding = function SetPadding(padding, key, value) {
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
      padding.left = GetValue$T(key, 'left', 0);
      padding.right = GetValue$T(key, 'right', 0);
      padding.top = GetValue$T(key, 'top', 0);
      padding.bottom = GetValue$T(key, 'bottom', 0);
    }
    return padding;
  };

  var PaddingMethods = {
    getInnerPadding: function getInnerPadding(key) {
      return GetPadding(this.space, key);
    },
    setInnerPadding: function setInnerPadding(key, value) {
      SetPadding(this.space, key, value);
      return this;
    },
    getOuterPadding: function getOuterPadding(key) {
      return GetPadding(this.getSizerConfig(this).padding, key);
    },
    setOuterPadding: function setOuterPadding(key, value) {
      SetPadding(this.getSizerConfig(this).padding, key, value);
      return this;
    },
    getChildOuterPadding: function getChildOuterPadding(child, key) {
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

  var ResolveWidth$2 = function ResolveWidth(width) {
    if (width === undefined) {
      width = Math.max(this.childrenWidth, this.minWidth);
    }
    return width;
  };

  var ResolveChildrenWidth$1 = function ResolveChildrenWidth(parentWidth) {
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

  var ResolveHeight$2 = function ResolveHeight(height) {
    var minHeight = Math.max(this.childrenHeight, this.minHeight);
    if (height === undefined) {
      height = minHeight;
    }
    return height;
  };

  var PostResolveSize$1 = function PostResolveSize(width, height) {};

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
  var GetExpandedChildWidth$3 = function GetExpandedChildWidth(child, parentWidth) {
    return parentWidth;
  };

  // Override
  var GetExpandedChildHeight$3 = function GetExpandedChildHeight(child, parentHeight) {
    return parentHeight;
  };

  // Override
  var GetChildrenWidth$4 = function GetChildrenWidth() {
    return 0;
  };

  // Override
  var GetChildrenHeight$4 = function GetChildrenHeight() {
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
  var GetChildrenSizers$4 = function GetChildrenSizers(out) {
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

  var PreLayout$3 = function PreLayout() {
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
  var LayoutChildren$4 = function LayoutChildren() {};

  var PostLayout = function PostLayout(parent, newWidth, newHeight) {
    if (this._anchor) {
      this._anchor.updatePosition();
    }
    return this;
  };

  // Default method
  var RunWidthWrap$2 = function RunWidthWrap(parentWidth) {
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

  var GetValue$S = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$S(config, 'eventEmitter', true));

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

  var GetValue$R = Phaser.Utils.Objects.GetValue;
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
      _this.setTickingMode(GetValue$R(config, 'tickingMode', 1));
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

  var GetValue$Q = Phaser.Utils.Objects.GetValue;
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
      _this.tickEventName = GetValue$Q(config, 'tickEventName', defaultEventName);
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

  var GetValue$P = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;
  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);
      this.resetFromJSON(config);
    }
    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$P(o, 'state', IDLE$6);
        this.timeScale = GetValue$P(o, 'timeScale', 1);
        this.delay = GetValue$P(o, 'delay', 0);
        this.repeat = GetValue$P(o, 'repeat', 0);
        this.repeatCounter = GetValue$P(o, 'repeatCounter', 0);
        this.repeatDelay = GetValue$P(o, 'repeatDelay', 0);
        this.duration = GetValue$P(o, 'duration', 0);
        this.nowTime = GetValue$P(o, 'nowTime', 0);
        this.justRestart = GetValue$P(o, 'justRestart', false);
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

  var GetValue$O = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$4 = Phaser.Utils.Objects.GetAdvancedValue;
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
        this.timer.resetFromJSON(GetValue$O(o, 'timer'));
        this.setEnable(GetValue$O(o, 'enable', true));
        this.setTarget(GetValue$O(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue$4(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$4(o, 'duration', 1000));
        this.setEase(GetValue$O(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$O(o, 'repeat', 0));
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

  var GetValue$N = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$3 = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$3 = Phaser.Math.Linear;
  var Scale = /*#__PURE__*/function (_EaseValueTaskBase) {
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
        this.setMode(GetValue$N(o, 'mode', 0));
        this.setScaleRange(GetAdvancedValue$3(o, 'start', undefined), GetAdvancedValue$3(o, 'end', 0));
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
          this.startX = GetAdvancedValue$3(start, 'x', this.parent.scaleX);
          this.startY = GetAdvancedValue$3(start, 'y', this.parent.scaleY);
        }
        if (typeof end === 'number') {
          this.endX = end;
          this.endY = end;
        } else {
          this.endX = GetAdvancedValue$3(end, 'x', undefined);
          this.endY = GetAdvancedValue$3(end, 'y', undefined);
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
          gameObject.scaleX = Linear$3(this.startX, this.endX, t);
        }
        if (this.hasScaleY) {
          gameObject.scaleY = Linear$3(this.startY, this.endY, t);
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
      scale = new Scale(gameObject, config);
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
    config.ease = ease;
    if (scale === undefined) {
      scale = new Scale(gameObject, config);
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
      var parent = GetParentSizerMethods.getParentSizer(gameObject);
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
      var isInit = this._scaleBehavior === undefined;
      this._scaleBehavior = PopUp(this, duration, orientation, ease, this._scaleBehavior);
      if (isInit) {
        OnInitScale(this, this._scaleBehavior);
      }
      this._scaleBehavior.completeEventName = 'popup.complete';
      return this;
    },
    popUpPromise: function popUpPromise(duration, orientation, ease) {
      this.popUp(duration, orientation, ease);
      return WaitComplete(this._scaleBehavior);
    },
    scaleDownDestroy: function scaleDownDestroy(duration, orientation, ease, destroyMode) {
      if (IsPlainObject$g(duration)) {
        var config = duration;
        duration = config.duration;
        orientation = config.orientation;
        ease = config.ease;
        destroyMode = config.destroy;
      }
      var isInit = this._scaleBehavior === undefined;
      this._scaleBehavior = ScaleDownDestroy(this, duration, orientation, ease, destroyMode, this._scaleBehavior);
      if (isInit) {
        OnInitScale(this, this._scaleBehavior);
      }
      this._scaleBehavior.completeEventName = 'scaledown.complete';
      return this;
    },
    scaleDownDestroyPromise: function scaleDownDestroyPromise(duration, orientation, ease, destroyMode) {
      this.scaleDownDestroy(duration, orientation, ease, destroyMode);
      return WaitComplete(this._scaleBehavior);
    },
    scaleDown: function scaleDown(duration, orientation, ease) {
      this.scaleDownDestroy(duration, orientation, ease, false);
      return this;
    },
    scaleDownPromise: function scaleDownPromise(duration, orientation, ease) {
      this.scaleDown(duration, orientation, ease);
      return WaitComplete(this._scaleBehavior);
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
      var isInit = this._scaleBehavior === undefined;
      this._scaleBehavior = Yoyo(this, duration, peakValue, repeat, orientation, ease, this._scaleBehavior);
      if (isInit) {
        OnInitScale(this, this._scaleBehavior);
      }
      this._scaleBehavior.completeEventName = 'scaleyoyo.complete';
      return this;
    },
    scaleYoyoPromise: function scaleYoyoPromise(duration, peakValue, repeat, orientation, ease) {
      this.scaleYoyo(duration, peakValue, repeat, orientation, ease);
      return WaitComplete(this._scaleBehavior);
    }
  };

  var GetValue$M = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$2 = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$2 = Phaser.Math.Linear;
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
        this.setMode(GetValue$M(o, 'mode', 0));
        this.setAlphaRange(GetAdvancedValue$2(o, 'start', this.parent.alpha), GetAdvancedValue$2(o, 'end', 0));
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
        gameObject.alpha = Linear$2(this.alphaStart, this.alphaEnd, t);
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
      var parent = GetParentSizerMethods.getParentSizer(gameObject);
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

  var GetValue$L = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear$1 = Phaser.Math.Linear;
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
        this.setMode(GetValue$L(o, 'mode', 0));
        if (o && (o.hasOwnProperty('x') || o.hasOwnProperty('y'))) {
          var endX = GetAdvancedValue$1(o, 'x', undefined);
          var endY = GetAdvancedValue$1(o, 'y', undefined);
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
          this.startX = GetAdvancedValue$1(config, 'startX', undefined);
          this.startY = GetAdvancedValue$1(config, 'startY', undefined);
          this.endX = GetAdvancedValue$1(config, 'endX', undefined);
          this.endY = GetAdvancedValue$1(config, 'endY', undefined);
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
          gameObject.x = Linear$1(this.startX, this.endX, t);
        }
        if (this.hasMoveY) {
          gameObject.y = Linear$1(this.startY, this.endY, t);
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
  var DistanceBetween$4 = Phaser.Math.Distance.Between;
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
      var parent = GetParentSizerMethods.getParentSizer(gameObject);
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
      if (IsPlainObject$d(duration)) {
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
    },
    moveStop: function moveStop(toEnd) {
      if (!this._easeMove) {
        return this;
      }
      this._easeMove.stop(toEnd);
      return this;
    }
  };

  var GetValue$K = Phaser.Utils.Objects.GetValue;
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
        this.timer.resetFromJSON(GetValue$K(o, 'timer'));
        this.setEnable(GetValue$K(o, 'enable', true));
        this.setMode(GetValue$K(o, 'mode', 1));
        this.isRunning = GetValue$K(o, 'isRunning', false);
        this.setMagnitudeMode(GetValue$K(o, 'magnitudeMode', 1));
        this.setDuration(GetValue$K(o, 'duration', 500));
        this.setMagnitude(GetValue$K(o, 'magnitude', 10));
        this.ox = GetValue$K(o, 'ox', undefined);
        this.oy = GetValue$K(o, 'oy', undefined);
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
          magnitude = GetValue$K(config, 'magnitude', undefined);
          duration = GetValue$K(config, 'duration', undefined);
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

  var GetValue$J = Phaser.Utils.Objects.GetValue;
  var Linear = Phaser.Math.Linear;
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
        this.propertyKey = GetValue$J(config, 'key', 'value');
        var currentValue = target[this.propertyKey];
        this.fromValue = GetValue$J(config, 'from', currentValue);
        this.toValue = GetValue$J(config, 'to', currentValue);
        this.setEase(GetValue$J(config, 'ease', this.ease));
        this.setDuration(GetValue$J(config, 'duration', this.duration));
        this.setRepeat(GetValue$J(config, 'repeat', 0));
        this.setDelay(GetValue$J(config, 'delay', 0));
        this.setRepeatDelay(GetValue$J(config, 'repeatDelay', 0));
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
        target[this.propertyKey] = Linear(this.fromValue, this.toValue, t);
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
    var boundsRect = GetBounds(gameObject, true);
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

  var ALIGN_CENTER$4 = Phaser.Display.Align.CENTER;
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
      LayoutChild.call(this, child, x, y, width, height, ALIGN_CENTER$4);
    }
  };

  var SetDraggable = function SetDraggable(senser, draggable) {
    var senserType = _typeof(senser);
    if (senserType === 'string') {
      var senserName = senser;
      senser = this.getElement(senserName);
      if (!senser) {
        console.error("Can get element '".concat(senserName, "'"));
        return this;
      }
    } else if (senser === undefined || senserType != 'object') {
      draggable = senser;
      senser = this;
    }
    if (draggable === undefined) {
      draggable = true;
    }
    if (senser.input && senser.input._dragTopmostSizer) {
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
      senser.input._dragTopmostSizer = true;
    } else ;
    return this;
  };

  var GetValue$I = Phaser.Utils.Objects.GetValue;
  var Button = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Button, _ComponentBase);
    var _super = _createSuper(Button);
    function Button(gameObject, config) {
      var _this;
      _classCallCheck(this, Button);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;

      _this._enable = undefined;
      gameObject.setInteractive(GetValue$I(config, "inputConfig", undefined));
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(Button, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.lastClickTime = undefined;
        this.setEnable(GetValue$I(o, "enable", true));
        this.setMode(GetValue$I(o, "mode", 1));
        this.setClickInterval(GetValue$I(o, "clickInterval", 100));
        this.setDragThreshold(GetValue$I(o, 'threshold', undefined));
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

  var GetValue$H = Phaser.Utils.Objects.GetValue;
  var ClickOutside = /*#__PURE__*/function (_ComponentBase) {
    _inherits(ClickOutside, _ComponentBase);
    var _super = _createSuper(ClickOutside);
    function ClickOutside(gameObject, config) {
      var _this;
      _classCallCheck(this, ClickOutside);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;

      _this._enable = undefined;
      var inputConfig = GetValue$H(config, "inputConfig", undefined);
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
        this.setEnable(GetValue$H(o, "enable", true));
        this.setMode(GetValue$H(o, "mode", 1));
        this.setClickInterval(GetValue$H(o, "clickInterval", 100));
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
  var GetValue$G = function GetValue(source, key, defaultValue) {
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
      var states = GetValue$G(config, 'states', undefined);
      if (states) {
        this.addStates(states);
      }

      // Attach extend members
      var extend = GetValue$G(config, 'extend', undefined);
      if (extend) {
        for (var name in extend) {
          if (!this.hasOwnProperty(name) || this[name] === undefined) {
            this[name] = extend[name];
          }
        }
      }

      // Event emitter
      var eventEmitter = GetValue$G(config, 'eventEmitter', undefined);
      var EventEmitterClass = GetValue$G(config, 'EventEmitterClass', undefined);
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
        this.setEnable(GetValue$G(o, 'enable', true));
        this.start(GetValue$G(o, 'start', undefined));
        var init = GetValue$G(o, 'init', undefined);
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
        this._scene = GetValue$G(o, 'scene', undefined);
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

  var GetValue$F = Phaser.Utils.Objects.GetValue;
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
      _this.parent.setInteractive(GetValue$F(config, 'inputConfig', undefined));
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(InTouching, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.pointer = undefined;
        this.prevIsInTouch = false;
        this.isInTouching = false;
        this.setEnable(GetValue$F(o, 'enable', true));
        this.setCooldown(GetValue$F(o, 'cooldown', undefined));
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
          this.prevIsInTouch = false;
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
        if (!this.prevIsInTouch && this.isInTouching) {
          this.emit('touchstart', this, this.parent);
        }
        if (this.isInTouching && this.cooldown.request()) {
          this.emit('intouch', this, this.parent, this.pointer);
        }
        if (this.prevIsInTouch && !this.isInTouching) {
          this.emit('touchend', this, this.parent);
        }
        this.prevIsInTouch = this.isInTouching;
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
    onTouchingEnd: function onTouchingEnd(gameObject, callback, scope, config) {
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
      gameObject._inTouching.on('touchend', callback, scope);
      return this;
    },
    offTouchingEnd: function offTouchingEnd(gameObject, callback, scope) {
      if (typeof gameObject === 'function') {
        scope = callback;
        callback = gameObject;
        gameObject = this;
      }
      if (gameObject._inTouching === undefined) {
        return this;
      }
      gameObject._inTouching.off('touchend', callback, scope);
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

  var GetValue$E = Phaser.Utils.Objects.GetValue;
  var DownChild = function DownChild(config) {
    var downConfig = GetValue$E(config, 'down', undefined);
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

  var GetValue$D = Phaser.Utils.Objects.GetValue;
  var UpChild = function UpChild(config) {
    var upConfig = GetValue$D(config, 'up', undefined);
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

  var GetValue$C = Phaser.Utils.Objects.GetValue;
  var OverChild = function OverChild(config) {
    var overConfig = GetValue$C(config, 'over', undefined);
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

  var GetValue$B = Phaser.Utils.Objects.GetValue;
  var ClickChild = function ClickChild(config) {
    var clickConfig = GetValue$B(config, 'click', undefined);
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

  var GetValue$A = Phaser.Utils.Objects.GetValue;
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
        gameObject.setInteractive(GetValue$A(config, "inputConfig", undefined));
      }
      _this._enable = undefined;
      _this.resetFromJSON(config);
      _this.boot();
      return _this;
    }
    _createClass(OnePointerTracer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$A(o, 'enable', true));
        this.setDetectBounds();
        if (this.gameObject === undefined) {
          this.setDetectBounds(GetValue$A(o, 'bounds', undefined));
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

  var GetValue$z = Phaser.Utils.Objects.GetValue;
  var DistanceBetween$3 = Phaser.Math.Distance.Between;
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
        this.setHoldTime(GetValue$z(o, 'time', 250)); // min-hold-time of Press is 251
        this.setTapInterval(GetValue$z(o, 'tapInterval', 200));
        this.setDragThreshold(GetValue$z(o, 'threshold', 9));
        this.setTapOffset(GetValue$z(o, 'tapOffset', 10));
        var taps = GetValue$z(o, 'taps', undefined);
        if (taps !== undefined) {
          this.setTaps(taps);
        } else {
          this.setMaxTaps(GetValue$z(o, 'maxTaps', undefined));
          this.setMinTaps(GetValue$z(o, 'minTaps', undefined));
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
            var tapsOffset = DistanceBetween$3(pointer.upX, pointer.upY, pointer.x, pointer.y);
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

  var GetValue$y = Phaser.Utils.Objects.GetValue;
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
        this.setDragThreshold(GetValue$y(o, 'threshold', 9));
        this.setHoldTime(GetValue$y(o, 'time', 251));
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

  var DistanceBetween$2 = Phaser.Math.Distance.Between;
  var AngleBetween$1 = Phaser.Math.Angle.Between;
  var VelocityMethods = {
    getDt: function getDt() {
      var dt = GetTickDelta(this.scene);
      return dt;
    },
    getVelocity: function getVelocity() {
      var p1 = this.pointer.position;
      var p0 = this.pointer.prevPosition;
      var d = DistanceBetween$2(p0.x, p0.y, p1.x, p1.y);
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

  var GetValue$x = Phaser.Utils.Objects.GetValue;
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
        this.setDragThreshold(GetValue$x(o, 'threshold', 10));
        this.setVelocityThreshold(GetValue$x(o, 'velocityThreshold', 1000));
        this.setDirectionMode(GetValue$x(o, 'dir', '8dir'));
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

  var GetValue$w = Phaser.Utils.Objects.GetValue;
  var SpliceOne = Phaser.Utils.Array.SpliceOne;
  var DistanceBetween$1 = Phaser.Math.Distance.Between;
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
      this.setEventEmitter(GetValue$w(config, 'eventEmitter', undefined));
      this._enable = undefined;
      this.pointers = [];
      this.movedState = {};
      this.resetFromJSON(config);
      this.boot();
    }
    _createClass(TwoPointersTracer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEnable(GetValue$w(o, "enable", true));
        this.bounds = GetValue$w(o, 'bounds', undefined);
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
        return DistanceBetween$1(p0.x, p0.y, p1.x, p1.y);
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

  var GetValue$v = Phaser.Utils.Objects.GetValue;
  var WrapDegrees = Phaser.Math.Angle.WrapDegrees; // Wrap degrees: -180 to 180 
  var ShortestBetween = Phaser.Math.Angle.ShortestBetween;
  var RadToDeg = Phaser.Math.RadToDeg;
  var DegToRad$2 = Phaser.Math.DegToRad;
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
        this.setDragThreshold(GetValue$v(o, 'threshold', 0));
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
        return DegToRad$2(this.angle);
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
  var methods$b = {
    spinObject: SpinObject
  };
  Object.assign(Rotate.prototype, methods$b);
  var IDLE = 'IDLE';
  var BEGIN = 'BEGIN';
  var RECOGNIZED = 'RECOGNIZED';

  var GetValue$u = Phaser.Utils.Objects.GetValue;
  var TapChild = function TapChild(config) {
    var tapConfig = GetValue$u(config, 'tap', undefined);
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

  var GetValue$t = Phaser.Utils.Objects.GetValue;
  var PressChild = function PressChild(config) {
    var pressConfig = GetValue$t(config, 'press', undefined);
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

  var GetValue$s = Phaser.Utils.Objects.GetValue;
  var SwipeChild = function SwipeChild(config) {
    var swipeConfig = GetValue$s(config, 'swipe', undefined);
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

  var GetValue$r = Phaser.Utils.Objects.GetValue;
  var SetChildrenInteractive = function SetChildrenInteractive(gameObject, config) {
    gameObject.setInteractive();
    gameObject._childrenInteractive = {
      targetSizers: GetValue$r(config, 'targets', [gameObject]),
      eventEmitter: GetValue$r(config, 'eventEmitter', gameObject),
      eventNamePrefix: GetValue$r(config, 'inputEventPrefix', 'child.')
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
    SetChildrenInteractive(this, config);
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

  var methods$a = {
    getSizerConfig: GetSizerConfig,
    getChildPrevState: GetChildPrevState,
    pushIntoBounds: PushIntoBounds,
    drawBounds: DrawBounds,
    resolveWidth: ResolveWidth$2,
    resolveChildrenWidth: ResolveChildrenWidth$1,
    resolveHeight: ResolveHeight$2,
    postResolveSize: PostResolveSize$1,
    getChildWidth: GetChildWidth$1,
    getChildHeight: GetChildHeight,
    getExpandedChildWidth: GetExpandedChildWidth$3,
    getExpandedChildHeight: GetExpandedChildHeight$3,
    getChildrenWidth: GetChildrenWidth$4,
    getChildrenHeight: GetChildrenHeight$4,
    addChildrenMap: AddChildrenMap,
    addElement: AddChildrenMap,
    removeChildrenMap: RemoveChildrenMap,
    getElement: GetElement,
    getAllChildrenSizers: GetAllChildrenSizers,
    getChildrenSizers: GetChildrenSizers$4,
    preLayout: PreLayout$3,
    layout: Layout,
    runLayout: RunLayout,
    layoutChildren: LayoutChildren$4,
    runWidthWrap: RunWidthWrap$2,
    layoutBackgrounds: LayoutBackgrounds,
    postLayout: PostLayout,
    setAnchor: SetAnchor,
    isInTouching: IsInTouching,
    pointToChild: PointToChild$1,
    setDraggable: SetDraggable,
    setChildrenInteractive: SetChildrenInteractiveWrap,
    broadcastEvent: BroadcastEvent
  };
  Object.assign(methods$a, PaddingMethods, AddChildMethods$7, RemoveChildMethods$7, GetParentSizerMethods, ScaleMethods, FadeMethods, EaseMoveMethods, ShakeMethods, EaseDataMethods, ClickMethods, ClickOutsideMethods, TouchingMethods, HideMethods, GetShownChildrenMethods);

  var GetValue$q = Phaser.Utils.Objects.GetValue;
  var Base = /*#__PURE__*/function (_Container) {
    _inherits(Base, _Container);
    var _super = _createSuper(Base);
    function Base(scene, x, y, minWidth, minHeight, config) {
      var _this;
      _classCallCheck(this, Base);
      _this = _super.call(this, scene, x, y, 1, 1);
      _this.isRexSizer = true;
      _this.setMinSize(minWidth, minHeight);
      _this.setName(GetValue$q(config, 'name', ''));
      _this.rexSizer = {};
      _this.space = {};
      _this.backgroundChildren = undefined;
      _this.sizerChildren = undefined; // [] or {}
      _this.childrenMap = {};
      _this.layoutedChildren = undefined;
      var anchorConfig = GetValue$q(config, 'anchor', undefined);
      if (anchorConfig) {
        _this.setAnchor(anchorConfig);
      }
      _this.setInnerPadding(GetValue$q(config, 'space', 0));
      var draggable = GetValue$q(config, 'draggable', false);
      if (draggable) {
        _this.setDraggable(draggable);
      }
      _this.setSizerEventsEnable(GetValue$q(config, 'sizerEvents', false));
      _this.setDirty(true);
      if (GetValue$q(config, 'enableLayer', false)) {
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
  Object.assign(Base.prototype, methods$a);

  var GetChildrenWidth$3 = function GetChildrenWidth(minimumMode) {
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

  var GetChildrenHeight$3 = function GetChildrenHeight(minimumMode) {
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

  var GetExpandedChildWidth$2 = function GetExpandedChildWidth(child, parentWidth) {
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

  var GetExpandedChildHeight$2 = function GetExpandedChildHeight(child, parentHeight) {
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

  var GetChildrenSizers$3 = function GetChildrenSizers(out) {
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

  var PreLayout$2 = function PreLayout() {
    // Resize child to 1x1 for ratio-fit 
    this.hasRatioFitChild = false;
    var children = this.sizerChildren;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
      var child = children[i];
      if (child.rexSizer.hidden) {
        continue;
      }
      if (!child.rexSizer.fitRatio) {
        continue;
      }
      ResizeGameObject(child, 1, 1);
      this.hasRatioFitChild = true;
    }
    this._childrenProportion = undefined;
    this.proportionLength = undefined;
    PreLayout$3.call(this);
    return this;
  };

  var PostResolveSize = function PostResolveSize(width, height) {
    if (this.hasRatioFitChild) {
      // Resize child for ratio-fit 
      var innerHeight;
      if (this.orientation === 0) {
        innerHeight = height - this.getInnerPadding('top') - this.getInnerPadding('bottom');
      } else {
        width - this.getInnerPadding('left') - this.getInnerPadding('right');
      }
      var children = this.sizerChildren,
        childWidth,
        childHeight;
      for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (child.rexSizer.hidden) {
          continue;
        }
        var fitRatio = child.rexSizer.fitRatio;
        if (!fitRatio) {
          continue;
        }
        if (this.orientation === 0) {
          childHeight = innerHeight - this.getChildOuterPadding(child, 'top') - this.getChildOuterPadding(child, 'bottom');
          childWidth = childHeight * fitRatio;
        } else {
          childWidth = innerHeight - this.getChildOuterPadding(child, 'top') - this.getChildOuterPadding(child, 'bottom');
          childHeight = childWidth / fitRatio;
        }
        ResizeGameObject(child, childWidth, childHeight);
        if (child.isRexSizer) {
          child.setMinSize(childWidth, childHeight);
        }
      }
      this.proportionLength = undefined;
      this._childrenWidth = undefined;
      this.resolveWidth(width, true);
    }
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

  var Wrap = Phaser.Math.Wrap;
  var LayoutChildren$3 = function LayoutChildren() {
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
        childIndex = Wrap(i + startChildIndex, 0, cnt);
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

  var ResolveWidth$1 = function ResolveWidth(width) {
    var width = ResolveWidth$2.call(this, width);

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

  var ResolveHeight$1 = function ResolveHeight(height) {
    var height = ResolveHeight$2.call(this, height);

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
  var Space = /*#__PURE__*/function (_Zone) {
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
  var GetValue$p = Phaser.Utils.Objects.GetValue;
  var ALIGN_CENTER$3 = Phaser.Display.Align.CENTER;
  var PROPORTIONMODE = {
    min: 0,
    full: -1
  };
  var Add$6 = function Add(gameObject, proportion, align, paddingConfig, expand, childKey, index, minWidth, minHeight, fitRatio) {
    AddChild.call(this, gameObject);
    var isRexSpace = gameObject.isRexSpace;
    var proportionType = _typeof(proportion);
    if (proportion === null) {
      return this;
    } else if (proportionType === 'number') ; else if (proportionType === 'string') {
      proportion = PROPORTIONMODE[proportion];
    } else if (IsPlainObject$a(proportion)) {
      var config = proportion;
      proportion = GetValue$p(config, 'proportion', undefined);
      align = GetValue$p(config, 'align', ALIGN_CENTER$3);
      paddingConfig = GetValue$p(config, 'padding', 0);
      expand = GetValue$p(config, 'expand', false);
      childKey = GetValue$p(config, 'key', undefined);
      index = GetValue$p(config, 'index', undefined);
      if (!gameObject.isRexSizer) {
        minWidth = GetValue$p(config, 'minWidth', undefined);
        minHeight = GetValue$p(config, 'minHeight', undefined);
      }
      fitRatio = GetValue$p(config, 'fitRatio', 0); // width/height
    }

    if (typeof align === 'string') {
      align = AlignConst[align];
    }
    if (proportion === undefined) {
      proportion = isRexSpace ? 1 : 0;
    }
    if (align === undefined) {
      align = ALIGN_CENTER$3;
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
    if (fitRatio === undefined) {
      fitRatio = 0;
    }
    var config = this.getSizerConfig(gameObject);
    config.proportion = proportion;
    config.align = align;
    config.padding = GetBoundsConfig(paddingConfig);
    config.expand = expand;
    config.fitRatio = proportion === 0 ? fitRatio : 0;
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
  var AddChildMethods$6 = {
    add: Add$6,
    // sizer.add could be override
    addSpace: function addSpace(proportion) {
      this.insertSpace(undefined, proportion);
      return this;
    },
    insertSpace: function insertSpace(index, proportion) {
      if (proportion === undefined) {
        proportion = 1;
      }
      Add$6.call(this, new Space(this.scene), {
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
      Add$6.call(this, gameObject, proportion, align, paddingConfig, expand, childKey, index, minSize);
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

  var RemoveItem$2 = Phaser.Utils.Array.Remove;
  var RemoveChildMethods$6 = {
    remove: function remove(gameObject, destroyChild) {
      if (this.getParentSizer(gameObject) !== this) {
        return this;
      }
      RemoveItem$2(this.sizerChildren, gameObject);
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

  var ExpandMethods = {
    getChildExpand: function getChildExpand(gameObject) {
      return this.getSizerConfig(gameObject).expand;
    },
    setChildExpand: function setChildExpand(gameObject, expand) {
      this.getSizerConfig(gameObject).expand = expand;
      return this;
    }
  };

  var methods$9 = {
    getChildrenWidth: GetChildrenWidth$3,
    getChildrenHeight: GetChildrenHeight$3,
    getExpandedChildWidth: GetExpandedChildWidth$2,
    getExpandedChildHeight: GetExpandedChildHeight$2,
    getChildrenSizers: GetChildrenSizers$3,
    preLayout: PreLayout$2,
    postResolveSize: PostResolveSize,
    layoutChildren: LayoutChildren$3,
    resolveWidth: ResolveWidth$1,
    resolveHeight: ResolveHeight$1
  };
  Object.assign(methods$9, AddChildMethods$6, RemoveChildMethods$6, AlignMethods, ProportionMethods, ExpandMethods);

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
  var GetValue$o = Phaser.Utils.Objects.GetValue;
  var Sizer = /*#__PURE__*/function (_BaseSizer) {
    _inherits(Sizer, _BaseSizer);
    var _super = _createSuper(Sizer);
    function Sizer(scene, x, y, minWidth, minHeight, orientation, config) {
      var _this;
      _classCallCheck(this, Sizer);
      if (IsPlainObject$9(x)) {
        config = x;
        x = GetValue$o(config, 'x', 0);
        y = GetValue$o(config, 'y', 0);
        minWidth = GetValue$o(config, 'width', undefined);
        minHeight = GetValue$o(config, 'height', undefined);
        orientation = GetValue$o(config, 'orientation', 0);
      } else if (IsPlainObject$9(minWidth)) {
        config = minWidth;
        minWidth = GetValue$o(config, 'width', undefined);
        minHeight = GetValue$o(config, 'height', undefined);
        orientation = GetValue$o(config, 'orientation', 0);
      } else if (IsPlainObject$9(orientation)) {
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
      _this.setStartChildIndex(GetValue$o(config, 'startChildIndex', 0));
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
  }(Base);
  Object.assign(Sizer.prototype, methods$9);

  var GetChildrenWidth$2 = function GetChildrenWidth() {
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

  var GetChildrenHeight$2 = function GetChildrenHeight() {
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

  var GetExpandedChildWidth$1 = function GetExpandedChildWidth(child, parentWidth) {
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

  var GetExpandedChildHeight$1 = function GetExpandedChildHeight(child, parentHeight) {
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

  var GetChildrenSizers$2 = function GetChildrenSizers(out) {
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

  var LayoutChildren$2 = function LayoutChildren() {
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

  var IsPlainObject$8 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$n = Phaser.Utils.Objects.GetValue;
  var ALIGN_CENTER$2 = Phaser.Display.Align.CENTER;
  var UUID = Phaser.Utils.String.UUID;
  var Add$5 = function Add(gameObject, childKey, align, padding, expand, minWidth, minHeight, offsetX, offsetY) {
    AddChild.call(this, gameObject);
    if (IsPlainObject$8(childKey)) {
      var config = childKey;
      childKey = GetValue$n(config, 'key', undefined);
      align = GetValue$n(config, 'align', ALIGN_CENTER$2);
      offsetX = GetValue$n(config, 'offsetX', 0);
      offsetY = GetValue$n(config, 'offsetY', 0);
      padding = GetValue$n(config, 'padding', 0);
      expand = GetValue$n(config, 'expand', true);
      if (!gameObject.isRexSizer) {
        // Get minWidth,minHeight from config
        minWidth = GetValue$n(config, 'minWidth', gameObject._minWidth);
        minHeight = GetValue$n(config, 'minHeight', gameObject._minHeighted);
      }
    }
    var hasValidKey = childKey !== undefined;
    if (!hasValidKey) {
      childKey = UUID();
    }
    if (typeof align === 'string') {
      align = AlignConst[align];
    }
    if (align === undefined) {
      align = ALIGN_CENTER$2;
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
    if (IsPlainObject$8(expand)) {
      config.expandWidth = GetValue$n(expand, 'width', false);
      config.expandHeight = GetValue$n(expand, 'height', false);
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
  var AddChildMethods$5 = {
    add: Add$5
  };

  var RemoveChildMethods$5 = {
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
      RemoveChild.call(this, gameObject, destroyChild);
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
    getChildrenWidth: GetChildrenWidth$2,
    getChildrenHeight: GetChildrenHeight$2,
    getExpandedChildWidth: GetExpandedChildWidth$1,
    getExpandedChildHeight: GetExpandedChildHeight$1,
    getChildrenSizers: GetChildrenSizers$2,
    layoutChildren: LayoutChildren$2
  };
  Object.assign(methods$8, AddChildMethods$5, RemoveChildMethods$5);

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

  var IsPlainObject$7 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$m = Phaser.Utils.Objects.GetValue;
  var OverlapSizer = /*#__PURE__*/function (_BaseSizer) {
    _inherits(OverlapSizer, _BaseSizer);
    var _super = _createSuper(OverlapSizer);
    function OverlapSizer(scene, x, y, minWidth, minHeight, config) {
      var _this;
      _classCallCheck(this, OverlapSizer);
      if (IsPlainObject$7(x)) {
        config = x;
        x = GetValue$m(config, 'x', 0);
        y = GetValue$m(config, 'y', 0);
        minWidth = GetValue$m(config, 'width', undefined);
        minHeight = GetValue$m(config, 'height', undefined);
      } else if (IsPlainObject$7(minWidth)) {
        config = minWidth;
        minWidth = GetValue$m(config, 'width', undefined);
        minHeight = GetValue$m(config, 'height', undefined);
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
  }(Base);
  Object.assign(OverlapSizer.prototype, methods$8);

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

  var SizerRmove$2 = Sizer.prototype.remove;
  var SizerClear$2 = Sizer.prototype.clear;
  var Remove$2 = function Remove(gameObject, destroyChild) {
    if (this.getParentSizer(gameObject) !== this) {
      return this;
    }
    this.buttonGroup.remove(gameObject);
    SizerRmove$2.call(this, gameObject, destroyChild);
    return this;
  };
  var RemoveChildMethods$4 = {
    remove: function remove(gameObject, destroyChild) {
      // Remove gameObject no matter it is a button or not
      if (IsArray(gameObject)) {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
          Remove$2.call(this, gameObjects[i], destroyChild);
        }
      } else {
        Remove$2.call(this, gameObject, destroyChild);
      }
      return this;
    },
    clear: function clear(destroyChild) {
      var buttons = this.buttonGroup.buttons;
      buttons.length = 0;
      SizerClear$2.call(this, destroyChild);
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
        Remove$2.call(this, buttons[i], destroyChild);
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

  var RemoveItem$1 = Phaser.Utils.Array.Remove;
  var RemoveMethods = {
    remove: function remove(gameObject) {
      RemoveItem$1(this.buttons, gameObject);
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

  var FireEvent$1 = function FireEvent(eventName, button) {
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

  var GetValue$l = Phaser.Utils.Objects.GetValue;
  var Initialize = function Initialize(config) {
    // Assign this.dataManager
    var dataManager = GetValue$l(config, 'dataManager', undefined);
    if (dataManager === undefined) {
      var parent = this.parent;
      parent.setDataEnabled();
      dataManager = parent.data;
    }
    this.dataManager = dataManager;

    // Assign this.setValueCallback, this.setValueCallbackScope
    var setValueCallback, setValueCallbackScope;
    setValueCallback = GetValue$l(config, 'setValueCallback', undefined);
    setValueCallbackScope = GetValue$l(config, 'setValueCallbackScope', undefined);
    if (setValueCallback === undefined) {
      setValueCallback = GetValue$l(config, 'setButtonStateCallback', undefined);
      setValueCallbackScope = GetValue$l(config, 'setButtonStateCallbackScope', undefined);
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
      var buttonsType = GetValue$l(config, 'buttonsType', config.type);
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

  var ButtonMethods$1 = {
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
  var methods$7 = {
    fireEvent: FireEvent$1
  };
  Object.assign(ButtonGroup.prototype, AddMethods, RemoveMethods, SetTypeMethods, ButtonMethods$1, methods$7);

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

  var GetValue$k = Phaser.Utils.Objects.GetValue;
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
        eventEmitter: GetValue$k(config, 'eventEmitter', _assertThisInitialized(_this)),
        groupName: GetValue$k(config, 'groupName', undefined),
        clickConfig: GetValue$k(config, 'click', undefined)
      }).setButtonsType(config);

      // Add elements
      var background = GetValue$k(config, 'background', undefined);
      var buttons = GetValue$k(config, 'buttons', undefined);

      // Buttons properties
      _this.buttonsExpand = GetValue$k(config, 'expand', false);
      _this.buttonsAlign = GetValue$k(config, 'align', undefined); // undefined/left/top: no space                

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
  Object.assign(Buttons$1.prototype, AddChildMethods$4, RemoveChildMethods$4, ButtonMethods$1, ButtonStateMethods);

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

  var PreLayout$1 = function PreLayout() {
    this._maxChildWidth = undefined;
    this._maxChildHeight = undefined;
    PreLayout$3.call(this);
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

  var RunWidthWrap$1 = function RunWidthWrap(width) {
    var innerWidth = width - this.space.left - this.space.right;
    this.widthWrapResult = RunChildrenWrap.call(this, innerWidth, this.widthWrapResult);
    RunWidthWrap$2.call(this, width);
  };

  var DistanceBetween = Phaser.Math.Distance.Between;
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
      var distance = DistanceBetween(child.left, child.centerY, x, y);
      if (minDistance > distance) {
        minDistance = distance;
        nearestIndex = i;
      }

      // Is last child of this line
      var nextChild = children[i + 1];
      if (nextChild && nextChild.y === child.y) {
        continue;
      }
      var distance = DistanceBetween(child.right, child.centerY, x, y);
      if (minDistance > distance) {
        minDistance = distance;
        nearestIndex = i + 1;
      }
    }
    return nearestIndex;
  };

  var IsPlainObject$6 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$j = Phaser.Utils.Objects.GetValue;
  var ALIGN_CENTER$1 = Phaser.Display.Align.CENTER;
  var Add$3 = function Add(gameObject, paddingConfig, childKey, index) {
    if (gameObject === '\n') {
      this.addNewLine();
      return this;
    }
    AddChild.call(this, gameObject);
    if (IsPlainObject$6(paddingConfig)) {
      var config = paddingConfig;
      paddingConfig = GetValue$j(config, 'padding', 0);
      childKey = GetValue$j(config, 'key', undefined);
      index = GetValue$j(config, 'index', undefined);
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

  var RemoveItem = Phaser.Utils.Array.Remove;
  var RemoveChildMethods$3 = {
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

  var methods$6 = {
    getChildrenWidth: GetChildrenWidth$1,
    getChildrenHeight: GetChildrenHeight$1,
    getChildrenSizers: GetChildrenSizers$1,
    preLayout: PreLayout$1,
    layoutChildren: LayoutChildren$1,
    runWidthWrap: RunWidthWrap$1
  };
  Object.assign(methods$6, AddChildMethods$3, RemoveChildMethods$3);

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

  var IsPlainObject$5 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$i = Phaser.Utils.Objects.GetValue;
  var FixWidthSizer = /*#__PURE__*/function (_BaseSizer) {
    _inherits(FixWidthSizer, _BaseSizer);
    var _super = _createSuper(FixWidthSizer);
    function FixWidthSizer(scene, x, y, minWidth, minHeight, config) {
      var _this;
      _classCallCheck(this, FixWidthSizer);
      if (IsPlainObject$5(x)) {
        config = x;
        x = GetValue$i(config, 'x', 0);
        y = GetValue$i(config, 'y', 0);
        minWidth = GetValue$i(config, 'width', undefined);
        minHeight = GetValue$i(config, 'height', undefined);
      } else if (IsPlainObject$5(minWidth)) {
        config = minWidth;
        minWidth = GetValue$i(config, 'width', undefined);
        minHeight = GetValue$i(config, 'height', undefined);
      }
      _this = _super.call(this, scene, x, y, minWidth, minHeight, config);
      _this.type = 'rexFixWidthSizer';
      _this.sizerChildren = [];
      _this.setOrientation(GetValue$i(config, 'orientation', 0));
      _this.setItemSpacing(GetValue$i(config, 'space.item', 0));
      _this.setLineSpacing(GetValue$i(config, 'space.line', 0));
      _this.setIntentLeft(GetValue$i(config, 'space.indentLeftOdd', 0), GetValue$i(config, 'space.indentLeftEven', 0));
      _this.setIntentTop(GetValue$i(config, 'space.indentTopOdd', 0), GetValue$i(config, 'space.indentTopEven', 0));
      _this.setAlign(GetValue$i(config, 'align', 0));
      _this.setJustifyPercentage(GetValue$i(config, 'justifyPercentage', 0.25));
      _this.setRTL(GetValue$i(config, 'rtl', false));
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
          align = ALIGN$1[align];
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
  }(Base);
  var ALIGN$1 = {
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
  Object.assign(FixWidthSizer.prototype, methods$6);

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

  var SizerRmove$1 = FixWidthSizer.prototype.remove;
  var SizerClear$1 = FixWidthSizer.prototype.clear;
  var Remove$1 = function Remove(gameObject, destroyChild) {
    var gameObject = this.getButton(gameObject);
    if (!gameObject) {
      return this;
    }
    this.buttonGroup.remove(gameObject);
    SizerRmove$1.call(this, gameObject, destroyChild);
    return this;
  };
  var RemoveChildMethods$2 = {
    remove: function remove(gameObject, destroyChild) {
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

  var GetValue$h = Phaser.Utils.Objects.GetValue;
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
        eventEmitter: GetValue$h(config, 'eventEmitter', _assertThisInitialized(_this)),
        groupName: GetValue$h(config, 'groupName', undefined),
        clickConfig: GetValue$h(config, 'click', undefined)
      }).setButtonsType(config);

      // Add elements
      var background = GetValue$h(config, 'background', undefined);
      var buttons = GetValue$h(config, 'buttons', undefined);

      // Buttons properties
      _this.buttonsAlign = GetValue$h(config, 'align', undefined);
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
  Object.assign(Buttons.prototype, AddChildMethods$2, RemoveChildMethods$2, ButtonMethods$1, ButtonStateMethods);

  var Sum = function Sum() {
    return Array.prototype.reduce.call(arguments, Add$1, 0);
  };
  var Add$1 = function Add(a, b) {
    return a + b;
  };

  var GetChildrenWidth = function GetChildrenWidth(minimumMode) {
    if (this.rexSizer.hidden) {
      return 0;
    }
    if (minimumMode === undefined) {
      minimumMode = true;
    }
    var result = 0,
      columnWidth;
    var children = this.sizerChildren;
    var child, padding, childWidth, proportion;
    for (var i = 0; i < this.columnCount; i++) {
      proportion = this.columnProportions[i];
      columnWidth = 0;
      if (proportion === 0 || minimumMode) {
        for (var j = 0; j < this.rowCount; j++) {
          child = children[j * this.columnCount + i];
          if (!child) {
            continue;
          }
          if (child.rexSizer.hidden) {
            continue;
          }
          padding = child.rexSizer.padding;
          childWidth = this.getChildWidth(child) + padding.left + padding.right;
          columnWidth = Math.max(columnWidth, childWidth);
        }
        result += columnWidth;
      }
      // else,(proportion > 0) : columnWidth is 0
      this.columnWidth[i] = columnWidth;
    }
    var space = this.space;
    var indentLeft = Math.max(space.indentLeftOdd, space.indentLeftEven);
    return result + Sum.apply(void 0, [space.left, indentLeft].concat(_toConsumableArray(space.column), [space.right]));
  };

  var GetChildrenHeight = function GetChildrenHeight(minimumMode) {
    if (this.rexSizer.hidden) {
      return 0;
    }
    if (minimumMode === undefined) {
      minimumMode = true;
    }
    var result = 0,
      rowHeight;
    var children = this.sizerChildren;
    var child, padding, childHeight, proportion;
    for (var i = 0; i < this.rowCount; i++) {
      proportion = this.rowProportions[i];
      rowHeight = 0;
      if (proportion === 0 || minimumMode) {
        for (var j = 0; j < this.columnCount; j++) {
          child = children[i * this.columnCount + j];
          if (!child) {
            continue;
          }
          if (child.rexSizer.hidden) {
            continue;
          }
          childHeight = child.isRexSizer ? Math.max(child.minHeight, child.childrenHeight) : child.hasOwnProperty('minHeight') ? child.minHeight : GetDisplayHeight(child);
          padding = child.rexSizer.padding;
          childHeight += padding.top + padding.bottom;
          rowHeight = Math.max(rowHeight, childHeight);
        }
        result += rowHeight;
      }
      // else,(proportion > 0) : rowHeight is 0
      this.rowHeight[i] = rowHeight;
    }
    var space = this.space;
    var indentTop = Math.max(space.indentTopOdd, space.indentTopEven);
    return result + Sum.apply(void 0, [space.top, indentTop].concat(_toConsumableArray(space.row), [space.bottom]));
  };

  var GetExpandedChildWidth = function GetExpandedChildWidth(child, colWidth) {
    var childWidth;
    var childConfig = child.rexSizer;
    if (childConfig.expand) {
      var padding = childConfig.padding;
      childWidth = colWidth - padding.left - padding.right;
    }
    return childWidth;
  };

  var GetExpandedChildHeight = function GetExpandedChildHeight(child, rowHeight) {
    var childHeight;
    var childConfig = child.rexSizer;
    if (childConfig.expand) {
      var padding = childConfig.padding;
      childHeight = rowHeight - padding.top - padding.bottom;
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
      if (child && child.isRexSizer) {
        out.push(child);
      }
    }
    return out;
  };

  var PreLayout = function PreLayout() {
    this._totalColumnProportions = undefined;
    this._totalRowProportions = undefined;
    this.proportionWidthLength = undefined;
    this.proportionHeightLength = undefined;
    PreLayout$3.call(this);
    return this;
  };

  var LayoutChildren = function LayoutChildren() {
    var child, childConfig, padding;
    var startX = this.innerLeft,
      startY = this.innerTop;
    var itemX,
      itemY = startY;
    var x, y, width, height; // Align zone
    var childWidth, childHeight;
    // Layout grid children
    var columnSpace = this.space.column,
      rowSpace = this.space.row,
      indentLeftOdd = this.space.indentLeftOdd,
      indentLeftEven = this.space.indentLeftEven,
      indentTopOdd = this.space.indentTopOdd,
      indentTopEven = this.space.indentTopEven;
    var colWidth, rowHeight;
    var indentLeft, indentTop;
    for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
      rowHeight = this.getRowHeight(rowIndex);
      indentLeft = rowIndex % 2 ? indentLeftEven : indentLeftOdd;
      itemX = startX + indentLeft;
      for (var columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
        colWidth = this.getColumnWidth(columnIndex);
        child = this.getChildAt(columnIndex, rowIndex);
        if (!child || child.rexSizer.hidden) {
          itemX += colWidth + columnSpace[columnIndex];
          continue;
        }
        PreLayoutChild.call(this, child);
        childWidth = this.getExpandedChildWidth(child, colWidth);
        childHeight = this.getExpandedChildHeight(child, rowHeight);
        if (child.isRexSizer) {
          child.runLayout(this, childWidth, childHeight);
          CheckSize(child, this);
        } else {
          ResizeGameObject(child, childWidth, childHeight);
        }
        childConfig = child.rexSizer;
        padding = childConfig.padding;
        x = itemX + padding.left;
        width = colWidth - padding.left - padding.right;
        indentTop = columnIndex % 2 ? indentTopEven : indentTopOdd;
        y = itemY + indentTop + padding.top;
        height = rowHeight - padding.top - padding.bottom;
        LayoutChild.call(this, child, x, y, width, height, childConfig.align);
        itemX += colWidth + columnSpace[columnIndex];
      }
      itemY += rowHeight + rowSpace[rowIndex];
    }
  };

  var ResolveWidth = function ResolveWidth(width) {
    var width = ResolveWidth$2.call(this, width);

    // Get proportionLength
    if (this.proportionWidthLength === undefined) {
      var totalColumnProportions = this.totalColumnProportions;
      if (totalColumnProportions > 0) {
        var remainder = width - this.getChildrenWidth(false);
        if (remainder >= 0) {
          this.proportionWidthLength = remainder / totalColumnProportions;
        }
      } else {
        this.proportionWidthLength = 0;
      }
    }
    return width;
  };

  var ResolveHeight = function ResolveHeight(height) {
    var height = ResolveHeight$2.call(this, height);

    // Get proportionLength    
    if (this.proportionHeightLength === undefined) {
      var totalRowProportions = this.totalRowProportions;
      if (totalRowProportions > 0) {
        var remainder = height - this.getChildrenHeight(false);
        if (remainder >= 0) {
          this.proportionHeightLength = remainder / totalRowProportions;
        }
      } else {
        this.proportionHeightLength = 0;
      }
    }
    return height;
  };

  var ResolveChildrenWidth = function ResolveChildrenWidth(parentWidth) {
    // Resolve width of sizer children
    var child, childWidth;
    var colWidth;
    for (var i in this.sizerChildren) {
      child = this.sizerChildren[i];
      if (child && child.isRexSizer && !child.ignoreLayout) {
        colWidth = this.getColumnWidth(parseInt(i) % this.columnCount);
        childWidth = this.getExpandedChildWidth(child, colWidth);
        childWidth = child.resolveWidth(childWidth);
        child.resolveChildrenWidth(childWidth);
      }
    }
  };

  // Default method
  var RunWidthWrap = function RunWidthWrap(width) {
    var child, childWidth;
    var colWidth;
    for (var i in this.sizerChildren) {
      child = this.sizerChildren[i];
      if (!child || child.isRexSizer && child.ignoreLayout || !child.runWidthWrap) {
        continue;
      }
      colWidth = this.getColumnWidth(parseInt(i) % this.columnCount);
      childWidth = this.getExpandedChildWidth(child, colWidth);
      if (child.isRexSizer) {
        childWidth = child.resolveWidth(childWidth);
      }
      child.runWidthWrap(childWidth);
    }
    return this;
  };

  var IsPlainObject$4 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$g = Phaser.Utils.Objects.GetValue;
  var ALIGN_CENTER = Phaser.Display.Align.CENTER;
  var GetEmptyCellIndex = function GetEmptyCellIndex(columnIndex, rowIndex, cells, columnCount, rowCount) {
    if (typeof columnIndex === 'number' || typeof rowIndex === 'number') {
      if (columnIndex === undefined) {
        var idx;
        for (var i = 0; i < columnCount; i++) {
          idx = rowIndex * columnCount + i;
          if (!cells[idx]) {
            return idx;
          }
        }
      } else if (rowIndex === undefined) {
        var idx;
        for (var i = 0; i < rowCount; i++) {
          idx = i * columnCount + columnIndex;
          if (!cells[idx]) {
            return idx;
          }
        }
      } else {
        var idx = rowIndex * columnCount + columnIndex;
        if (!cells[idx]) {
          return idx;
        }
      }
    } else if (rowIndex === true) {
      var idx;
      for (var i = 0; i < columnCount; i++) {
        for (var j = 0; j < rowCount; j++) {
          idx = j * columnCount + i;
          if (!cells[idx]) {
            return idx;
          }
        }
      }
    } else {
      for (var i = 0, cnt = cells.length; i < cnt; i++) {
        if (!cells[i]) {
          return i;
        }
      }
    }
    return null;
  };
  var Add = function Add(gameObject, columnIndex, rowIndex, align, paddingConfig, expand, childKey) {
    AddChild.call(this, gameObject);
    if (IsPlainObject$4(columnIndex)) {
      var config = columnIndex;
      columnIndex = GetValue$g(config, 'column', undefined);
      rowIndex = GetValue$g(config, 'row', undefined);
      align = GetValue$g(config, 'align', ALIGN_CENTER);
      paddingConfig = GetValue$g(config, 'padding', 0);
      expand = GetValue$g(config, 'expand', false);
      childKey = GetValue$g(config, 'key', undefined);
    }

    // Get insert index
    var itemIndex = GetEmptyCellIndex(columnIndex, rowIndex, this.sizerChildren, this.columnCount, this.rowCount);
    if (itemIndex === null) {
      // Specific index mode
      if (typeof columnIndex === 'number' && typeof rowIndex === 'number') {
        return this;
      }
      if (rowIndex === true || typeof rowIndex === 'number') {
        this.addEmptyColumn();
      } else {
        this.addEmptyRow();
      }

      // Get insert index again
      itemIndex = GetEmptyCellIndex(columnIndex, rowIndex, this.sizerChildren, this.columnCount, this.rowCount);
    }
    if (typeof align === 'string') {
      align = AlignConst[align];
    }
    if (align === undefined) {
      align = ALIGN_CENTER;
    }
    if (paddingConfig === undefined) {
      paddingConfig = 0;
    }
    if (expand === undefined) {
      expand = true;
    }
    var config = this.getSizerConfig(gameObject);
    config.align = align;
    config.padding = GetBoundsConfig(paddingConfig);
    config.expand = expand;
    this.sizerChildren[itemIndex] = gameObject;
    if (childKey !== undefined) {
      this.addChildrenMap(childKey, gameObject);
    }
    return this;
  };
  var AddChildMethods$1 = {
    add: Add
  };

  var Fill = function Fill(arr, value, startIdx, endIdx) {
    if (startIdx === undefined) {
      startIdx = 0;
    }
    if (endIdx === undefined) {
      endIdx = arr.length - 1;
    }
    for (var i = startIdx; i <= endIdx; i++) {
      arr[i] = value;
    }
    return arr;
  };

  var RemoveChildMethods$1 = {
    remove: function remove(gameObject, destroyChild) {
      if (this.getParentSizer(gameObject) !== this) {
        return this;
      }
      var idx = this.sizerChildren.indexOf(gameObject);
      if (idx !== -1) {
        this.sizerChildren[idx] = null;
      }
      RemoveChild.call(this, gameObject, destroyChild);
      return this;
    },
    removeAt: function removeAt(columnIndex, rowIndex, destroyChild) {
      var child = this.getChildAt(columnIndex, rowIndex);
      if (child) {
        this.remove(child, destroyChild);
      }
      return this;
    },
    removeAll: function removeAll(destroyChild) {
      for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
        var child = this.sizerChildren[i];
        if (!child) {
          continue;
        }
        this.remove(child, destroyChild);
      }
      return this;
    },
    clear: function clear(destroyChild) {
      Fill(this.sizerChildren, null);
      ClearChildren.call(this, destroyChild);
      return this;
    }
  };

  var GetValue$f = Phaser.Utils.Objects.GetValue;
  var ResetGrid = function ResetGrid(columnCount, rowCount, columnProportions, rowProportions, space) {
    if (columnProportions === undefined) {
      columnProportions = 0;
    }
    if (rowProportions === undefined) {
      rowProportions = 0;
    }
    this.columnCount = columnCount;
    this.rowCount = rowCount;
    this.gridCount = columnCount * rowCount;

    // children
    if (this.sizerChildren === undefined) {
      this.sizerChildren = [];
    } else {
      this.removeAll();
    }
    this.sizerChildren.length = columnCount * rowCount;
    Fill(this.sizerChildren, null);

    // proportions
    this.columnProportions = [];
    this.columnProportions.length = columnCount;
    if (typeof columnProportions === 'number') {
      Fill(this.columnProportions, columnProportions);
    } else {
      for (var i = 0; i < columnCount; i++) {
        this.columnProportions[i] = columnProportions[i] || 0;
      }
    }
    this.rowProportions = [];
    this.rowProportions.length = rowCount;
    if (typeof rowProportions === 'number') {
      Fill(this.rowProportions, rowProportions);
    } else {
      for (var i = 0; i < rowCount; i++) {
        this.rowProportions[i] = rowProportions[i] || 0;
      }
    }

    // width & height
    this.columnWidth = [];
    this.columnWidth.length = columnCount;
    this.rowHeight = [];
    this.rowHeight.length = rowCount;

    // space
    this.space.column = [];
    this.space.column.length = columnCount - 1;
    var columnSpace = GetValue$f(space, 'column', 0);
    if (typeof columnSpace === 'number') {
      Fill(this.space.column, columnSpace);
    } else {
      for (var i = 0, cnt = this.space.column.length; i < cnt; i++) {
        this.space.column[i] = columnSpace[i] || 0;
      }
    }
    this.space.row = [];
    this.space.row.length = rowCount - 1;
    var rowSpace = GetValue$f(space, 'row', 0);
    if (typeof rowSpace === 'number') {
      Fill(this.space.row, rowSpace);
    } else {
      for (var i = 0, cnt = this.space.row.length; i < cnt; i++) {
        this.space.row[i] = rowSpace[i] || 0;
      }
    }
    return this;
  };

  var InseryEmptyRow = function InseryEmptyRow(rowIndex, proportion, space) {
    if (proportion === undefined) {
      proportion = this.rowProportions[0] || 0;
    }
    if (space === undefined) {
      space = this.space.row[0] || 0;
    }
    this.rowCount += 1;
    this.gridCount += this.columnCount;
    var args = [rowIndex * this.columnCount, 0];
    for (var i = 0; i < this.columnCount; i++) {
      args.push(null);
    }
    this.sizerChildren.splice.apply(this.sizerChildren, args);
    this.rowProportions.push(proportion);
    this.rowHeight.length += 1; // this.rowHeight will be recalculated when layout()    

    this.space.row.splice(rowIndex, 0, space);
    return this;
  };
  var AddEmptyRow = function AddEmptyRow(proportion, space) {
    InseryEmptyRow.call(this, this.rowCount, proportion, space);
    return this;
  };

  var InsertEmptyColumn = function InsertEmptyColumn(colIndex, proportion, space) {
    if (proportion === undefined) {
      proportion = this.columnProportions[0] || 0;
    }
    if (space === undefined) {
      space = this.space.column[0] || 0;
    }
    this.columnCount += 1;
    this.gridCount += this.rowCount;
    for (var i = this.rowCount - 1; i >= 0; i--) {
      var insertIndex = i * this.columnCount + colIndex;
      this.sizerChildren.splice(insertIndex, 0, null);
    }
    this.columnProportions.push(proportion);
    this.columnWidth.length += 1; // this.columnWidth will be recalculated when layout()    

    this.space.column.splice(colIndex, 0, space);
    return this;
  };
  var AddEmptyColumn = function AddEmptyColumn(proportion, space) {
    InsertEmptyColumn.call(this, this.columnCount, proportion, space);
    return this;
  };

  var methods$5 = {
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getExpandedChildWidth: GetExpandedChildWidth,
    getExpandedChildHeight: GetExpandedChildHeight,
    getChildrenSizers: GetChildrenSizers,
    preLayout: PreLayout,
    layoutChildren: LayoutChildren,
    resolveWidth: ResolveWidth,
    resolveHeight: ResolveHeight,
    resolveChildrenWidth: ResolveChildrenWidth,
    runWidthWrap: RunWidthWrap,
    resetGrid: ResetGrid,
    inseryEmptyRow: InseryEmptyRow,
    addEmptyRow: AddEmptyRow,
    insertEmptyColumn: InsertEmptyColumn,
    addEmptyColumn: AddEmptyColumn
  };
  Object.assign(methods$5, AddChildMethods$1, RemoveChildMethods$1);

  var GetTotalColumnProportions = function GetTotalColumnProportions() {
    var result = 0,
      proportion;
    for (var i = 0; i < this.columnCount; i++) {
      proportion = this.columnProportions[i];
      if (proportion > 0) {
        result += proportion;
      }
    }
    return result;
  };

  var GetTotalRowProportions = function GetTotalRowProportions() {
    var result = 0,
      proportion;
    for (var i = 0; i < this.rowCount; i++) {
      proportion = this.rowProportions[i];
      if (proportion > 0) {
        result += proportion;
      }
    }
    return result;
  };

  var IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$e = Phaser.Utils.Objects.GetValue;
  var GridSizer = /*#__PURE__*/function (_BaseSizer) {
    _inherits(GridSizer, _BaseSizer);
    var _super = _createSuper(GridSizer);
    function GridSizer(scene, x, y, minWidth, minHeight, columnCount, rowCount, columnProportions, rowProportions, config) {
      var _this;
      _classCallCheck(this, GridSizer);
      if (IsPlainObject$3(x)) {
        config = x;
        x = GetValue$e(config, 'x', 0);
        y = GetValue$e(config, 'y', 0);
        minWidth = GetValue$e(config, 'width', undefined);
        minHeight = GetValue$e(config, 'height', undefined);
        columnCount = GetValue$e(config, 'column', config.col || 0);
        rowCount = GetValue$e(config, 'row', 0);
        columnProportions = GetValue$e(config, 'columnProportions', 0);
        rowProportions = GetValue$e(config, 'rowProportions', 0);
      } else if (IsPlainObject$3(minWidth)) {
        config = minWidth;
        minWidth = GetValue$e(config, 'width', undefined);
        minHeight = GetValue$e(config, 'height', undefined);
        columnCount = GetValue$e(config, 'column', config.col || 0);
        rowCount = GetValue$e(config, 'row', 0);
        columnProportions = GetValue$e(config, 'columnProportions', 0);
        rowProportions = GetValue$e(config, 'rowProportions', 0);
      } else if (IsPlainObject$3(columnCount)) {
        config = columnCount;
        columnCount = GetValue$e(config, 'column', config.col || 0);
        rowCount = GetValue$e(config, 'row', 0);
        columnProportions = GetValue$e(config, 'columnProportions', 0);
        rowProportions = GetValue$e(config, 'rowProportions', 0);
      } else if (IsPlainObject$3(columnProportions)) {
        config = columnProportions;
        columnProportions = GetValue$e(config, 'columnProportions', 0);
        rowProportions = GetValue$e(config, 'rowProportions', 0);
      }
      _this = _super.call(this, scene, x, y, minWidth, minHeight, config);
      _this.type = 'rexGridSizer';
      _this.resetGrid(columnCount, rowCount, columnProportions, rowProportions, GetValue$e(config, 'space', undefined));
      _this.setIndentLeft(GetValue$e(config, 'space.indentLeftOdd', 0), GetValue$e(config, 'space.indentLeftEven', 0));
      _this.setIndentTop(GetValue$e(config, 'space.indentTopOdd', 0), GetValue$e(config, 'space.indentTopEven', 0));
      _this.addChildrenMap('items', _this.sizerChildren);
      var createCellContainerCallback = GetValue$e(config, 'createCellContainerCallback');
      if (createCellContainerCallback) {
        for (var y = 0, ycnt = _this.rowCount; y < ycnt; y++) {
          for (var x = 0, xcnt = _this.columnCount; x < xcnt; x++) {
            var addConfig = {
              column: x,
              row: y
            };
            var child = createCellContainerCallback(scene, x, y, addConfig);
            if (child) {
              _this.add(child, addConfig);
            }
          }
        }
      }
      return _this;
    }
    _createClass(GridSizer, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }
        _get(_getPrototypeOf(GridSizer.prototype), "destroy", this).call(this, fromScene);

        // More free resources
        this.columnProportions = undefined;
        this.rowProportions = undefined;
        this.columnWidth = undefined;
        this.rowHeight = undefined;
      }
    }, {
      key: "setIndentLeft",
      value: function setIndentLeft(odd, even) {
        this.space.indentLeftOdd = odd;
        this.space.indentLeftEven = even;
        return this;
      }
    }, {
      key: "setIndentTop",
      value: function setIndentTop(odd, even) {
        this.space.indentTopOdd = odd;
        this.space.indentTopEven = even;
        return this;
      }
    }, {
      key: "setColumnProportion",
      value: function setColumnProportion(columnIndex, proportion) {
        if (columnIndex >= this.columnProportions.length) {
          return this;
        }
        this.columnProportions[columnIndex] = proportion;
        return this;
      }
    }, {
      key: "setRowProportion",
      value: function setRowProportion(rowIndex, proportion) {
        if (rowIndex >= this.rowProportions.length) {
          return this;
        }
        this.rowProportions[rowIndex] = proportion;
        return this;
      }
    }, {
      key: "totalColumnProportions",
      get: function get() {
        if (this._totalColumnProportions === undefined) {
          this._totalColumnProportions = GetTotalColumnProportions.call(this);
        }
        return this._totalColumnProportions;
      }
    }, {
      key: "totalRowProportions",
      get: function get() {
        if (this._totalRowProportions === undefined) {
          this._totalRowProportions = GetTotalRowProportions.call(this);
        }
        return this._totalRowProportions;
      }
    }, {
      key: "getChildAt",
      value: function getChildAt(columnIndex, rowIndex) {
        return this.sizerChildren[rowIndex * this.columnCount + columnIndex];
      }
    }, {
      key: "childToGridIndex",
      value: function childToGridIndex(child, out) {
        if (!child) {
          return null;
        }
        var index = this.sizerChildren.indexOf(child);
        if (index === -1) {
          return null;
        }
        if (out === undefined) {
          out = {};
        }
        out.x = index % this.columnCount;
        out.y = Math.floor(index / this.columnCount);
        return out;
      }
    }, {
      key: "getColumnWidth",
      value: function getColumnWidth(columnIndex) {
        var colProportion = this.columnProportions[columnIndex];
        var colWidth = colProportion === 0 ? this.columnWidth[columnIndex] : colProportion * this.proportionWidthLength;
        return colWidth;
      }
    }, {
      key: "getRowHeight",
      value: function getRowHeight(rowIndex) {
        var rowProportion = this.rowProportions[rowIndex];
        var rowHeight = rowProportion === 0 ? this.rowHeight[rowIndex] : rowProportion * this.proportionHeightLength;
        return rowHeight;
      }
    }]);
    return GridSizer;
  }(Base);
  Object.assign(GridSizer.prototype, methods$5);

  var SizerAdd = GridSizer.prototype.add;
  var AddChildMethods = {
    addButton: function addButton(gameObject, columnIndex, rowIndex) {
      SizerAdd.call(this, gameObject, columnIndex, rowIndex, undefined, 0, this.buttonsExpand);
      this.buttonGroup.add(gameObject);
      return this;
    },
    addButtons: function addButtons(gameObjects, rowThenColumn) {
      for (var i = 0, cnt = gameObjects; i < cnt; i++) {
        this.addButton(gameObjects[i], undefined, rowThenColumn);
      }
      return this;
    }
  };

  var SizerRmove = GridSizer.prototype.remove;
  var SizerClear = GridSizer.prototype.clear;
  var Remove = function Remove(gameObject, destroyChild) {
    var gameObject = this.getButton(gameObject);
    if (!gameObject) {
      return this;
    }
    this.buttonGroup.remove(gameObject);
    SizerRmove.call(this, gameObject, destroyChild);
    return this;
  };
  var RemoveChildMethods = {
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

  var GetValue$d = Phaser.Utils.Objects.GetValue;
  var GridButtons = /*#__PURE__*/function (_GridSizer) {
    _inherits(GridButtons, _GridSizer);
    var _super = _createSuper(GridButtons);
    function GridButtons(scene, config) {
      var _this;
      _classCallCheck(this, GridButtons);
      if (config === undefined) {
        config = {};
      }
      var rowCount = GetValue$d(config, 'row', 0);
      var columnCount = GetValue$d(config, 'column', config.col || 0);
      var createCellContainerCallback = GetValue$d(config, 'createCellContainerCallback');
      var buttons = GetValue$d(config, 'buttons', undefined);
      var buttonsExpand = GetValue$d(config, 'expand', true);
      var buttonProportion = buttonsExpand ? 1 : 0;
      if (createCellContainerCallback) {
        config.createCellContainerCallback = undefined;
      }
      if (buttons !== undefined) {
        rowCount = Math.max(rowCount, buttons.length);
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
          columnCount = Math.max(columnCount, buttons[i].length);
        }
      }
      config.row = rowCount;
      config.column = columnCount;
      config.columnProportions = buttonProportion;
      config.rowProportions = buttonProportion;

      // Create
      _this = _super.call(this, scene, config);
      _this.type = 'rexGridButtons';
      _this.buttonGroup = new ButtonGroup({
        parent: _assertThisInitialized(_this),
        eventEmitter: GetValue$d(config, 'eventEmitter', _assertThisInitialized(_this)),
        groupName: GetValue$d(config, 'groupName', undefined),
        clickConfig: GetValue$d(config, 'click', undefined)
      }).setButtonsType(config);

      // Add elements
      var background = GetValue$d(config, 'background', undefined);

      // Buttons properties
      _this.buttonsExpand = buttonsExpand;
      GetValue$d(config, 'space', undefined);
      if (background) {
        _this.addBackground(background);
      }
      if (buttons) {
        var rowButtons, button;
        for (var r = 0, rcnt = buttons.length; r < rcnt; r++) {
          // row
          rowButtons = buttons[r];
          for (var c = 0, ccnt = rowButtons.length; c < ccnt; c++) {
            // col
            button = rowButtons[c];
            if (button) {
              _this.addButton(button, c, r);
            }
          }
        }
      } else if (createCellContainerCallback) {
        for (var y = 0; y < rowCount; y++) {
          for (var x = 0; x < columnCount; x++) {
            var button = createCellContainerCallback(scene, x, y);
            if (button) {
              _this.addButton(button, x, y);
            }
          }
        }
      }
      _this.addChildrenMap('background', background);
      _this.addChildrenMap('buttons', _this.buttonGroup.buttons);
      return _this;
    }
    _createClass(GridButtons, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }
        _get(_getPrototypeOf(GridButtons.prototype), "destroy", this).call(this, fromScene);
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
    return GridButtons;
  }(GridSizer);
  Object.assign(GridButtons.prototype, AddChildMethods, RemoveChildMethods, ButtonMethods$1, ButtonStateMethods);

  var ButtonMethods = {
    getChoice: function getChoice(index) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        return choicesSizer.getButton(index);
      } else {
        return undefined;
      }
    },
    getAction: function getAction(index) {
      return this.childrenMap.actionsSizer.getButton(index);
    },
    getToolbar: function getToolbar(index) {
      return this.childrenMap.toolbarSizer.getButton(index);
    },
    getLeftToolbar: function getLeftToolbar(index) {
      return this.childrenMap.leftToolbarSizer.getButton(index);
    },
    setChoiceEnable: function setChoiceEnable(index, enabled) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        choicesSizer.setButtonEnable(index, enabled);
      }
      return this;
    },
    setActionEnable: function setActionEnable(index, enabled) {
      this.childrenMap.actionsSizer.setButtonEnable(index, enabled);
      return this;
    },
    setToolbarEnable: function setToolbarEnable(index, enabled) {
      this.childrenMap.toolbarSizer.setButtonEnable(index, enabled);
      return this;
    },
    setLeftToolbarEnable: function setLeftToolbarEnable(index, enabled) {
      this.childrenMap.leftToolbarSizer.setButtonEnable(index, enabled);
      return this;
    },
    toggleChoiceEnable: function toggleChoiceEnable(index) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        choicesSizer.toggleButtonEnable(index);
      }
      return this;
    },
    toggleActionEnable: function toggleActionEnable(index) {
      this.childrenMap.actionsSizer.toggleButtonEnable(index);
      return this;
    },
    toggleToolbarEnable: function toggleToolbarEnable(index) {
      this.childrenMap.toolbarSizer.toggleButtonEnable(index);
      return this;
    },
    toggleLeftToolbarEnable: function toggleLeftToolbarEnable(index) {
      this.childrenMap.leftToolbarSizer.toggleButtonEnable(index);
      return this;
    },
    getChoiceEnable: function getChoiceEnable(index) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        return choicesSizer.getButtonEnable(index);
      } else {
        return false;
      }
    },
    getActionEnable: function getActionEnable(index) {
      return this.childrenMap.actionsSizer.getButtonEnable(index);
    },
    getToolbarEnable: function getToolbarEnable(index) {
      return this.childrenMap.toolbarSizer.getButtonEnable(index);
    },
    getLeftToolbarEnable: function getLeftToolbarEnable(index) {
      return this.childrenMap.leftToolbarSizer.getButtonEnable(index);
    },
    emitChoiceClick: function emitChoiceClick(index) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        choicesSizer.emitButtonClick(index);
      }
      return this;
    },
    emitActionClick: function emitActionClick(index) {
      this.childrenMap.actionsSizer.emitButtonClick(index);
      return this;
    },
    emitToolbarClick: function emitToolbarClick(index) {
      this.childrenMap.toolbarSizer.emitButtonClick(index);
      return this;
    },
    emitLeftToolbarClick: function emitLeftToolbarClick(index) {
      this.childrenMap.leftToolbarSizer.emitButtonClick(index);
      return this;
    },
    showChoice: function showChoice(index) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        choicesSizer.showButton(index);
      }
      return this;
    },
    showAction: function showAction(index) {
      this.childrenMap.actionsSizer.showButton(index);
      return this;
    },
    showToolbar: function showToolbar(index) {
      this.childrenMap.toolbarSizer.showButton(index);
      return this;
    },
    showLeftToolbar: function showLeftToolbar(index) {
      this.childrenMap.leftToolbarSizer.showButton(index);
      return this;
    },
    hideChoice: function hideChoice(index) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        choicesSizer.hideButton(index);
      }
      return this;
    },
    hideAction: function hideAction(index) {
      this.childrenMap.actionsSizer.hideButton(index);
      return this;
    },
    hideToolbar: function hideToolbar(index) {
      this.childrenMap.toolbarSizer.hideButton(index);
      return this;
    },
    hideLeftToolbar: function hideLeftToolbar(index) {
      this.childrenMap.leftToolbarSizer.hideButton(index);
      return this;
    },
    addChoice: function addChoice(gameObject) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        choicesSizer.addButton(gameObject);
      }
      return this;
    },
    addAction: function addAction(gameObject) {
      this.childrenMap.actionsSizer.addButton(gameObject);
      return this;
    },
    addToolbar: function addToolbar(gameObject) {
      this.childrenMap.toolbarSizer.addButton(gameObject);
      return this;
    },
    addLeftToolbar: function addLeftToolbar(gameObject) {
      this.childrenMap.leftToolbarSizer.addButton(gameObject);
      return this;
    },
    removeChoice: function removeChoice(index, destroyChild) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        choicesSizer.removeButton(index, destroyChild);
      }
      return this;
    },
    removeAction: function removeAction(index, destroyChild) {
      this.childrenMap.actionsSizer.removeButton(index, destroyChild);
      return this;
    },
    removeToolbar: function removeToolbar(index, destroyChild) {
      this.childrenMap.toolbarSizer.removeButton(index, destroyChild);
      return this;
    },
    removeLeftToolbar: function removeLeftToolbar(index, destroyChild) {
      this.childrenMap.leftToolbarSizer.removeButton(index, destroyChild);
      return this;
    },
    clearChoices: function clearChoices(destroyChild) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        choicesSizer.clearButtons(destroyChild);
      }
      return this;
    },
    clearActions: function clearActions(destroyChild) {
      this.childrenMap.actionsSizer.clearButtons(destroyChild);
      return this;
    },
    clearToolbar: function clearToolbar(destroyChild) {
      this.childrenMap.toolbarSizer.clearButtons(destroyChild);
      return this;
    },
    clearLeftToolbar: function clearLeftToolbar(destroyChild) {
      this.childrenMap.leftToolbarSizer.clearButtons(destroyChild);
      return this;
    },
    forEachChoice: function forEachChoice(callback, scope) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        choicesSizer.forEachButtton(callback, scope);
      }
      return this;
    },
    forEachAction: function forEachAction(callback, scope) {
      this.childrenMap.actionsSizer.forEachButtton(callback, scope);
      return this;
    },
    forEachToolbar: function forEachToolbar(callback, scope) {
      this.childrenMap.toolbarSizer.forEachButtton(callback, scope);
      return this;
    },
    forEachLeftToolbar: function forEachLeftToolbar(callback, scope) {
      this.childrenMap.leftToolbarSizer.forEachButtton(callback, scope);
      return this;
    },
    setAllButtonsEnable: function setAllButtonsEnable(enabled) {
      if (enabled === undefined) {
        enabled = true;
      }
      if (this.childrenMap.toolbarSizer) {
        this.setToolbarEnable(enabled);
      }
      if (this.childrenMap.leftToolbarSizer) {
        this.setLeftToolbarEnable(enabled);
      }
      if (this.childrenMap.actionsSizer) {
        this.setActionEnable(enabled);
      }
      if (this.childrenMap.choicesSizer) {
        this.setChoiceEnable(enabled);
      }
      return this;
    },
    // Checkboxes
    getChoicesButtonStates: function getChoicesButtonStates() {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        return choicesSizer.getAllButtonsState();
      } else {
        return {};
      }
    },
    getChoicesButtonState: function getChoicesButtonState(name) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (name === undefined) {
        if (choicesSizer) {
          return choicesSizer.getAllButtonsState();
        } else {
          return {};
        }
      } else {
        if (choicesSizer) {
          return choicesSizer.getButtonState(name);
        } else {
          return false;
        }
      }
    },
    setChoicesButtonState: function setChoicesButtonState(name, state) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        choicesSizer.setButtonState(name, state);
      }
      return this;
    },
    clearChoicesButtonStates: function clearChoicesButtonStates() {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        choicesSizer.clearAllButtonsState();
      }
      return this;
    },
    // Radio buttons
    getChoicesSelectedButtonName: function getChoicesSelectedButtonName() {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        return choicesSizer.getSelectedButtonName();
      } else {
        return '';
      }
    },
    setChoicesSelectedButtonName: function setChoicesSelectedButtonName(name) {
      var choicesSizer = this.childrenMap.choicesSizer;
      if (choicesSizer) {
        choicesSizer.setSelectedButtonName(name);
      }
      return this;
    }
  };

  /*
  graph TD

  IDLE --> |"requestOpen()"| TRANS_OPNE["TRAN_OPEN<br>runTransitionInCallback()"]
  TRANS_OPNE --> |transitInTime| OPEN
  OPEN --> |"requestClose()"| TRANS_CLOSE["TRANS_CLOSE<br>runTransitionOutCallback()"]
  TRANS_CLOSE --> |transitOutTime| CLOSE
  CLOSE --> |"requestOpen()"| TRANS_OPNE
  */
  var State = /*#__PURE__*/function (_FSM) {
    _inherits(State, _FSM);
    var _super = _createSuper(State);
    function State(parent, config) {
      var _this;
      _classCallCheck(this, State);
      _this = _super.call(this, config);
      _this.parent = parent;
      var initState = config.initState || 'IDLE';
      _this.start(initState);
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
        if (transitionBehavior.transitInTime > 0) {
          var delay = transitionBehavior.runTransitionInCallback();
          transitionBehavior.delayCall(delay, this.next, this);
        } else {
          this.next();
        }
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
        if (transitionBehavior.transitOutTime > 0) {
          var delay = transitionBehavior.runTransitionOutCallback();
          transitionBehavior.delayCall(delay, this.next, this);
        } else {
          this.next();
        }
      }
    }, {
      key: "exit_TRANS_CLOSE",
      value: function exit_TRANS_CLOSE() {
        var transitionBehavior = this.parent;
        transitionBehavior.removeDelayCall();
      }
      // TRANS_CLOSE

      // CLOSE -> TRANS_OPNE
    }, {
      key: "next_CLOSE",
      value: function next_CLOSE() {
        return 'TRANS_OPNE';
      }
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
    }, {
      key: "canOpen",
      value: function canOpen() {
        return this.state === 'IDLE' || this.state === 'CLOSE';
      }
    }, {
      key: "canClose",
      value: function canClose() {
        return this.state === 'IDLE' || this.state === 'OPEN';
      }
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

  var DelayCallMethods = {
    delayCall: function delayCall(delay, callback, scope) {
      // Invoke callback under scene's 'postupdate' event
      this.delayCallTimer = PostUpdateDelayCall(this, delay, callback, scope);
      return this;
    },
    removeDelayCall: function removeDelayCall() {
      if (this.delayCallTimer) {
        this.delayCallTimer.remove(false);
        this.delayCallTimer = undefined;
      }
      return this;
    }
  };

  var ConfigurationMethods = {
    setTransitInTime: function setTransitInTime(time) {
      this.transitInTime = time;
      return this;
    },
    setTransitOutTime: function setTransitOutTime(time) {
      this.transitOutTime = time;
      return this;
    },
    setTransitInCallback: function setTransitInCallback(callback) {
      if (!callback) {
        callback = NOOP;
      }
      this.transitInCallback = callback;
      // callback = function(gameObject, duration) {}
      return this;
    },
    setTransitOutCallback: function setTransitOutCallback(callback) {
      if (!callback) {
        callback = NOOP;
      }
      this.transitOutCallback = callback;
      // callback = function(gameObject, duration) {}
      return this;
    }
  };

  var OpenMethods = {
    // Override
    runTransitionInCallback: function runTransitionInCallback() {
      this.transitInCallback(this.parent, this.transitInTime);
      return this.transitInTime;
    },
    // Override
    onOpen: function onOpen() {},
    requestOpen: function requestOpen(openEventData, duration) {
      if (!this._state.canOpen()) {
        return this;
      }
      this.openEventData = arguments.length > 0 ? openEventData : this.parent;
      var transitionTimeSave = this.transitInTime;
      if (duration !== undefined) {
        this.transitInTime = duration;
      }
      this._state["goto"]('TRANS_OPNE');
      this.transitInTime = transitionTimeSave;
      return this;
    }
  };

  var CloseMethods = {
    // Override
    runTransitionOutCallback: function runTransitionOutCallback() {
      this.transitOutCallback(this.parent, this.transitOutTime);
      return this.transitOutTime;
    },
    // Override
    onClose: function onClose() {
      // Destroy parent and this behavior
      if (this.oneShotMode) {
        this.parent.destroy();
        // Will invoke `this.destroy()`
      }
    },
    requestClose: function requestClose(closeEventData, duration) {
      if (!this._state.canClose) {
        return this;
      }
      this.closeEventData = arguments.length > 0 ? closeEventData : this.parent;
      var transitionTimeSave = this.transitOutTime;
      if (duration !== undefined) {
        this.transitOutTime = duration;
      }
      this._state["goto"]('TRANS_CLOSE');
      this.transitOutTime = transitionTimeSave;
      return this;
    }
  };

  var methods$4 = {};
  Object.assign(methods$4, DelayCallMethods, ConfigurationMethods, OpenMethods, CloseMethods);

  var GetValue$c = Phaser.Utils.Objects.GetValue;
  var OpenCloseTransition = /*#__PURE__*/function (_ComponentBase) {
    _inherits(OpenCloseTransition, _ComponentBase);
    var _super = _createSuper(OpenCloseTransition);
    function OpenCloseTransition(gameObject, config) {
      var _this;
      _classCallCheck(this, OpenCloseTransition);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;
      // this.scene

      _this.setTransitInTime(GetValue$c(config, 'duration.in', 200));
      _this.setTransitOutTime(GetValue$c(config, 'duration.out', 200));
      _this.setTransitInCallback(GetValue$c(config, 'transitIn'));
      _this.setTransitOutCallback(GetValue$c(config, 'transitOut'));
      _this.oneShotMode = GetValue$c(config, 'destroy', false);
      _this.delayCallTimer = undefined;
      _this._state = new State(_assertThisInitialized(_this), {
        eventEmitter: false,
        initState: GetValue$c(config, 'initState', 'IDLE')
      });
      _this.openEventData = undefined;
      _this.closeEventData = undefined;
      return _this;
    }
    _createClass(OpenCloseTransition, [{
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
        this.openEventData = undefined;
        this.closeEventData = undefined;
        this.removeDelayCall();
        _get(_getPrototypeOf(OpenCloseTransition.prototype), "shutdown", this).call(this, fromScene);
      }
    }]);
    return OpenCloseTransition;
  }(ComponentBase);
  Object.assign(OpenCloseTransition.prototype, methods$4);

  var Rectangle$1 = Phaser.GameObjects.Rectangle;
  var FullWindowRectangle = /*#__PURE__*/function (_Rectangle) {
    _inherits(FullWindowRectangle, _Rectangle);
    var _super = _createSuper(FullWindowRectangle);
    function FullWindowRectangle(scene, color, alpha) {
      var _this;
      _classCallCheck(this, FullWindowRectangle);
      _this = _super.call(this, scene, 0, 0, 2, 2, color, 1);
      _this.setAlpha(alpha);
      _this.setScrollFactor(0);
      _this.boot();
      return _this;
    }
    _createClass(FullWindowRectangle, [{
      key: "boot",
      value: function boot() {
        var scene = this.scene;
        scene.sys.events.on('prerender', this.resize, this);
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        // preDestroy method does not have fromScene parameter
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }
        this.scene.sys.events.off('prerender', this.resize, this);
        _get(_getPrototypeOf(FullWindowRectangle.prototype), "destroy", this).call(this, fromScene);
      }
    }, {
      key: "tint",
      get: function get() {
        return this.fillColor;
      },
      set: function set(value) {
        this.setFillStyle(value, this.fillAlpha);
      }
    }, {
      key: "resize",
      value: function resize() {
        var scene = this.scene;
        var gameSize = scene.sys.scale.gameSize;
        var camera = scene.sys.cameras.main;
        var gameWidth = gameSize.width,
          gameHeight = gameSize.height,
          scale = 1 / camera.zoom;
        var x = gameWidth / 2,
          y = gameHeight / 2,
          width = gameWidth * scale,
          height = gameHeight * scale;
        if (this.x !== x || this.y !== y) {
          this.setPosition(x, y);
        }
        if (this.width !== width || this.height !== height) {
          this.setSize(width, height).setOrigin(0.5);
        }
      }
    }]);
    return FullWindowRectangle;
  }(Rectangle$1);

  var GetValue$b = Phaser.Utils.Objects.GetValue;
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
        this.setHitAreaMode(GetValue$b(o, 'hitAreaMode', 0));
        this.setEnable(GetValue$b(o, 'enable', true));
        this.setStopMode(GetValue$b(o, 'stopAllLevels', true));
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

  var GetValue$a = Phaser.Utils.Objects.GetValue;
  var Cover = /*#__PURE__*/function (_FullWindowRectangle) {
    _inherits(Cover, _FullWindowRectangle);
    var _super = _createSuper(Cover);
    function Cover(scene, config) {
      var _this;
      _classCallCheck(this, Cover);
      var fillColor = GetValue$a(config, 'color', 0x0);
      var fillAlpha = GetValue$a(config, 'alpha', 0.8);
      _this = _super.call(this, scene, fillColor, fillAlpha);
      _this.touchEventStop = new TouchEventStop(_assertThisInitialized(_this), {
        hitAreaMode: 1
      });
      return _this;
    }
    return _createClass(Cover);
  }(FullWindowRectangle);

  var CreateCover = function CreateCover(gameObject, config) {
    var scene = gameObject.scene;
    var cover = new Cover(scene, config);
    scene.add.existing(cover);

    // Put cover behind game object
    if (gameObject.isRexContainerLite) {
      gameObject.moveDepthBelow(cover);
      gameObject.pin(cover, {
        syncPosition: false,
        syncRotation: false,
        syncScale: false,
        syncAlpha: false,
        syncScrollFactor: false
      });
    } else {
      scene.children.moveBelow(cover, gameObject);
    }
    return cover;
  };

  var DefaultTransitCallbacks = {
    popUp: function popUp(gameObject, duration) {
      if (gameObject._modalScaleSave !== undefined) {
        gameObject.scaleX = gameObject._modalScaleSave;
        gameObject.scaleY = gameObject._modalScaleSave;
      } else {
        gameObject._modalScaleSave = gameObject.scaleX;
      }
      PopUp(gameObject, duration);
    },
    scaleDown: function scaleDown(gameObject, duration) {
      // Don't destroy here
      ScaleDownDestroy(gameObject, duration, undefined, undefined, false);
    },
    fadeIn: function fadeIn(gameObject, duration) {
      if (gameObject._modalAlphaSave !== undefined) {
        gameObject.alpha = gameObject._modalAlphaSave;
      } else {
        gameObject._modalAlphaSave = gameObject.alpha;
      }
      FadeIn(gameObject, duration);
    },
    fadeOut: function fadeOut(gameObject, duration) {
      // Don't destroy here
      FadeOutDestroy(gameObject, duration, false);
    }
  };

  var DefaultCoverTransitInCallback = function DefaultCoverTransitInCallback(cover, duration) {
    if (cover._modalAlphaSave !== undefined) {
      cover.alpha = cover._modalAlphaSave;
    } else {
      cover._modalAlphaSave = cover.alpha;
    }
    FadeIn(cover, duration, cover.alpha);
  };
  var DefaultCoverTransitOutCallback = function DefaultCoverTransitOutCallback(cover, duration) {
    FadeOutDestroy(cover, duration, false);
  };

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var Modal$1 = /*#__PURE__*/function (_OpenCloseTransition) {
    _inherits(Modal, _OpenCloseTransition);
    var _super = _createSuper(Modal);
    function Modal(gameObject, config) {
      var _this;
      _classCallCheck(this, Modal);
      if (config === undefined) {
        config = {};
      }
      if (config.transitIn == null) {
        config.transitIn = TransitionMode.popUp;
      }
      if (config.transitOut == null) {
        config.transitOut = TransitionMode.scaleDown;
      }
      config.destroy = GetValue$9(config, 'destroy', true);
      _this = _super.call(this, gameObject, config);
      // this.parent = gameObject;
      // this.scene

      // Cover : key of modal, to block touch input        
      var coverConfig = GetValue$9(config, 'cover');
      _this.cover = coverConfig !== false ? CreateCover(gameObject, coverConfig) : undefined;
      if (_this.cover) {
        _this.setCoverTransitInCallback(GetValue$9(coverConfig, 'transitIn', DefaultCoverTransitInCallback));
        _this.setCoverTransitOutCallback(GetValue$9(coverConfig, 'transitOut', DefaultCoverTransitOutCallback));
      }

      // Close conditions:
      var touchOutsideClose = GetValue$9(config, 'touchOutsideClose', false);
      var timeOutDuration = GetValue$9(config, 'duration.hold', -1);
      var timeOutClose = GetValue$9(config, 'timeOutClose', timeOutDuration >= 0);
      var anyTouchClose = GetValue$9(config, 'anyTouchClose', false);
      var manualClose = GetValue$9(config, 'manualClose', false);
      if (manualClose) {
        touchOutsideClose = false;
        anyTouchClose = false;
        timeOutClose = false;
      }
      if (anyTouchClose) {
        touchOutsideClose = false;
      }
      if (timeOutClose) {
        _this.setDisplayTime(timeOutDuration);
      } else {
        _this.setDisplayTime(-1);
      }

      // Registet touch-close event after opened
      if (anyTouchClose) {
        _this.once('open', _this.anyTouchClose, _assertThisInitialized(_this));
      } else if (touchOutsideClose) {
        _this.once('open', _this.touchOutsideClose, _assertThisInitialized(_this));
      }
      _this.requestOpen();
      return _this;
    }
    _createClass(Modal, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // Registered in touchOutsideClose(), or anyTouchClose()
        if (!this.cover) {
          this.scene.input.off('pointerup', this.touchCloseCallback, this);
        }
        if (this.cover && !fromScene) {
          this.cover.destroy();
          this.cover = undefined;
        }
        _get(_getPrototypeOf(Modal.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "touchOutsideClose",
      value: function touchOutsideClose() {
        if (this.cover) {
          this.cover.on('pointerup', this.touchCloseCallback, this);
        } else {
          this.scene.input.on('pointerup', this.touchCloseCallback, this);
        }
        this.clickOutsideTest = true;
        return this;
      }
    }, {
      key: "anyTouchClose",
      value: function anyTouchClose() {
        if (this.cover) {
          this.cover.once('pointerup', this.touchCloseCallback, this);
        } else {
          this.scene.input.once('pointerup', this.touchCloseCallback, this);
        }
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
      key: "runTransitionInCallback",
      value: function runTransitionInCallback() {
        var duration = _get(_getPrototypeOf(Modal.prototype), "runTransitionInCallback", this).call(this);
        var cover = this.cover;
        if (cover && this.coverTransitInCallback) {
          this.coverTransitInCallback(cover, duration);
        }
        return duration;
      }
    }, {
      key: "runTransitionOutCallback",
      value: function runTransitionOutCallback() {
        var duration = _get(_getPrototypeOf(Modal.prototype), "runTransitionOutCallback", this).call(this);
        var cover = this.cover;
        if (cover && this.coverTransitOutCallback) {
          this.coverTransitOutCallback(cover, duration);
        }
        return duration;
      }
    }, {
      key: "onOpen",
      value: function onOpen() {
        var duration = this.displayTime;
        if (duration >= 0) {
          this.delayCall(duration, this.requestClose,
          // callback
          this // scope
          );
        }

        this.emit('open', this.parent, this);
        _get(_getPrototypeOf(Modal.prototype), "onOpen", this).call(this);
      }
    }, {
      key: "onClose",
      value: function onClose() {
        this.emit('close', this.closeEventData);
        _get(_getPrototypeOf(Modal.prototype), "onClose", this).call(this);
      }
    }, {
      key: "setDisplayTime",
      value: function setDisplayTime(time) {
        this.displayTime = time;
        return this;
      }
    }, {
      key: "setTransitInCallback",
      value: function setTransitInCallback(callback) {
        if (typeof callback === 'string') {
          callback = TransitionMode[callback];
        }
        switch (callback) {
          case TransitionMode.popUp:
            callback = DefaultTransitCallbacks.popUp;
            break;
          case TransitionMode.fadeIn:
            callback = DefaultTransitCallbacks.fadeIn;
            break;
        }
        _get(_getPrototypeOf(Modal.prototype), "setTransitInCallback", this).call(this, callback);
        // callback = function(gameObject, duration) {}
        return this;
      }
    }, {
      key: "setTransitOutCallback",
      value: function setTransitOutCallback(callback) {
        if (typeof callback === 'string') {
          callback = TransitionMode[callback];
        }
        switch (callback) {
          case TransitionMode.scaleDown:
            callback = DefaultTransitCallbacks.scaleDown;
            break;
          case TransitionMode.fadeOut:
            callback = DefaultTransitCallbacks.fadeOut;
            break;
        }
        _get(_getPrototypeOf(Modal.prototype), "setTransitOutCallback", this).call(this, callback);
        // callback = function(gameObject, duration) {}
        return this;
      }
    }, {
      key: "setCoverTransitInCallback",
      value: function setCoverTransitInCallback(callback) {
        this.coverTransitInCallback = callback;
        return this;
      }
    }, {
      key: "setCoverTransitOutCallback",
      value: function setCoverTransitOutCallback(callback) {
        this.coverTransitOutCallback = callback;
        return this;
      }
    }]);
    return Modal;
  }(OpenCloseTransition);
  var TransitionMode = {
    popUp: 0,
    fadeIn: 1,
    scaleDown: 0,
    fadeOut: 1
  };

  var Modal = function Modal(gameObject, config) {
    var modalBehavior = new Modal$1(gameObject, config);

    // Route modal's 'open', 'close' event
    modalBehavior.on('open', function () {
      gameObject.emit('modal.open', modalBehavior);
    });
    modalBehavior.on('close', function (closeEventData) {
      gameObject.emit('modal.close', closeEventData, modalBehavior);
    });

    // Reigster 'modal.requestClose' event for invoking modalBehavior.requestClose() method
    gameObject.on('modal.requestClose', modalBehavior.requestClose, modalBehavior);
    /*
    It is not necessary to turn off gameObject's 'modal.requestClose' event because that :
      - If `config.destroy` is `undefined` (or `true), gameObject and modalBehavior will be destroyed
    - If `config.destroy` is `false` (for reusing dialog), keeping gameObject and modalBehavior 
    */

    return modalBehavior;
  };
  var ModalClose = function ModalClose(gameObject, closeEventData) {
    gameObject.emit('modal.requestClose', closeEventData);
  };

  var ModalMethods = {
    modal: function modal(config, onClose) {
      if (IsFunction(config)) {
        onClose = config;
        config = undefined;
      }
      if (this._modalBehavior === undefined) {
        var OnButtonClick = function OnButtonClick(button, groupName, index, pointer, event) {
          if (groupName !== 'actions') {
            return;
          }
          var closeEventData = {
            index: index,
            text: button.text,
            button: button,
            dialog: this
          };
          ModalClose(this, closeEventData);
        };
        this.on('button.click', OnButtonClick, this);
        this._modalBehavior = Modal(this, config);
      }
      if (onClose) {
        this._modalBehavior.once('close', onClose);
      }
      this._modalBehavior.requestOpen();
      return this;
    },
    modalPromise: function modalPromise(config) {
      var self = this;
      return new Promise(function (resolve, reject) {
        self.modal(config, resolve);
      });
    }
  };

  var Methods = {};
  Object.assign(Methods, ButtonMethods, ModalMethods);

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var Dialog = /*#__PURE__*/function (_Sizer) {
    _inherits(Dialog, _Sizer);
    var _super = _createSuper(Dialog);
    function Dialog(scene, config) {
      var _this;
      _classCallCheck(this, Dialog);
      if (config === undefined) {
        config = {};
      }
      // Create sizer        
      config.orientation = 1; // Top to bottom
      _this = _super.call(this, scene, config);
      _this.type = 'rexDialog';
      _this.eventEmitter = GetValue$8(config, 'eventEmitter', _assertThisInitialized(_this));

      // Add elements
      var background = GetValue$8(config, 'background', undefined);
      var title = GetValue$8(config, 'title', undefined);
      var toolbar = GetValue$8(config, 'toolbar', undefined);
      var toolbarBackground = GetValue$8(config, 'toolbarBackground', undefined);
      var leftToolbar = GetValue$8(config, 'leftToolbar', undefined);
      var leftToolbarBackground = GetValue$8(config, 'leftToolbarBackground', undefined);
      var content = GetValue$8(config, 'content', undefined);
      var description = GetValue$8(config, 'description', undefined);
      var choicesSizer;
      var choices = GetValue$8(config, 'choices', undefined);
      var choicesBackground = GetValue$8(config, 'choicesBackground', undefined);
      var actionsSizer;
      var actions = GetValue$8(config, 'actions', undefined);
      var actionsBackground = GetValue$8(config, 'actionsBackground', undefined);
      var clickConfig = GetValue$8(config, 'click', undefined);
      if (background) {
        _this.addBackground(background);
      }
      var toolbarSizer;
      if (toolbar) {
        toolbarSizer = new Buttons$1(scene, {
          groupName: 'toolbar',
          background: toolbarBackground,
          buttons: toolbar,
          orientation: 0,
          // Left-right
          space: {
            item: GetValue$8(config, 'space.toolbarItem', 0)
          },
          click: clickConfig,
          eventEmitter: _this.eventEmitter
        });
      }
      var leftToolbarSizer;
      if (leftToolbar) {
        leftToolbarSizer = new Buttons$1(scene, {
          groupName: 'leftToolbar',
          background: leftToolbarBackground,
          buttons: leftToolbar,
          orientation: 0,
          // Left-right
          space: {
            item: GetValue$8(config, 'space.leftToolbarItem', 0)
          },
          click: clickConfig,
          eventEmitter: _this.eventEmitter
        });
      }

      // title or toolbar or leftToolbar
      if (title || toolbar || leftToolbar) {
        var titleExpandWidth = !!title && GetValue$8(config, 'expand.title', true);
        var titleAlign = GetValue$8(config, 'align.title', 'center');
        var useOverlapSizer =
        // Has title, title is not exapnd-width, title align to center
        title && !titleExpandWidth && titleAlign === 'center' ||
        // No title
        !title && (toolbar || leftToolbar);
        var useSizer = !useOverlapSizer;
        var titleSizer;
        if (useSizer) {
          titleSizer = new Sizer(scene, {
            orientation: 0
          });
        } else {
          titleSizer = new OverlapSizer(scene);
        }
        var titleChildExpand = useSizer ? true : {
          height: true
        };

        // Add leftToolbar
        if (leftToolbarSizer) {
          titleSizer.add(leftToolbarSizer, {
            align: 'left',
            expand: titleChildExpand
          });
        }

        // Add title
        if (title) {
          // Add space if not expand, align to right
          if (useSizer && !titleExpandWidth && titleAlign === 'right') {
            titleSizer.addSpace();
          }
          var padding = {
            left: GetValue$8(config, 'space.titleLeft', 0),
            right: GetValue$8(config, 'space.titleRight', 0)
          };
          var proportion = titleExpandWidth ? 1 : 0;
          titleSizer.add(title, {
            align: titleAlign,
            proportion: proportion,
            expand: titleChildExpand,
            padding: padding
          });

          // Add space if not expand, align to left
          if (useSizer && !titleExpandWidth && titleAlign === 'left') {
            titleSizer.addSpace();
          }
        }

        // Add toolbar
        if (toolbarSizer) {
          // Add space if not title
          if (useSizer && !title) {
            titleSizer.addSpace();
          }
          titleSizer.add(toolbarSizer, {
            align: 'right',
            expand: titleChildExpand
          });
        }

        // Add sizer to dialog
        var titleSpace = GetValue$8(config, 'space.title', 0);
        var padding;
        if (content || description || choices || actions) {
          padding = {
            bottom: titleSpace
          };
        }
        var proportion = GetValue$8(config, 'proportion.title', 0);
        _this.add(titleSizer, {
          padding: padding,
          proportion: proportion,
          expand: true
        });
      }
      if (content) {
        var align = GetValue$8(config, 'align.content', 'center');
        var contentSpace = GetValue$8(config, 'space.content', 0);
        var padding = {
          left: GetValue$8(config, 'space.contentLeft', 0),
          right: GetValue$8(config, 'space.contentRight', 0),
          bottom: description || choices || actions ? contentSpace : 0
        };
        var proportion = GetValue$8(config, 'proportion.content', 0);
        var expand = GetValue$8(config, 'expand.content', true);
        _this.add(content, {
          align: align,
          padding: padding,
          proportion: proportion,
          expand: expand
        });
      }
      if (description) {
        var align = GetValue$8(config, 'align.description', 'center');
        var descriptionSpace = GetValue$8(config, 'space.description', 0);
        var padding = {
          left: GetValue$8(config, 'space.descriptionLeft', 0),
          right: GetValue$8(config, 'space.descriptionRight', 0),
          bottom: choices || actions ? descriptionSpace : 0
        };
        var proportion = GetValue$8(config, 'proportion.description', 0);
        var expand = GetValue$8(config, 'expand.description', true);
        _this.add(description, {
          align: align,
          padding: padding,
          proportion: proportion,
          expand: expand
        });
      }
      if (choices) {
        var choicesType = GetValue$8(config, 'choicesType', '').split('-');
        var ButtonsClass = Contains(choicesType, 'wrap') ? Buttons : Contains(choicesType, 'grid') ? GridButtons : Buttons$1;
        var buttonsType = Contains(choicesType, 'radio') ? 'radio' : Contains(choicesType, 'checkboxes') ? 'checkboxes' : undefined;
        var space = {
          left: GetValue$8(config, 'space.choicesBackgroundLeft', 0),
          right: GetValue$8(config, 'space.choicesBackgroundRight', 0),
          top: GetValue$8(config, 'space.choicesBackgroundTop', 0),
          bottom: GetValue$8(config, 'space.choicesBackgroundBottom', 0)
        };
        var itemSpace = GetValue$8(config, 'space.choice', 0);
        if (ButtonsClass === Buttons$1) {
          space.item = itemSpace;
        } else if (ButtonsClass === Buttons) {
          space.item = itemSpace;
          space.line = GetValue$8(config, 'space.choiceLine', itemSpace);
        } else {
          // GridButtons
          space.column = GetValue$8(config, 'space.choiceColumn', itemSpace);
          space.row = GetValue$8(config, 'space.choiceRow', itemSpace);
        }
        var choicesConfig = {
          width: GetValue$8(config, 'choicesWidth', undefined),
          height: GetValue$8(config, 'choicesHeight', undefined),
          groupName: 'choices',
          buttonsType: buttonsType,
          background: choicesBackground,
          buttons: choices,
          space: space,
          click: clickConfig,
          eventEmitter: _this.eventEmitter,
          setValueCallback: GetValue$8(config, 'choicesSetValueCallback', undefined),
          setValueCallbackScope: GetValue$8(config, 'choicesSetValueCallbackScope', undefined)
        };
        if (ButtonsClass === Buttons$1) {
          choicesConfig.orientation = Contains(choicesType, 'x') ? 0 : 1;
        }
        choicesSizer = new ButtonsClass(scene, choicesConfig);
        var choicesSpace = GetValue$8(config, 'space.choices', 0);
        var padding = {
          left: GetValue$8(config, 'space.choicesLeft', 0),
          right: GetValue$8(config, 'space.choicesRight', 0),
          bottom: actions ? choicesSpace : 0
        };
        var align = GetValue$8(config, 'align.choices', 'center');
        var proportion = GetValue$8(config, 'proportion.choices', 0);
        var expand = GetValue$8(config, 'expand.choices', true);
        _this.add(choicesSizer, {
          align: align,
          padding: padding,
          proportion: proportion,
          expand: expand
        });
      }
      if (actions) {
        actionsSizer = new Buttons$1(scene, {
          groupName: 'actions',
          background: actionsBackground,
          buttons: actions,
          orientation: 0,
          // Left-right
          space: {
            item: GetValue$8(config, 'space.action', 0)
          },
          expand: GetValue$8(config, 'expand.actions', false),
          align: GetValue$8(config, 'align.actions', 'center'),
          click: clickConfig,
          eventEmitter: _this.eventEmitter
        });
        var padding = {
          left: GetValue$8(config, 'space.actionsLeft', 0),
          right: GetValue$8(config, 'space.actionsRight', 0)
        };
        var proportion = GetValue$8(config, 'proportion.action', 0);
        _this.add(actionsSizer, {
          align: 'center',
          padding: padding,
          proportion: proportion,
          expand: true
        });
      }
      EmitButtonEvent(_assertThisInitialized(_this), 'click');
      EmitButtonEvent(_assertThisInitialized(_this), 'over');
      EmitButtonEvent(_assertThisInitialized(_this), 'out');
      EmitButtonEvent(_assertThisInitialized(_this), 'enable');
      EmitButtonEvent(_assertThisInitialized(_this), 'disalbe');
      _this.addChildrenMap('background', background);
      _this.addChildrenMap('title', title);
      _this.addChildrenMap('toolbar', toolbar);
      _this.addChildrenMap('leftToolbar', leftToolbar);
      _this.addChildrenMap('content', content);
      _this.addChildrenMap('description', description);
      _this.addChildrenMap('choices', choicesSizer ? choicesSizer.buttons : undefined);
      _this.addChildrenMap('actions', actionsSizer ? actionsSizer.buttons : undefined);
      _this.addChildrenMap('choicesSizer', choicesSizer);
      _this.addChildrenMap('actionsSizer', actionsSizer);
      _this.addChildrenMap('toolbarSizer', toolbarSizer);
      _this.addChildrenMap('leftToolbarSizer', leftToolbarSizer);
      return _this;
    }
    return _createClass(Dialog);
  }(Sizer);
  var Contains = function Contains(arr, item) {
    return arr.indexOf(item) !== -1;
  };
  var ButtonsGroupEventNameMap = {
    actions: 'action',
    choices: 'choice',
    toolbar: 'toolbar',
    leftToolbar: 'leftToolbar'
  };
  var EmitButtonEvent = function EmitButtonEvent(dialog, postEventName) {
    dialog.on("button.".concat(postEventName), function (button, groupName, index, pointer, event) {
      if (!ButtonsGroupEventNameMap.hasOwnProperty(groupName)) {
        return;
      }
      dialog.emit("".concat(ButtonsGroupEventNameMap[groupName], ".").concat(postEventName), button, index, pointer, event);
    });
  };
  Object.assign(Dialog.prototype, Methods);

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * This is a slightly modified version of jQuery.isPlainObject.
   * A plain object is an object whose internal class property is [object Object].
   *
   * @function Phaser.Utils.Objects.IsPlainObject
   * @since 3.0.0
   *
   * @param {object} obj - The object to inspect.
   *
   * @return {boolean} `true` if the object is plain, otherwise `false`.
   */
  var IsPlainObject$2 = function IsPlainObject(obj) {
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if (_typeof(obj) !== 'object' || obj.nodeType || obj === obj.window) {
      return false;
    }

    // Support: Firefox <20
    // The try/catch suppresses exceptions thrown when attempting to access
    // the "constructor" property of certain host objects, ie. |window.location|
    // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
    try {
      if (obj.constructor && !{}.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
      }
    } catch (e) {
      return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
  };

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
    if (IsPlainObject$2(inObject)) {
      for (key in inObject) {
        value = inObject[key];

        //  Recursively (deep) copy for nested objects, including arrays
        outObject[key] = DeepClone(value);
      }
    } else {
      outObject = inObject;
    }
    return outObject;
  };

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var RoundRectangle$1 = /*#__PURE__*/function () {
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
          defaultRadiusX = GetValue$7(value, 'x', 0);
          defaultRadiusY = GetValue$7(value, 'y', 0);
        }
        var radius = this.cornerRadius;
        radius.tl = GetRadius(GetValue$7(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
        radius.tr = GetRadius(GetValue$7(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
        radius.bl = GetRadius(GetValue$7(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
        radius.br = GetRadius(GetValue$7(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
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
      radius = {
        x: defaultRadiusX,
        y: defaultRadiusY
      };
    } else if (typeof radius === 'number') {
      radius = {
        x: radius,
        y: radius
      };
    }
    SetConvex(radius);
    return radius;
  };
  var SetRadius = function SetRadius(radius, value) {
    if (typeof value === 'number') {
      radius.x = value;
      radius.y = value;
    } else {
      radius.x = GetValue$7(value, 'x', 0);
      radius.y = GetValue$7(value, 'y', 0);
    }
    SetConvex(radius);
  };
  var SetConvex = function SetConvex(radius) {
    radius.convex = radius.x >= 0 || radius.y >= 0;
    radius.x = Math.abs(radius.x);
    radius.y = Math.abs(radius.y);
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

  var DegToRad$1 = Phaser.Math.DegToRad;
  var ArcTo$1 = function ArcTo(centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && endAngle > startAngle) {
      endAngle -= 360;
    } else if (!antiClockWise && endAngle < startAngle) {
      endAngle += 360;
    }
    var deltaAngle = endAngle - startAngle;
    var step = DegToRad$1(deltaAngle) / iteration;
    startAngle = DegToRad$1(startAngle);
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

  var GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;
  var PolygonWebGLRenderer = function PolygonWebGLRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateData();
      src.dirty = false;
    }
    camera.addToRenderList(src);
    var pipeline = renderer.pipelines.set(src.pipeline);
    var result = GetCalcMatrix(src, camera, parentMatrix);
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

  var SetTransform = Phaser.Renderer.Canvas.SetTransform;
  var PolygonCanvasRenderer = function PolygonCanvasRenderer(renderer, src, camera, parentMatrix) {
    if (src.dirty) {
      src.updateData();
      src.dirty = false;
    }
    camera.addToRenderList(src);
    var ctx = renderer.currentContext;
    if (SetTransform(renderer, ctx, src, camera, parentMatrix)) {
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

  var Render$1 = {
    renderWebGL: PolygonWebGLRenderer,
    renderCanvas: PolygonCanvasRenderer
  };

  var Shape = Phaser.GameObjects.Shape;
  var IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var Earcut = Phaser.Geom.Polygon.Earcut;
  var RoundRectangle = /*#__PURE__*/function (_Shape) {
    _inherits(RoundRectangle, _Shape);
    var _super = _createSuper(RoundRectangle);
    function RoundRectangle(scene, x, y, width, height, radiusConfig, fillColor, fillAlpha) {
      var _this;
      _classCallCheck(this, RoundRectangle);
      var strokeColor, strokeAlpha, strokeWidth, shapeType;
      if (IsPlainObject$1(x)) {
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
      var geom = new RoundRectangle$1(); // Configurate it later
      _this = _super.call(this, scene, 'rexRoundRectangleShape', geom);
      _this.setShapeType(shapeType);
      if (_this.shapeType === 0) {
        var radius = GetValue$6(radiusConfig, 'radius', radiusConfig);
        geom.setTo(0, 0, width, height, radius);
      } else {
        var radius = {
          x: width / 2,
          y: height / 2
        };
        geom.setTo(0, 0, width, height, radius);
      }
      var iteration = GetValue$6(radiusConfig, 'iteration', undefined);
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

        // Top-left
        radius = cornerRadius.tl;
        if (IsArcCorner$1(radius)) {
          if (radius.convex) {
            var centerX = radius.x;
            var centerY = radius.y;
            ArcTo$1(centerX, centerY, radius.x, radius.y, 180, 270, false, iteration, pathData);
          } else {
            var centerX = 0;
            var centerY = 0;
            ArcTo$1(centerX, centerY, radius.x, radius.y, 90, 0, true, iteration, pathData);
          }
        } else {
          LineTo(0, 0, pathData);
        }

        // Top-right
        radius = cornerRadius.tr;
        if (IsArcCorner$1(radius)) {
          if (radius.convex) {
            var centerX = width - radius.x;
            var centerY = radius.y;
            ArcTo$1(centerX, centerY, radius.x, radius.y, 270, 360, false, iteration, pathData);
          } else {
            var centerX = width;
            var centerY = 0;
            ArcTo$1(centerX, centerY, radius.x, radius.y, 180, 90, true, iteration, pathData);
          }
        } else {
          LineTo(width, 0, pathData);
        }

        // Bottom-right
        radius = cornerRadius.br;
        if (IsArcCorner$1(radius)) {
          if (radius.convex) {
            var centerX = width - radius.x;
            var centerY = height - radius.y;
            ArcTo$1(centerX, centerY, radius.x, radius.y, 0, 90, false, iteration, pathData);
          } else {
            var centerX = width;
            var centerY = height;
            ArcTo$1(centerX, centerY, radius.x, radius.y, 270, 180, true, iteration, pathData);
          }
        } else {
          LineTo(width, height, pathData);
        }

        // Bottom-left
        radius = cornerRadius.bl;
        if (IsArcCorner$1(radius)) {
          if (radius.convex) {
            var centerX = radius.x;
            var centerY = height - radius.y;
            ArcTo$1(centerX, centerY, radius.x, radius.y, 90, 180, false, iteration, pathData);
          } else {
            var centerX = 0;
            var centerY = height;
            ArcTo$1(centerX, centerY, radius.x, radius.y, 360, 270, true, iteration, pathData);
          }
        } else {
          LineTo(0, height, pathData);
        }
        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        this.pathIndexes = Earcut(pathData);
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
        this.radiusBL = value;
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
  }(Shape);
  var IsArcCorner$1 = function IsArcCorner(radius) {
    return radius.x > 0 && radius.y > 0;
  };
  var ShapeTypeMap = {
    rectangle: 0,
    circle: 1
  };
  Object.assign(RoundRectangle.prototype, Render$1);

  var CreateRoundRectangle = function CreateRoundRectangle(scene, config) {
    var gameObject = new RoundRectangle(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var CreateBackground = function CreateBackground(scene, config) {
    var gameObject = CreateRoundRectangle(scene, config);
    // TODO: Create nine-slice background game object
    return gameObject;
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  var Utils = Phaser.Renderer.WebGL.Utils;

  /**
   * Renders this Game Object with the WebGL Renderer to the given Camera.
   * The object will not render if any of its renderFlags are set or it is being actively filtered out by the Camera.
   * This method should not be called directly. It is a utility function of the Render module.
   *
   * @method Phaser.GameObjects.Text#renderWebGL
   * @since 3.0.0
   * @private
   *
   * @param {Phaser.Renderer.WebGL.WebGLRenderer} renderer - A reference to the current active WebGL renderer.
   * @param {Phaser.GameObjects.Text} src - The Game Object being rendered in this call.
   * @param {number} interpolationPercentage - Reserved for future use and custom pipelines.
   * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
   * @param {Phaser.GameObjects.Components.TransformMatrix} parentMatrix - This transform matrix is defined if the game object is nested
   */
  var WebGLRenderer = function WebGLRenderer(renderer, src, camera, parentMatrix) {
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
    pipeline.batchTexture(src, frame.glTexture, width, height, src.x, src.y, width / src.style.resolution, height / src.style.resolution, src.scaleX, src.scaleY, src.rotation, src.flipX, src.flipY, src.scrollFactorX, src.scrollFactorY, src.displayOriginX, src.displayOriginY, 0, 0, width, height, getTint(src.tintTopLeft, camera.alpha * src._alphaTL), getTint(src.tintTopRight, camera.alpha * src._alphaTR), getTint(src.tintBottomLeft, camera.alpha * src._alphaBL), getTint(src.tintBottomRight, camera.alpha * src._alphaBR), src.tintFill, 0, 0, camera, parentMatrix, false, textureUnit);
    renderer.pipelines.postBatch(src);
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Renders this Game Object with the Canvas Renderer to the given Camera.
   * The object will not render if any of its renderFlags are set or it is being actively filtered out by the Camera.
   * This method should not be called directly. It is a utility function of the Render module.
   *
   * @method Phaser.GameObjects.Text#renderCanvas
   * @since 3.0.0
   * @private
   *
   * @param {Phaser.Renderer.Canvas.CanvasRenderer} renderer - A reference to the current active Canvas renderer.
   * @param {Phaser.GameObjects.Text} src - The Game Object being rendered in this call.
   * @param {number} interpolationPercentage - Reserved for future use and custom pipelines.
   * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
   * @param {Phaser.GameObjects.Components.TransformMatrix} parentMatrix - This transform matrix is defined if the game object is nested
   */
  var CanvasRenderer = function CanvasRenderer(renderer, src, camera, parentMatrix) {
    if (src.width === 0 || src.height === 0) {
      return;
    }
    camera.addToRenderList(src);
    renderer.batchSprite(src, src.frame, camera, parentMatrix);
  };

  var Render = {
    renderWebGL: WebGLRenderer,
    renderCanvas: CanvasRenderer
  };

  var CanvasPool$2 = Phaser.Display.Canvas.CanvasPool;
  var MeasureTextMargins = function MeasureTextMargins(textStyle, testString, out) {
    if (out === undefined) {
      out = {};
    }
    var canvas = CanvasPool$2.create(this);
    var context = canvas.getContext('2d');
    textStyle.syncFont(canvas, context);
    var metrics = context.measureText(testString);
    var width = Math.ceil(metrics.width * textStyle.baselineX);
    var baseline = width;
    var height = 2 * baseline;
    baseline = baseline * textStyle.baselineY | 0;
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = '#f00';
    context.fillRect(0, 0, width, height);
    context.font = textStyle._font;
    context.textBaseline = 'alphabetic';
    context.fillStyle = '#000';
    context.fillText(textStyle.testString, 0, baseline);
    out.left = 0;
    if (width === 0 || height === 0 || !context.getImageData(0, 0, width, height)) {
      CanvasPool$2.remove(canvas);
      return out;
    }
    var imagedata = context.getImageData(0, 0, width, height).data;
    var stop = false;
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var idx = (y * width + x) * 4;
        if (imagedata[idx] !== 255) {
          out.left = x;
          stop = true;
          break;
        }
      }
      if (stop) {
        break;
      }
    }
    CanvasPool$2.remove(canvas);
    return out;
  };

  var GameObject$1 = Phaser.GameObjects.GameObject;
  var TextBase = /*#__PURE__*/function (_GameObject) {
    _inherits(TextBase, _GameObject);
    var _super = _createSuper(TextBase);
    function TextBase() {
      _classCallCheck(this, TextBase);
      return _super.apply(this, arguments);
    }
    _createClass(TextBase, [{
      key: "setStyle",
      value: function setStyle(style) {
        return this.style.setStyle(style);
      }
    }, {
      key: "setFont",
      value: function setFont(font) {
        return this.style.setFont(font);
      }
    }, {
      key: "setFontFamily",
      value: function setFontFamily(family) {
        return this.style.setFontFamily(family);
      }
    }, {
      key: "setFontSize",
      value: function setFontSize(size) {
        return this.style.setFontSize(size);
      }
    }, {
      key: "setFontStyle",
      value: function setFontStyle(style) {
        return this.style.setFontStyle(style);
      }
    }, {
      key: "setTestString",
      value: function setTestString(string) {
        return this.style.setTestString(string);
      }
    }, {
      key: "setFixedSize",
      value: function setFixedSize(width, height) {
        return this.style.setFixedSize(width, height);
      }
    }, {
      key: "setBackgroundColor",
      value: function setBackgroundColor(color, color2, isHorizontalGradient) {
        return this.style.setBackgroundColor(color, color2, isHorizontalGradient);
      }
    }, {
      key: "setBackgroundStrokeColor",
      value: function setBackgroundStrokeColor(color, lineWidth) {
        return this.style.setBackgroundStrokeColor(color, lineWidth);
      }
    }, {
      key: "setBackgroundCornerRadius",
      value: function setBackgroundCornerRadius(radius, iteration) {
        return this.style.setBackgroundCornerRadius(radius, iteration);
      }
    }, {
      key: "setFill",
      value: function setFill(color) {
        return this.style.setFill(color);
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        return this.style.setColor(color);
      }
    }, {
      key: "setStroke",
      value: function setStroke(color, thickness) {
        return this.style.setStroke(color, thickness);
      }
    }, {
      key: "setShadow",
      value: function setShadow(x, y, color, blur, shadowStroke, shadowFill) {
        return this.style.setShadow(x, y, color, blur, shadowStroke, shadowFill);
      }
    }, {
      key: "setShadowOffset",
      value: function setShadowOffset(x, y) {
        return this.style.setShadowOffset(x, y);
      }
    }, {
      key: "setShadowColor",
      value: function setShadowColor(color) {
        return this.style.setShadowColor(color);
      }
    }, {
      key: "setShadowBlur",
      value: function setShadowBlur(blur) {
        return this.style.setShadowBlur(blur);
      }
    }, {
      key: "setShadowStroke",
      value: function setShadowStroke(enabled) {
        return this.style.setShadowStroke(enabled);
      }
    }, {
      key: "setShadowFill",
      value: function setShadowFill(enabled) {
        return this.style.setShadowFill(enabled);
      }
    }, {
      key: "setWrapMode",
      value: function setWrapMode(mode) {
        return this.style.setWrapMode(mode);
      }
    }, {
      key: "setWrapWidth",
      value: function setWrapWidth(width) {
        return this.style.setWrapWidth(width);
      }

      // Align with built-in text game object
    }, {
      key: "setWordWrapWidth",
      value: function setWordWrapWidth(width) {
        return this.style.setWrapWidth(width);
      }
    }, {
      key: "setAlign",
      value: function setAlign(align) {
        return this.style.setHAlign(align);
      }
    }, {
      key: "setHAlign",
      value: function setHAlign(align) {
        return this.style.setHAlign(align);
      }
    }, {
      key: "setVAlign",
      value: function setVAlign(align) {
        return this.style.setVAlign(align);
      }
    }, {
      key: "setLineSpacing",
      value: function setLineSpacing(value) {
        return this.style.setLineSpacing(value);
      }
    }, {
      key: "lineSpacing",
      get: function get() {
        return this.style.lineSpacing;
      },
      set: function set(value) {
        this.setLineSpacing(value);
      }
    }, {
      key: "setXOffset",
      value: function setXOffset(value) {
        return this.style.setXOffset(value);
      }
    }, {
      key: "setMaxLines",
      value: function setMaxLines(max) {
        return this.style.setMaxLines(max);
      }
    }, {
      key: "setResolution",
      value: function setResolution(value) {
        return this.style.setResolution(value);
      }
    }, {
      key: "getTextMetrics",
      value: function getTextMetrics() {
        return this.style.getTextMetrics();
      }
    }, {
      key: "setTextMetrics",
      value: function setTextMetrics(metrics, font) {
        return this.style.setTextMetrics(metrics, font);
      }
    }, {
      key: "measureTextMargins",
      value: function measureTextMargins(testString, out) {
        return MeasureTextMargins(this.style, testString, out);
      }
    }]);
    return TextBase;
  }(GameObject$1);
  var Components$1 = Phaser.GameObjects.Components;
  Phaser.Class.mixin(TextBase, [Components$1.Alpha, Components$1.BlendMode, Components$1.ComputedSize, Components$1.Crop, Components$1.Depth, Components$1.Flip,
  // Components.FX,  // Open for 3.60
  Components$1.GetBounds, Components$1.Mask, Components$1.Origin, Components$1.Pipeline, Components$1.ScrollFactor, Components$1.Tint, Components$1.Transform, Components$1.Visible, Render]);

  var Pad = Phaser.Utils.String.Pad;
  var GetStyle = function GetStyle(style, canvas, context) {
    if (style == null) {
      return style;
    }
    switch (_typeof(style)) {
      case 'string':
        return style;
      case 'number':
        return "#".concat(Pad(Math.floor(style).toString(16), 6, '0', 1));
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

  //  Key: [ Object Key, Default Value, postCallback ]

  var PropertyMap = {
    // background
    backgroundColor: ['backgroundColor', null, GetStyle],
    backgroundColor2: ['backgroundColor2', null, GetStyle],
    backgroundHorizontalGradient: ['backgroundHorizontalGradient', true, null],
    backgroundStrokeColor: ['backgroundStrokeColor', null, GetStyle],
    backgroundStrokeLineWidth: ['backgroundStrokeLineWidth', 2, null],
    backgroundCornerRadius: ['backgroundCornerRadius', 0, null],
    backgroundCornerIteration: ['backgroundCornerIteration', null, null],
    // font
    fontFamily: ['fontFamily', 'Courier', null],
    fontSize: ['fontSize', '16px', null],
    fontStyle: ['fontStyle', '', null],
    color: ['color', '#fff', GetStyle],
    stroke: ['stroke', '#fff', GetStyle],
    strokeThickness: ['strokeThickness', 0, null],
    shadowOffsetX: ['shadow.offsetX', 0, null],
    shadowOffsetY: ['shadow.offsetY', 0, null],
    shadowColor: ['shadow.color', '#000', GetStyle],
    shadowBlur: ['shadow.blur', 0, null],
    shadowStroke: ['shadow.stroke', false, null],
    shadowFill: ['shadow.fill', false, null],
    // underline
    underlineColor: ['underline.color', '#000', GetStyle],
    underlineThickness: ['underline.thickness', 0, null],
    underlineOffset: ['underline.offset', 0, null],
    // align
    halign: ['halign', 'left', null],
    valign: ['valign', 'top', null],
    // size
    maxLines: ['maxLines', 0, null],
    fixedWidth: ['fixedWidth', 0, null],
    fixedHeight: ['fixedHeight', 0, null],
    resolution: ['resolution', 0, null],
    lineSpacing: ['lineSpacing', 0, null],
    xOffset: ['xOffset', 0, null],
    rtl: ['rtl', false, null],
    testString: ['testString', '|MÃ‰qgy', null],
    baselineX: ['baselineX', 1.2, null],
    baselineY: ['baselineY', 1.4, null],
    // wrap
    wrapMode: ['wrap.mode', 0, null],
    wrapWidth: ['wrap.width', 0, null],
    wrapCallback: ['wrap.callback', null],
    wrapCallbackScope: ['wrap.callbackScope', null]
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  var CanvasPool$1 = Phaser.Display.Canvas.CanvasPool;

  /**
   * Calculates the ascent, descent and fontSize of a given font style.
   *
   * @function Phaser.GameObjects.MeasureText
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.Text.TextStyle} textStyle - The TextStyle object to measure.
   *
   * @return {object} An object containing the ascent, descent and fontSize of the TextStyle.
   */
  var MeasureText = function MeasureText(textStyle) {
    // @property {HTMLCanvasElement} canvas - The canvas element that the text is rendered.
    var canvas = CanvasPool$1.create(this);

    // @property {HTMLCanvasElement} context - The context of the canvas element that the text is rendered to.
    var context = canvas.getContext('2d');
    textStyle.syncFont(canvas, context);
    var metrics = context.measureText(textStyle.testString);
    if ('actualBoundingBoxAscent' in metrics) {
      var ascent = metrics.actualBoundingBoxAscent;
      var descent = metrics.actualBoundingBoxDescent;
      var output = {
        ascent: ascent,
        descent: descent,
        fontSize: ascent + descent
      };
      CanvasPool$1.remove(canvas);
      return output;
    }
    var width = Math.ceil(metrics.width * textStyle.baselineX);
    var baseline = width;
    var height = 2 * baseline;
    baseline = baseline * textStyle.baselineY | 0;
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = '#f00';
    context.fillRect(0, 0, width, height);
    context.font = textStyle._font;
    context.textBaseline = 'alphabetic';
    context.fillStyle = '#000';
    context.fillText(textStyle.testString, 0, baseline);
    var output = {
      ascent: 0,
      descent: 0,
      fontSize: 0
    };
    if (!context.getImageData(0, 0, width, height)) {
      output.ascent = baseline;
      output.descent = baseline + 6;
      output.fontSize = output.ascent + output.descent;
      CanvasPool$1.remove(canvas);
      return output;
    }
    var imagedata = context.getImageData(0, 0, width, height).data;
    var pixels = imagedata.length;
    var line = width * 4;
    var i;
    var j;
    var idx = 0;
    var stop = false;

    // ascent. scan from top to bottom until we find a non red pixel
    for (i = 0; i < baseline; i++) {
      for (j = 0; j < line; j += 4) {
        if (imagedata[idx + j] !== 255) {
          stop = true;
          break;
        }
      }
      if (!stop) {
        idx += line;
      } else {
        break;
      }
    }
    output.ascent = baseline - i;
    idx = pixels - line;
    stop = false;

    // descent. scan from bottom to top until we find a non red pixel
    for (i = height; i > baseline; i--) {
      for (j = 0; j < line; j += 4) {
        if (imagedata[idx + j] !== 255) {
          stop = true;
          break;
        }
      }
      if (!stop) {
        idx -= line;
      } else {
        break;
      }
    }
    output.descent = i - baseline;
    output.fontSize = output.ascent + output.descent;
    CanvasPool$1.remove(canvas);
    return output;
  };

  var CONST = {
    // new line mode
    NO_NEWLINE: 0,
    RAW_NEWLINE: 1,
    WRAPPED_NEWLINE: 2,
    // wrap mode
    NO_WRAP: 0,
    WORD_WRAP: 1,
    CHAR_WRAP: 2,
    // split lines
    SPLITREGEXP: /(?:\r\n|\r|\n)/
  };

  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var TextStyle = /*#__PURE__*/function () {
    function TextStyle(text, style, propertyMap) {
      _classCallCheck(this, TextStyle);
      this.parent = text;
      // parent.updateText()
      // parent.width, parent.height

      if (propertyMap === undefined) {
        propertyMap = PropertyMap;
      }
      this.propertyMap = propertyMap;
      this.backgroundColor;
      this.backgroundColor2;
      this.backgroundHorizontalGradient;
      this.backgroundStrokeColor;
      this.backgroundStrokeLineWidth;
      this.backgroundCornerRadius;
      this.backgroundCornerIteration;
      this.fontFamily;
      this.fontSize;
      this.fontStyle;
      this.color;
      this.stroke;
      this.strokeThickness;
      this.shadowOffsetX;
      this.shadowOffsetY;
      this.shadowColor;
      this.shadowBlur;
      this.shadowStroke;
      this.shadowFill;
      this.underlineColor;
      this.underlineThickness;
      this.underlineOffset;
      this.halign;
      this.valign;
      this.maxLines;
      this.fixedWidth;
      this.fixedHeight;
      this.resolution;
      this.lineSpacing;
      this.xOffset;
      this.rtl;
      this.testString;
      this.baselineX;
      this.baselineY;
      this.wrapMode;
      this.wrapWidth;
      this.wrapCallback;
      this.wrapCallbackScope;
      this._font;

      //  Set to defaults + user style
      this.setStyle(style, false, true);
    }
    _createClass(TextStyle, [{
      key: "isWrapFitMode",
      get: function get() {
        return this.fixedWidth > 0 && this.wrapMode !== CONST.NO_WRAP && this.wrapWidth === 0;
      }
    }, {
      key: "setStyle",
      value: function setStyle(style, updateText, setDefaults) {
        if (updateText === undefined) {
          updateText = true;
        }
        if (setDefaults === undefined) {
          setDefaults = false;
        }
        if (style && style.hasOwnProperty('wrap')) {
          var wrap = style.wrap;
          if (wrap.hasOwnProperty('mode')) {
            var mode = wrap.mode;
            if (typeof mode === 'string') {
              wrap.mode = WRAPMODE[mode];
            }
          } else {
            if (wrap.hasOwnProperty('width')) {
              wrap.mode = 1;
            }
          }
        }

        // default halign of RTL is 'right'
        if (style && style.rtl && setDefaults && !style.hasOwnProperty('halign')) {
          style.halign = 'right';
        }

        //  Avoid type mutation
        if (style && style.hasOwnProperty('fontSize') && typeof style.fontSize === 'number') {
          style.fontSize = style.fontSize.toString() + 'px';
        }
        var propertyMap = this.propertyMap;
        for (var key in propertyMap) {
          var prop = propertyMap[key]; // [ Object Key, Default Value, preCallback ]
          var objKey = prop[0];
          var defaultValue = setDefaults ? prop[1] : this[key];
          var postCallback = prop[2];
          if (key === 'wrapCallback' || key === 'wrapCallbackScope') {
            // Callback & scope should be set without processing the values
            this[key] = GetValue$5(style, objKey, defaultValue);
          } else {
            var value = GetAdvancedValue(style, objKey, defaultValue);
            if (postCallback) {
              value = postCallback(value);
            }
            this[key] = value;
          }
        }

        //  Allow for 'font' override
        var font = GetValue$5(style, 'font', null);
        if (font === null) {
          this._font = this.fontStyle + ' ' + this.fontSize + ' ' + this.fontFamily;
        } else {
          this._font = font;
        }

        //  Allow for 'fill' to be used in place of 'color'
        var fill = GetValue$5(style, 'fill', null);
        if (fill !== null) {
          this.color = GetStyle(fill);
        }
        var metrics = GetValue$5(style, 'metrics', false);

        //  Provide optional TextMetrics in the style object to avoid the canvas look-up / scanning
        //  Doing this is reset if you then change the font of this TextStyle after creation
        if (metrics) {
          this.metrics = {
            ascent: GetValue$5(metrics, 'ascent', 0),
            descent: GetValue$5(metrics, 'descent', 0),
            fontSize: GetValue$5(metrics, 'fontSize', 0)
          };
        } else if (updateText || !this.metrics) {
          this.metrics = MeasureText(this);
        }
        if (updateText) {
          return this.parent.updateText();
        } else {
          return this.parent;
        }
      }
    }, {
      key: "syncFont",
      value: function syncFont(canvas, context) {
        context.font = this._font;
      }
    }, {
      key: "syncStyle",
      value: function syncStyle(canvas, context) {
        context.textBaseline = 'alphabetic';
        context.fillStyle = this.color;
        context.strokeStyle = this.stroke;
        context.lineWidth = this.strokeThickness;
        context.lineCap = 'round';
        context.lineJoin = 'round';
      }
    }, {
      key: "syncShadow",
      value: function syncShadow(context, enabled) {
        if (enabled) {
          context.shadowOffsetX = this.shadowOffsetX;
          context.shadowOffsetY = this.shadowOffsetY;
          context.shadowColor = this.shadowColor;
          context.shadowBlur = this.shadowBlur;
        } else {
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.shadowColor = 0;
          context.shadowBlur = 0;
        }
      }
    }, {
      key: "update",
      value: function update(recalculateMetrics) {
        if (recalculateMetrics) {
          this._font = "".concat(this.fontStyle, " ").concat(this.fontSize, " ").concat(this.fontFamily).trim();
          this.metrics = MeasureText(this);
        }
        return this.parent.updateText(recalculateMetrics);
      }
    }, {
      key: "buildFont",
      value: function buildFont() {
        var newFont = "".concat(this.fontStyle, " ").concat(this.fontSize, " ").concat(this.fontFamily).trim();
        if (newFont !== this._font) {
          this._font = newFont;
          //this.metrics = MeasureText(this);
        }

        return this;
      }
    }, {
      key: "setFont",
      value: function setFont(font) {
        if (typeof font === 'string') {
          this.fontFamily = font;
          this.fontSize = '';
          this.fontStyle = '';
        } else {
          this.fontFamily = GetValue$5(font, 'fontFamily', 'Courier');
          this.fontSize = GetValue$5(font, 'fontSize', '16px');
          this.fontStyle = GetValue$5(font, 'fontStyle', '');
        }
        return this.update(true);
      }
    }, {
      key: "setFontFamily",
      value: function setFontFamily(family) {
        this.fontFamily = family;
        return this.update(true);
      }
    }, {
      key: "setFontStyle",
      value: function setFontStyle(style) {
        this.fontStyle = style;
        return this.update(true);
      }
    }, {
      key: "setFontSize",
      value: function setFontSize(size) {
        if (typeof size === 'number') {
          size = size.toString() + 'px';
        }
        this.fontSize = size;
        return this.update(true);
      }
    }, {
      key: "setTestString",
      value: function setTestString(string) {
        this.testString = string;
        return this.update(true);
      }
    }, {
      key: "setFixedSize",
      value: function setFixedSize(width, height) {
        this.fixedWidth = width;
        this.fixedHeight = height;
        if (width) {
          this.parent.width = width;
        }
        if (height) {
          this.parent.height = height;
        }
        return this.update(this.isWrapFitMode);
      }
    }, {
      key: "setResolution",
      value: function setResolution(value) {
        this.resolution = value;
        return this.update(false);
      }
    }, {
      key: "setLineSpacing",
      value: function setLineSpacing(value) {
        this.lineSpacing = value;
        return this.update(false);
      }
    }, {
      key: "setXOffset",
      value: function setXOffset(value) {
        this.xOffset = value;
        return this.update(false);
      }
    }, {
      key: "setBackgroundColor",
      value: function setBackgroundColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
          isHorizontalGradient = true;
        }
        this.backgroundColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.backgroundColor2 = GetStyle(color2, this.parent.canvas, this.parent.context);
        this.backgroundHorizontalGradient = isHorizontalGradient;
        return this.update(false);
      }
    }, {
      key: "setBackgroundStrokeColor",
      value: function setBackgroundStrokeColor(color, lineWidth) {
        this.backgroundStrokeColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.backgroundStrokeLineWidth = lineWidth;
        return this.update(false);
      }
    }, {
      key: "setBackgroundCornerRadius",
      value: function setBackgroundCornerRadius(radius, iteration) {
        this.backgroundCornerRadius = radius;
        this.backgroundCornerIteration = iteration;
        return this.update(false);
      }
    }, {
      key: "setFill",
      value: function setFill(color) {
        this.color = GetStyle(color, this.parent.canvas, this.parent.context);
        return this.update(false);
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        this.color = GetStyle(color, this.parent.canvas, this.parent.context);
        return this.update(false);
      }
    }, {
      key: "setStroke",
      value: function setStroke(color, thickness) {
        if (color === undefined) {
          //  Reset the stroke to zero (disabling it)
          this.strokeThickness = 0;
        } else {
          if (thickness === undefined) {
            thickness = this.strokeThickness;
          }
          this.stroke = GetStyle(color, this.parent.canvas, this.parent.context);
          this.strokeThickness = thickness;
        }
        return this.update(true);
      }
    }, {
      key: "setShadow",
      value: function setShadow(x, y, color, blur, shadowStroke, shadowFill) {
        if (x === undefined) {
          x = 0;
        }
        if (y === undefined) {
          y = 0;
        }
        if (color === undefined) {
          color = '#000';
        }
        if (blur === undefined) {
          blur = 0;
        }
        if (shadowStroke === undefined) {
          shadowStroke = false;
        }
        if (shadowFill === undefined) {
          shadowFill = true;
        }
        this.shadowOffsetX = x;
        this.shadowOffsetY = y;
        this.shadowColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.shadowBlur = blur;
        this.shadowStroke = shadowStroke;
        this.shadowFill = shadowFill;
        return this.update(false);
      }
    }, {
      key: "setShadowOffset",
      value: function setShadowOffset(x, y) {
        if (x === undefined) {
          x = 0;
        }
        if (y === undefined) {
          y = x;
        }
        this.shadowOffsetX = x;
        this.shadowOffsetY = y;
        return this.update(false);
      }
    }, {
      key: "setShadowColor",
      value: function setShadowColor(color) {
        if (color === undefined) {
          color = '#000';
        }
        this.shadowColor = GetStyle(color, this.parent.canvas, this.parent.context);
        return this.update(false);
      }
    }, {
      key: "setShadowBlur",
      value: function setShadowBlur(blur) {
        if (blur === undefined) {
          blur = 0;
        }
        this.shadowBlur = blur;
        return this.update(false);
      }
    }, {
      key: "setShadowStroke",
      value: function setShadowStroke(enabled) {
        this.shadowStroke = enabled;
        return this.update(false);
      }
    }, {
      key: "setShadowFill",
      value: function setShadowFill(enabled) {
        this.shadowFill = enabled;
        return this.update(false);
      }
    }, {
      key: "setUnderline",
      value: function setUnderline(color, thickness, offset) {
        if (color === undefined) {
          color = '#000';
        }
        if (thickness === undefined) {
          thickness = 0;
        }
        if (offset === undefined) {
          offset = 0;
        }
        this.underlineColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.underlineThickness = thickness;
        this.underlineOffset = offset;
        return this.update(false);
      }
    }, {
      key: "setUnderlineColor",
      value: function setUnderlineColor(color) {
        if (color === undefined) {
          color = '#000';
        }
        this.underlineColor = GetStyle(color, this.parent.canvas, this.parent.context);
        return this.update(false);
      }
    }, {
      key: "setUnderlineThickness",
      value: function setUnderlineThickness(thickness) {
        if (thickness === undefined) {
          thickness = 0;
        }
        this.underlineThickness = thickness;
        return this.update(false);
      }
    }, {
      key: "setUnderlineOffset",
      value: function setUnderlineOffset(offset) {
        if (offset === undefined) {
          offset = 0;
        }
        this.underlineOffset = offset;
        return this.update(false);
      }
    }, {
      key: "setWrapMode",
      value: function setWrapMode(mode) {
        if (typeof mode === 'string') {
          mode = WRAPMODE[mode.toLowerCase()] || 0;
        }
        this.wrapMode = mode;
        return this.update(true);
      }
    }, {
      key: "setWrapWidth",
      value: function setWrapWidth(width) {
        this.wrapWidth = width;
        return this.update(false);
      }
    }, {
      key: "setAlign",
      value: function setAlign(halign, valign) {
        if (halign === undefined) {
          halign = 'left';
        }
        if (valign === undefined) {
          valign = 'top';
        }
        this.halign = halign;
        this.valign = valign;
        return this.update(false);
      }
    }, {
      key: "setHAlign",
      value: function setHAlign(halign) {
        if (halign === undefined) {
          halign = 'left';
        }
        this.halign = halign;
        return this.update(false);
      }
    }, {
      key: "setVAlign",
      value: function setVAlign(valign) {
        if (valign === undefined) {
          valign = 'top';
        }
        this.valign = valign;
        return this.update(false);
      }
    }, {
      key: "setMaxLines",
      value: function setMaxLines(max) {
        if (max === undefined) {
          max = 0;
        }
        this.maxLines = max;
        return this.update(false);
      }
    }, {
      key: "getTextMetrics",
      value: function getTextMetrics() {
        var metrics = this.metrics;
        return {
          ascent: metrics.ascent,
          descent: metrics.descent,
          fontSize: metrics.fontSize
        };
      }
    }, {
      key: "setTextMetrics",
      value: function setTextMetrics(metrics, font) {
        this.metrics.ascent = metrics.ascent;
        this.metrics.descent = metrics.descent;
        this.metrics.fontSize = metrics.fontSize;
        if (font) {
          if (typeof font === 'string') {
            this.fontFamily = font;
            this.fontSize = '';
            this.fontStyle = '';
          } else {
            this.fontFamily = GetValue$5(font, 'fontFamily', this.fontFamily);
            this.fontSize = GetValue$5(font, 'fontSize', this.fontSize);
            this.fontStyle = GetValue$5(font, 'fontStyle', this.fontStyle);
          }
        }
        return this.parent.updateText(true);
      }
    }, {
      key: "lineHeight",
      get: function get() {
        return this.metrics.fontSize + this.strokeThickness + this.lineSpacing;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var output = {};
        var propertyMap = this.propertyMap;
        for (var key in propertyMap) {
          output[key] = this[key];
        }
        output.metrics = this.getTextMetrics();
        return output;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.parent = undefined;
      }
    }]);
    return TextStyle;
  }();
  var WRAPMODE = {
    none: CONST.NO_WRAP,
    word: CONST.WORD_WRAP,
    "char": CONST.CHAR_WRAP,
    character: CONST.CHAR_WRAP
  };

  var DegToRad = Phaser.Math.DegToRad;
  var AddRoundRectanglePath = function AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration) {
    var geom = new RoundRectangle$1(x, y, width, height, radiusConfig),
      minWidth = geom.minWidth,
      minHeight = geom.minHeight,
      scaleRX = width >= minWidth ? 1 : width / minWidth,
      scaleRY = height >= minHeight ? 1 : height / minHeight;
    var cornerRadius = geom.cornerRadius;
    var radius, radiusX, radiusY, centerX, centerY;
    context.save();
    context.beginPath();
    context.translate(x, y);

    // Top-left
    radius = cornerRadius.tl;
    if (IsArcCorner(radius)) {
      radiusX = radius.x * scaleRX;
      radiusY = radius.y * scaleRY;
      if (IsConvexArc(radius)) {
        centerX = radiusX;
        centerY = radiusY;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 270, false, iteration);
      } else {
        centerX = 0;
        centerY = 0;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 0, true, iteration);
      }
    } else {
      context.lineTo(0, 0);
    }

    // Top-right
    radius = cornerRadius.tr;
    if (IsArcCorner(radius)) {
      radiusX = radius.x * scaleRX;
      radiusY = radius.y * scaleRY;
      if (IsConvexArc(radius)) {
        centerX = width - radiusX;
        centerY = radiusY;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 360, false, iteration);
      } else {
        centerX = width;
        centerY = 0;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 90, true, iteration);
      }
    } else {
      context.lineTo(width, 0);
    }

    // Bottom-right
    radius = cornerRadius.br;
    if (IsArcCorner(radius)) {
      radiusX = radius.x * scaleRX;
      radiusY = radius.y * scaleRY;
      if (IsConvexArc(radius)) {
        centerX = width - radiusX;
        centerY = height - radiusY;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 0, 90, false, iteration);
      } else {
        centerX = width;
        centerY = height;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 180, true, iteration);
      }
    } else {
      context.lineTo(width, height);
    }

    // Bottom-left
    radius = cornerRadius.bl;
    if (IsArcCorner(radius)) {
      radiusX = radius.x * scaleRX;
      radiusY = radius.y * scaleRY;
      if (IsConvexArc(radius)) {
        centerX = radiusX;
        centerY = height - radiusY;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 180, false, iteration);
      } else {
        centerX = 0;
        centerY = height;
        ArcTo(context, centerX, centerY, radiusX, radiusY, 360, 270, true, iteration);
      }
    } else {
      context.lineTo(0, height);
    }
    context.closePath();
    context.restore();
  };
  var IsConvexArc = function IsConvexArc(radius) {
    return !radius.hasOwnProperty('convex') ||
    // radius does not have convex property
    radius.convex;
  };
  var IsArcCorner = function IsArcCorner(radius) {
    return radius.x > 0 && radius.y > 0;
  };
  var ArcTo = function ArcTo(context, centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration) {
    // startAngle, endAngle: 0 ~ 360
    if (antiClockWise && endAngle > startAngle) {
      endAngle -= 360;
    } else if (!antiClockWise && endAngle < startAngle) {
      endAngle += 360;
    }
    startAngle = DegToRad(startAngle);
    endAngle = DegToRad(endAngle);
    if (iteration == null) {
      // undefined, or null
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle, antiClockWise);
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
    width = Math.max(1, width - strokeLineWidth); // Min width is 1
    height = Math.max(1, height - strokeLineWidth); // Min height is 1
    DrawRoundRectangle(canvasObject.canvas, canvasObject.context, x, x, width, height, radius, color, strokeColor, strokeLineWidth, color2, isHorizontalGradient, iteration);
  };

  var DrawMethods = {
    draw: function draw(startX, startY, textWidth, textHeight) {
      var penManager = this.penManager;
      this.hitAreaManager.clear();
      var context = this.context;
      context.save();
      var defaultStyle = this.defaultStyle;
      this.clear();
      DrawRoundRectangleBackground(this, defaultStyle.backgroundColor, defaultStyle.backgroundStrokeColor, defaultStyle.backgroundStrokeLineWidth, defaultStyle.backgroundCornerRadius, defaultStyle.backgroundColor2, defaultStyle.backgroundHorizontalGradient, defaultStyle.backgroundCornerIteration);

      // draw lines
      startX += this.startXOffset;
      startY += this.startYOffset;
      var defaultHalign = defaultStyle.halign,
        valign = defaultStyle.valign;
      var lineWidth,
        lineHeight = defaultStyle.lineHeight;
      var lines = penManager.lines;
      var totalLinesNum = lines.length,
        maxLines = defaultStyle.maxLines;
      var drawLinesNum, drawLineStartIdx, drawLineEndIdx;
      if (maxLines > 0 && totalLinesNum > maxLines) {
        drawLinesNum = maxLines;
        if (valign === 'center') {
          // center
          drawLineStartIdx = Math.floor((totalLinesNum - drawLinesNum) / 2);
        } else if (valign === 'bottom') {
          // bottom
          drawLineStartIdx = totalLinesNum - drawLinesNum;
        } else {
          drawLineStartIdx = 0;
        }
      } else {
        drawLinesNum = totalLinesNum;
        drawLineStartIdx = 0;
      }
      drawLineEndIdx = drawLineStartIdx + drawLinesNum;
      var offsetX, offsetY;
      var rtl = this.rtl,
        rtlOffset = rtl ? this.parent.width : undefined;
      if (valign === 'center') {
        // center
        offsetY = Math.max((textHeight - drawLinesNum * lineHeight) / 2, 0);
      } else if (valign === 'bottom') {
        // bottom
        offsetY = Math.max(textHeight - drawLinesNum * lineHeight - 2, 0);
      } else {
        offsetY = 0;
      }
      offsetY += startY;
      for (var lineIdx = drawLineStartIdx; lineIdx < drawLineEndIdx; lineIdx++) {
        lineWidth = penManager.getLineWidth(lineIdx);
        if (lineWidth === 0) {
          continue;
        }
        var pens = lines[lineIdx],
          penCount = pens.length;
        var halign = defaultHalign;
        // Seek if there has algin tag
        for (var penIdx = 0; penIdx < penCount; penIdx++) {
          var penAlign = pens[penIdx].prop.align;
          if (penAlign !== undefined) {
            halign = penAlign;
            break;
          }
        }
        if (halign === 'center') {
          // center
          offsetX = (textWidth - lineWidth) / 2;
        } else if (halign === 'right') {
          // right
          offsetX = !rtl ? textWidth - lineWidth : 0;
        } else {
          offsetX = !rtl ? 0 : textWidth - lineWidth;
        }
        offsetX += startX;
        for (var penIdx = 0; penIdx < penCount; penIdx++) {
          this.drawPen(pens[penIdx], offsetX, offsetY, rtlOffset);
        }
      }
      context.restore();
    },
    drawPen: function drawPen(pen, offsetX, offsetY, rtlOffset) {
      offsetX += pen.x;
      offsetY += pen.y + (pen.prop.y || 0);
      if (rtlOffset !== undefined) {
        offsetX = rtlOffset - offsetX;
      }
      var canvas = this.canvas;
      var context = this.context;
      context.save();
      var curStyle = this.parser.propToContextStyle(this.defaultStyle, pen.prop);
      curStyle.buildFont();
      curStyle.syncFont(canvas, context);
      curStyle.syncStyle(canvas, context);

      // Underline
      if (curStyle.underlineThickness > 0 && pen.width > 0) {
        this.drawUnderline(offsetX, offsetY, pen.width, curStyle);
      }

      // Text
      if (pen.isTextPen) {
        this.drawText(offsetX, offsetY, pen.text, curStyle);
      }

      // Image
      if (pen.isImagePen) {
        this.drawImage(offsetX, offsetY, pen.prop.img, curStyle);
      }
      context.restore();
      if (pen.hasAreaMarker && pen.width > 0) {
        this.hitAreaManager.add(pen.prop.area,
        // key
        offsetX,
        // x
        offsetY - this.startYOffset,
        // y
        pen.width,
        // width
        this.defaultStyle.lineHeight // height
        );
      }
    },
    clear: function clear() {
      var canvas = this.canvas;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
    },
    drawUnderline: function drawUnderline(x, y, width, style) {
      y += style.underlineOffset - style.underlineThickness / 2;
      if (this.autoRound) {
        x = Math.round(x);
        y = Math.round(y);
      }
      var context = this.context;
      var savedLineCap = context.lineCap;
      context.lineCap = 'butt';
      context.strokeStyle = style.underlineColor;
      context.lineWidth = style.underlineThickness;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + width, y);
      context.stroke();
      context.lineCap = savedLineCap;
    },
    drawText: function drawText(x, y, text, style) {
      if (this.autoRound) {
        x = Math.round(x);
        y = Math.round(y);
      }
      var context = this.context;
      if (style.stroke && style.stroke !== 'none' && style.strokeThickness > 0) {
        style.syncShadow(context, style.shadowStroke);
        context.strokeText(text, x, y);
      }
      if (style.color && style.color !== 'none') {
        style.syncShadow(context, style.shadowFill);
        context.fillText(text, x, y);
      }
    },
    drawImage: function drawImage(x, y, imgKey, style) {
      y -= this.startYOffset;
      this.parent.imageManager.draw(imgKey, this.context, x, y, this.autoRound);
    }
  };

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var NO_NEWLINE$3 = CONST.NO_NEWLINE;
  var RAW_NEWLINE$1 = CONST.RAW_NEWLINE;
  var Pen = /*#__PURE__*/function () {
    function Pen(config) {
      _classCallCheck(this, Pen);
      this.prop = {};
      this.resetFromJSON(config);
    }
    _createClass(Pen, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        // (txt, x, y, width, prop, newLineMode, startIndex)
        this.text = GetValue$4(o, 'text', '');
        this.x = GetValue$4(o, 'x', 0);
        this.y = GetValue$4(o, 'y', 0);
        this.width = GetValue$4(o, 'width', 0);
        var prop = GetValue$4(o, 'prop', null);
        if (prop === null) {
          prop = {};
        }
        this.prop = prop;
        this.newLineMode = GetValue$4(o, 'newLineMode', 0);
        this.startIndex = GetValue$4(o, 'startIndex', 0);
      }
    }, {
      key: "plainText",
      get: function get() {
        var txt = this.text;
        if (this.newLineMode === RAW_NEWLINE$1) {
          txt += "\n";
        }
        return txt;
      }
    }, {
      key: "wrapText",
      get: function get() {
        var txt = this.text;
        if (this.newLineMode !== NO_NEWLINE$3) {
          txt += "\n";
        }
        return txt;
      }
    }, {
      key: "rawTextLength",
      get: function get() {
        var len = this.text.length;
        if (this.newLineMode === RAW_NEWLINE$1) {
          len += 1;
        }
        return len;
      }
    }, {
      key: "endIndex",
      get: function get() {
        return this.startIndex + this.rawTextLength;
      }
    }, {
      key: "lastX",
      get: function get() {
        return this.x + this.width;
      }
    }, {
      key: "isTextPen",
      get: function get() {
        return this.text !== '';
      }
    }, {
      key: "isImagePen",
      get: function get() {
        return !!this.prop.img;
      }
    }, {
      key: "hasAreaMarker",
      get: function get() {
        return !!this.prop.area;
      }
    }]);
    return Pen;
  }();

  var GetFastValue = Phaser.Utils.Objects.GetFastValue;
  var NO_NEWLINE$2 = CONST.NO_NEWLINE;
  var WRAPPED_NEWLINE$1 = CONST.WRAPPED_NEWLINE;
  var PenManager = /*#__PURE__*/function () {
    function PenManager(config) {
      _classCallCheck(this, PenManager);
      this.pens = []; // all pens
      this.lines = []; // pens in lines [ [],[],[],.. ]
      this.maxLinesWidth = undefined;
      this.pensPool = config.pensPool; // Required
      this.linesPool = config.linesPool; // Required
      this.tagToText = GetFastValue(config, 'tagToText', NOOP);
      this.tagToTextScope = GetFastValue(config, 'tagToTextScope', undefined);
    }
    _createClass(PenManager, [{
      key: "destroy",
      value: function destroy() {
        this.clear();
        this.tagToText = undefined;
        this.tagToTextScope = undefined;
      }
    }, {
      key: "clear",
      value: function clear() {
        for (var i = 0, len = this.lines.length; i < len; i++) {
          this.lines[i].length = 0;
        }
        this.pensPool.pushMultiple(this.pens);
        this.linesPool.pushMultiple(this.lines);
        this.maxLinesWidth = undefined;
      }
    }, {
      key: "addTextPen",
      value: function addTextPen(text, x, y, width, prop, newLineMode) {
        var pen = this.pensPool.pop();
        if (pen == null) {
          pen = new Pen();
        }
        PEN_CONFIG.text = text;
        PEN_CONFIG.x = x;
        PEN_CONFIG.y = y;
        PEN_CONFIG.width = width;
        PEN_CONFIG.prop = prop;
        PEN_CONFIG.newLineMode = newLineMode;
        pen.resetFromJSON(PEN_CONFIG);
        this.addPen(pen);
        return this;
      }
    }, {
      key: "addImagePen",
      value: function addImagePen(x, y, width, prop) {
        this.addTextPen('', x, y, width, prop, NO_NEWLINE$2);
        return this;
      }
    }, {
      key: "addNewLinePen",
      value: function addNewLinePen() {
        var previousPen = this.lastPen;
        var x = previousPen ? previousPen.lastX : 0;
        var y = previousPen ? previousPen.y : 0;
        var prop = previousPen ? Clone(previousPen.prop) : null;
        this.addTextPen('', x, y, 0, prop, WRAPPED_NEWLINE$1);
        return this;
      }
    }, {
      key: "addPen",
      value: function addPen(pen) {
        var previousPen = this.lastPen;
        if (previousPen == null) {
          pen.startIndex = 0;
        } else {
          pen.startIndex = previousPen.endIndex;
        }
        this.pens.push(pen);

        // maintan lines
        var line = this.lastLine;
        if (line == null) {
          line = this.linesPool.pop() || [];
          this.lines.push(line);
        }
        line.push(pen);

        // new line, add an empty line
        if (pen.newLineMode !== NO_NEWLINE$2) {
          line = this.linesPool.pop() || [];
          this.lines.push(line);
        }
        this.maxLinesWidth = undefined;
      }
    }, {
      key: "clone",
      value: function clone(targetPenManager) {
        if (targetPenManager == null) targetPenManager = new PenManager();
        targetPenManager.clear();
        for (var li = 0, llen = this.lines.length; li < llen; li++) {
          var pens = this.lines[li];
          for (var pi = 0, plen = pens.length; pi < plen; pi++) {
            var pen = pens[pi];
            targetPenManager.addPen(pen.text, pen.x, pen.y, pen.width, Clone(pen.prop), pen.newLineMode);
          }
        }
        return targetPenManager;
      }
    }, {
      key: "lastPen",
      get: function get() {
        return this.pens[this.pens.length - 1];
      }
    }, {
      key: "lastLine",
      get: function get() {
        return this.lines[this.lines.length - 1];
      }
    }, {
      key: "getLineStartIndex",
      value: function getLineStartIndex(i) {
        if (i >= this.lines.length) {
          return this.getLineEndIndex(i);
        } else {
          var line = this.lines[i];
          return line && line[0] ? line[0].startIndex : 0;
        }
      }
    }, {
      key: "getLineEndIndex",
      value: function getLineEndIndex(i) {
        if (i >= this.lines.length) {
          i = this.lines.length - 1;
        }
        var li,
          hasLastPen = false,
          line;
        for (li = i; li >= 0; li--) {
          line = this.lines[li];
          hasLastPen = line != null && line.length > 0;
          if (hasLastPen) {
            break;
          }
        }
        if (!hasLastPen) {
          return 0;
        }
        var lastPen = line[line.length - 1];
        return lastPen.endIndex;
      }
    }, {
      key: "getLineWidth",
      value: function getLineWidth(i) {
        var line = this.lines[i];
        if (!line) {
          return 0;
        }
        var lastPen = line[line.length - 1];
        if (lastPen == null) {
          return 0;
        }
        var lineWidth = lastPen.lastX; // start from 0
        return lineWidth;
      }
    }, {
      key: "getMaxLineWidth",
      value: function getMaxLineWidth() {
        if (this.maxLinesWidth !== undefined) {
          return this.maxLinesWidth;
        }
        var w,
          maxW = 0;
        for (var i = 0, len = this.lines.length; i < len; i++) {
          w = this.getLineWidth(i);
          if (w > maxW) {
            maxW = w;
          }
        }
        this.maxLinesWidth = maxW;
        return maxW;
      }
    }, {
      key: "getLineWidths",
      value: function getLineWidths() {
        var result = [];
        for (var i = 0, len = this.lines.length; i < len; i++) {
          result.push(this.getLineWidth(i));
        }
        return result;
      }
    }, {
      key: "linesCount",
      get: function get() {
        return this.lines.length;
      }
    }, {
      key: "plainText",
      get: function get() {
        var txt = "",
          pens = this.pens;
        for (var i = 0, len = pens.length; i < len; i++) {
          txt += pens[i].plainText;
        }
        return txt;
      }
    }, {
      key: "rawTextLength",
      get: function get() {
        var l = 0,
          pens = this.pens;
        for (var i = 0, len = this.pens.length; i < len; i++) {
          l += pens[i].rawTextLength;
        }
        return l;
      }
    }, {
      key: "getSliceTagText",
      value: function getSliceTagText(start, end, wrap) {
        if (start === undefined) {
          start = 0;
        }
        if (end === undefined) {
          var lastPen = this.lastPen;
          if (lastPen == null) {
            return "";
          }
          end = lastPen.endIndex;
        }
        if (wrap === undefined) {
          wrap = false;
        }
        var txt = "",
          pen,
          penTxt,
          penStartIdx,
          penEndIdx,
          isInRange;
        var currentProp, previousProp;
        for (var i = 0, len = this.pens.length; i < len; i++) {
          pen = this.pens[i];
          penEndIdx = pen.endIndex;
          if (penEndIdx <= start) {
            continue;
          }
          pen = this.pens[i];
          penTxt = !wrap ? pen.plainText : pen.wrapText;
          currentProp = pen.prop;
          penStartIdx = pen.startIndex;
          isInRange = penStartIdx >= start && penEndIdx <= end;
          if (!isInRange) {
            penTxt = penTxt.substring(start - penStartIdx, end - penStartIdx);
          }
          if (this.tagToTextScope) {
            txt += this.tagToText.call(this.tagToTextScope, penTxt, currentProp, previousProp);
          } else {
            txt += this.tagToText(penTxt, currentProp, previousProp);
          }
          previousProp = currentProp;
          if (penEndIdx >= end) {
            break;
          }
        }
        return txt;
      }
    }, {
      key: "length",
      get: function get() {
        return this.lines.length;
      },
      set: function set(value) {
        // Only for set length to 0 (clear)
        this.clear();
      }
    }]);
    return PenManager;
  }();
  var PEN_CONFIG = {};

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

  var Rectangle = Phaser.Geom.Rectangle;
  var RectanglePool = new Stack();
  var HitAreaManager = /*#__PURE__*/function () {
    function HitAreaManager() {
      _classCallCheck(this, HitAreaManager);
      this.hitAreas = [];
    }
    _createClass(HitAreaManager, [{
      key: "destroy",
      value: function destroy() {
        this.clear();
      }
    }, {
      key: "clear",
      value: function clear() {
        RectanglePool.pushMultiple(this.hitAreas);
        return this;
      }
    }, {
      key: "add",
      value: function add(key, x, y, width, height) {
        var rectangle = RectanglePool.pop();
        if (rectangle === null) {
          rectangle = new Rectangle(x, y, width, height);
        } else {
          rectangle.setTo(x, y, width, height);
        }
        rectangle.key = key;
        this.hitAreas.push(rectangle);
        return this;
      }
    }, {
      key: "getFirst",
      value: function getFirst(x, y) {
        for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
          var hitArea = this.hitAreas[i];
          if (hitArea.contains(x, y)) {
            return hitArea;
          }
        }
        return null;
      }
    }, {
      key: "drawBounds",
      value: function drawBounds(graphics, color, parent) {
        if (color === undefined) {
          color = 0xffffff;
        }
        if (parent) {
          graphics.save().scaleCanvas(parent.scaleX, parent.scaleY).rotateCanvas(parent.rotation).translateCanvas(parent.x, parent.y);
        }
        for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
          var hitArea = this.hitAreas[i];
          graphics.lineStyle(1, color).strokeRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
        }
        if (parent) {
          graphics.restore();
        }
        return this;
      }
    }]);
    return HitAreaManager;
  }();

  var SetInteractive = function SetInteractive() {
    this.parent.on('pointerdown', OnAreaDown, this).on('pointerup', OnAreaUp, this).on('pointermove', OnAreaOverOut, this).on('pointerover', OnAreaOverOut, this).on('pointerout', function (pointer, event) {
      OnAreaOverOut.call(this, pointer, null, null, event);
    }, this);
  };
  var OnAreaDown = function OnAreaDown(pointer, localX, localY, event) {
    var area = this.hitAreaManager.getFirst(localX, localY);
    if (area === null) {
      return;
    }
    FireEvent.call(this, 'areadown', area.key, pointer, localX, localY, event);
  };
  var OnAreaUp = function OnAreaUp(pointer, localX, localY, event) {
    var area = this.hitAreaManager.getFirst(localX, localY);
    if (area === null) {
      return;
    }
    FireEvent.call(this, 'areaup', area.key, pointer, localX, localY, event);
  };
  var OnAreaOverOut = function OnAreaOverOut(pointer, localX, localY, event) {
    if (localX === null) {
      // Case of pointerout
      if (this.lastHitAreaKey !== null) {
        FireEvent.call(this, 'areaout', this.lastHitAreaKey, pointer, localX, localY, event);
        this.lastHitAreaKey = null;
      }
      return;
    }
    var area = this.hitAreaManager.getFirst(localX, localY);
    var hitAreaKey = area ? area.key : null;
    if (this.lastHitAreaKey === hitAreaKey) {
      return;
    }
    if (this.lastHitAreaKey !== null) {
      FireEvent.call(this, 'areaout', this.lastHitAreaKey, pointer, localX, localY, event);
    }
    if (hitAreaKey !== null) {
      FireEvent.call(this, 'areaover', hitAreaKey, pointer, localX, localY, event);
    }
    this.lastHitAreaKey = hitAreaKey;
  };
  var FireEvent = function FireEvent(eventName, key, pointer, localX, localY, event) {
    this.parent.emit("".concat(eventName, "-").concat(key), pointer, localX, localY, event);
    this.parent.emit(eventName, key, pointer, localX, localY, event);
  };

  var NO_NEWLINE$1 = CONST.NO_NEWLINE;
  var RAW_NEWLINE = CONST.RAW_NEWLINE;
  var WRAPPED_NEWLINE = CONST.WRAPPED_NEWLINE;
  var NO_WRAP$1 = CONST.NO_WRAP;
  var WORD_WRAP = CONST.WORD_WRAP;
  var CHAR_WRAP = CONST.CHAR_WRAP;
  var splitRegExp = CONST.SPLITREGEXP;
  var WrapText = function WrapText(text, getTextWidth, wrapMode, wrapWidth, offset, wrapTextLinesPool) {
    if (wrapWidth <= 0) {
      wrapMode = NO_WRAP$1;
    }
    var retLines = [];
    if (!text || !text.length) {
      return retLines;
    }
    var isNoWrap = wrapMode === NO_WRAP$1;
    var isWordWrap = wrapMode === WORD_WRAP;
    var lines = text.split(splitRegExp),
      line,
      remainWidth,
      newLineMode;
    for (var i = 0, linesLen = lines.length; i < linesLen; i++) {
      line = lines[i];
      newLineMode = i === linesLen - 1 ? NO_NEWLINE$1 : RAW_NEWLINE;
      if (isNoWrap) {
        var textWidth = getTextWidth(line);
        retLines.push(wrapTextLinesPool.getLine(line, textWidth, newLineMode));
        continue;
      }
      remainWidth = i === 0 ? wrapWidth - offset : wrapWidth;

      // short string testing
      if (line.length <= 100) {
        var textWidth = getTextWidth(line);
        if (textWidth <= remainWidth) {
          retLines.push(wrapTextLinesPool.getLine(line, textWidth, newLineMode));
          continue;
        }
      }
      var tokenArray, isSpaceCharacterEnd;
      if (isWordWrap) {
        // word mode
        tokenArray = line.split(' ');
        isSpaceCharacterEnd = tokenArray[tokenArray.length - 1] === '';
        if (isSpaceCharacterEnd) {
          tokenArray.length -= 1;
        }
      } else {
        tokenArray = line;
      }
      var token, tokenWidth, isLastToken;
      var lineText = '',
        lineWidth = 0;
      var currLineWidth;
      var whiteSpaceWidth = isWordWrap ? getTextWidth(' ') : undefined;
      for (var j = 0, tokenLen = tokenArray.length; j < tokenLen; j++) {
        token = tokenArray[j];
        tokenWidth = getTextWidth(token);
        isLastToken = j === tokenLen - 1;
        if (isWordWrap && (!isLastToken || isSpaceCharacterEnd)) {
          token += ' ';
          tokenWidth += whiteSpaceWidth;
        }

        // Text width of single token is larger than a line width
        if (isWordWrap && tokenWidth > wrapWidth) {
          if (lineText !== '') {
            // Has pending lineText, flush it out
            retLines.push(wrapTextLinesPool.getLine(lineText, lineWidth, WRAPPED_NEWLINE));
          } else if (j === 0 && offset > 0) {
            // No pending lineText, but has previous text. Append a newline
            retLines.push(wrapTextLinesPool.getLine('', 0, WRAPPED_NEWLINE));
          }

          // Word break
          retLines.push.apply(retLines, _toConsumableArray(WrapText(token, getTextWidth, CHAR_WRAP, wrapWidth, 0, wrapTextLinesPool)));
          // Continue at last-wordBreak-line
          var lastwordBreakLine = retLines.pop();
          lineText = lastwordBreakLine.text;
          lineWidth = lastwordBreakLine.width;
          // Free this line
          wrapTextLinesPool.freeLine(lastwordBreakLine);

          // Special case : Start at a space character, discard it
          if (lineText === ' ') {
            lineText = '';
            lineWidth = 0;
          }
          continue;
        }
        currLineWidth = lineWidth + tokenWidth;
        if (currLineWidth > remainWidth) {
          // New line
          retLines.push(wrapTextLinesPool.getLine(lineText, lineWidth, WRAPPED_NEWLINE));
          lineText = token;
          lineWidth = tokenWidth;
          remainWidth = wrapWidth;
        } else {
          // Append token, continue
          lineText += token;
          lineWidth = currLineWidth;
        }
        if (isLastToken) {
          // Flush remain text
          retLines.push(wrapTextLinesPool.getLine(lineText, lineWidth, newLineMode));
        }
      } // for token in tokenArray
    } // for each line in lines

    return retLines;
  };

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var NO_WRAP = CONST.NO_WRAP;
  var NO_NEWLINE = CONST.NO_NEWLINE;
  var CanvasText = /*#__PURE__*/function () {
    function CanvasText(config) {
      _classCallCheck(this, CanvasText);
      this.parent = config.parent;
      this.context = GetValue$3(config, 'context', null);
      this.canvas = this.context.canvas;
      this.parser = GetValue$3(config, 'parser', null);
      this.defaultStyle = GetValue$3(config, 'style', null);
      this.autoRound = true;
      this.pensPool = config.pensPool; // Required
      this.linesPool = config.linesPool; // Required
      this.wrapTextLinesPool = config.wrapTextLinesPool; // Required

      this.penManager = this.newPenManager();
      this._tmpPenManager = null;
      this.hitAreaManager = new HitAreaManager();
      this.lastHitAreaKey = null;
      var context = this.context;
      this.getTextWidth = function (text) {
        return context.measureText(text).width;
      };
    }
    _createClass(CanvasText, [{
      key: "destroy",
      value: function destroy() {
        this.context = undefined;
        this.canvas = undefined;
        this.parser = undefined;
        this.defaultStyle = undefined;
        if (this.penManager) {
          this.penManager.destroy();
          this.penManager = undefined;
        }
        if (this._tmpPenManager) {
          this._tmpPenManager.destroy();
          this._tmpPenManager = undefined;
        }
        if (this.hitAreaManager) {
          this.hitAreaManager.destroy();
          this.hitAreaManager = undefined;
        }
        this.pensPool = undefined;
        this.linesPool = undefined;
        this.wrapTextLinesPool = undefined;
      }
    }, {
      key: "updatePenManager",
      value: function updatePenManager(text, wrapMode, wrapWidth, lineHeight, penManager) {
        if (penManager === undefined) {
          penManager = this.penManager;
        }
        penManager.clear();
        if (text === "") {
          return penManager;
        }
        var textStyle = this.parent.style;
        if (textStyle.isWrapFitMode) {
          var padding = this.parent.padding;
          wrapWidth = textStyle.fixedWidth - padding.left - padding.right;
        }
        var canvas = this.canvas;
        var context = this.context;
        var MeasureText = function MeasureText(text) {
          return context.measureText(text).width;
        };
        var cursorX = 0,
          cursorY = 0;
        var customTextWrapCallback = textStyle.wrapCallback,
          customTextWrapCallbackScope = textStyle.wrapCallbackScope;
        var reuseLines = true;
        var plainText, curProp, curStyle;
        var match = this.parser.splitText(text),
          result,
          wrapLines,
          wrapTextLinesPool = this.wrapTextLinesPool;
        for (var i = 0, len = match.length; i < len; i++) {
          result = this.parser.tagTextToProp(match[i], curProp);
          plainText = result.plainText;
          curProp = result.prop;
          if (curProp.img) {
            // Image tag                
            var imgWidth = this.imageManager.getOuterWidth(curProp.img);
            if (wrapWidth > 0 && wrapMode !== NO_WRAP) {
              // Wrap mode
              if (wrapWidth < cursorX + imgWidth) {
                penManager.addNewLinePen();
                cursorY += lineHeight;
                cursorX = 0;
              }
            }
            penManager.addImagePen(cursorX, cursorY, imgWidth, Clone(curProp));
            cursorX += imgWidth;
          } else if (plainText !== '') {
            // wrap text to lines
            // Save the current context.
            context.save();
            curStyle = this.parser.propToContextStyle(this.defaultStyle, curProp);
            curStyle.buildFont();
            curStyle.syncFont(canvas, context);
            curStyle.syncStyle(canvas, context);
            if (!customTextWrapCallback) {
              wrapLines = WrapText(plainText, MeasureText, wrapMode, wrapWidth, cursorX, wrapTextLinesPool);
            } else {
              // customTextWrapCallback
              wrapLines = customTextWrapCallback.call(customTextWrapCallbackScope, plainText, MeasureText, wrapWidth, cursorX);
              if (typeof wrapLines === 'string') {
                wrapLines = wrapLines.split('\n');
              }
              var n;
              for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
                n = wrapLines[j];
                if (typeof n === 'string') {
                  wrapLines[j] = wrapTextLinesPool.getLine(n, MeasureText(n), j < jLen - 1 ? 2 : 0);
                } else {
                  reuseLines = false;
                }
              }
            } // customTextWrapCallback

            // add pens
            var n;
            for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
              n = wrapLines[j];
              penManager.addTextPen(n.text, cursorX, cursorY, n.width, Clone(curProp), n.newLineMode);
              if (n.newLineMode !== NO_NEWLINE) {
                cursorX = 0;
                cursorY += lineHeight;
              } else {
                cursorX += n.width;
              }
            }
            if (reuseLines) {
              wrapTextLinesPool.freeLines(wrapLines);
            }
            wrapLines = null;
            context.restore();
          }
        }

        // Add strokeThinkness to last pen of each line
        for (var i = 0, len = this.lines.length; i < len; i++) {
          var line = this.lines[i];
          var lastPen = line[line.length - 1];
          if (lastPen) {
            lastPen.width += this.parser.getStrokeThinkness(this.defaultStyle, lastPen.prop);
          }
        }
        return penManager;
      }
    }, {
      key: "startXOffset",
      get: function get() {
        var defaultStyle = this.defaultStyle;
        return defaultStyle.strokeThickness / 2 + defaultStyle.xOffset;
      }
    }, {
      key: "startYOffset",
      get: function get() {
        var defaultStyle = this.defaultStyle;
        return defaultStyle.strokeThickness / 2 + defaultStyle.metrics.ascent;
      }
    }, {
      key: "lines",
      get: function get() {
        return this.penManager.lines;
      }
    }, {
      key: "desplayLinesCount",
      get: function get() {
        var linesCount = this.penManager.linesCount,
          maxLines = this.defaultStyle.maxLines;
        if (maxLines > 0 && linesCount > maxLines) {
          linesCount = maxLines;
        }
        return linesCount;
      }
    }, {
      key: "linesWidth",
      get: function get() {
        return Math.ceil(this.penManager.getMaxLineWidth());
      }
    }, {
      key: "linesHeight",
      get: function get() {
        var linesCount = this.desplayLinesCount;
        var linesHeight = this.defaultStyle.lineHeight * linesCount;
        if (linesCount > 0) {
          linesHeight -= this.defaultStyle.lineSpacing;
        }
        return linesHeight;
      }
    }, {
      key: "imageManager",
      get: function get() {
        return this.parent.imageManager;
      }
    }, {
      key: "rtl",
      get: function get() {
        return this.parent.style.rtl;
      }
    }, {
      key: "newPenManager",
      value: function newPenManager() {
        return new PenManager({
          pensPool: this.pensPool,
          linesPool: this.linesPool,
          tagToText: this.parser.propToTagText,
          tagToTextScope: this.parser
        });
      }
    }, {
      key: "tmpPenManager",
      get: function get() {
        if (this._tmpPenManager === null) {
          this._tmpPenManager = this.newPenManager();
        }
        return this._tmpPenManager;
      }
    }, {
      key: "getPlainText",
      value: function getPlainText(text, start, end) {
        var plainText;
        if (text == null) {
          plainText = this.penManager.plainText;
        } else {
          var match = this.parser.splitText(text, 1); // PLAINTEXTONLY_MODE
          plainText = "";
          for (var i = 0, len = match.length; i < len; i++) {
            plainText += match[i];
          }
        }
        if (start != null || end != null) {
          if (start == null) {
            start = 0;
          }
          if (end == null) {
            end = plainText.length;
          }
          plainText = plainText.substring(start, end);
        }
        return plainText;
      }
    }, {
      key: "getPenManager",
      value: function getPenManager(text, retPenManager) {
        if (text === undefined) {
          return this.copyPenManager(retPenManager, this.penManager);
        }
        if (retPenManager === undefined) {
          retPenManager = this.newPenManager();
        }
        var defaultStyle = this.defaultStyle;
        this.updatePenManager(text, defaultStyle.wrapMode, defaultStyle.wrapWidth, defaultStyle.lineHeight, retPenManager);
        return retPenManager;
      }
    }, {
      key: "getText",
      value: function getText(text, start, end, wrap) {
        if (text == null) {
          return this.penManager.getSliceTagText(start, end, wrap);
        }
        var penManager = this.tmpPenManager;
        var defaultStyle = this.defaultStyle;
        this.updatePenManager(text, defaultStyle.wrapMode, defaultStyle.wrapWidth, defaultStyle.lineHeight, penManager);
        return penManager.getSliceTagText(start, end, wrap);
      }
    }, {
      key: "copyPenManager",
      value: function copyPenManager(ret, src) {
        if (src === undefined) {
          src = this.penManager;
        }
        return src.copy(ret);
      }
    }, {
      key: "getTextWidth",
      value: function getTextWidth(penManager) {
        if (penManager === undefined) {
          penManager = this.penManager;
        }
        return penManager.getMaxLineWidth();
      }
    }, {
      key: "getLastPen",
      value: function getLastPen(penManager) {
        if (penManager === undefined) {
          penManager = this.penManager;
        }
        return penManager.lastPen;
      }
    }]);
    return CanvasText;
  }();
  var methods$3 = {
    setInteractive: SetInteractive
  };
  Object.assign(CanvasText.prototype, DrawMethods, methods$3);

  var WrapTextLinesPool = /*#__PURE__*/function (_Pool) {
    _inherits(WrapTextLinesPool, _Pool);
    var _super = _createSuper(WrapTextLinesPool);
    function WrapTextLinesPool() {
      _classCallCheck(this, WrapTextLinesPool);
      return _super.apply(this, arguments);
    }
    _createClass(WrapTextLinesPool, [{
      key: "freeLine",
      value: function freeLine(line) {
        if (!line) {
          return;
        }
        this.push(line);
        return this;
      }
    }, {
      key: "freeLines",
      value: function freeLines(lines) {
        if (!lines) {
          return;
        }
        this.pushMultiple(lines);
        return this;
      }
    }, {
      key: "getLine",
      value: function getLine(text, width, newLineMode) {
        var l = this.pop();
        if (l === null) {
          l = {};
        }
        l.text = text;
        l.width = width;
        l.newLineMode = newLineMode;
        return l;
      }
    }]);
    return WrapTextLinesPool;
  }(Stack);

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var AddImage = function AddImage(key, config) {
    if (config === undefined) {
      config = {
        key: key
      };
    }
    if (!config.hasOwnProperty('key')) {
      config.key = key;
    }
    var textureKey = config.key,
      frameKey = config.frame;
    var width = config.width,
      height = config.height;
    if (width === undefined || height === undefined) {
      var frame = this.textureManager.getFrame(textureKey, frameKey);
      var frameWidth = frame ? frame.cutWidth : 0;
      var frameHeight = frame ? frame.cutHeight : 0;
      if (width === undefined && height === undefined) {
        width = frameWidth;
        height = frameHeight;
      } else if (width === undefined) {
        width = frameWidth * (height / frameHeight);
      } else if (height === undefined) {
        height = frameHeight * (width / frameWidth);
      }
    }
    this.images[key] = {
      key: textureKey,
      frame: frameKey,
      width: width,
      height: height,
      y: GetValue$2(config, 'y', 0),
      left: GetValue$2(config, 'left', 0),
      right: GetValue$2(config, 'right', 0)
    };
  };

  var DrawImage = function DrawImage(key, context, x, y, autoRound) {
    var imgData = this.get(key);
    x += imgData.left;
    y += imgData.y;
    if (autoRound) {
      x = Math.round(x);
      y = Math.round(y);
    }
    var frame = this.textureManager.getFrame(imgData.key, imgData.frame);
    context.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight, x, y, imgData.width, imgData.height);
  };

  var ImageManager = /*#__PURE__*/function () {
    function ImageManager(scene) {
      _classCallCheck(this, ImageManager);
      this.textureManager = scene.sys.textures;
      this.images = {};
    }
    _createClass(ImageManager, [{
      key: "destroy",
      value: function destroy() {
        this.textureManager = undefined;
        this.images = undefined;
      }
    }, {
      key: "add",
      value: function add(key, config) {
        if (typeof key === 'string') {
          AddImage.call(this, key, config);
        } else if (Array.isArray(key)) {
          var data = key;
          for (var i = 0, cnt = data.length; i < cnt; i++) {
            AddImage.call(this, data[i]);
          }
        } else {
          var data = key;
          for (var key in data) {
            AddImage.call(this, key, data[key]);
          }
        }
        return this;
      }
    }, {
      key: "has",
      value: function has(key) {
        return this.images.hasOwnProperty(key);
      }
    }, {
      key: "remove",
      value: function remove(key) {
        if (this.has(key)) {
          delete this.images[key];
        }
        return this;
      }
    }, {
      key: "get",
      value: function get(key) {
        if (!this.has(key)) {
          if (this.textureManager.exists(key)) {
            this.add(key);
          }
        }
        return this.images[key];
      }
    }, {
      key: "getOuterWidth",
      value: function getOuterWidth(key) {
        var data = this.get(key);
        return data ? data.width + data.left + data.right : 0;
      }
    }, {
      key: "getFrame",
      value: function getFrame(key) {
        var data = this.get(key);
        return data ? this.textureManager.getFrame(data.key, data.frame) : undefined;
      }
    }, {
      key: "hasTexture",
      value: function hasTexture(key) {
        return !!this.getFrame(key);
      }
    }]);
    return ImageManager;
  }();
  var methods$2 = {
    draw: DrawImage
  };
  Object.assign(ImageManager.prototype, methods$2);

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

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var AddToDOM = Phaser.DOM.AddToDOM;
  var CanvasPool = Phaser.Display.Canvas.CanvasPool;
  var GameObject = Phaser.GameObjects.GameObject;
  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var RemoveFromDOM = Phaser.DOM.RemoveFromDOM;
  var SPLITREGEXP = CONST.SPLITREGEXP;

  // Reuse objects can increase performance
  var SharedPensPools = null;
  var SharedLinesPool = null;
  var SharedWrapTextLinesPool = null;
  var Text = /*#__PURE__*/function (_TextBase) {
    _inherits(Text, _TextBase);
    var _super = _createSuper(Text);
    function Text(scene, x, y, text, style, type, parser) {
      var _this;
      _classCallCheck(this, Text);
      if (IsPlainObject(x)) {
        var config = x;
        x = GetValue$1(config, 'x', 0);
        y = GetValue$1(config, 'y', 0);
        text = GetValue$1(config, 'text', '');
        style = GetValue$1(config, 'style');
      }
      if (x === undefined) {
        x = 0;
      }
      if (y === undefined) {
        y = 0;
      }
      _this = _super.call(this, scene, type);
      _this.renderer = scene.sys.game.renderer;
      _this.setPosition(x, y);
      _this.setOrigin(0, 0);
      _this.initPipeline();
      _this.canvas = CanvasPool.create(_assertThisInitialized(_this));
      _this.context = _this.canvas.getContext('2d');
      _this._imageManager = undefined;
      if (style) {
        // Override align
        if (style.hasOwnProperty('align')) {
          var halign = style.align;
          delete style.align;
          style.halign = halign;
        }
        // Has Stroke color but stroke thinkness, set stroke thinkness to 1
        if (style.hasOwnProperty('stroke') && !style.hasOwnProperty('strokeThickness')) {
          style.strokeThickness = 1;
        }
      }
      _this.style = new TextStyle(_assertThisInitialized(_this), style);
      var imageData = GetValue$1(style, 'images', undefined);
      if (imageData) {
        _this.addImage(imageData);
      }
      _this.autoRound = true;
      _this._text = undefined;
      _this.padding = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      };
      _this.width = 1;
      _this.height = 1;
      _this.dirty = false;

      //  If resolution wasn't set, force it to 1
      if (_this.style.resolution === 0) {
        _this.style.resolution = 1;
      }
      _this._crop = _this.resetCropObject();

      //  Create a Texture for this Text object
      _this.texture = scene.sys.textures.addCanvas(null, _this.canvas, true);

      //  Get the frame
      _this.frame = _this.texture.get();

      //  Set the resolution
      _this.frame.source.resolution = _this.style.resolution;
      if (_this.renderer.gl) {
        //  Clear the default 1x1 glTexture, as we override it later

        _this.renderer.deleteTexture(_this.frame.source.glTexture);
        _this.frame.source.glTexture = null;
      }
      var sharedPoolMode = GetValue$1(style, 'sharedPool', true);
      var pensPool, linesPool, wrapTextLinesPool;
      if (sharedPoolMode) {
        // Use pools first time
        if (!SharedPensPools) {
          SharedPensPools = {};
          SharedLinesPool = new Stack();
          SharedWrapTextLinesPool = new WrapTextLinesPool();

          // Remove cached data
          _this.scene.game.events.once('destroy', function () {
            SharedPensPools = null;
            SharedLinesPool = null;
            SharedWrapTextLinesPool = null;
          });
        }
        if (!SharedPensPools.hasOwnProperty(type)) {
          SharedPensPools[type] = new Stack();
        }
        pensPool = SharedPensPools[type];
        linesPool = SharedLinesPool;
        wrapTextLinesPool = SharedWrapTextLinesPool;
      } else {
        pensPool = new Stack();
        linesPool = new Stack();
        wrapTextLinesPool = new WrapTextLinesPool();
      }
      _this.canvasText = new CanvasText({
        parent: _assertThisInitialized(_this),
        context: _this.context,
        parser: parser,
        style: _this.style,
        pensPool: pensPool,
        linesPool: linesPool,
        wrapTextLinesPool: wrapTextLinesPool
      });
      _this.parser = parser;
      _this.initRTL();
      if (style && style.padding) {
        _this.setPadding(style.padding);
      }
      _this.setText(text);
      return _this;
    }
    _createClass(Text, [{
      key: "preDestroy",
      value: function preDestroy() {
        if (this.style.rtl) {
          RemoveFromDOM(this.canvas);
        }
        this.canvasText.destroy();
        this.canvasText = undefined;
        if (this._imageManager) {
          this._imageManager.destroy();
          this._imageManager = undefined;
        }
        CanvasPool.remove(this.canvas);
        this.texture.destroy();
      }
    }, {
      key: "text",
      get: function get() {
        return this._text;
      },
      set: function set(value) {
        this.setText(value);
      }
    }, {
      key: "initRTL",
      value: function initRTL() {
        if (!this.style.rtl) {
          return;
        }

        //  Here is where the crazy starts.
        //
        //  Due to browser implementation issues, you cannot fillText BiDi text to a canvas
        //  that is not part of the DOM. It just completely ignores the direction property.

        this.canvas.dir = 'rtl';

        //  Experimental atm, but one day ...
        this.context.direction = 'rtl';

        //  Add it to the DOM, but hidden within the parent canvas.
        this.canvas.style.display = 'none';
        AddToDOM(this.canvas, this.scene.sys.canvas);

        //  And finally we set the x origin
        this.originX = 1;
      }
    }, {
      key: "setText",
      value: function setText(value) {
        if (value == null) {
          value = '';
        } else if (Array.isArray(value)) {
          value = value.join('\n');
        } else {
          value = value.toString();
        }
        if (value === this._text) {
          return this;
        }
        this._text = value;
        this.updateText();
        return this;
      }
    }, {
      key: "appendText",
      value: function appendText(value) {
        if (value == null) {
          return this;
        }
        if (Array.isArray(value)) {
          value = value.join('\n');
        }
        this.setText(this.text + value.toString());
        return this;
      }
    }, {
      key: "setPadding",
      value: function setPadding(left, top, right, bottom) {
        if (_typeof(left) === 'object') {
          var config = left;

          //  If they specify x and/or y this applies to all
          var x = GetValue$1(config, 'x', null);
          if (x !== null) {
            left = x;
            right = x;
          } else {
            left = GetValue$1(config, 'left', 0);
            right = GetValue$1(config, 'right', left);
          }
          var y = GetValue$1(config, 'y', null);
          if (y !== null) {
            top = y;
            bottom = y;
          } else {
            top = GetValue$1(config, 'top', 0);
            bottom = GetValue$1(config, 'bottom', top);
          }
        } else {
          if (left === undefined) {
            left = 0;
          }
          if (top === undefined) {
            top = left;
          }
          if (right === undefined) {
            right = left;
          }
          if (bottom === undefined) {
            bottom = top;
          }
        }
        this.padding.left = left;
        this.padding.top = top;
        this.padding.right = right;
        this.padding.bottom = bottom;
        return this.updateText(false);
      }
    }, {
      key: "updateText",
      value: function updateText(runWrap) {
        if (runWrap === undefined) {
          runWrap = true;
        }
        var canvasText = this.canvasText;

        // wrap text to pens
        var style = this.style;
        if (runWrap) {
          canvasText.updatePenManager(this._text, style.wrapMode, style.wrapWidth, style.lineHeight);
        }

        // resize
        var padding = this.padding;
        var textWidth, textHeight;
        var linesWidth = Math.ceil(canvasText.linesWidth);
        if (style.fixedWidth === 0) {
          this.width = linesWidth + padding.left + padding.right;
          textWidth = linesWidth;
        } else {
          this.width = style.fixedWidth;
          textWidth = this.width - padding.left - padding.right;
          if (textWidth < linesWidth) {
            textWidth = linesWidth;
          }
        }
        if (style.fixedHeight === 0) {
          this.height = canvasText.linesHeight + padding.top + padding.bottom;
          textHeight = canvasText.linesHeight;
        } else {
          this.height = style.fixedHeight;
          textHeight = this.height - padding.top - padding.bottom;
          if (textHeight < canvasText.linesHeight) {
            textHeight = canvasText.linesHeight;
          }
        }
        var w = this.width;
        var h = this.height;
        this.updateDisplayOrigin();
        var resolution = style.resolution;
        w *= resolution;
        h *= resolution;
        w = Math.max(Math.ceil(w), 1);
        h = Math.max(Math.ceil(h), 1);
        var canvas = this.canvas;
        var context = this.context;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          this.frame.setSize(w, h);
        } else {
          context.clearRect(0, 0, w, h);
        }
        context.save();
        context.scale(resolution, resolution);

        // draw
        var startX = !this.style.rtl ? padding.left : padding.right;
        var startY = padding.top;
        canvasText.draw(startX, startY, textWidth, textHeight);
        context.restore();
        if (this.renderer && this.renderer.gl) {
          this.frame.source.glTexture = this.renderer.canvasToTexture(canvas, this.frame.source.glTexture, true);
          this.frame.glTexture = this.frame.source.glTexture;
        }
        this.dirty = true;
        var input = this.input;
        if (input && !input.customHitArea) {
          input.hitArea.width = this.width;
          input.hitArea.height = this.height;
        }
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var out = Components.ToJSON(this);

        //  Extra Text data is added here

        var data = {
          autoRound: this.autoRound,
          text: this._text,
          style: this.style.toJSON(),
          resolution: this.resolution,
          padding: {
            left: this.padding.left,
            right: this.padding.right,
            top: this.padding.top,
            bottom: this.padding.bottom
          }
        };
        out.data = data;
        return out;
      }
    }, {
      key: "setInteractive",
      value: function setInteractive(hitArea, hitAreaCallback, dropZone) {
        var isInteractived = !!this.input;
        GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);
        if (!isInteractived) {
          this.canvasText.setInteractive();
        }
        return this;
      }
    }, {
      key: "getWrappedText",
      value: function getWrappedText(text, start, end) {
        text = this.canvasText.getText(text, start, end, true);
        return text.split(SPLITREGEXP);
      }
    }, {
      key: "getPlainText",
      value: function getPlainText(text, start, end) {
        return this.canvasText.getPlainText(text, start, end);
      }
    }, {
      key: "getText",
      value: function getText(text, start, end, wrap) {
        if (wrap === undefined) {
          wrap = false;
        }
        return this.canvasText.getText(text, start, end, wrap);
      }
    }, {
      key: "getSubString",
      value: function getSubString(text, start, end) {
        return this.getText(text, start, end);
      }
    }, {
      key: "copyPenManager",
      value: function copyPenManager(penManager) {
        return this.canvasText.copyPenManager(penManager);
      }
    }, {
      key: "getPenManager",
      value: function getPenManager(text, penManager) {
        return this.canvasText.getPenManager(text, penManager);
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        return this.setFixedSize(width, height);
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        return this.setFixedSize(width, height);
      }
    }, {
      key: "imageManager",
      get: function get() {
        if (!this._imageManager) {
          this._imageManager = new ImageManager(this.scene);
        }
        return this._imageManager;
      }
    }, {
      key: "addImage",
      value: function addImage(key, config) {
        this.imageManager.add(key, config);
        return this;
      }
    }, {
      key: "drawAreaBounds",
      value: function drawAreaBounds(graphics, color) {
        this.canvasText.hitAreaManager.drawBounds(graphics, color, this);
        return this;
      }
    }, {
      key: "generateTexture",
      value: function generateTexture(key, x, y, width, height) {
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
      }
    }]);
    return Text;
  }(TextBase);

  var GetOpenTagRegString = function GetOpenTagRegString(tagName, param) {
    if (param === undefined) {
      return "\\[".concat(tagName, "\\]");
    } else {
      return "\\[".concat(tagName, "=(").concat(param, ")\\]");
    }
  };
  var GetCloseTagRegString = function GetCloseTagRegString(tagName) {
    return "\\[/".concat(tagName, "\\]");
  };
  var NUMBER_PARAM = '[-.0-9]+';
  var COLOR_PARAM = '[a-z]+|#[0-9abcdef]+';
  var STR_PARAM = '[^\\]]+';
  var ESC = 'esc';
  var ESC_OPEN = GetOpenTagRegString(ESC);
  var ESC_CLOSE = GetCloseTagRegString(ESC);
  var RAW = 'raw';
  var RAW_OPEN = GetOpenTagRegString(RAW);
  var RAW_CLOSE = GetCloseTagRegString(RAW);
  var BLOD = 'b';
  var BLOD_OPEN = GetOpenTagRegString(BLOD);
  var BLOD_CLOSE = GetCloseTagRegString(BLOD);
  var ITALICS = 'i';
  var ITALICS_OPEN = GetOpenTagRegString(ITALICS);
  var ITALICS_CLOSE = GetCloseTagRegString(ITALICS);
  var WEIGHT = 'weight';
  var WEIGHT_OPEN = GetOpenTagRegString(WEIGHT, NUMBER_PARAM);
  var WEIGHT_CLOSE = GetCloseTagRegString(WEIGHT);
  var SIZE = 'size';
  var SIZE_OPEN = GetOpenTagRegString(SIZE, NUMBER_PARAM);
  var SIZE_CLOSE = GetCloseTagRegString(SIZE);
  var COLOR = 'color';
  var COLOR_OPEN = GetOpenTagRegString(COLOR, COLOR_PARAM);
  var COLOR_CLOSE = GetCloseTagRegString(COLOR);
  var UNDERLINE = 'u';
  var UNDERLINE_OPEN = GetOpenTagRegString(UNDERLINE);
  var UNDERLINE_OPENC = GetOpenTagRegString(UNDERLINE, COLOR_PARAM);
  var UNDERLINE_CLOSE = GetCloseTagRegString(UNDERLINE);
  var SHADOW = 'shadow';
  var SHADOW_OPEN = GetOpenTagRegString(SHADOW);
  var SHADOW_CLOSE = GetCloseTagRegString(SHADOW);
  var STROKE = 'stroke';
  var STROKE_OPEN = GetOpenTagRegString(STROKE);
  var STROKE_OPENC = GetOpenTagRegString(STROKE, COLOR_PARAM);
  var STROKE_CLOSE = GetCloseTagRegString(STROKE);
  var OFFSETY = 'y';
  var OFFSETY_OPEN = GetOpenTagRegString(OFFSETY, NUMBER_PARAM);
  var OFFSETY_CLOSE = GetCloseTagRegString(OFFSETY);
  var IMAGE = 'img';
  var IMAGE_OPEN = GetOpenTagRegString(IMAGE, STR_PARAM);
  var IMAGE_CLOSE = GetCloseTagRegString(IMAGE);
  var AREA = 'area';
  var AREA_OPEN = GetOpenTagRegString(AREA, STR_PARAM);
  var AREA_CLOSE = GetCloseTagRegString(AREA);
  var ALIGN = 'align';
  var ALIGN_OPEN = GetOpenTagRegString(ALIGN, STR_PARAM);
  var ALIGN_CLOSE = GetCloseTagRegString(ALIGN);
  var RE_ESC_OPEN = new RegExp(ESC_OPEN, 'i');
  var RE_ESC_CLOSE = new RegExp(ESC_CLOSE, 'i');
  var RE_RAW_OPEN = new RegExp(RAW_OPEN, 'i');
  var RE_RAW_CLOSE = new RegExp(RAW_CLOSE, 'i');
  var RE_BLOD_OPEN = new RegExp(BLOD_OPEN, 'i');
  var RE_BLOD_CLOSE = new RegExp(BLOD_CLOSE, 'i');
  var RE_ITALICS_OPEN = new RegExp(ITALICS_OPEN, 'i');
  var RE_ITALICS_CLOSE = new RegExp(ITALICS_CLOSE, 'i');
  var RE_WEIGHT_OPEN = new RegExp(WEIGHT_OPEN, 'i');
  var RE_WEIGHT_CLOSE = new RegExp(WEIGHT_CLOSE, 'i');
  var RE_SIZE_OPEN = new RegExp(SIZE_OPEN, 'i');
  var RE_SIZE_CLOSE = new RegExp(SIZE_CLOSE, 'i');
  var RE_COLOR_OPEN = new RegExp(COLOR_OPEN, 'i');
  var RE_COLOR_CLOSE = new RegExp(COLOR_CLOSE, 'i');
  var RE_UNDERLINE_OPEN = new RegExp(UNDERLINE_OPEN, 'i');
  var RE_UNDERLINE_OPENC = new RegExp(UNDERLINE_OPENC, 'i');
  var RE_UNDERLINE_CLOSE = new RegExp(UNDERLINE_CLOSE, 'i');
  var RE_SHADOW_OPEN = new RegExp(SHADOW_OPEN, 'i');
  var RE_SHADOW_CLOSE = new RegExp(SHADOW_CLOSE, 'i');
  var RE_STROKE_OPEN = new RegExp(STROKE_OPEN, 'i');
  var RE_STROKE_OPENC = new RegExp(STROKE_OPENC, 'i');
  var RE_STROKE_CLOSE = new RegExp(STROKE_CLOSE, 'i');
  var RE_OFFSETY_OPEN = new RegExp(OFFSETY_OPEN, 'i');
  var RE_OFFSETY_CLOSE = new RegExp(OFFSETY_CLOSE, 'i');
  var RE_IMAGE_OPEN = new RegExp(IMAGE_OPEN, 'i');
  var RE_IMAGE_CLOSE = new RegExp(IMAGE_CLOSE, 'i');
  var RE_AREA_OPEN = new RegExp(AREA_OPEN, 'i');
  var RE_AREA_CLOSE = new RegExp(AREA_CLOSE, 'i');
  var RE_ALIGN_OPEN = new RegExp(ALIGN_OPEN, 'i');
  var RE_ALIGN_CLOSE = new RegExp(ALIGN_CLOSE, 'i');
  var RE_SPLITTEXT = new RegExp([RAW_OPEN, RAW_CLOSE, ESC_OPEN, ESC_CLOSE, BLOD_OPEN, BLOD_CLOSE, ITALICS_OPEN, ITALICS_CLOSE, WEIGHT_OPEN, WEIGHT_CLOSE, SIZE_OPEN, SIZE_CLOSE, COLOR_OPEN, COLOR_CLOSE, UNDERLINE_OPEN, UNDERLINE_OPENC, UNDERLINE_CLOSE, SHADOW_OPEN, SHADOW_CLOSE, STROKE_OPEN, STROKE_OPENC, STROKE_CLOSE, OFFSETY_OPEN, OFFSETY_CLOSE, IMAGE_OPEN, IMAGE_CLOSE, AREA_OPEN, AREA_CLOSE, ALIGN_OPEN, ALIGN_CLOSE].join('|'), 'ig');

  var SplitText = function SplitText(text, mode) {
    var result = [];
    var charIdx = 0;
    var rawMode = false,
      escMode = false;
    while (true) {
      var regexResult = RE_SPLITTEXT.exec(text);
      if (!regexResult) {
        break;
      }
      var match = regexResult[0];
      if (escMode) {
        if (RE_ESC_CLOSE.test(match)) {
          escMode = false;
        } else {
          continue; // Skip other tags
        }
      } else if (rawMode) {
        if (RE_RAW_CLOSE.test(match)) {
          rawMode = false;
        } else {
          continue; // Skip other tags
        }
      } else {
        if (RE_ESC_OPEN.test(match)) {
          escMode = true;
        } else if (RE_RAW_OPEN.test(match)) {
          rawMode = true;
        }
      }
      var matchEnd = RE_SPLITTEXT.lastIndex;
      var matchStart = matchEnd - match.length;
      if (charIdx < matchStart) {
        var content = text.substring(charIdx, matchStart);
        result.push(content);
      }
      if (mode === undefined) {
        result.push(match);
      }
      charIdx = matchEnd;
    }
    var totalLen = text.length;
    if (charIdx < totalLen) {
      // Push remainder string
      result.push(text.substring(charIdx, totalLen));
    }
    return result; // [text,...]
  };

  var PROP_REMOVE = false;
  var PROP_ADD = true;
  var GETPROP_RESULT = {
    plainText: null,
    prevProp: null
  };
  var TagTextToProp = function TagTextToProp(text, prevProp) {
    // text : result of splitText()
    if (prevProp == null) {
      prevProp = {};
    }
    var plainText = '';

    // close image tag
    if (prevProp.img) {
      UpdateProp(prevProp, PROP_REMOVE, 'img');
    }
    if (prevProp.esc) {
      if (RE_ESC_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'esc');
      } else {
        plainText = text;
      }
    } else if (prevProp.raw) {
      if (RE_RAW_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'raw');
      } else {
        plainText = text;
      }
    } else {
      if (RE_ESC_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'esc', true);
      } else if (RE_ESC_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'esc');
      } else if (RE_RAW_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'raw', true);
      } else if (RE_RAW_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'raw');
      } else if (RE_BLOD_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'b', true);
      } else if (RE_BLOD_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'b');
      } else if (RE_ITALICS_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'i', true);
      } else if (RE_ITALICS_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'i');
      } else if (RE_WEIGHT_OPEN.test(text)) {
        var innerMatch = text.match(RE_WEIGHT_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'weight', innerMatch[1]);
      } else if (RE_WEIGHT_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'weight');
      } else if (RE_SIZE_OPEN.test(text)) {
        var innerMatch = text.match(RE_SIZE_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'size', "".concat(innerMatch[1], "px"));
      } else if (RE_SIZE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'size');
      } else if (RE_COLOR_OPEN.test(text)) {
        var innerMatch = text.match(RE_COLOR_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'color', innerMatch[1]);
      } else if (RE_COLOR_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'color');
      } else if (RE_UNDERLINE_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'u', true);
      } else if (RE_UNDERLINE_OPENC.test(text)) {
        var innerMatch = text.match(RE_UNDERLINE_OPENC);
        UpdateProp(prevProp, PROP_ADD, 'u', innerMatch[1]);
      } else if (RE_UNDERLINE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'u');
      } else if (RE_SHADOW_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'shadow', true);
      } else if (RE_SHADOW_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'shadow');
      } else if (RE_STROKE_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'stroke', true);
      } else if (RE_STROKE_OPENC.test(text)) {
        var innerMatch = text.match(RE_STROKE_OPENC);
        UpdateProp(prevProp, PROP_ADD, 'stroke', innerMatch[1]);
      } else if (RE_STROKE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'stroke');
      } else if (RE_OFFSETY_OPEN.test(text)) {
        var innerMatch = text.match(RE_OFFSETY_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'y', parseFloat(innerMatch[1]));
      } else if (RE_OFFSETY_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'y');
      } else if (RE_IMAGE_OPEN.test(text)) {
        var innerMatch = text.match(RE_IMAGE_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'img', innerMatch[1]);
      } else if (RE_IMAGE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'img');
      } else if (RE_AREA_OPEN.test(text)) {
        var innerMatch = text.match(RE_AREA_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'area', innerMatch[1]);
      } else if (RE_AREA_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'area');
      } else if (RE_ALIGN_OPEN.test(text)) {
        var innerMatch = text.match(RE_ALIGN_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'align', innerMatch[1]);
      } else if (RE_ALIGN_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'align');
      } else {
        plainText = text;
      }
    }
    var result = GETPROP_RESULT;
    result.plainText = plainText;
    result.prop = prevProp;
    return result;
  };
  var UpdateProp = function UpdateProp(prop, op, key, value) {
    if (op === PROP_ADD) {
      // PROP_ADD     
      prop[key] = value;
    } else {
      // PROP_REMOVE        
      if (prop.hasOwnProperty(key)) {
        delete prop[key];
      }
    }
    return prop;
  };

  var PropToContextStyle = function PropToContextStyle(defaultStyle, prop) {
    var result = STYLE_RESULT;
    if (!prop.hasOwnProperty('img')) {
      result.image = null;
      if (prop.hasOwnProperty('family')) {
        result.fontFamily = prop.family;
      } else {
        result.fontFamily = defaultStyle.fontFamily;
      }
      if (prop.hasOwnProperty('size')) {
        var size = prop.size;
        if (typeof size === 'number') {
          size = "".concat(size, "px");
        }
        result.fontSize = size;
      } else {
        result.fontSize = defaultStyle.fontSize;
      }
      result.fontStyle = GetFontStyle(prop);
      if (prop.hasOwnProperty('color')) {
        result.color = prop.color;
      } else {
        result.color = defaultStyle.color;
      }
      if (prop.hasOwnProperty('stroke')) {
        if (prop.stroke === true) {
          result.stroke = defaultStyle.stroke;
          result.strokeThickness = defaultStyle.strokeThickness;
        } else {
          result.stroke = prop.stroke;
          result.strokeThickness = defaultStyle.strokeThickness;
        }
      } else {
        result.stroke = defaultStyle.stroke;
        result.strokeThickness = 0;
      }
    } else {
      result.image = prop.img;
    }
    if (prop.hasOwnProperty('shadow')) {
      if (prop.shadow === true) {
        result.shadowColor = defaultStyle.shadowColor;
        result.shadowOffsetX = defaultStyle.shadowOffsetX;
        result.shadowOffsetY = defaultStyle.shadowOffsetY;
        result.shadowBlur = defaultStyle.shadowBlur;
        result.shadowStroke = true;
        result.shadowFill = true;
      } else {
        result.shadowColor = prop.shadow;
        result.shadowOffsetX = defaultStyle.shadowOffsetX;
        result.shadowOffsetY = defaultStyle.shadowOffsetY;
        result.shadowBlur = defaultStyle.shadowBlur;
        result.shadowStroke = true;
        result.shadowFill = true;
      }
    } else {
      result.shadowColor = '#000';
      result.shadowOffsetX = 0;
      result.shadowOffsetY = 0;
      result.shadowBlur = 0;
      result.shadowStroke = false;
      result.shadowFill = false;
    }
    if (prop.hasOwnProperty('u')) {
      if (prop.u === true) {
        result.underlineColor = defaultStyle.underlineColor;
        result.underlineThickness = defaultStyle.underlineThickness;
        result.underlineOffset = defaultStyle.underlineOffset;
      } else {
        result.underlineColor = prop.u;
        result.underlineThickness = defaultStyle.underlineThickness;
        result.underlineOffset = defaultStyle.underlineOffset;
      }
    } else {
      result.underlineColor = '#000';
      result.underlineThickness = 0;
      result.underlineOffset = 0;
    }
    return result;
  };
  var GetFontStyle = function GetFontStyle(prop) {
    var isBold = prop.b;
    var weight = prop.weight;
    var isItalic = prop.i;
    if (isBold || weight || isItalic) {
      if (isItalic) {
        if (isBold) {
          return 'bold italic';
        } else if (weight) {
          return "".concat(weight, " italic");
        } else {
          return 'italic';
        }
      } else {
        // !isItalic
        if (isBold) {
          return 'bold';
        } else {
          return weight.toString();
        }
      }
    } else {
      return '';
    }
  };
  var STYLE_RESULT = new TextStyle();

  var PropToTagText = function PropToTagText(text, prop, prevProp) {
    if (prevProp == null) {
      prevProp = EMPTYPROP;
    }
    var headers = [];
    for (var k in prevProp) {
      if (!prop.hasOwnProperty(k)) {
        headers.push("[/".concat(k, "]"));
      }
    }
    for (var k in prop) {
      var value = prop[k];
      if (prevProp[k] === value) {
        continue;
      }
      switch (k) {
        case 'size':
          headers.push("[size=".concat(value.replace('px', ''), "]"));
          break;
        case 'color':
        case 'weight':
        case 'stroke':
        case 'y':
        case 'img':
        case 'area':
        case 'align':
          headers.push("[".concat(k, "=").concat(value, "]"));
          break;
        case 'u':
          if (value === true) {
            headers.push('[u]');
          } else {
            headers.push("[u=".concat(value, "]"));
          }
          break;
        default:
          headers.push("[".concat(k, "]"));
          break;
      }
    }
    headers.push(text);
    return headers.join('');
  };
  var EMPTYPROP = {};

  var Parser = /*#__PURE__*/function () {
    function Parser() {
      _classCallCheck(this, Parser);
    }
    _createClass(Parser, [{
      key: "getStrokeThinkness",
      value: function getStrokeThinkness(defaultStyle, prop) {
        var strokeThickness;
        if (prop.hasOwnProperty('stroke')) {
          strokeThickness = defaultStyle.strokeThickness;
        } else {
          strokeThickness = 0;
        }
        return strokeThickness;
      }
    }]);
    return Parser;
  }();
  var methods$1 = {
    splitText: SplitText,
    tagTextToProp: TagTextToProp,
    propToContextStyle: PropToContextStyle,
    propToTagText: PropToTagText
  };
  Object.assign(Parser.prototype, methods$1);

  var BBCodeText = /*#__PURE__*/function (_Text) {
    _inherits(BBCodeText, _Text);
    var _super = _createSuper(BBCodeText);
    function BBCodeText(scene, x, y, text, style) {
      _classCallCheck(this, BBCodeText);
      var parser = new Parser(style);
      return _super.call(this, scene, x, y, text, style, 'rexBBCodeText', parser);
    }
    return _createClass(BBCodeText);
  }(Text);

  var CreateBBCodeText = function CreateBBCodeText(scene, style) {
    var gameObject = new BBCodeText(scene, 0, 0, '', style);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var PhaserImage = Phaser.GameObjects.Image;
  var CreateImage = function CreateImage(scene, config) {
    var gameObject = new PhaserImage(scene, 0, 0, '');
    scene.add.existing(gameObject);
    return gameObject;
  };

  var BuildDisplayLabelConfig = function BuildDisplayLabelConfig(scene, config, deepCloneConfig) {
    if (deepCloneConfig === undefined) {
      deepCloneConfig = true;
    }
    if (deepCloneConfig) {
      config = config ? DeepClone(config) : {};
    } else if (!config) {
      config = {};
    }
    config.background = CreateBackground(scene, config.background);
    config.text = CreateBBCodeText(scene, config.text);
    if (config.icon !== null) {
      config.icon = CreateImage(scene, config.icon);
    }
    if (config.action !== null) {
      config.action = CreateImage(scene, config.action);
    }
    return config;
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

  var ResetDisplayContent = function ResetDisplayContent(config) {
    if (config === undefined) {
      config = {};
    } else if (typeof config === 'string') {
      config = {
        text: config
      };
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
  };

  var methods = {
    resetDisplayContent: ResetDisplayContent
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var Label = /*#__PURE__*/function (_Sizer) {
    _inherits(Label, _Sizer);
    var _super = _createSuper(Label);
    function Label(scene, config) {
      var _this;
      _classCallCheck(this, Label);
      // Create sizer
      _this = _super.call(this, scene, config);
      _this.type = 'rexLabel';

      // Add elements
      var background = GetValue(config, 'background', undefined);
      var icon = GetValue(config, 'icon', undefined);
      var iconMask = GetValue(config, 'iconMask', undefined);
      var text = GetValue(config, 'text', undefined);
      var action = GetValue(config, 'action', undefined);
      var actionMask = GetValue(config, 'actionMask', undefined);
      // Align
      var align = GetValue(config, 'align', undefined); // undefined/left/top: no space

      if (background) {
        _this.addBackground(background);
      }

      // Add space
      if (align === 'right' || align === 'bottom' || align === 'center') {
        _this.addSpace();
      }
      if (icon) {
        var iconSpace = GetValue(config, 'space.icon', 0);
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
        var fitRatio = GetValue(config, 'squareFitIcon', false) ? 1 : 0;
        _this.add(icon, {
          proportion: 0,
          padding: padding,
          fitRatio: fitRatio
        });
        if (iconMask) {
          iconMask = AddChildMask.call(_assertThisInitialized(_this), icon, icon, 1); // Circle mask
        }

        if (!fitRatio) {
          var iconSize = GetValue(config, 'iconSize', undefined);
          _this.setIconSize(GetValue(config, 'iconWidth', iconSize), GetValue(config, 'iconHeight', iconSize));
        }
      }
      if (text) {
        var textSpace = GetValue(config, 'space.text', 0);
        var expandTextWidth = GetValue(config, 'expandTextWidth', false);
        var expandTextHeight = GetValue(config, 'expandTextHeight', false);
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
        var fitRatio = GetValue(config, 'squareFitAction', false) ? 1 : 0;
        _this.add(action, {
          proportion: 0,
          fitRatio: fitRatio
        });
        if (actionMask) {
          actionMask = AddChildMask.call(_assertThisInitialized(_this), action, action, 1); // Circle mask
        }

        if (!fitRatio) {
          var actionSize = GetValue(config, 'actionSize');
          _this.setActionSize(GetValue(config, 'actionWidth', actionSize), GetValue(config, 'actionHeight', actionSize));
        }
      }

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
        if (this.iconWidth !== undefined) {
          SetDisplaySize(imageObject, this.iconWidth, this.iconHeight);
          this.resetChildScaleState(imageObject);
        }
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
        if (this.actionWidth !== undefined) {
          SetDisplaySize(imageObject, this.actionWidth, this.actionHeight);
          this.resetChildScaleState(imageObject);
        }
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
        var icon = this.childrenMap.icon;
        if (icon && this.iconWidth !== undefined) {
          SetDisplaySize(icon, this.iconWidth, this.iconHeight);
        }
        var action = this.childrenMap.action;
        if (action && this.actionWidth !== undefined) {
          SetDisplaySize(action, this.actionWidth, this.actionHeight);
        }
        _get(_getPrototypeOf(Label.prototype), "preLayout", this).call(this);
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
    }]);
    return Label;
  }(Sizer);
  Object.assign(Label.prototype, methods);

  var CreateDisplayLabel = function CreateDisplayLabel(scene, config) {
    config = BuildDisplayLabelConfig(scene, config);
    var gameObject = new Label(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
  };

  var ConfirmDialog = /*#__PURE__*/function (_Dialog) {
    _inherits(ConfirmDialog, _Dialog);
    var _super = _createSuper(ConfirmDialog);
    function ConfirmDialog(scene, config) {
      var _this;
      _classCallCheck(this, ConfirmDialog);
      config = config ? DeepClone(config) : {};
      config.background = CreateBackground(scene, config.background);
      config.title = CreateDisplayLabel(scene, config.title);
      config.content = CreateDisplayLabel(scene, config.content);
      var buttonMode = config.buttonMode;
      if (buttonMode === undefined) {
        buttonMode = !!config.buttonA && !!config.buttonB ? 2 : !!config.buttonA || !!config.button ? 1 : 0;
      }
      switch (buttonMode) {
        case 2:
          config.actions = [CreateDisplayLabel(scene, config.buttonA || config.button), CreateDisplayLabel(scene, config.buttonB || config.button)];
          break;
        case 1:
          config.actions = [CreateDisplayLabel(scene, config.buttonA || config.button)];
          break;
        default:
          config.actions = [];
          break;
      }
      _this = _super.call(this, scene, config);
      _this.type = 'rexConfirmDialog';
      _this.buttonMode = buttonMode;
      return _this;
    }
    _createClass(ConfirmDialog, [{
      key: "resetDisplayContent",
      value: function resetDisplayContent(config) {
        if (config === undefined) {
          config = {};
        }
        var title = this.childrenMap.title;
        title.resetDisplayContent(config.title);
        var content = this.childrenMap.content;
        content.resetDisplayContent(config.content);
        var buttonA = this.childrenMap.actions[0];
        if (buttonA) {
          buttonA.resetDisplayContent(config.buttonA);
        }
        var buttonB = this.childrenMap.actions[1];
        if (buttonB) {
          buttonB.resetDisplayContent(config.buttonB);
        }
        return this;
      }
    }, {
      key: "modal",
      value: function modal(config, onClose) {
        if (IsFunction(config)) {
          onClose = config;
          config = undefined;
        }
        if (config === undefined) {
          config = {};
        }
        var zeroButtonMode = this.buttonMode === 0;
        if (!config.hasOwnProperty('anyTouchClose')) {
          config.anyTouchClose = zeroButtonMode;
        }
        if (!config.hasOwnProperty('manualClose')) {
          config.manualClose = !zeroButtonMode;
        }
        _get(_getPrototypeOf(ConfirmDialog.prototype), "modal", this).call(this, config, onClose);
        return this;
      }
    }]);
    return ConfirmDialog;
  }(Dialog);

  return ConfirmDialog;

}));
