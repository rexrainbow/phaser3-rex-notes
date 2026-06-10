import {
    EVT_PAUSE_CLICK,
    EVT_PAUSE_KEY,
    EVT_PAUSE_INPUT,
    EVT_RESUME_INPUT,
} from '../../eventsheetmanager/constants.js';

export default {

    wait(config, eventSheetManager, eventsheet) {
        var { click, key, event } = config;

        if (click) {
            eventSheetManager.emit(EVT_PAUSE_CLICK);
        }

        if (key) {
            eventSheetManager.emit(EVT_PAUSE_KEY, config.key);
        }

        if (click | key) {
            eventSheetManager.emit(EVT_PAUSE_INPUT);
            this.sys.once('complete', function () {
                eventSheetManager.emit(EVT_RESUME_INPUT);
            })
        }

        if (event) {
            this.sys.waitEventManager.waitEvent(eventSheetManager, event);
        }

        this.sys.waitEventManager.waitAny(config);
        eventSheetManager.pauseEventSheetUnitlEvent(this.sys, 'complete');
        return this;
    },

    click(config, eventSheetManager, eventsheet) {
        this.wait({ click: true }, eventSheetManager);
        return this;
    },

    // Internal method
    bindEventSheetManager(eventSheetManager) {
        this.__eventSheetManager = eventSheetManager;
    },

    unBindEventSheetManager() {
        this.__eventSheetManager = undefined;
    },

    _waitComplete() {
        this.__eventSheetManager.pauseEventSheetUnitlEvent(this.sys, 'complete');
    },

    waitEvent(eventEmitter, eventName) {
        this.sys.waitEventManager.waitEvent(eventEmitter, eventName);
        this._waitComplete();
        return this;
    },

}
