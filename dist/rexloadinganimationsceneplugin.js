(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexloadinganimationsceneplugin = factory());
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

    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;

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
        } else if (IsPlainObject$1(key)) {
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

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
    };

    var GetLoader = function (loader) {
        if (IsSceneObject(loader)) {
            var scene = loader;
            return scene.load;
        }

        return loader;
    };

    var GetProgress = function (loader, ignoreTaskCount) {
        if (ignoreTaskCount === undefined) {
            ignoreTaskCount = 0;
        }

        loader = GetLoader(loader);
        var total = loader.totalToLoad - ignoreTaskCount;
        var remainder = loader.list.size + loader.inflight.size - ignoreTaskCount;
        var progress = 1 - (remainder / total);
        return progress;
    };

    class LastLoadTask extends Phaser.Events.EventEmitter {
        constructor(scene) {
            super();
            this.scene = scene;

            this.boot();
        }

        boot() {
            var self = this;
            var loader = this.scene.load;

            loaderCallback.call(loader, function (successCallback, failureCallback) {
                var onProgress = function () {
                    var progress = GetProgress(loader, 1);
                    self.emit('progress', progress);

                    if (progress === 1) {
                        var count = self.listenerCount('complete');
                        if (count === 0) {
                            onProgressComplete();
                        } else {
                            self.emit('complete', onProgressComplete);
                        }
                    }
                };

                var runOnce = false;
                var onProgressComplete = function () {
                    if (runOnce) {
                        return;
                    }
                    runOnce = true;
                    self.emit('shutdown');
                    loader.off('progress', onProgress);
                    successCallback();
                    self.destroy();
                };

                loader.on('progress', onProgress);
            });
        }

        destroy() {
            this.scene = undefined;
            super.destroy();
        }
    }

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

    var StartLoadingAnimationScene = function (
        mainScene,
        animationSceneKey, data,
        onLoadingComplete,
        onLoadingProgress
    ) {

        if (IsPlainObject(mainScene)) {
            var config = mainScene;
            mainScene = config.mainScene;
            animationSceneKey = config.animationScene;
            onLoadingComplete = config.onLoadingComplete;
            onLoadingProgress = config.onLoadingProgress;
        } else {
            if (typeof (data) === 'function') {
                onLoadingProgress = onLoadingComplete;
                onLoadingComplete = data;
                data = undefined;
            }
        }

        if (IsSceneObject(animationSceneKey)) {
            var animationScene = animationSceneKey;
            animationSceneKey = animationScene.sys.settings.key;
        }

        // Don't launch animation scene if it has been started
        if (mainScene.scene.getStatus(animationSceneKey) < Phaser.Scenes.START) { // Phaser.Scenes.START = 2
            mainScene.scene.launch(animationSceneKey, data);
        }

        var animationScene = mainScene.scene.get(animationSceneKey);
        (new LastLoadTask(mainScene))
            .on('progress', function (progress) {
                if (onLoadingProgress) {
                    onLoadingProgress(progress, animationScene);
                }
            })
            .on('complete', function (onProgressComplete) {
                if (!onLoadingComplete) {
                    onProgressComplete();
                } else {
                    onLoadingComplete(onProgressComplete, animationScene);
                }
            })
            .on('shutdown', function () {
                animationScene.scene.stop();
            });

    };

    class LoadingAnimationScenePlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);

            pluginManager.registerFileType('rexAwait', loaderCallback);
        }

        addToScene(scene) {
            scene.sys.load.rexAwait = loaderCallback;
        }

        startScene(scene, animationSceneKey, data, onLoadingComplete) {
            StartLoadingAnimationScene(scene, animationSceneKey, data, onLoadingComplete);
        }
    }

    return LoadingAnimationScenePlugin;

}));
