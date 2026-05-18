import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase';

var AddTechnicolorProperties = function(gameObject?: any) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'technicolor');
    return gameObject;
}

export default AddTechnicolorProperties;