import BaseExpression from './BaseExpression.js';
import StringTemplate from '../../../../string/stringtemplate/StringTemplate.js';

var stringTemplate = new StringTemplate();
class StringTemplateExpression extends BaseExpression {
    constructor(expression, parser) {
        super();

        var callback = stringTemplate.compile(expression, parser);
        this.setExpressionHandler(callback);
    }
}

export default StringTemplateExpression;