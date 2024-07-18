(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexscripttagloaderplugin = factory());
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

    var LoadScript = function (url, onload) {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0, cnt = scripts.length; i < cnt; i++) {
            if (scripts[i].src.indexOf(url) != -1) {
                if (onload) {
                    onload();
                }
                return;
            }
        }

        var newScriptTag = document.createElement('script');
        newScriptTag.setAttribute('src', url);

        if (onload) {
            newScriptTag.onload = onload;
        }

        document.head.appendChild(newScriptTag);
    };

    var LoadScriptPromise = function (url) {
        return new Promise(function (resolve, reject) {
            LoadScript(url, resolve);
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

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetFastValue = Phaser.Utils.Objects.GetFastValue;

    const LoaderCallback = function (url) {
        if (Array.isArray(url)) {
            for (var i = 0, cnt = url.length; i < cnt; i++) {
                this.addFile(CreateAwiatFile(this, url[i]));
            }
        } else {
            this.addFile(CreateAwiatFile(this, url));
        }
        return this;
    };

    var CreateAwiatFile = function (loader, url, availableTest) {
        if (IsPlainObject(url)) {
            var config = url;
            url = GetFastValue(config, 'url');
            availableTest = GetFastValue(config, 'availableTest');
        }

        var callback = function (successCallback, failureCallback) {

            LoadScriptPromise(url)
                .then(function () {
                    if (!availableTest) {
                        return Promise.resolve();
                    }

                    var AvailableTestPromise = function () {
                        if (availableTest()) {
                            return Promise.resolve();
                        }

                        return Delay(10)
                            .then(function () {
                                return AvailableTestPromise();
                            });
                    };
                    return AvailableTestPromise();
                })
                .then(function () {
                    successCallback();
                });
        };

        return new AwaitFile(loader, {
            type: 'scriptTag',
            config: { callback: callback }
        });
    };

    class ScriptTagLoaderPlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);

            pluginManager.registerFileType('rexScriptTag', LoaderCallback);
        }

        addToScene(scene) {
            scene.sys.load.rexScriptTag = LoaderCallback;
        }
    }

    return ScriptTagLoaderPlugin;

}));
