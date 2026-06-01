import BaseExpression from './BaseExpression';

export default Expression;

declare namespace Expression {
    /**
     * Evaluation context type.
     */
    type ContextType = BaseExpression.ContextType;
}

/**
 * Expression wrapper for function, numeric, object, or string expressions.
 */
declare class Expression extends BaseExpression {
    /**
     * Create an Expression.
     *
     * @param expression - Expression value.
     */
    constructor(expression: string | number | object |
        ((context: Expression.ContextType, expression: Expression) => any)
    );
}
