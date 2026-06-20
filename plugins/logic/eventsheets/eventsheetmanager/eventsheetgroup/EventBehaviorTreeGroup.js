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
        if (this.isRunning) {
            this.stop();
        } else {
            this.clearRunContext();
        }

        var blackboard = this.parent.blackboard;

        for (var i = 0, cnt = this.trees.length; i < cnt; i++) {
            var tree = this.trees[i];

            blackboard.removeTreeData(tree.id);
            tree.destroy();
        }

        this.trees.length = 0;
        this.pendingTrees.length = 0;
        this.closedTrees.length = 0;
        this.isRunning = false;
    }
}

Object.assign(
    EventBehaviorTreeGroup.prototype,
    Methods,
)

export default EventBehaviorTreeGroup;
