(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextexteditplugin = factory());
})(this, (function () { 'use strict';

    var EventEmitterMethods = {
        setEventEmitter(eventEmitter, EventEmitterClass) {
            if (EventEmitterClass === undefined) {
                EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
            }
            this._privateEE = (eventEmitter === true) || (eventEmitter === undefined);
            this._eventEmitter = (this._privateEE) ? (new EventEmitterClass()) : eventEmitter;
            return this;
        },

        destroyEventEmitter() {
            if (this._eventEmitter && this._privateEE) {
                this._eventEmitter.shutdown();
            }
            return this;
        },

        getEventEmitter() {
            return this._eventEmitter;
        },

        on() {
            if (this._eventEmitter) {
                this._eventEmitter.on.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        once() {
            if (this._eventEmitter) {
                this._eventEmitter.once.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        off() {
            if (this._eventEmitter) {
                this._eventEmitter.off.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        emit(event) {
            if (this._eventEmitter && event) {
                this._eventEmitter.emit.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        addListener() {
            if (this._eventEmitter) {
                this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeListener() {
            if (this._eventEmitter) {
                this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeAllListeners() {
            if (this._eventEmitter) {
                this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        listenerCount() {
            if (this._eventEmitter) {
                return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
            }
            return 0;
        },

        listeners() {
            if (this._eventEmitter) {
                return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
            }
            return [];
        },

        eventNames() {
            if (this._eventEmitter) {
                return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
            }
            return [];
        },
    };

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
    };

    var GetSceneObject = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsSceneObject(object)) { // object = scene
            return object;
        } else if (object.scene && IsSceneObject(object.scene)) { // object = game object
            return object.scene;
        } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) { // parent = bob object
            return object.parent.scene;
        } else {
            return null;
        }
    };

    const GameClass = Phaser.Game;
    var IsGame = function (object) {
        return (object instanceof GameClass);
    };

    var GetGame = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsGame(object)) {
            return object;
        } else if (IsGame(object.game)) {
            return object.game;
        } else if (IsSceneObject(object)) { // object = scene object
            return object.sys.game;
        } else if (IsSceneObject(object.scene)) { // object = game object
            return object.scene.sys.game;
        }
    };

    const GetValue$6 = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$6(config, 'eventEmitter', true));

            // Register callback of parent destroy event, also see `shutdown` method
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
                    this.parent.once('destroy', this.onParentDestroy, this);
                }

                // bob object does not have event emitter
            }

        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // parent might not be shutdown yet
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
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

        destroy(fromScene) {
            this.shutdown(fromScene);
        }

        onEnvDestroy() {
            this.destroy(true);
        }

        onParentDestroy(parent, fromScene) {
            this.destroy(fromScene);
        }

        setParent(parent) {
            this.parent = parent;  // gameObject, scene, or game

            this.scene = GetSceneObject(parent);
            this.game = GetGame(parent);

            return this;
        }

    }
    Object.assign(
        ComponentBase.prototype,
        EventEmitterMethods
    );

    var LastOpenedEditor = undefined;

    var SetLastOpenedEditor = function (editor) {
        if (editor === LastOpenedEditor) {
            return;
        }

        if (LastOpenedEditor !== undefined) {
            LastOpenedEditor.close();
        }

        LastOpenedEditor = editor;
    };

    var CloseLastOpenEditor = function (editor) {
        if (editor !== LastOpenedEditor) {
            return;
        }

        // Don't call `LastOpenedEditor.close()`
        LastOpenedEditor = undefined;
    };

    var IsFunction = function (obj) {    
        return obj && (typeof(obj) === 'function');
    };

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

    const GetValue$5 = Phaser.Utils.Objects.GetValue;

    var SetProperties = function (properties, config, out) {
        if (out === undefined) {
            out = {};
        }

        var property, value;
        for (var key in properties) {
            property = properties[key];  // [propName, defaultValue]
            value = GetValue$5(config, key, property[1]);
            if (value !== undefined) {
                out[property[0]] = value;
            }
        }

        return out;
    };

    const GetValue$4 = Phaser.Utils.Objects.GetValue;

    var RouteEvents = function (gameObject, element, elementEvents, config) {
        var preventDefault = GetValue$4(config, 'preventDefault', false);
        var preTest = GetValue$4(config, 'preTest');
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
    const GetValue$3 = Phaser.Utils.Objects.GetValue;

    class InputText extends DOMElement {
        constructor(scene, x, y, width, height, config) {
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

            if (GetValue$3(config, 'selectAll', false)) {
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

    var methods$1 = {
        resize: Resize
    };

    Object.assign(
        InputText.prototype,
        methods$1
    );

    const TextClass = Phaser.GameObjects.Text;

    var IsTextGameObject = function (gameObject) {
        return (gameObject instanceof TextClass);
    };

    const GetValue$2 = Phaser.Utils.Objects.GetValue;
    const Clone = Phaser.Utils.Objects.Clone;

    var CreateInputText = function (text, config) {
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
        if ((config.direction === 'rtl') && (IsTextGameObject(text))) {
            config.align = 'right';
        }

        var padding = text.padding;
        if (padding.left > 0) {
            config.paddingLeft = `${padding.left}px`;
        }
        if (padding.right > 0) {
            config.paddingRight = `${padding.right}px`;
        }
        // config.paddingTop = 0;
        // config.paddingBottom = 0;
        // var valign = GetVAlign(style);
        // switch (valign) {
        //     case 'top':
        //         break;
        //     case 'bottom':
        //         break;
        // }

        if (style.backgroundCornerRadius) {
            config.borderRadius = GetValue$2(config, 'borderRadius', `${style.backgroundCornerRadius}px`);
        }


        var inputText = new InputText(scene,
            text.x, text.y,
            GetValue$2(config, 'width', text.width),
            GetValue$2(config, 'height', text.height),
            config
        );

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

    var GetHAlign = function (style) {
        if (style.hasOwnProperty('align')) {
            return style.align;
        } else if (style.hasOwnProperty('halign')) {
            return style.halign;
        } else {
            return 'left';
        }
    };

    var NextTick = function (scene, callback, scope) {
        return scene.time.delayedCall(0, callback, [], scope);
    };

    const GetValue$1 = Phaser.Utils.Objects.GetValue;
    const Merge = Phaser.Utils.Objects.Merge;

    var Open = function (config, onCloseCallback) {
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

        this.inputText = CreateInputText(this.parent, config)
            .on('textchange', function (inputText) {
                var text = inputText.text;
                if (customOnTextChanged) { // Custom on-text-changed callback
                    customOnTextChanged(this.parent, text);
                } else { // Default on-text-changed callback
                    this.parent.text = text;
                }
            }, this)
            .setFocus();
        this.parent.setVisible(false); // Set parent text invisible

        // Attach close event
        this.onClose = onCloseCallback;
        if (GetValue$1(config, 'enterClose', (textType !== 'textarea'))) {
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

    var Close = function () {
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
        close: Close,
    };

    const GetValue = Phaser.Utils.Objects.GetValue;

    class TextEdit extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject);
            // this.parent = gameObject;

            this.inputText = undefined;
            this.onClose = undefined;
            this.delayCall = undefined;

            this.setOpenConfig(config);

            var clickEnable = GetValue(config, 'clickEnable', true);
            if (clickEnable) {
                gameObject
                    .on('pointerdown', function () {
                        this.open();
                    }, this)
                    .setInteractive();
            }
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.close();

            super.shutdown(fromScene);
        }

        setOpenConfig(config) {
            if (config === undefined) {
                config = {};
            }
            this.openConfig = config;
            return this;
        }

        get isOpened() {
            return (this.inputText !== undefined);
        }

        get text() {
            return (this.isOpened) ? this.inputText.text : this.parent.text;
        }
    }

    Object.assign(
        TextEdit.prototype,
        Methods,
    );

    var Edit = function (gameObject, config, onCloseCallback) {
        if (!gameObject._edit) {
            gameObject._edit = new TextEdit(gameObject, {
                clickEnable: false
            });
        }
        gameObject._edit.open(config, onCloseCallback);
        return gameObject._edit;
    };

    class TextEditPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new TextEdit(gameObject, config);
        }
    }

    var methods = {
        edit: Edit
    };
    Object.assign(
        TextEditPlugin.prototype,
        methods
    );

    return TextEditPlugin;

}));
