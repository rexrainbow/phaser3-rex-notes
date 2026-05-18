import ProgressValueMethods from '../progressvalue/ProgressValueMethods';
import EaseValueMethods from '../ease/EaseValueMethods';

import { Math as PhaserMath, Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const Clamp = PhaserMath.Clamp;

export default function(BaseClass?: any) {
    class ProgressBase extends BaseClass {
    _value: any;
    dirty: any;
    eventEmitter: any;

        bootProgressBase(config?: any) {
            this.eventEmitter = GetValue(config, 'eventEmitter', this);

            var callback = GetValue(config, 'valuechangeCallback', null);
            if (callback !== null) {
                var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
                this.eventEmitter.on('valuechange', callback, scope);
            }

            this
                .setEaseValuePropName('value')
                .setEaseValueDuration(GetValue(config, 'easeValue.duration', 0))
                .setEaseValueFunction(GetValue(config, 'easeValue.ease', 'Linear'));

            return this;
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

            if (valueChanged?: any) {
                this.eventEmitter.emit('valuechange', this._value, oldValue, this.eventEmitter);
            }
        }
    }

    Object.assign(
        ProgressBase.prototype,
        ProgressValueMethods,
        EaseValueMethods
    );

    return ProgressBase;
}
