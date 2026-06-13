import Decorator from '../Decorator.js';
import { CreateNumberExpression } from '../expressions/CreateExpression.js';
import { FAILURE, SUCCESS, RUNNING, ERROR } from '../../constants.js';


class If extends Decorator {

    constructor(config = {}, nodePool) {
        var condition;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || {};
            condition = expressions.condition;

        } else {
            var {
                condition: conditionValue = 'true',  // expression
                conditionEvalBreak = false,    // mode
                onFailState = FAILURE,         // mode
                child = null,
                title,
                properties = {},
                name = 'If'
            } = config;

            super(
                {
                    child,
                    title,
                    properties: {
                        ...properties,
                        conditionEvalBreak,
                        onFailState
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

        this.onFailState = this.properties.onFailState;
    }

    evalCondition(tick) {
        return tick.evalExpression(this.condition);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // child is not running
        if (!this.isChildRunning(tick)) {
            /*
            If expression return false:
              - Don't run child node
              - Return SUCCESS to run next child for Sequence node, or 
                - Equal to `ForceSuccess + If`
              - Return FAILURE for Selector node
            */
            if (!this.evalCondition(tick)) {
                return this.onFailState;
            } else if (this.conditionEvalBreak) {
                // Open child but not run it now
                this.openChild();
                return RUNNING;
            }
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default If;
