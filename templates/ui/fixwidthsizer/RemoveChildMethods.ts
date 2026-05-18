import RemoveChild from '../basesizer/utils/RemoveChild';
import ClearChildren from '../basesizer/utils/ClearChildren';

import { Utils as PhaserUtils } from 'phaser';
const RemoveItem = PhaserUtils.Array.Remove;

export default {
    remove(gameObject?: any, destroyChild?: any) {
        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }
        RemoveItem(this.sizerChildren, gameObject);
        RemoveChild.call(this, gameObject, destroyChild);
        return this;
    },

    removeAll(destroyChild?: any) {
        for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
            this.remove(this.sizerChildren[i], destroyChild);
        }
        return this;
    },

    clear(destroyChild?: any) {
        this.sizerChildren.length = 0;
        ClearChildren.call(this, destroyChild);
        return this;
    }
}