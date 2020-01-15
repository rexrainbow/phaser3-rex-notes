import SetValue from '../object/SetValue.js';
import Clear from '../object/Clear.js';
import DeepClone from '../object/DeepClone.js';

class Tree {
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
            if (typeof (keys) === 'string') {
                keys = keys.split('.');
            }

            var entry = this.data;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                if (!IsObject(entry)) {
                    return undefined;
                }
                entry = entry[keys[i]];
            }
            return entry;
        }
    }

    cloneValue(keys) {
        return DeepClone(this.getValue(keys));
    }

    removeKey(keys) {
        if (keys === undefined) {
            this.clear();
        } else {
            if (typeof (keys) === 'string') {
                keys = keys.split('.');
            }

            var lastKey = keys.pop();
            var entry = this.data;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                if (!IsObject(entry)) {
                    // Stop here
                    return this;
                }
                entry = entry[keys[i]];
            }

            if (IsObject(entry)) {
                delete entry[lastKey];
            }
        }

        return this;
    }

    clear() {
        Clear(this.data);
        return this;
    }
}

var IsObject = function (obj) {
    return (obj != null) && (typeof (obj) === 'object')
}

export default Tree;