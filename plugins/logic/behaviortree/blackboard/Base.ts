import DeepClone from '../../../utils/object/DeepClone';
import SetValue from '../../../utils/object/SetValue';
import GetValue from '../../../utils/object/GetValue';
import HasValue from '../../../utils/object/HasValue';
import RemoveKey from '../../../utils/object/RemoveKey';

class Blackboard {
    _baseMemory: any;
    _treeMemory: any;


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

    _getTreeMemory(treeID?: any) {
        if (!this._treeMemory[treeID]) {
            this._treeMemory[treeID] = {
                'nodeMemory': {},
            };
        }
        return this._treeMemory[treeID];
    }

    _getNodeMemory(treeMemory?: any, nodeID?: any) {
        var memory = treeMemory.nodeMemory;
        if (!memory[nodeID]) {
            memory[nodeID] = {};
        }

        return memory[nodeID];
    }

    _getMemory(treeID?: any, nodeID?: any) {
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

    set(key?: any, value?: any, treeID?: any, nodeID?: any) {
        var memory = this._getMemory(treeID, nodeID);
        SetValue(memory, key, value);
        return this;
    }

    setData(key?: any, value?: any, treeID?: any, nodeID?: any) {
        return this.set(key, value, treeID, nodeID);
    }

    get(key?: any, treeID?: any, nodeID?: any) {
        var memory = this._getMemory(treeID, nodeID);
        return GetValue(memory, key);
    }

    getData(key?: any, treeID?: any, nodeID?: any) {
        return this.get(key, treeID, nodeID);
    }

    has(key?: any, treeID?: any, nodeID?: any) {
        var memory;
        if (treeID !== undefined) {
            memory = this._treeMemory[treeID];
            if (memory && (nodeID !== undefined)) {
                memory = treeMemory.nodeMemory[nodeID];
            }
        } else {
            memory = this._baseMemory;
        }

        if (memory?: any) {
            return HasValue(memory, key);
        } else {
            return false;
        }
    }

    hasData(key?: any, treeID?: any, nodeID?: any) {
        return this.has(key, treeID, nodeID);
    }

    inc(key?: any, inc?: any, treeID?: any, nodeID?: any, startValue?: any) {
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

    incData(key?: any, inc?: any, treeID?: any, nodeID?: any, startValue?: any) {
        return this.inc(key, inc, treeID, nodeID, startValue);
    }

    toggle(key?: any, treeID?: any, nodeID?: any, startValue?: any) {
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

    toggleData(key?: any, treeID?: any, nodeID?: any, startValue?: any) {
        return this.toggle(key, treeID, nodeID, startValue);
    }

    removeData(key?: any, treeID?: any, nodeID?: any) {
        var memory = this._getMemory(treeID, nodeID);
        RemoveKey(memory, key);
    }

    removeTree(treeID?: any) {
        if (this._treeMemory[treeID]) {
            delete this._treeMemory[treeID];
        }
        return this;
    }

    removeTreeData(treeID?: any) {
        return this.removeTree(treeID);
    }

    removeNode(treeID?: any, nodeID?: any) {
        var treeMemory = this._treeMemory[treeID];

        if (treeMemory && treeMemory.nodeMemory[nodeID]) {
            delete treeMemory.nodeMemory[nodeID];
        }
        return this;
    }

    removeNodeData(treeID?: any, nodeID?: any) {
        return this.removeNode(treeID, nodeID);
    }

    getGlobalMemory() {
        return this._baseMemory;
    }

    getTreeMemory(treeID?: any) {
        return this._getTreeMemory(treeID);
    }

    getNodeMemory(treeID?: any, nodeID?: any) {
        return this._getNodeMemory(this._getTreeMemory(treeID), nodeID);
    }

    dump() {
        return {
            base: DeepClone(this._baseMemory),
            tree: DeepClone(this._treeMemory),
        }
    }

    load(data?: any) {
        this._baseMemory = DeepClone(data.base);
        this._treeMemory = DeepClone(data.tree);
        return this;
    }
};

export default Blackboard;