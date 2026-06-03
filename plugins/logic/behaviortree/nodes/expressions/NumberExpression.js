import Expression from '../Expression.js';

class NumberExpression extends Expression {

    constructor(config = {}) {

        var isConstant;
        var canEval;
        var configType = typeof (config);
        switch (configType) {
            case 'number':
            case 'boolean':
                isConstant = true;
                canEval = false;
                config = {
                    expression: config
                }
                break;

            case 'function':  // function object can't be serialize
                isConstant = false;
                canEval = false;
                config = {
                    expression: config
                }
                break;

            case 'string':
                isConstant = false;
                canEval = true;
                config = {
                    expression: config
                }
                break;
        }

        var {
            title,
            name = 'NumberExpression',
            expression = 0,
        } = config;

        super({
            title,
            name,
            properties: {
                expression,
            }
        });

        this.isConstant = isConstant;
        this.canEval = canEval;
        this.expression = expression;
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
