import BaseTask from './../BaseTask.js';
import TaskTypeCache from './../TaskTypeCache.js';
import IsArray from './../../utils/array/IsArray.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class ParallelTasks extends BaseTask {
    constructor(target, parentTask, config) {
        super(target, parentTask, config);
        this.children = [];
        this.resetFromJSON(config);
        this.boot();

        this.add(config);
    }

    resetFromJSON(o) {
        return this;
    }

    toJSON() {
        return {};
    }

    destroy() {
        this.target = undefined;
    }

    add(config) {
        if (IsArray(config)) {
            for (var i = 0, len = config.length; i < len; i++) {
                this.add(config[i]);
            }
        } else {
            var type = GetFastValue(config, 'type', undefined);
            if (type === undefined) {
                return;
            }
            var taskKlass;
            if (typeof (type) === 'string') {
                taskKlass = TaskTypeCache.get(type);
            } else {
                taskKlass = type;
            }
            if (!taskKlass) {
                return;
            }
            var child = new taskKlass(this.target, this, config);
            this.children.push(child);
        }
    }

    prestep(time, delta) {
        this.runCallback('prestep', time, delta);
    }
    step(time, delta) {
        this.runCallback('step', time, delta);
    }
    poststep(time, delta) {
        this.runCallback('poststep', time, delta);
    }
    prerender(time, delta) {
        this.runCallback('prerender', time, delta);
    }
    postrender(time, delta) {
        this.runCallback('postrender', time, delta);
    }

    runCallback(event, time, delta) {
        var children = this.children,
            child;
        for (var i = 0, len = children.length; i < len; i++) {
            child = children[i];
            if (child[event]) {
                child[event](time, delta);
            }
        }
    }
}

TaskTypeCache.register('parallel', ParallelTasks);
export default ParallelTasks;