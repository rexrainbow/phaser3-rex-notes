import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import Save from './Save.js';

class ItemTable {
    constructor(config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);
        this.eventNames = Merge(GetValue(config, 'eventNames', {}), DefaultEventNames);

        this.database = firebase.database();
        this.setRootPath(GetValue(config, 'root', ''));
        this.setTableType(GetValue(config, 'type', 3));
    }

    shutdown() {
        this.destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        return this;
    }

    setTableType(type) {
        if (typeof (type) === 'string') {
            type = TABLE_TYPE[type];
        }
        this.tableType = type;
        return this;
    }

    getRootRef() {
        return this.database.ref(this.rootPath)
    }

    getRef(key0, key1, key2) {
        var ref = this.getRootRef();
        ref = (key0) ? ref.child(key0) : ref;
        ref = (key1) ? ref.child(key1) : ref;
        ref = (key2) ? ref.child(key2) : ref;
        return ref;
    }
}

var methods = {
    save: Save
}
Object.assign(
    ItemTable.prototype,
    EventEmitterMethods,
    methods
);

const TABLE_TYPE = {
    '1d': 1,
    '2d': 2,
    '3d': 3
}

export default ItemTable