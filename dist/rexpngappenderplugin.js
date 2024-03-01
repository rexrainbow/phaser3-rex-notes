(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexpngappenderplugin = factory());
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

  var ByteArrayToUint32 = function ByteArrayToUint32(a, b, c, d, bigEndian) {
    if (bigEndian === undefined) {
      bigEndian = false;
    }
    var value;
    if (bigEndian) {
      value = a << 24 | b << 16 | c << 8 | d;
    } else {
      value = a | b << 8 | c << 16 | d << 24;
    }
    return value;
  };

  var Uint8ArrayReader = /*#__PURE__*/function () {
    function Uint8ArrayReader(buf) {
      _classCallCheck(this, Uint8ArrayReader);
      this.buf = buf;
      this.lastPointer = this.buf.length;
      this.pointer = 0;
    }
    _createClass(Uint8ArrayReader, [{
      key: "seek",
      value: function seek(value) {
        this.pointer = value;
        return this;
      }
    }, {
      key: "seekBack",
      value: function seekBack(value) {
        this.pointer -= value;
        return this;
      }
    }, {
      key: "seekForward",
      value: function seekForward(value) {
        this.pointer += value;
        return this;
      }
    }, {
      key: "readUint8",
      value: function readUint8() {
        var data = this.buf[this.pointer];
        this.pointer++;
        return data;
      }
    }, {
      key: "readUint32",
      value: function readUint32(bigEndian) {
        if (bigEndian === undefined) {
          bigEndian = false;
        }
        return ByteArrayToUint32(this.readUint8(), this.readUint8(), this.readUint8(), this.readUint8(), bigEndian);
      }
    }, {
      key: "readString",
      value: function readString(size) {
        var s = '';
        for (var i = 0; i < size; i++) {
          s += String.fromCharCode(this.readUint8());
        }
        return s;
      }
    }, {
      key: "readUint8Array",
      value: function readUint8Array(size) {
        var data;
        if (size !== undefined) {
          data = this.buf.slice(this.pointer, this.pointer + size);
        } else {
          data = this.buf.slice(this.pointer);
        }
        this.pointer += data.length;
        return data;
      }
    }, {
      key: "outOfArray",
      get: function get() {
        return this.pointer >= this.lastPointer;
      }
    }]);
    return Uint8ArrayReader;
  }();

  var GetChunkEndByteIndex = function GetChunkEndByteIndex(pngBuffer, chunkType) {
    var reader;
    if (pngBuffer instanceof Uint8ArrayReader) {
      reader = pngBuffer;
    } else {
      reader = new Uint8ArrayReader(pngBuffer);
    }
    reader.seek(8); // Skip png header
    while (!reader.outOfArray) {
      var dataLength = reader.readUint32(true);
      if (chunkType === reader.readString(4)) {
        return reader.pointer + dataLength + 4;
      } else {
        reader.seekForward(dataLength + 4);
      }
    }
    return -1;
  };

  var Uint32ToByteArray = function Uint32ToByteArray(value, bigEndian, output) {
    if (bigEndian === undefined) {
      bigEndian = false;
    }
    if (output === undefined) {
      output = [];
    }
    output.length = 4;
    if (bigEndian) {
      output[0] = value >> 24 & 0xff;
      output[1] = value >> 16 & 0xff;
      output[2] = value >> 8 & 0xff;
      output[3] = value & 0xff;
    } else {
      output[0] = value & 0xff;
      output[1] = value >> 8 & 0xff;
      output[2] = value >> 16 & 0xff;
      output[3] = value >> 24 & 0xff;
    }
    return output;
  };

  var Uint8ArrayWriter = /*#__PURE__*/function () {
    function Uint8ArrayWriter(size) {
      _classCallCheck(this, Uint8ArrayWriter);
      this.buf = new Uint8Array(size);
      this.pointer = 0;
    }
    _createClass(Uint8ArrayWriter, [{
      key: "seek",
      value: function seek(pointer) {
        this.pointer = pointer;
        return this;
      }
    }, {
      key: "writeUint8",
      value: function writeUint8(value) {
        this.buf[this.pointer] = value;
        this.pointer++;
        return this;
      }
    }, {
      key: "writeUint8Array",
      value: function writeUint8Array(buf) {
        this.buf.set(buf, this.pointer);
        this.pointer += buf.length;
        return this;
      }
    }, {
      key: "writeUint32",
      value: function writeUint32(value, bigEndian) {
        var buf = Uint32ToByteArray(value, bigEndian);
        this.writeUint8Array(buf);
        return this;
      }
    }, {
      key: "writeString",
      value: function writeString(s) {
        var buf = new TextEncoder().encode(s);
        this.writeUint8Array(buf);
        return this;
      }
    }, {
      key: "outOfArray",
      get: function get() {
        return this.pointer === this.buf.length;
      }
    }]);
    return Uint8ArrayWriter;
  }();

  var AppendData = function AppendData(pngBuffer, data) {
    // Get End of last png chunk (IEND)        
    var pngByteLength = GetChunkEndByteIndex(pngBuffer, 'IEND');
    var isUint8Array = (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && obj.constructor === Uint8Array;
    var dataType = isUint8Array ? 1 : 0;
    var header0 = dataType;
    var header1 = 0;
    var dataUint8Array;
    if (isUint8Array) {
      dataUint8Array = data;
    } else {
      if (data != null) {
        // JSON -> string -> Uint8Array
        data = JSON.stringify(data);
        dataUint8Array = new TextEncoder().encode(data);
      } else {
        dataUint8Array = new Uint8Array(0);
      }
    }

    // Append dataUint8Array after png-chunks
    var outputLength = pngByteLength + 8 + dataUint8Array.length;
    var writer = new Uint8ArrayWriter(outputLength)
    // png-buffer
    .writeUint8Array(pngBuffer.slice(0, pngByteLength))
    // header0: dataType
    .writeUint32(header0)
    // header1: 0x0
    .writeUint32(header1)
    // myData
    .writeUint8Array(dataUint8Array);
    return writer.buf;
  };

  var ExtractData = function ExtractData(pngBuffer) {
    var reader = new Uint8ArrayReader(pngBuffer);

    // Get End of last png chunk (IEND)        
    var pngByteLength = GetChunkEndByteIndex(reader, 'IEND');
    reader.seek(pngByteLength);
    if (reader.outOfArray) {
      return null;
    }

    // Get header0, header1
    var header0 = reader.readUint32();
    var dataType = header0 & 0xf;
    reader.readUint32();
    // Get myData
    var data = reader.readUint8Array();
    if (dataType === 0) {
      if (data.length === 0) {
        return null;
      } else {
        // Uint8Array -> string -> JSON
        data = new TextDecoder().decode(data);
        data = JSON.parse(data);
      }
    }
    return data;
  };

  var PNGAppender = {
    append: AppendData,
    extract: ExtractData
  };

  var PNGAppenderPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(PNGAppenderPlugin, _Phaser$Plugins$BaseP);
    function PNGAppenderPlugin(pluginManager) {
      _classCallCheck(this, PNGAppenderPlugin);
      return _callSuper(this, PNGAppenderPlugin, [pluginManager]);
    }
    _createClass(PNGAppenderPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return PNGAppenderPlugin;
  }(Phaser.Plugins.BasePlugin); // mixin
  Object.assign(PNGAppenderPlugin.prototype, PNGAppender);

  return PNGAppenderPlugin;

}));
