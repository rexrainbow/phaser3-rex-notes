import CustomShapes from '../customshapes/CustomShapes.js';
import EaseValueMethods from '../../../utils/ease/EaseValueMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const Clamp = Phaser.Math.Clamp;
const Linear = Phaser.Math.Linear;
const Percent = Phaser.Math.Percent;

class CustomProgress extends CustomShapes {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 2);
            height = GetValue(config, 'height', 2);
        }
        if (config === undefined) {
            config = {};
        }
        if (!config.type) {
            config.type = 'rexCustomProgress';
        }
        super(scene, x, y, width, height, config);
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.eventEmitter.on('valuechange', callback, scope);
        }

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

        var oldValue = this._value;
        var valueChanged = (oldValue != value);
        this.dirty = this.dirty || valueChanged;
        this._value = value;

        if (valueChanged) {
            this.eventEmitter.emit('valuechange', this._value, oldValue, this.eventEmitter);
        }
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