import Expression from '../Expression';

export default StringExpression;

declare namespace StringExpression {
    type ExpressionValue =
        string |
        ((context: Record<string, unknown>) => unknown);

    /**
     * Configuration options for creating a StringExpression node.
     */
    interface IConfig extends Expression.IConfig {
        /**
         * String template or render callback.
         */
        expression?: ExpressionValue;
    }
}

/**
 * Expression wrapper for string template expressions.
 */
declare class StringExpression extends Expression {
    /**
     * Create a StringExpression.
     *
     * @param config - String template, render callback, or configuration options.
     */
    constructor(
        config?: StringExpression.ExpressionValue | StringExpression.IConfig
    );

    /**
     * String template or render callback.
     */
    expression: StringExpression.ExpressionValue;

    /**
     * Last evaluated value.
     */
    lastValue: any;
}
