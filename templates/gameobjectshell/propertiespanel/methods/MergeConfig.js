import DefaultConfig from '../DefaultConfig.js';

var MergeConfig = function (extraConfig) {
    var sourceConfig = DefaultConfig(extraConfig);
    for (var key in extraConfig) {
        var extraData = extraConfig[key];
        if (key === 'styles') {
            var sourceStyles = sourceConfig.styles;
            for (var styleKey in extraData) {
                sourceStyles[styleKey] = extraData[styleKey];
            }
        } else {
            sourceConfig[key] = extraData;
        }
    }

    return sourceConfig;
}

export default MergeConfig;