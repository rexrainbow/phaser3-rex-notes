(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextouchhelperplugin = factory());
}(this, (function () { 'use strict';

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

  var HitTest$1 = function HitTest(scene, topOnly, gameObjects, pointers, out) {
    var inputPlugin = scene.input;
    var inputManager = inputPlugin.manager;

    if (topOnly === undefined) {
      topOnly = inputPlugin.topOnly;
    }

    if (out === undefined) {
      out = [];
    }

    if (gameObjects === undefined) {
      gameObjects = inputPlugin._list;
    }

    var pointersTotal, pointer;

    if (pointers === undefined) {
      pointers = inputManager.pointers;
      pointersTotal = inputManager.pointersTotal;
    }

    if (pointersTotal === undefined) {
      pointersTotal = pointers.length;
    }

    var cameras;

    for (var pointerIdx = 0; pointerIdx < pointersTotal; pointerIdx++) {
      pointer = pointers[pointerIdx];
      cameras = inputPlugin.cameras.getCamerasBelowPointer(pointer);

      for (var cameraIdx = 0, camerasTotal = cameras.length; cameraIdx < camerasTotal; cameraIdx++) {
        var _out;

        (_out = out).push.apply(_out, _toConsumableArray(inputManager.hitTest(pointer, gameObjects, cameras[cameraIdx])));
      }
    }

    inputPlugin.sortGameObjects(out);

    if (topOnly) {
      if (out.length) {
        out.splice(1);
      }
    }

    return out;
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

  var TouchHelperPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(TouchHelperPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(TouchHelperPlugin);

    function TouchHelperPlugin(pluginManager) {
      _classCallCheck(this, TouchHelperPlugin);

      return _super.call(this, pluginManager);
    }

    _createClass(TouchHelperPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(TouchHelperPlugin.prototype), "destroy", this).call(this);
      }
    }]);

    return TouchHelperPlugin;
  }(Phaser.Plugins.BasePlugin);

  var methods = {
    hitTest: HitTest$1,
    isPointerInHitArea: IsPointerInHitArea,
    isPointerInBounds: IsPointerInBounds
  }; // mixin

  Object.assign(TouchHelperPlugin.prototype, methods);

  return TouchHelperPlugin;

})));
