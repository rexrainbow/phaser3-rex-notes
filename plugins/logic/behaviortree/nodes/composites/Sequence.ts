import Composite from '../Composite';
import { SUCCESS, FAILURE, RUNNING, ABORT, ERROR } from '../../constants';

class Sequence extends Composite {
    children: any;

    getNodeMemory: any;

    constructor(
        {
            children = [],
            services,
            title,
            name = 'Sequence'
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
        nodeMemory.$runningChild = 0;
    }

    tick(tick?: any) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);

        var childIndex = nodeMemory.$runningChild;
        var status;
        for (var i = childIndex, cnt = this.children.length; i < cnt; i++) {
            status = this.children[i]._execute(tick);

            if ((status === RUNNING) || (status === FAILURE) || (status === ABORT)) {
                break;
            }
        }

        nodeMemory.$runningChild = (status === RUNNING) ? i : -1;
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

export default Sequence;