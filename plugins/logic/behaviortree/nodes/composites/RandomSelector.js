import Composite from '../Composite.js';

class RandomSelector extends Composite {
    constructor(
        {
            children = [],
            services,
            title,
            name = 'RandomSelector'
        } = {},
        nodePool
    ) {

        super(
            {
                children,
                services,
                title,
                name,
            },
            nodePool
        );

    }

    open(tick) {
        var nodeMemory = tick.getNodeMemory();
        nodeMemory.$runningChild = -1;  // No running child
    }

    tick(tick) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = tick.getNodeMemory();
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
            childIndex = Math.floor(Math.random() * this.children.length);
        }

        var child = this.children[childIndex];
        var status = child._execute(tick);
        nodeMemory.$runningChild = (status === RUNNING) ? childIndex : -1;
        return status;
    }
};

export default RandomSelector;