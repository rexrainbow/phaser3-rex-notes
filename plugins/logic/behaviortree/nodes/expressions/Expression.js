import BaseExpression from './BaseExpression.js';
import Compile from '../../../../math/expressionparser/utils/Complile.js';

class Expression extends BaseExpression {
    constructor(expression) {
        super();

        var callback;
        var expressionType = typeof (expression);
        switch (expressionType) {
            case 'number':
                callback = function () {
                    return expression;
                }
                break;

            case 'string':
                callback = Compile(expression);
                break;

            default: // 'function',  or 'object'
                callback = expression;
                break;
        }

        this.setExpressionHandler(callback);
    }
}

export default Expression;
