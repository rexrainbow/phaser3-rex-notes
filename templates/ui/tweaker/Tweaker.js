import Sizer from '../sizer/Sizer.js';
import Maker from '../maker/Maker.js';
import DefaultStyles from './DefaultStyles.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Tweaker extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (config.orientation === undefined) {
            config.orientation = 'y';
        }

        // Create sizer
        super(scene, config);
        this.type = 'rexTweaker';
        this.maker = new Maker(scene, DefaultStyles);

        var customStyles = GetValue(config, 'styles', undefined);
        if (customStyles) {
            this.maker.addStyle(customStyles);
        }

        var customBuilders = GetValue(config, 'builders', undefined);
        if (customBuilders) {
            this.makers.addBuilder(customBuilders);
        }
    }
}

Object.assign(
    Tweaker.prototype,
    Methods
);

export default Tweaker