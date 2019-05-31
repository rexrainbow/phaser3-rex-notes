const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

var GetBaseClass = function (GOClass) {
    return class Base extends GOClass {
        createVideoElement(config) {
            var element = (this.video) ? this.video : document.createElement('video');

            // Apply registed properties
            var elemProp, elemPropValue;
            for (var key in ElementProperties) {
                elemProp = ElementProperties[key];
                elemPropValue = GetValue(config, key, elemProp[1]);
                if (elemPropValue !== undefined) {
                    element[elemProp[0]] = elemPropValue;
                }
            }

            // Apply events
            for (let eventName in ElementEvents) { // Note: Don't use `var` here
                element.addEventListener(ElementEvents[eventName], (function () {
                    this.emit(eventName, this);
                }).bind(this));
            }

            this.video = element;
            return element;
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene) {
                return;
            }
            this.video.pause();
            this.video.removeAttribute('src'); // empty source
            this.video.load();
            this.video = undefined;
            super.destroy(fromScene);
        }

        get availableVideoTypes() {
            return this.scene.sys.game.device.video;
        }

        load(src) {
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

            this.video.src = src;
            this.video.load();
            return this;
        }

        play() {
            this.video.play();
            return this;
        }

        get isPlaying() {
            var video = this.video;
            return (!video.paused) && (!video.ended) && (video.currentTime > 0);
        }

        pause() {
            this.video.pause();
            return this;
        }

        get isPaused() {
            return this.video.paused;
        }

        get playbackTime() {
            return this.video.currentTime || 0;
        }

        set playbackTime(value) {
            try {
                this.video.currentTime = value;
            }
            catch (e) {
            }
        }

        setPlaybackTime(time) {
            this.playbackTime = time;
            return this;
        }

        get duration() {
            return this.video.duration || 0;
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
            return this.video.ended;
        }

        get volume() {
            return this.video.volume || 0;
        }

        set volume(value) {
            this.video.volume = value;
        }

        setVolume(value) {
            this.volume = value;
            return this;
        }

        get muted() {
            return this.video.muted || false;
        }

        set muted(value) {
            this.video.muted = value;
        }

        setMute(value) {
            if (value === undefined) {
                value = true;
            }
            this.muted = value;
            return this;
        }

        get loop() {
            return this.video.loop;
        }

        set loop(value) {
            this.video.loop = value;
        }

        setLoop(value) {
            if (value === undefined) {
                value = true;
            }
            this.mute = value;
            return this;
        }
    }
};

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
    crossOrigin: ['crossOrigin', 'anonymous'],
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

export default GetBaseClass;