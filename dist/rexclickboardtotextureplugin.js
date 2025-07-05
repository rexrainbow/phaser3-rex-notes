(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexclickboardtotextureplugin = factory());
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

    class ClickboardPaster {
        constructor(type, callback) {
            this.handler = function (event) {
                var items = event.clipboardData.items;
                switch (type) {
                    case 'image':
                        for (var item of items) {
                            if (item.type.startsWith('image/')) {
                                callback(item.getAsFile());
                            }
                        }
                        break;

                    default:
                        for (var item of items) {
                            if (item.kind === 'string') {
                                item.getAsString(callback);
                                return;
                            }
                        }
                        break;
                }
            };

            this.boot();
        }

        boot() {
            document.addEventListener('paste', this.handler);
        }

        destroy() {
            document.removeEventListener('paste', this.handler);
            this.handler = null;
        }
    }

    var GetCache = function (game, loaderType, cacheType) {
        if (cacheType === undefined) {
            switch (loaderType) {
                case 'image':
                case 'svg':
                    cacheType = 'textures';
                    break;

                case 'animation':
                    cacheType = 'json';
                    break;

                case 'tilemapTiledJSON':
                case 'tilemapCSV':
                    cacheType = 'tilemap';
                    break;

                case 'glsl':
                    cacheType = 'shader';
                    break;

                default:
                    cacheType = loaderType;
                    break;
            }
        }

        game = GetGame(game);
        var cache;
        if (cacheType === 'textures') {
            cache = game.textures;
        } else {
            cache = game.cache[cacheType];
        }
        return cache;
    };

    var IsFunction = function (obj) {    
        return obj && (typeof(obj) === 'function');
    };

    var FileObjectToCache = function (scene, file, loaderType, key, cacheType, onComplete) {
        // Remove data from cache
        if ((cacheType === null) || (cacheType === false)) ; else if (IsFunction(cacheType)) {
            cacheType();
        } else {
            var cache = GetCache(scene, loaderType, cacheType);
            if (cache.exists(key)) {
                cache.remove(key);
            }
        }

        // Add filecomplete event
        var loader = scene.load;
        if (onComplete) {
            loader.once(`filecomplete-${loaderType}-${key}`, function (key, type, data) {
                onComplete(data);
            });
        }

        // Load file from url
        if (IsFunction(file)) {
            file();
        } else {
            var url = window.URL.createObjectURL(file);
            loader[loaderType](key, url);
        }

        loader.start();
    };

    const GetValue = Phaser.Utils.Objects.GetValue;

    class ClickboardToTexture extends ComponentBase {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            super(scene, config);
            // this.scene

            this.setKey(GetValue(config, 'key'));

            var self = this;
            var onPaste = function (file) {
                FileObjectToCache(self.scene, file, 'image', self.key, undefined, function () {
                    self.emit('paste', self.key);
                });
            };
            this.clickboardPaster = new ClickboardPaster('image', onPaste);
        }

        setKey(key) {
            this.key = key;
            return this;
        }

        destroy() {
            this.clickboardPaster.destroy();
            this.clickboardPaster = null;
        }
    }

    class ClickboardToTexturePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(scene, config) {
            return new ClickboardToTexture(scene, config);
        }
    }

    return ClickboardToTexturePlugin;

}));
