import GetValue from '../../utils/object/GetValue.js';
import { Blackboard, BehaviorTree, Parallel, RUNNING } from '../behaviortree';
import Marked2Node from './methods/Marked2Node.js';
import NOOP from '../../utils/object/NOOP.js';

class MarkedEventSheets {
    constructor(config) {
        this.setAutoNextTick(GetValue(config, 'autoNextTick', true));

        this.setTaskHandlers(GetValue(config, 'taskHandlers'));

        this.blackboard = new Blackboard();

        BehaviorTree.setStartIDValue(0);
        this.tree = new BehaviorTree();
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
        this.blackboard.setData(key, value);
        return this;
    }

    hasData(key) {
        return this.blackboard.hasData(key);
    }

    incData(key, inc) {
        this.blackboard.incData(key, inc);
        return this;
    }

    toggleData(key) {
        this.blackboard.toggleData(key);
        return this;
    }

    getData(key) {
        return this.blackboard.getData(key);
    }

    tick() {
        var state = this.tree.tick(this.blackboard, this.taskHandlers);
        this.isRunning = (state === RUNNING);
        return this;
    }

}

export default MarkedEventSheets;