import GetValue from '../../utils/object/GetValue.js';
import { BehaviorTree, Parallel, Blackboard, RUNNING } from '../behaviortree';
import Marked2Node from './methods/Marked2Node.js';
import NOOP from '../../utils/object/NOOP.js';

class MarkedEventSheets {
    constructor(config) {
        this.setAutoNextTick(GetValue(config, 'autoNextTick', true));

        this.setTaskHandlers(GetValue(config, 'taskHandlers'));

        this.blackboard = new Blackboard();
        this.tree = new BehaviorTree({
            root: new Parallel({ title: 'root', finishMode: 1 })
        });
    }

    setAutoNextTick(enabled) {
        if (!enabled) {
            enabled = true;
        }
        this.autoNextTick = enabled;
        return this;
    }

    setTaskHandlers(taskHandlers) {
        if (taskHandlers) {
            taskHandlers.$nextTick = (this.autoNextTick) ? this.tick.bind(this) : NOOP;
        }

        this.taskHandlers = taskHandlers;
        return this;
    }

    addEventSheet(markedString) {
        this.tree.root.addChild(Marked2Node(markedString));
        return this;
    }

    removeEventSheet(title) {
        // TODO
        return this;
    }

    dump() {
        return this.tree.dump();
    }

    setData(key, value) {
        this.blackboard.set(key, value);
        return this;
    }

    tick() {
        var state = this.tree.tick(this.blackboard, this.taskHandlers);
        this.isRunning = (state === RUNNING);
        return this;
    }

}

export default MarkedEventSheets;