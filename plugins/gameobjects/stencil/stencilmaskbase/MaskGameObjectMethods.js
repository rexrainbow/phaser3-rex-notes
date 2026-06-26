import AddItem from '../../../utils/array/Add.js';
import RemoveItem from '../../../utils/array/Remove.js';

export default {
    addMaskGameObject(gameObject) {
        AddItem(this.maskGameObjects, gameObject);
        return this;
    },

    removeMaskGameObject(gameObject) {
        RemoveItem(this.maskGameObjects, gameObject);
        return this;
    },

    clearMaskGameObjects() {
        this.maskGameObjects.length = 0;
        return this;
    },

    setStencilInvert(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.stencilInvert = enable;
        return this;
    },
};
