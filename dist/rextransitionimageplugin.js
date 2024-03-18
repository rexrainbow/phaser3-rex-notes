(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextransitionimageplugin = factory());
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

  var GameObjectClass = Phaser.GameObjects.GameObject;
  var IsGameObject = function IsGameObject(object) {
    return object instanceof GameObjectClass;
  };

  var GetValue$c = Phaser.Utils.Objects.GetValue;
  var Snapshot = function Snapshot(config) {
    if (!config) {
      return;
    }
    var gameObjects = config.gameObjects;
    var renderTexture = config.renderTexture; // renderTexture, or dynamicTexture
    var saveTexture = config.saveTexture;
    var x = GetValue$c(config, 'x', undefined);
    var y = GetValue$c(config, 'y', undefined);
    var width = GetValue$c(config, 'width', undefined);
    var height = GetValue$c(config, 'height', undefined);
    var originX = GetValue$c(config, 'originX', 0);
    var originY = GetValue$c(config, 'originY', 0);
    var padding = GetValue$c(config, 'padding', 0);
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

  var GetValue$b = Phaser.Utils.Objects.GetValue;
  var DrawBounds$1 = function DrawBounds(gameObjects, graphics, config) {
    var strokeColor, lineWidth, fillColor, fillAlpha, padding;
    if (typeof config === 'number') {
      strokeColor = config;
    } else {
      strokeColor = GetValue$b(config, 'color');
      lineWidth = GetValue$b(config, 'lineWidth');
      fillColor = GetValue$b(config, 'fillColor');
      fillAlpha = GetValue$b(config, 'fillAlpha', 1);
      padding = GetValue$b(config, 'padding', 0);
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

  var GetValue$a = Phaser.Utils.Objects.GetValue;
  var DrawBounds = function DrawBounds(graphics, config) {
    var drawContainer = GetValue$a(config, 'drawContainer', true);
    var gameObjects = GetValue$a(config, 'children');
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

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$9(config, 'eventEmitter', true));

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

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);
    function TickTask(parent, config) {
      var _this;
      _classCallCheck(this, TickTask);
      _this = _callSuper(this, TickTask, [parent, config]);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;
      _this.setTickingMode(GetValue$8(config, 'tickingMode', 1));
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

  var GetValue$7 = Phaser.Utils.Objects.GetValue;
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
      _this.tickEventName = GetValue$7(config, 'tickEventName', defaultEventName);
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

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var Clamp$1 = Phaser.Math.Clamp;
  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);
      this.resetFromJSON(config);
    }
    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$6(o, 'state', IDLE);
        this.timeScale = GetValue$6(o, 'timeScale', 1);
        this.delay = GetValue$6(o, 'delay', 0);
        this.repeat = GetValue$6(o, 'repeat', 0);
        this.repeatCounter = GetValue$6(o, 'repeatCounter', 0);
        this.repeatDelay = GetValue$6(o, 'repeatDelay', 0);
        this.duration = GetValue$6(o, 'duration', 0);
        this.nowTime = GetValue$6(o, 'nowTime', 0);
        this.justRestart = GetValue$6(o, 'justRestart', false);
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
        return Clamp$1(t, 0, 1);
      },
      set: function set(value) {
        value = Clamp$1(value, -1, 1);
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

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
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
        this.timer.resetFromJSON(GetValue$5(o, 'timer'));
        this.setEnable(GetValue$5(o, 'enable', true));
        this.setTarget(GetValue$5(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue$1(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$1(o, 'duration', 1000));
        this.setEase(GetValue$5(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$5(o, 'repeat', 0));
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

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var Linear = Phaser.Math.Linear;
  var EaseValueTask = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(EaseValueTask, _EaseValueTaskBase);
    function EaseValueTask(gameObject, config) {
      var _this;
      _classCallCheck(this, EaseValueTask);
      _this = _callSuper(this, EaseValueTask, [gameObject, config]);
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
        this.propertyKey = GetValue$4(config, 'key', 'value');
        var currentValue = target[this.propertyKey];
        this.fromValue = GetValue$4(config, 'from', currentValue);
        this.toValue = GetValue$4(config, 'to', currentValue);
        this.setEase(GetValue$4(config, 'ease', this.ease));
        this.setDuration(GetValue$4(config, 'duration', this.duration));
        this.setRepeat(GetValue$4(config, 'repeat', 0));
        this.setDelay(GetValue$4(config, 'delay', 0));
        this.setRepeatDelay(GetValue$4(config, 'repeatDelay', 0));
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

  var IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$3 = Phaser.Utils.Objects.GetValue;
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
      if (IsPlainObject$2(texture)) {
        var config = texture;
        texture = GetValue$3(config, 'key', undefined);
        frame = GetValue$3(config, 'frame', undefined);
        mode = GetValue$3(config, 'mode');
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
      if (IsPlainObject$2(name)) {
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

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
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
      out.left = GetValue$2(config, 'left', 0);
      out.right = GetValue$2(config, 'right', 0);
      out.top = GetValue$2(config, 'top', 0);
      out.bottom = GetValue$2(config, 'bottom', 0);
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
      gameObject.resize(this.width, this.height).setOrigin(this.originX, this.originY).setPosition(0, 0).setScale(1).setVisible(false);
      this.addLocal(gameObject);
      this.maskGameObject = gameObject;
      if (!gameObject._maskObject) {
        gameObject._maskObject = gameObject.createGeometryMask();
        gameObject.once('destroy', function () {
          gameObject._maskObject.destroy();
          gameObject._maskObject = undefined;
        });
      }
      this.childrenMask = gameObject._maskObject;
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
        this.childrenMask.setInvertAlpha(invertAlpha);
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
    if (_typeof(baseFrameName) === 'object') {
      baseFrameName = baseFrameName.name;
    }
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

  var GenerateFrames = function GenerateFrames(scene, key, frame, columns, rows, getFrameNameCallback) {
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
    var frameCutX = baseFrame.cutX,
      frameCutY = baseFrame.cutY;
    var offsetX = 0,
      offsetY = 0;
    for (var y = 0; y < rows; y++) {
      offsetX = 0;
      for (var x = 0; x < columns; x++) {
        cellName = getFrameNameCallback(x, y);
        cellX = offsetX + frameCutX;
        cellY = offsetY + frameCutY;
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

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var DefaultImageClass = Phaser.GameObjects.Image;
  var IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
  var RotateAround = Phaser.Math.RotateAround;
  var GridCutImage = function GridCutImage(gameObject, columns, rows, config) {
    if (IsPlainObject$1(columns)) {
      config = columns;
      columns = GetValue$1(config, 'columns', 1);
      rows = GetValue$1(config, 'rows', 1);
    }
    var createImageCallback = GetValue$1(config, 'createImageCallback');
    if (!createImageCallback) {
      var ImageClass = GetValue$1(config, 'ImageClass', DefaultImageClass);
      createImageCallback = function createImageCallback(scene, key, frame) {
        return new ImageClass(scene, 0, 0, key, frame);
      };
    }
    var originX = GetValue$1(config, 'originX', 0.5);
    var originY = GetValue$1(config, 'originY', 0.5);
    var addToScene = GetValue$1(config, 'add', true);
    var align = GetValue$1(config, 'align', addToScene);
    var imageObjectPool = GetValue$1(config, 'objectPool', undefined);
    var scene = gameObject.scene;
    var texture = gameObject.texture;
    var frame = gameObject.frame;
    var result = GenerateFrames(scene, texture, frame, columns, rows);
    var getFrameNameCallback = result.getFrameNameCallback;
    var scaleX = gameObject.scaleX,
      scaleY = gameObject.scaleY;
    var rotation = gameObject.rotation;
    var topLeft = gameObject.getTopLeft(),
      startX = topLeft.x,
      startY = topLeft.y;
    var cellGameObjects = [];
    var scaleCellWidth = result.cellWidth * scaleX,
      scaleCellHeight = result.cellHeight * scaleY;
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
        if (align) {
          var cellTLX = startX + scaleCellWidth * x;
          var cellTLY = startY + scaleCellHeight * y;
          var cellX = cellTLX + originX * scaleCellWidth;
          var cellY = cellTLY + originY * scaleCellHeight;
          cellGameObject.setOrigin(originX, originY).setPosition(cellX, cellY).setScale(scaleX, scaleY).setRotation(rotation);
          RotateAround(cellGameObject, startX, startY, rotation);
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

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;
  var TransitionImage = /*#__PURE__*/function (_Container) {
    _inherits(TransitionImage, _Container);
    function TransitionImage(scene, x, y, texture, frame, config) {
      var _this;
      _classCallCheck(this, TransitionImage);
      if (IsPlainObject(x)) {
        config = x;
        x = GetValue(config, 'x', 0);
        y = GetValue(config, 'y', 0);
        texture = GetValue(config, 'key', undefined);
        frame = GetValue(config, 'frame', undefined);
      } else if (IsPlainObject(frame)) {
        config = frame;
        frame = undefined;
      }
      var backImage = GetValue(config, 'back', undefined);
      var frontImage = GetValue(config, 'front', undefined);
      if (!backImage) {
        backImage = scene.add.image(x, y, texture, frame);
      }
      if (!frontImage) {
        frontImage = scene.add.image(x, y, texture, frame);
      }
      var width = GetValue(config, 'width', frontImage.width);
      var height = GetValue(config, 'height', frontImage.height);
      _this = _callSuper(this, TransitionImage, [scene, x, y, width, height]);
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
      var onStart = GetValue(config, 'onStart', undefined);
      var onProgress = GetValue(config, 'onProgress', undefined);
      var onComplete = GetValue(config, 'onComplete', undefined);
      var dir = GetValue(config, 'dir', 0);
      if (onStart === undefined && onProgress === undefined && onComplete === undefined) {
        onStart = OnStart;
        onProgress = OnProgress;
        onComplete = OnComplete;
        dir = 0;
      }
      _this.setTransitionStartCallback(onStart, GetValue(config, 'onStartScope', undefined)).setTransitionProgressCallback(onProgress, GetValue(config, 'onProgressScope', undefined)).setTransitionCompleteCallback(onComplete, GetValue(config, 'onCompleteScope', undefined)).setTransitionDirection(dir).setDuration(GetValue(config, 'duration', 1000)).setEaseFunction(GetValue(config, 'ease', 'Linear'));
      var maskGameObject = GetValue(config, 'mask', undefined);
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
        value = Clamp(value, 0, 1);
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

  function Factory (x, y, texture, frame, config) {
    var gameObject = new TransitionImage(this.scene, x, y, texture, frame, config);
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
    var gameObject = new TransitionImage(this.scene, 0, 0, key, frame, config);
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

  var TransitionImagePlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(TransitionImagePlugin, _Phaser$Plugins$BaseP);
    function TransitionImagePlugin(pluginManager) {
      var _this;
      _classCallCheck(this, TransitionImagePlugin);
      _this = _callSuper(this, TransitionImagePlugin, [pluginManager]);

      //  Register our new Game Object type
      pluginManager.registerGameObject('rexTransitionImage', Factory, Creator);
      return _this;
    }
    _createClass(TransitionImagePlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return TransitionImagePlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.GameObjects.TransitionImage', TransitionImage);

  return TransitionImagePlugin;

}));
