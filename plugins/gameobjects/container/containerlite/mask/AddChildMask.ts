import DefaultMaskGraphics from '../../../../utils/mask/defaultmaskgraphics/DefaultMaskGraphics';
import { SetMask } from '../../../../utils/mask/MaskMethods';

var AddChildMask = function(maskTarget?: any, sizeTarget?: any, shape?: any, padding?: any) {
    var maskGameObject = new DefaultMaskGraphics(sizeTarget, shape, padding); // A Graphics game object
    if (maskTarget && !maskTarget.isRexSizer) { // Sizer game object can't apply mask
        SetMask(maskTarget, maskGameObject);
    }
    this.pin(maskGameObject); // maskGameObject will be destroyed with parent container
    return maskGameObject;
}

export default AddChildMask;