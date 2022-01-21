import BaseVariable from './BaseVariable.js';
import Compile from '../../../../math/expressionparser/utils/Complile.js';

class Variable extends BaseVariable {
    constructor(expression) {
        super();

        var callback;
        if (typeof (expression) === 'number') {
            callback = function () {
                return expression;
            }
        } else {
            callback = Compile(expression);
        }

        this.setExpressionHandler(callback);
    }
}

export default Variable;