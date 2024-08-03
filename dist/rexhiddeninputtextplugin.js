(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexhiddeninputtextplugin = factory());
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

    const GetValue$4 = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$4(config, 'eventEmitter', true));

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

    const ElementProperties = {
        maxLength: ['maxLength', undefined],
        minLength: ['minLength', undefined],
        readOnly: ['readOnly', false],
    };

    const StyleProperties = {
        direction: ['direction', undefined]
    };

    var CopyProperty = function (from, to, key) {
        if (typeof (key) === 'string') {
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

    var CopyElementConfig = function (from) {
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

    var IsPointerInHitArea = function (gameObject, pointer, preTest, postTest, returnFirstPointer) {
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
            if (returnFirstPointer === undefined) {
                returnFirstPointer = false;
            }

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

                if (returnFirstPointer) {
                    return pointer;
                }

                return true;
            }

            return false;
        }
    };

    var HitTest = function (gameObject, pointer) {
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

    const GetValue$3 = Phaser.Utils.Objects.GetValue;

    var SetProperties = function (properties, config, out) {
        if (out === undefined) {
            out = {};
        }

        var property, value;
        for (var key in properties) {
            property = properties[key];  // [propName, defaultValue]
            value = GetValue$3(config, key, property[1]);
            if (value !== undefined) {
                out[property[0]] = value;
            }
        }

        return out;
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

    var EnterClose = function () {
        this.close();
        this.emit('keydown-ENTER', this.parent, this);
        return this;
    };

    const ArrayUtils = Phaser.Utils.Array;

    const MoveMyDepthBelow = function (gameObject) {
        var list;
        if (gameObject.parentContainer) {
            list = gameObject.parentContainer.list;
            if (list.indexOf(this) === -1) {
                gameObject.parentContainer.add(this);
            }
        } else if (gameObject.displayList) {
            list = gameObject.displayList.list;
            if (list.indexOf(this) === -1) {
                gameObject.displayList.add(this);
            }
        }
        if (!list) {
            return this;
        }

        ArrayUtils.MoveBelow(list, this, gameObject);

        return this;
    };

    const MoveMyDepthAbove = function (gameObject) {
        var list;
        if (gameObject.parentContainer) {
            list = gameObject.parentContainer.list;
            if (list.indexOf(this) === -1) {
                if (gameObject.isRexContainerLite) {
                    gameObject.addToContainer(gameObject.parentContainer);
                } else {
                    gameObject.parentContainer.add(gameObject);
                }
            }
        } else if (gameObject.displayList) {
            list = gameObject.displayList.list;
            if (list.indexOf(this) === -1) {
                if (gameObject.isRexContainerLite) {
                    gameObject.addToLayer(gameObject.displayList);
                } else {
                    gameObject.displayList.add(gameObject);
                }
            }
        }
        if (!list) {
            return this;
        }

        ArrayUtils.MoveAbove(list, this, gameObject);

        return this;
    };

    var OnOpen = function () {
        this.isOpened = true;

        this.initText();

        if (this.enterCloseEnable) {
            this.scene.input.keyboard.once('keydown-ENTER', EnterClose, this);
        }

        // There is no cursor-position-change event, 
        // so updating cursor position every tick
        this.scene.sys.events.on('postupdate', this.updateText, this);

        if (this.clickOutSideTarget) {
            MoveMyDepthAbove.call(this.clickOutSideTarget, this.parent);
            MoveMyDepthBelow.call(this.clickOutSideTarget, this.parent);

            this.clickOutSideTarget
                .setInteractive()
                .on('pointerdown', this.onClickOutside, this);

        } else {
            this.scene.input.on('pointerdown', this.onClickOutside, this);
        }

        if (this.onOpenCallback) {
            this.onOpenCallback(this.parent, this);
        }

        this.emit('open', this);
    };

    var RemoveElement = function (element) {
        if (!element) {
            return;
        }

        var parentElement = element.parentElement;
        if (parentElement) {
            parentElement.removeChild(element);
        }
    };

    var OnClose = function () {

        this.isOpened = false;

        this.updateText();

        if (this.enterCloseEnable) {
            this.scene.input.keyboard.off('keydown-ENTER', EnterClose, this);
        }

        this.scene.sys.events.off('postupdate', this.updateText, this);

        if (this.clickOutSideTarget) {
            this.clickOutSideTarget
                .disableInteractive()
                .off('pointerdown', this.onClickOutside, this);

        } else {
            this.scene.input.off('pointerdown', this.onClickOutside, this);

        }

        if (this.onCloseCallback) {
            this.onCloseCallback(this.parent, this);
        }

        // Remove input text element when closing editor
        RemoveElement(this.node);
        this.node = undefined;

        this.emit('close', this);

    };

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    var CreateElement = function (parent, config) {
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
        var parentElement = (scaleManager.isFullscreen) ? scaleManager.fullscreenTarget : document.body;
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

    var Open = function () {
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

    var Close = function () {
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
        close: Close,
    };

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class HiddenTextEditBase extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject);
            // this.parent = gameObject;

            var textType = GetValue$1(config, 'inputType', undefined);
            if (textType === undefined) {
                textType = GetValue$1(config, 'type', 'text');
            }

            this.setEnterCloseEnable(GetValue$1(config, 'enterClose', (textType !== 'textarea')));

            var onOpen = GetValue$1(config, 'onOpen', undefined);
            if (!onOpen) {
                onOpen = GetValue$1(config, 'onFocus', undefined);
            }
            this.onOpenCallback = onOpen;

            this.clickOutSideTarget = GetValue$1(config, 'clickOutSideTarget', undefined);

            var onClose = GetValue$1(config, 'onClose', undefined);
            if (!onClose) {
                onClose = GetValue$1(config, 'onBlur', undefined);
            }
            this.onCloseCallback = onClose;

            this.onUpdateCallback = GetValue$1(config, 'onUpdate', undefined);

            this.isOpened = false;

            gameObject
                .on('pointerdown', function () {
                    this.open();
                }, this)
                .setInteractive();

            this.nodeConfig = CopyElementConfig(config);
            // Create/remove input text element when opening/closing editor
            this.node = undefined;
        }

        destroy() {
            // this.parent.off('pointerdown', this.open, this);

            this.close();

            if (this.clickOutSideTarget) {
                this.clickOutSideTarget.destroy();
            }

            super.destroy();
        }

        onClickOutside(pointer) {
            if (!IsPointerInHitArea(this.parent, pointer)) {
                this.close();
            }
        }

        setEnterCloseEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.enterCloseEnable = enable;
            return this;
        }

        // Override
        initText() {
        }

        // Override, invoking under 'postupdate' event of scene
        updateText() {
        }

        // Copy from InputText class
        get text() {
            if (!this.node) {
                return '';
            }
            return this.node.value;
        }

        set text(value) {
            if (!this.node) {
                return;
            }
            this.node.value = value;
        }

        setText(value) { // Override
            this.text = value;
            return this;
        }

        get maxLength() {
            return this.nodeConfig.maxLength;
        }

        set maxLength(value) {
            this.nodeConfig.maxLength = value;

            if (this.node) {
                this.node.maxLength = value;
            }
        }

        setMaxLength(value) {
            this.maxLength = value;
            return this;
        }

        get minLength() {
            return this.nodeConfig.minLength;
        }

        set minLength(value) {
            this.nodeConfig.minLength = value;

            if (this.node) {
                this.node.minLength = value;
            }
        }

        setMinLength(value) {
            this.minLength = value;
            return this;
        }

        get placeholder() {
            return this.node.placeholder;
        }

        set placeholder(value) {
            if (!this.node) {
                return;
            }
            this.node.placeholder = value;
        }

        setPlaceholder(value) {
            this.placeholder = value;
            return this;
        }

        selectText(selectionStart, selectionEnd) {
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

        selectAll() {
            this.selectText();
            return this;
        }

        get selectionStart() {
            if (!this.node) {
                return 0;
            }
            return this.node.selectionStart;
        }

        get selectionEnd() {
            if (!this.node) {
                return 0;
            }
            return this.node.selectionEnd;
        }

        get selectedText() {
            if (!this.node) {
                return '';
            }
            var node = this.node;
            return node.value.substring(node.selectionStart, node.selectionEnd);
        }

        get cursorPosition() {
            if (!this.node) {
                return 0;
            }
            return this.node.selectionStart;
        }

        set cursorPosition(value) {
            if (!this.node) {
                return;
            }
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
            if (!this.node) {
                return '';
            }
            return this.node.title;
        }

        set tooltip(value) {
            if (!this.node) {
                return this;
            }
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
            return this.nodeConfig.readOnly;
        }

        set readOnly(value) {
            this.nodeConfig.readOnly = value;

            if (this.node) {
                this.node.readOnly = value;
            }
        }

        setReadOnly(value) {
            if (value === undefined) {
                value = true;
            }
            this.readOnly = value;
            return this;
        }

        get spellCheck() {
            if (!this.node) {
                return '';
            }
            return this.node.spellcheck;
        }

        set spellCheck(value) {
            if (!this.node) {
                return;
            }
            this.node.spellcheck = value;
        }

        setSpellCheck(value) {
            this.spellCheck = value;
            return this;
        }

        get fontColor() {
            if (!this.node) {
                return undefined;
            }
            return this.node.style.color;
        }

        set fontColor(value) {
            if (!this.node) {
                return;
            }
            this.node.style.color = value;
        }

        setFontColor(value) {
            this.fontColor = value;
            return this;
        }

        setStyle(key, value) {
            if (!this.node) {
                return this;
            }
            this.node.style[key] = value;
            return this;
        }

        getStyle(key) {
            if (!this.node) {
                return undefined;
            }
            return this.node.style[key];
        }

        scrollToBottom() {
            if (!this.node) {
                return this;
            }
            this.node.scrollTop = this.node.scrollHeight;
            return this;
        }

        setEnabled(enabled) {
            if (!this.node) {
                return this;
            }
            if (enabled === undefined) {
                enabled = true;
            }
            this.node.disabled = !enabled;
            return this;
        }

        setBlur() {
            if (!this.node) {
                return this;
            }
            this.node.blur();
            return this;
        }

        setFocus() {
            if (!this.node) {
                return this;
            }
            this.node.focus();
            return this;
        }

        get isFocused() {
            return this.isOpened;
        }
    }

    Object.assign(
        HiddenTextEditBase.prototype,
        Methods,
    );

    var NumberInputUpdateCallback = function (text, textObject, hiddenInputText) {
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

    var GetTickDelta = function (game) {
        return GetGame(game).loop.delta;
    };

    const GetValue = Phaser.Utils.Objects.GetValue;
    const Wrap = Phaser.Math.Wrap;

    class HiddenTextEdit extends HiddenTextEditBase {
        constructor(gameObject, config) {
            if (config === undefined) {
                config = {};
            }

            if (config.onUpdate === 'number') {
                config.onUpdate = NumberInputUpdateCallback;
            }

            super(gameObject, config);
            // this.parent = gameObject;

            this.setCursor(GetValue(config, 'cursor', '|'));
            this.setCursorFlashDuration(GetValue(config, 'cursorFlashDuration', 1000));
            this.cursorFlashTimer = 0;

        }

        initText() {
            this.cursorFlashTimer = 0;
            this.prevCursorPosition = undefined;
            this.setText(this.parent.text);
            this.setCursorPosition();

            return this;
        }

        updateText() {
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

        setCursor(s) {
            this._cursor = s;
            this.hasCursor = s && (s !== '');
            return s;
        }

        setCursorFlashDuration(duration) {
            this.cursorFlashDuration = duration;
            return this;
        }

        get cursor() {
            if (!this._isFocused) {
                return this._cursor;
            }

            // Flash Cursor
            var cursor;
            if (this.cursorFlashTimer < (this.cursorFlashDuration / 2)) {
                cursor = this._cursor;
            } else {
                cursor = ' ';
            }

            var timerValue = this.cursorFlashTimer + GetTickDelta(this.scene);
            this.cursorFlashTimer = Wrap(timerValue, 0, this.cursorFlashDuration);
            return cursor;
        }

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

    class HiddenInputTextPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(textObject, config) {
            return new HiddenTextEdit(textObject, config);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.HiddenInputText', HiddenTextEdit);

    return HiddenInputTextPlugin;

}));
