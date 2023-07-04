import RoundRectangle from '../roundrectangle/RoundRectangle.js';
import StyleManager from '../../../plugins/utils/gameobject/stylemanager/StyleManager.js';

class StatesRoundRectangle extends RoundRectangle {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        super(scene, config);

        config.style = this;
        config.propertiesMap = PropertiesMap;

        this.styleManager = new StyleManager(this, config);

        delete config.style;
        delete config.propertiesMap;
    }

    setActiveState(enable) {
        this.styleManager.setActiveState(enable);
        return this;
    }

    setHoverState(enable) {
        this.styleManager.setHoverState(enable);
        return this;
    }

    setDisableState(enable) {
        this.styleManager.setDisableState(enable);
        return this;
    }
}

const PropertiesMap = {
    color: 'fillColor',
    alpha: 'fillAlpha',
    // strokeColor: 'strokeColor',
    // strokeAlpha: 'strokeAlpha',
    strokeWidth: 'lineWidth',
}

export default StatesRoundRectangle;