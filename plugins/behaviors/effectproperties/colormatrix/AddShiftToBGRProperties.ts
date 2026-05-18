import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase';

var AddShiftToBGRProperties = function(gameObject?: any) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'shiftToBGR');
    return gameObject;
}

export default AddShiftToBGRProperties;