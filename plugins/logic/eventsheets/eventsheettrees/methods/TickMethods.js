import { RUNNING, PENDING } from '../../../behaviortree';

export default {
    tick() {
        var trees = this.trees;
        var blackboard = this.blackboard;
        var taskHandlers = this.taskHandlers;
        var hasPenddingTree = false;
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];
            var state = tree.tick(blackboard, taskHandlers);
            hasPenddingTree |= (state === PENDING);
        }

        if (hasPenddingTree) {
            this.continue();
        }

        return this;
    },

    continue() {
        var trees = this.trees;
        var blackboard = this.blackboard;
        var taskHandlers = this.taskHandlers;
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];
            var state = blackboard.getTreeState(tree.id);
            if ((state === PENDING) || (state === RUNNING)) {
                tree.tick(blackboard, taskHandlers);
            }
        }
        return this;
    }
}