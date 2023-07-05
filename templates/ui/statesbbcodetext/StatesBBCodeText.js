import BBCodeText from '../bbcodetext/BBCodeText.js';
import HelperMethods from '../utils/stylemanager/HelperMethods.js';

class StatesText extends BBCodeText {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var text = GetValue(config, 'text', '');
        super(scene, x, y, text, config);

        config.style = this.style;
        config.onModifyStyle = function (gameObject, style) {
            gameObject.updateText();
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