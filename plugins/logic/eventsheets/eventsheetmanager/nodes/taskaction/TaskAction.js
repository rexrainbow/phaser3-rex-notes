import { Action, } from '../../../../behaviortree/index.js';
import PauseEventSheetMethods from './PauseEventSheetMethods.js';
import IsEventEmitter from '../../../../../utils/system/IsEventEmitter.js';
import DecodeExpression from '../../../../behaviortree/utils/DecodeExpression.js';
import CreateNumberExpression from '../../../../behaviortree/nodes/expressions/CreateNumberExpression.js';
import CreateStringExpression from '../../../../behaviortree/nodes/expressions/CreateStringExpression.js';


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

            parameters = config.parameters;
        }

        var expression;
        for (var name in parameters) {
            // Number/String Expression nodes, or constant number/boolean/string values
            expression = CreateExpression(parameters[name], nodePool);
            this.addExpression(name, expression);
        }
        
        this.isRunning = false;
        this.waitId = 0;
    }

    open(tick) {
        this.isRunning = false;

        var taskData = this.properties;

        var taskName = taskData.name;
        if (!taskName) {
            return;
        }

        var blackboard = tick.blackboard;
        var eventSheetManager = blackboard.eventSheetManager;
        var eventSheet = tick.tree;

        // Eval parameters
        var taskParameters = this.expressions;
        var evaledParameters = {};
        for (var name in taskParameters) {
            evaledParameters[name] = tick.evalExpression(taskParameters[name]);
        }

        eventSheetManager.bindTaskActionNode(tick, this);
        // Invoke eventSheetManager.pauseEventSheet() to generate new resumeEventName

        var commandExecutor = tick.target;
        var eventEmitter;
        var handler = commandExecutor[taskName];
        if (handler) {
            eventEmitter = handler.call(commandExecutor, evaledParameters, eventSheetManager, eventSheet);
        } else {
            handler = commandExecutor.defaultHandler;
            if (handler) {
                eventEmitter = handler.call(commandExecutor, taskName, evaledParameters, eventSheetManager, eventSheet);
            }
        }

        eventSheetManager.unBindTaskAction(tick, this);

        // Event-emitter mode
        if (!this.isRunning && IsEventEmitter(eventEmitter)) {
            this.pauseEventSheetUnitlEvent(tick, eventEmitter);
        }
    }

    tick(tick) {
        return (this.isRunning) ? this.RUNNING : this.SUCCESS;
    }

    close(tick) {
    }

    abort(tick) {
        if (this.removeTaskCompleteCallback) {
            this.removeTaskCompleteCallback();
        }
    }
}

var CreateExpression = function (expression, nodePool) {
    var decodeResult = DecodeExpression(expression, nodePool);
    if (decodeResult !== expression) {
        return decodeResult;
    }

    // Expression Node, string, number, boolean
    if (typeof (expression) === 'string') {
        if (IsNumberExpressionString(expression)) {
            // Is a number
            expression = RemoveNumberExpressionWrapper(expression);
            expression = CreateNumberExpression(expression, nodePool);

        } else if (IsStringExpressionString(expression)) {
            // Might be a string tempate
            expression = CreateStringExpression(expression, nodePool);

        }
        // else : Constant string
    }
    return expression;
}

var IsNumberExpressionString = function (s) {
    return s.startsWith('#(') && s.endsWith(')')
}

var IsStringExpressionString = function (s) {
    return (s.indexOf('{{') > -1) && (s.indexOf('}}') > -1)
}

var RemoveNumberExpressionWrapper = function (s) {
    return s.substring(2, s.length - 1);
}

Object.assign(
    TaskAction.prototype,
    PauseEventSheetMethods,
)

export default TaskAction
