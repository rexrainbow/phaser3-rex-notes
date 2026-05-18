import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase';

var AddSepiaProperties = function(gameObject?: any) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'sepia');
    return gameObject;
}

export default AddSepiaProperties;