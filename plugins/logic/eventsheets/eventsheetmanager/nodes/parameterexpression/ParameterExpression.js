import { Expression } from '../../../../behaviortree/index.js';
import CreateExpressions from '../utils/CreateExpressions.js';
import EvalParameters from '../utils/EvalParameters.js';


class ParameterExpression extends Expression {
    constructor(config = {}, nodePool) {
        var parameters;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || {};
            parameters = expressions;

        } else {  // New node
            // config: {name, parameters:{...} }
            var expressionName = config.name;
            super({
                name: 'ParameterExpression',
                title: expressionName,
                properties: {
                    name: expressionName
                }
            });

            parameters = config.parameters || {};

        }

        CreateExpressions(this, nodePool, parameters);

    }

    eval(tick) {
        var expressionName = this.properties.name;
        if (!expressionName) {
            return;
        }

        var expressionExecutor = tick.target;

        // Eval parameters
        var expressionParameters = this.expressions || {};
        var evaledParameters = EvalParameters(tick, expressionParameters);

        var value;
        var handler = expressionExecutor[expressionName];
        if (handler) {
            value = handler.call(expressionExecutor, evaledParameters);
        } else {
            handler = expressionExecutor.defaultHandler;
            if (handler) {
                value = handler.call(expressionExecutor, expressionName, evaledParameters);
            }
        }

        return value;
    }
}

export default ParameterExpression;
