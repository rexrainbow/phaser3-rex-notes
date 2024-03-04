import EventEmitter from '../../../utils/eventemitter/EventEmitter';
import { BehaviorTree, Blackboard } from '../../behaviortree';
import Methods from './methods/Methods.js';

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
    Methods
)

export default EventSheetManager;