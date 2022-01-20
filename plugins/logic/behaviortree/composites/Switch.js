import Composite from '../core/Nodes/Composite.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../constants.js';

class Switch extends Composite {
    constructor({
        expression = null,
        children = {},
        name = 'Switch'
    } = {}) {

        super({
            children: Object.values(children),
            name,
            properties: {
                expression
            },
        });


        if (!expression) {
            throw 'expression parameter in Switch composite is an obligatory parameter';
        }

        this.expression = this.addNumberVariable(expression);

        this.childrenMap = children;
    }

    addCase(key, node) {
        this.addChild(node);
        this.childrenMap[key] = node;
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
            var child = this.childrenMap[key];
            if (!child) {
                child = this.childrenMap['default'];
            }

            if (!child) {
                return ERROR;
            }

            childIndex = this.children.indexOf(child);
        }

        var child = this.children[childIndex];
        var status = child._execute(tick);
        nodeMemory.$runningChild = (status === RUNNING) ? childIndex : -1;
        return status;
    }
};

export default Switch;