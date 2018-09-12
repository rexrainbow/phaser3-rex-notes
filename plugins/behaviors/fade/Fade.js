import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class Fade {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.alpha = {};
        this.tween = undefined;
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setMode(GetValue(o, 'mode', 0));
        this.setAlphaRange(
            GetAdvancedValue(o, 'alpha.start', this.gameObject.alpha),
            GetAdvancedValue(o, 'alpha.end', 0)
        );
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setFadeOutTime(GetAdvancedValue(o, 'duration', 1000));
        return this;
    }

    toJSON() {
        return {
            mode: this.mode,
            alpha: this.alpha,
            delay: this.delay,
            duration: this.duration
        };
    }

    boot() {
        if (this.gameObject.on) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.stop();
        this.gameObject = undefined;
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
    setAlphaRange(start, end) {
        this.alpha.start = start;
        this.alpha.end = end;
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

        var alpha = this.alpha;
        this.gameObject.alpha = alpha.start;
        this.tween = this.scene.tweens.add({
            targets: this.gameObject,
            alpha: alpha.end,

            delay: this.delay,
            duration: this.duration,
            ease: 'Linear',
            yoyo: (this.mode == 2),
            repeat: ((this.mode == 2) ? -1 : 0),
            onComplete: this.complete,
            onCompleteScope: this
        });
        return this;
    }

    stop() {
        if (!this.tween) {
            return;
        }

        this.tween.stop();
        this.tween = undefined;
        return this;
    }

    complete() {
        if (this.mode === 1) {
            this.gameObject.destroy();
        }
    }

}

const MODE = {
    stop: 0,
    destroy: 1,
    yoyo: 2
}

export default Fade;