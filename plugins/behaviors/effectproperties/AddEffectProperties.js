import AddBarrelProperties from './AddBarrelProperties.js';
import AddBlackWhiteProperties from './colormatrix/AddBlackWhiteProperties.js';
import AddBloomProperties from './AddBloomProperties.js';
import AddBlurProperties from './AddBlurProperties.js';
import AddBrownProperties from './colormatrix/AddBrownProperties.js';
import AddDesaturateLuminanceProperties from './colormatrix/AdddesaturateLuminanceProperties.js';
import AddGlowProperties from './AddGlowProperties.js';
import AddGrayscaleProperties from './colormatrix/AddGrayscaleProperties.js';
import AddKodachromeProperties from './colormatrix/AddKodachromeProperties.js';
import AddLSDProperties from './colormatrix/AddLSDProperties.js';
import AddNegativeProperties from './colormatrix/AddNegativeProperties.js';
import AddPolaroidProperties from './colormatrix/AddPolaroidProperties.js';
import AddRevealProperties from './AddRevealProperties.js';
import AddSepiaProperties from './colormatrix/AddSepiaProperties.js';
import AddShineProperties from './AddShineProperties.js';
import AddTechnicolorProperties from './colormatrix/AddTechnicolorProperties.js';
import AddVignetteProperties from './AddVignetteProperties.js';
import AddVintagePinholeProperties from './colormatrix/AddVintagePinholeProperties.js';
import AddWipeProperties from './AddWipeProperties.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddEffectProperties = function (gameObject, config) {
    if (config === undefined) {
        config = true;
    }

    if ((config === true) || GetValue(config, 'barrel', false)) {
        AddBarrelProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'blackWhite', false)) {
        AddBlackWhiteProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'bloom', false)) {
        AddBloomProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'blur', false)) {
        AddBlurProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'brown', false)) {
        AddBrownProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'desaturateLuminance', false)) {
        AddDesaturateLuminanceProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'glow', false)) {
        AddGlowProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'grayscale', false)) {
        AddGrayscaleProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'kodachrome', false)) {
        AddKodachromeProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'lsd', false)) {
        AddLSDProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'negative', false)) {
        AddNegativeProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'polaroid', false)) {
        AddPolaroidProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'reveal', false)) {
        AddRevealProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'sepia', false)) {
        AddSepiaProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'shine', false)) {
        AddShineProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'technicolor', false)) {
        AddTechnicolorProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'vignette', false)) {
        AddVignetteProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'vintagePinhole', false)) {
        AddVintagePinholeProperties(gameObject);
    }

    if ((config === true) || GetValue(config, 'wipe', false)) {
        AddWipeProperties(gameObject);
    }

    return gameObject;
}
export default AddEffectProperties;