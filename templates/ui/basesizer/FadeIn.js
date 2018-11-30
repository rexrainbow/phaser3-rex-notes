import Fade from '../../../plugins/fade.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

export default function (duration) {
    if (IsPlainObject(duration)) {
        var config = duration;
        duration = GetValue(config, 'duration', undefined);
    }

    defaultConfig.mode = 0;
    defaultConfig.start = 0;
    defaultConfig.end = 1;
    defaultConfig.duration = duration;
    var fade = new Fade(this, defaultConfig);
    fade.start();
    return this;
}
var defaultConfig = {}; // reuse this config