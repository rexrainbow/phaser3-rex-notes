const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

// TODO: Use DOMElement directly in next phaser version
const BaseClass = (DOMElement) ? DOMElement : Object;
class Video extends BaseClass {
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
            config.width = width;
        }
        if (height !== undefined) {
            if (autoRound) {
                height = Math.floor(height);
            }
            config.height = height;
        }

        var element = document.createElement('video');

        // Apply registed properties
        var elemProp, elemPropValue;
        for (var key in ElementProperties) {
            elemProp = ElementProperties[key];
            elemPropValue = GetValue(config, key, elemProp[1]);
            if (elemPropValue !== undefined) {
                element[elemProp[0]] = elemPropValue;
            }
        }

        super(scene, x, y, element);
        this.type = 'rexVideo';

        // Apply events
        for (let eventName in ElementEvents) { // Note: Don't use `var` here
            this.node.addEventListener(ElementEvents[eventName], (function () {
                this.emit(eventName, this);
            }).bind(this));
        }
        this.setSource(GetValue(config, 'src', ''));
    }

    get availableVideoTypes() {
        return this.scene.sys.game.device.video;
    }

    setSource(src) {
        if (IsPlainObject(src)) {
            var videoType;
            for (var i = 0, cnt = VideoTypes.length; i < cnt; i++) {
                videoType = VideoTypes[i];
                if (this.availableVideoTypes[videoType + 'Video'] && src.hasOwnProperty(videoType)) {
                    src = src[videoType];
                    break;
                }
            }
        }

        if (src !== '') {
            this.node.src = src;
            this.node.load();
        }
        return this;
    }

    play() {
        this.node.play();
        return this;
    }

    get isPlaying() {
        var video = this.node;
        return (!video.paused) && (!video.ended) && (video.currentTime > 0);
    }

    pause() {
        this.node.pause();
        return this;
    }

    get isPaused() {
        return this.node.paused;
    }

    get playbackTime() {
        return this.node.currentTime || 0;
    }

    set playbackTime(value) {
        try {
            this.node.currentTime = value;
        }
        catch (e) {
        }
    }

    setPlaybackTime(time) {
        this.playbackTime = time;
        return this;
    }

    get duration() {
        return this.node.duration || 0;
    }


    get t() {
        var duration = this.duration;
        return (duration === 0) ? 0 : this.playbackTime / duration;
    }

    set t(value) {
        value = Clamp(value, 0, 1);
        this.playbackTime = this.duration * value;
    }

    setT(value) {
        this.t = value;
        return this;
    }

    get hasEnded() {
        return this.node.ended;
    }

    get volume() {
        return this.node.volume || 0;
    }

    set volume(value) {
        this.node.volume = value;
    }

    setVolume(value) {
        this.volume = value;
        return this;
    }

    get muted() {
        return this.node.muted || false;
    }

    set muted(value) {
        this.node.muted = value;
    }

    setMute(value) {
        if (value === undefined) {
            value = true;
        }
        this.muted = value;
        return this;
    }

    get loop() {
        return this.node.loop;
    }

    set loop(value) {
        this.node.loop = value;
    }

    setLoop(value) {
        if (value === undefined) {
            value = true;
        }
        this.mute = value;
        return this;
    }
}

const ElementProperties = {
    id: ['id', undefined],
    width: ['width', undefined],
    height: ['height', undefined],
    autoPlay: ['autoplay', true],
    controls: ['controls', false],
    loop: ['loop', false],
    poster: ['poster', undefined],
    preload: ['preload', undefined],
    muted: ['muted', false],
    playsInline: ['playsInline', true],
    crossOrigin: ['crossOrigin', undefined],
};

const ElementEvents = {
    canplay: 'canplay',
    canplaythrough: 'canplaythrough',
    ended: 'ended',
    error: 'error',
    loadstart: 'loadstart',
    playing: 'playing',
    pause: 'pause',
    stalled: 'stalled',
};

const VideoTypes = ['webm', 'ogg', 'mp4', 'h264', 'vp9', 'hls'];

export default Video;