import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase.js';

var AddGrayscaleProperties = function (gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'grayscale');
    return gameObject;
}

export default AddGrayscaleProperties;