import { BehaviorTree, Blackboard } from '../../behaviortree';
import TreeMethods from './methods/TreeMethods.js';
import DataMethods from './methods/DataMethods.js';
import TickMethods from './methods/TickMethods.js';

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

}

Object.assign(
    EventSheetTrees.prototype,
    TreeMethods,
    DataMethods,
    TickMethods,
)

export default EventSheetTrees;