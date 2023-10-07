import DefaultConfig from '../DefaultConfig.js';

var MergeConfig = function (extraConfig) {
    var sourceConfig = DefaultConfig(extraConfig);
    for (var key in extraConfig) {
        var extraData = extraConfig[key];
        if (key === 'styles') {
            var sourceStyles = sourceConfig.styles;
            for (var styleKey in extraData) {
                var styleValue = extraData[styleKey];
                if (styleKey === 'inputRow') {
                    var sourceInputRowStyle = sourceStyles.inputRow;
                    for (var inputRowStyleKey in styleValue) {
                        sourceInputRowStyle[inputRowStyleKey] = styleValue[inputRowStyleKey];
                    }
                } else {
                    sourceStyles[styleKey] = styleValue;
                }
            }
        } else {
            sourceConfig[key] = extraData;
        }
    }

    return sourceConfig;
}

export default MergeConfig;