import Composite from '../Composite.js';
import {
    SUCCESS, FAILURE, RUNNING, ABORT, ERROR,
    NEXTA, NEXTB, NEXTC, NEXTD
} from '../../constants.js';

class Sequence extends Composite {
    constructor(
        {
            children = [],
            services,
            title,
            name = 'Sequence',
            allowNextA = false,
            allowNextB = false,
            allowNextC = false,
            allowNextD = false,
        } = {},
        nodePool
    ) {

        super(
            {
                children,
                services,
                title,
                name,
                properties: {
                    allowNextA,
                    allowNextB,
                    allowNextC,
                    allowNextD,
                }
            },
            nodePool
        );

        this.allowNextA = allowNextA;
        this.allowNextB = allowNextB;
        this.allowNextC = allowNextC;
        this.allowNextD = allowNextD;

    }

    set allowNextD(value) {
        this.setProperty('allowNextD', value);
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = 0;
    }

    tick(tick) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);

        var childIndex = nodeMemory.$runningChild;
        var status;
        for (var i = childIndex, cnt = this.children.length; i < cnt; i++) {
            status = this.children[i]._execute(tick);

            if (
                (status === RUNNING) || (status === FAILURE) || (status === ABORT) ||
                ((state === NEXTA) && (!this.allowNextA)) ||
                ((state === NEXTB) && (!this.allowNextB)) ||
                ((state === NEXTC) && (!this.allowNextC)) ||
                ((state === NEXTD) && (!this.allowNextD))
            ) {
                break;
            }

            /* 
            Running next node forcely if 
            - (state === NEXTA) && this.allowNextA, or
            - (state === NEXTB) && this.allowNextB, or
            - (state === NEXTC) && this.allowNextC, or
            - (state === NEXTD) && this.allowNextD
            */
        }

        nodeMemory.$runningChild = (status === RUNNING) ? i : -1;
        return status;
    }

    abortChildren(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var child = this.children[nodeMemory.$runningChild];
        if (child) {
            child._abort(tick);
            nodeMemory.$runningChild = -1;
        }
    }
};

export default Sequence;