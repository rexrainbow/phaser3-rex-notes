import CustomShapes from '../customshapes/CustomShapes.js';
import ProgressValueMethods from '../../../utils/progressvalue/ProgressValueMethods.js';
import EaseValueMethods from '../../../utils/ease/EaseValueMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class ProgressBase extends CustomShapes {
    constructor(scene, x, y, width, height, config) {
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
}

Object.assign(
    ProgressBase.prototype,
    ProgressValueMethods,
    EaseValueMethods
);

export default ProgressBase