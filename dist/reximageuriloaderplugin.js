(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.reximageuriloaderplugin = factory());
})(this, (function () { 'use strict';

    const FILE_POPULATED = Phaser.Loader.FILE_POPULATED;
    const UUID = Phaser.Utils.String.UUID;

    class AwaitFile extends Phaser.Loader.File {
        constructor(loader, fileConfig) {
            if (!fileConfig.hasOwnProperty('type')) {
                fileConfig.type = 'await';
            }
            if (!fileConfig.hasOwnProperty('url')) {
                fileConfig.url = '';
            }
            if (!fileConfig.hasOwnProperty('key')) {
                fileConfig.key = UUID();
            }
            super(loader, fileConfig);
        }

        load() {
            if (this.state === FILE_POPULATED) {
                //  Can happen for example in a JSONFile if they've provided a JSON object instead of a URL
                this.loader.nextFile(this, true);
            } else {
                // start loading task
                var config = this.config;
                var callback = config.callback;
                var scope = config.scope;
                if (callback) {

                    var self = this;
                    var runOnce = false;
                    var successCallback = function () {
                        if (runOnce) {
                            return;
                        }

                        self.onLoad();
                        runOnce = true;
                    };
                    var failureCallback = function () {
                        if (runOnce) {
                            return;
                        }

                        self.onError();
                        runOnce = true;
                    };

                    if (scope) {
                        callback.call(scope, successCallback, failureCallback);
                    } else {
                        callback(successCallback, failureCallback);
                    }
                } else {
                    this.onLoad();
                }
            }
        }

        onLoad() {
            this.loader.nextFile(this, true);
        }

        onError() {
            this.loader.nextFile(this, false);
        }
    }

    const LoaderCallback = function (key, uri, frameConfig) {
        this.addFile(CreateAwiatFile(this, key, uri, frameConfig));
        return this;
    };

    var CreateAwiatFile = function (loader, key, uri, frameConfig) {
        var callback = function (successCallback, failureCallback) {
            var imageElement = new Image();
            imageElement.onload = function () {
                if (frameConfig === undefined) {
                    loader.textureManager.addImage(key, imageElement);
                } else {
                    loader.textureManager.addSpriteSheet(key, imageElement, frameConfig);
                }
                successCallback();
            };
            imageElement.src = uri;
        };

        return new AwaitFile(loader, {
            type: 'imageuri',
            config: {
                key: key,
                callback: callback
            }
        });
    };

    class ImageURILoaderPlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);

            pluginManager.registerFileType('rexImageURI', LoaderCallback);
        }

        addToScene(scene) {
            scene.sys.load['rexImageURI'] = LoaderCallback;
        }
    }

    return ImageURILoaderPlugin;

}));
