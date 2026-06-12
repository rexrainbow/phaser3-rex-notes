import Expression from '../Expression.js';
import CreateNumberExpression from './CreateNumberExpression.js';

class ORExpression extends Expression {

    constructor(config = {}, nodePool) {
        var expressions;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            expressions = config.expressions || [];

        } else {
            if (Array.isArray(config)) {
                config = {
                    expressions: config
                }
            }

            var {
                title,
                properties = {},
                name = 'ORExpression',
                expressions: expressionValues = [],
            } = config;

            super({
                title,
                properties,
                name,
            });

            expressions = expressionValues;
        }

        for (var i = 0, cnt = expressions.length; i < cnt; i++) {
            this.addExpressionItem(CreateNumberExpression(expressions[i], nodePool));
        }
    }

    eval(tick, context) {
        var expressions = this.expressions || [];
        for (var i = 0, cnt = expressions.length; i < cnt; i++) {
            if (tick.evalExpression(expressions[i], context)) {
                return true;
            }
        }

        return false;
    }
}

export default ORExpression;
