import DefaultMaskGraphics from '../../../../utils/mask/defaultmaskgraphics/DefaultMaskGraphics.js';
import { SetMask } from '../../../../utils/mask/MaskMethods.js';

var AddChildMask = function (maskTarget, sizeTarget, shape, padding) {
    var maskGameObject = new DefaultMaskGraphics(sizeTarget, shape, padding); // A Graphics game object
    if (maskTarget && !maskTarget.isRexSizer) { // Sizer game object can't apply mask
        SetMask(maskTarget, maskGameObject);
    }
    this.pin(maskGameObject); // maskGameObject will be destroyed with parent container
    return maskGameObject;
}

export default AddChildMask;