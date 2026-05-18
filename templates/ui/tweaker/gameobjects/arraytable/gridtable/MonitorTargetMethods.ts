export default {
    startMonitorTarget() {
        if (this.isMonitoring) {
            return this;
        }

        // Monitor items length
        this.lastItemsCount = (this.items) ? this.items.length : 0;

        this.isMonitoring = true;        
        this.scene.events.on('postupdate', this.onMonitorTarget, this);
        return this;
    },

    stopMonitorTarget() {
        if (!this.isMonitoring) {
            return this;
        }

        this.isMonitoring = false;
        this.scene.events.off('postupdate', this.onMonitorTarget, this);
        return this;
    },

    onMonitorTarget() {
        var lastItemsCount = (this.items) ? this.items.length : 0;
        if (this.lastItemsCount === lastItemsCount) {
            return;
        }

        this.lastItemsCount = lastItemsCount;
        this.refresh();
    },
}