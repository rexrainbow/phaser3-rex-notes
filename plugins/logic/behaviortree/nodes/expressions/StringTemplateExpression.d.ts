import BaseExpression from './BaseExpression';

export default StringTemplateExpression;

declare namespace StringTemplateExpression {
    type ContextType = BaseExpression.ContextType;
}

declare class StringTemplateExpression extends BaseExpression {
    constructor(expression: string);
}