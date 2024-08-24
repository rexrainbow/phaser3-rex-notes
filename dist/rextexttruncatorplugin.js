(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextexttruncatorplugin = factory());
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

    var SetTextMethods = {
        setText(value) {
            this._text = GetString(value);

            this.updateText();

            return this;
        },

        appendText(value) {
            this.setText(this.text + GetString(value));

            return this;
        }

    };

    var GetPlainText = function (textObject, text) {
        if (textObject.getPlainText) {
            text = textObject.getPlainText(text);
        }

        return text;
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

    var UpdateText = function () {
        var gameObject = this.parent;

        if (!this.enable) {
            gameObject.setText(this.text);
            return;
        }

        var hasFixedSize = gameObject.style &&
            ((gameObject.style.fixedWidth !== 0) || (gameObject.style.fixedHeight !== 0));
        var fixedWidthSave, fixedHeightSave;
        if (hasFixedSize) {
            fixedWidthSave = gameObject.style.fixedWidth;
            fixedHeightSave = gameObject.style.fixedHeight;
            gameObject.setFixedSize(0, 0);
        }

        var maxWidth = this.maxWidth;
        if (maxWidth === undefined) {
            maxWidth = fixedWidthSave;
        }

        var maxHeight = this.maxHeight;
        if (maxHeight === undefined) {
            maxHeight = fixedHeightSave;
        }

        // If size is smaller than target size, don't truncate
        gameObject.setText(this.text);
        if (ValidGameObjectSize(gameObject, maxWidth, maxHeight)) {
            if (hasFixedSize) {
                gameObject.setFixedSize(fixedWidthSave, fixedHeightSave);
            }
            return;
        }

        // Add character one-by-one, with truncate-symbol and test the text size
        var textLength = GetPlainText(gameObject, this.text).length;
        var text, perText = '';
        for (var i = 0; i < textLength; i++) {
            text = GetSubString(gameObject, this.text, 0, i) + this.symbol;
            gameObject.setText(text);

            if (!ValidGameObjectSize(gameObject, maxWidth, maxHeight)) {
                if (hasFixedSize) {
                    gameObject.style.fixedWidth = fixedWidthSave;
                    gameObject.style.fixedHeight = fixedHeightSave;
                }
                gameObject.setText(perText);
                return;
            }

            perText = text;
        }

    };

    var ValidGameObjectSize = function (gameObject, width, height) {
        if (!height) {
            return gameObject.width <= width;
        } else {
            return gameObject.height <= height;
        }
    };

    var Methods = {
        updateText: UpdateText,
    };

    Object.assign(
        Methods,
        SetTextMethods,
    );

    const GetValue = Phaser.Utils.Objects.GetValue;

    class TextTruncator extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this._text = undefined;

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setEnable(GetValue(o, 'enable', true));
            this.setSymbol(GetValue(o, 'symbol', '...'));
            this.setMaxWidth(GetValue(o, 'maxWidth'));
            this.setMaxHeight(GetValue(o, 'maxHeight'));
            this.setText(GetValue(o, 'text'));
        }

        setEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.enable = enable;
            return this;
        }

        setSymbol(symbol) {
            this.symbol = symbol;
            return this;
        }

        setMaxWidth(width) {
            this.maxWidth = width;
            return this;
        }

        setMaxHeight(height) {
            this.maxHeight = height;
            return this;
        }

        set text(value) {
            this.setText(value);
        }

        get text() {
            return this._text;
        }

    }

    Object.assign(
        TextTruncator.prototype,
        Methods
    );

    class TextPagePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new TextTruncator(gameObject, config);
        }

    }

    return TextPagePlugin;

}));
