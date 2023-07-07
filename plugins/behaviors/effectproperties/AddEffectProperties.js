import AddGlowProperties from './AddGlowProperties.js';
import AddGrayscaleProperties from './AddGrayscaleProperties.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddEffectProperties = function (gameObject, config) {
    if (config === undefined) {
        config = true;
    }

    if ((config === true) || GetValue(config, 'glow', false)) {
        AddGlowProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'grayscale', false)) {
        AddGrayscaleProperties(gameObject);
    }

    return gameObject;
}
export default AddEffectProperties;