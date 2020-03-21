import IndexOf from '../../../../plugins/utils/object/IndexOf.js';

export default {
    setChildVisible(child, visible) {
        var key;
        if (typeof (child) === 'string') {
            var key = child;
            child = this.sizerChildren[key];
        } else {
            key = IndexOf(this.sizerChildren, child);
        }
        if (visible === undefined) {
            visible = (this.currentChildKey === key) ? true : false;
        }
        child.setVisible(visible);
        return this;
    }
}