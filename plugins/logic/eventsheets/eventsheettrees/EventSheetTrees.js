import EventEmitter from 'eventemitter3';
import { BehaviorTree, Blackboard } from '../../behaviortree';
import TreeMethods from './methods/TreeMethods.js';
import DataMethods from './methods/DataMethods.js';
import TickMethods from './methods/TickMethods.js';

BehaviorTree.setStartIDValue(0);

class EventSheetTrees extends EventEmitter {
    constructor({
        taskHandlers,
        parallel = false,
    } = {}) {

        super();

        this.setTaskHandlers(taskHandlers);
        this.parallel = parallel;

        this.blackboard = new Blackboard();
        this.blackboard.treeManager = this; // For TaskAction

        this.trees = [];
        this.pendingTrees = [];
        this.closedTrees = [];
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