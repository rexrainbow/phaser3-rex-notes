import FadeOutDestroy from '../../../plugins/fade-out-destroy.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

export default function (duration, destroyMode) {
    if (IsPlainObject(duration)) {
        var config = duration;
        duration = GetValue(config, 'duration', undefined);
        destroyMode = GetValue(config, 'destroy', undefined);
    }
    this._fade = FadeOutDestroy(this, duration, destroyMode, this._fade);
    return this;
};