import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class ContinueIf extends Decorator {

    constructor(config = {}, nodePool) {
        var condition;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || {};
            condition = expressions.condition;

        } else {
            var {
                condition: conditionValue = 'true',  // expression
                returnSuccess = true,                // mode
                child = null,
                title,
                name = 'ContinueIf'
            } = config;

            super(
                {
                    child,
                    title,
                    name,
                    properties: {
                        returnSuccess,
                    },
                },
                nodePool
            );

            condition = conditionValue;

        }

        // Expression node, or constant number/boolean
        this.condition = CreateNumberExpression(condition, nodePool);
        this.addExpression('condition', this.condition);

        this.returnSuccess = this.properties.returnSuccess;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // child is running
        if (this.isChildRunning(tick)) {
            // Abort child if eval result is false
            if (!tick.evalExpression(this.condition)) {
                return (this.returnSuccess) ? SUCCESS : FAILURE;
            }
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default ContinueIf;
