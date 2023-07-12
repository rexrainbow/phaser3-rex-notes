import AddColorMatrixEffectPropertiesBase from './AddColorMatrixEffectPropertiesBase.js';

var AddShiftToBGRProperties = function (gameObject) {
    AddColorMatrixEffectPropertiesBase(gameObject, 'shiftToBGR');
    return gameObject;
}

export default AddShiftToBGRProperties;