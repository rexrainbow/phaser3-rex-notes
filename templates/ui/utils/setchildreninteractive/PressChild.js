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
            var child = this.pointToChild(press.x, press.y);
            if (!child) {
                return;
            }
            var childIndex = this.sizerChildren.indexOf(child);
            press._childIndex = childIndex;
            EmitChildEvent(this.eventEmitter, `${this.inputEventPrefix}pressstart`, this, childIndex, undefined, lastPointer);
        }, this)
        .on('pressend', function (press, gameObject, lastPointer) {
            var childIndex = press._childIndex;
            press._childIndex = undefined;
            EmitChildEvent(this.eventEmitter, `${this.inputEventPrefix}pressend`, this, childIndex, undefined, lastPointer);
        }, this)
};

export default PressChild;