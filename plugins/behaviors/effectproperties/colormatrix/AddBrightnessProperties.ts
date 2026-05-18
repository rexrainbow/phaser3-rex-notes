import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase';

var AddBrightnessProperties = function(gameObject?: any) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'brightness', 1);
    return gameObject;
}

export default AddBrightnessProperties;