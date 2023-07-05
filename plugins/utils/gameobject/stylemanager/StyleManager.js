import ComponentBase from '../../componentbase/ComponentBase.js';
import ExtractStyle from './ExtractStyle.js';
import GetPartialData from '../../object/GetPartialData.js';
import IsKeyValueEqual from '../../object/IsKeyValueEqual.js';

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
        if (enable === undefined) {
            enable = true;
        }

        if (this.activeState === enable) {
            return this;
        }

        this.activeState = enable;

        if (enable) {
            this.activeStyleSave = this.applyStyle(this.activeStyle);
        } else {
            this.applyStyle(this.activeStyleSave);
            this.activeStyleSave = undefined;
        }

        return this;
    }

    setHoverState(enable) {
        if (enable === undefined) {
            enable = true;
        }

        if (this.hoverState === enable) {
            return this;
        }

        this.hoverState = enable;

        if (enable) {
            this.hoverStyleSave = this.applyStyle(this.hoverStyle);
        } else {
            this.applyStyle(this.hoverStyleSave);
            this.hoverStyleSave = undefined;
        }

        return this;
    }

    setDisableState(enable) {
        if (enable === undefined) {
            enable = true;
        }

        if (this.disableState === enable) {
            return this;
        }

        this.disableState = enable;

        if (enable) {
            this.disableStyleSave = this.applyStyle(this.disableStyle);
        } else {
            this.applyStyle(this.disableStyleSave);
            this.disableStyleSave = undefined;
        }

        return this;
    }
}

export default StyleManager;