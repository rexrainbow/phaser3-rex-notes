(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexxorplugin = factory());
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

  function encrypt(str, pwd) {
    if (pwd == null || pwd.length <= 0) {
      return null;
    }
    var prand = "";
    for (var i = 0; i < pwd.length; i++) {
      prand += pwd.charCodeAt(i).toString();
    }
    var spos = Math.floor(prand.length / 5);
    var mult = parseInt(prand.charAt(spos) + prand.charAt(spos * 2) + prand.charAt(spos * 3) + prand.charAt(spos * 4) + prand.charAt(spos * 5));
    var incr = Math.ceil(pwd.length / 2);
    var modu = Math.pow(2, 31) - 1;
    if (mult < 2) {
      return null;
    }
    var salt = Math.round(Math.random() * 1000000000) % 100000000;
    prand += salt;
    while (prand.length > 10) {
      prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
    }
    prand = (mult * prand + incr) % modu;
    var enc_chr = "";
    var enc_str = "";
    for (var i = 0; i < str.length; i++) {
      enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor(prand / modu * 255));
      if (enc_chr < 16) {
        enc_str += "0" + enc_chr.toString(16);
      } else {
        enc_str += enc_chr.toString(16);
      }
      prand = (mult * prand + incr) % modu;
    }
    salt = salt.toString(16);
    while (salt.length < 8) {
      salt = 0 + salt;
    }
    enc_str += salt;
    return enc_str;
  }
  function Encrypt (src, pwd) {
    src = escape(src);
    pwd = escape(pwd.toString());
    return encrypt(src, pwd);
  }

  function decrypt(str, pwd) {
    if (str == null || str.length < 8) {
      return null;
    }
    if (pwd == null || pwd.length <= 0) {
      return;
    }
    var prand = "";
    for (var i = 0; i < pwd.length; i++) {
      prand += pwd.charCodeAt(i).toString();
    }
    var spos = Math.floor(prand.length / 5);
    var mult = parseInt(prand.charAt(spos) + prand.charAt(spos * 2) + prand.charAt(spos * 3) + prand.charAt(spos * 4) + prand.charAt(spos * 5));
    var incr = Math.round(pwd.length / 2);
    var modu = Math.pow(2, 31) - 1;
    var salt = parseInt(str.substring(str.length - 8, str.length), 16);
    str = str.substring(0, str.length - 8);
    prand += salt;
    while (prand.length > 10) {
      prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
    }
    prand = (mult * prand + incr) % modu;
    var enc_chr = "";
    var enc_str = "";
    for (var i = 0; i < str.length; i += 2) {
      enc_chr = parseInt(parseInt(str.substring(i, i + 2), 16) ^ Math.floor(prand / modu * 255));
      enc_str += String.fromCharCode(enc_chr);
      prand = (mult * prand + incr) % modu;
    }
    return enc_str;
  }
  function Decrypt (data, pwd) {
    pwd = escape(pwd.toString());
    var result = decrypt(data, pwd);
    if (result != null) {
      result = unescape(result);
    }
    return result;
  }

  var XOR = {
    Encrypt: Encrypt,
    Decrypt: Decrypt
  };

  var XORPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(XORPlugin, _Phaser$Plugins$BaseP);
    function XORPlugin(pluginManager) {
      _classCallCheck(this, XORPlugin);
      return _callSuper(this, XORPlugin, [pluginManager]);
    }
    _createClass(XORPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return XORPlugin;
  }(Phaser.Plugins.BasePlugin); // mixin
  Object.assign(XORPlugin.prototype, XOR);

  return XORPlugin;

}));
