import DeepClone from '../../../utils/object/DeepClone.js';
import SetValue from '../../../utils/object/SetValue.js';
import GetValue from '../../../utils/object/GetValue.js';
import HasValue from '../../../utils/object/HasValue.js';
import RemoveKey from '../../../utils/object/RemoveKey.js';

class Blackboard {

    constructor() {
        this._baseMemory = {};
        this._treeMemory = {};

        // Global memory : this._baseMemory
        // Tree memory : this._treeMemory[treeID]
        // Node memory : this._treeMemory[treeID].nodeMemory[nodeID]
    }

    destroy() {
        this._baseMemory = undefined;
        this._treeMemory = undefined;
    }

    _getTreeMemory(treeID) {
        if (!this._treeMemory[treeID]) {
            this._treeMemory[treeID] = {
                'nodeMemory': {},
            };
        }
        return this._treeMemory[treeID];
    }

    _getNodeMemory(treeMemory, nodeID) {
        var memory = treeMemory.nodeMemory;
        if (!memory[nodeID]) {
            memory[nodeID] = {};
        }

        return memory[nodeID];
    }

    _getMemory(treeID, nodeID) {
        var memory;

        if (treeID !== undefined) {
            memory = this._getTreeMemory(treeID);

            if (nodeID !== undefined) {
                memory = this._getNodeMemory(memory, nodeID);
            }
        } else {
            memory = this._baseMemory;
        }

        return memory;
    }

    set(key, value, treeID, nodeID) {
        var memory = this._getMemory(treeID, nodeID);
        SetValue(memory, key, value);
        return this;
    }

    setData(key, value, treeID, nodeID) {
        return this.set(key, value, treeID, nodeID);
    }

    get(key, treeID, nodeID) {
        var memory = this._getMemory(treeID, nodeID);
        return GetValue(memory, key);
    }

    getData(key, treeID, nodeID) {
        return this.get(key, treeID, nodeID);
    }

    has(key, treeID, nodeID) {
        var memory;
        if (treeID !== undefined) {
            memory = this._treeMemory[treeID];
            if (memory && (nodeID !== undefined)) {
                memory = treeMemory.nodeMemory[nodeID];
            }
        } else {
            memory = this._baseMemory;
        }

        if (memory) {
            return HasValue(memory, key);
        } else {
            return false;
        }
    }

    hasData(key, treeID, nodeID) {
        return this.has(key, treeID, nodeID);
    }

    inc(key, inc, treeID, nodeID, startValue) {
        var newValue;
        if (!this.has(key, treeID, nodeID)) {
            if (startValue === undefined) {
                startValue = 0;
            }
            newValue = startValue;
        } else {
            newValue = this.get(key, treeID, nodeID) + inc;
        }
        this.set(key, newValue, treeID, nodeID);
        return this;
    }

    incData(key, inc, treeID, nodeID, startValue) {
        return this.inc(key, inc, treeID, nodeID, startValue);
    }

    toggle(key, treeID, nodeID, startValue) {
        var newValue;
        if (!this.has(key, treeID, nodeID)) {
            if (startValue === undefined) {
                startValue = false;
            }
            newValue = startValue;
        } else {
            newValue = !this.get(key, treeID, nodeID);
        }
        this.set(key, newValue, treeID, nodeID);
        return this;
    }

    toggleData(key, treeID, nodeID, startValue) {
        return this.toggle(key, treeID, nodeID, startValue);
    }

    removeData(key, treeID, nodeID) {
        var memory = this._getMemory(treeID, nodeID);
        RemoveKey(memory, key);
    }

    removeTree(treeID) {
        if (this._treeMemory[treeID]) {
            delete this._treeMemory[treeID];
        }
        return this;
    }

    removeTreeData(treeID) {
        return this.removeTree(treeID);
    }

    removeNode(treeID, nodeID) {
        var treeMemory = this._treeMemory[treeID];

        if (treeMemory && treeMemory.nodeMemory[nodeID]) {
            delete treeMemory.nodeMemory[nodeID];
        }
        return this;
    }

    removeNodeData(treeID, nodeID) {
        return this.removeNode(treeID, nodeID);
    }

    getGlobalMemory() {
        return this._baseMemory;
    }

    getTreeMemory(treeID) {
        return this._getTreeMemory(treeID);
    }

    getNodeMemory(treeID, nodeID) {
        return this._getNodeMemory(this._getTreeMemory(treeID), nodeID);
    }

    dump() {
        return {
            base: DeepClone(this._baseMemory),
            tree: DeepClone(this._treeMemory),
        }
    }

    load(data) {
        this._baseMemory = DeepClone(data.base);
        this._treeMemory = DeepClone(data.tree);
        return this;
    }
};

export default Blackboard;