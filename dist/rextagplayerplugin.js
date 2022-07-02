(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextagplayerplugin = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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
  var GetValue$N = function GetValue(source, key, defaultValue) {
    if (!source || typeof source === 'number') {
      return defaultValue;
    } else if (source.hasOwnProperty(key)) {
      return source[key];
    } else if (key.indexOf('.') !== -1) {
      var keys = key.split('.');
      var parent = source;
      var value = defaultValue; //  Use for loop here so we can break early

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

  // https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js
  var EscapeRegex = function EscapeRegex(s) {
    return s.replace(re0, '\\$&').replace(re1, '\\x2d');
  };

  var re0 = /[|\\{}()[\]^$+*?.]/g;
  var re1 = /-/g;

  var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;

  var convert = function convert(s) {
    if (typeof s !== 'string') {
      return s;
    }

    if (s === '') {
      s = null;
    } else if (FLOAT.test(s)) {
      s = parseFloat(s);
    } else {
      if (s === 'false') {
        s = false;
      } else if (s === 'true') {
        s = true;
      }
    }

    return s;
  };

  var ParseValue = function ParseValue(text, valueConverter) {
    if (text == null) {
      return [];
    }

    var values = text.split(',');

    for (var i = 0, cnt = values.length; i < cnt; i++) {
      values[i] = valueConverter(values[i]);
    }

    return values;
  };

  var DefaultTagExpression = "[a-z0-9-_.]+";
  var DefaultValueExpression = "[ #a-z-_.0-9,|&]+";

  var BypassValueConverter = function BypassValueConverter(s) {
    return s;
  };

  var BracketParser = /*#__PURE__*/function () {
    function BracketParser(config) {
      _classCallCheck(this, BracketParser);

      // Event emitter
      this.setEventEmitter(GetValue$N(config, 'eventEmitter', undefined)); // Parameters for regex

      this.setTagExpression(GetValue$N(config, 'regex.tag', DefaultTagExpression));
      this.setValueExpression(GetValue$N(config, 'regex.value', DefaultValueExpression)); // Value convert

      this.setValueConverter(GetValue$N(config, 'valueConvert', true)); // Brackets and generate regex

      var delimiters = GetValue$N(config, 'delimiters', '<>');
      this.setDelimiters(delimiters[0], delimiters[1]);
      this.isRunning = false;
      this.isPaused = false;
      this.skipEventFlag = false;
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
      key: "setTagExpression",
      value: function setTagExpression(express) {
        this.tagExpression = express;
        return this;
      }
    }, {
      key: "setValueExpression",
      value: function setValueExpression(express) {
        this.valueExpression = express;
        return this;
      }
    }, {
      key: "setValueConverter",
      value: function setValueConverter(converter) {
        if (converter === true) {
          converter = convert;
        } else if (!converter) {
          converter = BypassValueConverter;
        }

        this.valueConverter = converter;
        return this;
      }
    }, {
      key: "setDelimiters",
      value: function setDelimiters(delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
          delimiterRight = delimiterLeft[1];
          delimiterLeft = delimiterLeft[0];
        }

        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;
        delimiterLeft = EscapeRegex(delimiterLeft);
        delimiterRight = EscapeRegex(delimiterRight);
        var tagOn = "".concat(delimiterLeft, "(").concat(this.tagExpression, ")(=(").concat(this.valueExpression, "))?").concat(delimiterRight);
        var tagOff = "".concat(delimiterLeft, "/(").concat(this.tagExpression, ")").concat(delimiterRight);
        this.reTagOn = RegExp(tagOn, 'i');
        this.reTagOff = RegExp(tagOff, 'i');
        this.reSplit = RegExp("".concat(tagOn, "|").concat(tagOff), 'gi');
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

        if (this.reSplit.lastIndex === 0) {
          this.onStart();
        }

        var text = this.source,
            lastIndex = text.length;

        while (!this.isPaused) {
          var regexResult = this.reSplit.exec(text);

          if (!regexResult) {
            if (this.progressIndex < lastIndex) {
              this.onContent(text.substring(this.progressIndex, lastIndex));
            }

            this.onComplete();
            return;
          }

          var match = regexResult[0];
          var matchStart = this.reSplit.lastIndex - match.length;

          if (this.progressIndex < matchStart) {
            this.onContent(text.substring(this.progressIndex, matchStart));
          }

          if (this.reTagOff.test(match)) {
            this.onTagEnd(match);
          } else {
            this.onTagStart(match);
          }

          this.progressIndex = this.reSplit.lastIndex;
        }
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
      key: "onContent",
      value: function onContent(content) {
        this.skipEventFlag = false;
        this.emit('content', content);
        this.lastContent = content;
      }
    }, {
      key: "onTagStart",
      value: function onTagStart(tagContent) {
        var regexResult = tagContent.match(this.reTagOn);
        var tag = regexResult[1];
        var values = ParseValue(regexResult[3], this.valueConverter);
        this.skipEventFlag = false;
        this.emit.apply(this, ["+".concat(tag)].concat(_toConsumableArray(values)));

        if (!this.skipEventFlag) {
          this.emit.apply(this, ['+', tag].concat(_toConsumableArray(values)));
        }

        this.lastTagStart = tag;
      }
    }, {
      key: "onTagEnd",
      value: function onTagEnd(tagContent) {
        var tag = tagContent.match(this.reTagOff)[1];
        this.skipEventFlag = false;
        this.emit("-".concat(tag));

        if (!this.skipEventFlag) {
          this.emit('-', tag);
        }

        this.lastTagEnd = tag;
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
        this.emit('complete', this);
        this.resetIndex();
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
    }, {
      key: "getTagOnRegString",
      value: function getTagOnRegString(tagExpression, valueExpression) {
        if (tagExpression === undefined) {
          tagExpression = this.tagExpression;
        }

        if (valueExpression === undefined) {
          valueExpression = this.valueExpression;
        }

        return "".concat(EscapeRegex(this.delimiterLeft), "(").concat(tagExpression, ")(=(").concat(valueExpression, "))?").concat(EscapeRegex(this.delimiterRight));
      }
    }, {
      key: "getTagOffRegString",
      value: function getTagOffRegString(tagExpression) {
        if (tagExpression === undefined) {
          tagExpression = this.tagExpression;
        }

        return "".concat(EscapeRegex(this.delimiterLeft), "/(").concat(tagExpression, ")").concat(EscapeRegex(this.delimiterRight));
      }
    }]);

    return BracketParser;
  }();

  Object.assign(BracketParser.prototype, EventEmitterMethods);

  var GetValue$M = Phaser.Utils.Objects.GetValue;

  var OnParseWaitTag = function OnParseWaitTag(tagPlayer, parser, config) {
    var tagWait = GetValue$M(config, 'tags.wait', 'wait');
    var tagClick = GetValue$M(config, 'tags.click', 'click');
    parser.on("+".concat(tagWait), function (name) {
      tagPlayer.wait(name);
      parser.skipEvent();
    }).on("-".concat(tagWait), function () {
      parser.skipEvent();
    }).on("+".concat(tagClick), function () {
      // Equal to [wait=click]
      tagPlayer.wait('click');
      parser.skipEvent();
    }).on("-".concat(tagClick), function () {
      // Equal to [/wait]
      parser.skipEvent();
    });
  };

  var GetValue$L = Phaser.Utils.Objects.GetValue;

  var OnParsePlaySoundEffectTag = function OnParsePlaySoundEffectTag(tagPlayer, parser, config) {
    var tagName = GetValue$L(config, 'tags.se', 'se');
    parser.on("+".concat(tagName), function (name, fadeInTime) {
      if (this.skipSoundEffect) {
        return;
      }

      tagPlayer.soundManager.playSoundEffect(name); // this: tagPlayer

      if (fadeInTime) {
        tagPlayer.soundManager.fadeInSoundEffect(fadeInTime);
      }

      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var GetValue$K = Phaser.Utils.Objects.GetValue;

  var OnParseFadeInSoundEffectTag = function OnParseFadeInSoundEffectTag(tagPlayer, parser, config) {
    var tagName = GetValue$K(config, 'tags.se.fadein', 'se.fadein');
    parser.on("+".concat(tagName), function (time) {
      tagPlayer.soundManager.fadeInSoundEffect(time);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var GetValue$J = Phaser.Utils.Objects.GetValue;

  var OnParseFadeOutSoundEffectTag = function OnParseFadeOutSoundEffectTag(tagPlayer, parser, config) {
    var tagName = GetValue$J(config, 'tags.se.fadeout', 'se.fadeout');
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      tagPlayer.soundManager.fadeOutSoundEffect(time, isStopped);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var GetValue$I = Phaser.Utils.Objects.GetValue;

  var OnParseSetSoundEffectVolumeTag = function OnParseSetSoundEffectVolumeTag(tagPlayer, parser, config) {
    var tagName = GetValue$I(config, 'tags.se.volume', 'se.volume');
    parser.on("+".concat(tagName), function (volume) {
      tagPlayer.soundManager.setSoundEffectVolume(volume);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var GetValue$H = Phaser.Utils.Objects.GetValue;

  var OnParsePlayBackgroundMusicTag = function OnParsePlayBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = GetValue$H(config, 'tags.bgm', 'bgm');
    parser.on("+".concat(tagName), function (name, fadeInTime) {
      tagPlayer.soundManager.playBackgroundMusic(name);

      if (fadeInTime) {
        tagPlayer.soundManager.fadeInBackgroundMusic(fadeInTime);
      }

      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      tagPlayer.soundManager.stopBackgroundMusic();
      parser.skipEvent();
    });
  };

  var GetValue$G = Phaser.Utils.Objects.GetValue;

  var OnParseFadeInBackgroundMusicTag = function OnParseFadeInBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = GetValue$G(config, 'tags.bgm.fadein', 'bgm.fadein');
    parser.on("+".concat(tagName), function (time) {
      tagPlayer.soundManager.fadeInBackgroundMusic(time);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var GetValue$F = Phaser.Utils.Objects.GetValue;

  var OnParseFadeOutBackgroundMusicTag = function OnParseFadeOutBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = GetValue$F(config, 'tags.bgm.fadeout', 'bgm.fadeout');
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      tagPlayer.soundManager.fadeOutBackgroundMusic(time, isStopped);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var GetValue$E = Phaser.Utils.Objects.GetValue;

  var OnParseCrossFadeBackgroundMusicTag = function OnParseCrossFadeBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = GetValue$E(config, 'tags.bgm.cross', 'bgm.cross');
    parser.on("+".concat(tagName), function (name, fadeTime) {
      tagPlayer.soundManager.crossFadeBackgroundMusic(name, fadeTime);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var GetValue$D = Phaser.Utils.Objects.GetValue;

  var OnParsePauseBackgroundMusicTag = function OnParsePauseBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = GetValue$D(config, 'tags.bgm.pause', 'bgm.pause');
    parser.on("+".concat(tagName), function () {
      tagPlayer.soundManager.pauseBackgroundMusic();
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      tagPlayer.soundManager.resumeBackgroundMusic();
      parser.skipEvent();
    });
  };

  var GetValue$C = Phaser.Utils.Objects.GetValue;

  var OnParseFadeInCameraTag = function OnParseFadeInCameraTag(tagPlayer, parser, config) {
    var tagName = GetValue$C(config, 'tags.camera.fadein', 'camera.fadein');
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      tagPlayer.camera.fadeIn(duration, red, green, blue);
      parser.skipEvent();
    });
  };

  var GetValue$B = Phaser.Utils.Objects.GetValue;

  var OnParseFadeOutCameraTag = function OnParseFadeOutCameraTag(tagPlayer, parser, config) {
    var tagName = GetValue$B(config, 'tags.camera.fadeout', 'camera.fadeout');
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      tagPlayer.camera.fadeOut(duration, red, green, blue);
      parser.skipEvent();
    });
  };

  var GetValue$A = Phaser.Utils.Objects.GetValue;

  var OnParseShakeCameraTag = function OnParseShakeCameraTag(tagPlayer, parser, config) {
    var tagName = GetValue$A(config, 'tags.camera.shake', 'camera.shake');
    parser.on("+".concat(tagName), function (duration, intensity) {
      tagPlayer.camera.shake(duration, intensity);
      parser.skipEvent();
    });
  };

  var GetValue$z = Phaser.Utils.Objects.GetValue;

  var OnParseFlashCameraTag = function OnParseFlashCameraTag(tagPlayer, parser, config) {
    var tagName = GetValue$z(config, 'tags.camera.flash', 'camera.flash');
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      tagPlayer.camera.flash(duration, red, green, blue);
      parser.skipEvent();
    });
  };

  var GetValue$y = Phaser.Utils.Objects.GetValue;

  var OnParseZoomCameraTag = function OnParseZoomCameraTag(tagPlayer, parser, config) {
    var tagName = GetValue$y(config, 'tags.camera.zoom', 'camera.zoom');
    parser.on("+".concat(tagName), function (value) {
      tagPlayer.camera.setZoom(value);
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (value, duration, ease) {
      tagPlayer.camera.zoomTo(value, duration, ease);
      parser.skipEvent();
    });
  };

  var GetValue$x = Phaser.Utils.Objects.GetValue;
  var DegToRad$1 = Phaser.Math.DegToRad;

  var OnParseRotateCameraTag = function OnParseRotateCameraTag(tagPlayer, parser, config) {
    var tagName = GetValue$x(config, 'tags.camera.rotate', 'camera.rotate');
    parser.on("+".concat(tagName), function (value) {
      tagPlayer.camera.setRotation(DegToRad$1(value));
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (value, duration, ease) {
      value = DegToRad$1(value);
      tagPlayer.camera.rotateTo(DegToRad$1(value), false, duration, ease);
      parser.skipEvent();
    });
  };

  var GetValue$w = Phaser.Utils.Objects.GetValue;

  var OnParseScrollCameraTag = function OnParseScrollCameraTag(tagPlayer, parser, config) {
    var tagName = GetValue$w(config, 'tags.camera.scroll', 'camera.scroll');
    parser.on("+".concat(tagName), function (x, y) {
      tagPlayer.camera.setScroll(x, y);
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (x, y, duration, ease) {
      // this: tagPlayer
      var camera = tagPlayer.camera;
      var xSave = camera.scrollX;
      var ySave = camera.scrollY;
      camera.setScroll(x, y);
      x += camera.centerX;
      y += camera.centerY;
      camera.setScroll(xSave, ySave); // x,y in pan() is the centerX, centerY

      camera.pan(x, y, duration, ease);
      parser.skipEvent();
    });
  };

  var GetValue$v = Phaser.Utils.Objects.GetValue;

  var IsAddSpriteTag = function IsAddSpriteTag(tags, prefix) {
    // sprite.name
    return tags.length === 2 && tags[0] === prefix;
  };

  var OnParseAddSpriteTag = function OnParseAddSpriteTag(tagPlayer, parser, config) {
    var prefix = GetValue$v(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on('+', function (tag) {
      var _tagPlayer$spriteMana;

      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name=key,frame], or [sprite.name]


      var tags = tag.split('.');
      var name;

      if (IsAddSpriteTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_tagPlayer$spriteMana = tagPlayer.spriteManager).add.apply(_tagPlayer$spriteMana, [name].concat(args));

      parser.skipEvent();
    }).on('-', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [/sprite.name]


      var tags = tag.split('.');
      var name;

      if (IsAddSpriteTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      tagPlayer.spriteManager.remove(name);
      parser.skipEvent();
    });
  };

  var GetValue$u = Phaser.Utils.Objects.GetValue;

  var OnParseRemoveAllSpritesTag = function OnParseRemoveAllSpritesTag(tagPlayer, parser, config) {
    var prefix = GetValue$u(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on('-', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [/sprite]


      if (tag === prefix) ; else {
        return;
      }

      tagPlayer.spriteManager.removeAll();
      parser.skipEvent();
    });
  };

  var GetValue$t = Phaser.Utils.Objects.GetValue;

  var IsSetTextureTag = function IsSetTextureTag(tags, prefix) {
    // sprite.name.texture
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'texture';
  };

  var OnParseSetTextureTag = function OnParseSetTextureTag(tagPlayer, parser, config) {
    var prefix = GetValue$t(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on('+', function (tag, textureKey, frameKey) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.texture=key,frame]


      var tags = tag.split('.');
      var name;

      if (IsSetTextureTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      tagPlayer.spriteManager.setTexture(name, textureKey, frameKey);
      parser.skipEvent();
    });
  };

  var GetValue$s = Phaser.Utils.Objects.GetValue;

  var IsPlayAnimationTag = function IsPlayAnimationTag(tags, prefix) {
    // sprite.name.play
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'play';
  };

  var IsStopAnimationTag = function IsStopAnimationTag(tags, prefix) {
    // sprite.name.stop
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'stop';
  };

  var OnParsePlayAnimationTag = function OnParsePlayAnimationTag(tagPlayer, parser, config) {
    var prefix = GetValue$s(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.play=key], or [sprite.name.play=key0,key1,...]


      var tags = tag.split('.');
      var name;

      if (IsPlayAnimationTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      var keys = Array.prototype.slice.call(arguments, 1);
      var firstKey = keys.shift();
      tagPlayer.spriteManager.playAnimation(name, firstKey);

      if (keys.length > 0) {
        tagPlayer.spriteManager.chainAnimation(name, keys);
      }

      parser.skipEvent();
    }).on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.stop]


      var tags = tag.split('.');
      var name;

      if (IsStopAnimationTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      tagPlayer.spriteManager.stopAnimation(name);
      parser.skipEvent();
    }).on('-', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [/sprite.name.play]


      var tags = tag.split('.');
      var name;

      if (IsPlayAnimationTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      tagPlayer.spriteManager.stopAnimation(name);
      parser.skipEvent();
    });
  };

  var GetValue$r = Phaser.Utils.Objects.GetValue;

  var IsChainAnimationTag = function IsChainAnimationTag(tags, prefix) {
    // sprite.name.chain 
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'chain';
  };

  var OnParseChainAnimationTag = function OnParseChainAnimationTag(tagPlayer, parser, config) {
    var prefix = GetValue$r(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.chain=key]


      var tags = tag.split('.');
      var name;

      if (IsChainAnimationTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      var keys = Array.prototype.slice.call(arguments, 1);
      tagPlayer.spriteManager.chainAnimation(name, keys);
      parser.skipEvent();
    });
  };

  var GetValue$q = Phaser.Utils.Objects.GetValue;

  var IsPauseAnimationTag = function IsPauseAnimationTag(tags, prefix) {
    // sprite.name.pause 
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'pause';
  };

  var OnParsePauseAnimationTag = function OnParsePauseAnimationTag(tagPlayer, parser, config) {
    var prefix = GetValue$q(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on('+', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.chain=key]


      var tags = tag.split('.');
      var name;

      if (IsPauseAnimationTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      tagPlayer.spriteManager.pauseAnimation(name);
      parser.skipEvent();
    });
  };

  var GetValue$p = Phaser.Utils.Objects.GetValue;

  var IsSetPropertyTag$1 = function IsSetPropertyTag(tags, prefix) {
    // sprite.name.prop
    return tags.length === 3 && tags[0] === prefix;
  };

  var OnParseSetSpritePropertyTag = function OnParseSetSpritePropertyTag(tagPlayer, parser, config) {
    var prefix = GetValue$p(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on("+", function (tag, value) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.prop=value]


      var tags = tag.split('.');
      var name, property;

      if (IsSetPropertyTag$1(tags, prefix)) {
        name = tags[1];
        property = tags[2];
      } else {
        return;
      }

      tagPlayer.spriteManager.setProperty(name, property, value);
      parser.skipEvent();
    });
  };

  var GetValue$o = Phaser.Utils.Objects.GetValue;
  var EaseMode$1 = {
    to: true,
    yoyo: true
  };

  var IsEasePropertyTag$1 = function IsEasePropertyTag(tags, prefix) {
    // sprite.name.prop.to, or sprite.name.prop.yoyo
    return tags.length === 4 && tags[0] === prefix && EaseMode$1[tags[3]];
  };

  var OnParseEaseSpritePropertyTag = function OnParseEaseSpritePropertyTag(tagPlayer, parser, config) {
    var prefix = GetValue$o(config, 'sprite', 'sprite');

    if (!prefix) {
      return;
    }

    parser.on("+", function (tag, value, duration, ease, repeat) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [sprite.name.prop.to=value,duration]
      // [sprite.name.prop.to=value,duration,ease,repeat]
      // [sprite.name.prop.to=value,duration,repeat]


      var tags = tag.split('.');
      var name, property, isYoyo;

      if (IsEasePropertyTag$1(tags, prefix)) {
        name = tags[1];
        property = tags[2];
        isYoyo = tags[3] === 'yoyo';
      } else {
        return;
      }

      if (typeof ease === 'number') {
        repeat = ease;
        ease = undefined;
      }

      tagPlayer.spriteManager.easeProperty(name, property, value, duration, ease, repeat, isYoyo);
      parser.skipEvent();
    });
  };

  var GetValue$n = Phaser.Utils.Objects.GetValue;

  var IsAddTextTag = function IsAddTextTag(tags, prefix) {
    // text.name
    return tags.length === 2 && tags[0] === prefix;
  };

  var OnParseAddTextTag = function OnParseAddTextTag(tagPlayer, parser, config) {
    var prefix = GetValue$n(config, 'text', 'text');

    if (!prefix) {
      return;
    }

    parser.on('+', function (tag, textObjectType) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [text.name], or [text.name=bbcodetext]


      var tags = tag.split('.');
      var name;

      if (IsAddTextTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      tagPlayer.textManager.add(name, textObjectType);
      parser.skipEvent();
    }).on('-', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [/text.name]


      var tags = tag.split('.');
      var name;

      if (IsAddTextTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      tagPlayer.textManager.remove(name);
      parser.skipEvent();
    });
  };

  var GetValue$m = Phaser.Utils.Objects.GetValue;

  var OnParseRemoveAllTextsTag = function OnParseRemoveAllTextsTag(tagPlayer, parser, config) {
    var prefix = GetValue$m(config, 'text', 'text');

    if (!prefix) {
      return;
    }

    parser.on('-', function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [/text]


      if (tag === prefix) ; else {
        return;
      }

      tagPlayer.textManager.removeAll();
      parser.skipEvent();
    });
  };

  var GetValue$l = Phaser.Utils.Objects.GetValue;

  var IsSetTextTag = function IsSetTextTag(tags, prefix) {
    // text.name.text
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'text';
  };

  var OnParseSetTextTag = function OnParseSetTextTag(tagPlayer, parser, config) {
    var prefix = GetValue$l(config, 'text', 'text');

    if (!prefix) {
      return;
    }

    parser.on("+", function (tag) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [text.name.text]


      var tags = tag.split('.');

      if (IsSetTextTag(tags, prefix)) {
        tags[1];
      } else {
        return;
      } // Set text in content section


      parser.skipEvent();
    }).on('content', function (content) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      if (content === '\n') {
        return;
      } // [text.name.text]


      var tags = parser.lastTagStart.split('.');
      var name;

      if (IsSetTextTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      content = content.replaceAll('\\n', '\n');
      tagPlayer.textManager.setText(name, content);
      parser.skipEvent();
    });
  };

  var GetValue$k = Phaser.Utils.Objects.GetValue;

  var IsTypingTextTag = function IsTypingTextTag(tags, prefix) {
    // text.name.typing
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'typing';
  };

  var OnParseTypingTextTag = function OnParseTypingTextTag(tagPlayer, parser, config) {
    var prefix = GetValue$k(config, 'text', 'text');

    if (!prefix) {
      return;
    }

    parser.on("+", function (tag, speed) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [text.name.typing]


      var tags = tag.split('.');

      if (IsTypingTextTag(tags, prefix)) {
        tags[1];
      } else {
        return;
      } // Set text in content section


      parser.skipEvent();
    }).on('content', function (content) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      if (content === '\n') {
        return;
      } // [text.name.typing]


      var tags = parser.lastTagStart.split('.');
      var name;

      if (IsTypingTextTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      }

      content = content.replaceAll('\\n', '\n');
      tagPlayer.textManager.typingText(name, content);
      parser.skipEvent();
    });
  };

  var GetValue$j = Phaser.Utils.Objects.GetValue;

  var IsSetPropertyTag = function IsSetPropertyTag(tags, prefix) {
    // text.name.prop
    return tags.length === 3 && tags[0] === prefix;
  };

  var OnParseSetTextPropertyTag = function OnParseSetTextPropertyTag(tagPlayer, parser, config) {
    var prefix = GetValue$j(config, 'text', 'text');

    if (!prefix) {
      return;
    }

    parser.on("+", function (tag, value) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [text.name.prop=value]


      var tags = tag.split('.');
      var name, property;

      if (IsSetPropertyTag(tags, prefix)) {
        name = tags[1];
        property = tags[2];
      } else {
        return;
      }

      tagPlayer.textManager.setProperty(name, property, value);
      parser.skipEvent();
    });
  };

  var GetValue$i = Phaser.Utils.Objects.GetValue;
  var EaseMode = {
    to: true,
    yoyo: true
  };

  var IsEasePropertyTag = function IsEasePropertyTag(tags, prefix) {
    // text.name.prop.to, or text.name.prop.yoyo
    return tags.length === 4 && tags[0] === prefix && EaseMode[tags[3]];
  };

  var OnParseEaseTextPropertyTag = function OnParseEaseTextPropertyTag(tagPlayer, parser, config) {
    var prefix = GetValue$i(config, 'text', 'text');

    if (!prefix) {
      return;
    }

    parser.on("+", function (tag, value, duration, ease, repeat) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [text.name.prop.to=value,duration]
      // [text.name.prop.to=value,duration,ease,repeat]
      // [text.name.prop.to=value,duration,repeat]


      var tags = tag.split('.');
      var name, property, isYoyo;

      if (IsEasePropertyTag(tags, prefix)) {
        name = tags[1];
        property = tags[2];
        isYoyo = tags[3] === 'yoyo';
      } else {
        return;
      }

      if (typeof ease === 'number') {
        repeat = ease;
        ease = undefined;
      }

      tagPlayer.textManager.easeProperty(name, property, value, duration, ease, repeat, isYoyo);
      parser.skipEvent();
    });
  };

  var OnParseContent = function OnParseContent(tagPlayer, parser, config) {
    parser.on('content', function (content) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      if (content === '\n') {
        return;
      }

      var startTag = "+".concat(parser.lastTagStart);
      tagPlayer.emit("".concat(startTag, "#content"), parser, content);
    });
  };

  var OnParseCustomTag = function OnParseCustomTag(tagPlayer, parser, config) {
    parser.on('+', function (tagName) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      }

      var startTag = "+".concat(tagName);

      for (var _len = arguments.length, value = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        value[_key - 1] = arguments[_key];
      }

      tagPlayer.emit.apply(tagPlayer, ["".concat(startTag), parser].concat(value));
    }).on('-', function (tagName) {
      if (parser.skipEventFlag) {
        return;
      }

      var endTag = "-".concat(tagName);
      tagPlayer.emit("".concat(endTag), parser);
    });
  };

  var ParseCallbacks = [OnParseWaitTag, OnParsePlaySoundEffectTag, OnParseFadeInSoundEffectTag, OnParseFadeOutSoundEffectTag, OnParseSetSoundEffectVolumeTag, OnParsePlayBackgroundMusicTag, OnParseFadeInBackgroundMusicTag, OnParseFadeOutBackgroundMusicTag, OnParseCrossFadeBackgroundMusicTag, OnParsePauseBackgroundMusicTag, OnParseFadeInCameraTag, OnParseFadeOutCameraTag, OnParseShakeCameraTag, OnParseFlashCameraTag, OnParseZoomCameraTag, OnParseRotateCameraTag, OnParseScrollCameraTag, OnParseAddSpriteTag, OnParseRemoveAllSpritesTag, OnParseSetTextureTag, OnParsePlayAnimationTag, OnParseChainAnimationTag, OnParsePauseAnimationTag, OnParseSetSpritePropertyTag, OnParseEaseSpritePropertyTag, OnParseAddTextTag, OnParseRemoveAllTextsTag, OnParseSetTextTag, OnParseTypingTextTag, OnParseSetTextPropertyTag, OnParseEaseTextPropertyTag, OnParseContent, OnParseCustomTag];

  var AddParseCallbacks = function AddParseCallbacks(tagPlayer, parser, config) {
    for (var i = 0, cnt = ParseCallbacks.length; i < cnt; i++) {
      ParseCallbacks[i](tagPlayer, parser, config);
    }

    parser.on('start', function () {
      tagPlayer.emit('start', parser);
    }).on('complete', function () {
      tagPlayer.emit('complete', parser);
    });
  };

  /*
  Skip line
  - An empty line, only has space
  - A comment line, start with commentLineStart ('//')
  */
  var PreProcess = function PreProcess(parser, source) {
    var comentLineStart = parser.commentLineStart;
    var lines = source.split('\n');

    for (var i = 0, cnt = lines.length; i < cnt; i++) {
      var line = lines[i];

      if (line === '') ; else if (line.trim().length === 0) {
        // An empty line, only has space
        lines[i] = '';
      } else if (comentLineStart && line.startsWith(comentLineStart)) {
        // A comment line, start with commentLineStart ('//')
        lines[i] = '';
      }
    }

    return lines.join('');
  };

  var GetValue$h = Phaser.Utils.Objects.GetValue;

  var Parser$1 = /*#__PURE__*/function (_BracketParser) {
    _inherits(Parser, _BracketParser);

    var _super = _createSuper(Parser);

    function Parser(tagPlayer, config) {
      var _this;

      _classCallCheck(this, Parser);

      if (config === undefined) {
        config = {};
      }

      if (!config.hasOwnProperty('delimiters')) {
        config.delimiters = '[]';
      }

      _this = _super.call(this, config);
      AddParseCallbacks(tagPlayer, _assertThisInitialized(_this), config);

      _this.setCommentLineStartSymbol(GetValue$h(config, 'comment', '//'));

      return _this;
    }

    _createClass(Parser, [{
      key: "setCommentLineStartSymbol",
      value: function setCommentLineStartSymbol(symbol) {
        this.commentLineStart = symbol;
        return this;
      }
    }, {
      key: "start",
      value: function start(source) {
        _get(_getPrototypeOf(Parser.prototype), "start", this).call(this, PreProcess(this, source));

        return this;
      }
    }]);

    return Parser;
  }(BracketParser);

  var SceneClass = Phaser.Scene;

  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
  };

  var GetSceneObject = function GetSceneObject(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsSceneObject(object)) {
      // object = scene
      return object;
    } else if (object.scene && IsSceneObject(object.scene)) {
      // object = game object
      return object.scene;
    } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) {
      // parent = bob object
      return object.parent.scene;
    }
  };

  var GetValue$g = Phaser.Utils.Objects.GetValue;

  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);

      this.parent = parent; // gameObject or scene

      this.scene = GetSceneObject(parent);
      this.isShutdown = false; // Event emitter, default is private event emitter

      this.setEventEmitter(GetValue$g(config, 'eventEmitter', true)); // Register callback of parent destroy event, also see `shutdown` method

      if (this.parent && this.parent === this.scene) {
        // parent is a scene
        this.scene.sys.events.once('shutdown', this.onSceneDestroy, this);
      } else if (this.parent && this.parent.once) {
        // bob object does not have event emitter
        this.parent.once('destroy', this.onParentDestroy, this);
      }
    }

    _createClass(ComponentBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        } // parent might not be shutdown yet


        if (this.parent && this.parent === this.scene) {
          // parent is a scene
          this.scene.sys.events.off('shutdown', this.onSceneDestroy, this);
        } else if (this.parent && this.parent.once) {
          // bob object does not have event emitter
          this.parent.off('destroy', this.onParentDestroy, this);
        }

        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        this.isShutdown = true;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onSceneDestroy",
      value: function onSceneDestroy() {
        this.destroy(true);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }]);

    return ComponentBase;
  }();
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  var GetValue$f = Phaser.Utils.Objects.GetValue;

  var TickTask = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TickTask, _ComponentBase);

    var _super = _createSuper(TickTask);

    function TickTask(parent, config) {
      var _this;

      _classCallCheck(this, TickTask);

      _this = _super.call(this, parent, config);
      _this._isRunning = false;
      _this.isPaused = false;
      _this.tickingState = false;

      _this.setTickingMode(GetValue$f(config, 'tickingMode', 1)); // boot() later


      return _this;
    } // override


    _createClass(TickTask, [{
      key: "boot",
      value: function boot() {
        if (this.tickingMode === 2 && !this.tickingState) {
          this.startTicking();
        }
      } // override

    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.stop();

        if (this.tickingState) {
          this.stopTicking();
        }

        _get(_getPrototypeOf(TickTask.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setTickingMode",
      value: function setTickingMode(mode) {
        if (typeof mode === 'string') {
          mode = TICKINGMODE[mode];
        }

        this.tickingMode = mode;
      } // override

    }, {
      key: "startTicking",
      value: function startTicking() {
        this.tickingState = true;
      } // override

    }, {
      key: "stopTicking",
      value: function stopTicking() {
        this.tickingState = false;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this._isRunning;
      },
      set: function set(value) {
        if (this._isRunning === value) {
          return;
        }

        this._isRunning = value;

        if (this.tickingMode === 1 && value != this.tickingState) {
          if (value) {
            this.startTicking();
          } else {
            this.stopTicking();
          }
        }
      }
    }, {
      key: "start",
      value: function start() {
        this.isPaused = false;
        this.isRunning = true;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        // Only can ba paused in running state
        if (this.isRunning) {
          this.isPaused = true;
          this.isRunning = false;
        }

        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        // Only can ba resumed in paused state (paused from running state)
        if (this.isPaused) {
          this.isRunning = true;
        }

        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.isPaused = false;
        this.isRunning = false;
        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.isPaused = false;
        this.isRunning = false;
        this.emit('complete', this.parent, this);
      }
    }]);

    return TickTask;
  }(ComponentBase);

  var TICKINGMODE = {
    'no': 0,
    'lazy': 1,
    'always': 2
  };

  var GetValue$e = Phaser.Utils.Objects.GetValue;

  var BaseClock = /*#__PURE__*/function (_TickTask) {
    _inherits(BaseClock, _TickTask);

    var _super = _createSuper(BaseClock);

    function BaseClock(parent, config) {
      var _this;

      _classCallCheck(this, BaseClock);

      _this = _super.call(this, parent, config);

      _this.resetFromJSON(config);

      _this.boot();

      return _this;
    }

    _createClass(BaseClock, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.isRunning = GetValue$e(o, 'isRunning', false);
        this.timeScale = GetValue$e(o, 'timeScale', 1);
        this.now = GetValue$e(o, 'now', 0);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          isRunning: this.isRunning,
          timeScale: this.timeScale,
          now: this.now,
          tickingMode: this.tickingMode
        };
      } // Override
      // startTicking() { }
      // Override
      // stopTicking() {}

    }, {
      key: "start",
      value: function start(startAt) {
        if (startAt === undefined) {
          startAt = 0;
        }

        this.delta = 0;
        this.now = startAt;

        _get(_getPrototypeOf(BaseClock.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "seek",
      value: function seek(time) {
        this.now = time;
        return this;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(value) {
        this.timeScale = value;
        return this;
      }
    }, {
      key: "tick",
      value: function tick(delta) {
        delta *= this.timeScale;
        this.now += delta;
        this.delta = delta;
        this.emit('update', this.now, this.delta);
        return this;
      }
    }]);

    return BaseClock;
  }(TickTask);

  var Clock = /*#__PURE__*/function (_BaseClock) {
    _inherits(Clock, _BaseClock);

    var _super = _createSuper(Clock);

    function Clock() {
      _classCallCheck(this, Clock);

      return _super.apply(this, arguments);
    }

    _createClass(Clock, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(Clock.prototype), "startTicking", this).call(this);

        this.scene.sys.events.on('update', this.update, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(Clock.prototype), "stopTicking", this).call(this);

        if (this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off('update', this.update, this);
        }
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || this.timeScale === 0) {
          return this;
        }

        this.tick(delta);
        return this;
      }
    }]);

    return Clock;
  }(BaseClock);

  var Yoyo = function Yoyo(t, threshold) {
    if (threshold === undefined) {
      threshold = 0.5;
    }

    if (t <= threshold) {
      t = t / threshold;
    } else {
      t = 1 - (t - threshold) / (1 - threshold);
    }

    return t;
  };

  var Clamp$1 = Phaser.Math.Clamp;

  var Timer$1 = /*#__PURE__*/function () {
    function Timer(timeline, config) {
      _classCallCheck(this, Timer);

      this.setTimeline(timeline).reset(config);
    }

    _createClass(Timer, [{
      key: "setTimeline",
      value: function setTimeline(timeline) {
        this.timeline = timeline;
        return this;
      }
    }, {
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
      }
    }, {
      key: "setCallbacks",
      value: function setCallbacks(target, onStart, onProgress, onComplete) {
        this.target = target;
        this.onStart = onStart;
        this.onProgress = onProgress;
        this.onComplete = onComplete;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration, yoyo) {
        if (yoyo === undefined) {
          yoyo = false;
        }

        this.duration = duration;
        this.remainder = duration;
        this.t = 0;
        this.yoyo = yoyo;
        return this;
      }
    }, {
      key: "setPaused",
      value: function setPaused(state) {
        this.isPaused = state;
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        this.isPaused = true;
        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        this.isPaused = false;
        return this;
      }
    }, {
      key: "setRemoved",
      value: function setRemoved(state) {
        this.removed = state;
        return this;
      }
    }, {
      key: "remove",
      value: function remove() {
        this.removed = true;
        return this;
      }
    }, {
      key: "seek",
      value: function seek(t) {
        this.remainder = this.duration * (1 - t);
        return this;
      }
    }, {
      key: "reset",
      value: function reset(o) {
        this.setName(o.name).setDuration(o.duration, o.yoyo).setCallbacks(o.target, o.onStart, o.onProgress, o.onComplete).setPaused(false).setRemoved(false);
        return this;
      }
    }, {
      key: "onFree",
      value: function onFree() {
        this.setTimeline().setCallbacks();
      }
    }, {
      key: "getProgress",
      value: function getProgress() {
        var value = 1 - this.remainder / this.duration;
        value = Clamp$1(value, 0, 1);

        if (this.yoyo) {
          value = Yoyo(value);
        }

        return value;
      }
    }, {
      key: "setProgress",
      value: function setProgress(value) {
        value = Clamp$1(value, 0, 1);
        this.remainder = this.duration * (1 - value);
      }
    }, {
      key: "runCallback",
      value: function runCallback(callback) {
        if (!callback) {
          return;
        }

        callback(this.target, this.t, this);
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (this.removed) {
          return true;
        } else if (this.isPaused) {
          return false;
        }

        this.remainder -= delta;
        this.t = this.getProgress();
        this.runCallback(this.onProgress);
        var isCompleted = this.remainder <= 0;

        if (isCompleted) {
          this.runCallback(this.onComplete);
        }

        return isCompleted;
      }
    }]);

    return Timer;
  }();

  var Stack = /*#__PURE__*/function () {
    function Stack() {
      _classCallCheck(this, Stack);

      this.items = [];
    }

    _createClass(Stack, [{
      key: "destroy",
      value: function destroy() {
        this.clear();
        this.items = undefined;
      }
    }, {
      key: "pop",
      value: function pop() {
        return this.items.length > 0 ? this.items.pop() : null;
      }
    }, {
      key: "push",
      value: function push(l) {
        this.items.push(l);
        return this;
      }
    }, {
      key: "pushMultiple",
      value: function pushMultiple(arr) {
        this.items.push.apply(this.items, arr);
        arr.length = 0;
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.items.length = 0;
        return this;
      }
    }]);

    return Stack;
  }();

  var TimerPool$1 = /*#__PURE__*/function (_Pool) {
    _inherits(TimerPool, _Pool);

    var _super = _createSuper(TimerPool);

    function TimerPool() {
      _classCallCheck(this, TimerPool);

      return _super.apply(this, arguments);
    }

    _createClass(TimerPool, [{
      key: "allocate",
      value: function allocate() {
        return this.pop();
      }
    }, {
      key: "free",
      value: function free(timer) {
        timer.onFree();
        this.push(timer);
      }
    }, {
      key: "freeMultiple",
      value: function freeMultiple(arr) {
        for (var i = 0, cnt = arr.length; i < cnt; i++) {
          this.free(arr[i]);
        }

        return this;
      }
    }]);

    return TimerPool;
  }(Stack);

  var GetValue$d = Phaser.Utils.Objects.GetValue;
  var TimerPool = new TimerPool$1();

  var Timeline = /*#__PURE__*/function (_Clock) {
    _inherits(Timeline, _Clock);

    var _super = _createSuper(Timeline);

    function Timeline(parent, config) {
      var _this;

      _classCallCheck(this, Timeline);

      _this = _super.call(this, parent, config);
      _this.addedTimers = [];
      _this.timers = [];
      _this.timerPool = GetValue$d(config, 'pool', TimerPool);
      return _this;
    }

    _createClass(Timeline, [{
      key: "shutdown",
      value: function shutdown() {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.timerPool.freeMultiple(this.addedTimers).freeMultiple(this.timers);
        this.timerPool = undefined;
        this.addedTimers = undefined;
        this.timers = undefined;

        _get(_getPrototypeOf(Timeline.prototype), "shutdown", this).call(this);
      }
    }, {
      key: "addTimer",
      value: function addTimer(config) {
        var timer = this.timerPool.allocate();

        if (!timer) {
          timer = new Timer$1(this, config);
        } else {
          timer.setTimeline(this).reset(config);
        }

        this.addedTimers.push(timer);
        timer.runCallback(timer.onStart);

        if (!this.isRunning) {
          this.start();
        }

        return timer;
      }
    }, {
      key: "delayCall",
      value: function delayCall(delay, callback, args, scope) {
        var timer = this.addTimer({
          duration: delay,
          onComplete: function onComplete(target, t, timer) {
            if (args === undefined) {
              args = [];
            }

            args.push(timer);
            callback.apply(scope, args);
          }
        });
        return timer;
      }
    }, {
      key: "getTimers",
      value: function getTimers(name) {
        var timers = [];
        var timerQueues = [this.addedTimers, this.timers];

        for (var ti = 0, tcnt = timerQueues.length; ti < tcnt; ti++) {
          var timerQueue = timerQueues[ti];

          for (var i = 0, cnt = timerQueue.length; i < cnt; i++) {
            var timer = timerQueue[i];

            if (timer.name === name) {
              timers.push(timer);
            }
          }
        }

        return timers;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        var _this$timers;

        _get(_getPrototypeOf(Timeline.prototype), "update", this).call(this, time, delta);

        (_this$timers = this.timers).push.apply(_this$timers, _toConsumableArray(this.addedTimers));

        this.addedTimers.length = 0;
        var pendingTimers = [];

        for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
          var timer = this.timers[i];
          var isStopped = timer.update(this.now, this.delta);

          if (isStopped) {
            this.timerPool.free(timer); // Free timer
          } else {
            pendingTimers.push(timer); // Add to timer queue
          }
        }

        this.timers = pendingTimers;

        if (this.timers.length === 0 && this.addedTimers.length === 0) {
          this.complete(); // Emit 'complete' event
        }
      }
    }]);

    return Timeline;
  }(Clock);

  var SceneUpdateTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(SceneUpdateTickTask, _TickTask);

    var _super = _createSuper(SceneUpdateTickTask);

    function SceneUpdateTickTask() {
      _classCallCheck(this, SceneUpdateTickTask);

      return _super.apply(this, arguments);
    }

    _createClass(SceneUpdateTickTask, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "startTicking", this).call(this);

        this.scene.sys.events.on('update', this.update, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "stopTicking", this).call(this);

        if (this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off('update', this.update, this);
        }
      } // update(time, delta) {
      //     
      // }

    }]);

    return SceneUpdateTickTask;
  }(TickTask);

  var GetValue$c = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;

  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);

      this.resetFromJSON(config);
    }

    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$c(o, 'state', IDLE);
        this.timeScale = GetValue$c(o, 'timeScale', 1);
        this.delay = GetValue$c(o, 'delay', 0);
        this.repeat = GetValue$c(o, 'repeat', 0);
        this.repeatCounter = GetValue$c(o, 'repeatCounter', 0);
        this.duration = GetValue$c(o, 'duration', 0);
        this.nowTime = GetValue$c(o, 'nowTime', 0);
        this.justRestart = GetValue$c(o, 'justRestart', false);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          state: this.state,
          timeScale: this.timeScale,
          delay: this.delay,
          repeat: this.repeat,
          repeatCounter: this.repeatCounter,
          duration: this.duration,
          nowTime: this.nowTime,
          justRestart: this.justRestart
        };
      }
    }, {
      key: "destroy",
      value: function destroy() {}
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(delay) {
        if (delay === undefined) {
          delay = 0;
        }

        this.delay = delay;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(duration) {
        this.duration = duration;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        return this;
      }
    }, {
      key: "setRepeatInfinity",
      value: function setRepeatInfinity() {
        this.repeat = -1;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        this.nowTime = this.delay > 0 ? -this.delay : 0;
        this.state = this.nowTime >= 0 ? COUNTDOWN : DELAY;
        this.repeatCounter = 0;
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.state = IDLE;
        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (this.state === IDLE || this.state === DONE || delta === 0 || this.timeScale === 0) {
          return;
        }

        this.nowTime += delta * this.timeScale;
        this.state = this.nowTime >= 0 ? COUNTDOWN : DELAY;
        this.justRestart = false;

        if (this.nowTime >= this.duration) {
          if (this.repeat === -1 || this.repeatCounter < this.repeat) {
            this.repeatCounter++;
            this.justRestart = true;
            this.nowTime -= this.duration;
          } else {
            this.nowTime = this.duration;
            this.state = DONE;
          }
        }
      }
    }, {
      key: "t",
      get: function get() {
        var t;

        switch (this.state) {
          case IDLE:
          case DELAY:
            t = 0;
            break;

          case COUNTDOWN:
            t = this.nowTime / this.duration;
            break;

          case DONE:
            t = 1;
            break;
        }

        return Clamp(t, 0, 1);
      },
      set: function set(value) {
        value = Clamp(value, -1, 1);

        if (value < 0) {
          this.state = DELAY;
          this.nowTime = -this.delay * value;
        } else {
          this.state = COUNTDOWN;
          this.nowTime = this.duration * value;

          if (value === 1 && this.repeat !== 0) {
            this.repeatCounter++;
          }
        }
      }
    }, {
      key: "setT",
      value: function setT(t) {
        this.t = t;
        return this;
      }
    }, {
      key: "isIdle",
      get: function get() {
        return this.state === IDLE;
      }
    }, {
      key: "isDelay",
      get: function get() {
        return this.state === DELAY;
      }
    }, {
      key: "isCountDown",
      get: function get() {
        return this.state === COUNTDOWN;
      }
    }, {
      key: "isRunning",
      get: function get() {
        return this.state === DELAY || this.state === COUNTDOWN;
      }
    }, {
      key: "isDone",
      get: function get() {
        return this.state === DONE;
      }
    }, {
      key: "isOddIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 1;
      }
    }, {
      key: "isEvenIteration",
      get: function get() {
        return (this.repeatCounter & 1) === 0;
      }
    }]);

    return Timer;
  }();

  var IDLE = 0;
  var DELAY = 1;
  var COUNTDOWN = 2;
  var DONE = -1;

  var TimerTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(TimerTickTask, _TickTask);

    var _super = _createSuper(TimerTickTask);

    function TimerTickTask(parent, config) {
      var _this;

      _classCallCheck(this, TimerTickTask);

      _this = _super.call(this, parent, config);
      _this.timer = new Timer(); // boot() later 

      return _this;
    } // override


    _createClass(TimerTickTask, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        _get(_getPrototypeOf(TimerTickTask.prototype), "shutdown", this).call(this, fromScene);

        this.timer.destroy();
        this.timer = undefined;
      }
    }, {
      key: "start",
      value: function start() {
        this.timer.start();

        _get(_getPrototypeOf(TimerTickTask.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.timer.stop();

        _get(_getPrototypeOf(TimerTickTask.prototype), "stop", this).call(this);

        return this;
      }
    }, {
      key: "complete",
      value: function complete() {
        this.timer.stop();

        _get(_getPrototypeOf(TimerTickTask.prototype), "complete", this).call(this);

        return this;
      }
    }]);

    return TimerTickTask;
  }(SceneUpdateTickTask);

  var GetValue$b = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$2 = Phaser.Utils.Objects.GetAdvancedValue;
  var GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

  var EaseValueTaskBase = /*#__PURE__*/function (_TickTask) {
    _inherits(EaseValueTaskBase, _TickTask);

    var _super = _createSuper(EaseValueTaskBase);

    function EaseValueTaskBase() {
      _classCallCheck(this, EaseValueTaskBase);

      return _super.apply(this, arguments);
    }

    _createClass(EaseValueTaskBase, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue$b(o, 'timer'));
        this.setEnable(GetValue$b(o, 'enable', true));
        this.setTarget(GetValue$b(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue$2(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$2(o, 'duration', 1000));
        this.setEase(GetValue$b(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$b(o, 'repeat', 0));
        return this;
      }
    }, {
      key: "setEnable",
      value: function setEnable(e) {
        if (e == undefined) {
          e = true;
        }

        this.enable = e;
        return this;
      }
    }, {
      key: "setTarget",
      value: function setTarget(target) {
        if (target === undefined) {
          target = this.parent;
        }

        this.target = target;
        return this;
      }
    }, {
      key: "setDelay",
      value: function setDelay(time) {
        this.delay = time;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(time) {
        this.duration = time;
        return this;
      }
    }, {
      key: "setEase",
      value: function setEase(ease) {
        if (ease === undefined) {
          ease = 'Linear';
        }

        this.ease = ease;
        this.easeFn = GetEaseFunction(ease);
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat) {
        this.repeat = repeat;
        return this;
      } // Override

    }, {
      key: "start",
      value: function start() {
        // Ignore start if timer is running, i.e. in DELAY, o RUN state
        if (this.timer.isRunning) {
          return this;
        }

        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "restart",
      value: function restart() {
        this.timer.stop();
        this.start.apply(this, arguments);
        return this;
      }
    }, {
      key: "stop",
      value: function stop(toEnd) {
        if (toEnd === undefined) {
          toEnd = false;
        }

        _get(_getPrototypeOf(EaseValueTaskBase.prototype), "stop", this).call(this);

        if (toEnd) {
          this.timer.setT(1);
          this.updateGameObject(this.target, this.timer);
          this.complete();
        }

        return this;
      }
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this.isRunning || !this.enable || !this.parent.active) {
          return this;
        }

        var target = this.target,
            timer = this.timer;
        timer.update(time, delta); // isDelay, isCountDown, isDone

        if (!timer.isDelay) {
          this.updateGameObject(target, timer);
        }

        this.emit('update', target, this);

        if (timer.isDone) {
          this.complete();
        }

        return this;
      } // Override

    }, {
      key: "updateGameObject",
      value: function updateGameObject(target, timer) {}
    }]);

    return EaseValueTaskBase;
  }(TimerTickTask);

  var GetValue$a = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
  var Linear = Phaser.Math.Linear;

  var Fade = /*#__PURE__*/function (_EaseValueTaskBase) {
    _inherits(Fade, _EaseValueTaskBase);

    var _super = _createSuper(Fade);

    function Fade(scene, sound, config) {
      var _this;

      _classCallCheck(this, Fade);

      sound.scene = scene;
      sound.active = true;
      _this = _super.call(this, sound, config); // this.parent = sound
      // this.timer

      _this.volume = {};

      _this.resetFromJSON(config);

      return _this;
    }

    _createClass(Fade, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        _get(_getPrototypeOf(Fade.prototype), "resetFromJSON", this).call(this, o);

        this.setMode(GetValue$a(o, 'mode', 0));
        this.setEnable(GetValue$a(o, 'enable', true));
        this.setVolumeRange(GetAdvancedValue$1(o, 'volume.start', this.parent.volume), GetAdvancedValue$1(o, 'volume.end', 0));
        return this;
      }
    }, {
      key: "setMode",
      value: function setMode(m) {
        if (typeof m === 'string') {
          m = MODE[m];
        }

        this.mode = m;
        return this;
      }
    }, {
      key: "setVolumeRange",
      value: function setVolumeRange(start, end) {
        this.volume.start = start;
        this.volume.end = end;
        return this;
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timer.isRunning) {
          return this;
        }

        this.parent.setVolume(this.volume.start);
        this.timer.setDelay(this.delay).setDuration(this.duration);

        _get(_getPrototypeOf(Fade.prototype), "start", this).call(this);

        return this;
      }
    }, {
      key: "updateGameObject",
      value: function updateGameObject(sound, timer) {
        sound.volume = Linear(this.volume.start, this.volume.end, timer.t);
      }
    }, {
      key: "complete",
      value: function complete() {
        _get(_getPrototypeOf(Fade.prototype), "complete", this).call(this);

        switch (this.mode) {
          case 1:
            this.parent.stop();
            break;

          case 2:
            this.parent.destroy();
            break;
        }

        return this;
      }
    }]);

    return Fade;
  }(EaseValueTaskBase);

  var MODE = {
    stop: 1,
    destroy: 2
  };

  var FadeIn = function FadeIn(scene, sound, duration, endVolume, startVolume) {
    if (endVolume === undefined) {
      endVolume = 1;
    }

    if (startVolume === undefined) {
      startVolume = 0;
    }

    var config = {
      mode: 0,
      volume: {
        start: startVolume,
        end: endVolume
      },
      duration: duration
    }; // create sound instance by key

    if (typeof sound === 'string') {
      sound = scene.sys.sound.add(sound);
    }

    var fade;

    if (sound.hasOwnProperty('_fade')) {
      fade = sound._fade;
      fade.stop().resetFromJSON(config);
    } else {
      fade = new Fade(scene, sound, config);
      sound._fade = fade;
    }

    fade.start();

    if (!sound.isPlaying) {
      sound.setVolume(startVolume).play();
    }

    return sound;
  };

  var FadeOut = function FadeOut(scene, sound, duration, destroy) {
    if (destroy === undefined) {
      destroy = true;
    }

    var config = {
      mode: destroy ? 2 : 1,
      // 1: stop, 2: destroy
      volume: {
        start: sound.volume,
        end: 0
      },
      duration: duration
    };
    var fade;

    if (sound.hasOwnProperty('_fade')) {
      fade = sound._fade;
      fade.stop().resetFromJSON(config);
    } else {
      fade = new Fade(scene, sound, config);
      sound._fade = fade;
    }

    fade.start();

    if (!sound.isPlaying) {
      sound.play();
    }

    return sound;
  };

  var GetValue$9 = Phaser.Utils.Objects.GetValue;
  var RemoveItem$1 = Phaser.Utils.Array.Remove;

  var SoundManager = /*#__PURE__*/function () {
    function SoundManager(scene, config) {
      _classCallCheck(this, SoundManager);

      this.scene = scene; // Sound effect will be destroyed when completed

      this.soundEffects = []; // Background music will be (fade out)destroyed when play next one.

      this.backgroundMusic = undefined;
      this.setBackgroundMusicLoopValue(GetValue$9(config, 'bgm.loop', true));
      this.setBackgroundMusicFadeTime(GetValue$9(config, 'bgm.fade', 500));
      var initialBackgroundMusic = GetValue$9(config, 'bgm.initial', undefined);

      if (initialBackgroundMusic) {
        this.setCurrentBackgroundMusic(initialBackgroundMusic);
      }
    }

    _createClass(SoundManager, [{
      key: "destroy",
      value: function destroy(fromScene) {
        if (this.soundEffects.length && !fromScene) {
          for (var i = this.soundEffects.length - 1; i >= 0; i--) {
            this.soundEffects[i].destroy();
          }
        }

        this.soundEffects.length = 0;

        if (this.backgroundMusic && !fromScene) {
          this.backgroundMusic.destroy();
        }

        this.backgroundMusic = undefined;
        this.scene = undefined;
      }
    }, {
      key: "setBackgroundMusicLoopValue",
      value: function setBackgroundMusicLoopValue(value) {
        this.backgroundMusicLoopValue = value;
        return this;
      }
    }, {
      key: "setBackgroundMusicFadeTime",
      value: function setBackgroundMusicFadeTime(time) {
        this.backgroundMusicFadeTime = time;
        return this;
      }
    }, {
      key: "getSoundEffects",
      value: function getSoundEffects() {
        return this.soundEffects;
      }
    }, {
      key: "getLastSoundEffect",
      value: function getLastSoundEffect() {
        return this.soundEffects[this.soundEffects.length - 1];
      }
    }, {
      key: "getBackgroundMusic",
      value: function getBackgroundMusic() {
        return this.backgroundMusic;
      }
    }, {
      key: "playSoundEffect",
      value: function playSoundEffect(key) {
        var soundEffect = this.scene.sys.sound.add(key);
        this.soundEffects.push(soundEffect);
        soundEffect.once('complete', function () {
          soundEffect.destroy(); // SoundManager has been destroyed

          if (!this.scene) {
            return;
          }

          RemoveItem$1(this.soundEffects, soundEffect);
        }, this).once('destroy', function () {
          // SoundManager has been destroyed
          if (!this.scene) {
            return;
          }

          RemoveItem$1(this.soundEffects, soundEffect);
        }, this).play();
        return this;
      }
    }, {
      key: "setSoundEffectVolume",
      value: function setSoundEffectVolume(volume) {
        var soundEffect = this.getLastSoundEffect();

        if (soundEffect) {
          soundEffect.setVolume(volume);
        }

        return this;
      }
    }, {
      key: "fadeInSoundEffect",
      value: function fadeInSoundEffect(time) {
        var soundEffect = this.getLastSoundEffect();

        if (soundEffect) {
          FadeIn(this.scene, soundEffect, time);
        }

        return this;
      }
    }, {
      key: "fadeOutSoundEffect",
      value: function fadeOutSoundEffect(time, isStopped) {
        var soundEffect = this.getLastSoundEffect();

        if (soundEffect) {
          FadeOut(this.scene, soundEffect, time, isStopped);
        }

        return this;
      }
    }, {
      key: "fadeOutAllSoundEffects",
      value: function fadeOutAllSoundEffects(time, isStopped) {
        for (var i = this.soundEffects.length - 1; i >= 0; i--) {
          FadeOut(this.scene, this.soundEffects[i], time, isStopped);
        }

        return this;
      }
    }, {
      key: "setCurrentBackgroundMusic",
      value: function setCurrentBackgroundMusic(music) {
        this.backgroundMusic = music;

        if (music) {
          music.setLoop(this.backgroundMusicLoopValue);
          music.once('complete', function () {
            this.backgroundMusic.destroy();
            this.backgroundMusic = undefined;
          }, this).once('destroy', function () {
            this.backgroundMusic = undefined;
          }, this);

          if (!music.isPlaying) {
            music.play();
          }
        }
      }
    }, {
      key: "playBackgroundMusic",
      value: function playBackgroundMusic(key) {
        // Don't re-play the same background music
        if (this.backgroundMusic && this.backgroundMusic.key === key) {
          return this;
        }

        this.stopBackgroundMusic(); // Stop previous background music

        this.setCurrentBackgroundMusic(this.scene.sys.sound.add(key));

        if (this.backgroundMusicFadeTime > 0) {
          this.fadeInBackgroundMusic(this.backgroundMusicFadeTime);
        }

        return this;
      }
    }, {
      key: "pauseBackgroundMusic",
      value: function pauseBackgroundMusic() {
        if (this.backgroundMusic) {
          this.backgroundMusic.pause();
        }

        return this;
      }
    }, {
      key: "resumeBackgroundMusic",
      value: function resumeBackgroundMusic() {
        if (this.backgroundMusic) {
          this.backgroundMusic.resume();
        }

        return this;
      }
    }, {
      key: "stopBackgroundMusic",
      value: function stopBackgroundMusic() {
        if (this.backgroundMusic) {
          if (this.backgroundMusicFadeTime > 0) {
            this.fadeOutBackgroundMusic(this.backgroundMusicFadeTime, true);
          } else {
            this.backgroundMusic.stop();
            this.backgroundMusic.destroy();
            this.backgroundMusic = undefined;
          }
        }

        return this;
      }
    }, {
      key: "fadeInBackgroundMusic",
      value: function fadeInBackgroundMusic(time) {
        if (this.backgroundMusic) {
          FadeIn(this.scene, this.backgroundMusic, time);
        }

        return this;
      }
    }, {
      key: "fadeOutBackgroundMusic",
      value: function fadeOutBackgroundMusic(time, isStopped) {
        if (this.backgroundMusic) {
          FadeOut(this.scene, this.backgroundMusic, time, isStopped);
        }

        return this;
      }
    }, {
      key: "crossFadeBackgroundMusic",
      value: function crossFadeBackgroundMusic(key, time) {
        var backgroundMusicFadeTimeSave = this.backgroundMusicFadeTime;
        this.backgroundMusicFadeTime = 0;
        this.fadeOutBackgroundMusic(time, true).playBackgroundMusic(key).fadeInBackgroundMusic(time);
        this.backgroundMusicFadeTime = backgroundMusicFadeTimeSave;
        return this;
      }
    }]);

    return SoundManager;
  }();

  var BobBase = /*#__PURE__*/function () {
    function BobBase(GOManager, gameObject, name) {
      _classCallCheck(this, BobBase);

      this.GOManager = GOManager;
      this.gameObject = gameObject.setName(name);
      this.tweens = {};
      this.name = name;
    }

    _createClass(BobBase, [{
      key: "scene",
      get: function get() {
        return this.GOManager.scene;
      }
    }, {
      key: "timeScale",
      get: function get() {
        return this.GOManager.timeScale;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.freeGO().freeTweens();
        this.GOManager = undefined;
      }
    }, {
      key: "freeGO",
      value: function freeGO() {
        this.gameObject.destroy();
        this.gameObject = undefined;
        return this;
      }
    }, {
      key: "freeTweens",
      value: function freeTweens() {
        var tweenTasks = this.tweens;

        for (var propName in tweenTasks) {
          tweenTasks[propName].remove();
          delete tweenTasks[propName];
        }

        return this;
      }
    }, {
      key: "setProperty",
      value: function setProperty(property, value) {
        this.gameObject[property] = value;
        return this;
      }
    }, {
      key: "easeProperty",
      value: function easeProperty(property, value, duration, ease, repeat, isYoyo, _onComplete) {
        var tweenTasks = this.tweens;

        if (tweenTasks.hasOwnProperty(property)) {
          tweenTasks[property].remove();
        }

        var gameObject = this.gameObject;
        var config = {
          targets: gameObject,
          duration: duration,
          ease: ease,
          repeat: repeat,
          yoyo: isYoyo,
          onComplete: function onComplete() {
            tweenTasks[property].remove();
            delete tweenTasks[property];

            if (_onComplete) {
              _onComplete(gameObject, property);
            }
          },
          onCompleteScope: this
        };
        config[property] = value;
        var tween = this.scene.tweens.add(config);
        tween.timeScale = this.timeScale;
        tweenTasks[property] = tween;
        return this;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        var tweenTasks = this.tweens;

        for (var key in tweenTasks) {
          tweenTasks[key].timeScale = timeScale;
        }

        return this;
      }
    }]);

    return BobBase;
  }();

  var IsEmpty = function IsEmpty(source) {
    for (var k in source) {
      return false;
    }

    return true;
  };

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

  var AddTintRGBProperties = function AddTintRGBProperties(gameObject, tintRGB) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('tintR')) {
      return gameObject;
    }

    if (tintRGB === undefined) {
      tintRGB = 0xffffff;
    }

    var tintR = GetR(tintRGB);
    var tintG = GetG(tintRGB);
    var tintB = GetB(tintRGB); // Override tint property

    Object.defineProperty(gameObject, 'tint', {
      get: function get() {
        return tintRGB;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xffffff;
        gameObject.setTint(value);

        if (tintRGB !== value) {
          tintRGB = value;
          tintR = GetR(tintRGB);
          tintG = GetG(tintRGB);
          tintB = GetB(tintRGB); // gameObject.emit('_tintchange', value, tintR, tintG, tintB);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintR', {
      get: function get() {
        return tintR;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;

        if (tintR !== value) {
          tintR = value;
          gameObject.tint = SetR(tintRGB, value);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintG', {
      get: function get() {
        return tintG;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;

        if (tintG !== value) {
          tintG = value;
          gameObject.tint = SetG(tintRGB, value);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintB', {
      get: function get() {
        return tintB;
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;

        if (tintB !== value) {
          tintB = value;
          gameObject.tint = SetB(tintRGB, value);
        }
      }
    });
    Object.defineProperty(gameObject, 'tintGray', {
      get: function get() {
        return Math.floor((tintR + tintG + tintB) / 3);
      },
      set: function set(value) {
        value = Math.floor(value) & 0xff;

        if (tintR !== value || tintG !== value || tintB !== value) {
          tintR = value;
          tintG = value;
          tintB = value;
          gameObject.tint = SetRGB(tintRGB, value, value, value);
        }
      }
    });
    gameObject.tint = tintRGB;
    return gameObject;
  };

  var EventEmitter$1 = Phaser.Events.EventEmitter;

  var MonitorViewport = function MonitorViewport(viewport) {
    if (viewport.events) {
      return viewport;
    }

    var events = new EventEmitter$1();
    var x = viewport.x;
    Object.defineProperty(viewport, 'x', {
      get: function get() {
        return x;
      },
      set: function set(value) {
        if (x !== value) {
          x = value;
          events.emit('update', viewport);
        }
      }
    });
    var y = viewport.y;
    Object.defineProperty(viewport, 'y', {
      get: function get() {
        return y;
      },
      set: function set(value) {
        if (y !== value) {
          y = value;
          events.emit('update', viewport);
        }
      }
    });
    var width = viewport.width;
    Object.defineProperty(viewport, 'width', {
      get: function get() {
        return width;
      },
      set: function set(value) {
        if (width !== value) {
          width = value;
          events.emit('update', viewport);
        }
      }
    });
    var height = viewport.height;
    Object.defineProperty(viewport, 'height', {
      get: function get() {
        return height;
      },
      set: function set(value) {
        if (height !== value) {
          height = value;
          events.emit('update', viewport);
        }
      }
    });
    viewport.events = events;
    return viewport;
  };

  var AddViewportCoordinateProperties = function AddViewportCoordinateProperties(gameObject, viewport, vpx, vpy, transformCallback) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('vp')) {
      return gameObject;
    }

    if (vpx === undefined) {
      vpx = 0.5;
    }

    if (vpy === undefined) {
      vpy = 0.5;
    }

    if (transformCallback === undefined) {
      transformCallback = DefaultTransformCallback;
    }

    MonitorViewport(viewport);
    var events = viewport.events;
    gameObject.vp = viewport; // Set position of game object when view-port changed.

    var Transform = function Transform() {
      transformCallback(gameObject, viewport, vpx, vpy);
    };

    events.on('update', Transform);
    gameObject.once('destroy', function () {
      events.off('update', Transform);
      gameObject.vp = undefined;
    });
    Object.defineProperty(gameObject, 'vpx', {
      get: function get() {
        return vpx;
      },
      set: function set(value) {
        if (vpx !== value) {
          vpx = value;
          Transform();
        }
      }
    });
    Object.defineProperty(gameObject, 'vpy', {
      get: function get() {
        return vpy;
      },
      set: function set(value) {
        if (vpy !== value) {
          vpy = value;
          Transform();
        }
      }
    });
    Transform();
  };

  var DefaultTransformCallback = function DefaultTransformCallback(gameObject, viewport, vpx, vpy) {
    gameObject.x = viewport.x + viewport.width * vpx;
    gameObject.y = viewport.y + viewport.height * vpy;
  };

  var RemoveItem = Phaser.Utils.Array.Remove;
  var AddMethods = {
    has: function has(name) {
      return this.bobs.hasOwnProperty(name);
    },
    get: function get(name) {
      return this.bobs[name];
    },
    getGO: function getGO(name) {
      return this.get(name).gameObject;
    },
    add: function add(name) {
      this.remove(name);

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var gameObject = this.createGameObjectCallback.apply(this, [this.scene].concat(args));

      if (this.fadeTime > 0) {
        AddTintRGBProperties(gameObject);
      }

      if (this.viewportCoordinateEnable) {
        AddViewportCoordinateProperties(gameObject);
      }

      gameObject.once('destroy', function () {
        RemoveItem(this.removedGOs, gameObject);

        if (this.isEmpty) {
          this.emit('empty');
        }
      }, this);
      var bob = new this.BobClass(this, gameObject, name);
      this.bobs[name] = bob;

      if (this.fadeTime > 0) {
        bob.setProperty('tintGray', 0).easeProperty('tintGray', 255, this.fadeTime);
      }

      return this;
    }
  };

  var RemoveMethods = {
    remove: function remove(name) {
      if (!this.has(name)) {
        return this;
      }

      var bob = this.get(name);
      delete this.bobs[name];
      this.removedGOs.push(bob.gameObject);

      if (this.fadeTime > 0) {
        bob.easeProperty('tintGray', // property
        0, // to value
        this.fadeTime, // duration
        'Linear', // ease
        0, // repeat
        false, // yoyo
        function () {
          // onComplete
          bob.destroy();
        });
      } else {
        bob.destroy();
      }

      return this;
    },
    removeAll: function removeAll() {
      var bobs = this.bobs;

      for (var name in bobs) {
        this.remove(name);
      }

      return this;
    },
    clear: function clear(destroyChild) {
      if (destroyChild === undefined) {
        destroyChild = true;
      }

      var bobs = this.bobs;

      for (var name in bobs) {
        if (destroyChild) {
          bobs[name].destroy();
        }

        delete bobs[name];
      }

      this.removedGOs.length = 0;
      return this;
    }
  };

  var PropertyMethods = {
    setProperty: function setProperty(name, property, value) {
      if (!this.has(name)) {
        return this;
      }

      this.get(name).setProperty(property, value);
      return this;
    },
    easeProperty: function easeProperty(name, property, value, duration, ease, repeat, isYoyo, onComplete) {
      if (!this.has(name)) {
        return this;
      }

      if (duration === undefined) {
        duration = 1000;
      }

      if (ease === undefined) {
        ease = 'Linear';
      }

      if (repeat === undefined) {
        repeat = 0;
      }

      if (isYoyo === undefined) {
        isYoyo = false;
      }

      this.get(name).easeProperty(property, value, duration, ease, repeat, isYoyo, onComplete);
      return this;
    },
    getTweenTask: function getTweenTask(name, property) {
      if (this.has(name)) {
        var tweenTasks = this.get(name).tweens;

        if (tweenTasks.hasOwnProperty(property)) {
          return tweenTasks[property];
        }
      }

      return null;
    }
  };

  var Methods$3 = {};
  Object.assign(Methods$3, AddMethods, RemoveMethods, PropertyMethods);

  var GetValue$8 = Phaser.Utils.Objects.GetValue;

  var GOManager = /*#__PURE__*/function () {
    function GOManager(scene, config) {
      _classCallCheck(this, GOManager);

      this.scene = scene;
      this.BobClass = GetValue$8(config, 'BobClass', BobBase);
      this.setCreateGameObjectCallback(GetValue$8(config, 'createGameObject'));
      this.setEventEmitter(GetValue$8(config, 'eventEmitter', undefined));
      this.setGOFadeTime(GetValue$8(config, 'fade', 500));
      this.setViewportCoordinateEnable(GetValue$8(config, 'viewportCoordinate', false));
      this.bobs = {};
      this.removedGOs = [];
      this._timeScale = 1;
    }

    _createClass(GOManager, [{
      key: "destroy",
      value: function destroy(fromScene) {
        this.clear(!fromScene);
        this.createGameObjectCallback = undefined;
        this.scene = undefined;
      }
    }, {
      key: "timeScale",
      get: function get() {
        return this._timeScale;
      },
      set: function set(timeScale) {
        if (this._timeScale === timeScale) {
          return;
        }

        this._timeScale = timeScale;
        var bobs = this.bobs;

        for (var name in bobs) {
          bobs[name].setTimeScale(timeScale);
        }
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
      }
    }, {
      key: "setCreateGameObjectCallback",
      value: function setCreateGameObjectCallback(callback) {
        if (!callback) {
          this.createGameObjectCallback = function (scene, textureKey, frameName) {
            return scene.add.sprite(0, 0, textureKey, frameName);
          };
        } else {
          this.createGameObjectCallback = callback;
        }

        return this;
      }
    }, {
      key: "setGOFadeTime",
      value: function setGOFadeTime(time) {
        this.fadeTime = time;
        return this;
      }
    }, {
      key: "setViewportCoordinateEnable",
      value: function setViewportCoordinateEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.viewportCoordinateEnable = enable;
        return this;
      }
    }, {
      key: "isEmpty",
      get: function get() {
        return IsEmpty(this.bobs) && this.removedGOs.length === 0;
      }
    }]);

    return GOManager;
  }();

  Object.assign(GOManager.prototype, EventEmitterMethods, Methods$3);

  var SpriteBob = /*#__PURE__*/function (_BobBase) {
    _inherits(SpriteBob, _BobBase);

    var _super = _createSuper(SpriteBob);

    function SpriteBob() {
      _classCallCheck(this, SpriteBob);

      return _super.apply(this, arguments);
    }

    _createClass(SpriteBob, [{
      key: "setTexture",
      value: function setTexture(textureKey, frameKey) {
        this.gameObject.setTexture(textureKey, frameKey);
        return this;
      }
    }, {
      key: "playAnimation",
      value: function playAnimation(key) {
        this.gameObject.anims.timeScale = this.timeScale;
        this.gameObject.play(key);
        return this;
      }
    }, {
      key: "stopAnimation",
      value: function stopAnimation() {
        this.gameObject.stop();
        return this;
      }
    }, {
      key: "chainAnimation",
      value: function chainAnimation(keys) {
        this.gameObject.chain(keys);
        return this;
      }
    }, {
      key: "pauseAnimation",
      value: function pauseAnimation() {
        this.gameObject.anims.pause();
        return this;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(timeScale) {
        _get(_getPrototypeOf(SpriteBob.prototype), "setTimeScale", this).call(this, timeScale);

        if (this.gameObject.anims) {
          this.gameObject.anims.timeScale = timeScale;
        }

        return this;
      }
    }]);

    return SpriteBob;
  }(BobBase);

  var AnimationMethods = {
    playAnimation: function playAnimation(name, key) {
      if (!this.has(name)) {
        this.add(name);
      }

      this.get(name).playAnimation(key);
      return this;
    },
    stopAnimation: function stopAnimation(name) {
      if (!this.has(name)) {
        return this;
      }

      this.get(name).stopAnimation();
      return this;
    },
    chainAnimation: function chainAnimation(name, keys) {
      if (!this.has(name)) {
        return this;
      }

      this.get(name).chainAnimation(keys);
      return this;
    },
    pauseAnimation: function pauseAnimation(name) {
      if (!this.has(name)) {
        return this;
      }

      this.get(name).pauseAnimation();
      return this;
    },
    setTexture: function setTexture(name, textureKey, frameKey) {
      if (!this.has(name)) {
        return this;
      }

      this.get(name).setTexture(textureKey, frameKey);
      return this;
    }
  };

  var Methods$2 = {};
  Object.assign(Methods$2, AnimationMethods);

  var SpriteManager = /*#__PURE__*/function (_GOManager) {
    _inherits(SpriteManager, _GOManager);

    var _super = _createSuper(SpriteManager);

    function SpriteManager(scene, config) {
      _classCallCheck(this, SpriteManager);

      if (config === undefined) {
        config = {};
      }

      config.BobClass = SpriteBob;
      return _super.call(this, scene, config);
    }

    _createClass(SpriteManager, [{
      key: "setCreateGameObjectCallback",
      value: function setCreateGameObjectCallback(callback) {
        if (!callback || callback === 'sprite') {
          this.createGameObjectCallback = function (scene, textureKey, frameName) {
            return scene.add.sprite(0, 0, textureKey, frameName);
          };
        } else if (callback === 'image') {
          this.createGameObjectCallback = function (scene, textureKey, frameName) {
            return scene.add.image(0, 0, textureKey, frameName);
          };
        } else {
          this.createGameObjectCallback = callback;
        }

        return this;
      }
    }]);

    return SpriteManager;
  }(GOManager);

  Object.assign(SpriteManager.prototype, Methods$2);

  var TextKlass = Phaser.GameObjects.Text;

  var IsTextGameObject = function IsTextGameObject(gameObject) {
    return gameObject instanceof TextKlass;
  };

  var BitmapTextKlass = Phaser.GameObjects.BitmapText;

  var IsBitmapTextGameObject = function IsBitmapTextGameObject(gameObject) {
    return gameObject instanceof BitmapTextKlass;
  };

  var TextType = 0;
  var TagTextType = 1;
  var BitmapTextType = 2;

  var GetTextObjectType = function GetTextObjectType(textObject) {
    var textObjectType;

    if (IsBitmapTextGameObject(textObject)) {
      textObjectType = BitmapTextType;
    } else if (IsTextGameObject(textObject)) {
      textObjectType = TextType;
    } else {
      textObjectType = TagTextType;
    }

    return textObjectType;
  };

  var GetWrapText = function GetWrapText(textObject, text) {
    var textObjectType = GetTextObjectType(textObject);

    switch (textObjectType) {
      case TextType:
        textObject.style.syncFont(textObject.canvas, textObject.context);
        text = textObject.runWordWrap(text);
        break;

      case TagTextType:
        text = textObject.getText(text, undefined, undefined, true);
        break;

      case BitmapTextType:
        text = textObject.setText(text).getTextBounds().wrappedText;
        break;
    }

    return text;
  };

  var SetNoWrapText = function SetNoWrapText(textObject, text) {
    var textObjectType = GetTextObjectType(textObject);

    switch (textObjectType) {
      case TextType:
        // Store wrap properties
        var style = textObject.style;
        var wordWrapWidth = style.wordWrapWidth;
        var wordWrapCallback = style.wordWrapCallback; // Disable wrap

        style.wordWrapWidth = 0;
        style.wordWrapCallback = undefined; // Set text

        textObject.setText(text); // Restore wrap

        style.wordWrapWidth = wordWrapWidth;
        style.wordWrapCallback = wordWrapCallback;
        break;

      case TagTextType:
        // Store wrap properties
        var style = textObject.style;
        var wrapMode = style.wrapMode; // Disable wrap

        style.wrapMode = 0; // Set text

        textObject.setText(text); // Restore wrap

        style.wrapMode = wrapMode;
        break;

      case BitmapTextType:
        // Store wrap properties
        var maxWidth = textObject._maxWidth; // Disable wrap

        textObject._maxWidth = 0; // Set text

        textObject.setText(text); // Restore wrap

        textObject._maxWidth = maxWidth;
        break;
    }
  };

  var GetFastValue$1 = Phaser.Utils.Objects.GetFastValue;
  var GetValue$7 = Phaser.Utils.Objects.GetValue;

  var TextTyping = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TextTyping, _ComponentBase);

    var _super = _createSuper(TextTyping);

    function TextTyping(gameObject, config) {
      var _this;

      _classCallCheck(this, TextTyping);

      _this = _super.call(this, gameObject, config); // this.parent = gameObject;

      _this.timer = null;

      _this.resetFromJSON(config);

      return _this;
    }

    _createClass(TextTyping, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.setTextWrapEnable(GetValue$7(o, 'wrap', false));
        this.setTypeMode(GetValue$7(o, 'typeMode', 0));
        this.setTypeSpeed(GetValue$7(o, 'speed', 333));
        this.setTextCallback = GetFastValue$1(o, 'setTextCallback', null);
        this.setTextCallbackScope = GetFastValue$1(o, 'setTextCallbackScope', null);
        this.setTypingContent(GetFastValue$1(o, 'text', ''));
        this.typingIdx = GetFastValue$1(o, 'typingIdx', 0);
        this.insertIdx = GetFastValue$1(o, 'insertIdx', null);
        var elapsed = GetFastValue$1(o, 'elapsed', null);

        if (elapsed !== null) {
          this.start(undefined, undefined, this.typingIdx, elapsed);
        }

        return this;
      }
    }, {
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        this.freeTimer();

        _get(_getPrototypeOf(TextTyping.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setTypeMode",
      value: function setTypeMode(m) {
        if (typeof m === 'string') {
          m = TYPEMODE[m];
        }

        this.typeMode = m;
        return this;
      }
    }, {
      key: "setTypeSpeed",
      value: function setTypeSpeed(speed) {
        this.speed = speed;
        return this;
      }
    }, {
      key: "setTextWrapEnable",
      value: function setTextWrapEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }

        this.textWrapEnable = enable;
        return this;
      }
    }, {
      key: "text",
      get: function get() {
        return this._text;
      },
      set: function set(value) {
        var text = TransferText(value);

        if (this.textWrapEnable) {
          text = GetWrapText(this.parent, text);
        }

        this._text = text;
      }
    }, {
      key: "isTyping",
      get: function get() {
        return this.getTimer() !== null;
      }
    }, {
      key: "isLastChar",
      get: function get() {
        return this.typingIdx === this.textLen;
      }
    }, {
      key: "start",
      value: function start(text, speed, startIdx, timerStartAt) {
        if (text !== undefined) {
          this.setTypingContent(text);
        }

        if (speed !== undefined) {
          this.speed = speed;
        }

        if (startIdx === undefined) {
          startIdx = 0;
        }

        this.typingIdx = startIdx + 1;

        if (this.speed === 0) {
          this.stop(true);
        } else {
          this.setText('');
          this.startTimer(timerStartAt);
        }

        return this;
      }
    }, {
      key: "appendText",
      value: function appendText(text) {
        var newText = this.text.concat(TransferText(text));

        if (this.isTyping) {
          this.setTypingContent(newText);
        } else {
          this.start(newText, undefined, this.textLen);
        }

        return this;
      }
    }, {
      key: "stop",
      value: function stop(showAllText) {
        var timer = this.getTimer();

        if (timer) {
          this.freeTimer();
        }

        if (showAllText) {
          this.typingIdx = this.textLen;
          this.setText(this.text);
          this.emit('type');
          this.emit('complete', this, this.parent);
        }

        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        var timer = this.getTimer();

        if (timer) {
          timer.paused = true;
        }

        return this;
      }
    }, {
      key: "resume",
      value: function resume() {
        var timer = this.getTimer();

        if (timer) {
          timer.paused = false;
        }

        return this;
      }
    }, {
      key: "setTypingContent",
      value: function setTypingContent(text) {
        this.text = text;
        this.textLen = this.getTextLength(this.text);
        return this;
      }
    }, {
      key: "onTyping",
      value: function onTyping() {
        var newText = this.getTypingString(this.text, this.typingIdx, this.textLen, this.typeMode);
        this.setText(newText);
        this.emit('type');

        if (this.isLastChar) {
          this.freeTimer();
          this.emit('complete', this, this.parent);
        } else {
          this.timer.delay = this.speed; // delay of next typing            

          this.typingIdx++;
        }
      }
    }, {
      key: "getTypingString",
      value: function getTypingString(text, typeIdx, textLen, typeMode) {
        var result;

        if (typeMode === 0) {
          //left-to-right
          var startIdx = 0;
          var endIdx = typeIdx;
          this.insertIdx = endIdx;
          result = this.getSubString(text, startIdx, endIdx);
        } else if (typeMode === 1) {
          //right-to-left
          var endIdx = textLen;
          var startIdx = endIdx - typeIdx;
          this.insertIdx = 0;
          result = this.getSubString(text, startIdx, endIdx);
        } else if (typeMode === 2) {
          //middle-to-sides
          var midIdx = textLen / 2;
          var startIdx = Math.floor(midIdx - typeIdx / 2);
          var endIdx = startIdx + typeIdx;
          this.insertIdx = typeIdx % 2 ? typeIdx : 0;
          result = this.getSubString(text, startIdx, endIdx);
        } else if (typeMode === 3) {
          //sides-to-middle
          var lowerLen = Math.floor(typeIdx / 2);
          var lowerResult;

          if (lowerLen > 0) {
            var endIdx = textLen;
            var startIdx = endIdx - lowerLen;
            lowerResult = this.getSubString(text, startIdx, endIdx);
          } else {
            lowerResult = "";
          }

          var upperLen = typeIdx - lowerLen;
          var upperResult;

          if (upperLen > 0) {
            var startIdx = 0;
            var endIdx = startIdx + upperLen;
            this.insertIdx = endIdx;
            upperResult = this.getSubString(text, startIdx, endIdx);
          } else {
            upperResult = "";
            this.insertIdx = 0;
          }

          result = upperResult + lowerResult;
        }

        return result;
      }
    }, {
      key: "startTimer",
      value: function startTimer(timerStartAt) {
        if (this.timer) {
          this.freeTimer();
        }

        var startAt;

        if (timerStartAt === undefined) {
          startAt = 0;
        } else {
          this.speed;
          startAt = timerStartAt;
        }

        this.timer = this.scene.time.addEvent({
          delay: 0,
          startAt: startAt,
          loop: true,
          callback: this.onTyping,
          callbackScope: this
        });
        return this;
      }
    }, {
      key: "getTimer",
      value: function getTimer() {
        return this.timer;
      }
    }, {
      key: "freeTimer",
      value: function freeTimer() {
        if (this.timer) {
          this.timer.remove();
          this.timer = null;
        }

        return this;
      }
    }, {
      key: "setText",
      value: function setText(text) {
        if (this.setTextCallback) {
          if (this.setTextCallbackScope) {
            text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIdx);
          } else {
            text = this.setTextCallback(text, this.isLastChar, this.insertIdx);
          }
        }

        if (this.textWrapEnable) {
          SetNoWrapText(this.parent, text);
        } else {
          this.parent.setText(text);
        }
      }
    }, {
      key: "getTextLength",
      value: function getTextLength(text) {
        var gameObject = this.parent;
        var len;

        if (gameObject.getPlainText) {
          len = gameObject.getPlainText(text).length;
        } else {
          len = text.length;
        }

        return len;
      }
    }, {
      key: "getSubString",
      value: function getSubString(text, startIdx, endIdx) {
        var gameObject = this.parent;
        var result;

        if (gameObject.getSubString) {
          result = gameObject.getSubString(text, startIdx, endIdx);
        } else {
          result = text.slice(startIdx, endIdx);
        }

        return result;
      }
    }]);

    return TextTyping;
  }(ComponentBase);

  var TransferText = function TransferText(text) {
    if (Array.isArray(text)) {
      text = text.join('\n');
    } else if (typeof text === 'number') {
      text = text.toString();
    }

    return text;
  };

  var TYPEMODE = {
    'left-to-right': 0,
    'right-to-left': 1,
    'middle-to-sides': 2,
    'sides-to-middle': 3
  };

  var TextBob = /*#__PURE__*/function (_BobBase) {
    _inherits(TextBob, _BobBase);

    var _super = _createSuper(TextBob);

    function TextBob() {
      _classCallCheck(this, TextBob);

      return _super.apply(this, arguments);
    }

    _createClass(TextBob, [{
      key: "setText",
      value: function setText(text) {
        this.gameObject.setText(text);
        return this;
      }
    }, {
      key: "setTypingSpeed",
      value: function setTypingSpeed(speed) {
        var gameObject = this.gameObject;

        if (!gameObject._typing) {
          gameObject._typing = new TextTyping(gameObject);
        }
      }
    }, {
      key: "typing",
      value: function typing(text, speed) {
        var gameObject = this.gameObject;

        if (!gameObject._typing) {
          gameObject._typing = new TextTyping(gameObject);
        }

        gameObject._typing.start(text, speed);

        return this;
      }
    }]);

    return TextBob;
  }(BobBase);

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */
  var Utils = Phaser.Renderer.WebGL.Utils;
  /**
   * Renders this Game Object with the WebGL Renderer to the given Camera.
   * The object will not render if any of its renderFlags are set or it is being actively filtered out by the Camera.
   * This method should not be called directly. It is a utility function of the Render module.
   *
   * @method Phaser.GameObjects.Text#renderWebGL
   * @since 3.0.0
   * @private
   *
   * @param {Phaser.Renderer.WebGL.WebGLRenderer} renderer - A reference to the current active WebGL renderer.
   * @param {Phaser.GameObjects.Text} src - The Game Object being rendered in this call.
   * @param {number} interpolationPercentage - Reserved for future use and custom pipelines.
   * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
   * @param {Phaser.GameObjects.Components.TransformMatrix} parentMatrix - This transform matrix is defined if the game object is nested
   */

  var WebGLRenderer = function WebGLRenderer(renderer, src, camera, parentMatrix) {
    if (src.width === 0 || src.height === 0) {
      return;
    }

    camera.addToRenderList(src);
    var frame = src.frame;
    var width = frame.width;
    var height = frame.height;
    var getTint = Utils.getTintAppendFloatAlpha;
    var pipeline = renderer.pipelines.set(src.pipeline, src);
    var textureUnit = pipeline.setTexture2D(frame.glTexture, src);
    renderer.pipelines.preBatch(src);
    pipeline.batchTexture(src, frame.glTexture, width, height, src.x, src.y, width / src.style.resolution, height / src.style.resolution, src.scaleX, src.scaleY, src.rotation, src.flipX, src.flipY, src.scrollFactorX, src.scrollFactorY, src.displayOriginX, src.displayOriginY, 0, 0, width, height, getTint(src.tintTopLeft, camera.alpha * src._alphaTL), getTint(src.tintTopRight, camera.alpha * src._alphaTR), getTint(src.tintBottomLeft, camera.alpha * src._alphaBL), getTint(src.tintBottomRight, camera.alpha * src._alphaBR), src.tintFill, 0, 0, camera, parentMatrix, false, textureUnit);
    renderer.pipelines.postBatch(src);
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2019 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */

  /**
   * Renders this Game Object with the Canvas Renderer to the given Camera.
   * The object will not render if any of its renderFlags are set or it is being actively filtered out by the Camera.
   * This method should not be called directly. It is a utility function of the Render module.
   *
   * @method Phaser.GameObjects.Text#renderCanvas
   * @since 3.0.0
   * @private
   *
   * @param {Phaser.Renderer.Canvas.CanvasRenderer} renderer - A reference to the current active Canvas renderer.
   * @param {Phaser.GameObjects.Text} src - The Game Object being rendered in this call.
   * @param {number} interpolationPercentage - Reserved for future use and custom pipelines.
   * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
   * @param {Phaser.GameObjects.Components.TransformMatrix} parentMatrix - This transform matrix is defined if the game object is nested
   */
  var CanvasRenderer = function CanvasRenderer(renderer, src, camera, parentMatrix) {
    if (src.width === 0 || src.height === 0) {
      return;
    }

    camera.addToRenderList(src);
    renderer.batchSprite(src, src.frame, camera, parentMatrix);
  };

  var Render = {
    renderWebGL: WebGLRenderer,
    renderCanvas: CanvasRenderer
  };

  /**
   * @author       Richard Davey <rich@photonstorm.com>
   * @copyright    2018 Photon Storm Ltd.
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   */
  var CanvasPool$2 = Phaser.Display.Canvas.CanvasPool;
  /**
   * Calculates the ascent, descent and fontSize of a given font style.
   *
   * @function Phaser.GameObjects.MeasureText
   * @since 3.0.0
   *
   * @param {Phaser.GameObjects.Text.TextStyle} textStyle - The TextStyle object to measure.
   *
   * @return {object} An object containing the ascent, descent and fontSize of the TextStyle.
   */

  var MeasureText = function MeasureText(textStyle) {
    // @property {HTMLCanvasElement} canvas - The canvas element that the text is rendered.
    var canvas = CanvasPool$2.create(this); // @property {HTMLCanvasElement} context - The context of the canvas element that the text is rendered to.

    var context = canvas.getContext('2d');
    textStyle.syncFont(canvas, context);
    var metrics = context.measureText(textStyle.testString);

    if ('actualBoundingBoxAscent' in metrics) {
      var ascent = metrics.actualBoundingBoxAscent;
      var descent = metrics.actualBoundingBoxDescent;
      var output = {
        ascent: ascent,
        descent: descent,
        fontSize: ascent + descent
      };
      CanvasPool$2.remove(canvas);
      return output;
    }

    var width = Math.ceil(metrics.width * textStyle.baselineX);
    var baseline = width;
    var height = 2 * baseline;
    baseline = baseline * textStyle.baselineY | 0;
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = '#f00';
    context.fillRect(0, 0, width, height);
    context.font = textStyle._font;
    context.textBaseline = 'alphabetic';
    context.fillStyle = '#000';
    context.fillText(textStyle.testString, 0, baseline);
    var output = {
      ascent: 0,
      descent: 0,
      fontSize: 0
    };

    if (!context.getImageData(0, 0, width, height)) {
      output.ascent = baseline;
      output.descent = baseline + 6;
      output.fontSize = output.ascent + output.descent;
      CanvasPool$2.remove(canvas);
      return output;
    }

    var imagedata = context.getImageData(0, 0, width, height).data;
    var pixels = imagedata.length;
    var line = width * 4;
    var i;
    var j;
    var idx = 0;
    var stop = false; // ascent. scan from top to bottom until we find a non red pixel

    for (i = 0; i < baseline; i++) {
      for (j = 0; j < line; j += 4) {
        if (imagedata[idx + j] !== 255) {
          stop = true;
          break;
        }
      }

      if (!stop) {
        idx += line;
      } else {
        break;
      }
    }

    output.ascent = baseline - i;
    idx = pixels - line;
    stop = false; // descent. scan from bottom to top until we find a non red pixel

    for (i = height; i > baseline; i--) {
      for (j = 0; j < line; j += 4) {
        if (imagedata[idx + j] !== 255) {
          stop = true;
          break;
        }
      }

      if (!stop) {
        idx -= line;
      } else {
        break;
      }
    }

    output.descent = i - baseline;
    output.fontSize = output.ascent + output.descent;
    CanvasPool$2.remove(canvas);
    return output;
  };

  var CONST = {
    // new line mode
    NO_NEWLINE: 0,
    RAW_NEWLINE: 1,
    WRAPPED_NEWLINE: 2,
    // wrap mode
    NO_WRAP: 0,
    WORD_WRAP: 1,
    CHAR_WRAP: 2,
    // split lines
    SPLITREGEXP: /(?:\r\n|\r|\n)/
  };

  var Pad = Phaser.Utils.String.Pad;

  var GetStyle = function GetStyle(style, canvas, context) {
    if (style == null) {
      return style;
    }

    switch (_typeof(style)) {
      case 'string':
        return style;

      case 'number':
        return "#".concat(Pad(Math.floor(style).toString(16), 6, '0', 1));

      case 'function':
        return style(canvas, context);

      case 'object':
        if (style.hasOwnProperty('r')) {
          if (style.hasOwnProperty('a')) {
            // rgba
            return "rgba(".concat(style.r, ",").concat(style.g, ",").concat(style.b, ",").concat(style.a, ")");
          } else {
            // rgb
            return "rgb(".concat(style.r, ",").concat(style.g, ",").concat(style.b, ")");
          }
        } else if (style.hasOwnProperty('h')) {
          if (style.hasOwnProperty('a')) {
            // hsla
            return "hsla(".concat(style.h, ",").concat(style.s, ",").concat(style.l, ",").concat(style.a, ")");
          } else {
            // hsl
            return "hsl(".concat(style.h, ",").concat(style.s, ",").concat(style.l, ")");
          }
        } else {
          return style; // Not a valid input
        }

      default:
        return style;
    }
  };

  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var GetValue$6 = Phaser.Utils.Objects.GetValue; //  Key: [ Object Key, Default Value, postCallback ]

  var propertyMap = {
    // background
    backgroundColor: ['backgroundColor', null, GetStyle],
    backgroundColor2: ['backgroundColor2', null, GetStyle],
    backgroundHorizontalGradient: ['backgroundHorizontalGradient', true, null],
    backgroundStrokeColor: ['backgroundStrokeColor', null, GetStyle],
    backgroundStrokeLineWidth: ['backgroundStrokeLineWidth', 2, null],
    backgroundCornerRadius: ['backgroundCornerRadius', 0, null],
    backgroundCornerIteration: ['backgroundCornerIteration', null, null],
    // font
    fontFamily: ['fontFamily', 'Courier', null],
    fontSize: ['fontSize', '16px', null],
    fontStyle: ['fontStyle', '', null],
    color: ['color', '#fff', GetStyle],
    stroke: ['stroke', '#fff', GetStyle],
    strokeThickness: ['strokeThickness', 0, null],
    shadowOffsetX: ['shadow.offsetX', 0, null],
    shadowOffsetY: ['shadow.offsetY', 0, null],
    shadowColor: ['shadow.color', '#000', GetStyle],
    shadowBlur: ['shadow.blur', 0, null],
    shadowStroke: ['shadow.stroke', false, null],
    shadowFill: ['shadow.fill', false, null],
    // underline
    underlineColor: ['underline.color', '#000', GetStyle],
    underlineThickness: ['underline.thickness', 0, null],
    underlineOffset: ['underline.offset', 0, null],
    // align
    halign: ['halign', 'left', null],
    valign: ['valign', 'top', null],
    // size
    maxLines: ['maxLines', 0, null],
    fixedWidth: ['fixedWidth', 0, null],
    fixedHeight: ['fixedHeight', 0, null],
    resolution: ['resolution', 0, null],
    lineSpacing: ['lineSpacing', 0, null],
    xOffset: ['xOffset', 0, null],
    rtl: ['rtl', false, null],
    testString: ['testString', '|MÃ‰qgy', null],
    baselineX: ['baselineX', 1.2, null],
    baselineY: ['baselineY', 1.4, null],
    // wrap
    wrapMode: ['wrap.mode', 0, null],
    wrapWidth: ['wrap.width', 0, null],
    wrapCallback: ['wrap.callback', null],
    wrapCallbackScope: ['wrap.callbackScope', null]
  };

  var TextStyle = /*#__PURE__*/function () {
    function TextStyle(text, style) {
      _classCallCheck(this, TextStyle);

      this.parent = text;
      this.backgroundColor;
      this.backgroundColor2;
      this.backgroundHorizontalGradient;
      this.backgroundStrokeColor;
      this.backgroundStrokeLineWidth;
      this.backgroundCornerRadius;
      this.backgroundCornerIteration;
      this.fontFamily;
      this.fontSize;
      this.fontStyle;
      this.color;
      this.stroke;
      this.strokeThickness;
      this.shadowOffsetX;
      this.shadowOffsetY;
      this.shadowColor;
      this.shadowBlur;
      this.shadowStroke;
      this.shadowFill;
      this.underlineColor;
      this.underlineThickness;
      this.underlineOffset;
      this.halign;
      this.valign;
      this.maxLines;
      this.fixedWidth;
      this.fixedHeight;
      this.resolution;
      this.lineSpacing;
      this.xOffset;
      this.rtl;
      this.testString;
      this.baselineX;
      this.baselineY;
      this.wrapMode;
      this.wrapWidth;
      this.wrapCallback;
      this.wrapCallbackScope;
      this._font; //  Set to defaults + user style

      this.setStyle(style, false, true);
    }

    _createClass(TextStyle, [{
      key: "canvas",
      get: function get() {
        return this.parent.canvasText.canvas;
      }
    }, {
      key: "context",
      get: function get() {
        return this.parent.canvasText.context;
      }
    }, {
      key: "isWrapFitMode",
      get: function get() {
        return this.fixedWidth > 0 && this.wrapMode !== CONST.NO_WRAP && this.wrapWidth === 0;
      }
    }, {
      key: "setStyle",
      value: function setStyle(style, updateText, setDefaults) {
        if (updateText === undefined) {
          updateText = true;
        }

        if (setDefaults === undefined) {
          setDefaults = false;
        }

        if (style && style.hasOwnProperty('wrap')) {
          var wrap = style.wrap;

          if (wrap.hasOwnProperty('mode')) {
            var mode = wrap.mode;

            if (typeof mode === 'string') {
              wrap.mode = WRAPMODE[mode];
            }
          } else {
            if (wrap.hasOwnProperty('width')) {
              wrap.mode = 1;
            }
          }
        } // default halign of RTL is 'right'


        if (style && style.rtl && setDefaults && !style.hasOwnProperty('halign')) {
          style.halign = 'right';
        } //  Avoid type mutation


        if (style && style.hasOwnProperty('fontSize') && typeof style.fontSize === 'number') {
          style.fontSize = style.fontSize.toString() + 'px';
        }

        for (var key in propertyMap) {
          var prop = propertyMap[key]; // [ Object Key, Default Value, preCallback ]

          var objKey = prop[0];
          var defaultValue = setDefaults ? prop[1] : this[key];
          var postCallback = prop[2];

          if (key === 'wrapCallback' || key === 'wrapCallbackScope') {
            // Callback & scope should be set without processing the values
            this[key] = GetValue$6(style, objKey, defaultValue);
          } else {
            var value = GetAdvancedValue(style, objKey, defaultValue);

            if (postCallback) {
              value = postCallback(value);
            }

            this[key] = value;
          }
        } //  Allow for 'font' override


        var font = GetValue$6(style, 'font', null);

        if (font === null) {
          this._font = this.fontStyle + ' ' + this.fontSize + ' ' + this.fontFamily;
        } else {
          this._font = font;
        } //  Allow for 'fill' to be used in place of 'color'


        var fill = GetValue$6(style, 'fill', null);

        if (fill !== null) {
          this.color = GetStyle(fill);
        }

        var imageData = GetValue$6(style, 'images', undefined);

        if (imageData) {
          this.parent.addImage(imageData);
        }

        var metrics = GetValue$6(style, 'metrics', false); //  Provide optional TextMetrics in the style object to avoid the canvas look-up / scanning
        //  Doing this is reset if you then change the font of this TextStyle after creation

        if (metrics) {
          this.metrics = {
            ascent: GetValue$6(metrics, 'ascent', 0),
            descent: GetValue$6(metrics, 'descent', 0),
            fontSize: GetValue$6(metrics, 'fontSize', 0)
          };
        } else if (updateText || !this.metrics) {
          this.metrics = MeasureText(this);
        }

        if (updateText) {
          return this.parent.updateText();
        } else {
          return this.parent;
        }
      }
    }, {
      key: "syncFont",
      value: function syncFont(canvas, context) {
        context.font = this._font;
      }
    }, {
      key: "syncStyle",
      value: function syncStyle(canvas, context) {
        context.textBaseline = 'alphabetic';
        context.fillStyle = this.color;
        context.strokeStyle = this.stroke;
        context.lineWidth = this.strokeThickness;
        context.lineCap = 'round';
        context.lineJoin = 'round';
      }
    }, {
      key: "syncShadow",
      value: function syncShadow(context, enabled) {
        if (enabled) {
          context.shadowOffsetX = this.shadowOffsetX;
          context.shadowOffsetY = this.shadowOffsetY;
          context.shadowColor = this.shadowColor;
          context.shadowBlur = this.shadowBlur;
        } else {
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.shadowColor = 0;
          context.shadowBlur = 0;
        }
      }
    }, {
      key: "update",
      value: function update(recalculateMetrics) {
        if (recalculateMetrics) {
          this._font = "".concat(this.fontStyle, " ").concat(this.fontSize, " ").concat(this.fontFamily).trim();
          this.metrics = MeasureText(this);
        }

        return this.parent.updateText(recalculateMetrics);
      }
    }, {
      key: "buildFont",
      value: function buildFont() {
        var newFont = "".concat(this.fontStyle, " ").concat(this.fontSize, " ").concat(this.fontFamily).trim();

        if (newFont !== this._font) {
          this._font = newFont; //this.metrics = MeasureText(this);
        }

        return this;
      }
    }, {
      key: "setFont",
      value: function setFont(font) {
        if (typeof font === 'string') {
          this.fontFamily = font;
          this.fontSize = '';
          this.fontStyle = '';
        } else {
          this.fontFamily = GetValue$6(font, 'fontFamily', 'Courier');
          this.fontSize = GetValue$6(font, 'fontSize', '16px');
          this.fontStyle = GetValue$6(font, 'fontStyle', '');
        }

        return this.update(true);
      }
    }, {
      key: "setFontFamily",
      value: function setFontFamily(family) {
        this.fontFamily = family;
        return this.update(true);
      }
    }, {
      key: "setFontStyle",
      value: function setFontStyle(style) {
        this.fontStyle = style;
        return this.update(true);
      }
    }, {
      key: "setFontSize",
      value: function setFontSize(size) {
        if (typeof size === 'number') {
          size = size.toString() + 'px';
        }

        this.fontSize = size;
        return this.update(true);
      }
    }, {
      key: "setTestString",
      value: function setTestString(string) {
        this.testString = string;
        return this.update(true);
      }
    }, {
      key: "setFixedSize",
      value: function setFixedSize(width, height) {
        this.fixedWidth = width;
        this.fixedHeight = height;

        if (width) {
          this.parent.width = width;
        }

        if (height) {
          this.parent.height = height;
        }

        return this.update(this.isWrapFitMode);
      }
    }, {
      key: "setResolution",
      value: function setResolution(value) {
        this.resolution = value;
        return this.update(false);
      }
    }, {
      key: "setLineSpacing",
      value: function setLineSpacing(value) {
        this.lineSpacing = value;
        return this.update(false);
      }
    }, {
      key: "setXOffset",
      value: function setXOffset(value) {
        this.xOffset = value;
        return this.update(false);
      }
    }, {
      key: "setBackgroundColor",
      value: function setBackgroundColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
          isHorizontalGradient = true;
        }

        this.backgroundColor = GetStyle(color, this.canvas, this.context);
        this.backgroundColor2 = GetStyle(color2, this.canvas, this.context);
        this.backgroundHorizontalGradient = isHorizontalGradient;
        return this.update(false);
      }
    }, {
      key: "setBackgroundStrokeColor",
      value: function setBackgroundStrokeColor(color, lineWidth) {
        this.backgroundStrokeColor = GetStyle(color, this.canvas, this.context);
        this.backgroundStrokeLineWidth = lineWidth;
        return this.update(false);
      }
    }, {
      key: "setBackgroundCornerRadius",
      value: function setBackgroundCornerRadius(radius, iteration) {
        this.backgroundCornerRadius = radius;
        this.backgroundCornerIteration = iteration;
        return this.update(false);
      }
    }, {
      key: "setFill",
      value: function setFill(color) {
        this.color = GetStyle(color, this.canvas, this.context);
        return this.update(false);
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        this.color = GetStyle(color, this.canvas, this.context);
        return this.update(false);
      }
    }, {
      key: "setStroke",
      value: function setStroke(color, thickness) {
        if (color === undefined) {
          //  Reset the stroke to zero (disabling it)
          this.strokeThickness = 0;
        } else {
          if (thickness === undefined) {
            thickness = this.strokeThickness;
          }

          this.stroke = GetStyle(color, this.canvas, this.context);
          this.strokeThickness = thickness;
        }

        return this.update(true);
      }
    }, {
      key: "setShadow",
      value: function setShadow(x, y, color, blur, shadowStroke, shadowFill) {
        if (x === undefined) {
          x = 0;
        }

        if (y === undefined) {
          y = 0;
        }

        if (color === undefined) {
          color = '#000';
        }

        if (blur === undefined) {
          blur = 0;
        }

        if (shadowStroke === undefined) {
          shadowStroke = false;
        }

        if (shadowFill === undefined) {
          shadowFill = true;
        }

        this.shadowOffsetX = x;
        this.shadowOffsetY = y;
        this.shadowColor = GetStyle(color, this.canvas, this.context);
        this.shadowBlur = blur;
        this.shadowStroke = shadowStroke;
        this.shadowFill = shadowFill;
        return this.update(false);
      }
    }, {
      key: "setShadowOffset",
      value: function setShadowOffset(x, y) {
        if (x === undefined) {
          x = 0;
        }

        if (y === undefined) {
          y = x;
        }

        this.shadowOffsetX = x;
        this.shadowOffsetY = y;
        return this.update(false);
      }
    }, {
      key: "setShadowColor",
      value: function setShadowColor(color) {
        if (color === undefined) {
          color = '#000';
        }

        this.shadowColor = GetStyle(color, this.canvas, this.context);
        return this.update(false);
      }
    }, {
      key: "setShadowBlur",
      value: function setShadowBlur(blur) {
        if (blur === undefined) {
          blur = 0;
        }

        this.shadowBlur = blur;
        return this.update(false);
      }
    }, {
      key: "setShadowStroke",
      value: function setShadowStroke(enabled) {
        this.shadowStroke = enabled;
        return this.update(false);
      }
    }, {
      key: "setShadowFill",
      value: function setShadowFill(enabled) {
        this.shadowFill = enabled;
        return this.update(false);
      }
    }, {
      key: "setUnderline",
      value: function setUnderline(color, thickness, offset) {
        if (color === undefined) {
          color = '#000';
        }

        if (thickness === undefined) {
          thickness = 0;
        }

        if (offset === undefined) {
          offset = 0;
        }

        this.underlineColor = GetStyle(color, this.canvas, this.context);
        this.underlineThickness = thickness;
        this.underlineOffset = offset;
        return this.update(false);
      }
    }, {
      key: "setUnderlineColor",
      value: function setUnderlineColor(color) {
        if (color === undefined) {
          color = '#000';
        }

        this.underlineColor = GetStyle(color, this.canvas, this.context);
        return this.update(false);
      }
    }, {
      key: "setUnderlineThickness",
      value: function setUnderlineThickness(thickness) {
        if (thickness === undefined) {
          thickness = 0;
        }

        this.underlineThickness = thickness;
        return this.update(false);
      }
    }, {
      key: "setUnderlineOffset",
      value: function setUnderlineOffset(offset) {
        if (offset === undefined) {
          offset = 0;
        }

        this.underlineOffset = offset;
        return this.update(false);
      }
    }, {
      key: "setWrapMode",
      value: function setWrapMode(mode) {
        if (typeof mode === 'string') {
          mode = WRAPMODE[mode.toLowerCase()] || 0;
        }

        this.wrapMode = mode;
        return this.update(true);
      }
    }, {
      key: "setWrapWidth",
      value: function setWrapWidth(width) {
        this.wrapWidth = width;
        return this.update(false);
      }
    }, {
      key: "setAlign",
      value: function setAlign(halign, valign) {
        if (halign === undefined) {
          halign = 'left';
        }

        if (valign === undefined) {
          valign = 'top';
        }

        this.halign = halign;
        this.valign = valign;
        return this.update(false);
      }
    }, {
      key: "setHAlign",
      value: function setHAlign(halign) {
        if (halign === undefined) {
          halign = 'left';
        }

        this.halign = halign;
        return this.update(false);
      }
    }, {
      key: "setVAlign",
      value: function setVAlign(valign) {
        if (valign === undefined) {
          valign = 'top';
        }

        this.valign = valign;
        return this.update(false);
      }
    }, {
      key: "setMaxLines",
      value: function setMaxLines(max) {
        if (max === undefined) {
          max = 0;
        }

        this.maxLines = max;
        return this.update(false);
      }
    }, {
      key: "getTextMetrics",
      value: function getTextMetrics() {
        var metrics = this.metrics;
        return {
          ascent: metrics.ascent,
          descent: metrics.descent,
          fontSize: metrics.fontSize
        };
      }
    }, {
      key: "setTextMetrics",
      value: function setTextMetrics(metrics, font) {
        this.metrics.ascent = metrics.ascent;
        this.metrics.descent = metrics.descent;
        this.metrics.fontSize = metrics.fontSize;

        if (font) {
          if (typeof font === 'string') {
            this.fontFamily = font;
            this.fontSize = '';
            this.fontStyle = '';
          } else {
            this.fontFamily = GetValue$6(font, 'fontFamily', this.fontFamily);
            this.fontSize = GetValue$6(font, 'fontSize', this.fontSize);
            this.fontStyle = GetValue$6(font, 'fontStyle', this.fontStyle);
          }
        }

        return this.parent.updateText(true);
      }
    }, {
      key: "lineHeight",
      get: function get() {
        return this.metrics.fontSize + this.strokeThickness + this.lineSpacing;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var output = {};

        for (var key in propertyMap) {
          output[key] = this[key];
        }

        output.metrics = this.getTextMetrics();
        return output;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.parent = undefined;
      }
    }]);

    return TextStyle;
  }();
  var WRAPMODE = {
    none: CONST.NO_WRAP,
    word: CONST.WORD_WRAP,
    "char": CONST.CHAR_WRAP,
    character: CONST.CHAR_WRAP
  };

  var CanvasPool$1 = Phaser.Display.Canvas.CanvasPool;

  var MeasureTextMargins = function MeasureTextMargins(textStyle, testString, out) {
    if (out === undefined) {
      out = {};
    }

    var canvas = CanvasPool$1.create(this);
    var context = canvas.getContext('2d');
    textStyle.syncFont(canvas, context);
    var metrics = context.measureText(testString);
    var width = Math.ceil(metrics.width * textStyle.baselineX);
    var baseline = width;
    var height = 2 * baseline;
    baseline = baseline * textStyle.baselineY | 0;
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = '#f00';
    context.fillRect(0, 0, width, height);
    context.font = textStyle._font;
    context.textBaseline = 'alphabetic';
    context.fillStyle = '#000';
    context.fillText(textStyle.testString, 0, baseline);
    out.left = 0;

    if (width === 0 || height === 0 || !context.getImageData(0, 0, width, height)) {
      CanvasPool$1.remove(canvas);
      return out;
    }

    var imagedata = context.getImageData(0, 0, width, height).data;
    var stop = false;

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var idx = (y * width + x) * 4;

        if (imagedata[idx] !== 255) {
          out.left = x;
          stop = true;
          break;
        }
      }

      if (stop) {
        break;
      }
    }

    CanvasPool$1.remove(canvas);
    return out;
  };

  var GetValue$5 = Phaser.Utils.Objects.GetValue;

  var RoundRectangle = /*#__PURE__*/function () {
    function RoundRectangle(x, y, width, height, radiusConfig) {
      _classCallCheck(this, RoundRectangle);

      this.cornerRadius = {};
      this._width = 0;
      this._height = 0;
      this.setTo(x, y, width, height, radiusConfig);
    }

    _createClass(RoundRectangle, [{
      key: "setTo",
      value: function setTo(x, y, width, height, radiusConfig) {
        this.setPosition(x, y);
        this.setRadius(radiusConfig);
        this.setSize(width, height);
        return this;
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        if (x === undefined) {
          x = 0;
        }

        if (y === undefined) {
          y = x;
        }

        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "setRadius",
      value: function setRadius(value) {
        if (value === undefined) {
          value = 0;
        }

        this.radius = value;
        return this;
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
      }
    }, {
      key: "minWidth",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
      }
    }, {
      key: "minHeight",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        if (value == null) {
          value = 0;
        }

        this._width = Math.max(value, this.minWidth);
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        if (value == null) {
          value = 0;
        }

        this._height = Math.max(value, this.minHeight);
      }
    }, {
      key: "radius",
      get: function get() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.x, radius.tl.y, radius.tr.x, radius.tr.y, radius.bl.x, radius.bl.y, radius.br.x, radius.br.y);
      },
      set: function set(value) {
        var defaultRadiusX, defaultRadiusY;

        if (typeof value === 'number') {
          defaultRadiusX = value;
          defaultRadiusY = value;
        } else {
          defaultRadiusX = GetValue$5(value, 'x', 0);
          defaultRadiusY = GetValue$5(value, 'y', 0);
        }

        var radius = this.cornerRadius;
        radius.tl = GetRadius(GetValue$5(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
        radius.tr = GetRadius(GetValue$5(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
        radius.bl = GetRadius(GetValue$5(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
        radius.br = GetRadius(GetValue$5(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
      }
    }, {
      key: "radiusTL",
      get: function get() {
        var radius = this.cornerRadius.tl;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.tl, value);
      }
    }, {
      key: "radiusTR",
      get: function get() {
        var radius = this.cornerRadius.tr;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.tr, value);
      }
    }, {
      key: "radiusBL",
      get: function get() {
        var radius = this.cornerRadius.bl;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.bl, value);
      }
    }, {
      key: "radiusBR",
      get: function get() {
        var radius = this.cornerRadius.br;
        return Math.max(radius.x, radius.y);
      },
      set: function set(value) {
        SetRadius(this.cornerRadius.br, value);
      }
    }]);

    return RoundRectangle;
  }();

  var GetRadius = function GetRadius(radius, defaultRadiusX, defaultRadiusY) {
    if (radius === undefined) {
      return {
        x: defaultRadiusX,
        y: defaultRadiusY
      };
    } else if (typeof radius === 'number') {
      return {
        x: radius,
        y: radius
      };
    } else {
      return radius;
    }
  };

  var SetRadius = function SetRadius(radius, value) {
    if (typeof value === 'number') {
      radius.x = value;
      radius.y = value;
    } else {
      radius.x = GetValue$5(value, 'x', 0);
      radius.y = GetValue$5(value, 'y', 0);
    }
  };

  var DegToRad = Phaser.Math.DegToRad;
  var Rad0 = DegToRad(0);
  var Rad90 = DegToRad(90);
  var Rad180 = DegToRad(180);
  var Rad270 = DegToRad(270);

  var AddRoundRectanglePath = function AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration) {
    var geom = new RoundRectangle(x, y, width, height, radiusConfig),
        minWidth = geom.minWidth,
        minHeight = geom.minHeight,
        scaleRX = width >= minWidth ? 1 : width / minWidth,
        scaleRY = height >= minHeight ? 1 : height / minHeight;
    var cornerRadius = geom.cornerRadius;
    var radius, radiusX, radiusY, centerX, centerY;
    context.save();
    context.beginPath();
    context.translate(x, y); // Bottom-right

    radius = cornerRadius.br;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = width - radiusX;
    centerY = height - radiusY;
    context.moveTo(width, centerY);

    if (radiusX > 0 && radiusY > 0) {
      ArcTo(context, centerX, centerY, radiusX, radiusY, Rad0, Rad90, iteration);
    } else {
      context.lineTo(width, height);
      context.lineTo(centerX, height);
    } // Bottom-left


    radius = cornerRadius.bl;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = radiusX;
    centerY = height - radiusY;
    context.lineTo(radiusX, height);

    if (radiusX > 0 && radiusY > 0) {
      ArcTo(context, centerX, centerY, radiusX, radiusY, Rad90, Rad180, iteration);
    } else {
      context.lineTo(0, height);
      context.lineTo(0, centerY);
    } // Top-left


    radius = cornerRadius.tl;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = radiusX;
    centerY = radiusY;
    context.lineTo(0, centerY);

    if (radiusX > 0 && radiusY > 0) {
      ArcTo(context, centerX, centerY, radiusX, radiusY, Rad180, Rad270, iteration);
    } else {
      context.lineTo(0, 0);
      context.lineTo(centerX, 0);
    } // Top-right


    radius = cornerRadius.tr;
    radiusX = radius.x * scaleRX;
    radiusY = radius.y * scaleRY;
    centerX = width - radiusX;
    centerY = radiusY;
    context.lineTo(centerX, 0);

    if (radiusX > 0 && radiusY > 0) {
      ArcTo(context, centerX, centerY, radiusX, radiusY, Rad270, Rad0, iteration);
    } else {
      context.lineTo(width, 0);
      context.lineTo(width, centerY);
    }

    context.closePath();
    context.restore();
  };

  var ArcTo = function ArcTo(context, centerX, centerY, radiusX, radiusY, startAngle, endAngle, iteration) {
    if (iteration == null) {
      // undefined, or null
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle);
    } else {
      iteration += 1;
      var x, y, angle;
      var step = (endAngle - startAngle) / iteration;

      for (var i = 0; i <= iteration; i++) {
        angle = startAngle + step * i;
        x = centerX + radiusX * Math.cos(angle);
        y = centerY + radiusY * Math.sin(angle);
        context.lineTo(x, y);
      }
    }
  };

  var DrawRoundRectangle = function DrawRoundRectangle(canvas, context, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient, iteration) {
    AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration);

    if (fillStyle != null) {
      if (fillColor2 != null) {
        var grd;

        if (isHorizontalGradient) {
          grd = context.createLinearGradient(0, 0, width, 0);
        } else {
          grd = context.createLinearGradient(0, 0, 0, height);
        }

        grd.addColorStop(0, fillStyle);
        grd.addColorStop(1, fillColor2);
        fillStyle = grd;
      }

      context.fillStyle = fillStyle;
      context.fill();
    }

    if (strokeStyle != null && lineWidth > 0) {
      context.strokeStyle = strokeStyle;
      context.lineWidth = lineWidth;
      context.stroke();
    }
  };

  var DrawRoundRectangleBackground = function DrawRoundRectangleBackground(canvasObject, color, strokeColor, strokeLineWidth, radius, color2, isHorizontalGradient, iteration) {
    if (color == null && strokeColor == null) {
      return;
    }

    var width = canvasObject.canvas.width,
        height = canvasObject.canvas.height;

    if (strokeColor == null) {
      strokeLineWidth = 0;
    }

    var x = strokeLineWidth / 2;
    width -= strokeLineWidth;
    height -= strokeLineWidth;
    DrawRoundRectangle(canvasObject.canvas, canvasObject.context, x, x, width, height, radius, color, strokeColor, strokeLineWidth, color2, isHorizontalGradient, iteration);
  };

  var DrawMethods = {
    draw: function draw(startX, startY, textWidth, textHeight) {
      var penManager = this.penManager;
      this.hitAreaManager.clear();
      var context = this.context;
      context.save();
      var defaultStyle = this.defaultStyle;
      this.clear();
      DrawRoundRectangleBackground(this, defaultStyle.backgroundColor, defaultStyle.backgroundStrokeColor, defaultStyle.backgroundStrokeLineWidth, defaultStyle.backgroundCornerRadius, defaultStyle.backgroundColor2, defaultStyle.backgroundHorizontalGradient, defaultStyle.backgroundCornerIteration); // draw lines

      startX += this.startXOffset;
      startY += this.startYOffset;
      var defaultHalign = defaultStyle.halign,
          valign = defaultStyle.valign;
      var lineWidth,
          lineHeight = defaultStyle.lineHeight;
      var lines = penManager.lines;
      var totalLinesNum = lines.length,
          maxLines = defaultStyle.maxLines;
      var drawLinesNum, drawLineStartIdx, drawLineEndIdx;

      if (maxLines > 0 && totalLinesNum > maxLines) {
        drawLinesNum = maxLines;

        if (valign === 'center') {
          // center
          drawLineStartIdx = Math.floor((totalLinesNum - drawLinesNum) / 2);
        } else if (valign === 'bottom') {
          // bottom
          drawLineStartIdx = totalLinesNum - drawLinesNum;
        } else {
          drawLineStartIdx = 0;
        }
      } else {
        drawLinesNum = totalLinesNum;
        drawLineStartIdx = 0;
      }

      drawLineEndIdx = drawLineStartIdx + drawLinesNum;
      var offsetX, offsetY;
      var rtl = this.rtl,
          rtlOffset = rtl ? this.parent.width : undefined;

      if (valign === 'center') {
        // center
        offsetY = Math.max((textHeight - drawLinesNum * lineHeight) / 2, 0);
      } else if (valign === 'bottom') {
        // bottom
        offsetY = Math.max(textHeight - drawLinesNum * lineHeight - 2, 0);
      } else {
        offsetY = 0;
      }

      offsetY += startY;

      for (var lineIdx = drawLineStartIdx; lineIdx < drawLineEndIdx; lineIdx++) {
        lineWidth = penManager.getLineWidth(lineIdx);

        if (lineWidth === 0) {
          continue;
        }

        var pens = lines[lineIdx],
            penCount = pens.length;
        var halign = defaultHalign; // Seek if there has algin tag

        for (var penIdx = 0; penIdx < penCount; penIdx++) {
          var penAlign = pens[penIdx].prop.align;

          if (penAlign !== undefined) {
            halign = penAlign;
            break;
          }
        }

        if (halign === 'center') {
          // center
          offsetX = (textWidth - lineWidth) / 2;
        } else if (halign === 'right') {
          // right
          offsetX = !rtl ? textWidth - lineWidth : 0;
        } else {
          offsetX = !rtl ? 0 : textWidth - lineWidth;
        }

        offsetX += startX;

        for (var penIdx = 0; penIdx < penCount; penIdx++) {
          this.drawPen(pens[penIdx], offsetX, offsetY, rtlOffset);
        }
      }

      context.restore();
    },
    drawPen: function drawPen(pen, offsetX, offsetY, rtlOffset) {
      offsetX += pen.x;
      offsetY += pen.y + (pen.prop.y || 0);

      if (rtlOffset !== undefined) {
        offsetX = rtlOffset - offsetX;
      }

      var canvas = this.canvas;
      var context = this.context;
      context.save();
      var curStyle = this.parser.propToContextStyle(this.defaultStyle, pen.prop);
      curStyle.buildFont();
      curStyle.syncFont(canvas, context);
      curStyle.syncStyle(canvas, context); // Underline

      if (curStyle.underlineThickness > 0 && pen.width > 0) {
        this.drawUnderline(offsetX, offsetY, pen.width, curStyle);
      } // Text


      if (pen.isTextPen) {
        this.drawText(offsetX, offsetY, pen.text, curStyle);
      } // Image


      if (pen.isImagePen) {
        this.drawImage(offsetX, offsetY, pen.prop.img, curStyle);
      }

      context.restore();

      if (pen.hasAreaMarker && pen.width > 0) {
        this.hitAreaManager.add(pen.prop.area, // key
        offsetX, // x
        offsetY - this.startYOffset, // y
        pen.width, // width
        this.defaultStyle.lineHeight // height
        );
      }
    },
    clear: function clear() {
      var canvas = this.canvas;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
    },
    drawUnderline: function drawUnderline(x, y, width, style) {
      y += style.underlineOffset - style.underlineThickness / 2;

      if (this.autoRound) {
        x = Math.round(x);
        y = Math.round(y);
      }

      var context = this.context;
      var savedLineCap = context.lineCap;
      context.lineCap = 'butt';
      context.strokeStyle = style.underlineColor;
      context.lineWidth = style.underlineThickness;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + width, y);
      context.stroke();
      context.lineCap = savedLineCap;
    },
    drawText: function drawText(x, y, text, style) {
      if (this.autoRound) {
        x = Math.round(x);
        y = Math.round(y);
      }

      var context = this.context;

      if (style.stroke && style.stroke !== 'none' && style.strokeThickness > 0) {
        style.syncShadow(context, style.shadowStroke);
        context.strokeText(text, x, y);
      }

      if (style.color && style.color !== 'none') {
        style.syncShadow(context, style.shadowFill);
        context.fillText(text, x, y);
      }
    },
    drawImage: function drawImage(x, y, imgKey, style) {
      y -= this.startYOffset;
      this.parent.imageManager.draw(imgKey, this.context, x, y, this.autoRound);
    }
  };

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var NO_NEWLINE$3 = CONST.NO_NEWLINE;
  var RAW_NEWLINE$1 = CONST.RAW_NEWLINE;

  var Pen = /*#__PURE__*/function () {
    function Pen(config) {
      _classCallCheck(this, Pen);

      this.prop = {};
      this.resetFromJSON(config);
    }

    _createClass(Pen, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        // (txt, x, y, width, prop, newLineMode, startIndex)
        this.text = GetValue$4(o, 'text', '');
        this.x = GetValue$4(o, 'x', 0);
        this.y = GetValue$4(o, 'y', 0);
        this.width = GetValue$4(o, 'width', 0);
        var prop = GetValue$4(o, 'prop', null);

        if (prop === null) {
          prop = {};
        }

        this.prop = prop;
        this.newLineMode = GetValue$4(o, 'newLineMode', 0);
        this.startIndex = GetValue$4(o, 'startIndex', 0);
      }
    }, {
      key: "plainText",
      get: function get() {
        var txt = this.text;

        if (this.newLineMode === RAW_NEWLINE$1) {
          txt += "\n";
        }

        return txt;
      }
    }, {
      key: "wrapText",
      get: function get() {
        var txt = this.text;

        if (this.newLineMode !== NO_NEWLINE$3) {
          txt += "\n";
        }

        return txt;
      }
    }, {
      key: "rawTextLength",
      get: function get() {
        var len = this.text.length;

        if (this.newLineMode === RAW_NEWLINE$1) {
          len += 1;
        }

        return len;
      }
    }, {
      key: "endIndex",
      get: function get() {
        return this.startIndex + this.rawTextLength;
      }
    }, {
      key: "lastX",
      get: function get() {
        return this.x + this.width;
      }
    }, {
      key: "isTextPen",
      get: function get() {
        return this.text !== '';
      }
    }, {
      key: "isImagePen",
      get: function get() {
        return !!this.prop.img;
      }
    }, {
      key: "hasAreaMarker",
      get: function get() {
        return !!this.prop.area;
      }
    }]);

    return Pen;
  }();

  var Clear = function Clear(obj) {
    if (_typeof(obj) !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      obj.length = 0;
    } else {
      for (var key in obj) {
        delete obj[key];
      }
    }

    return obj;
  };

  /**
   * Shallow Object Clone. Will not out nested objects.
   * @param {object} obj JSON object
   * @param {object} ret JSON object to return, set null to return a new object
   * @returns {object} this object
   */

  var Clone = function Clone(obj, out) {
    var objIsArray = Array.isArray(obj);

    if (out === undefined) {
      out = objIsArray ? [] : {};
    } else {
      Clear(out);
    }

    if (objIsArray) {
      out.length = obj.length;

      for (var i = 0, cnt = obj.length; i < cnt; i++) {
        out[i] = obj[i];
      }
    } else {
      for (var key in obj) {
        out[key] = obj[key];
      }
    }

    return out;
  };

  var NOOP = function NOOP() {//  NOOP
  };

  var GetFastValue = Phaser.Utils.Objects.GetFastValue;
  var NO_NEWLINE$2 = CONST.NO_NEWLINE;
  var WRAPPED_NEWLINE$1 = CONST.WRAPPED_NEWLINE; // Reuse objects can increase performance

  var PensPool = new Stack(); // Default pens pool

  var LinesPool$1 = new Stack(); // Default lines pool

  var PenManager = /*#__PURE__*/function () {
    function PenManager(config) {
      _classCallCheck(this, PenManager);

      this.pens = []; // all pens

      this.lines = []; // pens in lines [ [],[],[],.. ]

      this.maxLinesWidth = undefined;
      this.PensPool = GetFastValue(config, 'pensPool', PensPool);
      this.LinesPool = GetFastValue(config, 'linesPool', LinesPool$1);
      this.tagToText = GetFastValue(config, 'tagToText', NOOP);
      this.tagToTextScope = GetFastValue(config, 'tagToTextScope', undefined);
    }

    _createClass(PenManager, [{
      key: "destroy",
      value: function destroy() {
        this.clear();
        this.tagToText = undefined;
        this.tagToTextScope = undefined;
      }
    }, {
      key: "clear",
      value: function clear() {
        for (var i = 0, len = this.lines.length; i < len; i++) {
          this.lines[i].length = 0;
        }

        this.PensPool.pushMultiple(this.pens);
        this.LinesPool.pushMultiple(this.lines);
        this.maxLinesWidth = undefined;
      }
    }, {
      key: "addTextPen",
      value: function addTextPen(text, x, y, width, prop, newLineMode) {
        var pen = this.PensPool.pop();

        if (pen == null) {
          pen = new Pen();
        }

        PEN_CONFIG.text = text;
        PEN_CONFIG.x = x;
        PEN_CONFIG.y = y;
        PEN_CONFIG.width = width;
        PEN_CONFIG.prop = prop;
        PEN_CONFIG.newLineMode = newLineMode;
        pen.resetFromJSON(PEN_CONFIG);
        this.addPen(pen);
        return this;
      }
    }, {
      key: "addImagePen",
      value: function addImagePen(x, y, width, prop) {
        this.addTextPen('', x, y, width, prop, NO_NEWLINE$2);
        return this;
      }
    }, {
      key: "addNewLinePen",
      value: function addNewLinePen() {
        var previousPen = this.lastPen;
        var x = previousPen ? previousPen.lastX : 0;
        var y = previousPen ? previousPen.y : 0;
        var prop = previousPen ? Clone(previousPen.prop) : null;
        this.addTextPen('', x, y, 0, prop, WRAPPED_NEWLINE$1);
        return this;
      }
    }, {
      key: "addPen",
      value: function addPen(pen) {
        var previousPen = this.lastPen;

        if (previousPen == null) {
          pen.startIndex = 0;
        } else {
          pen.startIndex = previousPen.endIndex;
        }

        this.pens.push(pen); // maintan lines

        var line = this.lastLine;

        if (line == null) {
          line = this.LinesPool.pop() || [];
          this.lines.push(line);
        }

        line.push(pen); // new line, add an empty line

        if (pen.newLineMode !== NO_NEWLINE$2) {
          line = this.LinesPool.pop() || [];
          this.lines.push(line);
        }

        this.maxLinesWidth = undefined;
      }
    }, {
      key: "clone",
      value: function clone(targetPenManager) {
        if (targetPenManager == null) targetPenManager = new PenManager();
        targetPenManager.clear();

        for (var li = 0, llen = this.lines.length; li < llen; li++) {
          var pens = this.lines[li];

          for (var pi = 0, plen = pens.length; pi < plen; pi++) {
            var pen = pens[pi];
            targetPenManager.addPen(pen.text, pen.x, pen.y, pen.width, Clone(pen.prop), pen.newLineMode);
          }
        }

        return targetPenManager;
      }
    }, {
      key: "lastPen",
      get: function get() {
        return this.pens[this.pens.length - 1];
      }
    }, {
      key: "lastLine",
      get: function get() {
        return this.lines[this.lines.length - 1];
      }
    }, {
      key: "getLineStartIndex",
      value: function getLineStartIndex(i) {
        if (i >= this.lines.length) {
          return this.getLineEndIndex(i);
        } else {
          var line = this.lines[i];
          return line && line[0] ? line[0].startIndex : 0;
        }
      }
    }, {
      key: "getLineEndIndex",
      value: function getLineEndIndex(i) {
        if (i >= this.lines.length) {
          i = this.lines.length - 1;
        }

        var li,
            hasLastPen = false,
            line;

        for (li = i; li >= 0; li--) {
          line = this.lines[li];
          hasLastPen = line != null && line.length > 0;

          if (hasLastPen) {
            break;
          }
        }

        if (!hasLastPen) {
          return 0;
        }

        var lastPen = line[line.length - 1];
        return lastPen.endIndex;
      }
    }, {
      key: "getLineWidth",
      value: function getLineWidth(i) {
        var line = this.lines[i];

        if (!line) {
          return 0;
        }

        var lastPen = line[line.length - 1];

        if (lastPen == null) {
          return 0;
        }

        var lineWidth = lastPen.lastX; // start from 0

        return lineWidth;
      }
    }, {
      key: "getMaxLineWidth",
      value: function getMaxLineWidth() {
        if (this.maxLinesWidth !== undefined) {
          return this.maxLinesWidth;
        }

        var w,
            maxW = 0;

        for (var i = 0, len = this.lines.length; i < len; i++) {
          w = this.getLineWidth(i);

          if (w > maxW) {
            maxW = w;
          }
        }

        this.maxLinesWidth = maxW;
        return maxW;
      }
    }, {
      key: "getLineWidths",
      value: function getLineWidths() {
        var result = [];

        for (var i = 0, len = this.lines.length; i < len; i++) {
          result.push(this.getLineWidth(i));
        }

        return result;
      }
    }, {
      key: "linesCount",
      get: function get() {
        return this.lines.length;
      }
    }, {
      key: "plainText",
      get: function get() {
        var txt = "",
            pens = this.pens;

        for (var i = 0, len = pens.length; i < len; i++) {
          txt += pens[i].plainText;
        }

        return txt;
      }
    }, {
      key: "rawTextLength",
      get: function get() {
        var l = 0,
            pens = this.pens;

        for (var i = 0, len = this.pens.length; i < len; i++) {
          l += pens[i].rawTextLength;
        }

        return l;
      }
    }, {
      key: "getSliceTagText",
      value: function getSliceTagText(start, end, wrap) {
        if (start === undefined) {
          start = 0;
        }

        if (end === undefined) {
          var lastPen = this.lastPen;

          if (lastPen == null) {
            return "";
          }

          end = lastPen.endIndex;
        }

        if (wrap === undefined) {
          wrap = false;
        }

        var txt = "",
            pen,
            penTxt,
            penStartIdx,
            penEndIdx,
            isInRange;
        var currentProp, previousProp;

        for (var i = 0, len = this.pens.length; i < len; i++) {
          pen = this.pens[i];
          penEndIdx = pen.endIndex;

          if (penEndIdx <= start) {
            continue;
          }

          pen = this.pens[i];
          penTxt = !wrap ? pen.plainText : pen.wrapText;
          currentProp = pen.prop;
          penStartIdx = pen.startIndex;
          isInRange = penStartIdx >= start && penEndIdx <= end;

          if (!isInRange) {
            penTxt = penTxt.substring(start - penStartIdx, end - penStartIdx);
          }

          if (this.tagToTextScope) {
            txt += this.tagToText.call(this.tagToTextScope, penTxt, currentProp, previousProp);
          } else {
            txt += this.tagToText(penTxt, currentProp, previousProp);
          }

          previousProp = currentProp;

          if (penEndIdx >= end) {
            break;
          }
        }

        return txt;
      }
    }, {
      key: "length",
      get: function get() {
        return this.lines.length;
      },
      set: function set(value) {
        // Only for set length to 0 (clear)
        this.clear();
      }
    }]);

    return PenManager;
  }();
  var PEN_CONFIG = {};

  var Rectangle = Phaser.Geom.Rectangle;
  var RectanglePool = new Stack();

  var HitAreaManager = /*#__PURE__*/function () {
    function HitAreaManager() {
      _classCallCheck(this, HitAreaManager);

      this.hitAreas = [];
    }

    _createClass(HitAreaManager, [{
      key: "destroy",
      value: function destroy() {
        this.clear();
      }
    }, {
      key: "clear",
      value: function clear() {
        RectanglePool.pushMultiple(this.hitAreas);
        return this;
      }
    }, {
      key: "add",
      value: function add(key, x, y, width, height) {
        var rectangle = RectanglePool.pop();

        if (rectangle === null) {
          rectangle = new Rectangle(x, y, width, height);
        } else {
          rectangle.setTo(x, y, width, height);
        }

        rectangle.key = key;
        this.hitAreas.push(rectangle);
        return this;
      }
    }, {
      key: "getFirst",
      value: function getFirst(x, y) {
        for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
          var hitArea = this.hitAreas[i];

          if (hitArea.contains(x, y)) {
            return hitArea;
          }
        }

        return null;
      }
    }, {
      key: "drawBounds",
      value: function drawBounds(graphics, color, parent) {
        if (color === undefined) {
          color = 0xffffff;
        }

        if (parent) {
          graphics.save().scaleCanvas(parent.scaleX, parent.scaleY).rotateCanvas(parent.rotation).translateCanvas(parent.x, parent.y);
        }

        for (var i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
          var hitArea = this.hitAreas[i];
          graphics.lineStyle(1, color).strokeRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
        }

        if (parent) {
          graphics.restore();
        }

        return this;
      }
    }]);

    return HitAreaManager;
  }();

  var SetInteractive = function SetInteractive() {
    this.parent.on('pointerdown', OnAreaDown, this).on('pointerup', OnAreaUp, this).on('pointermove', OnAreaOverOut, this).on('pointerover', OnAreaOverOut, this).on('pointerout', function (pointer, event) {
      OnAreaOverOut.call(this, pointer, null, null, event);
    }, this);
  };

  var OnAreaDown = function OnAreaDown(pointer, localX, localY, event) {
    var area = this.hitAreaManager.getFirst(localX, localY);

    if (area === null) {
      return;
    }

    FireEvent.call(this, 'areadown', area.key, pointer, localX, localY, event);
  };

  var OnAreaUp = function OnAreaUp(pointer, localX, localY, event) {
    var area = this.hitAreaManager.getFirst(localX, localY);

    if (area === null) {
      return;
    }

    FireEvent.call(this, 'areaup', area.key, pointer, localX, localY, event);
  };

  var OnAreaOverOut = function OnAreaOverOut(pointer, localX, localY, event) {
    if (localX === null) {
      // Case of pointerout
      if (this.lastHitAreaKey !== null) {
        FireEvent.call(this, 'areaout', this.lastHitAreaKey, pointer, localX, localY, event);
      }

      this.lastHitAreaKey = null;
      return;
    }

    var area = this.hitAreaManager.getFirst(localX, localY);
    var hitAreaKey = area ? area.key : null;

    if (this.lastHitAreaKey === hitAreaKey) {
      return;
    }

    if (this.lastHitAreaKey !== null) {
      FireEvent.call(this, 'areaout', this.lastHitAreaKey, pointer, localX, localY, event);
    }

    if (hitAreaKey !== null) {
      FireEvent.call(this, 'areaover', hitAreaKey, pointer, localX, localY, event);
    }

    this.lastHitAreaKey = hitAreaKey;
  };

  var FireEvent = function FireEvent(eventName, key, pointer, localX, localY, event) {
    this.parent.emit("".concat(eventName, "-").concat(key), pointer, localX, localY, event);
    this.parent.emit(eventName, key, pointer, localX, localY, event);
  };

  var LinesPool = new Stack();

  var FreeLine = function FreeLine(line) {
    if (!line) {
      return;
    }

    LinesPool.push(line);
  };

  var FreeLines = function FreeLines(lines) {
    if (!lines) {
      return;
    }

    LinesPool.pushMultiple(lines);
  };

  var GetLine = function GetLine(text, width, newLineMode) {
    var l = LinesPool.pop();

    if (l === null) {
      l = {};
    }

    l.text = text;
    l.width = width;
    l.newLineMode = newLineMode;
    return l;
  };

  var NO_NEWLINE$1 = CONST.NO_NEWLINE;
  var RAW_NEWLINE = CONST.RAW_NEWLINE;
  var WRAPPED_NEWLINE = CONST.WRAPPED_NEWLINE;
  var NO_WRAP$1 = CONST.NO_WRAP;
  var WORD_WRAP = CONST.WORD_WRAP;
  var CHAR_WRAP = CONST.CHAR_WRAP;
  var splitRegExp = CONST.SPLITREGEXP;

  var WrapText = function WrapText(text, getTextWidth, wrapMode, wrapWidth, offset) {
    if (wrapWidth <= 0) {
      wrapMode = NO_WRAP$1;
    }

    var retLines = [];

    if (!text || !text.length) {
      return retLines;
    }

    var isNoWrap = wrapMode === NO_WRAP$1;
    var isWordWrap = wrapMode === WORD_WRAP;
    var lines = text.split(splitRegExp),
        line,
        remainWidth,
        newLineMode;

    for (var i = 0, linesLen = lines.length; i < linesLen; i++) {
      line = lines[i];
      newLineMode = i === linesLen - 1 ? NO_NEWLINE$1 : RAW_NEWLINE;

      if (isNoWrap) {
        var textWidth = getTextWidth(line);
        retLines.push(GetLine(line, textWidth, newLineMode));
        continue;
      }

      remainWidth = i === 0 ? wrapWidth - offset : wrapWidth; // short string testing

      if (line.length <= 100) {
        var textWidth = getTextWidth(line);

        if (textWidth <= remainWidth) {
          retLines.push(GetLine(line, textWidth, newLineMode));
          continue;
        }
      }

      var tokenArray, isSpaceCharacterEnd;

      if (isWordWrap) {
        // word mode
        tokenArray = line.split(' ');
        isSpaceCharacterEnd = tokenArray[tokenArray.length - 1] === '';

        if (isSpaceCharacterEnd) {
          tokenArray.length -= 1;
        }
      } else {
        tokenArray = line;
      }

      var token, tokenWidth, isLastToken;
      var lineText = '',
          lineWidth = 0;
      var currLineWidth;
      var whiteSpaceWidth = isWordWrap ? getTextWidth(' ') : undefined;

      for (var j = 0, tokenLen = tokenArray.length; j < tokenLen; j++) {
        token = tokenArray[j];
        tokenWidth = getTextWidth(token);
        isLastToken = j === tokenLen - 1;

        if (isWordWrap && (!isLastToken || isSpaceCharacterEnd)) {
          token += ' ';
          tokenWidth += whiteSpaceWidth;
        } // Text width of single token is larger than a line width


        if (isWordWrap && tokenWidth > wrapWidth) {
          if (lineText !== '') {
            // Has pending lineText, flush it out
            retLines.push(GetLine(lineText, lineWidth, WRAPPED_NEWLINE));
          } else if (j === 0 && offset > 0) {
            // No pending lineText, but has previous text. Append a newline
            retLines.push(GetLine('', 0, WRAPPED_NEWLINE));
          } // Word break


          retLines.push.apply(retLines, _toConsumableArray(WrapText(token, getTextWidth, CHAR_WRAP, wrapWidth, 0))); // Continue at last-wordBreak-line

          var lastwordBreakLine = retLines.pop();
          lineText = lastwordBreakLine.text;
          lineWidth = lastwordBreakLine.width; // Free this line

          FreeLine(lastwordBreakLine); // Special case : Start at a space character, discard it

          if (lineText === ' ') {
            lineText = '';
            lineWidth = 0;
          }

          continue;
        }

        currLineWidth = lineWidth + tokenWidth;

        if (currLineWidth > remainWidth) {
          // New line
          retLines.push(GetLine(lineText, lineWidth, WRAPPED_NEWLINE));
          lineText = token;
          lineWidth = tokenWidth;
          remainWidth = wrapWidth;
        } else {
          // Append token, continue
          lineText += token;
          lineWidth = currLineWidth;
        }

        if (isLastToken) {
          // Flush remain text
          retLines.push(GetLine(lineText, lineWidth, newLineMode));
        }
      } // for token in tokenArray

    } // for each line in lines


    return retLines;
  };

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var NO_WRAP = CONST.NO_WRAP;
  var NO_NEWLINE = CONST.NO_NEWLINE;

  var CanvasText = /*#__PURE__*/function () {
    function CanvasText(config) {
      _classCallCheck(this, CanvasText);

      this.parent = config.parent;
      this.context = GetValue$3(config, 'context', null);
      this.canvas = this.context.canvas;
      this.parser = GetValue$3(config, 'parser', null);
      this.defaultStyle = GetValue$3(config, 'style', null);
      this.autoRound = true;
      this.pensPool = GetValue$3(config, 'pensPool', null);
      this.penManager = this.newPenManager();
      this._tmpPenManager = null;
      this.hitAreaManager = new HitAreaManager();
      this.lastHitAreaKey = null;
      var context = this.context;

      this.getTextWidth = function (text) {
        return context.measureText(text).width;
      };
    }

    _createClass(CanvasText, [{
      key: "destroy",
      value: function destroy() {
        this.context = undefined;
        this.canvas = undefined;
        this.parser = undefined;
        this.defaultStyle = undefined;

        if (this.penManager) {
          this.penManager.destroy();
          this.penManager = undefined;
        }

        if (this._tmpPenManager) {
          this._tmpPenManager.destroy();

          this._tmpPenManager = undefined;
        }

        if (this.hitAreaManager) {
          this.hitAreaManager.destroy();
          this.hitAreaManager = undefined;
        }
      }
    }, {
      key: "updatePenManager",
      value: function updatePenManager(text, wrapMode, wrapWidth, lineHeight, penManager) {
        if (penManager === undefined) {
          penManager = this.penManager;
        }

        penManager.clear();

        if (text === "") {
          return penManager;
        }

        var textStyle = this.parent.style;

        if (textStyle.isWrapFitMode) {
          var padding = this.parent.padding;
          wrapWidth = textStyle.fixedWidth - padding.left - padding.right;
        }

        var canvas = this.canvas;
        var context = this.context;

        var MeasureText = function MeasureText(text) {
          return context.measureText(text).width;
        };

        var cursorX = 0,
            cursorY = 0;
        var customTextWrapCallback = textStyle.wrapCallback,
            customTextWrapCallbackScope = textStyle.wrapCallbackScope;
        var reuseLines = true;
        var plainText, curProp, curStyle;
        var match = this.parser.splitText(text),
            result,
            wrapLines;

        for (var i = 0, len = match.length; i < len; i++) {
          result = this.parser.tagTextToProp(match[i], curProp);
          plainText = result.plainText;
          curProp = result.prop;

          if (curProp.img) {
            // Image tag                
            var imgWidth = this.imageManager.getOuterWidth(curProp.img);

            if (wrapWidth > 0 && wrapMode !== NO_WRAP) {
              // Wrap mode
              if (wrapWidth < cursorX + imgWidth) {
                penManager.addNewLinePen();
                cursorY += lineHeight;
                cursorX = 0;
              }
            }

            penManager.addImagePen(cursorX, cursorY, imgWidth, Clone(curProp));
            cursorX += imgWidth;
          } else if (plainText !== '') {
            // wrap text to lines
            // Save the current context.
            context.save();
            curStyle = this.parser.propToContextStyle(this.defaultStyle, curProp);
            curStyle.buildFont();
            curStyle.syncFont(canvas, context);
            curStyle.syncStyle(canvas, context);

            if (!customTextWrapCallback) {
              wrapLines = WrapText(plainText, MeasureText, wrapMode, wrapWidth, cursorX);
            } else {
              // customTextWrapCallback
              wrapLines = customTextWrapCallback.call(customTextWrapCallbackScope, plainText, MeasureText, wrapWidth, cursorX);

              if (typeof wrapLines === 'string') {
                wrapLines = wrapLines.split('\n');
              }

              var n;

              for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
                n = wrapLines[j];

                if (typeof n === 'string') {
                  wrapLines[j] = GetLine(n, MeasureText(n), j < jLen - 1 ? 2 : 0);
                } else {
                  reuseLines = false;
                }
              }
            } // customTextWrapCallback
            // add pens


            var n;

            for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
              n = wrapLines[j];
              penManager.addTextPen(n.text, cursorX, cursorY, n.width, Clone(curProp), n.newLineMode);

              if (n.newLineMode !== NO_NEWLINE) {
                cursorX = 0;
                cursorY += lineHeight;
              } else {
                cursorX += n.width;
              }
            }

            if (reuseLines) {
              FreeLines(wrapLines);
            }

            wrapLines = null;
            context.restore();
          }
        } // Add strokeThinkness to last pen of each line


        for (var i = 0, len = this.lines.length; i < len; i++) {
          var line = this.lines[i];
          var lastPen = line[line.length - 1];

          if (lastPen) {
            lastPen.width += this.parser.getStrokeThinkness(this.defaultStyle, lastPen.prop);
          }
        }

        return penManager;
      }
    }, {
      key: "startXOffset",
      get: function get() {
        var defaultStyle = this.defaultStyle;
        return defaultStyle.strokeThickness / 2 + defaultStyle.xOffset;
      }
    }, {
      key: "startYOffset",
      get: function get() {
        var defaultStyle = this.defaultStyle;
        return defaultStyle.strokeThickness / 2 + defaultStyle.metrics.ascent;
      }
    }, {
      key: "lines",
      get: function get() {
        return this.penManager.lines;
      }
    }, {
      key: "desplayLinesCount",
      get: function get() {
        var linesCount = this.penManager.linesCount,
            maxLines = this.defaultStyle.maxLines;

        if (maxLines > 0 && linesCount > maxLines) {
          linesCount = maxLines;
        }

        return linesCount;
      }
    }, {
      key: "linesWidth",
      get: function get() {
        return Math.ceil(this.penManager.getMaxLineWidth());
      }
    }, {
      key: "linesHeight",
      get: function get() {
        var linesCount = this.desplayLinesCount;
        var linesHeight = this.defaultStyle.lineHeight * linesCount;

        if (linesCount > 0) {
          linesHeight -= this.defaultStyle.lineSpacing;
        }

        return linesHeight;
      }
    }, {
      key: "imageManager",
      get: function get() {
        return this.parent.imageManager;
      }
    }, {
      key: "rtl",
      get: function get() {
        return this.parent.style.rtl;
      }
    }, {
      key: "newPenManager",
      value: function newPenManager() {
        return new PenManager({
          pensPool: this.pensPool,
          tagToText: this.parser.propToTagText,
          tagToTextScope: this.parser
        });
      }
    }, {
      key: "tmpPenManager",
      get: function get() {
        if (this._tmpPenManager === null) {
          this._tmpPenManager = this.newPenManager();
        }

        return this._tmpPenManager;
      }
    }, {
      key: "getPlainText",
      value: function getPlainText(text, start, end) {
        var plainText;

        if (text == null) {
          plainText = this.penManager.plainText;
        } else {
          var match = this.parser.splitText(text, 1); // PLAINTEXTONLY_MODE

          plainText = "";

          for (var i = 0, len = match.length; i < len; i++) {
            plainText += match[i];
          }
        }

        if (start != null || end != null) {
          if (start == null) {
            start = 0;
          }

          if (end == null) {
            end = plainText.length;
          }

          plainText = plainText.substring(start, end);
        }

        return plainText;
      }
    }, {
      key: "getPenManager",
      value: function getPenManager(text, retPenManager) {
        if (text === undefined) {
          return this.copyPenManager(retPenManager, this.penManager);
        }

        if (retPenManager === undefined) {
          retPenManager = this.newPenManager();
        }

        var defaultStyle = this.defaultStyle;
        this.updatePenManager(text, defaultStyle.wrapMode, defaultStyle.wrapWidth, defaultStyle.lineHeight, retPenManager);
        return retPenManager;
      }
    }, {
      key: "getText",
      value: function getText(text, start, end, wrap) {
        if (text == null) {
          return this.penManager.getSliceTagText(start, end, wrap);
        }

        var penManager = this.tmpPenManager;
        var defaultStyle = this.defaultStyle;
        this.updatePenManager(text, defaultStyle.wrapMode, defaultStyle.wrapWidth, defaultStyle.lineHeight, penManager);
        return penManager.getSliceTagText(start, end, wrap);
      }
    }, {
      key: "copyPenManager",
      value: function copyPenManager(ret, src) {
        if (src === undefined) {
          src = this.penManager;
        }

        return src.copy(ret);
      }
    }, {
      key: "getTextWidth",
      value: function getTextWidth(penManager) {
        if (penManager === undefined) {
          penManager = this.penManager;
        }

        return penManager.getMaxLineWidth();
      }
    }, {
      key: "getLastPen",
      value: function getLastPen(penManager) {
        if (penManager === undefined) {
          penManager = this.penManager;
        }

        return penManager.lastPen;
      }
    }]);

    return CanvasText;
  }();
  var methods$2 = {
    setInteractive: SetInteractive
  };
  Object.assign(CanvasText.prototype, DrawMethods, methods$2);

  var GetValue$2 = Phaser.Utils.Objects.GetValue;

  var AddImage = function AddImage(key, config) {
    if (config === undefined) {
      config = {
        key: key
      };
    }

    if (!config.hasOwnProperty('key')) {
      config.key = key;
    }

    var textureKey = config.key,
        frameKey = config.frame;
    var width = config.width,
        height = config.height;

    if (width === undefined || height === undefined) {
      var frame = this.textureManager.getFrame(textureKey, frameKey);
      var frameWidth = frame ? frame.cutWidth : 0;
      var frameHeight = frame ? frame.cutHeight : 0;

      if (width === undefined && height === undefined) {
        width = frameWidth;
        height = frameHeight;
      } else if (width === undefined) {
        width = frameWidth * (height / frameHeight);
      } else if (height === undefined) {
        height = frameHeight * (width / frameWidth);
      }
    }

    this.images[key] = {
      key: textureKey,
      frame: frameKey,
      width: width,
      height: height,
      y: GetValue$2(config, 'y', 0),
      left: GetValue$2(config, 'left', 0),
      right: GetValue$2(config, 'right', 0)
    };
  };

  var DrawImage = function DrawImage(key, context, x, y, autoRound) {
    var imgData = this.get(key);
    x += imgData.left;
    y += imgData.y;

    if (autoRound) {
      x = Math.round(x);
      y = Math.round(y);
    }

    var frame = this.textureManager.getFrame(imgData.key, imgData.frame);
    context.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight, x, y, imgData.width, imgData.height);
  };

  var ImageManager = /*#__PURE__*/function () {
    function ImageManager(scene) {
      _classCallCheck(this, ImageManager);

      this.textureManager = scene.sys.textures;
      this.images = {};
    }

    _createClass(ImageManager, [{
      key: "destroy",
      value: function destroy() {
        this.textureManager = undefined;
        this.images = undefined;
      }
    }, {
      key: "add",
      value: function add(key, config) {
        if (typeof key === 'string') {
          AddImage.call(this, key, config);
        } else if (Array.isArray(key)) {
          var data = key;

          for (var i = 0, cnt = data.length; i < cnt; i++) {
            AddImage.call(this, data[i]);
          }
        } else {
          var data = key;

          for (var key in data) {
            AddImage.call(this, key, data[key]);
          }
        }

        return this;
      }
    }, {
      key: "has",
      value: function has(key) {
        return this.images.hasOwnProperty(key);
      }
    }, {
      key: "remove",
      value: function remove(key) {
        if (this.has(key)) {
          delete this.images[key];
        }

        return this;
      }
    }, {
      key: "get",
      value: function get(key) {
        if (!this.has(key)) {
          if (this.textureManager.exists(key)) {
            this.add(key);
          }
        }

        return this.images[key];
      }
    }, {
      key: "getOuterWidth",
      value: function getOuterWidth(key) {
        var data = this.get(key);
        return data ? data.width + data.left + data.right : 0;
      }
    }, {
      key: "getFrame",
      value: function getFrame(key) {
        var data = this.get(key);
        return data ? this.textureManager.getFrame(data.key, data.frame) : undefined;
      }
    }, {
      key: "hasTexture",
      value: function hasTexture(key) {
        return !!this.getFrame(key);
      }
    }]);

    return ImageManager;
  }();

  var methods$1 = {
    draw: DrawImage
  };
  Object.assign(ImageManager.prototype, methods$1);

  var CopyCanvasToTexture = function CopyCanvasToTexture(scene, srcCanvas, key, x, y, width, height) {
    var textures = scene.sys.textures;
    var renderer = scene.renderer;

    if (x === undefined) {
      x = 0;
    }

    if (y === undefined) {
      y = 0;
    }

    if (width === undefined) {
      width = srcCanvas.width;
    }

    if (height === undefined) {
      height = srcCanvas.height;
    }

    var texture;

    if (textures.exists(key)) {
      texture = textures.get(key);
    } else {
      texture = textures.createCanvas(key, width, height);
    }

    var destCanvas = texture.getSourceImage();

    if (destCanvas.width !== width) {
      destCanvas.width = width;
    }

    if (destCanvas.height !== height) {
      destCanvas.height = height;
    }

    var destCtx = destCanvas.getContext('2d');
    destCtx.clearRect(0, 0, width, height);
    destCtx.drawImage(srcCanvas, x, y, width, height);

    if (renderer.gl && texture) {
      renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
    }
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var AddToDOM = Phaser.DOM.AddToDOM;
  var CanvasPool = Phaser.Display.Canvas.CanvasPool;
  var GameObject = Phaser.GameObjects.GameObject;
  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var RemoveFromDOM = Phaser.DOM.RemoveFromDOM;
  var SPLITREGEXP = CONST.SPLITREGEXP;
  var PensPools = {};

  var Text = /*#__PURE__*/function (_GameObject) {
    _inherits(Text, _GameObject);

    var _super = _createSuper(Text);

    function Text(scene, x, y, text, style, type, parser) {
      var _this;

      _classCallCheck(this, Text);

      if (IsPlainObject(x)) {
        var config = x;
        x = GetValue$1(config, 'x', 0);
        y = GetValue$1(config, 'y', 0);
        text = GetValue$1(config, 'text', '');
        style = GetValue$1(config, 'style', '');
      }

      if (x === undefined) {
        x = 0;
      }

      if (y === undefined) {
        y = 0;
      }

      _this = _super.call(this, scene, type);
      _this.renderer = scene.sys.game.renderer;

      _this.setPosition(x, y);

      _this.setOrigin(0, 0);

      _this.initPipeline();

      _this.canvas = CanvasPool.create(_assertThisInitialized(_this));
      _this.context = _this.canvas.getContext('2d');
      _this._imageManager = undefined;

      if (style) {
        // Override align
        if (style.hasOwnProperty('align')) {
          var halign = style.align;
          delete style.align;
          style.halign = halign;
        } // Has Stroke color but stroke thinkness, set stroke thinkness to 1


        if (style.hasOwnProperty('stroke') && !style.hasOwnProperty('strokeThickness')) {
          style.strokeThickness = 1;
        }
      }

      _this.style = new TextStyle(_assertThisInitialized(_this), style);
      _this.autoRound = true;
      _this._text = undefined;
      _this.padding = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      };
      _this.width = 1;
      _this.height = 1;
      _this.dirty = false; //  If resolution wasn't set, force it to 1

      if (_this.style.resolution === 0) {
        _this.style.resolution = 1;
      }

      _this._crop = _this.resetCropObject(); //  Create a Texture for this Text object

      _this.texture = scene.sys.textures.addCanvas(null, _this.canvas, true); //  Get the frame

      _this.frame = _this.texture.get(); //  Set the resolution

      _this.frame.source.resolution = _this.style.resolution;

      if (_this.renderer.gl) {
        //  Clear the default 1x1 glTexture, as we override it later
        _this.renderer.deleteTexture(_this.frame.source.glTexture);

        _this.frame.source.glTexture = null;
      }

      if (!PensPools.hasOwnProperty(type)) {
        PensPools[type] = new Stack();
      }

      _this.canvasText = new CanvasText({
        parent: _assertThisInitialized(_this),
        context: _this.context,
        parser: parser,
        style: _this.style,
        pensPool: PensPools[type]
      });
      _this.parser = parser;

      _this.initRTL();

      if (style && style.padding) {
        _this.setPadding(style.padding);
      }

      _this.setText(text);

      scene.sys.game.events.on('contextrestored', _this.onContextRestored, _assertThisInitialized(_this));
      return _this;
    }

    _createClass(Text, [{
      key: "onContextRestored",
      value: function onContextRestored() {
        this.dirty = true;
      }
    }, {
      key: "preDestroy",
      value: function preDestroy() {
        if (this.style.rtl) {
          RemoveFromDOM(this.canvas);
        }

        this.scene.sys.game.events.off('contextrestored', this.onContextRestored, this);
        this.canvasText.destroy();
        this.canvasText = undefined;

        if (this._imageManager) {
          this._imageManager.destroy();

          this._imageManager = undefined;
        }

        CanvasPool.remove(this.canvas);
        this.texture.destroy();
      }
    }, {
      key: "text",
      get: function get() {
        return this._text;
      },
      set: function set(value) {
        this.setText(value);
      }
    }, {
      key: "initRTL",
      value: function initRTL() {
        if (!this.style.rtl) {
          return;
        } //  Here is where the crazy starts.
        //
        //  Due to browser implementation issues, you cannot fillText BiDi text to a canvas
        //  that is not part of the DOM. It just completely ignores the direction property.


        this.canvas.dir = 'rtl'; //  Experimental atm, but one day ...

        this.context.direction = 'rtl'; //  Add it to the DOM, but hidden within the parent canvas.

        this.canvas.style.display = 'none';
        AddToDOM(this.canvas, this.scene.sys.canvas); //  And finally we set the x origin

        this.originX = 1;
      }
    }, {
      key: "setText",
      value: function setText(value) {
        if (value == null) {
          value = '';
        } else if (Array.isArray(value)) {
          value = value.join('\n');
        } else {
          value = value.toString();
        }

        if (value === this._text) {
          return this;
        }

        this._text = value;
        this.updateText();
        return this;
      }
    }, {
      key: "appendText",
      value: function appendText(value) {
        if (value == null) {
          return this;
        }

        if (Array.isArray(value)) {
          value = value.join('\n');
        }

        this.setText(this.text + value.toString());
        return this;
      }
    }, {
      key: "setStyle",
      value: function setStyle(style) {
        return this.style.setStyle(style);
      }
    }, {
      key: "setFont",
      value: function setFont(font) {
        return this.style.setFont(font);
      }
    }, {
      key: "setFontFamily",
      value: function setFontFamily(family) {
        return this.style.setFontFamily(family);
      }
    }, {
      key: "setFontSize",
      value: function setFontSize(size) {
        return this.style.setFontSize(size);
      }
    }, {
      key: "setFontStyle",
      value: function setFontStyle(style) {
        return this.style.setFontStyle(style);
      }
    }, {
      key: "setTestString",
      value: function setTestString(string) {
        return this.style.setTestString(string);
      }
    }, {
      key: "setFixedSize",
      value: function setFixedSize(width, height) {
        return this.style.setFixedSize(width, height);
      }
    }, {
      key: "setBackgroundColor",
      value: function setBackgroundColor(color, color2, isHorizontalGradient) {
        return this.style.setBackgroundColor(color, color2, isHorizontalGradient);
      }
    }, {
      key: "setBackgroundStrokeColor",
      value: function setBackgroundStrokeColor(color, lineWidth) {
        return this.style.setBackgroundStrokeColor(color, lineWidth);
      }
    }, {
      key: "setBackgroundCornerRadius",
      value: function setBackgroundCornerRadius(radius, iteration) {
        return this.style.setBackgroundCornerRadius(radius, iteration);
      }
    }, {
      key: "setFill",
      value: function setFill(color) {
        return this.style.setFill(color);
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        return this.style.setColor(color);
      }
    }, {
      key: "setStroke",
      value: function setStroke(color, thickness) {
        return this.style.setStroke(color, thickness);
      }
    }, {
      key: "setShadow",
      value: function setShadow(x, y, color, blur, shadowStroke, shadowFill) {
        return this.style.setShadow(x, y, color, blur, shadowStroke, shadowFill);
      }
    }, {
      key: "setShadowOffset",
      value: function setShadowOffset(x, y) {
        return this.style.setShadowOffset(x, y);
      }
    }, {
      key: "setShadowColor",
      value: function setShadowColor(color) {
        return this.style.setShadowColor(color);
      }
    }, {
      key: "setShadowBlur",
      value: function setShadowBlur(blur) {
        return this.style.setShadowBlur(blur);
      }
    }, {
      key: "setShadowStroke",
      value: function setShadowStroke(enabled) {
        return this.style.setShadowStroke(enabled);
      }
    }, {
      key: "setShadowFill",
      value: function setShadowFill(enabled) {
        return this.style.setShadowFill(enabled);
      }
    }, {
      key: "setWrapMode",
      value: function setWrapMode(mode) {
        return this.style.setWrapMode(mode);
      }
    }, {
      key: "setWrapWidth",
      value: function setWrapWidth(width) {
        return this.style.setWrapWidth(width);
      } // Align with built-in text game object

    }, {
      key: "setWordWrapWidth",
      value: function setWordWrapWidth(width) {
        return this.style.setWrapWidth(width);
      }
    }, {
      key: "setAlign",
      value: function setAlign(align) {
        return this.style.setHAlign(align);
      }
    }, {
      key: "setHAlign",
      value: function setHAlign(align) {
        return this.style.setHAlign(align);
      }
    }, {
      key: "setVAlign",
      value: function setVAlign(align) {
        return this.style.setVAlign(align);
      }
    }, {
      key: "setLineSpacing",
      value: function setLineSpacing(value) {
        return this.style.setLineSpacing(value);
      }
    }, {
      key: "setXOffset",
      value: function setXOffset(value) {
        return this.style.setXOffset(value);
      }
    }, {
      key: "setPadding",
      value: function setPadding(left, top, right, bottom) {
        if (_typeof(left) === 'object') {
          var config = left; //  If they specify x and/or y this applies to all

          var x = GetValue$1(config, 'x', null);

          if (x !== null) {
            left = x;
            right = x;
          } else {
            left = GetValue$1(config, 'left', 0);
            right = GetValue$1(config, 'right', left);
          }

          var y = GetValue$1(config, 'y', null);

          if (y !== null) {
            top = y;
            bottom = y;
          } else {
            top = GetValue$1(config, 'top', 0);
            bottom = GetValue$1(config, 'bottom', top);
          }
        } else {
          if (left === undefined) {
            left = 0;
          }

          if (top === undefined) {
            top = left;
          }

          if (right === undefined) {
            right = left;
          }

          if (bottom === undefined) {
            bottom = top;
          }
        }

        this.padding.left = left;
        this.padding.top = top;
        this.padding.right = right;
        this.padding.bottom = bottom;
        return this.updateText(false);
      }
    }, {
      key: "setMaxLines",
      value: function setMaxLines(max) {
        return this.style.setMaxLines(max);
      }
    }, {
      key: "setResolution",
      value: function setResolution(value) {
        return this.style.setResolution(value);
      }
    }, {
      key: "updateText",
      value: function updateText(runWrap) {
        if (runWrap === undefined) {
          runWrap = true;
        }

        var canvasText = this.canvasText; // wrap text to pens

        var style = this.style;

        if (runWrap) {
          canvasText.updatePenManager(this._text, style.wrapMode, style.wrapWidth, style.lineHeight);
        } // resize


        var padding = this.padding;
        var textWidth, textHeight;
        var linesWidth = Math.ceil(canvasText.linesWidth);

        if (style.fixedWidth === 0) {
          this.width = linesWidth + padding.left + padding.right;
          textWidth = linesWidth;
        } else {
          this.width = style.fixedWidth;
          textWidth = this.width - padding.left - padding.right;

          if (textWidth < linesWidth) {
            textWidth = linesWidth;
          }
        }

        if (style.fixedHeight === 0) {
          this.height = canvasText.linesHeight + padding.top + padding.bottom;
          textHeight = canvasText.linesHeight;
        } else {
          this.height = style.fixedHeight;
          textHeight = this.height - padding.top - padding.bottom;

          if (textHeight < canvasText.linesHeight) {
            textHeight = canvasText.linesHeight;
          }
        }

        var w = this.width;
        var h = this.height;
        this.updateDisplayOrigin();
        var resolution = style.resolution;
        w *= resolution;
        h *= resolution;
        w = Math.max(Math.ceil(w), 1);
        h = Math.max(Math.ceil(h), 1);
        var canvas = this.canvas;
        var context = this.context;

        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          this.frame.setSize(w, h);
        } else {
          context.clearRect(0, 0, w, h);
        }

        context.save();
        context.scale(resolution, resolution); // draw

        var startX = !this.style.rtl ? padding.left : padding.right;
        var startY = padding.top;
        canvasText.draw(startX, startY, textWidth, textHeight);
        context.restore();

        if (this.renderer && this.renderer.gl) {
          this.frame.source.glTexture = this.renderer.canvasToTexture(canvas, this.frame.source.glTexture, true);
          this.frame.glTexture = this.frame.source.glTexture;
        }

        this.dirty = true;
        var input = this.input;

        if (input && !input.customHitArea) {
          input.hitArea.width = this.width;
          input.hitArea.height = this.height;
        }

        return this;
      }
    }, {
      key: "getTextMetrics",
      value: function getTextMetrics() {
        return this.style.getTextMetrics();
      }
    }, {
      key: "setTextMetrics",
      value: function setTextMetrics(metrics, font) {
        return this.style.setTextMetrics(metrics, font);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var out = Components.ToJSON(this); //  Extra Text data is added here

        var data = {
          autoRound: this.autoRound,
          text: this._text,
          style: this.style.toJSON(),
          resolution: this.resolution,
          padding: {
            left: this.padding.left,
            right: this.padding.right,
            top: this.padding.top,
            bottom: this.padding.bottom
          }
        };
        out.data = data;
        return out;
      }
    }, {
      key: "setInteractive",
      value: function setInteractive(hitArea, hitAreaCallback, dropZone) {
        var isInteractived = !!this.input;
        GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

        if (!isInteractived) {
          this.canvasText.setInteractive();
        }

        return this;
      }
    }, {
      key: "getWrappedText",
      value: function getWrappedText(text, start, end) {
        text = this.canvasText.getText(text, start, end, true);
        return text.split(SPLITREGEXP);
      }
    }, {
      key: "getPlainText",
      value: function getPlainText(text, start, end) {
        return this.canvasText.getPlainText(text, start, end);
      }
    }, {
      key: "getText",
      value: function getText(text, start, end, wrap) {
        if (wrap === undefined) {
          wrap = false;
        }

        return this.canvasText.getText(text, start, end, wrap);
      }
    }, {
      key: "getSubString",
      value: function getSubString(text, start, end) {
        return this.getText(text, start, end);
      }
    }, {
      key: "copyPenManager",
      value: function copyPenManager(penManager) {
        return this.canvasText.copyPenManager(penManager);
      }
    }, {
      key: "getPenManager",
      value: function getPenManager(text, penManager) {
        return this.canvasText.getPenManager(text, penManager);
      }
    }, {
      key: "setSize",
      value: function setSize(width, height) {
        return this.setFixedSize(width, height);
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        return this.setFixedSize(width, height);
      }
    }, {
      key: "lineSpacing",
      get: function get() {
        return this.style.lineSpacing;
      },
      set: function set(value) {
        this.setLineSpacing(value);
      }
    }, {
      key: "imageManager",
      get: function get() {
        if (!this._imageManager) {
          this._imageManager = new ImageManager(this.scene);
        }

        return this._imageManager;
      }
    }, {
      key: "addImage",
      value: function addImage(key, config) {
        this.imageManager.add(key, config);
        return this;
      }
    }, {
      key: "drawAreaBounds",
      value: function drawAreaBounds(graphics, color) {
        this.canvasText.hitAreaManager.drawBounds(graphics, color, this);
        return this;
      }
    }, {
      key: "measureTextMargins",
      value: function measureTextMargins(testString, out) {
        return MeasureTextMargins(this.style, testString, out);
      }
    }, {
      key: "generateTexture",
      value: function generateTexture(key, x, y, width, height) {
        var srcCanvas = this.canvas;

        if (width === undefined) {
          width = srcCanvas.width;
        } else {
          width *= this.resolution;
        }

        if (height === undefined) {
          height = srcCanvas.height;
        } else {
          height *= this.resolution;
        }

        CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);
        return this;
      }
    }]);

    return Text;
  }(GameObject);

  var Components = Phaser.GameObjects.Components;
  Phaser.Class.mixin(Text, [Components.Alpha, Components.BlendMode, Components.ComputedSize, Components.Crop, Components.Depth, Components.Flip, Components.GetBounds, Components.Mask, Components.Origin, Components.Pipeline, Components.ScrollFactor, Components.Tint, Components.Transform, Components.Visible, Render]);

  var GetOpenTagRegString = function GetOpenTagRegString(tagName, param) {
    if (param === undefined) {
      return "\\[".concat(tagName, "\\]");
    } else {
      return "\\[".concat(tagName, "=(").concat(param, ")\\]");
    }
  };

  var GetCloseTagRegString = function GetCloseTagRegString(tagName) {
    return "\\[/".concat(tagName, "\\]");
  };

  var NUMBER_PARAM = '[-.0-9]+';
  var COLOR_PARAM = '[a-z]+|#[0-9abcdef]+';
  var STR_PARAM = '[^\\]]+';
  var ESC = 'esc';
  var ESC_OPEN = GetOpenTagRegString(ESC);
  var ESC_CLOSE = GetCloseTagRegString(ESC);
  var RAW = 'raw';
  var RAW_OPEN = GetOpenTagRegString(RAW);
  var RAW_CLOSE = GetCloseTagRegString(RAW);
  var BLOD = 'b';
  var BLOD_OPEN = GetOpenTagRegString(BLOD);
  var BLOD_CLOSE = GetCloseTagRegString(BLOD);
  var ITALICS = 'i';
  var ITALICS_OPEN = GetOpenTagRegString(ITALICS);
  var ITALICS_CLOSE = GetCloseTagRegString(ITALICS);
  var WEIGHT = 'weight';
  var WEIGHT_OPEN = GetOpenTagRegString(WEIGHT, NUMBER_PARAM);
  var WEIGHT_CLOSE = GetCloseTagRegString(WEIGHT);
  var SIZE = 'size';
  var SIZE_OPEN = GetOpenTagRegString(SIZE, NUMBER_PARAM);
  var SIZE_CLOSE = GetCloseTagRegString(SIZE);
  var COLOR = 'color';
  var COLOR_OPEN = GetOpenTagRegString(COLOR, COLOR_PARAM);
  var COLOR_CLOSE = GetCloseTagRegString(COLOR);
  var UNDERLINE = 'u';
  var UNDERLINE_OPEN = GetOpenTagRegString(UNDERLINE);
  var UNDERLINE_OPENC = GetOpenTagRegString(UNDERLINE, COLOR_PARAM);
  var UNDERLINE_CLOSE = GetCloseTagRegString(UNDERLINE);
  var SHADOW = 'shadow';
  var SHADOW_OPEN = GetOpenTagRegString(SHADOW);
  var SHADOW_CLOSE = GetCloseTagRegString(SHADOW);
  var STROKE = 'stroke';
  var STROKE_OPEN = GetOpenTagRegString(STROKE);
  var STROKE_OPENC = GetOpenTagRegString(STROKE, COLOR_PARAM);
  var STROKE_CLOSE = GetCloseTagRegString(STROKE);
  var OFFSETY = 'y';
  var OFFSETY_OPEN = GetOpenTagRegString(OFFSETY, NUMBER_PARAM);
  var OFFSETY_CLOSE = GetCloseTagRegString(OFFSETY);
  var IMAGE = 'img';
  var IMAGE_OPEN = GetOpenTagRegString(IMAGE, STR_PARAM);
  var IMAGE_CLOSE = GetCloseTagRegString(IMAGE);
  var AREA = 'area';
  var AREA_OPEN = GetOpenTagRegString(AREA, STR_PARAM);
  var AREA_CLOSE = GetCloseTagRegString(AREA);
  var ALIGN = 'align';
  var ALIGN_OPEN = GetOpenTagRegString(ALIGN, STR_PARAM);
  var ALIGN_CLOSE = GetCloseTagRegString(ALIGN);
  var RE_ESC_OPEN = new RegExp(ESC_OPEN, 'i');
  var RE_ESC_CLOSE = new RegExp(ESC_CLOSE, 'i');
  var RE_RAW_OPEN = new RegExp(RAW_OPEN, 'i');
  var RE_RAW_CLOSE = new RegExp(RAW_CLOSE, 'i');
  var RE_BLOD_OPEN = new RegExp(BLOD_OPEN, 'i');
  var RE_BLOD_CLOSE = new RegExp(BLOD_CLOSE, 'i');
  var RE_ITALICS_OPEN = new RegExp(ITALICS_OPEN, 'i');
  var RE_ITALICS_CLOSE = new RegExp(ITALICS_CLOSE, 'i');
  var RE_WEIGHT_OPEN = new RegExp(WEIGHT_OPEN, 'i');
  var RE_WEIGHT_CLOSE = new RegExp(WEIGHT_CLOSE, 'i');
  var RE_SIZE_OPEN = new RegExp(SIZE_OPEN, 'i');
  var RE_SIZE_CLOSE = new RegExp(SIZE_CLOSE, 'i');
  var RE_COLOR_OPEN = new RegExp(COLOR_OPEN, 'i');
  var RE_COLOR_CLOSE = new RegExp(COLOR_CLOSE, 'i');
  var RE_UNDERLINE_OPEN = new RegExp(UNDERLINE_OPEN, 'i');
  var RE_UNDERLINE_OPENC = new RegExp(UNDERLINE_OPENC, 'i');
  var RE_UNDERLINE_CLOSE = new RegExp(UNDERLINE_CLOSE, 'i');
  var RE_SHADOW_OPEN = new RegExp(SHADOW_OPEN, 'i');
  var RE_SHADOW_CLOSE = new RegExp(SHADOW_CLOSE, 'i');
  var RE_STROKE_OPEN = new RegExp(STROKE_OPEN, 'i');
  var RE_STROKE_OPENC = new RegExp(STROKE_OPENC, 'i');
  var RE_STROKE_CLOSE = new RegExp(STROKE_CLOSE, 'i');
  var RE_OFFSETY_OPEN = new RegExp(OFFSETY_OPEN, 'i');
  var RE_OFFSETY_CLOSE = new RegExp(OFFSETY_CLOSE, 'i');
  var RE_IMAGE_OPEN = new RegExp(IMAGE_OPEN, 'i');
  var RE_IMAGE_CLOSE = new RegExp(IMAGE_CLOSE, 'i');
  var RE_AREA_OPEN = new RegExp(AREA_OPEN, 'i');
  var RE_AREA_CLOSE = new RegExp(AREA_CLOSE, 'i');
  var RE_ALIGN_OPEN = new RegExp(ALIGN_OPEN, 'i');
  var RE_ALIGN_CLOSE = new RegExp(ALIGN_CLOSE, 'i');
  var RE_SPLITTEXT = new RegExp([RAW_OPEN, RAW_CLOSE, ESC_OPEN, ESC_CLOSE, BLOD_OPEN, BLOD_CLOSE, ITALICS_OPEN, ITALICS_CLOSE, WEIGHT_OPEN, WEIGHT_CLOSE, SIZE_OPEN, SIZE_CLOSE, COLOR_OPEN, COLOR_CLOSE, UNDERLINE_OPEN, UNDERLINE_OPENC, UNDERLINE_CLOSE, SHADOW_OPEN, SHADOW_CLOSE, STROKE_OPEN, STROKE_OPENC, STROKE_CLOSE, OFFSETY_OPEN, OFFSETY_CLOSE, IMAGE_OPEN, IMAGE_CLOSE, AREA_OPEN, AREA_CLOSE, ALIGN_OPEN, ALIGN_CLOSE].join('|'), 'ig');

  var SplitText = function SplitText(text, mode) {
    var result = [];
    var charIdx = 0;
    var rawMode = false,
        escMode = false;

    while (true) {
      var regexResult = RE_SPLITTEXT.exec(text);

      if (!regexResult) {
        break;
      }

      var match = regexResult[0];

      if (escMode) {
        if (RE_ESC_CLOSE.test(match)) {
          escMode = false;
        } else {
          continue; // Skip other tags
        }
      } else if (rawMode) {
        if (RE_RAW_CLOSE.test(match)) {
          rawMode = false;
        } else {
          continue; // Skip other tags
        }
      } else {
        if (RE_ESC_OPEN.test(match)) {
          escMode = true;
        } else if (RE_RAW_OPEN.test(match)) {
          rawMode = true;
        }
      }

      var matchEnd = RE_SPLITTEXT.lastIndex;
      var matchStart = matchEnd - match.length;

      if (charIdx < matchStart) {
        var content = text.substring(charIdx, matchStart);
        result.push(content);
      }

      if (mode === undefined) {
        result.push(match);
      }

      charIdx = matchEnd;
    }

    var totalLen = text.length;

    if (charIdx < totalLen) {
      // Push remainder string
      result.push(text.substring(charIdx, totalLen));
    }

    return result; // [text,...]
  };

  var PROP_REMOVE = false;
  var PROP_ADD = true;
  var GETPROP_RESULT = {
    plainText: null,
    prevProp: null
  };

  var TagTextToProp = function TagTextToProp(text, prevProp) {
    // text : result of splitText()
    if (prevProp == null) {
      prevProp = {};
    }

    var plainText = ''; // close image tag

    if (prevProp.img) {
      UpdateProp(prevProp, PROP_REMOVE, 'img');
    }

    if (prevProp.esc) {
      if (RE_ESC_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'esc');
      } else {
        plainText = text;
      }
    } else if (prevProp.raw) {
      if (RE_RAW_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'raw');
      } else {
        plainText = text;
      }
    } else {
      if (RE_ESC_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'esc', true);
      } else if (RE_ESC_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'esc');
      } else if (RE_RAW_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'raw', true);
      } else if (RE_RAW_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'raw');
      } else if (RE_BLOD_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'b', true);
      } else if (RE_BLOD_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'b');
      } else if (RE_ITALICS_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'i', true);
      } else if (RE_ITALICS_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'i');
      } else if (RE_WEIGHT_OPEN.test(text)) {
        var innerMatch = text.match(RE_WEIGHT_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'weight', innerMatch[1]);
      } else if (RE_WEIGHT_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'weight');
      } else if (RE_SIZE_OPEN.test(text)) {
        var innerMatch = text.match(RE_SIZE_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'size', "".concat(innerMatch[1], "px"));
      } else if (RE_SIZE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'size');
      } else if (RE_COLOR_OPEN.test(text)) {
        var innerMatch = text.match(RE_COLOR_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'color', innerMatch[1]);
      } else if (RE_COLOR_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'color');
      } else if (RE_UNDERLINE_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'u', true);
      } else if (RE_UNDERLINE_OPENC.test(text)) {
        var innerMatch = text.match(RE_UNDERLINE_OPENC);
        UpdateProp(prevProp, PROP_ADD, 'u', innerMatch[1]);
      } else if (RE_UNDERLINE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'u');
      } else if (RE_SHADOW_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'shadow', true);
      } else if (RE_SHADOW_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'shadow');
      } else if (RE_STROKE_OPEN.test(text)) {
        UpdateProp(prevProp, PROP_ADD, 'stroke', true);
      } else if (RE_STROKE_OPENC.test(text)) {
        var innerMatch = text.match(RE_STROKE_OPENC);
        UpdateProp(prevProp, PROP_ADD, 'stroke', innerMatch[1]);
      } else if (RE_STROKE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'stroke');
      } else if (RE_OFFSETY_OPEN.test(text)) {
        var innerMatch = text.match(RE_OFFSETY_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'y', parseFloat(innerMatch[1]));
      } else if (RE_OFFSETY_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'y');
      } else if (RE_IMAGE_OPEN.test(text)) {
        var innerMatch = text.match(RE_IMAGE_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'img', innerMatch[1]);
      } else if (RE_IMAGE_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'img');
      } else if (RE_AREA_OPEN.test(text)) {
        var innerMatch = text.match(RE_AREA_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'area', innerMatch[1]);
      } else if (RE_AREA_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'area');
      } else if (RE_ALIGN_OPEN.test(text)) {
        var innerMatch = text.match(RE_ALIGN_OPEN);
        UpdateProp(prevProp, PROP_ADD, 'align', innerMatch[1]);
      } else if (RE_ALIGN_CLOSE.test(text)) {
        UpdateProp(prevProp, PROP_REMOVE, 'align');
      } else {
        plainText = text;
      }
    }

    var result = GETPROP_RESULT;
    result.plainText = plainText;
    result.prop = prevProp;
    return result;
  };

  var UpdateProp = function UpdateProp(prop, op, key, value) {
    if (op === PROP_ADD) {
      // PROP_ADD     
      prop[key] = value;
    } else {
      // PROP_REMOVE        
      if (prop.hasOwnProperty(key)) {
        delete prop[key];
      }
    }

    return prop;
  };

  var PropToContextStyle = function PropToContextStyle(defaultStyle, prop) {
    var result = STYLE_RESULT;

    if (!prop.hasOwnProperty('img')) {
      result.image = null;

      if (prop.hasOwnProperty('family')) {
        result.fontFamily = prop.family;
      } else {
        result.fontFamily = defaultStyle.fontFamily;
      }

      if (prop.hasOwnProperty('size')) {
        var size = prop.size;

        if (typeof size === 'number') {
          size = "".concat(size, "px");
        }

        result.fontSize = size;
      } else {
        result.fontSize = defaultStyle.fontSize;
      }

      result.fontStyle = GetFontStyle(prop);

      if (prop.hasOwnProperty('color')) {
        result.color = prop.color;
      } else {
        result.color = defaultStyle.color;
      }

      if (prop.hasOwnProperty('stroke')) {
        if (prop.stroke === true) {
          result.stroke = defaultStyle.stroke;
          result.strokeThickness = defaultStyle.strokeThickness;
        } else {
          result.stroke = prop.stroke;
          result.strokeThickness = defaultStyle.strokeThickness;
        }
      } else {
        result.stroke = defaultStyle.stroke;
        result.strokeThickness = 0;
      }
    } else {
      result.image = prop.img;
    }

    if (prop.hasOwnProperty('shadow')) {
      if (prop.shadow === true) {
        result.shadowColor = defaultStyle.shadowColor;
        result.shadowOffsetX = defaultStyle.shadowOffsetX;
        result.shadowOffsetY = defaultStyle.shadowOffsetY;
        result.shadowBlur = defaultStyle.shadowBlur;
        result.shadowStroke = true;
        result.shadowFill = true;
      } else {
        result.shadowColor = prop.shadow;
        result.shadowOffsetX = defaultStyle.shadowOffsetX;
        result.shadowOffsetY = defaultStyle.shadowOffsetY;
        result.shadowBlur = defaultStyle.shadowBlur;
        result.shadowStroke = true;
        result.shadowFill = true;
      }
    } else {
      result.shadowColor = '#000';
      result.shadowOffsetX = 0;
      result.shadowOffsetY = 0;
      result.shadowBlur = 0;
      result.shadowStroke = false;
      result.shadowFill = false;
    }

    if (prop.hasOwnProperty('u')) {
      if (prop.u === true) {
        result.underlineColor = defaultStyle.underlineColor;
        result.underlineThickness = defaultStyle.underlineThickness;
        result.underlineOffset = defaultStyle.underlineOffset;
      } else {
        result.underlineColor = prop.u;
        result.underlineThickness = defaultStyle.underlineThickness;
        result.underlineOffset = defaultStyle.underlineOffset;
      }
    } else {
      result.underlineColor = '#000';
      result.underlineThickness = 0;
      result.underlineOffset = 0;
    }

    return result;
  };

  var GetFontStyle = function GetFontStyle(prop) {
    var isBold = prop.b;
    var weight = prop.weight;
    var isItalic = prop.i;

    if (isBold || weight || isItalic) {
      if (isItalic) {
        if (isBold) {
          return 'bold italic';
        } else if (weight) {
          return "".concat(weight, " italic");
        } else {
          return 'italic';
        }
      } else {
        // !isItalic
        if (isBold) {
          return 'bold';
        } else {
          return weight.toString();
        }
      }
    } else {
      return '';
    }
  };

  var STYLE_RESULT = new TextStyle();

  var PropToTagText = function PropToTagText(text, prop, prevProp) {
    if (prevProp == null) {
      prevProp = EMPTYPROP;
    }

    var headers = [];

    for (var k in prevProp) {
      if (!prop.hasOwnProperty(k)) {
        headers.push("[/".concat(k, "]"));
      }
    }

    for (var k in prop) {
      var value = prop[k];

      if (prevProp[k] === value) {
        continue;
      }

      switch (k) {
        case 'size':
          headers.push("[size=".concat(value.replace('px', ''), "]"));
          break;

        case 'color':
        case 'weight':
        case 'stroke':
        case 'y':
        case 'img':
        case 'area':
        case 'align':
          headers.push("[".concat(k, "=").concat(value, "]"));
          break;

        case 'u':
          if (value === true) {
            headers.push('[u]');
          } else {
            headers.push("[u=".concat(value, "]"));
          }

          break;

        default:
          headers.push("[".concat(k, "]"));
          break;
      }
    }

    headers.push(text);
    return headers.join('');
  };

  var EMPTYPROP = {};

  var Parser = /*#__PURE__*/function () {
    function Parser() {
      _classCallCheck(this, Parser);
    }

    _createClass(Parser, [{
      key: "getStrokeThinkness",
      value: function getStrokeThinkness(defaultStyle, prop) {
        var strokeThickness;

        if (prop.hasOwnProperty('stroke')) {
          strokeThickness = defaultStyle.strokeThickness;
        } else {
          strokeThickness = 0;
        }

        return strokeThickness;
      }
    }]);

    return Parser;
  }();

  var methods = {
    splitText: SplitText,
    tagTextToProp: TagTextToProp,
    propToContextStyle: PropToContextStyle,
    propToTagText: PropToTagText
  };
  Object.assign(Parser.prototype, methods);

  var BBCodeText = /*#__PURE__*/function (_Text) {
    _inherits(BBCodeText, _Text);

    var _super = _createSuper(BBCodeText);

    function BBCodeText(scene, x, y, text, style) {
      _classCallCheck(this, BBCodeText);

      var parser = new Parser(style);
      return _super.call(this, scene, x, y, text, style, 'rexBBCodeText', parser);
    }

    return _createClass(BBCodeText);
  }(Text);

  var SetTextMethods = {
    setText: function setText(name, text) {
      if (!this.has(name)) {
        this.add(name);
      }

      this.get(name).setText(text);
      return this;
    },
    typingText: function typingText(name, text) {
      if (!this.has(name)) {
        this.add(name);
      }

      this.get(name).typing(text);
      return this;
    },
    setTypingSpeed: function setTypingSpeed(speed) {
      this.typingSpeed = speed;
      return this;
    }
  };

  var Methods$1 = {};
  Object.assign(Methods$1, SetTextMethods);

  var TextManager = /*#__PURE__*/function (_GOManager) {
    _inherits(TextManager, _GOManager);

    var _super = _createSuper(TextManager);

    function TextManager(scene, config) {
      _classCallCheck(this, TextManager);

      if (config === undefined) {
        config = {};
      }

      config.BobClass = TextBob;
      return _super.call(this, scene, config);
    }

    _createClass(TextManager, [{
      key: "setCreateGameObjectCallback",
      value: function setCreateGameObjectCallback(callback) {
        if (!callback) {
          this.createGameObjectCallback = function (scene, textObjectType) {
            switch (textObjectType) {
              case 'bbcodetext':
                return CreateBBCodeTextObject(scene);

              default:
                return CreateTextObject(scene);
            }
          };
        } else if (callback === 'text') {
          this.createGameObjectCallback = CreateTextObject;
        } else if (callback === 'bbcodetext') {
          this.createGameObjectCallback = CreateBBCodeTextObject;
        } else {
          this.createGameObjectCallback = callback;
        }

        return this;
      }
    }]);

    return TextManager;
  }(GOManager);

  var CreateTextObject = function CreateTextObject(scene) {
    return scene.add.text(0, 0, '');
  };

  var CreateBBCodeTextObject = function CreateBBCodeTextObject(scene) {
    var gameObject = new BBCodeText(scene, 0, 0, '');
    scene.add.existing(gameObject);
    return gameObject;
  };

  Object.assign(TextManager.prototype, Methods$1);

  var SetClickTarget = function SetClickTarget(target) {
    this.clickTarget = target;

    if (!target) {
      this.clickEE = null;
    } else if (IsSceneObject(target)) {
      this.clickEE = target.input;
    } else {
      // Assume that target is a gameObject
      this.clickEE = target.setInteractive();
    }

    return this;
  };

  var SetTargetCamera = function SetTargetCamera(camera) {
    this.camera = camera;
    return this;
  };

  var SetSkipSoundEffect = function SetSkipSoundEffect(value) {
    if (value === undefined) {
      value = true;
    }

    this.skipSoundEffect = value;

    if (value) {
      var soundManager = this._soundManager;

      if (soundManager) {
        soundManager.fadeOutAllSoundEffects(100, true);
      }
    }

    return this;
  };

  var Play = function Play(content) {
    this.parser.start(content);
    return this;
  };

  var WaitEvent = function WaitEvent(eventEmitter, eventName) {
    return new Promise(function (resolve, reject) {
      eventEmitter.once(eventName, function () {
        resolve();
      });
    });
  };

  var WaitComplete = function WaitComplete(eventEmitter) {
    return WaitEvent(eventEmitter, 'complete');
  };

  var PlayPromise = function PlayPromise(content) {
    var promise = WaitComplete(this);
    this.play(content);
    return promise;
  };

  var Pause = function Pause() {
    this.parser.pause();
    return this;
  };

  var Resume = function Resume() {
    this.parser.next();
    return this;
  };

  // Internal events
  var RemoveWaitEvents = '_remove.wait';
  var StopPlayEvent = '_remove.play';
  var ClearEvents$1 = [RemoveWaitEvents, StopPlayEvent];

  var GetWrapCallback = function GetWrapCallback(tagPlayer, callback, args, scope, removeFrom) {
    return function () {
      tagPlayer.emit(RemoveWaitEvents, removeFrom); // Remove all wait events

      callback.apply(scope, args);
    };
  };

  var WaitCallback = function WaitCallback(tagPlayer, postfixName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope, 'custom');
    var eventName = postfixName ? "wait.".concat(postfixName) : 'wait';
    tagPlayer.emit(eventName, wrapCallback);
  };

  var DelayCall = function DelayCall(tagPlayer, delay, callback, args, scope) {
    return tagPlayer.timeline.delayCall(delay, callback, args, scope);
  };

  var WaitTime = function WaitTime(tagPlayer, time, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope, 'time');
    var timer; // Remove all wait events

    tagPlayer.once(RemoveWaitEvents, function () {
      if (timer) {
        timer.remove();
        timer = undefined;
      }
    });
    timer = DelayCall(tagPlayer, time, wrapCallback);
    tagPlayer.emit('wait.time', time);
  };

  var WaitClick = function WaitClick(tagPlayer, callback, args, scope) {
    var clickEE = tagPlayer.clickEE;

    if (!clickEE) {
      return;
    }

    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope, 'click'); // Remove all wait events

    tagPlayer.once(RemoveWaitEvents, function () {
      clickEE.off('pointerdown', wrapCallback, tagPlayer);
    });
    clickEE.once('pointerdown', wrapCallback, tagPlayer);
    tagPlayer.emit('wait.click');
  };

  var WaitMusic = function WaitMusic(tagPlayer, music, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope, 'music');

    if (music) {
      // Remove all wait events
      tagPlayer.once(RemoveWaitEvents, function () {
        music.off('complete', wrapCallback, tagPlayer);
      });
      music.once('complete', wrapCallback, tagPlayer);
    }

    tagPlayer.emit('wait.music', music);

    if (!music) {
      wrapCallback();
    }
  };

  var IsWaitCameraEffect = function IsWaitCameraEffect(name) {
    switch (name) {
      case 'camera.fadein':
      case 'camera.fadeout':
      case 'camera.flash':
      case 'camera.shake':
      case 'camera.zoom':
      case 'camera.rotate':
      case 'camera.scroll':
        return true;

      default:
        return false;
    }
  };

  var WaitCameraEffect = function WaitCameraEffect(tagPlayer, effectName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope, "camera.".concat(effectName));
    var camera = tagPlayer.camera;
    var effect, completeEventName;

    switch (effectName) {
      case 'camera.fadein':
        effect = camera.fadeEffect;
        completeEventName = 'camerafadeincomplete';
        break;

      case 'camera.fadeout':
        effect = camera.fadeEffect;
        completeEventName = 'camerafadeoutcomplete';
        break;

      case 'camera.flash':
        effect = camera.flashEffect;
        completeEventName = 'cameraflashcomplete';
        break;

      case 'camera.shake':
        effect = camera.shakeEffect;
        completeEventName = 'camerashakecomplete';
        break;

      case 'camera.zoom':
        effect = camera.zoomEffect;
        completeEventName = 'camerazoomcomplete';
        break;

      case 'camera.rotate':
        effect = camera.rotateToEffect;
        completeEventName = 'camerarotatecomplete';
        break;

      case 'camera.scroll':
        effect = camera.panEffect;
        completeEventName = 'camerapancomplete';
        break;
    }

    if (!effect.isRunning) {
      tagPlayer.emit('wait.camera', effectName);
      wrapCallback();
    } else {
      // Remove all wait events
      tagPlayer.once(RemoveWaitEvents, function (removeFrom) {
        camera.off(completeEventName, wrapCallback, tagPlayer);
      });
      camera.once(completeEventName, wrapCallback, tagPlayer);
      tagPlayer.emit('wait.camera', effectName);
    }
  };

  var WaitKeyDown = function WaitKeyDown(tagPlayer, keyName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope, 'keydown');
    var eventName = "keydown-".concat(keyName.toUpperCase());
    var keyboard = tagPlayer.scene.input.keyboard; // Remove all wait events

    tagPlayer.once(RemoveWaitEvents, function () {
      keyboard.off(eventName, wrapCallback, tagPlayer);
    });
    keyboard.once(eventName, wrapCallback, tagPlayer);
    tagPlayer.emit('wait.keydown', keyName);
  };

  var IsWaitSprite = function IsWaitSprite(name) {
    // sprite, sprite.name, sprite.name.prop
    var names = name.split('.');
    return names[0] === 'sprite' && names.length <= 3;
  };

  var WaitSprite = function WaitSprite(tagPlayer, tag, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope);
    var tags = tag.split('.');
    var spriteManager = tagPlayer.spriteManager;

    switch (tags.length) {
      case 1:
        // sprite: wait all sprites has beeen destroyed
        if (spriteManager.isEmpty) {
          tagPlayer.emit('wait.sprite');
          wrapCallback();
        } else {
          // Remove all wait events
          tagPlayer.once(RemoveWaitEvents, function (removeFrom) {
            spriteManager.off('empty', wrapCallback, tagPlayer);
          });
          spriteManager.once('empty', wrapCallback, tagPlayer);
          tagPlayer.emit('wait.sprite');
        }

        break;

      case 2:
        // sprite.name: wait sprite.name has been destroyed
        var name = tags[1];

        if (spriteManager.has(name)) {
          var spriteData = tagPlayer.spriteManager.get(name);
          var sprite = spriteData.sprite; // Remove all wait events

          tagPlayer.once(RemoveWaitEvents, function () {
            sprite.off('destroy', wrapCallback, tagPlayer);
          });
          sprite.once('destroy', wrapCallback, tagPlayer);
          tagPlayer.emit('wait.sprite', name);
        } else {
          tagPlayer.emit('wait.sprite', name);
          wrapCallback();
        }

        break;

      case 3:
        // sprite.name.prop: wait ease sprite.name.prop has been completed
        var name = tags[1];
        var prop = tags[2];
        var task = tagPlayer.spriteManager.getTweenTask(name, prop);

        if (task) {
          // Remove all wait events
          tagPlayer.once(RemoveWaitEvents, function () {
            task.off('complete', wrapCallback, tagPlayer);
          });
          task.once('complete', wrapCallback, tagPlayer);
          tagPlayer.emit('wait.sprite', name, prop);
        } else {
          tagPlayer.emit('wait.sprite', name, prop);
          wrapCallback();
        }

        break;
    }
  };

  var KeyCodes = Phaser.Input.Keyboard.KeyCodes;

  var WaitMultiple = function WaitMultiple(tagPlayer, names, callback, args, scope) {
    if (typeof names === 'string' && names.length > 1 && names.indexOf('|') !== -1) {
      names = names.split('|');
    } else {
      names = [names];
    }

    for (var i = 0, cnt = names.length; i < cnt; i++) {
      var name = names[i];

      if (name == null || name === 'wait') {
        // Wait event
        WaitCallback(tagPlayer, undefined, callback, args, scope);
      } else if (typeof name === 'number' || !isNaN(name)) {
        // A number, or a number string
        WaitTime(tagPlayer, parseFloat(name), callback, args, scope);
      } else if (name === 'click') {
        // 'click'
        WaitClick(tagPlayer, callback, args, scope);
      } else if (name === 'se') {
        var music = tagPlayer.soundManager.getLastSoundEffect();
        WaitMusic(tagPlayer, music, callback, args, scope);
      } else if (name === 'bgm') {
        var music = tagPlayer.soundManager.getBackgroundMusic();
        WaitMusic(tagPlayer, music, callback, args, scope);
      } else if (KeyCodes.hasOwnProperty(name.toUpperCase())) {
        WaitKeyDown(tagPlayer, name, callback, args, scope);
      } else if (IsWaitCameraEffect(name)) {
        WaitCameraEffect(tagPlayer, name, callback, args, scope);
      } else if (IsWaitSprite(name)) {
        WaitSprite(tagPlayer, name, callback, args, scope);
      } else {
        WaitCallback(tagPlayer, name, callback, args, scope);
      }
    }
  };

  var Wait = function Wait(name) {
    // Already in typingPaused state, or ignore any wait
    if (this.ignoreWait) {
      return this;
    }

    this.pause();
    WaitMultiple(this, name, this.resume, [], this);
    return this;
  };

  var Methods = {
    setClickTarget: SetClickTarget,
    setTargetCamera: SetTargetCamera,
    setSkipSoundEffect: SetSkipSoundEffect,
    play: Play,
    playPromise: PlayPromise,
    pause: Pause,
    resume: Resume,
    wait: Wait
  };

  var ClearEvents = function ClearEvents(tagPlayer) {
    for (var i = 0, cnt = ClearEvents$1.length; i < cnt; i++) {
      tagPlayer.emit(ClearEvents$1[i]);
    }
  };

  var EventEmitter = Phaser.Events.EventEmitter;
  var GetValue = Phaser.Utils.Objects.GetValue;

  var TagPlayer = /*#__PURE__*/function (_EventEmitter) {
    _inherits(TagPlayer, _EventEmitter);

    var _super = _createSuper(TagPlayer);

    function TagPlayer(scene, config) {
      var _this;

      _classCallCheck(this, TagPlayer);

      _this = _super.call(this);
      _this.scene = scene;
      _this.parser = new Parser$1(_assertThisInitialized(_this), GetValue(config, 'parser', undefined));
      _this.timeline = new Timeline(_assertThisInitialized(_this));
      _this._soundManager = undefined;
      var soundManagerConfig = GetValue(config, 'sounds', undefined);

      if (soundManagerConfig) {
        _this._soundManager = new SoundManager(_this.scene, soundManagerConfig);
      }

      _this.setTargetCamera(GetValue(config, 'camera', _this.scene.sys.cameras.main));

      _this._spriteManager = undefined;
      var spriteManagerConfig = GetValue(config, 'sprites', undefined);

      if (spriteManagerConfig) {
        _this._spriteManager = new SpriteManager(_this.scene, spriteManagerConfig);
      }

      _this._textManager = undefined;
      var textManagerConfig = GetValue(config, 'texts', undefined);

      if (textManagerConfig) {
        _this._textManager = new TextManager(_this.scene, textManagerConfig);
      }

      _this.setClickTarget(GetValue(config, 'clickTarget', scene)); // this.clickEE


      return _this;
    }

    _createClass(TagPlayer, [{
      key: "isPlaying",
      get: function get() {
        return this.parser.isRunning;
      }
    }, {
      key: "soundManager",
      get: function get() {
        if (this._soundManager === undefined) {
          this._soundManager = new SoundManager(this.scene);
        }

        return this._soundManager;
      }
    }, {
      key: "spriteManager",
      get: function get() {
        if (this._spriteManager === undefined) {
          this._spriteManager = new SpriteManager(this.scene);
        }

        return this._spriteManager;
      }
    }, {
      key: "textManager",
      get: function get() {
        if (this._textManager === undefined) {
          this._textManager = new TextManager(this.scene);
        }

        return this._textManager;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
          return;
        }

        ClearEvents(this);

        if (this._soundManager) {
          this._soundManager.destroy(fromScene);
        }

        this._soundManager = undefined;
        this.camera = undefined;

        if (this._spriteManager) {
          this._spriteManager.destroy(fromScene);
        }

        this._spriteManager = undefined;
        this.scene = undefined;
      }
    }]);

    return TagPlayer;
  }(EventEmitter);

  Object.assign(TagPlayer.prototype, Methods);

  var TagPlayerPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(TagPlayerPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(TagPlayerPlugin);

    function TagPlayerPlugin(pluginManager) {
      _classCallCheck(this, TagPlayerPlugin);

      return _super.call(this, pluginManager);
    }

    _createClass(TagPlayerPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(scene, config) {
        return new TagPlayer(scene, config);
      }
    }]);

    return TagPlayerPlugin;
  }(Phaser.Plugins.BasePlugin);

  return TagPlayerPlugin;

}));
