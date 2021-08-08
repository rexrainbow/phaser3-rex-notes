export default {
    // Override
    remove(gameObject, destroyChild) {
    },

    // Override
    removeAll(destroyChild) {
        return this;
    },

    // Override
    clear(destroyChild) {
        // This method also will be invoked in sizer.destroy() <- containerLite.destroy()
        // Override to clear this.sizerChildren
    }
}