import SetValue from '../object/SetValue.js';
import Clear from '../object/Clear.js';

class Table {
    constructor() {
        this.data = {};
    }

    setValue(keys, value) {
        if (keys === undefined) {
            this.clear(); // No argument
        } else if (value === undefined) {
            this.data = keys; // JSON keys
        } else {
            SetValue(this.data, keys, value);
        }
        return this;
    }

    getValue(keys) {
        if (keys === undefined) {
            return this.data;
        } else {
            var entry = this.data;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                if ((entry == null) || (typeof (entry) !== 'object')) {
                    return undefined;
                }
                entry = entry[keys[i]];
            }
            return entry;
        }
    }

    removeKey(keys) {
        if (keys === undefined) {
            this.clear();
        } else {
            var lastKey = keys.pop();
            var entry = this.data;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                if ((entry == null) || (typeof (entry) !== 'object')) {
                    // Stop here
                    return this;
                }
                entry = entry[keys[i]];
            }
            delete entry[lastKey];
        }

        return this;
    }

    clear() {
        Clear(this.data);
        return this;
    }
}

export default Table;