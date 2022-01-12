import Composite from '../core/Nodes/Composite.js';
import { SUCCESS, RUNNING } from '../constants.js';

class Sequence extends Composite {
    constructor({
        children = [],
        name = 'Sequence'
    } = {}) {

        super({
            children,
            name,
        });
    }

    open(tick) {
        var nodeMemory = tick.getNodeMemory();
        nodeMemory.$runningChild = 0;
    }

    tick(tick) {
        var nodeMemory = tick.getNodeMemory();

        var childIndex = nodeMemory.$runningChild;
        for (var i = childIndex, cnt = this.children.length; i < cnt; i++) {
            var status = this.children[i]._execute(tick);

            if (status !== SUCCESS) {
                if (status === RUNNING) {
                    nodeMemory.$runningChild = i;
                }
                return status;
            }
        }

        return SUCCESS;
    }
};

export default Sequence;