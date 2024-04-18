import { Action, } from '../../../behaviortree/index.js';
import IsEventEmitter from '../../../../utils/system/IsEventEmitter.js';
import Compile from '../../../../math/expressionparser/utils/Complile.js';
import mustache from 'mustache';

class TaskAction extends Action {
    constructor(config) {
        // config: {name, parameters:{...} }        
        super({
            name: 'TaskAction',
            title: config.name,
            properties: config,
        });

        this.isRunning = false;

        var sourceParameters = config.parameters;
        var taskParameters = {};
        for (var name in sourceParameters) {
            taskParameters[name] = CompileExpression(sourceParameters[name]);
        }
        this.taskParameters = taskParameters;
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
        var eventsheet = tick.tree;
        var eventSheetGroup = eventsheet.eventSheetGroup;
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

        var commandExecutor = tick.target;

        var eventEmitter;
        var handler = commandExecutor[taskName];
        if (handler) {
            eventEmitter = handler.call(commandExecutor, parametersCopy, eventSheetManager, eventsheet);
        } else {
            handler = commandExecutor.defaultHandler;
            if (handler) {
                eventEmitter = handler.call(commandExecutor, taskName, parametersCopy, eventSheetManager, eventsheet);
            }
        }

        if (IsEventEmitter(eventEmitter)) {
            this.pauseEventSheet(eventSheetGroup, eventEmitter, 'complete');
        }
    }

    pauseEventSheet(eventSheetGroup, eventEmitter, resumeEventName) {
        // Pause eventSheetGroup, wait until eventEmitter fires resumeEventName
        this.isRunning = true;

        var self = this;
        var taskCompleteCallback = function () {
            // Resume event sheet group
            self.isRunning = false;
            self.removeTaskCompleteCallback = undefined;
            eventSheetGroup.continue();
        }
        // Remove task-complete callback when aborting this node
        this.removeTaskCompleteCallback = function () {
            eventEmitter.off(resumeEventName, taskCompleteCallback);
            self.removeTaskCompleteCallback = undefined;
        }

        eventEmitter.once(resumeEventName, taskCompleteCallback);

        return resumeEventName;
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

export default TaskAction