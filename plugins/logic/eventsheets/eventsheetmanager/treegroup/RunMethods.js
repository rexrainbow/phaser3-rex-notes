import { RUNNING, IDLE, SUCCESS } from '../../../behaviortree';
import RemoveItem from '../../../../utils/array/Remove.js';

var OpenEventSheet = function (treeManager, tree) {
    var blackboard = treeManager.blackboard;
    var commandExecutor = treeManager.commandExecutor;
    var result = tree.start(blackboard, commandExecutor);

    if (!result) {
        return;
    }

    if (tree.conditionPassed) {
        treeManager.emit('eventsheet.enter', tree.title, this.name, treeManager);
    } else {
        treeManager.emit('eventsheet.catch', tree.title, this.name, treeManager);
    }
}

var TickEventSheet = function (treeManager, tree) {
    var blackboard = treeManager.blackboard;
    var commandExecutor = treeManager.commandExecutor;
    var status = tree.tick(blackboard, commandExecutor);
    return status;
}

var CloseEventSheet = function (treeManager, tree) {
    if (tree.conditionPassed) {
        treeManager.emit('eventsheet.exit', tree.title, this.name, treeManager);
    }
}

export default {

    /*
    A round : 
    
    - Normal case : 
        - Start from condition-eval, 
        - End to tree.roundComplete (SUCCESS/FAILURE/ERROR state)
    - Cross rounds : 
        - Start from condition-eval or RUNNING state, 
        - End to tree.roundComplete (RUNNING/SUCCESS/FAILURE/ERROR state)
    */

    start() {
        /*
        Start a round :
        
        - sequence : Add all trees to pendingTrees
        - parallel : Open all event sheets(tree), add them to pendingTrees

        Then, invoke continue()
        */

        if (this.isRunning) {
            return this;
        }

        this.isRunning = true;

        var treeManager = this.parent;
        var trees = this.trees;
        var pendingTrees = this.pendingTrees;
        var blackboard = treeManager.blackboard;

        // pendingTrees.length = 0;

        // Run parallel tree, will return running, or failure
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];

            if (!tree.active) {
                continue;
            }

            tree.resetState(blackboard);
            if (tree.parallel) {
                // Open all event sheets
                OpenEventSheet.call(this, treeManager, tree);
            }

            pendingTrees.push(tree);
        }

        this.continue();

        return this;
    },

    continue() {
        /*
        Tick event sheets(tree) until all trees are at SUCCESS/FAILURE/ERROR state

        - Open (if not opened) and tick event sheet(tree)        
        - TaskAction's complete event will invoke this method to run remainder nodes
        - Close(remove from pendingTrees) SUCCESS/FAILURE/ERROR event sheets(tree)
        - Complete this round if pendingTrees is empty. i.e. all trees are return SUCCESS/FAILURE/ERROR.
        */

        if (!this.isRunning) {
            return this;
        }

        var treeManager = this.parent;
        var trees = this.pendingTrees;
        var closedTrees = this.closedTrees;
        var blackboard = treeManager.blackboard;

        closedTrees.length = 0;

        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];

            // Do nothing if event sheet has been opened
            OpenEventSheet.call(this, treeManager, tree);

            if (!this.isRunning) {
                // Can break here
                break;
            }

            // Will goto RUNNING, or SUCCESS/FAILURE/ERROR state
            var status = TickEventSheet(treeManager, tree);

            if (tree.roundComplete) {
                closedTrees.push(tree);
                CloseEventSheet.call(this, treeManager, tree);
            } else if (status === RUNNING) {
                // Stall command execution here
                break;
            }

            if (!this.isRunning) {
                // Can break here
                break;
            }

        }

        blackboard.treeGroup = undefined;

        if (closedTrees.length > 0) {
            RemoveItem(trees, closedTrees);
        }

        if (trees.length === 0) {
            this.isRunning = false;
            treeManager.emit('complete', this.name, treeManager);
        }

        return this;
    },

    stop() {
        this.isRunning = false;

        var treeManager = this.parent;
        var blackboard = treeManager.blackboard;
        var commandExecutor = treeManager.commandExecutor;

        this.pendingTrees.forEach(function (tree) {
            tree.abort(blackboard, commandExecutor);
        })
        this.pendingTrees.length = 0;

        return this;
    },

    startTree(title, ignoreCondition = true) {
        // Run a single event sheet(tree)

        if (this.isRunning) {
            return this;
        }

        var tree = this.getTree(title);
        if (!tree) {
            return this;
        }

        this.isRunning = true;

        var treeManager = this.parent;
        var pendingTrees = this.pendingTrees;
        var blackboard = treeManager.blackboard;

        pendingTrees.length = 0;

        tree.resetState(blackboard);

        tree.setConditionEnable(!ignoreCondition);

        OpenEventSheet.call(this, treeManager, tree);

        tree.setConditionEnable(true);

        pendingTrees.push(tree);

        this.continue();

        return this;
    }
}