import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase.js';

var AddDesaturateProperties = function (gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'desaturate', 1);
    return gameObject;
}

export default AddDesaturateProperties;