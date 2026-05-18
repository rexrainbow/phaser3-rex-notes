import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var GetAddChildConfig = function(config?: any, key?: any, defaultValues?: any) {
    var proportion = GetValue(config, `proportion.${key}`, defaultValues.proportion);
    var align = GetValue(config, `align.${key}`, 'center');
    var padding = GetValue(config, `space.${key}`, undefined);
    if ((typeof (padding) === 'number') && defaultValues.paddingKey) {
        var paddingNum = padding;
        padding = {};
        padding[defaultValues.paddingKey] = paddingNum;
    }
    var expand = GetValue(config, `expand.${key}`, true);

    return {
        proportion: proportion,
        align: align,
        padding: padding,
        expand: expand,
    }
}

var GetAddHeaderConfig = function(config?: any) {
    return GetAddChildConfig(config, 'header', {
        proportion: 0,
        paddingKey: 'bottom'
    })
}

var GetAddLeftSideConfig = function(config?: any) {
    return GetAddChildConfig(config, 'leftSide', {
        proportion: 0,
        paddingKey: 'right'
    })
}

var GetAddContentConfig = function(config?: any) {
    return GetAddChildConfig(config, 'content', {
        proportion: 1
    })
}

var GetAddRightSideConfig = function(config?: any) {
    return GetAddChildConfig(config, 'rightSide', {
        proportion: 0,
        paddingKey: 'left'
    })
}

var GetAddFooterConfig = function(config?: any) {
    return GetAddChildConfig(config, 'footer', {
        proportion: 0,
        paddingKey: 'top'
    })
}

var GetAddContainerConfig = function(config?: any) {
    return {
        proportion: 1,
        align: 'center',
        padding: 0,
        expand: true,
    }
}

export {
    GetAddHeaderConfig,
    GetAddLeftSideConfig, GetAddContentConfig, GetAddRightSideConfig,
    GetAddFooterConfig,
    GetAddContainerConfig
}