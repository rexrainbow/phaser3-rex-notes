import CreateVideoElement from './CreateVideoElement.js';
import Load from './Load.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

var VideoBase = function (GOClass) {
    return class Base extends GOClass {
        createVideoElement(config) {
            if (!this.video) {
                if (config === undefined) {
                    config = {};
                }
                config.eventEmitter = this;
                this.video = CreateVideoElement(config);
                this.playbackTimeChangeEventEnable = GetValue(config, 'playbackTimeChangeEventEnable', true);
            }
            return this.video;
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

        preUpdate(time, delta) {
            if (this.playbackTimeChangeEventEnable) {
                var curT = this.playbackTime;
                if (curT !== this.prevT) {
                    this.emit('playbacktimechange', this);
                }
                this.prevT = curT;
            }
            if (super.preUpdate) {
                super.preUpdate(time, delta);
            }
        }

        get availableVideoTypes() {
            return this.scene.sys.game.device.video;
        }

        load(src) {
            Load(this.video, src, this.availableVideoTypes);
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
            this.playbackTime = this.duration * Clamp(value, 0, 1);
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
            this.loop = value;
            return this;
        }

        get readyState() {
            return this.video.readyState;
        }
    }
};

export default VideoBase;