import RoundRectangle from '../roundrectangle/RoundRectangle';
import HelperMethods from '../utils/stylemanager/HelperMethods';

class StatesRoundRectangle extends RoundRectangle {
    addStyleManager: any;
    type: any;

    constructor(scene?: any, config?: any) {
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