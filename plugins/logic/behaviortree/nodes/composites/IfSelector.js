import Composite from '../Composite.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';

class IfSelector extends Composite {
    constructor(
        {
            expression = 'true',
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
                    expression
                },
            },
            nodePool
        );

        this.expression = this.addBooleanExpression(expression);
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = -1;  // No running child
    }

    tick(tick) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
            childIndex = tick.evalExpression(this.expression) ? 0 : 1;
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