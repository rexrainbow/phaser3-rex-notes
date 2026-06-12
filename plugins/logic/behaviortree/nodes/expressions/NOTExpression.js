import Expression from '../Expression.js';
import CreateNumberExpression from './CreateNumberExpression.js';

class NOTExpression extends Expression {

    constructor(config = {}, nodePool) {
        var expression;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || [];
            expression = expressions[0];

        } else {
            var configType = typeof (config);
            if ((configType !== 'object') || Array.isArray(config)) {
                config = {
                    expression: config
                }
            }

            var {
                title,
                properties = {},
                name = 'NOTExpression',
                expression: expressionValue = true,
            } = config;

            super({
                title,
                properties,
                name,
            });

            expression = expressionValue;
        }

        this.addExpressionItem(CreateNumberExpression(expression, nodePool));
    }

    eval(tick, context) {
        // Assign context for testing purpose

        var expressions = this.expressions || [];
        if (expressions.length === 0) {
            return false;
        }

        return !tick.evalExpression(expressions[0], context);
    }
}

export default NOTExpression;
