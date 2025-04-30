(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexawaitcomlinkloaderplugin = factory());
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

                        // Invoke onLoad next tick
                        setTimeout(function () {
                            self.onLoad();
                        }, 0);

                        runOnce = true;
                    };
                    var failureCallback = function () {
                        if (runOnce) {
                            return;
                        }

                        // Invoke onError next tick
                        setTimeout(function () {
                            self.onError();
                        }, 0);

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

    const IDLE = 0;
    const LOADING = 1;
    const LOADED = 2;

    var AwaitComlinkScriptState = IDLE;

    var SetState = function (state) {
        AwaitComlinkScriptState = state;
    };

    var IsIdle = function () {
        return (AwaitComlinkScriptState === IDLE);
    };

    var IsLoaded = function () {
        return (AwaitComlinkScriptState === LOADED);
    };

    class AwaitComlinkScriptFile extends AwaitFile {
        constructor(loader, url) {
            if (url === undefined) {
                url = 'https://unpkg.com/comlink/dist/umd/comlink.js';
            }

            var callback = function (successCallback, failureCallback) {
                if (window.Comlink) {
                    SetState(LOADED);
                    successCallback();

                } else {
                    LoadScriptPromise(url)
                        .then(function () {
                            SetState(LOADED);
                            successCallback();
                        });

                }
            };

            if (IsIdle) {
                SetState(LOADING);
            }

            super(loader, {
                type: 'comlink',
                key: 'comlink',
                config: { callback: callback }
            });
        }
    }

    const DefaultWorker = `\
importScripts('https://unpkg.com/comlink/dist/umd/comlink.js');
(() => {
    async function run(data, onBefore, onAfter) {
        var newData;
        if (onBefore) {
            newData = await onBefore(data);
            if (newData !== undefined) {
                data = newData;
            }
        }

        if (onAfter) {
            newData = await onAfter(data);
            if (newData !== undefined) {
                data = newData;
            }
        }

        return data;
    }
    Comlink.expose(run);
})();\
`;

    const GetFastValue = Phaser.Utils.Objects.GetFastValue;

    const LoaderCallback = function (config) {
        var loader = this;

        if (IsIdle()) {
            if (window.Comlink) {
                SetState(LOADED);

            } else {
                // Comlink script is not loaded
                var comlinkFilePath = GetFastValue(config, 'comlink');
                loader.addFile(new AwaitComlinkScriptFile(loader, comlinkFilePath));

            }

        }

        if (IsLoaded()) {
            // Comlink script is loaded
            // Can run Comlink directly
            this.addFile(CreateAwiatFile(this, config));

        } else {
            // Comlink script is loaded under this event
            loader.once('filecomplete-comlink-comlink', function () {
                // Run Comlink directly
                this.addFile(CreateAwiatFile(loader, config));
            });

        }

        return this;
    };

    var CreateAwiatFile = function (loader, config) {
        var workerFilePath = GetFastValue(config, 'workerFilePath');
        var workerCode = GetFastValue(config, 'workerCode');
        var runMethod = GetFastValue(config, 'run');
        var data = GetFastValue(config, 'data');
        var terminateWorker = GetFastValue(config, 'terminateWorker', true);

        var onBegin = GetFastValue(config, 'onBegin');
        var onBeforeWorker = GetFastValue(config, 'onBeforeWorker');
        var onAfterWorker = GetFastValue(config, 'onAfterWorker');
        var onEnd = GetFastValue(config, 'onEnd');

        var callback = async function (successCallback, failureCallback) {
            var worker;
            if (workerFilePath) {
                worker = new Worker(workerFilePath);
            } else {
                if (!workerCode) {
                    workerCode = DefaultWorker;
                }
                var blob = new Blob([workerCode], { type: 'application/javascript' });
                worker = new Worker(URL.createObjectURL(blob));
            }

            var newData;

            var comlinkObj = Comlink.wrap(worker);

            if (onBeforeWorker) {
                onBeforeWorker = Comlink.proxy(onBeforeWorker);
            }
            if (onAfterWorker) {
                onAfterWorker = Comlink.proxy(onAfterWorker);
            }

            if (onBegin) {
                var newData = await onBegin(data, comlinkObj, worker);
                if (newData !== undefined) {
                    data = newData;
                }
            }

            if (runMethod) {
                data = await comlinkObj[runMethod](data, onBeforeWorker, onAfterWorker);
            } else {
                data = await comlinkObj(data, onBeforeWorker, onAfterWorker);
            }


            if (onEnd) {
                newData = await onEnd(data, comlinkObj, worker);
                if (newData !== undefined) {
                    data = newData;
                }
            }

            if (terminateWorker) {
                worker.terminate();
            }

            if (data) {
                successCallback();
            } else {
                failureCallback();
            }
        };

        return new AwaitFile(loader, {
            type: 'scriptTag',
            config: { callback: callback }
        });
    };

    class AwaitComlinkLoaderPlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);

            pluginManager.registerFileType('rexAwaitComlink', LoaderCallback);
        }

        addToScene(scene) {
            scene.sys.load.rexAwaitComlink = LoaderCallback;
        }
    }

    return AwaitComlinkLoaderPlugin;

}));
