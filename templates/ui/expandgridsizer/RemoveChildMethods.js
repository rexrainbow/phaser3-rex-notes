import RemoveChild from '../basesizer/utils/RemoveChild.js';
import ClearChildren from '../basesizer/utils/ClearChildren.js';
import ArrayFill from '../../../plugins/utils/array/Fill.js';

const RemoveItem = Phaser.Utils.Array.Remove;

export default {
    remove(gameObject, destroyChild) {
        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }

        var config = this.getSizerConfig(gameObject);
        var indexes = config.indexes;
        for (var i = 0, cnt = indexes.length; i < cnt; i++) {
            this.indexesChildren[indexes[i]] = null;
        }

        RemoveItem(this.sizerChildren, gameObject);

        RemoveChild.call(this, gameObject, destroyChild);
        return this;
    },

    removeAt(columnIndex, rowIndex, destroyChild) {
        var child = this.getChildAt(columnIndex, rowIndex);
        if (child) {
            this.remove(child, destroyChild);
        }
        return this;
    },

    removeAll(destroyChild) {
        for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
            var child = this.sizerChildren[i];
            if (!child) {
                continue;
            }

            this.remove(child, destroyChild);
        }
        return this;
    },

    clear(destroyChild) {
        ArrayFill(this.sizerChildren, null);
        ClearChildren.call(this, destroyChild);
        return this;
    }
}