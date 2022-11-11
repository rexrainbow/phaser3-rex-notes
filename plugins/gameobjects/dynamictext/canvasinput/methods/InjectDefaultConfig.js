import HasValue from '../../../../utils/object/HasValue.js';
import SetValue from '../../../../utils/object/SetValue.js';

var InjectDefaultConfig = function (config) {
    if (!HasValue(config, 'wrap.vAlign')) {
        SetValue(config, 'wrap.vAlign', 'center');
    }

    if (!HasValue(config, 'wrap.charWrap')) {
        SetValue(config, 'wrap.charWrap', true);
    }

    return config;
}

export default InjectDefaultConfig;