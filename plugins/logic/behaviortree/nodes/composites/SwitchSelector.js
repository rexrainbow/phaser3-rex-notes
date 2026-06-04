import Composite from '../Composite.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';

class SwitchSelector extends Composite {
    constructor(config = {}, nodePool) {
        var condition;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || {};
            condition = expressions.condition;

        } else {
            var {
                condition: conditionValue = null,    // expression
                keys = undefined, // Or [key, ...]
                conditionEvalBreak = false,  // mode
                children = {},    // Or [child, ...]
                services,
                title,
                properties = {},
                name = 'SwitchSelector'
            } = config;

            if (keys === undefined) {
                keys = Object.keys(children);
                children = Object.values(children);
            }

            super(
                {
                    children: children,
                    services,
                    title,
                    properties: {
                        ...properties,
                        keys,
                        conditionEvalBreak,
                    },
                    name,
                },
                nodePool
            );

            condition = conditionValue;
        }

        // Expression node, or constant number/boolean
        this.condition = CreateNumberExpression(condition, nodePool);
        this.addExpression('condition', this.condition);

        this.keys = this.properties.keys;;  // Index of children

        this.conditionEvalBreak = this.properties.conditionEvalBreak;

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
            if (typeof (this.forceSelectChildIndex) === 'number') {
                return this.forceSelectChildIndex;
            } else {
                return this.keys.indexOf(this.forceSelectChildIndex);
            }
        }

        var key = tick.evalExpression(this.condition);
        return this.keys.indexOf(key);
    }

    tick(tick) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
            childIndex = this.evalCondition(tick);
            if (childIndex === -1) {
                childIndex = this.keys.indexOf('default');
            }
            if (childIndex === -1) {
                return ERROR;
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

export default SwitchSelector;
