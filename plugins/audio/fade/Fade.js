import TweenBase from '../../utils/tween/TweenBase.js';


const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class Fade extends TweenBase {
    constructor(scene, sound, config) {
        super(scene);
        this.sound = sound;
        this.sound.on('destroy', this.destroy, this);

        this.volume = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setMode(GetValue(o, 'mode', 0));
        this.setVolumeRange(
            GetAdvancedValue(o, 'volume.start', this.sound.volume),
            GetAdvancedValue(o, 'volume.end', 0)
        );
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setFadeOutTime(GetAdvancedValue(o, 'duration', 1000));
        return this;
    }

    toJSON() {
        return {
            mode: this.mode,
            volume: this.volume,
            delay: this.delay,
            duration: this.duration
        };
    }

    shutdown() {
        this.sound.off('destroy', this.destroy, this);
        this.sound = undefined;
        super.shutdown();
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this.mode = m;
        return this;
    }

    setVolumeRange(start, end) {
        this.volume.start = start;
        this.volume.end = end;
        return this;
    }

    setDelay(time) {
        this.delay = time;
        return this;
    }

    setFadeOutTime(time) {
        this.duration = time;
        return this;
    }

    start() {
        if (this.isRunning) {
            return this;
        }

        this.sound.setVolume(this.volume.start);
        var config = {
            targets: this.sound,
            volume: this.volume.end,

            delay: this.delay,
            duration: this.duration,
            ease: 'Linear',
            onComplete: function () {
                switch (this.mode) {
                    case 1:
                        this.sound.stop();
                        break;
                    case 2:
                        this.sound.destroy();
                        break;
                }
            },
            onCompleteScope: this
        }
        super.start(config);

        return this;
    }
}

const MODE = {
    stop: 1,
    destroy: 2
}

export default Fade;