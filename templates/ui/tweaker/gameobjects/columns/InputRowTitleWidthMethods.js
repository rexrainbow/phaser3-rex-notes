export default {
    getMaxInputRowTitleWidth() {
        var titleWidth;
        if (this.alignAllColumnsTitleWidth) {
            // Align all titles in all columns
            var maxTitleWidth = 0;
            var children = this.childrenMap.columns;  // tweaker array
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                maxTitleWidth = Math.max(maxTitleWidth, children[i].getMaxInputRowTitleWidth());
            }
            titleWidth = maxTitleWidth + this.getInnerPadding('left');

        } else {
            // Align title in a column
            titleWidth = 0;
        }

        return titleWidth;
    },

    setInputRowTitleWidth(width) {
        if (this.alignAllColumnsTitleWidth) {
            // Align all titles in all columns
            width -= this.getInnerPadding('left');

            var children = this.childrenMap.columns;  // tweaker array
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                children[i].setInputRowTitleWidth(width);
            }

        } else {
            // Align title in a column
            var children = this.childrenMap.columns;  // tweaker array
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var childWidth = children[i].getMaxInputRowTitleWidth();
                children[i].setInputRowTitleWidth(childWidth);
            }

        }

        return this;
    }
}
