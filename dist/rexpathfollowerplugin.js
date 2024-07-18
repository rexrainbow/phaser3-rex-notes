(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexpathfollowerplugin = factory());
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

    const GetValue = Phaser.Utils.Objects.GetValue;
    const Vector2 = Phaser.Math.Vector2;
    const DegToRad = Phaser.Math.DegToRad;
    const AngleBetween = Phaser.Math.Angle.Between;
    const Linear = Phaser.Math.Linear;

    class PathFollower extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, { eventEmitter: false });
            // No event emitter
            // this.parent = gameObject;

            this._t = 0;
            this.pathVector = new Vector2();
            this.spacePoints = undefined;
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setPath(GetValue(o, 'path', undefined));

            var rotateToPath = GetValue(o, 'rotateToPath', false);
            var rotationOffset = GetValue(o, 'rotationOffset', undefined);
            if (rotationOffset === undefined) {
                rotationOffset = DegToRad(GetValue(o, 'angleOffset', 0));
            }
            this.setRotateToPath(rotateToPath, rotationOffset);

            var spacedPoints = GetValue(o, 'spacedPoints', false);
            if (spacedPoints) {
                this.setSpacedPointsMode(
                    GetValue(spacedPoints, 'divisions', undefined),
                    GetValue(spacedPoints, 'stepRate', 10)
                );
            } else {
                this.setSpacedPointsMode(false);
            }

            var t = GetValue(o, 't', undefined);
            if (t !== undefined) {
                this.setT(t);
            }
            return this;
        }

        toJSON() {
            return {
                path: this.path,
                t: this.t,
                rotateToPath: this.rotateToPath,
                rotationOffset: this.rotationOffset
            };
        }

        setPath(path) {
            this.path = path;
            return this;
        }

        setT(t) {
            this.t = t;
            return this;
        }

        get t() {
            return this._t;
        }

        set t(value) {
            this._t = value;
            this.update();
        }

        setRotateToPath(rotateToPath, rotationOffset) {
            this.rotateToPath = rotateToPath;
            this.rotationOffset = rotationOffset;
            return this;
        }

        setSpacedPointsMode(divisions, stepRate) {
            if ((!divisions) && (!stepRate)) {
                this.spacePoints = undefined;
            } else {
                this.spacePoints = this.path.getSpacedPoints(divisions, stepRate, this.spacePoints);
                // Add point at t=1
                this.spacePoints.push(this.path.getPoint(1));
            }
            return this;
        }

        getPoint(t) {
            if (this.spacePoints === undefined) {
                return this.path.getPoint(this.t, this.pathVector);

            } else {
                var start = (this.spacePoints.length - 1) * t;
                var index = Math.floor(start);
                var p0 = this.spacePoints[index],
                    p1 = this.spacePoints[index + 1];
                if (!p1) {
                    this.pathVector.x = p0.x;
                    this.pathVector.y = p0.y;
                } else {
                    var remainderT = start - index;
                    this.pathVector.x = Linear(p0.x, p1.x, remainderT);
                    this.pathVector.y = Linear(p0.y, p1.y, remainderT);
                }
                return this.pathVector;
            }
        }

        update() {
            if (this.path === undefined) {
                return;
            }

            var gameObject = this.parent;
            var curX = gameObject.x,
                curY = gameObject.y;
            this.pathVector = this.getPoint(this._t);
            var newX = this.pathVector.x,
                newY = this.pathVector.y;

            if ((curX === newX) && (curY === newY)) {
                return;
            }

            gameObject.setPosition(newX, newY);
            if (this.rotateToPath) {
                gameObject.rotation = AngleBetween(curX, curY, newX, newY) + this.rotationOffset;
            }
        }
    }

    class PathFollowerPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return new PathFollower(gameObject, config);
        }

    }

    return PathFollowerPlugin;

}));
