export default {
    getMaxInputRowTitleWidth() {
        if (this.alignAllColumnsTitleWidth === false) {
            return 0;
        }

        var maxTitleWidth = 0;
        var children = this.childrenMap.columns;  // tweaker array
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            maxTitleWidth = Math.max(maxTitleWidth, children[i].getMaxInputRowTitleWidth());
        }

        return maxTitleWidth + this.getInnerPadding('left');
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
