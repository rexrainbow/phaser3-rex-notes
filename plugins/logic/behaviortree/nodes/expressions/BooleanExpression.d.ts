import Expression from './Expression';

export default BooleanExpression;

declare namespace BooleanExpression {
    /**
     * Evaluation context type.
     */
    type ContextType = Expression.ContextType;
}

/**
 * Expression that evaluates to a boolean.
 */
declare class BooleanExpression extends Expression {
    /**
     * Evaluate the expression.
     *
     * @param context - Evaluation context.
     * @returns The boolean result.
     */
    eval(context: BooleanExpression.ContextType): boolean;
}
