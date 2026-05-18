import Composite from '../Composite';

class RandomSelector extends Composite {
    children: any;

    getNodeMemory: any;

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

    open(tick?: any) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = -1;  // No running child
    }

    tick(tick?: any) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
            childIndex = Math.floor(Math.random() * this.children.length);
        }

        var child = this.children[childIndex];
        var status = child._execute(tick);
        nodeMemory.$runningChild = (status === RUNNING) ? childIndex : -1;
        return status;
    }

    abortChildren(tick?: any) {
        var nodeMemory = this.getNodeMemory(tick);
        var child = this.children[nodeMemory.$runningChild];
        if (child?: any) {
            child._abort(tick);
            nodeMemory.$runningChild = -1;
        }
    }
};

export default RandomSelector;