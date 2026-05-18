import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase';

var AddHueProperties = function(gameObject?: any) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'hue', 1);
    return gameObject;
}

export default AddHueProperties;