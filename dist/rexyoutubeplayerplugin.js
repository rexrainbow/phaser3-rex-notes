(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexyoutubeplayerplugin = factory());
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

    var IsAPIReady = false;
    var LoadAPI = function (onLoaded) {
        if (IsAPIReady) {
            onLoaded();
        } else {
            if (!window.onYouTubeIframeAPIReady) {
                window.onYouTubeIframeAPIReady = function () {
                    IsAPIReady = true;
                    for(var i=0, cnt = CallbackQueue.length; i<cnt; i++) {
                        CallbackQueue[i]();
                    }
                    CallbackQueue = undefined;
                };
                LoadScript('https://www.youtube.com/iframe_api');
                // Function onYouTubeIframeAPIReady() should be defined before loading 
            }
            CallbackQueue.push(onLoaded);
        }
    };
    var CallbackQueue = [];

    const DOMElement = Phaser.GameObjects.DOMElement;
    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;
    const UUID = Phaser.Utils.String.UUID;

    class YoutubePlayer extends DOMElement {
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

            super(scene, x, y);
            this.type = 'rexYoutubePlayer';
            this.youtubePlayer = undefined;
            this.videoState = undefined;
            this.videoId = GetValue(config, 'videoId', '');
            this.loop = GetValue(config, 'loop', false);
            this.paddingCallbacks = [];

            // Create DIV element and add it
            var elementId = `YT${UUID()}`;
            var element = document.createElement('div');
            element.id = elementId;
            this.setElement(element);
            this.resize(width, height);

            // Create youtube player iframe when API ready
            var playerVars = {
                autoplay: GetValue(config, 'autoPlay', true) ? 1 : 0,
                controls: GetValue(config, 'controls', true) ? 1 : 0,
                disablekb: !GetValue(config, 'keyboardControl', true) ? 1 : 0,
                modestbranding: GetValue(config, 'modestBranding', false) ? 1 : 0,
            };
            var onLoad = (function () {
                var youtubePlayer = new YT.Player(
                    elementId,
                    {
                        'videoId': this.videoId,
                        'playerVars': playerVars,
                        'events': {
                            'onStateChange': (function (event) {
                                this.videoState = event.data;

                                this.emit('statechange', this);
                                this.emit(this.videoStateString, this);

                                if ((this.videoState === YT.PlayerState.ENDED) && this.loop) {
                                    this.youtubePlayer.playVideo();
                                }
                            }).bind(this),
                            'onReady': (function (event) {
                                this.youtubePlayer = youtubePlayer;
                                for (var i = 0, cnt = this.paddingCallbacks.length; i < cnt; i++) {
                                    this.paddingCallbacks[i]();
                                }
                                this.paddingCallbacks = undefined;
                                this.emit('ready', this);
                            }).bind(this),
                            'onError': (function (event) {
                                this.lastError = event.data;
                                this.emit('error', this, this.lastError);
                            }).bind(this),
                        }
                    }
                );
                this.setElement(document.getElementById(elementId)); // Also remove previous DIV element
            }).bind(this);
            LoadAPI(onLoad);
        }

        _runCallback(callback) {
            if (this.youtubePlayer === undefined) {
                this.paddingCallbacks.push(callback);
            } else {
                callback();
            }
        }

        get videoStateString() {
            if ((this.videoState === undefined) || (!YT)) {
                return '';
            } else {
                switch (this.videoState) {
                    case -1: return "unstarted";
                    case YT.PlayerState.ENDED: return "ended";
                    case YT.PlayerState.PLAYING: return "playing";
                    case YT.PlayerState.PAUSED: return "pause";
                    case YT.PlayerState.BUFFERING: return "buffering";
                    case YT.PlayerState.CUED: return "cued";
                }
            }
        }

        load(videoId, autoPlay) {
            if (autoPlay === undefined) {
                autoPlay = true;
            }

            var callback = (function () {
                this.youtubePlayer.loadVideoById(videoId);
                if (autoPlay) {
                    this.youtubePlayer.playVideo();
                } else {
                    this.youtubePlayer.pauseVideo();
                }
            }).bind(this);

            this._runCallback(callback);
            return this;
        }

        play() {
            var callback = (function () {
                this.youtubePlayer.playVideo();
            }).bind(this);

            this._runCallback(callback);
            return this;
        }

        get isPlaying() {
            return (this.videoState === 1); // YT.PlayerState.PLAYING
        }

        pause() {
            var callback = (function () {
                this.youtubePlayer.pauseVideo();
            }).bind(this);

            this._runCallback(callback);
            return this;
        }

        get isPaused() {
            return (this.videoState === 2); // YT.PlayerState.PAUSED
        }

        get playbackTime() {
            return (this.youtubePlayer) ? this.youtubePlayer.getCurrentTime() : 0;
        }

        set playbackTime(value) {
            var callback = (function () {
                this.youtubePlayer.seekTo(value);
            }).bind(this);

            this._runCallback(callback);
        }

        setPlaybackTime(time) {
            this.playbackTime = time;
            return this;
        }

        get duration() {
            return (this.youtubePlayer) ? this.youtubePlayer.getDuration() : 0;
        }

        get t() {
            var duration = this.duration;
            return (duration === 0) ? 0 : this.playbackTime / duration;
        }

        set t(value) {
            var callback = (function () {
                value = Clamp(value, 0, 1);
                this.playbackTime = this.duration * Clamp(value, 0, 1);
            }).bind(this);

            this._runCallback(callback);
        }

        setT(value) {
            this.t = value;
            return this;
        }

        get hasEnded() {
            return (this.videoState === 0); // YT.PlayerState.ENDED
        }

        get volume() {
            return (this.youtubePlayer) ? (this.youtubePlayer.getVolume() / 100) : 0;
        }

        set volume(value) {
            var callback = (function () {
                this.youtubePlayer.setVolume(Clamp(value * 100, 0, 100));
            }).bind(this);

            this._runCallback(callback);
        }

        setVolume(value) {
            this.volume = value;
            return this;
        }

        get muted() {
            return (this.youtubePlayer) ? this.youtubePlayer.isMuted() : false;
        }

        set muted(value) {
            var callback = (function () {
                if (value) {
                    this.youtubePlayer.mute();
                } else {
                    this.youtubePlayer.unMute();
                }
            }).bind(this);

            this._runCallback(callback);
        }

        setMute(value) {
            if (value === undefined) {
                value = true;
            }
            this.muted = value;
            return this;
        }

        setLoop(value) {
            if (value === undefined) {
                value = true;
            }
            this.loop = value;
            return this;
        }
    }

    var methods = {
        resize: Resize
    };

    Object.assign(
        YoutubePlayer.prototype,
        methods
    );

    function Factory (x, y, width, height, config) {
        var gameObject = new YoutubePlayer(this.scene, x, y, width, height, config);
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
        var width = GetAdvancedValue(config, 'width', undefined);
        var height = GetAdvancedValue(config, 'height', undefined);
        var gameObject = new YoutubePlayer(this.scene, 0, 0, width, height, config);
        BuildGameObject(this.scene, gameObject, config);
        return gameObject;
    }

    var IsInValidKey = function (keys) {
        return (keys == null) || (keys === '') || (keys.length === 0);
    };

    var GetEntry = function (target, keys, defaultEntry) {
        var entry = target;
        if (IsInValidKey(keys)) ; else {
            if (typeof (keys) === 'string') {
                keys = keys.split('.');
            }

            var key;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                key = keys[i];
                if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
                    var newEntry;
                    if (i === cnt - 1) {
                        if (defaultEntry === undefined) {
                            newEntry = {};
                        } else {
                            newEntry = defaultEntry;
                        }
                    } else {
                        newEntry = {};
                    }

                    entry[key] = newEntry;
                }

                entry = entry[key];
            }
        }

        return entry;
    };

    var SetValue = function (target, keys, value, delimiter) {
        if (delimiter === undefined) {
            delimiter = '.';
        }

        // no object
        if (typeof (target) !== 'object') {
            return;
        }

        // invalid key
        else if (IsInValidKey(keys)) {
            // don't erase target
            if (value == null) {
                return;
            }
            // set target to another object
            else if (typeof (value) === 'object') {
                target = value;
            }
        } else {
            if (typeof (keys) === 'string') {
                keys = keys.split(delimiter);
            }

            var lastKey = keys.pop();
            var entry = GetEntry(target, keys);
            entry[lastKey] = value;
        }

        return target;
    };

    class YoutubePlayerPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexYoutubePlayer', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.YoutubePlayer', YoutubePlayer);

    return YoutubePlayerPlugin;

}));
