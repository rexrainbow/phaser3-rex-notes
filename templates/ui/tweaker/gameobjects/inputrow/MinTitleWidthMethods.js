export default {
    getMinTitleWidth() {
        var title = this.childrenMap.title;
        if (!title || (title.orientation !== 0)) {
            // Don't count vertical input row
            return 0;
        }

        var padding = title.rexSizer.padding;
        var titleWidth = this.getChildWidth(this.childrenMap.title) + ((padding.left + padding.right) * title.scaleX);
        return titleWidth + this.getInnerPadding('left');
    },

    setMinTitleWidth(width) {
        var title = this.childrenMap.title;
        if (!title || (title.orientation !== 0)) {
            // Don't set vertical input row
            return this;
        }

        var padding = title.rexSizer.padding;
        width -= (padding.left + padding.right) * title.scaleX;

        title.minWidth = width;
        return this;
    }
}