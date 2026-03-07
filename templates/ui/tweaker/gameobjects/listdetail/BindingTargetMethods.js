export default {
    setBindingTarget(target, bindingKey) {
        // ListTable panel (left panel)
        if (arguments.length >= 2) {
            this.leftPanel.setBindingTarget(target, bindingKey);
        } else {
            this.leftPanel.setBindingTarget(target);
        }

        var items = this.leftPanel.items;
        if (items.length > 0) {
            this.selectItem(0, false);
        } else {
            this.clearSelection();
        }

        return this;
    },

    startMonitorTarget() {
        this.leftPanel.startMonitorTarget();
        return this;
    },

    stopMonitorTarget() {
        this.leftPanel.stopMonitorTarget();
        return this;
    },
}
