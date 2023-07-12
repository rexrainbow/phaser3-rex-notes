import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase.js';

var AddHueProperties = function (gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'hue', 1);
    return gameObject;
}

export default AddHueProperties;