import Methods from './Methods.js';

class EventBehaviorTreeGroup {
    constructor(parent, {
        name = ''
    } = {}) {
        this.parent = parent;
        this.name = name;

        this.trees = [];
        this.pendingTrees = [];
        this.closedTrees = [];  // Temporary eventsheet array

        this.isRunning = false;
        this._threadKey = null;
    }
}

Object.assign(
    EventBehaviorTreeGroup.prototype,
    Methods,
)

export default EventBehaviorTreeGroup;