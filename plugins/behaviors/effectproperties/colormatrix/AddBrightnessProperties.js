import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase.js';

var AddBrightnessProperties = function (gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'brightness', 1);
    return gameObject;
}

export default AddBrightnessProperties;