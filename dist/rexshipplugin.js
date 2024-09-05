(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexshipplugin = factory());
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

    var SetAcceleration = function (gameObject, ax, ay, onChange) {
        var body = gameObject.body;
        var preAx = body.acceleration.x,
            preAy = body.acceleration.y;
        if ((ax === preAx) && (ay === preAy)) {
            return;
        }
        body.setAcceleration(ax, ay);
        if (onChange) {
            onChange(ax, ay, preAx, preAy);
        }
    };

    var SetAngularVelocity = function (gameObject, av, onChange) {
        var body = gameObject.body;
        var preAv = body.angularVelocity;
        if (av === preAv) {
            return;
        }
        body.setAngularVelocity(av);
        if (onChange) {
            onChange(av, preAv);
        }
    };

    // https://labs.phaser.io/view.html?src=src\physics\arcade\asteroids%20movement.js


    const GetValue = Phaser.Utils.Objects.GetValue;

    class Ship extends SceneUpdateTickTask {
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
            this.setMaxSpeed(GetValue(o, 'maxSpeed', 200));
            this.setAcceleration(GetValue(o, 'acceleration', 200));
            this.setDrag(GetValue(o, 'drag', 0.99));
            this.setTurnSpeed(GetValue(o, 'turnSpeed', 300));
            this.setWrapMode(GetValue(o, 'wrap', true), GetValue(o, 'padding', 0));
            this.setCursorKeys(GetValue(o, 'cursorKeys', undefined));
            return this;
        }

        get enable() {
            return this.isRunning;
        }

        set enable(value) {
            this.isRunning = value;
            if (!value) {
                SetAcceleration(this.parent, 0, 0);
                SetAngularVelocity(this.parent, 0);
            }
        }

        setEnable(e) {
            if (e == undefined) {
                e = true;
            }
            this.enable = e;
            return this;
        }

        get maxSpeed() {
            return this._maxSpeed;
        }

        set maxSpeed(value) {
            this._maxSpeed = value;
            var body = this.parent.body;
            body.setMaxSpeed(value);
        }

        setMaxSpeed(speed) {
            this.maxSpeed = speed;
            return this;
        }

        setAcceleration(acceleration) {
            this.acceleration = acceleration;
            return this;
        }

        get drag() {
            return this._drag;
        }

        set drag(value) {
            this._drag = value;
            var body = this.parent.body;
            body.setDrag(value);
            body.useDamping = true;
        }

        setDrag(drag) {
            this.drag = drag;
            return this;
        }

        setTurnSpeed(angularVelocity) {
            this.angularVelocity = angularVelocity;
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
                SetAcceleration(gameObject, 0, 0);
                SetAngularVelocity(gameObject, 0);
                return this;
            }

            if (!gameObject.active) {
                return this;
            }

            // Speed up
            if (this.isUp) {
                var rotation = gameObject.rotation;
                var ax = Math.cos(rotation) * this.acceleration;
                var ay = Math.sin(rotation) * this.acceleration;
                SetAcceleration(gameObject, ax, ay);
            } else {
                SetAcceleration(gameObject, 0, 0);
            }

            // Turn left/right
            var dx = ((this.isLeft) ? -1 : 0) + ((this.isRight) ? 1 : 0);
            SetAngularVelocity(gameObject, this.angularVelocity * dx);

            if (this.wrap) {
                gameObject.body.world.wrap(gameObject, this.padding);
            }
        }
    }

    class ShipPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new Ship(gameObject, config);
        }

    }

    return ShipPlugin;

}));
