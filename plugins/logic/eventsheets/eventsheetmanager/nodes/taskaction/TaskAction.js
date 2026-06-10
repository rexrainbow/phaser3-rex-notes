import { Action, } from '../../../../behaviortree/index.js';
import PauseEventSheetMethods from './PauseEventSheetMethods.js';
import IsEventEmitter from '../../../../../utils/system/IsEventEmitter.js';
import CreateExpressions from '../utils/CreateExpressions.js';
import EvalParameters from '../utils/EvalParameters.js';
import {
    EVT_COMMAND_START,
    EVT_COMMAND_END,
    EVT_COMMAND_ABORT,
} from '../../constants.js';



class TaskAction extends Action {
    constructor(config = {}, nodePool) {
        var parameters;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || {};
            parameters = expressions;

        } else {
            // config: {name, parameters:{...} }
            super({
                name: 'TaskAction',
                title: config.name,
                properties: config,
            });

            parameters = config.parameters || {};
        }

        CreateExpressions(this, nodePool, parameters);

        this.isRunning = false;
        this.isFailure = false;   // return Failure
        this.waitId = 0;
    }

    open(tick) {
        this.isRunning = false;
        this.isFailure = false;

        var taskData = this.properties;

        var taskName = taskData.name;
        if (!taskName) {
            return;
        }

        var blackboard = tick.blackboard;
        var eventSheetManager = blackboard.eventSheetManager;
        var eventSheet = tick.tree;
        var commandExecutor = tick.target;

        // Eval parameters
        var taskParameters = this.expressions || {};
        var evaledParameters = EvalParameters(tick, taskParameters);
        this.evaledParameters = evaledParameters;

        var eventSheetGroup = eventSheet.eventSheetGroup;
        var groupName = eventSheetGroup.name;
        eventSheetManager.emit(EVT_COMMAND_START, taskName, evaledParameters, eventSheet.title, groupName, eventSheetManager, eventSheet, this, eventSheetGroup);

        eventSheetManager.bindTaskActionNode(tick, this);
        // For invoking eventSheetManager.pauseEventSheet() to generate new resumeEventName

        var result;
        var handler = commandExecutor[taskName];
        if (handler) {
            result = handler.call(commandExecutor, evaledParameters, eventSheetManager, eventSheet);
        } else {
            handler = commandExecutor.defaultHandler;
            if (handler) {
                result = handler.call(commandExecutor, taskName, evaledParameters, eventSheetManager, eventSheet);
            }
        }

        eventSheetManager.unBindTaskAction(tick, this);

        if (!this.isRunning) {
            // Event-emitter mode
            if (IsEventEmitter(result)) {
                this.pauseEventSheetUnitlEvent(tick, result);
            } else {
                this.isFailure = (result === false) || (result === 0) || (result === null);
                eventSheetManager.emit(EVT_COMMAND_END, taskName, evaledParameters, !this.isFailure, result, eventSheet.title, groupName, eventSheetManager, eventSheet, this, eventSheetGroup);
            }
        }
    }

    tick(tick) {
        if (this.isRunning) {
            return this.RUNNING;
        } else {
            return (!this.isFailure) ? this.SUCCESS : this.FAILURE;
        }
    }

    close(tick) {
    }

    abort(tick) {
        var blackboard = tick.blackboard;
        var eventSheetManager = blackboard.eventSheetManager;
        var eventSheet = tick.tree;
        var eventSheetGroup = eventSheet.eventSheetGroup;
        var groupName = eventSheetGroup.name;
        var taskName = this.properties.name;

        eventSheetManager.emit(EVT_COMMAND_ABORT, taskName, this.evaledParameters, eventSheet.title, groupName, eventSheetManager, eventSheet, this, eventSheetGroup);

        if (this.removeTaskCompleteCallback) {
            this.removeTaskCompleteCallback();
        }
    }
}

Object.assign(
    TaskAction.prototype,
    PauseEventSheetMethods,
)

export default TaskAction
