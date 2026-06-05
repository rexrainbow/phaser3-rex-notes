import DeepClone from '../../../utils/object/DeepClone.js';
import SetValue from '../../../utils/object/SetValue.js';
import GetValue from '../../../utils/object/GetValue.js';
import HasValue from '../../../utils/object/HasValue.js';
import RemoveKey from '../../../utils/object/RemoveKey.js';
import IsPlainObject from '../../../utils/object/IsPlainObject.js';


class Blackboard {

    constructor(config) {
        var {
            globalMemory = {}
        } = config;

        // For global variables or application variables
        this.setGlobalMemory(globalMemory);

        this._treeMemory = {};

        // Global memory : this._globalMemory
        // Tree memory : this._treeMemory[treeID]
        // Node memory : this._treeMemory[treeID].nodeMemory[nodeID]
    }

    destroy() {
        if (this.isCustomGlobalMemory(this._globalMemory) && this._globalMemory.destroy) {
            this._globalMemory.destroy()
        }

        this._globalMemory = undefined;
        this._treeMemory = undefined;
    }

    setGlobalMemory(memory) {
        this._globalMemory = memory;
        this.isPlainGlobalMemory = IsPlainObject(memory);
        return this;
    }

    isCustomGlobalMemory(memory) {
        return (memory === this._globalMemory) && (!this.isPlainGlobalMemory)
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
            memory = this._globalMemory;
        }

        return memory;
    }

    set(key, value, treeID, nodeID) {
        var memory = this._getMemory(treeID, nodeID);

        if (this.isCustomGlobalMemory(memory) && memory.set) {
            memory.set(key, value);
        } else {
            SetValue(memory, key, value);
        }
        return this;
    }

    setData(key, value, treeID, nodeID) {
        return this.set(key, value, treeID, nodeID);
    }

    get(key, treeID, nodeID) {
        var memory = this._getMemory(treeID, nodeID);

        if (this.isCustomGlobalMemory(memory) && memory.get) {
            return memory.get(key);
        } else {
            return GetValue(memory, key);
        }

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
            memory = this._globalMemory;
        }

        if (memory) {
            if (this.isCustomGlobalMemory(memory) && memory.has) {
                return memory.has(key);
            } else {
                return HasValue(memory, key);
            }

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

        if (this.isCustomGlobalMemory(memory) && memory.remove) {
            memory.remove(key);
        } else {
            RemoveKey(memory, key);
        }

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

    getEvalContext() {
        if (this.isCustomGlobalMemory(this._globalMemory) && this._globalMemory.getEvalContext) {
            return this._globalMemory.getEvalContext();
        } else {
            return this._globalMemory;
        }
    }

    getGlobalMemory() {
        return this._globalMemory;
    }

    getTreeMemory(treeID) {
        return this._getTreeMemory(treeID);
    }

    getNodeMemory(treeID, nodeID) {
        return this._getNodeMemory(this._getTreeMemory(treeID), nodeID);
    }

    dump() {
        var globalData;
        if (this.isCustomGlobalMemory(this._globalMemory) && this._globalMemory.dump) {
            globalData = this._globalMemory.dump();
        } else {
            globalData = DeepClone(this._globalMemory);
        }

        var treeData = DeepClone(this._treeMemory)
        return {
            global: globalData,
            tree: treeData,
        }
    }

    load(data) {
        if (this.isCustomGlobalMemory(this._globalMemory) && this._globalMemory.load) {
            this._globalMemory.load(data.global);
        } else {
            this._globalMemory = DeepClone(data.global);
        }

        this._treeMemory = DeepClone(data.tree);
        return this;
    }
};

export default Blackboard;