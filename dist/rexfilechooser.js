(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.rexfilechooser = {}));
})(this, (function (exports) { 'use strict';

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    var CreateFileInput = function (game, config) {
        var fileInput = document.createElement('input');
        fileInput.type = 'file';

        var accept = GetValue$2(config, 'accept', '');
        var multiple = GetValue$2(config, 'multiple', false);

        fileInput.setAttribute('accept', accept);
        if (multiple) {
            fileInput.setAttribute('multiple', '');
        } else {
            fileInput.removeAttribute('multiple');
        }

        return fileInput;
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

    var WaitEvent = function (eventEmitter, eventName) {
        return new Promise(function (resolve, reject) {
            eventEmitter.once(eventName, function () {
                resolve();
            });
        });
    };

    var Delay = function (time, result) {
        if (time === undefined) {
            time = 0;
        }
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(result);
            }, time);
        });
    };

    var ClickPromise = function ({ game, fileInput, closeDelay }) {
        return WaitEvent(GetGame(game).events, 'focus')
            .then(function () {
                return Delay(closeDelay);
            })
            .then(function () {
                var result = {
                    files: fileInput.files
                };

                return Promise.resolve(result);
            })
    };

    // Note: Not working in iOS9+


    const GetValue$1 = Phaser.Utils.Objects.GetValue;
    const RemoveFromDOM = Phaser.DOM.RemoveFromDOM;

    var Open = function (game, config) {
        // game: game, scene, or game object
        var closeDelay = GetValue$1(config, 'closeDelay', 200);
        var fileInput = CreateFileInput(game, config);
        fileInput.click();
        return ClickPromise({ game, fileInput, closeDelay })
            .then(function (result) {
                RemoveFromDOM(fileInput);
                fileInput.remove();
                return Promise.resolve(result);
            })
    };

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

    const DOMElement = Phaser.GameObjects.DOMElement;
    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class FileChooser extends DOMElement {
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

            // Create a hidden file input
            var inputElement = document.createElement('input');
            inputElement.type = 'file';
            var inputStyle = inputElement.style;
            inputStyle.display = 'none';

            // Create a label parent
            var labelElement = document.createElement('label');
            labelElement.appendChild(inputElement);

            var style = GetValue(config, 'style', undefined);
            super(scene, x, y, labelElement, style);
            this.type = 'rexFileChooser';
            this.resetFromJSON(config);
            this.resize(width, height);

            // Register events
            var self = this;
            inputElement.onchange = function () {
                self.emit('change', self);
            };

            this.setCloseDelay(GetValue(config, 'closeDelay', 200));
            inputElement.onclick = function () {
                ClickPromise({
                    game: scene,
                    fileInput: inputElement,
                    closeDelay: self.closeDelay
                })
                    .then(function () {
                        self.emit('select', self);
                    });
            };
        }

        resetFromJSON(config) {
            this.setAccept(GetValue(config, 'accept', ''));
            this.setMultiple(GetValue(config, 'multiple', false));
            return this;
        }

        setAccept(accept) {
            if (accept === undefined) {
                accept = '';
            }
            this.fileInput.setAttribute('accept', accept);
            return this;
        }

        setMultiple(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            if (enabled) {
                this.fileInput.setAttribute('multiple', '');
            } else {
                this.fileInput.removeAttribute('multiple');
            }
            return this;
        }

        setCloseDelay(delay) {
            if (delay === undefined) {
                delay = 200;
            }
            this.closeDelay = delay;
            return this;
        }

        get fileInput() {
            return this.node.children[0];
        }

        open() { // Only work under any touch event
            this.fileInput.click();
            return this;
        }

        get files() {
            return this.fileInput.files;
        }

        setOpenEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.fileInput.disabled = !enable;
            return this;
        }
    }

    var methods = {
        resize: Resize,
        syncTo: SyncTo,
    };

    Object.assign(
        FileChooser.prototype,
        methods,
        LoadFileMethods,
    );

    exports.FileChooser = FileChooser;
    exports.OpenFileChooser = Open;

}));
