import EventEmitter from '../../../utils/eventemitter/EventEmitter.js';
import IsPlainObject from '../../../utils/object/IsPlainObject.js';
import { BehaviorTree, Blackboard } from '../../behaviortree/index.js';
import Methods from './methods/Methods.js';

BehaviorTree.setStartIDValue(0);

class EventSheetManager extends EventEmitter {
    constructor(owner, config) {
        if (IsPlainObject(owner) && (config === undefined)) {
            config = owner;
            owner = undefined;
        }

        if (config === undefined) {
            config = {};
        }

        super();

        this.isShutdown = false;
        this.owner = owner;

        var {
            commandExecutor,
            parallel = false,
            globalMemory = {},
        } = config;

        this.defaultTreeGroupName = '_';

        this.setCommandExecutor(commandExecutor);
        this.parallel = parallel;

        this.blackboard = new Blackboard({
            currentTimeKey: '$roundCounter',
            globalMemory,
        });
        this.blackboard.eventSheetManager = this; // For TaskAction

        this.treeGroups = {};

        this.setRoundCounter(0);

    }

    shutdown(destroyConfig) {
        if (this.isShutdown) {
            return;
        }

        if (this.commandExecutor && this.commandExecutor.destroy) {
            this.commandExecutor.destroy(destroyConfig);
        }

        for (var name in this.treeGroups) {
            this.treeGroups[name].destroy();
        }

        this.blackboard.destroy();

        super.shutdown();

        this.owner = undefined;
        this.commandExecutor = undefined;
        this.blackboard = undefined;
        this.isShutdown = true;

        return this;
    }

    destroy(destroyConfig) {
        if (this.isShutdown) {
            return;
        }
        this.emit('destroy', this, destroyConfig);
        this.shutdown(destroyConfig);
    }


    get memory() {
        return this.blackboard.getGlobalMemory();
    }

    get $roundCounter() {
        return this.getRoundCounter();
    }

    set $roundCounter(value) {
        this.setRoundCounter(value);
    }

    setCommandExecutor(commandExecutor) {
        this.commandExecutor = commandExecutor;
        return this;
    }

    setGlobalMemory(memory) {
        this.blackboard.setGlobalMemory(memory);
        return this;
    }

}

Object.assign(
    EventSheetManager.prototype,
    Methods
)

export default EventSheetManager;
