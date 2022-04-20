export default {
    getParentSizer(gameObject, name) {
        return this.getParent(gameObject, name);
    },

    getTopmostSizer(gameObject) {
        return this.getTopmostParent(gameObject);
    }
}