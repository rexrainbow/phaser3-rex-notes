(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexpngappenderplugin = factory());
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
        var data = this.buf.slice(this.pointer, this.pointer + size);
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
    var reader = new Uint8ArrayReader(pngBuffer);
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

    // JSON -> string -> Uint8Array
    var dataUint8Array;
    if (data != null) {
      dataUint8Array = new TextEncoder().encode(JSON.stringify(data));
    } else {
      dataUint8Array = [];
    }

    // Append dataUint8Array after png-chunks  
    var writer = new Uint8ArrayWriter(pngByteLength + dataUint8Array.length).writeUint8Array(pngBuffer.slice(0, pngByteLength)).writeUint8Array(dataUint8Array);
    return writer.buf;
  };

  var ExtractData = function ExtractData(pngBuffer) {
    // Get End of last png chunk (IEND)        
    var pngByteLength = GetChunkEndByteIndex(pngBuffer, 'IEND');
    // Uint8Array -> string -> JSON
    var data = pngBuffer.slice(pngByteLength);
    if (data.length === 0) {
      return null;
    }
    data = new TextDecoder().decode(data);
    data = JSON.parse(data);
    return data;
  };

  var PNGAppender = {
    append: AppendData,
    extract: ExtractData
  };

  var PNGAppenderPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(PNGAppenderPlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(PNGAppenderPlugin);
    function PNGAppenderPlugin(pluginManager) {
      _classCallCheck(this, PNGAppenderPlugin);
      return _super.call(this, pluginManager);
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
