import { Action, } from '../../../../behaviortree/index.js';
import PauseEventSheetMethods from './PauseEventSheetMethods.js';
import IsEventEmitter from '../../../../../utils/system/IsEventEmitter.js';
import Compile from '../../../../../math/expressionparser/utils/Complile.js';
import mustache from 'mustache';

class TaskAction extends Action {
    constructor(config) {
        // config: {name, parameters:{...} }        
        super({
            name: 'TaskAction',
            title: config.name,
            properties: config,
        });

        var sourceParameters = config.parameters;
        var taskParameters = {};
        for (var name in sourceParameters) {
            taskParameters[name] = CompileExpression(sourceParameters[name]);
        }
        this.taskParameters = taskParameters;

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
        var memory = eventSheetManager.memory;

        var taskParameters = this.taskParameters;
        var parametersCopy = {};
        for (var name in taskParameters) {
            var value = taskParameters[name];
            if (typeof (value) === 'function') {
                value = value(memory);
            }
            parametersCopy[name] = value;
        }

        eventSheetManager.bindTaskActionNode(tick, this);
        // Invoke eventSheetManager.pauseEventSheet() to generate new resumeEventName

        var commandExecutor = tick.target;
        var eventEmitter;
        var handler = commandExecutor[taskName];
        if (handler) {
            eventEmitter = handler.call(commandExecutor, parametersCopy, eventSheetManager, eventSheet);
        } else {
            handler = commandExecutor.defaultHandler;
            if (handler) {
                eventEmitter = handler.call(commandExecutor, taskName, parametersCopy, eventSheetManager, eventSheet);
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

var CompileExpression = function (s) {
    if (typeof (s) === 'string') {
        if (s.startsWith('#(') && s.endsWith(')')) {
            // Eval string to get number/boolean
            s = Compile(s.substring(2, s.length - 1));
        } else if ((s.indexOf('{{') > -1) && (s.indexOf('}}') > -1)) {
            // Might be a string template
            var template = s;
            s = function (data) {
                return mustache.render(template, data);
            }
        }
    }
    return s;
}

Object.assign(
    TaskAction.prototype,
    PauseEventSheetMethods,
)

export default TaskAction