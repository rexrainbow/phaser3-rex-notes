(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcursoratboundsplugin = factory());
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

    const CameraClass = Phaser.Cameras.Scene2D.BaseCamera;

    var IsCameraObject = function (object) {
        return (object instanceof CameraClass);
    };

    const Rectangle = Phaser.Geom.Rectangle;

    var GetViewport = function (scene, camera, out) {
        if (!IsCameraObject(camera)) {
            out = camera;
            camera = undefined;
        }

        if (out === undefined) {
            out = new Rectangle();
        } else if (out === true) {
            out = globRect;
        }

        if (camera) {
            return scene.scale.getViewPort(camera, out);
        } else {
            return scene.scale.getViewPort(out);
        }
    };

    var globRect = new Rectangle();

    const GetValue = Phaser.Utils.Objects.GetValue;

    class CursorAtBounds extends CursorKeys {
        constructor(scene, config) {
            super(scene);

            this.scene = scene;

            this._enable = undefined;
            this.setEnable(GetValue(config, 'enable', true));

            this.setSensitiveDistance(GetValue(config, 'sensitiveDistance', 20));

            var bounds = GetValue(config, 'bounds', undefined);
            if (bounds === undefined) {
                bounds = GetViewport(scene);
                this.autoUpdateViewportBounds = true;
            } else {
                this.autoUpdateViewportBounds = false;
            }
            this.setBounds(bounds);

            this.pointerOutGameReleaseEnable = GetValue(config, 'pointerOutGameRelease', true);
            this.pointerOutBoundsReleaseEnable = GetValue(config, 'pointerOutBoundsRelease', false);

            this.boot();
        }

        boot() {
            this.scene.input.on('pointermove', this.onPointerMove, this);

            if (this.pointerOutGameReleaseEnable) {
                this.scene.input.on('gameout', this.clearAllKeysState, this);
            }

            if (this.autoUpdateViewportBounds) {
                this.scene.scale.on('resize', this.updateBoundsByViewport, this);
            }

            this.scene.sys.events.once('shutdown', this.destroy, this);
        }

        shutdown() {
            if (!this.scene) {
                return;
            }

            this.scene.input.off('pointermove', this.onPointerMove, this);

            if (this.pointerOutGameReleaseEnable) {
                this.scene.input.off('gameout', this.clearAllKeysState, this);
            }

            if (this.autoUpdateViewportBounds) {
                this.scene.scale.off('resize', this.updateBoundsByViewport, this);
            }

            this.scene.sys.events.off('shutdown', this.destroy, this);

            this.scene = undefined;

            super.shutdown();
        }

        destroy() {
            this.shutdown();
        }

        updateBoundsByViewport() {
            GetViewport(this.scene, this.bounds);
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

        setBounds(bounds) {
            this.bounds = bounds;
            return this;
        }

        getBounds() {
            return this.bounds;
        }

        setSensitiveDistance(distance) {
            this.sensitiveDistance = distance;
            return this;
        }

        onPointerMove(pointer) {
            if (!this.enable) {
                return;
            }

            var cursorX = pointer.x,
                cursorY = pointer.y;
            var left = this.bounds.left,
                right = this.bounds.right,
                top = this.bounds.top,
                bottom = this.bounds.bottom,
                sensitiveDistance = this.sensitiveDistance;
            var pressLeftKey = (cursorX >= left) && (cursorX <= (left + sensitiveDistance)),
                pressRightKey = (cursorX <= right) && (cursorX >= (right - sensitiveDistance)),
                pressUpKey = (cursorY >= top) && (cursorY <= (top + sensitiveDistance)),
                pressDownKey = (cursorY <= bottom) && (cursorY >= (bottom - sensitiveDistance));

            if (!this.pointerOutBoundsReleaseEnable) {
                pressLeftKey |= (cursorX < left);
                pressRightKey |= (cursorX > right);
                pressUpKey |= (cursorY < top);
                pressDownKey |= (cursorY > bottom);
            }

            this.setKeyState('left', pressLeftKey);
            this.setKeyState('right', pressRightKey);
            this.setKeyState('up', pressUpKey);
            this.setKeyState('down', pressDownKey);
        }

        get up() {
            return this.upKeyDown;
        }

        get down() {
            return this.downKeyDown;
        }

        get left() {
            return this.leftKeyDown;
        }

        get right() {
            return this.rightKeyDown;
        }

        get noKey() {
            return this.noKeyDown;
        }
    }

    class CursorAtBoundsPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(scene, config) {
            return new CursorAtBounds(scene, config);
        }

    }

    return CursorAtBoundsPlugin;

}));
