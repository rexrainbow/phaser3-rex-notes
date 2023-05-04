import { Blackboard, BehaviorTree, Parallel, RUNNING } from '../behaviortree';
import Marked2Node from './methods/Marked2Node.js';
import NOOP from '../../utils/object/NOOP.js';
import GetCustomNodeMapping from './methods/GetCustomNodeMapping.js';

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

    addEventSheet(markedString) {
        this.tree.root.addChild(Marked2Node(markedString));
        return this;
    }

    clearAllEventSheets() {
        this.tree.setRoot(new Parallel({ title: 'root', finishMode: 1 }));
        this.blackboard.removeTreeData(this.tree.id);
        return this;
    }

    removeEventSheet(title) {
        // TODO
        return this;
    }

    dumpTree() {
        return this.tree.dump();
    }

    loadTree(data) {
        this.tree.load(data, GetCustomNodeMapping());
        return this;
    }

    dumpData() {
        return this.blackboard.dump();
    }

    loadData(data) {
        this.blackboard.load(data);
        return this;
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
        this.taskHandlers.$nextTick = (this.autoNextTick) ? this.tick.bind(this) : NOOP;
        var state = this.tree.tick(this.blackboard, this.taskHandlers);
        this.isRunning = (state === RUNNING);
        return this;
    }

}

export default MarkedEventSheets;