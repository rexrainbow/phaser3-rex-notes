import HelperMethods from '../utils/stylemanager/HelperMethods.js';

const PhaserText = Phaser.GameObjects.Text;
const GetValue = Phaser.Utils.Objects.GetValue;

class StatesText extends PhaserText {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var text = GetValue(config, 'text', '');
        super(scene, x, y, text, config);
        this.type = 'rexStatesText';

        config.style = this.style;
        config.onModifyStyle = function (gameObject, style) {
            var recalculateMetrics = style.hasOwnProperty('fontStyle') || style.hasOwnProperty('fontSize') || style.hasOwnProperty('fontFamily');
            gameObject.style.update(recalculateMetrics);
        }

        this.addStyleManager(config);

        delete config.style;
    }
}

Object.assign(
    StatesText.prototype,
    HelperMethods
)

export default StatesText;