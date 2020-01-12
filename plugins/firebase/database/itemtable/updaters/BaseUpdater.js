import EventEmitterMethods from '../../../../utils/eventemitter/EventEmitterMethods.js';

class BaseUpdater {
    constructor(config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);
        this.eventNames = Merge(GetValue(config, 'eventNames', {}), DefaultEventNames);

        this.database = firebase.database();
        this.setRootPath(GetValue(config, 'root', ''));
        this.setValue(GetValue(config, 'value', undefined));
        this.startUpdate();
    }

    shutdown() {
        this
            .destroyEventEmitter()
            .stopUpdate();
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        return this;
    }

    get rootRef() {
        return this.database.ref(this.rootPath);
    }

    // Overwrite
    setValue(key, value) { }

    // Overwrite
    startUpdate() { }

    // Overwrite
    stopUpdate() { }

}

var methods = {
}
Object.assign(
    BaseUpdater.prototype,
    EventEmitterMethods,
    methods
);

export default BaseUpdater;