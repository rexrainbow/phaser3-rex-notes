import NinePatch from '../ninepatch/NinePatch';
import AddEffectProperties from '../../../plugins/effectproperties';
import Style from './Style';
import HelperMethods from '../utils/stylemanager/HelperMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class StatesNinePatch extends NinePatch {
    addStyleManager: any;
    style: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
       
        super(scene, config);
        this.type = 'rexStatesNinePatch';

        var effectConfig = GetValue(config, 'effects', true);
        if (effectConfig?: any) {
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