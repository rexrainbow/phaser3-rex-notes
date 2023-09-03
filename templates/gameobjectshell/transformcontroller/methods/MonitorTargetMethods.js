export default {
    startMonitorTarget() {
        var target = this.childrenMap.target;
        if (!target || this.isMonitoring) {
            return this;
        }

        if (!this.monitorProperties) {
            this.monitorProperties = {
                x: undefined,
                y: undefined,
                displayWidth: undefined,
                displayHeight: undefined,
                angle: undefined
            }
        }

        var monitorProperties = this.monitorProperties;
        for (var key in monitorProperties) {
            monitorProperties[key] = target[key];
        }

        this.isMonitoring = true;
        this.scene.events.on('postupdate', this.onMonitorTarget, this);
        return this;
    },

    stopMonitorTarget() {
        if (!this.isMonitoring) {
            return this;
        }

        var monitorProperties = this.monitorProperties;
        for (var key in monitorProperties) {
            monitorProperties[key] = undefined;
        }

        this.isMonitoring = false;
        this.scene.events.off('postupdate', this.onMonitorTarget, this);
        return this;
    },

    onMonitorTarget() {
        var target = this.childrenMap.target;
        if (!target) {
            return;
        }

        var dirty = false;
        var previousValue, currentValue;
        var monitorProperties = this.monitorProperties;
        for (var key in monitorProperties) {
            previousValue = monitorProperties[key];
            currentValue = target[key];
            if (previousValue === currentValue) {
                continue;
            }

            monitorProperties[key] = currentValue;
            dirty = true;
        }

        if (dirty) {
            this.layout();
        }
    },
}