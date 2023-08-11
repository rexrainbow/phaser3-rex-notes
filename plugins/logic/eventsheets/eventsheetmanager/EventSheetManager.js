import EventEmitter from '../../../utils/eventemitter/EventEmitter';
import { BehaviorTree, Blackboard } from '../../behaviortree';
import TreeMethods from './methods/TreeMethods.js';
import DataMethods from './methods/DataMethods.js';
import StateMethods from './methods/StateMethods';
import ValueConvertMethods from './methods/ValueConvertMethods';
import RunMethods from './methods/RunMethods.js';

BehaviorTree.setStartIDValue(0);

class EventSheetManager extends EventEmitter {
    constructor({
        commandExecutor,
        parallel = false,
    } = {}) {

        super();

        this.defaultTreeGroupName = '_';

        this.setCommandExecutor(commandExecutor);
        this.parallel = parallel;

        this.blackboard = new Blackboard();
        this.blackboard.treeManager = this; // For TaskAction

        this.treeGroups = {};
    }

    get memory() {
        return this.blackboard.getGlobalMemory();
    }

    setCommandExecutor(commandExecutor) {
        this.commandExecutor = commandExecutor;
        return this;
    }

}

Object.assign(
    EventSheetManager.prototype,
    TreeMethods,
    DataMethods,
    StateMethods,
    ValueConvertMethods,
    RunMethods,
)

export default EventSheetManager;