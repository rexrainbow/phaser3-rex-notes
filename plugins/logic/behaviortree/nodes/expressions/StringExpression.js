import Expression from '../Expression.js';

class StringExpression extends Expression {

    constructor(config = {}, nodePool) {
        var expression;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var properties = config.properties || {};
            expression = properties.expression;

        } else {
            var configType = typeof (config);
            if ((configType === 'string') || (configType === 'function')) {
                config = {
                    expression: config
                }
            }

            var {
                title,
                properties = {},
                name = 'StringExpression',
                expression: expressionValue = '',
            } = config;

            super({
                title,
                properties: {
                    ...properties,
                    expression: expressionValue,
                },
                name,
            });

            expression = expressionValue;
        }

        this.expression = expression;

        var expressionType = typeof (this.expression);
        this.canRender = (expressionType === 'string');
    }

    eval(tick, context) {
        // Assign context for testing purpose

        var value;
        if (!context) { // Normal case
            context = tick.getEvalContext();
        }

        if (this.canRender) {
            value = tick.stringTemplate.render(this.expression, context);
        } else if (typeof (this.expression) === 'function') {
            value = this.expression(context);
        } else {
            value = this.expression;
        }

        return value;
    }
}

export default StringExpression;
