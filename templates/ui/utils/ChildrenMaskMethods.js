import Base from '../../../plugins/gameobjects/containerlite/mask/ChildrenMaskMethods.js';
import MaskToGameObject from '../../../plugins/utils/mask/MaskToGameObject.js';

var methods = {
    layoutChildrenMask() {
        if (this.childrenMask === undefined) {
            return this;
        }

        var maskGameObject = MaskToGameObject(this.childrenMask);
        maskGameObject.setPosition().resize();
        this.resetChildPositionState(maskGameObject);
        return this;
    }
}

Object.assign(
    methods,
    Base
);

export default methods;