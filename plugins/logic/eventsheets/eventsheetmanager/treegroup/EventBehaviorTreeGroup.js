import TreeMethods from './TreeMethods.js';
import StateMethods from './StateMethods.js';
import RunMethods from './RunMethods.js';

class EventBehaviorTreeGroup {
    constructor(parent) {
        this.parent = parent;

        this.trees = [];
        this.pendingTrees = [];
        this.closedTrees = [];  // Temporary tree array

        this.isRunning = false;
        this._threadKey = null;
    }
}

Object.assign(
    EventBehaviorTreeGroup.prototype,
    TreeMethods,
    StateMethods,
    RunMethods,
)

export default EventBehaviorTreeGroup;