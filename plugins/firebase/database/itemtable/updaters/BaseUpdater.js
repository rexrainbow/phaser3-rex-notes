import EventEmitterMethods from '../../../../utils/eventemitter/EventEmitterMethods.js';

class BaseUpdater {
    constructor(config) {
        // Event emitter
        this.setEventEmitter(config.eventEmitter, config.EventEmitterClass);

        this.parent = config.parent;
        this.key = config.key;
        this.type = config.type;
        this.eventNames = this.parent.eventNames;

        this.database = firebase.database();
        this.setRootPath(`${this.parent.rootPath}/${this.key}`);
        this.data = {};
        this.setData(config.data);
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

    setData(key, value) {
        if (key === undefined) {
            // Clear
            for (var key in this.data) {
                this.removeChild(key);
            }
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
            this.data[key] = new this.childClass({
                parent: this,
                key: key,
                type: this.type,
                eventEmitter: this.getEventEmitter(),
                value: data
            });
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