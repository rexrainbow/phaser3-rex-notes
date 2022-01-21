import Composite from '../Composite.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';
import BaseNode from '../BaseNode.js';

class WeightSelector extends Composite {
    constructor({
        children = [],
        expression = null,
        name = 'WeightSelector'
    } = {}) {

        var weights = [];
        var totalWeight = 0;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var weight;
            if (children[i] instanceof BaseNode) {
                weight = 1;
            } else {
                weight = children[i].weight;
                children[i] = children[i].child;
            }
            weights.push(weight);
            totalWeight += weight;
        }
        for (var i = 0, cnt = weights.length; i < cnt; i++) {
            weights[i] /= totalWeight;
        }

        super({
            children: children,
            name,
            properties: {
                expression
            },
        });

        this.expression = (expression) ? this.addVariable(expression) : null;

        this.weights = weights;
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
            var value = (this.expression) ? tick.evalExpression(this.expression) : Math.random();
            // console.log(value);
            for (var i = 0, cnt = this.weights.length; i < cnt; i++) {
                value -= this.weights[i];
                if (value < 0) {
                    childIndex = i;
                    break;
                }
            }
        }

        var child = this.children[childIndex];
        var status = child._execute(tick);
        nodeMemory.$runningChild = (status === RUNNING) ? childIndex : -1;
        return status;
    }
};

export default WeightSelector;