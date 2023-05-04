import { BehaviorTree, Blackboard, RUNNING } from '../../behaviortree';
import TreeMethods from './methods/TreeMethods.js';
import DataMethods from './methods/DataMethods.js';

BehaviorTree.setStartIDValue(0);

class EventSheetTrees {
    constructor({
        taskHandlers
    } = {}) {

        this.setTaskHandlers(taskHandlers);

        this.blackboard = new Blackboard();
        this.trees = [];
    }

    setTaskHandlers(taskHandlers) {
        this.taskHandlers = taskHandlers;
        this.taskHandlers.$continue = this.continue.bind(this);
        return this;
    }

    tick() {
        var trees = this.trees;
        var blackboard = this.blackboard;
        var taskHandlers = this.taskHandlers;
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];
            tree.properties.state = tree.tick(blackboard, taskHandlers);
        }

        this.continue();

        return this;
    }

    continue() {
        var trees = this.trees;
        var blackboard = this.blackboard;
        var taskHandlers = this.taskHandlers;
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var tree = trees[i];
            if (tree.properties.state === RUNNING) {
                tree.properties.state = tree.tick(blackboard, taskHandlers);
            }
        }
        return this;
    }

}

Object.assign(
    EventSheetTrees.prototype,
    TreeMethods,
    DataMethods,
)

export default EventSheetTrees;