export default {
    setChildVisible(child, visible) {
        if (typeof (child) === 'string') {
            var key = child;
            child = this.sizerChildren[key];
        }
        child.setVisible(visible);
        return this;
    }
}