(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexyoutubeplayerplugin = factory());
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

  var Resize = function Resize(width, height) {
    if (this.scene.sys.scale.autoRound) {
      width = Math.floor(width);
      height = Math.floor(height);
    }
    if (this.width === width && this.height === height) {
      return this;
    }
    var style = this.node.style;
    style.width = "".concat(width, "px");
    style.height = "".concat(height, "px");
    this.updateSize();
    return this;
  };

  var LoadScript = function LoadScript(url, onload) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0, cnt = scripts.length; i < cnt; i++) {
      if (scripts[i].src.indexOf(url) != -1) {
        if (onload) {
          onload();
        }
        return;
      }
    }
    var newScriptTag = document.createElement('script');
    newScriptTag.setAttribute('src', url);
    if (onload) {
      newScriptTag.onload = onload;
    }
    document.head.appendChild(newScriptTag);
  };

  var IsAPIReady = false;
  var LoadAPI = function LoadAPI(onLoaded) {
    if (IsAPIReady) {
      onLoaded();
    } else {
      if (!window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = function () {
          IsAPIReady = true;
          for (var i = 0, cnt = CallbackQueue.length; i < cnt; i++) {
            CallbackQueue[i]();
          }
          CallbackQueue = undefined;
        };
        LoadScript('https://www.youtube.com/iframe_api');
        // Function onYouTubeIframeAPIReady() should be defined before loading 
      }
      CallbackQueue.push(onLoaded);
    }
  };
  var CallbackQueue = [];

  var DOMElement = Phaser.GameObjects.DOMElement;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var Clamp = Phaser.Math.Clamp;
  var UUID = Phaser.Utils.String.UUID;
  var YoutubePlayer = /*#__PURE__*/function (_DOMElement) {
    _inherits(YoutubePlayer, _DOMElement);
    function YoutubePlayer(scene, x, y, width, height, config) {
      var _this;
      _classCallCheck(this, YoutubePlayer);
      if (IsPlainObject(x)) {
        config = x;
        x = GetValue(config, 'x', 0);
        y = GetValue(config, 'y', 0);
        width = GetValue(config, 'width', 0);
        height = GetValue(config, 'height', 0);
      } else if (IsPlainObject(width)) {
        config = width;
        width = GetValue(config, 'width', 0);
        height = GetValue(config, 'height', 0);
      }
      if (config === undefined) {
        config = {};
      }
      _this = _callSuper(this, YoutubePlayer, [scene, x, y]);
      _this.type = 'rexYoutubePlayer';
      _this.youtubePlayer = undefined;
      _this.videoState = undefined;
      _this.videoId = GetValue(config, 'videoId', '');
      _this.loop = GetValue(config, 'loop', false);
      _this.paddingCallbacks = [];

      // Create DIV element and add it
      var elementId = "YT".concat(UUID());
      var element = document.createElement('div');
      element.id = elementId;
      _this.setElement(element);
      _this.resize(width, height);

      // Create youtube player iframe when API ready
      var playerVars = {
        autoplay: GetValue(config, 'autoPlay', true) ? 1 : 0,
        controls: GetValue(config, 'controls', true) ? 1 : 0,
        disablekb: !GetValue(config, 'keyboardControl', true) ? 1 : 0,
        modestbranding: GetValue(config, 'modestBranding', false) ? 1 : 0
      };
      var onLoad = function () {
        var youtubePlayer = new YT.Player(elementId, {
          'videoId': this.videoId,
          'playerVars': playerVars,
          'events': {
            'onStateChange': function (event) {
              this.videoState = event.data;
              this.emit('statechange', this);
              this.emit(this.videoStateString, this);
              if (this.videoState === YT.PlayerState.ENDED && this.loop) {
                this.youtubePlayer.playVideo();
              }
            }.bind(this),
            'onReady': function (event) {
              this.youtubePlayer = youtubePlayer;
              for (var i = 0, cnt = this.paddingCallbacks.length; i < cnt; i++) {
                this.paddingCallbacks[i]();
              }
              this.paddingCallbacks = undefined;
              this.emit('ready', this);
            }.bind(this),
            'onError': function (event) {
              this.lastError = event.data;
              this.emit('error', this, this.lastError);
            }.bind(this)
          }
        });
        this.setElement(document.getElementById(elementId)); // Also remove previous DIV element
      }.bind(_assertThisInitialized(_this));
      LoadAPI(onLoad);
      return _this;
    }
    _createClass(YoutubePlayer, [{
      key: "_runCallback",
      value: function _runCallback(callback) {
        if (this.youtubePlayer === undefined) {
          this.paddingCallbacks.push(callback);
        } else {
          callback();
        }
      }
    }, {
      key: "videoStateString",
      get: function get() {
        if (this.videoState === undefined || !YT) {
          return '';
        } else {
          switch (this.videoState) {
            case -1:
              return "unstarted";
            case YT.PlayerState.ENDED:
              return "ended";
            case YT.PlayerState.PLAYING:
              return "playing";
            case YT.PlayerState.PAUSED:
              return "pause";
            case YT.PlayerState.BUFFERING:
              return "buffering";
            case YT.PlayerState.CUED:
              return "cued";
          }
        }
      }
    }, {
      key: "load",
      value: function load(videoId, autoPlay) {
        if (autoPlay === undefined) {
          autoPlay = true;
        }
        var callback = function () {
          this.youtubePlayer.loadVideoById(videoId);
          if (autoPlay) {
            this.youtubePlayer.playVideo();
          } else {
            this.youtubePlayer.pauseVideo();
          }
        }.bind(this);
        this._runCallback(callback);
        return this;
      }
    }, {
      key: "play",
      value: function play() {
        var callback = function () {
          this.youtubePlayer.playVideo();
        }.bind(this);
        this._runCallback(callback);
        return this;
      }
    }, {
      key: "isPlaying",
      get: function get() {
        return this.videoState === 1; // YT.PlayerState.PLAYING
      }
    }, {
      key: "pause",
      value: function pause() {
        var callback = function () {
          this.youtubePlayer.pauseVideo();
        }.bind(this);
        this._runCallback(callback);
        return this;
      }
    }, {
      key: "isPaused",
      get: function get() {
        return this.videoState === 2; // YT.PlayerState.PAUSED
      }
    }, {
      key: "playbackTime",
      get: function get() {
        return this.youtubePlayer ? this.youtubePlayer.getCurrentTime() : 0;
      },
      set: function set(value) {
        var callback = function () {
          this.youtubePlayer.seekTo(value);
        }.bind(this);
        this._runCallback(callback);
      }
    }, {
      key: "setPlaybackTime",
      value: function setPlaybackTime(time) {
        this.playbackTime = time;
        return this;
      }
    }, {
      key: "duration",
      get: function get() {
        return this.youtubePlayer ? this.youtubePlayer.getDuration() : 0;
      }
    }, {
      key: "t",
      get: function get() {
        var duration = this.duration;
        return duration === 0 ? 0 : this.playbackTime / duration;
      },
      set: function set(value) {
        var callback = function () {
          value = Clamp(value, 0, 1);
          this.playbackTime = this.duration * Clamp(value, 0, 1);
        }.bind(this);
        this._runCallback(callback);
      }
    }, {
      key: "setT",
      value: function setT(value) {
        this.t = value;
        return this;
      }
    }, {
      key: "hasEnded",
      get: function get() {
        return this.videoState === 0; // YT.PlayerState.ENDED
      }
    }, {
      key: "volume",
      get: function get() {
        return this.youtubePlayer ? this.youtubePlayer.getVolume() / 100 : 0;
      },
      set: function set(value) {
        var callback = function () {
          this.youtubePlayer.setVolume(Clamp(value * 100, 0, 100));
        }.bind(this);
        this._runCallback(callback);
      }
    }, {
      key: "setVolume",
      value: function setVolume(value) {
        this.volume = value;
        return this;
      }
    }, {
      key: "muted",
      get: function get() {
        return this.youtubePlayer ? this.youtubePlayer.isMuted() : false;
      },
      set: function set(value) {
        var callback = function () {
          if (value) {
            this.youtubePlayer.mute();
          } else {
            this.youtubePlayer.unMute();
          }
        }.bind(this);
        this._runCallback(callback);
      }
    }, {
      key: "setMute",
      value: function setMute(value) {
        if (value === undefined) {
          value = true;
        }
        this.muted = value;
        return this;
      }
    }, {
      key: "setLoop",
      value: function setLoop(value) {
        if (value === undefined) {
          value = true;
        }
        this.loop = value;
        return this;
      }
    }]);
    return YoutubePlayer;
  }(DOMElement);
  var methods = {
    resize: Resize
  };
  Object.assign(YoutubePlayer.prototype, methods);

  function Factory (x, y, width, height, config) {
    var gameObject = new YoutubePlayer(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
  }

  var GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
  var BuildGameObject = Phaser.GameObjects.BuildGameObject;
  function Creator (config, addToScene) {
    if (config === undefined) {
      config = {};
    }
    if (addToScene !== undefined) {
      config.add = addToScene;
    }
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    var gameObject = new YoutubePlayer(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
  }

  var IsInValidKey = function IsInValidKey(keys) {
    return keys == null || keys === '' || keys.length === 0;
  };
  var GetEntry = function GetEntry(target, keys, defaultEntry) {
    var entry = target;
    if (IsInValidKey(keys)) ; else {
      if (typeof keys === 'string') {
        keys = keys.split('.');
      }
      var key;
      for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];
        if (entry[key] == null || _typeof(entry[key]) !== 'object') {
          var newEntry;
          if (i === cnt - 1) {
            if (defaultEntry === undefined) {
              newEntry = {};
            } else {
              newEntry = defaultEntry;
            }
          } else {
            newEntry = {};
          }
          entry[key] = newEntry;
        }
        entry = entry[key];
      }
    }
    return entry;
  };
  var SetValue = function SetValue(target, keys, value, delimiter) {
    if (delimiter === undefined) {
      delimiter = '.';
    }

    // no object
    if (_typeof(target) !== 'object') {
      return;
    }

    // invalid key
    else if (IsInValidKey(keys)) {
      // don't erase target
      if (value == null) {
        return;
      }
      // set target to another object
      else if (_typeof(value) === 'object') {
        target = value;
      }
    } else {
      if (typeof keys === 'string') {
        keys = keys.split(delimiter);
      }
      var lastKey = keys.pop();
      var entry = GetEntry(target, keys);
      entry[lastKey] = value;
    }
    return target;
  };

  var YoutubePlayerPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(YoutubePlayerPlugin, _Phaser$Plugins$BaseP);
    function YoutubePlayerPlugin(pluginManager) {
      var _this;
      _classCallCheck(this, YoutubePlayerPlugin);
      _this = _callSuper(this, YoutubePlayerPlugin, [pluginManager]);

      //  Register our new Game Object type
      pluginManager.registerGameObject('rexYoutubePlayer', Factory, Creator);
      return _this;
    }
    _createClass(YoutubePlayerPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return YoutubePlayerPlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.GameObjects.YoutubePlayer', YoutubePlayer);

  return YoutubePlayerPlugin;

}));
