(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextexttypingplugin = factory());
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

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$1(config, 'eventEmitter', true));

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

    var GetString = function (value) {
        if (value == null) {
            value = '';
        } else if (Array.isArray(value)) {
            value = value.join('\n');
        } else if (typeof (value) === 'number') {
            value = value.toString();
        }
        return value;
    };

    const TextClass = Phaser.GameObjects.Text;

    var IsTextGameObject = function (gameObject) {
        return (gameObject instanceof TextClass);
    };

    const BitmapTextClass = Phaser.GameObjects.BitmapText;

    var IsBitmapTextGameObject = function (gameObject) {
        return (gameObject instanceof BitmapTextClass);
    };

    const TextType = 0;
    const TagTextType = 1;
    const BitmapTextType = 2;

    var GetTextObjectType = function (textObject) {
        var textObjectType;
        if (IsBitmapTextGameObject(textObject)) {
            textObjectType = BitmapTextType;
        } else if (IsTextGameObject(textObject)) {
            textObjectType = TextType;
        } else {
            textObjectType = TagTextType;
        }

        return textObjectType;
    };

    var SetNoWrapText = function (textObject, text) {
        var textObjectType = GetTextObjectType(textObject);
        switch (textObjectType) {
            case TextType:
                // Store wrap properties
                var style = textObject.style;
                var wordWrapWidth = style.wordWrapWidth;
                var wordWrapCallback = style.wordWrapCallback;
                // Disable wrap
                style.wordWrapWidth = 0;
                style.wordWrapCallback = undefined;
                // Set text
                textObject.setText(text);
                // Restore wrap
                style.wordWrapWidth = wordWrapWidth;
                style.wordWrapCallback = wordWrapCallback;
                break;

            case TagTextType:
                // Store wrap properties
                var style = textObject.style;
                var wrapMode = style.wrapMode;
                // Disable wrap
                style.wrapMode = 0;
                // Set text
                textObject.setText(text);
                // Restore wrap
                style.wrapMode = wrapMode;
                break;

            case BitmapTextType:
                // Store wrap properties
                var maxWidth = textObject._maxWidth;
                // Disable wrap
                textObject._maxWidth = 0;
                // Set text
                textObject.setText(text);
                // Restore wrap
                textObject._maxWidth = maxWidth;
                break;
        }
    };

    var SetTextMethods = {
        setText(text) {
            if (this.setTextCallback) {
                if (this.setTextCallbackScope) {
                    text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIndex);
                } else {
                    text = this.setTextCallback(text, this.isLastChar, this.insertIndex);
                }
            }

            if (this.textWrapEnable) {
                SetNoWrapText(this.parent, text);
            } else {
                this.parent.setText(text);
            }
        },

        appendText(text) {
            var newText = this.text.concat(GetString(text));
            if (this.isTyping) {
                this.setTypingContent(newText);
            } else {
                this.start(newText, undefined, this.textLength);
            }

            return this;
        }

    };

    var StartTyping = function (text, speed, startIndex, timerStartAt) {
        if (text !== undefined) {
            this.setTypingContent(text);
        }
        if (speed !== undefined) {
            this.speed = speed;
        }
        if (startIndex === undefined) {
            startIndex = 0;
        }

        this.typingIndex = startIndex + 1;
        if (this.speed === 0) {
            this.stop(true);
        } else {
            this.setText('');
            this.startTimer(timerStartAt);
        }

        return this;
    };

    var GetPlainText = function (textObject, text) {
        if (textObject.getPlainText) {
            text = textObject.getPlainText(text);
        }

        return text;
    };

    var StartTypingFromLine = function (text, lineIndex, speed, offsetIndex, timerStartAt) {
        var startIdx;
        if (lineIndex > 0) {
            if (offsetIndex === undefined) {
                offsetIndex = 0;
            }

            var plainText = GetPlainText(this.parent, text);
            startIdx = GetNewLineIndex(plainText, lineIndex) + offsetIndex;
        }
        return this.start(text, speed, startIdx, timerStartAt);
    };

    var GetNewLineIndex = function (s, n) {
        var index = undefined;
        for (var i = 0; i < n; i++) {
            index = s.indexOf('\n', index + 1);
            if (index === -1) {
                break;
            }
        }
        return index;
    };

    var GetSubString = function (textObject, text, startIdx, endIdx) {
        var result;
        if (textObject.getSubString) {
            result = textObject.getSubString(text, startIdx, endIdx);
        } else {
            result = text.slice(startIdx, endIdx);
        }

        return result;
    };

    var GetTypingString = function (text, typeIdx, textLength, typeMode) {
        var textObject = this.parent;
        var result;
        if (typeMode === 0) { //left-to-right
            var startIdx = 0;
            var endIdx = typeIdx;
            this.insertIndex = endIdx;
            result = GetSubString(textObject, text, startIdx, endIdx);

        } else if (typeMode === 1) { //right-to-left
            var endIdx = textLength;
            var startIdx = endIdx - typeIdx;
            this.insertIndex = 0;
            result = GetSubString(textObject, text, startIdx, endIdx);

        } else if (typeMode === 2) { //middle-to-sides
            var midIdx = textLength / 2;
            var startIdx = Math.floor(midIdx - (typeIdx / 2));
            var endIdx = startIdx + typeIdx;
            this.insertIndex = (typeIdx % 2) ? typeIdx : 0;
            result = GetSubString(textObject, text, startIdx, endIdx);

        } else if (typeMode === 3) { //sides-to-middle
            var lowerLen = Math.floor(typeIdx / 2);
            var lowerResult;
            if (lowerLen > 0) {
                var endIdx = textLength;
                var startIdx = endIdx - lowerLen;
                lowerResult = GetSubString(textObject, text, startIdx, endIdx);
            } else {
                lowerResult = "";
            }

            var upperLen = typeIdx - lowerLen;
            var upperResult;
            if (upperLen > 0) {
                var startIdx = 0;
                var endIdx = startIdx + upperLen;
                this.insertIndex = endIdx;
                upperResult = GetSubString(textObject, text, startIdx, endIdx);
            } else {
                upperResult = "";
                this.insertIndex = 0;
            }
            result = upperResult + lowerResult;
        }

        this.insertChar = result.charAt(this.insertIndex - 1);

        return result;
    };

    var StopTyping = function (showAllText) {
        var timer = this.getTimer();
        if (timer) {
            this.freeTimer();
        }
        if (showAllText) {
            // Fire 'type' event for remainder characters until lastChar
            while (!this.isLastChar) {
                GetTypingString.call(this, this.text, this.typingIndex, this.textLength, this.typeMode);
                this.emit('typechar', this.insertChar);
                this.typingIndex++;
            }
            // Display all characters on text game object
            this.setText(this.text);
            this.emit('type');
            this.emit('complete', this, this.parent);
        }

        return this;
    };

    var PauseTyping = function () {
        var timer = this.getTimer();
        if (timer) {
            timer.paused = true;
        }
        return this;
    };

    var ResumeTyping = function () {
        var timer = this.getTimer();
        if (timer) {
            timer.paused = false;
        }
        return this;
    };

    var methods = {
        start: StartTyping,
        startFromLine: StartTypingFromLine,
        stop: StopTyping,
        pause: PauseTyping,
        resumeTyping: ResumeTyping,
    };

    Object.assign(
        methods,
        SetTextMethods
    );

    var GetWrapText = function (textObject, text) {
        var textObjectType = GetTextObjectType(textObject);
        switch (textObjectType) {
            case TextType:
                textObject.style.syncFont(textObject.canvas, textObject.context);
                text = textObject.runWordWrap(text);
                break;
            case TagTextType:
                text = textObject.getText(text, undefined, undefined, true);
                break;
            case BitmapTextType:
                text = textObject.setText(text).getTextBounds().wrappedText;
                break;
        }
        return text;
    };

    const GetFastValue = Phaser.Utils.Objects.GetFastValue;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class TextTyping extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this.timer = null;
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setTextWrapEnable(GetValue(o, 'wrap', false));
            this.setTypeMode(GetValue(o, 'typeMode', 0));
            this.setTypingSpeed(GetValue(o, 'speed', 333));
            this.setTextCallback = GetFastValue(o, 'setTextCallback', null);
            this.setTextCallbackScope = GetFastValue(o, 'setTextCallbackScope', null);

            this.setTypingContent(GetFastValue(o, 'text', ''));
            this.typingIndex = GetFastValue(o, 'typingIndex', 0);
            this.insertIndex = null;
            this.insertChar = null;

            var elapsed = GetFastValue(o, 'elapsed', null);
            if (elapsed !== null) {
                this.start(undefined, undefined, this.typingIndex, elapsed);
            }

            return this;
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.freeTimer();

            super.shutdown(fromScene);
        }

        setTypeMode(m) {
            if (typeof (m) === 'string') {
                m = TYPEMODE[m];
            }
            this.typeMode = m;
            return this;
        }

        setTypeSpeed(speed) {
            this.speed = speed;
            return this;
        }

        setTypingSpeed(speed) {
            this.speed = speed;
            return this;
        }

        setTextWrapEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.textWrapEnable = enable;
            return this;
        }

        set text(value) {
            var text = GetString(value);
            if (this.textWrapEnable) {
                text = GetWrapText(this.parent, text);
            }

            this._text = text;
        }

        get text() {
            return this._text;
        }

        get isTyping() {
            return (this.getTimer() !== null);
        }

        get isLastChar() {
            return (this.typingIndex === this.textLength);
        }

        setTypingContent(text) {
            this.text = text;
            this.textLength = GetPlainText(this.parent, this.text).length;
            return this;
        }

        onTyping() {
            var newText = GetTypingString.call(this, this.text, this.typingIndex, this.textLength, this.typeMode);

            this.setText(newText);

            this.emit('typechar', this.insertChar);
            this.emit('type');

            if (this.isLastChar) {
                this.freeTimer();
                // Fire 'complete' next tick, to render last character on screen
                this.scene.sys.events.once('preupdate', function () {
                    this.emit('complete', this, this.parent);
                }, this);
            } else {
                this.timer.delay = this.speed; // delay of next typing            
                this.typingIndex++;
            }
        }

        startTimer(timerStartAt) {
            if (this.timer) {
                this.freeTimer();
            }
            var startAt;
            if (timerStartAt === undefined) {
                startAt = 0;
            } else {
                this.speed;
                startAt = timerStartAt;
            }

            this.timer = this.scene.time.addEvent({
                delay: 0.0001,
                startAt: startAt,
                loop: true,
                callback: this.onTyping,
                callbackScope: this
            });
            // Note: Throw error message if delay is 0 with repeat/loop

            return this;
        }

        getTimer() {
            return this.timer;
        }

        freeTimer() {
            if (this.timer) {
                this.timer.remove();
                this.timer = null;
            }

            return this;
        }

        setText(text) {
            if (this.setTextCallback) {
                if (this.setTextCallbackScope) {
                    text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIndex);
                } else {
                    text = this.setTextCallback(text, this.isLastChar, this.insertIndex);
                }
            }

            if (this.textWrapEnable) {
                SetNoWrapText(this.parent, text);
            } else {
                this.parent.setText(text);
            }
        }
    }

    const TYPEMODE = {
        'left-to-right': 0,
        'right-to-left': 1,
        'middle-to-sides': 2,
        'sides-to-middle': 3
    };

    Object.assign(
        TextTyping.prototype,
        methods
    );

    class TextTypingPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new TextTyping(gameObject, config);
        }

    }

    return TextTypingPlugin;

}));
