import BaseSizer from '../basesizer/BaseSizer.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const BaseSizerRemove = BaseSizer.prototype.remove;
const BaseSizerClear = BaseSizer.prototype.clear;

export default {
    remove(gameObject, destroyChild) {
        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }
        RemoveItem(this.sizerChildren, gameObject);
        BaseSizerRemove.call(this, gameObject, destroyChild);
        return this;
    },

    removeAll(destroyChild) {
        for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
            this.remove(this.sizerChildren[i], destroyChild);
        }
        return this;
    },

    clear(destroyChild) {
        this.sizerChildren.length = 0;
        BaseSizerClear.call(this, destroyChild);
        return this;
    }
}