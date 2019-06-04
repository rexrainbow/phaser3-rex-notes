import LoadAPI from './LoadAPI.js';

const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;


// TODO: Use DOMElement directly in next phaser version
const BaseClass = (DOMElement) ? DOMElement : Object;
class YoutubePlayer extends BaseClass {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        }

        if (config === undefined) {
            config = {};
        }
        var autoRound = scene.scale.autoRound;
        if (width !== undefined) {
            if (autoRound) {
                width = Math.floor(width);
            }
            config.width = width + 'px';
        }
        if (height !== undefined) {
            if (autoRound) {
                height = Math.floor(height);
            }
            config.height = height + 'px';
        }

        super(scene, x, y);
        this.type = 'rexYoutubePlayer';
        this.youtubePlayer = undefined;
        this._videoState = undefined;
        this.videoId = GetValue(config, 'videoId', '');
        this.loop = GetValue(config, 'loop', false);
        this.paddingCallbacks = [];

        // Create DIV element and add it
        var elementId = 'YT' + Date.now();
        var element = document.createElement('div');
        element.id = elementId;
        element.style.width = config.width;
        element.style.height = config.height;
        this.setElement(element);

        // Create youtube player iframe when API ready
        var playerVars = {
            autoplay: GetValue(config, 'autoPlay', true),
            controls: GetValue(config, 'controls', true),
            showinfo: GetValue(config, 'showInfo', true),
            disablekb: !GetValue(config, 'keyboardControl', true),
            modestbranding: GetValue(config, 'ModestBranding', false),
        };
        var onLoad = (function () {
            var youtubePlayer = new YT.Player(
                elementId,
                {
                    'videoId': this.videoId,
                    'playerVars': playerVars,
                    'events': {
                        'onStateChange': (function (event) {
                            this._videoState = event.data;
                            if ((this._videoState === 0) && this.loop) {
                                this.youtubePlayer.playVideo();
                            }
                            this.emit('statechange', this);
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

    get videoState() {
        if ((this._videoState === undefined) || (!YT)) {
            return '';
        } else {
            switch (this._videoState) {
                case -1: return "Unstarted";
                case YT.PlayerState.ENDED: return "Ended";
                case YT.PlayerState.PLAYING: return "Playing";
                case YT.PlayerState.PAUSED: return "Paused";
                case YT.PlayerState.BUFFERING: return "Buffering";
                case YT.PlayerState.CUED: return "Video cued";
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
        return (this._videoState === 1);
    }

    pause() {
        var callback = (function () {
            this.youtubePlayer.pauseVideo();
        }).bind(this);

        _runCallback(callback);
        return this;
    }

    get isPaused() {
        return (this._videoState === 2);
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

export default YoutubePlayer;