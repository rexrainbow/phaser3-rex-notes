import Composite from '../Composite.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';

class Switch extends Composite {
    constructor(
        {
            expression = null,
            keys = undefined, // Or [key, ...]
            children = {},    // Or [child, ...]
            name = 'Switch'
        } = {},
        nodePool
    ) {

        if (keys === undefined) {
            keys = Object.keys(children);
            children = Object.values(children);
        }

        super(
            {
                children: children,
                name,
                properties: {
                    expression,
                    keys
                },
            },
            nodePool
        );

        this.expression = this.addVariable(expression);

        this.keys = keys;  // Index of children
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
            var key = tick.evalExpression(this.expression);
            childIndex = this.keys.indexOf(key);
            if (childIndex === -1) {
                childIndex = this.keys.indexOf('default');
            }
            if (childIndex === -1) {
                return ERROR;
            }
        }

        var child = this.children[childIndex];
        var status = child._execute(tick);
        nodeMemory.$runningChild = (status === RUNNING) ? childIndex : -1;
        return status;
    }
};

export default Switch;