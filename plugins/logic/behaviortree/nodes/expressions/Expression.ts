import BaseExpression from './BaseExpression';
import Compile from '../../../../math/expressionparser/utils/Complile';

class Expression extends BaseExpression {
    setExpressionHandler: any;

    constructor(expression?: any) {
        super();

        var callback;
        if (typeof (expression) === 'number') {
            callback = function() {
                return expression;
            }
        } else {
            callback = Compile(expression);
        }

        this.setExpressionHandler(callback);
    }
}

export default Expression;