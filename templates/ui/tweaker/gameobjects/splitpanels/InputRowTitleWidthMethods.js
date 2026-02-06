export default {
    getMaxInputRowTitleWidth() {
        var titleWidth;
        if (this.alignAllColumnsTitleWidth) {
            // Align all titles in both(left, right) panels
            var maxTitleWidth = 0;
            var leftPanel = this.leftPanel;
            var rightPanel = this.rightPanel;
            if (leftPanel) {
                maxTitleWidth = Math.max(maxTitleWidth, leftPanel.getMaxInputRowTitleWidth());
            }
            if (rightPanel) {
                maxTitleWidth = Math.max(maxTitleWidth, rightPanel.getMaxInputRowTitleWidth());
            }
            titleWidth = maxTitleWidth + this.getInnerPadding('left');

        } else {
            // Align title in a panel
            titleWidth = 0;

        }

        return titleWidth;
    },

    setInputRowTitleWidth(width) {
        if (this.alignAllColumnsTitleWidth) {
            // Align all titles in both(left, right) panels
            width -= this.getInnerPadding('left');

            var leftPanel = this.leftPanel;
            var rightPanel = this.rightPanel;
            if (leftPanel) {
                leftPanel.setInputRowTitleWidth(width);
            }
            if (rightPanel) {
                rightPanel.setInputRowTitleWidth(width);
            }

        } else {
            // Align title in a panel
            var leftPanel = this.leftPanel;
            var rightPanel = this.rightPanel;
            if (leftPanel) {
                var leftWidth = leftPanel.getMaxInputRowTitleWidth();
                leftPanel.setInputRowTitleWidth(leftWidth);
            }
            if (rightPanel) {
                var rightWidth = rightPanel.getMaxInputRowTitleWidth();
                rightPanel.setInputRowTitleWidth(rightWidth);
            }
        }

        return this;
    }
}
