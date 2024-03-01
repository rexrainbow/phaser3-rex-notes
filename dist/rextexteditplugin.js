(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextexteditplugin = factory());
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

  var GetValue$6 = Phaser.Utils.Objects.GetValue;
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);
      this.setParent(parent); // gameObject, scene, or game

      this.isShutdown = false;

      // Event emitter, default is private event emitter
      this.setEventEmitter(GetValue$6(config, 'eventEmitter', true));

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

  var IsFunction = function IsFunction(obj) {
    return obj && typeof obj === 'function';
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

  var ElementProperties = {
    id: ['id', undefined],
    text: ['value', undefined],
    maxLength: ['maxLength', undefined],
    minLength: ['minLength', undefined],
    placeholder: ['placeholder', undefined],
    tooltip: ['title', undefined],
    readOnly: ['readOnly', false],
    spellCheck: ['spellcheck', false],
    autoComplete: ['autocomplete', 'off']
  };
  var StyleProperties = {
    align: ['textAlign', undefined],
    paddingLeft: ['padding-left', undefined],
    paddingRight: ['padding-right', undefined],
    paddingTop: ['padding-top', undefined],
    paddingBottom: ['padding-bottom', undefined],
    fontFamily: ['fontFamily', undefined],
    fontSize: ['font-size', undefined],
    color: ['color', '#ffffff'],
    backgroundColor: ['backgroundColor', 'transparent'],
    border: ['border', 0],
    borderColor: ['borderColor', 'transparent'],
    outline: ['outline', 'none'],
    direction: ['direction', undefined]
  };
  var ElementEvents = {
    input: 'textchange',
    click: 'click',
    dblclick: 'dblclick',
    mousedown: 'pointerdown',
    mousemove: 'pointermove',
    mouseup: 'pointerup',
    touchstart: 'pointerdown',
    touchmove: 'pointermove',
    touchend: 'pointerup',
    keydown: 'keydown',
    keyup: 'keyup',
    keypress: 'keypress',
    compositionstart: 'compositionStart',
    compositionend: 'compositionEnd',
    compositionupdate: 'compositionUpdate',
    focus: 'focus',
    blur: 'blur',
    select: 'select'
  };

  var GetValue$5 = Phaser.Utils.Objects.GetValue;
  var SetProperties = function SetProperties(properties, config, out) {
    if (out === undefined) {
      out = {};
    }
    var property, value;
    for (var key in properties) {
      property = properties[key]; // [propName, defaultValue]
      value = GetValue$5(config, key, property[1]);
      if (value !== undefined) {
        out[property[0]] = value;
      }
    }
    return out;
  };

  var GetValue$4 = Phaser.Utils.Objects.GetValue;
  var RouteEvents = function RouteEvents(gameObject, element, elementEvents, config) {
    var preventDefault = GetValue$4(config, 'preventDefault', false);
    var preTest = GetValue$4(config, 'preTest');
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

  var DOMElement = Phaser.GameObjects.DOMElement;
  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue$3 = Phaser.Utils.Objects.GetValue;
  var InputText = /*#__PURE__*/function (_DOMElement) {
    _inherits(InputText, _DOMElement);
    function InputText(scene, x, y, width, height, config) {
      var _this;
      _classCallCheck(this, InputText);
      if (IsPlainObject(x)) {
        config = x;
        x = GetValue$3(config, 'x', 0);
        y = GetValue$3(config, 'y', 0);
        width = GetValue$3(config, 'width', 0);
        height = GetValue$3(config, 'height', 0);
      } else if (IsPlainObject(width)) {
        config = width;
        width = GetValue$3(config, 'width', 0);
        height = GetValue$3(config, 'height', 0);
      }
      if (config === undefined) {
        config = {};
      }
      var element;
      var textType = GetValue$3(config, 'inputType', undefined);
      if (textType === undefined) {
        textType = GetValue$3(config, 'type', 'text');
      }
      if (textType === 'textarea') {
        element = document.createElement('textarea');
        element.style.resize = 'none';
      } else {
        element = document.createElement('input');
        element.type = textType;
      }
      SetProperties(ElementProperties, config, element);
      var style = GetValue$3(config, 'style', undefined);
      style = SetProperties(StyleProperties, config, style);
      // Apply other style properties
      var elementStyle = element.style;
      for (var key in config) {
        if (key in ElementProperties || key in StyleProperties) {
          continue;
        } else if (key in elementStyle) {
          style[key] = config[key];
        }
      }
      style['box-sizing'] = 'border-box';
      _this = _callSuper(this, InputText, [scene, x, y, element, style]);
      _this.type = 'rexInputText';
      _this.resize(width, height);

      // Apply events
      RouteEvents(_assertThisInitialized(_this), element, ElementEvents);

      // Don't propagate touch/mouse events to parent(game canvas)
      StopPropagationTouchEvents(element);
      if (GetValue$3(config, 'selectAll', false)) {
        _this.selectAll();
      }
      _this._isFocused = false;
      _this.on('focus', function () {
        this._isFocused = true;
      }, _assertThisInitialized(_this)).on('blur', function () {
        this._isFocused = false;
      }, _assertThisInitialized(_this));
      return _this;
    }
    _createClass(InputText, [{
      key: "inputType",
      get: function get() {
        if (this.node.tagName.toLowerCase() === 'textarea') {
          return 'textarea';
        } else {
          return this.node.type;
        }
      }
    }, {
      key: "text",
      get: function get() {
        return this.node.value;
      },
      set: function set(value) {
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
        return this.node.maxLength;
      },
      set: function set(value) {
        this.node.maxLength = value;
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
        return this.node.minLength;
      },
      set: function set(value) {
        this.node.minLength = value;
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
        return this.node.selectionStart;
      }
    }, {
      key: "selectionEnd",
      get: function get() {
        return this.node.selectionEnd;
      }
    }, {
      key: "selectedText",
      get: function get() {
        var node = this.node;
        return node.value.substring(node.selectionStart, node.selectionEnd);
      }
    }, {
      key: "cursorPosition",
      get: function get() {
        return this.node.selectionStart;
      },
      set: function set(value) {
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
        return this.node.title;
      },
      set: function set(value) {
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
        return this.node.readOnly;
      },
      set: function set(value) {
        this.node.readOnly = value;
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
        return this.node.spellcheck;
      },
      set: function set(value) {
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
        return this.node.style.color;
      },
      set: function set(value) {
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
        this.node.style[key] = value;
        return this;
      }
    }, {
      key: "getStyle",
      value: function getStyle(key) {
        return this.node.style[key];
      }
    }, {
      key: "scrollToBottom",
      value: function scrollToBottom() {
        this.node.scrollTop = this.node.scrollHeight;
        return this;
      }
    }, {
      key: "setEnabled",
      value: function setEnabled(enabled) {
        if (enabled === undefined) {
          enabled = true;
        }
        this.node.disabled = !enabled;
        return this;
      }
    }, {
      key: "setBlur",
      value: function setBlur() {
        this.node.blur();
        return this;
      }
    }, {
      key: "setFocus",
      value: function setFocus() {
        this.node.focus();
        return this;
      }
    }, {
      key: "isFocused",
      get: function get() {
        return this._isFocused;
      }
    }]);
    return InputText;
  }(DOMElement);
  var methods$1 = {
    resize: Resize
  };
  Object.assign(InputText.prototype, methods$1);

  var TextClass = Phaser.GameObjects.Text;
  var IsTextGameObject = function IsTextGameObject(gameObject) {
    return gameObject instanceof TextClass;
  };

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var Clone = Phaser.Utils.Objects.Clone;
  var CreateInputText = function CreateInputText(text, config) {
    if (config === undefined) {
      config = {};
    }
    config = Clone(config);
    var scene = text.scene;
    var style = text.style;
    var backgroundColor = GetValue$2(config, 'backgroundColor', style.backgroundColor);
    if (backgroundColor === null) {
      backgroundColor = 'transparent';
    }
    config.text = GetValue$2(config, 'text', text.text);
    config.fontFamily = GetValue$2(config, 'fontFamily', style.fontFamily);
    config.fontSize = GetValue$2(config, 'fontSize', style.fontSize);
    config.color = GetValue$2(config, 'color', style.color);
    config.backgroundColor = backgroundColor;
    config.direction = GetValue$2(config, 'rtl', style.rtl) ? 'rtl' : 'ltr';
    config.align = GetValue$2(config, 'align', GetHAlign(style));

    // Built-in text game object with RTL only has 'right' align
    if (config.direction === 'rtl' && IsTextGameObject(text)) {
      config.align = 'right';
    }

    // config.paddingLeft = 0;
    // config.paddingRight = 0;
    // config.paddingTop = 0;
    // config.paddingBottom = 0;
    // var valign = GetVAlign(style);
    // switch (valign) {
    //     case 'top':
    //         break;
    //     case 'bottom':
    //         break;
    // }

    var inputText = new InputText(scene, text.x, text.y, GetValue$2(config, 'width', text.width), GetValue$2(config, 'height', text.height), config);
    inputText
    // Sync scale
    .setScale(text.scaleX, text.scaleY)
    // Sync origin
    .setOrigin(text.originX, text.originY)
    // Sync scrollFactor
    .setScrollFactor(text.scrollFactorX, text.scrollFactorY);
    var textParentContainer = text.parentContainer;
    if (!textParentContainer) {
      scene.add.existing(inputText);
    } else {
      textParentContainer.add(inputText);
    }
    return inputText;
  };
  var GetHAlign = function GetHAlign(style) {
    if (style.hasOwnProperty('align')) {
      return style.align;
    } else if (style.hasOwnProperty('halign')) {
      return style.halign;
    } else {
      return 'left';
    }
  };

  var NextTick = function NextTick(scene, callback, scope) {
    return scene.time.delayedCall(0, callback, [], scope);
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;
  var Merge = Phaser.Utils.Objects.Merge;
  var Open = function Open(config, onCloseCallback) {
    if (config === undefined) {
      config = {};
    }
    config = Merge(config, this.openConfig);
    SetLastOpenedEditor(this);
    if (IsFunction(config)) {
      onCloseCallback = config;
      config = undefined;
    }
    var textType = GetValue$1(config, 'inputType', undefined);
    if (textType === undefined) {
      textType = GetValue$1(config, 'type', 'text');
    }
    if (onCloseCallback === undefined) {
      onCloseCallback = GetValue$1(config, 'onClose', undefined);
    }
    var onOpenCallback = GetValue$1(config, 'onOpen', undefined);
    var customOnTextChanged = GetValue$1(config, 'onTextChanged', undefined);
    this.inputText = CreateInputText(this.parent, config).on('textchange', function (inputText) {
      var text = inputText.text;
      if (customOnTextChanged) {
        // Custom on-text-changed callback
        customOnTextChanged(this.parent, text);
      } else {
        // Default on-text-changed callback
        this.parent.text = text;
      }
    }, this).setFocus();
    this.parent.setVisible(false); // Set parent text invisible

    // Attach close event
    this.onClose = onCloseCallback;
    if (GetValue$1(config, 'enterClose', textType !== 'textarea')) {
      this.scene.input.keyboard.once('keydown-ENTER', this.close, this);
    }
    // Attach pointerdown (outside of input-text) event, at next tick
    this.delayCall = NextTick(this.scene, function () {
      this.scene.input.once('pointerdown', this.close, this);

      // Open editor completly, invoke onOpenCallback
      if (onOpenCallback) {
        onOpenCallback(this.parent);
      }
      this.emit('open', this.parent);
    }, this);
    return this;
  };

  var Close = function Close() {
    CloseLastOpenEditor(this);
    this.parent.setVisible(true); // Set parent text visible

    if (this.inputText) {
      this.inputText.destroy();
      this.inputText = undefined;
    }
    if (this.delayCall) {
      this.delayCall.remove();
      this.delayCall = undefined;
    }

    // Remove close event
    this.scene.input.keyboard.off('keydown-ENTER', this.close, this);
    this.scene.input.off('pointerdown', this.close, this);
    if (this.onClose) {
      this.onClose(this.parent);
    }
    this.emit('close', this.parent);
    return this;
  };

  var Methods = {
    open: Open,
    close: Close
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var TextEdit = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TextEdit, _ComponentBase);
    function TextEdit(gameObject, config) {
      var _this;
      _classCallCheck(this, TextEdit);
      _this = _callSuper(this, TextEdit, [gameObject]);
      // this.parent = gameObject;

      _this.inputText = undefined;
      _this.onClose = undefined;
      _this.delayCall = undefined;
      _this.setOpenConfig(config);
      var clickEnable = GetValue(config, 'clickEnable', true);
      if (clickEnable) {
        gameObject.on('pointerdown', function () {
          this.open();
        }, _assertThisInitialized(_this)).setInteractive();
      }
      return _this;
    }
    _createClass(TextEdit, [{
      key: "shutdown",
      value: function shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
          return;
        }
        this.close();
        _get(_getPrototypeOf(TextEdit.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "setOpenConfig",
      value: function setOpenConfig(config) {
        if (config === undefined) {
          config = {};
        }
        this.openConfig = config;
        return this;
      }
    }, {
      key: "isOpened",
      get: function get() {
        return this.inputText !== undefined;
      }
    }, {
      key: "text",
      get: function get() {
        return this.isOpened ? this.inputText.text : this.parent.text;
      }
    }]);
    return TextEdit;
  }(ComponentBase);
  Object.assign(TextEdit.prototype, Methods);

  var Edit = function Edit(gameObject, config, onCloseCallback) {
    if (!gameObject._edit) {
      gameObject._edit = new TextEdit(gameObject, {
        clickEnable: false
      });
    }
    gameObject._edit.open(config, onCloseCallback);
    return gameObject._edit;
  };

  var TextEditPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(TextEditPlugin, _Phaser$Plugins$BaseP);
    function TextEditPlugin(pluginManager) {
      _classCallCheck(this, TextEditPlugin);
      return _callSuper(this, TextEditPlugin, [pluginManager]);
    }
    _createClass(TextEditPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject, config) {
        return new TextEdit(gameObject, config);
      }
    }]);
    return TextEditPlugin;
  }(Phaser.Plugins.BasePlugin);
  var methods = {
    edit: Edit
  };
  Object.assign(TextEditPlugin.prototype, methods);

  return TextEditPlugin;

}));
