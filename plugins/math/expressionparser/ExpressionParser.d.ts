export default ExpressionParser;

declare namespace ExpressionParser {
    type ExpressionCallbackType = (
        context: object
    ) => number
}

declare class ExpressionParser {

    compile(
        expression: string
    ): ExpressionParser.ExpressionCallbackType;

    exec(
        expression: string,
        context: object
    ): number;

    exec(
        expressionCallback: ExpressionParser.ExpressionCallbackType,
        context: object
    ): number;


}