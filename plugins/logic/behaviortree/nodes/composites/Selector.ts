import Composite from '../Composite';
import { SUCCESS, FAILURE, RUNNING, ABORT, ERROR } from '../../constants';

class Selector extends Composite {
    children: any;

    getNodeMemory: any;

    constructor(
        {
            children = [],
            services,
            title,
            name = 'Selector'
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
        var status;
        if (childIndex < 0) {
            for (var i = 0, cnt = this.children.length; i < cnt; i++) {
                status = this.children[i]._execute(tick);

                if ((status === RUNNING) || (status === SUCCESS) || (status === ABORT)) {
                    childIndex = i;
                    break;
                }
            }
        } else {
            var child = this.children[childIndex];
            status = child._execute(tick);
        }

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

export default Selector;