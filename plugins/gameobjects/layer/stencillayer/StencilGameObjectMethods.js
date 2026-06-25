import AddItem from '../../../utils/array/Add.js';
import RemoveItem from '../../../utils/array/Remove.js';

export default {
    addStencilGameObject(gameObject) {
        AddItem(this.stencilGameObjects, gameObject);
        return this;
    },

    removeStencilGameObject(gameObject) {
        RemoveItem(this.stencilGameObjects, gameObject);
        return this;
    },

    clearStencilGameObjects() {
        this.stencilGameObjects.length = 0;
        return this;
    },

    setStencilInvert(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.stencilInvert = enable;
        return this;
    },
}
