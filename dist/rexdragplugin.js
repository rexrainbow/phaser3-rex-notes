(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdragplugin = factory());
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

    var IsPointerInHitArea = function (gameObject, pointer, preTest, postTest, returnFirstPointer) {
        if (pointer) {
            if (preTest && !preTest(gameObject, pointer)) {
                return false;
            }
            if (!HitTest(gameObject, pointer)) {
                return false;
            }
            if (postTest && !postTest(gameObject, pointer)) {
                return false;
            }
            return true;

        } else {
            if (returnFirstPointer === undefined) {
                returnFirstPointer = false;
            }

            var inputManager = gameObject.scene.input.manager;
            var pointersTotal = inputManager.pointersTotal;
            var pointers = inputManager.pointers,
                pointer;
            for (var i = 0; i < pointersTotal; i++) {
                pointer = pointers[i];
                if (preTest && !preTest(gameObject, pointer)) {
                    continue;
                }
                if (!HitTest(gameObject, pointer)) {
                    continue;
                }
                if (postTest && !postTest(gameObject, pointer)) {
                    continue;
                }

                if (returnFirstPointer) {
                    return pointer;
                }

                return true;
            }

            return false;
        }
    };

    var HitTest = function (gameObject, pointer) {
        var scene = gameObject.scene;
        var cameras = scene.input.cameras.getCamerasBelowPointer(pointer);
        var inputManager = scene.input.manager;
        var gameObjects = [gameObject];

        for (var i = 0, len = cameras.length; i < len; i++) {
            inputManager.hitTest(pointer, gameObjects, cameras[i], HitTestResult);
            if (HitTestResult.length > 0) {
                HitTestResult.length = 0;
                return true;
            }
        }

        HitTestResult.length = 0;
        return false;
    };

    var HitTestResult = [];

    var RequestDrag = function (gameObject) {
        var inputPlugin = gameObject.scene.input;
        var inputManager = inputPlugin.manager;
        var pointersTotal = inputManager.pointersTotal;
        var pointers = inputManager.pointers,
            pointer;
        for (var i = 0; i < pointersTotal; i++) {
            pointer = pointers[i];
            if (
                (!pointer.primaryDown) ||
                (inputPlugin.getDragState(pointer) !== 0) ||
                (!IsPointerInHitArea(gameObject, pointer))
            ) {
                continue;
            }

            // For 3.18.0
            inputPlugin.setDragState(pointer, 1);
            inputPlugin._drag[pointer.id] = [gameObject];
            if ((inputPlugin.dragDistanceThreshold === 0) || (inputPlugin.dragTimeThreshold === 0)) {
                //  No drag criteria, so snap immediately to mode 3
                inputPlugin.setDragState(pointer, 3);
                inputPlugin.processDragStartList(pointer);
            } else {
                //  Check the distance / time on the next event
                inputPlugin.setDragState(pointer, 2);
            }
            // For 3.18.0

            return true;
        }

        return false;
    };

    const GetValue = Phaser.Utils.Objects.GetValue;
    const DistanceBetween = Phaser.Math.Distance.Between;
    const RotateAroundDistance = Phaser.Math.RotateAroundDistance;

    class Drag extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, { eventEmitter: false });
            // No event emitter
            // this.parent = gameObject;

            this._enable = undefined;
            gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.pointer = undefined;
            this.setEnable(GetValue(o, "enable", true));
            this.setAxisMode(GetValue(o, "axis", 0));
            this.setAxisRotation(GetValue(o, "rotation", 0));
            return this;
        }

        toJSON() {
            return {
                enable: this.enable,
                axis: this.axisMode,
                rotation: this.axisRotation
            };
        }

        boot() {
            var gameObject = this.parent;
            gameObject.on('dragstart', this.onDragStart, this);
            gameObject.on('drag', this.onDrag, this);
            gameObject.on('dragend', this.onDragEnd, this);
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // GameObject events will be removed when this gameObject destroyed 
            // this.parent.on('dragstart', this.onDragStart, this);
            // this.parent.on('drag', this.onDrag, this);
            // this.parent.on('dragend', this.onDragEnd, this);
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
                this.dragend();
            }
            this._enable = e;
            this.scene.input.setDraggable(this.parent, e);
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

        setAxisMode(m) {
            if (typeof (m) === 'string') {
                m = DIRECTIONNODE[m];
            }
            this.axisMode = m;
            return this;
        }

        setAxisRotation(a) {
            this.axisRotation = a;
            return this;
        }

        drag() {
            RequestDrag(this.parent);
            return this;
        }

        dragend() {
            if (!this.isDragging) {
                return;
            }
            this.scene.input.setDragState(this.pointer, 5);
            return this;
        }

        onDragStart(pointer, dragX, dragY) {
            if (this.isDragging) {
                return;
            }
            this.pointer = pointer;
        }

        onDrag(pointer, dragX, dragY) {
            if (this.pointer !== pointer) {
                return;
            }
            var gameObject = this.parent;
            if (this.axisMode === 0) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            } else if (this.axisRotation === 0) {
                if (this.axisMode === 1) {
                    gameObject.x = dragX;
                } else if (this.axisMode === 2) {
                    gameObject.y = dragY;
                }
            } else {
                var dist;
                var p1 = { x: dragX, y: dragY };
                dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
                p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, -this.axisRotation, dist);

                if (this.axisMode === 1) {
                    p1.y = gameObject.y;
                } else if (this.axisMode === 2) {
                    p1.x = gameObject.x;
                }
                dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
                p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, this.axisRotation, dist);

                gameObject.x = p1.x;
                gameObject.y = p1.y;
            }

        }

        onDragEnd(pointer, dragX, dragY, dropped) {
            if (this.pointer !== pointer) {
                return;
            }
            this.pointer = undefined;
        }

        get isDragging() {
            return (this.pointer !== undefined);
        }
    }

    const DIRECTIONNODE = {
        'both': 0,
        'h&v': 0,
        'x&y': 0,
        'horizontal': 1,
        'h': 1,
        'x': 1,
        'vertical': 2,
        'v': 2,
        'y': 2
    };

    class DragPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new Drag(gameObject, config);
        }

    }

    return DragPlugin;

}));
