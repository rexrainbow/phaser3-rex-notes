(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdragrotateplugin = factory());
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

    const GameObjectClass = Phaser.GameObjects.GameObject;
    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass);
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

    const GetValue = Phaser.Utils.Objects.GetValue;
    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const DistanceBetween = Phaser.Math.Distance.Between;
    const GetAngle = Phaser.Math.Angle.Between;
    const WrapAngle = Phaser.Math.Angle.Wrap;
    const RadToDeg = Phaser.Math.RadToDeg;

    const STATE_TOUCH0 = 0;
    const STATE_TOUCH1 = 1;

    class DragRotate extends ComponentBase {
        constructor(scene, config) {
            super(scene);
            // No event emitter
            // this.scene = scene

            this.mainCamera = this.scene.sys.cameras.main;
            this._enable = undefined;

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.pointer = undefined;
            this.originGameObject = undefined;

            this.setEnable(GetValue(o, "enable", true));

            var originConfig = GetValue(o, 'origin', o);
            this.setOrigin(originConfig);
            this.setRadius(GetValue(o, 'maxRadius'), GetValue(o, 'minRadius', 0));
            this.state = STATE_TOUCH0;
        }

        boot() {
            this.scene.input.on('pointerdown', this.onPointerDown, this);
            this.scene.input.on('pointerup', this.onPointerUp, this);
            this.scene.input.on('pointermove', this.onPointerMove, this);
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.scene.input.off('pointerdown', this.onPointerDown, this);
            this.scene.input.off('pointerup', this.onPointerUp, this);
            this.scene.input.off('pointermove', this.onPointerMove, this);

            this.mainCamera = undefined;
            this.pointer = undefined;
            this.originGameObject = undefined;

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
                this.dragCancel();
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

        setOrigin(x, y) {
            if (x === undefined) {
                this.x = undefined;  // World position
                this.y = undefined;  // World position
                this.originGameObject = undefined;
            } else if (IsGameObject(x)) {
                this.x = undefined;
                this.y = undefined;
                this.originGameObject = x;
            } else if (IsPlainObject(x)) {
                this.x = GetValue(x, 'x', 0);  // World position
                this.y = GetValue(x, 'y', 0);  // World position
                this.originGameObject = undefined;
            } else {
                this.x = x;  // World position
                this.y = y;  // World position
                this.originGameObject = undefined;
            }
            return this;
        }

        setRadius(maxRadius, minRadius) {
            if (minRadius === undefined) {
                minRadius = 0;
            }
            this.maxRadius = maxRadius;
            this.minRadius = minRadius;
            return this;
        }

        getOriginX(camera) {
            // OriginX in world position
            if (!this.originGameObject) {
                return this.x;
            }

            var gameObject = this.originGameObject;
            var x = gameObject.x;
            if (gameObject.scrollFactorX === 0) {
                x += camera.scrollX;
            }
            return x;
        }

        getOriginY(camera) {
            // OriginY in world position
            if (!this.originGameObject) {
                return this.y;
            }

            var gameObject = this.originGameObject;
            var y = gameObject.y;
            if (gameObject.scrollFactorY === 0) {
                if (camera === undefined) {
                    camera = this.pointer.camera;
                }
                y += camera.scrollY;
            }
            return y;
        }

        containsPointer(pointer) {
            if ((this.minRadius === 0) && (this.maxRadius === undefined)) {
                return true;
            }

            var originX = this.getOriginX(pointer.camera);
            var originY = this.getOriginY(pointer.camera);

            var worldXY = GetPointerWorldXY(pointer, this.mainCamera, true);
            if (!worldXY) {
                return false;
            }

            var r = DistanceBetween(originX, originY, worldXY.x, worldXY.y);
            return (r >= this.minRadius) &&
                ((this.maxRadius === undefined) || (r <= this.maxRadius));
        }

        onPointerDown(pointer) {
            if ((!this.enable) || this.pointer) {
                return;
            }

            if (!this.containsPointer(pointer)) {
                return;
            }

            this.onDragStart(pointer);
        }

        onPointerUp(pointer) {
            if ((!this.enable) || (this.pointer !== pointer)) {
                return;
            }

            this.onDragEnd();
        }

        onPointerMove(pointer) {
            if ((!this.enable) || (!pointer.isDown)) {
                return;
            }

            switch (this.state) {
                case STATE_TOUCH0:
                    if (this.containsPointer(pointer)) {
                        this.onDragStart(pointer);
                    }
                    break;

                case STATE_TOUCH1:
                    if (this.containsPointer(pointer)) {
                        this.onDrag(pointer);
                    } else {
                        this.onDragEnd(pointer);
                    }
                    break;
            }
        }

        dragCancel() {
            if (this.state === STATE_TOUCH1) {
                this.onDragEnd();
            }
            this.pointer = undefined;
            this.state = STATE_TOUCH0;
            return this;
        }

        onDragStart(pointer) {
            this.pointer = pointer;

            var worldXY = GetPointerWorldXY(pointer, this.mainCamera, true);
            if (!worldXY) {
                return;
            }

            this.prevPointerX = worldXY.x;
            this.prevPointerY = worldXY.y;
            this.state = STATE_TOUCH1;
            this.emit('dragstart', this);
        }

        onDragEnd() {
            this.pointer = undefined;
            this.prevPointerX = undefined;
            this.prevPointerY = undefined;
            this.state = STATE_TOUCH0;
            this._deltaRotation = undefined;
            this.emit('dragend', this);
        }

        onDrag(pointer) {
            var x = this.getOriginX(pointer.camera),
                y = this.getOriginY(pointer.camera);

            var worldXY = GetPointerWorldXY(pointer, this.mainCamera, true);
            if (!worldXY) {
                return;
            }

            var curPointerX = worldXY.x;
            var curPointerY = worldXY.y;
            var a0 = GetAngle(x, y, this.prevPointerX, this.prevPointerY),
                a1 = GetAngle(x, y, curPointerX, curPointerY);
            this.deltaRotation = WrapAngle(a1 - a0);

            this.prevPointerX = curPointerX;
            this.prevPointerY = curPointerY;
            this.emit('drag', this);
        }

        get deltaAngle() {
            if (this.state === STATE_TOUCH0) {
                return 0;
            }

            return RadToDeg(this.deltaRotation);
        }

        get cw() {
            return (this.deltaRotation >= 0);
        }

        get ccw() {
            return !this.cw;
        }
    }

    class DragRotatePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(scene, config) {
            return new DragRotate(scene, config);
        }

    }

    return DragRotatePlugin;

}));
