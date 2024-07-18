(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdragspeedplugin = factory());
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

    var GetTickDelta = function (game) {
        return GetGame(game).loop.delta;
    };

    const GetValue = Phaser.Utils.Objects.GetValue;
    const DistanceBetween = Phaser.Math.Distance.Between;

    class DragSpeed extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this._enable = undefined;
            gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.pointer = undefined;
            this.isInTouched = false;
            this.holdStartTime = undefined;
            this.x = undefined;
            this.y = undefined;
            this.preX = undefined;
            this.preY = undefined;
            this.localX = undefined;
            this.localY = undefined;
            this.justMoved = false;
            this.setEnable(GetValue(o, 'enable', true));
            this.holdThreshold = GetValue(o, 'holdThreshold', 50); // ms
            this.pointerOutReleaseEnable = GetValue(o, 'pointerOutRelease', true);
            return this;
        }

        boot() {
            // Drag start only when pointer down
            this.parent.on('pointerdown', this.onPointIn, this);
            // this.parent.on('pointerover', this.onPointIn, this);

            this.parent.on('pointerup', this.onPointOut, this);

            if (this.pointerOutReleaseEnable) {
                this.parent.on('pointerout', this.onPointOut, this);
            }

            this.parent.on('pointermove', this.onPointerMove, this);
            this.scene.sys.events.on('preupdate', this.preupdate, this);
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // GameObject events will be removed when this gameObject destroyed 
            // this.parent.off('pointerdown', this.onPointIn, this);
            // this.parent.off('pointerup', this.onPointOut, this);
            // this.parent.off('pointerout', this.onPointOut, this);
            // this.parent.off('pointermove', this.onPointerMove, this);

            this.scene.sys.events.off('preupdate', this.preupdate, this);

            this.pointer = undefined;

            super.shutdown(fromScene);
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
            }

            if (!e) {
                this.isInTouched = false;
                this.pointer = undefined;
            }
            this._enable = e;
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

        setPointerOutReleaseEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.pointerOutReleaseEnable = enable;
            return this;
        }

        get isDown() {
            return this.pointer && this.pointer.isDown;
        }

        get isUp() {
            return !this.isDown;
        }

        get dx() {
            return this.x - this.preX;
        }

        get dy() {
            return this.y - this.preY;
        }

        get dt() {
            var delta = GetTickDelta(this.scene);
            return delta;
        }

        get speed() {
            if ((this.x === this.preX) && (this.y === this.preY)) {
                return 0;
            }
            var d = DistanceBetween(this.preX, this.preY, this.x, this.y);
            var speed = d / (this.dt * 0.001);
            return speed;
        }

        get speedX() {
            return this.dx / (this.dt * 0.001);
        }

        get speedY() {
            return this.dy / (this.dt * 0.001);
        }

        // internal
        onPointIn(pointer, localX, localY) {
            if ((!this.enable) ||
                (!pointer.isDown) ||
                (this.pointer !== undefined)) {
                return;
            }
            this.pointer = pointer;
            this.localX = localX;
            this.localY = localY;
        }

        onPointOut(pointer) {
            if ((!this.enable) ||
                (this.pointer !== pointer)) {
                return;
            }
            this.pointer = undefined;
        }

        onPointerMove(pointer, localX, localY) {
            if ((!this.enable) ||
                (!pointer.isDown) ||
                (this.pointer !== pointer)) {
                return;
            }
            this.localX = localX;
            this.localY = localY;
        }

        preupdate(time, delta) {
            if (!this.enable) {
                return;
            }

            var pointer = this.pointer;
            this.justMoved = false;
            if (pointer && (!this.isInTouched)) {
                // Touch start
                this.x = pointer.worldX;
                this.y = pointer.worldY;
                this.preX = pointer.worldX;
                this.preY = pointer.worldY;
                this.isInTouched = true;
                this.holdStartTime = undefined;
                this.emit('touchstart', pointer, this.localX, this.localY);

            } else if (pointer && this.isInTouched) {
                // In touch
                if ((this.x === pointer.x) && (this.y === pointer.y)) {
                    // Hold
                    if (this.holdStartTime === undefined) {
                        this.holdStartTime = time;
                    } else if (time - this.holdStartTime > this.holdThreshold) {
                        this.preX = this.x;
                        this.preY = this.y;
                    }
                } else {
                    // Move
                    this.preX = this.x;
                    this.preY = this.y;
                    this.x = pointer.worldX;
                    this.y = pointer.worldY;
                    this.holdStartTime = undefined;
                    this.justMoved = true;
                    this.emit('touchmove', pointer, this.localX, this.localY);
                }

            } else if ((!pointer) && this.isInTouched) {
                // Touch end
                this.isInTouched = false;
                this.holdStartTime = undefined;
                this.emit('touchend', pointer);

            }
        }
    }

    class DragSpeedPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new DragSpeed(gameObject, config);
        }

    }

    return DragSpeedPlugin;

}));
