class Blackboard {

    constructor() {
        this._baseMemory = {};
        this._treeMemory = {};

        // Global memory : this._baseMemory
        // Tree memory : this._treeMemory[treeID]
        // Node memory : this._treeMemory[treeID].nodeMemory[nodeID]
    }

    _getTreeMemory(treeID) {
        if (!this._treeMemory[treeID]) {
            this._treeMemory[treeID] = {
                'nodeMemory': {},
                'openNodes': [],
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
        memory[key] = value;
        return this;
    }

    get(key, treeID, nodeID) {
        var memory = this._getMemory(treeID, nodeID);
        return memory[key];
    }

    has(key, treeID, nodeID) {
        var memory;
        if (treeID !== undefined) {
            memory = this._treeMemory[treeID];
            if (memory && (nodeID !== undefined)) {
                memory = treeMemory.nodeMemory[nodeID]
            }
        } else {
            memory = this._baseMemory;
        }

        if (memory) {
            return memory.hasOwnProperty(key);
        } else {
            return false;
        }
    }

    inc(key, inc, treeID, nodeID) {
        var value;
        if (this.has(key, treeID, nodeID)) {
            value = 0;
        } else {
            value = this.get(key, treeID, nodeID);
        }
        value += inc;
        this.set(key, value, treeID, nodeID);
        return this;
    }

    toggle(key, treeID, nodeID) {
        var value;
        if (this.has(key, treeID, nodeID)) {
            value = false;
        } else {
            value = this.get(key, treeID, nodeID);
        }
        value = !value;
        this.set(key, value, treeID, nodeID);
        return this;
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
};

export default Blackboard;