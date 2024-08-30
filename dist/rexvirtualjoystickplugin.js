(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexvirtualjoystickplugin = factory());
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

    /**
     * @author       Richard Davey <rich@photonstorm.com>
     * @copyright    2018 Photon Storm Ltd.
     * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
     */

    var RAD_TO_DEG = 180 / Math.PI;

    /**
     * Convert the given angle in radians, to the equivalent angle in degrees.
     *
     * @function Phaser.Math.RadToDeg
     * @since 3.0.0
     *
     * @param {number} radians - The angle in radians to convert ot degrees.
     *
     * @return {integer} The given angle converted to degrees.
     */
    var RadToDeg = function (radians)
    {
        return radians * RAD_TO_DEG;
    };

    var DIRMODE = {
        'up&down': 0,
        'left&right': 1,
        '4dir': 2,
        '8dir': 3
    };

    var AngleToDirections = function (angle, dirMode, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globOut;
        }

        out.left = false;
        out.right = false;
        out.up = false;
        out.down = false;

        angle = (angle + 360) % 360;
        switch (dirMode) {
            case 0: // up & down
                if (angle < 180) {
                    out.down = true;
                } else {
                    out.up = true;
                }
                break;

            case 1: // left & right
                if ((angle > 90) && (angle <= 270)) {
                    out.left = true;
                } else {
                    out.right = true;
                }
                break;

            case 2: // 4 dir
                if ((angle > 45) && (angle <= 135)) {
                    out.down = true;
                } else if ((angle > 135) && (angle <= 225)) {
                    out.left = true;
                } else if ((angle > 225) && (angle <= 315)) {
                    out.up = true;
                } else {
                    out.right = true;
                }
                break;

            case 3: // 8 dir
                if ((angle > 22.5) && (angle <= 67.5)) {
                    out.down = true;
                    out.right = true;
                } else if ((angle > 67.5) && (angle <= 112.5)) {
                    out.down = true;
                } else if ((angle > 112.5) && (angle <= 157.5)) {
                    out.down = true;
                    out.left = true;
                } else if ((angle > 157.5) && (angle <= 202.5)) {
                    out.left = true;
                } else if ((angle > 202.5) && (angle <= 247.5)) {
                    out.left = true;
                    out.up = true;
                } else if ((angle > 247.5) && (angle <= 292.5)) {
                    out.up = true;
                } else if ((angle > 292.5) && (angle <= 337.5)) {
                    out.up = true;
                    out.right = true;
                } else {
                    out.right = true;
                }
                break;
        }

        return out;
    };

    var globOut = {};

    const GetValue$2 = Phaser.Utils.Objects.GetValue;
    const GetDist = Phaser.Math.Distance.Between;
    const GetAngle = Phaser.Math.Angle.Between;

    class VectorToCursorKeys extends CursorKeys {
        constructor(scene, config) {
            super(scene);
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            if (this.start == undefined) {
                this.start = { x: 0, y: 0 };
            }
            if (this.end == undefined) {
                this.end = { x: 0, y: 0 };
            }
            this._enable = undefined;
            this.setEnable(GetValue$2(o, 'enable', true));
            this.setMode(GetValue$2(o, 'dir', '8dir'));
            this.setDistanceThreshold(GetValue$2(o, 'forceMin', 16));

            var startX = GetValue$2(o, "start.x", null);
            var startY = GetValue$2(o, "start.y", null);
            var endX = GetValue$2(o, "end.x", null);
            var endY = GetValue$2(o, "end.y", null);
            this.setVector(startX, startY, endX, endY);
            return this;
        }

        toJSON() {
            return {
                enable: this.enable,
                dir: this.dirMode,
                forceMin: this.forceMin,

                start: {
                    x: this.start.x,
                    y: this.start.y
                },
                end: {
                    x: this.end.x,
                    y: this.end.y
                }
            };
        }

        setMode(m) {
            if (typeof (m) === 'string') {
                m = DIRMODE[m];
            }
            this.dirMode = m;
            return this;
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
            }
            if (!e) {
                this.clearVector();
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

        setDistanceThreshold(d) {
            if (d < 0) {
                d = 0;
            }
            this.forceMin = d;
            return this;
        }

        clearVector() {
            this.start.x = 0;
            this.start.y = 0;
            this.end.x = 0;
            this.end.y = 0;
            this.clearAllKeysState();
            return this;
        }

        setVector(x0, y0, x1, y1) {
            if (!this.enable) {
                // Do nothing
                return this;
            }

            if (x0 === null) {
                // Clear all keys' state
                this.clearVector();
                return this;
            }

            // (0,0) -> (x0, y0)
            if (x1 === undefined) {
                x1 = x0;
                x0 = 0;
                y1 = y0;
                y0 = 0;
            }

            this.start.x = x0;
            this.start.y = y0;
            this.end.x = x1;
            this.end.y = y1;

            if ((this.forceMin > 0) && (this.force < this.forceMin)) {
                // No key pressed
                this.clearVector();
                return this;
            }

            // Update keys' state
            this.noKeyDown = true;
            var dirStates = AngleToDirections(this.angle, this.dirMode, true);
            for (var dir in dirStates) {
                this.setKeyState(dir, dirStates[dir]);
            }

            return this;
        }

        get forceX() {
            return this.end.x - this.start.x;
        }

        get forceY() {
            return this.end.y - this.start.y;
        }

        get force() {
            return GetDist(this.start.x, this.start.y, this.end.x, this.end.y);
        }

        get rotation() {
            return GetAngle(this.start.x, this.start.y, this.end.x, this.end.y);
        }

        get angle() {
            return RadToDeg(this.rotation); // -180 ~ 180
        }

        get octant() {
            var octant = 0;
            if (this.rightKeyDown) {
                octant = (this.downKeyDown) ? 45 : 0;
            } else if (this.downKeyDown) {
                octant = (this.leftKeyDown) ? 135 : 90;
            } else if (this.leftKeyDown) {
                octant = (this.upKeyDown) ? 225 : 180;
            } else if (this.upKeyDown) {
                octant = (this.rightKeyDown) ? 315 : 270;
            }
            return octant;
        }
    }

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

    var GetPointerWorldXY = function (pointer, targetCamera, out) {
        var camera = pointer.camera;
        if (!camera) {
            return null;
        }

        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globalOut;
        }

        if (camera === targetCamera) {
            out.x = pointer.worldX;
            out.y = pointer.worldY;
        } else {
            camera.getWorldPoint(pointer.x, pointer.y, out);
        }

        return out;
    };

    var globalOut = {};

    const GetValue$1 = Phaser.Utils.Objects.GetValue;
    const CircleClass = Phaser.Geom.Circle;
    const CircleContains = Phaser.Geom.Circle.Contains;

    class TouchCursor extends VectorToCursorKeys {
        constructor(gameObject, config) {
            var scene = gameObject.scene;
            super(scene, config);
            //this.resetFromJSON(config); // this function had been called in super(config)

            // Event emitter
            var eventEmitter = GetValue$1(config, 'eventEmitter', undefined);
            var EventEmitterClass = GetValue$1(config, 'EventEmitterClass', undefined);
            this.setEventEmitter(eventEmitter, EventEmitterClass);

            this.scene = scene;
            this.mainCamera = scene.sys.cameras.main;
            this.pointer = undefined;
            this.gameObject = gameObject;
            this.radius = GetValue$1(config, 'radius', 100);

            gameObject.setInteractive(new CircleClass(gameObject.displayOriginX, gameObject.displayOriginY, this.radius), CircleContains);

            this.boot();
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);
            this.pointer = undefined;

            return this;
        }

        toJSON() {
            var o = super.toJSON();
            o.radius = this.radius;

            return o;
        }

        boot() {
            this.gameObject.on('pointerdown', this.onKeyDownStart, this);
            this.gameObject.on('pointerover', this.onKeyDownStart, this);

            this.scene.input.on('pointermove', this.onKeyDown, this);
            this.scene.input.on('pointerup', this.onKeyUp, this);

            this.gameObject.once('destroy', this.onParentDestroy, this);
        }

        shutdown(fromScene) {
            if (!this.scene) {
                return;
            }

            // gameObject events will be removed when this gameObject destroyed 
            // this.gameObject.off('pointerdown', this.onKeyDownStart, this);
            // this.gameObject.off('pointerover', this.onKeyDownStart, this);

            this.scene.input.off('pointermove', this.onKeyDown, this);
            this.scene.input.off('pointerup', this.onKeyUp, this);

            this.destroyEventEmitter();

            this.scene = undefined;
            this.mainCamera = undefined;
            this.pointer = undefined;
            this.gameObject = undefined;

            super.shutdown();
        }

        get enable() {
            return this._enable;
        }

        // Override setter of enable
        set enable(e) {
            if (this._enable === e) {
                return;
            }
            if (!e) {
                this.pointer = undefined; // Release pointer
            }
            super.enable = e;
            return this;
        }

        destroy(fromScene) {
            this.shutdown(fromScene);
        }

        onParentDestroy(parent, fromScene) {
            this.destroy(fromScene);
        }

        onKeyDownStart(pointer) {
            if ((!pointer.isDown) ||
                (this.pointer !== undefined)) {
                return;
            }
            this.pointer = pointer;
            this.onKeyDown(pointer);
            this.emit('pointerdown', pointer);
        }

        onKeyDown(pointer) {
            if (this.pointer !== pointer) {
                return;
            }

            var worldXY = GetPointerWorldXY(pointer, this.mainCamera, true);
            if (!worldXY) {
                // Pointer is outside of any camera, no worldX/worldY available
                return;
            }

            // Vector of world position
            var camera = pointer.camera;
            var gameObject = this.gameObject;
            var startX = gameObject.x - (camera.scrollX * (gameObject.scrollFactorX - 1));
            var startY = gameObject.y - (camera.scrollY * (gameObject.scrollFactorY - 1));

            this.setVector(startX, startY, worldXY.x, worldXY.y);

            this.end.x = worldXY.x;
            this.end.y = worldXY.y;

            this.emit('update');
        }

        onKeyUp(pointer) {
            if (this.pointer !== pointer) {
                return;
            }
            this.pointer = undefined;
            this.clearVector();
            this.emit('update');
            this.emit('pointerup', pointer);
        }

        forceUpdate() {
            var pointer = this.pointer;
            if (!pointer || !pointer.isDown) {
                return this;
            }

            this.onKeyDown(pointer);
            return this;
        }

    }

    Object.assign(
        TouchCursor.prototype,
        EventEmitterMethods
    );

    const GetValue = Phaser.Utils.Objects.GetValue;

    class VirtualJoyStick {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            // Event emitter
            var eventEmitter = GetValue(config, 'eventEmitter', undefined);
            var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
            this.setEventEmitter(eventEmitter, EventEmitterClass);
            config.eventEmitter = this.getEventEmitter();

            this.scene = scene;
            this.base = undefined;
            this.thumb = undefined;
            this.touchCursor = undefined;
            this.setRadius(GetValue(config, 'radius', 100));

            this.addBase(GetValue(config, 'base', undefined), config);
            this.addThumb(GetValue(config, 'thumb', undefined));

            var x = GetValue(config, 'x', 0);
            var y = GetValue(config, 'y', 0);
            this.base.setPosition(x, y);
            this.thumb.setPosition(x, y);

            if (GetValue(config, 'fixed', true)) {
                this.setScrollFactor(0);
            }

            this.boot();
        }

        destroy() {
            this.destroyEventEmitter();
            this.base.destroy(); // Also destroy touchCursor behavior
            this.thumb.destroy();

            this.scene = undefined;
            this.base = undefined;
            this.thumb = undefined;
            this.touchCursor = undefined;
        }

        createCursorKeys() {
            return this.touchCursor.createCursorKeys();
        }

        get forceX() {
            return this.touchCursor.forceX;
        }

        get forceY() {
            return this.touchCursor.forceY;
        }

        get force() {
            return this.touchCursor.force;
        }

        get rotation() {
            return this.touchCursor.rotation;
        }

        get angle() {
            return this.touchCursor.angle; // -180 ~ 180
        }

        get up() {
            return this.touchCursor.upKeyDown;
        }

        get down() {
            return this.touchCursor.downKeyDown;
        }

        get left() {
            return this.touchCursor.leftKeyDown;
        }

        get right() {
            return this.touchCursor.rightKeyDown;
        }

        get noKey() {
            return this.touchCursor.noKeyDown;
        }

        get pointerX() {
            return this.touchCursor.end.x;
        }

        get pointerY() {
            return this.touchCursor.end.y;
        }

        get pointer() {
            return this.touchCursor.pointer;
        }

        setPosition(x, y) {
            if ((this.x === x) && (this.y === y)) {
                return this;
            }

            this.x = x;
            this.y = y;

            this.forceUpdateThumb();
            return this;
        }

        set x(value) {
            if (this.x === value) {
                return;
            }
            this.base.x = value;
            this.thumb.x = value;
        }

        set y(value) {
            if (this.y === value) {
                return;
            }
            this.base.y = value;
            this.thumb.y = value;
        }

        get x() {
            return this.base.x;
        }

        get y() {
            return this.base.y;
        }

        setVisible(visible) {
            this.visible = visible;
            return this;
        }

        toggleVisible() {
            this.visible = !this.visible;
            return this;
        }

        get visible() {
            return this.base.visible;
        }

        set visible(visible) {
            this.base.visible = visible;
            this.thumb.visible = visible;
            this.enable = visible;
        }

        get enable() {
            return this.touchCursor.enable;
        }

        set enable(value) {
            this.touchCursor.setEnable(value);
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

        setRadius(radius) {
            this.radius = radius;
            return this;
        }

        addBase(gameObject, config) {
            if (this.base) {
                this.base.destroy();
                // Also destroy touchCursor behavior
            }

            if (gameObject === undefined) {
                gameObject = this.scene.add.circle(0, 0, this.radius)
                    .setStrokeStyle(3, 0x0000ff);
            }

            if (config === undefined) {
                config = {};
            }
            config.eventEmitter = this.getEventEmitter();
            this.touchCursor = new TouchCursor(gameObject, config);
            this.base = gameObject;
            return this;
        }

        addThumb(gameObject) {
            if (this.thumb) {
                this.thumb.destroy();
            }

            if (gameObject === undefined) {
                gameObject = this.scene.add.circle(0, 0, 40)
                    .setStrokeStyle(3, 0x00ff00);
            }
            this.thumb = gameObject;
            return this;
        }

        setScrollFactor(scrollFactor) {
            this.base.setScrollFactor(scrollFactor);
            this.thumb.setScrollFactor(scrollFactor);
            return this;
        }

        boot() {
            this.on('update', this.update, this);
        }

        // Internal method
        update() {
            var touchCursor = this.touchCursor;
            // Start from (0,0)
            var dx, dy;
            var dirMode = touchCursor.dirMode;
            if (touchCursor.anyKeyDown) {
                if (touchCursor.force > this.radius) { // Exceed radius
                    var rad = touchCursor.rotation;

                    // NOT 'up&down'
                    dx = (dirMode !== 0) ? Math.cos(rad) * this.radius : 0;
                    // NOT 'left&right'
                    dy = (dirMode !== 1) ? Math.sin(rad) * this.radius : 0;
                } else {
                    // NOT 'up&down'
                    dx = (dirMode !== 0) ? touchCursor.forceX : 0;
                    // NOT 'left&right'
                    dy = (dirMode !== 1) ? touchCursor.forceY : 0;

                }
            } else {
                dx = 0;
                dy = 0;
            }

            this.thumb.x = this.base.x + dx;
            this.thumb.y = this.base.y + dy;
            return this;
        }

        forceUpdateThumb() {
            this.touchCursor.forceUpdate();
            return this;
        }
    }

    Object.assign(
        VirtualJoyStick.prototype,
        EventEmitterMethods
    );

    class VirtualJoyStickPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(scene, config) {
            return new VirtualJoyStick(scene, config);
        }

        addVectorToCursorKeys(config) {
            return new VectorToCursorKeys(undefined, config);
        }

    }

    return VirtualJoyStickPlugin;

}));
