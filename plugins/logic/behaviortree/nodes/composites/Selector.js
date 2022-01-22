import Composite from '../Composite.js';
import { SUCCESS, FAILURE, RUNNING } from '../../constants.js';

class Selector extends Composite {
    constructor(
        {
            children = [],
            name = 'Selector'
        } = {},
        nodePool
    ) {

        super(
            {
                children,
                name,
            },
            nodePool
        );

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

            if (status === RUNNING) {
                nodeMemory.$runningChild = i;
                return RUNNING;
            } else if (status === SUCCESS) {
                return SUCCESS;
            }
        }

        return FAILURE;
    }
};

export default Selector;