import RoundRectangle from '../roundrectangle/RoundRectangle.js';
import HelperMethods from '../utils/stylemanager/HelperMethods.js';

class StatesRoundRectangle extends RoundRectangle {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        super(scene, config);
        this.type = 'rexStatesRoundRectangleShape';

        config.style = this;
        config.propertiesMap = PropertiesMap;

        this.addStyleManager(config);

        delete config.style;
        delete config.propertiesMap;
    }
}

const PropertiesMap = {
    color: 'fillColor',
    alpha: 'fillAlpha',
    // strokeColor: 'strokeColor',
    // strokeAlpha: 'strokeAlpha',
    strokeWidth: 'lineWidth',
}

Object.assign(
    StatesRoundRectangle.prototype,
    HelperMethods
)

export default StatesRoundRectangle;