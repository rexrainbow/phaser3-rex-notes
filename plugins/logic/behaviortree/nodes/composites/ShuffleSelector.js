import Composite from '../Composite.js';
import Shuffle from '../../../../utils/array/Shuffle.js';
import { SUCCESS, FAILURE, RUNNING } from '../../constants.js';

class ShuffleSelector extends Composite {
    constructor(
        {
            children = [],
            name = 'ShuffleSelector'
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

        if (!nodeMemory.$children) {
            nodeMemory.$children = this.children.map((child, index) => index);
        }
        Shuffle(nodeMemory.$children);
    }

    tick(tick) {
        var nodeMemory = tick.getNodeMemory();

        var childIndex = nodeMemory.$runningChild;
        var children = nodeMemory.$children;
        for (var i = childIndex, cnt = children.length; i < cnt; i++) {
            var status = this.children[children[i]]._execute(tick);

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

export default ShuffleSelector;