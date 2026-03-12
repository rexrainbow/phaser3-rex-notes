export default {
    setReadOnly(value) {
        var leftPanel = this.leftPanel;
        var rightPanel = this.rightPanel;
        if (leftPanel && leftPanel.setReadOnly) {
            leftPanel.setReadOnly(value);
        }
        if (rightPanel && rightPanel.setReadOnly) {
            rightPanel.setReadOnly(value);
        }
        return this;
    },
}
