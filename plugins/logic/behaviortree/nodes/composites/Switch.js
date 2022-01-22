import Composite from '../Composite.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';

class Switch extends Composite {
    constructor(
        {
            expression = null,
            children = {},
            name = 'Switch'
        } = {},
        nodePool
    ) {

        super(
            {
                children: Object.values(children),
                name,
                properties: {
                    expression
                },
            },
            nodePool
        );


        if (!expression) {
            throw 'expression parameter in Switch composite is an obligatory parameter';
        }

        this.expression = this.addVariable(expression);

        this.keys = Object.keys(children);  // Index of children
    }

    addCase(key, node) {
        this.addChild(node);
        this.keys.push(key);
        return this;
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