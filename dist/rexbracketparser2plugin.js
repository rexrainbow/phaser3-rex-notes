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

  // https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js

  var EscapeRegex = function EscapeRegex(s) {
    return s.replace(re0, '\\$&').replace(re1, '\\x2d');
  };
  var re0 = /[|\\{}()[\]^$+*?.]/g;
  var re1 = /-/g;

  var BracketParser$1 = /*#__PURE__*/function () {
    function BracketParser(config) {
      _classCallCheck(this, BracketParser);
      // Event emitter
      this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

      // Value convert
      this.setValueConverter(GetValue(config, 'valueConvert', true));
      // Loop
      this.setLoopEnable(GetValue(config, 'loop', false));

      // Brackets and generate regex
      this.setMultipleLinesTagEnable(GetValue(config, 'multipleLinesTag', false));
      var delimiters = GetValue(config, 'delimiters', '<>');
      this.setDelimiters(delimiters[0], delimiters[1]);

      // Translate tagName callback
      this.setTranslateTagNameCallback(GetValue(config, 'translateTagNameCallback'));
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
      key: "setMultipleLinesTagEnable",
      value: function setMultipleLinesTagEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.multipleLinesTagEnable = enable;
        return this;
      }

      // Override
    }, {
      key: "setDelimiters",
      value: function setDelimiters(delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
          delimiterRight = delimiterLeft[1];
          delimiterLeft = delimiterLeft[0];
        }
        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;
        delimiterLeft = EscapeRegex(this.delimiterLeft);
        delimiterRight = EscapeRegex(this.delimiterRight);
        var flag = this.multipleLinesTagEnable ? 'gs' : 'gi';
        this.reSplit = RegExp("".concat(delimiterLeft, "(.+?)").concat(delimiterRight), flag);
        return this;
      }
    }, {
      key: "setTranslateTagNameCallback",
      value: function setTranslateTagNameCallback(callback) {
        this.translateTagNameCallback = callback;
        return this;
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

      // Override
    }, {
      key: "onTag",
      value: function onTag(tagContent) {}
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
  Object.assign(BracketParser$1.prototype, EventEmitterMethods);

  var ParseValue = function ParseValue(text, valueConverter) {
    if (text == null) {
      return null;
    }
    var lastTextIndex = text.length - 1;
    var firstChar = text.charAt(0);
    var lastChar = text.charAt(lastTextIndex);
    if (firstChar === '"' && lastChar === '"' || firstChar === '"' && lastChar === '"') {
      // Is a quotes string
      return text.substring(1, lastTextIndex);
    } else if (firstChar === '[' && lastChar === ']' || firstChar === '{' && lastChar === '}') {
      // Is an array or a dictionary
      try {
        return JSON.parse(text);
      } catch (_unused) {
        return text;
      }
    }
    return valueConverter(text);
  };

  var BracketParser = /*#__PURE__*/function (_BracketParserBase) {
    _inherits(BracketParser, _BracketParserBase);
    var _super = _createSuper(BracketParser);
    function BracketParser(config) {
      _classCallCheck(this, BracketParser);
      if (config === undefined) {
        config = {};
      }
      if (!config.hasOwnProperty('multipleLinesTag')) {
        config.multipleLinesTag = true;
      }
      return _super.call(this, config);
    }
    _createClass(BracketParser, [{
      key: "setDelimiters",
      value: function setDelimiters(delimiterLeft, delimiterRight) {
        _get(_getPrototypeOf(BracketParser.prototype), "setDelimiters", this).call(this, delimiterLeft, delimiterRight);
        this.reTagName = RegExp(reTagName, 'i');
        this.reParamPair = RegExp(reParamPair, 'gi');
        return this;
      }
    }, {
      key: "onTag",
      value: function onTag(tagContent) {
        var regexResult = tagContent.match(this.reTagName);
        var tagName = regexResult[1];
        if (this.translateTagNameCallback) {
          tagName = this.translateTagNameCallback(tagName);
        }
        this.reParamPair.lastIndex = regexResult.index + regexResult[0].length;
        var payload = {};
        while (true) {
          var regexResult = this.reParamPair.exec(tagContent);
          if (!regexResult) {
            break;
          }
          payload[regexResult[1]] = ParseValue(regexResult[2], this.valueConverter);
        }
        var isEndTag = tagName.charAt(0) === '/';
        if (isEndTag) {
          tagName = tagName.substring(1, tagName.length);
        }
        var eventPrefix = isEndTag ? '-' : '+';
        this.skipEventFlag = false;
        this.emit("".concat(eventPrefix).concat(tagName), payload);
        if (!this.skipEventFlag) {
          this.emit(eventPrefix, tagName, payload);
        }
        if (!isEndTag) {
          this.lastTagStart = tagName;
        } else {
          this.lastTagEnd = tagName;
        }
      }
    }]);
    return BracketParser;
  }(BracketParser$1);
  var CreateQuotesExpression = function CreateQuotesExpression(leftQuote, rightQuote) {
    if (rightQuote === undefined) {
      rightQuote = leftQuote;
    }
    leftQuote = EscapeRegex(leftQuote);
    rightQuote = EscapeRegex(rightQuote);
    return "".concat(leftQuote, "[^").concat(leftQuote).concat(rightQuote, "]+").concat(rightQuote);
  };
  var varName = "[^ =\n]+"; // Any character except space ,'=', and '\n'
  var varStringValue = "".concat(CreateQuotesExpression('"'), "|").concat(CreateQuotesExpression("'"));
  var varArrayValue = CreateQuotesExpression('[', ']');
  var varDictionaryValue = CreateQuotesExpression('{', '}');
  var varValue = "".concat(varStringValue, "|").concat(varArrayValue, "|").concat(varDictionaryValue, "|").concat(varName); // Any character except '='
  var escapeSpace = "[ \n]*";
  var reTagName = "".concat(escapeSpace, "(").concat(varName, ")").concat(escapeSpace);
  var reParamPair = "(".concat(varName, ")").concat(escapeSpace, "=").concat(escapeSpace, "(").concat(varValue, ")").concat(escapeSpace);

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
