import RoundRectangle from '../roundrectangle/RoundRectangle.js';
import ExtractByPrefix from '../../../plugins/utils/object/ExtractByPrefix.js';
import GetPartialData from '../../../plugins/utils/object/GetPartialData.js';
import IsKeyValueEqual from '../../../plugins/utils/object/IsKeyValueEqual.js';

class StatesRoundRectangle extends RoundRectangle {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        super(scene, config);

        var activeStyle = ExtractByPrefix(config, 'active');
        for (var name in activeStyle) {
            var propertyName = PropertiesMap[name] || name;
            var value = activeStyle[name];
            delete activeStyle[name];
            activeStyle[propertyName] = value;
        }
        this.activeStyle = activeStyle;
    }

    modifyStyle(style) {
        for (var key in style) {
            this[key] = style[key];
        }
        return this;
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
            var activeStyle = this.activeStyle;

            var styleSave = GetPartialData(this, activeStyle);
            if (IsKeyValueEqual(activeStyle, styleSave)) {
                return;
            }

            this.styleSave = styleSave;
            this.modifyStyle(activeStyle);
        } else {
            if (!this.styleSave) {
                return this;
            }

            this.modifyStyle(this.styleSave);
            this.styleSave = undefined;
        }

        return this;
    }
}

const PropertiesMap = {
    color: 'fillColor',
    alpha: 'fillAlpha',
    strokeColor: 'strokeColor',
    strokeAlpha: 'strokeAlpha',
    strokeWidth: 'lineWidth',
}

export default StatesRoundRectangle;