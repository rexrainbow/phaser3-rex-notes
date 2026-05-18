import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase';

var AddNegativeProperties = function(gameObject?: any) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'negative');
    return gameObject;
}

export default AddNegativeProperties;