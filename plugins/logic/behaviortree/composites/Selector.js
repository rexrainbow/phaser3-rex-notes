import Composite from '../core/Nodes/Composite.js';
import { FAILURE, RUNNING } from '../constants.js';

class Selector extends Composite {
    constructor({
        children = [],
        name = 'Selector'
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

            if (status !== FAILURE) {
                if (status === RUNNING) {
                    nodeMemory.$runningChild = i;
                }

                return status;
            }
        }

        return FAILURE;
    }
};

export default Selector;