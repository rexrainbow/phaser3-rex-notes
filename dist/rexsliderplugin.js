(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexsliderplugin = factory());
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

    const Linear$1 = Phaser.Math.Linear;
    const Percent$1 = Phaser.Math.Percent;

    var ProgressValueMethods = {
        setValue(value, min, max) {
            if ((value === undefined) || (value === null)) {
                return this;
            }

            if (min !== undefined) {
                value = Percent$1(value, min, max);
            }
            this.value = value;
            return this;
        },

        addValue(inc, min, max) {
            if (min !== undefined) {
                inc = Percent$1(inc, min, max);
            }
            this.value += inc;
            return this;
        },

        getValue(min, max) {
            var value = this.value;
            if (min !== undefined) {
                value = Linear$1(min, max, value);
            }
            return value;
        }
    };

    const GetValue = Phaser.Utils.Objects.GetValue;
    const BetweenPoints = Phaser.Math.Angle.BetweenPoints;
    const DistanceBetween = Phaser.Math.Distance.Between;
    const RotateAroundDistance = Phaser.Math.RotateAroundDistance;
    const Clamp = Phaser.Math.Clamp;
    const Linear = Phaser.Math.Linear;
    const Percent = Phaser.Math.Percent;

    class Slider extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this._enable = undefined;
            this._value = undefined;
            this.endPoints = [
                { x: 0, y: 0 },
                { x: 0, y: 0 }
            ];

            var callback = GetValue(config, 'valuechangeCallback', null);
            if (callback !== null) {
                var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
                this.on('valuechange', callback, scope);
            }

            this.parent.setInteractive(GetValue(config, "inputConfig", undefined));
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.setValue(GetValue(o, "value", 0));
            var endPoints = GetValue(o, "endPoints", undefined);
            if (endPoints !== undefined) {
                this.setEndPoints(endPoints);
            }
            this.setEnable(GetValue(o, "enable", true));
            return this;
        }

        toJSON() {
            return {
                value: this.value,
                endPoints: this.endPoints,
                enable: this.enable
            };
        }

        boot() {
            this.parent.on('drag', this.onDragging, this);
        }

        // shutdown(fromScene) {
        //     // Already shutdown
        //     if (this.isShutdown) {
        //         return;
        //     }
        //     // GameObject events will be removed when this gameObject destroyed 
        //     // this.parent.off('drag', this.onDragging, this);
        //     super.shutdown(fromScene);
        // }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
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

        setEndPoints(p0x, p0y, p1x, p1y) {
            var points = this.endPoints;
            if (typeof (p0x) === 'number') {
                points[0].x = p0x;
                points[0].y = p0y;
                points[1].x = p1x;
                points[1].y = p1y;
            } else if (Array.isArray(p0x)) { // single array with 2 points
                points[0] = p0x[0];
                points[1] = p0x[1];
            } else {
                points[0] = p0x;
                points[1] = p0y;
            }
            this.axisRotation = BetweenPoints(points[0], points[1]);
            this.updatePos();
            return this;
        }

        get value() {
            return this._value;
        }

        set value(value) {
            value = Clamp(value, 0, 1);
            if (value === this._value) {
                return;
            }

            var oldValue = this._value;
            this._value = value;
            this.updatePos(this._value);
            this.emit('valuechange', this._value, oldValue);
        }

        get isDragging() {
            return (this.parent.input.dragState > 0);
        }

        onDragging(pointer, dragX, dragY) {
            var endPoints = this.endPoints;
            var newValue;
            if (endPoints[0].y === endPoints[1].y) {
                var min = Math.min(endPoints[0].x, endPoints[1].x);
                var max = Math.max(endPoints[0].x, endPoints[1].x);
                newValue = Percent(dragX, min, max);
            } else if (endPoints[0].x === endPoints[1].x) {
                var min = Math.min(endPoints[0].y, endPoints[1].y);
                var max = Math.max(endPoints[0].y, endPoints[1].y);
                newValue = Percent(dragY, min, max);
            } else {
                var gameObject = this.parent;
                var dist;
                var p1 = { x: dragX, y: dragY };

                dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
                p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, -this.axisRotation, dist);
                p1.y = gameObject.y;
                dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
                p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, this.axisRotation, dist);

                var min = Math.min(endPoints[0].x, endPoints[1].x);
                var max = Math.max(endPoints[0].x, endPoints[1].x);
                newValue = Percent(p1.x, min, max);
            }

            this.value = newValue;
        }

        updatePos() {
            var gameObject = this.parent;
            var points = this.endPoints;
            gameObject.x = Linear(points[0].x, points[1].x, this._value);
            gameObject.y = Linear(points[0].y, points[1].y, this._value);
            return this;
        }
    }

    Object.assign(
        Slider.prototype,
        ProgressValueMethods,
    );

    class SliderPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new Slider(gameObject, config);
        }

    }

    return SliderPlugin;

}));
