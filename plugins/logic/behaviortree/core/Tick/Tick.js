import RemoveItem from "../../../../utils/array/Remove.js";

class Tick {

    constructor() {
        // set by BehaviorTree

        this.tree = null;
    
        this.blackboard = null;

        this.target = null;

        // updated during the tick signal

        this._openNodes = [];  // Open nodes of current tick

        this._nodeCount = 0;

        this._currentNode = null;
    }

    setTree(tree) {
        this.tree = tree;
        return this;
    }

    setBlackBoard(blackboard) {
        this.blackboard = blackboard;
        return this;
    }

    setTarget(target) {
        this.target = target;
        return this;
    }

    reset() {
        this._openNodes.length = 0;
        this._nodeCount = 0;
        return this;
    }

    _enterNode(node) {
        this._nodeCount++;
        this._openNodes.push(node);
        this._currentNode = node;
    }

    _openNode(node) {
    }

    _tickNode(node) {
    }

    _closeNode(node) {
        RemoveItem(this._openNodes, node);
    }

    _exitNode(node) {
        this._currentNode = null;
    }
};

export default Tick;
