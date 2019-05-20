import Tap from '../../../plugins/input/gestrues/tap/Tap.js';

var SetTapable = function (tapable) {
    if (tapable === undefined) {
        tapable = true;
    }

    if (this._tap) {
        this._tap.setEnable(tapable);
    } else if (tapable) {
        var config = {
            eventEmitter: this
        };
        this._tap = new Tap(this, config);
    } else {
        // Not tapable and press is not registered yet, do nothing
    }
    return this;
}

export default SetTapable;