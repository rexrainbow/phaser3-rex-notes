class Tick {

    constructor() {
        // set by BehaviorTree

        this.tree = null;

        this.debug = null;

        this.target = null;

        this.blackboard = null;

        // updated during the tick signal

        this._openNodes = [];

        this._nodeCount = 0;
    }

    _enterNode(node) {
        this._nodeCount++;
        this._openNodes.push(node);

        // TODO: call debug here
    }

    _openNode(node) {
        // TODO: call debug here
    }

    _tickNode(node) {
        // TODO: call debug here
    }

    _closeNode(node) {
        // TODO: call debug here
        this._openNodes.pop();
    }

    _exitNode(node) {
        // TODO: call debug here
    }
};

export default Tick;
