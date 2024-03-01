(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexfilechooserplugin = factory());
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

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var CreateFileInput = function CreateFileInput(game, config) {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    var accept = GetValue$2(config, 'accept', '');
    var multiple = GetValue$2(config, 'multiple', false);
    fileInput.setAttribute('accept', accept);
    if (multiple) {
      fileInput.setAttribute('multiple', '');
    } else {
      fileInput.removeAttribute('multiple');
    }
    return fileInput;
  };

  var GameClass = Phaser.Game;
  var IsGame = function IsGame(object) {
    return object instanceof GameClass;
  };

  var SceneClass = Phaser.Scene;
  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
  };

  var GetGame = function GetGame(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsGame(object)) {
      return object;
    } else if (IsGame(object.game)) {
      return object.game;
    } else if (IsSceneObject(object)) {
      // object = scene object
      return object.sys.game;
    } else if (IsSceneObject(object.scene)) {
      // object = game object
      return object.scene.sys.game;
    }
  };

  var WaitEvent = function WaitEvent(eventEmitter, eventName) {
    return new Promise(function (resolve, reject) {
      eventEmitter.once(eventName, function () {
        resolve();
      });
    });
  };

  var Delay = function Delay(time, result) {
    if (time === undefined) {
      time = 0;
    }
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(result);
      }, time);
    });
  };

  var ClickPromise = function ClickPromise(_ref) {
    var game = _ref.game,
      fileInput = _ref.fileInput,
      closeDelay = _ref.closeDelay;
    return WaitEvent(GetGame(game).events, 'focus').then(function () {
      return Delay(closeDelay);
    }).then(function () {
      var result = {
        files: fileInput.files
      };
      return Promise.resolve(result);
    });
  };

  // Note: Not working in iOS9+

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var RemoveFromDOM = Phaser.DOM.RemoveFromDOM;
  var Open = function Open(game, config) {
    // game: game, scene, or game object
    var closeDelay = GetValue$1(config, 'closeDelay', 200);
    var fileInput = CreateFileInput(game, config);
    fileInput.click();
    return ClickPromise({
      game: game,
      fileInput: fileInput,
      closeDelay: closeDelay
    }).then(function (result) {
      RemoveFromDOM(fileInput);
      fileInput.remove();
      return Promise.resolve(result);
    });
  };

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

  var SyncTo = function SyncTo(gameObject) {
    this.setOrigin(gameObject.originX, gameObject.originY);
    this.setPosition(gameObject.x, gameObject.y);
    this.resize(gameObject.displayWidth, gameObject.displayHeight);
    return this;
  };

  var GetCache = function GetCache(game, loaderType, cacheType) {
    if (cacheType === undefined) {
      switch (loaderType) {
        case 'image':
        case 'svg':
          cacheType = 'textures';
          break;
        case 'animation':
          cacheType = 'json';
          break;
        case 'tilemapTiledJSON':
        case 'tilemapCSV':
          cacheType = 'tilemap';
          break;
        case 'glsl':
          cacheType = 'shader';
          break;
        default:
          cacheType = loaderType;
          break;
      }
    }
    game = GetGame(game);
    var cache;
    if (cacheType === 'textures') {
      cache = game.textures;
    } else {
      cache = game.cache[cacheType];
    }
    return cache;
  };

  var IsFunction = function IsFunction(obj) {
    return obj && typeof obj === 'function';
  };

  var FileObjectToCache = function FileObjectToCache(scene, file, loaderType, key, cacheType, onComplete) {
    // Remove data from cache
    if (cacheType === null || cacheType === false) ; else if (IsFunction(cacheType)) {
      cacheType();
    } else {
      var cache = GetCache(scene, loaderType, cacheType);
      if (cache.exists(key)) {
        cache.remove(key);
      }
    }

    // Add filecomplete event
    var loader = scene.load;
    if (onComplete) {
      loader.once("filecomplete-".concat(loaderType, "-").concat(key), function (key, type, data) {
        onComplete(data);
      });
    }

    // Load file from url
    if (IsFunction(file)) {
      file();
    } else {
      var url = window.URL.createObjectURL(file);
      loader[loaderType](key, url);
    }
    loader.start();
  };

  var LoadFile = function LoadFile(file, loaderType, key, cacheType, onComplete) {
    var scene = this.scene;
    FileObjectToCache(scene, file, loaderType, key, cacheType, onComplete);
    return this;
  };
  var LoadFilePromise = function LoadFilePromise(file, loaderType, key, cacheType) {
    var scene = this.scene;
    return new Promise(function (resolve, reject) {
      var onComplete = function onComplete(data) {
        resolve(data);
      };
      FileObjectToCache(scene, file, loaderType, key, cacheType, onComplete);
    });
  };
  var LoadFileMethods = {
    loadFile: LoadFile,
    loadFilePromise: LoadFilePromise
  };

  var DOMElement = Phaser.GameObjects.DOMElement;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var FileChooser = /*#__PURE__*/function (_DOMElement) {
    _inherits(FileChooser, _DOMElement);
    function FileChooser(scene, x, y, width, height, config) {
      var _this;
      _classCallCheck(this, FileChooser);
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

      // Create a hidden file input
      var inputElement = document.createElement('input');
      inputElement.type = 'file';
      var inputStyle = inputElement.style;
      inputStyle.display = 'none';

      // Create a label parent
      var labelElement = document.createElement('label');
      labelElement.appendChild(inputElement);
      var style = GetValue(config, 'style', undefined);
      _this = _callSuper(this, FileChooser, [scene, x, y, labelElement, style]);
      _this.type = 'rexFileChooser';
      _this.resetFromJSON(config);
      _this.resize(width, height);

      // Register events
      var self = _assertThisInitialized(_this);
      inputElement.onchange = function () {
        self.emit('change', self);
      };
      _this.setCloseDelay(GetValue(config, 'closeDelay', 200));
      inputElement.onclick = function () {
        ClickPromise({
          game: scene,
          fileInput: inputElement,
          closeDelay: self.closeDelay
        }).then(function () {
          self.emit('select', self);
        });
      };
      return _this;
    }
    _createClass(FileChooser, [{
      key: "resetFromJSON",
      value: function resetFromJSON(config) {
        this.setAccept(GetValue(config, 'accept', ''));
        this.setMultiple(GetValue(config, 'multiple', false));
        return this;
      }
    }, {
      key: "setAccept",
      value: function setAccept(accept) {
        if (accept === undefined) {
          accept = '';
        }
        this.fileInput.setAttribute('accept', accept);
        return this;
      }
    }, {
      key: "setMultiple",
      value: function setMultiple(enabled) {
        if (enabled === undefined) {
          enabled = true;
        }
        if (enabled) {
          this.fileInput.setAttribute('multiple', '');
        } else {
          this.fileInput.removeAttribute('multiple');
        }
        return this;
      }
    }, {
      key: "setCloseDelay",
      value: function setCloseDelay(delay) {
        if (delay === undefined) {
          delay = 200;
        }
        this.closeDelay = delay;
        return this;
      }
    }, {
      key: "fileInput",
      get: function get() {
        return this.node.children[0];
      }
    }, {
      key: "open",
      value: function open() {
        // Only work under any touch event
        this.fileInput.click();
        return this;
      }
    }, {
      key: "files",
      get: function get() {
        return this.fileInput.files;
      }
    }, {
      key: "setOpenEnable",
      value: function setOpenEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.fileInput.disabled = !enable;
        return this;
      }
    }]);
    return FileChooser;
  }(DOMElement);
  var methods = {
    resize: Resize,
    syncTo: SyncTo
  };
  Object.assign(FileChooser.prototype, methods, LoadFileMethods);

  function Factory (x, y, width, height, config) {
    var gameObject = new FileChooser(this.scene, x, y, width, height, config);
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
    var gameObject = new FileChooser(this.scene, 0, 0, width, height, config);
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

  var FileChooserPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(FileChooserPlugin, _Phaser$Plugins$BaseP);
    function FileChooserPlugin(pluginManager) {
      var _this;
      _classCallCheck(this, FileChooserPlugin);
      _this = _callSuper(this, FileChooserPlugin, [pluginManager]);

      //  Register our new Game Object type
      pluginManager.registerGameObject('rexFileChooser', Factory, Creator);
      return _this;
    }
    _createClass(FileChooserPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }

      // Note: Not working in iOS9+
    }, {
      key: "open",
      value: function open(config) {
        return Open(this.game, config);
      }
    }]);
    return FileChooserPlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.GameObjects.FileChooser', FileChooser);

  return FileChooserPlugin;

}));
