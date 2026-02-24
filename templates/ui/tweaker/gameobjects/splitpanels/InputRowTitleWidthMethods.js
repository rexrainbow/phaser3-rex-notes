export default {
    getMaxInputRowTitleWidth() {
        // Skip counting tile width of this columns
        return 0;
    },

    setInputRowTitleWidth(width) {
        // Align all titles in a panel
        var leftPanel = this.leftPanel;
        var rightPanel = this.rightPanel;
        if (leftPanel) {
            leftPanel.setInputRowTitleWidth(leftPanel.getMaxInputRowTitleWidth());
        }
        if (rightPanel) {
            rightPanel.setInputRowTitleWidth(rightPanel.getMaxInputRowTitleWidth());
        }

        return this;
    }
}
