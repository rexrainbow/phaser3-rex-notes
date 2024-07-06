import LineProgress from '../lineprogress/LineProgress.js';
import HelperMethods from '../utils/stylemanager/HelperMethods.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

class StatesBarRectangle extends LineProgress {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (!config.hasOwnProperty('value')) {
            config.value = 0;
        }

        if (!config.hasOwnProperty('hover.bar')) {
            config['hover.bar'] = true;
        }

        if (!config.hasOwnProperty('easeDuration')) {
            config.easeDuration = 200;
        }

        if (!config.hasOwnProperty('ease')) {
            config.ease = 'Quad';
        }

        SetValue(config, 'easeValue.duration', config.easeDuration);
        SetValue(config, 'easeValue.ease', config.ease);

        super(scene, config);
        this.type = 'rexStatesBarRectangleShape';

        this.barState = false;

        config.style = this;
        config.propertiesMap = PropertiesMap;

        this.addStyleManager(config);

        delete config.style;
        delete config.propertiesMap;
    }

    get bar() {
        return this.barState;
    }

    set bar(value) {
        value = !!value;
        if (this.barState === value) {
            return;
        }
        this.barState = value;
        this.easeValueTo((this.barState) ? 1 : 0);
    }

}

const PropertiesMap = {
    color: 'trackColor',
    strokeColor: 'trackStrokeColor',
    strokeWidth: 'trackStrokeThickness',

    // barColor: 'barColor'
}

Object.assign(
    StatesBarRectangle.prototype,
    HelperMethods
)

export default StatesBarRectangle;