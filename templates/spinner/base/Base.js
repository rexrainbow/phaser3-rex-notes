import ShapesBase from '../../../plugins/gameobjects/shape/shapes/ShapesBase.js';
import TweenBase from '../../../plugins/utils/tween/TweenBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class SpinnerBase extends ShapesBase {
    constructor(scene, config) {
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var width = GetValue(config, 'width', 64);
        var height = GetValue(config, 'height', 64);

        super(scene, x, y, width, height);

        var duration = GetValue(config, 'duration', 1000);
        var color = GetValue(config, 'color', 0xffffff);
        var start = GetValue(config, 'start', true);

        this.buildShapes();
        this.setColor(color);
        this.setValue(0);

        if (start) {
            this.start(duration);
        }
    }

    buildShapes() {

    }

    get centerX() {
        return this.width / 2;;
    }

    get centerY() {
        return this.height / 2;
    }

    get radius() {
        return Math.min(this.centerX, this.centerY);
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this.dirty = this.dirty || (this._color !== value);
        this._color = value;
        this.setShapesColor(value);
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setShapesColor(color) {

    }

    get value() {
        return this._value;
    }

    set value(value) {
        value = Phaser.Math.Clamp(value, 0, 1);
        this.dirty = this.dirty || (this._value != value);
        this._value = value;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    start(duration) {
        if (duration === undefined) {
            duration = this.duration;
        } else {
            this.duration = duration;
        }

        if (!this.tweenTask) {
            this.tweenTask = new TweenBase(this);
        }
        this.setValue(0);
        this.tweenTask.start({
            targets: this,
            value: 1,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: duration,
            repeat: -1,            // -1: infinity
            yoyo: false
        });
    }

    stop() {
        if (!this.tweenTask) {
            return this;
        }
        this.tweenTask.stop();
        return this;
    }

    pause() {
        if (!this.tweenTask) {
            return this;
        }
        this.tweenTask.pause();
        return this;
    }

    resume() {
        if (!this.tweenTask) {
            return this;
        }
        this.tweenTask.pause();
        return this;
    }
}

export default SpinnerBase;