import ComponentBase from '../../../../plugins/utils/componentbase/ComponentBase.js';
import ExtractByPrefix from '../../../../plugins/utils/object/ExtractByPrefix.js';
import GetPartialData from '../../../../plugins/utils/object/GetPartialData.js';
import IsKeyValueEqual from '../../../../plugins/utils/object/IsKeyValueEqual.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class StyleManager extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.style = GetValue(config, 'style', this);

        var propertiesMap = GetValue(config, 'propertiesMap');
        this.activeStyle = ExtractStyle(config, 'active', propertiesMap);
        this.hoverStyle = ExtractStyle(config, 'hover', propertiesMap);
        this.disableStyle = ExtractStyle(config, 'disable', propertiesMap);

        this.onModifyStyle = GetValue(config, 'onModifyStyle');
    }

    getStyle(keys) {
        return GetPartialData(this.style, keys);
    }

    modifyStyle(style) {
        for (var key in style) {
            this.style[key] = style[key];
        }

        if (this.onModifyStyle) {
            this.onModifyStyle(this.parent, style);
        }

        return this;
    }

    applyStyle(newStyle) {
        if (!newStyle) {
            return undefined;
        }

        var currentStyle = this.getStyle(newStyle);
        if (!IsKeyValueEqual(currentStyle, newStyle)) {
            this.modifyStyle(newStyle);
            return currentStyle;
        } else {
            return undefined;
        }
    }

    setActiveState(enable) {
        SetStateEnableMethod.call(this, 'active', enable);
        return this;
    }

    setHoverState(enable) {
        SetStateEnableMethod.call(this, 'hover', enable);
        return this;
    }

    setDisableState(enable) {
        SetStateEnableMethod.call(this, 'disable', enable);
        return this;
    }
}

var ExtractStyle = function (config, prefix, propertiesMap) {
    var result = ExtractByPrefix(config, prefix);

    if (propertiesMap) {
        for (var name in result) {
            if (propertiesMap.hasOwnProperty(name)) {
                result[propertiesMap[name]] = result[name];
                delete result[name];
            }
        }
    }

    return result;
}

var SetStateEnableMethod = function (stateName, enable) {
    if (enable === undefined) {
        enable = true;
    }

    var stateVarName = `${stateName}State`;
    var styleVarName = `${stateName}Style`;
    var styleSaveVarName = `${stateName}StyleSave`;

    if (this[stateVarName] === enable) {
        return;
    }

    this[stateVarName] = enable;

    if (enable) {
        this[styleSaveVarName] = this.applyStyle(this[styleVarName]);
    } else {
        this.applyStyle(this[styleSaveVarName]);
        this[styleSaveVarName] = undefined;
    }
}

export default StyleManager;