export default BaseExpression;

declare namespace BaseExpression {
    /**
     * Evaluation context type.
     */
    type ContextType = Record<string, any>;
}
/**
 * Base class for expressions.
 */
declare class BaseExpression {
    /**
     * Set the expression handler.
     *
     * @param callback - Handler invoked for evaluation.
     * @returns This BaseExpression instance.
     */
    setExpressionHandler(
        callback: (context: BaseExpression.ContextType) => any
    ): this;

    /**
     * Evaluate the expression.
     *
     * @param context - Evaluation context.
     * @returns The evaluated value.
     */
    eval(context: BaseExpression.ContextType): any;
}
