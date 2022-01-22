import Composite from '../Composite.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';

class IfBranch extends Composite {
    constructor(
        {
            expression = 'true',
            children = [],
            name = 'IfBranch'
        } = {},
        nodePool
    ) {

        super(
            {
                children: children,
                name,
                properties: {
                    expression
                },
            },
            nodePool
        );

        this.expression = this.addBooleanVariable(expression);
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
            childIndex = tick.evalExpression(this.expression) ? 0 : 1;
        }

        var child = this.children[childIndex];
        var status = child._execute(tick);
        nodeMemory.$runningChild = (status === RUNNING) ? childIndex : -1;
        return status;
    }
};

export default IfBranch;