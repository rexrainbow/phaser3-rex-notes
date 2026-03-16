export default {
    setReadOnly(value) {
        var child = this.childrenMap.panel;  // tweaker
        if (child.setReadOnly) {
            child.setReadOnly(value);
        }
        return this;
    },
}