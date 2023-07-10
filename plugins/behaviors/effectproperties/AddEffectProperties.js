import AddBarrelProperties from './AddBarrelProperties.js';
import AddBloomProperties from './AddBloomProperties.js';
import AddBlurProperties from './AddBlurProperties.js';
import AddGlowProperties from './AddGlowProperties.js';
import AddGrayscaleProperties from './AddGrayscaleProperties.js';
import AddRevealProperties from './AddRevealProperties.js';
import AddShineProperties from './AddShineProperties.js';
import AddVignetteProperties from './AddVignetteProperties.js';
import AddWipeProperties from './AddWipeProperties.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddEffectProperties = function (gameObject, config) {
    if (config === undefined) {
        config = true;
    }

    if ((config === true) || GetValue(config, 'barrel', false)) {
        AddBarrelProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'bloom', false)) {
        AddBloomProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'blur', false)) {
        AddBlurProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'glow', false)) {
        AddGlowProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'grayscale', false)) {
        AddGrayscaleProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'reveal', false)) {
        AddRevealProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'shine', false)) {
        AddShineProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'vignette', false)) {
        AddVignetteProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'wipe', false)) {
        AddWipeProperties(gameObject);
    }

    return gameObject;
}
export default AddEffectProperties;