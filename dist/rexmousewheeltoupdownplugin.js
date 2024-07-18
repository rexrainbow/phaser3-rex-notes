(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexmousewheeltoupdownplugin = factory());
})(this, (function () { 'use strict';

    const Key = Phaser.Input.Keyboard.Key;
    const KeyCodes = Phaser.Input.Keyboard.KeyCodes;
    const KeyNames = ['up', 'down', 'left', 'right'];

    class CursorKeys {
        constructor(scene) {
            // scene: scene instance, or undefined
            this.scene = scene;

            this.keys = {};
            this.cursorKeys = {};
            this.noKeyDown = true;

            for (var i = 0, cnt = KeyNames.length; i < cnt; i++) {
                var keyName = KeyNames[i];
                this.addKey(keyName);
                this.cursorKeys[keyName] = this.keys[keyName];
            }

        }

        shutdown(fromScene) {
            this.scene = undefined;
            for (var key in this.keys) {
                this.keys[key].destroy();
            }
            this.keys = undefined;
            this.cursorKeys = undefined;
        }

        destroy(fromScene) {
            shutdown(fromScene);
        }

        createCursorKeys() {
            return this.cursorKeys;
        }

        setKeyState(keyName, isDown) {
            var key = this.keys[keyName];

            if (!key.enabled) {
                return this;
            }
            if (isDown) {
                this.noKeyDown = false;
            }

            if (key.isDown !== isDown) {
                FakeEvent.timeStamp = Date.now();
                FakeEvent.keyCode = key.keyCode;
                if (isDown) {
                    key.onDown(FakeEvent);
                } else {
                    key.onUp(FakeEvent);
                }
            }

            return this;
        }

        clearAllKeysState() {
            this.noKeyDown = true;
            for (var keyName in this.keys) {
                this.setKeyState(keyName, false);
            }
            return this;
        }

        getKeyState(keyName) {
            return this.keys[keyName];
        }

        get upKeyDown() {
            return this.keys.up.isDown;
        }

        get downKeyDown() {
            return this.keys.down.isDown;
        }

        get leftKeyDown() {
            return this.keys.left.isDown;
        }

        get rightKeyDown() {
            return this.keys.right.isDown;
        }

        get anyKeyDown() {
            return !this.noKeyDown;
        }

        addKey(keyName, keyCode) {
            if (keyCode === undefined) {
                keyCode = keyName;
            }

            if (typeof (keyCode) === 'string') {
                keyCode = keyCode.toUpperCase();
                if (KeyCodes.hasOwnProperty(keyCode)) {
                    keyCode = KeyCodes[keyCode];
                }
            }

            this.keys[keyName] = new Key(this.scene, keyCode);
            return this;
        }

        addKeys(keyNames) {
            for (var i = 0, cnt = keyNames.length; i < cnt; i++) {
                this.addKey(keyNames[i]);
            }
            return this;
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

    class MouseWheelToUpDown extends CursorKeys {
        constructor(scene, config) {
            super(scene);

            this.scene = scene;
            this.boot();
        }

        boot() {
            this.scene.input.on('wheel', this.onWheeling, this);
            this.scene.sys.events.on('postupdate', this.clearAllKeysState, this);
            this.scene.sys.events.once('shutdown', this.destroy, this);
        }

        shutdown() {
            if (!this.scene) {
                return
            }

            this.scene.input.off('wheel', this.onWheeling, this);
            this.scene.sys.events.off('postupdate', this.clearAllKeysState, this);
            this.scene.sys.events.off('shutdown', this.destroy, this);
            this.scene = undefined;

            super.shutdown();
        }

        destroy() {
            this.shutdown();
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
            }
            if (!e) {
                this.clearAllKeysState();
            }
            this._enable = e;
            return this;
        }

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }

            this.enable = e;
            return this;
        }

        toggleEnable() {
            this.setEnable(!this.enable);
            return this;
        }

        onWheeling(pointer, currentlyOver, dx, dy, dz, event) {
            if (!this.enable) {
                return;
            }
            this.setKeyState('up', dy < 0);
            this.setKeyState('down', dy > 0);
        }

        get up() {
            return this.upKeyDown;
        }

        get down() {
            return this.downKeyDown;
        }

        get noKey() {
            return this.noKeyDown;
        }
    }

    class MouseWheelToUpDownPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(scene, config) {
            return new MouseWheelToUpDown(scene, config);
        }

    }

    return MouseWheelToUpDownPlugin;

}));
