class Blackboard {

    constructor() {
        this._baseMemory = {};
        this._treeMemory = {};
    }

    _getTreeMemory(treeScope) {
        if (!this._treeMemory[treeScope]) {
            this._treeMemory[treeScope] = {
                'nodeMemory': {},
                'openNodes': [],
                'traversalDepth': 0,  // TODO
                'traversalCycle': 0,  // TODO
            };
        }
        return this._treeMemory[treeScope];
    }

    _getNodeMemory(treeMemory, nodeScope) {
        var memory = treeMemory.nodeMemory;
        if (!memory[nodeScope]) {
            memory[nodeScope] = {};
        }

        return memory[nodeScope];
    }

    _getMemory(treeScope, nodeScope) {
        var memory = this._baseMemory;

        if (treeScope) {
            memory = this._getTreeMemory(treeScope);

            if (nodeScope) {
                memory = this._getNodeMemory(memory, nodeScope);
            }
        }

        return memory;
    }

    set(key, value, treeScope, nodeScope) {
        var memory = this._getMemory(treeScope, nodeScope);
        memory[key] = value;
    }

    get(key, treeScope, nodeScope) {
        var memory = this._getMemory(treeScope, nodeScope);
        return memory[key];
    }
};

export default Blackboard;