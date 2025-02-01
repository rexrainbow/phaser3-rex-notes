import MaskChildren from './MaskChildren.js';
import AddChildMask from './AddChildMask.js';
import { SetMask } from '../../../../utils/mask/MaskMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

const MASKUPDATEMODE = {
    update: 0,
    everyTick: 1
};

export default {
    setupChildrenMask(config) {
        if (config === false) {
            // No children mask
            return this;
        }

        this.setMaskUpdateMode(GetValue(config, 'updateMode', 0));
        this.enableChildrenMask(GetValue(config, 'padding', 0));
        this.setMaskLayer(GetValue(config, 'layer', undefined));

        this.onMaskGameObjectVisible = GetValue(config, 'onVisible');
        this.onMaskGameObjectInvisible = GetValue(config, 'onInvisible');
        this.maskGameObjectCallbackScope = GetValue(config, 'scope');

        this.startMaskUpdate();

        return this;
    },

    destroyChildrenMask() {
        if (!this.childrenMaskGameObject) {
            return this;
        }

        this.stopMaskUpdate();
        this.childrenMaskGameObject.destroy();
        this.childrenMaskGameObject = undefined;

        this.onMaskGameObjectVisible = null;
        this.onMaskGameObjectInvisible = null;
        this.maskGameObjectCallbackScope = null;

        return this;
    },

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

    enableChildrenMask(maskPadding) {
        this.childrenMaskGameObject = AddChildMask.call(this, null, this, 0, maskPadding);  // A Graphics game object
        return this;
    },

    setMaskChildrenFlag(value) {
        if (value === undefined) {
            value = true;
        }
        this.maskChildrenFlag = value;
        return this;
    },

    setMaskLayer(layer) {
        // To reduce amount of masked game object
        this.maskLayer = layer;
        return this;
    },

    maskChildren() {
        if (
            (!this.childrenMaskGameObject) ||      // No childrenMaskGameObject
            (!this.maskChildrenFlag) ||            // No maskChildrenFlag set
            (this.alpha === 0) || (!this.visible)  // Parent is not visible
        ) {
            return this;
        }

        if (this.privateRenderLayer) {
            SetMask(this.privateRenderLayer, this.childrenMaskGameObject);

        } else if (this.maskLayer) {
            // 1. Add parent and children into layer
            this.addToLayer(this.maskLayer);
            // 2. Mask this layer
            SetMask(this.maskLayer, this.childrenMaskGameObject);

        } else {
            MaskChildren({
                parent: this,
                maskGameObject: this.childrenMaskGameObject,

                onVisible: this.onMaskGameObjectVisible,
                onInvisible: this.onMaskGameObjectInvisible,
                scope: this.maskGameObjectCallbackScope
            });

        }

        if (this.maskUpdateMode === 0) {
            this.maskChildrenFlag = false;
        }
        return this;
    },

    layoutChildrenMask() {
        if (!this.childrenMaskGameObject) {
            return this;
        }

        var maskGameObject = this.childrenMaskGameObject;
        maskGameObject.setPosition().resize();
        this.resetChildPositionState(maskGameObject);
        return this;
    }
};