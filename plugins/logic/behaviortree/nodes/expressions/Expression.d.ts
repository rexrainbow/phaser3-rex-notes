import BaseExpression from './BaseExpression';

export default Expression;

declare namespace Expression {
    /**
     * Evaluation context type.
     */
    type ContextType = BaseExpression.ContextType;
}

/**
 * Expression wrapper for numeric or string expressions.
 */
declare class Expression extends BaseExpression {
    /**
     * Create an Expression.
     *
     * @param expression - Expression string or number.
     */
    constructor(expression: string | number);
}
