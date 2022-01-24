import BaseExpression from './BaseExpression.js';
import Handlebars from 'handlebars';

const RuntimeOptions = {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
}
class StringTemplateExpression extends BaseExpression {
    constructor(expression) {
        super();

        var callback = Handlebars.compile(expression);
        this.setExpressionHandler(callback);
    }

    eval(context) {
        return this.expressionHandler(context, RuntimeOptions);
    }
}

export default StringTemplateExpression;