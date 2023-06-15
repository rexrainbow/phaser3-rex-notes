import { Action, } from '../../../behaviortree';
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
            var value = sourceParameters[name];
            if (typeof (value) === 'string') {
                if (value.startsWith('#(') && value.endsWith(')')) {
                    // Eval string to get number/boolean
                    value = Compile(value.substring(2, value.length - 1));
                } else if ((value.indexOf('{{') > -1) && (value.indexOf('}}') > -1)) {
                    // Might be a string template
                    var template = value;
                    value = function (data) {
                        return mustache.render(template, data);
                    }
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

        var blackboard = tick.blackboard;
        var treeManager = blackboard.treeManager;
        var treeGroup = blackboard.treeGroup;
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

            this.continueCallback = treeGroup.continue.bind(treeGroup);
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

export default TaskAction