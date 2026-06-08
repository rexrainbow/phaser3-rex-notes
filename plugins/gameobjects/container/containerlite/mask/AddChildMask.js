import CreateDefaultMaskGameObject from '../../../../utils/mask/defaultmaskgameobject/CreateDefaultMaskGameObject.js';
import { SetMask } from '../../../../utils/mask/MaskMethods.js';

var AddChildMask = function (maskTarget, sizeTarget, shape, padding) {
    // Rectangle or circle shape game object
    var maskGameObject = CreateDefaultMaskGameObject(sizeTarget, shape, padding);

    if (maskTarget && !maskTarget.isRexSizer) { // Sizer game object can't apply mask
        SetMask(maskTarget, maskGameObject);
    }
    this.pin(maskGameObject); // maskGameObject will be destroyed with parent container
    return maskGameObject;
}

export default AddChildMask;