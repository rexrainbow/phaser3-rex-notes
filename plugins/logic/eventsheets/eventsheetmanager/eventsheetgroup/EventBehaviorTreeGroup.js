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
        // One group owns one running context at a time. The context is shared by
        // start(), startTree(), continue(), pause/resume, and scoped data injection.
        this.runContext = null;
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
