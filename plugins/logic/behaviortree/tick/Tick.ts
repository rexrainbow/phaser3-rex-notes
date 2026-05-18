import RemoveItem from "../../../utils/array/Remove";

class Tick {
    _currentNode: any;
    _currentTime: any;
    _nodeCount: any;
    _openNodes: any;
    blackboard: any;
    target: any;
    tree: any;


    constructor() {
        // set by BehaviorTree

        this.tree = null;

        this.blackboard = null;

        this.target = null;

        // updated during the tick signal

        this._openNodes = [];  // Open nodes of current tick

        this._nodeCount = 0;

        this._currentNode = null;

        this._currentTime = undefined;
    }

    destroy() {
        this.tree = null;
        this.blackboard = null;
        this.target = null;
        this._openNodes.length = 0;
    }

    // Set members
    setTree(tree?: any) {
        this.tree = tree;
        return this;
    }

    setBlackBoard(blackboard?: any) {
        this.blackboard = blackboard;
        return this;
    }

    setTarget(target?: any) {
        this.target = target;
        return this;
    }

    reset() {
        this._openNodes.length = 0;
        this._nodeCount = 0;
        this._currentTime = undefined;
        return this;
    }

    getGlobalMemory() {
        return this.blackboard.getGlobalMemory();
    }

    getTreeMemory() {
        return this.blackboard.getTreeMemory(this.tree.id);
    }

    getNodeMemory(nodeID?: any) {
        return this.blackboard.getNodeMemory(this.tree.id, nodeID);
    }

    get currentTime() {
        if (this.blackboard.hasValidCurrentTime()) {
            // Inject current-time through blackboard
            return this.blackboard.getCurrentTime();
        } else {
            if (this._currentTime === undefined) {
                this._currentTime = (new Date()).getTime();
            }
            return this._currentTime;
        }
    }

    evalExpression(expression?: any) {
        return expression.eval(this.blackboard.getGlobalMemory());
    }

    _enterNode(node?: any) {
        this._nodeCount++;
        this._openNodes.push(node);
        this._currentNode = node;
    }

    _openNode(node?: any) {
        this._currentNode = node;
    }

    _tickNode(node?: any) {
        this._currentNode = node;
    }

    _closeNode(node?: any) {
        RemoveItem(this._openNodes, node);
        this._currentNode = node;
    }

    _exitNode(node?: any) {
        this._currentNode = node;
    }
};

export default Tick;