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
        var { click, key } = config;

        if (click) {
            manager.emit('pause.click');
        }

        if (key) {
            manager.emit('pause.key', config.key);
        }

        if (click | key) {
            manager.emit('pause.input');
            this.sys.once('complete', function () {
                manager.emit('resume.input');
            })
        }

        this.sys.waitEventManager.waitAny(config);
        return this.sys;
    },

    click(config, manager) {
        return this.wait({ click: true }, manager);
    }
}