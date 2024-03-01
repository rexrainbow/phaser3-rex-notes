(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexfiledropzone = factory());
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

  var SyncTo = function SyncTo(gameObject) {
    this.setOrigin(gameObject.originX, gameObject.originY);
    this.setPosition(gameObject.x, gameObject.y);
    this.resize(gameObject.displayWidth, gameObject.displayHeight);
    return this;
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

  var DropEnableMethods = {
    setDropEnable: function setDropEnable(enable) {
      if (enable === undefined) {
        enable = true;
      }
      this.dropEnable = enable;
      return this;
    },
    toggleDropEnable: function toggleDropEnable() {
      this.dropEnable = !this.dropEnable;
      return this;
    }
  };

  var FilterMethods = {
    addFilter: function addFilter(name, callback) {
      if (!this.filters) {
        this.filters = {};
      }
      this.filters[name] = callback;
      return this;
    },
    addFilters: function addFilters(filters) {
      if (!this.filters) {
        this.filters = {};
      }
      for (var name in filters) {
        this.filters[name] = filters[name];
      }
      return this;
    }
  };

  var Methods = {
    resize: Resize,
    syncTo: SyncTo
  };
  Object.assign(Methods, DropEnableMethods, FilterMethods, LoadFileMethods);

  var DragDropEvents = {
    dragenter: 'dragenter',
    dragleave: 'dragleave',
    dragover: 'dragover',
    drop: 'drop'
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var RouteEvents = function RouteEvents(gameObject, element, elementEvents, config) {
    var preventDefault = GetValue$1(config, 'preventDefault', false);
    var preTest = GetValue$1(config, 'preTest');
    var _loop = function _loop(elementEventName) {
      // Note: Don't use `var` here
      element.addEventListener(elementEventName, function (e) {
        if (!preTest || preTest(gameObject, elementEventName)) {
          gameObject.emit(elementEvents[elementEventName], gameObject, e);
        }
        if (preventDefault) {
          e.preventDefault();
        }
      });
    };
    for (var elementEventName in elementEvents) {
      _loop(elementEventName);
    }
  };

  var DOMElement = Phaser.GameObjects.DOMElement;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var FileDropZone = /*#__PURE__*/function (_DOMElement) {
    _inherits(FileDropZone, _DOMElement);
    function FileDropZone(scene, x, y, width, height, config) {
      var _this;
      _classCallCheck(this, FileDropZone);
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
      var element = document.createElement('div');
      var style = GetValue(config, 'style', undefined);
      _this = _callSuper(this, FileDropZone, [scene, x, y, element, style]);
      _this.type = 'rexFileDropZone';
      _this.resize(width, height);
      _this._files = [];
      _this.setDropEnable(GetValue(config, 'dropEnable', true));
      var filters = GetValue(config, 'filters');
      if (filters) {
        _this.addFilters(filters);
      }

      // Apply events
      RouteEvents(_assertThisInitialized(_this), element, DragDropEvents, {
        preventDefault: true,
        preTest: function preTest(gameObject) {
          return gameObject.dropEnable;
        }
      });
      _this.on('drop', function (gameObject, e) {
        this._files = e.dataTransfer.files;
        var files = this._files;
        if (files && this.filters) {
          for (var filterType in this.filters) {
            var filterCallback = this.filters[filterType];
            var filteredFiles = [];
            for (var i = 0, cnt = files.length; i < cnt; i++) {
              var file = files[i];
              if (filterCallback(file, files)) {
                filteredFiles.push(file);
              }
            }
            if (filteredFiles.length > 0) {
              this.emit("drop.".concat(filterType), filteredFiles);
            }
          }
        }
      }, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(FileDropZone, [{
      key: "files",
      get: function get() {
        return this._files;
      }
    }]);
    return FileDropZone;
  }(DOMElement);
  Object.assign(FileDropZone.prototype, Methods);

  return FileDropZone;

}));
