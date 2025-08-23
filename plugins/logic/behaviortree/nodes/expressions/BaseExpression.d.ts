export default BaseExpression;

declare namespace BaseExpression {
    type ContextType = Record<string, any>;
}
declare class BaseExpression {
    setExpressionHandler(
        callback: (context: BaseExpression.ContextType) => any
    ): this;

    eval(context: BaseExpression.ContextType): any;
}