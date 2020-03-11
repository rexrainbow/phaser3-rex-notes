import TweenBase from '../../utils/tween/TweenBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class Scale extends TweenBase{
    constructor(gameObject, config) {
        super(gameObject);
        this.gameObject = gameObject;

        this.scaleStart = {};
        this.scaleEnd = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setMode(GetValue(o, 'mode', 0));
        this.setScaleRange(
            GetAdvancedValue(o, 'start', undefined),
            GetAdvancedValue(o, 'end', 0)
        );
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        this.setEase(GetValue(o, 'ease', undefined));
        return this;
    }

    toJSON() {
        return {
            mode: this.mode,
            start: this.scaleStart,
            end: this.scaleEnd,
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

    setScaleRange(start, end) {
        if (typeof (start) === 'number') {
            this.scaleStart.x = start;
            this.scaleStart.y = start;
        } else {
            this.scaleStart.x = GetValue(start, 'x', this.gameObject.scaleX);
            this.scaleStart.y = GetValue(start, 'y', this.gameObject.scaleY);
        }
        if (typeof (end) === 'number') {
            this.scaleEnd.x = end;
            this.scaleEnd.y = end;
        } else {
            this.scaleEnd.x = GetValue(end, 'x', this.scaleStart.x);
            this.scaleEnd.y = GetValue(end, 'y', this.scaleStart.y);
        }
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

    setEase(ease) {
        if (ease === undefined) {
            ease = 'Linear';
        }
        this.ease = ease;
        return this;
    }

    start() {
        if (this.isRunning) {
            return this;
        }

        this.gameObject.setScale(this.scaleStart.x, this.scaleStart.y);
        super.start({
            targets: this.gameObject,
            scaleX: this.scaleEnd.x,
            scaleY: this.scaleEnd.y,

            duration: this.duration,
            ease: this.ease,
            yoyo: (this.mode == 2),
            repeat: ((this.mode == 2) ? -1 : 0)
        });
        return this;
    }

    complete() {
        super.complete();
        if (this.mode === 1) {
            this.gameObject.destroy();
        }
        return this;
    }

}

const MODE = {
    stop: 0,
    destroy: 1,
    yoyo: 2
}

export default Scale;