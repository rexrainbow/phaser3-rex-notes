import MaskChildren from '../../../plugins/gameobjects/containerlite/MaskChildren.js';
import MaskToGameObject from '../../../plugins/utils/mask/MaskToGameObject.js';
import AddChildMask from '../utils/AddChildMask.js';

export default {
    addChildMask: AddChildMask,

    enableChildrenMask(maskPadding) {
        var maskGameObject = this.addChildMask(null, this, 0, maskPadding);
        this.childrenMask = maskGameObject.createGeometryMask();
        // this.childrenMask is a mask object, not a (Graphics) game object
        return this;
    },

    maskChildren(children) {
        if (children === undefined) {
            children = this.getAllChildren();
        }
        MaskChildren(this, this.childrenMask, children);
        return this;
    },

    layoutChildrenMask() {
        if (this.childrenMask === undefined) {
            return this;
        }

        var maskGameObject = MaskToGameObject(this.childrenMask);
        maskGameObject.setPosition().resize();
        this.resetChildPositionState(maskGameObject);
        return this;
    }
};