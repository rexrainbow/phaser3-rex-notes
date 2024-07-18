(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexkeyshubplugin = factory());
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

    // KeyCodes : Key (string) to KeyCode (number)
    const KeyCodes$1 = Phaser.Input.Keyboard.KeyCodes;

    var KeyMap = {};
    for (var key in KeyCodes$1) {
        KeyMap[KeyCodes$1[key]] = key;
    }

    const Key = Phaser.Input.Keyboard.Key;
    const AddItem = Phaser.Utils.Array.Add;
    const RemoveItem = Phaser.Utils.Array.Remove;

    class KeyHub extends Key {
        constructor(parent, keyCode) {
            super(parent, keyCode);

            this.ports = [];
        }

        destroy() {
            this.unplugAllKeyObject();
            this.ports = undefined;
            super.destroy();
        }

        plugKeyObject(keyObject) {
            if (keyObject.refKeyHub) {
                keyObject.refKeyHub.unplugKeyObject(keyObject);
            }

            AddItem(this.ports, keyObject, 0, function (keyObject) {
                keyObject
                    .on('down', this.update, this)
                    .on('up', this.update, this);

                keyObject.refKeyHub = this;

                this.update(FakeEvent);

                this.plugin.emit('plug', this.key, keyObject);
            }, this);

            return this;
        }

        unplugKeyObject(keyObject) {
            if (keyObject.refKeyHub !== this) {
                return this;
            }

            RemoveItem(this.ports, keyObject, function (keyObject) {
                keyObject
                    .off('down', this.update, this)
                    .off('up', this.update, this);

                keyObject.refKeyHub = undefined;

                this.update(FakeEvent);

                this.plugin.emit('unplug', this.key, keyObject);
            }, this);

            return this;
        }

        unplugAllKeyObject() {
            for (var i = 0, cnt = this.ports; i < cnt; i++) {
                var keyObject = this.ports[i];
                keyObject
                    .off('down', this.update, this)
                    .off('up', this.update, this);

                keyObject.refKeyHub = undefined;
            }

            this.ports.length = 0;

            this.update(FakeEvent);

            return this;
        }

        getKeyObjects() {
            return this.ports;
        }

        update(event) {
            //  Override the default functions (it's too late for the browser to use them anyway, so we may as well)
            if (event.cancelled === undefined) {
                //  Event allowed to flow across all handlers in this Scene, and any other Scene in the Scene list
                event.cancelled = 0;

                //  Won't reach any more local (Scene level) handlers
                event.stopImmediatePropagation = function () {
                    event.cancelled = 1;
                };

                //  Won't reach any more handlers in any Scene further down the Scene list
                event.stopPropagation = function () {
                    event.cancelled = -1;
                };
            }

            if (event.cancelled === -1) {
                //  This event has been stopped from broadcasting to any other Scene, so abort.
                event.cancelled = 0;
                return;
            }

            var isDown = false;
            for (var i = 0, cnt = this.ports.length; i < cnt; i++) {
                if (this.ports[i].isDown) {
                    isDown = true;
                    break;
                }
            }

            if (this.isDown !== isDown) {
                event = FakeEvent;
                event.timeStamp = Date.now();
                event.keyCode = this.keyCode;

                if (isDown) {
                    this.onDown(event);
                } else {
                    this.onUp(event);
                }

                if (!event.cancelled) {
                    var eventName = ((isDown) ? 'keydown-' : 'keyup-') + KeyMap[this.keyCode];
                    this.plugin.emit(eventName, event);
                }

                if (!event.cancelled) {
                    var eventName = (isDown) ? 'keydown' : 'keyup';
                    this.plugin.emit(eventName, event);
                }
            }

            event.cancelled = 0;
        }
    }

    var FakeEvent = {
        timeStamp: 0,
        keyCode: 0,
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
        metaKey: false,
        location: 0,
    };

    var EventKeyCodeToP3Key = function (event) {
        var code = event.code.toUpperCase();

        if (code in KeyCodeMap) {
            return KeyCodeMap[code];
        }

        if (code.startsWith('KEY')) {
            code = code.substring('KEY'.length);
            return code;
        }
        if (code.startsWith('ARROW')) {
            code = code.substring('ARROW'.length);
            return code;
        }
        if (code.startsWith('DIGIT')) {
            code = code.substring('DIGIT'.length);
            code = KeyCodeMap[code];
            return code;
        }
        if (code.startsWith('NUMPAD')) {
            code = code.substring('NUMPAD'.length);
            if (code in KeyCodeMap) {
                code = KeyCodeMap[code];
            }
            return `NUMPAD_${code}`
        }
        if (code.startsWith('SHIFT')) {
            return 'SHIFT';
        }
        if (code.startsWith('CONTROL')) {
            return 'CTRL';
        }
        if (code.startsWith('ALT')) {
            return 'ALT';
        }

        return code;
    };

    const KeyCodeMap = {
        '0': 'ZERO', '1': 'ONE', '2': 'TWO', '3': 'THREE', '4': 'FOUR',
        '5': 'FIVE', '6': 'SIX', '7': 'SEVEN', '8': 'EIGHT', '9': 'NINE',

        'CAPSLOCK': 'CAPS_LOCK',
        'ESCAPE': 'ESC',
        'PAGEUP': 'PAGE_UP', 'PAGEDOWN': 'PAGE_DOWN',

        'QUOTE': 'QUOTES', 'BACKQUOTE': 'BACKTICK',
        'BRACKETLEFT': 'OPEN_BRACKET', 'BRACKETRIGHT': 'CLOSED_BRACKET',
        'SEMICOLON': 'COLON',
        'SLASH': 'FORWARD_SLASH', 'BACKSLASH': 'BACK_SLASH',


    };

    var DefineKeyMethods = {
        defineKeyStart(key) {
            this.defineKeyStop();
            this.defineTargetKey = key;
            this.emit('definekey.start', key);
            return this;
        },

        defineKeyStop(keyObject) {
            if (!this.defineTargetKey) {
                return this;
            }

            this.plugKeyObject(keyObject, this.defineTargetKey);

            var defineTargetKey = this.defineTargetKey;
            this.defineTargetKey = null;

            this.emit('definekey.complete', defineTargetKey, keyObject);

            return this;
        },

        defineKeyCancel() {
            if (!this.defineTargetKey) {
                return this;
            }

            this.defineTargetKey = null;

            this.emit('definekey.complete');

            return this;
        },

        listenFromKeyboard() {
            var self = this;
            var keyboardManager = this.scene.input.keyboard;

            var onKeyPress = function (event) {
                var key = EventKeyCodeToP3Key(event);
                var keyObject = keyboardManager.addKey(key);
                self.defineKeyStop(keyObject);
            };
            keyboardManager.once('keydown', onKeyPress);
            self.once('definekey.complete', function () {
                keyboardManager.off('keydown', onKeyPress);
            });

            return this;
        },
    };

    var methods = {};

    Object.assign(
        methods,
        DefineKeyMethods
    );

    const GetValue = Phaser.Utils.Objects.GetValue;
    const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

    class KeysHub extends ComponentBase {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            super(scene, config);
            // this.scene

            this.keys = {};  // Dictionary of keyHubs
            this.singleMode = GetValue(config, 'singleMode', false);
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            for (var key in this.keys) {
                this.keys[key].destroy();
            }
            this.keys = undefined;

            super.shutdown(fromScene);
        }

        plugKeyObject(keyObject, key) {
            if (!keyObject) {
                // Unplug/clear that keyHub
                if (key) {
                    var keyHub = this.addKey(key);
                    keyHub.unplugAllKeyObject();
                }
                return this;
            }

            if (!keyObject.hasOwnProperty('key')) {
                keyObject.key = KeyMap[keyObject.keyCode];
            }

            if (!key) {
                key = keyObject.key;
            }

            var keyHub = this.addKey(key);
            if (this.singleMode) {
                keyHub.unplugAllKeyObject();
            }

            keyHub.plugKeyObject(keyObject);

            return this;
        }

        plugKeyObjects(keys) {
            if (Array.isArray(keys)) {
                for (var i = 0, cnt = keys.length; i < cnt; i++) {
                    this.plugKeyObject(keys[i]);
                }
            } else {
                for (var key in keys) {
                    this.plugKeyObject(keys[key], key);
                }
            }
            return this;
        }

        unplugKeyObject(keyObject) {
            var refKeyHub = keyObject.refKeyHub;
            if (refKeyHub) {
                refKeyHub.unplugKeyObject(keyObject);
            }

            return this;
        }

        unplugKeyObjects(keys) {
            if (Array.isArray(keys)) {
                for (var i = 0, cnt = keys.length; i < cnt; i++) {
                    this.unplugKeyObjects(keys[i]);
                }
            } else {
                for (var key in keys) {
                    this.unplugKeyObjects(keys[key]);
                }
            }
            return this;
        }

        addKey(key) {
            var keyCode;
            if (typeof (key) === 'string') {
                keyCode = KeyCodes[key.toUpperCase()];
            } else {
                keyCode = key;
                key = KeyMap[keyCode];
            }
            if (!this.keys.hasOwnProperty(keyCode)) {
                var keysHub = new KeyHub(this, keyCode);
                this.keys[keyCode] = keysHub;
                keysHub.key = key;
            }
            return this.keys[keyCode];
        }

        addKeys(keys) {
            var output = {};
            if (typeof (keys) === 'string') {
                keys = keys.split(',');

                for (var i = 0, cnt = keys.length; i < cnt; i++) {
                    var key = keys[i].trim();

                    if (key) {
                        output[key] = this.addKey(key);
                    }
                }
            } else {
                for (var key in keys) {
                    output[key] = this.addKey(keys[key]);
                }
            }

            return output;
        }

        createCursorKeys() {
            return this.addKeys({
                up: KeyCodes.UP,
                down: KeyCodes.DOWN,
                left: KeyCodes.LEFT,
                right: KeyCodes.RIGHT,
                space: KeyCodes.SPACE,
                shift: KeyCodes.SHIFT
            });
        }

        getKeyObjects(key) {
            if (key === undefined) {
                var output = {};
                for (var keyCode in this.keys) {
                    var keysHub = this.keys[keyCode];
                    var keyObjects = keysHub.getKeyObjects();
                    if (this.singleMode) {
                        output[keysHub.key] = keyObjects[0];
                    } else {
                        output[keysHub.key] = keyObjects;
                    }
                }
                return output;

            } else {
                var keyObjects = this.addKey(key).getKeyObjects();
                if (this.singleMode) {
                    return keyObjects[0];
                } else {
                    return keyObjects;
                }

            }
        }
    }

    Object.assign(
        KeysHub.prototype,
        methods,
    );

    class KeysHubPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(scene, config) {
            return new KeysHub(scene, config);
        }
    }

    return KeysHubPlugin;

}));
