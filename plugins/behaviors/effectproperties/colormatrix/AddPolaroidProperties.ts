import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase';

var AddPolaroidProperties = function(gameObject?: any) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'polaroid');
    return gameObject;
}

export default AddPolaroidProperties;