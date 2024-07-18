(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexfiledropzone = factory());
})(this, (function () { 'use strict';

    var Resize = function (width, height) {
        if (this.scene.sys.scale.autoRound) {
            width = Math.floor(width);
            height = Math.floor(height);
        }

        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        var style = this.node.style;
        style.width = `${width}px`;
        style.height = `${height}px`;
        this.updateSize();
        return this;
    };

    var SyncTo = function (gameObject) {
        this.setOrigin(gameObject.originX, gameObject.originY);
        this.setPosition(gameObject.x, gameObject.y);
        this.resize(gameObject.displayWidth, gameObject.displayHeight);
        return this;
    };

    const GameClass = Phaser.Game;
    var IsGame = function (object) {
        return (object instanceof GameClass);
    };

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
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

    var LoadFile = function (file, loaderType, key, cacheType, onComplete) {
        var scene = this.scene;
        FileObjectToCache(scene, file, loaderType, key, cacheType, onComplete);

        return this;
    };

    var LoadFilePromise = function (file, loaderType, key, cacheType) {
        var scene = this.scene;
        return new Promise(function (resolve, reject) {
            var onComplete = function (data) {
                resolve(data);
            };
            FileObjectToCache(scene, file, loaderType, key, cacheType, onComplete);
        });
    };

    var LoadFileMethods = {
        loadFile: LoadFile,
        loadFilePromise: LoadFilePromise,
    };

    var DropEnableMethods = {
        setDropEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }

            this.dropEnable = enable;
            return this;
        },

        toggleDropEnable() {
            this.dropEnable = !this.dropEnable;
            return this;
        },
    };

    var FilterMethods = {
        addFilter(name, callback) {
            if (!this.filters) {
                this.filters = {};
            }
            this.filters[name] = callback;
            return this;
        },

        addFilters(filters) {
            if (!this.filters) {
                this.filters = {};
            }
            for (var name in filters) {
                this.filters[name] = filters[name];
            }
            return this;
        },
    };

    var Methods = {
        resize: Resize,
        syncTo: SyncTo,
    };

    Object.assign(
        Methods,
        DropEnableMethods,
        FilterMethods,
        LoadFileMethods,
    );

    const DragDropEvents = {
        dragenter: 'dragenter',
        dragleave: 'dragleave',
        dragover: 'dragover',
        drop: 'drop',
    };

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    var RouteEvents = function (gameObject, element, elementEvents, config) {
        var preventDefault = GetValue$1(config, 'preventDefault', false);
        var preTest = GetValue$1(config, 'preTest');
        for (let elementEventName in elementEvents) {  // Note: Don't use `var` here
            element.addEventListener(elementEventName, function (e) {
                if (!preTest || preTest(gameObject, elementEventName)) {
                    gameObject.emit(elementEvents[elementEventName], gameObject, e);
                }

                if (preventDefault) {
                    e.preventDefault();
                }
            });
        }
    };

    const DOMElement = Phaser.GameObjects.DOMElement;
    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class FileDropZone extends DOMElement {
        constructor(scene, x, y, width, height, config) {
            if (IsPlainObject(x)) {
                config = x;
                x = GetValue(config, 'x', 0);
                y = GetValue(config, 'y', 0);
                width = GetValue(config, 'width', 0);
                height = GetValue(config, 'height', 0);
            } else if (IsPlainObject(width)) {
                config = width;
                width = GetValue(config, 'width', 0);
                height = GetValue(config, 'height', 0);
            }

            if (config === undefined) {
                config = {};
            }

            var element = document.createElement('div');

            var style = GetValue(config, 'style', undefined);
            super(scene, x, y, element, style);
            this.type = 'rexFileDropZone';
            this.resize(width, height);

            this._files = [];
            this.setDropEnable(GetValue(config, 'dropEnable', true));

            var filters = GetValue(config, 'filters');
            if (filters) {
                this.addFilters(filters);
            }

            // Apply events
            RouteEvents(this, element, DragDropEvents, {
                preventDefault: true,
                preTest(gameObject) { return gameObject.dropEnable; }
            });

            this
                .on('drop', function (gameObject, e) {
                    this._files = e.dataTransfer.files;
                    var files = this._files;
                    if (files && this.filters) {
                        for (var filterType in this.filters) {
                            var filterCallback = this.filters[filterType];

                            var filteredFiles = [];
                            for (var i = 0, cnt = files.length; i < cnt; i++) {
                                var file = files[i];
                                if (filterCallback(file, files)) {
                                    filteredFiles.push(file);
                                }
                            }

                            if (filteredFiles.length > 0) {
                                this.emit(`drop.${filterType}`, filteredFiles);
                            }
                        }
                    }
                }, this);
        }

        get files() {
            return this._files;
        }
    }

    Object.assign(
        FileDropZone.prototype,
        Methods,
    );

    return FileDropZone;

}));
