(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexruncommandsplugin = factory());
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
  var GetValue = function GetValue(source, key, defaultValue) {
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

  var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
  var HEX = /^0x[0-9A-F]+$/i;
  var TypeConvert = function TypeConvert(s) {
    if (typeof s !== 'string') {
      return s;
    }
    if (s === '') {
      s = null;
    } else if (FLOAT.test(s)) {
      s = parseFloat(s);
    } else if (HEX.test(s)) {
      s = parseInt(s, 16);
    } else {
      switch (s) {
        case 'false':
          s = false;
          break;
        case 'true':
          s = true;
          break;
        case 'null':
          s = null;
          break;
        case 'undefined':
          s = undefined;
          break;
      }
    }
    return s;
  };

  var IsArray = function IsArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var RunCommands = function RunCommands(queue, scope, config) {
    var reverse = GetValue(config, 'reverse', false);
    var retVal;
    if (IsArray(queue[0])) {
      if (!reverse) {
        for (var i = 0, len = queue.length; i < len; i++) {
          retVal = RunCommands(queue[i], scope, config);
        }
      } else {
        for (var len = queue.length, i = len - 1; i >= 0; i--) {
          retVal = RunCommands(queue[i], scope, config);
        }
      }
    } else {
      retVal = RunCommand(queue, scope, config);
    }
    return retVal;
  };
  var RunCommand = function RunCommand(cmd, scope, config) {
    var argsConvert = GetValue(config, 'argsConvert', undefined);
    var argsConvertScope = GetValue(config, 'argsConvertScope', undefined);
    var fnName = cmd[0];
    ARGS = Copy(ARGS, cmd, 1);
    if (argsConvert) {
      // convert string to floating number, boolean, null, or string        
      if (argsConvert === true) {
        argsConvert = TypeConvert;
        argsConvertScope = undefined;
      }
      for (var i = 0, len = ARGS.length; i < len; i++) {
        if (argsConvertScope) {
          ARGS[i] = argsConvert.call(argsConvertScope, ARGS[i], cmd);
        } else {
          ARGS[i] = argsConvert(ARGS[i], cmd);
        }
      }
    }
    var fn;
    if (typeof fnName === 'string') {
      fn = scope[fnName];
      if (fn == null) {
        fn = GetValue(scope, fnName, null);
      }
    } else {
      fn = fnName;
    }
    var retValue = fn.apply(scope, ARGS);
    return retValue;
  };
  var ARGS = []; // reuse this array

  var RunCommandsPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(RunCommandsPlugin, _Phaser$Plugins$BaseP);
    function RunCommandsPlugin(pluginManager) {
      _classCallCheck(this, RunCommandsPlugin);
      return _callSuper(this, RunCommandsPlugin, [pluginManager]);
    }
    _createClass(RunCommandsPlugin, [{
      key: "run",
      value: function run(queue, scope, config) {
        return RunCommands(queue, scope, config);
      }
    }]);
    return RunCommandsPlugin;
  }(Phaser.Plugins.BasePlugin);

  return RunCommandsPlugin;

}));
