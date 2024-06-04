import HasValue from '../../../../utils/object/HasValue.js';
import SetValue from '../../../../utils/object/SetValue.js';
import FullWindowZone from '../../../fullwindow/fullwindowzone/FullWindowZone.js';

var InjectDefaultConfig = function (scene, config) {
    var isSingleLineMode = !config.textArea;

    if (!HasValue(config, 'wrap.vAlign')) {
        var defaultValue = (isSingleLineMode) ? 'center' : 'top';
        SetValue(config, 'wrap.vAlign', defaultValue);
    }

    if (!HasValue(config, 'wrap.wrapMode')) {
        SetValue(config, 'wrap.wrapMode', 'char');
    }

    if (!HasValue(config, 'wrap.maxLines')) {
        var defaultValue = (isSingleLineMode) ? 1 : undefined;
        SetValue(config, 'wrap.maxLines', defaultValue);
    }

    if (isSingleLineMode) {
        SetValue(config, 'wrap.wrapWidth', Infinity);
    }

    if (!HasValue(config, 'wrap.useDefaultTextHeight')) {
        SetValue(config, 'wrap.useDefaultTextHeight', true);
    }

    if (!config.edit) {
        config.edit = {};
    }
    if (!HasValue(config.edit, 'inputType')) {
        var defaultValue = (isSingleLineMode) ? 'text' : 'textarea';
        SetValue(config.edit, 'inputType', defaultValue);
    }

    if (config.clickOutSideTarget === true) {
        var clickOutSideTarget = new FullWindowZone(scene);
        scene.add.existing(clickOutSideTarget);

        config.clickOutSideTarget = clickOutSideTarget;
    }

    return config;
}

export default InjectDefaultConfig;