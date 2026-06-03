import Composite from '../Composite.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';

class SwitchSelector extends Composite {
    constructor(config = {}, nodePool) {
        var condition, keys, conditionEvalBreak;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions;
            var properties = config.properties || {};
            condition = (expressions && (expressions.condition !== undefined)) ? expressions.condition : properties.condition;
            keys = properties.keys;
            conditionEvalBreak = properties.conditionEvalBreak;

        } else {
            var {
                condition: conditionValue = null,
                keys: keysValue = undefined, // Or [key, ...]
                conditionEvalBreak: conditionEvalBreakValue = false,
                children = {},    // Or [child, ...]
                services,
                title,
                properties = {},
                name = 'SwitchSelector'
            } = config;

            if (keysValue === undefined) {
                keysValue = Object.keys(children);
                children = Object.values(children);
            }

            super(
                {
                    children: children,
                    services,
                    title,
                    name,
                    properties: {
                        ...properties,
                        condition: conditionValue,
                        keys: keysValue,
                        conditionEvalBreak: conditionEvalBreakValue,
                    },
                },
                nodePool
            );

            condition = conditionValue;
            keys = keysValue;
            conditionEvalBreak = conditionEvalBreakValue;
        }

        this.condition = CreateNumberExpression(condition, nodePool); // Expression node
        this.addExpression('condition', this.condition);
        this.keys = keys;  // Index of children
        this.conditionEvalBreak = conditionEvalBreak;
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
