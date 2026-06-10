import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class AbortIf extends Decorator {

    constructor(config = {}, nodePool) {
        var condition;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || {};
            condition = expressions.condition;

        } else {
            var {
                condition: conditionValue = 'true',
                returnSuccess = true,  // mode
                child = null,
                title,
                properties = {},
                name = 'AbortIf'
            } = config;

            super(
                {
                    child,
                    title,
                    properties: {
                        ...properties,
                        returnSuccess: returnSuccessValue,
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

        this.returnSuccess = this.properties.returnSuccess;
    }

    evalCondition(tick) {
        return tick.evalExpression(this.condition);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // child is running
        if (this.isChildRunning(tick)) {
            // Abort child if eval result is true
            if (!!this.evalCondition(tick)) {
                return (this.returnSuccess) ? SUCCESS : FAILURE;
            }
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default AbortIf;
