import Parse from 'parse';
import EE from '../../utils/eventemitter/EventEmitter.js';
import GetValue from '../../utils/object/GetValue.js';
import Loader from '../utils/Loader.js';
import Save from './Save.js';

class ItemTable extends EE {
    constructor(config) {
        super();

        this.setClassName(GetValue(config, 'className', 'Item'));
        this.primaryKeys = {};
        var primaryKeys = GetValue(config, 'primaryKeys', undefined);
        if (primaryKeys) {
            this.addPrimaryKey(primaryKeys);
        }

        this.loader = new Loader({
            eventEmitter: this,
            lines: GetValue(config, 'lines', 10)
        });
    }

    setClassName(className) {
        this.customClass = Parse.Object.extend(className);
        return this;
    }

    addPrimaryKey(key) {
        if (typeof (key) === 'string') {
            this.primaryKeys[key] = true;
            return this;
        }

        var keys = key;
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            this.addPrimaryKey(keys[i]);
        }
        return this;
    }

    createItem() {
        return new this.customClass();
    }

    createQuery() {
        return new Parse.Query(this.customClass);
    }
}

var methods = {
    save: Save,
}
Object.assign(
    ItemTable.prototype,
    methods
);

export default ItemTable;