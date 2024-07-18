(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexinputtextplugin = factory());
})(this, (function () { 'use strict';

    var Resize = function (width, height) {
        if (this.scene.sys.scale.autoRound) {
            width = Math.floor(width);
            height = Math.floor(height);
        }

        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        var style = this.node.style;
        style.width = `${width}px`;
        style.height = `${height}px`;
        this.updateSize();
        return this;
    };

    const ElementProperties = {
        id: ['id', undefined],
        text: ['value', undefined],
        maxLength: ['maxLength', undefined],
        minLength: ['minLength', undefined],
        placeholder: ['placeholder', undefined],
        tooltip: ['title', undefined],
        readOnly: ['readOnly', false],
        spellCheck: ['spellcheck', false],
        autoComplete: ['autocomplete', 'off'],
    };

    const StyleProperties = {
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
        borderRadius: ['border-radius', undefined],
        outline: ['outline', 'none'],
        direction: ['direction', undefined]
    };

    const ElementEvents = {
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

        select: 'select',
    };

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    var SetProperties = function (properties, config, out) {
        if (out === undefined) {
            out = {};
        }

        var property, value;
        for (var key in properties) {
            property = properties[key];  // [propName, defaultValue]
            value = GetValue$2(config, key, property[1]);
            if (value !== undefined) {
                out[property[0]] = value;
            }
        }

        return out;
    };

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    var RouteEvents = function (gameObject, element, elementEvents, config) {
        var preventDefault = GetValue$1(config, 'preventDefault', false);
        var preTest = GetValue$1(config, 'preTest');
        for (let elementEventName in elementEvents) {  // Note: Don't use `var` here
            element.addEventListener(elementEventName, function (e) {
                if (!preTest || preTest(gameObject, elementEventName)) {
                    gameObject.emit(elementEvents[elementEventName], gameObject, e);
                }

                if (preventDefault) {
                    e.preventDefault();
                }
            });
        }
    };

    var StopPropagationTouchEvents = function (element) {
        // Don't propagate touch/mouse events to parent(game canvas)
        element.addEventListener('touchstart', callback, false);
        element.addEventListener('touchmove', callback, false);
        element.addEventListener('touchend', callback, false);
        element.addEventListener('mousedown', callback, false);
        element.addEventListener('mouseup', callback, false);
        element.addEventListener('mousemove', callback, false);
    };

    var callback = function (e) {
        e.stopPropagation();
    };

    const DOMElement = Phaser.GameObjects.DOMElement;
    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class InputText extends DOMElement {
        constructor(scene, x, y, width, height, config) {
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
                if ((key in ElementProperties) || (key in StyleProperties)) {
                    continue;
                } else if (key in elementStyle) {
                    style[key] = config[key];
                }
            }
            style['box-sizing'] = 'border-box';
            super(scene, x, y, element, style);
            this.type = 'rexInputText';
            this.resize(width, height);

            // Apply events
            RouteEvents(this, element, ElementEvents);

            // Don't propagate touch/mouse events to parent(game canvas)
            StopPropagationTouchEvents(element);

            if (GetValue(config, 'selectAll', false)) {
                this.selectAll();
            }

            this._isFocused = false;
            this
                .on('focus', function () {
                    this._isFocused = true;
                }, this)
                .on('blur', function () {
                    this._isFocused = false;
                }, this);

        }

        get inputType() {
            if (this.node.tagName.toLowerCase() === 'textarea') {
                return 'textarea';
            } else {
                return this.node.type;
            }
        }

        get text() {
            return this.node.value;
        }

        set text(value) {
            this.node.value = value;
        }

        setText(value) { // Override
            this.text = value;
            return this;
        }

        get maxLength() {
            return this.node.maxLength;
        }

        set maxLength(value) {
            this.node.maxLength = value;
        }

        setMaxLength(value) {
            this.maxLength = value;
            return this;
        }

        get minLength() {
            return this.node.minLength;
        }

        set minLength(value) {
            this.node.minLength = value;
        }

        setMinLength(value) {
            this.minLength = value;
            return this;
        }

        get placeholder() {
            return this.node.placeholder;
        }

        set placeholder(value) {
            this.node.placeholder = value;
        }

        setPlaceholder(value) {
            this.placeholder = value;
            return this;
        }

        selectText(selectionStart, selectionEnd) {
            if (selectionStart === undefined) {
                this.node.select();
            } else {
                this.node.setSelectionRange(selectionStart, selectionEnd);
            }
            return this;
        }

        selectAll() {
            this.selectText();
            return this;
        }

        get selectionStart() {
            return this.node.selectionStart;
        }

        get selectionEnd() {
            return this.node.selectionEnd;
        }

        get selectedText() {
            var node = this.node;
            return node.value.substring(node.selectionStart, node.selectionEnd);
        }

        get cursorPosition() {
            return this.node.selectionStart;
        }

        set cursorPosition(value) {
            this.node.setSelectionRange(value, value);
        }

        setCursorPosition(value) {
            if (value === undefined) {
                value = this.text.length;
            } else if (value < 0) {
                value = this.text.length + value;
            }

            this.cursorPosition = value;
            return this;
        }

        get tooltip() {
            return this.node.title;
        }

        set tooltip(value) {
            this.node.title = value;
        }

        setTooltip(value) {
            this.tooltip = value;
            return this;
        }

        setTextChangedCallback(callback) {
            this.onTextChanged = callback;
            return this;
        }

        get readOnly() {
            return this.node.readOnly;
        }

        set readOnly(value) {
            this.node.readOnly = value;
        }

        setReadOnly(value) {
            if (value === undefined) {
                value = true;
            }
            this.readOnly = value;
            return this;
        }

        get spellCheck() {
            return this.node.spellcheck;
        }

        set spellCheck(value) {
            this.node.spellcheck = value;
        }

        setSpellCheck(value) {
            this.spellCheck = value;
            return this;
        }

        get fontColor() {
            return this.node.style.color;
        }

        set fontColor(value) {
            this.node.style.color = value;
        }

        setFontColor(value) {
            this.fontColor = value;
            return this;
        }

        setStyle(key, value) {
            this.node.style[key] = value;
            return this;
        }

        getStyle(key) {
            return this.node.style[key];
        }

        scrollToBottom() {
            this.node.scrollTop = this.node.scrollHeight;
            return this;
        }

        setEnabled(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.node.disabled = !enabled;
            return this;
        }

        setBlur() {
            this.node.blur();
            return this;
        }

        setFocus() {
            this.node.focus();
            return this;
        }

        get isFocused() {
            return this._isFocused;
        }

    }

    var methods = {
        resize: Resize
    };

    Object.assign(
        InputText.prototype,
        methods
    );

    function Factory (x, y, width, height, config) {
        var gameObject = new InputText(this.scene, x, y, width, height, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var width = GetAdvancedValue(config, 'width', undefined);
        var height = GetAdvancedValue(config, 'height', undefined);
        var gameObject = new InputText(this.scene, 0, 0, width, height, config);
        BuildGameObject(this.scene, gameObject, config);
        return gameObject;
    }

    var IsInValidKey = function (keys) {
        return (keys == null) || (keys === '') || (keys.length === 0);
    };

    var GetEntry = function (target, keys, defaultEntry) {
        var entry = target;
        if (IsInValidKey(keys)) ; else {
            if (typeof (keys) === 'string') {
                keys = keys.split('.');
            }

            var key;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                key = keys[i];
                if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
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

    var SetValue = function (target, keys, value, delimiter) {
        if (delimiter === undefined) {
            delimiter = '.';
        }

        // no object
        if (typeof (target) !== 'object') {
            return;
        }

        // invalid key
        else if (IsInValidKey(keys)) {
            // don't erase target
            if (value == null) {
                return;
            }
            // set target to another object
            else if (typeof (value) === 'object') {
                target = value;
            }
        } else {
            if (typeof (keys) === 'string') {
                keys = keys.split(delimiter);
            }

            var lastKey = keys.pop();
            var entry = GetEntry(target, keys);
            entry[lastKey] = value;
        }

        return target;
    };

    class InputTextPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexInputText', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.InputText', InputText);

    return InputTextPlugin;

}));
