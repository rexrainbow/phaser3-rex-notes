import AddEffectProperties from '../../../plugins/effectproperties.js';
import Style from './Style.js';
import HelperMethods from '../utils/stylemanager/HelperMethods.js';

const PhaserImage = Phaser.GameObjects.Image;
const GetValue = Phaser.Utils.Objects.GetValue;

class StatesImage extends PhaserImage {
    constructor(scene, config) {
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
    StatesImage.prototype,
    HelperMethods
)

export default StatesImage;