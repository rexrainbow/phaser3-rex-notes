import FadeOutDestroy from '../../../plugins/fade-out-destroy.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

export default function (duration) {
    if (IsPlainObject(duration)) {
        var config = duration;
        duration = GetValue(config, 'duration', undefined);
    }
    FadeOutDestroy(this, duration);
    return this;
};