(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexgridtableplugin = factory());
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

  var DegToRad$1 = Phaser.Math.DegToRad;
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
        syncScrollFactor: true,
        syncCameraFilter: true,
        syncDisplayList: true,
        visible: true,
        active: true
      };
      Object.defineProperty(rexContainer, 'angle', {
        get: function get() {
          return RadToDeg(this.rotation);
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

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
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
      state.syncPosition = GetValue$9(config, 'syncPosition', true);
      state.syncRotation = GetValue$9(config, 'syncRotation', true);
      state.syncScale = GetValue$9(config, 'syncScale', true);
      state.syncAlpha = GetValue$9(config, 'syncAlpha', true);
      state.syncScrollFactor = GetValue$9(config, 'syncScrollFactor', true);
      state.syncCameraFilter = GetValue$9(config, 'syncCameraFilter', true);
      state.syncDisplayList = GetValue$9(config, 'syncDisplayList', true);
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

  var RotateAround$2 = Phaser.Math.RotateAround;
  var Transform = {
    worldToLocal: function worldToLocal(point) {
      // Transform
      point.x -= this.x;
      point.y -= this.y;
      // Rotate
      RotateAround$2(point, 0, 0, -this.rotation);
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
      RotateAround$2(point, 0, 0, this.rotation);
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

  var DegToRad = Phaser.Math.DegToRad;
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
      state.rotation = DegToRad(angle);
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
  var RotateAround$1 = Phaser.Math.RotateAround;
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
      RotateAround$1(output, gameObject.x, gameObject.y, gameObject.rotation);
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

  var GameObjectClass = Phaser.GameObjects.GameObject;
  var IsGameObject = function IsGameObject(object) {
    return object instanceof GameObjectClass;
  };

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var Snapshot = function Snapshot(config) {
    if (!config) {
      return;
    }
    var gameObjects = config.gameObjects;
    var renderTexture = config.renderTexture; // renderTexture, or dynamicTexture
    var saveTexture = config.saveTexture;
    var x = GetValue$8(config, 'x', undefined);
    var y = GetValue$8(config, 'y', undefined);
    var width = GetValue$8(config, 'width', undefined);
    var height = GetValue$8(config, 'height', undefined);
    var originX = GetValue$8(config, 'originX', 0);
    var originY = GetValue$8(config, 'originY', 0);
    var padding = GetValue$8(config, 'padding', 0);
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

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
  var DrawBounds$1 = function DrawBounds(gameObjects, graphics, config) {
    var strokeColor, lineWidth, fillColor, fillAlpha, padding;
    if (typeof config === 'number') {
      strokeColor = config;
    } else {
      strokeColor = GetValue$7(config, 'color');
      lineWidth = GetValue$7(config, 'lineWidth');
      fillColor = GetValue$7(config, 'fillColor');
      fillAlpha = GetValue$7(config, 'fillAlpha', 1);
      padding = GetValue$7(config, 'padding', 0);
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

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var DrawBounds = function DrawBounds(graphics, config) {
    var drawContainer = GetValue$6(config, 'drawContainer', true);
    var gameObjects = GetValue$6(config, 'children');
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

  var methods$1 = {
    changeOrigin: ChangeOrigin,
    drawBounds: DrawBounds
  };
  Object.assign(methods$1, Parent, AddChild, RemoveChild, ChildState, Transform, Position, Rotation, Scale, Visible, Alpha, Active, ScrollFactor, CameraFilter, Mask, Depth, Children, Tween, P3Container, RenderLayer, RenderTexture);

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

  var ALIGN = Phaser.Display.Align;
  var AlignConst = {
    center: ALIGN.CENTER,
    left: ALIGN.LEFT_CENTER,
    right: ALIGN.RIGHT_CENTER,
    top: ALIGN.TOP_CENTER,
    bottom: ALIGN.BOTTOM_CENTER,
    'left-top': ALIGN.TOP_LEFT,
    'top-left': ALIGN.TOP_LEFT,
    'left-center': ALIGN.LEFT_CENTER,
    'center-left': ALIGN.LEFT_CENTER,
    'left-bottom': ALIGN.BOTTOM_LEFT,
    'bottom-left': ALIGN.BOTTOM_LEFT,
    'center-top': ALIGN.TOP_CENTER,
    'top-center': ALIGN.TOP_CENTER,
    'center-center': ALIGN.CENTER,
    'center-bottom': ALIGN.BOTTOM_CENTER,
    'bottom-center': ALIGN.BOTTOM_CENTER,
    'right-top': ALIGN.TOP_RIGHT,
    'top-right': ALIGN.TOP_RIGHT,
    'right-center': ALIGN.RIGHT_CENTER,
    'center-right': ALIGN.RIGHT_CENTER,
    'right-bottom': ALIGN.BOTTOM_RIGHT,
    'bottom-right': ALIGN.BOTTOM_RIGHT
  };

  var Cell = /*#__PURE__*/function () {
    function Cell(parent, config) {
      _classCallCheck(this, Cell);
      this.container = null;
      this._deltaHeight = 0;
      this.setParent(parent);
      // this.resetFromJSON(config);
    }
    _createClass(Cell, [{
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent; // parent: table
        this.parentContainer = parent.getParentContainer();
      }

      // resetFromJSON(o) {
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
      key: "setCellContainerAlign",
      value: function setCellContainerAlign(align) {
        if (typeof align === 'string') {
          align = AlignConst[align];
        }
        this.cellContainerAlign = align;
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

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
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
        if (o === undefined) {
          o = {};
        }
        this.colCount = undefined;
        this.nonZeroDeltaHeightCount = 0;
        this.resetTotalRowsHeight();
        var cellHeight = o.cellHeight;
        if (cellHeight === undefined) {
          cellHeight = 30;
        }
        var cellWidth = o.cellWidth;
        if (cellWidth === undefined) {
          cellWidth = 30;
        }
        this.setDefaultCellHeight(cellHeight);
        this.setDefaultCellWidth(cellWidth);
        this.initCells(GetValue$4(o, 'cellsCount', 0));
        this.setColumnCount(GetValue$4(o, 'columns', 1));
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
      value: function heightToRowIndex(height, roundMode) {
        if (roundMode === undefined) {
          roundMode = 0;
        }
        /*
        roundMode:
        - 0 : floor
        - 1 : ceil
        - 2 :             
            - Default : floor
            - Vary : plus one if rowIdx is an integer, else floor
        */

        if (height === 0) {
          return 0;
        }

        // defaultCellHeightMode
        if (this.defaultCellHeightMode) {
          var rowIdx = height / this.defaultCellHeight;
          switch (roundMode) {
            case 1:
              rowIdx = Math.ceil(rowIdx);
              break;
            default:
              // 0, 2
              rowIdx = Math.floor(rowIdx);
              break;
          }
          return rowIdx;
        }

        // count cell height one by one
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
            if (roundMode === 2) {
              rowIdx += 1;
            }
            return rowIdx;
          } else {
            if (roundMode === 1) {
              var preRowIdx = rowIdx;
              rowIdx += 1;
              isValidIdx = rowIdx >= 0 && rowIdx < rowCount;
              if (!isValidIdx) {
                rowIdx = preRowIdx;
              }
            }
            return rowIdx;
          }
        }
      }
    }, {
      key: "widthToColIndex",
      value: function widthToColIndex(width, isCeil) {
        if (width === 0) {
          return 0;
        }
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
        var cnt = this.colCount;
        // single column
        if (cnt <= 1) {
          return this.getCellHeight(this.colRowToCellIndex(0, rowIdx));
        }

        // multiple columns, get the maximum height
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
      var visibleRowCount = table.heightToRowIndex(this.instHeight, 1);

      // less then 1 page
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
      var visibleColCount = table.widthToColIndex(this.instWidth, true);

      // less then 1 page            
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
    if (!gameObject.displayList) {
      return false;
    }
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
    var top = rectB.top,
      bottom = rectB.bottom,
      left = rectB.left,
      right = rectB.right;
    var result = 0;
    result += rectA.contains(left, top) ? 1 : 0;
    result += rectA.contains(left, bottom) ? 1 : 0;
    result += rectA.contains(right, top) ? 1 : 0;
    result += rectA.contains(right, bottom) ? 1 : 0;
    return result;
  };
  var ShowAll = function ShowAll(parent, child, mask) {
    if (!child.hasOwnProperty('isRexContainerLite')) {
      if (child.clearMask) {
        child.clearMask();
      }
      parent.setChildMaskVisible(child, true);
    } else {
      child.syncChildrenEnable = false;
      parent.setChildMaskVisible(child, true);
      child.syncChildrenEnable = true;
    }
  };
  var ShowSome = function ShowSome(parent, child, mask) {
    if (!child.hasOwnProperty('isRexContainerLite')) {
      if (child.setMask) {
        child.setMask(mask);
      }
      parent.setChildMaskVisible(child, true);
    } else {
      child.syncChildrenEnable = false;
      parent.setChildMaskVisible(child, true);
      child.syncChildrenEnable = true;
    }
  };
  var ShowNone = function ShowNone(parent, child, mask) {
    if (!child.hasOwnProperty('isRexContainerLite')) {
      if (child.clearMask) {
        child.clearMask();
      }
      parent.setChildMaskVisible(child, false);
    } else {
      child.syncChildrenEnable = false;
      parent.setChildMaskVisible(child, false);
      child.syncChildrenEnable = true;
    }
  };

  var DrawShape = function DrawShape(width, height, padding, originX, originY) {
    this.clear().fillStyle(0xffffff);
    switch (this.shapeType) {
      case 1:
        // circle
        // Assume that all padding are the same value in this circle shape
        padding = padding.left;
        var radius = Math.min(width, height) / 2;
        this.fillCircle(-width * (originX - 0.5),
        // centerX
        -height * (originY - 0.5),
        // centerY
        radius + padding // radius
        );
        break;
      default:
        // 0|'rectangle'
        this.fillRect(-(width * originX) - padding.left,
        // x
        -(height * originY) - padding.top,
        // y
        width + padding.left + padding.right,
        // width
        height + padding.top + padding.bottom // height
        );
        break;
    }
  };

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var GetBoundsConfig = function GetBoundsConfig(config, out) {
    if (config === undefined) {
      config = 0;
    }
    if (out === undefined) {
      out = {};
    }
    if (typeof config === 'number') {
      out.left = config;
      out.right = config;
      out.top = config;
      out.bottom = config;
    } else {
      out.left = GetValue$3(config, 'left', 0);
      out.right = GetValue$3(config, 'right', 0);
      out.top = GetValue$3(config, 'top', 0);
      out.bottom = GetValue$3(config, 'bottom', 0);
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

  var Graphics = Phaser.GameObjects.Graphics;
  var DefaultMaskGraphics = /*#__PURE__*/function (_Graphics) {
    _inherits(DefaultMaskGraphics, _Graphics);
    function DefaultMaskGraphics(parent, shapeType, padding) {
      var _this;
      _classCallCheck(this, DefaultMaskGraphics);
      if (shapeType === undefined) {
        shapeType = 0;
      }
      if (typeof shapeType === 'string') {
        shapeType = SHAPEMODE[shapeType];
      }
      _this = _callSuper(this, DefaultMaskGraphics, [parent.scene]);
      _this.parent = parent;
      _this.shapeType = shapeType;
      _this.padding = GetBoundsConfig(padding);
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
        } else if (typeof padding === 'number') {
          padding = GetBoundsConfig(padding);
        }
        var isSizeChanged = this.width !== width || this.height !== height;
        var isPaddingChanged = this.padding !== padding && !IsKeyValueEqual(this.padding, padding);
        if (!isSizeChanged && !isPaddingChanged) {
          return this;
        }
        this.width = width;
        this.height = height;
        if (isPaddingChanged) {
          Clone(padding, this.padding);
        }

        // Graphics does not have originX, originY properties
        this.originX = parent.originX;
        this.originY = parent.originY;
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
        DrawShape.call(this, this.width, this.height, this.padding, originX, originY);
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
      this.childrenMask = maskGameObject.createGeometryMask();
      // this.childrenMask is a mask object, not a (Graphics) game object
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
      if (!this.childrenMask ||
      // No childrenMask
      !this.maskChildrenFlag ||
      // No maskChildrenFlag set
      this.alpha === 0 || !this.visible // Parent is not visible
      ) {
        return this;
      }
      if (this.privateRenderLayer) {
        this.privateRenderLayer.setMask(this.childrenMask);
      } else if (this.maskLayer) {
        // 1. Add parent and children into layer
        this.addToLayer(this.maskLayer);
        // 2. Mask this layer
        this.maskLayer.setMask(this.childrenMask);
      } else {
        MaskChildren(this, this.childrenMask);
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

  var ShowCells = function ShowCells() {
    if (this.cellsCount === 0) {
      return;
    }
    var table = this.table;
    this.startRowIndex = Math.max(table.heightToRowIndex(-this.tableOY, 2), 0);
    var rowIndex = this.startRowIndex;
    var startColumnIndex = Math.max(table.widthToColIndex(-this.tableOX), 0);
    var columnIndex = startColumnIndex;
    var cellIdx = table.colRowToCellIndex(columnIndex, rowIndex);
    var bottomBound = this.bottomBound;
    var rightBound = this.rightBound;
    var lastIdx = table.cellsCount - 1;
    var lastColIdx = table.colCount - 1;
    var startCellTLX = this.getCellTLX(columnIndex),
      cellTLX = startCellTLX;
    var cellTLY = this.getCellTLY(rowIndex);
    while (cellTLY < bottomBound && cellIdx <= lastIdx) {
      if (this.table.isValidCellIdx(cellIdx)) {
        var cell = table.getCell(cellIdx, true);
        this.visibleCells.set(cell);
        if (!this.preVisibleCells.contains(cell)) {
          this.showCell(cell);
        }
        var x, y;
        if (this.scrollMode === 0) {
          x = cellTLX;
          y = cellTLY;
        } else {
          x = cellTLY;
          y = cellTLX;
        }
        if (cell.cellContainerAlign == null) {
          cell.setXY(x, y);
        } else {
          var cellContainer = cell.getContainer();
          AlignIn(cellContainer, x, y, cell.width, cell.height, cell.cellContainerAlign);
          cell.setXY(cellContainer.x, cellContainer.y);
        }
      }
      if (cellTLX < rightBound && columnIndex < lastColIdx) {
        cellTLX += table.getColWidth(columnIndex);
        columnIndex += 1;
      } else {
        cellTLX = startCellTLX;
        cellTLY += table.getRowHeight(rowIndex);
        columnIndex = startColumnIndex;
        rowIndex += 1;
      }
      cellIdx = table.colRowToCellIndex(columnIndex, rowIndex);
    }
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

  var HideCells = function HideCells() {
    var preList = this.preVisibleCells;
    var curList = this.visibleCells;
    preList.iterate(function (cell) {
      if (!curList.contains(cell)) {
        this.hideCell(cell);
      }
    }, this);
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

  var UpdateTable = function UpdateTable(refresh) {
    if (refresh === undefined) {
      refresh = false;
    }
    if (refresh) {
      ClearVisibleCellIndexes.call(this);
      this.hideCells();
    }
    ClearVisibleCellIndexes.call(this);
    this.showCells();
    this.hideCells();
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
    var rowIdx = table.heightToRowIndex(-offsetTableOY, 0);
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
  };

  // For when you absolutely know this Set won't be modified during the iteration
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
    }
    // out-of-range
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
    showCells: ShowCells,
    showCell: ShowCell,
    getCellTLX: GetCellTLX,
    getCellTLY: GetCellTLY,
    hideCells: HideCells,
    hideCell: HideCell,
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
    function GridTable(scene, x, y, width, height, config) {
      var _this;
      _classCallCheck(this, GridTable);
      if (config === undefined) {
        config = {};
      }
      _this = _callSuper(this, GridTable, [scene, x, y, width, height]);
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
      if (GetValue$1(config, 'enableLayer', false)) {
        _this.enableLayer();
      }
      _this.setupChildrenMask(GetValue$1(config, 'mask', undefined));
      _this.setScrollMode(GetValue$1(config, 'scrollMode', 0));
      _this.setClampMode(GetValue$1(config, 'clamplTableOXY', true));

      // Pre-process cell size
      var cellWidth, cellHeight, columns;
      var scrollY = _this.scrollMode === 0;
      if (scrollY) {
        // scroll y
        cellWidth = config.cellWidth;
        cellHeight = config.cellHeight;
        columns = config.columns;
      } else {
        // scroll x
        cellWidth = config.cellHeight;
        cellHeight = config.cellWidth;
        columns = GetValue$1(config, 'rows', config.columns);
      }
      if (!columns) {
        columns = 1; // Default columns
      }
      _this.expandCellSize = cellWidth === undefined;
      if (_this.expandCellSize) {
        var width = scrollY ? _this.width : _this.height;
        cellWidth = width / columns;
      }
      config.cellWidth = cellWidth;
      config.cellHeight = cellHeight;
      config.columns = columns;
      _this.table = new Table(_assertThisInitialized(_this), config);
      _this.updateTable();
      return _this;
    }
    _createClass(GridTable, [{
      key: "destroy",
      value: function destroy(fromScene) {
        // preDestroy method does not have fromScene parameter
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
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
      key: "setTableOXByPercentage",
      value: function setTableOXByPercentage(percentage) {
        this.setTableOX(-this.tableVisibleWidth * percentage);
        return this;
      }
    }, {
      key: "getTableOXPercentage",
      value: function getTableOXPercentage() {
        var tableVisibleWidth = this.tableVisibleWidth;
        if (tableVisibleWidth === 0) {
          return 0;
        }
        return this.tableOX / -tableVisibleWidth;
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
      key: "s",
      get: function get() {
        return this.getTableOXPercentage();
      },
      set: function set(value) {
        this.setTableOXByPercentage(value).updateTable();
      }
    }, {
      key: "scrollToBottom",
      value: function scrollToBottom() {
        this.t = 1;
        // t will be 0 if table does not exceed visible area
        if (this.t === 0) {
          return this;
        }

        // Table height might be expanded while cells are visible        
        do {
          this.t = 1;
        } while (this.t !== 1);
        return this;
      }
    }, {
      key: "scrollToRow",
      value: function scrollToRow(rowIndex) {
        // To get all height of cells
        this.scrollToBottom();
        var height = this.table.rowIndexToHeight(0, rowIndex - 1);
        this.setTableOY(-height).updateTable();
        return this;
      }
    }, {
      key: "scrollToNextRow",
      value: function scrollToNextRow(rowCount) {
        if (rowCount === undefined) {
          rowCount = 1;
        }
        this.scrollToRow(this.startRowIndex + rowCount);
        return this;
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
        var h = this.tableHeight - this.instHeight;
        if (h < 0) {
          h = 0;
        }
        return h;
      }
    }, {
      key: "tableVisibleWidth",
      get: function get() {
        var w = this.tableWidth - this.instWidth;
        if (w < 0) {
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
        this.updateTable(true);

        // Layout children-mask
        this.layoutChildrenMask();
        // Re-mask children
        this.maskChildren();
        return this;
      }
    }]);
    return GridTable;
  }(ContainerLite);

  // mixin
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
    var gameObject = new GridTable(this.scene, 0, 0, width, height, config);

    // set properties wo modify children
    gameObject.syncChildrenEnable = false;
    BuildGameObject(this.scene, gameObject, config);
    // sync properties of children
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

  var GridTablePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(GridTablePlugin, _Phaser$Plugins$BaseP);
    function GridTablePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, GridTablePlugin);
      _this = _callSuper(this, GridTablePlugin, [pluginManager]);

      //  Register our new Game Object type
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

}));
