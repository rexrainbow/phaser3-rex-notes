import BaseExpression from './BaseExpression';

export default StringTemplateExpression;

declare namespace StringTemplateExpression {
    /**
     * Evaluation context type.
     */
    type ContextType = BaseExpression.ContextType;
}

/**
 * Expression for string template evaluation.
 */
declare class StringTemplateExpression extends BaseExpression {
    /**
     * Create a StringTemplateExpression.
     *
     * @param expression - Template string.
     */
    constructor(expression: string);
}
