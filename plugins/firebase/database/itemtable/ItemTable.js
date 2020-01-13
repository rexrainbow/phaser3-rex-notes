import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import Merge from '../../../utils/object/Merge.js';
import SetValue from './SetValue.js';
import IncValue from './IncValue.js';
import ColumnUpdater from './updaters/ColumnUpdater.js';
import RowUpdater from './updaters/RowUpdater.js';
import Pagepdater from './updaters/PageUpdater.js';

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

    setTableType(type) {
        if (typeof (type) === 'string') {
            type = TABLE_TYPE[type];
        }
        this.tableType = type;
        var UpdaterClass = UpdaterClasses[type];
        this.updater = new UpdaterClass({
            parent: this,
            key: '',
            type: type,
            eventEmitter: this.getEventEmitter()
        })
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

    startUpdate() {
        this.updater.startUpdate();
        return this;
    }

    stopUpdate() {
        this.updater.stopUpdate();
        return this;
    }

    getData(key0, key1, key2) {
        return this.updater.getData(key0, key1, key2);
    }
}

const DefaultEventNames = {
    addkey0: 'addkey0',
    removekey0: 'removekey0',
    changekey0: 'changekey0',
    addkey1: 'addkey1',
    removekey1: 'removekey1',
    changekey1: 'changekey1',
    addkey2: 'addkey2',
    removekey2: 'removekey2',
    changekey2: 'changekey2',
}

var UpdaterClasses = {
    1: ColumnUpdater,
    2: RowUpdater,
    3: Pagepdater
};

var methods = {
    setValue: SetValue,
    incValue: IncValue,
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