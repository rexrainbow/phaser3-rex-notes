import AddEffectProperties from '../../../plugins/effectproperties.js';
import Style from './Style.js';
import HelperMethods from '../utils/stylemanager/HelperMethods.js';

const PhaserBitmapText = Phaser.GameObjects.BitmapText;
const GetValue = Phaser.Utils.Objects.GetValue;

class StatesBitmapText extends PhaserBitmapText {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var font = GetValue(config, 'font', '');
        var size = GetValue(config, 'fontSize', false);
        var align = GetValue(config, 'align', 0);
        var tint = GetValue(config, 'tint');
        super(scene, x, y, font, '', size, align);
        this.type = 'rexStatesBitmapText';

        if (tint !== undefined) {
            this.setTint(tint);
        }

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
    StatesBitmapText.prototype,
    HelperMethods
)

export default StatesBitmapText;