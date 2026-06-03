import Expression from '../Expression.js';

class NumberExpression extends Expression {

    constructor(config = {}, nodePool) {
        var expression;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var properties = config.properties || {};
            expression = properties.expression;

        } else {
            var configType = typeof (config);
            if (
                (configType === 'number') || (configType === 'boolean') ||
                (configType === 'string') || (configType === 'function')) {
                config = {
                    expression: config
                }
            }

            var {
                title,
                name = 'NumberExpression',
                expression: expressionValue = 0,
            } = config;

            super({
                title,
                name,
                properties: {
                    expression: expressionValue,
                }
            });

            expression = expressionValue;
        }

        this.expression = expression;

        var expressionType = typeof (this.expression);
        this.isConstant = (expressionType === 'number') || (expressionType === 'boolean');
        this.canEval = (expressionType === 'string');
    }

    eval(tick) {
        var value;
        if (this.isConstant) {
            value = this.expression;
        } else {
            var context = tick.getEvalContext();
            if (this.canEval) {
                value = tick.expressionParser.exec(this.expression, context);
            } else {
                value = this.expression(context);
            }

        }

        this.lastValue = value;
        return value;
    }
}

export default NumberExpression;
