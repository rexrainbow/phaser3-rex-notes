import TweenTask from '../../utils/componentbase/TweenTask.js';


const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class Fade extends TweenTask {
    constructor(scene, sound, config) {
        sound.scene = scene;
        super(sound);  
        // this.parent = sound

        this.volume = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setMode(GetValue(o, 'mode', 0));
        this.setVolumeRange(
            GetAdvancedValue(o, 'volume.start', this.parent.volume),
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

        var v0 = this.volume.start;
        var v1 = this.volume.end;
        this.parent.setVolume(v0);
        var config = {
            targets: this.parent,
            volume: {
                start: v0,
                from: v0,
                to: v1
            },

            delay: this.delay,
            duration: this.duration,
            ease: 'Linear',
            onComplete: function () {
                switch (this.mode) {
                    case 1:
                        this.parent.stop();
                        break;
                    case 2:
                        this.parent.destroy();
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