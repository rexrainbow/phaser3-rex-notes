import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase';

var AddDesaturateLuminanceProperties = function(gameObject?: any) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'desaturateLuminance');
    return gameObject;
}

export default AddDesaturateLuminanceProperties;