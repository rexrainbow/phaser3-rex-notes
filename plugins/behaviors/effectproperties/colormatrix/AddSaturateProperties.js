import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase.js';

var AddSaturateProperties = function (gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'saturate', 1);
    return gameObject;
}

export default AddSaturateProperties;