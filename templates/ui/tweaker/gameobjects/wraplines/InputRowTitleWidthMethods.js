export default {
    getMaxInputRowTitleWidth() {
        var child = this.childrenMap.child;  // tweaker
        var titleWidth = child.getMaxInputRowTitleWidth();
        return titleWidth;
    },

    setInputRowTitleWidth(width) {
        var child = this.childrenMap.child;  // tweaker
        child.setInputRowTitleWidth(width);
        return this;
    }
}