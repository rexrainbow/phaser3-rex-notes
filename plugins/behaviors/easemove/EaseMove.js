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
            // endX, endY
            // x,y : a number, or undefined
            this.startX = this.gameObject.x;
            this.startY = this.gameObject.y;
            this.endX = x;
            this.endY = y;
        } else {
            var config = x;
            this.startX = GetAdvancedValue(config, 'startX', undefined);
            this.startY = GetAdvancedValue(config, 'startY', undefined);
            this.endX = GetAdvancedValue(config, 'endX', undefined);
            this.endY = GetAdvancedValue(config, 'endY', undefined);
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
        };
        // Set position to start value now
        if ((this.startX !== undefined) && (this.endX !== undefined)) {
            this.gameObject.setX(this.startX);
            config.x = this.endX;
        }
        if ((this.startY !== undefined) && (this.endY !== undefined)) {
            this.gameObject.setY(this.startY);
            config.y = this.endY;
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

export default EaseMove;