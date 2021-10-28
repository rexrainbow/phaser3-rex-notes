(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextexteditplugin = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
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

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
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
    }
  };

  var GetValue$4 = Phaser.Utils.Objects.GetValue;

  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase(parent, config) {
      _classCallCheck(this, ComponentBase);

      this.parent = parent; // gameObject or scene

      this.scene = GetSceneObject(parent);
      this.isShutdown = false; // Event emitter, default is private event emitter

      this.setEventEmitter(GetValue$4(config, 'eventEmitter', true)); // Register callback of parent destroy event, also see `shutdown` method

      if (this.parent && this.parent === this.scene) {
        // parent is a scene
        this.scene.events.once('shutdown', this.onSceneDestroy, this);
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
          this.scene.events.off('shutdown', this.onSceneDestroy, this);
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

  var Resize = function Resize(width, height) {
    if (this.scene.scale.autoRound) {
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

  var RouteEvents = function RouteEvents(gameObject, element, elementEvents) {
    var _loop = function _loop(eventName) {
      // Note: Don't use `var` here
      element[elementEvents[eventName]] = function (e) {
        gameObject.emit(eventName, gameObject, e);
      };
    };

    for (var eventName in elementEvents) {
      _loop(eventName);
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
  var GetValue$2 = Phaser.Utils.Objects.GetValue;

  var InputText = /*#__PURE__*/function (_DOMElement) {
    _inherits(InputText, _DOMElement);

    var _super = _createSuper(InputText);

    function InputText(scene, x, y, width, height, config) {
      var _this;

      _classCallCheck(this, InputText);

      if (IsPlainObject(x)) {
        config = x;
        x = GetValue$2(config, 'x', 0);
        y = GetValue$2(config, 'y', 0);
        width = GetValue$2(config, 'width', 0);
        height = GetValue$2(config, 'height', 0);
      } else if (IsPlainObject(width)) {
        config = width;
        width = GetValue$2(config, 'width', 0);
        height = GetValue$2(config, 'height', 0);
      }

      if (config === undefined) {
        config = {};
      }

      var element;
      var textType = GetValue$2(config, 'type', 'text');

      if (textType === 'textarea') {
        element = document.createElement('textarea');
        element.style.resize = 'none';
      } else {
        element = document.createElement('input');
        element.type = textType;
      }

      SetProperties(ElementProperties, config, element);
      var style = GetValue$2(config, 'style', undefined);
      style = SetProperties(StyleProperties, config, style); // Apply other style properties

      var elementStyle = element.style;

      for (var key in config) {
        if (key in ElementProperties || key in StyleProperties) {
          continue;
        } else if (key in elementStyle) {
          style[key] = config[key];
        }
      }

      style['box-sizing'] = 'border-box';
      _this = _super.call(this, scene, x, y, element, style);
      _this.type = 'rexInputText';

      _this.resize(width, height); // Apply events


      RouteEvents(_assertThisInitialized(_this), element, ElementEvents); // Don't propagate touch/mouse events to parent(game canvas)

      StopPropagationTouchEvents(element);

      if (GetValue$2(config, 'selectAll', false)) {
        _this.selectAll();
      }

      return _this;
    }

    _createClass(InputText, [{
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
      value: function selectText() {
        this.node.select();
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
      key: "selectAll",
      value: function selectAll() {
        this.node.select();
        return this;
      }
    }]);

    return InputText;
  }(DOMElement);

  var methods$1 = {
    resize: Resize
  };
  Object.assign(InputText.prototype, methods$1);
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
    textchange: 'oninput',
    click: 'onclick',
    dblclick: 'ondblclick',
    focus: 'onfocus',
    blur: 'onblur'
  };

  var TextKlass = Phaser.GameObjects.Text;

  var IsTextGameObject = function IsTextGameObject(gameObject) {
    return gameObject instanceof TextKlass;
  };

  var GetValue$1 = Phaser.Utils.Objects.GetValue;

  var CreateInputText = function CreateInputText(text, config) {
    if (config === undefined) {
      config = {};
    }

    var scene = text.scene;
    var style = text.style;
    var backgroundColor = GetValue$1(config, 'backgroundColor', style.backgroundColor);

    if (backgroundColor === null) {
      backgroundColor = 'transparent';
    }

    config.text = GetValue$1(config, 'text', text.text);
    config.fontFamily = GetValue$1(config, 'fontFamily', style.fontFamily);
    config.fontSize = GetValue$1(config, 'fontSize', style.fontSize);
    config.color = GetValue$1(config, 'color', style.color);
    config.backgroundColor = backgroundColor;
    config.direction = GetValue$1(config, 'rtl', style.rtl) ? 'rtl' : 'ltr';
    config.align = GetValue$1(config, 'align', GetHAlign(style)); // Built-in text game object with RTL only has 'right' align

    if (config.direction === 'rtl' && IsTextGameObject(text)) {
      config.align = 'right';
    } // config.paddingLeft = 0;
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


    var inputText = new InputText(scene, text.x, text.y, GetValue$1(config, 'width', text.width), GetValue$1(config, 'height', text.height), config);
    inputText.setOrigin(text.originX, text.originY);
    scene.add.existing(inputText);
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

  var IsFunction = function IsFunction(obj) {
    return obj && typeof obj === 'function';
  };

  var GetValue = Phaser.Utils.Objects.GetValue;
  var LastOpenedEditor = undefined;

  var TextEdit = /*#__PURE__*/function (_ComponentBase) {
    _inherits(TextEdit, _ComponentBase);

    var _super = _createSuper(TextEdit);

    function TextEdit(gameObject) {
      var _this;

      _classCallCheck(this, TextEdit);

      // No event emitter
      _this = _super.call(this, gameObject, {
        eventEmitter: false
      }); // this.parent = gameObject;

      _this.inputText = undefined;
      _this.onClose = undefined;
      _this.delayCall = undefined;
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

        if (LastOpenedEditor === this) {
          LastOpenedEditor = undefined;
        }

        _get(_getPrototypeOf(TextEdit.prototype), "shutdown", this).call(this, fromScene);
      }
    }, {
      key: "open",
      value: function open(config, onCloseCallback) {
        if (LastOpenedEditor !== undefined) {
          LastOpenedEditor.close();
        }

        LastOpenedEditor = this;

        if (IsFunction(config)) {
          onCloseCallback = config;
          config = undefined;
        }

        if (onCloseCallback === undefined) {
          onCloseCallback = GetValue(config, 'onClose', undefined);
        }

        var onOpenCallback = GetValue(config, 'onOpen', undefined);
        var customOnTextChanged = GetValue(config, 'onTextChanged', undefined);
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

        if (GetValue(config, 'enterClose', true)) {
          this.scene.input.keyboard.once('keydown-ENTER', this.close, this);
        } // Attach pointerdown (outside of input-text) event, at next tick


        this.delayCall = this.scene.time.delayedCall(0, function () {
          this.scene.input.once('pointerdown', this.close, this); // Open editor completly, invoke onOpenCallback

          if (onOpenCallback) {
            onOpenCallback(this.parent);
          }
        }, [], this);
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        LastOpenedEditor = undefined;

        if (!this.inputText) {
          return this;
        }

        this.parent.setVisible(true); // Set parent text visible

        this.inputText.destroy();
        this.inputText = undefined;

        if (this.delayCall) {
          this.delayCall.remove();
          this.delayCall = undefined;
        } // Remove close event


        this.scene.input.keyboard.off('keydown-ENTER', this.close, this);
        this.scene.input.off('pointerdown', this.close, this);

        if (this.onClose) {
          this.onClose(this.parent);
        }

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

  var Edit = function Edit(gameObject, config, onCloseCallback) {
    if (!gameObject._edit) {
      gameObject._edit = new TextEdit(gameObject);
    }

    gameObject._edit.open(config, onCloseCallback);

    return gameObject._edit;
  };

  var TextEditPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(TextEditPlugin, _Phaser$Plugins$BaseP);

    var _super = _createSuper(TextEditPlugin);

    function TextEditPlugin(pluginManager) {
      _classCallCheck(this, TextEditPlugin);

      return _super.call(this, pluginManager);
    }

    _createClass(TextEditPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }, {
      key: "add",
      value: function add(gameObject) {
        return new TextEdit(gameObject);
      }
    }]);

    return TextEditPlugin;
  }(Phaser.Plugins.BasePlugin);

  var methods = {
    edit: Edit
  };
  Object.assign(TextEditPlugin.prototype, methods);

  return TextEditPlugin;

})));
