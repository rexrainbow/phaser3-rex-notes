import TweenBase from '../../utils/tween/TweenBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class EaseMove extends TweenBase {
    constructor(gameObject, config) {
        super(gameObject);
        this.gameObject = gameObject;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setMode(GetValue(o, 'mode', 0));

        if (o && (o.hasOwnProperty('x') || o.hasOwnProperty('y'))) {
            var endX = GetAdvancedValue(o, 'x', undefined);
            var endY = GetAdvancedValue(o, 'y', undefined);
            this.setTargetPosition(endX, endY);
        } else {
            this.setTargetPosition(o);
        }

        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        this.setEase(GetValue(o, 'ease', undefined));
        return this;
    }

    toJSON() {
        return {
            mode: this.mode,
            startX: this.startX,
            startY: this.startY,
            endX: this.endX,
            endY: this.endY,
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

    setTargetPosition(x, y) {
        if ((typeof (x) === 'number') || (typeof (y) === 'number')) {
            this.startX = this.gameObject.x;
            this.startY = this.gameObject.y;
            this.endX = (x !== undefined) ? x : this.startX;
            this.endY = (y !== undefined) ? y : this.startY;
        } else {
            var config = x;
            this.startX = GetAdvancedValue(config, 'startX', this.gameObject.x);
            this.startY = GetAdvancedValue(config, 'startY', this.gameObject.y);
            this.endX = GetAdvancedValue(config, 'endX', this.startX);
            this.endY = GetAdvancedValue(config, 'endY', this.startY);
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

        this.gameObject.setPosition(this.startX, this.startY);
        super.start({
            targets: this.gameObject,
            x: this.endX,
            y: this.endY,

            delay: this.delay,
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

export default EaseMove;