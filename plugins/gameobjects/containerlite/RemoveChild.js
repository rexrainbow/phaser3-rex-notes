export default {
    remove(gameObject, destroyChild) {
        if (this.getParent(gameObject) !== this) {
            return this;
        }

        this.setParent(gameObject, null);
        gameObject.off('destroy', this.remove, this);
        this.children.remove(gameObject, false, destroyChild);
        return this;
    },

    clear(destroyChild) {
        var children = this.getAllChildren(), child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            this.setParent(child, null);
            child.off('destroy', this.remove, this);
        }
        this.children.clear(false, destroyChild);
        return this;
    },
};