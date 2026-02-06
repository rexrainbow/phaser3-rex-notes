export default {
    getMaxInputRowTitleWidth() {
        var titleWidth;
        if (this.alignAllColumnsTitleWidth === false) {
            // Align title in a column
            titleWidth = 0;

        } else {
            // Align all titles in all columns
            var maxTitleWidth = 0;
            var children = this.childrenMap.columns;  // tweaker array
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                maxTitleWidth = Math.max(maxTitleWidth, children[i].getMaxInputRowTitleWidth());
            }
            titleWidth = maxTitleWidth + this.getInnerPadding('left');
        }

        return titleWidth;
    },

    setInputRowTitleWidth(width) {
        if (this.alignAllColumnsTitleWidth === false) {
            // Align title in a column
            var children = this.childrenMap.columns;  // tweaker array
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var childWidth = children[i].getMaxInputRowTitleWidth();
                children[i].setInputRowTitleWidth(childWidth);
            }

        } else {
            // Align all titles in all columns
            width -= this.getInnerPadding('left');

            var children = this.childrenMap.columns;  // tweaker array
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                children[i].setInputRowTitleWidth(width);
            }
        }

        return this;
    }
}
