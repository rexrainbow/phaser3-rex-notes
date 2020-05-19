import Press from '../../press/Press.js';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var PressChild = function (config) {
    var pressConfig = GetValue(config, 'press', undefined);
    if (pressConfig === false) {
        return;
    }

    this._press = new Press(this, pressConfig);
    this._press
        .on('pressstart', function (press, gameObject, lastPointer) {
            EmitChildEvent(
                this.eventEmitter,
                `${this.input.eventNamePrefix}pressstart`,
                this.input.targetSizers,
                press.x, press.y,
                lastPointer
            );
        }, this)
        .on('pressend', function (press, gameObject, lastPointer) {
            EmitChildEvent(
                this.eventEmitter,
                `${this.input.eventNamePrefix}pressend`,
                this.input.targetSizers,
                press.x, press.y,
                lastPointer
            );
        }, this)
};

export default PressChild;