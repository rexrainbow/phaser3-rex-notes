import { RUNNING, IDLE, SUCCESS } from '../../../behaviortree/index.js';
import RemoveItem from '../../../../utils/array/Remove.js';
import {
    EVT_GROUP_START,
    EVT_GROUP_CONTINUE,
    EVT_GROUP_COMPLETE,
    EVT_EVENTSHEET_OPEN,
    EVT_EVENTSHEET_CONDITION,
    EVT_EVENTSHEET_ENTER,
    EVT_EVENTSHEET_CATCH,
    EVT_EVENTSHEET_TICK,
    EVT_EVENTSHEET_STATUS,
    EVT_EVENTSHEET_CLOSE,
    EVT_EVENTSHEET_EXIT,
    EVT_EVENTSHEET_SKIP,
} from '../constants.js';

export var OpenEventSheet = function (eventSheetManager, eventsheet) {
    var blackboard = eventSheetManager.blackboard;
    var commandExecutor = eventSheetManager.commandExecutor;
    var result = eventsheet.start(blackboard, commandExecutor);

    if (!result) {
        return;
    }

    eventSheetManager.emit(EVT_EVENTSHEET_OPEN, eventsheet.title, this.name, eventSheetManager, eventsheet, this);
    eventSheetManager.emit(EVT_EVENTSHEET_CONDITION, eventsheet.title, this.name, eventsheet.conditionPassed, eventSheetManager, eventsheet, this);

    if (eventsheet.conditionPassed) {
        eventSheetManager.emit(EVT_EVENTSHEET_ENTER, eventsheet.title, this.name, eventSheetManager, eventsheet, this);
    } else {
        eventSheetManager.emit(EVT_EVENTSHEET_CATCH, eventsheet.title, this.name, eventSheetManager, eventsheet, this);
    }
}

export var TickEventSheet = function (eventSheetManager, eventsheet) {
    var blackboard = eventSheetManager.blackboard;
    var commandExecutor = eventSheetManager.commandExecutor;
    var eventSheetGroup = eventsheet.eventSheetGroup;
    eventSheetManager.emit(EVT_EVENTSHEET_TICK, eventsheet.title, eventSheetGroup.name, eventSheetManager, eventsheet, eventSheetGroup);
    var status = eventsheet.tick(blackboard, commandExecutor);
    eventSheetManager.emit(EVT_EVENTSHEET_STATUS, eventsheet.title, eventSheetGroup.name, status, eventSheetManager, eventsheet, eventSheetGroup);
    return status;
}

export var CloseEventSheet = function (eventSheetManager, eventsheet) {
    eventSheetManager.emit(EVT_EVENTSHEET_CLOSE, eventsheet.title, this.name, eventSheetManager, eventsheet, this);

    if (eventsheet.conditionPassed) {
        eventSheetManager.emit(EVT_EVENTSHEET_EXIT, eventsheet.title, this.name, eventSheetManager, eventsheet, this);
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

        eventSheetManager.emit(EVT_GROUP_START, this.name, eventSheetManager, this);

        // pendingTrees.length = 0;

        // Run parallel eventsheet, will return running, or failure
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var eventsheet = trees[i];

            if (!eventsheet.active) {
                eventSheetManager.emit(EVT_EVENTSHEET_SKIP, eventsheet.title, this.name, 'inactive', eventSheetManager, eventsheet, this);
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

        eventSheetManager.emit(EVT_GROUP_CONTINUE, this.name, eventSheetManager, this);

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
            this.removePendingEventSheets();
            this.isRunning = false;
            eventSheetManager.emit(EVT_GROUP_COMPLETE, this.name, eventSheetManager, this);
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
