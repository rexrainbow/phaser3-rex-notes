(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexmovetoplugin = factory());
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

    const GetValue = Phaser.Utils.Objects.GetValue;
    const DistanceBetween = Phaser.Math.Distance.Between;
    const Lerp = Phaser.Math.Linear;
    const AngleBetween = Phaser.Math.Angle.Between;
    const arriveEpsilon = 0.0001;

    class MoveTo extends SceneUpdateTickTask {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.isCompleted = GetValue(o, 'isCompleted', true);
            this.isRunning = GetValue(o, 'isRunning', false);
            this.setEnable(GetValue(o, 'enable', true));
            this.timeScale = GetValue(o, 'timeScale', 1);
            this.setSpeed(GetValue(o, 'speed', 400));
            this.setRotateToTarget(GetValue(o, 'rotateToTarget', false));
            this.targetX = GetValue(o, 'targetX', null); // Invalid
            this.targetY = GetValue(o, 'targetY', null);
            this.appendMode = GetValue(o, 'appendMode', false);
            this.targets = GetValue(o, 'targets', []); // {x,y}[]

            return this;
        }

        toJSON() {
            return {
                isCompleted: this.isCompleted,
                isRunning: this.isRunning,
                enable: this.enable,
                timeScale: this.timeScale,
                speed: this.speed,
                rotateToTarget: this.rotateToTarget,
                targetX: this.targetX,
                targetY: this.targetY,
                tickingMode: this.tickingMode,
                appendMode: this.appendMode,
                targets: this.targets
            };
        }

        get lastTargetPosition() {
            var queuedLength = this.targets.length;
            if (queuedLength === 0) {
                return { x: this.targetX, y: this.targetY };
            } else {
                var lastTarget = this.targets[queuedLength - 1];
                return { x: lastTarget.x, y: lastTarget.y };
            }
        }

        setEnable(enable) {
            if (enable == undefined) {
                enable = true;
            }
            this.enable = enable;
            return this;
        }

        setSpeed(speed) {
            this.speed = speed;
            return this;
        }

        setRotateToTarget(rotateToTarget) {
            this.rotateToTarget = rotateToTarget;
            return this;
        }

        setAppendMode(appendMode) {
            this.appendMode = !!appendMode;

            if (!this.appendMode) {
                this.clearTargets();
            }
            return this;
        }

        clearTargets() {
            this.targets.length = 0;
            return this;
        }

        moveTo(x, y) {
            if (x === undefined) {
                if (!this.isCompleted) { // Resume
                    super.start();
                }
                return this;
            }

            if (typeof (x) !== 'number') {
                var config = x;
                x = config.x;
                y = config.y;
            }

            var isNewTask = false;
            if (this.appendMode) {
                if (this.isCompleted) { // New task
                    this.targetX = x;
                    this.targetY = y;
                    isNewTask = true;

                } else {
                    this.targets.push({ x, y });

                }

            } else {

                this.targetX = x;
                this.targetY = y;
                isNewTask = true;

            }

            if (isNewTask) {
                this.start();
                this.emit('start', this.parent, this);
            }

            return this;
        }

        moveFrom(x, y) {
            // This method will clear queue targets

            if (typeof (x) !== 'number') {
                var config = x;
                x = config.x;
                y = config.y;
            }

            this.stop();

            var gameObject = this.parent;
            var targetX = gameObject.x;
            var targetY = gameObject.y;

            gameObject.setPosition(x, y);

            this.moveTo(targetX, targetY);

            return this;
        }

        moveToward(angle, distance) {
            var referencePosition;

            if (this.appendMode && !this.isCompleted) {
                referencePosition = this.lastTargetPosition;

            } else {
                referencePosition = this.parent;  // gameObject
            }

            var targetX = referencePosition.x + Math.cos(angle) * distance;
            var targetY = referencePosition.y + Math.sin(angle) * distance;
            this.moveTo(targetX, targetY);

            return this;
        }

        start() {
            this.isCompleted = false;
            super.start();
            return this;
        }

        stop() {
            super.stop();
            this.clearTargets();
            this.isCompleted = true;
            return this;
        }

        complete() {
            this.isCompleted = true;
            super.complete();
            return this;
        }

        update(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
                return this;
            }

            if (this.targetX == null || this.targetY == null) {
                this.stop();
                return this;
            }

            var gameObject = this.parent;
            if (!gameObject.active) {
                return this;
            }

            if ((this.speed === 0) || (delta === 0) || (this.timeScale === 0)) {
                return this;
            }

            var deltaSeconds = (delta * this.timeScale) / 1000;
            var remainingDistanceBudget = this.speed * deltaSeconds;

            // Consume remainingDistanceBudget across multiple targets in the same tick
            while (remainingDistanceBudget > 0) {
                var currentX = gameObject.x;
                var currentY = gameObject.y;

                var targetX = this.targetX;
                var targetY = this.targetY;

                var distanceToTarget = DistanceBetween(currentX, currentY, targetX, targetY);

                // If already on the current target, switch to next target or complete
                if (distanceToTarget <= arriveEpsilon) {
                    if (this.targets.length > 0) {
                        var nextTarget = this.targets.shift();
                        this.targetX = nextTarget.x;
                        this.targetY = nextTarget.y;
                        continue;
                    }

                    debugger
                    this.complete();
                    return this;
                }

                // Move partially toward target
                else if (remainingDistanceBudget < distanceToTarget) {
                    var t = remainingDistanceBudget / distanceToTarget;
                    var newX = Lerp(currentX, targetX, t);
                    var newY = Lerp(currentY, targetY, t);

                    gameObject.setPosition(newX, newY);

                    if (this.rotateToTarget) {
                        gameObject.rotation = AngleBetween(currentX, currentY, newX, newY);
                    }

                    remainingDistanceBudget = 0;
                    break;
                }

                // Reach target and still have remaining distance budget
                gameObject.setPosition(targetX, targetY);

                if (this.rotateToTarget) {
                    gameObject.rotation = AngleBetween(currentX, currentY, targetX, targetY);
                }

                remainingDistanceBudget -= distanceToTarget;

                // Continue to next target if any, otherwise complete
                if (this.targets.length > 0) {
                    var nextTargetAfterReach = this.targets.shift();
                    this.targetX = nextTargetAfterReach.x;
                    this.targetY = nextTargetAfterReach.y;
                    continue;
                }

                this.complete();
                return this;
            }

            return this;
        }
    }

    class MoveToPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new MoveTo(gameObject, config);
        }
    }

    return MoveToPlugin;

}));
