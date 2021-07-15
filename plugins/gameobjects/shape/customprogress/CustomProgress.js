import CustomShapes from '../customshapes/CustomShapes.js';
import EaseValueMethods from '../../../utils/ease/EaseValueMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;
const Linear = Phaser.Math.Linear;
const Percent = Phaser.Math.Percent;

class CustomProgress extends CustomShapes {
    constructor(scene, x, y, width, height, config) {
        super(scene, x, y, width, height, config);

        this
            .setEaseValuePropName('value')
            .setEaseValueDuration(GetValue(config, 'easeValue.duration', 0))
            .setEaseValueFunction(GetValue(config, 'easeValue.ease', 'Linear'))

        this.setValue(GetValue(config, 'value', 0));
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

    get value() {
        return this._value;
    }

    set value(value) {
        value = Clamp(value, 0, 1);
        this.dirty = this.dirty || (this._value != value);
        this._value = value;
    }

    setValue(value, min, max) {
        if ((value === undefined) || (value === null)) {
            return this;
        }

        if (min !== undefined) {
            value = Percent(value, min, max);
        }
        this.value = value;
        return this;
    }

    addValue(inc, min, max) {
        if (min !== undefined) {
            inc = Percent(inc, min, max);
        }
        this.value += inc;
        return this;
    }

    getValue(min, max) {
        var value = this.value;
        if (min !== undefined) {
            value = Linear(min, max, value);
        }
        return value;
    }

}

Object.assign(
    CustomProgress.prototype,
    EaseValueMethods
);

export default CustomProgress;