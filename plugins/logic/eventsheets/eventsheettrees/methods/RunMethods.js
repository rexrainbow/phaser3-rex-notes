import { RUNNING, PENDING, IDLE, SUCCESS } from '../../../behaviortree';
import RemoveItem from '../../../../utils/array/Remove.js';

export default {
    start() {
        if (this.isRunning) {
            return this;
        }

        this.isRunning = true;

        var trees = this.trees;
        var pendingTrees = this.pendingTrees;
        var blackboard = this.blackboard;
        var commandExecutor = this.commandExecutor;

        pendingTrees.length = 0;

        // Run parallel tree, will return pending, or failure
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];

            tree.resetState(blackboard);
            if (tree.isParallel) {
                var status = tree.tick(blackboard, commandExecutor);
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
        if (!this.isRunning) {
            return this;
        }

        var trees = this.pendingTrees;
        var closedTrees = this.closedTrees;
        var blackboard = this.blackboard;
        var commandExecutor = this.commandExecutor;

        closedTrees.length = 0;
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];
            var status = blackboard.getTreeState(tree.id);

            if (status === IDLE) {
                // Will goto PENDING, or FAILURE/ERROR state
                status = tree.tick(blackboard, commandExecutor);
            }

            var eventConditionPassed = tree.eventConditionPassed;
            if ((status === PENDING)) {
                if (eventConditionPassed) {
                    this.emit('eventsheet.enter', tree.title, this);
                } else {
                    this.emit('eventsheet.catch', tree.title, this);
                }
            }

            if (!this.isRunning) {
                // Can break here
                break;
            }

            // Will goto RUNNING, or SUCCESS/FAILURE/ERROR state
            status = tree.tick(blackboard, commandExecutor);

            if (status === RUNNING) {
                break;
            } else {
                closedTrees.push(tree);
                if (eventConditionPassed) {
                    this.emit('eventsheet.exit', tree.title, this);
                }
            }

            if (!this.isRunning) {
                // Can break here
                break;
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

    stop() {
        this.isRunning = false;

        var blackboard = this.blackboard;
        var commandExecutor = this.commandExecutor;
        this.pendingTrees.forEach(function (tree) {
            tree.abort(blackboard, commandExecutor);
        })
        this.pendingTrees.length = 0;

        return this;
    },

    getContinueCallback() {
        var self = this;
        return function () {
            self.continue();
        }
    }
}