export default {
    setReadOnly(value) {
        var child = this.childrenMap.child;  // tweaker
        if (child.setReadOnly) {
            child.setReadOnly(value);
        }
        return this;
    },
}