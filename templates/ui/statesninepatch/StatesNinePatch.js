import NinePatch from '../ninepatch/NinePatch.js';
import AddEffectProperties from '../../../plugins/effectproperties.js';
import Style from './Style.js';
import HelperMethods from '../utils/stylemanager/HelperMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class StatesNinePatch extends NinePatch {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
       
        super(scene, config);
        this.type = 'rexStatesNinePatch';

        var effectConfig = GetValue(config, 'effects', true);
        if (effectConfig) {
            AddEffectProperties(this, effectConfig);
        }

        this.style = new Style(this, config);

        config.style = this.style;
        this.addStyleManager(config);

        delete config.style;
    }
}

Object.assign(
    StatesNinePatch.prototype,
    HelperMethods
)

export default StatesNinePatch;