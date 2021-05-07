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

export default MergeConfig;