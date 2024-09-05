(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexeightdirectionplugin = factory());
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

    const GetValue$3 = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$3(config, 'eventEmitter', true));

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

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$2(config, 'tickingMode', 1));
            // boot() later
        }

        // override
        boot() {
            if ((this.tickingMode === 2) && (!this.tickingState)) {
                this.startTicking();
            }
        }

        // override
        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.stop();
            if (this.tickingState) {
                this.stopTicking();
            }
            super.shutdown(fromScene);
        }

        setTickingMode(mode) {
            if (typeof (mode) === 'string') {
                mode = TICKINGMODE[mode];
            }
            this.tickingMode = mode;
        }

        // override
        startTicking() {
            this.tickingState = true;
        }

        // override
        stopTicking() {
            this.tickingState = false;
        }

        get isRunning() {
            return this._isRunning;
        }

        set isRunning(value) {
            if (this._isRunning === value) {
                return;
            }

            this._isRunning = value;
            if ((this.tickingMode === 1) && (value != this.tickingState)) {
                if (value) {
                    this.startTicking();
                } else {
                    this.stopTicking();
                }
            }
        }

        start() {
            this.isPaused = false;
            this.isRunning = true;
            return this;
        }

        pause() {
            // Only can ba paused in running state
            if (this.isRunning) {
                this.isPaused = true;
                this.isRunning = false;
            }
            return this;
        }

        resume() {
            // Only can ba resumed in paused state (paused from running state)
            if (this.isPaused) {
                this.isPaused = false;
                this.isRunning = true;
            }
            return this;
        }

        stop() {
            this.isPaused = false;
            this.isRunning = false;
            return this;
        }

        complete() {
            this.isPaused = false;
            this.isRunning = false;
            this.emit('complete', this.parent, this);
        }
    }

    const TICKINGMODE = {
        'no': 0,
        'lazy': 1,
        'always': 2
    };

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class SceneUpdateTickTask extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            // scene update : update, preupdate, postupdate, prerender, render
            // game update : step, poststep, 

            // If this.scene is not available, use game's 'step' event
            var defaultEventName = (this.scene) ? 'update' : 'step';
            this.tickEventName = GetValue$1(config, 'tickEventName', defaultEventName);
            this.isSceneTicker = !IsGameUpdateEvent(this.tickEventName);

        }

        startTicking() {
            super.startTicking();

            if (this.isSceneTicker) {
                this.scene.sys.events.on(this.tickEventName, this.update, this);
            } else {
                this.game.events.on(this.tickEventName, this.update, this);
            }

        }

        stopTicking() {
            super.stopTicking();

            if (this.isSceneTicker && this.scene) { // Scene might be destoryed
                this.scene.sys.events.off(this.tickEventName, this.update, this);
            } else if (this.game) {
                this.game.events.off(this.tickEventName, this.update, this);
            }
        }

        // update(time, delta) {
        //     
        // }

    }

    var IsGameUpdateEvent = function (eventName) {
        return (eventName === 'step') || (eventName === 'poststep');
    };

    var SetVelocity = function (gameObject, vx, vy, onChange) {
        var body = gameObject.body;
        var preVx = body.velocity.x,
            preVy = body.velocity.y;
        if ((vx === preVx) && (vy === preVy)) {
            return
        }
        body.setVelocity(vx, vy);
        if (onChange) {
            onChange(vx, vy, preVx, preVy);
        }
    };

    /**
     * @author       Richard Davey <rich@photonstorm.com>
     * @copyright    2018 Photon Storm Ltd.
     * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
     */

    const DEG_TO_RAD = Math.PI / 180;

    /**
     * Convert the given angle from degrees, to the equivalent angle in radians.
     *
     * @function Phaser.Math.DegToRad
     * @since 3.0.0
     *
     * @param {integer} degrees - The angle (in degrees) to convert to radians.
     *
     * @return {number} The given angle converted to radians.
     */
    var DegToRad = function (degrees)
    {
        return degrees * DEG_TO_RAD;
    };

    const GetValue = Phaser.Utils.Objects.GetValue;

    class EightDirection extends SceneUpdateTickTask {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            if (!this.parent.body) {
                this.scene.physics.add.existing(this.parent, false);
            }
            this.setEnable(GetValue(o, 'enable', true));
            this.setDirMode(GetValue(o, 'dir', '8dir'));
            this.setSpeed(GetValue(o, 'speed', 200));
            this.setRotateToDirection(GetValue(o, 'rotateToDirection', false));
            this.setWrapMode(GetValue(o, 'wrap', false), GetValue(o, 'padding', 0));
            this.setCursorKeys(GetValue(o, 'cursorKeys', undefined));
            return this;
        }

        get enable() {
            return this.isRunning;
        }

        set enable(value) {
            this.isRunning = value;
            if (!value) {
                SetVelocity(this, 0, 0);
            }
        }

        setEnable(e) {
            if (e == undefined) {
                e = true;
            }
            this.enable = e;
            if (e && (this.body === undefined)) {
                this.scene.physics.add.existing(this.parent, false);
            }
            return this;
        }

        setDirMode(m) {
            if (typeof (m) === 'string') {
                m = DIRMODE[m];
            }
            this.dirMode = m;
            return this;
        }

        setSpeed(speed) {
            this.speed = speed;
            return this;
        }

        setRotateToDirection(rotateToDirection) {
            this.rotateToDirection = rotateToDirection;
            return this;
        }

        setWrapMode(wrap, padding) {
            if (wrap === undefined) {
                wrap = true;
            }
            this.wrap = wrap;
            this.padding = padding;
            return this;
        }

        setCursorKeys(cursorKeys) {
            if (cursorKeys === undefined) {
                cursorKeys = this.scene.input.keyboard.createCursorKeys();
            }
            this.cursorKeys = cursorKeys;
            return this;
        }

        get isLeft() {
            var leftKey = this.cursorKeys.left;
            return (this.enable && leftKey) ? leftKey.isDown : false;
        }

        get isRight() {
            var rightKey = this.cursorKeys.right;
            return (this.enable && rightKey) ? rightKey.isDown : false;
        }

        get isUp() {
            var upKey = this.cursorKeys.up;
            return (this.enable && upKey) ? upKey.isDown : false;
        }

        get isDown() {
            var downKey = this.cursorKeys.down;
            return (this.enable && downKey) ? downKey.isDown : false;
        }

        update(time, delta) {
            var gameObject = this.parent;
            if (!this.enable) {
                SetVelocity(gameObject, 0, 0);
                return this;
            }

            if (!gameObject.active) {
                return this;
            }

            var dy = ((this.isUp) ? -1 : 0) + ((this.isDown) ? 1 : 0),
                dx = ((this.isLeft) ? -1 : 0) + ((this.isRight) ? 1 : 0);
            if ((dx === 0) && (dy === 0)) {
                SetVelocity(gameObject, 0, 0);
                return this;
            }
            switch (this.dirMode) {
                case 0: // up&down
                    dx = 0;
                    break;
                case 1: // left&right
                    dy = 0;
                    break;
                case 2: // 4dir
                    if (dy !== 0) {
                        dx = 0;
                    }
                    break;
            }

            var rotation, vx, vy;
            if (dy === 0) { // dx !== 0
                vx = this.speed * dx;
                vy = 0;
                rotation = (dx === 1) ? RAD0 : RAD180;
            } else if (dx === 0) { // dy !== 0
                vx = 0;
                vy = this.speed * dy;
                rotation = (dy === 1) ? RAD90 : RAD270;
            } else { // (dx !== 0) && (dy !== 0)
                rotation = Math.atan2(dy, dx);
                vx = this.speed * Math.cos(rotation);
                vy = this.speed * Math.sin(rotation);
            }
            SetVelocity(gameObject, vx, vy);
            if (this.rotateToDirection && (rotation !== undefined)) {
                gameObject.rotation = rotation;
            }

            if (this.wrap) {
                gameObject.body.world.wrap(gameObject, this.padding);
            }
            return this;
        }
    }

    const DIRMODE = {
        'up&down': 0,
        'left&right': 1,
        '4dir': 2,
        '8dir': 3
    };
    const RAD0 = DegToRad(0);
    const RAD90 = DegToRad(90);
    const RAD180 = DegToRad(180);
    const RAD270 = DegToRad(270);

    class EightDirectionPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new EightDirection(gameObject, config);
        }

    }

    return EightDirectionPlugin;

}));
