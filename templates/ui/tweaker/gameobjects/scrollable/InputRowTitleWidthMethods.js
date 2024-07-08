export default {
    getMaxInputRowTitleWidth() {
        var child = this.childrenMap.panel;  // tweaker
        var titleWidth = child.getMaxInputRowTitleWidth();
        return titleWidth + this.getInnerPadding('left');
    },

    setInputRowTitleWidth(width) {
        width -= this.getInnerPadding('left');

        var child = this.childrenMap.panel;  // tweaker
        child.setInputRowTitleWidth(width);
        return this;
    }
}