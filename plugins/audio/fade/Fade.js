const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class Fade {
    constructor(scene, sound, config) {
        this.sound = sound;
        this.scene = scene;

        this.volume = {};
        this.tween = undefined;
        this.resetFromJSON(config);
        this.boot();
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

    boot() {
        this.scene.events.once('shutdown', this.destroy, this);
        this.sound.once('destroy', this.destroy, this);
    }

    shutdown() {
        this.stop();
        this.scene.events.off('destroy', this.destroy, this);
        this.sound.off('destroy', this.destroy, this);
        this.sound = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
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
        if (this.tween) {
            return;
        }

        if (this.duration === 0) {
            this.sound.setVolume(this.volume.end);
            this.complete();
            return this;
        }

        this.sound.setVolume(this.volume.start);
        this.tween = this.scene.tweens.add({
            targets: this.sound,
            volume: this.volume.end,

            delay: this.delay,
            duration: this.duration,
            ease: 'Linear',
            onComplete: this.complete,
            onCompleteScope: this
        });

        return this;
    }

    stop() {
        if (!this.tween) {
            return;
        }

        this.tween.remove();
        this.tween = undefined;
        return this;
    }

    complete() {
        this.stop();
        switch (this.mode) {
            case 1:
                this.sound.stop();
                break;
            case 2:
                this.sound.destroy();
                break;
        }
    }

}

const MODE = {
    stop: 1,
    destroy: 2
}

export default Fade;