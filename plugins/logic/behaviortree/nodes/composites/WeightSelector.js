import Composite from '../Composite.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';
import BaseNode from '../BaseNode.js';

class WeightSelector extends Composite {
    constructor(
        {
            expression = null,
            weights = undefined,    // Or [weight, ...]
            conditionEvalBreak = false,
            children = [],          // [node, ...], or [{weight, node}, ...]
            services,
            title,
            name = 'WeightSelector'
        } = {},
        nodePool
    ) {

        if (weights === undefined) {
            weights = [];

            var totalWeight = 0;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                var weight;
                if ((child instanceof BaseNode) || (typeof (child) === 'string')) {
                    weight = 1;
                } else {
                    weight = child.weight;
                    children[i] = child.node;
                }
                weights.push(weight);
                totalWeight += weight;
            }
            for (var i = 0, cnt = weights.length; i < cnt; i++) {
                weights[i] /= totalWeight;
            }
        }

        super(
            {
                children: children,
                services,
                title,
                name,
                properties: {
                    expression,
                    weights,
                    conditionEvalBreak,
                },
            },
            nodePool
        );

        this.expression = (expression) ? this.addExpression(expression) : null;
        this.weights = weights;
        this.conditionEvalBreak = conditionEvalBreak;
        this.forceSelectChildIndex = undefined;
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = -1;  // No running child
    }

    setSelectChildIndex(index) {
        if (this.forceSelectChildIndex !== undefined) {
            return this.forceSelectChildIndex;
        }

        this.forceSelectChildIndex = index;
        return this;
    }

    evalCondition(tick) {
        if (this.forceSelectChildIndex !== undefined) {
            return this.forceSelectChildIndex;
        }

        var value = (this.expression) ? tick.evalExpression(this.expression) : Math.random();
        for (var i = 0, cnt = this.weights.length; i < cnt; i++) {
            value -= this.weights[i];
            if (value < 0) {
                return i;
            }
        }
    }

    tick(tick) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
            childIndex = this.evalCondition(tick);
            if (childIndex === undefined) {
                childIndex = this.children.length - 1;
            }
            if (this.conditionEvalBreak) {
                // Resolve runningChild index, but not run child now
                nodeMemory.$runningChild = childIndex;
                return RUNNING;
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

export default WeightSelector;