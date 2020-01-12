import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import SetValue from './SetValue.js';

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

    getRef(page, row, col) {
        var ref = this.getRootRef();
        ref = (page) ? ref.child(page) : ref;
        ref = (row) ? ref.child(row) : ref;
        ref = (col) ? ref.child(col) : ref;
        return ref;
    }
}

var methods = {
    setValue: SetValue
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