import { Action, } from '../../behaviortree';
import IsEventEmitter from '../../../utils/system/IsEventEmitter.js';
import Compile from '../../../math/expressionparser/utils/Complile.js';
import handlebars from 'handlebars';

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
            var value = sourceParameters[name];
            if (typeof (value) === 'string') {
                var callback = CreateEvalCallback(value);
                if (callback) {
                    value = callback;
                }
            }
            taskParameters[name] = value;
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

        var treeManager = tick.blackboard.treeManager;
        var memory = treeManager.memory;

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
            eventEmitter = handler.call(commandExecutor, parametersCopy, treeManager);
        } else {
            handler = commandExecutor.defaultHandler;
            if (handler) {
                eventEmitter = handler.call(commandExecutor, taskName, parametersCopy, treeManager);
            }
        }

        if (IsEventEmitter(eventEmitter)) {
            this.isRunning = true;

            eventEmitter.once('complete', this.onTaskComplete, this);

            this.continueCallback = treeManager.continue.bind(treeManager);
            this.continueEE = eventEmitter;
        }
    }

    onTaskComplete() {
        this.isRunning = false;
        this.continueEE = undefined;

        this.continueCallback();
    }

    tick(tick) {
        return (this.isRunning) ? this.RUNNING : this.SUCCESS;
    }

    close(tick) {
    }

    abort(tick) {
        if (this.continueEE) {
            this.continueEE.off('complete', this.onTaskComplete, this);
            this.continueEE = undefined;
        }
    }
}

// Compile `#(...)`, `_(...)`, `num()`, `str(...)` string to callback
var CreateEvalCallback = function (s) {
    if (s.startsWith('#(') && s.endsWith(')')) {
        return Compile(s.substring(2, s.length - 1));
    }
    if (s.startsWith('_(') && s.endsWith(')')) {
        return handlebars.compile(s.substring(2, s.length - 1));
    }

    if (s.startsWith('num(') && s.endsWith(')')) {
        return Compile(s.substring(4, s.length - 1));
    }
    if (s.startsWith('str(') && s.endsWith(')')) {
        return handlebars.compile(s.substring(4, s.length - 1));
    }
}

export default TaskAction