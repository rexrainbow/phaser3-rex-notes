import { RUNNING, PENDING, SUCCESS, FAILURE, ERROR } from '../../../behaviortree';
import RemoveItem from '../../../../utils/array/Remove.js';

export default {
    tick() {
        var trees = this.trees;
        var pendingTrees = this.pendingTrees;
        var blackboard = this.blackboard;
        var taskHandlers = this.taskHandlers;

        pendingTrees.length = 0;
        // Run parallel node, will return pending, or failure
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];

            if (tree.properties.parallel) {
                var status = tree.tick(blackboard, taskHandlers);
                if (status === PENDING) {
                    pendingTrees.push(tree);
                }
            } else {
                pendingTrees.push(tree);
            }
        }

        this.continue();

        return this;
    },

    continue() {
        var trees = this.pendingTrees;
        var closedTrees = this.closedTrees;
        var blackboard = this.blackboard;
        var taskHandlers = this.taskHandlers;

        closedTrees.length = 0;
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];
            var status = tree.tick(blackboard, taskHandlers);
            var status = blackboard.getTreeState(tree.id);
            if (status === RUNNING) {
                break;
            } else {
                closedTrees.push(tree);
            }
        }

        if (closedTrees.length > 0) {
            RemoveItem(trees, closedTrees);
        }

        if (trees.length === 0) {
            this.emit('complete', this);
        }

        return this;
    }
}