(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexboundsplugin = factory());
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

    var GetDisplayWidth = function (gameObject) {
        if (gameObject.displayWidth !== undefined) {
            return gameObject.displayWidth;
        } else {
            return gameObject.width;
        }
    };

    var GetDisplayHeight = function (gameObject) {
        if (gameObject.displayHeight !== undefined) {
            return gameObject.displayHeight;
        } else {
            return gameObject.height;
        }
    };

    const Rectangle$1 = Phaser.Geom.Rectangle;
    const Vector2 = Phaser.Math.Vector2;
    const RotateAround = Phaser.Math.RotateAround;
    const P3Container = Phaser.GameObjects.Container;

    var GetBounds = function (gameObject, output) {
        if (output === undefined) {
            output = new Rectangle$1();
        } else if (output === true) {
            if (GlobRect === undefined) {
                GlobRect = new Rectangle$1();
            }
            output = GlobRect;
        }

        if (gameObject.getBounds && !(gameObject instanceof P3Container)) {
            return gameObject.getBounds(output);
        }

        //  We can use the output object to temporarily store the x/y coords in:

        var TLx, TLy, TRx, TRy, BLx, BLy, BRx, BRy;

        // Instead of doing a check if parent container is
        // defined per corner we only do it once.
        if (gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            GetTopLeft(gameObject, output);
            parentMatrix.transformPoint(output.x, output.y, output);

            TLx = output.x;
            TLy = output.y;

            GetTopRight(gameObject, output);
            parentMatrix.transformPoint(output.x, output.y, output);

            TRx = output.x;
            TRy = output.y;

            GetBottomLeft(gameObject, output);        parentMatrix.transformPoint(output.x, output.y, output);

            BLx = output.x;
            BLy = output.y;

            GetBottomRight(gameObject, output);
            parentMatrix.transformPoint(output.x, output.y, output);

            BRx = output.x;
            BRy = output.y;
        }
        else {
            GetTopLeft(gameObject, output);

            TLx = output.x;
            TLy = output.y;

            GetTopRight(gameObject, output);
            TRx = output.x;
            TRy = output.y;

            GetBottomLeft(gameObject, output);
            BLx = output.x;
            BLy = output.y;

            GetBottomRight(gameObject, output);

            BRx = output.x;
            BRy = output.y;
        }

        output.x = Math.min(TLx, TRx, BLx, BRx);
        output.y = Math.min(TLy, TRy, BLy, BRy);
        output.width = Math.max(TLx, TRx, BLx, BRx) - output.x;
        output.height = Math.max(TLy, TRy, BLy, BRy) - output.y;

        return output;
    };

    var GlobRect = undefined;

    var GetTopLeft = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getTopLeft) {
            return gameObject.getTopLeft(output);
        }

        output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
        output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetTopRight = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getTopRight) {
            return gameObject.getTopRight(output);
        }

        output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
        output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetBottomLeft = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getBottomLeft) {
            return gameObject.getBottomLeft(output);
        }

        output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
        output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetBottomRight = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getBottomRight) {
            return gameObject.getBottomRight(output);
        }

        output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
        output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GlobVector = undefined;

    var PrepareBoundsOutput = function (gameObject, output, includeParent) {
        if (includeParent === undefined) { includeParent = false; }

        if (gameObject.rotation !== 0) {
            RotateAround(output, gameObject.x, gameObject.y, gameObject.rotation);
        }

        if (includeParent && gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            parentMatrix.transformPoint(output.x, output.y, output);
        }

        return output;
    };

    const Rectangle = Phaser.Geom.Rectangle;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class Bounds extends SceneUpdateTickTask {
        constructor(gameObject, config) {
            if (config === undefined) {
                config = {};
            }
            config.tickEventName = 'postupdate';
            super(gameObject, config);
            // this.parent = gameObject;

            this.bounds = new Rectangle();
            this.boundsTarget = undefined;
            this.boundsEnable = {};
            this.boundsHitMode = {};
            this.clearHitResult();
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            var target = GetValue(o, 'target');
            if (target) {
                this.setBoundsTarget(target);
            } else {
                this.setBoundsTarget();
                this.setBounds(GetValue(o, 'bounds'));
            }

            this.setEnable(GetValue(o, 'enable', true));

            this.setBoundsHitMode(GetValue(o, 'boundsHitMode'));


            this.setAlignMode(GetValue(o, 'alignMode', (!this.hasWrapBoundHitMode) ? 0 : 1));

            return this;
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            super.shutdown(fromScene);
        }

        setBoundsTarget(gameObject) {
            this.boundsTarget = gameObject;
            return this;
        }

        setBounds(boundsConfig) {
            if (!boundsConfig) {
                return this;
            }

            var bounds = this.bounds;

            bounds.setSize(
                GetValue(boundsConfig, 'width', 0),
                GetValue(boundsConfig, 'height', 0)
            );
            if (boundsConfig.hasOwnProperty('centerX')) {
                bounds.centerX = boundsConfig.centerX;
            } else {
                bounds.x = GetValue(boundsConfig, 'x', 0);
            }
            if (boundsConfig.hasOwnProperty('centerY')) {
                bounds.centerY = boundsConfig.centerY;
            } else {
                bounds.y = GetValue(boundsConfig, 'y', 0);
            }

            return this;
        }

        setEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }

            var boundsEnable = this.boundsEnable;
            if (typeof (enable) === 'boolean') {
                boundsEnable.left = enable;
                boundsEnable.right = enable;
                boundsEnable.top = enable;
                boundsEnable.bottom = enable;
            } else {
                boundsEnable.left = GetValue(enable, 'left', false);
                boundsEnable.right = GetValue(enable, 'right', false);
                boundsEnable.top = GetValue(enable, 'top', false);
                boundsEnable.bottom = GetValue(enable, 'bottom', false);
            }

            this.isRunning = this.enable;

            return this;
        }

        setBoundsHitMode(mode) {
            if (mode === undefined) {
                mode = 0;
            }
            var boundsHitMode = this.boundsHitMode;
            boundsHitMode.left = GetBoundHitMode(GetValue(mode, 'left', mode));
            boundsHitMode.right = GetBoundHitMode(GetValue(mode, 'right', mode));
            boundsHitMode.top = GetBoundHitMode(GetValue(mode, 'top', mode));
            boundsHitMode.bottom = GetBoundHitMode(GetValue(mode, 'bottom', mode));

            this.hasWrapBoundHitMode = (boundsHitMode.left + boundsHitMode.right + boundsHitMode.top + boundsHitMode.bottom) > 0;

            return this;
        }

        setAlignMode(mode) {
            if (typeof (mode) === 'string') {
                mode = AlignMode[mode];
            }
            this.alignMode = mode;
            return this;
        }

        get enable() {
            var boundsEnable = this.boundsEnable;
            return boundsEnable.left || boundsEnable.right || boundsEnable.top || boundsEnable.bottom;
        }

        set enable(value) {
            this.setEnable(value);
        }

        update(time, delta) {
            var gameObject = this.parent;
            this.clearHitResult();
            if (!this.enable) {
                return this;
            }

            var target = this.boundsTarget;
            if (target) {
                GetBounds(target, this.bounds);
            }

            var bounds = this.bounds;
            var boundsEnable = this.boundsEnable;
            var boundsHitMode = this.boundsHitMode;

            var gameObjectLeftBound, gameObjectRightBound, gameObjectTopBound, gameObjectBottomBound;

            if (this.alignMode === 0) {
                var gameObjectBounds = GetBounds(gameObject, true);
                gameObjectLeftBound = gameObjectBounds.left;
                gameObjectRightBound = gameObjectBounds.right;
                gameObjectTopBound = gameObjectBounds.top;
                gameObjectBottomBound = gameObjectBounds.bottom;
            } else {
                gameObjectLeftBound = gameObject.x;
                gameObjectRightBound = gameObject.x;
                gameObjectTopBound = gameObject.y;
                gameObjectBottomBound = gameObject.y;
            }

            if (boundsEnable.left) {
                var dx = bounds.left - gameObjectLeftBound;
                if (dx > 0) {
                    this.isHitAny = true;
                    this.isHitLeft = true;

                    if (boundsHitMode.left === 0) {
                        gameObject.x += dx;
                    } else {
                        gameObject.x = bounds.right - dx;
                    }

                    this.emit('hitleft', this.parent, this);
                }
            }

            if (boundsEnable.right) {
                var dx = bounds.right - gameObjectRightBound;
                if (dx < 0) {
                    this.isHitAny = true;
                    this.isHitRight = true;

                    if (boundsHitMode.left === 0) {
                        gameObject.x += dx;
                    } else {
                        gameObject.x = bounds.left - dx;
                    }

                    this.emit('hitright', this.parent, this);
                }
            }

            if (boundsEnable.top) {
                var dy = bounds.top - gameObjectTopBound;
                if (dy > 0) {
                    this.isHitAny = true;
                    this.isHitTop = true;

                    if (boundsHitMode.left === 0) {
                        gameObject.y += dy;
                    } else {
                        gameObject.y = bounds.bottom - dy;
                    }

                    this.emit('hittop', this.parent, this);
                }
            }

            if (boundsEnable.bottom) {
                var dy = bounds.bottom - gameObjectBottomBound;
                if (dy < 0) {
                    this.isHitAny = true;
                    this.isHitBottom = true;

                    if (boundsHitMode.left === 0) {
                        gameObject.y += dy;
                    } else {
                        gameObject.y = bounds.top - dy;
                    }

                    this.emit('hitbottom', this.parent, this);
                }
            }

            if (this.isHitAny) {
                this.emit('hitany', this.parent, this);
            }
        }

        clearHitResult() {
            this.isHitAny = false;
            this.isHitLeft = false;
            this.isHitRight = false;
            this.isHitTop = false;
            this.isHitBottom = false;
            return this;
        }
    }

    const BoundHitMode = {
        clamp: 0,
        wrap: 1
    };

    const AlignMode = {
        bounds: 0,
        origin: 1
    };

    var GetBoundHitMode = function (mode) {
        if (typeof (mode) === 'string') {
            mode = BoundHitMode[mode];
        }
        return mode;
    };

    class BoundsPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new Bounds(gameObject, config);
        }

    }

    return BoundsPlugin;

}));
