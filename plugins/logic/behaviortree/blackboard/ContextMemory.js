import DeepClone from '../../../utils/object/DeepClone.js';
import SetValue from '../../../utils/object/SetValue.js';
import GetValue from '../../../utils/object/GetValue.js';
import HasValue from '../../../utils/object/HasValue.js';
import RemoveKey from '../../../utils/object/RemoveKey.js';

class ContextMemory {
    constructor() {
        this.memory = {};
    }

    dump() {
        return DeepClone(this.memory );
    }
    load(data) {
        this.memory = DeepClone(data);
        return this;
    }

    get(path) {
        return GetValue(this.memory, path);
    }
    set(path, value) {
        SetValue(this.memory, path, value);
        return this;
    }
    has(path) {
        return HasValue(this.memory, path);
    }
    remove(path) {
        RemoveKey(this.memory, path);
        return this;
    }

}

export default ContextMemory;