(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexfullwindowrectangleplugin = factory());
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

    const GetValue = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue(config, 'eventEmitter', true));

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

    const LayerClass = Phaser.GameObjects.Layer;

    var IsLayerGameObject = function (gameObject) {
        return (gameObject instanceof LayerClass);
    };

    var GetLayer = function (gameObject) {
        var layer = gameObject.displayList;
        if (!IsLayerGameObject(layer)) {
            return null;
        }

        return layer;

    };

    var GetRootGameObject = function (gameObject) {
        if (gameObject.parentContainer) {  // At a container
            return GetRootGameObject(gameObject.parentContainer);
        }

        var layer = GetLayer(gameObject);
        if (layer) {  // At a layer
            return GetRootGameObject(layer);
        }

        return gameObject;
    };

    var GetFirstRenderCamera = function (gameObject) {
        var cameraFilter = GetRootGameObject(gameObject).cameraFilter;
        var cameras = gameObject.scene.sys.cameras.cameras;
        var camera, isCameraIgnore;
        for (var i = 0, cnt = cameras.length; i < cnt; i++) {
            camera = cameras[i];

            isCameraIgnore = (cameraFilter & camera.id) > 0;
            if (!isCameraIgnore) {
                return camera;
            }
        }

        return null;
    };

    class FullWindow extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject);
            // this.parent = gameObject;

            this.targetCamera = undefined;
            this.boot();
        }

        boot() {
            this.scene.sys.events.on('prerender', this.resize, this);
        }

        destroy() {
            if (!this.scene) {
                return;
            }

            this.scene.sys.events.off('prerender', this.resize, this);

            super.destroy();
        }


        resize() {
            var scene = this.scene;
            var gameObject = this.parent;

            var camera = GetFirstRenderCamera(gameObject);
            if (!camera) {
                return;
            }

            gameObject
                .setScrollFactor(0)
                .setOrigin(0.5);

            var gameSize = scene.sys.scale.gameSize;
            var gameWidth = gameSize.width,
                gameHeight = gameSize.height,
                scale = 1 / camera.zoom;

            // Origin is fixed to (0.5,0.5)
            var x = gameWidth / 2,
                y = gameHeight / 2;

            var width = gameWidth * scale,
                height = gameHeight * scale;

            if ((gameObject.x !== x) || (gameObject.y !== y)) {
                gameObject.setPosition(x, y);
            }

            if ((gameObject.width !== width) || (gameObject.height !== height)) {
                gameObject.setSize(width, height);
            }

        }


    }

    const Rectangle = Phaser.GameObjects.Rectangle;

    class FullWindowRectangle extends Rectangle {
        constructor(scene, color, alpha) {
            super(scene, 0, 0, 2, 2, color, 1);

            this.fullWindow = new FullWindow(this);

            this.setAlpha(alpha);
        }

        get tint() {
            return this.fillColor;
        }

        set tint(value) {
            this.setFillStyle(value, this.fillAlpha);
        }
    }

    function Factory (fillColor, fillAlpha) {
        var gameObject = new FullWindowRectangle(this.scene, fillColor, fillAlpha);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var fillColor = GetAdvancedValue(config, 'color', undefined);
        var fillAlpha = GetAdvancedValue(config, 'alpha', undefined);
        var gameObject = new FullWindowRectangle(this.scene, fillColor, fillAlpha);

        BuildGameObject(this.scene, gameObject, config);

        return gameObject;
    }

    var IsNil = function (value) {
        return value === null || value === undefined;
    };

    var IsObjectLike = function (value) {
        return value !== null && typeof value === 'object';
    };

    var NormalizePath = function (path, delimiter) {
        if (Array.isArray(path)) ; else if (typeof path !== 'string') {
            path = [];
        } else if (path.trim() === '') {
            path = [];
        } else {
            path = path.split(delimiter).filter(Boolean);
        }
        return path;
    };

    /**
     * Set a nested value into target by path (mutates target).
     *
     * - If keys is a string and does NOT contain delimiter, write directly.
     * - Intermediate non-plain-object values are always overwritten with {}.
     *
     * @param {object} target
     * @param {string|string[]} keys
     * @param {*} value
     * @param {string} [delimiter='.']
     * @returns {object} the same target reference
     */
    var SetValue = function (target, keys, value, delimiter = '.') {
        if (!IsObjectLike(target)) {
            return target;
        }

        // Invalid key: no-op; don't replace root
        if (IsNil(keys) || keys === '' || (Array.isArray(keys) && keys.length === 0)) {
            return target;
        }

        // Fast path: single key
        if (typeof keys === 'string' && keys.indexOf(delimiter) === -1) {
            target[keys] = value;
            return target;
        }

        var pathSegments = NormalizePath(keys, delimiter);
        if (pathSegments.length === 0) {
            return target;
        }

        var cursor = target;
        var pathSegmentsCount = pathSegments.length;

        for (var index = 0; index < pathSegmentsCount - 1; index++) {
            var segment = pathSegments[index];
            var next = cursor[segment];

            if (!IsObjectLike(next)) {
                // Force overwrite intermediates
                cursor[segment] = {};
            }

            cursor = cursor[segment];
        }

        cursor[pathSegments[pathSegmentsCount - 1]] = value;
        return target;
    };

    class FullWindowRectanglePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexFullWindowRectangle', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.FullWindowRectangle', FullWindowRectangle);

    return FullWindowRectanglePlugin;

}));
