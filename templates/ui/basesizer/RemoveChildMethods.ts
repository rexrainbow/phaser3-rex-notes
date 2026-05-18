import RemoveChild from './utils/RemoveChild';
import GetParentSizerMethods from './GetParentSizerMethods';

import { Utils as PhaserUtils } from 'phaser';
const RemoveItem = PhaserUtils.Array.Remove;
const GetParentSizer = GetParentSizerMethods.getParentSizer;

export default {
    removeFromParentSizer() {
        var parent = GetParentSizer(gameObject);
        if (parent?: any) {
            parent.remove(this);
        }
        return this;
    },

    removeBackground(gameObject?: any, destroyChild?: any) {
        if (this.backgroundChildren === undefined) {
            return this;
        }

        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }

        RemoveItem(this.backgroundChildren, gameObject);
        RemoveChild.call(this, gameObject, destroyChild);
        return this;
    },

    removeAllBackgrounds(destroyChild?: any) {
        if (this.backgroundChildren === undefined) {
            return this;
        }

        for (var i = this.backgroundChildren.length - 1; i >= 0; i--) {
            this.remove(this.backgroundChildren[i], destroyChild);
        }
        return this;
    },
}