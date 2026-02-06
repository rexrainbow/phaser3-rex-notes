export default {
    setBindingTarget(target) {
        var leftPanel = this.leftPanel;
        var rightPanel = this.rightPanel;
        if (leftPanel) {
            leftPanel.setBindingTarget(target);
        }
        if (rightPanel) {
            rightPanel.setBindingTarget(target);
        }
        return this;
    },
}
