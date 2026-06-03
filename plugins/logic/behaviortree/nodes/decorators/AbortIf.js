import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class AbortIf extends Decorator {

    constructor(config = {}, nodePool) {
        var condition, returnSuccess;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions;
            var properties = config.properties || {};
            condition = (expressions && (expressions.condition !== undefined)) ? expressions.condition : properties.condition;
            returnSuccess = properties.returnSuccess;

        } else {
            var {
                condition: conditionValue = 'true',
                returnSuccess: returnSuccessValue = true,
                child = null,
                title,
                properties = {},
                name = 'AbortIf'
            } = config;

            super(
                {
                    child,
                    title,
                    name,
                    properties: {
                        ...properties,
                        condition: conditionValue,
                        returnSuccess: returnSuccessValue,
                    },
                },
                nodePool
            );

            condition = conditionValue;
            returnSuccess = returnSuccessValue;
        }

        this.condition = CreateNumberExpression(condition, nodePool); // Expression node
        this.addExpression('condition', this.condition);
        this.returnSuccess = returnSuccess;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // child is running
        if (this.isChildRunning(tick)) {
            // Abort child if eval result is true
            if (!!tick.evalExpression(this.condition)) {
                return (this.returnSuccess) ? SUCCESS : FAILURE;
            }
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default AbortIf;
