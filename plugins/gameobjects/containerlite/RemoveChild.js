export default {
    remove(gameObject, destroyChild) {
        this.children.remove(gameObject, false, destroyChild);
        return this;
    },

    clear(destroyChild) {
        this.children.clear(false, destroyChild);
        return this;
    },
};