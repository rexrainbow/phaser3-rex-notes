(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexinputtextplugin = factory());
})(this, (function () { 'use strict';

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

  var GetValue$2 = Phaser.Utils.Objects.GetValue;
  var SetProperties = function SetProperties(properties, config, out) {
    if (out === undefined) {
      out = {};
    }
    var property, value;
    for (var key in properties) {
      property = properties[key]; // [propName, defaultValue]
      value = GetValue$2(config, key, property[1]);
      if (value !== undefined) {
        out[property[0]] = value;
      }
    }
    return out;
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
  var GetValue = Phaser.Utils.Objects.GetValue;
  var InputText = /*#__PURE__*/function (_DOMElement) {
    _inherits(InputText, _DOMElement);
    var _super = _createSuper(InputText);
    function InputText(scene, x, y, width, height, config) {
      var _this;
      _classCallCheck(this, InputText);
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
      var element;
      var textType = GetValue(config, 'inputType', undefined);
      if (textType === undefined) {
        textType = GetValue(config, 'type', 'text');
      }
      if (textType === 'textarea') {
        element = document.createElement('textarea');
        element.style.resize = 'none';
      } else {
        element = document.createElement('input');
        element.type = textType;
      }
      SetProperties(ElementProperties, config, element);
      var style = GetValue(config, 'style', undefined);
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
      _this = _super.call(this, scene, x, y, element, style);
      _this.type = 'rexInputText';
      _this.resize(width, height);

      // Apply events
      RouteEvents(_assertThisInitialized(_this), element, ElementEvents);

      // Don't propagate touch/mouse events to parent(game canvas)
      StopPropagationTouchEvents(element);
      if (GetValue(config, 'selectAll', false)) {
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
  var methods = {
    resize: Resize
  };
  Object.assign(InputText.prototype, methods);

  function Factory (x, y, width, height, config) {
    var gameObject = new InputText(this.scene, x, y, width, height, config);
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
    var gameObject = new InputText(this.scene, 0, 0, width, height, config);
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

  var InputTextPlugin = /*#__PURE__*/function (_Phaser$Plugins$BaseP) {
    _inherits(InputTextPlugin, _Phaser$Plugins$BaseP);
    var _super = _createSuper(InputTextPlugin);
    function InputTextPlugin(pluginManager) {
      var _this;
      _classCallCheck(this, InputTextPlugin);
      _this = _super.call(this, pluginManager);

      //  Register our new Game Object type
      pluginManager.registerGameObject('rexInputText', Factory, Creator);
      return _this;
    }
    _createClass(InputTextPlugin, [{
      key: "start",
      value: function start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
      }
    }]);
    return InputTextPlugin;
  }(Phaser.Plugins.BasePlugin);
  SetValue(window, 'RexPlugins.GameObjects.InputText', InputText);

  return InputTextPlugin;

}));
