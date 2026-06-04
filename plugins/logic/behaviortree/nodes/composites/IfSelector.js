import Composite from '../Composite.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';

class IfSelector extends Composite {
    constructor(config = {}, nodePool) {
        var condition;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || {};
            condition = expressions.condition;

        } else {
            var {
                condition: conditionValue = 'true',    // expression
                conditionEvalBreak = false,  // mode
                children = [],
                services,
                title,
                properties = {},
                name = 'IfSelector'
            } = config;

            super(
                {
                    children: children,
                    services,
                    title,
                    properties: {
                        ...properties,
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
            return this.forceSelectChildIndex;
        }

        return (!!tick.evalExpression(this.condition)) ? 0 : 1;
    }

    tick(tick) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
            childIndex = this.evalCondition(tick);
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

export default IfSelector;
