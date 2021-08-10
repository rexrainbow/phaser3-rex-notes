import TweenTask from '../../utils/componentbase/TweenTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const Linear = Phaser.Math.Linear;

class Fade extends TweenTask {
    constructor(scene, sound, config) {
        sound.scene = scene;

        super(sound);
        // this.parent = sound
        // this.timer

        this.volume = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue(o, 'timer'));
        this.setEnable(GetValue(o, 'enable', true));
        this.setMode(GetValue(o, 'mode', 0));
        this.setEnable(GetValue(o, 'enable', true));
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
            timer: this.timer.toJSON(),
            enable: this.enable,
            mode: this.mode,
            volume: this.volume,
            delay: this.delay,
            duration: this.duration
        };
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
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
        if (this.timer.isRunning) {
            return this;
        }

        this.parent.setVolume(this.volume.start);

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration);

        super.start();
        return this;
    }

    update(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        this.timer.update(time, delta);

        var sound = this.parent;
        sound.volume = Linear(this.volume.start, this.volume.end, this.timer.t);

        if (this.timer.isDone) {
            this.complete();
        }
        return this;
    }

    complete() {
        super.complete();

        switch (this.mode) {
            case 1:
                this.parent.stop();
                break;
            case 2:
                this.parent.destroy();
                break;
        }

        return this;
    }
}

const MODE = {
    stop: 1,
    destroy: 2
}

export default Fade;