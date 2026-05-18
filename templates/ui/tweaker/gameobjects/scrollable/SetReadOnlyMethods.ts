export default {
    setReadOnly(value?: any) {
        var child = this.childrenMap.panel;  // tweaker
        if (child.setReadOnly) {
            child.setReadOnly(value);
        }
        return this;
    },
}