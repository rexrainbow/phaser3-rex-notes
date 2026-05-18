import AddEffectProperties from '../../../plugins/effectproperties';
import Style from './Style';
import HelperMethods from '../utils/stylemanager/HelperMethods';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const PhaserImage = PhaserGameObjects.Image;
const GetValue = PhaserUtils.Objects.GetValue;

class StatesImage extends PhaserImage {
    addStyleManager: any;
    style: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var key = GetValue(config, 'key', '');
        var frame = GetValue(config, 'frame', undefined);
        super(scene, x, y, key, frame);
        this.type = 'rexStatesImage';

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
    StatesImage.prototype,
    HelperMethods
)

export default StatesImage;