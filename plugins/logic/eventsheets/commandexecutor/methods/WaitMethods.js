export default {
    // Internal method
    bindEventSheetManager(eventSheetManager) {
        this.__eventSheetManager = eventSheetManager;
    },

    unBindEventSheetManager() {
        this.__eventSheetManager = undefined;
    },

    _waitComplete() {
        this.__eventSheetManager.pauseEventSheetUnitlEvent(this.sys);
    },

    waitEvent(eventEmitter, eventName) {
        this.sys.waitEventManager.waitEvent(eventEmitter, eventName);
        this._waitComplete();
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
        eventSheetManager.pauseEventSheetUnitlEvent(this.sys);
        return this;
    },

    click(config, eventSheetManager, eventsheet) {
        this.wait({ click: true }, eventSheetManager);
        return this;
    }
}