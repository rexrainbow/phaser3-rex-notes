import { RUNNING, PENDING, IDLE, SUCCESS } from '../../../behaviortree';
import RemoveItem from '../../../../utils/array/Remove.js';

export default {
    start() {
        if (this.isRunning) {
            return this;
        }

        var trees = this.trees;
        var pendingTrees = this.pendingTrees;
        var blackboard = this.blackboard;
        var taskHandlers = this.taskHandlers;

        pendingTrees.length = 0;
        this.isRunning = true;
        // Run parallel tree, will return pending, or failure
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];

            if (tree.properties.parallel) {
                var status = tree.tick(blackboard, taskHandlers);
                if (status === PENDING) {
                    pendingTrees.push(tree);
                }
            } else {
                tree.resetState(blackboard);
                pendingTrees.push(tree);
            }
        }

        this._continue();

        return this;
    },

    _continue() {
        if (!this.isRunning) {
            return this;
        }

        var trees = this.pendingTrees;
        var closedTrees = this.closedTrees;
        var blackboard = this.blackboard;
        var taskHandlers = this.taskHandlers;

        closedTrees.length = 0;
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];
            var status = blackboard.getTreeState(tree.id);

            if (status === IDLE) {
                // Will goto PENDING, or FAILURE/ERROR state
                status = tree.tick(blackboard, taskHandlers);
            }

            var eventConditionPassed = tree.eventConditionPassed;
            if ((status === PENDING) && eventConditionPassed) {
                this.emit('enter', tree.title);
            }

            // Will goto RUNNING, or SUCCESS/FAILURE/ERROR state
            status = tree.tick(blackboard, taskHandlers);

            if (status === RUNNING) {
                break;
            } else {
                closedTrees.push(tree);
                if (eventConditionPassed) {
                    this.emit('exit', tree.title);
                }
            }
        }

        if (closedTrees.length > 0) {
            RemoveItem(trees, closedTrees);
        }

        if (trees.length === 0) {
            this.isRunning = false;
            this.emit('complete', this);
        }

        return this;
    },
}