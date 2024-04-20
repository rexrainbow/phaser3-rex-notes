import BaseExpression from './BaseExpression.js';

class Expression extends BaseExpression {
    constructor(expression, parser) {
        super();

        var callback;
        if (typeof (expression) === 'number') {
            callback = function () {
                return expression;
            }
        } else {
            callback = parser.compile(expression);
        }

        this.setExpressionHandler(callback);
    }
}

export default Expression;