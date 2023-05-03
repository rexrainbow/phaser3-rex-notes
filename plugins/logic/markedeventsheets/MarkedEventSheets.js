import GetValue from '../../utils/object/GetValue.js';
import { BehaviorTree, Parallel } from '../behaviortree';
import Marked2Node from './methods/Marked2Node.js';

class MarkedEventSheets {
    constructor(config) {
        this.taskHandlers = GetValue(config, 'taskHandler');
        this.tree = new BehaviorTree();
        this.tree.setRoot(new Parallel({ title: 'root', finishMode: 1 }));
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
}

export default MarkedEventSheets;