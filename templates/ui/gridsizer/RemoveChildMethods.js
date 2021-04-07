import Container from '../container/Container.js';
import ArrayFill from '../../../plugins/utils/array/Fill.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const ContainerRemove = Container.prototype.remove;
const ContainerClear = Container.prototype.clear;

export default {
    remove(gameObject, destroyChild) {
        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }

        if (this.isBackground(gameObject)) {
            RemoveItem(this.backgroundChildren, gameObject);
        } else {
            var idx = this.sizerChildren.indexOf(gameObject);
            if (idx !== -1) {
                this.sizerChildren[idx] = null;
            }
        }

        ContainerRemove.call(this, gameObject, destroyChild);
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
        for (var i = 0, cnt = this.sizerChildren.length; i < cnt; i++) {
            var child = this.sizerChildren[i];
            if (child) {
                this.remove(child, destroyChild);
            }
        }
        return this;
    },

    clear(destroyChild) {
        ArrayFill(this.sizerChildren, null);
        if (this.backgroundChildren) {
            this.backgroundChildren.length = 0;
        }
        ContainerClear.call(this, destroyChild);
        return this;
    }
}