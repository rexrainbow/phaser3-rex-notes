(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexwaiteventsplugin = factory());
})(this, (function () { 'use strict';

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

  var SetStruct = Phaser.Structs.Set;
  var WaitEvents = /*#__PURE__*/function () {
    function WaitEvents(completeCallback, scope) {
      _classCallCheck(this, WaitEvents);
      this.setCompleteCallback(completeCallback, scope);
      this.events = new SetStruct();
    }
    _createClass(WaitEvents, [{
      key: "shutdown",
      value: function shutdown() {
        this.setCompleteCallback(undefined, undefined);
        this.events.clear();
        this.event = undefined;
        return this;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
        return this;
      }
    }, {
      key: "setCompleteCallback",
      value: function setCompleteCallback(callback, scope) {
        this.completeCallback = callback;
        this.scope = scope;
        return this;
      }
    }, {
      key: "waitCallback",
      value: function waitCallback() {
        var self = this;
        var callback = function callback() {
          self.remove(callback);
        };
        this.events.set(callback);
        return callback;
      }
    }, {
      key: "waitEvent",
      value: function waitEvent(eventEmitter, eventName) {
        eventEmitter.once(eventName, this.waitCallback());
        return this;
      }
    }, {
      key: "remove",
      value: function remove(callback) {
        this.events["delete"](callback);
        if (this.noWaitEvent) {
          if (this.scope) {
            this.completeCallback.call(this.scope);
          } else {
            this.completeCallback();
          }
        }
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.events.clear();
        return this;
      }
    }, {
      key: "noWaitEvent",
      get: function get() {
        return this.events.size === 0;
      }
    }]);
    return WaitEvents;
  }();

  var WaitEventsPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(WaitEventsPlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(WaitEventsPlugin);
    function WaitEventsPlugin(pluginManager) {
      _classCallCheck(this, WaitEventsPlugin);
      return _super.call(this, pluginManager);
    }
    _createClass(WaitEventsPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(completeCallback, scope) {
        return new WaitEvents(completeCallback, scope);
      }
    }]);
    return WaitEventsPlugin;
  }(Phaser.Plugins.BasePlugin);

  return WaitEventsPlugin;

}));
