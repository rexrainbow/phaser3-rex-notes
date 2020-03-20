import DefaultMask from '../../../plugins/utils/mask/DefaultMask.js';

var AddChildMask = function (maskTarget, sizeTarget, shape, padding) {
    var maskGameObject = new DefaultMask(sizeTarget, shape, padding); // A Graphics game object
    if (maskTarget && !maskTarget.isRexSizer) { // Sizer game object can't apply mask
        maskTarget.setMask(maskGameObject.createGeometryMask());
    }
    this.pin(maskGameObject);
    return maskGameObject;
}

export default AddChildMask;