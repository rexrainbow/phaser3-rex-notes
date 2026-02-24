export default {
    getMaxInputRowTitleWidth() {
        // Skip counting tile width of this columns
        return 0;
    },

    setInputRowTitleWidth(width) {
        // Align all titles in a column
        var children = this.childrenMap.columns;  // tweaker array
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i]; // Assume that child is not another columns
            child.setInputRowTitleWidth(child.getMaxInputRowTitleWidth());
        }

        return this;
    }
}
