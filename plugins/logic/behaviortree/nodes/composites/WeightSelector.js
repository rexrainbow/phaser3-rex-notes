import Composite from '../Composite.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';
import BaseNode from '../BaseNode.js';

class WeightSelector extends Composite {
    constructor(config = {}, nodePool) {
        var condition;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || {};
            var properties = config.properties || {};
            condition = expressions.condition;

        } else {
            var {
                condition: conditionValue = null,     // expression
                weights = undefined,    // Or [weight, ...]
                conditionEvalBreak = false,  // mode
                children = [],          // [node, ...], or [{weight, node}, ...]
                services,
                title,
                properties = {},
                name = 'WeightSelector'
            } = config;

            if (weightsValue === undefined) {
                weightsValue = [];

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
                    weightsValue.push(weight);
                    totalWeight += weight;
                }
                for (var i = 0, cnt = weightsValue.length; i < cnt; i++) {
                    weightsValue[i] /= totalWeight;
                }
            }

            super(
                {
                    children: children,
                    services,
                    title,
                    properties: {
                        ...properties,
                        weights,
                        conditionEvalBreak,
                    },
                    name,
                },
                nodePool
            );

            condition = conditionValue;
        }

        if (condition != null) {
            // Expression node, or constant number/boolean
            this.condition = CreateNumberExpression(condition, nodePool);
            this.addExpression('condition', this.condition);
        } else {
            this.condition = null;
        }

        this.weights = this.properties.weights;

        this.conditionEvalBreak = this.properties.conditionEvalBreak;

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

        var value = (this.condition) ? tick.evalExpression(this.condition) : Math.random();
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
