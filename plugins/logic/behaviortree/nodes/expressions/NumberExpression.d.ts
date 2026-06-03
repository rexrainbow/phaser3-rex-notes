import Expression from '../Expression';

export default NumberExpression;

declare namespace NumberExpression {
    type ExpressionValue =
        number |
        string |
        boolean |
        ((context: Record<string, unknown>) => unknown);

    /**
     * Configuration options for creating a NumberExpression node.
     */
    interface IConfig extends Expression.IConfig {
        /**
         * Expression value, expression string, or compiled callback.
         */
        expression?: ExpressionValue;
    }
}

/**
 * Expression wrapper for numeric or string expressions.
 */
declare class NumberExpression extends Expression {
    /**
     * Create a NumberExpression.
     *
     * @param config - Expression value or configuration options.
     */
    constructor(
        config?: NumberExpression.ExpressionValue | NumberExpression.IConfig
    );

    /**
     * Expression value, expression string, or compiled callback.
     */
    expression: NumberExpression.ExpressionValue;

    /**
     * Last evaluated value.
     */
    lastValue: any;
}
