import RectangleMask from './RectangleMask.js';
import CircleMask from './CircleMask.js';

var CreateDefaultMaskGameObject = function (parent, shapeType, padding) {
    if (shapeType === undefined) {
        shapeType = 0;
    }

    var MaskGameObjectClass;

    switch (shapeType) {
        case 0:
        case 'rectangle':
            MaskGameObjectClass = RectangleMask;
            break;

        case 1:
        case 'circle':
            MaskGameObjectClass = CircleMask;
            break;

        default:
            MaskGameObjectClass = RectangleMask;
            break;
    }

    var maskGameObject = new MaskGameObjectClass(parent, padding);

    return maskGameObject;
}

export default CreateDefaultMaskGameObject;
