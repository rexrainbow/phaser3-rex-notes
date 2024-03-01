(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlzstringplugin = factory());
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

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var lzString_min = {exports: {}};

  lzString_min.exports;
  (function (module) {
    var LZString = function () {
      function o(o, r) {
        if (!t[o]) {
          t[o] = {};
          for (var n = 0; n < o.length; n++) t[o][o.charAt(n)] = n;
        }
        return t[o][r];
      }
      var r = String.fromCharCode,
        n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
        t = {},
        i = {
          compressToBase64: function compressToBase64(o) {
            if (null == o) return "";
            var r = i._compress(o, 6, function (o) {
              return n.charAt(o);
            });
            switch (r.length % 4) {
              default:
              case 0:
                return r;
              case 1:
                return r + "===";
              case 2:
                return r + "==";
              case 3:
                return r + "=";
            }
          },
          decompressFromBase64: function decompressFromBase64(r) {
            return null == r ? "" : "" == r ? null : i._decompress(r.length, 32, function (e) {
              return o(n, r.charAt(e));
            });
          },
          compressToUTF16: function compressToUTF16(o) {
            return null == o ? "" : i._compress(o, 15, function (o) {
              return r(o + 32);
            }) + " ";
          },
          decompressFromUTF16: function decompressFromUTF16(o) {
            return null == o ? "" : "" == o ? null : i._decompress(o.length, 16384, function (r) {
              return o.charCodeAt(r) - 32;
            });
          },
          compressToUint8Array: function compressToUint8Array(o) {
            for (var r = i.compress(o), n = new Uint8Array(2 * r.length), e = 0, t = r.length; t > e; e++) {
              var s = r.charCodeAt(e);
              n[2 * e] = s >>> 8, n[2 * e + 1] = s % 256;
            }
            return n;
          },
          decompressFromUint8Array: function decompressFromUint8Array(o) {
            if (null === o || void 0 === o) return i.decompress(o);
            for (var n = new Array(o.length / 2), e = 0, t = n.length; t > e; e++) n[e] = 256 * o[2 * e] + o[2 * e + 1];
            var s = [];
            return n.forEach(function (o) {
              s.push(r(o));
            }), i.decompress(s.join(""));
          },
          compressToEncodedURIComponent: function compressToEncodedURIComponent(o) {
            return null == o ? "" : i._compress(o, 6, function (o) {
              return e.charAt(o);
            });
          },
          decompressFromEncodedURIComponent: function decompressFromEncodedURIComponent(r) {
            return null == r ? "" : "" == r ? null : (r = r.replace(/ /g, "+"), i._decompress(r.length, 32, function (n) {
              return o(e, r.charAt(n));
            }));
          },
          compress: function compress(o) {
            return i._compress(o, 16, function (o) {
              return r(o);
            });
          },
          _compress: function _compress(o, r, n) {
            if (null == o) return "";
            var e,
              t,
              i,
              s = {},
              p = {},
              u = "",
              c = "",
              a = "",
              l = 2,
              f = 3,
              h = 2,
              d = [],
              m = 0,
              v = 0;
            for (i = 0; i < o.length; i += 1) if (u = o.charAt(i), Object.prototype.hasOwnProperty.call(s, u) || (s[u] = f++, p[u] = !0), c = a + u, Object.prototype.hasOwnProperty.call(s, c)) a = c;else {
              if (Object.prototype.hasOwnProperty.call(p, a)) {
                if (a.charCodeAt(0) < 256) {
                  for (e = 0; h > e; e++) m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
                  for (t = a.charCodeAt(0), e = 0; 8 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                } else {
                  for (t = 1, e = 0; h > e; e++) m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
                  for (t = a.charCodeAt(0), e = 0; 16 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                }
                l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a];
              } else for (t = s[a], e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
              l--, 0 == l && (l = Math.pow(2, h), h++), s[c] = f++, a = String(u);
            }
            if ("" !== a) {
              if (Object.prototype.hasOwnProperty.call(p, a)) {
                if (a.charCodeAt(0) < 256) {
                  for (e = 0; h > e; e++) m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
                  for (t = a.charCodeAt(0), e = 0; 8 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                } else {
                  for (t = 1, e = 0; h > e; e++) m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
                  for (t = a.charCodeAt(0), e = 0; 16 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                }
                l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a];
              } else for (t = s[a], e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
              l--, 0 == l && (l = Math.pow(2, h), h++);
            }
            for (t = 2, e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
            for (;;) {
              if (m <<= 1, v == r - 1) {
                d.push(n(m));
                break;
              }
              v++;
            }
            return d.join("");
          },
          decompress: function decompress(o) {
            return null == o ? "" : "" == o ? null : i._decompress(o.length, 32768, function (r) {
              return o.charCodeAt(r);
            });
          },
          _decompress: function _decompress(o, n, e) {
            var i,
              s,
              p,
              u,
              c,
              a,
              l,
              f = [],
              h = 4,
              d = 4,
              m = 3,
              v = "",
              w = [],
              A = {
                val: e(0),
                position: n,
                index: 1
              };
            for (i = 0; 3 > i; i += 1) f[i] = i;
            for (p = 0, c = Math.pow(2, 2), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
            switch (p) {
              case 0:
                for (p = 0, c = Math.pow(2, 8), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                l = r(p);
                break;
              case 1:
                for (p = 0, c = Math.pow(2, 16), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                l = r(p);
                break;
              case 2:
                return "";
            }
            for (f[3] = l, s = l, w.push(l);;) {
              if (A.index > o) return "";
              for (p = 0, c = Math.pow(2, m), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
              switch (l = p) {
                case 0:
                  for (p = 0, c = Math.pow(2, 8), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                  f[d++] = r(p), l = d - 1, h--;
                  break;
                case 1:
                  for (p = 0, c = Math.pow(2, 16), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                  f[d++] = r(p), l = d - 1, h--;
                  break;
                case 2:
                  return w.join("");
              }
              if (0 == h && (h = Math.pow(2, m), m++), f[l]) v = f[l];else {
                if (l !== d) return null;
                v = s + s.charAt(0);
              }
              w.push(v), f[d++] = s + v.charAt(0), h--, s = v, 0 == h && (h = Math.pow(2, m), m++);
            }
          }
        };
      return i;
    }();
    null != module && (module.exports = LZString);
  })(lzString_min);
  var lzString_minExports = lzString_min.exports;
  var lzstringBase = /*@__PURE__*/getDefaultExportFromCjs(lzString_minExports);

  var GetFastValue = Phaser.Utils.Objects.GetFastValue;
  var LZString = /*#__PURE__*/function () {
    function LZString(config) {
      _classCallCheck(this, LZString);
      this.resetFromJSON(config);
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    _createClass(LZString, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setEncoding(GetFastValue(o, 'encoding', 0));
        return this;
      }

      /**
       * Return status in JSON object
       * @returns JSON object
       */
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          encoding: this.encoding
        };
      }
    }, {
      key: "setEncoding",
      value: function setEncoding(m) {
        if (m === undefined) {
          m = 0;
        } else if (typeof m === 'string') {
          m = ENCODINGMAP[m.toLowerCase()] || 0;
        }
        this.encoding = m;
        return this;
      }
    }, {
      key: "compress",
      value: function compress(s) {
        var fnName = COMPRESSFNNAME[this.encoding];
        return lzstringBase[fnName](s);
      }
    }, {
      key: "decompress",
      value: function decompress(s) {
        var fnName = DECOMPRESSFNNAME[this.encoding];
        return lzstringBase[fnName](s);
      }
    }]);
    return LZString;
  }();
  var ENCODINGMAP = {
    none: 0,
    base64: 1,
    utf16: 2,
    uri: 3
  };
  var COMPRESSFNNAME = ['compress', 'compressToBase64', 'compressToUTF16', 'compressToEncodedURIComponent'];
  var DECOMPRESSFNNAME = ['decompress', 'decompressFromBase64', 'decompressFromUTF16', 'decompressFromEncodedURIComponent'];

  var LZStringPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(LZStringPlugin, _Phaser$Plugins$BaseP);
    function LZStringPlugin(pluginManager) {
      var _this;
      _classCallCheck(this, LZStringPlugin);
      _this = _callSuper(this, LZStringPlugin, [pluginManager]);
      _this.lzstring = new LZString();
      return _this;
    }
    _createClass(LZStringPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.lzstring = null;
        this.pluginManager = null;
        this.game = null;
        this.scene = null;
        this.systems = null;
      }
    }, {
      key: "add",
      value: function add(config) {
        return new LZString(config);
      }
    }]);
    return LZStringPlugin;
  }(Phaser.Plugins.BasePlugin);

  return LZStringPlugin;

}));
