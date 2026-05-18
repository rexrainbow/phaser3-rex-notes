import Methods from './Methods';

class EventBehaviorTreeGroup {
    name: any;

    _threadKey: any;
    closedTrees: any;
    isRunning: any;
    parent: any;
    pendingTrees: any;
    stop: any;
    trees: any;

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

    destroy() {
        this.stop();

        this.pendingTrees.length = 0;
        this.closedTrees.length = 0;
        this.isRunning = false;

        for (var i = 0, cnt = this.trees.length; i < cnt; i++) {
            this.trees[i].destroy();
        }
    }
}

Object.assign(
    EventBehaviorTreeGroup.prototype,
    Methods,
)

export default EventBehaviorTreeGroup;