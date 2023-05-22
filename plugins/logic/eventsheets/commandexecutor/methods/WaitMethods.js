export default {
    clearWaitEventFlag() {
        this.hasAnyWaitEvent = false;
        return this;
    },

    setWaitEventFlag() {
        this.hasAnyWaitEvent = true;
        return this;
    },

    waitEvent(eventEmitter, eventName) {
        this.sys.waitEventManager.waitEvent(eventEmitter, eventName);
        this.setWaitEventFlag();
        return this;
    },

    wait(config, manager) {
        var { time } = config;
        if (time !== undefined) {
            config.time = manager.evalExpression(time);
        }
        return this.sys.waitEventManager.waitAny(config);
    },

    click(config, manager) {
        return this.wait({ click: true }, manager);
    }
}