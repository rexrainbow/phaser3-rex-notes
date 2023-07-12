import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase.js';

var AddContrastProperties = function (gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'contrast', 1);
    return gameObject;
}

export default AddContrastProperties;