(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexawaitloaderplugin = factory());
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

    var IsFunction = function (obj) {    
        return obj && (typeof(obj) === 'function');
    };

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

    const loaderCallback = function (key, config) {
        if (IsFunction(key)) {
            var callback = key;
            var scope = config;
            config = {
                config: {
                    callback: callback,
                    scope: scope,
                }
            };
        } else if (IsPlainObject(key)) {
            config = key;
            if (!config.hasOwnProperty('config')) {
                config = {
                    config: config
                };
            }
        } else {
            config = {
                key: key,
                config: config
            };
        }
        this.addFile(new AwaitFile(this, config));

        return this;
    };

    class AwaitLoaderPlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);

            pluginManager.registerFileType('rexAwait', loaderCallback);
        }

        addToScene(scene) {
            scene.sys.load.rexAwait = loaderCallback;
        }
    }

    return AwaitLoaderPlugin;

}));
