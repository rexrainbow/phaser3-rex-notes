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
        if (arguments.length > 1) {
            keys = arguments;
        }
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

    clone() {
        return DeepClone(this.data);
    }
}

export default Tree;