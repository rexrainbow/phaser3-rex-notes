import { Action, } from '../../behaviortree';
import IsEventEmitter from '../../../utils/system/IsEventEmitter.js';

class TaskAction extends Action {
    constructor(config) {
        // config: {name, parameters:{...} }        
        super({
            name: 'TaskAction',
            title: config.name,
            properties: config,
        });

        this.isRunning = false;
    }

    open(tick) {
        this.isRunning = false;

        var taskData = this.properties;

        var taskName = taskData.name;
        if (!taskName) {
            return;
        }

        var taskHandlers = tick.target;
        var handler = taskHandlers[taskName];
        if (!handler) {
            if (taskHandlers.getHandler) {
                handler = taskHandlers.getHandler(taskName);
            }
            if (!handler) {
                return;
            }
        }

        var eventEmitter = handler.call(taskHandlers,
            taskData.parameters,
            tick.blackboard.treeManager
        );

        if (IsEventEmitter(eventEmitter)) {
            this.isRunning = true;
            var treeManager = tick.blackboard.treeManager;
            this.$continue = treeManager.getContinueCallback();
            eventEmitter.once('complete', this.onTaskComplete, this);
            this.$eventEmitter = eventEmitter;
        }
    }

    onTaskComplete() {
        this.isRunning = false;
        this.$eventEmitter = undefined;

        this.$continue();
    }

    tick(tick) {
        return (this.isRunning) ? this.RUNNING : this.SUCCESS;
    }

    close(tick) {
    }

    abort(tick) {
        if (this.$eventEmitter) {
            this.$eventEmitter.off('complete', this.onTaskComplete, this);
            this.$eventEmitter = undefined;
        }
    }
}

export default TaskAction