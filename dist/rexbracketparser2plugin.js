(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexbracketparser2plugin = factory());
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

  // https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js

  var EscapeRegex = function EscapeRegex(s) {
    return s.replace(re0, '\\$&').replace(re1, '\\x2d');
  };
  var re0 = /[|\\{}()[\]^$+*?.]/g;
  var re1 = /-/g;

  var ParseValue = function ParseValue(text, valueConverter) {
    if (text == null) {
      return null;
    }
    var firstChar = text.charAt(0);
    if (firstChar === '"' || firstChar === "'") {
      return text.substring(1, text.length - 1);
    }
    return valueConverter(text);
  };

  var TokenExpressionMethods = {
    setDelimiters: function setDelimiters(delimiterLeft, delimiterRight) {
      if (delimiterRight === undefined) {
        delimiterRight = delimiterLeft[1];
        delimiterLeft = delimiterLeft[0];
      }
      this.delimiterLeft = delimiterLeft;
      this.delimiterRight = delimiterRight;
      delimiterLeft = EscapeRegex(delimiterLeft);
      delimiterRight = EscapeRegex(delimiterRight);
      var varName = "[^ =\n]+"; // Any character except space ,'=', and '\n'
      var varStringValue = "'[^']+'|\"[^\"]+\"";
      var varValue = "".concat(varStringValue, "|").concat(varName); // Any character except '='
      var escapeSpace = "[ \n]*";
      this.reCmdName = RegExp("".concat(escapeSpace, "(").concat(varName, ")").concat(escapeSpace), 'i');
      this.reValuePair = RegExp("(".concat(varName, ")").concat(escapeSpace, "=").concat(escapeSpace, "(").concat(varValue, ")").concat(escapeSpace), 'gi');
      var commandString = "[^".concat(delimiterLeft).concat(delimiterRight, "]+"); // Any character except delimiter
      this.reSplit = RegExp("".concat(delimiterLeft, "(").concat(commandString, ")").concat(delimiterRight), 'gi');
      return this;
    },
    parseTag: function parseTag(tagContent) {
      var regexResult = tagContent.match(this.reCmdName);
      var name = regexResult[1];
      tagContent = tagContent.substring(regexResult[0].length, tagContent.length);
      var payload = {};
      while (true) {
        var regexResult = this.reValuePair.exec(tagContent);
        if (!regexResult) {
          break;
        }
        payload[regexResult[1]] = ParseValue(regexResult[2], this.valueConverter);
      }
      return {
        name: name,
        payload: payload
      };
    }
  };

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
      if (s === 'false') {
        s = false;
      } else if (s === 'true') {
        s = true;
      }
    }
    return s;
  };

  var BracketParser = /*#__PURE__*/function () {
    function BracketParser(config) {
      _classCallCheck(this, BracketParser);
      // Event emitter
      this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

      // Brackets and generate regex
      var delimiters = GetValue(config, 'delimiters', '<>');
      this.setDelimiters(delimiters[0], delimiters[1]);
      // Value convert
      this.setValueConverter(GetValue(config, 'valueConvert', true));
      // Loop
      this.setLoopEnable(GetValue(config, 'loop', false));
      this.isRunning = false;
      this.isPaused = false;
      this.skipEventFlag = false;
      this.justCompleted = false;
      this.lastTagStart = null;
      this.lastTagEnd = null;
      this.lastContent = null;
    }
    _createClass(BracketParser, [{
      key: "shutdown",
      value: function shutdown() {
        this.destroyEventEmitter();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.shutdown();
      }
    }, {
      key: "setValueConverter",
      value: function setValueConverter(converter) {
        if (converter === true) {
          converter = TypeConvert;
        } else if (!converter) {
          converter = BypassValueConverter;
        }
        this.valueConverter = converter;
        return this;
      }
    }, {
      key: "setLoopEnable",
      value: function setLoopEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.loopEnable = enable;
        return this;
      }
    }, {
      key: "setSource",
      value: function setSource(source) {
        this.source = source;
        return this;
      }
    }, {
      key: "resetIndex",
      value: function resetIndex(index) {
        if (index === undefined) {
          index = 0;
        }
        this.progressIndex = index;
        this.reSplit.lastIndex = index;
        this.lastTagStart = null;
        this.lastTagEnd = null;
        this.lastContent = null;
        this.justCompleted = false;
        this.isRunning = false;
        return this;
      }
    }, {
      key: "start",
      value: function start(source) {
        this.setSource(source).restart();
        return this;
      }
    }, {
      key: "restart",
      value: function restart() {
        this.resetIndex().next();
      }
    }, {
      key: "next",
      value: function next() {
        if (this.isPaused) {
          this.onResume();
        }

        // Don't re-enter this method
        if (this.isRunning) {
          return this;
        }
        this.isRunning = true;
        if (this.justCompleted) {
          this.isRunning = false;
          return this;
        }
        if (this.reSplit.lastIndex === 0) {
          this.onStart();
        }
        var text = this.source,
          lastIndex = text.length;
        this.reSplit.lastIndex = this.progressIndex;
        while (true) {
          var regexResult = this.reSplit.exec(text);
          // No tag found, complete
          if (!regexResult) {
            if (this.progressIndex < lastIndex) {
              this.onContent(text.substring(this.progressIndex, lastIndex));
              // Might pause here
              if (this.isPaused) {
                this.progressIndex = lastIndex;
                break;
              }
            }
            this.onComplete();
            this.isRunning = false;
            return;
          }
          var matchEnd = this.reSplit.lastIndex;
          var matchStart = matchEnd - regexResult[0].length;

          // Process content between previous tag and current tag            
          if (this.progressIndex < matchStart) {
            this.onContent(text.substring(this.progressIndex, matchStart));
            // Might pause here
            if (this.isPaused) {
              this.progressIndex = matchStart;
              break;
            }
          }

          // Process current tag
          this.onTag(regexResult[1]);
          this.progressIndex = matchEnd;
          // Might pause here
          if (this.isPaused) {
            break;
          }
        }
        this.isRunning = false;
        return this;
      }
    }, {
      key: "skipEvent",
      value: function skipEvent() {
        this.skipEventFlag = true;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        if (!this.isPaused) {
          this.onPause();
        }
        return this;
      }
    }, {
      key: "pauseUntilEvent",
      value: function pauseUntilEvent(eventEmitter, eventName) {
        if (this.isPaused) {
          return this;
        }
        this.pause();
        eventEmitter.once(eventName, function () {
          this.next();
        }, this);
        return this;
      }
    }, {
      key: "onContent",
      value: function onContent(content) {
        this.skipEventFlag = false;
        this.emit('content', content);
        this.lastContent = content;
      }
    }, {
      key: "onTag",
      value: function onTag(tagContent) {
        var tag = this.parseTag(tagContent);
        var isCloseTag = tag.name.charAt(0) === '/';
        if (isCloseTag) {
          tag.name = tag.name.substring(1, tag.name.length);
        }
        var eventPrefix = isCloseTag ? '-' : '+';
        this.skipEventFlag = false;
        this.emit("".concat(eventPrefix).concat(tag.name), tag.payload);
        if (!this.skipEventFlag) {
          this.emit(eventPrefix, tag.name, tag.payload);
        }
        if (!isCloseTag) {
          this.lastTagStart = tag;
        } else {
          this.lastTagEnd = tag;
        }
      }
    }, {
      key: "onStart",
      value: function onStart() {
        this.isRunning = true;
        this.emit('start', this);
      }
    }, {
      key: "onComplete",
      value: function onComplete() {
        this.isRunning = false;
        this.justCompleted = true;
        this.emit('complete', this);
        if (this.loopEnable) {
          this.resetIndex();
        }
      }
    }, {
      key: "onPause",
      value: function onPause() {
        this.isPaused = true;
        this.emit('pause', this);
      }
    }, {
      key: "onResume",
      value: function onResume() {
        this.isPaused = false;
        this.emit('resume', this);
      }
    }]);
    return BracketParser;
  }();
  var BypassValueConverter = function BypassValueConverter(s) {
    return s;
  };
  Object.assign(BracketParser.prototype, EventEmitterMethods, TokenExpressionMethods);

  var BracketParserPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(BracketParserPlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(BracketParserPlugin);
    function BracketParserPlugin(pluginManager) {
      _classCallCheck(this, BracketParserPlugin);
      return _super.call(this, pluginManager);
    }
    _createClass(BracketParserPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(config) {
        return new BracketParser(config);
      }
    }]);
    return BracketParserPlugin;
  }(Phaser.Plugins.BasePlugin);

  return BracketParserPlugin;

}));