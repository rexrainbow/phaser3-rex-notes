import Composite from '../Composite.js';
import { SUCCESS, FAILURE, RUNNING, ERROR, PENDING } from '../../constants.js';

class IfSelector extends Composite {
    constructor(
        {
            expression = 'true',
            returnPending = false,
            children = [],
            services,
            title,
            name = 'IfSelector'
        } = {},
        nodePool
    ) {

        super(
            {
                children: children,
                services,
                title,
                name,
                properties: {
                    expression,
                    returnPending,
                },
            },
            nodePool
        );

        this.expression = this.addBooleanExpression(expression);
        this.returnPending = returnPending;
        this.forceSelectChildIndex = undefined;
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = -1;  // No running child
    }

    setSelectChildIndex(index) {
        this.forceSelectChildIndex = index;
        return this;
    }

    evalCondition(tick) {
        if (this.forceSelectChildIndex !== undefined) {
            return this.forceSelectChildIndex;
        }

        return tick.evalExpression(this.expression) ? 0 : 1;
    }

    tick(tick) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
            childIndex = this.evalCondition(tick);
            if (this.returnPending) {
                nodeMemory.$runningChild = childIndex;
                return PENDING;
            }
        }

        var child = this.children[childIndex];
        var status = child._execute(tick);
        nodeMemory.$runningChild = (status === RUNNING) ? childIndex : -1;

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

export default IfSelector;