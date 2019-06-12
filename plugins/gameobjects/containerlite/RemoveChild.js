export default {
    remove(gameObject) {
        this.children.remove(gameObject);
        return this;
    },

    clear() {
        this.children.clear();
        return this;
    },
};