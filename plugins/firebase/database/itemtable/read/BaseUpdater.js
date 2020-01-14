import EventEmitterMethods from '../../../../utils/eventemitter/EventEmitterMethods.js';

class BaseUpdater {
    constructor(config) {
        // Event emitter
        this.setEventEmitter(config.eventEmitter, config.EventEmitterClass);

        this.parent = config.parent;
        this.key = config.key;
        this.type = config.type;
        this.eventNames = config.eventNames;

        this.database = firebase.database();
        this.setRootPath();
        this.data = {};
        this.setData(config.data);
    }

    shutdown() {
        this
            .stopUpdate()
            .clear()
            .destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath) {
        if (rootPath === undefined) {
            rootPath = `${this.parent.rootPath}/${this.key}`;
        }
        this.rootPath = rootPath;

        var child;
        for (var key in this.data) {
            child = this.data[key];
            if (child instanceof BaseUpdater) {
                child.setRootPath();
            }
        }
        return this;
    }

    get rootRef() {
        return this.database.ref(this.rootPath);
    }

    setData(key, value) {
        if (key === undefined) {
            this.clear(); // Clear
        } else if (value === undefined) {
            var data = key; // JSON data
            for (key in this.data) { // Not in new data
                if (!data.hasOwnProperty(key)) {
                    this.removeChild(key);
                }
            }
            for (key in data) {
                this.setChildData(key, data[key]);
            }
        } else {
            this.setChildData(key, value); // Pass data to column-updater
        }
        return this;
    }

    clear() {
        for (var key in this.data) {
            this.removeChild(key);
        }
        return this;
    }

    // Overwrite
    getData(key0, key1, key2) {
        if (key0 === undefined) {
            var data = {};
            for (var key in this.data) {
                data[key] = this.data[key].getData();
            }
            return data;
        } else {
            return this.data[key0].getData(key1, key2);
        }
    }

    // Overwrite
    get childClass() {
        return undefined;
    }

    // Overwrite
    setChildData(key, data) {
        if (!this.data.hasOwnProperty(key)) {
            var child = new this.childClass({
                parent: this,
                key: key,
                type: this.type,
                eventEmitter: this.getEventEmitter(),
                eventNames: this.eventNames,
                value: data
            });
            child.startUpdate();
            this.data[key] = child;
        } else {
            this.data[key].setData(data);
        }
        return this;
    }

    // Overwrite
    removeChild(key) {
        if (this.data.hasOwnProperty(key)) {
            this.data[key].destroy();
            delete this.data[key];
        }
        return this;
    }

    // Overwrite
    startUpdate() { }

    // Overwrite
    stopUpdate() { }
}

Object.assign(
    BaseUpdater.prototype,
    EventEmitterMethods
);

export default BaseUpdater;