import EventEmitter from '../../../utils/eventemitter/EventEmitter';
import IsPlainObject from '../../../utils/object/IsPlainObject.js';
import { BehaviorTree, Blackboard } from '../../behaviortree';
import Methods from './methods/Methods.js';

BehaviorTree.setStartIDValue(0);

class EventSheetManager extends EventEmitter {
    constructor(scene, config) {
        if (IsPlainObject(scene) && (config === undefined)) {
            config = scene;
            scene = undefined;
        }

        if (config === undefined) {
            config = {};
        }

        super();

        this.isShutdown = false;
        this.scene = scene;

        var {
            commandExecutor,
            parallel = false,
        } = config;

        this.defaultTreeGroupName = '_';

        this.setCommandExecutor(commandExecutor);
        this.parallel = parallel;

        this.blackboard = new Blackboard({
            currentTimeKey: '$roundCounter'
        });
        this.blackboard.eventSheetManager = this; // For TaskAction

        this.treeGroups = {};

        this.setRoundCounter(0);

        this.boot();
    }

    boot() {
    }

    shutdown(fromScene) {
        if (this.isShutdown) {
            return;
        }

        if (this.commandExecutor && this.commandExecutor.destroy) {
            this.commandExecutor.destroy(fromScene);
        }

        for (var name in this.treeGroups) {
            this.treeGroups[name].destroy();
        }

        this.blackboard.destroy();

        super.shutdown();

        this.scene = undefined;
        this.commandExecutor = undefined;
        this.blackboard = undefined;
        this.isShutdown = true;

        return this;
    }

    destroy(fromScene) {
        if (this.isShutdown) {
            return;
        }
        this.emit('destroy', this, fromScene);
        this.shutdown(fromScene);
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

}

Object.assign(
    EventSheetManager.prototype,
    Methods
)

export default EventSheetManager;