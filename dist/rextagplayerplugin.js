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
  var GetValue$d = function GetValue(source, key, defaultValue) {
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
      this.setEventEmitter(GetValue$d(config, 'eventEmitter', undefined)); // Parameters for regex

      this.setTagExpression(GetValue$d(config, 'regex.tag', DefaultTagExpression));
      this.setValueExpression(GetValue$d(config, 'regex.value', DefaultValueExpression)); // Value convert

      this.setValueConverter(GetValue$d(config, 'valueConvert', true)); // Brackets and generate regex

      var delimiters = GetValue$d(config, 'delimiters', '<>');
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

  var OnParseWaitTag = function OnParseWaitTag(tagPlayer, parser, config) {
    var tagWait = 'wait';
    var tagClick = 'click';
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

  var OnParsePlaySoundEffectTag = function OnParsePlaySoundEffectTag(tagPlayer, parser, config) {
    var tagName = 'se';
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

  var OnParseFadeInSoundEffectTag = function OnParseFadeInSoundEffectTag(tagPlayer, parser, config) {
    var tagName = 'se.fadein';
    parser.on("+".concat(tagName), function (time) {
      tagPlayer.soundManager.fadeInSoundEffect(time);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseFadeOutSoundEffectTag = function OnParseFadeOutSoundEffectTag(tagPlayer, parser, config) {
    var tagName = 'se.fadeout';
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      tagPlayer.soundManager.fadeOutSoundEffect(time, isStopped);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseSetSoundEffectVolumeTag = function OnParseSetSoundEffectVolumeTag(tagPlayer, parser, config) {
    var tagName = 'se.volume';
    parser.on("+".concat(tagName), function (volume) {
      tagPlayer.soundManager.setSoundEffectVolume(volume);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParsePlayBackgroundMusicTag = function OnParsePlayBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = 'bgm';
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

  var OnParseFadeInBackgroundMusicTag = function OnParseFadeInBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = 'bgm.fadein';
    parser.on("+".concat(tagName), function (time) {
      tagPlayer.soundManager.fadeInBackgroundMusic(time);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseFadeOutBackgroundMusicTag = function OnParseFadeOutBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = 'bgm.fadeout';
    parser.on("+".concat(tagName), function (time, isStopped) {
      isStopped = isStopped === 'stop';
      tagPlayer.soundManager.fadeOutBackgroundMusic(time, isStopped);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParseCrossFadeBackgroundMusicTag = function OnParseCrossFadeBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = 'bgm.cross';
    parser.on("+".concat(tagName), function (name, fadeTime) {
      tagPlayer.soundManager.crossFadeBackgroundMusic(name, fadeTime);
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      parser.skipEvent();
    });
  };

  var OnParsePauseBackgroundMusicTag = function OnParsePauseBackgroundMusicTag(tagPlayer, parser, config) {
    var tagName = 'bgm.pause';
    parser.on("+".concat(tagName), function () {
      tagPlayer.soundManager.pauseBackgroundMusic();
      parser.skipEvent();
    }).on("-".concat(tagName), function () {
      tagPlayer.soundManager.resumeBackgroundMusic();
      parser.skipEvent();
    });
  };

  var OnParseFadeInCameraTag = function OnParseFadeInCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.fadein';
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      tagPlayer.camera.fadeIn(duration, red, green, blue);
      parser.skipEvent();
    });
  };

  var OnParseFadeOutCameraTag = function OnParseFadeOutCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.fadeout';
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      tagPlayer.camera.fadeOut(duration, red, green, blue);
      parser.skipEvent();
    });
  };

  var OnParseShakeCameraTag = function OnParseShakeCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.shake';
    parser.on("+".concat(tagName), function (duration, intensity) {
      tagPlayer.camera.shake(duration, intensity);
      parser.skipEvent();
    });
  };

  var OnParseFlashCameraTag = function OnParseFlashCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.flash';
    parser.on("+".concat(tagName), function (duration, red, green, blue) {
      tagPlayer.camera.flash(duration, red, green, blue);
      parser.skipEvent();
    });
  };

  var OnParseZoomCameraTag = function OnParseZoomCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.zoom';
    parser.on("+".concat(tagName), function (value) {
      tagPlayer.camera.setZoom(value);
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (value, duration, ease) {
      tagPlayer.camera.zoomTo(value, duration, ease);
      parser.skipEvent();
    });
  };

  var DegToRad = Phaser.Math.DegToRad;

  var OnParseRotateCameraTag = function OnParseRotateCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.rotate';
    parser.on("+".concat(tagName), function (value) {
      tagPlayer.camera.setRotation(DegToRad(value));
      parser.skipEvent();
    }).on("+".concat(tagName, ".to"), function (value, duration, ease) {
      value = DegToRad(value);
      tagPlayer.camera.rotateTo(DegToRad(value), false, duration, ease);
      parser.skipEvent();
    });
  };

  var OnParseScrollCameraTag = function OnParseScrollCameraTag(tagPlayer, parser, config) {
    var tagName = 'camera.scroll';
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

  var IsAddSpriteTag = function IsAddSpriteTag(tags, prefix) {
    // sprite.name
    return tags.length === 2 && tags[0] === prefix;
  };

  var OnParseAddSpriteTag = function OnParseAddSpriteTag(tagPlayer, parser, config) {
    var prefix = 'sprite';

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

  var OnParseRemoveAllSpritesTag = function OnParseRemoveAllSpritesTag(tagPlayer, parser, config) {
    var prefix = 'sprite';

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

  var IsSetTextureTag = function IsSetTextureTag(tags, prefix) {
    // sprite.name.texture
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'texture';
  };

  var OnParseSetTextureTag = function OnParseSetTextureTag(tagPlayer, parser, config) {
    var prefix = 'sprite';

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

  var IsPlayAnimationTag = function IsPlayAnimationTag(tags, prefix) {
    // sprite.name.play
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'play';
  };

  var IsStopAnimationTag = function IsStopAnimationTag(tags, prefix) {
    // sprite.name.stop
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'stop';
  };

  var OnParsePlayAnimationTag = function OnParsePlayAnimationTag(tagPlayer, parser, config) {
    var prefix = 'sprite';

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

  var IsChainAnimationTag = function IsChainAnimationTag(tags, prefix) {
    // sprite.name.chain 
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'chain';
  };

  var OnParseChainAnimationTag = function OnParseChainAnimationTag(tagPlayer, parser, config) {
    var prefix = 'sprite';

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

  var IsPauseAnimationTag = function IsPauseAnimationTag(tags, prefix) {
    // sprite.name.pause 
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'pause';
  };

  var OnParsePauseAnimationTag = function OnParsePauseAnimationTag(tagPlayer, parser, config) {
    var prefix = 'sprite';

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

  var IsSetPropertyTag$1 = function IsSetPropertyTag(tags, prefix) {
    // sprite.name.prop
    return tags.length === 3 && tags[0] === prefix;
  };

  var OnParseSetSpritePropertyTag = function OnParseSetSpritePropertyTag(tagPlayer, parser, config) {
    var prefix = 'sprite';

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

  var EaseMode$1 = {
    to: true,
    yoyo: true
  };

  var IsEasePropertyTag$1 = function IsEasePropertyTag(tags, prefix) {
    // sprite.name.prop.to, or sprite.name.prop.yoyo
    return tags.length === 4 && tags[0] === prefix && EaseMode$1[tags[3]];
  };

  var OnParseEaseSpritePropertyTag = function OnParseEaseSpritePropertyTag(tagPlayer, parser, config) {
    var prefix = 'sprite';

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

  var IsAddTextTag = function IsAddTextTag(tags, prefix) {
    // text.name
    return tags.length === 2 && tags[0] === prefix;
  };

  var OnParseAddTextTag = function OnParseAddTextTag(tagPlayer, parser, config) {
    var prefix = 'text';

    parser.on('+', function (tag) {
      var _tagPlayer$textManage;

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

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_tagPlayer$textManage = tagPlayer.textManager).add.apply(_tagPlayer$textManage, [name].concat(args));

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

  var OnParseRemoveAllTextsTag = function OnParseRemoveAllTextsTag(tagPlayer, parser, config) {
    var prefix = 'text';

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

  var IsSetTextTag = function IsSetTextTag(tags, prefix) {
    // text.name.text
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'text';
  };

  var OnParseSetTextTag = function OnParseSetTextTag(tagPlayer, parser, config) {
    var prefix = 'text';

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

  var IsTypingTextTag = function IsTypingTextTag(tags, prefix) {
    // text.name.typing
    return tags.length === 3 && tags[0] === prefix && tags[2] === 'typing';
  };

  var OnParseTypingTextTag = function OnParseTypingTextTag(tagPlayer, parser, config) {
    var prefix = 'text';

    parser.on("+", function (tag, speed) {
      if (parser.skipEventFlag) {
        // Has been processed before
        return;
      } // [text.name.typing]


      var tags = tag.split('.');
      var name;

      if (IsTypingTextTag(tags, prefix)) {
        name = tags[1];
      } else {
        return;
      } // Set text in content section


      if (speed !== undefined) {
        tagPlayer.textManager.setTypingSpeed(name, speed);
      }

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

  var IsSetPropertyTag = function IsSetPropertyTag(tags, prefix) {
    // text.name.prop
    return tags.length === 3 && tags[0] === prefix;
  };

  var OnParseSetTextPropertyTag = function OnParseSetTextPropertyTag(tagPlayer, parser, config) {
    var prefix = 'text';

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

  var EaseMode = {
    to: true,
    yoyo: true
  };

  var IsEasePropertyTag = function IsEasePropertyTag(tags, prefix) {
    // text.name.prop.to, or text.name.prop.yoyo
    return tags.length === 4 && tags[0] === prefix && EaseMode[tags[3]];
  };

  var OnParseEaseTextPropertyTag = function OnParseEaseTextPropertyTag(tagPlayer, parser, config) {
    var prefix = 'text';

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

  var GetValue$c = Phaser.Utils.Objects.GetValue;

  var Parser = /*#__PURE__*/function (_BracketParser) {
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

      _this.setCommentLineStartSymbol(GetValue$c(config, 'comment', '//'));

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

  var GetValue$b = Phaser.Utils.Objects.GetValue;

  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);

      this.parent = parent; // gameObject or scene

      this.scene = GetSceneObject(parent);
      this.isShutdown = false; // Event emitter, default is private event emitter

      this.setEventEmitter(GetValue$b(config, 'eventEmitter', true)); // Register callback of parent destroy event, also see `shutdown` method

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

  var GetValue$a = Phaser.Utils.Objects.GetValue;

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

      _this.setTickingMode(GetValue$a(config, 'tickingMode', 1)); // boot() later


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

  var GetValue$9 = Phaser.Utils.Objects.GetValue;

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
        this.isRunning = GetValue$9(o, 'isRunning', false);
        this.timeScale = GetValue$9(o, 'timeScale', 1);
        this.now = GetValue$9(o, 'now', 0);
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

  var GetValue$8 = Phaser.Utils.Objects.GetValue;
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
      _this.timerPool = GetValue$8(config, 'pool', TimerPool);
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

  var GetValue$7 = Phaser.Utils.Objects.GetValue;

  var SceneUpdateTickTask = /*#__PURE__*/function (_TickTask) {
    _inherits(SceneUpdateTickTask, _TickTask);

    var _super = _createSuper(SceneUpdateTickTask);

    function SceneUpdateTickTask(parent, config) {
      var _this;

      _classCallCheck(this, SceneUpdateTickTask);

      _this = _super.call(this, parent, config);
      _this.tickEventName = GetValue$7(config, 'tickEventName', 'update');
      return _this;
    }

    _createClass(SceneUpdateTickTask, [{
      key: "startTicking",
      value: function startTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "startTicking", this).call(this);

        this.scene.sys.events.on(this.tickEventName, this.update, this);
      }
    }, {
      key: "stopTicking",
      value: function stopTicking() {
        _get(_getPrototypeOf(SceneUpdateTickTask.prototype), "stopTicking", this).call(this);

        if (this.scene) {
          // Scene might be destoryed
          this.scene.sys.events.off(this.tickEventName, this.update, this);
        }
      } // update(time, delta) {
      //     
      // }

    }]);

    return SceneUpdateTickTask;
  }(TickTask);

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;

  var Timer = /*#__PURE__*/function () {
    function Timer(config) {
      _classCallCheck(this, Timer);

      this.resetFromJSON(config);
    }

    _createClass(Timer, [{
      key: "resetFromJSON",
      value: function resetFromJSON(o) {
        this.state = GetValue$6(o, 'state', IDLE);
        this.timeScale = GetValue$6(o, 'timeScale', 1);
        this.delay = GetValue$6(o, 'delay', 0);
        this.repeat = GetValue$6(o, 'repeat', 0);
        this.repeatCounter = GetValue$6(o, 'repeatCounter', 0);
        this.duration = GetValue$6(o, 'duration', 0);
        this.nowTime = GetValue$6(o, 'nowTime', 0);
        this.justRestart = GetValue$6(o, 'justRestart', false);
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

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
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
        this.timer.resetFromJSON(GetValue$5(o, 'timer'));
        this.setEnable(GetValue$5(o, 'enable', true));
        this.setTarget(GetValue$5(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue$1(o, 'delay', 0));
        this.setDuration(GetAdvancedValue$1(o, 'duration', 1000));
        this.setEase(GetValue$5(o, 'ease', 'Linear'));
        this.setRepeat(GetValue$5(o, 'repeat', 0));
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

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
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

        this.setMode(GetValue$4(o, 'mode', 0));
        this.setEnable(GetValue$4(o, 'enable', true));
        this.setVolumeRange(GetAdvancedValue(o, 'volume.start', this.parent.volume), GetAdvancedValue(o, 'volume.end', 0));
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

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var RemoveItem$1 = Phaser.Utils.Array.Remove;

  var SoundManager = /*#__PURE__*/function () {
    function SoundManager(scene, config) {
      _classCallCheck(this, SoundManager);

      this.scene = scene; // Sound effect will be destroyed when completed

      this.soundEffects = []; // Background music will be (fade out)destroyed when play next one.

      this.backgroundMusic = undefined;
      this.setBackgroundMusicLoopValue(GetValue$3(config, 'bgm.loop', true));
      this.setBackgroundMusicFadeTime(GetValue$3(config, 'bgm.fade', 500));
      var initialBackgroundMusic = GetValue$3(config, 'bgm.initial', undefined);

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
      this.tweens = {};
      this.setGO(gameObject, name);
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
        this.freeGO();
        this.GOManager = undefined;
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
      key: "freeGO",
      value: function freeGO() {
        this.freeTweens();
        this.gameObject.destroy();
        this.gameObject = undefined;
        return this;
      }
    }, {
      key: "setGO",
      value: function setGO(gameObject, name) {
        this.gameObject = gameObject.setName(name);
        this.name = name;
        this.freeTweens();
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
      var hasTintChange = !!gameObject.setTint && this.fadeTime > 0;
      var hasAlphaChange = !!gameObject.setAlpha && this.fadeTime > 0;

      if (hasTintChange) {
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

      if (hasTintChange) {
        bob.setProperty('tintGray', 0).easeProperty('tintGray', 255, this.fadeTime);
      } else if (hasAlphaChange) {
        bob.setProperty('alpha', 0).easeProperty('alpha', 1, this.fadeTime);
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
      var hasTintChange = !!bob.gameObject.setTint && this.fadeTime > 0;
      var hasAlphaChange = !!gameObject.setAlpha && this.fadeTime > 0;

      if (hasTintChange) {
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
      } else if (hasAlphaChange) {
        bob.easeProperty('alpha', // property
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

  var GetValue$2 = Phaser.Utils.Objects.GetValue;

  var GOManager = /*#__PURE__*/function () {
    function GOManager(scene, config) {
      _classCallCheck(this, GOManager);

      this.scene = scene;
      this.BobClass = GetValue$2(config, 'BobClass', BobBase);
      this.setCreateGameObjectCallback(GetValue$2(config, 'createGameObject'));
      this.setEventEmitter(GetValue$2(config, 'eventEmitter', undefined));
      this.setGOFadeTime(GetValue$2(config, 'fade', 500));
      this.setViewportCoordinateEnable(GetValue$2(config, 'viewportCoordinate', false));
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
        this.createGameObjectCallback = callback;
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
          callback = CreateSprite;
        } else if (callback === 'image') {
          callback = CreateImage;
        }

        _get(_getPrototypeOf(SpriteManager.prototype), "setCreateGameObjectCallback", this).call(this, callback);

        return this;
      }
    }]);

    return SpriteManager;
  }(GOManager);

  var CreateSprite = function CreateSprite(scene, textureKey, frameName) {
    return scene.add.sprite(0, 0, textureKey, frameName);
  };

  var CreateImage = function CreateImage(scene, textureKey, frameName) {
    return scene.add.image(0, 0, textureKey, frameName);
  };

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

  var GetFastValue = Phaser.Utils.Objects.GetFastValue;
  var GetValue$1 = Phaser.Utils.Objects.GetValue;

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
        this.setTextWrapEnable(GetValue$1(o, 'wrap', false));
        this.setTypeMode(GetValue$1(o, 'typeMode', 0));
        this.setTypeSpeed(GetValue$1(o, 'speed', 333));
        this.setTextCallback = GetFastValue(o, 'setTextCallback', null);
        this.setTextCallbackScope = GetFastValue(o, 'setTextCallbackScope', null);
        this.setTypingContent(GetFastValue(o, 'text', ''));
        this.typingIdx = GetFastValue(o, 'typingIdx', 0);
        this.insertIdx = GetFastValue(o, 'insertIdx', null);
        var elapsed = GetFastValue(o, 'elapsed', null);

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

        if (!gameObject.typing) {
          gameObject.typing = new TextTyping(gameObject);
        }

        gameObject.typing.setTypeSpeed(speed);
        return this;
      }
    }, {
      key: "typing",
      value: function typing(text, speed) {
        var gameObject = this.gameObject;

        if (!gameObject.typing) {
          gameObject.typing = new TextTyping(gameObject);
        }

        gameObject.typing.start(text, speed);
        return this;
      }
    }, {
      key: "getTypingTask",
      value: function getTypingTask() {
        var typing = this.gameObject.typing;

        if (typing && typing.isTyping) {
          return typing;
        }

        return null;
      }
    }]);

    return TextBob;
  }(BobBase);

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
    setTypingSpeed: function setTypingSpeed(name, speed) {
      this.get(name).setTypingSpeed(speed);
      return this;
    },
    getTypingTask: function getTypingTask(name) {
      if (this.has(name)) {
        return this.get(name).getTypingTask();
      }

      return null;
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
        if (!callback || callback === 'text') {
          callback = CreateTextObject;
        }

        _get(_getPrototypeOf(TextManager.prototype), "setCreateGameObjectCallback", this).call(this, callback);

        return this;
      }
    }]);

    return TextManager;
  }(GOManager);

  var CreateTextObject = function CreateTextObject(scene) {
    return scene.add.text(0, 0, '');
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

  var IsWaitText = function IsWaitText(name) {
    // text, text.name, text.name.prop, text.name.typing
    var names = name.split('.');
    return names[0] === 'text' && names.length <= 3;
  };

  var WaitText = function WaitText(tagPlayer, tag, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope);
    var tags = tag.split('.');
    var textManager = tagPlayer.textManager;

    switch (tags.length) {
      case 1:
        // text: wait all texts has beeen destroyed
        if (textManager.isEmpty) {
          tagPlayer.emit('wait.text');
          wrapCallback();
        } else {
          // Remove all wait events
          tagPlayer.once(RemoveWaitEvents, function (removeFrom) {
            textManager.off('empty', wrapCallback, tagPlayer);
          });
          textManager.once('empty', wrapCallback, tagPlayer);
          tagPlayer.emit('wait.text');
        }

        break;

      case 2:
        // text.name: wait text.name has been destroyed
        var name = tags[1];

        if (textManager.has(name)) {
          var textData = tagPlayer.textManager.get(name);
          var text = textData.text; // Remove all wait events

          tagPlayer.once(RemoveWaitEvents, function () {
            text.off('destroy', wrapCallback, tagPlayer);
          });
          text.once('destroy', wrapCallback, tagPlayer);
          tagPlayer.emit('wait.text', name);
        } else {
          tagPlayer.emit('wait.text', name);
          wrapCallback();
        }

        break;

      case 3:
        // text.name.prop: wait ease text.name.prop has been completed
        var name = tags[1];
        var prop = tags[2];
        var task;

        switch (prop) {
          case 'typing':
            task = tagPlayer.textManager.getTypingTask(name);
            break;

          default:
            task = tagPlayer.textManager.getTweenTask(name, prop);
            break;
        }

        if (task) {
          // Remove all wait events
          tagPlayer.once(RemoveWaitEvents, function () {
            task.off('complete', wrapCallback, tagPlayer);
          });
          task.once('complete', wrapCallback, tagPlayer);
          tagPlayer.emit('wait.text', name, prop);
        } else {
          tagPlayer.emit('wait.text', name, prop);
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
      } else if (IsWaitText(name)) {
        WaitText(tagPlayer, name, callback, args, scope);
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
      _this.parser = new Parser(_assertThisInitialized(_this), GetValue(config, 'parser', undefined));
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
