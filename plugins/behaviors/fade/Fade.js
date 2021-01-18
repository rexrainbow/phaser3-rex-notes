import TweenBase from '../../utils/tween/TweenBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class Fade extends TweenBase {
    constructor(gameObject, config) {
        super(gameObject);
        this.gameObject = gameObject;

        this.alphaStart = undefined;
        this.alphaEnd = undefined;
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setMode(GetValue(o, 'mode', 0));
        this.setAlphaRange(
            GetAdvancedValue(o, 'start', this.gameObject.alpha),
            GetAdvancedValue(o, 'end', 0)
        );
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        return this;
    }

    toJSON() {
        return {
            mode: this.mode,
            start: this.alphaStart,
            end: this.alphaEnd,
            delay: this.delay,
            duration: this.duration
        };
    }

    shutdown() {
        super.shutdown();
        this.gameObject = undefined;
        return this;
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this.mode = m;
        return this;
    }

    setAlphaRange(start, end) {
        this.alphaStart = start;
        this.alphaEnd = end;
        return this;
    }

    setDelay(time) {
        this.delay = time;
        return this;
    }

    setDuration(time) {
        this.duration = time;
        return this;
    }

    start() {
        if (this.isRunning) {
            return this;
        }

        // Set alpha to start value now
        this.gameObject.setAlpha(this.alphaStart);
        var config = {
            targets: this.gameObject,
            alpha: this.alphaEnd,

            delay: this.delay,
            duration: this.duration,
            ease: 'Linear',
            yoyo: (this.mode == 2),
            repeat: ((this.mode == 2) ? -1 : 0),
            onComplete: function () {
                if (this.mode === 1) {
                    this.gameObject.destroy();
                }
            },
            onCompleteScope: this
        }
        super.start(config);
        return this;
    }
}

const MODE = {
    stop: 0,
    destroy: 1,
    yoyo: 2
}

export default Fade;