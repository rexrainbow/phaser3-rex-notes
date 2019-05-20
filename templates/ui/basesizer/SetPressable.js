import Press from '../../../plugins/input/gestrues/press/Press.js';

var SetPressable = function (pressable) {
    if (pressable === undefined) {
        pressable = true;
    }

    if (this._press) {
        this._press.setEnable(pressable);
    } else if (pressable) {
        var config = {
            eventEmitter: this
        };
        this._press = new Press(this, config);
    } else {
        // Not pressable and press is not registered yet, do nothing
    }
    return this;
}

export default SetPressable;