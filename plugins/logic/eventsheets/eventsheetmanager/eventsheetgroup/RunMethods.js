import { RUNNING, IDLE, SUCCESS } from '../../../behaviortree';
import RemoveItem from '../../../../utils/array/Remove.js';

export var OpenEventSheet = function (eventSheetManager, eventsheet) {
    var blackboard = eventSheetManager.blackboard;
    var commandExecutor = eventSheetManager.commandExecutor;
    var result = eventsheet.start(blackboard, commandExecutor);

    if (!result) {
        return;
    }

    if (eventsheet.conditionPassed) {
        eventSheetManager.emit('eventsheet.enter', eventsheet.title, this.name, eventSheetManager);
    } else {
        eventSheetManager.emit('eventsheet.catch', eventsheet.title, this.name, eventSheetManager);
    }
}

export var TickEventSheet = function (eventSheetManager, eventsheet) {
    var blackboard = eventSheetManager.blackboard;
    var commandExecutor = eventSheetManager.commandExecutor;
    var status = eventsheet.tick(blackboard, commandExecutor);
    return status;
}

export var CloseEventSheet = function (eventSheetManager, eventsheet) {
    if (eventsheet.conditionPassed) {
        eventSheetManager.emit('eventsheet.exit', eventsheet.title, this.name, eventSheetManager);
    }
}

export default {

    /*
    A round : 
    
    - Normal case : 
        - Start from condition-eval, 
        - End to eventsheet.roundComplete (SUCCESS/FAILURE/ERROR state)
    - Cross rounds : 
        - Start from condition-eval or RUNNING state, 
        - End to eventsheet.roundComplete (RUNNING/SUCCESS/FAILURE/ERROR state)
    */

    start() {
        /*
        Start a round :
        
        - sequence : Add all trees to pendingTrees
        - parallel : Open all event sheets(eventsheet), add them to pendingTrees

        Then, invoke continue()
        */

        if (this.isRunning) {
            return this;
        }

        this.isRunning = true;

        var eventSheetManager = this.parent;
        var trees = this.trees;
        var pendingTrees = this.pendingTrees;
        var blackboard = eventSheetManager.blackboard;

        eventSheetManager.emit('start', this.name, eventSheetManager);

        // pendingTrees.length = 0;

        // Run parallel eventsheet, will return running, or failure
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var eventsheet = trees[i];

            if (!eventsheet.active) {
                continue;
            }

            eventsheet.resetState(blackboard);
            if (eventsheet.parallel) {
                // Open all event sheets
                OpenEventSheet.call(this, eventSheetManager, eventsheet);
            }

            pendingTrees.push(eventsheet);
        }

        this.continue();

        return this;
    },

    continue() {
        /*
        Tick event sheets(eventsheet) until all trees are at SUCCESS/FAILURE/ERROR state

        - Open (if not opened) and tick event sheet(eventsheet)        
        - TaskAction's complete event will invoke this method to run remainder nodes
        - Close(remove from pendingTrees) SUCCESS/FAILURE/ERROR event sheets(eventsheet)
        - Complete this round if pendingTrees is empty. i.e. all trees are return SUCCESS/FAILURE/ERROR.
        */

        if (!this.isRunning) {
            return this;
        }

        var eventSheetManager = this.parent;
        var trees = this.pendingTrees;
        var closedTrees = this.closedTrees;
        var blackboard = eventSheetManager.blackboard;

        closedTrees.length = 0;

        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var eventsheet = trees[i];

            // Do nothing if event sheet has been opened
            OpenEventSheet.call(this, eventSheetManager, eventsheet);

            if (!this.isRunning) {
                // Can break here
                break;
            }

            // Will goto RUNNING, or SUCCESS/FAILURE/ERROR state
            var status = TickEventSheet(eventSheetManager, eventsheet);

            if (eventsheet.roundComplete) {
                closedTrees.push(eventsheet);
                CloseEventSheet.call(this, eventSheetManager, eventsheet);
            } else if (status === RUNNING) {
                // Stall command execution here
                break;
            }

            if (!this.isRunning) {
                // Can break here
                break;
            }

        }

        blackboard.eventSheetGroup = undefined;

        if (closedTrees.length > 0) {
            RemoveItem(trees, closedTrees);
        }

        if (trees.length === 0) {
            this.isRunning = false;
            eventSheetManager.emit('complete', this.name, eventSheetManager);
        }

        return this;
    },

    startTree(title, ignoreCondition = true) {
        // Run a single event sheet(eventsheet)

        if (this.isRunning) {
            return this;
        }

        var eventsheet = this.getTree(title);
        if (!eventsheet) {
            return this;
        }

        this.isRunning = true;

        var eventSheetManager = this.parent;
        var pendingTrees = this.pendingTrees;
        var blackboard = eventSheetManager.blackboard;

        pendingTrees.length = 0;

        eventsheet.resetState(blackboard);

        eventsheet.setConditionEnable(!ignoreCondition);

        OpenEventSheet.call(this, eventSheetManager, eventsheet);

        eventsheet.setConditionEnable(true);

        pendingTrees.push(eventsheet);

        this.continue();

        return this;
    }
}