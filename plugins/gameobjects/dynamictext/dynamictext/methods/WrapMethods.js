import RunWordWrap from './runwordwrap/RunWordWrap.js';
import RunVerticalWrap from './runverticalwrap/RunVerticalWrap.js';

var MergeConfig = function (config, defaultConfig) {
    if (!defaultConfig) {
        return config;
    }
    if (config == null) {
        config = {};
    }

    for (var key in defaultConfig) {
        if (!config.hasOwnProperty(key)) {
            config[key] = defaultConfig[key];
        }
    }
    return config;
}

export default {
    setWrapConfig(config) {
        this.wrapConfig = config;
        return this;
    },
    runWordWrap(config) {
        config = MergeConfig(config, this.wrapConfig);
        return RunWordWrap.call(this, config);
    },

    runVerticalWrap(config) {
        config = MergeConfig(config, this.wrapConfig);
        return RunVerticalWrap.call(this, config);
    },
};