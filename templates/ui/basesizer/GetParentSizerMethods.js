export default {
    getParentSizer(gameObject) {
        return this.getParent(gameObject);
    },

    getTopmostSizer(gameObject) {
        return this.getTopmostParent(gameObject);
    }
}