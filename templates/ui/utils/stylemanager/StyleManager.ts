import ComponentBase from '../../../../plugins/utils/componentbase/ComponentBase';
import ExtractByPrefix from '../../../../plugins/utils/object/ExtractByPrefix';
import GetPartialData from '../../../../plugins/utils/object/GetPartialData';
import IsKeyValueEqual from '../../../../plugins/utils/object/IsKeyValueEqual';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class StyleManager extends ComponentBase {
    activeStyle: any;
    disableStyle: any;
    hoverStyle: any;
    onModifyStyle: any;
    parent: any;
    style: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.style = GetValue(config, 'style', this);

        var propertiesMap = GetValue(config, 'propertiesMap');
        this.activeStyle = ExtractStyle(config, 'active', propertiesMap);
        this.hoverStyle = ExtractStyle(config, 'hover', propertiesMap);
        this.disableStyle = ExtractStyle(config, 'disable', propertiesMap);

        this.onModifyStyle = GetValue(config, 'onModifyStyle');
    }

    getStyle(keys?: any) {
        return GetPartialData(this.style, keys);
    }

    modifyStyle(style?: any) {
        for (var key in style) {
            this.style[key] = style[key];
        }

        if (this.onModifyStyle) {
            this.onModifyStyle(this.parent, style);
        }

        return this;
    }

    applyStyle(newStyle?: any) {
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

    setActiveState(enable?: any) {
        SetStateEnableMethod.call(this, 'active', enable);
        return this;
    }

    setHoverState(enable?: any) {
        SetStateEnableMethod.call(this, 'hover', enable);
        return this;
    }

    setDisableState(enable?: any) {
        SetStateEnableMethod.call(this, 'disable', enable);
        return this;
    }
}

var ExtractStyle = function(config?: any, prefix?: any, propertiesMap?: any) {
    var result = ExtractByPrefix(config, prefix);

    if (propertiesMap?: any) {
        for (var name in result) {
            if (propertiesMap.hasOwnProperty(name)) {
                result[propertiesMap[name]] = result[name];
                delete result[name];
            }
        }
    }

    return result;
}

var SetStateEnableMethod = function(stateName?: any, enable?: any) {
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

    if (enable?: any) {
        this[styleSaveVarName] = this.applyStyle(this[styleVarName]);
    } else {
        this.applyStyle(this[styleSaveVarName]);
        this[styleSaveVarName] = undefined;
    }
}

export default StyleManager;