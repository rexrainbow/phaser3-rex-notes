export default {

    wait(config?: any, eventSheetManager?: any, eventsheet?: any) {
        var { click, key, event } = config;

        if (click?: any) {
            eventSheetManager.emit('pause.click');
        }

        if (key?: any) {
            eventSheetManager.emit('pause.key', config.key);
        }

        if (click | key) {
            eventSheetManager.emit('pause.input');
            this.sys.once('complete', function() {
                eventSheetManager.emit('resume.input');
            })
        }

        if (event?: any) {
            this.sys.waitEventManager.waitEvent(eventSheetManager, event);
        }

        this.sys.waitEventManager.waitAny(config);
        eventSheetManager.pauseEventSheetUnitlEvent(this.sys, 'complete');
        return this;
    },

    click(config?: any, eventSheetManager?: any, eventsheet?: any) {
        this.wait({ click: true }, eventSheetManager);
        return this;
    },

    // Internal method
    bindEventSheetManager(eventSheetManager?: any) {
        this.__eventSheetManager = eventSheetManager;
    },

    unBindEventSheetManager() {
        this.__eventSheetManager = undefined;
    },

    _waitComplete() {
        this.__eventSheetManager.pauseEventSheetUnitlEvent(this.sys, 'complete');
    },

    waitEvent(eventEmitter?: any, eventName?: any) {
        this.sys.waitEventManager.waitEvent(eventEmitter, eventName);
        this._waitComplete();
        return this;
    },

}