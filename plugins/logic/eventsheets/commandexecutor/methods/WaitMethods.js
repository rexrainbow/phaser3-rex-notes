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

    wait(config, eventSheetManager, eventsheet) {
        var { click, key } = config;

        if (click) {
            eventSheetManager.emit('pause.click');
        }

        if (key) {
            eventSheetManager.emit('pause.key', config.key);
        }

        if (click | key) {
            eventSheetManager.emit('pause.input');
            this.sys.once('complete', function () {
                eventSheetManager.emit('resume.input');
            })
        }

        this.sys.waitEventManager.waitAny(config);
        return this.sys;
    },

    click(config, eventSheetManager, eventsheet) {
        return this.wait({ click: true }, eventSheetManager);
    }
}