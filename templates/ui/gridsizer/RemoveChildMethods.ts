import RemoveChild from '../basesizer/utils/RemoveChild';
import ClearChildren from '../basesizer/utils/ClearChildren';
import ArrayFill from '../../../plugins/utils/array/Fill';

export default {
    remove(gameObject?: any, destroyChild?: any) {
        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }

        var idx = this.sizerChildren.indexOf(gameObject);
        if (idx !== -1) {
            this.sizerChildren[idx] = null;
        }

        RemoveChild.call(this, gameObject, destroyChild);
        return this;
    },

    removeAt(columnIndex?: any, rowIndex?: any, destroyChild?: any) {
        var child = this.getChildAt(columnIndex, rowIndex);
        if (child?: any) {
            this.remove(child, destroyChild);
        }
        return this;
    },

    removeAll(destroyChild?: any) {
        for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
            var child = this.sizerChildren[i];
            if (!child) {
                continue;
            }

            this.remove(child, destroyChild);
        }
        return this;
    },

    clear(destroyChild?: any) {
        ArrayFill(this.sizerChildren, null);
        ClearChildren.call(this, destroyChild);
        return this;
    }
}