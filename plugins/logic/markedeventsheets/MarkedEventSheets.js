import GetValue from '../../utils/object/GetValue.js';
import { BehaviorTree, Parallel, Blackboard, RUNNING } from '../behaviortree';
import Marked2Node from './methods/Marked2Node.js';

class MarkedEventSheets {
    constructor(config) {
        this.taskHandlers = GetValue(config, 'taskHandlers');
        this.tree = new BehaviorTree();
        this.tree.setRoot(new Parallel({ title: 'root', finishMode: 1 }));
        this.blackboard = new Blackboard()
    }

    setTaskHandlers(taskHandlers) {
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