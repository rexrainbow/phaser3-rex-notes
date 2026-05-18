import BaseExpression from './BaseExpression';
import Compile from '../../../../string/stringtemplate/utils/Complile';

class StringTemplateExpression extends BaseExpression {
    setExpressionHandler: any;

    constructor(expression?: any) {
        super();

        var callback = Compile(expression);
        this.setExpressionHandler(callback);
    }
}

export default StringTemplateExpression;