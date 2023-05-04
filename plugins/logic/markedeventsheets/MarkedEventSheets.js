import { Blackboard, BehaviorTree, Parallel, RUNNING } from '../behaviortree';
import NOOP from '../../utils/object/NOOP.js';
import TreeMethods from './methods/TreeMethods.js';
import DataMethods from './methods/DataMethods.js';

class MarkedEventSheets {
    constructor({
        autoNextTick = true,
        taskHandlers
    } = {}) {

        this.setAutoNextTick(autoNextTick);
        this.setTaskHandlers(taskHandlers);

        this.blackboard = new Blackboard();

        BehaviorTree.setStartIDValue(0);
        this.tree = new BehaviorTree({ id: '#tree' });
        this.tree.setRoot(new Parallel({ title: 'root', finishMode: 1 }))
    }

    setAutoNextTick(enabled) {
        if (!enabled) {
            enabled = true;
        }
        this.autoNextTick = enabled;
        return this;
    }

    setTaskHandlers(taskHandlers) {
        this.taskHandlers = taskHandlers;
        return this;
    }

    tick() {
        this.taskHandlers.$nextTick = (this.autoNextTick) ? this.tick.bind(this) : NOOP;
        var state = this.tree.tick(this.blackboard, this.taskHandlers);
        this.isRunning = (state === RUNNING);
        return this;
    }

}

Object.assign(
    MarkedEventSheets.prototype,
    TreeMethods,
    DataMethods
)

export default MarkedEventSheets;