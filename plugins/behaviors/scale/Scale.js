import TweenBase from '../../utils/tween/TweenBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

class Scale extends TweenBase {
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

    setScaleRange(start, end) {
        if (typeof (start) === 'number') {
            this.startX = start;
            this.startY = start;
        } else {
            this.startX = GetAdvancedValue(start, 'x', this.gameObject.scaleX);
            this.startY = GetAdvancedValue(start, 'y', this.gameObject.scaleY);
        }
        if (typeof (end) === 'number') {
            this.endX = end;
            this.endY = end;
        } else {
            this.endX = GetAdvancedValue(end, 'x', undefined);
            this.endY = GetAdvancedValue(end, 'y', undefined);
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

        var config = {
            targets: this.gameObject,

            delay: this.delay,
            duration: this.duration,
            ease: this.ease,
            yoyo: (this.mode == 2),
            repeat: ((this.mode == 2) ? -1 : 0),
            onComplete: function () {
                if (this.mode === 1) {
                    this.gameObject.destroy();
                }
            },
            onCompleteScope: this
        }
        // Set scale to start value now
        if ((this.startX !== undefined) && (this.endX !== undefined)) {
            this.gameObject.scaleX = this.startX;
            config.scaleX = this.endX
        }
        if ((this.startY !== undefined) && (this.endY !== undefined)) {
            this.gameObject.scaleY = this.startY;
            config.scaleY = this.endY;
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

export default Scale;