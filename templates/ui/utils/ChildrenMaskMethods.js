import MaskChildren from '../../../plugins/gameobjects/containerlite/MaskChildren.js';
import MaskToGameObject from '../../../plugins/utils/mask/MaskToGameObject.js';
import AddChildMask from '../utils/AddChildMask.js';

const MASKUPDATEMODE = {
    update: 0,
    everyTick: 1
};

export default {
    setMaskUpdateMode(mode) {
        if (typeof (mode) === 'string') {
            mode = MASKUPDATEMODE[mode];
        }
        this.maskUpdateMode = mode;
        return this;
    },

    startMaskUpdate() {
        this.scene.game.events.on('poststep', this.maskChildren, this);
    },

    stopMaskUpdate() {
        this.scene.game.events.off('poststep', this.maskChildren, this);
    },

    addChildMask: AddChildMask,

    enableChildrenMask(maskPadding) {
        var maskGameObject = this.addChildMask(null, this, 0, maskPadding);
        this.childrenMask = maskGameObject.createGeometryMask();
        // this.childrenMask is a mask object, not a (Graphics) game object
        return this;
    },

    setMaskChildrenFlag(value) {
        if (value === undefined) {
            value = true;
        }
        this.maskChildrenFlag = value;
        return this;
    },

    maskChildren() {
        if (!this.childrenMask) {
            // No childrenMask
            return this;
        } else if (!this.maskChildrenFlag) {
            // No maskCells flag
            return this;
        } else if ((this.alpha === 0) || (!this.visible)) {
            // Parent is not visible
            return this;
        }

        MaskChildren(this, this.childrenMask, this.getAllChildren());

        if (this.maskUpdateMode === 0) {
            this.maskChildrenFlag = false;
        }
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