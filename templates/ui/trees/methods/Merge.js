import { Utils as PhaserUtils } from 'phaser';
const Clone = PhaserUtils.Objects.Clone;

var Merge = function (defaultConfig, overrideConfig) {
    var config = (defaultConfig) ? Clone(defaultConfig) : {};

    if (!overrideConfig) {
        return config;
    }

    for (var name in overrideConfig) {
        config[name] = overrideConfig[name];
    }

    return config;
}

export default Merge;