(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextintrgbplugin = factory());
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

  var GetR = function GetR(colorInt) {
    return colorInt >> 16 & 0xff;
  };

  var GetG = function GetG(colorInt) {
    return colorInt >> 8 & 0xff;
  };

  var GetB = function GetB(colorInt) {
    return colorInt & 0xff;
  };

  var MaskR = ~(0xff << 16) & 0xffffff;
  var MaskG = ~(0xff << 8) & 0xffffff;
  var MaskB = ~0xff & 0xffffff;

  var SetR = function SetR(colorInt, r) {
    return (r & 0xff) << 16 | colorInt & MaskR;
  };

  var SetG = function SetG(colorInt, g) {
    return (g & 0xff) << 8 | colorInt & MaskG;
  };

  var SetB = function SetB(colorInt, b) {
    return b & 0xff | colorInt & MaskB;
  };

  var SetRGB = function SetRGB(colorInt, r, g, b) {
    return (r & 0xff) << 16 | (g & 0xff) << 8 | b & 0xff;
  };

  var AddTintRGBProperties = function AddTintRGBProperties(gameObject, colorRGB) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('tintR')) {
      return gameObject;
    }

    if (colorRGB === undefined) {
      colorRGB = 0xffffff;
    } // Override tint property


    Object.defineProperty(gameObject, 'tint', {
      get: function get() {
        return gameObject._tintRGB;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xffffff;
        gameObject.setTint(value);

        if (gameObject._tintRGB !== value) {
          gameObject._tintRGB = value;
          gameObject._tintR = GetR(value);
          gameObject._tintG = GetG(value);
          gameObject._tintB = GetB(value); // gameObject.emit('_tintchange', value, gameObject._tintR, gameObject._tintG, gameObject._tintB);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintR', {
      get: function get() {
        return gameObject._tintR;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;

        if (gameObject._tintR !== value) {
          gameObject._tintR = value;
          gameObject._tintRGB = SetR(gameObject._tintRGB, value);
          gameObject.tint = gameObject._tintRGB;
        }
      }
    });
    Object.defineProperty(gameObject, 'tintG', {
      get: function get() {
        return gameObject._tintG;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;

        if (gameObject._tintG !== value) {
          gameObject._tintG = value;
          gameObject._tintRGB = SetG(gameObject._tintRGB, value);
          gameObject.tint = gameObject._tintRGB;
        }
      }
    });
    Object.defineProperty(gameObject, 'tintB', {
      get: function get() {
        return gameObject._tintB;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;

        if (gameObject._tintB !== value) {
          gameObject._tintB = value;
          gameObject._tintRGB = SetB(gameObject._tintRGB, value);
          gameObject.tint = gameObject._tintRGB;
        }
      }
    });
    Object.defineProperty(gameObject, 'tintGray', {
      get: function get() {
        return Math.floor((gameObject._tintR + gameObject._tintG + gameObject._tintB) / 3);
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;

        if (gameObject._tintR !== value || gameObject._tintG !== value || gameObject._tintB !== value) {
          gameObject._tintR = value;
          gameObject._tintG = value;
          gameObject._tintB = value;
          gameObject._tintRGB = SetRGB(gameObject._tintRGB, value, value, value);
          gameObject.tint = gameObject._tintRGB;
        }
      }
    });
    gameObject.tint = colorRGB;
    return gameObject;
  };

  var TintRGBPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(TintRGBPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(TintRGBPlugin);

    function TintRGBPlugin(pluginManager) {
      _classCallCheck(this, TintRGBPlugin);

      return _super.call(this, pluginManager);
    }

    _createClass(TintRGBPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject, tintRGB) {
        return AddTintRGBProperties(gameObject, tintRGB);
      }
    }]);

    return TintRGBPlugin;
  }(Phaser.Plugins.BasePlugin);

  return TintRGBPlugin;

})));
