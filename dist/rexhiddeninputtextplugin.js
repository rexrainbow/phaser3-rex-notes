(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexhiddeninputtextplugin = factory());
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
    } else {
      return null;
    }
  };

  var GameClass = Phaser.Game;
  var IsGame = function IsGame(object) {
    return object instanceof GameClass;
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

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$4(config, 'eventEmitter', true));

      // Register callback of parent destroy event, also see `shutdown` method
      if (this.parent) {
        if (this.parent === this.scene) {
          // parent is a scene
          this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);
        } else if (this.parent === this.game) {
          // parent is game
          this.game.events.once('shutdown', this.onEnvDestroy, this);
        } else if (this.parent.once) {
          // parent is game object or something else
          this.parent.once('destroy', this.onParentDestroy, this);
        }

        // bob object does not have event emitter
      }
    }
    _createClass(ComponentBase, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }

        // parent might not be shutdown yet
        if (this.parent) {
          if (this.parent === this.scene) {
            // parent is a scene
            this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);
          } else if (this.parent === this.game) {
            // parent is game
            this.game.events.off('shutdown', this.onEnvDestroy, this);
          } else if (this.parent.once) {
            // parent is game object or something else
            this.parent.off('destroy', this.onParentDestroy, this);
          }

          // bob object does not have event emitter
        }
        this.destroyEventEmitter();
        this.parent = undefined;
        this.scene = undefined;
        this.game = undefined;
        this.isShutdown = true;
      }
    }, {
      key: "destroy",
      value: function destroy(fromScene) {
        this.shutdown(fromScene);
      }
    }, {
      key: "onEnvDestroy",
      value: function onEnvDestroy() {
        this.destroy(true);
      }
    }, {
      key: "onParentDestroy",
      value: function onParentDestroy(parent, fromScene) {
        this.destroy(fromScene);
      }
    }, {
      key: "setParent",
      value: function setParent(parent) {
        this.parent = parent; // gameObject, scene, or game

        this.scene = GetSceneObject(parent);
        this.game = GetGame(parent);
        return this;
      }
    }]);
    return ComponentBase;
  }();
  Object.assign(ComponentBase.prototype, EventEmitterMethods);

  var ElementProperties = {
    maxLength: ['maxLength', undefined],
    minLength: ['minLength', undefined],
    readOnly: ['readOnly', false]
  };
  var StyleProperties = {
    direction: ['direction', undefined]
  };

  var CopyProperty = function CopyProperty(from, to, key) {
    if (typeof key === 'string') {
      if (from.hasOwnProperty(key)) {
        to[key] = from[key];
      }
    } else {
      var keys = key;
      if (Array.isArray(keys)) {
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
          CopyProperty(from, to, keys[i]);
        }
      } else {
        for (var key in keys) {
          CopyProperty(from, to, key);
        }
      }
    }
  };

  var CopyElementConfig = function CopyElementConfig(from) {
    if (from === undefined) {
      from = {};
    }
    var to = {};
    CopyProperty(from, to, 'inputType');
    CopyProperty(from, to, 'type');
    CopyProperty(from, to, 'style');
    CopyProperty(from, to, StyleProperties);
    CopyProperty(from, to, ElementProperties);
    return to;
  };

  var IsPointerInHitArea = function IsPointerInHitArea(gameObject, pointer, preTest, postTest) {
    if (pointer) {
      if (preTest && !preTest(gameObject, pointer)) {
        return false;
      }
      if (!HitTest(gameObject, pointer)) {
        return false;
      }
      if (postTest && !postTest(gameObject, pointer)) {
        return false;
      }
      return true;
    } else {
      var inputManager = gameObject.scene.input.manager;
      var pointersTotal = inputManager.pointersTotal;
      var pointers = inputManager.pointers,
        pointer;
      for (var i = 0; i < pointersTotal; i++) {
        pointer = pointers[i];
        if (preTest && !preTest(gameObject, pointer)) {
          continue;
        }
        if (!HitTest(gameObject, pointer)) {
          continue;
        }
        if (postTest && !postTest(gameObject, pointer)) {
          continue;
        }
        return true;
      }
      return false;
    }
  };
  var HitTest = function HitTest(gameObject, pointer) {
    var scene = gameObject.scene;
    var cameras = scene.input.cameras.getCamerasBelowPointer(pointer);
    var inputManager = scene.input.manager;
    var gameObjects = [gameObject];
    for (var i = 0, len = cameras.length; i < len; i++) {
      inputManager.hitTest(pointer, gameObjects, cameras[i], HitTestResult);
      if (HitTestResult.length > 0) {
        HitTestResult.length = 0;
        return true;
      }
    }
    HitTestResult.length = 0;
    return false;
  };
  var HitTestResult = [];

  var LastOpenedEditor = undefined;
  var SetLastOpenedEditor = function SetLastOpenedEditor(editor) {
    if (editor === LastOpenedEditor) {
      return;
    }
    if (LastOpenedEditor !== undefined) {
      LastOpenedEditor.close();
    }
    LastOpenedEditor = editor;
  };
  var CloseLastOpenEditor = function CloseLastOpenEditor(editor) {
    if (editor !== LastOpenedEditor) {
      return;
    }

    // Don't call `LastOpenedEditor.close()`
    LastOpenedEditor = undefined;
  };

  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var SetProperties = function SetProperties(properties, config, out) {
    if (out === undefined) {
      out = {};
    }
    var property, value;
    for (var key in properties) {
      property = properties[key]; // [propName, defaultValue]
      value = GetValue$3(config, key, property[1]);
      if (value !== undefined) {
        out[property[0]] = value;
      }
    }
    return out;
  };

  var StopPropagationTouchEvents = function StopPropagationTouchEvents(element) {
    // Don't propagate touch/mouse events to parent(game canvas)
    element.addEventListener('touchstart', callback, false);
    element.addEventListener('touchmove', callback, false);
    element.addEventListener('touchend', callback, false);
    element.addEventListener('mousedown', callback, false);
    element.addEventListener('mouseup', callback, false);
    element.addEventListener('mousemove', callback, false);
  };
  var callback = function callback(e) {
    e.stopPropagation();
  };

  var EnterClose = function EnterClose() {
    this.close();
    this.emit('keydown-ENTER', this.parent, this);
    return this;
  };

  var OnOpen = function OnOpen() {
    this.isOpened = true;
    this.initText();
    if (this.enterCloseEnable) {
      this.scene.input.keyboard.once('keydown-ENTER', EnterClose, this);
    }

    // There is no cursor-position-change event, 
    // so updating cursor position every tick
    this.scene.sys.events.on('postupdate', this.updateText, this);
    this.scene.input.on('pointerdown', this.onClickOutside, this);
    if (this.onOpenCallback) {
      this.onOpenCallback(this.parent, this);
    }
    this.emit('open', this);
  };

  var RemoveElement = function RemoveElement(element) {
    if (!element) {
      return;
    }
    var parentElement = element.parentElement;
    if (parentElement) {
      parentElement.removeChild(element);
    }
  };

  var OnClose = function OnClose() {
    this.isOpened = false;
    this.updateText();
    this.scene.sys.events.off('postupdate', this.updateText, this);
    this.scene.input.off('pointerdown', this.onClickOutside, this);
    if (this.onCloseCallback) {
      this.onCloseCallback(this.parent, this);
    }

    // Remove input text element when closing editor
    RemoveElement(this.node);
    this.node = undefined;
    this.emit('close', this);
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var CreateElement = function CreateElement(parent, config) {
    var element;
    var textType = GetValue$2(config, 'inputType', undefined);
    if (textType === undefined) {
      textType = GetValue$2(config, 'type', 'text');
    }
    if (textType === 'textarea') {
      element = document.createElement('textarea');
      element.style.resize = 'none';
    } else {
      element = document.createElement('input');
      element.type = textType;
    }
    var style = GetValue$2(config, 'style', undefined);
    // Apply other style properties
    var elementStyle = element.style;
    SetProperties(StyleProperties, style, elementStyle);
    // Set style
    elementStyle.position = 'absolute';
    elementStyle.opacity = 0;
    elementStyle.pointerEvents = 'none';
    elementStyle.zIndex = 0;
    // hide native blue text cursor on iOS
    elementStyle.transform = 'scale(0)';
    SetProperties(ElementProperties, config, element);

    // Don't propagate touch/mouse events to parent(game canvas)
    StopPropagationTouchEvents(element);

    // Attach element to fullscreenTarget in full screen mode
    var scaleManager = parent.scene.sys.scale;
    var parentElement = scaleManager.isFullscreen ? scaleManager.fullscreenTarget : document.body;
    parentElement.appendChild(element);

    // open() -> 'focus' -> OnOpen
    element.addEventListener('focus', function (e) {
      OnOpen.call(parent);
    });

    // close() -> 'blur' -> OnClose
    element.addEventListener('blur', function (e) {
      OnClose.call(parent);
    });
    return element;
  };

  var Open = function Open() {
    // Already opened
    if (this.isOpened) {
      return this;
    }
    // Read only
    if (this.readOnly) {
      return this;
    }
    SetLastOpenedEditor(this);
    if (!this.node) {
      // Create input text element when opening editor
      this.node = CreateElement(this, this.nodeConfig);
      // Register 'focus', 'blur' events
    }
    this.setFocus();

    // 'focus' event -> OnOpen

    return this;
  };

  var Close = function Close() {
    // Already closed
    if (!this.isOpened) {
      return this;
    }
    CloseLastOpenEditor(this);
    this.setBlur();

    // 'blur' event -> OnOpen

    return this;
  };

  var Methods = {
    open: Open,
    close: Close
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var HiddenTextEditBase = /*#__PURE__*/function (_ComponentBase) {
    _inherits(HiddenTextEditBase, _ComponentBase);
    function HiddenTextEditBase(gameObject, config) {
      var _this;
      _classCallCheck(this, HiddenTextEditBase);
      _this = _callSuper(this, HiddenTextEditBase, [gameObject]);
      // this.parent = gameObject;

      var textType = GetValue$1(config, 'inputType', undefined);
      if (textType === undefined) {
        textType = GetValue$1(config, 'type', 'text');
      }
      _this.setEnterCloseEnable(GetValue$1(config, 'enterClose', textType !== 'textarea'));
      var onOpen = GetValue$1(config, 'onOpen', undefined);
      if (!onOpen) {
        onOpen = GetValue$1(config, 'onFocus', undefined);
      }
      _this.onOpenCallback = onOpen;
      var onClose = GetValue$1(config, 'onClose', undefined);
      if (!onClose) {
        onClose = GetValue$1(config, 'onBlur', undefined);
      }
      _this.onCloseCallback = onClose;
      _this.onUpdateCallback = GetValue$1(config, 'onUpdate', undefined);
      _this.isOpened = false;
      gameObject.on('pointerdown', function () {
        this.open();
      }, _assertThisInitialized(_this)).setInteractive();
      _this.nodeConfig = CopyElementConfig(config);
      // Create/remove input text element when opening/closing editor
      _this.node = undefined;
      return _this;
    }
    _createClass(HiddenTextEditBase, [{
      key: "destroy",
      value: function destroy() {
        // this.parent.off('pointerdown', this.open, this);

        this.close();
        _get(_getPrototypeOf(HiddenTextEditBase.prototype), "destroy", this).call(this);
      }
    }, {
      key: "onClickOutside",
      value: function onClickOutside(pointer) {
        if (!IsPointerInHitArea(this.parent, pointer)) {
          this.close();
        }
      }
    }, {
      key: "setEnterCloseEnable",
      value: function setEnterCloseEnable(enable) {
        if (enable === undefined) {
          enable = true;
        }
        this.enterCloseEnable = enable;
        return this;
      }

      // Override
    }, {
      key: "initText",
      value: function initText() {}

      // Override, invoking under 'postupdate' event of scene
    }, {
      key: "updateText",
      value: function updateText() {}

      // Copy from InputText class
    }, {
      key: "text",
      get: function get() {
        if (!this.node) {
          return '';
        }
        return this.node.value;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.value = value;
      }
    }, {
      key: "setText",
      value: function setText(value) {
        // Override
        this.text = value;
        return this;
      }
    }, {
      key: "maxLength",
      get: function get() {
        return this.nodeConfig.maxLength;
      },
      set: function set(value) {
        this.nodeConfig.maxLength = value;
        if (this.node) {
          this.node.maxLength = value;
        }
      }
    }, {
      key: "setMaxLength",
      value: function setMaxLength(value) {
        this.maxLength = value;
        return this;
      }
    }, {
      key: "minLength",
      get: function get() {
        return this.nodeConfig.minLength;
      },
      set: function set(value) {
        this.nodeConfig.minLength = value;
        if (this.node) {
          this.node.minLength = value;
        }
      }
    }, {
      key: "setMinLength",
      value: function setMinLength(value) {
        this.minLength = value;
        return this;
      }
    }, {
      key: "placeholder",
      get: function get() {
        return this.node.placeholder;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.placeholder = value;
      }
    }, {
      key: "setPlaceholder",
      value: function setPlaceholder(value) {
        this.placeholder = value;
        return this;
      }
    }, {
      key: "selectText",
      value: function selectText(selectionStart, selectionEnd) {
        if (!this.node) {
          return this;
        }
        if (selectionStart === undefined) {
          this.node.select();
        } else {
          this.node.setSelectionRange(selectionStart, selectionEnd);
        }
        return this;
      }
    }, {
      key: "selectAll",
      value: function selectAll() {
        this.selectText();
        return this;
      }
    }, {
      key: "selectionStart",
      get: function get() {
        if (!this.node) {
          return 0;
        }
        return this.node.selectionStart;
      }
    }, {
      key: "selectionEnd",
      get: function get() {
        if (!this.node) {
          return 0;
        }
        return this.node.selectionEnd;
      }
    }, {
      key: "selectedText",
      get: function get() {
        if (!this.node) {
          return '';
        }
        var node = this.node;
        return node.value.substring(node.selectionStart, node.selectionEnd);
      }
    }, {
      key: "cursorPosition",
      get: function get() {
        if (!this.node) {
          return 0;
        }
        return this.node.selectionStart;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.setSelectionRange(value, value);
      }
    }, {
      key: "setCursorPosition",
      value: function setCursorPosition(value) {
        if (value === undefined) {
          value = this.text.length;
        } else if (value < 0) {
          value = this.text.length + value;
        }
        this.cursorPosition = value;
        return this;
      }
    }, {
      key: "tooltip",
      get: function get() {
        if (!this.node) {
          return '';
        }
        return this.node.title;
      },
      set: function set(value) {
        if (!this.node) {
          return this;
        }
        this.node.title = value;
      }
    }, {
      key: "setTooltip",
      value: function setTooltip(value) {
        this.tooltip = value;
        return this;
      }
    }, {
      key: "setTextChangedCallback",
      value: function setTextChangedCallback(callback) {
        this.onTextChanged = callback;
        return this;
      }
    }, {
      key: "readOnly",
      get: function get() {
        return this.nodeConfig.readOnly;
      },
      set: function set(value) {
        this.nodeConfig.readOnly = value;
        if (this.node) {
          this.node.readOnly = value;
        }
      }
    }, {
      key: "setReadOnly",
      value: function setReadOnly(value) {
        if (value === undefined) {
          value = true;
        }
        this.readOnly = value;
        return this;
      }
    }, {
      key: "spellCheck",
      get: function get() {
        if (!this.node) {
          return '';
        }
        return this.node.spellcheck;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.spellcheck = value;
      }
    }, {
      key: "setSpellCheck",
      value: function setSpellCheck(value) {
        this.spellCheck = value;
        return this;
      }
    }, {
      key: "fontColor",
      get: function get() {
        if (!this.node) {
          return undefined;
        }
        return this.node.style.color;
      },
      set: function set(value) {
        if (!this.node) {
          return;
        }
        this.node.style.color = value;
      }
    }, {
      key: "setFontColor",
      value: function setFontColor(value) {
        this.fontColor = value;
        return this;
      }
    }, {
      key: "setStyle",
      value: function setStyle(key, value) {
        if (!this.node) {
          return this;
        }
        this.node.style[key] = value;
        return this;
      }
    }, {
      key: "getStyle",
      value: function getStyle(key) {
        if (!this.node) {
          return undefined;
        }
        return this.node.style[key];
      }
    }, {
      key: "scrollToBottom",
      value: function scrollToBottom() {
        if (!this.node) {
          return this;
        }
        this.node.scrollTop = this.node.scrollHeight;
        return this;
      }
    }, {
      key: "setEnabled",
      value: function setEnabled(enabled) {
        if (!this.node) {
          return this;
        }
        if (enabled === undefined) {
          enabled = true;
        }
        this.node.disabled = !enabled;
        return this;
      }
    }, {
      key: "setBlur",
      value: function setBlur() {
        if (!this.node) {
          return this;
        }
        this.node.blur();
        return this;
      }
    }, {
      key: "setFocus",
      value: function setFocus() {
        if (!this.node) {
          return this;
        }
        this.node.focus();
        return this;
      }
    }, {
      key: "isFocused",
      get: function get() {
        return this.isOpened;
      }
    }]);
    return HiddenTextEditBase;
  }(ComponentBase);
  Object.assign(HiddenTextEditBase.prototype, Methods);

  var NumberInputUpdateCallback = function NumberInputUpdateCallback(text, textObject, hiddenInputText) {
    text = text.replace(' ', '');
    var previousText = hiddenInputText.previousText;
    if (text === previousText) {
      return text;
    }
    if (isNaN(text)) {
      // Enter a NaN character, back to previous text
      hiddenInputText.emit('nan', text, hiddenInputText);
      text = previousText;
      var cursorPosition = hiddenInputText.cursorPosition - 1;
      hiddenInputText.setText(text);
      hiddenInputText.setCursorPosition(cursorPosition);
    } else {
      // New number text, update previous texr
      hiddenInputText.previousText = text;
    }
    return text;
  };

  var GetTickDelta = function GetTickDelta(game) {
    return GetGame(game).loop.delta;
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var Wrap = Phaser.Math.Wrap;
  var HiddenTextEdit = /*#__PURE__*/function (_HiddenTextEditBase) {
    _inherits(HiddenTextEdit, _HiddenTextEditBase);
    function HiddenTextEdit(gameObject, config) {
      var _this;
      _classCallCheck(this, HiddenTextEdit);
      if (config === undefined) {
        config = {};
      }
      if (config.onUpdate === 'number') {
        config.onUpdate = NumberInputUpdateCallback;
      }
      _this = _callSuper(this, HiddenTextEdit, [gameObject, config]);
      // this.parent = gameObject;

      _this.setCursor(GetValue(config, 'cursor', '|'));
      _this.setCursorFlashDuration(GetValue(config, 'cursorFlashDuration', 1000));
      _this.cursorFlashTimer = 0;
      return _this;
    }
    _createClass(HiddenTextEdit, [{
      key: "initText",
      value: function initText() {
        this.cursorFlashTimer = 0;
        this.prevCursorPosition = undefined;
        this.setText(this.parent.text);
        this.setCursorPosition();
        return this;
      }
    }, {
      key: "updateText",
      value: function updateText() {
        var textObject = this.parent;
        var text = this.text;
        if (this.onUpdateCallback) {
          var newText = this.onUpdateCallback(text, textObject, this);
          if (newText != null) {
            text = newText;
          }
        }
        if (this.isOpened && this.hasCursor) {
          // Insert Cursor
          var cursorPosition = this.cursorPosition;
          text = text.substring(0, cursorPosition) + this.cursor + text.substring(cursorPosition);
          if (this.prevCursorPosition !== cursorPosition) {
            // console.log(cursorPosition);
            this.prevCursorPosition = cursorPosition;
          }
        }
        if (textObject.text !== text) {
          textObject.setText(text);
          this.emit('textchange', text, textObject, this);
        }
        return this;
      }
    }, {
      key: "setCursor",
      value: function setCursor(s) {
        this._cursor = s;
        this.hasCursor = s && s !== '';
        return s;
      }
    }, {
      key: "setCursorFlashDuration",
      value: function setCursorFlashDuration(duration) {
        this.cursorFlashDuration = duration;
        return this;
      }
    }, {
      key: "cursor",
      get: function get() {
        if (!this._isFocused) {
          return this._cursor;
        }

        // Flash Cursor
        var cursor;
        if (this.cursorFlashTimer < this.cursorFlashDuration / 2) {
          cursor = this._cursor;
        } else {
          cursor = ' ';
        }
        var timerValue = this.cursorFlashTimer + GetTickDelta(this.scene);
        this.cursorFlashTimer = Wrap(timerValue, 0, this.cursorFlashDuration);
        return cursor;
      }
    }]);
    return HiddenTextEdit;
  }(HiddenTextEditBase);

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

  var HiddenInputTextPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(HiddenInputTextPlugin, _Phaser$Plugins$BaseP);
    function HiddenInputTextPlugin(pluginManager) {
      _classCallCheck(this, HiddenInputTextPlugin);
      return _callSuper(this, HiddenInputTextPlugin, [pluginManager]);
    }
    _createClass(HiddenInputTextPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(textObject, config) {
        return new HiddenTextEdit(textObject, config);
      }
    }]);
    return HiddenInputTextPlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.GameObjects.HiddenInputText', HiddenTextEdit);

  return HiddenInputTextPlugin;

}));
