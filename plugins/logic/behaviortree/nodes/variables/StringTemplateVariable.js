import BaseVariable from './BaseVariable.js';
import Handlebars from 'handlebars';

const RuntimeOptions = {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
}
class StringTemplateVariable extends BaseVariable {
    constructor(expression) {
        super();

        var callback = Handlebars.compile(expression);
        this.setExpressionHandler(callback);
    }

    eval(context) {
        return this.expressionHandler(context, RuntimeOptions);
    }
}

export default StringTemplateVariable;